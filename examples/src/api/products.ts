import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// GET /products — listar productos con filtros
app.get("/api/products", async (req, res) => {
  const { category, search, page = "1", limit = "20" } = req.query;
  const skip = (Number(page) - 1) * Number(limit);

  const where: any = {};
  if (category) where.category = category;
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip,
      take: Number(limit),
      orderBy: { createdAt: "desc" },
    }),
    prisma.product.count({ where }),
  ]);

  res.json({
    products,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / Number(limit)),
    },
  });
});

// POST /products — crear producto
app.post("/api/products", async (req, res) => {
  const { name, description, price, category, stock } = req.body;
  const product = await prisma.product.create({
    data: { name, description, price, category, stock },
  });
  res.status(201).json(product);
});

// PUT /products/:id — actualizar producto
app.put("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, stock } = req.body;
  const product = await prisma.product.update({
    where: { id },
    data: { name, description, price, category, stock },
  });
  res.json(product);
});

// DELETE /products/:id — eliminar producto (soft delete)
app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await prisma.product.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
  res.json(product);
});

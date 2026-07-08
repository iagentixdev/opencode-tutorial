import React, { useState, useEffect } from "react";
import { Product } from "../types";

interface ProductListProps {
  category?: string;
  onEdit: (product: Product) => void;
}

export function ProductList({ category, onEdit }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [page, category, search]);

  async function fetchProducts() {
    setLoading(true);
    const params = new URLSearchParams({
      page: String(page),
      limit: "20",
      ...(category && { category }),
      ...(search && { search }),
    });
    const res = await fetch(`/api/products?${params}`);
    const data = await res.json();
    setProducts(data.products);
    setTotalPages(data.pagination.totalPages);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar este producto?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    fetchProducts();
  }

  if (loading) return <div className="loading">Cargando...</div>;

  return (
    <div className="product-list">
      <div className="product-list__header">
        <h2>Productos</h2>
        <input
          type="text"
          placeholder="Buscar..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="search-input"
        />
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p className="product-card__price">
              Gs. {product.price.toLocaleString("es-PY")}
            </p>
            <p className="product-card__category">{product.category}</p>
            <p className="product-card__stock">
              Stock: {product.stock} unidades
            </p>
            <div className="product-card__actions">
              <button onClick={() => onEdit(product)}>Editar</button>
              <button onClick={() => handleDelete(product.id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
          Anterior
        </button>
        <span>Página {page} de {totalPages}</span>
        <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
          Siguiente
        </button>
      </div>
    </div>
  );
}

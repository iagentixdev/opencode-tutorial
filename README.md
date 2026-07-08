# 🚀 OpenCode — Tutorial Completo

**OpenCode** es un agente de IA de código abierto para programar directamente desde tu terminal. Te permite escribir, debuggear, refactorizar y preguntar sobre tu código usando modelos como Claude, GPT, Gemini, etc.

> Web: [opencode.ai](https://opencode.ai) · Repo: [github.com/anomalyco/opencode](https://github.com/anomalyco/opencode) · Estrellas: ~178K ⭐

---

## 📦 Instalación

### Opción 1: YOLO (recomendada)
```bash
curl -fsSL https://opencode.ai/install | bash
```

### Opción 2: npm global
```bash
npm install -g opencode-ai
# o con bun/pnpm/yarn
bun i -g opencode-ai
pnpm add -g opencode-ai
yarn global add opencode-ai
```

### Opción 3: Homebrew (macOS/Linux)
```bash
brew install anomalyco/tap/opencode   # siempre actualizado
# o el formula oficial:
brew install opencode
```

### Opción 4: Docker
```bash
docker run -it --rm ghcr.io/anomalyco/opencode
```

### Opción 5: Arch Linux
```bash
sudo pacman -S opencode        # versión estable
paru -S opencode-bin           # última versión (AUR)
```

### Opción 6: Windows
```powershell
choco install opencode
# o
scoop install opencode
```

### Opción 7: Mise
```bash
mise use -g opencode
```

> **Verificar instalación:**
> ```bash
> opencode --version
> ```

---

## 🔑 Configurar un Proveedor de IA

OpenCode necesita acceso a un modelo de IA. Tenés varias opciones:

### 1️⃣ OpenCode Zen (recomendado — más simple)
```bash
# Abrí OpenCode y ejecutá:
opencode
# Después dentro de la TUI:
/connect
```
Seleccioná **OpenCode Zen**, te abre el navegador, creás cuenta, y pegás tu API key.

Modelos destacados: Claude Sonnet 4.5, GPT-5.4, Gemini 3.5 Flash, DeepSeek V4 Pro, etc.

### 2️⃣ Anthropic (Claude)
```bash
/connect   # seleccioná Anthropic
# Podés elegir autenticación con Claude Pro/Max (abre el navegador)
# o pegar manualmente tu ANTHROPIC_API_KEY
```

### 3️⃣ OpenAI (GPT)
```bash
/connect   # seleccioná OpenAI
# Pegá tu OPENAI_API_KEY
```

### 4️⃣ Google Gemini
```bash
/connect   # seleccioná Gemini
# Pegá tu GEMINI_API_KEY
```

### 5️⃣ GitHub Copilot
```bash
/connect   # seleccioná GitHub Copilot
# Autentica con tu cuenta de GitHub
```

> **OpenCode Zen tiene planes accesibles:**
> - Pay-as-you-go (cargás créditos)
> - **OpenCode Go:** suscripción low-cost para modelos open source
> - Sin necesidad de tener cuenta en OpenAI/Anthropic

---

## 🚀 Primeros Pasos

### 1️⃣ Inicializar OpenCode en tu proyecto
```bash
cd /ruta/a/tu/proyecto
opencode
# Dentro de la TUI:
/init
```
Esto analiza tu proyecto y crea un `AGENTS.md` en la raíz para que OpenCode entienda la estructura y patrones de código.

### 2️⃣ Preguntar sobre el código
```
How is authentication handled in @src/api/index.ts
```
Usá `@` para referenciar archivos. OpenCode los lee y los incluye en el contexto.

### 3️⃣ Planificar una feature
Presioná **Tab** para cambiar a **Plan Mode** (lo ves indicado abajo a la derecha).
```
When a user deletes a note, mark it as deleted in the database.
Then create a screen showing recently deleted notes.
From there, users can undelete or permanently delete.
```
Iterá sobre el plan, después presioná **Tab** de nuevo para volver a **Build Mode** y decile:
```
Sounds good! Go ahead and make the changes.
```

### 4️⃣ Pedir cambios directos
```
Add authentication to the /settings route.
Check how it's done in @src/routes/notes.ts and replicate it.
```

### 5️⃣ Deshacer/Rehacer
```
/undo    # revierte el último cambio
/redo    # lo reaplica
```

### 6️⃣ Compartir conversación
```
/share
```
Genera un link con toda la conversación para compartir con tu equipo.
[Ejemplo](https://opencode.ai/s/4XP1fce5)

---

## ⌨️ Atajos de Teclado (TUI)

| Tecla | Acción |
|-------|--------|
| `Ctrl+C` | Salir |
| `Ctrl+?` / `?` | Ayuda |
| `Ctrl+L` | Ver logs |
| `Ctrl+A` | Cambiar de sesión |
| `Ctrl+K` | Diálogo de comandos |
| `Ctrl+O` | Seleccionar modelo |
| `Ctrl+N` | Nueva sesión |
| `Ctrl+X` | Cancelar operación |
| `Tab` | Alternar Plan Mode / Build Mode |
| `i` | Enfocar editor |
| `Esc` | Cerrar overlay / volver |

---

## 📝 Comandos Integrados

| Comando | Descripción |
|---------|-------------|
| `/init` | Inicializa OpenCode en el proyecto (analiza y crea AGENTS.md) |
| `/undo` | Revierte el último cambio |
| `/redo` | Reaplica el último undo |
| `/share` | Genera link para compartir la conversación |
| `/help` | Muestra ayuda |
| `/connect` | Configurar/agregar proveedores de IA |
| `/models` | Ver y seleccionar modelos disponibles |

---

## ⚙️ Comandos Personalizados

Creá tus propios comandos reutilizables para tareas frecuentes:

### JSON (en `opencode.json`)
```json
{
  "$schema": "https://opencode.ai/config.json",
  "command": {
    "test": {
      "description": "Ejecutar tests con cobertura",
      "template": "Run the full test suite with coverage and show failures.\nFocus on failing tests and suggest fixes.",
      "agent": "build",
      "model": "anthropic/claude-sonnet-4-5"
    }
  }
}
```

### Markdown (en `.opencode/commands/test.md`)
```markdown
---
description: Run tests with coverage
agent: build
model: anthropic/claude-sonnet-4-5
---

Run the full test suite with coverage and report any failures.
Focus on failing tests and suggest fixes.
```

Usalo con:
```
/test
```

### Argumentos en comandos
```markdown
---
description: Crear un componente React
---

Create a new React component named $ARGUMENTS with TypeScript.
Include proper typing and basic structure.
```
```
/component Button
```

También podés usar `$1`, `$2`, `$3` para argumentos posicionales.

### Inyectar output de shell
```markdown
---
description: Revisar cambios recientes
---

Recent git commits:
!`git log --oneline -10`

Review these changes and suggest improvements.
```

### Referenciar archivos
```markdown
---
description: Review component
---

Review the component in @src/components/Button.tsx.
Check for performance issues and suggest improvements.
```

---

## 🧠 Modos / Agentes

OpenCode tiene distintos modos de agente:

### Plan Mode
Solo planifica, **no hace cambios**. Ideal para diseñar antes de ejecutar.

### Build Mode
Ejecuta cambios en el código.

### Subagentes
Pueden spawnearse para tareas específicas sin contaminar el contexto principal.
```json
{
  "agents": {
    "code-review": {
      "agent": "plan",
      "model": "anthropic/claude-sonnet-4-5"
    }
  }
}
```

---

## ⚙️ Configuración Avanzada

### Archivos de configuración (orden de precedencia):
1. Remoto: `.well-known/opencode` (organizacional)
2. Global: `~/.config/opencode/opencode.json`
3. Custom: `$OPENCODE_CONFIG`
4. Proyecto: `./opencode.json`
5. `.opencode/` — agents, commands, plugins
6. Inline: `$OPENCODE_CONFIG_CONTENT`
7. Managed (admin): `/etc/opencode/` (Linux)

### Ejemplo completo de configuración:
```json
{
  "$schema": "https://opencode.ai/config.json",
  "model": "anthropic/claude-sonnet-4-5",
  "autoupdate": true,
  "provider": {
    "anthropic": {
      "options": {
        "baseURL": "https://api.anthropic.com/v1"
      },
      "blacklist": ["claude-opus-4-20250514"],
      "whitelist": ["claude-sonnet-4-20250514"]
    },
    "openai": {
      "blacklist": ["gpt-4.1-nano"]
    }
  },
  "agents": {
    "coder": {
      "model": "anthropic/claude-sonnet-4-5",
      "maxTokens": 5000
    },
    "task": {
      "model": "anthropic/claude-sonnet-4-5",
      "maxTokens": 5000
    },
    "title": {
      "model": "anthropic/claude-sonnet-4-5",
      "maxTokens": 80
    }
  },
  "shell": {
    "path": "/bin/bash",
    "args": ["-l"]
  },
  "permission": {
    "*": "accept",
    "bash": {
      "*": "ask",
      "rm -rf *": "deny"
    }
  },
  "mcpServers": {
    "filesystem": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "."]
    }
  },
  "lsp": {
    "go": { "disabled": false, "command": "gopls" }
  },
  "autoCompact": true,
  "server": {
    "port": 4096
  }
}
```

### Modo No-Interactivo (para scripts/automation)
```bash
# Prompt simple, output a terminal
opencode -p "Explain the use of context in Go"

# Output en JSON
opencode -p "Explain the use of context in Go" -f json

# Sin spinner (para scripts)
opencode -p "Explain the use of context in Go" -q

# Con directorio específico
opencode -c /path/to/project -p "Refactor this code"
```

---

## 🎨 Temas y Personalización

### TUI config (`~/.config/opencode/tui.json`)
```json
{
  "$schema": "https://opencode.ai/tui.json",
  "theme": "catppuccin-mocha",
  "fontSize": 14,
  "fontFamily": "JetBrains Mono"
}
```

Temas disponibles: `catppuccin-latte`, `catppuccin-mocha`, `dracula`, `nord`, `solarized-dark`, `solarized-light`, etc.

---

## 🧩 MCP Servers (Model Context Protocol)

OpenCode soporta MCP para extender capacidades:

```json
{
  "mcpServers": {
    "filesystem": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "."]
    },
    "github": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"]
    },
    "sequelize": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-sequelize"]
    }
  }
}
```

---

## 🔄 Integración con Git

```bash
# Ver cambios recientes en la sesión de OpenCode
What changed in the last 3 commits?

# Hacer commit
Can you commit these changes with a descriptive message?

# Revisar PR
Review the changes in @main...@feature-branch
```

---

## 🐳 Ejecutar con Docker

```bash
# Montar proyecto actual
docker run -it --rm \
  -v $(pwd):/workspace \
  -v ~/.config/opencode:/root/.config/opencode \
  ghcr.io/anomalyco/opencode
```

---

## 💡 Tips y Buenas Prácticas

1. **Sé específico**: Tratá a OpenCode como un junior dev. Dale contexto, ejemplos y detalles.
2. **Usá @ para archivos**: Siempre referenciá archivos con `@` para dar contexto.
3. **Primero planificá**: Usá Plan Mode para features complejas antes de Build Mode.
4. **Imágenes**: Podés arrastrar imágenes al terminal y OpenCode las analiza.
5. **/undo es tu amigo**: Si no te gusta el resultado, deshacé y reformulá.
6. **Comandos personalizados**: Creá `/test`, `/deploy`, `/lint` para tareas repetitivas.
7. **Múltiples sesiones**: Usá `Ctrl+A` para switchear entre conversaciones.
8. **Auto-compact**: OpenCode comprime automáticamente conversaciones largas para no perder contexto.
9. **Config por proyecto**: Cada proyecto puede tener su `opencode.json` con settings específicos.
10. **Debug mode**: `opencode -d` para ver logs detallados.

---

## 📚 Referencia Rápida

```bash
# Instalar
curl -fsSL https://opencode.ai/install | bash

# Iniciar
cd mi-proyecto && opencode

# Modo no-interactivo
opencode -p "query" [-f json] [-q]

# Comandos internos en TUI
/init    # inicializar proyecto
/connect # configurar proveedor
/models  # seleccionar modelo
/undo    # deshacer cambios
/redo    # rehacer cambios
/share   # compartir conversación

# Atajos
Tab      # Plan Mode ↔ Build Mode
Ctrl+K   # paleta de comandos
Ctrl+N   # nueva sesión
Ctrl+O   # selector de modelo
```

---

## 🆘 Troubleshooting

| Problema | Solución |
|----------|----------|
| "No provider configured" | Ejecutá `/connect` en la TUI |
| API key inválida | Verificá que la key sea correcta y tenga créditos |
| Modelo no aparece | Ejecutá `/models` para refrescar la lista |
| Error de contexto | OpenCode auto-compacta, pero podés iniciar nueva sesión (`Ctrl+N`) |
| OpenCode lento | Probá con un modelo más rápido como Gemini Flash o GPT-4.1 Mini |
| No encuentra archivos | Asegurate de haber ejecutado `/init` en el proyecto |

---

## 📋 OpenSpec — Spec-Driven Development para OpenCode

**OpenSpec** es un framework liviano de **spec-driven development (SDD)** que estructura cómo humanos y AI acuerdan qué construir antes de escribir código. Creado por Fission-AI.

> Web: [openspec.dev](https://openspec.dev) · Repo: [github.com/Fission-AI/OpenSpec](https://github.com/Fission-AI/OpenSpec) · npm: `@fission-ai/openspec`

### ¿Por qué OpenSpec?

Sin specs, los prompts son vagos y los resultados impredecibles. OpenSpec agrega una **capa de especificación** liviana:

- ✅ Acordá antes de construir — humano y AI alinean specs antes del código
- ✅ Organizado — cada cambio tiene su carpeta con proposal, specs, design y tasks
- ✅ Fluido — actualizás cualquier artefacto en cualquier momento, sin fases rígidas
- ✅ Multi-herramienta — funciona con 30+ asistentes AI via slash commands

### 📦 Instalación

```bash
npm install -g @fission-ai/openspec@latest
```

Requiere Node.js 20.19+.

### 🚀 Inicialización

```bash
cd tu-proyecto
openspec init
```

Esto crea la estructura `openspec/changes/` en tu proyecto.

### 🧠 Comandos Slash (para usar dentro de OpenCode)

| Comando | Descripción |
|---------|-------------|
| `/opsx:explore` | Explorá ideas sin compromiso. El AI lee tu código, analiza opciones, ayuda a dar forma a un plan |
| `/opsx:propose` | Proponé un cambio formal. Crea `openspec/changes/<nombre>/` con proposal, specs, design, tasks |
| `/opsx:apply` | Implementá las tasks del proposal una por una |
| `/opsx:archive` | Archiva un cambio completado. Mergea los spec deltas al spec library |
| `/opsx:continue` | Seguí trabajando en un cambio existente |
| `/opsx:ff` | Fast-forward. Saltá directo a implementar specs ya claras |
| `/opsx:verify` | Verificá que la implementación cumpla con los specs |
| `/opsx:onboard` | Agregá un nuevo miembro al equipo con contexto del proyecto |
| `/opsx:bulk-archive` | Archivá múltiples cambios completados de una sola vez |

### 📁 Estructura que genera en tu proyecto

```
tu-proyecto/
└── openspec/
    └── changes/
        └── add-dark-mode/           # cada feature es una carpeta
            ├── proposal.md          # por qué, qué cambia, alcance
            ├── specs/               # requirements + scenarios
            │   ├── requirements.md  # requirements funcionales
│   │   └── scenarios.md      # ejemplos GIVEN/WHEN/THEN
│   ├── design.md             # enfoque técnico
│   └── tasks.md              # checklist de implementación
└── archive/                  # cambios completados
    └── 2025-01-23-add-dark-mode/
```

### 🔄 Flujo de trabajo con OpenCode

```
1. /opsx:explore "Quiero agregar dark mode pero no sé cómo encararlo"
   → El AI lee tu setup de estilos, analiza opciones y recomienda
g2. /opsx:propose add-dark-mode
   → Crea la carpeta openspec/changes/add-dark-mode/ con artifacts
3. Revisás proposal.md y specs/, iterás con el AI
4. /opsx:apply
   → Implementa las tasks una por una
5. /opsx:archive
   → Archiva el cambio, mergea specs al spec library
```

### 📊 Spec Deltas

Cada cambio produce un **spec delta** que captura cómo cambian los requirements:

```diff
### Requirement: Session expiration
- The system SHALL expire sessions after a configured duration.
+ The system SHALL support configurable session expiration periods.

#### Scenario: Default session timeout
- GIVEN a user has authenticated
- - WHEN 24 hours pass without activity
+ - WHEN 24 hours pass without "Remember me"
- THEN invalidate the session token
+ #### Scenario: Extended session with remember me
+ - GIVEN user checks "Remember me" at login
+ - WHEN 30 days have passed
+ - THEN invalidate the session token
+ - AND clear the persistent cookie
```

Esto permite a revisores entender el cambio a nivel requirements sin tener que leer código.

### 🏢 Multi-repo con Stores (beta)

Para equipos grandes, OpenSpec soporta **Stores** — un repo separado donde:
- Un equipo de plataforma define specs que otros equipos consumen
- Features cross-repo con un solo plan que abarca API server, web app y shared lib
- Planificás antes de codificar en cada repo

```bash
openspec store init
```

### ⚙️ Commands CLI

```bash
# Inicializar OpenSpec en un proyecto
openspec init

# Actualizar instrucciones del AI
openspec update

# Configurar perfil (default o expanded)
openspec config profile

# Ver estado
openspec status
```

### 🧩 Integración con OpenCode

Agregá este command custom para arrancar un feature con OpenSpec desde OpenCode:

```markdown
# .opencode/commands/spec.md
---
description: Iniciar un nuevo feature con OpenSpec
agent: build
---
Use the OpenSpec workflow for this feature.

1. First, run /opsx:explore to explore the idea
2. Then /opsx:propose with the feature name
3. Review and iterate on the specs
4. Finally /opsx:apply to implement

The change directory is at openspec/changes/
Point me to the relevant files and specs.
```

### 🤖 Modelos recomendados

OpenSpec funciona mejor con modelos de alto razonamiento:
- **GPT-5.5 Codex** / **GPT-5.3 Codex** — planificación e implementación
- **Claude Opus 4.7** — análisis de specs y diseño
- **Claude Sonnet 4.5** — implementación rápida

### 📚 Más info

- [Getting Started](https://github.com/Fission-AI/OpenSpec/blob/main/docs/getting-started.md)
- [How Commands Work](https://github.com/Fission-AI/OpenSpec/blob/main/docs/how-commands-work.md)
- [Supported Tools](https://github.com/Fission-AI/OpenSpec/blob/main/docs/supported-tools.md)
- [Discord](https://discord.gg/YctCnvvshC)

---

## 🧩 Mejores Skills y MCP Servers para OpenCode

### MCP Servers Recomendados

Los MCP (Model Context Protocol) servers extienden lo que OpenCode puede hacer.

| MCP Server | Uso | Instalación |
|------------|-----|------------|
| **Filesystem** | Leer/escribir archivos, buscar contenido | `npx -y @modelcontextprotocol/server-filesystem .` |
| **GitHub** | Issues, PRs, repos, búsqueda | `npx -y @modelcontextprotocol/server-github` |
| **Postgres** | Consultar DB, esquemas, migraciones | `npx -y @anthropic-ai/mcp-server-postgres` |
| **Playwright** | Navegador headless, tests E2E | `npx -y @executeautomation/playwright-mcp-server` |
| **Slack** | Mensajes, canales, búsqueda | `npx -y @modelcontextprotocol/server-slack` |
| **Memory** | Memoria persistente entre sesiones | `npx -y @modelcontextprotocol/server-memory` |
| **Puppeteer** | Web scraping, screenshots | `npx -y @modelcontextprotocol/server-puppeteer` |
| **Brave Search** | Búsqueda web desde OpenCode | `npx -y @modelcontextprotocol/server-brave-search` |

Configuración:
```json
{
  "mcpServers": {
    "filesystem": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "."]
    },
    "github": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"]
    },
    "postgres": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-postgres", "postgresql://..."]
    }
  }
}
```

### Skills Esenciales (Workflows Avanzados)

#### 🔍 Investigación y Debug
```markdown
# .opencode/commands/debug.md
---
description: Debuggear un error con stack trace
agent: build
---
I'm getting this error:
!`cat /tmp/error.log | tail -50`

Analyze the stack trace and suggest a fix.
Check @src for relevant code.
```

#### 🔄 Code Review Automático
```markdown
# .opencode/commands/review-all.md
---
description: Revisar todos los cambios sin commitear
agent: plan
---
Review all uncommitted changes:
!`git diff`

Check for:
- Security vulnerabilities
- Performance issues
- Code style consistency
- Missing error handling
- Hardcoded values

Suggest specific improvements.
```

#### 📊 Análisis de Base de Datos
```markdown
# .opencode/commands/db-analyze.md
---
description: Analizar esquema y datos de DB
agent: build
---
Analyze the database schema:
!`cat prisma/schema.prisma`

Suggest optimizations:
- Missing indexes
- Relationship improvements
- N+1 query risks
- Migration best practices
```

#### 🚀 Deploy Checklist
```markdown
# .opencode/commands/release.md
---
description: Preparar release con checklist
agent: build
---
Prepare a release:
!`git log --oneline $(git describe --tags --abbrev=0)..HEAD`

Check:
- Version bumped in package.json
- Changelog updated
- Tests passing
- All TODOs resolved or tracked
- Migration files ready

Create the release notes.
```

### Multi-Agent Workflows

OpenCode permite coordinar múltiples agentes para tareas complejas:

```json
{
  "agents": {
    "architect": {
      "description": "Diseña la solución",
      "model": "anthropic/claude-sonnet-4-5"
    },
    "coder": {
      "description": "Implementa el código",
      "model": "anthropic/claude-sonnet-4-5",
      "maxTokens": 8000
    },
    "reviewer": {
      "description": "Revisa el código",
      "agent": "plan",
      "model": "anthropic/claude-sonnet-4-5"
    },
    "tester": {
      "description": "Escribe tests",
      "model": "anthropic/gpt-4.1-mini"
    }
  }
}
```

Flujo de trabajo:
1. **Architect mode** → diseñar la solución
2. **Coder mode** → implementar
3. **Reviewer mode** → code review
4. **Tester mode** → escribir tests
5. **Build mode** → integrar todo

### Tips de Prompting Avanzado

- **Contexto primero**: "We're building a SaaS with Next.js + Prisma + Stripe. Users can..."
- **Ejemplos concretos**: "Like how Stripe does it in their docs"
- **Restricciones explícitas**: "No external dependencies, use Web APIs only"
- **Referencias visuales**: Arrastrá imágenes al terminal como referencia de diseño
- **Iterar con planes**: Siempre Plan Mode primero para features complejas
- **Archivos @**: Referenciá archivos clave para dar contexto preciso
- **Shell injection**: Usá ``!`command` `` para inyectar datos reales del proyecto

---

*Este tutorial fue generado para Ricardo — Paraguay 🇵🇾 — Julio 2026*
*Basado en la documentación oficial de [opencode.ai/docs](https://opencode.ai/docs)*

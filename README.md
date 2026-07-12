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

---

## 🎯 OpenCode Goal Plugin — Modo Goal Persistente

**@prevalentware/opencode-goal-plugin** agrega modo goal estilo Codex a OpenCode: un objetivo persistente que el AI persigue hasta completarlo, con auto-continuation, evidencia de cierre y safety limits.

> Repo: [github.com/prevalentWare/opencode-goal-plugin](https://github.com/prevalentWare/opencode-goal-plugin) · npm: `@prevalentware/opencode-goal-plugin`

### ❓ ¿Para qué sirve?

Sin goals, OpenCode responde un prompt y se detiene. Con el Goal Plugin:

- ✅ **Objetivo persistente** — el AI trabaja hacia un goal hasta completarlo o bloquearse
- ✅ **Auto-continuation** — cuando la sesión queda idle, el plugin sigue pidiendo avance
- ✅ **Evidencia requerida** — no podés cerrar un goal sin mostrar evidencia concreta
- ✅ **Persiste en compactación** — el goal sobrevive cuando OpenCode resume sesiones largas
- ✅ **Safety limits** — budget de tokens, tiempo máximo, detección de no-progress
- ✅ **Plan-mode seguro** — no se puede escapar de Plan mode vía goals

### 📦 Instalación

```bash
# Local (proyecto actual)
opencode plugin @prevalentware/opencode-goal-plugin

# Global
opencode plugin -g @prevalentware/opencode-goal-plugin
```

O manual en `opencode.json` y `tui.json`:

```json
{
  "plugin": ["@prevalentware/opencode-goal-plugin"]
}
```

### 🧠 Uso básico

```bash
/goal review the frontend and translate visible English UI text to Spanish
```

Esto crea un goal persistente. El AI va a:
1. Empezar a trabajar en ello
2. Cuando termine de responder, si hay más por hacer, el plugin lo reactiva
3. Seguir hasta que el goal esté **completo** (con evidencia) o **unmet** (con blocker)

### 📋 Comandos /goal

| Comando | Descripción |
|---------|-------------|
| `/goal <objetivo>` | Crear un nuevo goal |
| `/goal` | Ver estado del goal actual |
| `/goal history` | Ver historial y checkpoints |
| `/goal edit <objetivo>` | Actualizar el objetivo |
| `/goal pause` | Pausar el goal sin borrarlo |
| `/goal resume` | Reanudar goal pausado |
| `/goal clear` | Borrar el goal (aliases: stop, off, reset, none, cancel) |

### 🔧 Configuración avanzada

```json
{
  "plugin": [
    [
      "@prevalentware/opencode-goal-plugin",
      {
        "auto_continue": true,
        "defer_while_tasks_active": true,
        "max_auto_turns": 25,
        "min_continue_interval_seconds": 3,
        "max_prompt_failures": 3,
        "default_token_budget": 200000,
        "max_goal_duration_seconds": 1800,
        "no_progress_token_threshold": 50,
        "max_no_progress_turns": 2,
        "restricted_agents": ["plan"],
        "allow_goal_execution_from_plan": false
      }
    ]
  ]
}
```

| Opción | Default | Descripción |
|--------|---------|-------------|
| `auto_continue` | `true` | Reactiva el AI cuando la sesión queda idle |
| `defer_while_tasks_active` | `true` | Espera a que terminen tareas hijo antes de continuar |
| `max_auto_turns` | `25` | Máximo de continuaciones automáticas por goal |
| `min_continue_interval_seconds` | `3` | Intervalo mínimo entre continuaciones |
| `max_prompt_failures` | `3` | Fallos antes de pausar auto-continuation |
| `default_token_budget` | sin límite | Budget de tokens por goal |
| `max_goal_duration_seconds` | sin límite | Duración máxima por goal (1800 = 30 min) |
| `no_progress_token_threshold` | `50` | Output mínimo para considerar que hubo progreso |
| `max_no_progress_turns` | `2` | Turns sin progreso antes de pausar |
| `restricted_agents` | `["plan"]` | Agentes que no pueden ejecutar goals |
| `allow_goal_execution_from_plan` | `false` | Permitir goals desde Plan mode |

### 🛡️ Safety

- Goals desde **Plan mode** arrancan pausados — no podés implementar sin cambiar a Build
- **Auto-continuation** no funciona en Plan mode
- No se puede **resumir** un goal desde Plan mode (evita prompt injection)
- Las continuaciones quedan **ancladas al agente original** — nadie switchea el modo por atrás
- Budget agotado → wrap-up prompt con handoff, no silencio infinito

### 💾 Estado persistente

El estado del goal se guarda en:
```
~/.local/share/opencode-goal-plugin/goals.json
```

Podés cambiarlo con la env:
```bash
export OPENCODE_GOAL_STATE_PATH=/ruta/personalizada/goals.json
```

### 🧩 Ejemplo: flujo completo

```
# 1. Arrancás un goal:
/goal refactor the auth module to use JWT instead of sessions

# 2. El AI arranca a laburar:
→ Refactoring auth middleware...
→ Updating login flow...
→ Session idle → plugin reactiva
→ Continued: updating tests...
→ Continued: removing old session code...

# 3. Cerrás con evidencia:
/goal clear
# El AI muestra: tests pass, old code removed, PR ready ✅
```

### 🚫 Si algo se bloquea

```
/goal clear
# El AI documenta: bloqueado porque falta definir schema de JWT tokens
```

---

## 🧩 oh-my-opencode-slim — Multi-Agent Orchestration para OpenCode

**oh-my-opencode-slim** es un plugin de orquestación multi-agente para OpenCode. Construye un equipo de agentes especializados que trabajan bajo un orquestador central: scoutean el codebase, buscan documentación, revisan arquitectura, manejan UI y ejecutan tareas de implementación.

> Repo: [github.com/alvinunreal/oh-my-opencode-slim](https://github.com/alvinunreal/oh-my-opencode-slim) · by **Boring Dystopia Development**

### ❓ ¿Para qué sirve?

En lugar de forzar a un solo modelo a hacerlo todo, el plugin rutea cada parte del trabajo al agente más adecuado, balanceando **calidad, velocidad y costo**:

- ✅ **Orquestación multi-agente** — Orchestrator planifica, delega y verifica
- ✅ **Agentes de fondo (V2)** — trabajan en paralelo mientras el Orchestrator coordina
- ✅ **Auto-delegación** — tareas complejas se parten automáticamente entre especialistas
- ✅ **Mix de modelos** — usá el mejor modelo para cada rol (caro para planificar, barato para explorar)
- ✅ **Companion** — ventana flotante que muestra qué agentes están activos
- ✅ **Deepwork** — flujo estructurado para cambios grandes/riesgosos con gates de revisión
- ✅ **Reflect** — detecta patrones repetidos y sugiere skills reutilizables
- ✅ **Worktrees** — lanes de Git aislados para trabajo riesgoso en paralelo

### 📦 Instalación

```bash
# Rápida (recomendada)
bunx oh-my-opencode-slim@latest install

# Con Companion (ventana flotante de estado)
bunx oh-my-opencode-slim@latest install --companion=yes

# Con preset OpenCode Go
bunx oh-my-opencode-slim@latest install --preset=opencode-go
```

También desde master (para desarrollo/contribuciones):

```bash
git clone https://github.com/alvinunreal/oh-my-opencode-slim.git ~/repos/oh-my-opencode-slim
cd ~/repos/oh-my-opencode-slim
bun install
bun run build
bun dist/cli/index.js install
```

### 🏛️ El Panteón — 7 Agentes Especializados

| Agente | Rol | Modelo Default | Costo |
|--------|-----|----------------|-------|
| **Orchestrator** | Planifica, delega, reconcilia resultados | `gpt-5.5 (medium)` | 🟡 Medio |
| **Oracle** | Asesor estratégico, debug de último recurso | `gpt-5.5 (high)` | 🔴 Alto |
| **Explorer** | Reconocimiento del codebase | `gpt-5.4-mini` | 🟢 Bajo |
| **Council** | Consenso multi-modelo en paralelo | Configurable | 🔴 Alto |
| **Librarian** | Búsqueda de documentación externa | `gpt-5.4-mini` | 🟢 Bajo |
| **Designer** | UI/UX y maquetado visual | `gpt-5.4-mini` | 🟢 Bajo |
| **Fixer** | Implementación rápida de cambios acotados | `gpt-5.5 (low)` | 🟡 Medio |
| **Observer** *(optativo)* | Análisis visual de imágenes/screenshots | `gpt-5.4-mini` | 🟢 Bajo |

### 🔧 Configuración

El instalador genera dos presets: `openai` y `opencode-go`. Después de instalar:

```bash
# Login a los providers que querés usar
opencode auth login

# Refrescar lista de modelos
opencode models --refresh

# Editar la configuración de agentes
# ~/.config/opencode/oh-my-opencode-slim.json
```

Ejemplo de configuración (`openai` preset):

```jsonc
{
  "$schema": "https://unpkg.com/oh-my-opencode-slim@latest/oh-my-opencode-slim.schema.json",
  "preset": "openai",
  "presets": {
    "openai": {
      "orchestrator": { "model": "openai/gpt-5.5", "variant": "medium", "skills": ["*"], "mcps": ["*", "!context7"] },
      "oracle": { "model": "openai/gpt-5.5", "variant": "high", "skills": ["simplify"], "mcps": [] },
      "explorer": { "model": "openai/gpt-5.4-mini", "variant": "low", "skills": [], "mcps": [] },
      "librarian": { "model": "openai/gpt-5.4-mini", "variant": "low", "skills": [], "mcps": ["websearch", "context7", "gh_grep"] },
      "designer": { "model": "openai/gpt-5.4-mini", "variant": "medium", "skills": [], "mcps": [] },
      "fixer": { "model": "openai/gpt-5.5", "variant": "low", "skills": [], "mcps": [] }
    }
  }
}
```

### 🤖 Delegación manual

Podés llamar a cualquier agente directamente desde el chat:

```
@oracle Revisá esta arquitectura, estamos usando JWT pero necesitamos refresh tokens
@explorer Scouteá el codebase y decime cómo está estructurado el módulo de auth
@designer Dame una propuesta de UI para el dashboard de analytics
@council Compará estas dos estrategias de cache: Redis vs in-memory
```

### ✅ Verificar instalación

```
ping all agents
```

### 🔁 V2 Features Principales

| Feature | Descripción |
|---------|-------------|
| **Background Agents** | Orchestrator delega especialistas como tareas de fondo, espera resultados y reconcilia |
| **Companion** | Ventana flotante desktop que muestra agentes activos en tiempo real |
| **Deepwork** | `/deepwork <tarea>` — flujo estructurado con plan persistente y gates de Oracle |
| **Reflect** | `/reflect` — revisa patrones de trabajo y sugiere skills reutilizables |
| **Worktrees** | Lanes Git aislados en `.slim/worktrees/` para cambios riesgosos |
| **Preset Switching** | `/preset` — cambiá config de agentes en runtime |

### 🧰 LazySkills — TUI para Skills

**[LazySkills](https://github.com/alvinunreal/lazyskills)** es una interfaz terminal para gestionar qué skills puede usar cada agente, ver qué está instalado y diagnosticar problemas de visibilidad.

### 📚 Docs relacionadas

- [Background Orchestration](https://github.com/alvinunreal/oh-my-opencode-slim/blob/master/docs/v2-background-orchestration.md)
- [Configuration Reference](https://github.com/alvinunreal/oh-my-opencode-slim/blob/master/docs/configuration.md)
- [Multiplexer Integration (Tmux/Zellij)](https://github.com/alvinunreal/oh-my-opencode-slim/blob/master/docs/multiplexer-integration.md)
- [Council — Multi-LLM Consensus](https://github.com/alvinunreal/oh-my-opencode-slim/blob/master/docs/council.md)
- [Author's Preset](https://github.com/alvinunreal/oh-my-opencode-slim/blob/master/docs/authors-preset.md)
- [$30 Preset (budget)](https://github.com/alvinunreal/oh-my-opencode-slim/blob/master/docs/thirty-dollars-preset.md)

---

## 📁 SDD + Estructura de proyecto OpenCode

### Spec-Driven Development (SDD) en profundidad

**SDD (Spec-Driven Development)** es una metodología donde primero se escribe la *spec* (qué querés construir) y recién después el código. No es un framework ni un plugin — es un **proceso** que podés implementar con herramientas como OpenSpec, GitHub Spec Kit, o incluso con prompts manuales.

#### El ciclo SDD completo

```
Proponer → Especificar → Diseñar → Taskear → Implementar → Verificar → Archivar
```

| Fase | Artefacto | ¿Qué contiene? |
|------|-----------|----------------|
| **Proposal** | `proposal.md` | Por qué, qué cambia, alcance, riesgos |
| **Specs** | `specs/requirements.md` | Requirements funcionales y no funcionales |
| | `specs/scenarios.md` | Casos GIVEN/WHEN/THEN |
| **Design** | `design.md` | Enfoque técnico, diagramas, decisiones |
| **Tasks** | `tasks.md` | Checklist de implementación, orden de dependencias |
| **Archive** | `archive/` | Cambios completados con spec deltas |

#### OpenSpec + OpenCode: flujo real

Con OpenSpec, todo esto se maneja con comandos slash desde la TUI de OpenCode:

```
# 1. Explorá sin compromiso
/opsx:explore "Quiero agregar autenticación biométrica"

# 2. Creá el proposal formal
/opsx:propose add-biometric-auth

# 3. Iterá specs con el AI
/opsx:continue add-biometric-auth

# 4. Implementá tarea por tarea
/opsx:apply

# 5. Archivá al completar
/opsx:archive

# 6. Verificá que la impl cumpla specs
/opsx:verify
```

#### SDD sin OpenSpec (GitHub Spec Kit / manual)

Si preferís no instalar OpenSpec, podés crear la estructura manualmente:

```
tu-proyecto/
├── .specify/                    # GitHub Spec Kit
│   ├── templates/               # Templates de specs
│   └── prompts/                 # Prompts por herramienta
└── changes/
    └── add-search/
        ├── spec.md
        ├── technical-plan.md
        └── tasks.md
```

### 📁 Estructura de carpetas de un proyecto OpenCode

Esta es la estructura recomendada para cualquier proyecto que use OpenCode:

```
tu-proyecto/
├── AGENTS.md                    # 📜 Reglas de proyecto para OpenCode (generado con /init)
├── opencode.json                # ⚙️ Configuración principal del proyecto
├── tui.json                     # 🎨 Tema y personalización de la TUI
│
├── .opencode/                   # 🧩 Configuración por proyecto
│   ├── agents/                  # Agentes personalizados (.md)
│   │   ├── code-reviewer.md     #   Ej: revisor de código
│   │   └── tester.md            #   Ej: generador de tests
│   ├── commands/                # Comandos slash personalizados (.md)
│   │   ├── test.md              #   /test
│   │   ├── deploy.md            #   /deploy
│   │   └── lint.md              #   /lint
│   ├── skills/                  # Skills reutilizables
│   └── plugins/                 # Plugins locales
│
├── openspec/                    # 📋 SDD (si usás OpenSpec)
│   ├── spec-library/            # Specs acumulados
│   └── changes/                 # Cambios en progreso
│       └── mi-feature/
│           ├── proposal.md
│           ├── specs/
│           │   ├── requirements.md
│           │   └── scenarios.md
│           ├── design.md
│           └── tasks.md
│
├── ~/.config/opencode/          # 🏠 Configuración global
│   ├── opencode.json            # Config global (proveedores, plugins)
│   ├── AGENTS.md                # Reglas personales globales
│   ├── tui.json                 # Tema global
│   ├── agents/                  # Agentes globales
│   ├── commands/                # Comandos globales
│   └── skills/                  # Skills globales
│
└── .opencode/                   # (en la raíz del proyecto, ver arriba)
```

#### AGENTS.md — el corazón de tu proyecto

`/init` escanea tu repo y genera un `AGENTS.md` con:

- Comandos de build, lint y test
- Arquitectura y estructura del repo
- Convenciones del proyecto
- Setup quirks y gotchas operativos

Ejemplo:

```markdown
# Mi Proyecto

Monorepo con Next.js + Prisma + Stripe.
Usamos TypeScript strict mode, bun como package manager.

## Estructura

- `packages/web/` — Frontend Next.js
- `packages/api/` — API routes
- `packages/shared/` — Tipos y utilidades compartidas
- `infra/` — Terraform y configs de infraestructura

## Comandos

- Build: `bun run build`
- Test: `bun run test`
- Lint: `bun run lint`
- Migrate DB: `bun run db:migrate`

## Convenciones

- Feature flags en `packages/shared/flags.ts`
- Las API routes usan `zod` para validación
- Los componentes nuevos van en `packages/web/components/` con su propio `.module.css`
```

#### Instrucciones externas

Podés referenciar archivos externos como reglas:

```json
{
  "instructions": [
    "docs/development-standards.md",
    "test/testing-guidelines.md",
    ".cursor/rules/*.md",
    "https://raw.githubusercontent.com/mi-org/shared-rules/main/style.md"
  ]
}
```

---

## 🔁 Loop Engineering — Diseñá loops, no prompts

> *"You shouldn't be prompting coding agents anymore. You should be designing loops that prompt your agents."* — Peter Steinberger

**Loop Engineering** es la práctica de diseñar sistemas que orquestan automáticamente a los agentes de IA en ciclos controlados, en lugar de escribir prompts manualmente. El loop reemplaza al humano como el que da instrucciones — el humano diseña el sistema que da instrucciones.

### ❓ ¿Por qué loops?

Un prompt resuelve una pregunta. Un loop resuelve un **proceso continuo**:

- ✅ **Descubrimiento automático** — scoutea el codebase en busca de issues, bugs, dependencias obsoletas
- ✅ **Triage en segundo plano** — clasifica problemas sin intervención humana
- ✅ **Auto-continuación** — avanza hasta completar una tarea, no se detiene después de un turno
- ✅ **Auto-reparación** — detecta y corrige problemas recurrentes
- ✅ **Ejecución headless** — loops que corren con cron, systemd, o MCP sin TUI

### 🧱 Bloques fundamentales

| Primitiva | Rol en el Loop |
|-----------|----------------|
| **Scheduling** | Disparo en cadencia (cron, systemd, automations) |
| **Worktrees** | Ramas Git aisladas para cambios riesgosos |
| **Skills** | Conocimiento persistente del proyecto |
| **Plugins / MCP** | Conexión a herramientas reales |
| **Sub-agentes** | Split maker/checker para calidad |
| **State / Memory** | Estado durable fuera de cualquier conversación |

### 🚀 Loop Engineering con OpenCode

OpenCode permite loops de varias maneras:

#### 1. Loop nativo con `/loop`

El comando `/loop` (disponible vía plugins como opencode-ralph-loop o goal-plugin) hace que el agente se auto-continúe hasta completar la tarea:

```
/loop Implementar login con Google OAuth siguiendo @docs/auth.md
```

El loop:
1. Arranca la implementación
2. Cuando termina un paso, detecta si quedan tareas pendientes
3. Se reactiva automáticamente
4. Sigue hasta completar o bloquearse
5. Documenta blockers si no puede avanzar

#### 2. Loop headless con cron + `opencode run`

```bash
# Triage diario del codebase
0 7 * * * cd /ruta/proyecto && opencode run "Run triage on uncommitted changes. Read STATE.md. Update priority list. No auto-fix."

# Verificación de dependencias semanal
0 9 * * 1 cd /ruta/proyecto && opencode run "Check for outdated dependencies and known vulnerabilities. Report findings."
```

#### 3. loop-engineering (cobusgreyling)

El repo [github.com/cobusgreyling/loop-engineering](https://github.com/cobusgreyling/loop-engineering) provee herramientas CLI:

```bash
# Inicializar loop en un proyecto
npx @cobusgreyling/loop-init . --pattern daily-triage --tool opencode

# Auditar readiness del loop (score 0-100)
npx @cobusgreyling/loop-audit . --suggest

# Estimar costos
npx @cobusgreyling/loop-cost --pattern daily-triage --level L1 --cadence 1d
```

### 🧩 Patrones de loop comunes

| Patrón | Cadencia | Descripción |
|--------|----------|-------------|
| **Daily Triage** | 1d | Revisa cambios, issues, deuda técnica, actualiza STATE.md |
| **CI Sweeper** | 5m | Detecta fallos en CI, los clasifica y asigna |
| **Dependency Patrol** | 1w | Busca dependencias obsoletas o vulnerables |
| **Architecture Audit** | 1w | Revisa consistencia arquitectónica |
| **Auto-Fix Loop** | on-demand | Detecta, aísla en worktree, corrige, verifica, mergea |
| **Goal Loop** | on-demand | /goal mantiene un objetivo hasta completarlo |

### ⚠️ Safety en loops

- **Semana 1: report only** — no auto-fix, no auto-merge. Leé lo que el loop escribe
- **Circuit breaker** — max iteraciones, mismo error N veces seguidas, budget de tokens
- **Worktrees** — cambios aislados hasta que un humano o verifier los apruebe
- **Budget control** — loop-cost + circuit breaker contra runaway costs

---

## 🧠 RAG en OpenCode — Memoria persistente y contexto aumentado

**RAG (Retrieval-Augmented Generation)** permite que OpenCode busque información relevante en una base de conocimiento antes de responder. Es memoria de largo plazo para tu AI.

### ❓ ¿Para qué sirve?

Sin RAG, OpenCode solo ve el contexto de la conversación actual. Con RAG:

- ✅ **Memoria entre sesiones** — recordá decisiones pasadas, specs, patrones de proyecto
- ✅ **Documentación siempre fresca** — buscá en tu wiki, docs, READMEs al vuelo
- ✅ **Codebase grande** — no necesitás tener todo en contexto, buscás solo lo relevante
- ✅ **Knowledge base corporativa** — conectá a manuals, runbooks, policies
- ✅ **Specs searchables** — encontrá requirements sin tenerlos en el prompt

### 🛠️ Opciones de RAG para OpenCode

#### 1. MCP Memory Server (la más simple)

El MCP Server de Memory da persistencia entre sesiones:

```json
{
  "mcpServers": {
    "memory": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    }
  }
}
```

Usalo en conversación:
```
# Guardar información importante
Remember that the auth module uses JWT with refresh tokens stored in Redis.

# Recuperar después
What did we decide about the auth architecture?
```

#### 2. opencode-memory (MCPMarket)

**Opencode Memory** es un memory layer local-first que indexa wikis markdown con búsqueda híbrida:

Características:
- Indexación continua de archivos markdown
- Búsqueda híbrida (semántica + keyword)
- Estructuras de proyecto (milestones, epics, tasks)
- Local-first — tus datos no salen de tu máquina

#### 3. opencode-local-rag (OthmanB)

Stack completo local: FastAPI + SentenceTransformers + Qdrant:

```bash
# 1. Embedder (FastAPI + BGE embeddings)
pip install -r requirements.txt
uvicorn app:app --port 8010

# 2. Qdrant (vector DB)
docker run --rm -p 6333:6333 qdrant/qdrant:latest

# 3. Plugin OpenCode
cd opencode-rag-local && npm run setup
```

Comandos disponibles:

| Comando | Descripción |
|---------|-------------|
| `rag_search <query>` | Buscar en la base vectorial |
| `rag_upsert <id> <text>` | Insertar/actualizar documentos |
| `rag_ingest <path>` | Indexar archivos desde disco |
| `rag_reindex` | Reconstruir la colección desde cero |

#### 4. RAG vía MCP + servicios externos

Podés conectar cualquier vector store via MCP:

```json
{
  "mcpServers": {
    "rag-pipeline": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@cobusgreyling/loop-mcp-server"]
    }
  }
}
```

O usar herramientas como LlamaIndex para crear pipelines RAG custom que alimenten a OpenCode.

### 💡 Buenas prácticas con RAG

- **Indexá lo que usás** — no indexes todo el repo, solo docs, specs, y patrones recurrentes
- **Chunking inteligente** — dividí documentos en fragmentos de ~500 tokens con overlap
- **Metadata rica** — agregá tags, fecha, y fuente a cada documento para filtrar mejor
- **Refresh periódico** — reindexá cuando cambien las fuentes (podés loopearlo con cron)
- **Híbrido > solo semántico** — combiná búsqueda semántica con keyword (BM25) para mejores resultados

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

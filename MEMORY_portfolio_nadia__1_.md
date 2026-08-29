# Portfolio Nadia Cabrera Salazar — Decisiones de Diseño
*Documento de referencia para Claude Code*

---

## Tipografía

| Uso | Fuente | Peso | Tamaño | Color |
|-----|--------|------|--------|-------|
| Títulos principales (H1) | Lora | 400 (regular) | 38–52px | `--color-accent-dark` |
| Subtítulos | Lora | 400 italic | 14–16px | `--color-accent` |
| Números destacados (métricas) | Lora | 400 | 26–28px | `--color-accent` |
| Citas o frases destacadas | Lora | 400 italic | 14px | `--color-accent` |
| Captions de imagen | Lora | 400 italic | 12px | `--color-muted` |
| Cuerpo de texto | Satoshi | 400 | 13–14px | `--color-text` |
| Labels / caps | Satoshi | 400 | 10px | `--color-muted` |
| Tags de herramientas | Satoshi | 400 | 10px | `--color-accent` |
| Navegación | Satoshi | 400 | 11–12px | `--color-accent` |
| Año en cards | Satoshi | 400 | 10px | `--color-light` |

- Letter-spacing labels: `0.12–0.14em`
- Line-height cuerpo: `1.8`
- Line-height títulos: `1.0–1.1`
- Google Fonts: `Lora` · importar desde CDN
- Satoshi: descargar desde fontshare.com e incluir en `/public/fonts/`

---

## Paleta de colores

```css
--color-accent:      #8B3A2A;   /* terracota — color principal, links, tags, botones */
--color-accent-dark: #3D2B1F;   /* marrón oscuro — títulos H1, texto fuerte */
--color-bg:          #F5F0E8;   /* crema — fondo de toda la web */
--color-muted:       #9C7B65;   /* captions, labels, section-labels */
--color-text:        #6B5147;   /* cuerpo de texto general */
--color-light:       #C4A882;   /* años en cards, números secundarios */
--color-card-bg:     #EDE5D8;   /* fondo cards de navegación prev/next */
--color-border:      rgba(61,43,31,0.12); /* separadores y bordes entre cards */
```

*Para cambiar toda la paleta al azul pizarra: `--color-accent: #2A4A6B`*

---

## Estructura de la web — secciones en orden

```
Nav (fija)
  └── Nadia Cabrera Salazar (izq) | About · Experience · Projects · Contact (der)

Home / Hero
  └── Texto izq: Hello, I'm Nadia Cabrera Salazar · Urban Spatial Scientist · tagline · botones
  └── Foto der: 800×960px vertical, fondo neutro

About (scroll o tab)
  └── Párrafo bio · skills · CV download

Experience (scroll o tab)
  └── Timeline o lista de experiencia profesional

Projects (scroll o tab)
  └── Selected work — ver sección Projects

Contact (scroll o tab)
  └── Email · LinkedIn · formulario simple
```

Scroll continuo = misma secuencia que tabs. Hacer click en un tab hace scroll a esa sección.

---

## Página de proyectos — grid

- **2 columnas**
- Imagen proporción **16:7** (1400×613px)
- Info debajo de la imagen: categoría · título · descripción · año
- Hover: zoom suave `transform: scale(1.03)` en la imagen
- Bordes entre cards: `0.5px solid rgba(61,43,31,0.12)`
- Sin border-radius en las cards, solo `3px` en las imágenes
- Sin sombras

### Filtros
```
All  /  Data  /  Urban design
```
- Satoshi 11px uppercase
- Activo: color terracota + border-bottom 1px terracota

---

## Página individual de proyecto

### Estructura en orden (sin hero banner)

```
1. Nav  ←  con "← All projects" a la izquierda

2. Title block  (grid 2 col, padding 3rem 2.5rem)
   izq: category label · título H1 · subtítulo italic · metadata vertical · tool tags
   der: overview (2 párrafos máx) 

3. Metrics bar  (grid 3 col, border top y bottom)
   número en Lora terracota · label en Satoshi caps

4. Secciones de imágenes  (repetir según proyecto)
   section-label (Satoshi caps, border-bottom)
   imagen full width  o  grid 2 col  o  grid 3 col
   caption en Lora italic

5. Text block  (grid 2 col)
   heading en Lora · párrafo en Satoshi

6. Botón "→ Explore the app"  (solo si tiene web externa)

7. Navegación prev / next
   fondo --color-card-bg · título del proyecto anterior y siguiente
```

### Metadata por tipo de proyecto

**Proyectos de data académicos:**
```
Year · Institution · Module · Tools
(sin Role, sin Team si es individual)
```

**Proyectos de data grupales:**
```
Year · Institution · Team · Tools · Link repo (collaborative project)
```

**Proyectos profesionales (BID):**
```
Year · Organisation · Location · Tools
```

**Proyectos de diseño urbano:**
```
Year · Location · Client · Role · Team
```

---

## Componentes — lista

```
Nav.jsx             → navegación fija, nombre izq, links der
Hero.jsx            → sección hero home, grid 2 col texto+foto
ProjectCard.jsx     → card individual con imagen 16:7 + info
ProjectGrid.jsx     → grid 2 col + filtros All/Data/Urban design
ProjectPage.jsx     → página individual de proyecto
Footer.jsx          → footer simple con email y LinkedIn
```

---

## Imágenes — medidas definitivas

```
og-image.jpg              → 1200 × 630px   (Open Graph para redes)
nadia-photo.jpg           → 800 × 960px    (hero home, vertical)
card hero (todas)         → 1400 × 613px   (proporción 16:7)
imágenes internas         → 1400 × 560px   (proporción 16:6.4)
```

- Formato: JPG para fotos y screenshots · PNG para planos con fondo blanco
- Calidad: 80–85% en squoosh.app
- Peso objetivo: 150–350kb por imagen
- ppi: 96 (el navegador solo usa píxeles totales)
- Imágenes PNG con fondo blanco: CSS `mix-blend-mode: multiply` sobre crema

### Carpetas y nombres
```
public/images/projects/{project-id}/
  hero.jpg    ← usada también como card thumbnail (CSS recorta)
  01.jpg
  02.jpg
  03.jpg
  ...
```

---

## Decisiones de navegación entre proyectos

- Al final de cada proyecto: cards prev / next con fondo `--color-card-bg`
- Sin border-radius
- Label "← Previous" / "Next →" en Satoshi caps muted
- Título del proyecto en Lora

---

## Decisiones sobre GitHub

| Proyecto | Tipo | GitHub |
|----------|------|--------|
| Food Shock | Grupal | Link al repo del equipo + nota "collaborative project" |
| Cordillera Blanca | Grupal | Link al repo del equipo + nota "collaborative project" |
| Heat & Inequality | Individual | Repo propio de Nadia |
| Access Without Opportunity | Individual | Repo propio de Nadia |
| Resto | — | No aplica |

Opción recomendada para grupales: GitHub Gist con la contribución específica de Nadia.

---

## Decisiones sobre proyectos web externos

Proyectos con `external_url` en el JSON muestran:
- Botón `→ Explore the app` antes de la navegación prev/next
- Screenshots de las funcionalidades principales dentro de la página
- **No** se embebe con iframe

---

## CSS — reglas generales

```css
/* Sin sombras en ningún elemento */
box-shadow: none;

/* Border-radius solo en imágenes */
img { border-radius: 3px; }

/* Separadores */
border: 0.5px solid rgba(61,43,31,0.12);

/* Botón primario */
background: var(--color-accent);
color: var(--color-bg);
padding: 12px 28px;
border-radius: 2px;
font-family: var(--font-sans);
font-size: 11px;
letter-spacing: 0.1em;
text-transform: uppercase;

/* Hover en cards */
.card:hover .card-img { transform: scale(1.03); transition: 0.4s ease; }
```

---

## vite.config.js

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

---

## Notas finales para Claude Code

1. Los colores están en `src/styles/tokens.css` como variables CSS — cambiar el acento en un solo lugar actualiza toda la web.
2. Todo el contenido viene de `src/content/projects.json` — no hay texto hardcodeado en los componentes.
3. Las rutas de proyecto se generan automáticamente desde el campo `id` del JSON → `/projects/{id}`
4. El campo `category` del JSON controla los filtros: `"data"` o `"urban-design"`
5. El campo `external_url` controla si aparece el botón "→ Explore the app"
6. Imágenes con fondo blanco (planos de diseño urbano): aplicar `mix-blend-mode: multiply` en CSS

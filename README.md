# Nadia Cabrera Salazar — Portfolio

Personal portfolio website built with Vite + React.

## Stack

- **Framework**: Vite + React 18
- **Routing**: React Router v6
- **Fonts**: Lora (serif, headings) + Satoshi (sans-serif, body)
- **Content**: projects.json (single source of truth for all project data)
- **Hosting**: Vercel (recommended)

## Design tokens

All colours and fonts are defined as CSS variables in `src/styles/tokens.css`.
To change the accent colour across the entire site, update a single variable:

```css
--color-accent:     #8B3A2A;   /* terracota — change here to switch palette */
--color-accent-dark:#3D2B1F;   /* dark brown — headings and text */
--color-bg:         #F5F0E8;   /* cream background */
--color-muted:      #9C7B65;   /* captions, labels, secondary text */
--font-serif:       'Lora', Georgia, serif;
--font-sans:        'Satoshi', system-ui, sans-serif;
```

## Project structure

```
nadia-portfolio/
├── public/
│   └── images/
│       ├── hero/
│       │   └── nadia-photo.jpg
│       └── projects/
│           ├── food-shock/
│           │   ├── hero.jpg
│           │   ├── 01.jpg
│           │   └── 02.jpg
│           ├── life-at-altitude/
│           ├── cordillera-blanca/
│           ├── bid/
│           ├── heat-inequality/
│           ├── access-opportunity/
│           ├── rio-rimac/
│           ├── hidrogeomorfologico/
│           ├── monserrate/
│           └── av-tacna/
├── src/
│   ├── content/
│   │   └── projects.json       ← all project content lives here
│   ├── components/
│   │   ├── Nav.jsx
│   │   ├── Hero.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── ProjectGrid.jsx
│   │   ├── ProjectPage.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── Project.jsx
│   ├── styles/
│   │   ├── tokens.css          ← colours, fonts, spacing
│   │   └── global.css
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── vite.config.js
└── README.md
```

## Getting started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment (Vercel)

1. Push to GitHub
2. Connect repo in vercel.com
3. Deploy — Vercel auto-detects Vite, no config needed

## Adding or editing a project

All content is in `src/content/projects.json`.
Each project follows this structure — add a new object to the `projects` array
and drop the images in `public/images/projects/{project-id}/`.
The route `/projects/{id}` is generated automatically from the `id` field.

## Image guidelines

- **hero.jpg** — 1400×800px minimum, landscape orientation
- **01.jpg, 02.jpg...** — 1200×800px minimum
- Format: JPG for photos, PNG for plans/diagrams with white background
- White-background images render correctly via CSS `mix-blend-mode: multiply`
  on the cream background — no manual editing needed

# Saksham Kumar Ray — Portfolio

A responsive personal introduction website and project showcase, designed with a crisp tech-inspired look, charcoal/purple/blue colors, a glowing abstract hero visual, and a responsive bento project grid. It uses plain HTML, CSS, and JavaScript with no build step.

## Run locally

Install Python 3, open a terminal in this folder, and run:

```powershell
py -m http.server 8000
```

Visit <http://localhost:8000/> and stop the server with `Ctrl+C`. You can also open `index.html` directly; the email copy button works best from a local server.

## Customize

Update the introduction, education, contact details, skills, and project cards in `index.html`. The project cards are editable placeholders until you add your own work. Keep the `data-category` values (`design`, `development`, `experiments`) to use the category filters.

The theme button switches between dark and light palettes and saves your choice in the browser. Skill logos are inline SVGs, so they work offline. The rounded font stack uses fonts available on each device, with sensible fallbacks.

## Main files

- `index.html` — page content and inline skill icons
- `style.css` — original layout foundations
- `theme.css` — theme colors and responsive navigation
- `motion.css` — scroll reveals, hover feedback, and continuous motion
- `refresh.css` — current visual design, responsive bento grid, and abstract hero art
- `script.js` — theme toggle, project filters, and interactions

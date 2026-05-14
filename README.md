# Lenz Photography Portfolio

## Overview
A lightweight, mobile‑first photography portfolio website showcasing the work of **Lenz Photography**. The site is built with pure **HTML5**, **CSS3**, and **Vanilla JavaScript**. It features a responsive hero section, a grid‑based gallery, photographer bios, and an About page. All assets are static, making the site fast, easy to host, and simple to maintain.

## Live Demo
Open `index.html` in any modern browser (Chrome, Firefox, Edge, Safari) to view the site locally. No server is required.

## Folder Structure
```
LENZ PHOTOGRAPHY/
├── index.html            # Home page / gallery
├── about.html            # About Lenz Photography
├── photographers.html    # Photographer bios
├── css/
│   └── style.css         # Main stylesheet (responsive, glassmorphism, micro‑animations)
├── js/
│   └── app.js            # Interactive behaviours (lightbox, navigation)
└── assets/               # Image assets (photos, logos, etc.)
```

## Technologies
- **HTML5** – Semantic markup for accessibility and SEO.
- **CSS3** – Custom design system with modern aesthetics: vibrant gradients, glass‑morphism, subtle micro‑animations, and a dark‑mode‑friendly color palette.
- **JavaScript (ES6+)** – Vanilla scripts for lightbox functionality, smooth scrolling, and interactive UI components.

## Setup & Development
1. **Clone / copy** the repository to a local directory.
2. **Add images** to the `assets/` folder and reference them in the HTML files.
3. Open `index.html` (or any other page) in a browser to test.
4. Modify styles in `css/style.css` or behaviour in `js/app.js` as needed. The design system is centralized in the CSS file for easy theming.

## Customisation
- **Colors & Typography** – Update the root CSS variables in `style.css` to change the primary palette or switch fonts (e.g., Google Font *Inter* is used by default).
- **Gallery Layout** – Adjust the CSS Grid definitions in `style.css` to change columns or gutter size.
- **JavaScript Features** – Extend `app.js` to add new interactive components such as a contact form or booking widget.

## Accessibility
- Semantic HTML tags (`<header>`, `<nav>`, `<section>`, `<article>`) improve screen‑reader navigation.
- All images should include descriptive `alt` attributes.
- Keyboard navigation is supported for the lightbox and menu.

## SEO Best Practices
- Each page includes a descriptive `<title>` and `<meta name="description">`.
- Proper heading hierarchy (`<h1>` per page, followed by `<h2>`, `<h3>`).
- Open Graph tags can be added to `index.html` for richer sharing.

## License
This project is released under the **MIT License** – feel free to use, modify, and distribute.

---
*Generated on 2026‑05‑14 by Antigravity – your AI coding assistant.*

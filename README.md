# Damien Sullins — Personal Portfolio

Premium static portfolio website for Damien Sullins, Broadcast Production student and creative technologist based in Springfield, Missouri.

## Stack

- Pure HTML, CSS, and vanilla JavaScript
- No build step required
- Dark theme, glassmorphism, grain overlay, smooth scroll reveals
- Responsive and accessible

## Structure

```
portfolio/
├── index.html              # Main portfolio page
├── css/styles.css          # All styles
├── js/main.js              # Interactions, reveals, form, cursor
├── projects/
│   ├── just-the-news.html
│   ├── pins.html
│   ├── the-checkpoint.html
│   ├── rock-almighty.html
│   └── cls.html
└── assets/images/          # Add project screenshots / OG image here
```

## Running locally

Open `index.html` in a browser, or serve the folder:

```bash
npx serve .
# or
python3 -m http.server 8000
```

## Customization

- **Stats**: Update `data-target` values on the stat numbers in `index.html`
- **Social links**: Replace `yourusername` placeholders in the contact section and JSON-LD
- **Email**: Update `mailto:` and displayed address
- **Project screenshots**: Replace the emoji placeholders with real images when available
- **Accent color**: Change `--accent` in `css/styles.css` (`:root`)

## Design notes

Inspired by Apple, Linear, Vercel, and Framer — minimal, cinematic, dark, with one accent (indigo/violet). Focus on storytelling over a typical developer portfolio layout.

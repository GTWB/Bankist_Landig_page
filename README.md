# Bankist – Landing Page 🏦

A modern, performance-friendly landing page for a fictional bank.  
Built with **HTML, CSS, and vanilla JavaScript**, focusing on smooth interactions, animations, and clean UI.

🔗 **Live Demo:** [Bankist Landing Page](https://gtwb.github.io/Bankist_Landig_page/)

---

## ✨ Features

- Modal dialog for **Sign Up / Learn More**
- **Smooth scrolling** to sections
- Page navigation with **event delegation** (efficient performance)
- **Tabbed component** for operations/features
- **Sticky navigation bar** with `IntersectionObserver`
- **Reveal sections on scroll** (progressive disclosure)
- **Lazy-loading images** (`data-src` swap for performance)
- **Slider/Carousel** with:
  - Arrow key navigation
  - Dots for slide control
- **Navigation fade effect** on hover

---

## 🧱 Tech Stack

- **HTML5** (semantic structure)
- **CSS3** (Flexbox/Grid, custom properties)
- **JavaScript ES6+**
  - `IntersectionObserver` API
  - Event delegation
- **No frameworks** required

---

## 🚀 Getting Started

### Option 1 – Open locally

1. Clone/download the repository.
2. Open `index.html` directly in your browser.

### Option 2 – Run with Live Server (recommended)

If you use VS Code:

1. Install the extension **Live Server**.
2. Right-click `index.html` → **Open with Live Server**.

---

## 🔧 Key Implementation Details

- **Navigation fade effect:** reduces opacity of sibling links on hover.
- **Sticky navbar:** observes `.header` and toggles `.sticky`.
- **Section reveal:** hides sections with `.section--hidden`, reveals on scroll.
- **Lazy images:** swap `src` from `data-src` and remove `.lazy-img` after load.
- **Tabs:** toggle `.operations__content--active` with `data-tab`.
- **Slider:** moves slides with `translateX(%)`; synced with dot navigation.

---

## 🙏 Acknowledgements

Inspired by the **Bankist project** in Jonas Schmedtmann’s JavaScript course.  
Extended and adapted for practice and learning purposes.

---

## 📜 License

MIT License – free to use, modify, and distribute.

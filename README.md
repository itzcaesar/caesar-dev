# M. Caesar Rifqi - Portfolio

A modern, interactive portfolio website showcasing my work as a Software Engineer and Game Developer. Built with React, TypeScript, and Tailwind CSS.

## 🌟 Features

- **Bilingual Support**: Toggle between English and Indonesian languages
- **Dark Theme**: Sleek dark mode design with accent lime (#ccff00)
- **Interactive Animations**: Framer Motion animations throughout
- **Custom Cursor**: Desktop-only custom cursor with interactive states
- **Responsive Design**: Fully responsive across all devices
- **Project Showcase**: Display of real GitHub projects with live links
- **Collapsible Skills**: Organized skills by category (Game Development & Full Stack)
- **Smooth Scrolling**: Navigation with smooth scroll behavior

## 🛠️ Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/itzcaesar/caesar-dev.git
cd caesar-dev
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## 📁 Project Structure

```
├── components/
│   ├── Layout/
│   │   ├── CustomCursor.tsx
│   │   ├── GridBackground.tsx
│   │   ├── Navigation.tsx
│   │   ├── ParticleBackground.tsx
│   │   └── RevealOnScroll.tsx
│   └── Sections/
│       ├── About.tsx
│       ├── Contact.tsx
│       ├── Hero.tsx
│       ├── Projects.tsx
│       └── Skills.tsx
├── contexts/
│   └── AppContext.tsx
├── locales/
│   └── translations.ts
├── constants.ts
├── types.ts
└── App.tsx
```

## 🌐 Sections

- **Hero**: Landing section with name, roles, and social links
- **About**: Background, education, and focus areas
- **Projects**: Showcase of 4 pinned GitHub repositories
- **Skills**: Collapsible categories of technical skills
- **Contact**: Contact information and social links

## 🎨 Customization

### Colors

The color scheme is defined in `index.html` using Tailwind config:

- **Black**: `#050505` - Deep black background
- **Accent**: `#ccff00` - Acid lime for highlights
- **White**: `#ffffff` - Text color

### Translations

Add or modify translations in `locales/translations.ts` for both English and Indonesian.

### Projects

Update your projects in `constants.ts` in the `PROJECTS` array.

### Skills

Modify skills in `constants.ts` in the `SKILLS` array.

## 📦 Build

To create a production build:

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Muhammad Caesar Rifqi**

- GitHub: [@itzcaesar](https://github.com/itzcaesar)
- Instagram: [@caesarfqi](https://instagram.com/caesarfqi)
- Email: muhammadcaesarrifqi@gmail.com

## 🙏 Acknowledgments

- Design inspiration from modern cyberpunk aesthetics
- Icons by [Lucide](https://lucide.dev)
- Fonts: Space Grotesk & JetBrains Mono

---

Built with ❤️ by Caesar

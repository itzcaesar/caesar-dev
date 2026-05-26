# M. Caesar Rifqi - Portfolio

A modern, interactive portfolio website showcasing my work as a Software Engineer and Game Developer. Built with Next.js, React, TypeScript, Tailwind CSS, and Payload CMS.

## 🌟 Features

- **Bilingual Support**: Toggle between English and Indonesian languages
- **Dark Theme**: Sleek dark mode design with accent lime (#ccff00)
- **Interactive Animations**: Framer Motion animations throughout
- **Custom Cursor**: Desktop-only custom cursor with interactive states
- **Responsive Design**: Fully responsive across all devices
- **Project Showcase**: Display of real GitHub projects with live links
- **Collapsible Skills**: Organized skills by category (Game Development & Full Stack)
- **Smooth Scrolling**: Navigation with smooth scroll behavior
- **Payload CMS**: Manage all visible site content from `/admin`

## 🛠️ Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Next.js** - React framework and app router
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **Payload CMS** - Content management
- **Postgres** - Dockerized CMS database

## 🚀 Getting Started

### Prerequisites

- Node.js (v20.9 or higher)
- npm or yarn
- Docker Desktop

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

3. Configure environment variables:
```bash
cp .env.example .env
```

Set `PAYLOAD_SECRET` to a long random string before production.

4. Start Postgres:
```bash
npm run db:up
```

The local Postgres container maps to `localhost:5433` because `5432` is commonly already occupied on Windows development machines.

5. Seed the CMS with the current portfolio content:
```bash
npm run seed
```

6. Start the development server:
```bash
npm run dev
```

7. Open your browser and navigate to `http://localhost:3000`

8. Open `http://localhost:3000/admin` to create or manage the Payload user and content.

## 📁 Project Structure

```
├── app/
│   ├── (frontend)/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── works/
│   │       └── page.tsx
│   ├── (payload)/
│   │   ├── admin/
│   │   ├── api/
│   │   └── layout.tsx
│   ├── globals.css
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
├── docker-compose.yml
├── migrations/
├── public/
│   └── media/
├── lib/
│   └── portfolio-data.ts
├── views/
│   ├── MainPage.tsx
│   └── WorksPage.tsx
├── payload.config.ts
├── scripts/
│   └── seed.ts
└── types.ts
```

## 🌐 Sections

- **Hero**: Landing section with name, roles, and social links
- **About**: Background, education, and focus areas
- **Projects**: Showcase of 4 pinned GitHub repositories
- **Skills**: Collapsible categories of technical skills
- **Contact**: Contact information and social links

## 🎨 Customization

### Colors

The color scheme is defined in `tailwind.config.ts`:

- **Black**: `#050505` - Deep black background
- **Accent**: `#ccff00` - Acid lime for highlights
- **White**: `#ffffff` - Text color

### Site Copy

Manage localized site copy, metadata, navigation, footer, social links, and UI labels in Payload globals.

### Projects

Manage projects in Payload under `Projects`.

### Skills

Manage skills in Payload under `Skills`.

### Work Experience

Manage experience entries in Payload under `Work Experiences`. Use the `order` field to control display order when data comes from the CMS.

### Database

Start and stop the local database:

```bash
npm run db:up
npm run db:down
```

Run migrations:

```bash
npm run payload:migrate
```

### Payload Types

Regenerate Payload types after schema changes:

```bash
npm run payload:generate-types
```

## 📦 Build

To create a production build:

```bash
npm run build
```

Next.js writes production build output to the `.next/` directory.

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

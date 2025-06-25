# AxionLab - AI Research Laboratory Website

A modern, professional website for AxionLab, an AI research laboratory focused on bridging neurons and networks. Built with Next.js 14+ and designed to showcase cutting-edge research, projects, and team expertise.

## 🌟 Features

### Core Pages
- **Homepage**: Hero section with mission statement, featured research, and statistics
- **Research & Publications**: Filterable gallery of research papers with search functionality
- **Projects**: Showcase of open-source projects and research implementations
- **Blog**: Research insights, tutorials, and lab updates with category filtering
- **Team**: Comprehensive team profiles with research interests and contact links
- **About**: Mission, values, achievements, and contact information

### Technical Features
- **Next.js 14+** with App Router for optimal performance
- **Responsive Design** that works seamlessly across all devices
- **Dark Mode Support** with system preference detection
- **Framer Motion** animations for smooth, professional interactions
- **MDX Support** for rich content management
- **SEO Optimized** with proper meta tags and Open Graph support
- **TypeScript** for type safety and better development experience
- **Tailwind CSS** for modern, utility-first styling

### Design System
- Custom neural network-inspired gradient themes
- Professional color palette with accessibility considerations
- Consistent component library built with Radix UI primitives
- Smooth animations and micro-interactions
- Glass-effect components and neural pulse animations

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or later
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the website.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js 14 App Router pages
│   ├── layout.tsx         # Root layout with theme provider
│   ├── page.tsx           # Homepage
│   ├── research/          # Research & publications page
│   ├── projects/          # Projects showcase
│   ├── blog/              # Blog and insights
│   ├── team/              # Team profiles
│   └── about/             # About and contact
├── components/            # Reusable UI components
│   ├── ui/                # Base UI components (Button, Card, etc.)
│   ├── navigation.tsx     # Site navigation with theme toggle
│   ├── footer.tsx         # Site footer
│   └── theme-provider.tsx # Theme management
├── lib/                   # Utility functions
│   └── utils.ts           # Common utilities
└── globals.css            # Global styles and CSS variables
```

## 🎨 Design System

### Colors
- **Primary**: Blue gradient (#667eea to #764ba2)
- **Neural**: Custom neural network inspired gradients
- **Background**: Dynamic based on theme (light/dark)
- **Foreground**: High contrast text colors
- **Muted**: Secondary text and backgrounds

### Typography
- **Primary Font**: Inter (Google Fonts)
- **Monospace**: JetBrains Mono for code snippets
- Responsive typography scales

### Components
All components are built with accessibility in mind and include:
- Proper ARIA labels
- Keyboard navigation support
- Focus management
- Screen reader compatibility

## 🛠 Technology Stack

### Core Framework
- **Next.js 14+**: React framework with App Router
- **React 18**: Latest React features and performance improvements
- **TypeScript**: Type-safe development

### Styling & UI
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Unstyled, accessible UI primitives
- **Lucide React**: Modern icon library
- **Framer Motion**: Animation library
- **Class Variance Authority**: Type-safe component variants

### Content Management
- **MDX**: Markdown with JSX for rich content
- **@next/mdx**: Official Next.js MDX integration
- **@tailwindcss/typography**: Beautiful typographic defaults

### Development Tools
- **ESLint**: Code linting
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing

## 📱 Responsive Design

The website is fully responsive and optimized for:
- **Mobile devices** (320px and up)
- **Tablets** (768px and up)
- **Desktop** (1024px and up)
- **Large screens** (1440px and up)

## ♿ Accessibility

- WCAG 2.1 AA compliance
- Semantic HTML structure
- Proper heading hierarchy
- Alt text for all images
- Keyboard navigation support
- Focus indicators
- Screen reader compatibility

## 🔧 Customization

### Adding New Content

1. **Research Papers**: Add entries to the `publications` array in `src/app/research/page.tsx`
2. **Projects**: Update the `projects` array in `src/app/projects/page.tsx`
3. **Blog Posts**: Add entries to the `blogPosts` array in `src/app/blog/page.tsx`
4. **Team Members**: Update the `teamMembers` array in `src/app/team/page.tsx`

### Styling
- Modify `tailwind.config.ts` for design system changes
- Update CSS variables in `src/app/globals.css` for theme customization
- Component styles can be adjusted using Tailwind utility classes

### Adding New Pages
1. Create a new directory in `src/app/`
2. Add a `page.tsx` file with your component
3. Update navigation in `src/components/navigation.tsx`

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to a Git repository
2. Connect your repository to Vercel
3. Deploy with zero configuration

### Other Platforms
The website can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Cloudflare Pages
- Railway
- Digital Ocean App Platform

## 📄 License

This project is built for AxionLab research laboratory. All rights reserved.

## 🤝 Contributing

For internal team members:
1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📞 Support

For technical issues or questions:
- **Email**: tech@axionlab.ai
- **Internal**: Contact the development team

---

**AxionLab** - Bridging Neurons and Networks: The Future of AI

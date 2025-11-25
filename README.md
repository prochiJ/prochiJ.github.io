# Portfolio - Data-Driven Multi-Design System

> **Professional portfolio website with complete JSON-driven architecture supporting multiple design themes**

[![Status](https://img.shields.io/badge/status-production-brightgreen)]()
[![Architecture](https://img.shields.io/badge/architecture-data--driven-blue)]()
[![Designs](https://img.shields.io/badge/designs-2%20active-purple)]()

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Quick Start](#quick-start)
4. [Data Structure](#data-structure)
5. [Design Systems](#design-systems)
6. [Content Management](#content-management)
7. [Development Guide](#development-guide)
8. [File Structure](#file-structure)
9. [API Reference](#api-reference)
10. [Troubleshooting](#troubleshooting)

---

## Overview

### Key Features

- **100% Data-Driven**: All content stored in JSON files, zero hardcoded content in HTML
- **Multi-Design Support**: Multiple visual themes using the same data source
- **Modular Architecture**: 11 specialized JSON files for maintainability
- **Zero Duplication**: Single source of truth for all content
- **Easy Updates**: Change content once, reflects across all designs automatically
- **Path-Aware**: Intelligent link adjustment for nested directories

### Technology Stack

- **Frontend**: Vanilla JavaScript (ES6+)
- **Styling**: CSS3 (Tailwind CSS for original design, custom CSS for minimal design)
- **Data Format**: JSON
- **Fonts**: 
  - Original: Inter, system fonts
  - Minimal: Space Grotesk, JetBrains Mono
- **Icons**: Font Awesome 6.4.0
- **Server**: Python HTTP Server (development)

---

## Architecture

### Design Philosophy

```
┌─────────────────────────┐
│   Single Data Source    │
│    (11 JSON Files)      │
└───────────┬─────────────┘
            │
    ┌───────┴───────┐
    │               │
┌───▼────┐    ┌────▼────┐
│Original│    │ Minimal │
│ Design │    │ Design  │
└────────┘    └─────────┘
```

**Core Principle**: Separation of concerns
- **Content** (JSON) - What to display
- **Structure** (HTML) - Where to display
- **Presentation** (CSS) - How to display
- **Logic** (JS) - How to build

### Benefits

✅ **Update Once**: Edit JSON → All designs update automatically  
✅ **Infinite Scalability**: Add Design #3, #4, #5... without touching data  
✅ **Maintainability**: Changes isolated to specific layers  
✅ **Consistency**: Same data ensures consistent information across designs  
✅ **Flexibility**: Each design can have completely different layouts  

---

## Quick Start

### Local Development

1. **Clone/Download** the repository

2. **Start Server**:
   ```bash
   cd Portfolio
   python3 -m http.server 8000
   ```

3. **Access Designs**:
   - Original Design: http://localhost:8000/index.html
   - Minimal Design: http://localhost:8000/index-minimal.html

### Update Content

Simply edit the JSON files in the `/data` directory:

```bash
# Update your work experience
vim data/experience.json

# Update projects
vim data/projects.json

# Changes apply to ALL designs automatically
```

---

## Data Structure

### Overview

All content is stored in `/data/` directory across 11 specialized JSON files:

| File | Purpose | Used By |
|------|---------|---------|
| `profile.json` | Personal info, social links, next role | Header, Footer, All pages |
| `home.json` | Homepage structure (hero, CTA) | Homepage |
| `about.json` | About page (hero, experience, skills, education, values) | About page |
| `projects.json` | Project portfolio items | Homepage, Projects page |
| `projects-page.json` | Projects page metadata (hero, CTA) | Projects page |
| `blogs.json` | Blog posts list | Homepage, Blogs page |
| `blogs-page.json` | Blogs page structure (hero, topics, newsletter) | Blogs page |
| `contact.json` | Contact page content (methods, quick note) | Contact page |
| `experience.json` | Detailed work history | Homepage, About page |
| `stats.json` | Statistics/metrics | Homepage |
| `footer.json` | Footer navigation & branding | All pages |

### JSON Schema Examples

#### profile.json
```json
{
  "name": "Your Name",
  "title": "Current Role",
  "email": "your@email.com",
  "location": "City, Country",
  "bio": "Professional summary",
  "nextRole": {
    "company": "Company Name",
    "role": "Role Title",
    "startDate": "Month Year",
    "type": "Full-time"
  },
  "social": {
    "linkedin": "URL",
    "github": "URL",
    "twitter": "URL"
  }
}
```

#### experience.json
```json
[
  {
    "title": "Job Title",
    "company": "Company Name",
    "period": "Month Year - Present",
    "description": "Role description",
    "achievements": [
      "Achievement 1",
      "Achievement 2"
    ],
    "technologies": ["Tech1", "Tech2"],
    "featured": true
  }
]
```

#### projects.json
```json
[
  {
    "title": "Project Name",
    "description": "Project description",
    "image": "assets/images/project.jpg",
    "tags": ["Tag1", "Tag2"],
    "link": "https://github.com/...",
    "featured": true
  }
]
```

---

## Design Systems

### Available Designs

#### 1. Original Design
- **Files**: `index.html`, `about.html`, `projects.html`, `contact.html`, `pages/blogs.html`
- **CSS**: `css/style.css`
- **Loader**: `js/content-loader.js`
- **Style**: Dark theme, gradient accents, Tailwind CSS utilities
- **Features**: Multi-column layouts, card shadows, fade-in animations

#### 2. Minimal Design
- **Files**: `index-minimal.html`, `pages/about-minimal.html`, etc.
- **CSS**: `css/style-minimal.css`
- **Loader**: `js/content-loader-minimal.js`
- **Style**: Clean, centered (900px), light/dark mode auto-detect
- **Features**: Bordered cards, subtle animations, timeline layout

### Design Comparison

| Aspect | Original | Minimal |
|--------|----------|---------|
| **Max Width** | 1400px | 900px |
| **Layout** | Wide, multi-column | Narrow, centered |
| **Color Scheme** | Dark with gradients | Auto light/dark |
| **Typography** | Inter, system fonts | Space Grotesk, JetBrains Mono |
| **Cards** | Shadowed, gradient | Bordered, clean |
| **Navigation** | Full navbar with gradients | Minimal sticky header |
| **Experience** | Grid of cards | Timeline with dots |
| **Footer** | Multi-column with gradients | Simple centered |
| **Animations** | Fade-in on scroll | Hover effects |

---

## Content Management

### Updating Content

#### Update Profile Information
```bash
# Edit data/profile.json
{
  "name": "New Name",
  "title": "New Title",
  "nextRole": {
    "company": "Stripe",
    "role": "Software Engineer",
    "startDate": "May 2026"
  }
}
```

#### Add New Project
```bash
# Edit data/projects.json - Add to array
{
  "title": "New Project",
  "description": "Description",
  "image": "assets/images/new-project.jpg",
  "tags": ["React", "Node.js"],
  "link": "https://github.com/username/project",
  "featured": true
}
```

#### Add Blog Post
```bash
# Edit data/blogs.json
{
  "title": "New Blog Post",
  "excerpt": "Short description",
  "date": "Dec 15, 2024",
  "tags": ["JavaScript", "Performance"],
  "link": "pages/blog4.html"
}
```

#### Update Experience
```bash
# Edit data/experience.json - Add to top of array
{
  "title": "Senior Software Engineer",
  "company": "Stripe",
  "period": "May 2026 - Present",
  "description": "Building payment infrastructure",
  "achievements": [
    "Led migration to microservices",
    "Improved API response time by 40%"
  ],
  "technologies": ["Go", "Kubernetes", "AWS"]
}
```

### Best Practices

✅ **Validate JSON**: Use JSON validator before saving  
✅ **Consistent Dates**: Use "Month YYYY" format  
✅ **Image Paths**: Always relative to root (e.g., `assets/images/...`)  
✅ **Featured Items**: Limit to 3-5 featured items  
✅ **Tags**: Keep to 3-5 relevant tags per item  
✅ **Descriptions**: Keep concise (150-200 characters)  

---

## Development Guide

### Adding a New Design (Design #3)

1. **Create CSS File**:
   ```bash
   cp css/style-minimal.css css/style-corporate.css
   # Customize your styles
   ```

2. **Create Loader**:
   ```bash
   cp js/content-loader-minimal.js js/content-loader-corporate.js
   # Modify HTML generation logic
   ```

3. **Create HTML Files**:
   ```bash
   # Root level
   cp index-minimal.html index-corporate.html
   
   # Pages directory
   cp pages/about-minimal.html pages/about-corporate.html
   # ... repeat for all pages
   ```

4. **Update References**:
   - Update `<link>` tags to point to new CSS
   - Update `<script>` tags to point to new loader
   - Update navigation links to new HTML files

5. **Test**:
   ```bash
   python3 -m http.server 8000
   # Visit http://localhost:8000/index-corporate.html
   ```

### Content Loader Architecture

Each loader class follows this structure:

```javascript
class ContentLoader {
  constructor() {
    // Initialize data properties
    this.profileData = null;
    this.homeData = null;
    // ... all 11 data files
    
    // Path detection
    this.inPagesDir = window.location.pathname.includes('/pages/');
    this.basePath = this.inPagesDir ? '../' : './';
  }

  async init() {
    // Load all JSON files in parallel
    const [...data] = await Promise.all([
      fetch(`${this.basePath}data/profile.json`).then(r => r.json()),
      // ... all files
    ]);
    
    // Assign to properties
    this.profileData = data[0];
    // ...
  }

  // Page loaders
  loadHomePage() { /* ... */ }
  loadAboutPage() { /* ... */ }
  loadProjectsPage() { /* ... */ }
  loadBlogsPage() { /* ... */ }
  loadContactPage() { /* ... */ }
  
  // Component loaders
  loadFooter() { /* ... */ }
  updateProfile() { /* ... */ }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
  const loader = new ContentLoader();
  await loader.init();
  
  // Detect page and load appropriate content
  const path = window.location.pathname;
  if (path.includes('index')) {
    loader.loadHomePage();
  } else if (path.includes('about')) {
    loader.loadAboutPage();
  }
  // ... etc
});
```

### Path Resolution

The loaders automatically detect directory depth and adjust paths:

```javascript
// In root directory (index.html)
this.basePath = './';
// Links to: ./data/profile.json, ./assets/images/...

// In pages directory (pages/about.html)
this.basePath = '../';
// Links to: ../data/profile.json, ../assets/images/...
```

### Debugging

Add console logging to loaders:

```javascript
loadHomePage() {
  console.log('Loading home page...', this.homeData);
  this.loadHomeHero();
  // ...
  console.log('Home page loaded');
}
```

Check browser console for:
- JSON load status
- Data availability
- DOM element existence
- Path resolution

---

## File Structure

```
Portfolio/
├── index.html                  # Original design homepage
├── index-minimal.html          # Minimal design homepage
├── about.html                  # Original about page
├── projects.html               # Original projects page
├── contact.html                # Original contact page
│
├── pages/                      # Subpages directory
│   ├── about-minimal.html      # Minimal about page
│   ├── projects-minimal.html   # Minimal projects page
│   ├── blogs.html              # Original blogs listing
│   ├── blogs-minimal.html      # Minimal blogs listing
│   ├── contact-minimal.html    # Minimal contact page
│   ├── blog1.html              # Individual blog posts
│   ├── blog2.html
│   └── blog3.html
│
├── css/                        # Stylesheets
│   ├── style.css               # Original design styles
│   └── style-minimal.css       # Minimal design styles
│
├── js/                         # JavaScript
│   ├── script.js               # Original design utilities
│   ├── content-loader.js       # Original design loader
│   └── content-loader-minimal.js  # Minimal design loader
│
├── data/                       # JSON data files
│   ├── profile.json            # Personal information
│   ├── home.json               # Homepage content
│   ├── about.json              # About page content
│   ├── projects.json           # Projects portfolio
│   ├── projects-page.json      # Projects page metadata
│   ├── blogs.json              # Blog posts list
│   ├── blogs-page.json         # Blogs page structure
│   ├── contact.json            # Contact page content
│   ├── experience.json         # Work history
│   ├── stats.json              # Statistics/metrics
│   └── footer.json             # Footer navigation
│
├── assets/                     # Static assets
│   └── images/                 # Images directory
│       ├── profile.jpg
│       ├── project1.jpg
│       └── ...
│
└── README.md                   # This file
```

---

## API Reference

### ContentLoader Class

#### Constructor
```javascript
new ContentLoader()
```
Initializes the loader with empty data properties and detects current directory context.

#### Methods

##### `async init()`
Loads all 11 JSON files in parallel using `Promise.all()`.

**Returns**: `Promise<boolean>` - Success status

**Example**:
```javascript
const loader = new ContentLoader();
await loader.init();
```

##### `loadHomePage()`
Loads all homepage sections: hero, stats, projects, experience, CTA.

##### `loadAboutPage()`
Loads all about page sections: hero, experience timeline, skills, education, values, CTA.

##### `loadProjectsPage()`
Loads projects page: hero and projects grid.

##### `loadBlogsPage()`
Loads blogs page: hero, latest posts, topics, newsletter, CTA.

##### `loadContactPage()`
Loads contact page: hero and contact cards.

##### `loadFooter()`
Loads footer navigation with path-aware link adjustment.

##### `updateProfile()`
Updates header/nav with profile information.

### Data Properties

All loaders have these properties after `init()`:

```javascript
loader.profileData      // profile.json content
loader.homeData         // home.json content
loader.aboutData        // about.json content
loader.projectsData     // projects.json content
loader.projectsPageData // projects-page.json content
loader.blogsData        // blogs.json content
loader.blogsPageData    // blogs-page.json content
loader.contactData      // contact.json content
loader.experienceData   // experience.json content
loader.statsData        // stats.json content
loader.footerData       // footer.json content
```

### Path Properties

```javascript
loader.basePath    // './' or '../' depending on location
loader.inPagesDir  // boolean - true if in /pages/ directory
```

---

## Troubleshooting

### Content Not Loading

**Issue**: Page appears empty or content missing

**Solutions**:
1. Check browser console for JSON fetch errors
2. Verify JSON file syntax (use JSONLint)
3. Check file paths in data files (images, links)
4. Ensure element IDs match between HTML and loader
5. Verify loader is calling appropriate load functions

**Debug**:
```javascript
// Add to loader
console.log('Data loaded:', this.homeData);
console.log('Element found:', document.getElementById('hero-section'));
```

### Navigation Links Broken

**Issue**: Clicking links results in 404 errors

**Solutions**:
1. Verify path context (`inPagesDir` detection)
2. Check link targets in footer loader
3. Ensure HTML navigation links point to correct files
4. Verify pages are in correct directories

**Debug**:
```javascript
console.log('Base path:', this.basePath);
console.log('In pages dir:', this.inPagesDir);
```

### Images Not Loading

**Issue**: Broken image icons appear

**Solutions**:
1. Verify image paths in JSON are relative to root
2. Check images exist in `assets/images/`
3. Ensure loader prepends `basePath` to image URLs
4. Check for typos in filenames

**Example**:
```json
// ✅ Correct
"image": "assets/images/project.jpg"

// ❌ Wrong
"image": "/assets/images/project.jpg"
"image": "../assets/images/project.jpg"
```

### Style Issues

**Issue**: Styles not applying correctly

**Solutions**:
1. Verify correct CSS file is linked in HTML
2. Check class names match between loader and CSS
3. Clear browser cache
4. Check CSS file syntax

### Data Not Updating

**Issue**: Content changes not reflected on page

**Solutions**:
1. Hard refresh browser (Cmd+Shift+R / Ctrl+Shift+R)
2. Check JSON syntax is valid
3. Restart development server
4. Verify you edited correct JSON file
5. Clear browser cache

---

## Production Deployment

### Pre-Deployment Checklist

- [ ] Update all content in JSON files
- [ ] Verify all images are optimized and committed
- [ ] Test all navigation links
- [ ] Test both design systems
- [ ] Validate all JSON files
- [ ] Check console for errors
- [ ] Test responsive design on mobile
- [ ] Update meta tags in HTML files
- [ ] Add analytics (if needed)

### Deployment Options

#### GitHub Pages
```bash
# Push to repository
git add .
git commit -m "Update portfolio"
git push origin main

# Enable GitHub Pages in repository settings
# Select main branch as source
```

#### Netlify
```bash
# Drag and drop Portfolio folder to Netlify
# Or connect GitHub repository
# Netlify auto-detects static site
```

#### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd Portfolio
vercel
```

---

## Future Enhancements

### Potential Design #3 Ideas

- **Corporate**: Professional, business-focused theme
- **Creative**: Bold, artistic with animations
- **Resume**: Print-friendly CV format
- **Dashboard**: Metrics and data visualization focus
- **Magazine**: Editorial, content-heavy layout

### Feature Roadmap

- [ ] Dark/light mode toggle for original design
- [ ] Search functionality for blogs
- [ ] Filter/sort for projects
- [ ] Dynamic blog post generation from markdown
- [ ] Contact form integration
- [ ] Analytics dashboard
- [ ] Multi-language support
- [ ] RSS feed for blog

---

## License

This portfolio template is open for personal use. Feel free to fork and customize for your own portfolio.

---

## Support

For questions or issues:
1. Check this documentation
2. Review browser console for errors
3. Validate JSON files
4. Check file paths and structure

---

**Last Updated**: November 2025  
**Version**: 2.0.0 (Multi-Design System)  
**Maintainer**: Portfolio Owner

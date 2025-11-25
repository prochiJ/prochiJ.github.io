// Alternative Content Loader - Minimal Design
// Uses the same JSON data structure but generates different HTML markup

class MinimalContentLoader {
  constructor() {
    this.profileData = null;
    this.homeData = null;
    this.aboutData = null;
    this.projectsData = null;
    this.projectsPageData = null;
    this.blogsData = null;
    this.blogsPageData = null;
    this.contactData = null;
    this.experienceData = null;
    this.statsData = null;
    this.footerData = null;

    // Detect directory depth for relative paths
    const pathSegments = window.location.pathname.split('/').filter(p => p && !p.endsWith('.html'));

    let upLevels = '';
    if (pathSegments.length >= 2) {
      upLevels = '../../';
    } else {
      upLevels = '../';
    }

    this.basePath = upLevels + 'data/';
    this.rootPath = upLevels; // Path to project root
    this.inPagesDir = pathSegments.length >= 2;
  }

  // Helper to adjust links
  adjustLink(link) {
    if (!link) return link;
    if (link.startsWith('http') || link.startsWith('mailto:') || link.startsWith('#')) return link;
    return this.rootPath + link;
  }

  async init() {
    try {
      const [
        profile,
        home,
        about,
        projects,
        projectsPage,
        blogs,
        blogsPage,
        contact,
        experience,
        stats,
        footer
      ] = await Promise.all([
        fetch(`${this.basePath}profile.json`).then(r => r.json()),
        fetch(`${this.basePath}home.json`).then(r => r.json()),
        fetch(`${this.basePath}about.json`).then(r => r.json()),
        fetch(`${this.basePath}projects.json`).then(r => r.json()),
        fetch(`${this.basePath}projects-page.json`).then(r => r.json()),
        fetch(`${this.basePath}blogs.json`).then(r => r.json()),
        fetch(`${this.basePath}blogs-page.json`).then(r => r.json()),
        fetch(`${this.basePath}contact.json`).then(r => r.json()),
        fetch(`${this.basePath}experience.json`).then(r => r.json()),
        fetch(`${this.basePath}stats.json`).then(r => r.json()),
        fetch(`${this.basePath}footer.json`).then(r => r.json())
      ]);

      this.profileData = profile;
      this.homeData = home;
      this.aboutData = about;
      this.projectsData = projects;
      this.projectsPageData = projectsPage;
      this.blogsData = blogs;
      this.blogsPageData = blogsPage;
      this.contactData = contact;
      this.experienceData = experience;
      this.statsData = stats;
      this.footerData = footer;

      console.log('✓ All data loaded for minimal design');

      // Update profile info in header
      this.updateProfile();

      // Load footer on all pages
      this.loadFooter();

      return true;
    } catch (error) {
      console.error('Error loading data:', error);
      return false;
    }
  }

  updateProfile() {
    // Update logo
    const logoElement = document.querySelector('.logo');
    if (logoElement && this.profileData) {
      logoElement.textContent = this.profileData.name;
    }
  }

  // HOME PAGE - Minimal centered design
  loadHomePage() {
    console.log('Loading home page...');
    this.loadHomeHero();
    this.loadHomeStats();
    this.loadHomeProjects();
    this.loadHomeExperience();
    this.loadHomeCTA();
    console.log('Home page loaded');
  }

  loadHomeHero() {
    const hero = document.getElementById('hero-section');
    if (!hero || !this.homeData) {
      console.error('Hero element or homeData missing:', { hero: !!hero, homeData: !!this.homeData });
      return;
    }

    const data = this.homeData.hero;
    console.log('Loading home hero:', data);
    hero.innerHTML = `
      <div class="hero fade-in" style="text-align: center;">
        <div style="margin-bottom: 2rem;">
          <img src="${this.adjustLink(data.image)}" alt="${data.imageAlt}" style="width: 150px; height: 150px; border-radius: 50%; object-fit: cover; border: 3px solid var(--accent);" />
        </div>
        <span class="section-subtitle">${data.subtitle}</span>
        <h1>${data.heading}</h1>
        <p class="lead">${data.lead}</p>
        <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 2rem;">
          ${data.buttons.map(btn => `
            <a href="${this.adjustLink(btn.link)}" class="btn ${btn.primary ? 'btn-primary' : ''}">
              ${btn.text}
            </a>
          `).join('')}
        </div>
      </div>
    `;
  }

  loadHomeStats() {
    if (!this.statsData) return;

    const container = document.getElementById('stats-section');
    if (!container) return;

    container.innerHTML = `
      <div class="grid grid-3">
        ${this.statsData.map(stat => `
          <div class="stat-card card">
            <h3>${stat.value}</h3>
            <p class="mono">${stat.label}</p>
          </div>
        `).join('')}
      </div>
    `;
  }

  loadHomeProjects() {
    if (!this.projectsData) return;

    const container = document.getElementById('projects-section');
    if (!container) return;

    const featured = this.projectsData.filter(p => p.featured).slice(0, 3);

    container.innerHTML = `
      <div style="text-align: center; margin-bottom: 3rem;">
        <span class="section-subtitle">Selected Work</span>
        <h2>Featured Projects</h2>
      </div>
      <div class="grid grid-2">
        ${featured.map(project => `
          <a href="${this.adjustLink(project.link) || '#'}" class="project-card card" ${project.link?.startsWith('http') ? 'target="_blank"' : ''}>
            <img src="${this.adjustLink(project.image)}" alt="${project.title}" />
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div style="margin-top: 1rem; display: flex; flex-wrap: wrap; gap: 0.5rem;">
              ${project.tags.map(tag => `<span class="chip">${tag}</span>`).join('')}
            </div>
          </a>
        `).join('')}
      </div>
      <div style="text-align: center; margin-top: 3rem;">
        <a href="projects/" class="btn">View All Projects</a>
      </div>
    `;
  }

  loadHomeExperience() {
    if (!this.experienceData) return;

    const container = document.getElementById('experience-section');
    if (!container) return;

    const recent = this.experienceData.slice(0, 2);

    container.innerHTML = `
      <div style="text-align: center; margin-bottom: 3rem;">
        <span class="section-subtitle">Career Path</span>
        <h2>Experience</h2>
      </div>
      <div class="grid">
        ${recent.map(exp => `
          <div class="card">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
              <div>
                <h3>${exp.role}</h3>
                <p class="mono" style="color: var(--accent); margin-top: 0.25rem;">${exp.company}</p>
              </div>
              <span class="badge">${exp.year}</span>
            </div>
            <p style="color: var(--text-secondary);">${exp.description}</p>
            ${exp.highlights ? `
              <ul style="margin-top: 1rem; list-style: none; padding: 0; color: var(--text-secondary); font-size: 0.9rem;">
                ${exp.highlights.slice(0, 2).map(highlight => `
                  <li style="padding: 0.25rem 0;">→ ${highlight}</li>
                `).join('')}
              </ul>
            ` : ''}
          </div>
        `).join('')}
      </div>
      <div style="text-align: center; margin-top: 2rem;">
        <a href="about/" class="btn">Full Experience</a>
      </div>
    `;
  }

  loadHomeCTA() {
    if (!this.homeData) return;

    const container = document.getElementById('cta-section');
    if (!container) return;

    const cta = this.homeData.cta;
    container.innerHTML = `
      <div class="card" style="text-align: center; padding: 4rem 2rem;">
        <h2 style="margin-bottom: 1rem;">${cta.heading}</h2>
        <p class="lead" style="margin-bottom: 2rem;">${cta.description}</p>
        <div style="display: flex; gap: 1rem; justify-content: center;">
          ${cta.buttons.map(btn => `
            <a href="${this.adjustLink(btn.link)}" class="btn ${btn.primary ? 'btn-primary' : ''}">
              ${btn.text}
            </a>
          `).join('')}
        </div>
      </div>
    `;
  }

  // ABOUT PAGE - Minimal timeline style
  loadAboutPage() {
    this.loadAboutHero();
    this.loadAboutExperience();
    this.loadAboutSkills();
    this.loadAboutEducation();
  }

  loadAboutHero() {
    const hero = document.getElementById('about-hero');
    if (!hero || !this.aboutData) return;

    const data = this.aboutData.hero;
    hero.innerHTML = `
      <div class="hero">
        <span class="section-subtitle">${data.subtitle}</span>
        <h1>${data.heading}</h1>
        <p class="lead">${data.lead}</p>
      </div>
    `;
  }

  loadAboutExperience() {
    const section = document.getElementById('about-experience');
    if (!section || !this.aboutData) return;

    const experiences = this.aboutData.experienceTimeline;
    section.innerHTML = `
      <div style="text-align: center; margin-bottom: 3rem;">
        <span class="section-subtitle">Career Journey</span>
        <h2>Professional Experience</h2>
      </div>
      <div style="max-width: 700px; margin: 0 auto;">
        ${experiences.map((exp, index) => `
          <div style="padding: 2rem 0; border-left: 2px solid var(--border); padding-left: 2rem; position: relative;">
            <div style="position: absolute; left: -6px; top: 2rem; width: 10px; height: 10px; background: var(--accent); border-radius: 50%;"></div>
            <span class="badge">${exp.period}</span>
            <h3 style="margin: 0.5rem 0;">${exp.title}</h3>
            <p class="mono" style="color: var(--accent); margin-bottom: 1rem;">${exp.company}</p>
            <p style="color: var(--text-secondary); margin-bottom: 1rem;">${exp.description}</p>
            ${exp.achievements ? `
              <ul style="list-style: none; padding: 0; color: var(--text-secondary); font-size: 0.9rem;">
                ${exp.achievements.map(achievement => `
                  <li style="padding: 0.25rem 0;">→ ${achievement}</li>
                `).join('')}
              </ul>
            ` : ''}
          </div>
        `).join('')}
      </div>
    `;
  }

  loadAboutSkills() {
    const section = document.getElementById('about-skills');
    if (!section || !this.aboutData) return;

    const skills = this.aboutData.skills;
    section.innerHTML = `
      <div style="text-align: center; margin-bottom: 3rem;">
        <span class="section-subtitle">Expertise</span>
        <h2>Skills & Technologies</h2>
      </div>
      <div class="grid grid-2">
        ${skills.categories.map(category => `
          <div class="card">
            <h3 style="margin-bottom: 1rem;">${category.title}</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
              ${category.items.map(skill => `
                <span class="chip">${skill}</span>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  loadAboutEducation() {
    const section = document.getElementById('about-education');
    if (!section || !this.aboutData) return;

    const edu = this.aboutData.education;
    section.innerHTML = `
      <div style="text-align: center; margin-bottom: 3rem;">
        <span class="section-subtitle">${edu.subtitle}</span>
        <h2>Education</h2>
      </div>
      <div class="card" style="max-width: 700px; margin: 0 auto;">
        <h3>${edu.institution}</h3>
        <p class="mono" style="color: var(--accent); margin: 0.5rem 0;">${edu.degree}</p>
        <p style="color: var(--text-muted); margin-bottom: 1.5rem;">${edu.period}</p>
        <ul style="list-style: none; padding: 0; color: var(--text-secondary); font-size: 0.95rem;">
          ${edu.details.map(detail => `
            <li style="padding: 0.25rem 0;">→ ${detail}</li>
          `).join('')}
        </ul>
      </div>
    `;
  }

  // PROJECTS PAGE
  loadProjectsPage() {
    this.loadProjectsHero();
    this.loadProjectsGrid();
  }

  loadProjectsHero() {
    const hero = document.getElementById('projects-hero');
    if (!hero || !this.projectsPageData) return;

    const data = this.projectsPageData.hero;
    hero.innerHTML = `
      <div class="hero">
        <span class="section-subtitle">${data.subtitle}</span>
        <h1>${data.heading}</h1>
        <p class="lead">${data.lead}</p>
      </div>
    `;
  }

  loadProjectsGrid() {
    const container = document.getElementById('projects-grid');
    if (!container || !this.projectsData) return;

    container.innerHTML = `
      <div class="grid grid-2">
        ${this.projectsData.map(project => `
          <a href="${this.adjustLink(project.link) || '#'}" class="project-card card" ${project.link?.startsWith('http') ? 'target="_blank"' : ''}>
            <img src="${this.adjustLink(project.image)}" alt="${project.title}" />
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div style="margin-top: 1rem; display: flex; flex-wrap: wrap; gap: 0.5rem;">
              ${project.tags.map(tag => `<span class="chip">${tag}</span>`).join('')}
            </div>
          </a>
        `).join('')}
      </div>
    `;
  }

  // BLOGS PAGE
  loadBlogsPage() {
    this.loadBlogsHero();
    this.loadBlogsList();
  }

  loadBlogsHero() {
    const hero = document.getElementById('blogs-hero');
    if (!hero || !this.blogsPageData) return;

    const data = this.blogsPageData.hero;
    hero.innerHTML = `
      <div class="hero">
        <span class="section-subtitle">${data.subtitle}</span>
        <h1>${data.heading}</h1>
        <p class="lead">${data.lead}</p>
      </div>
    `;
  }

  loadBlogsList() {
    const container = document.getElementById('blogs-list');
    if (!container || !this.blogsData) return;

    container.innerHTML = `
      <div style="max-width: 700px; margin: 0 auto;">
        ${this.blogsData.map(blog => `
          <a href="${this.adjustLink(blog.link)}" class="blog-card">
            <p class="date mono">${blog.date}</p>
            <h3>${blog.title}</h3>
            <p style="color: var(--text-secondary); margin-top: 0.5rem;">${blog.excerpt}</p>
            <div style="margin-top: 1rem; display: flex; flex-wrap: wrap; gap: 0.5rem;">
              ${blog.tags.map(tag => `<span class="chip">${tag}</span>`).join('')}
            </div>
          </a>
        `).join('')}
      </div>
    `;
  }

  // CONTACT PAGE
  loadContactPage() {
    this.loadContactHero();
    this.loadContactCards();
  }

  loadContactHero() {
    const hero = document.getElementById('contact-hero');
    if (!hero || !this.contactData) return;

    const data = this.contactData.hero;
    hero.innerHTML = `
      <div class="hero">
        <span class="section-subtitle">${data.subtitle}</span>
        <h1>${data.heading}</h1>
        <p class="lead">${data.lead}</p>
      </div>
    `;
  }

  loadContactCards() {
    const container = document.getElementById('contact-cards');
    if (!container || !this.contactData) return;

    container.innerHTML = `
      <div class="grid grid-2">
        ${this.contactData.contactCards.map(card => `
          <a href="${this.adjustLink(card.link)}" class="card" style="text-decoration: none; color: inherit;" ${card.link.startsWith('http') ? 'target="_blank"' : ''}>
            <div style="font-size: 2rem; margin-bottom: 1rem;"><i class="${card.icon}"></i></div>
            <h3>${card.title}</h3>
            <p style="color: var(--text-secondary); margin-top: 0.5rem;">${card.displayText}</p>
          </a>
        `).join('')}
      </div>
    `;
  }

  // FOOTER
  loadFooter() {
    const footer = document.querySelector('footer .container');
    if (!footer || !this.footerData) return;

    footer.innerHTML = `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 3rem;">
        <div>
          <h4 style="margin-bottom: 1rem; color: var(--text-primary);">${this.footerData.brand.logo}</h4>
          <p>${this.footerData.brand.tagline}</p>
        </div>
        <div>
          <h4 style="margin-bottom: 1rem; color: var(--text-primary);">Navigate</h4>
          <ul style="list-style: none; padding: 0;">
            ${this.footerData.navigate.links.map(link => {
      // Convert original links to minimal design links
      let minimalUrl = link.url;
      if (link.url.includes('index.html')) {
        minimalUrl = 'index-minimal.html';
      } else if (link.url.includes('about.html')) {
        minimalUrl = 'pages/about-minimal.html';
      } else if (link.url.includes('projects.html')) {
        minimalUrl = 'pages/projects-minimal.html';
      } else if (link.url.includes('blogs.html')) {
        minimalUrl = 'pages/blogs-minimal.html';
      } else if (link.url.includes('contact.html')) {
        minimalUrl = 'pages/contact-minimal.html';
      } else if (link.url.endsWith('/')) {
        // Handle directory links by mapping them to minimal files
        if (link.url.includes('about')) minimalUrl = 'pages/about-minimal.html';
        else if (link.url.includes('projects')) minimalUrl = 'pages/projects-minimal.html';
        else if (link.url.includes('blogs')) minimalUrl = 'pages/blogs-minimal.html';
        else if (link.url.includes('contact')) minimalUrl = 'pages/contact-minimal.html';
        else minimalUrl = 'index-minimal.html';
      }

      const relativePrefix = this.inPagesDir ? '../' : '';
      const finalUrl = relativePrefix + link.url;

      return `
              <li style="margin-bottom: 0.5rem;">
                <a href="${finalUrl}">${link.text}</a>
              </li>
              `;
    }).join('')}
          </ul>
        </div>
        <div>
          <h4 style="margin-bottom: 1rem; color: var(--text-primary);">Connect</h4>
          <ul style="list-style: none; padding: 0;">
            ${this.footerData.connect.links.map(link => `
              <li style="margin-bottom: 0.5rem;">
                <a href="${this.adjustLink(link.url)}" ${link.external ? 'target="_blank"' : ''}>${link.text}</a>
              </li>
            `).join('')}
          </ul>
        </div>
        <div>
          <h4 style="margin-bottom: 1rem; color: var(--text-primary);">${this.footerData.themes ? this.footerData.themes.heading : 'Themes'}</h4>
          <ul style="list-style: none; padding: 0;">
            ${this.footerData.themes ? this.footerData.themes.links.map(link => {
      return `
              <li style="margin-bottom: 0.5rem;">
                <a href="${this.adjustLink(link.url)}">${link.text}</a>
              </li>
              `;
    }).join('') : ''}
          </ul>
        </div>
      </div>
      <div class="divider"></div>
      <div style="text-align: center;">
        <p>${this.footerData.copyright.text}</p>
      </div>
    `;
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
  const loader = new MinimalContentLoader();
  await loader.init();

  // Determine which page we're on and load appropriate content
  const path = window.location.pathname;

  if (path.includes('/about/')) {
    loader.loadAboutPage();
  } else if (path.includes('/projects/')) {
    loader.loadProjectsPage();
  } else if (path.includes('/blogs/')) {
    loader.loadBlogsPage();
  } else if (path.includes('/contact/')) {
    loader.loadContactPage();
  } else {
    loader.loadHomePage();
  }
});
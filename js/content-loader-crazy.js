// Premium Animated Content Loader - Beautiful & Sophisticated Design
// Uses the same JSON data with elegant, modern rendering

class CrazyContentLoader {
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
    // If path is /crazy/ -> segments: ['crazy'] -> depth 1 -> needs ../data/
    // If path is /crazy/about/ -> segments: ['crazy', 'about'] -> depth 2 -> needs ../../data/

    let upLevels = '';
    if (pathSegments.length >= 2) {
      upLevels = '../../';
    } else {
      upLevels = '../';
    }

    this.basePath = upLevels + 'data/';
    this.rootPath = upLevels; // Path to project root
    this.inPagesDir = pathSegments.length >= 2;

    console.log('CrazyLoader initialized (DEBUG):', {
      path: window.location.pathname,
      basePath: this.basePath,
      rootPath: this.rootPath
    });
  }

  // Helper for assets (images, files) - relative to project root
  adjustAsset(path) {
    if (!path) return path;
    if (path.startsWith('http') || path.startsWith('data:')) return path;
    return this.rootPath + path;
  }

  // Helper for page links - relative to current theme
  adjustPageLink(link) {
    if (!link) return link;
    if (link.startsWith('http') || link.startsWith('mailto:') || link.startsWith('#')) return link;

    // If we are in a subpage (e.g. crazy/about/), we need to go up one level to reach sibling pages
    // e.g. link="projects/" -> "../projects/"
    // If we are at theme root (e.g. crazy/), link="projects/" works as is.
    if (this.inPagesDir) {
      return '../' + link;
    }
    return link;
  }

  // Helper for root links (like footer theme switcher) - relative to project root
  adjustRootLink(link) {
    if (!link) return link;
    if (link.startsWith('http')) return link;
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

      console.log('✨ Premium design data loaded successfully!');

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

  // HOME PAGE - Premium sophisticated design
  loadHomePage() {
    console.log('Loading premium home page...');
    this.loadHomeHero();
    this.loadHomeStats();
    this.loadHomeProjects();
    this.loadHomeExperience();
    this.loadHomeCTA();
    console.log('Premium home page loaded!');
  }

  loadHomeHero() {
    const hero = document.getElementById('hero-section');
    if (!hero || !this.homeData) return;

    const data = this.homeData.hero;
    hero.innerHTML = `
      <div class="hero fade-in">
        <div style="margin-bottom: 2.5rem;">
          <img src="${this.adjustAsset(data.image)}" alt="${data.imageAlt}" 
               style="width: 180px; height: 180px; border-radius: 50%; object-fit: cover; 
               border: 3px solid var(--accent-primary); 
               box-shadow: 0 20px 40px rgba(99, 102, 241, 0.2);" />
        </div>
        <span class="section-subtitle">${data.subtitle}</span>
        <h1 style="margin: 1.5rem 0;">${data.heading}</h1>
        <p class="lead">${data.lead}</p>
        <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 3rem; flex-wrap: wrap;">
          ${data.buttons.map(btn => `
            <a href="${this.adjustPageLink(btn.link)}" class="btn ${btn.primary ? 'btn-primary' : ''}">
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
      <div style="margin: 6rem 0;">
        <div class="grid grid-3">
          ${this.statsData.map((stat, index) => `
            <div class="stat-card card">
              <h3>${stat.value}</h3>
              <p class="mono">${stat.label}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  loadHomeProjects() {
    if (!this.projectsData) return;

    const container = document.getElementById('projects-section');
    if (!container) return;

    const featured = this.projectsData.filter(p => p.featured).slice(0, 3);

    container.innerHTML = `
      <div style="text-align: center; margin-bottom: 4rem;">
        <span class="section-subtitle">Featured Work</span>
        <h2 style="margin-top: 1.5rem;">Selected Projects</h2>
      </div>
      <div class="grid grid-2">
        ${featured.map((project, index) => `
          <a href="${this.adjustPageLink(project.link) || '#'}" class="project-card card" ${project.link?.startsWith('http') ? 'target="_blank"' : ''}>
            <img src="${this.adjustAsset(project.image)}" alt="${project.title}" />
            <h3 style="margin-bottom: 0.75rem;">${project.title}</h3>
            <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">${project.description}</p>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
              ${project.tags.map(tag => `<span class="chip">${tag}</span>`).join('')}
            </div>
          </a>
        `).join('')}
      </div>
      <div style="text-align: center; margin-top: 4rem;">
        <a href="projects/" class="btn btn-primary">
          View All Projects
        </a>
      </div>
    `;
  }

  loadHomeExperience() {
    if (!this.experienceData) return;

    const container = document.getElementById('experience-section');
    if (!container) return;

    const recent = this.experienceData.slice(0, 2);

    container.innerHTML = `
      <div style="text-align: center; margin: 6rem 0 4rem;">
        <span class="section-subtitle">Experience</span>
        <h2 style="margin-top: 1.5rem;">Professional Journey</h2>
      </div>
      <div class="grid">
        ${recent.map((exp, index) => `
          <div class="card">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
              <div>
                <h3 style="margin-bottom: 0.5rem;">${exp.role}</h3>
                <p class="mono" style="color: var(--accent-primary);">${exp.company}</p>
              </div>
              <span class="badge">${exp.year}</span>
            </div>
            <p style="color: var(--text-secondary); font-size: 1.05rem; line-height: 1.7;">${exp.description}</p>
            ${exp.highlights ? `
              <ul style="margin-top: 1.5rem; list-style: none; padding: 0;">
                ${exp.highlights.slice(0, 2).map(highlight => `
                  <li style="padding: 0.5rem 0; color: var(--text-secondary); display: flex; align-items: start; gap: 0.75rem;">
                    <span style="color: var(--accent-primary); font-weight: 600;">→</span>
                    <span>${highlight}</span>
                  </li>
                `).join('')}
              </ul>
            ` : ''}
          </div>
        `).join('')}
      </div>
      <div style="text-align: center; margin-top: 3rem;">
        <a href="about/" class="btn">
          View Full Timeline
        </a>
      </div>
    `;
  }

  loadHomeCTA() {
    if (!this.homeData) return;

    const container = document.getElementById('cta-section');
    if (!container) return;

    const cta = this.homeData.cta;
    container.innerHTML = `
      <div class="card" style="text-align: center; padding: 5rem 3rem; margin: 6rem 0; 
           background: linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.05));">
        <span class="section-subtitle">${cta.subtitle}</span>
        <h2 style="margin: 1.5rem 0;">${cta.heading}</h2>
        <p class="lead" style="margin-bottom: 3rem;">${cta.description}</p>
        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
          ${cta.buttons.map(btn => `
            <a href="${this.adjustPageLink(btn.link)}" class="btn ${btn.primary ? 'btn-primary' : ''}">
              ${btn.text}
            </a>
          `).join('')}
        </div>
      </div>
    `;
  }

  // ABOUT PAGE
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
      <div class="hero fade-in">
        <span class="section-subtitle"> ${data.subtitle} </span>
        <h1 style="margin: 1rem 0;">${data.heading}</h1>
        <p class="lead">${data.lead}</p>
        ${data.image ? `
          <div style="margin: 2rem auto; max-width: 300px;">
            <img src="${this.adjustAsset(data.image)}" 
                 alt="${data.imageAlt || 'Profile'}" 
                 style="width: 100%; height: auto; border-radius: 20px; box-shadow: var(--shadow-xl);" />
          </div>
        ` : ''}
      </div>
    `;
  }

  loadAboutExperience() {
    const section = document.getElementById('about-experience');
    if (!section || !this.aboutData) return;

    const experiences = this.aboutData.experienceTimeline;
    section.innerHTML = `
      <div style="text-align: center; margin: 5rem 0 4rem;">
        <span class="section-subtitle"> Career Timeline </span>
        <h2 style="margin-top: 1rem;">The Journey So Far</h2>
      </div>
      <div class="grid">
        ${experiences.map((exp, index) => `
          <div class="card">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem; flex-wrap: wrap; gap: 1rem;">
              <div>
                <span class="badge">${exp.period}</span>
                <h3 style="margin: 1rem 0 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
                  <span style="font-size: 1.5rem;"></span>
                  ${exp.title}
                </h3>
                <p class="mono" style="color: var(--accent-cyan);">${exp.company}</p>
              </div>
            </div>
            <p style="color: var(--text-secondary); margin: 1rem 0;">${exp.description}</p>
            ${exp.highlights ? `
              <ul style="margin-top: 1rem; list-style: none; padding: 0;">
                ${exp.highlights.map(highlight => `
                  <li style="padding: 0.4rem 0; color: var(--text-secondary); display: flex; align-items: start; gap: 0.5rem;">
                    <span style="color: var(--accent-primary); font-weight: 600;">→</span>
                    <span>${highlight}</span>
                  </li>
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
      <div style="text-align: center; margin: 5rem 0 4rem;">
        <span class="section-subtitle"> Tech Arsenal </span>
        <h2 style="margin-top: 1rem;">Skills & Superpowers</h2>
      </div>
      <div class="grid grid-2">
        ${skills.categories.map((category, index) => `
          <div class="card">
            <h3 style="margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
              <span style="font-size: 1.8rem;"></span>
              ${category.title}
            </h3>
            <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
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
      <div style="text-align: center; margin: 5rem 0 4rem;">
        <span class="section-subtitle"> ${edu.subtitle} </span>
        <h2 style="margin-top: 1rem;">Academic Journey</h2>
      </div>
      <div class="card" style="max-width: 800px; margin: 0 auto;">
        <h3 style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
          ${edu.institution}
        </h3>
        <p style="font-size: 1.2rem; color: var(--accent-cyan); margin-bottom: 0.5rem;">${edu.degree}</p>
        <span class="badge" style="margin-bottom: 1.5rem;">${edu.period}</span>
        <ul style="margin-top: 1.5rem; list-style: none; padding: 0;">
          ${edu.details.map(detail => `
            <li style="padding: 0.5rem 0; color: var(--text-secondary); display: flex; align-items: start; gap: 0.5rem;">
              <span style="color: var(--accent-primary); font-weight: 600;">→</span>
              <span>${detail}</span>
            </li>
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
      <div class="hero fade-in">
        <span class="section-subtitle"> ${data.subtitle} </span>
        <h1 style="margin: 1rem 0;">${data.heading}</h1>
        <p class="lead">${data.lead}</p>
      </div>
    `;
  }

  loadProjectsGrid() {
    const container = document.getElementById('projects-grid');
    if (!container || !this.projectsData) return;

    container.innerHTML = `
      <div class="grid grid-2">
        ${this.projectsData.map((project, index) => `
          <a href="${this.adjustPageLink(project.link) || '#'}" class="project-card card" ${project.link?.startsWith('http') ? 'target="_blank"' : ''}>
            <div style="position: relative;">
              <img src="${this.adjustAsset(project.image)}" alt="${project.title}" />
              <div style="position: absolute; top: 15px; right: 15px; font-size: 2.5rem; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));">
                
              </div>
            </div>
            <h3 style="display: flex; align-items: center; gap: 0.5rem;">
              ${project.title}
            </h3>
            <p style="margin: 1rem 0;">${project.description}</p>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
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
      <div class="hero fade-in">
        <span class="section-subtitle"> ${data.subtitle} </span>
        <h1 style="margin: 1rem 0;">${data.heading}</h1>
        <p class="lead">${data.lead}</p>
      </div>
    `;
  }

  loadBlogsList() {
    const container = document.getElementById('blogs-list');
    if (!container || !this.blogsData) return;

    container.innerHTML = `
      <div class="grid grid-2">
        ${this.blogsData.map((blog, index) => `
          <a href="${this.adjustPageLink(blog.link)}" class="card" style="text-decoration: none; color: inherit;">
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
              <span class="badge">${blog.date}</span>
              <span style="font-size: 1.5rem;"></span>
            </div>
            <h3 style="margin-bottom: 1rem;">${blog.title}</h3>
            <p style="color: var(--text-secondary); margin-bottom: 1rem;">${blog.description}</p>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
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
      <div class="hero fade-in">
        <span class="section-subtitle"> ${data.subtitle} </span>
        <h1 style="margin: 1rem 0;">${data.heading}</h1>
        <p class="lead">${data.lead}</p>
      </div>
    `;
  }

  loadContactCards() {
    const container = document.getElementById('contact-cards');
    if (!container || !this.contactData) return;

    container.innerHTML = `
      <div class="grid grid-2">
        ${this.contactData.contactCards.map((card, index) => `
          <a href="${this.adjustPageLink(card.link)}" class="card" style="text-decoration: none; color: inherit;" 
             ${card.link.startsWith('http') ? 'target="_blank"' : ''}>
            <div style="font-size: 4rem; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 1rem;">
              <i class="${card.icon}" style="color: var(--accent-cyan);"></i>
            </div>
            <h3 style="margin-bottom: 0.5rem;">${card.title}</h3>
            <p style="color: var(--text-secondary); margin-top: 1rem; font-size: 1.05rem;">${card.displayText}</p>
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
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 3rem; margin-bottom: 3rem;">
        <div>
          <h4 style="margin-bottom: 1.5rem; color: var(--text-primary); display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-size: 1.5rem;"></span>
            ${this.footerData.navigate.heading}
          </h4>
          <ul style="list-style: none; padding: 0;">
            ${this.footerData.navigate.links.map(link => {
      // Map standard links to crazy theme links
      let crazyUrl = link.url;
      // link.url is like "about/" or "projects/"
      // If we are in crazy theme, we want to stay in crazy theme.
      // So "about/" -> "crazy/about/"? No, we are already in crazy theme.
      // If we are in crazy/index.html, "about/" is correct relative link to "crazy/about/".
      // If we are in crazy/about/index.html, "projects/" is NOT correct. It should be "../projects/".
      // But adjustLink handles the prefixing of rootPath.
      // So if link.url is "about/", adjustLink("about/") -> "../about/" (from subpage) or "about/" (from root).
      // "../../about/" goes to root/about/. That is the STANDARD theme about page.
      // WE WANT CRAZY THEME ABOUT PAGE.
      // Crazy theme about page is at crazy/about/.
      // From crazy/about/index.html, we want to go to crazy/about/ (self) or crazy/projects/ (../projects/).

      // So we need to map "about/" to "crazy/about/"?
      // No, we are simulating a separate site structure under crazy/.
      // So "about/" should mean "about/" relative to "crazy/".
      // But adjustLink uses rootPath which goes to PROJECT root.

      // We need a themeRootPath.
      // If I am in crazy/about/, themeRootPath is "../".
      // If I am in crazy/, themeRootPath is "./".

      // Let's redefine rootPath in this loader to be the THEME root.
      // But we need to load data from PROJECT root.
      // So we need two paths: dataPath (to project root) and themePath (to theme root).

      // Actually, simpler:
      // If I am in crazy/about/, I want to go to crazy/projects/.
      // Relative path is "../projects/".
      // If I am in crazy/, I want to go to crazy/projects/.
      // Relative path is "projects/".

      // So if I use relative links "about/", "projects/" in footer.json,
      // And I just prepend "../" if I am in a subpage?
      // Yes.

      // But footer.json has "about/".
      // In crazy/about/, "about/" resolves to crazy/about/about/. Wrong.
      // We need "../about/".

      // So:
      // If depth 2 (subpage), prepend "../".
      // If depth 1 (root), use as is.

      return `
                <li style="margin-bottom: 0.75rem;">
                  <a href="${this.adjustLink(link.url)}" style="display: flex; align-items: center; gap: 0.5rem;">
                    <span></span>
                    ${link.text}
                  </a>
                </li>
              `;
    }).join('')}
          </ul>
        </div>
        <div>
          <h4 style="margin-bottom: 1.5rem; color: var(--text-primary); display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-size: 1.5rem;"></span>
            ${this.footerData.connect.heading}
          </h4>
          <ul style="list-style: none; padding: 0;">
            ${this.footerData.connect.links.map(link => `
              <li style="margin-bottom: 0.75rem;">
                <a href="${this.adjustLink(link.url)}" ${link.external ? 'target="_blank"' : ''} style="display: flex; align-items: center; gap: 0.5rem;">
                  <span></span>
                  ${link.text}
                </a>
              </li>
            `).join('')}
          </ul>
        </div>
        <div>
          <h4 style="margin-bottom: 1.5rem; color: var(--text-primary); display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-size: 1.5rem;"></span>
            ${this.footerData.themes ? this.footerData.themes.heading : 'Themes'}
          </h4>
          <ul style="list-style: none; padding: 0;">
            ${this.footerData.themes ? this.footerData.themes.links.map(link => {
      // Themes links are "index.html", "crazy/index.html", "minimal/index.html" (Wait, I need to update footer.json to use directory links for themes too?)
      // Currently footer.json has "index.html", "index-crazy.html", "index-minimal.html".
      // I should update footer.json to "crazy/", "minimal/", "index.html" (or "./").
      // Let's assume I update footer.json.

      return `
                <li style="margin-bottom: 0.75rem;">
                  <a href="${this.adjustLink(link.url)}" style="display: flex; align-items: center; gap: 0.5rem;">
                    <span></span>
                    ${link.text}
                  </a>
                </li>
              `;
    }).join('') : ''}
          </ul>
        </div>
      </div>
      <div class="divider"></div>
      <div style="text-align: center; padding: 1rem 0;">
        <p style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; flex-wrap: wrap;">
          <span></span>
          ${this.footerData.copyright.text}
          <span></span>
        </p>
      </div>
    `;
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
  const loader = new CrazyContentLoader();
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

// Portfolio Content Loader - Modular Version
// Loads content from separate JSON files for better maintainability

class PortfolioLoader {
  constructor() {
    this.profile = null;
    this.projects = null;
    this.blogs = null;
    this.experience = null;
    this.stats = null;
    this.about = null;
    this.home = null;
    this.contact = null;
    this.projectsPage = null;
    this.blogsPage = null;
    this.footer = null;
    
    // Determine base path based on current location
    this.basePath = window.location.pathname.includes('/pages/') 
      ? '../data/' 
      : 'data/';
    
    // Determine if we're in the pages subdirectory for link adjustments
    this.inPagesDir = window.location.pathname.includes('/pages/');
  }

  // Load a specific JSON file
  async loadJSON(filename) {
    try {
      const path = this.basePath + filename;
      console.log(`Loading ${filename} from:`, path);
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(`✓ ${filename} loaded successfully`);
      return data;
    } catch (error) {
      console.error(`✗ Error loading ${filename}:`, error);
      return null;
    }
  }

  // Load all data
  async init() {
    console.log('🚀 Initializing Portfolio Loader...');
    
    const [profile, projects, blogs, experience, stats, about, home, contact, projectsPage, blogsPage, footer] = await Promise.all([
      this.loadJSON('profile.json'),
      this.loadJSON('projects.json'),
      this.loadJSON('blogs.json'),
      this.loadJSON('experience.json'),
      this.loadJSON('stats.json'),
      this.loadJSON('about.json'),
      this.loadJSON('home.json'),
      this.loadJSON('contact.json'),
      this.loadJSON('projects-page.json'),
      this.loadJSON('blogs-page.json'),
      this.loadJSON('footer.json')
    ]);

    this.profile = profile;
    this.projects = projects;
    this.blogs = blogs;
    this.experience = experience;
    this.stats = stats;
    this.about = about;
    this.home = home;
    this.contact = contact;
    this.projectsPage = projectsPage;
    this.blogsPage = blogsPage;
    this.footer = footer;

    console.log('✓ All data loaded successfully!');
    return true;
  }

  // Generate project card HTML
  generateProjectCard(project) {
    return `
      <a href="${project.link}" class="card flex flex-col gap-6 hover:border-accent/50 transition-all duration-300 cursor-pointer group">
        <figure class="relative overflow-hidden rounded-lg">
          <img src="${project.image}" alt="${project.title}" class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300">
        </figure>
        <div class="flex-1 flex flex-col gap-4">
          <h3 class="text-xl font-semibold text-gray-100 group-hover:text-accent transition-colors">${project.title}</h3>
          <p class="text-sm text-slate-300">${project.description}</p>
          <div class="flex flex-wrap gap-2 font-mono text-xs text-slate-400">
            ${project.tags.map(tag => `<span class="chip">${tag}</span>`).join('')}
          </div>
        </div>
        <span class="btn btn-ghost self-start">View details</span>
      </a>
    `;
  }

  // Generate blog card HTML
  generateBlogCard(blog) {
    // Adjust link path based on current directory
    const link = this.inPagesDir ? blog.link.replace('pages/', '') : blog.link;
    
    return `
      <a href="${link}" class="card flex flex-col gap-4 hover:border-accent/50 transition-all duration-300 cursor-pointer group">
        <div class="text-xs font-mono text-accent">${blog.date}</div>
        <h3 class="text-lg font-semibold text-gray-100 group-hover:text-accent transition-colors">${blog.title}</h3>
        <p class="text-sm text-slate-300">${blog.description}</p>
        <span class="btn btn-ghost self-start">Read article</span>
      </a>
    `;
  }

  // Generate featured blog HTML
  generateFeaturedBlog(blog) {
    // Adjust link path based on current directory
    const link = this.inPagesDir ? blog.link.replace('pages/', '') : blog.link;
    
    return `
      <div class="card">
        <div class="grid gap-8 lg:grid-cols-[2fr,1fr] lg:items-start">
          <div class="space-y-6">
            <div>
              <span class="inline-block px-3 py-1 text-xs font-mono text-accent bg-accent/10 rounded-full mb-4">Featured</span>
              <h2 id="featured-heading" class="text-3xl md:text-4xl font-semibold text-gray-100 mb-4">${blog.title}</h2>
              <p class="text-base text-slate-300 mb-6">${blog.description}</p>
            </div>
            <div class="flex flex-wrap gap-2">
              ${blog.tags.map(tag => `<span class="chip">${tag}</span>`).join('')}
            </div>
            <a href="${link}" class="btn btn-primary inline-block">Read featured story</a>
          </div>
          <div class="space-y-6">
            <div class="p-6 bg-secondary-dark rounded-lg border border-gray-700">
              <div class="text-3xl font-bold text-accent mb-2">${blog.readTime}</div>
              <p class="text-sm text-slate-400">Grab a beverage—it's a comprehensive guide with actionable insights.</p>
            </div>
            ${blog.note ? `<p class="text-xs font-mono text-slate-500">Published ${blog.date} · ${blog.note}</p>` : `<p class="text-xs font-mono text-slate-500">Published ${blog.date}</p>`}
          </div>
        </div>
      </div>
    `;
  }

  // Generate experience card HTML
  generateExperienceCard(exp) {
    const statusBadge = exp.upcoming 
      ? `<span class="inline-block px-3 py-1 text-xs font-mono text-accent bg-accent/10 rounded-full">Starting ${this.profile?.nextRole?.startDate || 'Soon'}</span>` 
      : '';
    
    return `
      <article class="card flex flex-col gap-3">
        <div class="flex items-center gap-3 text-sm font-mono text-accent">
          <span>${exp.year}</span>
          <span class="text-slate-500">—</span>
          <span>${exp.company}</span>
          ${statusBadge}
        </div>
        <h3 class="text-xl font-semibold text-gray-100">${exp.role}</h3>
        <p class="text-sm text-slate-300">${exp.description}</p>
        <ul class="list-disc list-inside text-sm text-slate-400 space-y-1">
          ${exp.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
        </ul>
      </article>
    `;
  }

  // Load projects into container
  loadProjects(containerId, featured = true) {
    console.log(`📦 Loading projects into #${containerId}, featured: ${featured}`);
    const container = document.getElementById(containerId);
    
    if (!container) {
      console.error(`✗ Container #${containerId} not found!`);
      return;
    }
    
    if (!this.projects) {
      console.error('✗ Projects data not available!');
      return;
    }

    const projectsToShow = featured 
      ? this.projects.filter(p => p.featured) 
      : this.projects;

    console.log(`✓ Displaying ${projectsToShow.length} projects`);
    container.innerHTML = projectsToShow.map(p => this.generateProjectCard(p)).join('');
  }

  // Load blogs into container
  loadBlogs(containerId, featured = false, limit = null) {
    console.log(`📝 Loading blogs into #${containerId}, featured: ${featured}, limit: ${limit}`);
    const container = document.getElementById(containerId);
    
    if (!container) {
      console.error(`✗ Container #${containerId} not found!`);
      return;
    }
    
    if (!this.blogs) {
      console.error('✗ Blogs data not available!');
      return;
    }

    let blogsToShow = featured 
      ? this.blogs.filter(b => b.featured) 
      : this.blogs;

    if (limit) blogsToShow = blogsToShow.slice(0, limit);

    console.log(`✓ Displaying ${blogsToShow.length} blogs`);
    container.innerHTML = blogsToShow.map(b => this.generateBlogCard(b)).join('');
  }

  // Load featured blog
  loadFeaturedBlog(containerId) {
    console.log(`⭐ Loading featured blog into #${containerId}`);
    const container = document.getElementById(containerId);
    
    if (!container) {
      console.error(`✗ Container #${containerId} not found!`);
      return;
    }
    
    if (!this.blogs) {
      console.error('✗ Blogs data not available!');
      return;
    }

    const featuredBlog = this.blogs.find(b => b.featured);
    if (featuredBlog) {
      console.log(`✓ Displaying featured blog: ${featuredBlog.title}`);
      container.innerHTML = this.generateFeaturedBlog(featuredBlog);
    } else {
      console.warn('⚠ No featured blog found');
    }
  }

  // Load experience
  loadExperience(containerId, limit = 2) {
    console.log(`💼 Loading experience into #${containerId}, limit: ${limit}`);
    const container = document.getElementById(containerId);
    
    if (!container) {
      console.error(`✗ Container #${containerId} not found!`);
      return;
    }
    
    if (!this.experience) {
      console.error('✗ Experience data not available!');
      return;
    }

    const experienceToShow = this.experience.slice(0, limit);
    console.log(`✓ Displaying ${experienceToShow.length} experience items`);
    container.innerHTML = experienceToShow.map(exp => this.generateExperienceCard(exp)).join('');
  }

  // Update profile information
  updateProfile() {
    console.log('👤 Updating profile information');
    
    if (!this.profile) {
      console.error('✗ Profile data not available!');
      return;
    }

    // Update hero title
    const heroTitle = document.querySelector('#hero h1');
    if (heroTitle) {
      heroTitle.textContent = this.profile.tagline;
    }

    // Update bio
    const heroBio = document.querySelector('#hero .lead');
    if (heroBio) {
      heroBio.textContent = this.profile.bio;
    }

    // Update skills chips
    const skillsContainer = document.querySelector('#hero .flex.flex-wrap.gap-3');
    if (skillsContainer && this.profile.skills) {
      skillsContainer.innerHTML = this.profile.skills
        .map(skill => `<span class="chip"><i class="${skill.icon}"></i> ${skill.label}</span>`)
        .join('');
    }

    console.log('✓ Profile updated');
  }

  // Load stats
  loadStats(containerId) {
    console.log(`📊 Loading stats into #${containerId}`);
    const container = document.querySelector(containerId);
    
    if (!container) {
      console.error(`✗ Container ${containerId} not found!`);
      return;
    }
    
    if (!this.stats) {
      console.error('✗ Stats data not available!');
      return;
    }

    container.innerHTML = this.stats
      .map(stat => `
        <div class="card stat-card">
          <h3>${stat.value}</h3>
          <p>${stat.label}</p>
        </div>
      `)
      .join('');
    
    console.log(`✓ Displaying ${this.stats.length} stats`);
  }

  // Load About Page Content
  loadAboutPage() {
    if (!this.about) {
      console.error('✗ About data not available!');
      return;
    }

    console.log('📖 Loading About page content...');

    // Load hero section
    this.loadAboutHero();
    // Load experience timeline
    this.loadAboutExperience();
    // Load skills
    this.loadAboutSkills();
    // Load education & certifications
    this.loadAboutEducation();
    // Load values
    this.loadAboutValues();
    // Load CTA
    this.loadAboutCTA();
  }

  loadAboutHero() {
    const hero = this.about.hero;
    const heroSection = document.getElementById('about-hero');
    
    if (!heroSection) {
      console.log('⚠️ About hero section not found');
      return;
    }

    heroSection.innerHTML = `
      <div class="space-y-6">
        <span class="section-subtitle">${hero.subtitle}</span>
        <h1 class="text-4xl md:text-5xl font-bold text-gray-100 leading-snug">${hero.heading}</h1>
        <p class="lead">${hero.lead}</p>
        <div class="grid gap-4 md:grid-cols-2">
          ${hero.stats.map(stat => `
            <div class="card stat-card">
              <h3>${stat.value}</h3>
              <p>${stat.description}</p>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="card space-y-6">
        <img src="${hero.image}" alt="${hero.imageAlt}" class="w-full rounded-lg grayscale hover:grayscale-0 transition" />
        <div class="space-y-3 text-sm text-slate-300">
          <p><strong class="text-accent">Currently:</strong> ${hero.currently}</p>
          <p><strong class="text-accent">Mission:</strong> ${hero.mission}</p>
        </div>
      </div>
    `;
    console.log('✓ About hero loaded');
  }

  loadAboutExperience() {
    const section = document.getElementById('about-experience');
    if (!section) {
      console.log('⚠️ About experience section not found');
      return;
    }

    const exp = this.about.experienceTimeline;
    section.innerHTML = `
      <div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <span class="section-subtitle">Experience timeline</span>
          <h2 id="experience-heading" class="text-3xl md:text-4xl font-semibold text-gray-100">Where I've led, learned, and shipped impact</h2>
        </div>
        <a href="projects.html" class="btn">Browse project outcomes →</a>
      </div>
      <div class="space-y-6">
        ${exp.map(item => `
          <article class="card">
            <div class="flex flex-wrap items-center justify-between gap-4 text-sm font-mono text-accent">
              <span>${item.title} — ${item.company}</span>
              <span class="text-slate-400">${item.period}</span>
            </div>
            <p class="mt-4 text-sm text-slate-300">${item.description}</p>
            <ul class="mt-4 list-disc list-inside text-sm text-slate-400 space-y-2">
              ${item.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
            </ul>
            <div class="mt-4 flex flex-wrap gap-2 font-mono text-xs text-slate-400">
              ${item.tags.map(tag => `<span class="chip">${tag}</span>`).join('')}
            </div>
          </article>
        `).join('')}
      </div>
    `;
    console.log('✓ About experience loaded');
  }

  loadAboutSkills() {
    const section = document.getElementById('about-skills');
    if (!section) {
      console.log('⚠️ About skills section not found');
      return;
    }

    const skills = this.about.skills;
    section.innerHTML = `
      <div>
        <span class="section-subtitle">${skills.subtitle}</span>
        <h2 id="skills-heading" class="text-3xl md:text-4xl font-semibold text-gray-100">${skills.heading}</h2>
        <p class="mt-4 max-w-3xl">${skills.description}</p>
      </div>
      <div class="grid gap-6 md:grid-cols-3">
        ${skills.categories.map(category => `
          <div class="card space-y-3">
            <h3 class="text-xl font-semibold text-gray-100">${category.title}</h3>
            <ul class="space-y-2 text-sm">
              ${category.items.map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>
        `).join('')}
      </div>
    `;
    console.log('✓ About skills loaded');
  }

  loadAboutEducation() {
    const section = document.getElementById('about-education');
    if (!section) {
      console.log('⚠️ About education section not found');
      return;
    }

    const edu = this.about.education;

    section.innerHTML = `
      <div>
        <span class="section-subtitle">${edu.subtitle}</span>
      </div>
      <div class="card space-y-4 mt-4">
        <h3 class="text-2xl font-semibold text-gray-100">${edu.institution}</h3>
        <p class="text-base text-slate-300">${edu.degree} · ${edu.period}</p>
        <ul class="space-y-2 text-sm text-slate-400">
          ${edu.details.map(detail => `<li>${detail}</li>`).join('')}
        </ul>
      </div>
    `;
    console.log('✓ About education loaded');
  }

  loadAboutValues() {
    const section = document.getElementById('about-values');
    if (!section) {
      console.log('⚠️ About values section not found');
      return;
    }

    const values = this.about.values;
    section.innerHTML = `
      <div>
        <span class="section-subtitle">${values.subtitle}</span>
        <h2 id="values-heading" class="text-3xl md:text-4xl font-semibold text-gray-100">${values.heading}</h2>
      </div>
      <div class="grid gap-6 md:grid-cols-3">
        ${values.principles.map(principle => `
          <div class="card space-y-3">
            <h3 class="text-xl font-semibold text-gray-100">${principle.title}</h3>
            <p class="text-sm text-slate-300">${principle.description}</p>
          </div>
        `).join('')}
      </div>
    `;
    console.log('✓ About values loaded');
  }

  loadAboutCTA() {
    const section = document.getElementById('about-cta');
    if (!section) {
      console.log('⚠️ About CTA section not found');
      return;
    }

    const cta = this.about.cta;

    section.innerHTML = `
      <div class="card flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <span class="section-subtitle">${cta.subtitle}</span>
          <h2 class="text-3xl md:text-4xl font-semibold text-gray-100">${cta.heading}</h2>
          <p class="mt-4 max-w-2xl">${cta.description}</p>
        </div>
        <div class="flex flex-col gap-3 w-full md:w-auto">
          ${cta.buttons.map(btn => `
            <a href="${btn.link}" class="btn ${btn.primary ? 'btn-primary' : ''} text-center">${btn.text}</a>
          `).join('')}
        </div>
      </div>
    `;
    console.log('✓ About CTA loaded');
  }

  // ===== HOME PAGE LOADERS =====
  loadHomePage() {
    if (!this.home) {
      console.error('✗ Home data not available!');
      return;
    }

    console.log('🏠 Loading Home page content...');
    this.loadHomeHero();
    this.loadHomeHighlights();
    this.loadHomeSections();
    this.loadHomeCTA();
  }

  loadHomeHero() {
    const hero = this.home.hero;
    const heroSection = document.getElementById('hero');
    if (!heroSection) return;

    heroSection.innerHTML = `
      <div>
        <span class="section-subtitle">${hero.subtitle}</span>
        <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-100 leading-tight">${hero.heading}</h1>
        <p class="lead mt-8">${hero.lead}</p>
        <div class="mt-10 flex flex-wrap gap-4">
          ${hero.buttons.map(btn => `
            <a href="${btn.link}" class="btn ${btn.primary ? 'btn-primary' : ''}">${btn.text}</a>
          `).join('')}
        </div>
        <div class="mt-12 flex flex-wrap gap-3">
          ${hero.chips.map(chip => `
            <span class="chip"><i class="${chip.icon}"></i> ${chip.label}</span>
          `).join('')}
        </div>
      </div>
      <div class="card text-center">
        <img src="${hero.image}" alt="${hero.imageAlt}" class="w-full h-auto mx-auto rounded-lg grayscale hover:grayscale-0 transition">
        <p class="mt-6 text-sm text-slate-400">${hero.imageCaption}</p>
      </div>
    `;
  }

  loadHomeHighlights() {
    const highlights = this.home.highlights;
    const section = document.querySelector('[aria-labelledby="highlights-heading"]');
    if (!section) return;

    const header = section.querySelector('div:first-child');
    if (header) {
      header.innerHTML = `
        <span class="section-subtitle">${highlights.subtitle}</span>
        <h2 id="highlights-heading" class="text-3xl md:text-4xl font-semibold text-gray-100">${highlights.heading}</h2>
        <p class="mt-4 max-w-3xl">${highlights.description}</p>
      `;
    }
  }

  loadHomeSections() {
    // Projects section header
    const projectsSection = document.querySelector('[aria-labelledby="projects-heading"]');
    if (projectsSection && this.home.projects) {
      const headerContainer = projectsSection.querySelector('.flex > div');
      if (headerContainer) {
        headerContainer.innerHTML = `
          <span class="section-subtitle">${this.home.projects.subtitle}</span>
          <h2 id="projects-heading" class="text-3xl md:text-4xl font-semibold text-gray-100">${this.home.projects.heading}</h2>
          <p class="mt-4 max-w-3xl">${this.home.projects.description}</p>
        `;
      }
      const cta = projectsSection.querySelector('a.btn');
      if (cta) {
        cta.textContent = this.home.projects.ctaText;
        cta.href = this.home.projects.ctaLink;
      }
    }

    // Blogs section header
    const blogsSection = document.querySelector('[aria-labelledby="writing-heading"]');
    if (blogsSection && this.home.blogs) {
      const headerContainer = blogsSection.querySelector('.flex > div');
      if (headerContainer) {
        headerContainer.innerHTML = `
          <span class="section-subtitle">${this.home.blogs.subtitle}</span>
          <h2 id="writing-heading" class="text-3xl md:text-4xl font-semibold text-gray-100">${this.home.blogs.heading}</h2>
          <p class="mt-4 max-w-3xl">${this.home.blogs.description}</p>
        `;
      }
      const cta = blogsSection.querySelector('a.btn');
      if (cta) {
        cta.textContent = this.home.blogs.ctaText;
        cta.href = this.home.blogs.ctaLink;
      }
    }

    // Experience section header
    const expSection = document.querySelector('[aria-labelledby="experience-heading"]');
    if (expSection && this.home.experience) {
      const headerContainer = expSection.querySelector('.flex > div');
      if (headerContainer) {
        headerContainer.innerHTML = `
          <span class="section-subtitle">${this.home.experience.subtitle}</span>
          <h2 id="experience-heading" class="text-3xl md:text-4xl font-semibold text-gray-100">${this.home.experience.heading}</h2>
          <p class="mt-4 max-w-3xl">${this.home.experience.description}</p>
        `;
      }
      const cta = expSection.querySelector('a.btn');
      if (cta) {
        cta.textContent = this.home.experience.ctaText;
        cta.href = this.home.experience.ctaLink;
      }
    }
  }

  loadHomeCTA() {
    const cta = this.home.cta;
    const ctaSection = document.querySelector('[aria-labelledby="cta-heading"]');
    if (!ctaSection) {
      console.log('⚠️ CTA section not found');
      return;
    }

    const ctaCard = ctaSection.querySelector('.card');
    if (!ctaCard) {
      console.log('⚠️ CTA card not found');
      return;
    }

    ctaCard.innerHTML = `
      <div>
        <span class="section-subtitle">${cta.subtitle}</span>
        <h2 id="cta-heading" class="text-3xl md:text-4xl font-semibold text-gray-100">${cta.heading}</h2>
        <p class="mt-4 max-w-2xl">${cta.description}</p>
      </div>
      <div class="flex flex-col gap-3 w-full md:w-auto">
        ${cta.buttons.map(btn => `
          <a href="${btn.link}" class="btn ${btn.primary ? 'btn-primary' : ''} text-center">${btn.text}</a>
        `).join('')}
      </div>
    `;
    console.log('✓ Home CTA loaded');
  }

  // ===== CONTACT PAGE LOADERS =====
  loadContactPage() {
    if (!this.contact) {
      console.error('✗ Contact data not available!');
      return;
    }

    console.log('📞 Loading Contact page content...');
    this.loadContactHero();
    this.loadContactCards();
    this.loadContactNote();
  }

  loadContactHero() {
    const hero = this.contact.hero;
    const heroSection = document.querySelector('.space-y-10 .text-center');
    if (!heroSection) return;

    heroSection.innerHTML = `
      <span class="section-subtitle">${hero.subtitle}</span>
      <h1 class="text-4xl md:text-5xl font-bold text-gray-100 leading-snug">${hero.heading}</h1>
      <p class="lead">${hero.lead}</p>
    `;
  }

  loadContactCards() {
    const container = document.querySelector('.grid.gap-6.md\\:grid-cols-3');
    if (!container) return;

    container.innerHTML = this.contact.contactCards.map(card => `
      <a href="${card.link}" ${card.external ? 'target="_blank" rel="noopener noreferrer"' : ''} class="card text-center space-y-3 p-6 hover:border-accent/50 transition-all duration-300 cursor-pointer group">
        <div class="text-accent text-2xl">
          <i class="${card.icon}"></i>
        </div>
        <h3 class="text-base font-semibold text-gray-100 group-hover:text-accent transition-colors">${card.title}</h3>
        <span class="text-xs text-slate-300 ${card.title === 'Email' ? 'break-all' : ''}">${card.displayText}</span>
      </a>
    `).join('');
  }

  loadContactNote() {
    const note = this.contact.quickNote;
    const noteCard = document.querySelector('.card.max-w-xl');
    if (!noteCard) return;

    noteCard.innerHTML = `
      <div class="space-y-4 text-center">
        <h2 class="text-xl font-semibold text-gray-100">${note.heading}</h2>
        <p class="text-sm text-slate-300">${note.message}</p>
        <div class="pt-2">
          <a href="${note.buttonLink}" class="btn btn-primary inline-block">${note.buttonText}</a>
        </div>
      </div>
    `;
  }

  // ===== PROJECTS PAGE LOADERS =====
  loadProjectsPage() {
    if (!this.projectsPage) {
      console.error('✗ Projects page data not available!');
      return;
    }

    console.log('🚀 Loading Projects page content...');
    this.loadProjectsHero();
    this.loadProjectsCTA();
  }

  loadProjectsHero() {
    const hero = this.projectsPage.hero;
    const heroSection = document.getElementById('projects-hero');
    if (!heroSection) {
      console.log('⚠️ Projects hero section not found');
      return;
    }

    heroSection.innerHTML = `
      <span class="section-subtitle">${hero.subtitle}</span>
      <h1 class="text-4xl md:text-5xl font-bold text-gray-100 leading-snug">${hero.heading}</h1>
      <p class="lead">${hero.lead}</p>
    `;
    console.log('✓ Projects hero loaded');
  }

  loadProjectsCTA() {
    const cta = this.projectsPage.cta;
    const ctaSection = document.getElementById('projects-cta');
    if (!ctaSection) {
      console.log('⚠️ Projects CTA section not found');
      return;
    }

    const ctaCard = ctaSection.querySelector('.card');
    if (!ctaCard) {
      console.log('⚠️ Projects CTA card not found');
      return;
    }

    ctaCard.innerHTML = `
      <div>
        <span class="section-subtitle">${cta.subtitle}</span>
        <h2 class="text-3xl md:text-4xl font-semibold text-gray-100">${cta.heading}</h2>
        <p class="mt-4 max-w-2xl">${cta.description}</p>
      </div>
      <div class="flex flex-col gap-3 w-full md:w-auto">
        ${cta.buttons.map(btn => `
          <a href="${btn.link}" class="btn ${btn.primary ? 'btn-primary' : ''} text-center">${btn.text}</a>
        `).join('')}
      </div>
    `;
    console.log('✓ Projects CTA loaded');
  }

  // ===== BLOGS PAGE LOADERS =====
  loadBlogsPage() {
    if (!this.blogsPage) {
      console.error('✗ Blogs page data not available!');
      return;
    }

    console.log('📰 Loading Blogs page content...');
    this.loadBlogsHero();
    this.loadBlogsLatestSection();
    this.loadBlogsTopics();
    this.loadBlogsNewsletter();
    this.loadBlogsCTA();
  }

  loadBlogsHero() {
    const hero = this.blogsPage.hero;
    const heroSection = document.getElementById('blogs-hero');
    if (!heroSection) {
      console.log('⚠️ Blogs hero section not found');
      return;
    }

    heroSection.innerHTML = `
      <span class="section-subtitle">${hero.subtitle}</span>
      <h1 class="text-4xl md:text-5xl font-bold text-gray-100 leading-snug">${hero.heading}</h1>
      <p class="lead">${hero.lead}</p>
      <div class="flex flex-wrap gap-3">
        ${hero.badges.map(badge => `
          <span class="badge"><i class="${badge.icon}"></i> ${badge.label}</span>
        `).join('')}
      </div>
    `;
    console.log('✓ Blogs hero loaded');
  }

  loadBlogsLatestSection() {
    const latest = this.blogsPage.latestSection;
    const section = document.querySelector('[aria-labelledby="latest-heading"]');
    if (!section) {
      console.log('⚠️ Latest posts section not found');
      return;
    }

    const header = section.querySelector('.flex > div');
    if (header) {
      header.innerHTML = `
        <span class="section-subtitle">${latest.subtitle}</span>
        <h2 id="latest-heading" class="text-3xl md:text-4xl font-semibold text-gray-100">${latest.heading}</h2>
      `;
    }
    const cta = section.querySelector('a.btn');
    if (cta) {
      cta.textContent = latest.ctaText;
      cta.href = latest.ctaLink;
    }
    console.log('✓ Blogs latest section loaded');
  }

  loadBlogsTopics() {
    const topics = this.blogsPage.topics;
    const topicsCard = document.getElementById('topics-card');
    if (!topicsCard) {
      console.log('⚠️ Topics card not found');
      return;
    }

    topicsCard.innerHTML = `
      <span class="section-subtitle">${topics.subtitle}</span>
      <ul class="space-y-3 text-sm">
        ${topics.items.map(item => `
          <li><strong class="text-accent">${item.title}</strong> ${item.description}</li>
        `).join('')}
      </ul>
    `;
    console.log('✓ Blogs topics loaded');
  }

  loadBlogsNewsletter() {
    const newsletter = this.blogsPage.newsletter;
    const newsletterCard = document.getElementById('newsletter-card');
    if (!newsletterCard) {
      console.log('⚠️ Newsletter card not found');
      return;
    }

    newsletterCard.innerHTML = `
      <span class="section-subtitle">${newsletter.subtitle}</span>
      <h3 class="text-2xl font-semibold text-gray-100">${newsletter.heading}</h3>
      <p class="text-sm text-slate-300">${newsletter.description}</p>
      <form class="grid gap-4 md:grid-cols-[2fr,1fr]" novalidate>
        <input type="email" placeholder="${newsletter.placeholder}" class="w-full bg-secondary-dark border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-accent text-gray-100" required>
        <button type="submit" class="btn btn-primary">${newsletter.buttonText}</button>
      </form>
      <p class="text-xs text-slate-500">${newsletter.disclaimer}</p>
    `;
    console.log('✓ Blogs newsletter loaded');
  }

  loadBlogsCTA() {
    const cta = this.blogsPage.cta;
    const ctaSection = document.getElementById('blogs-cta');
    if (!ctaSection) {
      console.log('⚠️ Blogs CTA section not found');
      return;
    }

    const ctaCard = ctaSection.querySelector('.card');
    if (!ctaCard) {
      console.log('⚠️ Blogs CTA card not found');
      return;
    }

    ctaCard.innerHTML = `
      <div>
        <span class="section-subtitle">${cta.subtitle}</span>
        <h2 class="text-3xl md:text-4xl font-semibold text-gray-100">${cta.heading}</h2>
        <p class="mt-4 max-w-2xl">${cta.description}</p>
      </div>
      <div class="flex flex-col gap-3 w-full md:w-auto">
        ${cta.buttons.map(btn => `
          <a href="${btn.link}" class="btn ${btn.primary ? 'btn-primary' : ''}">${btn.text}</a>
        `).join('')}
      </div>
    `;
    console.log('✓ Blogs CTA loaded');
  }

  // Load Footer
  loadFooter() {
    if (!this.footer) {
      console.log('⚠️ Footer data not loaded');
      return;
    }

    const footerElement = document.querySelector('footer');
    if (!footerElement) {
      console.log('⚠️ Footer element not found');
      return;
    }

    const brand = this.footer.brand;
    const navigate = this.footer.navigate;
    const connect = this.footer.connect;
    const copyright = this.footer.copyright;

    // Adjust links based on current directory
    const adjustLink = (url) => {
      if (url.startsWith('http') || url.startsWith('mailto:')) {
        return url;
      }
      if (this.inPagesDir && !url.includes('pages/')) {
        return '../' + url;
      }
      if (this.inPagesDir && url.includes('pages/')) {
        return url.replace('pages/', '');
      }
      return url;
    };

    footerElement.innerHTML = `
      <div class="container mx-auto px-6 md:px-16 lg:px-24 flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div class="space-y-4 max-w-md">
          <a href="${adjustLink(brand.logoLink)}" class="text-accent font-bold text-2xl font-mono">${brand.logo}</a>
          <p class="text-sm text-slate-400">${brand.tagline}</p>
        </div>
        <div class="grid gap-6 sm:grid-cols-2">
          <div>
            <h3 class="font-mono text-accent text-sm uppercase tracking-widest">${navigate.heading}</h3>
            <ul class="mt-3 space-y-2 text-sm">
              ${navigate.links.map(link => `
                <li><a href="${adjustLink(link.url)}" class="nav-link">${link.text}</a></li>
              `).join('')}
            </ul>
          </div>
          <div>
            <h3 class="font-mono text-accent text-sm uppercase tracking-widest">${connect.heading}</h3>
            <ul class="mt-3 space-y-2 text-sm">
              ${connect.links.map(link => `
                <li><a href="${adjustLink(link.url)}"${link.external ? ' target="_blank" rel="noopener noreferrer"' : ''} class="nav-link">${link.text}</a></li>
              `).join('')}
            </ul>
          </div>
        </div>
      </div>
      <div class="mt-10 text-center text-xs font-mono text-slate-500">${copyright}</div>
    `;

    console.log('✓ Footer loaded');
  }
}


// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  console.log('📄 Page loaded, initializing content...');
  
  const loader = new PortfolioLoader();
  await loader.init();

  const path = window.location.pathname;
  console.log('📍 Current path:', path);

  // Load content based on which page we're on
  if (path.includes('blogs.html')) {
    console.log('📰 Loading BLOGS page...');
    loader.loadBlogsPage();
    loader.loadFeaturedBlog('featured-blog');
    loader.loadBlogs('latest-blogs', false);
  } else if (path.includes('projects.html')) {
    console.log('🚀 Loading PROJECTS page...');
    loader.loadProjectsPage();
    loader.loadProjects('all-projects', false);
  } else if (path.includes('about.html')) {
    console.log('ℹ️ Loading ABOUT page...');
    loader.loadAboutPage();
  } else if (path.includes('contact.html')) {
    console.log('📞 Loading CONTACT page...');
    loader.loadContactPage();
  } else {
    console.log('🏠 Loading HOME page...');
    loader.loadHomePage();
    loader.updateProfile();
    loader.loadProjects('featured-projects', true);
    loader.loadBlogs('latest-blogs', false, 3);
    loader.loadExperience('experience-preview', 2);
    loader.loadStats('.grid.gap-6.md\\:grid-cols-3');
  }

  // Load footer on all pages
  loader.loadFooter();

  console.log('✅ Content loading complete!');
});

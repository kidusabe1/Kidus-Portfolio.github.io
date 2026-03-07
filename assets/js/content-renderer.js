(function () {
  function createProjectCard(project) {
    const article = document.createElement('article');

    const imageSpan = document.createElement('span');
    imageSpan.className = 'image';

    const image = document.createElement('img');
    image.src = project.image;
    image.alt = project.title;
    image.loading = 'lazy';
    imageSpan.appendChild(image);

    const header = document.createElement('header');
    header.className = 'major';

    const title = document.createElement('h3');
    const link = document.createElement('a');
    link.href = project.link;
    link.className = 'link';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = project.title;
    title.appendChild(link);

    const description = document.createElement('p');
    description.textContent = project.description;

    header.appendChild(title);
    header.appendChild(description);

    article.appendChild(imageSpan);
    article.appendChild(header);

    return article;
  }

  function createTimelineEvent(event) {
    const row = document.createElement('div');
    row.className = 'event';

    const image = document.createElement('img');
    image.src = event.image;
    image.alt = event.title;
    image.loading = 'lazy';

    const content = document.createElement('div');
    content.className = 'content';

    const year = document.createElement('div');
    year.className = 'year';
    year.textContent = event.year;

    const title = document.createElement('div');
    title.className = 'title';
    title.textContent = event.title;

    content.appendChild(year);
    content.appendChild(title);

    if (event.description) {
      const description = document.createElement('p');
      description.className = 'description';
      description.textContent = event.description + ' ';

      if (event.link) {
        const cta = document.createElement('a');
        cta.href = event.link;
        cta.target = '_blank';
        cta.rel = 'noopener noreferrer';
        cta.textContent = event.cta || 'Read more';
        description.appendChild(cta);
      }

      content.appendChild(description);
    }

    row.appendChild(image);
    row.appendChild(content);

    return row;
  }

  function createBlogCard(blog) {
    const card = document.createElement('article');
    card.className = 'blog-card';

    const title = document.createElement('h3');
    title.textContent = blog.title;

    const description = document.createElement('p');
    description.textContent = blog.description;

    const link = document.createElement('a');
    link.className = 'button small';
    link.href = blog.link;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = blog.cta || 'Read';

    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(link);

    return card;
  }

  function renderCollection(selector, items, mapper) {
    const container = document.querySelector(selector);
    if (!container || !Array.isArray(items)) {
      return;
    }

    const fragment = document.createDocumentFragment();
    items.forEach(function (item) {
      fragment.appendChild(mapper(item));
    });

    container.replaceChildren(fragment);
  }

  function init() {
    const content = window.PORTFOLIO_CONTENT;
    if (!content) {
      return;
    }

    renderCollection('[data-section="projects"]', content.projects, createProjectCard);
    renderCollection('[data-section="publications"]', content.publications, createTimelineEvent);
    renderCollection('[data-section="workExperience"]', content.workExperience, createTimelineEvent);
    renderCollection('[data-section="blogs"]', content.blogs, createBlogCard);
    renderCollection('[data-section="extraCurricular"]', content.extraCurricular, createTimelineEvent);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

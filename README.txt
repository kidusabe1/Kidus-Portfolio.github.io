Kidus Portfolio

Deployment notes

- Live site URL: https://kidusabe1.github.io/
- You can also see the latest deployed URL in GitHub under **Actions** → latest **Deploy to GitHub Pages** run → `deploy` job (environment `github-pages`).
- Multiple deployments are expected: every push to `main` triggers a new deployment, and `workflow_dispatch` allows manual deployments too.

Quick content update guide

1) Edit section data
- File: /assets/js/content-data.js
- Each homepage section is populated from window.PORTFOLIO_CONTENT:
  - projects
  - publications
  - workExperience
  - blogs
  - extraCurricular
- Add a new card/event by adding one new object in the matching array.

2) Add a brand new section (example: education)
- Step A: Add data in /assets/js/content-data.js
  education: [
    {
      image: 'images/school-logo.png',
      year: '2021 - 2025',
      title: 'B.Tech in AI',
      description: 'Your text here.'
    }
  ]

- Step B: Add container in /index.html
  <section class="content-section" id="education">
    <div class="inner">
      <h2 class="section-heading">Education</h2>
      <div class="timeline" data-section="education"></div>
    </div>
  </section>

- Step C: Render it in /assets/js/content-renderer.js (inside init())
  renderCollection('[data-section="education"]', content.education, createTimelineEvent);

3) If you need a new component type
- Add a new mapper function in /assets/js/content-renderer.js (similar to createProjectCard, createTimelineEvent, createBlogCard).
- Call renderCollection with that mapper for your new data-section container.

4) CV page update
- CV page file: /generic.html
- PDF source currently shown in the modern preview: /myCV.pdf
- Replace /myCV.pdf with your latest CV (same filename) to update instantly.

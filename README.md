# Swapnil Tungare — Finance & Analytics Portfolio

Production-ready Next.js + TypeScript portfolio for Swapnil Tungare.

## Stack

- Next.js
- TypeScript
- React
- Static public assets
- Vercel-ready
- Same-origin HTTPS deployment for resume, research PDFs, and model downloads

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
npm run build
npm start
```

## Vercel deployment

1. Push this repository to GitHub.
2. Import the GitHub repository into Vercel.
3. Vercel will detect Next.js automatically.
4. Deploy.
5. Replace `metadataBase` in `app/layout.tsx` with the final Vercel/custom domain.

## Content folders

### New projects
Create one folder per project under:

```text
public/projects/<project-slug>/
```

Then add one structured object to:

```text
data/projects.ts
```

### Certificates

```text
public/certificates/
```

Only add a public **View credential** button after the actual certificate or verification URL is available.

### Introduction video

```text
public/video/
```

The homepage button/modal is already built. Add the final 3–5 minute video later.

Preferred deployment: an unlisted YouTube/Vimeo embed to avoid shipping a large video file with the site. Autoplay should remain disabled.

### Excel / financial models

```text
public/models/
```

NVIDIA is already included.

### Resume

```text
public/resume/
```

## Security / publication model

When deployed to Vercel, site files are served through HTTPS from the same deployment domain. The project does not depend on temporary ChatGPT sandbox links.

Current security headers include:
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-Frame-Options: SAMEORIGIN`
- restricted browser permissions

Do not commit passwords, API keys, account credentials, or private datasets to `public/` or to GitHub.

## Updating profile/contact details

Edit:

```text
data/site.ts
```

## Current portfolio structure

- About
- Capabilities
- Skills
- Professional experience
- Interactive project case studies
- Leadership & volunteering
- Education & certifications
- Finance Lab calculators
- Resume
- LinkedIn
- Contact modal
- Reserved introduction-video modal

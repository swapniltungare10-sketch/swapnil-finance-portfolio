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

## Content folders

- New projects: `public/projects/<project-slug>/`
- Certificates: `public/certificates/`
- Introduction video: `public/video/`
- Excel / financial models: `public/models/`
- Resume: `public/resume/`

Project metadata lives in `data/projects.ts`; profile/contact details live in `data/site.ts`.

## Security

Production deployment uses HTTPS. Do not commit passwords, API keys, private datasets, or confidential employer/client data.

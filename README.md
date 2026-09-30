# Chilanka Dance School V2

Clean Vite + React build of the Chilanka Dance School website, ready for local VS Code development and Vercel deployment.

## Run in VS Code

1. Open this folder in VS Code.
2. Open **Terminal > New Terminal**.
3. Run:

   ```bash
   npm install
   npm run dev
   ```

4. Open `http://localhost:8080`.

## Production build

```bash
npm run build
npm run preview
```

The production output is created in `dist/`.

## Deploy to Vercel

### GitHub method

1. Push this project to GitHub.
2. In Vercel choose **Add New > Project**.
3. Import the GitHub repository.
4. Vercel will detect Vite, use the included `vercel.json`, and run `npm run build`.
5. Deploy.

### Vercel CLI method

```bash
npm i -g vercel
vercel
vercel --prod
```

## SEO included

- SEO title and meta description
- Canonical URL
- robots meta directives
- Open Graph metadata
- Twitter/X card metadata
- LocalBusiness + EducationalOrganization structured data
- `robots.txt`
- `sitemap.xml`
- semantic page content and image alt text already present in the site
- 1200x630 social preview image
- favicon and web manifest
- optimized Vercel caching for static assets

## Before using a custom domain

The SEO files currently use:

`https://chilanka-dance-school.vercel.app/`

If you connect a custom domain, replace that URL in these files:

- `index.html`
- `public/robots.txt`
- `public/sitemap.xml`

This keeps canonical, social metadata, structured data, and sitemap URLs consistent.

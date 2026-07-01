import { defineCliConfig } from 'sanity/cli';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET || 'production';

if (!projectId) {
  console.warn(
    '[sanity-studio] SANITY_STUDIO_PROJECT_ID ontbreekt. Kopieer .env.example naar .env en vul je project-ID in, of voer `npx sanity init` uit.',
  );
}

export default defineCliConfig({
  api: {
    projectId: projectId || 'missing-project-id',
    dataset,
  },
  studioHost: process.env.SANITY_STUDIO_HOSTNAME,
});

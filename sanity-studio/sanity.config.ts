import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';
import { structure } from './structure';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'missing-project-id';
const dataset = process.env.SANITY_STUDIO_DATASET || 'production';

export default defineConfig({
  name: 'incany-events',
  title: 'Café In Cany — Evenementen',
  projectId,
  dataset,
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: '2025-01-01' }),
  ],
  schema: {
    types: schemaTypes,
  },
});

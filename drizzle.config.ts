import { defineConfig } from 'drizzle-kit'
export default defineConfig({
  schema: "./utils/schema.ts",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://Ai-Interview-Mocker_owner:sfki4CH9KjJn@ep-polished-silence-a5612izh-pooler.us-east-2.aws.neon.tech/Ai-Interview-Mocker?sslmode=require',
  },
  verbose: true,
  strict: true,
})
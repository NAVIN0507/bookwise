import  config from "@/lib/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from 'drizzle-orm/neon-http';

// or .env.local
const sql = neon("postgresql://library_owner:CE2QyK5wzqTf@ep-patient-hat-a2r2foul.eu-central-1.aws.neon.tech/library?sslmode=requirenpm i --save-dev @types/bcryptjs");
export const db = drizzle({client:sql});

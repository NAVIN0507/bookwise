import  config from "@/lib/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from 'drizzle-orm/neon-http';

// or .env.local
const sql = neon(config.env.databaseUrl as string);
export const db = drizzle({client:sql});

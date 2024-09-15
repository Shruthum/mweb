import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { manage_schema } from './schema'

export const queryClient = postgres(process.env.DRIZZLE_ORM_DATABASE_URL!,{ max: 1 })
export const drizzle_db = drizzle(queryClient)
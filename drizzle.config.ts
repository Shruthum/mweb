import type { Config } from 'drizzle-kit'

export default {
    dialect: "postgresql",
    schema: "./drizzle/schema.ts",
    out: "./drizzle/schemas",
    dbCredentials :{
        url: process.env.DRIZZLE_ORM_DATABASE_URL!
    }
} satisfies Config
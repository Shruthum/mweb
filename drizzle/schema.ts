import { text,pgTable,serial,index } from 'drizzle-orm/pg-core'

export const manage_schema = pgTable(
    "manager_table",{
        id: serial("id").primaryKey(),
        code: text("code").unique().notNull(),
        name: text("name").notNull(),
        headmaster: text("headmaster").notNull(),
        phoneno: text("phoneno").notNull(),
        email: text("email").notNull(),
        highersecondary: text("highersecondary").notNull(),
        loweersecondary: text("lowersecondary").notNull(),
        district: text("district").notNull(),
        block: text("block").notNull(),
        ps: text("police_station").notNull()
    },
    (manage_schema) => {
        return {
            codeIndex: index("code_idx").on(manage_schema.code)
        }
    }
)
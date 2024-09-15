import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { drizzle_db } from './drizzle_client';

async function migration(){
    await migrate(drizzle_db,{
        migrationsFolder: "./drizzle"
    }).then(() => {
        console.log("Migration successful")
    }).catch(() => {
        console.log("Migration Failed")
    })
}
migration()
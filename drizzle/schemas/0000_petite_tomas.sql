CREATE TABLE IF NOT EXISTS "manager_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" text NOT NULL,
	"name" text NOT NULL,
	"headmaster" text NOT NULL,
	"phoneno" text NOT NULL,
	"email" text NOT NULL,
	"highersecondary" text NOT NULL,
	"lowersecondary" text NOT NULL,
	"district" text NOT NULL,
	"block" text NOT NULL,
	"police_station" text NOT NULL,
	CONSTRAINT "manager_table_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "code_idx" ON "manager_table" USING btree ("code");
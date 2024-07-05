CREATE TABLE IF NOT EXISTS "guestbook" (
	"id" text PRIMARY KEY NOT NULL,
	"message" text NOT NULL,
	"author_id" text NOT NULL,
	"created_at" timestamp DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	"updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "guestbook" ADD CONSTRAINT "guestbook_author_id_user_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "account" DROP COLUMN IF EXISTS "access_token_expires_in";
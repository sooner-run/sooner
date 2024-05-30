ALTER TABLE "users" DROP CONSTRAINT "users_id_unique";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT 'e599566f-4ee0-4b77-a4b6-43f9f7fddcc4';
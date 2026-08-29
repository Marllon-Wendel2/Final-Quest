-- AlterTable: Migrate event_type from EventType enum to TEXT
ALTER TABLE "game_events" ADD COLUMN "event_type_new" TEXT;

UPDATE "game_events" SET "event_type_new" = "event_type"::TEXT;

ALTER TABLE "game_events" DROP COLUMN "event_type";

ALTER TABLE "game_events" RENAME COLUMN "event_type_new" TO "event_type";

ALTER TABLE "game_events" ALTER COLUMN "event_type" SET NOT NULL;

DROP TYPE "EventType";

-- CreateEnum
CREATE TYPE "EventType" AS ENUM (
  'PLAYER_MOVED',
  'ITEM_COLLECTED',
  'ITEM_USED',
  'DIALOGUE_COMPLETED',
  'GHOST_ENCOUNTERED',
  'ADVENTURER_TALKED',
  'MISSION_STARTED',
  'MISSION_PROGRESS',
  'MISSION_COMPLETED',
  'FLAG_SET',
  'MINIGAME_RESULT'
);

-- CreateEnum
CREATE TYPE "MissionType" AS ENUM (
  'COLLECTION',
  'BATTLE',
  'DIALOGUE',
  'DELIVERY'
);

-- AlterTable: Migrate game_events.event_type from TEXT to EventType enum
ALTER TABLE "game_events" ADD COLUMN "event_type_new" "EventType";
UPDATE "game_events" SET "event_type_new" = "event_type"::"EventType";
ALTER TABLE "game_events" ALTER COLUMN "event_type_new" SET NOT NULL;
ALTER TABLE "game_events" DROP COLUMN "event_type";
ALTER TABLE "game_events" RENAME COLUMN "event_type_new" TO "event_type";

-- AlterTable: Add missionType and requirements to missions
ALTER TABLE "missions" ADD COLUMN "mission_type" "MissionType" NOT NULL DEFAULT 'COLLECTION';
ALTER TABLE "missions" ADD COLUMN "requirements" JSONB NOT NULL DEFAULT '{}';

-- CreateEnum
CREATE TYPE "Frequency" AS ENUM ('ONCE', 'MINUTE', 'HOUR', 'DAILY', 'WEEKLY', 'MONTHLY');

-- AlterTable: missions
ALTER TABLE "missions" ADD COLUMN "frequency" "Frequency" NOT NULL DEFAULT 'ONCE';
ALTER TABLE "missions" ADD COLUMN "max_completions" INTEGER;

-- AlterTable: player_missions
ALTER TABLE "player_missions" ADD COLUMN "reset_window" TEXT;

-- Update existing rows with default value
UPDATE "player_missions" SET "reset_window" = 'once' WHERE "reset_window" IS NULL;

-- Make column NOT NULL after data is populated
ALTER TABLE "player_missions" ALTER COLUMN "reset_window" SET NOT NULL;
ALTER TABLE "player_missions" ALTER COLUMN "reset_window" SET DEFAULT 'once';

-- DropOldIndex
DROP INDEX IF EXISTS "player_missions_user_id_mission_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "player_missions_user_id_mission_id_reset_window_key" ON "player_missions"("user_id", "mission_id", "reset_window");

-- CreateIndex
CREATE INDEX "player_missions_user_id_mission_id_idx" ON "player_missions"("user_id", "mission_id");

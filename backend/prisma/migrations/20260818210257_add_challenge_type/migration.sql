/*
  Warnings:

  - Made the column `max_completions` on table `missions` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "ChallengeType" AS ENUM ('NONE', 'MEMORY', 'TIC_TAC_TOE');

-- DropIndex
DROP INDEX "player_missions_user_id_mission_id_idx";

-- AlterTable
ALTER TABLE "missions" ADD COLUMN     "challenge_type" "ChallengeType" NOT NULL DEFAULT 'NONE',
ALTER COLUMN "max_completions" SET NOT NULL,
ALTER COLUMN "max_completions" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "player_missions" ALTER COLUMN "reset_window" DROP DEFAULT;

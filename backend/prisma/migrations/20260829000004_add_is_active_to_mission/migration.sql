-- AlterTable
ALTER TABLE "missions" ADD COLUMN IF NOT EXISTS "is_active" BOOLEAN NOT NULL DEFAULT true;

-- Disable all missions that are not part of video lessons 1 to 15
UPDATE "missions"
SET "is_active" = false
WHERE "challenge_type" <> 'VIDEO_LESSON'
   OR "title" !~ '^Aula ([1-9]|1[0-5]):';

-- CreateTable
CREATE TABLE IF NOT EXISTS "video_lesson_progress" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "mission_id" UUID NOT NULL,
    "answered_questions" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    "xp_granted" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    "bonus_granted" BOOLEAN NOT NULL DEFAULT false,
    "video_completed" BOOLEAN NOT NULL DEFAULT false,
    "mission_completed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "video_lesson_progress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "video_lesson_progress_user_id_mission_id_key" ON "video_lesson_progress"("user_id", "mission_id");

-- AddForeignKey
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'video_lesson_progress_user_id_fkey'
    ) THEN
        ALTER TABLE "video_lesson_progress"
        ADD CONSTRAINT "video_lesson_progress_user_id_fkey"
        FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;

-- AddForeignKey
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'video_lesson_progress_mission_id_fkey'
    ) THEN
        ALTER TABLE "video_lesson_progress"
        ADD CONSTRAINT "video_lesson_progress_mission_id_fkey"
        FOREIGN KEY ("mission_id") REFERENCES "missions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;

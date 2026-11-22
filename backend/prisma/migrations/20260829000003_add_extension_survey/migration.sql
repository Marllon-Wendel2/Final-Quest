-- CreateTable
CREATE TABLE IF NOT EXISTS "extension_surveys" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "course_id" TEXT NOT NULL DEFAULT 'logicaGuanabara',
    "pre_submitted_at" TIMESTAMP(3),
    "age_range" TEXT,
    "profile_type" TEXT,
    "education_level" TEXT,
    "city_state" TEXT,
    "prior_programming" BOOLEAN,
    "pre_confidence" INTEGER,
    "expectation" TEXT,
    "consent_accepted" BOOLEAN NOT NULL DEFAULT false,
    "post_submitted_at" TIMESTAMP(3),
    "post_confidence" INTEGER,
    "gamification_rating" INTEGER,
    "overall_rating" INTEGER,
    "difficulties" TEXT,
    "highlights" TEXT,
    "suggestions" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "extension_surveys_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "extension_surveys_user_id_course_id_key" ON "extension_surveys"("user_id", "course_id");

-- AddForeignKey
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'extension_surveys_user_id_fkey'
    ) THEN
        ALTER TABLE "extension_surveys"
        ADD CONSTRAINT "extension_surveys_user_id_fkey"
        FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;

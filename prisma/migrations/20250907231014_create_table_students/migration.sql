-- CreateTable
CREATE TABLE "students" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "email" TEXT,
    "avatar" TEXT DEFAULT 'avatar.png',
    "serie" TEXT NOT NULL,
    "urlRepository" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "students_login_key" ON "students"("login");

-- CreateIndex
CREATE UNIQUE INDEX "students_email_key" ON "students"("email");

/*
  Warnings:

  - A unique constraint covering the columns `[programCode]` on the table `Program` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `programCode` to the `Program` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Program" ADD COLUMN     "programCode" TEXT NOT NULL,
ALTER COLUMN "tuitionFee" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Program_programCode_key" ON "Program"("programCode");

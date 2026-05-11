-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Borrow" ADD COLUMN     "dueDate" TIMESTAMP(3),
ADD COLUMN     "isApproved" BOOLEAN NOT NULL DEFAULT false;

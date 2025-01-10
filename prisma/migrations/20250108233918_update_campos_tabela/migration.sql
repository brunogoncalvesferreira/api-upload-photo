/*
  Warnings:

  - You are about to drop the column `key` on the `Photos` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `Photos` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Photos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Photos" ("createdAt", "id", "name", "path") SELECT "createdAt", "id", "name", "path" FROM "Photos";
DROP TABLE "Photos";
ALTER TABLE "new_Photos" RENAME TO "Photos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

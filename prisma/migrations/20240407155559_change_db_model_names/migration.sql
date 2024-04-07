/*
  Warnings:

  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Group` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Comment" DROP CONSTRAINT "Comment_post_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Group" DROP CONSTRAINT "Group_creator_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Post" DROP CONSTRAINT "Post_author_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Post" DROP CONSTRAINT "Post_group_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."_users_group" DROP CONSTRAINT "_users_group_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_users_group" DROP CONSTRAINT "_users_group_B_fkey";

-- DropTable
DROP TABLE "public"."Comment";

-- DropTable
DROP TABLE "public"."Group";

-- DropTable
DROP TABLE "public"."Post";

-- DropTable
DROP TABLE "public"."User";

-- CreateTable
CREATE TABLE "public"."public_user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "public_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."public_group" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "creator_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "public_group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."public_post" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image_url" TEXT,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "is_report" BOOLEAN NOT NULL DEFAULT false,
    "author_id" TEXT NOT NULL,
    "group_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "public_post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."public_comment" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "post_id" TEXT NOT NULL,

    CONSTRAINT "public_comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "public_user_email_key" ON "public"."public_user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "public_group_name_key" ON "public"."public_group"("name");

-- AddForeignKey
ALTER TABLE "public"."public_group" ADD CONSTRAINT "public_group_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "public"."public_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."public_post" ADD CONSTRAINT "public_post_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "public"."public_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."public_post" ADD CONSTRAINT "public_post_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "public"."public_group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."public_comment" ADD CONSTRAINT "public_comment_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "public"."public_post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_users_group" ADD CONSTRAINT "_users_group_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."public_group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_users_group" ADD CONSTRAINT "_users_group_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."public_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

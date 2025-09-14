import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_question_topics_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_question_topics_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_question_topics_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  CREATE TYPE "public"."enum_question_topics_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__question_topics_v_version_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__question_topics_v_version_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__question_topics_v_version_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  CREATE TYPE "public"."enum__question_topics_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_question_sets_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_question_sets_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_question_sets_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  CREATE TYPE "public"."enum_question_sets_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__question_sets_v_version_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__question_sets_v_version_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__question_sets_v_version_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  CREATE TYPE "public"."enum__question_sets_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "questions_answers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" jsonb,
  	"image_id" integer
  );
  
  CREATE TABLE "questions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" numeric NOT NULL,
  	"title" varchar NOT NULL,
  	"image_id" integer,
  	"question_topic_id" integer NOT NULL,
  	"text" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "question_topics_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_question_topics_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_question_topics_hero_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "question_topics" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"question_set_id" integer,
  	"hero_type" "enum_question_topics_hero_type" DEFAULT 'lowImpact',
  	"hero_rich_text" jsonb,
  	"hero_media_id" integer,
  	"description" jsonb,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"published_at" timestamp(3) with time zone,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_question_topics_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "question_topics_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "_question_topics_v_version_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__question_topics_v_version_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__question_topics_v_version_hero_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_question_topics_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_question_set_id" integer,
  	"version_hero_type" "enum__question_topics_v_version_hero_type" DEFAULT 'lowImpact',
  	"version_hero_rich_text" jsonb,
  	"version_hero_media_id" integer,
  	"version_description" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__question_topics_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_question_topics_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "question_sets_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_question_sets_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_question_sets_hero_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "question_sets" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"hero_type" "enum_question_sets_hero_type" DEFAULT 'lowImpact',
  	"hero_rich_text" jsonb,
  	"hero_media_id" integer,
  	"description" jsonb,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"published_at" timestamp(3) with time zone,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_question_sets_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "question_sets_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "_question_sets_v_version_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__question_sets_v_version_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__question_sets_v_version_hero_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_question_sets_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_hero_type" "enum__question_sets_v_version_hero_type" DEFAULT 'lowImpact',
  	"version_hero_rich_text" jsonb,
  	"version_hero_media_id" integer,
  	"version_description" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__question_sets_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_question_sets_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "questions_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "question_topics_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "question_sets_id" integer;
  ALTER TABLE "questions_answers" ADD CONSTRAINT "questions_answers_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "questions_answers" ADD CONSTRAINT "questions_answers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."questions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "questions" ADD CONSTRAINT "questions_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "questions" ADD CONSTRAINT "questions_question_topic_id_question_topics_id_fk" FOREIGN KEY ("question_topic_id") REFERENCES "public"."question_topics"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "question_topics_hero_links" ADD CONSTRAINT "question_topics_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."question_topics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "question_topics" ADD CONSTRAINT "question_topics_question_set_id_question_sets_id_fk" FOREIGN KEY ("question_set_id") REFERENCES "public"."question_sets"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "question_topics" ADD CONSTRAINT "question_topics_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "question_topics" ADD CONSTRAINT "question_topics_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "question_topics_rels" ADD CONSTRAINT "question_topics_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."question_topics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "question_topics_rels" ADD CONSTRAINT "question_topics_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "question_topics_rels" ADD CONSTRAINT "question_topics_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_question_topics_v_version_hero_links" ADD CONSTRAINT "_question_topics_v_version_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_question_topics_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_question_topics_v" ADD CONSTRAINT "_question_topics_v_parent_id_question_topics_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."question_topics"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_question_topics_v" ADD CONSTRAINT "_question_topics_v_version_question_set_id_question_sets_id_fk" FOREIGN KEY ("version_question_set_id") REFERENCES "public"."question_sets"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_question_topics_v" ADD CONSTRAINT "_question_topics_v_version_hero_media_id_media_id_fk" FOREIGN KEY ("version_hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_question_topics_v" ADD CONSTRAINT "_question_topics_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_question_topics_v_rels" ADD CONSTRAINT "_question_topics_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_question_topics_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_question_topics_v_rels" ADD CONSTRAINT "_question_topics_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_question_topics_v_rels" ADD CONSTRAINT "_question_topics_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "question_sets_hero_links" ADD CONSTRAINT "question_sets_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."question_sets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "question_sets" ADD CONSTRAINT "question_sets_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "question_sets" ADD CONSTRAINT "question_sets_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "question_sets_rels" ADD CONSTRAINT "question_sets_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."question_sets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "question_sets_rels" ADD CONSTRAINT "question_sets_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "question_sets_rels" ADD CONSTRAINT "question_sets_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_question_sets_v_version_hero_links" ADD CONSTRAINT "_question_sets_v_version_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_question_sets_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_question_sets_v" ADD CONSTRAINT "_question_sets_v_parent_id_question_sets_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."question_sets"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_question_sets_v" ADD CONSTRAINT "_question_sets_v_version_hero_media_id_media_id_fk" FOREIGN KEY ("version_hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_question_sets_v" ADD CONSTRAINT "_question_sets_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_question_sets_v_rels" ADD CONSTRAINT "_question_sets_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_question_sets_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_question_sets_v_rels" ADD CONSTRAINT "_question_sets_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_question_sets_v_rels" ADD CONSTRAINT "_question_sets_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "questions_answers_order_idx" ON "questions_answers" USING btree ("_order");
  CREATE INDEX "questions_answers_parent_id_idx" ON "questions_answers" USING btree ("_parent_id");
  CREATE INDEX "questions_answers_image_idx" ON "questions_answers" USING btree ("image_id");
  CREATE INDEX "questions_image_idx" ON "questions" USING btree ("image_id");
  CREATE INDEX "questions_question_topic_idx" ON "questions" USING btree ("question_topic_id");
  CREATE INDEX "questions_updated_at_idx" ON "questions" USING btree ("updated_at");
  CREATE INDEX "questions_created_at_idx" ON "questions" USING btree ("created_at");
  CREATE UNIQUE INDEX "questionTopic_order_idx" ON "questions" USING btree ("question_topic_id","order");
  CREATE INDEX "question_topics_hero_links_order_idx" ON "question_topics_hero_links" USING btree ("_order");
  CREATE INDEX "question_topics_hero_links_parent_id_idx" ON "question_topics_hero_links" USING btree ("_parent_id");
  CREATE INDEX "question_topics_question_set_idx" ON "question_topics" USING btree ("question_set_id");
  CREATE INDEX "question_topics_hero_hero_media_idx" ON "question_topics" USING btree ("hero_media_id");
  CREATE INDEX "question_topics_meta_meta_image_idx" ON "question_topics" USING btree ("meta_image_id");
  CREATE INDEX "question_topics_slug_idx" ON "question_topics" USING btree ("slug");
  CREATE INDEX "question_topics_updated_at_idx" ON "question_topics" USING btree ("updated_at");
  CREATE INDEX "question_topics_created_at_idx" ON "question_topics" USING btree ("created_at");
  CREATE INDEX "question_topics__status_idx" ON "question_topics" USING btree ("_status");
  CREATE INDEX "question_topics_rels_order_idx" ON "question_topics_rels" USING btree ("order");
  CREATE INDEX "question_topics_rels_parent_idx" ON "question_topics_rels" USING btree ("parent_id");
  CREATE INDEX "question_topics_rels_path_idx" ON "question_topics_rels" USING btree ("path");
  CREATE INDEX "question_topics_rels_pages_id_idx" ON "question_topics_rels" USING btree ("pages_id");
  CREATE INDEX "question_topics_rels_posts_id_idx" ON "question_topics_rels" USING btree ("posts_id");
  CREATE INDEX "_question_topics_v_version_hero_links_order_idx" ON "_question_topics_v_version_hero_links" USING btree ("_order");
  CREATE INDEX "_question_topics_v_version_hero_links_parent_id_idx" ON "_question_topics_v_version_hero_links" USING btree ("_parent_id");
  CREATE INDEX "_question_topics_v_parent_idx" ON "_question_topics_v" USING btree ("parent_id");
  CREATE INDEX "_question_topics_v_version_version_question_set_idx" ON "_question_topics_v" USING btree ("version_question_set_id");
  CREATE INDEX "_question_topics_v_version_hero_version_hero_media_idx" ON "_question_topics_v" USING btree ("version_hero_media_id");
  CREATE INDEX "_question_topics_v_version_meta_version_meta_image_idx" ON "_question_topics_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_question_topics_v_version_version_slug_idx" ON "_question_topics_v" USING btree ("version_slug");
  CREATE INDEX "_question_topics_v_version_version_updated_at_idx" ON "_question_topics_v" USING btree ("version_updated_at");
  CREATE INDEX "_question_topics_v_version_version_created_at_idx" ON "_question_topics_v" USING btree ("version_created_at");
  CREATE INDEX "_question_topics_v_version_version__status_idx" ON "_question_topics_v" USING btree ("version__status");
  CREATE INDEX "_question_topics_v_created_at_idx" ON "_question_topics_v" USING btree ("created_at");
  CREATE INDEX "_question_topics_v_updated_at_idx" ON "_question_topics_v" USING btree ("updated_at");
  CREATE INDEX "_question_topics_v_latest_idx" ON "_question_topics_v" USING btree ("latest");
  CREATE INDEX "_question_topics_v_autosave_idx" ON "_question_topics_v" USING btree ("autosave");
  CREATE INDEX "_question_topics_v_rels_order_idx" ON "_question_topics_v_rels" USING btree ("order");
  CREATE INDEX "_question_topics_v_rels_parent_idx" ON "_question_topics_v_rels" USING btree ("parent_id");
  CREATE INDEX "_question_topics_v_rels_path_idx" ON "_question_topics_v_rels" USING btree ("path");
  CREATE INDEX "_question_topics_v_rels_pages_id_idx" ON "_question_topics_v_rels" USING btree ("pages_id");
  CREATE INDEX "_question_topics_v_rels_posts_id_idx" ON "_question_topics_v_rels" USING btree ("posts_id");
  CREATE INDEX "question_sets_hero_links_order_idx" ON "question_sets_hero_links" USING btree ("_order");
  CREATE INDEX "question_sets_hero_links_parent_id_idx" ON "question_sets_hero_links" USING btree ("_parent_id");
  CREATE INDEX "question_sets_hero_hero_media_idx" ON "question_sets" USING btree ("hero_media_id");
  CREATE INDEX "question_sets_meta_meta_image_idx" ON "question_sets" USING btree ("meta_image_id");
  CREATE INDEX "question_sets_slug_idx" ON "question_sets" USING btree ("slug");
  CREATE INDEX "question_sets_updated_at_idx" ON "question_sets" USING btree ("updated_at");
  CREATE INDEX "question_sets_created_at_idx" ON "question_sets" USING btree ("created_at");
  CREATE INDEX "question_sets__status_idx" ON "question_sets" USING btree ("_status");
  CREATE INDEX "question_sets_rels_order_idx" ON "question_sets_rels" USING btree ("order");
  CREATE INDEX "question_sets_rels_parent_idx" ON "question_sets_rels" USING btree ("parent_id");
  CREATE INDEX "question_sets_rels_path_idx" ON "question_sets_rels" USING btree ("path");
  CREATE INDEX "question_sets_rels_pages_id_idx" ON "question_sets_rels" USING btree ("pages_id");
  CREATE INDEX "question_sets_rels_posts_id_idx" ON "question_sets_rels" USING btree ("posts_id");
  CREATE INDEX "_question_sets_v_version_hero_links_order_idx" ON "_question_sets_v_version_hero_links" USING btree ("_order");
  CREATE INDEX "_question_sets_v_version_hero_links_parent_id_idx" ON "_question_sets_v_version_hero_links" USING btree ("_parent_id");
  CREATE INDEX "_question_sets_v_parent_idx" ON "_question_sets_v" USING btree ("parent_id");
  CREATE INDEX "_question_sets_v_version_hero_version_hero_media_idx" ON "_question_sets_v" USING btree ("version_hero_media_id");
  CREATE INDEX "_question_sets_v_version_meta_version_meta_image_idx" ON "_question_sets_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_question_sets_v_version_version_slug_idx" ON "_question_sets_v" USING btree ("version_slug");
  CREATE INDEX "_question_sets_v_version_version_updated_at_idx" ON "_question_sets_v" USING btree ("version_updated_at");
  CREATE INDEX "_question_sets_v_version_version_created_at_idx" ON "_question_sets_v" USING btree ("version_created_at");
  CREATE INDEX "_question_sets_v_version_version__status_idx" ON "_question_sets_v" USING btree ("version__status");
  CREATE INDEX "_question_sets_v_created_at_idx" ON "_question_sets_v" USING btree ("created_at");
  CREATE INDEX "_question_sets_v_updated_at_idx" ON "_question_sets_v" USING btree ("updated_at");
  CREATE INDEX "_question_sets_v_latest_idx" ON "_question_sets_v" USING btree ("latest");
  CREATE INDEX "_question_sets_v_autosave_idx" ON "_question_sets_v" USING btree ("autosave");
  CREATE INDEX "_question_sets_v_rels_order_idx" ON "_question_sets_v_rels" USING btree ("order");
  CREATE INDEX "_question_sets_v_rels_parent_idx" ON "_question_sets_v_rels" USING btree ("parent_id");
  CREATE INDEX "_question_sets_v_rels_path_idx" ON "_question_sets_v_rels" USING btree ("path");
  CREATE INDEX "_question_sets_v_rels_pages_id_idx" ON "_question_sets_v_rels" USING btree ("pages_id");
  CREATE INDEX "_question_sets_v_rels_posts_id_idx" ON "_question_sets_v_rels" USING btree ("posts_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_questions_fk" FOREIGN KEY ("questions_id") REFERENCES "public"."questions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_question_topics_fk" FOREIGN KEY ("question_topics_id") REFERENCES "public"."question_topics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_question_sets_fk" FOREIGN KEY ("question_sets_id") REFERENCES "public"."question_sets"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_questions_id_idx" ON "payload_locked_documents_rels" USING btree ("questions_id");
  CREATE INDEX "payload_locked_documents_rels_question_topics_id_idx" ON "payload_locked_documents_rels" USING btree ("question_topics_id");
  CREATE INDEX "payload_locked_documents_rels_question_sets_id_idx" ON "payload_locked_documents_rels" USING btree ("question_sets_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "questions_answers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "questions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "question_topics_hero_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "question_topics" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "question_topics_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_question_topics_v_version_hero_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_question_topics_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_question_topics_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "question_sets_hero_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "question_sets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "question_sets_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_question_sets_v_version_hero_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_question_sets_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_question_sets_v_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "questions_answers" CASCADE;
  DROP TABLE "questions" CASCADE;
  DROP TABLE "question_topics_hero_links" CASCADE;
  DROP TABLE "question_topics" CASCADE;
  DROP TABLE "question_topics_rels" CASCADE;
  DROP TABLE "_question_topics_v_version_hero_links" CASCADE;
  DROP TABLE "_question_topics_v" CASCADE;
  DROP TABLE "_question_topics_v_rels" CASCADE;
  DROP TABLE "question_sets_hero_links" CASCADE;
  DROP TABLE "question_sets" CASCADE;
  DROP TABLE "question_sets_rels" CASCADE;
  DROP TABLE "_question_sets_v_version_hero_links" CASCADE;
  DROP TABLE "_question_sets_v" CASCADE;
  DROP TABLE "_question_sets_v_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_questions_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_question_topics_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_question_sets_fk";
  
  DROP INDEX "payload_locked_documents_rels_questions_id_idx";
  DROP INDEX "payload_locked_documents_rels_question_topics_id_idx";
  DROP INDEX "payload_locked_documents_rels_question_sets_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "questions_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "question_topics_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "question_sets_id";
  DROP TYPE "public"."enum_question_topics_hero_links_link_type";
  DROP TYPE "public"."enum_question_topics_hero_links_link_appearance";
  DROP TYPE "public"."enum_question_topics_hero_type";
  DROP TYPE "public"."enum_question_topics_status";
  DROP TYPE "public"."enum__question_topics_v_version_hero_links_link_type";
  DROP TYPE "public"."enum__question_topics_v_version_hero_links_link_appearance";
  DROP TYPE "public"."enum__question_topics_v_version_hero_type";
  DROP TYPE "public"."enum__question_topics_v_version_status";
  DROP TYPE "public"."enum_question_sets_hero_links_link_type";
  DROP TYPE "public"."enum_question_sets_hero_links_link_appearance";
  DROP TYPE "public"."enum_question_sets_hero_type";
  DROP TYPE "public"."enum_question_sets_status";
  DROP TYPE "public"."enum__question_sets_v_version_hero_links_link_type";
  DROP TYPE "public"."enum__question_sets_v_version_hero_links_link_appearance";
  DROP TYPE "public"."enum__question_sets_v_version_hero_type";
  DROP TYPE "public"."enum__question_sets_v_version_status";`)
}

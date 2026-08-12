CREATE TYPE "public"."generation_job_status" AS ENUM('pending', 'generating', 'ready', 'held-for-review');--> statement-breakpoint
CREATE TABLE "generation_jobs" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" integer NOT NULL,
	"status" "generation_job_status" DEFAULT 'pending' NOT NULL,
	"house_system" text,
	"facts_payload" jsonb,
	"pdf_blob_url" text,
	"held_reason" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"stripe_session_id" text NOT NULL,
	"product_type" text NOT NULL,
	"customer_email" text NOT NULL,
	"birth_data" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "generation_jobs" ADD CONSTRAINT "generation_jobs_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "generation_jobs_order_id_idx" ON "generation_jobs" USING btree ("order_id");--> statement-breakpoint
CREATE UNIQUE INDEX "orders_stripe_session_id_unique" ON "orders" USING btree ("stripe_session_id");
import { pgTable, text, serial, timestamp, varchar, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema remains for authentication functionality if needed
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Documentation content schema
export const docs = pgTable("docs", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  subcategory: text("subcategory"),
  order: serial("order").notNull(),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Create schemas for insert operations
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertDocSchema = createInsertSchema(docs).pick({
  slug: true,
  title: true,
  content: true,
  category: true,
  subcategory: true,
  order: true,
  metadata: true,
});

// Define navigation items for the sidebar
export const navigationSchema = z.array(
  z.object({
    title: z.string(),
    icon: z.string(),
    items: z.array(
      z.object({
        title: z.string(),
        slug: z.string(),
        items: z.array(
          z.object({
            title: z.string(),
            slug: z.string(),
          })
        ).optional(),
      })
    ),
  })
);

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertDoc = z.infer<typeof insertDocSchema>;
export type Doc = typeof docs.$inferSelect;

export type Navigation = z.infer<typeof navigationSchema>;
export type NavigationItem = Navigation[number];
export type NavigationSubItem = NavigationItem["items"][number];
export type NavigationSubSubItem = NavigationSubItem["items"] extends Array<infer T> ? T : never;

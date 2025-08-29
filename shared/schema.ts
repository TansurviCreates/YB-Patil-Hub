import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  stream: text("stream").notNull(), // Computer, Civil, Mechanical, ENTC
  year: text("year").notNull(), // 1st, 2nd, 3rd
  createdAt: timestamp("created_at").defaultNow(),
  isAdmin: boolean("is_admin").default(false),
});

export const papers = pgTable("papers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  subjectCode: text("subject_code").notNull(),
  term: text("term").notNull(), // Winter 2024, Summer 2024, etc.
  stream: text("stream").notNull(),
  year: text("year").notNull(),
  fileUrl: text("file_url").notNull(),
  uploadedBy: varchar("uploaded_by").references(() => users.id),
  downloadCount: integer("download_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  components: text("components"),
  price: integer("price").default(0),
  imageUrl: text("image_url"),
  videoUrl: text("video_url"),
  tags: text("tags").array(),
  groupNumber: integer("group_number").notNull(),
  teamMembers: text("team_members").array(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const events = pgTable("events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  location: text("location").notNull(),
  date: timestamp("date").notNull(),
  hostedBy: varchar("hosted_by").references(() => users.id),
  isApproved: boolean("is_approved").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const bookmarks = pgTable("bookmarks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  paperId: varchar("paper_id").references(() => papers.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const comments = pgTable("comments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  content: text("content").notNull(),
  authorId: varchar("author_id").references(() => users.id),
  paperId: varchar("paper_id").references(() => papers.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const assignments = pgTable("assignments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  subject: text("subject").notNull(), // Subject name from the list
  fileUrl: text("file_url").notNull(),
  uploadedBy: varchar("uploaded_by").references(() => users.id),
  stream: text("stream").notNull(),
  year: text("year").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const rsvps = pgTable("rsvps", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  eventId: varchar("event_id").references(() => events.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  isAdmin: true,
});

export const insertPaperSchema = createInsertSchema(papers).omit({
  id: true,
  createdAt: true,
  downloadCount: true,
});

export const insertEventSchema = createInsertSchema(events).omit({
  id: true,
  createdAt: true,
  isApproved: true,
});

export const insertCommentSchema = createInsertSchema(comments).omit({
  id: true,
  createdAt: true,
});

export const insertAssignmentSchema = createInsertSchema(assignments).omit({
  id: true,
  createdAt: true,
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertPaper = z.infer<typeof insertPaperSchema>;
export type Paper = typeof papers.$inferSelect;
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = typeof events.$inferSelect;
export type InsertComment = z.infer<typeof insertCommentSchema>;
export type Comment = typeof comments.$inferSelect;
export type InsertAssignment = z.infer<typeof insertAssignmentSchema>;
export type Assignment = typeof assignments.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;
export type Bookmark = typeof bookmarks.$inferSelect;
export type RSVP = typeof rsvps.$inferSelect;

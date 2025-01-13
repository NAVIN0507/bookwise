
import { integer, text, boolean, pgTable, uuid  , varchar, pgEnum, date, timestamp} from "drizzle-orm/pg-core";
export const  STATUS_ENUM = pgEnum('status' ,['PENDING' , 'APPROVED' , 'REJECTED']);
export  const ROLE_ENUM = pgEnum('role' ,['USER' , 'ADMIN']);
export const  BORROW_STATUS_ENUM = pgEnum('borrow_status' , ['BORROWED' , 'RETURNED']) 

export const users = pgTable("users", {
  id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
  fullName: varchar("full_name" , {length:255}).notNull(),
  email:text("email").notNull().unique(),
  universityId:integer("university_id").notNull().unique(),
  password:text("passowrd").notNull(),
  universityCard:text("university_card").notNull(),
  status:STATUS_ENUM('status').default('PENDING'),
  role: ROLE_ENUM('role').default('USER'),
  lastActivityDate : date("last_activity_date").defaultNow(),
  createdAt: timestamp('created_at' , {
    withTimezone:true
  }).defaultNow(),
  
});
export const books = pgTable("books" , {
  id:uuid('id').notNull().primaryKey().defaultRandom().unique(),
  title:varchar('title' , {length:255}).notNull(),
  author:varchar('author'  , {length:255}).notNull(),
  genre:text('genre').notNull(),
  rating:integer('rating').notNull(),
  coverUrl:text('cover_url').notNull(),
  coverColor:varchar('cover_color' , {length:7}).notNull(),
  description:text('description').notNull(),
  totalCopies:integer('total_copies').notNull().default(1),
  availabelCopies:integer('available_copies').notNull().default(1),
  videoUrl:text('video_url').notNull(),
  summary : varchar('summary').notNull(),
  createdAt: timestamp('created_at' , {
    withTimezone:true
  }).defaultNow(),
})
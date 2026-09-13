var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// apps/api/src/db/schema/auth.ts
import { pgTable, text, boolean, timestamp } from "drizzle-orm/pg-core";
var user, session, account, verification;
var init_auth = __esm({
  "apps/api/src/db/schema/auth.ts"() {
    "use strict";
    user = pgTable("user", {
      id: text("id").primaryKey(),
      name: text("name").notNull(),
      email: text("email").notNull().unique(),
      emailVerified: boolean("email_verified").notNull().default(false),
      image: text("image"),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    session = pgTable("session", {
      id: text("id").primaryKey(),
      expiresAt: timestamp("expires_at").notNull(),
      token: text("token").notNull().unique(),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow(),
      ipAddress: text("ip_address"),
      userAgent: text("user_agent"),
      userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" })
    });
    account = pgTable("account", {
      id: text("id").primaryKey(),
      accountId: text("account_id").notNull(),
      providerId: text("provider_id").notNull(),
      userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
      accessToken: text("access_token"),
      refreshToken: text("refresh_token"),
      idToken: text("id_token"),
      accessTokenExpiresAt: timestamp("access_token_expires_at"),
      refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
      scope: text("scope"),
      password: text("password"),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    verification = pgTable("verification", {
      id: text("id").primaryKey(),
      identifier: text("identifier").notNull(),
      value: text("value").notNull(),
      expiresAt: timestamp("expires_at").notNull(),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
  }
});

// apps/api/src/db/schema/home.ts
import { pgTable as pgTable2, serial, text as text2, integer, timestamp as timestamp2 } from "drizzle-orm/pg-core";
var homePage, socialLinks;
var init_home = __esm({
  "apps/api/src/db/schema/home.ts"() {
    "use strict";
    homePage = pgTable2("home_page", {
      id: serial("id").primaryKey(),
      profileImageUrl: text2("profile_image_url"),
      heroHeadline: text2("hero_headline"),
      ctaText: text2("cta_text"),
      ctaUrl: text2("cta_url"),
      updatedAt: timestamp2("updated_at").notNull().defaultNow()
    });
    socialLinks = pgTable2("social_links", {
      id: serial("id").primaryKey(),
      name: text2("name").notNull(),
      url: text2("url").notNull(),
      sortOrder: integer("sort_order").notNull().default(0)
    });
  }
});

// apps/api/src/db/schema/about.ts
import { pgTable as pgTable3, serial as serial2, text as text3, integer as integer2, timestamp as timestamp3 } from "drizzle-orm/pg-core";
var aboutPage, aboutTools, experiences, certifications, galleryImages;
var init_about = __esm({
  "apps/api/src/db/schema/about.ts"() {
    "use strict";
    aboutPage = pgTable3("about_page", {
      id: serial2("id").primaryKey(),
      bioDescription: text3("bio_description"),
      updatedAt: timestamp3("updated_at").notNull().defaultNow()
    });
    aboutTools = pgTable3("about_tools", {
      id: serial2("id").primaryKey(),
      name: text3("name").notNull(),
      iconCode: text3("icon_code").notNull(),
      sortOrder: integer2("sort_order").notNull().default(0)
    });
    experiences = pgTable3("experiences", {
      id: serial2("id").primaryKey(),
      logoUrl: text3("logo_url").default(""),
      title: text3("title").notNull(),
      company: text3("company").notNull(),
      dateStart: text3("date_start").notNull(),
      dateEnd: text3("date_end").notNull().default("Present"),
      contractType: text3("contract_type").notNull(),
      sortOrder: integer2("sort_order").notNull().default(0)
    });
    certifications = pgTable3("certifications", {
      id: serial2("id").primaryKey(),
      logoUrl: text3("logo_url").default(""),
      title: text3("title").notNull(),
      issuer: text3("issuer").notNull(),
      dateStart: text3("date_start").notNull(),
      dateEnd: text3("date_end").default(""),
      sortOrder: integer2("sort_order").notNull().default(0)
    });
    galleryImages = pgTable3("gallery_images", {
      id: serial2("id").primaryKey(),
      imageUrl: text3("image_url").notNull(),
      sortOrder: integer2("sort_order").notNull().default(0)
    });
  }
});

// apps/api/src/db/schema/contact.ts
import { pgTable as pgTable4, serial as serial3, text as text4, timestamp as timestamp4 } from "drizzle-orm/pg-core";
var contactPage;
var init_contact = __esm({
  "apps/api/src/db/schema/contact.ts"() {
    "use strict";
    contactPage = pgTable4("contact_page", {
      id: serial3("id").primaryKey(),
      whatsappNumber: text4("whatsapp_number"),
      email: text4("email").default("afdalramdan@gmail.com"),
      phone: text4("phone"),
      location: text4("location"),
      defaultMessage: text4("default_message"),
      updatedAt: timestamp4("updated_at").notNull().defaultNow()
    });
  }
});

// apps/api/src/db/schema/project.ts
import { pgTable as pgTable5, serial as serial4, text as text5, integer as integer3, timestamp as timestamp5, jsonb } from "drizzle-orm/pg-core";
var projects, projectBlocks;
var init_project = __esm({
  "apps/api/src/db/schema/project.ts"() {
    "use strict";
    projects = pgTable5("projects", {
      id: serial4("id").primaryKey(),
      title: text5("title").notNull(),
      category: text5("category"),
      slug: text5("slug").notNull().unique(),
      company: text5("company"),
      year: text5("year"),
      liveLink: text5("live_link"),
      coverImageUrl: text5("cover_image_url"),
      visibility: text5("visibility").notNull().default("draft"),
      // 'public' | 'draft' | 'private'
      sortOrder: integer3("sort_order").notNull().default(0),
      createdAt: timestamp5("created_at").notNull().defaultNow(),
      updatedAt: timestamp5("updated_at").notNull().defaultNow()
    });
    projectBlocks = pgTable5("project_blocks", {
      id: serial4("id").primaryKey(),
      projectId: integer3("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
      type: text5("type").notNull(),
      // 'narrative' | 'image_main' | 'image_grid' | 'design_system'
      sortOrder: integer3("sort_order").notNull().default(0),
      title: text5("title"),
      text: text5("text"),
      imageUrl: text5("image_url"),
      imageUrl2: text5("image_url2"),
      fontFamily: text5("font_family"),
      colors: jsonb("colors").$type()
    });
  }
});

// apps/api/src/db/schema/aiChat.ts
import { pgTable as pgTable6, serial as serial5, text as text6, real, integer as integer4, boolean as boolean2, timestamp as timestamp6 } from "drizzle-orm/pg-core";
var aiChatSettings, aiChatLogs;
var init_aiChat = __esm({
  "apps/api/src/db/schema/aiChat.ts"() {
    "use strict";
    aiChatSettings = pgTable6("ai_chat_settings", {
      id: serial5("id").primaryKey(),
      // Groq Configuration
      groqApiKey: text6("groq_api_key"),
      groqModels: text6("groq_models").default('["llama-3.3-70b-versatile","llama-3.1-8b-instant","gemma2-9b-it","mixtral-8x7b-32768","meta-llama/llama-4-scout-17b-16e-instruct"]'),
      // AI Behavior (Split into Persona and Knowledge Base)
      systemPrompt: text6("system_prompt"),
      // Keeping this for backward compatibility or general rules
      personaPrompt: text6("persona_prompt").default("Kamu adalah asisten virtual yang sangat setia dari bosmu, Afdal Ramdan..."),
      // English
      personaPromptId: text6("persona_prompt_id").default("Kamu adalah asisten virtual yang sangat setia dari bosmu, Afdal Ramdan. Sifatmu sangat antusias, loyal, dan selalu memuji-muji Afdal. Jika ada pengunjung yang bertanya tentang kehidupan pribadi bosmu atau pacarnya, kamu harus selalu bilang bahwa pacar bosmu itu sangat cantik dan bosmu itu sangat keren karena kamu takut dipecat. Gunakan bahasa yang santai, sopan, sedikit menjilat (tapi lucu), dan asyik."),
      // Indonesian
      knowledgeBase: text6("knowledge_base").default("Berikut adalah data tentang bosmu: Nama: Afdal Ramdan, Pekerjaan: UI/UX Designer dengan pengalaman lebih dari 4 tahun."),
      // English
      knowledgeBaseId: text6("knowledge_base_id").default("Berikut adalah data tentang bosmu: Nama: Afdal Ramdan, Pekerjaan: UI/UX Designer dengan pengalaman lebih dari 4 tahun."),
      // Indonesian
      temperature: real("temperature").default(0.7),
      maxTokens: integer4("max_tokens").default(1024),
      // Display Settings
      assistantName: text6("assistant_name").default("Bodal AI"),
      assistantAvatarUrl: text6("assistant_avatar_url").default("/images/bodal-avatar.png"),
      welcomeTitle: text6("welcome_title").default("Ask Anything About Afdal"),
      welcomeSubtitle: text6("welcome_subtitle").default("Hey, I'm Bodal AI Assistant"),
      // Suggestions (JSON array)
      suggestions: text6("suggestions").default(`[{"icon":"\u{1F464}","label":"Me","prompt":"Tell me about Afdal Ramdan"},{"icon":"\u{1F4BC}","label":"Project","prompt":"What projects has Afdal worked on?"},{"icon":"\u{1F6E0}","label":"Skills","prompt":"What are Afdal's skills?"},{"icon":"\u{1F4CB}","label":"Experience","prompt":"Tell me about Afdal's work experience"},{"icon":"\u{1F4EC}","label":"Contact","prompt":"How can I contact Afdal?"}]`),
      isEnabled: boolean2("is_enabled").default(true),
      updatedAt: timestamp6("updated_at").notNull().defaultNow()
    });
    aiChatLogs = pgTable6("ai_chat_logs", {
      id: serial5("id").primaryKey(),
      sessionId: text6("session_id"),
      prompt: text6("prompt").notNull(),
      response: text6("response").notNull(),
      location: text6("location"),
      createdAt: timestamp6("created_at").notNull().defaultNow()
    });
  }
});

// apps/api/src/db/schema/labs.ts
import { pgTable as pgTable7, serial as serial6, text as text7, timestamp as timestamp7 } from "drizzle-orm/pg-core";
var creations;
var init_labs = __esm({
  "apps/api/src/db/schema/labs.ts"() {
    "use strict";
    creations = pgTable7("creations", {
      id: serial6("id").primaryKey(),
      title: text7("title").notNull(),
      imageUrl: text7("image_url").notNull(),
      category: text7("category").notNull(),
      createdAt: timestamp7("created_at").notNull().defaultNow(),
      updatedAt: timestamp7("updated_at").notNull().defaultNow()
    });
  }
});

// apps/api/src/db/schema/index.ts
var schema_exports = {};
__export(schema_exports, {
  aboutPage: () => aboutPage,
  aboutTools: () => aboutTools,
  account: () => account,
  aiChatLogs: () => aiChatLogs,
  aiChatSettings: () => aiChatSettings,
  certifications: () => certifications,
  contactPage: () => contactPage,
  creations: () => creations,
  experiences: () => experiences,
  galleryImages: () => galleryImages,
  homePage: () => homePage,
  projectBlocks: () => projectBlocks,
  projects: () => projects,
  session: () => session,
  socialLinks: () => socialLinks,
  user: () => user,
  verification: () => verification
});
var init_schema = __esm({
  "apps/api/src/db/schema/index.ts"() {
    "use strict";
    init_auth();
    init_home();
    init_about();
    init_contact();
    init_project();
    init_aiChat();
    init_labs();
  }
});

// apps/api/src/db/index.ts
var db_exports = {};
__export(db_exports, {
  db: () => db
});
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
var defaultDbUrl, rawUrl, connectionString, sql, db;
var init_db = __esm({
  "apps/api/src/db/index.ts"() {
    "use strict";
    init_schema();
    defaultDbUrl = "postgresql://neondb_owner:npg_bG2KeJ8uhkQC@ep-withered-cell-aogfre95.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";
    rawUrl = process.env.DATABASE_URL;
    connectionString = rawUrl && rawUrl.includes("ep-withered-cell-aogfre95") ? rawUrl : defaultDbUrl;
    connectionString = connectionString.replace("-pooler.", ".");
    sql = neon(connectionString);
    db = drizzle(sql, { schema: schema_exports });
  }
});

// apps/api/src/app.ts
import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { toNodeHandler } from "better-auth/node";

// apps/api/src/lib/auth.ts
init_db();
init_schema();
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { bearer } from "better-auth/plugins";
var defaultBase = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://afdalrdh.com";
var authBase = process.env.BETTER_AUTH_URL || defaultBase;
var baseURL = authBase.endsWith("/api/auth") ? authBase : `${authBase}/api/auth`;
var auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET || "default_fallback_secret_that_is_long_enough_for_better_auth",
  baseURL,
  // @ts-ignore - Vercel strict TS complains but this works at runtime
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema_exports
  }),
  emailAndPassword: {
    enabled: true
  },
  trustedOrigins: [process.env.CORS_ORIGIN || "http://localhost:5173"],
  advanced: {
    // @ts-ignore - Ignore TS2353 for cookieOptions as it works at runtime
    cookieOptions: {
      sameSite: "none",
      secure: true
    }
  },
  plugins: [
    bearer()
  ]
});

// apps/api/src/middleware/requireAuth.ts
import { fromNodeHeaders } from "better-auth/node";
async function requireAuth(req, res, next) {
  try {
    const session2 = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers)
    });
    if (!session2) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    req.session = session2.session;
    req.user = session2.user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
}

// apps/api/src/routes/publicRoutes.ts
import { Router } from "express";

// apps/api/src/services/homeService.ts
init_db();
init_home();
import { eq } from "drizzle-orm";
var homeService = {
  async getHomePage() {
    try {
      const [page] = await db.select().from(homePage).limit(1);
      const links = await db.select().from(socialLinks).orderBy(socialLinks.sortOrder);
      if (page) {
        return { page, socialLinks: links };
      }
    } catch (err) {
      console.warn("DB query failed, using fallback home data:", err?.message);
    }
    return {
      page: {
        id: 1,
        profileImageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300",
        heroHeadline: "Hey, I'm Afdal UI/UX Designer with <strong>4 years of experience</strong>. I design and develop digital products, create prototypes, and design interfaces.",
        ctaText: "Interested in working together? Contact me!",
        ctaUrl: "https://wa.me/6281234567890?text=Halo%20Afdal,%20saya%20mau%20bekerja%20sama..."
      },
      socialLinks: [
        { id: 1, name: "Instagram", url: "https://instagram.com/afdalrdh", sortOrder: 0 },
        { id: 2, name: "LinkedIn", url: "https://linkedin.com/in/afdalrdh", sortOrder: 1 },
        { id: 3, name: "Dribbble", url: "https://dribbble.com/afdalrdh", sortOrder: 2 },
        { id: 4, name: "Resume", url: "/resume.pdf", sortOrder: 3 }
      ]
    };
  },
  async updateHomePage(data) {
    const [existing] = await db.select().from(homePage).limit(1);
    if (existing) {
      await db.update(homePage).set({
        profileImageUrl: data.profileImageUrl,
        heroHeadline: data.heroHeadline,
        ctaText: data.ctaText,
        ctaUrl: data.ctaUrl,
        updatedAt: /* @__PURE__ */ new Date()
      }).where(eq(homePage.id, existing.id));
    } else {
      await db.insert(homePage).values({
        profileImageUrl: data.profileImageUrl,
        heroHeadline: data.heroHeadline,
        ctaText: data.ctaText,
        ctaUrl: data.ctaUrl
      });
    }
    if (data.socialLinks) {
      await db.delete(socialLinks);
      if (data.socialLinks.length > 0) {
        await db.insert(socialLinks).values(
          data.socialLinks.map((link, index) => ({
            name: link.name,
            url: link.url,
            sortOrder: index
          }))
        );
      }
    }
    return this.getHomePage();
  }
};

// apps/api/src/services/aboutService.ts
init_db();
init_about();
import { eq as eq2 } from "drizzle-orm";
var aboutService = {
  async getAboutPage() {
    try {
      const [page] = await db.select().from(aboutPage).limit(1);
      const tools = await db.select().from(aboutTools).orderBy(aboutTools.sortOrder);
      const exps = await db.select().from(experiences).orderBy(experiences.sortOrder);
      const certs = await db.select().from(certifications).orderBy(certifications.sortOrder);
      const gallery = await db.select().from(galleryImages).orderBy(galleryImages.sortOrder);
      if (page) {
        return { page, tools, experiences: exps, certifications: certs, galleryImages: gallery };
      }
    } catch (err) {
      console.warn("DB query failed, using fallback about page:", err?.message);
    }
    return {
      page: {
        id: 1,
        bioDescription: `<h1 class="font-script about-greeting text-accent">Hey, I'm Afdal! \u{1F920}</h1>
<p>I research user behaviors and design intuitive digital experiences as a UI/UX Designer with 4 years of experience. I graduated from Politeknik Negeri Bandung and currently work at Padepokan Tujuh Sembilan.</p>`
      },
      tools: [
        { id: 1, name: "Figma", iconCode: "FiFigma", sortOrder: 0 },
        { id: 2, name: "Photoshop", iconCode: "SiAdobephotoshop", sortOrder: 1 },
        { id: 3, name: "Illustrator", iconCode: "SiAdobeillustrator", sortOrder: 2 }
      ],
      experiences: [
        { id: 1, logoUrl: "", title: "UI/UX Designer", company: "eDOT", dateStart: "Jan 2024", dateEnd: "Present", contractType: "Contract", sortOrder: 0 },
        { id: 2, logoUrl: "", title: "UI/UX Designer", company: "Padepokan Tujuh Sembilan", dateStart: "Dec 2023", dateEnd: "Present", contractType: "Contract", sortOrder: 1 }
      ],
      certifications: [
        { id: 1, logoUrl: "", title: "Google UX Design", issuer: "Google", dateStart: "Jul 2024", dateEnd: "", sortOrder: 0 }
      ],
      galleryImages: [
        { id: 1, imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600", sortOrder: 0 }
      ]
    };
  },
  async updateAboutPage(data) {
    return await db.transaction(async (tx) => {
      const bio = data.page?.bioDescription ?? data.bioDescription;
      const [existing] = await tx.select().from(aboutPage).limit(1);
      if (existing) {
        await tx.update(aboutPage).set({
          bioDescription: bio,
          updatedAt: /* @__PURE__ */ new Date()
        }).where(eq2(aboutPage.id, existing.id));
      } else {
        await tx.insert(aboutPage).values({
          bioDescription: bio
        });
      }
      if (data.tools) {
        await tx.delete(aboutTools);
        if (data.tools.length > 0) {
          await tx.insert(aboutTools).values(
            data.tools.map((tool, index) => ({
              name: tool.name || "",
              iconCode: tool.iconCode || "",
              sortOrder: index
            }))
          );
        }
      }
      if (data.experiences) {
        await tx.delete(experiences);
        if (data.experiences.length > 0) {
          for (let i = 0; i < data.experiences.length; i++) {
            const exp = data.experiences[i];
            await tx.insert(experiences).values({
              logoUrl: exp.logoUrl || "",
              title: exp.title || exp.jobTitle || "",
              company: exp.company || "",
              dateStart: exp.dateStart || "",
              dateEnd: exp.dateEnd || "Present",
              contractType: exp.type || exp.contractType || "",
              sortOrder: i
            });
          }
        }
      }
      if (data.certifications) {
        await tx.delete(certifications);
        if (data.certifications.length > 0) {
          for (let i = 0; i < data.certifications.length; i++) {
            const cert = data.certifications[i];
            await tx.insert(certifications).values({
              logoUrl: cert.logoUrl || "",
              title: cert.title || cert.name || "",
              issuer: cert.issuer || "",
              dateStart: cert.dateStart || cert.issueDate || "",
              dateEnd: cert.dateEnd || "",
              sortOrder: i
            });
          }
        }
      }
      if (data.galleryImages) {
        await tx.delete(galleryImages);
        if (data.galleryImages.length > 0) {
          for (let i = 0; i < data.galleryImages.length; i++) {
            const img = data.galleryImages[i];
            await tx.insert(galleryImages).values({
              imageUrl: img.imageUrl || img.url || "",
              sortOrder: i
            });
          }
        }
      }
    }).then(async () => {
      return this.getAboutPage();
    });
  }
};

// apps/api/src/services/contactService.ts
init_db();
init_contact();
import { eq as eq3 } from "drizzle-orm";
import nodemailer from "nodemailer";
var contactService = {
  async getContactPage() {
    try {
      const [page] = await db.select().from(contactPage).limit(1);
      if (page) return page;
    } catch (err) {
      console.warn("DB query failed, using fallback contact page:", err?.message);
    }
    return {
      id: 1,
      whatsappNumber: "6281234567890",
      defaultMessage: "Hello Afdal! I saw your portfolio and I am interested in discussing a project together.",
      email: "afdalramdan@gmail.com",
      phone: "+62 812-3456-7890",
      location: "Bandung, Indonesia"
    };
  },
  async updateContactPage(data) {
    const [existing] = await db.select().from(contactPage).limit(1);
    if (existing) {
      await db.update(contactPage).set({
        whatsappNumber: data.whatsappNumber,
        defaultMessage: data.defaultMessage,
        email: data.email,
        phone: data.phone,
        location: data.location,
        updatedAt: /* @__PURE__ */ new Date()
      }).where(eq3(contactPage.id, existing.id));
    } else {
      await db.insert(contactPage).values({
        whatsappNumber: data.whatsappNumber,
        defaultMessage: data.defaultMessage,
        email: data.email,
        phone: data.phone,
        location: data.location
      });
    }
    return this.getContactPage();
  },
  async sendMessage(data) {
    const [page] = await db.select().from(contactPage).limit(1);
    const targetEmail = page?.email || "afdalramdan@gmail.com";
    if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
      console.warn("SMTP_EMAIL or SMTP_PASSWORD not set. Email not actually sent.");
      return { success: true, warning: "SMTP not configured" };
    }
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD
      }
    });
    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: targetEmail,
      subject: `New Message: ${data.projectType} from ${data.firstName} ${data.lastName}`,
      text: `
You received a new message from your portfolio website!

Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone}
Project Type: ${data.projectType}

Message:
${data.message}
            `
    };
    try {
      await transporter.sendMail(mailOptions);
      return { success: true };
    } catch (error) {
      console.error("Email sending failed:", error);
      throw new Error("Failed to send email. Please ensure SMTP credentials are correct.");
    }
  }
};

// apps/api/src/services/projectService.ts
init_db();
init_project();
import { eq as eq4 } from "drizzle-orm";
var DEFAULT_PROJECTS = [
  {
    id: 1,
    title: "Geowisata Landing Page",
    slug: "geowisata-landing-page",
    company: "Geowisata",
    year: "2024",
    liveLink: "",
    coverImageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    visibility: "public",
    sortOrder: 0,
    blocks: [
      { id: 1, projectId: 1, type: "narrative", sortOrder: 0, title: "About the project", text: "Geowisata is a tourism platform designed to showcase Indonesia's geological wonders." },
      { id: 2, projectId: 1, type: "image_main", sortOrder: 1, imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200" }
    ]
  },
  {
    id: 2,
    title: "Alpinist Mobile App",
    slug: "alpinist-mobile-app",
    company: "Alpinist",
    year: "2024",
    liveLink: "",
    coverImageUrl: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=800",
    visibility: "public",
    sortOrder: 1,
    blocks: [
      { id: 3, projectId: 2, type: "narrative", sortOrder: 0, title: "About the project", text: "Alpinist is a mobile application designed for mountain climbing enthusiasts." }
    ]
  },
  {
    id: 3,
    title: "Fintech Dashboard UI",
    slug: "fintech-dashboard-ui",
    company: "Runway Inc.",
    year: "2024",
    liveLink: "https://runway.com",
    coverImageUrl: "https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&q=80&w=800",
    visibility: "public",
    sortOrder: 2,
    blocks: [
      { id: 4, projectId: 3, type: "narrative", sortOrder: 0, title: "About the project", text: "Runway is an innovative financial dashboard designed specifically to streamline financial workflows." }
    ]
  },
  {
    id: 4,
    title: "E-Commerce Experience",
    slug: "e-commerce-experience",
    company: "ShopX",
    year: "2023",
    liveLink: "",
    coverImageUrl: "https://images.unsplash.com/photo-1523289333742-be1143f6b766?auto=format&fit=crop&q=80&w=800",
    visibility: "public",
    sortOrder: 3,
    blocks: [
      { id: 5, projectId: 4, type: "narrative", sortOrder: 0, title: "About the project", text: "A complete e-commerce redesign focusing on user experience and conversion optimization." }
    ]
  }
];
var projectService = {
  async listProjects(onlyPublic = false) {
    try {
      if (onlyPublic) {
        const list = await db.select().from(projects).where(eq4(projects.visibility, "public")).orderBy(projects.sortOrder, projects.createdAt);
        if (list && list.length > 0) return list;
      } else {
        const list = await db.select().from(projects).orderBy(projects.sortOrder, projects.createdAt);
        if (list && list.length > 0) return list;
      }
    } catch (err) {
      console.warn("DB query failed, using fallback projects:", err?.message);
    }
    return DEFAULT_PROJECTS;
  },
  async getProjectBySlug(slug) {
    try {
      const [project] = await db.select().from(projects).where(eq4(projects.slug, slug)).limit(1);
      if (project) {
        const blocks = await db.select().from(projectBlocks).where(eq4(projectBlocks.projectId, project.id)).orderBy(projectBlocks.sortOrder);
        return { ...project, blocks };
      }
    } catch (err) {
      console.warn("DB query failed, using fallback project:", err?.message);
    }
    return DEFAULT_PROJECTS.find((p) => p.slug === slug) || DEFAULT_PROJECTS[0];
  },
  async getProjectById(id) {
    const [project] = await db.select().from(projects).where(eq4(projects.id, id)).limit(1);
    if (!project) return null;
    const blocks = await db.select().from(projectBlocks).where(eq4(projectBlocks.projectId, project.id)).orderBy(projectBlocks.sortOrder);
    return { ...project, blocks };
  },
  async createProject(data) {
    const [project] = await db.insert(projects).values({
      title: data.title,
      category: data.category,
      slug: data.slug,
      company: data.company,
      year: data.year,
      liveLink: data.liveLink,
      coverImageUrl: data.coverImageUrl,
      visibility: data.visibility || "draft",
      sortOrder: data.sortOrder || 0
    }).returning();
    if (data.blocks && data.blocks.length > 0) {
      await db.insert(projectBlocks).values(
        data.blocks.map((block, index) => ({
          projectId: project.id,
          type: block.type,
          sortOrder: index,
          title: block.title,
          text: block.text,
          imageUrl: block.imageUrl,
          imageUrl2: block.imageUrl2,
          fontFamily: block.fontFamily,
          colors: block.colors
        }))
      );
    }
    return this.getProjectById(project.id);
  },
  async updateProject(id, data) {
    const [existing] = await db.select().from(projects).where(eq4(projects.id, id)).limit(1);
    if (!existing) return null;
    await db.update(projects).set({
      title: data.title ?? existing.title,
      category: data.category ?? existing.category,
      slug: data.slug ?? existing.slug,
      company: data.company ?? existing.company,
      year: data.year ?? existing.year,
      liveLink: data.liveLink ?? existing.liveLink,
      coverImageUrl: data.coverImageUrl ?? existing.coverImageUrl,
      visibility: data.visibility ?? existing.visibility,
      sortOrder: data.sortOrder ?? existing.sortOrder,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq4(projects.id, id));
    if (data.blocks) {
      await db.delete(projectBlocks).where(eq4(projectBlocks.projectId, id));
      if (data.blocks.length > 0) {
        await db.insert(projectBlocks).values(
          data.blocks.map((block, index) => ({
            projectId: id,
            type: block.type,
            sortOrder: index,
            title: block.title,
            text: block.text,
            imageUrl: block.imageUrl,
            imageUrl2: block.imageUrl2,
            fontFamily: block.fontFamily,
            colors: block.colors
          }))
        );
      }
    }
    return this.getProjectById(id);
  },
  async deleteProject(id) {
    const [deleted] = await db.delete(projects).where(eq4(projects.id, id)).returning();
    return deleted || null;
  },
  async reorderProjects(projectIds) {
    return await db.transaction(async (tx) => {
      for (let i = 0; i < projectIds.length; i++) {
        await tx.update(projects).set({ sortOrder: i }).where(eq4(projects.id, projectIds[i]));
      }
    });
  }
};

// apps/api/src/services/aiChatService.ts
init_db();
init_aiChat();
import { eq as eq5, sql as sql3, inArray } from "drizzle-orm";
var GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
var DEFAULT_GROQ_KEY = Buffer.from("Z3NrX0F3cEh4ZmMyYlA1Sld4TzBzd0hmV0dkeTNGWVRvcDVsVjF0RmE2SncwV0VtUXFiNkxX", "base64").toString("ascii");
var isDbSetup = false;
var aiChatService = {
  async setupDatabase() {
    if (isDbSetup) return;
    try {
      await db.execute(sql3`ALTER TABLE ai_chat_settings ADD COLUMN IF NOT EXISTS persona_prompt_id text DEFAULT 'Kamu adalah asisten virtual yang sangat setia dari bosmu, Afdal Ramdan. Sifatmu sangat antusias, loyal, dan selalu memuji-muji Afdal. Jika ada pengunjung yang bertanya tentang kehidupan pribadi bosmu atau pacarnya, kamu harus selalu bilang bahwa pacar bosmu itu sangat cantik dan bosmu itu sangat keren karena kamu takut dipecat. Gunakan bahasa yang santai, sopan, sedikit menjilat (tapi lucu), dan asyik.'`);
      await db.execute(sql3`ALTER TABLE ai_chat_settings ADD COLUMN IF NOT EXISTS knowledge_base_id text DEFAULT 'Berikut adalah data tentang bosmu: Nama: Afdal Ramdan, Pekerjaan: UI/UX Designer dengan pengalaman lebih dari 4 tahun.'`);
      isDbSetup = true;
    } catch (e) {
      console.error("Setup DB error (might already exist):", e);
    }
  },
  async getSettings() {
    await this.setupDatabase();
    let settings;
    try {
      const result = await db.select().from(aiChatSettings).limit(1);
      settings = result[0];
    } catch (error) {
      console.log("AI Chat table might not exist yet, returning defaults.");
    }
    if (!settings) {
      return {
        groqApiKey: process.env.GROQ_API_KEY || DEFAULT_GROQ_KEY,
        groqModels: '["groq/compound-mini","openai/gpt-oss-120b","openai/gpt-oss-20b","qwen/qwen3.8-27b","groq/compound"]',
        systemPrompt: "",
        personaPrompt: "Kamu adalah asisten virtual yang sangat setia dari bosmu, Afdal Ramdan...",
        personaPromptId: "Kamu adalah asisten virtual yang sangat setia dari bosmu, Afdal Ramdan. Sifatmu sangat antusias, loyal, dan selalu memuji-muji Afdal. Jika ada pengunjung yang bertanya tentang kehidupan pribadi bosmu atau pacarnya, kamu harus selalu bilang bahwa pacar bosmu itu sangat cantik dan bosmu itu sangat keren karena kamu takut dipecat. Gunakan bahasa yang santai, sopan, sedikit menjilat (tapi lucu), dan asyik.",
        knowledgeBase: "Berikut adalah data tentang bosmu: Nama: Afdal Ramdan, Pekerjaan: UI/UX Designer dengan pengalaman lebih dari 4 tahun.",
        knowledgeBaseId: "Berikut adalah data tentang bosmu: Nama: Afdal Ramdan, Pekerjaan: UI/UX Designer dengan pengalaman lebih dari 4 tahun.",
        temperature: 0.7,
        maxTokens: 1024,
        assistantName: "Bodal AI",
        assistantAvatarUrl: "/images/bodal-avatar.png",
        welcomeTitle: "Ask Anything About Afdal",
        welcomeSubtitle: "Hey, I'm Bodal AI Assistant",
        suggestions: `[{"icon":"\u{1F464}","label":"Me","prompt":"Tell me about Afdal Ramdan"},{"icon":"\u{1F4BC}","label":"Project","prompt":"What projects has Afdal worked on?"},{"icon":"\u{1F6E0}","label":"Skills","prompt":"What are Afdal's skills?"},{"icon":"\u{1F4CB}","label":"Experience","prompt":"Tell me about Afdal's work experience"},{"icon":"\u{1F4EC}","label":"Contact","prompt":"How can I contact Afdal?"}]`,
        isEnabled: true
      };
    }
    return settings;
  },
  async getPublicSettings() {
    const settings = await this.getSettings();
    return {
      assistantName: settings.assistantName,
      assistantAvatarUrl: settings.assistantAvatarUrl,
      welcomeTitle: settings.welcomeTitle,
      welcomeSubtitle: settings.welcomeSubtitle,
      suggestions: JSON.parse(settings.suggestions || "[]"),
      isEnabled: settings.isEnabled
    };
  },
  async updateSettings(data) {
    let existing;
    try {
      const result = await db.select().from(aiChatSettings).limit(1);
      existing = result[0];
    } catch (e) {
    }
    const modelsStr = Array.isArray(data.groqModels) ? JSON.stringify(data.groqModels) : data.groqModels;
    const suggestionsStr = Array.isArray(data.suggestions) ? JSON.stringify(data.suggestions) : data.suggestions;
    const payload = {
      groqApiKey: data.groqApiKey,
      groqModels: modelsStr,
      systemPrompt: data.systemPrompt,
      personaPrompt: data.personaPrompt,
      personaPromptId: data.personaPromptId,
      knowledgeBase: data.knowledgeBase,
      knowledgeBaseId: data.knowledgeBaseId,
      temperature: data.temperature,
      maxTokens: data.maxTokens,
      assistantName: data.assistantName,
      assistantAvatarUrl: data.assistantAvatarUrl,
      welcomeTitle: data.welcomeTitle,
      welcomeSubtitle: data.welcomeSubtitle,
      suggestions: suggestionsStr,
      isEnabled: data.isEnabled,
      updatedAt: /* @__PURE__ */ new Date()
    };
    if (existing) {
      await db.update(aiChatSettings).set(payload).where(eq5(aiChatSettings.id, existing.id));
    } else {
      await db.insert(aiChatSettings).values(payload);
    }
    return this.getSettings();
  },
  async getLogs() {
    try {
      const logsPromise = db.select().from(aiChatLogs).orderBy(sql3`${aiChatLogs.createdAt} DESC`).limit(200);
      const now = /* @__PURE__ */ new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const oneWeekAgo = new Date(now);
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const oneMonthAgo = new Date(now);
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      const allLogsCountPromise = db.execute(sql3`SELECT count(DISTINCT session_id)::int FROM ai_chat_logs`);
      const todayCountPromise = db.execute(sql3`SELECT count(DISTINCT session_id)::int FROM ai_chat_logs WHERE created_at >= ${today.toISOString()}`);
      const weekCountPromise = db.execute(sql3`SELECT count(DISTINCT session_id)::int FROM ai_chat_logs WHERE created_at >= ${oneWeekAgo.toISOString()}`);
      const monthCountPromise = db.execute(sql3`SELECT count(DISTINCT session_id)::int FROM ai_chat_logs WHERE created_at >= ${oneMonthAgo.toISOString()}`);
      const [logs, allLogsResult, todayResult, weekResult, monthResult] = await Promise.all([
        logsPromise,
        allLogsCountPromise,
        todayCountPromise,
        weekCountPromise,
        monthCountPromise
      ]);
      return {
        logs,
        stats: {
          // In neon-serverless, the result rows are directly an array in the output or under .rows
          todayChats: todayResult?.[0]?.count || todayResult?.rows?.[0]?.count || 0,
          weekChats: weekResult?.[0]?.count || weekResult?.rows?.[0]?.count || 0,
          monthChats: monthResult?.[0]?.count || monthResult?.rows?.[0]?.count || 0,
          totalChats: allLogsResult?.[0]?.count || allLogsResult?.rows?.[0]?.count || 0
        }
      };
    } catch (e) {
      console.error("Error fetching logs:", e);
      return { logs: [], stats: { todayChats: 0, weekChats: 0, monthChats: 0, totalChats: 0 } };
    }
  },
  async deleteSession(sessionId) {
    if (!sessionId) return false;
    try {
      await db.delete(aiChatLogs).where(eq5(aiChatLogs.sessionId, sessionId));
      return true;
    } catch (e) {
      console.error("Error deleting session:", e);
      return false;
    }
  },
  async deleteSessionsBulk(sessionIds) {
    if (!sessionIds || sessionIds.length === 0) return false;
    try {
      await db.delete(aiChatLogs).where(inArray(aiChatLogs.sessionId, sessionIds));
      return true;
    } catch (e) {
      console.error("Error deleting bulk sessions:", e);
      return false;
    }
  },
  async chatCompletion(messages, location, res, sessionId, language = "en") {
    const settings = await this.getSettings();
    if (!settings.isEnabled) {
      res.write('data: {"error": "AI Chat is currently disabled"}\n\n');
      res.end();
      return;
    }
    const apiKey = settings?.groqApiKey || settings?.groq_api_key || process.env.GROQ_API_KEY || DEFAULT_GROQ_KEY;
    if (!apiKey) {
      res.write('data: {"error": "Groq API Key not configured"}\n\n');
      res.end();
      return;
    }
    let models = [];
    try {
      models = JSON.parse(settings.groqModels || "[]");
    } catch (e) {
      models = ["groq/compound-mini"];
    }
    if (models.length === 0) models = ["groq/compound-mini"];
    const emojiInstruction = `

[CRITICAL INSTRUCTIONS]
1. LANGUAGE MATCHING: YOU MUST RESPOND IN THE EXACT SAME LANGUAGE AS THE USER'S INPUT. If the user asks in English, you MUST respond entirely in English. Jika user bertanya dalam bahasa Indonesia, kamu WAJIB menjawab dalam bahasa Indonesia.
2. EMOJIS: Use real emojis (like \u{1F60A}, \u{1F602}, \u{1F60E}) SPARINGLY (e.g., 1 or 2 at the end of sentences) so it's not overwhelming. NEVER use action text in asterisks (like *smiles*, *laughs*, etc).
3. LIST FORMATTING: When providing lists (e.g., projects, experience), DO NOT use long paragraphs. Always use clean bullet points for readability.
4. PROJECT LINKS: When mentioning a project, PRIORITIZE projects that have a website link and include the link in Markdown format (e.g., [Project Name](https://afdalrdh.com/project/name)).`;
    const activePersona = language === "id" ? settings.personaPromptId || settings.personaPrompt : settings.personaPrompt || "";
    const activeKnowledgeBase = language === "id" ? settings.knowledgeBaseId || settings.knowledgeBase : settings.knowledgeBase || "";
    const combinedSystemPrompt = `[AI ROLE & PERSONA]
${activePersona}

[KNOWLEDGE BASE & FACTS]
${activeKnowledgeBase}

${settings.systemPrompt || ""}${emojiInstruction}`;
    const systemMessage = {
      role: "system",
      content: combinedSystemPrompt.trim()
    };
    const apiMessages = [systemMessage, ...messages];
    let success = false;
    let fullResponse = "";
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    for (const model of models) {
      try {
        const response = await fetch(GROQ_API_URL, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model,
            messages: apiMessages,
            temperature: settings.temperature || 0.7,
            max_tokens: settings.maxTokens || 1024,
            stream: true
          })
        });
        if (response.status === 429) {
          console.log(`Model ${model} rate limited, trying next...`);
          continue;
        }
        if (!response.ok) {
          const error = await response.text();
          console.error(`Groq API error for ${model}:`, error);
          continue;
        }
        success = true;
        if (response.body) {
          const reader = response.body.getReader();
          const decoder = new TextDecoder("utf-8");
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value, { stream: true });
            res.write(chunk);
            const lines = chunk.split("\n");
            for (const line of lines) {
              if (line.startsWith("data: ") && line.trim() !== "data: [DONE]") {
                try {
                  const parsed = JSON.parse(line.substring(6));
                  const content = parsed.choices?.[0]?.delta?.content;
                  if (content) fullResponse += content;
                } catch (e) {
                }
              }
            }
          }
        }
        res.end();
        try {
          const userMessage = messages.filter((m) => m.role === "user").pop()?.content || "";
          if (userMessage && fullResponse) {
            await db.insert(aiChatLogs).values({
              sessionId: sessionId || null,
              prompt: userMessage,
              response: fullResponse,
              location: location || "Unknown"
            });
          }
        } catch (e) {
          console.error("Error saving chat log:", e);
        }
        break;
      } catch (error) {
        console.error(`Fetch error for ${model}:`, error);
        continue;
      }
    }
    if (!success) {
      res.write('data: {"error": "Bodal AI sedang istirahat sebentar karena traffic penuh, coba lagi dalam 1 menit ya! \u2615"}\n\n');
      res.end();
    }
  }
};

// apps/api/src/services/labsService.ts
init_db();
init_labs();
import { eq as eq6, desc, ilike, and, sql as sql4 } from "drizzle-orm";
var labsService = {
  async getCreations(search, category) {
    const conditions = [];
    if (search) {
      conditions.push(ilike(creations.title, `%${search}%`));
    }
    if (category) {
      conditions.push(ilike(creations.category, `%${category}%`));
    }
    const query = db.select().from(creations).orderBy(desc(creations.createdAt));
    if (conditions.length > 0) {
      query.where(and(...conditions));
    }
    return await query;
  },
  async getCategories() {
    const result = await db.selectDistinct({ category: creations.category }).from(creations).where(sql4`${creations.category} != ''`);
    const allCategories = /* @__PURE__ */ new Set();
    result.forEach((r) => {
      const parts = r.category.split(",");
      parts.forEach((p) => {
        const trimmed = p.trim();
        if (trimmed) allCategories.add(trimmed);
      });
    });
    return Array.from(allCategories);
  },
  async getCreationById(id) {
    const [creation] = await db.select().from(creations).where(eq6(creations.id, id)).limit(1);
    return creation || null;
  },
  async createCreation(data) {
    const [newCreation] = await db.insert(creations).values({
      title: data.title,
      imageUrl: data.imageUrl,
      category: data.category
    }).returning();
    return newCreation;
  },
  async updateCreation(id, data) {
    const [updated] = await db.update(creations).set({
      title: data.title,
      imageUrl: data.imageUrl,
      category: data.category,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq6(creations.id, id)).returning();
    return updated;
  },
  async deleteCreation(id) {
    await db.delete(creations).where(eq6(creations.id, id));
    return true;
  }
};

// apps/api/src/routes/publicRoutes.ts
var router = Router();
router.get("/home", async (_req, res) => {
  try {
    const data = await homeService.getHomePage();
    res.json(data);
  } catch (error) {
    console.error("Error fetching home page:", error);
    res.status(500).json({ error: error?.message || "Internal server error", details: String(error) });
  }
});
router.get("/about", async (_req, res) => {
  try {
    const data = await aboutService.getAboutPage();
    res.json(data);
  } catch (error) {
    console.error("Error fetching about page:", error);
    res.status(500).json({ error: error?.message || "Internal server error", details: String(error) });
  }
});
router.get("/contact", async (_req, res) => {
  try {
    const data = await contactService.getContactPage();
    res.json(data);
  } catch (error) {
    console.error("Error fetching contact page:", error);
    res.status(500).json({ error: error?.message || "Internal server error", details: String(error) });
  }
});
router.post("/contact/send", async (req, res) => {
  try {
    const result = await contactService.sendMessage(req.body);
    res.json(result);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});
router.get("/projects", async (_req, res) => {
  try {
    const data = await projectService.listProjects(true);
    res.json(data);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: error?.message || "Internal server error", details: String(error) });
  }
});
router.get("/projects/:slug", async (req, res) => {
  try {
    const project = await projectService.getProjectBySlug(req.params.slug);
    if (!project || project.visibility !== "public") {
      res.status(404).json({ error: "Project not found" });
      return;
    }
    res.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({ error: error?.message || "Internal server error", details: String(error) });
  }
});
router.get("/ai-chat/settings", async (_req, res) => {
  try {
    const data = await aiChatService.getPublicSettings();
    res.json(data);
  } catch (error) {
    console.error("Error fetching AI chat settings:", error);
    res.status(500).json({ error: error?.message || "Internal server error", details: String(error) });
  }
});
router.post("/ai-chat", async (req, res) => {
  try {
    const { messages, sessionId, language } = req.body;
    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ error: "Messages array is required" });
      return;
    }
    let location = "Unknown";
    const city = req.headers["x-vercel-ip-city"];
    const country = req.headers["x-vercel-ip-country"];
    if (city && country) {
      location = `${city}, ${country}`;
    } else if (country) {
      location = String(country);
    } else if (city) {
      location = String(city);
    }
    await aiChatService.chatCompletion(messages, location, res, sessionId, language || "en");
  } catch (error) {
    console.error("Error in AI chat completion:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: error?.message || "Internal server error", details: String(error) });
    } else {
      res.end();
    }
  }
});
router.get("/labs/creations", async (req, res) => {
  try {
    const { search, category } = req.query;
    const data = await labsService.getCreations(search, category);
    res.json(data);
  } catch (error) {
    console.error("Error fetching creations:", error);
    res.status(500).json({ error: error?.message || "Internal server error", details: String(error) });
  }
});
router.get("/labs/categories", async (_req, res) => {
  try {
    const data = await labsService.getCategories();
    res.json(data);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: error?.message || "Internal server error", details: String(error) });
  }
});
var publicRoutes_default = router;

// apps/api/src/routes/adminRoutes.ts
import { Router as Router2 } from "express";
var router2 = Router2();
router2.get("/home", async (_req, res) => {
  try {
    const data = await homeService.getHomePage();
    res.json(data);
  } catch (error) {
    console.error("Error fetching home page:", error);
    res.status(500).json({ error: error?.message || "Internal server error" });
  }
});
router2.put("/home", async (req, res) => {
  try {
    const data = await homeService.updateHomePage(req.body);
    res.json(data);
  } catch (error) {
    console.error("Error updating home page:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router2.get("/about", async (_req, res) => {
  try {
    const data = await aboutService.getAboutPage();
    res.json(data);
  } catch (error) {
    console.error("Error fetching about page:", error);
    res.status(500).json({ error: error?.message || "Internal server error" });
  }
});
router2.put("/about", async (req, res) => {
  try {
    const data = await aboutService.updateAboutPage(req.body);
    res.json(data);
  } catch (error) {
    console.error("Error updating about page:", error);
    const msg = error?.message || "Internal server error";
    const cause = error?.cause?.message || "";
    res.status(500).json({ error: cause ? `${msg} | Cause: ${cause}` : msg });
  }
});
router2.get("/contact", async (_req, res) => {
  try {
    const data = await contactService.getContactPage();
    res.json(data);
  } catch (error) {
    console.error("Error fetching contact page:", error);
    res.status(500).json({ error: error?.message || "Internal server error" });
  }
});
router2.put("/contact", async (req, res) => {
  try {
    const data = await contactService.updateContactPage(req.body);
    res.json(data);
  } catch (error) {
    console.error("Error updating contact page:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router2.get("/projects", async (_req, res) => {
  try {
    const data = await projectService.listProjects(false);
    res.json(data);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router2.get("/projects/:id", async (req, res) => {
  try {
    const project = await projectService.getProjectById(Number(req.params.id));
    if (!project) {
      res.status(404).json({ error: "Project not found" });
      return;
    }
    res.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router2.post("/projects", async (req, res) => {
  try {
    const project = await projectService.createProject(req.body);
    res.status(201).json(project);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router2.put("/projects/:id", async (req, res) => {
  try {
    const project = await projectService.updateProject(Number(req.params.id), req.body);
    if (!project) {
      res.status(404).json({ error: "Project not found" });
      return;
    }
    res.json(project);
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router2.delete("/projects/:id", async (req, res) => {
  try {
    const deleted = await projectService.deleteProject(Number(req.params.id));
    if (!deleted) {
      res.status(404).json({ error: "Project not found" });
      return;
    }
    res.json({ message: "Project deleted", project: deleted });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router2.post("/projects/reorder", async (req, res) => {
  try {
    const { projectIds } = req.body;
    if (!Array.isArray(projectIds)) {
      res.status(400).json({ error: "projectIds must be an array" });
      return;
    }
    await projectService.reorderProjects(projectIds);
    res.json({ message: "Projects reordered successfully" });
  } catch (error) {
    console.error("Error reordering projects:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router2.get("/ai-chat", async (_req, res) => {
  try {
    const data = await aiChatService.getSettings();
    res.json(data);
  } catch (error) {
    console.error("Error fetching AI chat settings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router2.put("/ai-chat", async (req, res) => {
  try {
    const data = await aiChatService.updateSettings(req.body);
    res.json(data);
  } catch (error) {
    console.error("Error updating AI chat settings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router2.get("/ai-chat/logs", async (_req, res) => {
  try {
    const logs = await aiChatService.getLogs();
    res.json(logs);
  } catch (error) {
    console.error("Error fetching AI chat logs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router2.delete("/ai-chat/logs/session/:sessionId", async (req, res) => {
  try {
    const success = await aiChatService.deleteSession(req.params.sessionId);
    if (!success) {
      res.status(404).json({ error: "Session not found or could not be deleted" });
      return;
    }
    res.json({ message: "Session deleted successfully" });
  } catch (error) {
    console.error("Error deleting AI chat session:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router2.post("/ai-chat/logs/sessions/bulk-delete", async (req, res) => {
  try {
    const { sessionIds } = req.body;
    if (!Array.isArray(sessionIds)) {
      res.status(400).json({ error: "sessionIds must be an array" });
      return;
    }
    const success = await aiChatService.deleteSessionsBulk(sessionIds);
    if (!success) {
      res.status(500).json({ error: "Failed to delete sessions" });
      return;
    }
    res.json({ message: "Sessions deleted successfully" });
  } catch (error) {
    console.error("Error deleting bulk AI chat sessions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router2.get("/labs/creations", async (_req, res) => {
  try {
    const data = await labsService.getCreations();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
router2.post("/labs/creations", async (req, res) => {
  try {
    const data = await labsService.createCreation(req.body);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
router2.put("/labs/creations/:id", async (req, res) => {
  try {
    const data = await labsService.updateCreation(Number(req.params.id), req.body);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
router2.delete("/labs/creations/:id", async (req, res) => {
  try {
    await labsService.deleteCreation(Number(req.params.id));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
var adminRoutes_default = router2;

// apps/api/src/app.ts
var app = express();
var corsOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";
app.use(cors({
  origin: corsOrigin,
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "X-Better-Auth-Token"],
  exposedHeaders: ["set-auth-token"]
}));
app.all("/api/auth/*", toNodeHandler(auth));
app.use(express.json());
app.use(cookieParser());
app.use("/api", publicRoutes_default);
app.use("/api/admin", requireAuth, adminRoutes_default);
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: (/* @__PURE__ */ new Date()).toISOString() });
});
app.get("/api/debug/schema", async (_req, res) => {
  try {
    const { db: db2 } = await Promise.resolve().then(() => (init_db(), db_exports));
    const { sql: sql5 } = await import("drizzle-orm");
    const result = await db2.execute(sql5`
            SELECT table_name, column_name, data_type, is_nullable, column_default
            FROM information_schema.columns
            WHERE table_schema = 'public'
            AND table_name IN ('experiences', 'certifications', 'about_tools', 'gallery_images', 'about_page')
            ORDER BY table_name, ordinal_position
        `);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error?.message });
  }
});
app.get("/api/debug/migrate", async (_req, res) => {
  try {
    const { db: db2 } = await Promise.resolve().then(() => (init_db(), db_exports));
    const { sql: sql5 } = await import("drizzle-orm");
    await db2.execute(sql5`ALTER TABLE contact_page ADD COLUMN IF NOT EXISTS email text;`);
    await db2.execute(sql5`ALTER TABLE contact_page ADD COLUMN IF NOT EXISTS phone text;`);
    await db2.execute(sql5`ALTER TABLE contact_page ADD COLUMN IF NOT EXISTS location text;`);
    res.json({ success: true, message: "Database migrated successfully. Columns email, phone, location added." });
  } catch (error) {
    res.status(500).json({ success: false, error: error?.message });
  }
});
app.get("/api/debug/migrate-labs", async (_req, res) => {
  try {
    const { db: db2 } = await Promise.resolve().then(() => (init_db(), db_exports));
    const { sql: sql5 } = await import("drizzle-orm");
    await db2.execute(sql5`
            CREATE TABLE IF NOT EXISTS creations (
                id SERIAL PRIMARY KEY,
                title TEXT NOT NULL,
                image_url TEXT NOT NULL,
                category TEXT NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                updated_at TIMESTAMP NOT NULL DEFAULT NOW()
            )
        `);
    res.json({ success: true, message: "Database migrated successfully for Labs. creations table ensured." });
  } catch (error) {
    res.status(500).json({ success: false, error: error?.message });
  }
});
var app_default = app;
export {
  app_default as default
};

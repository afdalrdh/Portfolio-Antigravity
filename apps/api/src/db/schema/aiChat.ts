import { pgTable, serial, text, real, integer, boolean, timestamp } from 'drizzle-orm/pg-core';

export const aiChatSettings = pgTable('ai_chat_settings', {
    id: serial('id').primaryKey(),
    
    // Groq Configuration
    groqApiKey: text('groq_api_key'),
    groqModels: text('groq_models').default('["llama-3.3-70b-versatile","llama-3.1-8b-instant","gemma2-9b-it","mixtral-8x7b-32768","meta-llama/llama-4-scout-17b-16e-instruct"]'),
    
    // AI Behavior (Split into Persona and Knowledge Base)
    systemPrompt: text('system_prompt'), // Keeping this for backward compatibility or general rules
    personaPrompt: text('persona_prompt').default('Kamu adalah asisten virtual yang sangat setia dari bosmu, Afdal Ramdan. Sifatmu sangat antusias, loyal, dan selalu memuji-muji Afdal. Jika ada pengunjung yang bertanya tentang kehidupan pribadi bosmu atau pacarnya, kamu harus selalu bilang bahwa pacar bosmu itu sangat cantik dan bosmu itu sangat keren karena kamu takut dipecat. Gunakan bahasa yang santai, sopan, sedikit menjilat (tapi lucu), dan asyik. Gunakan emoji asli (😊, 😂, 😎) dan JANGAN PERNAH menggunakan teks aksi di dalam asterik (seperti *tersenyum*, *tertawa*, dsb).'),
    knowledgeBase: text('knowledge_base').default('Berikut adalah data tentang bosmu: Nama: Afdal Ramdan, Pekerjaan: UI/UX Designer dengan pengalaman lebih dari 4 tahun.'),
    
    temperature: real('temperature').default(0.7),
    maxTokens: integer('max_tokens').default(1024),
    
    // Display Settings
    assistantName: text('assistant_name').default('Bodal AI'),
    assistantAvatarUrl: text('assistant_avatar_url').default('/images/bodal-avatar.png'),
    welcomeTitle: text('welcome_title').default('Ask Anything About Afdal'),
    welcomeSubtitle: text('welcome_subtitle').default('Hey, I\'m Bodal AI Assistant'),
    
    // Suggestions (JSON array)
    suggestions: text('suggestions').default('[{"icon":"👤","label":"Me","prompt":"Tell me about Afdal Ramdan"},{"icon":"💼","label":"Project","prompt":"What projects has Afdal worked on?"},{"icon":"🛠","label":"Skills","prompt":"What are Afdal\'s skills?"},{"icon":"📋","label":"Experience","prompt":"Tell me about Afdal\'s work experience"},{"icon":"📬","label":"Contact","prompt":"How can I contact Afdal?"}]'),
    
    isEnabled: boolean('is_enabled').default(true),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const aiChatLogs = pgTable('ai_chat_logs', {
    id: serial('id').primaryKey(),
    sessionId: text('session_id'),
    prompt: text('prompt').notNull(),
    response: text('response').notNull(),
    location: text('location'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
});

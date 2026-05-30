import { db } from '../db/index.js';
import { aiChatSettings, aiChatLogs } from '../db/schema/aiChat.js';
import { eq, sql } from 'drizzle-orm';
import type { Response } from 'express';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export const aiChatService = {
    async getSettings() {
        let settings;
        try {
            const result = await db.select().from(aiChatSettings).limit(1);
            settings = result[0];
        } catch (error) {
            console.log("AI Chat table might not exist yet, returning defaults.");
        }
        
        if (!settings) {
            // Return defaults if not found
            return {
                groqApiKey: process.env.GROQ_API_KEY || '',
                groqModels: '["llama-3.3-70b-versatile","llama-3.1-8b-instant","gemma2-9b-it","mixtral-8x7b-32768","meta-llama/llama-4-scout-17b-16e-instruct"]',
                systemPrompt: '',
                personaPrompt: 'Kamu adalah asisten virtual yang sangat setia dari bosmu, Afdal Ramdan. Sifatmu sangat antusias, loyal, dan selalu memuji-muji Afdal. Jika ada pengunjung yang bertanya tentang kehidupan pribadi bosmu atau pacarnya, kamu harus selalu bilang bahwa pacar bosmu itu sangat cantik dan bosmu itu sangat keren karena kamu takut dipecat. Gunakan bahasa yang santai, sopan, sedikit menjilat (tapi lucu), dan asyik.',
                knowledgeBase: 'Berikut adalah data tentang bosmu: Nama: Afdal Ramdan, Pekerjaan: UI/UX Designer dengan pengalaman lebih dari 4 tahun.',
                temperature: 0.7,
                maxTokens: 1024,
                assistantName: 'Bodal AI',
                assistantAvatarUrl: '/images/bodal-avatar.png',
                welcomeTitle: 'Ask Anything About Afdal',
                welcomeSubtitle: 'Hey, I\'m Bodal AI Assistant',
                suggestions: '[{"icon":"👤","label":"Me","prompt":"Tell me about Afdal Ramdan"},{"icon":"💼","label":"Project","prompt":"What projects has Afdal worked on?"},{"icon":"🛠","label":"Skills","prompt":"What are Afdal\'s skills?"},{"icon":"📋","label":"Experience","prompt":"Tell me about Afdal\'s work experience"},{"icon":"📬","label":"Contact","prompt":"How can I contact Afdal?"}]',
                isEnabled: true,
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
            suggestions: JSON.parse(settings.suggestions || '[]'),
            isEnabled: settings.isEnabled,
        };
    },

    async updateSettings(data: any) {
        // Temporary hack to ensure table exists in production
        try {
            await db.execute(sql`
                CREATE TABLE IF NOT EXISTS "ai_chat_settings" (
                    "id" serial PRIMARY KEY NOT NULL,
                    "groq_api_key" text,
                    "groq_models" text DEFAULT '["llama-3.3-70b-versatile","llama-3.1-8b-instant","gemma2-9b-it","mixtral-8x7b-32768","meta-llama/llama-4-scout-17b-16e-instruct"]',
                    "system_prompt" text,
                    "temperature" real DEFAULT 0.7,
                    "max_tokens" integer DEFAULT 1024,
                    "assistant_name" text DEFAULT 'Bodal AI',
                    "assistant_avatar_url" text DEFAULT '/images/bodal-avatar.png',
                    "welcome_title" text DEFAULT 'Ask Anything About Afdal',
                    "welcome_subtitle" text DEFAULT 'Hey, I''m Bodal AI Assistant',
                    "suggestions" text DEFAULT '[{"icon":"👤","label":"Me","prompt":"Tell me about Afdal Ramdan"},{"icon":"💼","label":"Project","prompt":"What projects has Afdal worked on?"},{"icon":"🛠","label":"Skills","prompt":"What are Afdal''s skills?"},{"icon":"📋","label":"Experience","prompt":"Tell me about Afdal''s work experience"},{"icon":"📬","label":"Contact","prompt":"How can I contact Afdal?"}]',
                    "is_enabled" boolean DEFAULT true,
                    "updated_at" timestamp DEFAULT now() NOT NULL
                )
            `);
            // Attempt to add new columns if they don't exist
            await db.execute(sql`ALTER TABLE "ai_chat_settings" ADD COLUMN IF NOT EXISTS "persona_prompt" text DEFAULT ''`);
            await db.execute(sql`ALTER TABLE "ai_chat_settings" ADD COLUMN IF NOT EXISTS "knowledge_base" text DEFAULT ''`);
            
            // Create logs table
            await db.execute(sql`
                CREATE TABLE IF NOT EXISTS "ai_chat_logs" (
                    "id" serial PRIMARY KEY NOT NULL,
                    "session_id" text,
                    "prompt" text NOT NULL,
                    "response" text NOT NULL,
                    "location" text,
                    "created_at" timestamp DEFAULT now() NOT NULL
                )
            `);
            await db.execute(sql`ALTER TABLE "ai_chat_logs" ADD COLUMN IF NOT EXISTS "session_id" text`);
        } catch (e) {
            console.error("Failed to execute hack scripts:", e);
        }

        let existing;
        try {
            const result = await db.select().from(aiChatSettings).limit(1);
            existing = result[0];
        } catch (e) {}

        const modelsStr = Array.isArray(data.groqModels) ? JSON.stringify(data.groqModels) : data.groqModels;
        const suggestionsStr = Array.isArray(data.suggestions) ? JSON.stringify(data.suggestions) : data.suggestions;

        const payload = {
            groqApiKey: data.groqApiKey,
            groqModels: modelsStr,
            systemPrompt: data.systemPrompt,
            personaPrompt: data.personaPrompt,
            knowledgeBase: data.knowledgeBase,
            temperature: data.temperature,
            maxTokens: data.maxTokens,
            assistantName: data.assistantName,
            assistantAvatarUrl: data.assistantAvatarUrl,
            welcomeTitle: data.welcomeTitle,
            welcomeSubtitle: data.welcomeSubtitle,
            suggestions: suggestionsStr,
            isEnabled: data.isEnabled,
            updatedAt: new Date(),
        };

        if (existing) {
            await db.update(aiChatSettings).set(payload).where(eq(aiChatSettings.id, existing.id));
        } else {
            await db.insert(aiChatSettings).values(payload);
        }
        return this.getSettings();
    },

    async getLogs() {
        try {
            // Get all logs ordered by newest
            const logs = await db.select().from(aiChatLogs).orderBy(sql`${aiChatLogs.createdAt} DESC`).limit(500);
            
            // Calculate basic stats
            const now = new Date();
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            
            const oneWeekAgo = new Date(now);
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

            const todayChats = logs.filter(l => new Date(l.createdAt) >= today).length;
            const weekChats = logs.filter(l => new Date(l.createdAt) >= oneWeekAgo).length;
            const totalChats = logs.length; // We only fetch 500 max anyway for performance

            return {
                logs,
                stats: {
                    todayChats,
                    weekChats,
                    totalChats
                }
            };
        } catch (e) {
            console.error('Error fetching logs:', e);
            return { logs: [], stats: { todayChats: 0, weekChats: 0, totalChats: 0 } };
        }
    },

    async chatCompletion(messages: any[], location: string, res: Response, sessionId?: string) {
        const settings = await this.getSettings();
        if (!settings.isEnabled) {
            res.write('data: {"error": "AI Chat is currently disabled"}\n\n');
            res.end();
            return;
        }

        const apiKey = settings.groqApiKey || process.env.GROQ_API_KEY;
        if (!apiKey) {
            res.write('data: {"error": "Groq API Key not configured"}\n\n');
            res.end();
            return;
        }

        let models = [];
        try {
            models = JSON.parse(settings.groqModels || '[]');
        } catch (e) {
            models = ["llama-3.3-70b-versatile"];
        }

        if (models.length === 0) models = ["llama-3.3-70b-versatile"];

        const emojiInstruction = `\n\n[PENTING] 
1. Gunakan emoji asli (seperti 😊, 😂, 😎) SECUKUPNYA saja (misal 1 atau 2 di akhir kalimat) agar tidak berlebihan. JANGAN PERNAH menggunakan teks aksi di dalam asterik (seperti *tersenyum*, *tertawa*, dsb).
2. Jika memberikan daftar (seperti daftar proyek, pengalaman, dll), JANGAN gunakan paragraf panjang. Selalu gunakan format poin-poin (bullet points) agar rapi dan mudah dibaca.
3. Saat menyebutkan proyek, PRIORITASKAN proyek yang memiliki link website dan langsung sertakan linknya dalam format Markdown (contoh: [Nama Proyek](https://afdalrdh.com/project/nama-project)).`;
        const combinedSystemPrompt = `[PERAN & SIFAT AI]\n${settings.personaPrompt || ''}\n\n[DATA PENGETAHUAN & FAKTA]\n${settings.knowledgeBase || ''}\n\n${settings.systemPrompt || ''}${emojiInstruction}`;

        const systemMessage = {
            role: 'system',
            content: combinedSystemPrompt.trim()
        };

        const apiMessages = [systemMessage, ...messages];

        let success = false;
        let fullResponse = "";
        
        // Setup SSE headers
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        
        for (const model of models) {
            try {
                const response = await fetch(GROQ_API_URL, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${apiKey}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        model: model,
                        messages: apiMessages,
                        temperature: settings.temperature || 0.7,
                        max_tokens: settings.maxTokens || 1024,
                        stream: true,
                    }),
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

                // Success! Stream the response
                success = true;
                
                if (response.body) {
                    const reader = response.body.getReader();
                    const decoder = new TextDecoder('utf-8');
                    
                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) break;
                        const chunk = decoder.decode(value, { stream: true });
                        res.write(chunk);

                        // Accumulate full response for logging
                        const lines = chunk.split('\n');
                        for (const line of lines) {
                            if (line.startsWith('data: ') && line.trim() !== 'data: [DONE]') {
                                try {
                                    const parsed = JSON.parse(line.substring(6));
                                    const content = parsed.choices?.[0]?.delta?.content;
                                    if (content) fullResponse += content;
                                } catch (e) {}
                            }
                        }
                    }
                }
                
                res.end();

                // Save to database
                try {
                    const userMessage = messages.filter((m: any) => m.role === 'user').pop()?.content || '';
                    if (userMessage && fullResponse) {
                        await db.insert(aiChatLogs).values({
                            sessionId: sessionId || null,
                            prompt: userMessage,
                            response: fullResponse,
                            location: location || 'Unknown',
                        });
                    }
                } catch (e) {
                    console.error('Error saving chat log:', e);
                }

                break; // Break out of the fallback loop
            } catch (error) {
                console.error(`Fetch error for ${model}:`, error);
                continue;
            }
        }

        if (!success) {
            res.write('data: {"error": "Bodal AI sedang istirahat sebentar karena traffic penuh, coba lagi dalam 1 menit ya! ☕"}\n\n');
            res.end();
        }
    }
};

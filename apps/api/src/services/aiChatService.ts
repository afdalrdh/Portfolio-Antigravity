import { db } from '../db/index.js';
import { aiChatSettings } from '../db/schema/aiChat.js';
import { eq } from 'drizzle-orm';
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
        const [existing] = await db.select().from(aiChatSettings).limit(1);

        const modelsStr = Array.isArray(data.groqModels) ? JSON.stringify(data.groqModels) : data.groqModels;
        const suggestionsStr = Array.isArray(data.suggestions) ? JSON.stringify(data.suggestions) : data.suggestions;

        const payload = {
            groqApiKey: data.groqApiKey,
            groqModels: modelsStr,
            systemPrompt: data.systemPrompt,
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

    async chatCompletion(messages: any[], res: Response) {
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

        const systemMessage = {
            role: 'system',
            content: settings.systemPrompt || 'You are a helpful assistant.'
        };

        const apiMessages = [systemMessage, ...messages];

        let success = false;
        
        // Setup SSE headers
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        // Ensure standard CORS headers if needed, though handled by cors middleware
        
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
                    // For Node.js fetch, body is a web readable stream
                    const reader = response.body.getReader();
                    const decoder = new TextDecoder('utf-8');
                    
                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) break;
                        const chunk = decoder.decode(value, { stream: true });
                        res.write(chunk);
                    }
                }
                
                res.end();
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

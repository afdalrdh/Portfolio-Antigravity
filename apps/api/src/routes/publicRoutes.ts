import { Router } from 'express';
import { homeService } from '../services/homeService.js';
import { aboutService } from '../services/aboutService.js';
import { contactService } from '../services/contactService.js';
import { projectService } from '../services/projectService.js';
import { aiChatService } from '../services/aiChatService.js';

const router = Router();

// Home page data
router.get('/home', async (_req, res) => {
    try {
        const data = await homeService.getHomePage();
        res.json(data);
    } catch (error) {
        console.error('Error fetching home page:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// About page data
router.get('/about', async (_req, res) => {
    try {
        const data = await aboutService.getAboutPage();
        res.json(data);
    } catch (error) {
        console.error('Error fetching about page:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Contact page data
router.get('/contact', async (_req, res) => {
    try {
        const data = await contactService.getContactPage();
        res.json(data);
    } catch (error) {
        console.error('Error fetching contact page:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// List published projects
router.get('/projects', async (_req, res) => {
    try {
        const data = await projectService.listProjects(true); // only public
        res.json(data);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Single project by slug
router.get('/projects/:slug', async (req, res) => {
    try {
        const project = await projectService.getProjectBySlug(req.params.slug);
        if (!project || project.visibility !== 'public') {
            res.status(404).json({ error: 'Project not found' });
            return;
        }
        res.json(project);
    } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// AI Chat - public settings
router.get('/ai-chat/settings', async (_req, res) => {
    try {
        const data = await aiChatService.getPublicSettings();
        res.json(data);
    } catch (error) {
        console.error('Error fetching AI chat settings:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// AI Chat - chat completion (SSE streaming)
router.post('/ai-chat', async (req, res) => {
    try {
        const { messages, sessionId, language } = req.body;
        if (!messages || !Array.isArray(messages)) {
            res.status(400).json({ error: 'Messages array is required' });
            return;
        }
        let location = 'Unknown';
        const city = req.headers['x-vercel-ip-city'];
        const country = req.headers['x-vercel-ip-country'];
        if (city && country) {
            location = `${city}, ${country}`;
        } else if (country) {
            location = String(country);
        } else if (city) {
            location = String(city);
        }

        await aiChatService.chatCompletion(messages, location, res, sessionId, language || 'en');
    } catch (error) {
        console.error('Error in AI chat completion:', error);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.end();
        }
    }
});

export default router;

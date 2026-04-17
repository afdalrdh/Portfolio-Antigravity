import { Router } from 'express';
import { homeService } from '../services/homeService.js';
import { aboutService } from '../services/aboutService.js';
import { contactService } from '../services/contactService.js';
import { projectService } from '../services/projectService.js';

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

export default router;

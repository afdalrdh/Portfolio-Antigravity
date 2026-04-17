import { Router } from 'express';
import { homeService } from '../services/homeService.js';
import { aboutService } from '../services/aboutService.js';
import { contactService } from '../services/contactService.js';
import { projectService } from '../services/projectService.js';

const router = Router();

// ==================== HOME ====================

router.get('/home', async (_req, res) => {
    try {
        const data = await homeService.getHomePage();
        res.json(data);
    } catch (error) {
        console.error('Error fetching home page:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/home', async (req, res) => {
    try {
        const data = await homeService.updateHomePage(req.body);
        res.json(data);
    } catch (error) {
        console.error('Error updating home page:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ==================== ABOUT ====================

router.get('/about', async (_req, res) => {
    try {
        const data = await aboutService.getAboutPage();
        res.json(data);
    } catch (error) {
        console.error('Error fetching about page:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/about', async (req, res) => {
    try {
        const data = await aboutService.updateAboutPage(req.body);
        res.json(data);
    } catch (error) {
        console.error('Error updating about page:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ==================== CONTACT ====================

router.get('/contact', async (_req, res) => {
    try {
        const data = await contactService.getContactPage();
        res.json(data);
    } catch (error) {
        console.error('Error fetching contact page:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/contact', async (req, res) => {
    try {
        const data = await contactService.updateContactPage(req.body);
        res.json(data);
    } catch (error) {
        console.error('Error updating contact page:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ==================== PROJECTS ====================

router.get('/projects', async (_req, res) => {
    try {
        const data = await projectService.listProjects(false); // all statuses for admin
        res.json(data);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/projects/:id', async (req, res) => {
    try {
        const project = await projectService.getProjectById(Number(req.params.id));
        if (!project) {
            res.status(404).json({ error: 'Project not found' });
            return;
        }
        res.json(project);
    } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/projects', async (req, res) => {
    try {
        const project = await projectService.createProject(req.body);
        res.status(201).json(project);
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/projects/:id', async (req, res) => {
    try {
        const project = await projectService.updateProject(Number(req.params.id), req.body);
        if (!project) {
            res.status(404).json({ error: 'Project not found' });
            return;
        }
        res.json(project);
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/projects/:id', async (req, res) => {
    try {
        const deleted = await projectService.deleteProject(Number(req.params.id));
        if (!deleted) {
            res.status(404).json({ error: 'Project not found' });
            return;
        }
        res.json({ message: 'Project deleted', project: deleted });
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;

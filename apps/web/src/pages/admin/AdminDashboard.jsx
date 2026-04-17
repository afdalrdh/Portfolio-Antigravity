import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminApi } from '../../lib/api';
import './AdminDashboard.css';

export default function AdminDashboard() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProjects = () => {
        adminApi.getProjects()
            .then(setProjects)
            .catch(console.error)
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleDelete = async (id, title) => {
        if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
        try {
            await adminApi.deleteProject(id);
            fetchProjects();
        } catch (err) {
            alert('Failed to delete project: ' + err.message);
        }
    };

    if (loading) {
        return <div style={{ padding: '40px', textAlign: 'center' }}><p className="text-secondary">Loading projects...</p></div>;
    }

    return (
        <div className="admin-dashboard">
            <div className="dashboard-header">
                <div>
                    <h3 className="section-title">Projects</h3>
                    <p className="text-secondary section-subtitle">Manage your portfolio projects</p>
                </div>
                <Link to="/admin/projects/new" className="btn-primary">
                    Create New Project
                </Link>
            </div>

            <div className="dashboard-table-container">
                <table className="dashboard-table">
                    <thead>
                        <tr>
                            <th>Project Title</th>
                            <th>Company</th>
                            <th>Year</th>
                            <th>Status</th>
                            <th className="text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project) => (
                            <tr key={project.id}>
                                <td className="font-medium">{project.title}</td>
                                <td className="text-secondary">{project.company || '-'}</td>
                                <td className="text-secondary">{project.year || '-'}</td>
                                <td>
                                    <span className={`status-badge ${project.visibility === 'public' ? 'published' : 'draft'}`}>
                                        {project.visibility === 'public' ? 'Published' : 'Draft'}
                                    </span>
                                </td>
                                <td className="text-right table-actions">
                                    <Link to={`/admin/projects/${project.id}/edit`} className="action-link edit">Edit</Link>
                                    <span className="action-divider">|</span>
                                    <button className="action-link delete" onClick={() => handleDelete(project.id, project.title)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        {projects.length === 0 && (
                            <tr><td colSpan="5" style={{ textAlign: 'center', padding: '40px' }} className="text-secondary">No projects yet. Create your first project!</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

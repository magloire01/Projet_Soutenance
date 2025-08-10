const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { validateProjectCreation } = require('../middleware/validation');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// In-memory project storage (replace with database in production)
const projects = new Map();
const users = require('./auth').users || new Map();

// Get all projects for authenticated user
router.get('/', authenticateToken, (req, res) => {
  try {
    const userId = req.user.userId;
    const userProjects = Array.from(projects.values())
      .filter(project => project.userId === userId)
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    res.json({
      message: 'Projects retrieved successfully',
      data: userProjects.map(project => ({
        id: project.id,
        name: project.name,
        description: project.description,
        type: project.type,
        status: project.status,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
        previewUrl: project.previewUrl,
        templateId: project.templateId
      }))
    });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({
      error: 'Failed to retrieve projects',
      code: 'GET_PROJECTS_ERROR'
    });
  }
});

// Get specific project
router.get('/:id', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    
    const project = projects.get(id);
    
    if (!project) {
      return res.status(404).json({
        error: 'Project not found',
        code: 'PROJECT_NOT_FOUND'
      });
    }

    if (project.userId !== userId) {
      return res.status(403).json({
        error: 'Access denied to this project',
        code: 'ACCESS_DENIED'
      });
    }

    res.json({
      message: 'Project retrieved successfully',
      data: project
    });
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({
      error: 'Failed to retrieve project',
      code: 'GET_PROJECT_ERROR'
    });
  }
});

// Create new project
router.post('/', authenticateToken, validateProjectCreation, (req, res) => {
  try {
    const { name, description, templateId, type = 'website' } = req.body;
    const userId = req.user.userId;

    const projectId = uuidv4();
    const project = {
      id: projectId,
      name,
      description: description || '',
      type,
      userId,
      templateId: templateId || null,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      files: {},
      settings: {
        theme: 'default',
        responsive: true,
        seo: {
          title: name,
          description: description || '',
          keywords: []
        }
      },
      deployments: [],
      previewUrl: null
    };

    projects.set(projectId, project);

    // Update user's project list
    const user = users.get(userId);
    if (user) {
      user.projects.push(projectId);
    }

    res.status(201).json({
      message: 'Project created successfully',
      data: project
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({
      error: 'Failed to create project',
      code: 'CREATE_PROJECT_ERROR'
    });
  }
});

// Update project
router.put('/:id', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const updates = req.body;

    const project = projects.get(id);
    
    if (!project) {
      return res.status(404).json({
        error: 'Project not found',
        code: 'PROJECT_NOT_FOUND'
      });
    }

    if (project.userId !== userId) {
      return res.status(403).json({
        error: 'Access denied to this project',
        code: 'ACCESS_DENIED'
      });
    }

    // Update allowed fields
    const allowedUpdates = ['name', 'description', 'files', 'settings', 'status'];
    const updatedProject = { ...project };

    allowedUpdates.forEach(field => {
      if (updates[field] !== undefined) {
        updatedProject[field] = updates[field];
      }
    });

    updatedProject.updatedAt = new Date().toISOString();
    projects.set(id, updatedProject);

    res.json({
      message: 'Project updated successfully',
      data: updatedProject
    });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({
      error: 'Failed to update project',
      code: 'UPDATE_PROJECT_ERROR'
    });
  }
});

// Delete project
router.delete('/:id', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const project = projects.get(id);
    
    if (!project) {
      return res.status(404).json({
        error: 'Project not found',
        code: 'PROJECT_NOT_FOUND'
      });
    }

    if (project.userId !== userId) {
      return res.status(403).json({
        error: 'Access denied to this project',
        code: 'ACCESS_DENIED'
      });
    }

    projects.delete(id);

    // Remove from user's project list
    const user = users.get(userId);
    if (user) {
      user.projects = user.projects.filter(projectId => projectId !== id);
    }

    res.json({
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({
      error: 'Failed to delete project',
      code: 'DELETE_PROJECT_ERROR'
    });
  }
});

// Duplicate project
router.post('/:id/duplicate', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const { name } = req.body;

    const originalProject = projects.get(id);
    
    if (!originalProject) {
      return res.status(404).json({
        error: 'Project not found',
        code: 'PROJECT_NOT_FOUND'
      });
    }

    if (originalProject.userId !== userId) {
      return res.status(403).json({
        error: 'Access denied to this project',
        code: 'ACCESS_DENIED'
      });
    }

    const newProjectId = uuidv4();
    const duplicatedProject = {
      ...originalProject,
      id: newProjectId,
      name: name || `${originalProject.name} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deployments: [],
      previewUrl: null
    };

    projects.set(newProjectId, duplicatedProject);

    // Update user's project list
    const user = users.get(userId);
    if (user) {
      user.projects.push(newProjectId);
    }

    res.status(201).json({
      message: 'Project duplicated successfully',
      data: duplicatedProject
    });
  } catch (error) {
    console.error('Duplicate project error:', error);
    res.status(500).json({
      error: 'Failed to duplicate project',
      code: 'DUPLICATE_PROJECT_ERROR'
    });
  }
});

// Export project
router.get('/:id/export', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const { format = 'zip' } = req.query;

    const project = projects.get(id);
    
    if (!project) {
      return res.status(404).json({
        error: 'Project not found',
        code: 'PROJECT_NOT_FOUND'
      });
    }

    if (project.userId !== userId) {
      return res.status(403).json({
        error: 'Access denied to this project',
        code: 'ACCESS_DENIED'
      });
    }

    // In a real implementation, you would generate and return the actual files
    const exportData = {
      project: {
        name: project.name,
        description: project.description,
        files: project.files,
        settings: project.settings
      },
      format,
      exportedAt: new Date().toISOString(),
      downloadUrl: `/api/projects/${id}/download?format=${format}`
    };

    res.json({
      message: 'Project export prepared successfully',
      data: exportData
    });
  } catch (error) {
    console.error('Export project error:', error);
    res.status(500).json({
      error: 'Failed to export project',
      code: 'EXPORT_PROJECT_ERROR'
    });
  }
});

module.exports = router;
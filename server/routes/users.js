const express = require('express');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// In-memory user storage (same as auth.js - should be shared)
const users = new Map();

// Get user profile
router.get('/profile', authenticateToken, (req, res) => {
  try {
    const userId = req.user.userId;
    const user = users.get(userId);

    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        code: 'USER_NOT_FOUND'
      });
    }

    const profile = {
      id: user.id,
      email: user.email,
      name: user.name,
      subscription: user.subscription,
      createdAt: user.createdAt,
      stats: {
        projectCount: user.projects.length,
        totalGenerations: user.totalGenerations || 0,
        lastLogin: user.lastLogin || user.createdAt
      }
    };

    res.json({
      message: 'Profile retrieved successfully',
      data: profile
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      error: 'Failed to retrieve profile',
      code: 'GET_PROFILE_ERROR'
    });
  }
});

// Update user profile
router.put('/profile', authenticateToken, (req, res) => {
  try {
    const userId = req.user.userId;
    const { name, email } = req.body;
    
    const user = users.get(userId);
    
    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        code: 'USER_NOT_FOUND'
      });
    }

    // Check if email is already taken by another user
    if (email && email !== user.email) {
      const existingUser = Array.from(users.values()).find(u => u.email === email && u.id !== userId);
      if (existingUser) {
        return res.status(400).json({
          error: 'Email already taken',
          code: 'EMAIL_TAKEN'
        });
      }
    }

    // Update user data
    if (name) user.name = name.trim();
    if (email) user.email = email.toLowerCase().trim();
    user.updatedAt = new Date().toISOString();

    users.set(userId, user);

    res.json({
      message: 'Profile updated successfully',
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        subscription: user.subscription,
        updatedAt: user.updatedAt
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      error: 'Failed to update profile',
      code: 'UPDATE_PROFILE_ERROR'
    });
  }
});

// Get user statistics
router.get('/stats', authenticateToken, (req, res) => {
  try {
    const userId = req.user.userId;
    const user = users.get(userId);

    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        code: 'USER_NOT_FOUND'
      });
    }

    // In a real implementation, these would come from analytics/database
    const stats = {
      projects: {
        total: user.projects.length,
        active: user.projects.length, // All projects are considered active for now
        completed: 0
      },
      ai: {
        totalGenerations: user.totalGenerations || 0,
        thisMonth: Math.floor(Math.random() * 10), // Mock data
        averagePerDay: Math.floor((user.totalGenerations || 0) / 30)
      },
      usage: {
        storageUsed: Math.floor(Math.random() * 100), // Mock data in MB
        storageLimit: user.subscription === 'pro' ? 1000 : 100,
        apiCallsThisMonth: Math.floor(Math.random() * 50),
        apiCallsLimit: user.subscription === 'pro' ? 1000 : 100
      },
      account: {
        memberSince: user.createdAt,
        lastLogin: user.lastLogin || user.createdAt,
        subscription: user.subscription,
        subscriptionExpiry: user.subscriptionExpiry || null
      }
    };

    res.json({
      message: 'Statistics retrieved successfully',
      data: stats
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      error: 'Failed to retrieve statistics',
      code: 'GET_STATS_ERROR'
    });
  }
});

// Update user preferences
router.put('/preferences', authenticateToken, (req, res) => {
  try {
    const userId = req.user.userId;
    const preferences = req.body;
    
    const user = users.get(userId);
    
    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        code: 'USER_NOT_FOUND'
      });
    }

    // Update preferences
    user.preferences = {
      ...user.preferences,
      ...preferences,
      updatedAt: new Date().toISOString()
    };

    users.set(userId, user);

    res.json({
      message: 'Preferences updated successfully',
      data: user.preferences
    });
  } catch (error) {
    console.error('Update preferences error:', error);
    res.status(500).json({
      error: 'Failed to update preferences',
      code: 'UPDATE_PREFERENCES_ERROR'
    });
  }
});

// Delete user account
router.delete('/account', authenticateToken, (req, res) => {
  try {
    const userId = req.user.userId;
    const { confirmPassword } = req.body;

    if (!confirmPassword) {
      return res.status(400).json({
        error: 'Password confirmation required',
        code: 'PASSWORD_REQUIRED'
      });
    }

    const user = users.get(userId);
    
    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        code: 'USER_NOT_FOUND'
      });
    }

    // In a real implementation, you would:
    // 1. Verify the password
    // 2. Delete all user projects
    // 3. Clean up associated data
    // 4. Send confirmation email

    users.delete(userId);

    res.json({
      message: 'Account deleted successfully'
    });
  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({
      error: 'Failed to delete account',
      code: 'DELETE_ACCOUNT_ERROR'
    });
  }
});

module.exports = router;
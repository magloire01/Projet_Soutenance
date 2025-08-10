const express = require('express');
const { validateAIPrompt } = require('../middleware/validation');
const { authenticateToken, optionalAuth } = require('../middleware/auth');
const geminiService = require('../services/geminiService');
const rateLimit = require('express-rate-limit');

const router = express.Router();

// Rate limiting for AI endpoints
const aiRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 AI requests per minute
  message: {
    error: 'Too many AI requests, please try again later',
    code: 'AI_RATE_LIMIT'
  }
});

// Generate web application from prompt
router.post('/generate', aiRateLimit, optionalAuth, validateAIPrompt, async (req, res) => {
  try {
    const { prompt, projectType = 'website', style = 'modern' } = req.body;
    const userId = req.user?.userId;

    console.log(`Generating ${projectType} for user ${userId || 'anonymous'}: ${prompt}`);

    // Generate application using Gemini AI
    const generatedApp = await geminiService.generateWebApplication(prompt, projectType);

    // Add metadata
    const response = {
      id: require('uuid').v4(),
      prompt,
      projectType,
      style,
      generatedAt: new Date().toISOString(),
      userId: userId || null,
      ...generatedApp
    };

    res.json({
      message: 'Application generated successfully',
      data: response
    });
  } catch (error) {
    console.error('AI generation error:', error);
    res.status(500).json({
      error: 'Failed to generate application',
      code: 'AI_GENERATION_ERROR',
      details: error.message
    });
  }
});

// Improve existing code
router.post('/improve', aiRateLimit, authenticateToken, async (req, res) => {
  try {
    const { code, instructions } = req.body;

    if (!code || !instructions) {
      return res.status(400).json({
        error: 'Code and instructions are required',
        code: 'MISSING_PARAMETERS'
      });
    }

    const improvedCode = await geminiService.improveCode(code, instructions);

    res.json({
      message: 'Code improved successfully',
      data: improvedCode
    });
  } catch (error) {
    console.error('Code improvement error:', error);
    res.status(500).json({
      error: 'Failed to improve code',
      code: 'CODE_IMPROVEMENT_ERROR',
      details: error.message
    });
  }
});

// Generate specific component
router.post('/component', aiRateLimit, authenticateToken, async (req, res) => {
  try {
    const { componentType, specifications } = req.body;

    if (!componentType || !specifications) {
      return res.status(400).json({
        error: 'Component type and specifications are required',
        code: 'MISSING_PARAMETERS'
      });
    }

    const component = await geminiService.generateComponent(componentType, specifications);

    res.json({
      message: 'Component generated successfully',
      data: {
        componentType,
        specifications,
        code: component,
        generatedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Component generation error:', error);
    res.status(500).json({
      error: 'Failed to generate component',
      code: 'COMPONENT_GENERATION_ERROR',
      details: error.message
    });
  }
});

// SEO optimization
router.post('/seo-optimize', aiRateLimit, authenticateToken, async (req, res) => {
  try {
    const { content, keywords = [] } = req.body;

    if (!content) {
      return res.status(400).json({
        error: 'Content is required for SEO optimization',
        code: 'MISSING_CONTENT'
      });
    }

    const optimizedContent = await geminiService.optimizeForSEO(content, keywords);

    res.json({
      message: 'Content optimized for SEO successfully',
      data: {
        original: content,
        keywords,
        optimized: optimizedContent,
        optimizedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('SEO optimization error:', error);
    res.status(500).json({
      error: 'Failed to optimize content for SEO',
      code: 'SEO_OPTIMIZATION_ERROR',
      details: error.message
    });
  }
});

// Get AI suggestions for project improvement
router.post('/suggestions', aiRateLimit, authenticateToken, async (req, res) => {
  try {
    const { projectData, focusArea = 'general' } = req.body;

    if (!projectData) {
      return res.status(400).json({
        error: 'Project data is required',
        code: 'MISSING_PROJECT_DATA'
      });
    }

    const prompt = `
      Analyze this web project and provide improvement suggestions focusing on: ${focusArea}
      
      Project: ${JSON.stringify(projectData, null, 2)}
      
      Please provide specific, actionable suggestions for:
      1. User Experience (UX)
      2. Performance
      3. Accessibility
      4. SEO
      5. Code Quality
      
      Return as JSON with categories and suggestions.
    `;

    const result = await geminiService.model.generateContent(prompt);
    const response = await result.response;
    const suggestions = response.text();

    try {
      const parsedSuggestions = JSON.parse(suggestions);
      res.json({
        message: 'Suggestions generated successfully',
        data: {
          focusArea,
          suggestions: parsedSuggestions,
          generatedAt: new Date().toISOString()
        }
      });
    } catch {
      res.json({
        message: 'Suggestions generated successfully',
        data: {
          focusArea,
          suggestions: { general: suggestions },
          generatedAt: new Date().toISOString()
        }
      });
    }
  } catch (error) {
    console.error('Suggestions generation error:', error);
    res.status(500).json({
      error: 'Failed to generate suggestions',
      code: 'SUGGESTIONS_ERROR',
      details: error.message
    });
  }
});

// Chat with AI about project
router.post('/chat', aiRateLimit, authenticateToken, async (req, res) => {
  try {
    const { message, context = '', projectId } = req.body;

    if (!message) {
      return res.status(400).json({
        error: 'Message is required',
        code: 'MISSING_MESSAGE'
      });
    }

    const prompt = `
      You are an AI assistant helping with web development. 
      
      Context: ${context}
      Project ID: ${projectId || 'N/A'}
      
      User message: ${message}
      
      Please provide a helpful response about web development, coding, or project improvement.
    `;

    const result = await geminiService.model.generateContent(prompt);
    const response = await result.response;
    const aiResponse = response.text();

    res.json({
      message: 'AI response generated successfully',
      data: {
        userMessage: message,
        aiResponse,
        context,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('AI chat error:', error);
    res.status(500).json({
      error: 'Failed to get AI response',
      code: 'AI_CHAT_ERROR',
      details: error.message
    });
  }
});

module.exports = router;
const { GoogleGenerativeAI } = require('@google/generative-ai');

class GeminiService {
  constructor() {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is required');
    }
    
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  async generateWebApplication(prompt, projectType = 'website') {
    try {
      const systemPrompt = this.buildSystemPrompt(projectType);
      const fullPrompt = `${systemPrompt}\n\nUser Request: ${prompt}`;

      const result = await this.model.generateContent(fullPrompt);
      const response = await result.response;
      const generatedCode = response.text();

      return this.parseGeneratedCode(generatedCode);
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw new Error(`AI generation failed: ${error.message}`);
    }
  }

  async improveCode(code, instructions) {
    try {
      const prompt = `
        Improve the following code based on these instructions: ${instructions}
        
        Current code:
        ${code}
        
        Please provide the improved version with explanations of changes made.
        Return the response in JSON format with 'code' and 'changes' fields.
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      try {
        return JSON.parse(text);
      } catch {
        return {
          code: text,
          changes: 'Code improvements applied'
        };
      }
    } catch (error) {
      console.error('Code improvement error:', error);
      throw new Error(`Code improvement failed: ${error.message}`);
    }
  }

  async generateComponent(componentType, specifications) {
    try {
      const prompt = `
        Generate a React component for: ${componentType}
        
        Specifications: ${specifications}
        
        Requirements:
        - Use modern React with hooks
        - Include TypeScript types
        - Use Tailwind CSS for styling
        - Make it responsive
        - Include proper accessibility attributes
        - Add hover effects and animations where appropriate
        
        Return only the component code, properly formatted.
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Component generation error:', error);
      throw new Error(`Component generation failed: ${error.message}`);
    }
  }

  async optimizeForSEO(content, keywords) {
    try {
      const prompt = `
        Optimize the following content for SEO with these keywords: ${keywords.join(', ')}
        
        Content: ${content}
        
        Please provide:
        1. Optimized title
        2. Meta description
        3. Improved content with better keyword integration
        4. Suggested headings structure
        
        Return as JSON with fields: title, metaDescription, content, headings
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      try {
        return JSON.parse(text);
      } catch {
        return {
          title: 'SEO Optimized Title',
          metaDescription: 'SEO optimized description',
          content: text,
          headings: []
        };
      }
    } catch (error) {
      console.error('SEO optimization error:', error);
      throw new Error(`SEO optimization failed: ${error.message}`);
    }
  }

  buildSystemPrompt(projectType) {
    const basePrompt = `
      You are an expert web developer and designer. Generate a complete, modern web application based on the user's request.
      
      Requirements:
      - Use React with TypeScript
      - Use Tailwind CSS for styling
      - Create responsive, mobile-first design
      - Include proper accessibility features
      - Use modern design patterns and best practices
      - Generate clean, well-structured code
      - Include hover effects and smooth animations
      - Use appropriate icons from Lucide React
      
      Project Type: ${projectType}
    `;

    const typeSpecificPrompts = {
      website: 'Focus on creating a professional business website with clear navigation and compelling content.',
      webapp: 'Create an interactive web application with user interface components and functionality.',
      landing: 'Design a high-converting landing page with clear call-to-actions and persuasive copy.',
      ecommerce: 'Build an e-commerce platform with product listings, shopping cart, and checkout flow.',
      blog: 'Create a blog platform with article listings, categories, and reading experience.',
      portfolio: 'Design a portfolio website showcasing work, skills, and professional experience.'
    };

    return `${basePrompt}\n\n${typeSpecificPrompts[projectType] || typeSpecificPrompts.website}`;
  }

  parseGeneratedCode(generatedCode) {
    // Try to extract structured data from the generated code
    try {
      // Look for JSON structure in the response
      const jsonMatch = generatedCode.match(/```json\n([\s\S]*?)\n```/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[1]);
      }

      // Look for code blocks
      const codeBlocks = generatedCode.match(/```[\w]*\n([\s\S]*?)\n```/g);
      
      if (codeBlocks) {
        const files = {};
        codeBlocks.forEach((block, index) => {
          const code = block.replace(/```[\w]*\n/, '').replace(/\n```$/, '');
          const filename = this.extractFilename(code) || `component-${index + 1}.tsx`;
          files[filename] = code;
        });

        return {
          files,
          description: generatedCode.split('```')[0].trim(),
          type: 'multi-file'
        };
      }

      // Return as single component
      return {
        files: {
          'App.tsx': generatedCode
        },
        description: 'Generated web application',
        type: 'single-file'
      };
    } catch (error) {
      console.error('Error parsing generated code:', error);
      return {
        files: {
          'App.tsx': generatedCode
        },
        description: 'Generated web application',
        type: 'single-file'
      };
    }
  }

  extractFilename(code) {
    // Try to extract filename from comments or component names
    const commentMatch = code.match(/\/\/ (\w+\.tsx?)/);
    if (commentMatch) return commentMatch[1];

    const componentMatch = code.match(/(?:export default|const|function)\s+(\w+)/);
    if (componentMatch) return `${componentMatch[1]}.tsx`;

    return null;
  }
}

module.exports = new GeminiService();
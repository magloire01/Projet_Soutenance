const express = require('express');
const { optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Predefined templates
const templates = [
  {
    id: '1',
    name: 'SaaS Landing Pro',
    category: 'saas',
    description: 'Professional SaaS landing page with pricing, features, and testimonials',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.9,
    downloads: 15420,
    isPopular: true,
    isNew: false,
    tags: ['landing', 'saas', 'business', 'pricing'],
    features: ['Responsive Design', 'Dark Mode', 'Pricing Tables', 'Testimonials'],
    demoUrl: 'https://demo.example.com/saas-pro',
    files: {
      'App.tsx': `// SaaS Landing Pro Template
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Features />
      <Pricing />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default App;`
    }
  },
  {
    id: '2',
    name: 'E-commerce Modern',
    category: 'e-commerce',
    description: 'Modern e-commerce store with product catalog and shopping cart',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    downloads: 12350,
    isPopular: false,
    isNew: true,
    tags: ['ecommerce', 'shop', 'products', 'cart'],
    features: ['Product Catalog', 'Shopping Cart', 'Checkout', 'User Accounts'],
    demoUrl: 'https://demo.example.com/ecommerce-modern',
    files: {
      'App.tsx': `// E-commerce Modern Template
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProductCatalog from './components/ProductCatalog';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<ProductCatalog />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;`
    }
  },
  {
    id: '3',
    name: 'Portfolio Creative',
    category: 'portfolio',
    description: 'Creative portfolio showcase for designers and developers',
    image: 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.7,
    downloads: 9800,
    isPopular: false,
    isNew: false,
    tags: ['portfolio', 'creative', 'showcase', 'personal'],
    features: ['Project Gallery', 'About Section', 'Contact Form', 'Animations'],
    demoUrl: 'https://demo.example.com/portfolio-creative',
    files: {
      'App.tsx': `// Portfolio Creative Template
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <Hero />
      <About />
      <Portfolio />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;`
    }
  },
  {
    id: '4',
    name: 'Blog Magazine',
    category: 'blog',
    description: 'Magazine-style blog with categories and featured articles',
    image: 'https://images.pexels.com/photos/357514/pexels-photo-357514.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.6,
    downloads: 8900,
    isPopular: true,
    isNew: false,
    tags: ['blog', 'magazine', 'articles', 'content'],
    features: ['Article Listings', 'Categories', 'Search', 'Comments'],
    demoUrl: 'https://demo.example.com/blog-magazine',
    files: {
      'App.tsx': `// Blog Magazine Template
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import ArticleList from './components/ArticleList';
import Article from './components/Article';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<ArticleList />} />
          <Route path="/article/:id" element={<Article />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;`
    }
  },
  {
    id: '5',
    name: 'Dashboard Analytics',
    category: 'dashboard',
    description: 'Analytics dashboard with charts and data visualization',
    image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.9,
    downloads: 7650,
    isPopular: false,
    isNew: true,
    tags: ['dashboard', 'analytics', 'charts', 'data'],
    features: ['Data Visualization', 'Charts', 'Filters', 'Export'],
    demoUrl: 'https://demo.example.com/dashboard-analytics',
    files: {
      'App.tsx': `// Dashboard Analytics Template
import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Charts from './components/Charts';
import Tables from './components/Tables';

function App() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <Dashboard />
          <Charts />
          <Tables />
        </main>
      </div>
    </div>
  );
}

export default App;`
    }
  },
  {
    id: '6',
    name: 'Restaurant Menu',
    category: 'restaurant',
    description: 'Restaurant website with menu, reservations, and contact',
    image: 'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.5,
    downloads: 6200,
    isPopular: false,
    isNew: false,
    tags: ['restaurant', 'menu', 'food', 'reservations'],
    features: ['Menu Display', 'Reservations', 'Gallery', 'Contact'],
    demoUrl: 'https://demo.example.com/restaurant-menu',
    files: {
      'App.tsx': `// Restaurant Menu Template
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Menu from './components/Menu';
import About from './components/About';
import Reservations from './components/Reservations';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-amber-50">
      <Header />
      <Hero />
      <Menu />
      <About />
      <Reservations />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;`
    }
  }
];

// Get all templates
router.get('/', optionalAuth, (req, res) => {
  try {
    const { category, search, sort = 'popular', limit = 20, offset = 0 } = req.query;

    let filteredTemplates = [...templates];

    // Filter by category
    if (category && category !== 'all') {
      filteredTemplates = filteredTemplates.filter(template => 
        template.category === category
      );
    }

    // Search filter
    if (search) {
      const searchTerm = search.toLowerCase();
      filteredTemplates = filteredTemplates.filter(template =>
        template.name.toLowerCase().includes(searchTerm) ||
        template.description.toLowerCase().includes(searchTerm) ||
        template.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    // Sort templates
    switch (sort) {
      case 'popular':
        filteredTemplates.sort((a, b) => b.downloads - a.downloads);
        break;
      case 'rating':
        filteredTemplates.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filteredTemplates.sort((a, b) => b.isNew - a.isNew);
        break;
      case 'name':
        filteredTemplates.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    // Pagination
    const startIndex = parseInt(offset);
    const endIndex = startIndex + parseInt(limit);
    const paginatedTemplates = filteredTemplates.slice(startIndex, endIndex);

    // Remove file content from list view for performance
    const templatesForList = paginatedTemplates.map(template => {
      const { files, ...templateWithoutFiles } = template;
      return templateWithoutFiles;
    });

    res.json({
      message: 'Templates retrieved successfully',
      data: templatesForList,
      pagination: {
        total: filteredTemplates.length,
        limit: parseInt(limit),
        offset: parseInt(offset),
        hasMore: endIndex < filteredTemplates.length
      }
    });
  } catch (error) {
    console.error('Get templates error:', error);
    res.status(500).json({
      error: 'Failed to retrieve templates',
      code: 'GET_TEMPLATES_ERROR'
    });
  }
});

// Get specific template
router.get('/:id', optionalAuth, (req, res) => {
  try {
    const { id } = req.params;
    const template = templates.find(t => t.id === id);

    if (!template) {
      return res.status(404).json({
        error: 'Template not found',
        code: 'TEMPLATE_NOT_FOUND'
      });
    }

    res.json({
      message: 'Template retrieved successfully',
      data: template
    });
  } catch (error) {
    console.error('Get template error:', error);
    res.status(500).json({
      error: 'Failed to retrieve template',
      code: 'GET_TEMPLATE_ERROR'
    });
  }
});

// Get template categories
router.get('/categories/list', (req, res) => {
  try {
    const categories = templates.reduce((acc, template) => {
      if (!acc[template.category]) {
        acc[template.category] = {
          id: template.category,
          name: template.category.charAt(0).toUpperCase() + template.category.slice(1),
          count: 0
        };
      }
      acc[template.category].count++;
      return acc;
    }, {});

    const categoryList = [
      { id: 'all', name: 'Tous', count: templates.length },
      ...Object.values(categories)
    ];

    res.json({
      message: 'Categories retrieved successfully',
      data: categoryList
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      error: 'Failed to retrieve categories',
      code: 'GET_CATEGORIES_ERROR'
    });
  }
});

// Get featured templates
router.get('/featured/list', (req, res) => {
  try {
    const featuredTemplates = templates
      .filter(template => template.isPopular || template.isNew)
      .sort((a, b) => b.downloads - a.downloads)
      .slice(0, 6)
      .map(template => {
        const { files, ...templateWithoutFiles } = template;
        return templateWithoutFiles;
      });

    res.json({
      message: 'Featured templates retrieved successfully',
      data: featuredTemplates
    });
  } catch (error) {
    console.error('Get featured templates error:', error);
    res.status(500).json({
      error: 'Failed to retrieve featured templates',
      code: 'GET_FEATURED_TEMPLATES_ERROR'
    });
  }
});

// Track template usage (for analytics)
router.post('/:id/use', optionalAuth, (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;
    
    const template = templates.find(t => t.id === id);
    
    if (!template) {
      return res.status(404).json({
        error: 'Template not found',
        code: 'TEMPLATE_NOT_FOUND'
      });
    }

    // In a real implementation, you would track this in analytics
    console.log(`Template ${id} used by user ${userId || 'anonymous'}`);

    res.json({
      message: 'Template usage tracked successfully',
      data: {
        templateId: id,
        templateName: template.name,
        userId: userId || null,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Track template usage error:', error);
    res.status(500).json({
      error: 'Failed to track template usage',
      code: 'TRACK_USAGE_ERROR'
    });
  }
});

module.exports = router;
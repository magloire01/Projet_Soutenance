import React, { useState } from 'react';
import { Search, Filter, Grid, List } from 'lucide-react';
import TemplateCard from './TemplateCard';

const templates = [
  {
    id: '1',
    name: 'SaaS Landing Pro',
    category: 'saas',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.9,
    downloads: 15420,
    isPopular: true
  },
  {
    id: '2',
    name: 'E-commerce Modern',
    category: 'e-commerce',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    downloads: 12350,
    isNew: true
  },
  {
    id: '3',
    name: 'Portfolio Creative',
    category: 'portfolio',
    image: 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.7,
    downloads: 9800
  },
  {
    id: '4',
    name: 'Blog Magazine',
    category: 'blog',
    image: 'https://images.pexels.com/photos/357514/pexels-photo-357514.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.6,
    downloads: 8900,
    isPopular: true
  },
  {
    id: '5',
    name: 'Dashboard Analytics',
    category: 'dashboard',
    image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.9,
    downloads: 7650,
    isNew: true
  },
  {
    id: '6',
    name: 'Restaurant Menu',
    category: 'restaurant',
    image: 'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.5,
    downloads: 6200
  }
];

const categories = [
  { id: 'all', name: 'Tous', count: templates.length },
  { id: 'saas', name: 'SaaS', count: 1 },
  { id: 'e-commerce', name: 'E-commerce', count: 1 },
  { id: 'portfolio', name: 'Portfolio', count: 1 },
  { id: 'blog', name: 'Blog', count: 1 },
  { id: 'dashboard', name: 'Dashboard', count: 1 },
  { id: 'restaurant', name: 'Restaurant', count: 1 }
];

const TemplatesCatalog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-20 bg-gray-50" id="templates">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Modèles <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Prêts à l'emploi</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choisissez parmi notre collection de modèles professionnels et commencez votre projet en quelques clics.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="mb-12 space-y-6">
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Rechercher un modèle..."
            />
          </div>

          {/* Categories & View Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>

            {/* View Mode & Sort */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-white rounded-lg border border-gray-200 p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              <button className="flex items-center space-x-2 bg-white border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4 text-gray-500" />
                <span className="text-gray-700">Filtres</span>
              </button>
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {filteredTemplates.map(template => (
            <TemplateCard key={template.id} {...template} />
          ))}
        </div>

        {/* Load More */}
        {filteredTemplates.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-white border border-gray-200 text-gray-700 px-8 py-3 rounded-xl hover:bg-gray-50 transition-colors font-medium">
              Charger plus de modèles
            </button>
          </div>
        )}

        {/* No Results */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aucun modèle trouvé pour votre recherche.</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="text-blue-600 hover:text-blue-700 font-medium mt-2"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TemplatesCatalog;
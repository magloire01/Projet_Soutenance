import React, { useState } from 'react';
import { Menu, X, Code2, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">AIBuilder</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#accueil" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Accueil
            </a>
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                <span>Fonctionnalités</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2">
                  <a href="#editor" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Éditeur Drag & Drop</a>
                  <a href="#ai" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">IA Génératrice</a>
                  <a href="#templates" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Modèles</a>
                </div>
              )}
            </div>
            <a href="#tarifs" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Tarifs
            </a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Contact
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Connexion
            </button>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all">
              Créer mon projet
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white">
            <div className="py-4 space-y-4">
              <a href="#accueil" className="block text-gray-700 hover:text-blue-600 font-medium">
                Accueil
              </a>
              <a href="#fonctionnalites" className="block text-gray-700 hover:text-blue-600 font-medium">
                Fonctionnalités
              </a>
              <a href="#tarifs" className="block text-gray-700 hover:text-blue-600 font-medium">
                Tarifs
              </a>
              <a href="#contact" className="block text-gray-700 hover:text-blue-600 font-medium">
                Contact
              </a>
              <div className="pt-4 border-t border-gray-100 space-y-3">
                <button className="block w-full text-left text-gray-700 hover:text-blue-600 font-medium">
                  Connexion
                </button>
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium">
                  Créer mon projet
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
import React, { useState } from 'react';
import { Send, Sparkles, Zap, Code } from 'lucide-react';

const Hero = () => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      console.log('Generating app with prompt:', prompt);
      // TODO: Implement AI generation
    }
  };

  return (
    <section className="pt-24 pb-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            <span>Nouvelle génération d'IA</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Créez votre application en{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              quelques minutes
            </span>{' '}
            avec l'IA
          </h1>

          {/* Subheading */}
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Transformez vos idées en applications web complètes grâce à notre IA avancée. 
            Pas de code requis, juste votre imagination.
          </p>

          {/* AI Prompt Form */}
          <div className="max-w-2xl mx-auto mb-12">
            <form onSubmit={handleSubmit} className="relative">
              <div className="flex items-center bg-white border border-gray-200 rounded-2xl shadow-lg p-2 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Décrivez votre application : 'Un site e-commerce pour vendre des sneakers...'"
                  className="flex-1 px-4 py-4 text-gray-700 bg-transparent focus:outline-none placeholder-gray-400 text-lg"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-xl hover:shadow-lg transition-all group"
                >
                  <Send className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </form>
            <p className="text-sm text-gray-500 mt-3">
              ✨ L'IA génère votre application complète en 30 secondes
            </p>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md">
              <Zap className="w-4 h-4 text-blue-600" />
              <span className="text-gray-700 font-medium">Génération instantanée</span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md">
              <Code className="w-4 h-4 text-purple-600" />
              <span className="text-gray-700 font-medium">Code propre exportable</span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md">
              <Sparkles className="w-4 h-4 text-orange-600" />
              <span className="text-gray-700 font-medium">Drag & Drop intégré</span>
            </div>
          </div>

          {/* CTA Button */}
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition-all hover:scale-105">
            Commencer gratuitement
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
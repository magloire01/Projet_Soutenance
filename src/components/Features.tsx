import React from 'react';
import { Zap, Palette, Code2, Cloud, Shield, Smartphone } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Génération IA Instantanée',
    description: 'Transformez votre idée en application complète en quelques secondes grâce à notre IA avancée.'
  },
  {
    icon: Palette,
    title: 'Éditeur Drag & Drop',
    description: 'Personnalisez votre application visuellement avec notre éditeur intuitif sans écrire une ligne de code.'
  },
  {
    icon: Code2,
    title: 'Code Propre & Exportable',
    description: 'Récupérez le code source complet de votre application pour l\'héberger où vous voulez.'
  },
  {
    icon: Cloud,
    title: 'Hébergement Intégré',
    description: 'Déployez votre application instantanément sur notre infrastructure cloud sécurisée.'
  },
  {
    icon: Shield,
    title: 'Sécurité Enterprise',
    description: 'Vos données et applications sont protégées par des standards de sécurité de niveau entreprise.'
  },
  {
    icon: Smartphone,
    title: 'Responsive Design',
    description: 'Toutes les applications générées sont automatiquement optimisées pour mobile et desktop.'
  }
];

const Features = () => {
  return (
    <section className="py-20 bg-white" id="fonctionnalites">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Pourquoi choisir <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">AIBuilder</span> ?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Notre plateforme combine la puissance de l'intelligence artificielle avec la simplicité d'utilisation 
            pour créer des applications exceptionnelles.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Prêt à créer votre première application ?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Rejoignez plus de 10,000 créateurs qui utilisent AIBuilder pour concrétiser leurs idées.
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105">
              Commencer maintenant - C'est gratuit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
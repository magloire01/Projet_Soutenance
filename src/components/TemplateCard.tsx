import React from 'react';
import { Eye, Download, Star } from 'lucide-react';

interface TemplateCardProps {
  id: string;
  name: string;
  category: string;
  image: string;
  rating: number;
  downloads: number;
  isNew?: boolean;
  isPopular?: boolean;
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  name,
  category,
  image,
  rating,
  downloads,
  isNew,
  isPopular
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer hover:scale-105">
      {/* Image */}
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {isNew && (
            <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              Nouveau
            </span>
          )}
          {isPopular && (
            <span className="bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              Populaire
            </span>
          )}
        </div>

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
          <button className="bg-white text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Eye className="w-5 h-5" />
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors font-medium">
            Utiliser ce modèle
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{name}</h3>
            <p className="text-sm text-gray-500 capitalize">{category}</p>
          </div>
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span>{rating}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Download className="w-4 h-4" />
            <span>{downloads.toLocaleString()} téléchargements</span>
          </div>
          <button className="text-blue-600 hover:text-blue-700 font-medium">
            Aperçu →
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
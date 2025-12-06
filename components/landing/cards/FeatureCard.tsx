import React from 'react';
import { FeatureCardProps } from '../types';

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  imageSrc,
  visual,
  primaryButtonText,
  primaryDisabled,
  secondaryButtonText,
  primaryButtonAction,
  secondaryButtonIcon,
  tagLabel,
  tagIcon,
  accentColor
}) => {
  const accentClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-indigo-50 text-indigo-600'
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full group">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-2 rounded-lg ${accentClasses[accentColor]}`}>
          {icon}
        </div>
        <h3 className="font-bold text-lg text-gray-900">{title}</h3>
      </div>

      {/* Image/Visual Area */}
      <div className="relative mb-6 rounded-xl overflow-hidden bg-gray-50 aspect-[4/3] group-hover:scale-[1.02] transition-transform duration-500 border border-gray-100">
        {visual ? (
            <div className="w-full h-full">
                {visual}
            </div>
        ) : (
            imageSrc && (
                <img 
                src={imageSrc} 
                alt={title} 
                className="w-full h-full object-cover"
                />
            )
        )}
      </div>

      {/* Content */}
      <p className="text-gray-600 text-sm leading-relaxed mb-8 flex-grow">
        {description}
      </p>

      {/* Actions */}
      <div className="mt-auto space-y-4">
        <div className="flex items-center justify-between gap-3">
          <button 
            onClick={primaryButtonAction}
            disabled={primaryDisabled}
            className={`flex-1 bg-white border border-gray-200 text-gray-800 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm ${
              primaryDisabled
                ? 'opacity-60 cursor-not-allowed'
                : 'hover:bg-gray-50 hover:border-gray-300'
            }`}
          >
            {primaryButtonText}
          </button>
          
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${accentClasses[accentColor]}`}>
            {tagIcon}
            <span>{tagLabel}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
import { useState } from 'react';

const CustomizationPanel = ({ customization, onChange }) => {
  const fonts = [
    { name: 'Arial', display: 'Arial' },
    { name: 'Times New Roman', display: 'Times NR' },
    { name: 'Courier New', display: 'Courier' },
    { name: 'Georgia', display: 'Georgia' },
    { name: 'Verdana', display: 'Verdana' }
  ];

  const colors = [
    { value: '#000000', name: 'Black' },
    { value: '#FF0000', name: 'Red' },
    { value: '#00FF00', name: 'Green' },
    { value: '#0000FF', name: 'Blue' },
    { value: '#FFFF00', name: 'Yellow' },
    { value: '#FF00FF', name: 'Magenta' },
    { value: '#00FFFF', name: 'Cyan' }
  ];

  const handleChange = (field, value) => {
    onChange({
      ...customization,
      [field]: value
    });
  };

  return (
    <div className="space-y-6 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
      <div>
        <label htmlFor="custom-text" className="block text-sm font-medium text-gray-700 mb-1">
          Custom Text
        </label>
        <input
          type="text"
          id="custom-text"
          value={customization.text}
          onChange={(e) => handleChange('text', e.target.value)}
          placeholder="Enter your custom text"
          className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm px-4 py-2 border"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Font Style</label>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {fonts.map((font) => (
            <button
              key={font.name}
              type="button"
              onClick={() => handleChange('font', font.name)}
              className={`flex items-center justify-center p-2 rounded-lg transition-all duration-200 ${
                customization.font === font.name 
                  ? 'bg-indigo-100 border-indigo-500 text-indigo-700 border-2' 
                  : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
              }`}
              style={{ fontFamily: font.name }}
              title={font.name}
            >
              <span className="text-xs">{font.display}</span>
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Text Color</label>
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => (
            <button
              key={color.value}
              type="button"
              onClick={() => handleChange('color', color.value)}
              className={`relative w-8 h-8 rounded-full transition-transform duration-200 hover:scale-110 ${
                customization.color === color.value ? 'ring-2 ring-offset-2 ring-indigo-500' : ''
              }`}
              style={{ backgroundColor: color.value }}
              aria-label={color.name}
              title={color.name}
            >
              {customization.color === color.value && (
                <svg 
                  className="absolute inset-0 m-auto text-white" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>
      
      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Live Preview</h4>
        <div 
          className="p-6 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl text-center transition-all duration-300"
          style={{
            fontFamily: customization.font,
            color: customization.color,
            minHeight: '120px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {customization.text ? (
            <span className="text-2xl">{customization.text}</span>
          ) : (
            <span className="text-gray-400">Your design will appear here</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomizationPanel;
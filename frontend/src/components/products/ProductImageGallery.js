import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const ProductImageGallery = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [zoomActive, setZoomActive] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  // Sample images array - in a real app this would come from your product data
  const images = [
    product.imageUrl || 'https://via.placeholder.com/800x800',
    'https://via.placeholder.com/800x800/FF5733/FFFFFF',
    'https://via.placeholder.com/800x800/33FF57/FFFFFF',
    'https://via.placeholder.com/800x800/3357FF/FFFFFF'
  ];

  const handleMouseMove = (e) => {
    if (!zoomActive) return;
    
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Main Image with Zoom */}
      <div 
        className={`relative bg-gray-50 rounded-xl overflow-hidden shadow-md ${
          zoomActive ? 'cursor-zoom-out' : 'cursor-zoom-in'
        }`}
        onMouseEnter={() => setZoomActive(true)}
        onMouseLeave={() => setZoomActive(false)}
        onMouseMove={handleMouseMove}
        onClick={() => setZoomActive(!zoomActive)}
      >
        <img
          src={images[selectedImage]}
          alt={product.name}
          className={`w-full h-96 object-contain transition-transform duration-300 ${
            zoomActive ? 'scale-150' : 'scale-100'
          }`}
          style={{
            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
          }}
        />
        
        {/* Navigation Arrows */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevImage();
          }}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all duration-200 hover:scale-110"
          aria-label="Previous image"
        >
          <ChevronLeftIcon className="h-6 w-6 text-gray-800" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            nextImage();
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all duration-200 hover:scale-110"
          aria-label="Next image"
        >
          <ChevronRightIcon className="h-6 w-6 text-gray-800" />
        </button>
        
        {/* Image Counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/80 px-3 py-1 rounded-full text-sm font-medium text-gray-800 shadow-sm">
          {selectedImage + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Gallery */}
      <div className="flex justify-center mt-4 space-x-3">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
              selectedImage === index
                ? 'border-indigo-500 shadow-md scale-105'
                : 'border-transparent hover:border-gray-300'
            }`}
            aria-label={`View image ${index + 1}`}
          >
            <img
              src={img}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;
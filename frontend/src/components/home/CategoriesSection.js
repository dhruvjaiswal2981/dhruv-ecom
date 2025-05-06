import { Link } from 'react-router-dom';

const CategoriesSection = () => {
  const categories = [
    { 
      name: 'T-Shirts', 
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      description: 'Custom printed t-shirts in various styles and colors'
    },
    { 
      name: 'Mugs', 
      image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      description: 'Personalized mugs for your morning coffee or tea'
    },
    { 
      name: 'Posters', 
      image: 'https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      description: 'High-quality prints for your walls and spaces'
    },
    { 
      name: 'Phone Cases', 
      image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      description: 'Custom cases to protect and personalize your phone'
    },
    { 
      name: 'Notebooks', 
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      description: 'Personalized journals and notebooks'
    },
    { 
      name: 'Hoodies', 
      image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      description: 'Custom hoodies for comfort and style'
    },
    { 
      name: 'Tote Bags', 
      image: 'https://images.unsplash.com/photo-1566150902887-9679ecc155ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      description: 'Eco-friendly personalized tote bags'
    },
    { 
      name: 'Keychains', 
      image: 'https://images.unsplash.com/photo-1605731423661-26e4e6a3a979?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      description: 'Custom keychains for your everyday carry'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Shop by Category
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
            Discover our wide range of customizable products
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link 
              key={category.name} 
              to={`/products?category=${category.name}`}
              className="group relative block overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative h-64">
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold">{category.name}</h3>
                  <p className="mt-1 text-sm text-gray-300">{category.description}</p>
                </div>
              </div>
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-600 text-white">
                  Shop Now
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            View All Categories
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
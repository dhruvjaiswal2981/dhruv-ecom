const HeroSection = () => {
    return (
      <div className="relative bg-gray-900 overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover object-center"
            src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
            alt="Printing products on display"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-purple-900/80"></div>
        </div>
  
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 py-32 sm:px-6 lg:px-8 lg:py-48">
          <div className="text-center lg:text-left">
            {/* Main Heading */}
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
              <span className="block">Bring Your Designs</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">
                To Life
              </span>
            </h1>
            
            {/* Subheading */}
            <p className="mt-6 max-w-lg text-xl text-gray-100 sm:max-w-3xl">
              Premium quality custom printing with lightning-fast turnaround. 
              Perfect for businesses, events, or personal gifts.
            </p>
            
            {/* Stats/Features */}
            <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4 max-w-md mx-auto lg:mx-0 lg:max-w-none">
              {[
                { value: '24h', label: 'Express Delivery' },
                { value: '100%', label: 'Quality Guarantee' },
                { value: '50+', label: 'Product Types' },
                { value: '4.9★', label: 'Customer Rating' },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                  <p className="mt-1 text-sm font-medium text-amber-200">{stat.label}</p>
                </div>
              ))}
            </div>
            
            {/* CTA Buttons */}
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="/products"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 md:py-4 md:text-lg md:px-10 transition-all duration-300 transform hover:-translate-y-1"
              >
                Start Designing
                <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="/how-it-works"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-white/10 hover:bg-white/20 md:py-4 md:text-lg md:px-10 transition-all duration-300"
              >
                How It Works
              </a>
            </div>
          </div>
        </div>
  
        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-900 to-transparent"></div>
        <div className="absolute top-1/4 right-10 w-16 h-16 rounded-full bg-amber-400/20 filter blur-xl"></div>
        <div className="absolute bottom-1/3 left-20 w-24 h-24 rounded-full bg-purple-500/20 filter blur-xl"></div>
      </div>
    );
  };
  
  export default HeroSection;
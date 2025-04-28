const ProductCard = ({ product }) => {
    return (
      <div className="product-card">
        <img src={product.imageUrl || '/placeholder-image.jpg'} alt={product.name} />
        <h3>{product.name}</h3>
        <p>${product.price}</p>
        <p>{product.category}</p>
      </div>
    );
  };
  
  export default ProductCard;
  
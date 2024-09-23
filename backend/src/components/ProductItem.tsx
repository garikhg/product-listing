import React from 'react';

interface ProductItemProps {
  product: {
    id: number;
    title: string;
    description: string;
    thumbnail: string;
    price: number;
  };
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <div className="product-item">
      <img src={product.thumbnail} alt={product.title} />
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <p>${product.price}</p>
    </div>
  );
};

export default ProductItem;

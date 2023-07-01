import  React, { useEffect, useState } from 'react';
import { Card, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/cart/cartSlice';
import axios from 'axios';
const ProductList = () => {
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await axios.get('http://localhost:3000/dev/products');
          setProducts(response.data); 
        } catch (error) {
          console.error('Erro ao buscar produtos:', error);
        }
      };
  
      fetchProducts();
    }, []);

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
      dispatch(addItem(product));
  };

  return (
    <div>
      {products.map((product) => (
        <Card key={product.id}>
          <h3>{product.name}</h3>
          <p>Price: ${product.price}</p>
          <Button onClick={() => handleAddToCart(product)}>Add to Cart</Button>
        </Card>
      ))}
    </div>
  );
};

export default ProductList;

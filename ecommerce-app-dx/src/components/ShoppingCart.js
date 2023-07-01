import React,{useEffect,useState,dispatch} from 'react';
import { Card, Button } from 'antd';
import { removeItem } from '../features/cart/cartSlice';
import axios from 'axios';
import { useDispatch } from 'react-redux';

const ShoppingCart = () => {
    
    const [cartItems, setCartItems] = useState([]);
  
    useEffect(() => {
      const fetchCartItems = async () => {
         try {
            const response = await axios.get(`http://localhost:3000/dev/cart?client=${localStorage.getItem("user")}`);
            setCartItems(response.data);
          } catch (error) {
            console.error('Erro ao buscar os itens do carrinho:', error);
            throw error;
          }
      };
      fetchCartItems();
    }, []);

    const dispatch = useDispatch();

    const handleRemoveFromCart = (itemId) => {
      dispatch(removeItem(itemId));
      setCartItems(state.cart)
    };
    
   if (cartItems.length === 0) {
        // Caso o carrinho esteja vazio
        return (
          <Card>
            <p>Nenhum item no carrinho.</p>
          </Card>
        );
    }

  return (
    <div>
      {cartItems.map((item) => (
        <Card key={item._id}>
          <h3>{item.name}</h3>
          <p>Price: ${item.price}</p>
          <Button onClick={() => handleRemoveFromCart(item._id)}>Remove</Button>
        </Card>
      ))}
    </div>
  );
};

export default ShoppingCart;


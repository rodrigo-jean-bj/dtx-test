import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';



const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addItem: async (state, action) => {
      try {
        const payload = {
           "client": localStorage.getItem("user"),
           "product" : action.payload._id,
           "name": action.payload.name,
           "price": action.payload.price
        }
        const response = await axios.post('http://localhost:3000/dev/cart', payload);
        state.push(response.data); 
      } catch (error) {
        console.error('Erro ao adicionar item ao carrinho:', error);
      }
    },
    removeItem: async (state, action) => {
      try {
        const itemId = action.payload;
        await axios.delete(`http://localhost:3000/dev/cart?id=${itemId}`);
        const index = state.findIndex(item => item._id === itemId);
        if (index !== -1) {
          state.splice(index, 1); 
        }
      } catch (error) {
        console.error('Erro ao remover item do carrinho:', error);
      }
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;

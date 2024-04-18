// src/store/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
    productId: number;
    name: string;
    quantity: number;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<CartItem>) {
            state.items.push(action.payload);
        },
        removeFromCart(state, action: PayloadAction<number>) {
            state.items = state.items.filter(item => item.productId !== action.payload);
        },
        updateQuantity(state, action: PayloadAction<{ productId: number; quantity: number }>) {
            const item = state.items.find(item => item.productId === action.payload.productId);
            if (item) {
                item.quantity = action.payload.quantity;
            }
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;

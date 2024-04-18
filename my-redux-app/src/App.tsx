// src/App.tsx
import { useAppDispatch, useAppSelector } from './hooks'
import { addToCart, removeFromCart} from './store/cartSlice'

function App() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(state => state.cart.items);

  const handleAddToCart = () => {
    // Adding an item with a hardcoded ID and quantity
    dispatch(addToCart({ productId: 1, name: "Apple", quantity: 1 }));
  };

  const handleRemoveFromCart = (productId: number) => {
    // Remove item by productId
    dispatch(removeFromCart(productId));
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      <button onClick={handleAddToCart}>Add Apple to Cart</button>
      <ul>
        {items.map(item => (
          <li key={item.productId}>
            {item.name} - Quantity: {item.quantity}
            {/* Adding a button to remove this item from the cart */}
            <button onClick={() => handleRemoveFromCart(item.productId)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

import { useState, useMemo, useCallback } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
}

const productList: Product[] = [
  { id: 1, name: "Apple", price: 20 },
  { id: 2, name: "Banana", price: 10 },
  { id: 3, name: "Orange", price: 15 }
];

function Cart() {
  // cart structure: { productId: quantity }
  const [cart, setCart] = useState<{ [key: number]: number }>({});

  const handleAdd = useCallback((id: number) => {
    setCart(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  }, []);

  const handleSubtract = useCallback((id: number) => {
    setCart(prev => {
      if (!prev[id]) return prev;

      const updatedCart = { ...prev };
      updatedCart[id] -= 1;

      if (updatedCart[id] === 0) {
        delete updatedCart[id];
      }

      return updatedCart;
    });
  }, []);

  const totalQuantity = useMemo(() => {
    return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  }, [cart]);

  const totalAmount = useMemo(() => {
    return productList.reduce((sum, product) => {
      const qty = cart[product.id] || 0;
      return sum + qty * product.price;
    }, 0);
  }, [cart]);

  return (
    <div>
      <h2>Products</h2>

      <ul>
        {productList.map(product => {
          const quantity = cart[product.id] || 0;

          return (
            <li key={product.id}>
              {product.name} - ₹{product.price}
              <div>
                <button onClick={() => handleSubtract(product.id)} disabled={quantity === 0}>
                  -
                </button>

                <input
                  type="number"
                  value={quantity}
                  readOnly
                />

                <button onClick={() => handleAdd(product.id)}>
                  +
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <hr />

      <h2>Cart Summary</h2>
      <p>Total Items: {totalQuantity}</p>
      <p>Total Amount: ₹{totalAmount}</p>

      <button onClick={() => setCart({})} disabled={totalQuantity === 0}>
        Clear Cart
      </button>
    </div>
  );
}

export default Cart;

import { createContext, useState } from "react";

export interface CartItem {
    id: string;
    name: string;
    price: number;
    // ... other properties
}

interface CartContextType {
  cart: CartItem[] | undefined; // Or your CartItem[] type
  updateCart: (params: { item: any; action: string }) => void;
}

const initState: CartContextType = {
    cart: [],
    updateCart: (params:any)=>{return params}
}

const CartContext = createContext(initState)

const CartProvider = ({children}:any) =>{
    const [cart, setCart] = useState<CartItem[] | undefined>([]);

    const updateCart = (params: { item: any; action: string }) =>{
        console.log(cart)
        setCart((prev:any[] | undefined) => {

            if(params.action == 'add'){
                if (!prev) return [{...params.item}]
                return [
                    ...prev,
                    {...params.item}
                ]
            }
            return prev
            
        })
    }
    return (
        <CartContext.Provider value={{ cart, updateCart }}>
            {children}
        </CartContext.Provider>
    );
}

export {CartContext, CartProvider}

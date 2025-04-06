import { createContext } from 'react';
import { CartContextType } from '@/lib/cart-types';

export const CartContext = createContext<CartContextType | undefined>(undefined);

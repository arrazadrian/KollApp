import { configureStore } from '@reduxjs/toolkit';
import keranjangReducer from './src/features/keranjangSlice';
import kategoriReducer from './src/features/kategoriSlice';
import pelangganReducer from './src/features/pelangganSlice';
import posisiReducer from './src/features/posisiSlice';


export const store = configureStore({
  reducer: {
    keranjang: keranjangReducer,
    kategori: kategoriReducer,
    pelanggan: pelangganReducer,
    posisi:posisiReducer,
  },
});
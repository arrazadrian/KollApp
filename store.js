import { configureStore } from '@reduxjs/toolkit';
import keranjangReducer from './src/features/keranjangSlice';
import kategoriReducer from './src/features/kategoriSlice';
import pelangganReducer from './src/features/pelangganSlice';
import posisiReducer from './src/features/posisiSlice';
import bobotReducer from './src/features/bobotSlice';

export const store = configureStore({
  reducer: {
    keranjang: keranjangReducer,
    kategori: kategoriReducer,
    pelanggan: pelangganReducer,
    posisi:posisiReducer,
    bobot:bobotReducer,
  },
});
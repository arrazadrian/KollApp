import { createSlice } from '@reduxjs/toolkit'

const bobotSlice = createSlice({
    name: "bobot",
    initialState:{
        hargalayanan: null,
    },
    reducers:{
        updateBobot: (state, action) => {
            state.hargalayanan = action.payload.hargalayanan;
        },
        resetBobot: (state) => {
            state.hargalayanan = null;
        }
    }
});

export const { updateBobot, resetBobot } = bobotSlice.actions;
export default bobotSlice.reducer; 
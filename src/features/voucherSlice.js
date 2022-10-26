import { createSlice } from '@reduxjs/toolkit'

const voucherSlice = createSlice({
    name: "voucher",
    initialState:{
        potongan: null,
    },
    reducers:{
        updateVoucher: (state, action) => {
            state.potongan = action.payload.potongan;
        },
        resetVoucher: (state) => {
            state.potongan = null;
        }
    }
});

export const { updateVoucher, resetVoucher } = voucherSlice.actions;
export default voucherSlice.reducer; 
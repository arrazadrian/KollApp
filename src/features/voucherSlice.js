import { createSlice } from '@reduxjs/toolkit'

const voucherSlice = createSlice({
    name: "voucher",
    initialState:{
        potongan: 0,
    },
    reducers:{
        updateVoucher: (state, action) => {
            state.potongan = action.payload.potongan;
        },
        resetVoucher: (state) => {
            state.potongan = 0;
        }
    }
});

export const { updateVoucher, resetVoucher } = voucherSlice.actions;
export default voucherSlice.reducer; 
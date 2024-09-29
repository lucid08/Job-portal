import { createSlice } from "@reduxjs/toolkit";


const applicationSlice = createSlice({
    name: "application",
    initialState: {
        applicants: [],
        singleApplication: null,
    },
    reducers: {
        setApplicants: (state, action) => {
            state.applicants = action.payload;
        },
        setSingleApplication: (state, action) => {
            state.singleApplication = action.payload;
        }
    }
})

export const { setApplicants, setSingleApplication } = applicationSlice.actions;

export default applicationSlice.reducer;
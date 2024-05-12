import { createSlice } from "@reduxjs/toolkit";

const planSlice = createSlice({
    name: 'plan',
    initialState: {
        plans: [
            {
                "planId": 0, "planName": "Tata Ace", "planDescription": "Some Description", "planPrice": 499, "imagePath": "/tata-ace.png"
            }
        ]
    },
    reducers: {
        getPlans: (state, action) => {
            state.plans.push(...action.payload)
        }
    }
});

export const { getPlans } = planSlice.actions;
export const selectPlan = (state) => {
    if(state && state.plan && state.plan.plans) return state.plan.plans;
    else return {}
}
export default planSlice.reducer;
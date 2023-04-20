import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
name: "theme",
initialState:{
    isDarkMode: localStorage.getItem('theme') === 'true' || false,
},
reducers:{
    toggleTheme: (state) => {
        state.isDarkMode = !state.isDarkMode;
        localStorage.setItem('theme', JSON.stringify(state));
    },
},
}
)
  
export const { toggleTheme } = themeSlice.actions;
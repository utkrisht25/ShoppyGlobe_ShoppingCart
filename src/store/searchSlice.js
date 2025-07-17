import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchTerm: '',
  filteredProducts: [],
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setFilteredProducts: (state, action) => {
      state.filteredProducts = action.payload;
    },
  },
});

export const { setSearchTerm, setFilteredProducts } = searchSlice.actions;

export const selectSearchTerm = (state) => state.search.searchTerm;
export const selectFilteredProducts = (state) => state.search.filteredProducts;

export default searchSlice.reducer; 
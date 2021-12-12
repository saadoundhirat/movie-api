import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const loadingEnum = {
    pending: 'pending',
    fulfilled: 'fulfilled',
    rejected: 'rejected',
};


const initialState = {
    movies: {},
    loading: false,
    error: null,
};

export const fetchMovie = createAsyncThunk(
    'movie/fetchMovie',
    async ({searchText, page}, {dispatch, getState} ) => {
        try {
            console.log("page number passed to the slice",page);
            console.log("searchText passed to the slice",searchText);
            const {data} = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${searchText}&page=${page}`);
            return data;
        }catch (error){
            console.log(error);
        }
    }
);


const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchMovie.pending]: (state, action) => {
            state.loading = loadingEnum.pending;
            state.movies = {};
            state.error = null;
        }, 
        [fetchMovie.fulfilled]: (state, action) => {
            state.loading = loadingEnum.fulfilled;
            state.movies = action.payload;
            state.error = null;
        },
        [fetchMovie.rejected]: (state, {error}) => {
            state.loading = loadingEnum.rejected;
            state.movies = {};
            state.error = error.massage;
        }
    }
});


export default movieSlice.reducer;
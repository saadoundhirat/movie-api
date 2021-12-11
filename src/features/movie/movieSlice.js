import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
    movies: [],
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
            state.loading = true;
        }, 
        [fetchMovie.fulfilled]: (state, action) => {
            state.loading = false;
            state.movies = action.payload;
        },
        [fetchMovie.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        }
    }
});


export default movieSlice.reducer;
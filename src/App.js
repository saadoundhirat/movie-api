import React, { useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { fetchMovie } from "./features/movie/movieSlice";
import { Container, Button, TextField } from "@mui/material";
import { Movie } from "./features/movie/Movie";

function App() {
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();

  const getSearchText = (e) => {
    const searchTxt = e.target.value;
    setSearchText(searchTxt);
  };
  const handleSearch = () => {
    console.log("searching");
    dispatch(fetchMovie({ searchText, page: 1}));
  };

  return (
    <Container className="main-container" maxWidth="xl">
      <div className="search-bar">
        <TextField
          className="search-bar-input"
          id="movie-name"
          label="movie name"
          color="primary"
          variant="outlined"
          onChange={(e) => getSearchText(e)}
        />
        <Button
          className="search-bar-button"
          variant="outlined"
          color="primary"
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>
      <div className="table-container">
        <Movie searchText={searchText}/>
      </div>
    </Container>
  );
}

export default App;

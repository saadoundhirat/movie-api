import React from "react";
import { useSelector } from "react-redux";
import { Backdrop } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { ContentTable } from "./ContentTable";

export const Movie = ({ searchText }) => {
  const movieState = useSelector((state) => state.movie);
  return (
    <div>
      {movieState.loading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      {movieState.movies.results?.length > 0 && (
        <ContentTable searchText={searchText} />
      )}
      {movieState.error && <div>{movieState.error}</div>}
    </div>
  );
};

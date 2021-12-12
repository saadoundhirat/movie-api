import React from "react";
import { useSelector } from "react-redux";
import { Backdrop } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { ContentTable } from "./ContentTable";
import { loadingEnum } from "./movieSlice";
export const Movie = ({ searchText }) => {
  const movie = useSelector((state) => state.movie);
  return (
    <div>
      {movie.loading === loadingEnum.pending && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}

      {movie.loading === loadingEnum.rejected && <div>{movie.error}</div>}

      {movie.loading === loadingEnum.fulfilled && (
        <ContentTable searchText={searchText} />
      )}
    </div>
  );
};

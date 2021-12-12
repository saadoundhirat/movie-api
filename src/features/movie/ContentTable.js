import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovie } from "./movieSlice";

export const ContentTable = ({ searchText }) => {
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.movie);
  console.log("---------the movie state is", movie);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);


  //! here is my problem with the pagination 
  //! I can't set the page to the next page when I click on the next button that provided with the table pagination 
  
  const handleChangePage = async (event, newPage) => {
    console.log("_____newPAGE______", newPage);
    await setPage((prevPage) => prevPage + Number(newPage + 1));
    dispatch(fetchMovie({ searchText, page: page }));
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 20));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="right">original_title</TableCell>
            <TableCell align="right">original_language</TableCell>
            <TableCell align="right">release_date</TableCell>
            <TableCell align="right">vote_average</TableCell>
            <TableCell align="right">vote_count</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {movie.movies.results?.map((movie) => (
            <TableRow
              key={movie.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {movie.id}
              </TableCell>
              <TableCell align="right">{movie.original_title}</TableCell>
              <TableCell align="right">{movie.original_language}</TableCell>
              <TableCell align="right">{movie.release_date}</TableCell>
              <TableCell align="right">{movie.vote_average}</TableCell>
              <TableCell align="right">{movie.vote_count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[20]}
        component="div"
        count={movie.movies?.total_results}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

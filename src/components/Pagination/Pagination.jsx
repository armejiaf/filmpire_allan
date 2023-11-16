import React from 'react';
import { Typography, Button } from '@mui/material';

import useStyles from './styles';

const Pagination = ({ currentPage, totalPages, setPage }) => {
  const styles = useStyles();

  if (!totalPages || totalPages === 0) return null;

  const handlePrev = () => {
    if (currentPage !== 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };
  const handleNext = () => {
    if (currentPage !== totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className={styles.container}>
      <Button onClick={handlePrev} className={styles.button} variant="contained" color="primary" type="button">Prev</Button>
      <Typography variant="h4" className={styles.pageNumber}>{currentPage}</Typography>
      <Button onClick={handleNext} className={styles.button} variant="contained" color="primary" type="button">Next</Button>
    </div>
  );
};

export default Pagination;

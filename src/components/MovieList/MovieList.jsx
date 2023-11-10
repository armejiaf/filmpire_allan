import React from 'react';
import { Grid } from '@mui/material';

import useStyles from './styles';
import { Movie } from '..';

const MovieList = ({ movies }) => {
  const styles = useStyles();

  return (
    <Grid container className={styles.moviesContainer}>
      {
        movies.results.map((movie, index) => (
          <Movie key={index} movie={movie} index={index} />
        ))
      }
    </Grid>
  );
};

export default MovieList;

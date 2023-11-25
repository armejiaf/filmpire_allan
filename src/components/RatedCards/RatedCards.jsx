import React from 'react';
import { Typography, Box } from '@mui/material';

import { Movie } from '..';
import useStyles from './styles';

const RatedCards = ({ title, data }) => {
  const styles = useStyles();
  return (
    <Box>
      <Typography variant="h5" gutterBottom>{title}</Typography>
      <Box display="flex" flexWrap="wrap" className={styles.container}>
        {data?.results?.map((movie, i) => (
          <Movie key={movie.id} movie={movie} index={i} />
        ))}
      </Box>
    </Box>
  );
};

export default RatedCards;

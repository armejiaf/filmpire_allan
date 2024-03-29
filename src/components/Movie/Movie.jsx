import React from 'react';
import { Typography, Grid, Grow, Tooltip, Rating } from '@mui/material';
import { Link } from 'react-router-dom';

import useStyles from './styles';

const Movie = ({ movie, index }) => {
  const styles = useStyles();

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={styles.movie}>
      <Grow in key={index} timeout={(index + 1) * 250}>
        <Link className={styles.links} to={`/movie/${movie.id}`}>
          <img
            alt={movie.title}
            className={styles.image}
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : 'https://serviscommerce.me/files/images/no.png'}
          />
          <Typography className={styles.title} variant="h5">{movie.title}</Typography>
          <Tooltip disableTouchListener title={`${movie.vote_average.toPrecision(2)} / 10`}>
            <div>
              <Rating readOnly value={movie.vote_average / 2} precision={0.1} />
            </div>
          </Tooltip>
        </Link>
      </Grow>
    </Grid>
  );
};

export default Movie;

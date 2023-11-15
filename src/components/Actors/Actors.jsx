import React, { useState } from 'react';
import { Typography, Button, ButtonGroup, Grid, Box, CircularProgress, useMediaQuery, Rating } from '@mui/material';
import { Portrait, ArrowBack } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useGetActorQuery } from '../../services/TMDB';
import { MovieList } from '..';
import useStyles from './styles';

const Actors = () => {
  const styles = useStyles();
  const { id } = useParams();
  const { data, isFetching, error } = useGetActorQuery(id);

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignContent="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }
  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignContent="center">
        <Link to="/">Something has gone wrong - Go back</Link>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      <Grid item lg={5} xl={4}>
        <img
          className={styles.image}
          src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`}
          alt={data?.name}
        />
      </Grid>
      <Grid item lg={7} xl={8} className={styles.actorInfo}>
        <Typography variant="h2" gutterBottom>
          {data?.name}
        </Typography>
        <Typography variant="h5" gutterBottom>
          Born: {data?.birthday ? new Date(`${data?.birthday}`).toDateString() : 'N/A'}
        </Typography>
        <Typography variant="body1" align="justify" paragraph>
          {data?.biography || 'Sorry, no biography yet...'}
        </Typography>
        <Box marginTop="2rem" display="flex" justifyContent="space-around">
          <Button variant="contained" color="primary" target="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/name/${data?.imdb_id}`} startIcon={<Portrait />}>Imdb</Button>
          <Button startIcon={<ArrowBack />} color="primary">
            <Typography style={{ textDecoration: 'none' }} component={Link} to="/" color="inherit" variant="subtitle2">
              Back
            </Typography>
          </Button>
        </Box>
      </Grid>
      <Box margin="2rem 0">
        <Typography variant="h2" gutterBottom align="center">
          Appearances
        </Typography>
        {
        data?.movie_credits?.cast
          ? <MovieList movies={{ results: data?.movie_credits?.cast }} numberOfMovies={12} />
          : <Box>Sorry nothing was found.</Box>
      }
      </Box>
    </Grid>
  );
};

export default Actors;

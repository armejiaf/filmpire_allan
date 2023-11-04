import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, useMediaQuery, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { useGetPopularMoviesQuery } from '../../services/TMDB';

const Movies = () => {
  const { data } = useGetPopularMoviesQuery();

  console.log(data);

  return (
    <div>
      Movies
    </div>
  );
};

export default Movies;

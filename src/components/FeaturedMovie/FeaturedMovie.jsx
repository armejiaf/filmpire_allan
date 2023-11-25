import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';

import useStyles from './styles';

const FeaturedMovie = ({ movie }) => {
  const styles = useStyles();

  if (!movie) return null;

  return (
    <Box style={{ textDecoration: 'none' }} component={Link} to={`/movie/${movie?.id}`} className={styles.featuredCardContainer}>
      <Card className={styles.card} classes={{ root: styles.cardRoot }}>
        <CardMedia
          media="picture"
          alt={movie?.title}
          image={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          title={movie?.title}
          className={styles.cardMedia}
        />
        <Box padding="20px">
          <CardContent className={styles.cardContent} classes={{ root: styles.cardContentRoot }}>
            <Typography variant="h5" gutterBottom>{movie?.title}</Typography>
            <Typography variant="body2" gutterBottom>{movie?.overview}</Typography>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
};

export default FeaturedMovie;

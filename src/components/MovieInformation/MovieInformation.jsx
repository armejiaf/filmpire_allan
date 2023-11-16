import React, { useEffect, useState } from 'react';
import { Modal, Typography, Tooltip, Button, ButtonGroup, Grid, Box, CircularProgress, useMediaQuery, Rating } from '@mui/material';
import { Movie as MovieIcon, Theatres, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArrowBack, Lan, Theaters, FavoriteBorder } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TagGroup, Tag } from 'rsuite';

import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import { useGetMovieQuery, useGetRecommendationsQuery, useGetListQuery } from '../../services/TMDB';
import { userSelector } from '../../features/auth';
import { moviesApi } from '../../utils';
import { MovieList } from '..';
import genreIcons from '../../assets/genres';
import useStyles from './styles';

const MovieInformation = () => {
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const styles = useStyles();
  const { id } = useParams();

  const { data, isFetching, error } = useGetMovieQuery(id);
  const { data: favoriteMovies } = useGetListQuery({ listName: 'favorite/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 });
  const { data: watchlistMovies } = useGetListQuery({ listName: 'watchlist/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 });
  const { data: recommendations, isFetching: isRecommendationsFetching } = useGetRecommendationsQuery({ list: 'recommendations', movie_id: id });

  const [open, setOpen] = useState(false);
  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false);

  useEffect(() => {
    setIsMovieFavorited(!!favoriteMovies?.results?.find((movie) => movie?.id === data?.id));
  }, [favoriteMovies, data]);

  useEffect(() => {
    setIsMovieWatchlisted(!!watchlistMovies?.results?.find((movie) => movie?.id === data?.id));
  }, [watchlistMovies, data]);

  const addToFavorites = async () => {
    await moviesApi.post(`/account/${user.id}/favorite?session_id=${localStorage.getItem('session_id')}`, {
      media_type: 'movie',
      media_id: id,
      favorite: !isMovieFavorited,
    });

    setIsMovieFavorited((prev) => !prev);
  };

  const addToWatchlist = async () => {
    await moviesApi.post(`/account/${user.id}/watchlist?session_id=${localStorage.getItem('session_id')}`, {
      media_type: 'movie',
      media_id: id,
      watchlist: !isMovieWatchlisted,
    });

    setIsMovieWatchlisted((prev) => !prev);
  };

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
    <Grid container className={styles.containerSpaceAround}>
      <Grid item sm={12} lg={4}>
        <img
          className={styles.poster}
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          alt={data?.title}
        />
      </Grid>
      <Grid item container direction="column" lg={7}>
        <Typography variant="h3" align="center" gutterBottom>
          {data?.title} ({data.release_date.split('-')[0]})
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          {data?.tagline}
        </Typography>
        <Grid item className={styles.containerSpaceAround} style={{ flexDirection: 'row' }}>
          <Box display="flex" align="center">
            <Rating readOnly value={data.vote_average / 2} precision={0.1} />
            <Typography variant="subtitle1" gutterBottom style={{ marginLeft: '10px' }}>
              {data?.vote_average.toPrecision(2)} / 10
            </Typography>
          </Box>
          <Typography variant="h6" align="center" flexWrap="wrap" gutterBottom>
            {data?.runtime} minutes
          </Typography>
        </Grid>
        <Grid item className={styles.genresContainer}>
          {data?.genres?.map((genre) => (
            <Link
              key={genre.name}
              className={styles.links}
              to="/"
              onClick={() => dispatch(selectGenreOrCategory(genre.id))}
            >
              <img src={genreIcons[genre.name.toLowerCase()]} className={styles.genreImage} height={30} />
              <Typography color="textPrimary" variant="subtitle1">
                {genre?.name}
              </Typography>
            </Link>
          ))}
        </Grid>
        <Typography variant="h5" gutterBottom style={{ marginTop: '10px' }}>
          Overview
        </Typography>
        <Typography style={{ marginBottom: '2rem' }}>
          {data?.overview}
        </Typography>
        <Typography variant="h5" gutterBottom style={{ marginTop: '10px' }}>
          Spoken Languages
        </Typography>
        {data?.spoken_languages.length > 0
          ? (
            <TagGroup className={styles.tagGroup}>
              {data?.spoken_languages.map((language) => (
                <Tooltip key={language.english_name} disableTouchListener title={language.english_name} placement="top">
                  <div>
                    <Tag size="lg" className={styles.tag}>{language.iso_639_1}</Tag>
                  </div>
                </Tooltip>
              ))}
            </TagGroup>
          ) : '' }
        <Typography variant="h5" gutterBottom style={{ marginTop: '10px' }}>
          Top Cast
        </Typography>
        <Grid item container spacing={2}>
          {data && data?.credits?.cast?.map((character, i) => (
            character.profile_path && (
              <Grid key={i} item xs={4} md={2} component={Link} to={`/actors/${character.id}`} style={{ textDecoration: 'none' }}>
                <img className={styles.castImage} src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`} alt={character.name} />
                <Typography color="textPrimary">{character?.name}</Typography>
                <Typography color="textSecondary">{character?.character.split('/')[0]}</Typography>
              </Grid>
            )
          )).slice(0, 6)}
        </Grid>
        <Grid item container style={{ marginTop: '2rem' }}>
          <div className={styles.buttonsContainer}>
            <Grid item xs={12} sm={6} className={styles.buttonsContainer}>
              <ButtonGroup size="medium" variant="outlined" style={{ width: '100%' }}>
                <Button target="_blank" rel="noopener noreferrer" href={data?.homepage} endIcon={<Language />}>Website</Button>
                <Button target="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/title/${data?.imdb_id}`} endIcon={<MovieIcon />}>Imdb</Button>
                <Button onClick={() => setOpen(true)} href="#" endIcon={<Theaters />}>Trailer</Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={12} sm={6} className={styles.buttonsContainer}>
              <ButtonGroup size="medium" variant="outlined" style={{ width: '100%' }}>
                <Button onClick={addToFavorites} endIcon={isMovieFavorited ? <Favorite /> : <FavoriteBorderOutlined />}>
                  Favorite
                </Button>
                <Button onClick={addToWatchlist} endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}>
                  Watchlist
                </Button>
                <Button sx={{ borderColor: 'primary.main' }} endIcon={<ArrowBack />}>
                  <Typography style={{ textDecoration: 'none' }} component={Link} to="/" color="inherit" variant="subtitle2">
                    Back
                  </Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <Box marginTop="5rem" width="100%">
        <Typography variant="h3" gutterBottom align="center">
          You might also like
        </Typography>
        {
          recommendations
            ? <MovieList movies={recommendations} numberOfMovies={12} />
            : <Box>Sorry nothing was found.</Box>
        }
      </Box>
      <Modal
        closeAfterTransition
        className={styles.modal}
        open={open}
        onClose={() => setOpen(false)}
      >
        {data?.videos?.results?.length > 0 && (
          <iframe
            autoPlay
            className={styles.video}
            title="Trailer"
            src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
            allow="autoplay"
          />
        )}
      </Modal>
    </Grid>
  );
};

export default MovieInformation;

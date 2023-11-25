import React, { useState, useMemo, useCallback } from 'react';
import { Modal, Typography, Tooltip, Button, ButtonGroup, Grid, Box, CircularProgress, Rating } from '@mui/material';
import { Movie as MovieIcon, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArrowBack, Theaters } from '@mui/icons-material';
import { Link, useParams, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const { id } = useParams();
  const storedSessionId = localStorage.getItem('session_id');
  const hasSessionId = !!storedSessionId;

  const { data, isFetching, error } = useGetMovieQuery(id);
  const { data: favoriteMovies, refetch: refetchFavorites } = hasSessionId ? useGetListQuery({ listName: 'favorite/movies', accountId: user.id, sessionId: storedSessionId, page: 1 }) : {};
  const { data: watchlistMovies, refetch: refecthWatchlisted } = hasSessionId ? useGetListQuery({ listName: 'watchlist/movies', accountId: user.id, sessionId: storedSessionId, page: 1 }) : {};
  const { data: recommendations, isFetching: isRecommendationsFetching } = useGetRecommendationsQuery({ list: 'recommendations', movie_id: id });

  const [open, setOpen] = useState(false);

  const closeModal = useCallback(() => setOpen(false), [setOpen]);

  const isMovieFavorited = useMemo(() => !!favoriteMovies?.results?.find((movie) => movie?.id === data?.id), [favoriteMovies, data]);
  const isMovieWatchlisted = useMemo(() => !!watchlistMovies?.results?.find((movie) => movie?.id === data?.id), [watchlistMovies, data]);

  const addToFavorites = async () => {
    await moviesApi.post(`/account/${user.id}/favorite?session_id=${storedSessionId}`, {
      media_type: 'movie',
      media_id: id,
      favorite: !isMovieFavorited,
    }).then(refetchFavorites);
  };

  const addToWatchlist = async () => {
    await moviesApi.post(`/account/${user.id}/watchlist?session_id=${storedSessionId}`, {
      media_type: 'movie',
      media_id: id,
      watchlist: !isMovieWatchlisted,
    }).then(refecthWatchlisted);
  };

  if (isFetching || isRecommendationsFetching) {
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
          src={data?.poster_path ? `https://image.tmdb.org/t/p/w500/${data?.poster_path}` : 'https://serviscommerce.me/files/images/no.png'}
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
          {data && data?.genres?.length
            ? data?.genres?.map((genre) => (
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
            ))
            : <Box className={styles.emptyResults}>Sorry, there are no genres found for this movie.</Box>}
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
          ) : <Box className={styles.emptyResults}>Sorry, there are no spoken_languages found for this movie.</Box>}
        <Typography variant="h5" gutterBottom style={{ marginTop: '10px' }}>
          Top Cast
        </Typography>
        {data && data?.credits?.cast?.length
          ? (
            <Grid item container spacing={2}>

              {data?.credits?.cast?.map((character, i) => (
                character.profile_path && (
                <Grid key={i} item xs={4} md={2} component={Link} to={`/actors/${character.id}`} style={{ textDecoration: 'none' }}>
                  <img className={styles.castImage} src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`} alt={character.name} />
                  <Typography color="textPrimary">{character?.name}</Typography>
                  <Typography color="textSecondary">{character?.character.split('/')[0]}</Typography>
                </Grid>
                )
              )).slice(0, 6)}

            </Grid>
          )
          : <Box className={styles.emptyResults}>Sorry, there is no cast found for this movie.</Box>}
        <Grid item container style={{ marginTop: '2rem' }}>
          <div className={styles.buttonsContainer}>
            <Grid item xs={12} sm={6} className={styles.buttonsContainer}>
              <ButtonGroup size="medium" variant="outlined" style={{ width: '100%' }}>
                <Button target="_blank" rel="noopener noreferrer" href={data?.homepage} startIcon={<Language />}>Website</Button>
                <Button target="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/title/${data?.imdb_id}`} startIcon={<MovieIcon />}>Imdb</Button>
                <Button onClick={() => setOpen(true)} href="#" startIcon={<Theaters />}>Trailer</Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={12} sm={6} className={styles.buttonsContainer}>
              <ButtonGroup size="medium" variant="outlined" style={{ width: '100%' }}>
                <Button disabled={!hasSessionId} onClick={addToFavorites} startIcon={isMovieFavorited ? <Favorite /> : <FavoriteBorderOutlined />}>
                  Favorite
                </Button>
                <Button disabled={!hasSessionId} onClick={addToWatchlist} startIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}>
                  Watchlist
                </Button>
                <Button sx={{ borderColor: 'primary.main' }} startIcon={<ArrowBack />} onClick={() => navigate(-1)}>
                  <Typography style={{ textDecoration: 'none' }} color="inherit" variant="subtitle2">
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
          recommendations?.results && recommendations?.results.length > 0
            ? <MovieList movies={recommendations} numberOfMovies={12} />
            : <Box className={styles.emptyResults}>Sorry, there are no recommendations found for this movie.</Box>
        }
      </Box>
      <Modal
        closeAfterTransition
        className={styles.modal}
        open={open}
        onClose={closeModal}
      >
        {data && data?.videos?.results?.length > 0 ? (
          <iframe
            autoPlay
            className={styles.video}
            title="Trailer"
            src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
            allow="autoplay"
          />
        )
          : <Box className={styles.emptyResultsModal}>Sorry, there is no trailer for this movie.</Box>}
      </Modal>
    </Grid>
  );
};

export default MovieInformation;

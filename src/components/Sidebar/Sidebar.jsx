import React, { useEffect } from 'react';
import { Divider, List, ListItemButton, ListItemText, ListSubheader, ListItemIcon, Box, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import genreIcons from '../../assets/genres';
import { useGetGenresQuery } from '../../services/TMDB';
import { selectGenreOrCategory, currentGenreOrCategorySelector } from '../../features/currentGenreOrCategory';

const categories = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
];

const redLogo = 'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';
const blueLogo = 'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';

const Sidebar = ({ setMobileOpen }) => {
  const theme = useTheme();
  const styles = useStyles();
  const { data, error, isFetching } = useGetGenresQuery();
  const { genreIdOrCategoryName } = useSelector(currentGenreOrCategorySelector);
  const dispatch = useDispatch();

  if (error) return 'An error has occurred.';

  return (
    <>
      <Link to="/" className={styles.imageLink}>
        <img
          className={styles.image}
          src={theme.palette.mode === 'light' ? redLogo : blueLogo}
          alt="Filmpire logo"
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link key={value} className={styles.links} to="/">
            <ListItemButton onClick={() => dispatch(selectGenreOrCategory(value))}>
              <ListItemIcon>
                <img src={genreIcons[label.toLowerCase()]} className={styles.genreImage} height={30} />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {isFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : data.genres.map(({ id, name }) => (
          <Link key={name} className={styles.links} to="/">
            <ListItemButton onClick={() => dispatch(selectGenreOrCategory(id))}>
              <ListItemIcon>
                <img src={genreIcons[name.toLowerCase()]} className={styles.genreImage} height={30} />
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItemButton>
          </Link>
        ))}
      </List>
    </>
  );
};

export default Sidebar;

import React from 'react';
import { CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';

import useStyles from './styles';
import 'rsuite/dist/rsuite.min.css';

import { Actors, MovieInformation, Movies, NavBar, Profile } from '.';

const App = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <CssBaseline />
      <NavBar />
      <main className={styles.content}>
        <div className={styles.toolbar} />
        <Routes>
          <Route exact path="/" element={<Movies />} />
          <Route exact path="/profile/:id" element={<Profile />} />
          <Route exact path="/movie/:id" element={<MovieInformation />} />
          <Route exact path="/actors/:id" element={<Actors />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;

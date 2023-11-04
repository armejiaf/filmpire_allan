import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;
const tmdbAccessToken = process.env.REACT_APP_TMDB_TOKEN;
const page = 1;

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3',
    headers: { Authorization: `Bearer ${tmdbAccessToken}` },
  }),
  endpoints: (builder) => ({
    getPopularMovies: builder.query({
      query: () => `movie/popular?page=${page}`,
    }),
  }),
});

export const {
  useGetPopularMoviesQuery,
} = tmdbApi;

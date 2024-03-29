import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbAccessToken = process.env.REACT_APP_TMDB_TOKEN;

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3',
    headers: { Authorization: `Bearer ${tmdbAccessToken}` },
  }),
  endpoints: (builder) => ({
    //* Get Genres
    getGenres: builder.query({
      query: () => 'genre/movie/list',
    }),

    //* Get Movies by [Type]
    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
        //* Get Movies by Search
        if (searchQuery) {
          return `search/movie?query=${searchQuery}&page=${page}`;
        }
        //* Get Movies by Genres
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number') {
          return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}`;
        }

        //* Get Movies by Categories
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string') {
          return `movie/${genreIdOrCategoryName}?page=${page}`;
        }

        //* Default Get Popular Movies
        return `movie/popular?page=${page}`;
      },
    }),

    //* Get Movie
    getMovie: builder.query({
      query: (id) => `movie/${id}?append_to_response=videos,credits`,
    }),

    //* Get Actor
    getActor: builder.query({
      query: (id) => `person/${id}`,
    }),

    //* Get User Specific Lists
    getRecommendations: builder.query({
      query: ({ movie_id: movieId, list }) => `movie/${movieId}/${list}`,
    }),

    //* Get Movies by Actor Id
    getMovieByActorId: builder.query({
      query: ({ id, page }) => `discover/movie?with_cast=${id}&page=${page}`,
    }),

    //* Get User Specific Lists
    getList: builder.query({
      query: ({ listName, accountId, sessionId, page }) => `account/${accountId}/${listName}?session_id=${sessionId}&page=${page}`,
    }),
  }),
});

export const {
  useGetGenresQuery,
  useGetMoviesQuery,
  useGetMovieQuery,
  useGetActorQuery,
  useGetMovieByActorIdQuery,
  useGetRecommendationsQuery,
  useGetListQuery,
} = tmdbApi;

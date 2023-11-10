import axios from 'axios';

const tmdbAccessToken = process.env.REACT_APP_TMDB_TOKEN;

export const moviesApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: { Authorization: `Bearer ${tmdbAccessToken}` },
});

export const fetchToken = async () => {
  try {
    const { data } = await moviesApi.get('authentication/token/new');

    const token = data.request_token;

    if (data.success) {
      localStorage.setItem('request_token', token);

      window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}/approved`;
    }
  } catch (error) {
    console.log('Sorry, your token could not be created.');
  }
};

export const createSessionId = async () => {
  const token = localStorage.getItem('request_token');

  if (token) {
    try {
      const { data: { session_id: sessionId } } = await moviesApi.post('authentication/session/new', {
        request_token: token,
      });

      localStorage.setItem('session_id', sessionId);

      return sessionId;
    } catch (error) {
      console.log(error);
    }
  }
};

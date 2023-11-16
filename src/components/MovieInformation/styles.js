import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  containerSpaceAround: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: '10px 0 !important',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      flexWrap: 'wrap',
    },
  },
  poster: {
    borderRadius: '20px',
    boxShadow: '0.5em 1em 1em rgb(64, 64, 70)',
    width: '80%',
    [theme.breakpoints.down('lg')]: {
      margin: '0 auto',
      width: '50%',
      display: 'flex',
      marginBottom: '30px',
    },
    [theme.breakpoints.down('md')]: {
      margin: '0 auto',
      width: '50%',
      display: 'flex',
      marginBottom: '30px',
    },
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto',
      width: '75%',
      height: 'auto',
      marginBottom: '30px',
    },
  },
  links: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textDecoration: 'none !important',
    [theme.breakpoints.down('sm')]: {
      padding: '0.5rem 1rem',
    },
  },
  genresContainer: {
    margin: '10px 0 !important',
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  genreImage: {
    filter: theme.palette.mode === 'dark' && 'invert(1)',
    marginRight: '10px',
  },
  castImage: {
    width: '100%',
    maxWidth: '7em',
    height: '8em',
    objectFit: 'cover',
    borderRadius: '10px',
  },
  tagGroup: {
    display: 'flex',
    alignItems: 'start',
    width: '100%',
    marginTop: '10px !important',
    marginBottom: '2rem !important',
  },
  tag: {
    margin: '0 10px !important',
    border: `1px solid ${theme.palette.mode === 'light' ? 'black' : 'white'}`,
    backgroundColor: theme.palette.mode === 'light' ? 'white' : '#121212',
    color: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.87)' : 'white',
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      '& a': {
        fontSize: '11px !important',
      },
      '& button': {
        fontSize: '11px !important',
      },
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    width: '50%',
    height: '50%',
    border: 'none',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
      height: '90%',
    },
  },
}));

import { createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0259A0',
    },
    secondary: {
      main: '#2BADFF',
    },
    error: {
      main: '#D74343',
    },
    text: {
      main: '#6D6D6D',
    },
  },
});

export default theme;

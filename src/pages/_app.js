import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import createStore from 'redux/configureStore';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from 'theme';

import mainStyles from 'scss/main.scss';

const MyApp = ({ Component, pageProps, store }) => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <style jsx global>
        {mainStyles}
      </style>
      <Component {...pageProps} />
    </ThemeProvider>
  </Provider>
);

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};

  // Retreiving each page's props
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps({ ctx });
  }

  return {
    pageProps,
  };
};

export default withRedux(createStore)(MyApp);

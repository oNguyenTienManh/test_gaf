import Head from 'next/head';
import PropTypes from 'prop-types';
import styles from 'scss/components/layout.scss';
import Header from '../Header';
import Footer from '../Footer';

function Layout({ children, title }) {
  return (
    <div className="main">
      <style jsx scoped>
        {styles}
      </style>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <div className="content">{children}</div>
      <Footer />
    </div>
  );
}

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Layout;

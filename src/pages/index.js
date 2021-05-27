import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withReduxSaga } from 'utils/hoc';
import { createStructuredSelector } from 'reselect';

import Home from 'containers/Home';
import { fetchPosts } from 'redux/post/actions';
import { selectLoading, selectPosts } from 'redux/post/selectors';

const Index = (props) => <Home {...props} />;

Index.getInitialProps = async ({ ctx }) => {
  const { store, isServer } = ctx;
  store.dispatch(fetchPosts({ ctx }));

  return { isServer };
};

const mapStateToProps = createStructuredSelector({
  posts: selectPosts,
  isLoading: selectLoading,
});

const mapDispatchToProps = () => ({});
const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default compose(withReduxSaga, withRedux)(Index);

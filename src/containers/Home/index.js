import PropTypes from 'prop-types';
import { Layout } from 'components/compound';
import style from 'scss/pages/home.scss';

const Home = ({ posts, isLoading }) => (
  <Layout title="home page">
    <style jsx scoped>
      {style}
    </style>
    <div className="detail">
      <ul>
        {isLoading && <div>is loading...</div>}
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  </Layout>
);

Home.propTypes = {
  posts: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default Home;

import { requestServer } from 'utils/request';

export default {
  getPosts({ ctx }) {
    return requestServer({
      ctx,
      method: 'GET',
      url: 'posts',
    });
  },
};

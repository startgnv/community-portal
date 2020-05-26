import Ghost from '@tryghost/content-api';

const Api = () => {
  const api = new Ghost({
    url: 'https://sparkgnv.ghost.io',
    key: 'a49362ef6958b6f133bb40ceaa',
    version: 'v3'
  });

  async function getPost(slug) {
    try {
      return await api.posts.read({ slug }, { include: 'authors' });
    } catch (err) {
      console.error(err.message);
    }
  }

  async function getPosts(limit) {
    try {
      return await api.posts.browse({ limit, include: 'tags,authors' });
    } catch (err) {
      console.error(err.message);
    }
  }

  return {
    getPost,
    getPosts
  };
};

export const blogApi = Api();

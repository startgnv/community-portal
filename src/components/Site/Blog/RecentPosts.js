import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { blogApi } from './api';
import { device } from '../../utils/device';
import Loading from './Loading';

const PostList = styled.ul`
  display: flex;
  max-width: 1200px;
  margin-right: ${({ direction }) =>
    direction === 'vertical' ? '0' : '-20px'};
  flex-direction: ${({ direction }) =>
    direction === 'vertical' ? 'column' : 'row'};

  @media ${device.tabletPort}, ${device.mobile} {
    flex-direction: column;
    margin-right: 0;
  }
`;

const Post = styled.li`
  display: block;
  flex: 1;
  margin: ${({ direction }) =>
    direction === 'vertical' ? '0 0 20px 0' : '0 20px 0 0'};
  border-radius: 3px;
  overflow: hidden;
  box-shadow: 3px 0 13px 0 rgba(0, 0, 0, 0.1);
  transition: 200ms;

  &:hover {
    box-shadow: 3px 3px 13px 0 rgba(0, 0, 0, 0.15);
    transform: scale(1.02);
    transform-origin: center;
  }

  a {
    text-decoration: none;
  }

  @media ${device.tabletPort}, ${device.mobile} {
    margin: 0 0 20px 0;
  }
`;

const PostImage = styled.div`
  height: ${({ direction }) => (direction === 'vertical' ? '60px' : '200px')};
  background-color: #333;
  background-image: url(${({ bgImg }) => bgImg});
  background-size: cover;
  background-position: center;
`;

const PostMeta = styled.div`
  padding: ${({ direction }) =>
    direction === 'vertical' ? '15px 30px' : '30px'};
`;

const PostType = styled.span`
  display: block;
  margin-bottom: 10px;
  font-family: benton-sans-wide, sans-serif;
  font-weight: 500;
  font-size: 0.7rem;
  color: ${({ theme }) => theme.textMedium};
`;

const PostTitle = styled.span`
  display: block;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.textDark};
`;

const RecentPosts = ({ dir = '', limit = 0 }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    blogApi
      .getPosts(limit)
      .then(posts => {
        setPosts(posts);
      })
      .catch(err => {
        console.error(err.message);
      });
  }, []);

  if (!posts || posts.length < 1) return <Loading size={60} height={120} />;

  return (
    <PostList direction={dir}>
      {posts.map(({ title, slug, feature_image }, i) => (
        <Post direction={dir} key={i}>
          <a href={`/blog/${slug}`}>
            <PostImage bgImg={feature_image} direction={dir} />
            <PostMeta direction={dir}>
              <PostType>Article</PostType>
              <PostTitle>{title}</PostTitle>
            </PostMeta>
          </a>
        </Post>
      ))}
    </PostList>
  );
};

export default RecentPosts;

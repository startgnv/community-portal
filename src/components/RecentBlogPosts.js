import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { device } from './device';

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
  font-family: benton-sans-wide;
  font-weight: 500;
  font-size: 0.7rem;
  color: ${({ theme }) => theme.textMedium};
`;

const PostTitle = styled.span`
  display: block;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.textDark};
`;

const RecentBlogPosts = ({ dir = '', limit = 0 }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://sparkgnv.ghost.io/ghost/api/v3/content/posts/?key=a49362ef6958b6f133bb40ceaa&limit=${limit}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .then(res => {
        setLoading(false);
        return res.json();
      })
      .then(response => {
        setPosts(response.posts);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <PostList direction={dir}>
      {posts &&
        !!posts.length &&
        posts.map(({ title, url, feature_image }, i) => (
          <Post direction={dir} key={i}>
            <a href={url} target="_blank">
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

export default RecentBlogPosts;

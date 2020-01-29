import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const RecentBlogPostsContainer = styled.div`
  padding: 60px;
  display: flex;
  justify-content: center;
`;

const PostList = styled.ul`
  display: flex;
  max-width: 1200px;
  margin-right: -20px;
`;

const Post = styled.li`
  flex: 1;
  margin-right: 20px;
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
`;

const PostImage = styled.div`
  height: 200px;
  background-color: #333;
  background-image: url(${({ bgImg }) => bgImg});
  background-size: cover;
  background-position: center;
`;

const PostMeta = styled.div`
  padding: 30px;
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

const RecentBlogPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(
      'https://sparkgnv.ghost.io/ghost/api/v3/content/posts/?key=a49362ef6958b6f133bb40ceaa&limit=4',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .then(res => res.json())
      .then(response => {
        setPosts(response.posts);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <RecentBlogPostsContainer>
      <PostList>
        {posts &&
          !!posts.length &&
          posts.map(({ title, url, feature_image }) => (
            <Post>
              <a href={url} target="_blank">
                <PostImage bgImg={feature_image} />
                <PostMeta>
                  <PostType>Article</PostType>
                  <PostTitle>{title}</PostTitle>
                </PostMeta>
              </a>
            </Post>
          ))}
      </PostList>
    </RecentBlogPostsContainer>
  );
};

export default RecentBlogPosts;

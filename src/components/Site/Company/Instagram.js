import React from 'react';
import styled from 'styled-components/macro';
import { useInstagram } from './instagram-api';
import { device } from '../../utils/device';

const List = styled.ul`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  list-style: none;

  max-width: ${({ theme }) => theme.contentMaxWidth};
  margin: auto;
  padding: 30px 0;

  @media ${device.tabletPort} {
    justify-content: space-around;
  }

  @media ${device.mobile} {
    justify-content: center;
  }
`;

const Link = styled.a`
  text-decoration: none;
`;

const Card = styled.li`
  background-color: white;
  box-shadow: 2px 2px 11px rgba(0, 0, 0, 0.15);

  width: 290px;

  transition: 200ms;

  &:hover {
    box-shadow: 3px 3px 13px 0 rgba(0, 0, 0, 0.15);
    transform: scale(1.02);
    transform-origin: center;
  }

  @media ${device.tablet}, ${device.mobile} {
    margin-bottom: 30px;
  }
`;

const Header = styled.div`
  padding: 14px 12px;
  display: flex;
  align-items: center;
`;

const ProfilePic = styled.img`
  width: 36px;
  height: 36px;
  object-fit: cover;
  border-radius: 100px;
`;

const ProfileName = styled.h4`
  font-family: williams-caslon-text, serif;
  font-size: 18px;
  font-weight: 400;
  color: ${({ theme }) => theme.textDark};

  padding-left: 15px;
`;

const PictureContainer = styled.div`
  height: 290px;
  display: flex;
  justify-content: center;
  overflow: hidden;
`;

const Picture = styled.img`
  height: 100%;
  object-fit: cover;
`;

const Description = styled.p`
  font-family: williams-caslon-text, serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  color: ${({ theme }) => theme.textDark};

  padding: 18px;
`;

const Instagram = ({ username }) => {
  const [feed, profilePic] = useInstagram(username);

  return (
    <List>
      {feed.map(post => (
        <Link
          href={`https://instagram.com/${username}`}
          target="_blank"
          key={post.picture}
        >
          <Card>
            <Header>
              <ProfilePic src={profilePic} alt="Profile Picture" />
              <ProfileName>{username}</ProfileName>
            </Header>

            <PictureContainer>
              <Picture src={post.picture} alt="Post" />
            </PictureContainer>

            <Description>
              {post.description.length > 90
                ? `${post.description.slice(0, 90)}...`
                : post.description}
            </Description>
          </Card>
        </Link>
      ))}
    </List>
  );
};

export default Instagram;

import React from 'react';
import styled from 'styled-components';
import { baseContentStyling } from '../../utils/mixins';
import { Parser } from 'html-to-react';
import Link from 'src/components/Site/UI/Link';

const html = new Parser();

const EcoItem = styled.div`
  border-radius: 3px;
  background: white;
  box-shadow: 3px 0 13px 0 rgba(0, 0, 0, 0.08);
  overflow: hidden;
  height: 100px;
  display: flex;
  @media screen and (max-width: 600px) {
    min-height: 100px;
    height: auto;
  }

  .container-link {
    text-decoration: none;
  }
`;

const EcoItemImg = styled.div`
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  flex: 0 0 140px;
  margin-right: 20px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 15px;
`;

const EcoItemTime = styled.h3`
  padding: 5px 7px;
  border-radius: 3px;
  background-color: rgba(0, 0, 0, 0.35);

  font-family: Montserrat, sans-serif;
  font-weight: 500;
  font-size: 15px;
  color: white;

  margin-bottom: 12px;
  z-index: 1;
`;

const EcoItemDate = styled.h3`
  font-family: Montserrat, sans-serif;
  font-weight: 500;
  font-size: 15px;
  color: white;
  z-index: 10;
`;

const ImgGradient = styled.div`
  width: 100%;
  height: 80px;

  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(19, 21, 22, 0.9) 100%
  );
  position: absolute;
  bottom: 0;
  left: 0;
`;

const EcoItemContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  min-width: 0;
`;

const EcoItemHeader = styled.a`
  grid-area: header;
  margin-bottom: 10px;
  font-family: WilliamsCaslonText, serif;
  font-size: 18px;
  color: ${props => props.theme.textDark};
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const EcoItemSubheader = styled.h4`
  grid-area: subheader;
  font-family: Montserrat, sans-serif;
  font-size: 12px;
  color: ${props => props.theme.textDark};
  opacity: 0.7;
`;

const EcoItemDescription = styled.div`
  ${baseContentStyling()}
  width: 95%;
  p {
    color: ${props => props.theme.textLight};
    margin-bottom: 10px;
    font-size: 1rem;
    line-height: 1.3rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const EcosystemCard = ({
  name,
  thumbnail,
  location,
  description,
  link,
  slug = ''
}) => {
  const firstParagraph = description?.split('</p>');

  return (
    <EcoItem key={name}>
      <EcoItemImg
        src={
          thumbnail
            ? thumbnail
            : '/assets/images/ecosystem-default-thumbnail.png'
        }
      ></EcoItemImg>
      <EcoItemContent>
        <Link className="container-link" to={'/ecosystem/' + slug}>
          <EcoItemHeader>{name}</EcoItemHeader>
          <EcoItemDescription>
            {html.parse(firstParagraph?.[0])}
          </EcoItemDescription>
        </Link>
      </EcoItemContent>
    </EcoItem>
  );
};

export default EcosystemCard;

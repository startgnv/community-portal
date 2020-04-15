import * as React from 'react';
import styled from 'styled-components/macro';
import { Helmet } from 'react-helmet';
import { device } from '../device';
import { blogApi } from './api';
import { Parser } from 'html-to-react';
import RecentPosts from './RecentPosts';
import Loading from '../Loading';
import { formatDate } from '../utils';

const html = new Parser();

const Header = styled.div`
  padding-top: 150px;
  background-image: url(${({ backgroundImg }) => backgroundImg});
  background-size: cover;
`;

const TitleCardContainer = styled.div`
  max-width: ${({ theme }) => theme.contentMaxWidth};
  margin: auto;
  display: flex;
  flex-flow: row nowrap;
`;

const TitleCard = styled.div`
  width: 450px;
  background-color: white;
  padding: 15px 30px;

  @media ${device.mobile} {
    padding: 15px;
  }
`;

const Title = styled.h1`
  font-family: williams-caslon-text, serif;
  font-size: 46px;
  line-height: 64px;
  color: #131516;
  margin-bottom: 10px;

  @media ${device.mobile} {
    font-size: 36px;
    line-height: 46px;
  }
`;

const Subtitle = styled.h2`
  font-family: williams-caslon-text, serif;
  font-size: 18px;
  color: #131516;
  opacity: 0.7;
  margin-bottom: 15px;
`;

const Info = styled.h3`
  font-family: benton-sans-wide, sans-serif;
  font-size: 13px;
  color: #131516;

  @media ${device.mobile} {
    padding-bottom: 20px;
    border-bottom: 2px solid #131516;
  }
`;

const ContentContainer = styled.div`
  max-width: 675px;
  margin: auto;
  margin-top: 100px;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 60px 0;
  }

  // Styling for downloaded html
  p {
    font-family: WilliamsCaslonText, serif;
    font-size: 22px;
    line-height: 30px;
    color: #131516;
    margin: 30px 0;
  }

  em {
    font-style: italic;
  }

  strong {
    font-weight: bold;
  }

  figure {
    margin: 60px 0;
  }

  figure img {
    width: 100%;
    height: 100%;
  }

  figure figcaption {
    text-align: center;
    font-family: Arial, sans-serif;
    font-size: 14px;
    margin-top: 5px;
  }

  blockquote {
    border-left: 5px solid #0a1b2a;
    padding-left: 30px;
    font-size: 22px;
    line-height: 30px;
  }

  hr {
    margin: 30px 0;
  }

  @media ${device.mobile} {
    margin-top: 0;

    p {
      margin: 20px 0;
      padding-left: 15px;
      padding-right: 15px;
    }

    figure {
      margin: 30px 0;
    }

    blockquote {
      padding-left: 15px;
      padding-right: 15px;
    }
  }
`;

const MorePostsContainer = styled.div`
  max-width: 675px;
  margin: 75px auto;
`;

const Label = styled.h2`
  font-family: benton-sans-wide, sans-serif;
  font-size: 16px;
  letter-spacing: 2px;
  text-align: center;
  margin-bottom: 30px;
`;

const mapPostToState = article => ({
  title: article.title,
  subtitle: article.excerpt,
  content: article.html,
  author: article.authors[0].name,
  date: formatDate(new Date(article.created_at)),
  imageURL: article.feature_image
});

const Article = ({
  match: {
    params: { articleSlug }
  }
}) => {
  const [article, setArticle] = React.useState({
    title: '',
    subtitle: '',
    content: '',
    author: '',
    date: '',
    imageURL: ''
  });

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    blogApi
      .getPost(articleSlug)
      .then(post => {
        setArticle(mapPostToState(post));
        setLoading(false);
      })
      .catch(err => {
        console.error(err.message);
      });
  }, []);

  if (loading) return <Loading size={60} height={120} />;

  return (
    <>
      <Helmet>
        <title>startGNV - {article.title}</title>
        <meta name="description" content={article.subtitle} />
        <meta
          name="og:title"
          property="og:title"
          content={`${article.title} - startGNV`}
        />
        <meta
          name="og:description"
          property="og:description"
          content={article.subtitle}
        />
        <meta name="og:image" propert="og:image" content={article.imageURL} />
        <meta property="og:type" content="website" />
      </Helmet>
      <Header backgroundImg={article.imageURL}>
        <TitleCardContainer>
          <TitleCard>
            <Title>{article.title}</Title>
            <Subtitle>{article.subtitle}</Subtitle>
            <Info>
              {article.author} / {article.date}
            </Info>
          </TitleCard>
        </TitleCardContainer>
      </Header>

      <ContentContainer>{html.parse(article.content)}</ContentContainer>

      <MorePostsContainer>
        <Label>ALSO RECOMMENDED</Label>
        <RecentPosts limit={2} />
      </MorePostsContainer>
    </>
  );
};

export default Article;

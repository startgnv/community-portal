import React from 'react';
import styled from 'styled-components/macro';
import heroBG from '../../../assets/images/jobs-hero.jpg';
import Hero from '../UI/Hero';
import { blogApi } from './api';
import Loading from './Loading';
import { formatDate } from '../../utils';
import { device } from '../../utils/device';
import { Parser } from 'html-to-react';
const html = new Parser();

const Container = styled.main`
  max-width: ${({ theme }) => theme.contentMaxWidth};
  margin: auto;
  display: flex;
  flex-flow: column nowrap;
  margin-top: 65px;

  & > * {
    margin-bottom: 100px;
  }

  @media ${device.mobile}, ${device.tablet} {
    padding: 0 15px;
  }
`;

const Article = styled.article``;

const Banner = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 3px;
  box-shadow: 3px 0 13px 0 rgba(0, 0, 0, 0.15);
`;

const Link = styled.a`
  text-decoration: none;
`;

const Meta = styled.div`
  display: grid;
  grid-template-areas:
    'title summary'
    'tags author';
  grid-row-gap: 10px;
  justify-content: space-between;

  margin-top: 25px;

  @media ${device.mobile} {
    grid-template-areas:
      'title'
      'summary'
      'tags'
      'author';
    grid-row-gap: 20px;
  }
`;

const Title = styled.h2`
  grid-area: title;
  font-size: 42px;
  font-weight: normal;
  font-family: williams-caslon-text, serif;
  max-width: 450px;
  color: #131516;

  @media ${device.tablet} {
    font-size: 36px;
  }

  @media ${device.mobile} {
    font-size: 28px;
  }
`;

const Summary = styled.h4`
  grid-area: summary;
  font-size: 20px;
  font-weight: normal;
  font-family: williams-caslon-text, serif;
  max-width: 450px;
  color: #131516;
  opacity: 0.7;
  text-align: right;

  @media ${device.tablet} {
    font-size: 18px;
  }

  @media ${device.mobile} {
    text-align: left;
    font-size: 16px;
  }
`;

const Tags = styled.h3`
  grid-area: tags;
  font-size: 14px;
  font-weight: normal;
  font-family: Montserrat, sans-serif;
  color: #131516;
  opacity: 0.7;
`;

const Author = styled.h3`
  grid-area: author;
  font-size: 14px;
  font-weight: normal;
  font-family: Montserrat, sans-serif;
  color: #131516;
  text-align: right;

  @media ${device.mobile} {
    text-align: left;
  }
`;

const Excerpt = styled.p`
  margin-top: 25px;

  // Styling for downloaded html
  p {
    font-family: WilliamsCaslonText, serif;
    font-size: 20px;
    line-height: 25px;
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

const mapPostToState = article => ({
  title: article.title,
  subtitle: article.excerpt,
  content: article.html,
  author: article.authors ? article.authors[0].name : 'Anonymous',
  tags: article.tags ? article.tags.map(tag => tag.name) : [],
  date: formatDate(new Date(article.created_at)),
  imageURL: article.feature_image,
  slug: article.slug
});

const Catalog = () => {
  const [articles, setArticles] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    blogApi
      .getPosts(100)
      .then(posts => {
        const articles = [];
        for (let key in posts) {
          if (key !== 'meta') {
            articles.push(posts[key]);
          }
        }
        setArticles(articles.map(mapPostToState));
        setLoading(false);
      })
      .catch(err => {
        console.error(err.message);
      });
  }, []);

  if (loading) return <Loading size={60} height={120} />;

  return (
    <>
      <Hero bgImage={heroBG} title="Articles" size="medium" />
      <Container>
        {articles.map(article => (
          <Article key={article.slug}>
            <Link href={`/blog/${article.slug}`}>
              <Banner src={article.imageURL} />
              <Meta>
                <Title>{article.title}</Title>
                <Summary>{article.subtitle}</Summary>
                <Tags>{article.tags.join(' / ')}</Tags>
                <Author>
                  {article.author} / {article.date}
                </Author>
              </Meta>
            </Link>
            {article.content && (
              <Excerpt>{html.parse(article.content.slice(0, 1000))}</Excerpt>
            )}
          </Article>
        ))}
      </Container>
    </>
  );
};

export default Catalog;

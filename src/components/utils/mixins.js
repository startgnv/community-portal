import theme from './theme';

export const baseContentStyling = props => `
  line-height: 1.4rem;

  p {
    margin-bottom: 20px;
    color: ${theme.textDark};
  }

  h1, h2, h3 {
    margin-top: 10px;
    margin-bottom: 20px;
  }

  h4, h5, h6 {
    margin-bottom: 10px;
  }

  em {
    font-style: italic;
  }

  ul, ol {
    margin: 0 0 20px 20px;
  }

  li {
    margin-bottom: 5px;
    color: ${theme.textDark};
  }

  ul li {
    list-style: disc;
  }

  ol li {
    list-style: decimal;
  }

  strong{
    font-weight: 900;
  }
`;

import React from 'react';
import styled from 'styled-components';

const Bar = styled.div`
  position: fixed;
  top: 0;
  background: linear-gradient(
    to right,
    rgba(0, 180, 150, 1) ${props => props.completePct},
    transparent 0
  );
  width: 100%;
  height: 4px;
  z-index: 3;
`;

const ProgressBar = () => {
  const [scroll, setScroll] = React.useState(0);

  const calculateScrollDistance = () => {
    const scrollTop = window.pageYOffset; // how much the user has scrolled by
    const winHeight = window.innerHeight;
    const docHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    );

    const totalDocScrollLength = docHeight - winHeight;
    const scrollPosition = Math.floor((scrollTop / totalDocScrollLength) * 100);

    setScroll(scrollPosition);
  };

  const onScroll = () => {
    document.addEventListener('scroll', () => {
      requestAnimationFrame(() => {
        calculateScrollDistance();
      });
    });
  };

  React.useEffect(() => {
    onScroll();
  }, []);

  return <Bar completePct={`${scroll}%`} />;
};

export default ProgressBar;

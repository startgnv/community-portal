import React, { useState } from 'react';
import styled from 'styled-components';
import EcosystemCard from 'src/components/Site/Ecosystem/EcosystemCard';

const ItemGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 30px;

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const EcosystemGrid = ({ ecosystems }) => {
  const [sliceEnd, setSliceEnd] = useState(3);

  const changeShow = () => {
    setSliceEnd(sliceEnd > 0 ? -1 : 3);
  };

  return (
    <ItemGrid>
      {ecosystems
        .slice(0, sliceEnd > 0 ? sliceEnd : ecosystems.length)
        .map(
          ({
            name,
            description,
            categories,
            link,
            id,
            location,
            eventDate,
            thumbnail
          }) => {
            return (
              <EcosystemCard
                key={name}
                name={name}
                description={description}
                link={link}
                location={location}
                eventDate={eventDate}
                thumbnail={thumbnail}
                slug={id}
              />
            );
          }
        )}

      {ecosystems.length > 3 ? (
        <p style={{ cursor: 'pointer' }} onClick={() => changeShow()}>
          {sliceEnd > 0 ? 'Show More...' : 'Show Less...'}
        </p>
      ) : (
        ''
      )}
    </ItemGrid>
  );
};

export default EcosystemGrid;

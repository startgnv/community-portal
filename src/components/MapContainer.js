import React from 'react';
import ReactMapGL from 'react-map-gl';
import styled from 'styled-components/macro';

const MapContainerContainer = styled.div`
  height: 100%;
  overflow: hidden;
`;

export const MapContainer = ({
  children,
  viewport = {},
  onViewportChange = () => {}
}) => {
  return (
    <MapContainerContainer>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden'
        }}
        touchZoom={true}
        dragRotate={false}
        doubleClickZoom={false}
        onViewportChange={onViewportChange}
        width={'100%'}
        height={'100%'}
        scrollZoom={true}
      >
        {children}
      </ReactMapGL>
    </MapContainerContainer>
  );
};

export default MapContainer;

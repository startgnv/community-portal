import React, { useState } from 'react';
import ReactMapGL from 'react-map-gl';
import styled from 'styled-components/macro';

const MapContainerContainer = styled.div`
  height: 100%;
  overflow: hidden;
`;

const defaultCenter = {
  latitude: 29.6607805656048,
  longitude: -82.380708628568,
  zoom: 11
};

export const MapContainer = ({ children }) => {
  const [viewport, setViewport] = useState(defaultCenter);
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
        onViewportChange={setViewport}
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

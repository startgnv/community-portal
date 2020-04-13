import React from 'react';
import ReactMapGL from 'react-map-gl';
import styled from 'styled-components/macro';
import 'mapbox-gl/src/css/mapbox-gl.css';

const MapContainerContainer = styled.div`
  width: 100%;
  height: 100%;
  border: solid 1px ${({ theme }) => theme.uiBorder};
  border-radius: 6px;
`;

export const MapContainer = ({
  children,
  viewport,
  onViewportChange = () => {}
}) => {
  return (
    <MapContainerContainer>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
        mapStyle="mapbox://styles/williamrichardson/ck62urig104j91inoaevttyc1"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden'
        }}
        touchZoom={true}
        dragRotate={false}
        doubleClickZoom={false}
        width={'100%'}
        height={'100%'}
        onViewportChange={onViewportChange}
      >
        {children}
      </ReactMapGL>
    </MapContainerContainer>
  );
};

export default MapContainer;

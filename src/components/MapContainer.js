import React from 'react';
import useWindowSize from '@rehooks/window-size';
import ReactMapGL from 'react-map-gl';

export const MapContainer = ({
  children,
  viewport = {},
  onViewportChange = () => {}
}) => {
  const { innerHeight, innerWidth } = useWindowSize();

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
      style={{
        display: 'flex',
        justifyContent: 'center',
        position: 'fixed',
        zIndex: -1,
        top: 0,
        alignItems: 'center'
      }}
      dragPan={false}
      touchZoom={false}
      dragRotate={false}
      doubleClickZoom={false}
      touchRotate={false}
      onViewportChange={onViewportChange}
      width={innerWidth}
      height={innerHeight}
      zoom={14}
    >
      {children}
    </ReactMapGL>
  );
};

export default MapContainer;

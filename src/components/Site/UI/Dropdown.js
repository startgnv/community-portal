import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Popper } from '@material-ui/core';
import Button from './Button';

const Dropdown = ({
  btnLabel = 'Dropdown',
  btnSize = 'medium',
  placement = 'bottom-start',
  children = false,
  style = {}
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const popperEl = useRef(null);
  const popperHash =
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15);
  const elID = anchorEl ? 'popper' + popperHash : undefined;

  const onBodyClick = useCallback(ev => {
    if (popperEl && popperEl.current && popperEl.current.contains(ev.target)) {
      return false;
    }
    setAnchorEl(null);
  }, []);

  const onBtnClick = ev => {
    setAnchorEl(anchorEl ? null : ev.currentTarget);
  };
  useEffect(() => {
    setTimeout(() => {
      if (anchorEl) {
        window.addEventListener('click', onBodyClick);
      } else {
        window.removeEventListener('click', onBodyClick);
      }
    }, 0);
  });
  return (
    <>
      <Button
        label={btnLabel}
        variant="outline"
        aria-describedby={elID}
        onClick={onBtnClick}
        size={btnSize}
      />
      <Popper
        style={{ zIndex: '1' }}
        id={elID}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        placement={placement}
        transition
        ref={popperEl}
      >
        {({ TransitionProps }) => children}
      </Popper>
    </>
  );
};

export default Dropdown;

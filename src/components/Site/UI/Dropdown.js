import React, { useState, useRef } from 'react';
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
  const isOpen = Boolean(anchorEl);
  const popperHash =
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15);
  const elID = isOpen ? 'popper' + popperHash : undefined;
  const onBodyClick = ev => {
    if (popperEl && popperEl.current && popperEl.current.contains(ev.target)) {
      return false;
    }
    setAnchorEl(null);
  };
  const onBtnClick = ev => {
    setAnchorEl(anchorEl ? null : ev.currentTarget);
    ev.stopPropagation();
  };
  if (isOpen) {
    document.body.addEventListener('click', onBodyClick);
  } else {
    document.body.removeEventListener('click', onBodyClick);
  }
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
        open={isOpen}
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

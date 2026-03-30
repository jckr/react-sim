import React from 'react';
import { Button } from './ui';

function TimerButton(props) {
  const { children, onClick, ...rest } = props;
  return (
    <Button px={2} py={1} mr={2} lineHeight={1} onClick={onClick} {...rest}>
      {children}
    </Button>
  );
}

export default TimerButton;

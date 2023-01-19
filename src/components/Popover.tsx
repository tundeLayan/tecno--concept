import React from 'react';
import { Popover } from 'react-tiny-popover';

const PopoverComp = ({
  isPopoverOpen,
  /* setIsPopoverOpen, onClose, */ content,
  children,
}: any) => {
  return (
    <Popover
      isOpen={isPopoverOpen}
      positions={['top', 'bottom', 'left', 'right']} // preferred positions by priority
      content={content}
    >
      {children}
    </Popover>
  );
};

export default PopoverComp;

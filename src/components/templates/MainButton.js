import clsx from 'clsx';
import React from 'react';
import Button from '../Button';
import styles from './templates.module.scss';

/**
 * color: white || red || blue;
 * size: sm || md
 */
const MainButton = ({
  children,
  className,
  color = 'white',
  size = 'md',
  disabled,
  ...props
}) => {
  return (
    <Button
      {...props}
      disabled={disabled}
      className={clsx(
        styles.mainButton,
        styles[color],
        styles[size],
        disabled && styles.disabled,
        className
      )}
    >
      {children}
    </Button>
  );
};

export default MainButton;

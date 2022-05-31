import React from 'react';
import clsx from 'clsx';
import styles from './button.module.scss';

const Button = ({ children, className, onClick = () => {}, ...props }) => {
  return (
    <button
      {...props}
      className={clsx(styles.buttonRoot, className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

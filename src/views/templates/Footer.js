import React from 'react';
import styles from './templates.module.scss';
import Button from '../../components/Button';

const Footer = ({ onClick, buttonTitle, buttonProps }) => {
  return (
    <div className={styles.footer}>
      <Button {...buttonProps} onClick={onClick}>
        {buttonTitle}
      </Button>
    </div>
  );
};

export default Footer;

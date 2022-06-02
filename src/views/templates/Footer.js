import React from 'react';
import styles from './templates.module.scss';
import Button from '../../components/Button';

const Footer = ({ onClick, buttonTitle, buttonProps, otherComponent }) => {
  return (
    <div className={styles.footer}>
      {otherComponent}
      <Button className={styles.defaultBtn} {...buttonProps} onClick={onClick}>
        {buttonTitle}
      </Button>
    </div>
  );
};

export default Footer;

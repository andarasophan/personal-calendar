import React from 'react';
import styles from './templates.module.scss';
import MainButton from '../../components/templates/MainButton';

const Footer = ({ onClick, buttonTitle, buttonProps, otherComponent }) => {
  return (
    <div className={styles.footer}>
      {otherComponent}
      <MainButton color="blue" onClick={onClick} {...buttonProps}>
        {buttonTitle}
      </MainButton>
    </div>
  );
};

export default Footer;

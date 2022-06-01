import React from 'react';
import Button from '../../components/Button';
import SVG from '../../components/SVG';
import styles from './templates.module.scss';

const Header = ({
  onClose = () => {},
  onBack,
  closeButtonProps,
  backButtonProps,
}) => {
  return (
    <div className={styles.header}>
      <Button {...closeButtonProps} className={styles.btn} onClick={onClose}>
        <span>
          <SVG width="100%" height="100%" src="/assets/svg/Close.svg" />
        </span>
      </Button>
      {onBack && (
        <Button {...backButtonProps} className={styles.btn} onClick={onBack}>
          <span>
            <SVG width="100%" height="100%" src="/assets/svg/ArrowBack2.svg" />
          </span>
        </Button>
      )}
    </div>
  );
};

export default Header;

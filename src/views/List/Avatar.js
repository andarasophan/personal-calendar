import React from 'react';
import styles from './list.module.scss';

const Avatar = ({ email }) => {
  return (
    <div className={styles.user}>
      <div className={styles.avatar}>{email[0].toUpperCase()}</div>
      <div className={styles.email}>{email}</div>
    </div>
  );
};

export default Avatar;

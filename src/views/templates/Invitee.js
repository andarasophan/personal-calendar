import React from 'react';
import styles from './templates.module.scss';

const Invitee = ({ email }) => {
  return (
    <div className={styles.invitee}>
      <div className={styles.avatar}>{email[0].toUpperCase()}</div>
      <div className={styles.email}>{email}</div>
    </div>
  );
};

export default Invitee;

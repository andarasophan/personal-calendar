import React from 'react';
import SVG from '../../components/SVG';
import Avatar from './Avatar';
import styles from './list.module.scss';

const Event = ({ name, time, invitees = [], color }) => {
  return (
    <div className={styles.event}>
      <div className={styles.title}>
        <span
          className={styles.icon}
          style={{
            borderRadius: 2,
            backgroundColor: color,
          }}
        />
        <p>{name}</p>
      </div>
      <div className={styles.info}>
        <span className={styles.icon}>
          <SVG width="100%" height="100%" src="/assets/svg/Clock.svg" />
        </span>
        <p>{time}</p>
      </div>
      <div className={styles.info}>
        <span className={styles.icon}>
          <SVG width="100%" height="100%" src="/assets/svg/User.svg" />
        </span>
        <div className={styles.users}>
          {invitees.map((el, i) => (
            <Avatar key={i} email={el} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Event;

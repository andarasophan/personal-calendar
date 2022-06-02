import React from 'react';
import Button from '../../components/Button';
import SVG from '../../components/SVG';
import MainButton from '../../components/templates/MainButton';
import Invitee from '../templates/Invitee';
import styles from './list.module.scss';

const Event = ({
  name,
  time,
  invitees = [],
  color,
  onEventClick,
  onDeleteClick,
}) => {
  return (
    <div className={styles.event}>
      <Button className={styles.eventBtn} onClick={onEventClick}>
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
          <div className={styles.invitees}>
            {invitees.map((el, i) => (
              <Invitee key={i} email={el.email} />
            ))}
          </div>
        </div>
      </Button>

      <MainButton
        className={styles.deletebtn}
        size="sm"
        color="red"
        onClick={onDeleteClick}
      >
        Delete
      </MainButton>
    </div>
  );
};

export default Event;

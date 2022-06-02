import React from 'react';
import styles from './templates.module.scss';

const Content = ({ children }) => {
  return <div className={styles.content}>{children}</div>;
};

export default Content;

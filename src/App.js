import styles from './test.module.scss';
import testVariable from './styles/_variables.scss';

function App() {
  return (
    <div className={`container ${styles.testModule}`}>{testVariable.black}</div>
  );
}

export default App;

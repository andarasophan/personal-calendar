import React from 'react';
import Calendar from './components/Calendar';

const dummy = {
  '4-5-2022': [{ name: 'Test' }, { name: 'Test Bla Bla Bla' }],
  '10-5-2022': [{ name: 'Test123 123' }],
  '11-5-2022': [
    { name: 'Test' },
    { name: 'Testdsfsdfs 234234' },
    { name: 'Test asda olaskd' },
  ],
};

function App() {
  return (
    <div className="container">
      <Calendar events={dummy} />
    </div>
  );
}

export default App;

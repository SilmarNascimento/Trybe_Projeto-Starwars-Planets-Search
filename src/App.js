import React from 'react';
import './App.css';
import Provider from './contexts/MyProvider';
import Header from './Components/Header';
import Form from './Components/Form';
import Table from './Components/Table';

function App() {
  return (
    <Provider>
      <span>Hello, App!</span>
      <Header />
      <div>
        <Form />
        <Table />
      </div>
    </Provider>
  );
}

export default App;

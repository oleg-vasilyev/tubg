import * as React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {App} from './App';

export class AppRoutings extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  }
}
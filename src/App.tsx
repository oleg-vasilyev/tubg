import * as React from 'react';
import {IContent} from './App.types';

class App extends React.Component<IContent> {
  public render() {
    return (
      <div>{this.props.content}</div>
    );
  }
}

export default App
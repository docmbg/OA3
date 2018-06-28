import * as React from 'react';
import '../sass/App.css';
import Navigation from '../containers/navigation';
import Stage from '../containers/stage';
import 'promise-polyfill/src/polyfill';

class App extends React.Component<any, any> {

  render(): any {
    return (
      <div>
        <Navigation />
        <Stage />
      </div>
    );
  }
}

export default App;

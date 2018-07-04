import * as React from 'react';
import '../sass/App.css';
import Navigation from '../containers/navigation';
import Stage from '../containers/stage';
import Loader from '../components/loader';

class App extends React.Component<any, any> {

  render(): any {
    return (
      <div>
        <Loader />
        <Navigation/>
        <Stage />
      </div>
    );
  }
}

export default App;

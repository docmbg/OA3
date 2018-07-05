import * as React from 'react';
import '../sass/App.css';
import Navigation from '../containers/navigation';
// import Stage from '../containers/stage';
// import Loader from '../components/loader';
import MassUserDelete from '../containers/mass_user_delete';

class App extends React.Component<any, any> {

  render(): any {
    return (
      <div>
        {/* <Loader /> */}
        <Navigation/>
        {/* <Stage /> */}
        <MassUserDelete />
      </div>
    );
  }
}

export default App;

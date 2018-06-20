import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './home';

class Main extends React.Component {
    render() {
        return  (
            <Switch>
                <Route exact={true} path="/" component={Home} />
                {/* the last parameter :name, could be anything you want, 
                IT DOESN'T need to match the property you're filtering */}
                {/* try removing the exact={true} property from the contentSection and see
                what happens when you try to navigate to deeptestroute */}
            </Switch>
        );
    }
}

export default Main;
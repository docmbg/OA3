import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
    root: {
        flexGrow: 1,
    },
    color: 'yellow'
};

class LinearLoader extends React.Component<any, any> { 

    render() {
        return (
            <div >
                <LinearProgress />
                <br />
            </div>
        );
    }

}

export default withStyles(styles)(LinearLoader);
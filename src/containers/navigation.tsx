import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setStage } from '../actions/setStage';

class Navigation extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    changeStage(data: string) {
        this.props.setStage(data);
    }

    render() {
        return (
            <button onClick={() => this.changeStage('Users')}>Get Users</button>
        );
    }
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({ setStage }, dispatch);
}

export default connect(null, mapDispatchToProps)(Navigation);

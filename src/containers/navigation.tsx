import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setStage } from '../actions/setStage';
import { changeUrl } from '../actions/change_url';
import { Link } from 'react-router-dom';

class Navigation extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    changeStage(data: string) {
        this.props.setStage(data);
        this.props.changeUrl('/home/useraccess1');
    }

    render() {
        return (
            // <button onClick={() => this.changeStage('Users')}>Get Users</button>
            <Link to="/home/useraccess1">Get Users</Link>
        );
    }
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({ setStage, changeUrl }, dispatch);
}

export default connect(null, mapDispatchToProps)(Navigation);

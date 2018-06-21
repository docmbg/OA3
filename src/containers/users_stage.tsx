import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllUsers } from '../actions/get_users';
import { siteUrl } from '../consts';
import { updateDigest } from '../api/helperFunctions';

class AllUsers extends React.Component<any, any> {
    getUsers() {
        let that = this;
        Promise.resolve(updateDigest(siteUrl))
            .then(res => that.props.getAllUsers(res));
    }

    render() {
        return (
            <button onClick={() => this.getUsers()}>Get All Users </button>
        );
    }
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({ getAllUsers }, dispatch);
}

export default connect(null, mapDispatchToProps)(AllUsers);
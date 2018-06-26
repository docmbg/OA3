import * as React from 'react';
import { connect } from 'react-redux';
import Navigation from './navigation';

class AllUsers extends React.Component<any, any> {
    getUsers() {
        // call excel generation func with this.props.users;
    }

    render() {
        return (
            <div>
                <Navigation />
                <button onClick={() => this.getUsers()}>Get All Users </button>
            </div>
        );
    }
}

function mapStateToProps({ users }: any) {
    return {
        users
    };
}

export default connect(mapStateToProps)(AllUsers);
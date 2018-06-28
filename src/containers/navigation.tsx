import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setStage } from '../actions/setStage';
import { Link } from 'react-router-dom';
import { getAllUsers } from '../actions/get_users';
import { getAllGroups } from '../actions/get_groups';
import { getAllSites } from '../actions/get_sites';
import { siteUrl } from '../consts';
import { updateDigest } from '../api/helperFunctions';

class Navigation extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        let that = this;
        console.log('mounting navigation');
        if (this.props.sites.length === 0) {
            Promise.resolve(updateDigest(siteUrl))
                .then(res => {
                    that.props.getAllSites(res);
                    that.props.getAllGroups(res);
                    that.props.getAllUsers(res);
                });
        }
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
    return bindActionCreators({ setStage, getAllUsers, getAllGroups, getAllSites }, dispatch);
}

function mapStateToProps({ sites }: any) {
    return {
        sites
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);

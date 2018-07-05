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
import LinearLoader from '../components/loader';

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
            <div>
            {
                this.props.sites.length === 0 ?
                    <LinearLoader />
                    :
                    <div>
                        <Link to="/home/useraccess">Access Management</Link>
                        <Link to="/home/massdelete">Mass Delete</Link>
                        <Link to="/home/matrix">Permission Matrix</Link>
                        <Link to="/home/allusers">All Users</Link>
                        <Link to="/home/structure">SharePoint Structure</Link>
                        <Link to="/home/folders">Empty Folders</Link>
                        <Link to="/home/workflows">Workflows</Link>
                        <Link to="/home/lists">Lists Information</Link>
                    </div>
            }
            </div>
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

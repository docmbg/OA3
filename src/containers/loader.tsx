import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setStage } from '../actions/setStage';
import { getAllUsers } from '../actions/get_users';
import { getAllGroups } from '../actions/get_groups';
import { getAllSites } from '../actions/get_sites';
import { siteUrl } from '../consts';
import { updateDigest } from '../api/helperFunctions';

class Loader extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        let that = this;
        Promise.resolve(updateDigest(siteUrl))
            .then(res => {
                that.props.getAllSites(res);
                that.props.getAllGroups(res);
                that.props.getAllUsers(res);
            });
    }

    render() {
        return (
            <div/>
        );
    }
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({ setStage, getAllUsers, getAllGroups, getAllSites }, dispatch);
}

export default connect(null, mapDispatchToProps)(Loader);

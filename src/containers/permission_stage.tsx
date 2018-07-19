import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCurrentUser } from '../actions/set_current_user';
import { siteUrl } from '../consts';
import { updateDigest } from '../api/helperFunctions';
import SitesComponent from '../components/sites_component';
import CopyPermissions from '../containers/copy_permissions';

class UserAccess extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            value: ''
        };
    }

    onInputChange(e: any) {
        this.setState({
            value: e.target.value
        });
    }

    onFormSubmit(event: any) {
        let that = this;
        let value = this.state.value;
        let searchedUser = this.props.users.filter(
            (e: Object) => e[`Email`] === value || e[`Title`] === value)[0];

        Promise.resolve(updateDigest(siteUrl))
            .then(res => {
                console.log(res);
                that.props.setCurrentUser(res, searchedUser);
            });
    }

    render() {
        return (
            <div className="container">
                {this.props.users.length !== 0 ?
                    <div>
                        <div className="row">
                            <input
                                value={this.state.value}
                                onChange={(e) => this.onInputChange(e)}
                                placeholder="User Email/Login"
                            />
                            <button onClick={(e: any) => this.onFormSubmit(e)}>Search</button>
                            <div className="col s5">
                                <br />
                                <SitesComponent sites={this.props.sites} groups={this.props.groups} />
                            </div>
                        </div>

                        <div className="col s5 offset-s1" />
                        <ul>
                            {this.props.currentUserGroups.map((e: Object, i: number) => {
                                return <li key={i}>{e[`Title`]}</li>;
                            })}
                        </ul>
                        <CopyPermissions />
                    </div>
                    :
                    <div />
                }
            </div>
        );
    }
}

function mapStateToProps({ users, currentUserGroups, sites, groups }: any) {
    return {
        users,
        currentUserGroups,
        sites,
        groups
    };
}

function mapDispatchToPropos(dispatch: any) {
    return bindActionCreators({ setCurrentUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToPropos)(UserAccess);
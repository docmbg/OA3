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

    handleKeyPress(key: String) {
        if (key === 'Enter') {
            this.onFormSubmit();
        }

    }
    onFormSubmit() {
        let that = this;
        let value = this.state.value;
        let searchedUser = this.props.users.filter(
            (e: Object) => e[`Email`] === value || e[`Title`] === value)[0];

        Promise.resolve(updateDigest(siteUrl))
            .then(res => {
                console.log(res);
                that.props.setCurrentUser(res, searchedUser);
                that.setState({
                    value: searchedUser.Title
                });
            });
    }

    render() {
        return (
            <div className="container">
                {this.props.users.length !== 0 ?
                    <div>
                        <div className="row">
                            <div className="input-field col s5">
                                <i className="material-icons prefix">email</i>
                                <input
                                    id="icon_prefix"
                                    type="text"
                                    className="validate"
                                    value={this.state.value}
                                    onChange={(e) => this.onInputChange(e)}
                                    placeholder="User Email/Login"
                                    onKeyPress={(e) => this.handleKeyPress(e.key)}
                                />
                            </div>
                            <div className="col s1">
                                <div className="btn-flat" onClick={() => this.onFormSubmit()}>
                                    <span>Search</span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s5">
                                <br />
                                <SitesComponent sites={this.props.sites} groups={this.props.groups} />
                            </div>
                            <div className="col s5 offset-s2">
                                <div className="card white darken-1">
                                    <div className="card-content black-text">
                                        <span className="card-title">Current User Groups</span>                                      
                                            {this.props.currentUserGroups.map((e: Object, i: number) => {
                                                return <p key={i}>{e[`Title`]}</p>;
                                            })}                                      
                                    </div>
                                </div>
                            </div>
                        </div>
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
import * as React from 'react';
import Navigation from './navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { currentUserGroups } from '../actions/current_user_groups';
import { siteUrl } from '../consts';
import { updateDigest } from '../api/helperFunctions';

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
            (e: Object) => e[`Email`] === value || e[`Title`] === value)[0][`Id`];

        Promise.resolve(updateDigest(siteUrl))
            .then(res => {
                console.log(res);
                that.props.currentUserGroups(res, searchedUser);
            });
    }

    render() {
        return (
            <div className="container">
                <Navigation />
                <div className="row">
                    <input
                        value={this.state.value}
                        onChange={(e) => this.onInputChange(e)}
                        placeholder="User Email/Login"
                    />
                    <button onClick={(e: any) => this.onFormSubmit(e)}>Search</button>
                    <div className="col s5">
                        <br />
                        {/* <AddRemovePermissions/> */}
                    </div>
                </div>

                <div className="col s5 offset-s1">
                    <ul>
                        {this.props.searchedUserGroups.map((e: Object, i: number) => {
                            return <li key={i}>{e[`Title`]}</li>;
                        })}
                    </ul>
                </div>
                {/* <CopyPermissions/> */}
            </div>
        );
    }
}

function mapStateToProps({ users, searchedUserGroups }: any) {
    return {
        users,
        searchedUserGroups
    };
}

function mapDispatchToPropos(dispatch: any) {
    return bindActionCreators({ currentUserGroups }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToPropos)(UserAccess);
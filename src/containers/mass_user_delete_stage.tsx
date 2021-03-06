import * as React from 'react';
import Papa from 'papaparse';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteUsers } from '../actions/delete_users';
import { siteUrl } from '../consts';
import { updateDigest } from '../api/helperFunctions';
import LinearLoader from '../components/loader';

class MassUserDeleteStage extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            valid: [],
            invalid: [],
            loaded: true
        };
    }

    onReadyClick() {
        this.props.generateWorkflows(null);
    }

    onButtonClick() {
        const that = this;
        that.setState({
            loaded: false
        });
        Promise.resolve(updateDigest(siteUrl)).then(
            res => {
                that.props.deleteUsers(
                    that.state.valid,
                    res
                );
            }
        );
    }

    onFileUpload(e: any) {
        const file = e[0];
        const that = this;
        that.setState({
            loaded: false
        });

        Papa.parse(file, {
            complete: function (results: any) {
                let validPh: any = [];
                let invalidPh: any = [];
                let data: Array<string> = [].concat(...results.data);
                data.pop();
                let match;
                for (let userForRemoval of data) {
                    match = false;
                    for (let userOnPlatform of that.props.users) {
                        if (userOnPlatform.Email === userForRemoval && userOnPlatform.Groups.results.length > 0) {
                            validPh.push(userOnPlatform);
                            match = true;
                            break;
                        }
                    }
                    if (!match) {
                        invalidPh.push(userForRemoval);
                    }
                }

                that.setState({
                    valid: validPh,
                    invalid: invalidPh
                });
            }
        });
    }

    render() {
        let storeInfoReady = this.props.deletedUsers.usersLeft > 0;
        const that = this;
        let valid = that.state.valid;
        let invalid = that.state.invalid;
        return (
            <div className="container">
                <div className="row">
                    <form action="#">
                        <div className="file-field input-field">
                            <div className="btn">
                                <span>File</span>
                                <input type="file" onChange={(e) => this.onFileUpload(e.target.files)}/>
                            </div>
                            <div className="file-path-wrapper">
                                <input className="file-path validate" type="text" />
                            </div>
                        </div>
                    </form>
                </div>
                <div className="row">
                    <div className="col s5">
                        <h5>Valid Users</h5>
                        {
                            valid.length > 0 ?
                                <div>
                                    {
                                        !storeInfoReady ?
                                            this.props.deletedUsers.loading ?
                                                <LinearLoader /> :
                                                <div>
                                                    {valid.map((e: any, i: number) => <p key={i}>{e.Title}</p>)}
                                                    <button onClick={() => this.onButtonClick()}>Delete Users</button>
                                                </div>
                                            :
                                            <div className="ready" onClick={() => this.onReadyClick()}>
                                                <li><i className="material-icons">done</i></li>
                                                <span>Ready</span>
                                            </div>

                                    }
                                </div>
                                :
                                <div />

                        }
                    </div>
                    <div className="col s5 offset-s1">
                        <h5>Invalid users</h5>
                        {invalid.length > 0 ?
                            invalid.map((e: any, i: number) => <p key={i}>{e}</p>)
                            :
                            <div />
                        }
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ users, deletedUsers }: any) {
    return {
        users,
        deletedUsers
    };
}

function mapDispatchToPorps(dispatch: any) {
    return bindActionCreators({ deleteUsers }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToPorps)(MassUserDeleteStage);
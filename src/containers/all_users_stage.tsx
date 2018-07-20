import * as React from 'react';
import { connect } from 'react-redux';
import { generateExcelUsers } from '../api/generate_users_excel';

class AllUsersStage extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            loaded: true,
        };
    }

    onReadyClick() {
        this.setState({
            loaded: true,
        });
    }

    onButtonClick() {
        this.setState({
            loaded: false,
        });
    }

    render() {
        return (
            <div className="container">
                {this.props.users.length !== 0 ?
                    this.state.loaded ?
                        <div>
                            <div onClick={() => generateExcelUsers(this.props.users)}>
                                <i className="material-icons">save_alt</i>
                                <div onClick={() => this.onButtonClick()}>
                                    <a className="waves-effect waves-black btn">
                                        Get all users
                                        <i className="material-icons">save_alt</i>
                                    </a>
                                </div>
                            </div>
                        </div> :
                        <div className="ready" onClick={() => this.onReadyClick()}>
                            <li><i className="material-icons">done</i></li>
                            <span>Ready</span>
                        </div>
                    :
                    <div />

                }

            </div>
        );
    }
}

function mapStateToProps({ users }: any) {
    return {
        users,
    };
}

export default connect(mapStateToProps, null)(AllUsersStage);
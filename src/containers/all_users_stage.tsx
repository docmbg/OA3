import * as React from 'react';
import { connect } from 'react-redux';
import Navigation from '../containers/navigation';
import { generateExcelUsers } from '../api/generate_users_excel';

class AllUsersStage extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            loaded: true,
        };
    }

    render() {
        return (
            <div className="container">
                {this.props.users.length === 0 ?
                    (<Navigation />)
                    :
                    (
                        <div>
                            <Navigation />
                            <div onClick={() => generateExcelUsers(this.props.users)}>
                                <i className="material-icons">save_alt</i>
                                <button> Get all users </button>
                            </div>
                        </div>
                    )
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
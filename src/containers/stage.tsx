import * as React from 'react';
import { connect } from 'react-redux';
import AllUsers from './users_stage';

class Stage extends React.Component<any, any> {
    render() {
        let currentStage;
        switch (this.props.stage) {
            case 'Users':
                currentStage = <AllUsers />;
                break;
            default:
                currentStage = <div />;
        }
        console.log(this.props.stage);
        if (!this.props.stage) {
            return (
                <div>No Active Stage</div>
            );
        }
        return (
            <div>
                <div> Current Active Stage is: {this.props.stage}</div>
                {this.props.users.map((e: Object) => <p key={e[`Email`]}>{e[`Email`]}</p>)}
                {
                    currentStage
                }
            </div>
        );
    }
}

function mapStateToProps({ stage, users }: any) {
    return {
        stage,
        users
    };
}

export default connect(mapStateToProps)(Stage);
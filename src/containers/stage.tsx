import * as React from 'react';
import { connect } from 'react-redux';

class Stage extends React.Component<any, any> {
    render() {
        if (!this.props.stage) {
            return (
                <div>No Active Stage</div>
            );
        }
        return (
            <div> Current Active Stage: {this.props.stage}</div>
        );
    }
}

function mapStateToProps({ stage }: any) {
    return {
        stage
    };
}

export default connect(mapStateToProps)(Stage);
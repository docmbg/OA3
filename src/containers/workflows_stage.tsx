import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { generateWorkflows } from '../actions/generate_workflows';
import { siteUrl } from '../consts';
import { updateDigest } from '../api/helperFunctions';
import LinearLoader from '../components/loader';

class WorkflowsStage extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    onReadyClick() {
        this.props.generateWorkflows(null);
    }

    onButtonClick() {
        let that = this;
        Promise.resolve(updateDigest(siteUrl)).then(
            res => {
                that.props.generateWorkflows(
                    res,
                    that.props.sites,
                );
            }
        );
    }

    render() {
        let storeInfoReady = this.props.workflows.hasOwnProperty('data');
        return (
            <div className="container">
                {this.props.users.length !== 0 ?
                    (
                        <div>
                            {!storeInfoReady ?
                                this.props.workflows.loading ?
                                    <LinearLoader /> :
                                    <div onClick={() => this.onButtonClick()}>
                                        <a className="waves-effect waves-black btn">
                                            <p className="download">
                                                GENERATE WORKFLOWS
                                            <i className="material-icons">save_alt</i>
                                            </p>
                                        </a>
                                    </div>
                                :
                                <div className="ready" onClick={() => this.onReadyClick()}>
                                    <li><i className="material-icons">done</i></li>
                                    <span>Ready</span>
                                </div>

                            }
                        </div>
                    )
                    :
                    <div />
                }
            </div>
        );
    }
}

function mapStateToProps({ workflows, sites, users }: any) {
    return {
        workflows,
        sites,
        users
    };
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({ generateWorkflows }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkflowsStage);
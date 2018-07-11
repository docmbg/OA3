import * as React from 'react';
import { connect } from 'react-redux';
import Navigation from '../containers/navigation';
import { generateExcelWorkflows } from '../api/generate_workflows_excel';
import { bindActionCreators } from 'redux';
import { generateWorkflows } from '../actions/generate_workflows';
import { siteUrl } from '../consts';
import { updateDigest } from '../api/helperFunctions';
import LinearLoader from '../components/loader';

class WorkflowsStage extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            loaded: true,
        };
    }

    onButtonClick() {
        let that = this;
        Promise.resolve(updateDigest(siteUrl)).then(
            res => {
                that.props.generateWorkflows(
                    res,
                    that.props.sites,
                );
                that.setState({
                    loaded: false,
                });
            }
        );
    }

    render() {
        let loaded = this.state.loaded || this.props.workflows.length > 0;
        if (this.props.workflows.length !== 0) {
            generateExcelWorkflows(this.props.workflows);
        }
        return (
            <div className="container">
                <div>
                    <Navigation />
                    {
                        loaded ?
                            <div onClick={() => this.onButtonClick()}>
                                <i className="material-icons">save_alt</i>
                                <button> Generate Worfklows </button>
                            </div>
                            :
                            <LinearLoader />
                    }

                </div>

            </div>
        );
    }
}

function mapStateToProps({ workflows, sites }: any) {
    return {
        workflows,
        sites
    };
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({ generateWorkflows }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkflowsStage);
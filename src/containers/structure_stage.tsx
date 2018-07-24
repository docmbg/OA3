import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { generateStructure } from '../actions/generate_structure';
import { updateDigest } from '../api/helperFunctions';
import LinearLoader from '../components/loader';
import { siteUrl, paramUrl } from '../consts';

class StructureStage extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            loaded: true,
        };
    }

    onReadyClick() {
        this.props.generateStructure(null);
    }

    onButtonClick() {
        let that = this;
        Promise.resolve(updateDigest(siteUrl)).then(
            res => {
                that.props.generateStructure(res, that.props.sites, paramUrl);
                that.setState({
                    loaded: false,
                });
            }
        );

    }

    render() {
        let storeInfoReady = this.props.structure.hasOwnProperty('data');
        if (storeInfoReady) {
            let currentWindow: any = window.location.href.split('/');
            currentWindow.pop();
            currentWindow = currentWindow.join('/');
            window.open(`${currentWindow}/structure_page`);
            localStorage.setItem('sites', JSON.stringify(this.props.structure.data));
        }
        return (
            <div>
                {this.props.users.length !== 0 ?
                    (
                        <div>
                            {!storeInfoReady ?
                                this.props.structure.loading ?
                                    <LinearLoader /> :
                                    <div onClick={() => this.onButtonClick()}>
                                        <a className="waves-effect waves-black btn">
                                            <p className="download">
                                                GENERATE STRUCTURE
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

function mapStateToProps({ structure, sites, users }: any) {
    return {
        structure,
        sites,
        users,
    };
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({ generateStructure }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StructureStage);
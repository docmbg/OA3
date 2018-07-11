import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { generateStructure } from '../actions/generate_structure';
import { updateDigest } from '../api/helperFunctions';
import LinearLoader from '../components/loader';
import Navigation from '../containers/navigation';
import { siteUrl, paramUrl } from '../consts';

class StructureStage extends React.Component<any, any> {
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
                that.props.generateStructure(res, that.props.sites, paramUrl);
                that.setState({
                    loaded: false,
                });
            }
        );

    }

    render() {
        let loaded = this.state.loaded || this.props.structure.length > 0;
        if (this.props.structure.length > 0) {
            let currentWindow: any = window.location.href.split('/');
            currentWindow.pop();
            currentWindow = currentWindow.join('/');
            window.open(`${currentWindow}/structure_page`);
            localStorage.setItem('sites', JSON.stringify(this.props.structure));
        }
        return (
            <div>
                {this.props.sites.length === 0 ?
                    (<Navigation />)
                    :
                    loaded ?
                        <div>
                            <Navigation />
                            <div>
                                <button onClick={() => this.onButtonClick()}>Get structure</button>
                            </div>
                        </div>
                        :
                        <LinearLoader />
                }

            </div>
        );

    }
}

function mapStateToProps({ structure, sites }: any) {
    return {
        structure,
        sites
    };
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({ generateStructure }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StructureStage);
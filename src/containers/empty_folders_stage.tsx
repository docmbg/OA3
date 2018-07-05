import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { generateEmptyFolders } from '../actions/generate_empty_folders';
import { siteUrl } from '../consts';
import { updateDigest } from '../api/helperFunctions';
import Navigation from '../containers/navigation';
import LinearLoader from '../components/loader';
import { generateEmptyFoldersExcel } from '../api/generate_empty_folders_excel';

class EmptyFolderStage extends React.Component<any, any> {
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
                that.props.generateEmptyFolders(
                    res,
                    that.props.sites,
                    this.props.users
                );
                that.setState({
                    loaded: false,
                });
            }
        );
    }

    render() {
        let loaded = this.state.loaded || this.props.emptyFolders.length !== 0;
        if (this.props.emptyFolders.length !== 0) {
            generateEmptyFoldersExcel(this.props.emptyFolders);
        }
        return (
            <div className="container">
                {this.props.sites.length === 0 ?
                    (<Navigation />)
                    :
                    (
                        <div>
                            <Navigation />
                            {
                                loaded ?
                                    <div onClick={() => this.onButtonClick()}>
                                        <i className="material-icons">save_alt</i>
                                        <button> Get empty folders </button>
                                    </div>
                                    :
                                    <LinearLoader />
                            }

                        </div>
                    )
                }

            </div>
        );
    }
}

function mapStateToProps({ sites, emptyFolders, users }: any) {
    return {
        sites,
        emptyFolders,
        users
    };
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({ generateEmptyFolders }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EmptyFolderStage);
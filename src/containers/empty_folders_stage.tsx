import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { generateEmptyFolders } from '../actions/generate_empty_folders';
import { deleteEmptyFolders } from '../actions/delete_empty_folders';
import { siteUrl } from '../consts';
import { updateDigest } from '../api/helperFunctions';
import LinearLoader from '../components/loader';
import Papa from 'papaparse';

class EmptyFolderStage extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            urls: [],
            action: '',
        };
    }

    onReadyClick() {
        // depending on state action call one or the other
        this.state.action === 'get' ? this.props.generateEmptyFolders(null) : this.props.deleteEmptyFolders(null);
        this.setState({
            action: '',
        });
    }

    onGetButtonClick() {
        let that = this;
        Promise.resolve(updateDigest(siteUrl)).then(
            res => {
                that.props.generateEmptyFolders(
                    res,
                    this.props.sites,
                    this.props.users
                );
                that.setState({
                    action: 'get'
                });
            }
        );
    }

    onDeleteButtonClick() {
        let that = this;
        Promise.resolve(updateDigest(siteUrl)).then(
            res => {
                that.props.deleteEmptyFolders(
                    res,
                    that.state.urls,
                );
                that.setState({
                    action: 'delete'
                });
            }
        );
    }

    onFileUpload(e: any) {
        const file = e[0];
        const that = this;
        Papa.parse(file, {
            header: true,
            complete: function (results: any) {
                results.data.pop();
                const urls = results.data.map((entry: any) => entry.URL);
                that.setState({
                    urls,
                });
            }
        });
    }

    render() {
        let currentAction = this.state.action;
        let storeInfoReady = (this.props.emptyFolders.hasOwnProperty('data') !== 0 && currentAction === 'delete')
            || (this.props.foldersDeleted.hasOwnProperty('data') && currentAction === 'get');
        return (
            <div className="container">
                {this.props.users.length !== 0 ?

                    <div>
                        {
                            !storeInfoReady ?
                                <div>
                                    {this.props.emptyFolders.loading || this.props.foldersDeleted.loading ?
                                        <LinearLoader /> :
                                        <div>
                                            <div className="row">
                                                <div onClick={() => this.onGetButtonClick()}>
                                                    <a className="waves-effect waves-black btn">
                                                        <p className="download">
                                                            GET EMPTY FOLDERS
                                                            <i className="material-icons">save_alt</i>
                                                        </p>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <form action="#">
                                                    <div className="file-field input-field col s4 offset-s4">
                                                        <div className="btn">
                                                            <span>File</span>
                                                            <input
                                                                onChange={(e) => this.onFileUpload(e.target.files)}
                                                                type="file"
                                                                placeholder="Upload CSV"
                                                            />
                                                        </div>
                                                        <div className="file-path-wrapper">
                                                            <input className="file-path validate" type="text" />
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            {this.state.urls.length === 0 ?
                                                <button
                                                    disabled={true}
                                                    className="btn-flat"
                                                    onClick={
                                                        () => this.onDeleteButtonClick()
                                                    }
                                                >
                                                    Delete Empty Folders
                                                </button>
                                                :
                                                !this.props.foldersDeleted.hasOwnProperty('data') ?
                                                    <button
                                                        className="btn-flat"
                                                        onClick={
                                                            () => this.onDeleteButtonClick()
                                                        }
                                                    >
                                                        Delete Empty Folders
                                                    </button>
                                                    :
                                                    <div />
                                            }
                                        </div>
                                    }
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
        );
    }
}

function mapStateToProps({ sites, emptyFolders, users, foldersDeleted }: any) {
    return {
        sites,
        emptyFolders,
        users,
        foldersDeleted
    };
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({ generateEmptyFolders, deleteEmptyFolders }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EmptyFolderStage);
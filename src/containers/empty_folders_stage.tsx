import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { generateEmptyFolders } from '../actions/generate_empty_folders';
import { deleteEmptyFolders } from '../actions/delete_empty_folders';
import { siteUrl } from '../consts';
import { updateDigest } from '../api/helperFunctions';
import Navigation from '../containers/navigation';
import LinearLoader from '../components/loader';
import { generateEmptyFoldersExcel } from '../api/generate_empty_folders_excel';
import Papa from 'papaparse';

class EmptyFolderStage extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            loaded: true,
            urls: [],
            action: '',
        };
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
                    loaded: false,
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
                    loaded: false,
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
        let loaded = this.state.loaded || this.props.emptyFolders.length !== 0 || this.props.foldersDeleted;
        if (this.props.emptyFolders.length !== 0 && this.state.action === 'get') {
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
                                    <div>
                                        <i className="material-icons">save_alt</i>
                                        <button onClick={() => this.onGetButtonClick()}> Get empty folders </button>
                                        <input onChange={(e) => this.onFileUpload(e.target.files)} type="file" />
                                        {
                                            this.state.urls.length === 0 ?
                                                <div />
                                                :
                                                !this.props.foldersDeleted ?
                                                    <button
                                                        onClick={
                                                            () => this.onDeleteButtonClick()
                                                        }
                                                    >
                                                        Delete Empty Folders
                                                    </button> :
                                                    <p>Folders  successfully Deleted</p>
                                        }

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
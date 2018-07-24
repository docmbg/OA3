import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { generateListsInformation } from '../actions/generate_lists_information';
import { siteUrl } from '../consts';
import { updateDigest } from '../api/helperFunctions';
import LinearLoader from '../components/loader';

class ListsInformationStage extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    onReadyClick() {
        this.props.generateListsInformation(null);
    }

    onButtonClick() {
        let that = this;
        Promise.resolve(updateDigest(siteUrl)).then(
            res => {
                that.props.generateListsInformation(
                    res,
                    that.props.sites,
                );
            }
        );
    }

    render() {
        let storeInfoReady = this.props.lists.hasOwnProperty('data');
        return (
            <div className="container">
                {this.props.users.length !== 0 ?
                    (
                        <div>
                            {!storeInfoReady ?
                                this.props.lists.loading ?
                                    <LinearLoader /> :
                                    <div onClick={() => this.onButtonClick()}>
                                        <a className="waves-effect waves-black btn">
                                            <p className="download">
                                                GENERATE LISTS INFORMATION
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

function mapStateToProps({ lists, users, sites }: any) {
    return {
        lists,
        users,
        sites
    };
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({ generateListsInformation }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ListsInformationStage);
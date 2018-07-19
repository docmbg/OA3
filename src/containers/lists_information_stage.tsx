import * as React from 'react';
import { connect } from 'react-redux';
import Navigation from '../containers/navigation';
import { generateExcelListsInformation } from '../api/generate_lists_excel';
import { bindActionCreators } from 'redux';
import { generateListsInformation } from '../actions/generate_lists_information';
import { siteUrl } from '../consts';
import { updateDigest } from '../api/helperFunctions';
import LinearLoader from '../components/loader';

class ListsInformationStage extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            displayLoader: false,
        };
    }

    onReadyClick() {
        this.setState({
            displayLoader: false,
        });
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
                that.setState({
                    displayLoader: true,
                });
            }
        );
    }

    render() {
        let storeInfoReady = this.props.lists.length > 0;
        if (storeInfoReady) {
            generateExcelListsInformation(this.props.lists);
        }
        return (
            <div className="container">
                    <Navigation />
                {this.props.users.length !== 0 ?
                    (
                        <div>
                            {!storeInfoReady ?
                                this.state.displayLoader ?
                                    <LinearLoader /> :
                            <div onClick={() => this.onButtonClick()}>
                                <i className="material-icons">save_alt</i>
                                <button> Generate Lists Information </button>
                            </div>
                            :
                                <div onClick={() => this.onReadyClick()}>Ready</div> :

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

function mapStateToProps({ lists, sites }: any) {
    return {
        lists,
        sites
    };
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({ generateListsInformation }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ListsInformationStage);
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
            loaded: true,
        };
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
                    loaded: false,
                });
            }
        );
    }

    render() {
        let loaded = this.state.loaded || this.props.lists.length > 0;
        if (this.props.lists.length !== 0) {
            generateExcelListsInformation(this.props.lists);
        }
        return (
            <div className="container">
                <div>
                    <Navigation />
                    {
                        loaded ?
                            <div onClick={() => this.onButtonClick()}>
                                <i className="material-icons">save_alt</i>
                                <button> Generate Lists Information </button>
                            </div>
                            :
                            <LinearLoader />
                    }

                </div>

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
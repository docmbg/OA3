import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { generateMatrix } from '../actions/generate_matrix';
import { siteUrl } from '../consts';
import { updateDigest } from '../api/helperFunctions';
import Navigation from '../containers/navigation';
import LinearLoader from '../components/loader';
import { generateExcelMatrix } from '../api/generate_matrix_excel';

class Matrix extends React.Component<any, any> {
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
        this.props.generateMatrix(null);
    }

    onButtonClick() {
        let that = this;
        Promise.resolve(updateDigest(siteUrl)).then(
            res => {
                that.props.generateMatrix(
                    res,
                    that.props.sites,
                    that.props.groups
                );
                that.setState({
                    displayLoader: true,
                });
            }
        );
    }

    render() {
        let storeInfoReady = this.props.matrix.hasOwnProperty('lists');
        if (storeInfoReady) {
            generateExcelMatrix(this.props.matrix);
        }
        return (
            <div className="container">
                <Navigation />
                {this.props.sites.length !== 0 ?
                    (
                        <div>
                            {!storeInfoReady ?

                                storeInfoReady || this.state.displayLoader ?
                                    <LinearLoader /> :
                                    <div onClick={() => this.onButtonClick()}>
                                        <i className="material-icons">save_alt</i>
                                        <button> Download matrix </button>
                                    </div>
                                :
                                storeInfoReady && this.state.displayLoader ?
                                    <div onClick={() => this.onReadyClick()}>Ready</div> :
                                    <div />
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

function mapStateToProps({ sites, groups, matrix }: any) {
    return {
        sites,
        groups,
        matrix
    };
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({ generateMatrix }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Matrix);
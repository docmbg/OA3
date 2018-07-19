import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { generateMatrix } from '../actions/generate_matrix';
import { siteUrl } from '../consts';
import { updateDigest } from '../api/helperFunctions';
import LinearLoader from '../components/loader';

class MatrixStage extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    onReadyClick() {
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
            }
        );
    }

    render() {
        let storeInfoReady = this.props.matrix.hasOwnProperty('data');
        return (
            <div className="container">
                {this.props.users.length !== 0 ?
                    (
                        <div>
                            {!storeInfoReady ?
                                this.props.matrix.loading ?
                                    <LinearLoader /> :
                                    <div onClick={() => this.onButtonClick()}>
                                        <a className="waves-effect waves-light btn"> 
                                            Download matrix 
                                            <i className="material-icons">save_alt</i> 
                                        </a>
                                    </div>
                                :
                                <div onClick={() => this.onReadyClick()}>Ready</div>
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

function mapStateToProps({ sites, groups, matrix, users }: any) {
    return {
        sites,
        groups,
        matrix,
        users
    };
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({ generateMatrix }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MatrixStage);
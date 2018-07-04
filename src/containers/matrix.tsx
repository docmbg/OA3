import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { generateMatrix } from '../actions/generate_matrix';
import { siteUrl } from '../consts';
import { updateDigest } from '../api/helperFunctions';
import Navigation from '../containers/navigation';
import LinearLoader from '../components/loader';
import { generateExcelMatrix } from '../api/generate_matrix_Excel';

class Matrix extends React.Component<any, any> {
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
                that.props.generateMatrix(
                    res,
                    that.props.sites,
                    that.props.groups
                );
                that.setState({
                    loaded: false,
                });
            }
        );
    }

    render() {
        let loaded = this.state.loaded || this.props.matrix.hasOwnProperty('lists');
        if (this.props.matrix.hasOwnProperty('lists')) {
            console.log(this.props.matrix);
            generateExcelMatrix(this.props.matrix);
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
                                        <button> Download matrix </button>
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
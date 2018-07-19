import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setStage } from '../actions/setStage';
import { getAllUsers } from '../actions/get_users';
import { getAllGroups } from '../actions/get_groups';
import { getAllSites } from '../actions/get_sites';
import stages from '../api/stages';
import top_banner from '../assets/top_banner.svg';
// import { siteUrl } from '../consts';
// import { updateDigest } from '../api/helperFunctions';
// import LinearLoader from '../components/loader';

class Navigation extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            cakeClass: 'material-icons animated bounce'
        };
    }

    // componentDidMount() {
    //     let that = this;
    //     console.log('mounting navigation');
    //     if (this.props.sites.length === 0) {
    //         Promise.resolve(updateDigest(siteUrl))
    //             .then(res => {
    //                 that.props.getAllSites(res);
    //                 that.props.getAllGroups(res);
    //                 that.props.getAllUsers(res);
    //             });
    //     }
    // }

    componentDidMount() {
        let that = this;
        const cakeInterval: any = setInterval(
            () => {
                that.setState({
                    cakeClass: that.state.cakeClass === 'material-icons animated bounce' ?
                        'material-icons' : 'material-icons animated bounce'
                });
                if (that.state.cakeClass === '') {
                    clearInterval(cakeInterval);
                }
            },
            3000
        );
    }

    changeStage(data: string) {
        this.props.setStage(data);
    }

    render() {
        return (
            <div>

                <img className="topBanner" src={top_banner} />
                <div className="title">
                    <h4> ONE ACCESS V3 <i className={this.state.cakeClass}>cake</i>
                    </h4>

                </div>
                <div className="valign-wrapper stage z-depth-1">

                    <div className="container">
                        {
                            // this.props.sites.length === 0 ?
                            // <LinearLoader />
                            // :
                            <div className="row">
                                <ul>
                                    {
                                        Object.keys(stages).map((e: any) => {
                                            if (e !== 'structurePage') {
                                                return (
                                                    <li><a
                                                        className="tooltipped"
                                                        data-position="bottom"
                                                        data-delay="50"
                                                        data-tooltip={stages[e][`tooltip`]}
                                                        onClick={() => this.changeStage(e)}
                                                        key={e}
                                                    >
                                                        {stages[e][`icon`]}
                                                    </a></li>
                                                );
                                            } else {
                                                return;
                                            }
                                        })
                                    }
                                </ul>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

function mapDispatchhrefProps(dispatch: any) {
    return bindActionCreators({ setStage, getAllUsers, getAllGroups, getAllSites }, dispatch);
}

function mapStatehrefProps({ sites }: any) {
    return {
        sites
    };
}

export default connect(mapStatehrefProps, mapDispatchhrefProps)(Navigation);

import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setStage } from '../actions/setStage';
import { getAllUsers } from '../actions/get_users';
import { getAllGroups } from '../actions/get_groups';
import { getAllSites } from '../actions/get_sites';
import stages from '../api/stages';
import top_banner from '../assets/top_banner.svg';
import Modal from '@material-ui/core/Modal';

// import { siteUrl } from '../consts';
// import { updateDigest } from '../api/helperFunctions';
// import LinearLoader from '../components/loader';

class Navigation extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            modalStatus: false,
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

    handleModal(term: boolean) {
        this.setState({
            modalStatus: term,
        });
    }

    changeStage(data: string) {
        this.props.setStage(data);
    }

    render() {
        return (
            <div>
                <img className="topBanner" src={top_banner} />
                <div className="title">
                    <h4> ONE ACCESS v3 
                        <i onClick={() => this.handleModal(true)} className="material-icons animated bounce">cake</i>
                    </h4>

                </div>
                
                <div className="valign-wrapper stage">
                    <Modal 
                        open={this.state.modalStatus}
                        onClose={() => this.handleModal(false)}
                    >
                        <p>Hello Modal</p>
                    </Modal>
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
                                                    <li
                                                        className="tooltipped 
                                                        waves-effect waves-yellow waves-ripple"
                                                        data-position="bottom"
                                                        data-delay="50"
                                                        data-tooltip={stages[e][`tooltip`]}
                                                    >
                                                        <a
                                                            onClick={() => this.changeStage(e)}
                                                            key={e}
                                                        >
                                                            {stages[e][`icon`]}
                                                        </a>
                                                    </li>
                                                );
                                            } else {
                                                return;
                                            }
                                        })
                                    }
                                </ul>
                            </div>
                        }
                        <div >
                            <a className="waves-effect waves-black btn"> 
                                <p>Download matrix  <i className="material-icons">save_alt</i></p>
                            </a>
                        </div>
                        <div className="ready">
                            <li><i className="material-icons">done</i></li>
                            <span>Ready</span>
                        </div>

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

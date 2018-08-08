import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setStage } from '../actions/setStage';
import { getAllUsers } from '../actions/get_users';
import { getAllGroups } from '../actions/get_groups';
import { getAllSites } from '../actions/get_sites';
import stages from '../api/stages';
import top_banner from '../assets/top_banner.svg';
import { Modal } from 'react-materialize';
import LinearLoader from '../components/loader';
import { currentUserHasBirthday, peopleWithBirthdays, updateDigest } from '../api/helperFunctions';
import { readOptions, siteUrl } from '../consts';
import birthdayPic from '../assets/bdlogo.jpg';

class Navigation extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            modalStatus: false,
            birthdayNames: '',
            userBirthday: false,
        };
    }

    componentDidMount() {
        let that = this;
        console.log('mounting navigation');
        if (this.props.sites.length === 0) {
            Promise.resolve(updateDigest(siteUrl))
                .then(res => {
                    
                    that.props.getAllSites(res);
                    that.props.getAllGroups(res);
                    that.props.getAllUsers(res);
                    Promise.resolve(peopleWithBirthdays( readOptions )).then( birthdays => {
                        Promise.resolve(currentUserHasBirthday(siteUrl, birthdays, readOptions)).then(userBirthday => {
                            const birthdayNames = birthdays.map( (e: any) => e[`Title`]).join(', ');
                            that.setState({
                                birthdayNames,
                                userBirthday
                            });
                        });
                    });
                });
        }
        
    }

    // handleModal(term: boolean) {
    //     this.setState({
    //         modalStatus: term,
    //     });
    // }

    changeStage(data: string) {
        this.props.setStage(data);
    }

    render() {
        return (
            <div> 
            {this.props.sites.length === 0 ?
                <LinearLoader /> 
                :
                <div>
                    {this.state.userBirthday ?
                        <Modal
                                open={true}
                        >
                            <p>
                                <img src={birthdayPic}/>
                                <p>HAPPY BIRTHDAY!</p>
                                <p>Best wishes from Tech Team</p>
                            </p>
                        </Modal>
                        :
                        <div/>
                    }
                    <img className="topBanner" src={top_banner} />
                    <div className="title">
                        <h4> ONE ACCESS v3 
                        <Modal
                            header={
                            <img 
                                src=""
                            />
                            }
                            trigger={<i className="material-icons animated bounce">cake</i>}
                        >
                        <p>
                            <img src={birthdayPic}/>
                            <p>Happy birthday to {this.state.birthdayNames}!</p>
                            <p>Best wishes from Tech Team</p>
                        </p>
                        </Modal>
                        
                        </h4>

                    </div>
                    
                    <div className="valign-wrapper topNavigation">
                    
                        <div className="container">
                            {
                            
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
                            
                        </div>
                    
                    </div>
                    </div>
                }
            </div>
        );
    }
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({ setStage, getAllUsers, getAllGroups, getAllSites }, dispatch);
}

function mapStateToProps({ sites }: any) {
    return {
        sites
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);

import * as React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import email from '../assets/email.JPG';
import addRemove from '../assets/addremove.JPG';
import usergroups from '../assets/usergroups.JPG';
import copy from '../assets/copy.JPG';
import pastecancel from '../assets/pastecancel.JPG';
import structure from '../assets/structure.JPG';
import users from '../assets/users.JPG';
import removeusers from '../assets/removeusers.JPG';

export default class InstructionsPage extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            expanded: null,
        };
    }

    handleChange(panel: string) {
        const currentPanel = this.state.expanded;
        this.setState({
            expanded: currentPanel === panel ? null : panel
        });
    }

    render() {
        const expanded = this.state.expanded;
        return (
            <div className="container">

                <ExpansionPanel expanded={expanded === 'panel1'} onChange={() => this.handleChange('panel1')}>
                    <ExpansionPanelSummary expandIcon={<i className="material-icons">keyboard_arrow_down</i>}>
                        <Typography ><p className="siteTitle">Access Management</p></Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                        <div className="row">
                                <div className="col s6">
                                    1. Enter user's email and press 'Enter'. If recognized, the user's name will appear. 
                                    It works with one at a time only.
                                </div>
                                <div className="col s6">
                                    <img src={email}/>
                                </div>

                        </div>
                        <div className="row">
                                <div className="col s6">
                                    2. Current user's groups will appear in the right box. 
                                </div>
                                <div className="col s4">
                                    <img src={usergroups}/>
                                </div>

                        </div>
                        <div className="row">
                                <div className="col s6">
                                    3. Add and remove user's permission from the Sites & Groups menu. 
                                    There might be a little lag while using these functionalities.
                                </div>
                                <div className="col s4">
                                    <img src={addRemove}/>
                                </div>

                        </div>
                        <div className="row">
                            <div className="col s6">
                                4. How to copy permissions: first enter the user whose permissions need to be copied. 
                                Click on the Copy/Paste button. 
                                Then enter the user you need to grand the permissions and hover over the Copy/Paste button and 
                                click the blue confirmation.
                                Note that the permissions will stay copied in the background and you can paste multiple times. 
                                To clear them just hold your mouse on the Copy/Paste button and click the 'X' that will appear.
                            </div>
                            <div className="col s1">
                                <img src={copy}/>
                            </div>
                            <div className="col s1">
                                    <img src={pastecancel}/>
                                </div>

                        </div>
                    </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={expanded === 'panel2'} onChange={() => this.handleChange('panel2')}>
                    <ExpansionPanelSummary expandIcon={<i className="material-icons">keyboard_arrow_down</i>}>
                        <Typography ><p className="siteTitle">Mass Delete</p></Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            <div className="row">
                                <div className="col s6">
                                    1. Create an excel file containing the emails of the users that need to be removed from the SharePoint.
                                    Save the file in .csv format (Comma Delimited). Please note that ONLY ONE upload is allowed
                                    per session, so if you need to upload new file just refresh the page.
                                </div>
                                <div className="col s3">
                                    <img src={users}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s6">
                                2. Emails that are recognized as valid will appear on the left, the rest in the right box. 
                                Use the delete icon to remove users that you do NOT wish to delete. For invalid emails will
                                 be considered inactive, wrong or missing(empty line) emails.
                                </div>
                                <div className="col s3">
                                    <img src={removeusers}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s6">
                                3. Click `Delete Users` to start the deleting process. 
                                Contact the <a href="mailto:document.management.tech@dxc.com"> technical team</a> 
                                if there is a big number of users that cannot be deleted.
                                </div>
                                
                            </div>
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={expanded === 'panel3'} onChange={() => this.handleChange('panel3')}>
                    <ExpansionPanelSummary expandIcon={<i className="material-icons">keyboard_arrow_down</i>}>
                        <Typography ><p className="siteTitle">Permission Matrix</p></Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            <div className="row">
                                <div className="col s12">
                                    Should take around 1 min for the biggest sites and will automatically download an excel file on your PC.
                                    If the loading takes more than 5 min, contact the
                                     <a href="mailto:document.management.tech@hpe.com"> technical team</a>.
                                    Since the update, groups with special symbols are no longer missing from the generated matrix.
                                </div>
                            </div>
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={expanded === 'panel4'} onChange={() => this.handleChange('panel4')}>
                    <ExpansionPanelSummary expandIcon={<i className="material-icons">keyboard_arrow_down</i>}>
                        <Typography ><p className="siteTitle">All Users</p></Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            Generates an excel file with all users on the platform. Currently the PDL sheet is deprecated.
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={expanded === 'panel5'} onChange={() => this.handleChange('panel5')}>
                    <ExpansionPanelSummary expandIcon={<i className="material-icons">keyboard_arrow_down</i>}>
                        <Typography ><p className="siteTitle">SharePoint Structure</p></Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            <div className="row">
                                <div className="col s6">
                                    1. USE Chrome!!!
                                    Click 'Draw Structure' and a new window should open within 10-20 seconds.
                                    If the window does not appear, check the upper right corner of your browser for a popup blocker.
                                    If there is, click it, select 'Allow...' and click the url.
                                </div>
                                <div className="col s3">
                                    <img src={structure} />
                                </div>
                            </div>
                            <div className="row">
                                2. Click the 'Draw' button to get the structure with the default properties.
                                Hold 'Ctrl' and sctoll with the mouse to zoom in/out.
                                Click on the text inside a box and it will become dragable.
                                 Do\uble click on the text and you will be able to make changes.
                                 Click on the border of a box and you will have the option to create new connections between the boxes.
                                 Use 'Ctrl' + 'Z' for undo.
                           </div>
                            <div className="row">
                                3. To donwload the structure simply click 'Get PNG'.
                            </div>
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={expanded === 'panel6'} onChange={() => this.handleChange('panel6')}>
                    <ExpansionPanelSummary expandIcon={<i className="material-icons">keyboard_arrow_down</i>}>
                        <Typography ><p className="siteTitle">Empty Folders</p></Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            <div className="row">
                                <div className="col s12">
                                    Generates an excel file containing all the empty folders on the SharePoint.
                                    To delete empty folders, please create upload a .csv format of the downloaded excel file. 
                                    We DO NOT recommend deletion of 3000 or more entries at once.
                                </div>
                            </div>
                    </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                        <ExpansionPanel expanded={expanded === 'panel7'} onChange={() => this.handleChange('panel7')}>
                            <ExpansionPanelSummary expandIcon={<i className="material-icons">keyboard_arrow_down</i>}>
                                <Typography ><p className="siteTitle">Workflows Information</p></Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography>
                                <div className="row">
                                        <div className="col s12">
                                            Generates an excel file containing all the worfklows on the SharePoint, 
                                            created by users, with the  most relevant Information for each one of them.
                                        </div>
                                    </div>
                    </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel expanded={expanded === 'panel8'} onChange={() => this.handleChange('panel8')}>
                            <ExpansionPanelSummary expandIcon={<i className="material-icons">keyboard_arrow_down</i>}>
                                <Typography ><p className="siteTitle">Lists Information</p></Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography>
                                    <div className="row">
                                        <div className="col s12">
                                            Generates an excel file containing all the lists and libraries with the 
                                            most relevant Information for each one of them.
                                            
                                        </div>
                                    </div>
                                </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
            </div>
                    );
                }
}
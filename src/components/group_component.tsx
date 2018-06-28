import * as React from 'react';
// import { CollapsibleItem } from 'react-materialize';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import GroupStage from '../containers/group_stage';

export default class GroupComponent extends React.Component<any, any> {
    render() {
        return (
            <ExpansionPanel>
                <ExpansionPanelSummary>
                    <Typography >{this.props.header}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                        {
                            this.props.groups.map((e: Object) => {
                                return (

                                    <GroupStage key={e[`Title`]} groupId={e[`Id`]} title={e[`Title`]} />
                                );
                            })
                        }
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }
}
import * as React from 'react';
// import { Collapsible } from 'react-materialize';
import GroupComponent from '../components/group_component';

export default class SitesComponent extends React.Component<any, any> {
    render() {
        return (
            <div>
                {
                    this.props.sites.map((site: string) => {
                        let groups = [].concat.apply([], this.props.groups);
                        let filteredGroups = groups.filter((group: Object) => group[`siteUrl`] === site[`url`]);
                        return (
                            <GroupComponent groups={filteredGroups} key={site[`title`]} header={site[`title`]} />
                        );
                    })
                }
            </div>
        );
    }
}
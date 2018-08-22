import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateUserGroups } from '../actions/update_user_groups';
import { updateDigest } from '../api/helperFunctions';
import { siteUrl } from '../consts';

class GroupStage extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

    }

    addRemoveToGroup(text: string) {
        let that = this;
        let operation = text === 'Remove' ? 'remove' : 'add';
        Promise.resolve(updateDigest(siteUrl))
            .then(res => {
                that.props.updateUserGroups(
                    {
                        task: 'update',
                        _requestDigest: res,
                        user: that.props.currentUser.user,
                        group: {
                            Id: that.props.groupId,
                            Title: that.props.title
                        },
                        crudOperation: operation,
                        currentUserGroups: that.props.currentUserGroups
                    }
                );
            });
    }

    render() {
        let groups = this.props.currentUserGroups.map((e: any) => e[`Id`]);
        let text = groups.includes(this.props.groupId) ?
            (
                <i
                    className="material-icons Remove"
                    onClick={(e) => this.addRemoveToGroup('Remove')}
                >
                    remove_circle_outline
                </i>
            ) :
            (
                <i
                    className="material-icons Add"
                    onClick={(e) => this.addRemoveToGroup('Add')}
                >
                    add_circle_outline
                </i>
            );
        return (
            <div className="col s12">
                <div className="row delimiter">
                    <div className="col s10 groups">
                        <span>{this.props.title}</span>
                    </div>
                    <div className="col s1">
                        {
                            this.props.currentUser.hasOwnProperty('user') ?
                                text :
                                <div />
                        }
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ currentUser, currentUserGroups }: any) {
    return {
        currentUser,
        currentUserGroups,
    };
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({ updateUserGroups }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupStage);
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UpdateCopiedPermissions from '../actions/update_copied_permissions';
import { pastePermissions } from '../actions/paste_permissions';
import { updateDigest } from '../api/helperFunctions';
import { siteUrl } from '../consts';
import { Button } from 'react-materialize';
import Tooltip from '@material-ui/core/Tooltip';

class CopyPermissions extends React.Component<any, any> {

    copy() {
        this.props.UpdateCopiedPermissions(
            this.props.currentUserGroups
        );
    }

    paste() {
        Promise.resolve(updateDigest(siteUrl))
            .then(res => {
                this.props.pastePermissions(
                    this.props.copiedPermissions,
                    this.props.currentUserGroups,
                    this.props.currentUser.user,
                    res
                );
            });
    }

    cancel() {
        this.props.UpdateCopiedPermissions([]);
    }

    render() {
        return (
            <div>
                {
                    this.props.copiedPermissions.length === 0 ?
                        <Tooltip title="Copy Permissions" placement="left">
                            <Button
                                floating="true"
                                icon="file_copy"
                                className="black"
                                large="true"
                                style={{ bottom: '21px', right: '24px', position: 'fixed' }}
                                onClick={() => this.copy()}
                            />
                        </Tooltip> :
                        <Button
                            floating="true"
                            fab="vertical"
                            icon="assignment_turned_in"
                            className="black"
                            large="true"
                            style={{ bottom: '45px', right: '24px' }}
                        >
                            <Tooltip title="Cancel" placement="left">
                                <Button
                                    floating="true"
                                    icon="close"
                                    className="red"
                                    onClick={() => this.cancel()}
                                />
                            </Tooltip>
                            <Tooltip title="Paste" placement="left">
                                <Button
                                    floating="true"
                                    icon="done"
                                    className="blue"
                                    onClick={() => this.paste()}
                                />
                            </Tooltip>
                        </Button>
                }
            </div>
        );
    }
}

function mapStateToProps({ copiedPermissions, currentUserGroups, currentUser }: any) {
    return {
        copiedPermissions,
        currentUserGroups,
        currentUser
    };
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({ UpdateCopiedPermissions, pastePermissions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CopyPermissions);
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UpdateCopiedPermissions from '../actions/update_copied_permissions';
import { pastePermissions } from '../actions/paste_permissions';
import { updateDigest } from '../api/helperFunctions';
import { siteUrl } from '../consts';

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

    render() {
        return (
            <div>
                {
                    this.props.copiedPermissions.length === 0 ?
                        <i
                            className="material-icons"
                            onClick={() => this.copy()}
                        >
                            file_copy
                        </i> :
                        <i className="material-icons" onClick={() => this.paste()} >assignment_turned_in</i>
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
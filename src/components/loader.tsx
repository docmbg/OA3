import * as React from 'react';

export default class LinearLoader extends React.Component<any, any> {
    render() {
        return (
            <div className="progress">
                <div className="indeterminate" />
            </div>
        );
    }
}
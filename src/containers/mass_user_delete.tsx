import * as React from 'react';
import Papa from 'papaparse';

const mockedData: Array<String> = ['bizerska@dxc.com', 'antonio.bonev@dxc.com', 'dobromirai@dxc.com', 'nixata'];

export default class MassUserDelete extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {

            valid: [],
            invalid: []

        };
    }

    fileUpload(e: any) {
        const file = e[0];
        const that = this;
        Papa.parse(file, {
            complete: function (results: any) {
                let validPh: any = [];
                let invalidPh: any = [];

                let data = [].concat(...results.data);
                console.log(data);
                for (let userForRemoval of data) {
                    if (mockedData.includes(userForRemoval)) {
                        validPh.push(userForRemoval);
                    } else {
                        invalidPh.push(userForRemoval);
                    }
                }
                that.setState({

                    valid: validPh,
                    invalid: invalidPh

                });
            }
        });
    }

    render() {
        const that = this;
        let valid = that.state.valid;
        let invalid = that.state.invalid;
        return (
            <div className="container">
                <div className="row">
                    <input onChange={(e) => this.fileUpload(e.target.files)} type="file" />
                </div>
                <div className="row">
                    <div className="col s5">
                        <h5>Valid Users</h5>
                        {valid.length > 0 ?
                            valid.map((e: any, i: number) => <p key={i}>{e}</p>)
                            :
                            <div />

                        }
                    </div>
                    <div className="col s5 offset-s1">
                        <h5>Invalid users</h5>
                        {invalid.length > 0 ?
                            invalid.map((e: any, i: number) => <p key={i}>{e}</p>)
                            :
                            <div />

                        }
                    </div>
                </div>
            </div>
        );
    }
}
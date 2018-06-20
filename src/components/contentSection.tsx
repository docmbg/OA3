import * as React from 'react';

class ContentSection extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            inputValue: '',
        };
    }

    onChange(e: string) {
        this.setState({
            inputValue: e
        });
    }

    render() {
        return (
            <div className="container">
                Enter text: <input onChange={(e) => this.onChange(e.target.value)} value={this.state.inputValue} />
                <p>Let's spell it backwards:</p>
                <p className="testClass">{this.state.inputValue.split('').reverse().join('')}</p>
            </div>
        );
    }
}

export default ContentSection;
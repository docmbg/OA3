import * as React from 'react';
import '../sass/App.css';
import Worker3 from 'worker-loader!./worker3';
import Worker2 from 'worker-loader!./worker2';
// import {getMainUrl} from './api/helperFunctions';
// import { generateExcelFile } from './api/generateExcel';

const worker2 = new Worker2();
const worker3 = new Worker3();
// const paramUrl = window.location.href.includes('sites') ? 'sites' : 'teams';
// const siteUrl = getMainUrl(paramUrl);

const logo = require('../logo.svg');

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      color: '',
      emptyFolders: [],
      counter: 0,
      ready: false,
      sites: [],
      users: [],
    };
  }
  componentDidMount() {
    worker2.postMessage({message: 'my man'});
    worker2.onmessage = (event) => {
      console.log(event);
    };

    worker3.postMessage({message: 'my man'});
    worker3.onmessage = (event) => {
      console.log(event);
    };
    // let that = this;
    // const updateReqDigest = window[`UpdateRequestDigest`];
    // Promise.resolve(updateReqDigest(siteUrl)).then(res => console.log(res));
    // worker.postMessage({
    //   _requestDigest: window[`_requestDigest`],
    //   siteUrl: siteUrl,
    //   operation: 'users'
    // });
    // worker.onmessage = (event) => {
    //   that.setState({
    //     users: event.data.res
    //   });
    // };
  }

  buttonPress() {
    // let that = this;
    // worker.postMessage({
    //   _requestDigest: window[`_requestDigest`],
    //   siteUrl: siteUrl,
    //   operation: 'folders',
    //   users: that.state.users,
    //   paramUrl: siteUrl.split(`/${paramUrl}`)[0]
    // });
    // worker.onmessage = (event) => {
    //   generateExcelFile(event.data.res);
    // };
  }

  increment() {
    let counter = this.state.counter + 1;
    this.setState({
      counter
    });
  }

  render() {
    console.log(this.state.users);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className={`App-title ${this.state.color}`}>Welcome to React</h1>
        </header>
        <button onClick={() => this.increment()}>Click me</button>
        <p>{this.state.counter}</p>
        {this.state.emptyFolders.map((e: Object, i: number) => <p key={i}>{e[`Folder`][`Name`]}</p>)}
        {/* <button onClick={() => this.getFolders()}>Get Folders</button> */}
        <button
        // onClick={() => this.buttonPress()}
        // className={this.state.ready ? 'display' : 'hidden'}
        >
          Get Empty Folders
        </button>
      </div>
    );
  }
}

export default App;

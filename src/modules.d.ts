declare module 'react-router-dom';
declare module 'xlsx-populate';
declare module 'gojs';
declare module 'react-redux';
declare module 'redux-thunk';
// declare module 'redux';
// declare module 'connected-react-router';
declare module "worker-loader!*" {
    class WebpackWorker extends Worker {
      constructor();
    }
   
    export default WebpackWorker;
  }
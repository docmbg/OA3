declare module 'react-router-dom';
declare module 'xlsx-populate';
declare module 'gojs';
declare module 'react-redux';
declare module 'redux';
declare module "worker-loader!*" {
    class WebpackWorker extends Worker {
      constructor();
    }
   
    export default WebpackWorker;
  }
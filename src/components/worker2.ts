const ctx1: Worker = self as any;
ctx1.addEventListener('message', (event) => {
    console.log('hellor from second worker');
    ctx1.postMessage({ res: event.data.message });
});
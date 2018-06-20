const ctx: Worker = self as any;
ctx.addEventListener('message', (event) => {
    console.log('hellor from third worker');
    ctx.postMessage({ res: event.data.message });
});
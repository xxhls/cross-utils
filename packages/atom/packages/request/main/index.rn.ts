// eslint-disable-next-line @typescript-eslint/no-var-requires
const JDNetwork = require('@jdreact/jdreact-core-lib/Libraries/JDNetwork');

const request = (options)=>{
    const methodName = options.methodName;
    if (!methodName) {
        console.error(`RN请求基础库中必须包含methodName参数`)
        return;
    }
    if (typeof JDNetwork[methodName] !== 'function') {
        console.error(`JDNetwork网络库不支持${methodName}`)
        return;
    }
    return JDNetwork[methodName](options)
}

export default request

import { TFetchParams, INetwork } from './INetwork'

// import colorRequest from '@dj-lib/colorapi/build/index.rn';

class Network implements INetwork {
    fetch(params: TFetchParams): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve({});
        })
    }

}

const network = new Network();
export default network;


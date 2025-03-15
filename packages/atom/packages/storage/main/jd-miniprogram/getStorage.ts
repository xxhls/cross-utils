import { normalize } from '../common';
import { CONTAINER_NAME } from '@atom-shared/constant';

const getStorage = normalize.getStorage((args) => jd.getStorage(args), CONTAINER_NAME.JD);

export default getStorage;

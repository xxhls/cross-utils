import { normalize } from '../common';
import { CONTAINER_NAME } from '@atom-shared/constant';

const setStorage = normalize.setStorage((args) => jd.setStorage(args), CONTAINER_NAME.JD);

export default setStorage;

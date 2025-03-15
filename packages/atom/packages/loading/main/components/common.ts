import { isAliMiniProgram } from '@test/cross-atom-env';
import { HideOptions, ShowOptions } from '../types';
import { promisify } from '@atom-shared/promisify';
import { styleIn } from '@atom-shared/styleOptions';

function styleOptions(options: ShowOptions) {
  if (!options) {
    options = {};
  }
  if (isAliMiniProgram  ) {
    options.content = options.title || '';
    delete options.title;
  }
  return options;
}

/**
 * showLoading
 * @param api
 */
export function normalizeShow(api, containerName) {
  return (args?: ShowOptions) => {
    return promisify(api)(styleOptions(styleIn(args, containerName)));
  };
}

export function normalizeHide(api, containerName) {
  return (args?: HideOptions) => {
    return promisify(api)(styleIn(args, containerName));
  };
}
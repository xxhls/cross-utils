import { IPushOptions, IReplaceOptions, IGoOptions } from './types';
import { normalize } from './common';
import { CONTAINER_NAME } from '@atom-shared/constant';

export const navigateTo = normalize.push((options: IPushOptions) => {
    const { url, isHash = false, refresh = true, success, fail, complete } = options;
    setTimeout((): void => {
        try {
            if (isHash) {
                location.hash = `#${url}`;
            } else if (refresh) {
                location.href = url;
            } else {
                const state = { page_id: 1 };
                const title = '';

                history.pushState(state, title, url);
            }

            success && success();
            complete && complete();
        } catch (e) {
            fail && fail(e);
            complete && complete(e);
        }
    });
}, CONTAINER_NAME.WEB);

export const redirectTo = normalize.replace((options?: IReplaceOptions) => {
    const { url, isHash = false, refresh = true, success, fail, complete } = options || {};
    const _url = isHash ? `/#${url}` : url;

    setTimeout((): void => {
        try {
            if ((url.indexOf('http://') !== -1 || url.indexOf('https://') !== -1) &&
                url.indexOf(location.origin) === -1
            ) {
                console.warn('API: Replace does not support cross-domain');
                location.href = url;
                return;
            }
            if (isHash) {
                const { href } = location;
                const index = href.indexOf('#');
                // 域名不变的情况下不会刷新页面
                window.location.replace(index > 0
                    ? `${href.slice(0, index)}#${url}`
                    : `${href}#${url}`);
            } else {
                window.history.replaceState(null, null, _url);
                refresh && (location.reload());
            }
            success && success();
            complete && complete();
        } catch (e) {
            fail && fail(e);
            complete && complete(e);
        }
    });
}, CONTAINER_NAME.WEB);

export const switchTab = normalize.switchTab(() => {
    throw new Error('API: switchTab 不支持');
}, CONTAINER_NAME.WEB);

export const navigateBack = normalize.back((options: IGoOptions) => {
    const { data, success, fail, complete } = options;

    if (data < 0) {
        setTimeout((): void => {
            history.go(options.data);
            success && success();
            complete && complete();
        });
    } else {
        fail && fail({ errMsg: 'data不能大于或等于0' });
        complete && complete({ errMsg: 'data不能大于或等于0' });
    }
}, CONTAINER_NAME.WEB);


export default {
    navigateTo,
    redirectTo,
    switchTab,
    navigateBack
}
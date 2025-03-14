/** @format */

import Taro from '@tarojs/taro';

// eslint-disable-next-line @typescript-eslint/no-var-requires,import/no-commonjs
// const { set: setCookie } = process.argv.includes("--blended") ? require("@base/cookie") : { set: null };

// 获取具体 - cookie值
const getValue = (name: string, _expire: number, _data: { [x: string]: any; }) => {
	if (!_data) {
		throw new Error('cookies not exist');
	}

	if (_expire <= Date.now()) {
		throw new Error('cookies expire');
	}

	if (!(name in _data)) {
		throw new Error(`cookies["${name}"] not exists`);
	}

	const data = _data[name];
	if (data.expires !== 'session' && new Date(data.expires) <= new Date()) {
		throw new Error(`cookies["${name}"] expire`);
	}

	return data.value;
}
// cookie - get 操作的是同步存储
const get = async (name: string) => {
	let val = '';
	try {
		const { _expire, _data } = Taro.getStorageSync('cookies') || {};
		val = getValue(name, _expire, _data) || '';
	} catch (error) {
		// console.warn('getSyncCookieError', error);
	}
	return val;
};
// cookie - set 操作的是同步存储
const set = async (name: string, value: string) => {
	const item = {
		name,
		value,
		expires: new Date(Date.now() + 1000 * 3600 * 24 * 365).toUTCString(),
	};
	try {
		let { _data } = Taro.getStorageSync('cookies') || {};
		// 如果清空了storage，_data会是undefined，拿空对象做兜底
		if(!_data) {
			_data = {};
		}
		_data[name] = item;
		Taro.setStorageSync('cookies',{ _data,_expire: 9876543210 * 1000 })
	} catch (error) {
		// console.warn('setSyncCookieError', error)
	}
};
// cookie - del 删除cookie
const del = async (name: string) => {
	const item = null;
	try {
		let { _data } = Taro.getStorageSync('cookies') || {};
		// 如果清空了storage，_data会是undefined，拿空对象做兜底
		if(!_data) {
			_data = {};
		}
		_data[name] = item;
		Taro.setStorageSync('cookies',{ _data,_expire: 9876543210 * 1000 })
	} catch (error) {
		// console.warn('setSyncCookieError', error)
	}
};
// cookie - getAll 操作的是异步
const getAll = async (): Promise<Record<string, string>> => {
	const {
		data: { _expire, _data },
	} = await Taro.getStorage({ key: 'cookiesAll' });
	if (_expire <= Date.now()) {
		throw new Error('cookies expire');
	}
	const data: Record<string, string> = {};
	for (const key in _data) {
		const value = _data[key];
		if (value.expires === 'session' || new Date(value.expires) > new Date()) {
			data[key] = value.value;
		}
	}
	return data;
};

const cookie = {
	set,
	get,
	del,
	getAll
};

export default cookie;

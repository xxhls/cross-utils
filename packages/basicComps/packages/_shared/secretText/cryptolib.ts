import CryptoJSCore from 'crypto-js/core';
import AES from 'crypto-js/aes';
import Pkcs7 from 'crypto-js/pad-pkcs7';

const S_KEY = "J@NcRfUjXn2r5u8x";
const S_PARAMETER = "t7w!z%C*F-JaNdRg";

/**
 * api 加密
 */
export function AESEncrypt (data) {
    const CBCOptions = {
        "iv": CryptoJSCore?.enc?.Utf8?.parse?.(S_PARAMETER),
        "mode": CryptoJSCore?.mode?.CBC,
        "padding": Pkcs7
    };
    const key = CryptoJSCore?.enc?.Utf8?.parse?.(S_KEY);
    const secretData = CryptoJSCore?.enc?.Utf8?.parse?.(data);
    const encrypted = AES?.encrypt?.(
        secretData,
        key,
        CBCOptions
    );

    return encrypted.toString();
}

/**
 * api 解密
 */

export function AESDecrypt (data) {
    const CBCOptions = {
        "iv": CryptoJSCore?.enc?.Utf8?.parse?.(S_PARAMETER),
        "mode": CryptoJSCore?.mode?.CBC,
        "padding": Pkcs7
    };
    const key = CryptoJSCore?.enc?.Utf8?.parse?.(S_KEY);
    const decrypt = AES?.decrypt?.(
        data,
        key,
        CBCOptions
    );
    return CryptoJSCore?.enc?.Utf8?.stringify?.(decrypt)?.toString?.();
}

/**
 * 经纬度解密
 */
export function encryptDes(message,key){
   const keyHex = CryptoJSCore.enc.Utf8.parse(key);
   const srcs = CryptoJSCore.enc.Hex.parse(message);
   const options = {
        mode: CryptoJSCore.mode.CBC,
        iv: keyHex,
        padding: CryptoJSCore.pad.Pkcs7
   }
   const encrypted = CryptoJSCore.DES.decrypt({ ciphertext: srcs }, keyHex, options);
   return encrypted.toString(CryptoJSCore.enc.Utf8)
}

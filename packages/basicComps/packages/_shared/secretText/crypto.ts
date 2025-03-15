import des from "des.js";
import buffer from "buffer";

const encrypt = (data: string, keyword: string): string => {
    const input = buffer.Buffer.from(data, "utf8");

    const CBC = des.CBC.instantiate(des.DES);
    const enc = CBC.create({
        type: 'encrypt',
        key: buffer.Buffer.from(keyword, "utf8"),
        iv: buffer.Buffer.from("\0\0\0\0\0\0\0\0", "utf8")
    });

    return buffer.Buffer.from(enc.update(input).concat(enc.final())).toString("base64");
}

const decrypt = (data: string, keyword: string): string => {
    try {
        const input = buffer.Buffer.from(data, "base64");

        const CBC = des.CBC.instantiate(des.DES);
        const dec = CBC.create({
            type: 'decrypt',
            key: buffer.Buffer.from(keyword, "utf8"),
            iv: buffer.Buffer.from("\0\0\0\0\0\0\0\0", "utf8")
        });

        return buffer.Buffer.from(dec.update(input).concat(dec.final())).toString("utf8");
    } catch (e) {
        // 解密失败，返回原值（场景：服务端下发未加密字段，调用解密方法会抛异常）
        return data;
    }
}

const data = {
    encrypt,
    decrypt
}

export default data;

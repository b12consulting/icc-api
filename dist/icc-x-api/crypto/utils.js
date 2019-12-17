"use strict"
var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : new P(function(resolve) {
              resolve(result.value)
            }).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
Object.defineProperty(exports, "__esModule", { value: true })
const base64js = require("base64-js")
const moment = require("moment")
const _ = require("lodash")
class UtilsClass {
  constructor(
    crypto = typeof window !== "undefined"
      ? window.crypto
      : typeof self !== "undefined"
        ? self.crypto
        : {}
  ) {
    this.crypto = crypto
  }
  /**
   * String to Uint8Array
   *
   * @param s
   * @returns {Uint8Array}
   */
  text2ua(s) {
    var ua = new Uint8Array(s.length)
    for (var i = 0; i < s.length; i++) {
      ua[i] = s.charCodeAt(i) & 0xff
    }
    return ua
  }
  ua2ArrayBuffer(ua) {
    const buffer = ua.buffer
    return buffer.byteLength > ua.byteLength ? buffer.slice(0, ua.byteLength) : buffer
  }
  base64toArrayBuffer(s) {
    return this.ua2ArrayBuffer(this.text2ua(atob(s)))
  }
  /**
   * Hex String to Uint8Array
   *
   * @param s
   * @returns {Uint8Array}
   */
  hex2ua(s) {
    var ua = new Uint8Array(s.length / 2)
    s = s.toLowerCase()
    for (var i = 0; i < s.length; i += 2) {
      ua[i / 2] =
        (s.charCodeAt(i) < 58 ? s.charCodeAt(i) - 48 : s.charCodeAt(i) - 87) * 16 +
        (s.charCodeAt(i + 1) < 58 ? s.charCodeAt(i + 1) - 48 : s.charCodeAt(i + 1) - 87)
    }
    return ua
  }
  spkiToJwk(buf) {
    var hex = this.ua2hex(buf)
    if (!hex.startsWith("3082") || !hex.substr(8).startsWith("0282010100")) {
      hex = hex.substr(48)
      buf = this.hex2ua(hex)
    }
    var key = {}
    var offset = buf[1] & 0x80 ? buf[1] - 0x80 + 2 : 2
    function read() {
      var s = buf[offset + 1]
      if (s & 0x80) {
        var n = s - 0x80
        s = n === 2 ? 256 * buf[offset + 2] + buf[offset + 3] : buf[offset + 2]
        offset += n
      }
      offset += 2
      var b = buf.slice(offset, offset + s)
      offset += s
      return b
    }
    key.modulus = read()
    key.publicExponent = read()
    return {
      kty: "RSA",
      n: this.base64url(this.minimalRep(key.modulus)),
      e: this.base64url(this.minimalRep(key.publicExponent))
    }
  }
  pkcs8ToJwk(buf) {
    var hex = this.ua2hex(buf)
    if (!hex.startsWith("3082") || !hex.substr(8).startsWith("0201000282010100")) {
      hex = hex.substr(52)
      buf = this.hex2ua(hex)
    }
    var key = {}
    var offset = buf[1] & 0x80 ? buf[1] - 0x80 + 5 : 7
    function read() {
      var s = buf[offset + 1]
      if (s & 0x80) {
        var n = s - 0x80
        s = n === 2 ? 256 * buf[offset + 2] + buf[offset + 3] : buf[offset + 2]
        offset += n
      }
      offset += 2
      var b = buf.slice(offset, offset + s)
      offset += s
      return b
    }
    key.modulus = read()
    key.publicExponent = read()
    key.privateExponent = read()
    key.prime1 = read()
    key.prime2 = read()
    key.exponent1 = read()
    key.exponent2 = read()
    key.coefficient = read()
    return {
      kty: "RSA",
      n: this.base64url(this.minimalRep(key.modulus)),
      e: this.base64url(this.minimalRep(key.publicExponent)),
      d: this.base64url(this.minimalRep(key.privateExponent)),
      p: this.base64url(this.minimalRep(key.prime1)),
      q: this.base64url(this.minimalRep(key.prime2)),
      dp: this.base64url(this.minimalRep(key.exponent1)),
      dq: this.base64url(this.minimalRep(key.exponent2)),
      qi: this.base64url(this.minimalRep(key.coefficient))
    }
  }
  minimalRep(b) {
    var i = 0
    while (b[i] === 0) {
      i++
    }
    return b.slice(i)
  }
  utf82ua(str) {
    const utf8 = new Uint8Array(4 * str.length)
    let j = 0
    for (var i = 0; i < str.length; i++) {
      var charcode = str.charCodeAt(i)
      if (charcode < 0x80) {
        utf8.set([charcode], j++)
      } else if (charcode < 0x800) {
        utf8.set([0xc0 | (charcode >> 6), 0x80 | (charcode & 0x3f)], j)
        j += 2
      } else if (charcode < 0xd800 || charcode >= 0xe000) {
        utf8.set(
          [0xe0 | (charcode >> 12), 0x80 | ((charcode >> 6) & 0x3f), 0x80 | (charcode & 0x3f)],
          j
        )
        j += 3
      } else {
        i++
        // UTF-16 encodes 0x10000-0x10FFFF by
        // subtracting 0x10000 and splitting the
        // 20 bits of 0x0-0xFFFFF into two halves
        charcode = 0x10000 + (((charcode & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff))
        utf8.set(
          [
            0xf0 | (charcode >> 18),
            0x80 | ((charcode >> 12) & 0x3f),
            0x80 | ((charcode >> 6) & 0x3f),
            0x80 | (charcode & 0x3f)
          ],
          j
        )
        j += 4
      }
    }
    return utf8.subarray(0, j)
  }
  ua2utf8(arrBuf) {
    var out, i, len, c, u
    var char2, char3, char4
    const array = new Uint8Array(arrBuf)
    out = ""
    len = array.length || array.byteLength
    i = 0
    while (i < len) {
      c = array[i++]
      switch (c >> 4) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
          // 0xxxxxxx
          out += String.fromCharCode(c)
          break
        case 12:
        case 13:
          // 110x xxxx   10xx xxxx
          char2 = array[i++]
          out += String.fromCharCode(((c & 0x1f) << 6) | (char2 & 0x3f))
          break
        case 14:
          // 1110 xxxx  10xx xxxx  10xx xxxx
          char2 = array[i++]
          char3 = array[i++]
          out += String.fromCharCode(
            ((c & 0x0f) << 12) | ((char2 & 0x3f) << 6) | ((char3 & 0x3f) << 0)
          )
          break
        case 15:
          // 1111 xxxx  10xx xxxx  10xx xxxx  10xx xxxx
          char2 = array[i++]
          char3 = array[i++]
          char4 = array[i++]
          u =
            ((c & 0x07) << 18) |
            ((char2 & 0x3f) << 12) |
            ((char3 & 0x3f) << 6) |
            (((char4 & 0x3f) << 0) - 0x10000)
          out += String.fromCharCode(0xd800 + (u >> 10))
          out += String.fromCharCode(0xdc00 + (u & 1023))
          break
      }
    }
    return out
  }
  base64url(b) {
    return base64js
      .fromByteArray(b)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "")
  }
  /**
   * Uint8Array/ArrayBuffer to hex String
   *
   * @param _ua {Uint8Array} or ArrayBuffer
   * @returns {String} Hex String
   */
  ua2hex(_ua) {
    var s = ""
    var ua = new Uint8Array(_ua)
    for (var i = 0; i < ua.length; i++) {
      var hhb = (ua[i] & 0xf0) >> 4
      var lhb = ua[i] & 0x0f
      s += String.fromCharCode(hhb > 9 ? hhb + 87 : hhb + 48)
      s += String.fromCharCode(lhb > 9 ? lhb + 87 : lhb + 48)
    }
    return s
  }
  /**
   * ArrayBuffer to String - resilient to large ArrayBuffers.
   *
   * @param arrBuf
   * @returns {string}
   */
  ua2text(arrBuf) {
    var str = ""
    var ab = new Uint8Array(arrBuf)
    var abLen = ab.length
    var CHUNK_SIZE = Math.pow(2, 8)
    var offset, len, subab
    for (offset = 0; offset < abLen; offset += CHUNK_SIZE) {
      len = Math.min(CHUNK_SIZE, abLen - offset)
      subab = ab.subarray(offset, offset + len)
      str += String.fromCharCode.apply(null, subab)
    }
    return str
  }
  hex2text(hexStr) {
    return this.ua2text(this.hex2ua(hexStr))
  }
  text2hex(text) {
    return this.ua2hex(this.text2ua(text))
  }
  base64toByteArray(base64Data) {
    var sliceSize = 1024
    var byteCharacters = atob(base64Data)
    var bytesLength = byteCharacters.length
    var slicesCount = Math.ceil(bytesLength / sliceSize)
    var byteArrays = new Array(slicesCount)
    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      var begin = sliceIndex * sliceSize
      var end = Math.min(begin + sliceSize, bytesLength)
      var bytes = new Array(end - begin)
      for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0)
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes)
    }
    return byteArrays
  }
  /**
   *
   * @param buffer1 {Uint8Array}
   * @param buffer2{ Uint8Array}
   * @returns {ArrayBuffer}
   */
  appendBuffer(buffer1, buffer2) {
    var tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength)
    tmp.set(new Uint8Array(buffer1), 0)
    tmp.set(new Uint8Array(buffer2), buffer1.byteLength)
    return tmp.buffer
  }
  //Convenience methods for dates management
  after(d1, d2) {
    return (
      d1 === null ||
      d2 === null ||
      d1 === undefined ||
      d2 === undefined ||
      this.moment(d1).isAfter(this.moment(d2))
    )
  }
  before(d1, d2) {
    return (
      d1 === null ||
      d2 === null ||
      d1 === undefined ||
      d2 === undefined ||
      this.moment(d1).isBefore(this.moment(d2))
    )
  }
  moment(epochOrLongCalendar) {
    if (!epochOrLongCalendar && epochOrLongCalendar !== 0) {
      return null
    }
    if (epochOrLongCalendar >= 18000101 && epochOrLongCalendar < 25400000) {
      return moment("" + epochOrLongCalendar, "YYYYMMDD")
    } else if (epochOrLongCalendar >= 18000101000000) {
      return moment("" + epochOrLongCalendar, "YYYYMMDDHHmmss")
    } else {
      return moment(epochOrLongCalendar)
    }
  }
  /**
   * Encrypt object graph recursively
   *
   * @param obj the object to encrypt
   * @param cryptor the cryptor function (returns a promise)
   * @param keys the keys to be crypted: ex for a Patient ['note', 'addresses.*.["street", "houseNumber", "telecoms.*.telecomNumber"]']
   */
  crypt(obj, cryptor, keys) {
    return __awaiter(this, void 0, void 0, function*() {
      const subObj = _.pick(obj, keys.filter(k => !k.includes("*")))
      obj.encryptedSelf = btoa(this.ua2text(yield cryptor(subObj)))
      Object.keys(subObj).forEach(k => delete obj[k])
      yield keys.filter(k => k.includes("*")).reduce(
        (prev, k) =>
          __awaiter(this, void 0, void 0, function*() {
            yield prev
            const k1 = k.split(".*.")[0]
            const k2 = k.substr(k1.length + 3)
            const mapped = yield Promise.all(
              (_.get(obj, k1) || []).map(so =>
                this.crypt(so, cryptor, k2.startsWith("[") ? JSON.parse(k2) : [k2])
              )
            )
            _.set(obj, k1, mapped)
          }),
        Promise.resolve()
      )
      return obj
    })
  }
  /**
   * Decrypt object graph recursively
   *
   * @param obj the object to encrypt
   * @param decryptor the decryptor function (returns a promise)
   */
  decrypt(obj, decryptor) {
    return __awaiter(this, void 0, void 0, function*() {
      yield Object.keys(obj).reduce(
        (prev, k) =>
          __awaiter(this, void 0, void 0, function*() {
            yield prev
            if (Array.isArray(obj[k])) {
              yield obj[k].filter(o => typeof o === "object" && o !== null).reduce(
                (prev, so) =>
                  __awaiter(this, void 0, void 0, function*() {
                    yield prev
                    yield this.decrypt(so, decryptor)
                  }),
                Promise.resolve()
              )
            }
          }),
        Promise.resolve()
      )
      if (obj.encryptedSelf) {
        Object.assign(obj, yield decryptor(exports.utils.text2ua(atob(obj.encryptedSelf))))
      }
      return obj
    })
  }
}
exports.UtilsClass = UtilsClass
exports.utils = new UtilsClass()
//# sourceMappingURL=utils.js.map
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../node_modules/minimalistic-assert/index.js
var require_minimalistic_assert = __commonJS({
  "../node_modules/minimalistic-assert/index.js"(exports, module) {
    module.exports = assert;
    function assert(val, msg) {
      if (!val)
        throw new Error(msg || "Assertion failed");
    }
    assert.equal = function assertEqual(l, r, msg) {
      if (l != r)
        throw new Error(msg || "Assertion failed: " + l + " != " + r);
    };
  }
});

// ../node_modules/inherits/inherits_browser.js
var require_inherits_browser = __commonJS({
  "../node_modules/inherits/inherits_browser.js"(exports, module) {
    if (typeof Object.create === "function") {
      module.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
              value: ctor,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
        }
      };
    } else {
      module.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          var TempCtor = function() {
          };
          TempCtor.prototype = superCtor.prototype;
          ctor.prototype = new TempCtor();
          ctor.prototype.constructor = ctor;
        }
      };
    }
  }
});

// ../node_modules/hash.js/lib/hash/utils.js
var require_utils = __commonJS({
  "../node_modules/hash.js/lib/hash/utils.js"(exports) {
    "use strict";
    var assert = require_minimalistic_assert();
    var inherits = require_inherits_browser();
    exports.inherits = inherits;
    function isSurrogatePair(msg, i) {
      if ((msg.charCodeAt(i) & 64512) !== 55296) {
        return false;
      }
      if (i < 0 || i + 1 >= msg.length) {
        return false;
      }
      return (msg.charCodeAt(i + 1) & 64512) === 56320;
    }
    function toArray(msg, enc) {
      if (Array.isArray(msg))
        return msg.slice();
      if (!msg)
        return [];
      var res = [];
      if (typeof msg === "string") {
        if (!enc) {
          var p = 0;
          for (var i = 0; i < msg.length; i++) {
            var c = msg.charCodeAt(i);
            if (c < 128) {
              res[p++] = c;
            } else if (c < 2048) {
              res[p++] = c >> 6 | 192;
              res[p++] = c & 63 | 128;
            } else if (isSurrogatePair(msg, i)) {
              c = 65536 + ((c & 1023) << 10) + (msg.charCodeAt(++i) & 1023);
              res[p++] = c >> 18 | 240;
              res[p++] = c >> 12 & 63 | 128;
              res[p++] = c >> 6 & 63 | 128;
              res[p++] = c & 63 | 128;
            } else {
              res[p++] = c >> 12 | 224;
              res[p++] = c >> 6 & 63 | 128;
              res[p++] = c & 63 | 128;
            }
          }
        } else if (enc === "hex") {
          msg = msg.replace(/[^a-z0-9]+/ig, "");
          if (msg.length % 2 !== 0)
            msg = "0" + msg;
          for (i = 0; i < msg.length; i += 2)
            res.push(parseInt(msg[i] + msg[i + 1], 16));
        }
      } else {
        for (i = 0; i < msg.length; i++)
          res[i] = msg[i] | 0;
      }
      return res;
    }
    exports.toArray = toArray;
    function toHex(msg) {
      var res = "";
      for (var i = 0; i < msg.length; i++)
        res += zero2(msg[i].toString(16));
      return res;
    }
    exports.toHex = toHex;
    function htonl(w) {
      var res = w >>> 24 | w >>> 8 & 65280 | w << 8 & 16711680 | (w & 255) << 24;
      return res >>> 0;
    }
    exports.htonl = htonl;
    function toHex32(msg, endian) {
      var res = "";
      for (var i = 0; i < msg.length; i++) {
        var w = msg[i];
        if (endian === "little")
          w = htonl(w);
        res += zero8(w.toString(16));
      }
      return res;
    }
    exports.toHex32 = toHex32;
    function zero2(word) {
      if (word.length === 1)
        return "0" + word;
      else
        return word;
    }
    exports.zero2 = zero2;
    function zero8(word) {
      if (word.length === 7)
        return "0" + word;
      else if (word.length === 6)
        return "00" + word;
      else if (word.length === 5)
        return "000" + word;
      else if (word.length === 4)
        return "0000" + word;
      else if (word.length === 3)
        return "00000" + word;
      else if (word.length === 2)
        return "000000" + word;
      else if (word.length === 1)
        return "0000000" + word;
      else
        return word;
    }
    exports.zero8 = zero8;
    function join32(msg, start, end, endian) {
      var len = end - start;
      assert(len % 4 === 0);
      var res = new Array(len / 4);
      for (var i = 0, k = start; i < res.length; i++, k += 4) {
        var w;
        if (endian === "big")
          w = msg[k] << 24 | msg[k + 1] << 16 | msg[k + 2] << 8 | msg[k + 3];
        else
          w = msg[k + 3] << 24 | msg[k + 2] << 16 | msg[k + 1] << 8 | msg[k];
        res[i] = w >>> 0;
      }
      return res;
    }
    exports.join32 = join32;
    function split32(msg, endian) {
      var res = new Array(msg.length * 4);
      for (var i = 0, k = 0; i < msg.length; i++, k += 4) {
        var m = msg[i];
        if (endian === "big") {
          res[k] = m >>> 24;
          res[k + 1] = m >>> 16 & 255;
          res[k + 2] = m >>> 8 & 255;
          res[k + 3] = m & 255;
        } else {
          res[k + 3] = m >>> 24;
          res[k + 2] = m >>> 16 & 255;
          res[k + 1] = m >>> 8 & 255;
          res[k] = m & 255;
        }
      }
      return res;
    }
    exports.split32 = split32;
    function rotr32(w, b) {
      return w >>> b | w << 32 - b;
    }
    exports.rotr32 = rotr32;
    function rotl32(w, b) {
      return w << b | w >>> 32 - b;
    }
    exports.rotl32 = rotl32;
    function sum32(a, b) {
      return a + b >>> 0;
    }
    exports.sum32 = sum32;
    function sum32_3(a, b, c) {
      return a + b + c >>> 0;
    }
    exports.sum32_3 = sum32_3;
    function sum32_4(a, b, c, d) {
      return a + b + c + d >>> 0;
    }
    exports.sum32_4 = sum32_4;
    function sum32_5(a, b, c, d, e) {
      return a + b + c + d + e >>> 0;
    }
    exports.sum32_5 = sum32_5;
    function sum64(buf, pos, ah, al) {
      var bh = buf[pos];
      var bl = buf[pos + 1];
      var lo = al + bl >>> 0;
      var hi = (lo < al ? 1 : 0) + ah + bh;
      buf[pos] = hi >>> 0;
      buf[pos + 1] = lo;
    }
    exports.sum64 = sum64;
    function sum64_hi(ah, al, bh, bl) {
      var lo = al + bl >>> 0;
      var hi = (lo < al ? 1 : 0) + ah + bh;
      return hi >>> 0;
    }
    exports.sum64_hi = sum64_hi;
    function sum64_lo(ah, al, bh, bl) {
      var lo = al + bl;
      return lo >>> 0;
    }
    exports.sum64_lo = sum64_lo;
    function sum64_4_hi(ah, al, bh, bl, ch, cl, dh, dl) {
      var carry = 0;
      var lo = al;
      lo = lo + bl >>> 0;
      carry += lo < al ? 1 : 0;
      lo = lo + cl >>> 0;
      carry += lo < cl ? 1 : 0;
      lo = lo + dl >>> 0;
      carry += lo < dl ? 1 : 0;
      var hi = ah + bh + ch + dh + carry;
      return hi >>> 0;
    }
    exports.sum64_4_hi = sum64_4_hi;
    function sum64_4_lo(ah, al, bh, bl, ch, cl, dh, dl) {
      var lo = al + bl + cl + dl;
      return lo >>> 0;
    }
    exports.sum64_4_lo = sum64_4_lo;
    function sum64_5_hi(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
      var carry = 0;
      var lo = al;
      lo = lo + bl >>> 0;
      carry += lo < al ? 1 : 0;
      lo = lo + cl >>> 0;
      carry += lo < cl ? 1 : 0;
      lo = lo + dl >>> 0;
      carry += lo < dl ? 1 : 0;
      lo = lo + el >>> 0;
      carry += lo < el ? 1 : 0;
      var hi = ah + bh + ch + dh + eh + carry;
      return hi >>> 0;
    }
    exports.sum64_5_hi = sum64_5_hi;
    function sum64_5_lo(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
      var lo = al + bl + cl + dl + el;
      return lo >>> 0;
    }
    exports.sum64_5_lo = sum64_5_lo;
    function rotr64_hi(ah, al, num) {
      var r = al << 32 - num | ah >>> num;
      return r >>> 0;
    }
    exports.rotr64_hi = rotr64_hi;
    function rotr64_lo(ah, al, num) {
      var r = ah << 32 - num | al >>> num;
      return r >>> 0;
    }
    exports.rotr64_lo = rotr64_lo;
    function shr64_hi(ah, al, num) {
      return ah >>> num;
    }
    exports.shr64_hi = shr64_hi;
    function shr64_lo(ah, al, num) {
      var r = ah << 32 - num | al >>> num;
      return r >>> 0;
    }
    exports.shr64_lo = shr64_lo;
  }
});

// ../node_modules/hash.js/lib/hash/common.js
var require_common = __commonJS({
  "../node_modules/hash.js/lib/hash/common.js"(exports) {
    "use strict";
    var utils = require_utils();
    var assert = require_minimalistic_assert();
    function BlockHash() {
      this.pending = null;
      this.pendingTotal = 0;
      this.blockSize = this.constructor.blockSize;
      this.outSize = this.constructor.outSize;
      this.hmacStrength = this.constructor.hmacStrength;
      this.padLength = this.constructor.padLength / 8;
      this.endian = "big";
      this._delta8 = this.blockSize / 8;
      this._delta32 = this.blockSize / 32;
    }
    exports.BlockHash = BlockHash;
    BlockHash.prototype.update = function update(msg, enc) {
      msg = utils.toArray(msg, enc);
      if (!this.pending)
        this.pending = msg;
      else
        this.pending = this.pending.concat(msg);
      this.pendingTotal += msg.length;
      if (this.pending.length >= this._delta8) {
        msg = this.pending;
        var r = msg.length % this._delta8;
        this.pending = msg.slice(msg.length - r, msg.length);
        if (this.pending.length === 0)
          this.pending = null;
        msg = utils.join32(msg, 0, msg.length - r, this.endian);
        for (var i = 0; i < msg.length; i += this._delta32)
          this._update(msg, i, i + this._delta32);
      }
      return this;
    };
    BlockHash.prototype.digest = function digest(enc) {
      this.update(this._pad());
      assert(this.pending === null);
      return this._digest(enc);
    };
    BlockHash.prototype._pad = function pad() {
      var len = this.pendingTotal;
      var bytes = this._delta8;
      var k = bytes - (len + this.padLength) % bytes;
      var res = new Array(k + this.padLength);
      res[0] = 128;
      for (var i = 1; i < k; i++)
        res[i] = 0;
      len <<= 3;
      if (this.endian === "big") {
        for (var t = 8; t < this.padLength; t++)
          res[i++] = 0;
        res[i++] = 0;
        res[i++] = 0;
        res[i++] = 0;
        res[i++] = 0;
        res[i++] = len >>> 24 & 255;
        res[i++] = len >>> 16 & 255;
        res[i++] = len >>> 8 & 255;
        res[i++] = len & 255;
      } else {
        res[i++] = len & 255;
        res[i++] = len >>> 8 & 255;
        res[i++] = len >>> 16 & 255;
        res[i++] = len >>> 24 & 255;
        res[i++] = 0;
        res[i++] = 0;
        res[i++] = 0;
        res[i++] = 0;
        for (t = 8; t < this.padLength; t++)
          res[i++] = 0;
      }
      return res;
    };
  }
});

// ../node_modules/hash.js/lib/hash/sha/common.js
var require_common2 = __commonJS({
  "../node_modules/hash.js/lib/hash/sha/common.js"(exports) {
    "use strict";
    var utils = require_utils();
    var rotr32 = utils.rotr32;
    function ft_1(s, x, y, z) {
      if (s === 0)
        return ch32(x, y, z);
      if (s === 1 || s === 3)
        return p32(x, y, z);
      if (s === 2)
        return maj32(x, y, z);
    }
    exports.ft_1 = ft_1;
    function ch32(x, y, z) {
      return x & y ^ ~x & z;
    }
    exports.ch32 = ch32;
    function maj32(x, y, z) {
      return x & y ^ x & z ^ y & z;
    }
    exports.maj32 = maj32;
    function p32(x, y, z) {
      return x ^ y ^ z;
    }
    exports.p32 = p32;
    function s0_256(x) {
      return rotr32(x, 2) ^ rotr32(x, 13) ^ rotr32(x, 22);
    }
    exports.s0_256 = s0_256;
    function s1_256(x) {
      return rotr32(x, 6) ^ rotr32(x, 11) ^ rotr32(x, 25);
    }
    exports.s1_256 = s1_256;
    function g0_256(x) {
      return rotr32(x, 7) ^ rotr32(x, 18) ^ x >>> 3;
    }
    exports.g0_256 = g0_256;
    function g1_256(x) {
      return rotr32(x, 17) ^ rotr32(x, 19) ^ x >>> 10;
    }
    exports.g1_256 = g1_256;
  }
});

// ../node_modules/hash.js/lib/hash/sha/1.js
var require__ = __commonJS({
  "../node_modules/hash.js/lib/hash/sha/1.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var common = require_common();
    var shaCommon = require_common2();
    var rotl32 = utils.rotl32;
    var sum32 = utils.sum32;
    var sum32_5 = utils.sum32_5;
    var ft_1 = shaCommon.ft_1;
    var BlockHash = common.BlockHash;
    var sha1_K = [
      1518500249,
      1859775393,
      2400959708,
      3395469782
    ];
    function SHA1() {
      if (!(this instanceof SHA1))
        return new SHA1();
      BlockHash.call(this);
      this.h = [
        1732584193,
        4023233417,
        2562383102,
        271733878,
        3285377520
      ];
      this.W = new Array(80);
    }
    utils.inherits(SHA1, BlockHash);
    module.exports = SHA1;
    SHA1.blockSize = 512;
    SHA1.outSize = 160;
    SHA1.hmacStrength = 80;
    SHA1.padLength = 64;
    SHA1.prototype._update = function _update(msg, start) {
      var W = this.W;
      for (var i = 0; i < 16; i++)
        W[i] = msg[start + i];
      for (; i < W.length; i++)
        W[i] = rotl32(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
      var a = this.h[0];
      var b = this.h[1];
      var c = this.h[2];
      var d = this.h[3];
      var e = this.h[4];
      for (i = 0; i < W.length; i++) {
        var s = ~~(i / 20);
        var t = sum32_5(rotl32(a, 5), ft_1(s, b, c, d), e, W[i], sha1_K[s]);
        e = d;
        d = c;
        c = rotl32(b, 30);
        b = a;
        a = t;
      }
      this.h[0] = sum32(this.h[0], a);
      this.h[1] = sum32(this.h[1], b);
      this.h[2] = sum32(this.h[2], c);
      this.h[3] = sum32(this.h[3], d);
      this.h[4] = sum32(this.h[4], e);
    };
    SHA1.prototype._digest = function digest(enc) {
      if (enc === "hex")
        return utils.toHex32(this.h, "big");
      else
        return utils.split32(this.h, "big");
    };
  }
});

// ../node_modules/hash.js/lib/hash/sha/256.js
var require__2 = __commonJS({
  "../node_modules/hash.js/lib/hash/sha/256.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var common = require_common();
    var shaCommon = require_common2();
    var assert = require_minimalistic_assert();
    var sum32 = utils.sum32;
    var sum32_4 = utils.sum32_4;
    var sum32_5 = utils.sum32_5;
    var ch32 = shaCommon.ch32;
    var maj32 = shaCommon.maj32;
    var s0_256 = shaCommon.s0_256;
    var s1_256 = shaCommon.s1_256;
    var g0_256 = shaCommon.g0_256;
    var g1_256 = shaCommon.g1_256;
    var BlockHash = common.BlockHash;
    var sha256_K = [
      1116352408,
      1899447441,
      3049323471,
      3921009573,
      961987163,
      1508970993,
      2453635748,
      2870763221,
      3624381080,
      310598401,
      607225278,
      1426881987,
      1925078388,
      2162078206,
      2614888103,
      3248222580,
      3835390401,
      4022224774,
      264347078,
      604807628,
      770255983,
      1249150122,
      1555081692,
      1996064986,
      2554220882,
      2821834349,
      2952996808,
      3210313671,
      3336571891,
      3584528711,
      113926993,
      338241895,
      666307205,
      773529912,
      1294757372,
      1396182291,
      1695183700,
      1986661051,
      2177026350,
      2456956037,
      2730485921,
      2820302411,
      3259730800,
      3345764771,
      3516065817,
      3600352804,
      4094571909,
      275423344,
      430227734,
      506948616,
      659060556,
      883997877,
      958139571,
      1322822218,
      1537002063,
      1747873779,
      1955562222,
      2024104815,
      2227730452,
      2361852424,
      2428436474,
      2756734187,
      3204031479,
      3329325298
    ];
    function SHA256() {
      if (!(this instanceof SHA256))
        return new SHA256();
      BlockHash.call(this);
      this.h = [
        1779033703,
        3144134277,
        1013904242,
        2773480762,
        1359893119,
        2600822924,
        528734635,
        1541459225
      ];
      this.k = sha256_K;
      this.W = new Array(64);
    }
    utils.inherits(SHA256, BlockHash);
    module.exports = SHA256;
    SHA256.blockSize = 512;
    SHA256.outSize = 256;
    SHA256.hmacStrength = 192;
    SHA256.padLength = 64;
    SHA256.prototype._update = function _update(msg, start) {
      var W = this.W;
      for (var i = 0; i < 16; i++)
        W[i] = msg[start + i];
      for (; i < W.length; i++)
        W[i] = sum32_4(g1_256(W[i - 2]), W[i - 7], g0_256(W[i - 15]), W[i - 16]);
      var a = this.h[0];
      var b = this.h[1];
      var c = this.h[2];
      var d = this.h[3];
      var e = this.h[4];
      var f = this.h[5];
      var g = this.h[6];
      var h = this.h[7];
      assert(this.k.length === W.length);
      for (i = 0; i < W.length; i++) {
        var T1 = sum32_5(h, s1_256(e), ch32(e, f, g), this.k[i], W[i]);
        var T2 = sum32(s0_256(a), maj32(a, b, c));
        h = g;
        g = f;
        f = e;
        e = sum32(d, T1);
        d = c;
        c = b;
        b = a;
        a = sum32(T1, T2);
      }
      this.h[0] = sum32(this.h[0], a);
      this.h[1] = sum32(this.h[1], b);
      this.h[2] = sum32(this.h[2], c);
      this.h[3] = sum32(this.h[3], d);
      this.h[4] = sum32(this.h[4], e);
      this.h[5] = sum32(this.h[5], f);
      this.h[6] = sum32(this.h[6], g);
      this.h[7] = sum32(this.h[7], h);
    };
    SHA256.prototype._digest = function digest(enc) {
      if (enc === "hex")
        return utils.toHex32(this.h, "big");
      else
        return utils.split32(this.h, "big");
    };
  }
});

// ../node_modules/hash.js/lib/hash/sha/224.js
var require__3 = __commonJS({
  "../node_modules/hash.js/lib/hash/sha/224.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var SHA256 = require__2();
    function SHA224() {
      if (!(this instanceof SHA224))
        return new SHA224();
      SHA256.call(this);
      this.h = [
        3238371032,
        914150663,
        812702999,
        4144912697,
        4290775857,
        1750603025,
        1694076839,
        3204075428
      ];
    }
    utils.inherits(SHA224, SHA256);
    module.exports = SHA224;
    SHA224.blockSize = 512;
    SHA224.outSize = 224;
    SHA224.hmacStrength = 192;
    SHA224.padLength = 64;
    SHA224.prototype._digest = function digest(enc) {
      if (enc === "hex")
        return utils.toHex32(this.h.slice(0, 7), "big");
      else
        return utils.split32(this.h.slice(0, 7), "big");
    };
  }
});

// ../node_modules/hash.js/lib/hash/sha/512.js
var require__4 = __commonJS({
  "../node_modules/hash.js/lib/hash/sha/512.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var common = require_common();
    var assert = require_minimalistic_assert();
    var rotr64_hi = utils.rotr64_hi;
    var rotr64_lo = utils.rotr64_lo;
    var shr64_hi = utils.shr64_hi;
    var shr64_lo = utils.shr64_lo;
    var sum64 = utils.sum64;
    var sum64_hi = utils.sum64_hi;
    var sum64_lo = utils.sum64_lo;
    var sum64_4_hi = utils.sum64_4_hi;
    var sum64_4_lo = utils.sum64_4_lo;
    var sum64_5_hi = utils.sum64_5_hi;
    var sum64_5_lo = utils.sum64_5_lo;
    var BlockHash = common.BlockHash;
    var sha512_K = [
      1116352408,
      3609767458,
      1899447441,
      602891725,
      3049323471,
      3964484399,
      3921009573,
      2173295548,
      961987163,
      4081628472,
      1508970993,
      3053834265,
      2453635748,
      2937671579,
      2870763221,
      3664609560,
      3624381080,
      2734883394,
      310598401,
      1164996542,
      607225278,
      1323610764,
      1426881987,
      3590304994,
      1925078388,
      4068182383,
      2162078206,
      991336113,
      2614888103,
      633803317,
      3248222580,
      3479774868,
      3835390401,
      2666613458,
      4022224774,
      944711139,
      264347078,
      2341262773,
      604807628,
      2007800933,
      770255983,
      1495990901,
      1249150122,
      1856431235,
      1555081692,
      3175218132,
      1996064986,
      2198950837,
      2554220882,
      3999719339,
      2821834349,
      766784016,
      2952996808,
      2566594879,
      3210313671,
      3203337956,
      3336571891,
      1034457026,
      3584528711,
      2466948901,
      113926993,
      3758326383,
      338241895,
      168717936,
      666307205,
      1188179964,
      773529912,
      1546045734,
      1294757372,
      1522805485,
      1396182291,
      2643833823,
      1695183700,
      2343527390,
      1986661051,
      1014477480,
      2177026350,
      1206759142,
      2456956037,
      344077627,
      2730485921,
      1290863460,
      2820302411,
      3158454273,
      3259730800,
      3505952657,
      3345764771,
      106217008,
      3516065817,
      3606008344,
      3600352804,
      1432725776,
      4094571909,
      1467031594,
      275423344,
      851169720,
      430227734,
      3100823752,
      506948616,
      1363258195,
      659060556,
      3750685593,
      883997877,
      3785050280,
      958139571,
      3318307427,
      1322822218,
      3812723403,
      1537002063,
      2003034995,
      1747873779,
      3602036899,
      1955562222,
      1575990012,
      2024104815,
      1125592928,
      2227730452,
      2716904306,
      2361852424,
      442776044,
      2428436474,
      593698344,
      2756734187,
      3733110249,
      3204031479,
      2999351573,
      3329325298,
      3815920427,
      3391569614,
      3928383900,
      3515267271,
      566280711,
      3940187606,
      3454069534,
      4118630271,
      4000239992,
      116418474,
      1914138554,
      174292421,
      2731055270,
      289380356,
      3203993006,
      460393269,
      320620315,
      685471733,
      587496836,
      852142971,
      1086792851,
      1017036298,
      365543100,
      1126000580,
      2618297676,
      1288033470,
      3409855158,
      1501505948,
      4234509866,
      1607167915,
      987167468,
      1816402316,
      1246189591
    ];
    function SHA512() {
      if (!(this instanceof SHA512))
        return new SHA512();
      BlockHash.call(this);
      this.h = [
        1779033703,
        4089235720,
        3144134277,
        2227873595,
        1013904242,
        4271175723,
        2773480762,
        1595750129,
        1359893119,
        2917565137,
        2600822924,
        725511199,
        528734635,
        4215389547,
        1541459225,
        327033209
      ];
      this.k = sha512_K;
      this.W = new Array(160);
    }
    utils.inherits(SHA512, BlockHash);
    module.exports = SHA512;
    SHA512.blockSize = 1024;
    SHA512.outSize = 512;
    SHA512.hmacStrength = 192;
    SHA512.padLength = 128;
    SHA512.prototype._prepareBlock = function _prepareBlock(msg, start) {
      var W = this.W;
      for (var i = 0; i < 32; i++)
        W[i] = msg[start + i];
      for (; i < W.length; i += 2) {
        var c0_hi = g1_512_hi(W[i - 4], W[i - 3]);
        var c0_lo = g1_512_lo(W[i - 4], W[i - 3]);
        var c1_hi = W[i - 14];
        var c1_lo = W[i - 13];
        var c2_hi = g0_512_hi(W[i - 30], W[i - 29]);
        var c2_lo = g0_512_lo(W[i - 30], W[i - 29]);
        var c3_hi = W[i - 32];
        var c3_lo = W[i - 31];
        W[i] = sum64_4_hi(
          c0_hi,
          c0_lo,
          c1_hi,
          c1_lo,
          c2_hi,
          c2_lo,
          c3_hi,
          c3_lo
        );
        W[i + 1] = sum64_4_lo(
          c0_hi,
          c0_lo,
          c1_hi,
          c1_lo,
          c2_hi,
          c2_lo,
          c3_hi,
          c3_lo
        );
      }
    };
    SHA512.prototype._update = function _update(msg, start) {
      this._prepareBlock(msg, start);
      var W = this.W;
      var ah = this.h[0];
      var al = this.h[1];
      var bh = this.h[2];
      var bl = this.h[3];
      var ch = this.h[4];
      var cl = this.h[5];
      var dh = this.h[6];
      var dl = this.h[7];
      var eh = this.h[8];
      var el = this.h[9];
      var fh = this.h[10];
      var fl = this.h[11];
      var gh = this.h[12];
      var gl = this.h[13];
      var hh = this.h[14];
      var hl = this.h[15];
      assert(this.k.length === W.length);
      for (var i = 0; i < W.length; i += 2) {
        var c0_hi = hh;
        var c0_lo = hl;
        var c1_hi = s1_512_hi(eh, el);
        var c1_lo = s1_512_lo(eh, el);
        var c2_hi = ch64_hi(eh, el, fh, fl, gh, gl);
        var c2_lo = ch64_lo(eh, el, fh, fl, gh, gl);
        var c3_hi = this.k[i];
        var c3_lo = this.k[i + 1];
        var c4_hi = W[i];
        var c4_lo = W[i + 1];
        var T1_hi = sum64_5_hi(
          c0_hi,
          c0_lo,
          c1_hi,
          c1_lo,
          c2_hi,
          c2_lo,
          c3_hi,
          c3_lo,
          c4_hi,
          c4_lo
        );
        var T1_lo = sum64_5_lo(
          c0_hi,
          c0_lo,
          c1_hi,
          c1_lo,
          c2_hi,
          c2_lo,
          c3_hi,
          c3_lo,
          c4_hi,
          c4_lo
        );
        c0_hi = s0_512_hi(ah, al);
        c0_lo = s0_512_lo(ah, al);
        c1_hi = maj64_hi(ah, al, bh, bl, ch, cl);
        c1_lo = maj64_lo(ah, al, bh, bl, ch, cl);
        var T2_hi = sum64_hi(c0_hi, c0_lo, c1_hi, c1_lo);
        var T2_lo = sum64_lo(c0_hi, c0_lo, c1_hi, c1_lo);
        hh = gh;
        hl = gl;
        gh = fh;
        gl = fl;
        fh = eh;
        fl = el;
        eh = sum64_hi(dh, dl, T1_hi, T1_lo);
        el = sum64_lo(dl, dl, T1_hi, T1_lo);
        dh = ch;
        dl = cl;
        ch = bh;
        cl = bl;
        bh = ah;
        bl = al;
        ah = sum64_hi(T1_hi, T1_lo, T2_hi, T2_lo);
        al = sum64_lo(T1_hi, T1_lo, T2_hi, T2_lo);
      }
      sum64(this.h, 0, ah, al);
      sum64(this.h, 2, bh, bl);
      sum64(this.h, 4, ch, cl);
      sum64(this.h, 6, dh, dl);
      sum64(this.h, 8, eh, el);
      sum64(this.h, 10, fh, fl);
      sum64(this.h, 12, gh, gl);
      sum64(this.h, 14, hh, hl);
    };
    SHA512.prototype._digest = function digest(enc) {
      if (enc === "hex")
        return utils.toHex32(this.h, "big");
      else
        return utils.split32(this.h, "big");
    };
    function ch64_hi(xh, xl, yh, yl, zh) {
      var r = xh & yh ^ ~xh & zh;
      if (r < 0)
        r += 4294967296;
      return r;
    }
    function ch64_lo(xh, xl, yh, yl, zh, zl) {
      var r = xl & yl ^ ~xl & zl;
      if (r < 0)
        r += 4294967296;
      return r;
    }
    function maj64_hi(xh, xl, yh, yl, zh) {
      var r = xh & yh ^ xh & zh ^ yh & zh;
      if (r < 0)
        r += 4294967296;
      return r;
    }
    function maj64_lo(xh, xl, yh, yl, zh, zl) {
      var r = xl & yl ^ xl & zl ^ yl & zl;
      if (r < 0)
        r += 4294967296;
      return r;
    }
    function s0_512_hi(xh, xl) {
      var c0_hi = rotr64_hi(xh, xl, 28);
      var c1_hi = rotr64_hi(xl, xh, 2);
      var c2_hi = rotr64_hi(xl, xh, 7);
      var r = c0_hi ^ c1_hi ^ c2_hi;
      if (r < 0)
        r += 4294967296;
      return r;
    }
    function s0_512_lo(xh, xl) {
      var c0_lo = rotr64_lo(xh, xl, 28);
      var c1_lo = rotr64_lo(xl, xh, 2);
      var c2_lo = rotr64_lo(xl, xh, 7);
      var r = c0_lo ^ c1_lo ^ c2_lo;
      if (r < 0)
        r += 4294967296;
      return r;
    }
    function s1_512_hi(xh, xl) {
      var c0_hi = rotr64_hi(xh, xl, 14);
      var c1_hi = rotr64_hi(xh, xl, 18);
      var c2_hi = rotr64_hi(xl, xh, 9);
      var r = c0_hi ^ c1_hi ^ c2_hi;
      if (r < 0)
        r += 4294967296;
      return r;
    }
    function s1_512_lo(xh, xl) {
      var c0_lo = rotr64_lo(xh, xl, 14);
      var c1_lo = rotr64_lo(xh, xl, 18);
      var c2_lo = rotr64_lo(xl, xh, 9);
      var r = c0_lo ^ c1_lo ^ c2_lo;
      if (r < 0)
        r += 4294967296;
      return r;
    }
    function g0_512_hi(xh, xl) {
      var c0_hi = rotr64_hi(xh, xl, 1);
      var c1_hi = rotr64_hi(xh, xl, 8);
      var c2_hi = shr64_hi(xh, xl, 7);
      var r = c0_hi ^ c1_hi ^ c2_hi;
      if (r < 0)
        r += 4294967296;
      return r;
    }
    function g0_512_lo(xh, xl) {
      var c0_lo = rotr64_lo(xh, xl, 1);
      var c1_lo = rotr64_lo(xh, xl, 8);
      var c2_lo = shr64_lo(xh, xl, 7);
      var r = c0_lo ^ c1_lo ^ c2_lo;
      if (r < 0)
        r += 4294967296;
      return r;
    }
    function g1_512_hi(xh, xl) {
      var c0_hi = rotr64_hi(xh, xl, 19);
      var c1_hi = rotr64_hi(xl, xh, 29);
      var c2_hi = shr64_hi(xh, xl, 6);
      var r = c0_hi ^ c1_hi ^ c2_hi;
      if (r < 0)
        r += 4294967296;
      return r;
    }
    function g1_512_lo(xh, xl) {
      var c0_lo = rotr64_lo(xh, xl, 19);
      var c1_lo = rotr64_lo(xl, xh, 29);
      var c2_lo = shr64_lo(xh, xl, 6);
      var r = c0_lo ^ c1_lo ^ c2_lo;
      if (r < 0)
        r += 4294967296;
      return r;
    }
  }
});

// ../node_modules/hash.js/lib/hash/sha/384.js
var require__5 = __commonJS({
  "../node_modules/hash.js/lib/hash/sha/384.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var SHA512 = require__4();
    function SHA384() {
      if (!(this instanceof SHA384))
        return new SHA384();
      SHA512.call(this);
      this.h = [
        3418070365,
        3238371032,
        1654270250,
        914150663,
        2438529370,
        812702999,
        355462360,
        4144912697,
        1731405415,
        4290775857,
        2394180231,
        1750603025,
        3675008525,
        1694076839,
        1203062813,
        3204075428
      ];
    }
    utils.inherits(SHA384, SHA512);
    module.exports = SHA384;
    SHA384.blockSize = 1024;
    SHA384.outSize = 384;
    SHA384.hmacStrength = 192;
    SHA384.padLength = 128;
    SHA384.prototype._digest = function digest(enc) {
      if (enc === "hex")
        return utils.toHex32(this.h.slice(0, 12), "big");
      else
        return utils.split32(this.h.slice(0, 12), "big");
    };
  }
});

// ../node_modules/hash.js/lib/hash/sha.js
var require_sha = __commonJS({
  "../node_modules/hash.js/lib/hash/sha.js"(exports) {
    "use strict";
    exports.sha1 = require__();
    exports.sha224 = require__3();
    exports.sha256 = require__2();
    exports.sha384 = require__5();
    exports.sha512 = require__4();
  }
});

// ../node_modules/hash.js/lib/hash/ripemd.js
var require_ripemd = __commonJS({
  "../node_modules/hash.js/lib/hash/ripemd.js"(exports) {
    "use strict";
    var utils = require_utils();
    var common = require_common();
    var rotl32 = utils.rotl32;
    var sum32 = utils.sum32;
    var sum32_3 = utils.sum32_3;
    var sum32_4 = utils.sum32_4;
    var BlockHash = common.BlockHash;
    function RIPEMD160() {
      if (!(this instanceof RIPEMD160))
        return new RIPEMD160();
      BlockHash.call(this);
      this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
      this.endian = "little";
    }
    utils.inherits(RIPEMD160, BlockHash);
    exports.ripemd160 = RIPEMD160;
    RIPEMD160.blockSize = 512;
    RIPEMD160.outSize = 160;
    RIPEMD160.hmacStrength = 192;
    RIPEMD160.padLength = 64;
    RIPEMD160.prototype._update = function update(msg, start) {
      var A = this.h[0];
      var B = this.h[1];
      var C = this.h[2];
      var D = this.h[3];
      var E = this.h[4];
      var Ah = A;
      var Bh = B;
      var Ch = C;
      var Dh = D;
      var Eh = E;
      for (var j = 0; j < 80; j++) {
        var T = sum32(
          rotl32(
            sum32_4(A, f(j, B, C, D), msg[r[j] + start], K(j)),
            s[j]
          ),
          E
        );
        A = E;
        E = D;
        D = rotl32(C, 10);
        C = B;
        B = T;
        T = sum32(
          rotl32(
            sum32_4(Ah, f(79 - j, Bh, Ch, Dh), msg[rh[j] + start], Kh(j)),
            sh[j]
          ),
          Eh
        );
        Ah = Eh;
        Eh = Dh;
        Dh = rotl32(Ch, 10);
        Ch = Bh;
        Bh = T;
      }
      T = sum32_3(this.h[1], C, Dh);
      this.h[1] = sum32_3(this.h[2], D, Eh);
      this.h[2] = sum32_3(this.h[3], E, Ah);
      this.h[3] = sum32_3(this.h[4], A, Bh);
      this.h[4] = sum32_3(this.h[0], B, Ch);
      this.h[0] = T;
    };
    RIPEMD160.prototype._digest = function digest(enc) {
      if (enc === "hex")
        return utils.toHex32(this.h, "little");
      else
        return utils.split32(this.h, "little");
    };
    function f(j, x, y, z) {
      if (j <= 15)
        return x ^ y ^ z;
      else if (j <= 31)
        return x & y | ~x & z;
      else if (j <= 47)
        return (x | ~y) ^ z;
      else if (j <= 63)
        return x & z | y & ~z;
      else
        return x ^ (y | ~z);
    }
    function K(j) {
      if (j <= 15)
        return 0;
      else if (j <= 31)
        return 1518500249;
      else if (j <= 47)
        return 1859775393;
      else if (j <= 63)
        return 2400959708;
      else
        return 2840853838;
    }
    function Kh(j) {
      if (j <= 15)
        return 1352829926;
      else if (j <= 31)
        return 1548603684;
      else if (j <= 47)
        return 1836072691;
      else if (j <= 63)
        return 2053994217;
      else
        return 0;
    }
    var r = [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      7,
      4,
      13,
      1,
      10,
      6,
      15,
      3,
      12,
      0,
      9,
      5,
      2,
      14,
      11,
      8,
      3,
      10,
      14,
      4,
      9,
      15,
      8,
      1,
      2,
      7,
      0,
      6,
      13,
      11,
      5,
      12,
      1,
      9,
      11,
      10,
      0,
      8,
      12,
      4,
      13,
      3,
      7,
      15,
      14,
      5,
      6,
      2,
      4,
      0,
      5,
      9,
      7,
      12,
      2,
      10,
      14,
      1,
      3,
      8,
      11,
      6,
      15,
      13
    ];
    var rh = [
      5,
      14,
      7,
      0,
      9,
      2,
      11,
      4,
      13,
      6,
      15,
      8,
      1,
      10,
      3,
      12,
      6,
      11,
      3,
      7,
      0,
      13,
      5,
      10,
      14,
      15,
      8,
      12,
      4,
      9,
      1,
      2,
      15,
      5,
      1,
      3,
      7,
      14,
      6,
      9,
      11,
      8,
      12,
      2,
      10,
      0,
      4,
      13,
      8,
      6,
      4,
      1,
      3,
      11,
      15,
      0,
      5,
      12,
      2,
      13,
      9,
      7,
      10,
      14,
      12,
      15,
      10,
      4,
      1,
      5,
      8,
      7,
      6,
      2,
      13,
      14,
      0,
      3,
      9,
      11
    ];
    var s = [
      11,
      14,
      15,
      12,
      5,
      8,
      7,
      9,
      11,
      13,
      14,
      15,
      6,
      7,
      9,
      8,
      7,
      6,
      8,
      13,
      11,
      9,
      7,
      15,
      7,
      12,
      15,
      9,
      11,
      7,
      13,
      12,
      11,
      13,
      6,
      7,
      14,
      9,
      13,
      15,
      14,
      8,
      13,
      6,
      5,
      12,
      7,
      5,
      11,
      12,
      14,
      15,
      14,
      15,
      9,
      8,
      9,
      14,
      5,
      6,
      8,
      6,
      5,
      12,
      9,
      15,
      5,
      11,
      6,
      8,
      13,
      12,
      5,
      12,
      13,
      14,
      11,
      8,
      5,
      6
    ];
    var sh = [
      8,
      9,
      9,
      11,
      13,
      15,
      15,
      5,
      7,
      7,
      8,
      11,
      14,
      14,
      12,
      6,
      9,
      13,
      15,
      7,
      12,
      8,
      9,
      11,
      7,
      7,
      12,
      7,
      6,
      15,
      13,
      11,
      9,
      7,
      15,
      11,
      8,
      6,
      6,
      14,
      12,
      13,
      5,
      14,
      13,
      13,
      7,
      5,
      15,
      5,
      8,
      11,
      14,
      14,
      6,
      14,
      6,
      9,
      12,
      9,
      12,
      5,
      15,
      8,
      8,
      5,
      12,
      9,
      12,
      5,
      14,
      6,
      8,
      13,
      6,
      5,
      15,
      13,
      11,
      11
    ];
  }
});

// ../node_modules/hash.js/lib/hash/hmac.js
var require_hmac = __commonJS({
  "../node_modules/hash.js/lib/hash/hmac.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var assert = require_minimalistic_assert();
    function Hmac(hash2, key, enc) {
      if (!(this instanceof Hmac))
        return new Hmac(hash2, key, enc);
      this.Hash = hash2;
      this.blockSize = hash2.blockSize / 8;
      this.outSize = hash2.outSize / 8;
      this.inner = null;
      this.outer = null;
      this._init(utils.toArray(key, enc));
    }
    module.exports = Hmac;
    Hmac.prototype._init = function init(key) {
      if (key.length > this.blockSize)
        key = new this.Hash().update(key).digest();
      assert(key.length <= this.blockSize);
      for (var i = key.length; i < this.blockSize; i++)
        key.push(0);
      for (i = 0; i < key.length; i++)
        key[i] ^= 54;
      this.inner = new this.Hash().update(key);
      for (i = 0; i < key.length; i++)
        key[i] ^= 106;
      this.outer = new this.Hash().update(key);
    };
    Hmac.prototype.update = function update(msg, enc) {
      this.inner.update(msg, enc);
      return this;
    };
    Hmac.prototype.digest = function digest(enc) {
      this.outer.update(this.inner.digest());
      return this.outer.digest(enc);
    };
  }
});

// ../node_modules/hash.js/lib/hash.js
var require_hash = __commonJS({
  "../node_modules/hash.js/lib/hash.js"(exports) {
    var hash2 = exports;
    hash2.utils = require_utils();
    hash2.common = require_common();
    hash2.sha = require_sha();
    hash2.ripemd = require_ripemd();
    hash2.hmac = require_hmac();
    hash2.sha1 = hash2.sha.sha1;
    hash2.sha256 = hash2.sha.sha256;
    hash2.sha224 = hash2.sha.sha224;
    hash2.sha384 = hash2.sha.sha384;
    hash2.sha512 = hash2.sha.sha512;
    hash2.ripemd160 = hash2.ripemd.ripemd160;
  }
});

// src/utils/certificate_parsing/parseCertificateNode.ts
import { execSync } from "child_process";
import { unlinkSync, writeFileSync } from "fs";
function addOpenSslInfo(certificateData, pem, fileName) {
  const baseFileName = fileName.replace(".pem", "");
  const tempCertPath = `/tmp/${baseFileName}.pem`;
  const formattedPem = pem.includes("-----BEGIN CERTIFICATE-----") ? pem : `-----BEGIN CERTIFICATE-----
${pem}
-----END CERTIFICATE-----`;
  writeFileSync(tempCertPath, formattedPem);
  try {
    const openSslOutput = execSync(`openssl x509 -in ${tempCertPath} -text -noout`).toString();
    certificateData.rawTxt = openSslOutput;
  } catch (error) {
    console.error(`Error executing OpenSSL command: ${error}`);
    certificateData.rawTxt = "Error: Unable to generate human-readable format";
  } finally {
    try {
      unlinkSync(tempCertPath);
    } catch (e) {
    }
  }
  return certificateData;
}

// src/utils/certificate_parsing/parseCertificateSimple.ts
import * as asn1js2 from "asn1js";
import { Certificate, RSAPublicKey, RSASSAPSSParams } from "pkijs";

// src/utils/certificate_parsing/curves.ts
function getCurveForElliptic(curveName) {
  const curves = {
    secp224r1: "p224",
    secp256r1: "p256",
    secp384r1: "p384",
    secp521r1: "p521",
    brainpoolP224r1: "brainpoolP224r1",
    brainpoolP256r1: "brainpoolP256r1",
    brainpoolP384r1: "brainpoolP384r1",
    brainpoolP512r1: "brainpoolP512r1"
  };
  if (!curves[curveName]) {
    throw new Error("Invalid curve: " + curveName);
  }
  return curves[curveName];
}
function getECDSACurveBits(curveName) {
  const curveBits = {
    secp224r1: 224,
    secp256r1: 256,
    secp384r1: 384,
    secp521r1: 521,
    brainpoolP224r1: 224,
    brainpoolP256r1: 256,
    brainpoolP384r1: 384,
    brainpoolP512r1: 512
  };
  if (curveName in curveBits) {
    return curveBits[curveName].toString();
  }
  console.log("\x1B[31m%s\x1B[0m", `curve name ${curveName} not found in curveBits`);
  return "unknown";
}
function identifyCurve(params) {
  const normalizedParams = {
    p: normalizeHex(params.p),
    a: normalizeHex(params.a),
    b: normalizeHex(params.b),
    G: normalizeHex(params.G),
    n: normalizeHex(params.n),
    h: normalizeHex(params.h)
  };
  for (const curve of standardCurves) {
    if (normalizedParams.p === normalizeHex(curve.p) && normalizedParams.a === normalizeHex(curve.a) && normalizedParams.b === normalizeHex(curve.b) && normalizedParams.G === normalizeHex(curve.G) && normalizedParams.n === normalizeHex(curve.n) && normalizedParams.h === normalizeHex(curve.h)) {
      return curve.name;
    }
  }
  console.log("Unknown curve:", normalizedParams);
  return "Unknown curve";
}
function normalizeHex(hex) {
  return hex.toLowerCase().replace(/^0x/, "").replace(/^00/, "");
}
var standardCurves = [
  {
    name: "secp192r1",
    p: "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFF",
    a: "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFC",
    b: "64210519E59C80E70FA7E9AB72243049FEB8DEECC146B9B1",
    G: "04188DA80EB03090F67CBF20EB43A18800F4FF0AFD82FF101207192B95FFC8DA78631011ED6B24CDD573F977A11E794811",
    n: "FFFFFFFFFFFFFFFFFFFFFFFF99DEF836146BC9B1B4D22831",
    h: "01"
  },
  {
    name: "secp224r1",
    p: "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF000000000000000000000001",
    a: "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFE",
    b: "B4050A850C04B3ABF54132565044B0B7D7BFD8BA270B39432355FFB4",
    G: "04B70E0CBD6BB4BF7F321390B94A03C1D356C21122343280D6115C1D21BD376388B5F723FB4C22DFE6CD4375A05A07476444D5819985007E34",
    n: "FFFFFFFFFFFFFFFFFFFFFFFFFFFF16A2E0B8F03E13DD29455C5C2A3D",
    h: "01"
  },
  {
    name: "secp256r1",
    p: "FFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFF",
    a: "FFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFC",
    b: "5AC635D8AA3A93E7B3EBBD55769886BC651D06B0CC53B0F63BCE3C3E27D2604B",
    G: "046B17D1F2E12C4247F8BCE6E563A440F277037D812DEB33A0F4A13945D898C2964FE342E2FE1A7F9B8EE7EB4A7C0F9E162BCE33576B315ECECBB6406837BF51F5",
    n: "FFFFFFFF00000000FFFFFFFFFFFFFFFFBCE6FAADA7179E84F3B9CAC2FC632551",
    h: "01"
  },
  {
    name: "secp384r1",
    p: "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFF0000000000000000FFFFFFFF",
    a: "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFF0000000000000000FFFFFFFC",
    b: "B3312FA7E23EE7E4988E056BE3F82D19181D9C6EFE8141120314088F5013875AC656398D8A2ED19D2A85C8EDD3EC2AEF",
    G: "04AA87CA22BE8B05378EB1C71EF320AD746E1D3B628BA79B9859F741E082542A385502F25DBF55296C3A545E3872760AB73617DE4A96262C6F5D9E98BF9292DC29F8F41DBD289A147CE9DA3113B5F0B8C00A60B1CE1D7E819D7A431D7C90EA0E5F",
    n: "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFC7634D81F4372DDF581A0DB248B0A77AECEC196ACCC52973",
    h: "01"
  },
  {
    name: "secp521r1",
    p: "01FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF",
    a: "01FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFC",
    b: "0051953EB9618E1C9A1F929A21A0B68540EEA2DA725B99B315F3B8B489918EF109E156193951EC7E937B1652C0BD3BB1BF073573DF883D2C34F1EF451FD46B503F00",
    G: "0400C6858E06B70404E9CD9E3ECB662395B4429C648139053FB521F828AF606B4D3DBAA14B5E77EFE75928FE1DC127A2FFA8DE3348B3C1856A429BF97E7E31C2E5BD66011839296A789A3BC0045C8A5FB42C7D1BD998F54449579B446817AFBD17273E662C97EE72995EF42640C550B9013FAD0761353C7086A272C24088BE94769FD16650",
    n: "01FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFA51868783BF2F966B7FCC0148F709A5D03BB5C9B8899C47AEBB6FB71E91386409",
    h: "01"
  },
  {
    name: "brainpoolP192r1",
    p: "C302F41D932A36CDA7A3463093D18DB78FCE476DE1A86297",
    a: "6A91174076B1E0E19C39C031FE8685C1CAE040E5C69A28EF",
    b: "469A28EF7C28CCA3DC721D044F4496BCCA7EF4146FBF25C9",
    G: "04C0A0647EAA7F9B8EE7C1AC4D77FC94CA14B690866ABD5BB88B5F4828C1490002E6773FA2FA299B8F",
    n: "C302F41D932A36CDA7A3463093D18DB78FCE476DE1A86294",
    h: "01"
  },
  {
    name: "brainpoolP224r1",
    p: "d7c134aa264366862a18302575d1d787b09f075797da89f57ec8c0ff",
    a: "68a5e62ca9ce6c1c299803a6c1530b514e182ad8b0042a59cad29f43",
    b: "2580f63ccfe44138870713b1a92369e33e2135d266dbb372386c400b",
    G: "040d9029ad2c7e5cf4340823b2a87dc68c9e4ce3174c1e6efdee12c07d58aa56f772c0726f24c6b89e4ecdac24354b9e99caa3f6d3761402cd",
    n: "d7c134aa264366862a18302575d0fb98d116bc4b6ddebca3a5a7939f",
    h: "01"
  },
  {
    name: "brainpoolP256r1",
    p: "A9FB57DBA1EEA9BC3E660A909D838D726E3BF623D52620282013481D1F6E5377",
    a: "7D5A0975FC2C3057EEF67530417AFFE7FB8055C126DC5C6CE94A4B44F330B5D9",
    b: "26DC5C6CE94A4B44F330B5D9BBD77CBF958416295CF7E1CE6BCCDC18FF8C07B6",
    G: "048BD2AEB9CB7E57CB2C4B482FFC81B7AFB9DE27E1E3BD23C23A4453BD9ACE3262547EF835C3DAC4FD97F8461A14611DC9C27745132DED8E545C1D54C72F046997",
    n: "A9FB57DBA1EEA9BC3E660A909D838D718C397AA3B561A6F7901E0E82974856A7",
    h: "01"
  },
  {
    name: "brainpoolP384r1",
    p: "8CB91E82A3386D280F5D6F7E50E641DF152F7109ED5456B412B1DA197FB71123ACD3A729901D1A71874700133107EC53",
    a: "7BC382C63D8C150C3C72080ACE05AFA0C2BEA28E4FB22787139165EFBA91F90F8AA5814A503AD4EB04A8C7DD22CE2826",
    b: "04A8C7DD22CE28268B39B55416F0447C2FB77DE107DCD2A62E880EA53EEB62D57CB4390295DBC9943AB78696FA504C11",
    G: "041D1C64F068CF45FFA2A63A81B7C13F6B8847A3E77EF14FE3DB7FCAFE0CBD10E8E826E03436D646AAEF87B2E247D4AF1E8ABE1D7520F9C2A45CB1EB8E95CFD55262B70B29FEEC5864E19C054FF99129280E4646217791811142820341263C5315",
    n: "8CB91E82A3386D280F5D6F7E50E641DF152F7109ED5456B31F166E6CAC0425A7CF3AB6AF6B7FC3103B883202E9046565",
    h: "01"
  },
  {
    name: "brainpoolP512r1",
    p: "AADD9DB8DBE9C48B3FD4E6AE33C9FC07CB308DB3B3C9D20ED6639CCA703308717D4D9B009BC66842AECDA12AE6A380E62881FF2F2D82C68528AA6056583A48F3",
    a: "7830A3318B603B89E2327145AC234CC594CBDD8D3DF91610A83441CAEA9863BC2DED5D5AA8253AA10A2EF1C98B9AC8B57F1117A72BF2C7B9E7C1AC4D77FC94CA",
    b: "3DF91610A83441CAEA9863BC2DED5D5AA8253AA10A2EF1C98B9AC8B57F1117A72BF2C7B9E7C1AC4D77FC94CADC083E67984050B75EBAE5DD2809BD638016F723",
    G: "0481AEE4BDD82ED9645A21322E9C4C6A9385ED9F70B5D916C1B43B62EEF4D0098EFF3B1F78E2D0D48D50D1687B93B97D5F7C6D5047406A5E688B352209BCB9F8227DDE385D566332ECC0EABFA9CF7822FDF209F70024A57B1AA000C55B881F8111B2DCDE494A5F485E5BCA4BD88A2763AED1CA2B2FA8F0540678CD1E0F3AD80892",
    n: "AADD9DB8DBE9C48B3FD4E6AE33C9FC07CB308DB3B3C9D20ED6639CCA70330870553E5C414CA92619418661197FAC10471DB1D381085DDADDB58796829CA90069",
    h: "01"
  }
];

// src/utils/certificate_parsing/elliptic.ts
var import_hash = __toESM(require_hash(), 1);
import elliptic from "elliptic";
function initElliptic() {
  const curves = elliptic.curves;
  const PresetCurve = elliptic.curves.PresetCurve;
  function defineCurve(name, options) {
    Object.defineProperty(curves, name, {
      configurable: true,
      enumerable: true,
      get: function() {
        const curve = new PresetCurve(options);
        Object.defineProperty(curves, name, {
          configurable: true,
          enumerable: true,
          value: curve
        });
        return curve;
      }
    });
  }
  defineCurve("brainpoolP224r1", {
    type: "short",
    prime: null,
    p: "d7c134aa 26436686 2a183025 75d1d787 b09f0757 97da89f5 7ec8c0ff",
    a: "68a5e62c a9ce6c1c 299803a6 c1530b51 4e182ad8 b0042a59 cad29f43",
    b: "2580f63c cfe44138 870713b1 a92369e3 3e2135d2 66dbb372 386c400b",
    n: "d7c134aa 26436686 2a183025 75d0fb98 d116bc4b 6ddebca3 a5a7939f",
    hash: import_hash.default.sha1,
    gRed: false,
    g: [
      "0d9029ad 2c7e5cf4 340823b2 a87dc68c 9e4ce317 4c1e6efd ee12c07d",
      "58aa56f7 72c0726f 24c6b89e 4ecdac24 354b9e99 caa3f6d3 761402cd"
    ]
  });
  defineCurve("brainpoolP256r1", {
    type: "short",
    prime: null,
    p: "a9fb57db a1eea9bc 3e660a90 9d838d72 6e3bf623 d5262028 2013481d 1f6e5377",
    a: "7d5a0975 fc2c3057 eef67530 417affe7 fb8055c1 26dc5c6c e94a4b44 f330b5d9",
    b: "26dc5c6c e94a4b44 f330b5d9 bbd77cbf 95841629 5cf7e1ce 6bccdc18 ff8c07b6",
    n: "a9fb57db a1eea9bc 3e660a90 9d838d71 8c397aa3 b561a6f7 901e0e82 974856a7",
    hash: import_hash.default.sha256,
    gRed: false,
    g: [
      "8bd2aeb9 cb7e57cb 2c4b482f fc81b7af b9de27e1 e3bd23c2 3a4453bd 9ace3262",
      "547ef835 c3dac4fd 97f8461a 14611dc9 c2774513 2ded8e54 5c1d54c7 2f046997"
    ]
  });
  defineCurve("brainpoolP384r1", {
    type: "short",
    prime: null,
    p: "8cb91e82 a3386d28 0f5d6f7e 50e641df 152f7109 ed5456b4 12b1da19 7fb71123 acd3a729 901d1a71 87470013 3107ec53",
    a: "7bc382c6 3d8c150c 3c72080a ce05afa0 c2bea28e 4fb22787 139165ef ba91f90f 8aa5814a 503ad4eb 04a8c7dd 22ce2826",
    b: "04a8c7dd 22ce2826 8b39b554 16f0447c 2fb77de1 07dcd2a6 2e880ea5 3eeb62d5 7cb43902 95dbc994 3ab78696 fa504c11",
    n: "8cb91e82 a3386d28 0f5d6f7e 50e641df 152f7109 ed5456b3 1f166e6c ac0425a7 cf3ab6af 6b7fc310 3b883202 e9046565",
    hash: import_hash.default.sha384,
    gRed: false,
    g: [
      "1d1c64f0 68cf45ff a2a63a81 b7c13f6b 8847a3e7 7ef14fe3 db7fcafe 0cbd10e8 e826e034 36d646aa ef87b2e2 47d4af1e",
      "8abe1d75 20f9c2a4 5cb1eb8e 95cfd552 62b70b29 feec5864 e19c054f f9912928 0e464621 77918111 42820341 263c5315"
    ]
  });
  defineCurve("brainpoolP512r1", {
    type: "short",
    prime: null,
    p: "aadd9db8 dbe9c48b 3fd4e6ae 33c9fc07 cb308db3 b3c9d20e d6639cca 70330871 7d4d9b00 9bc66842 aecda12a e6a380e6 2881ff2f 2d82c685 28aa6056 583a48f3",
    a: "7830a331 8b603b89 e2327145 ac234cc5 94cbdd8d 3df91610 a83441ca ea9863bc 2ded5d5a a8253aa1 0a2ef1c9 8b9ac8b5 7f1117a7 2bf2c7b9 e7c1ac4d 77fc94ca",
    b: "3df91610 a83441ca ea9863bc 2ded5d5a a8253aa1 0a2ef1c9 8b9ac8b5 7f1117a7 2bf2c7b9 e7c1ac4d 77fc94ca dc083e67 984050b7 5ebae5dd 2809bd63 8016f723",
    n: "aadd9db8 dbe9c48b 3fd4e6ae 33c9fc07 cb308db3 b3c9d20e d6639cca 70330870 553e5c41 4ca92619 41866119 7fac1047 1db1d381 085ddadd b5879682 9ca90069",
    hash: import_hash.default.sha512,
    gRed: false,
    g: [
      "81aee4bd d82ed964 5a21322e 9c4c6a93 85ed9f70 b5d916c1 b43b62ee f4d0098e ff3b1f78 e2d0d48d 50d1687b 93b97d5f 7c6d5047 406a5e68 8b352209 bcb9f822",
      "7dde385d 566332ec c0eabfa9 cf7822fd f209f700 24a57b1a a000c55b 881f8111 b2dcde49 4a5f485e 5bca4bd8 8a2763ae d1ca2b2f a8f05406 78cd1e0f 3ad80892"
    ]
  });
  return elliptic;
}

// src/utils/certificate_parsing/oids.ts
function getFriendlyName(oid) {
  return getFriendlyNameSecpCurves(oidMap[oid]) || "Unknown Algorithm";
}
function getSecpFromNist(nist) {
  switch (nist) {
    case "nistP224":
      return "secp224r1";
    case "nistP256":
      return "secp256r1";
    case "nistP384":
      return "secp384r1";
    case "nistP521":
      return "secp521r1";
  }
  return nist;
}
function getFriendlyNameSecpCurves(friendlyName) {
  return mapSecpCurves[friendlyName] || friendlyName;
}
var mapSecpCurves = {
  ECDSA_224: "secp224r1",
  ECDSA_P256: "secp256r1",
  ECDSA_P384: "secp384r1",
  ECDSA_P521: "secp521r1"
};
var oidMap = {
  "1.2.840.113549.3.7": "3des",
  "2.16.840.1.101.3.4.1.2": "aes128",
  "2.16.840.1.101.3.4.1.5": "aes128wrap",
  "2.16.840.1.101.3.4.1.22": "aes192",
  "2.16.840.1.101.3.4.1.25": "aes192wrap",
  "2.16.840.1.101.3.4.1.42": "aes256",
  "2.16.840.1.101.3.4.1.45": "aes256wrap",
  "1.3.36.3.3.2.8.1.1.1": "brainpoolP160r1",
  "1.3.36.3.3.2.8.1.1.2": "brainpoolP160t1",
  "1.3.36.3.3.2.8.1.1.3": "brainpoolP192r1",
  "1.3.36.3.3.2.8.1.1.4": "brainpoolP192t1",
  "1.3.36.3.3.2.8.1.1.5": "brainpoolP224r1",
  "1.3.36.3.3.2.8.1.1.6": "brainpoolP224t1",
  "1.3.36.3.3.2.8.1.1.7": "brainpoolP256r1",
  "1.3.36.3.3.2.8.1.1.8": "brainpoolP256t1",
  "1.3.36.3.3.2.8.1.1.9": "brainpoolP320r1",
  "1.3.36.3.3.2.8.1.1.10": "brainpoolP320t1",
  "1.3.36.3.3.2.8.1.1.11": "brainpoolP384r1",
  "1.3.36.3.3.2.8.1.1.12": "brainpoolP384t1",
  "1.3.36.3.3.2.8.1.1.13": "brainpoolP512r1",
  "1.3.36.3.3.2.8.1.1.14": "brainpoolP512t1",
  "2.5.4.6": "C",
  "1.2.840.113549.1.9.16.3.6": "CMS3DESwrap",
  "1.2.840.113549.1.9.16.3.7": "CMSRC2wrap",
  "2.5.4.3": "CN",
  "1.3.6.1.5.5.7.2.1": "CPS",
  "0.9.2342.19200300.100.1.25": "DC",
  "1.3.14.3.2.7": "des",
  "2.5.4.13": "Description",
  "1.2.840.10046.2.1": "DH",
  "2.5.4.46": "dnQualifier",
  "1.2.840.10040.4.1": "DSA",
  "1.3.14.3.2.27": "dsaSHA1",
  "1.2.840.113549.1.9.1": "E",
  "1.2.156.11235.1.1.2.1": "ec192wapi",
  "1.2.840.10045.2.1": "ECC",
  "1.3.133.16.840.63.0.2": "ECDH_STD_SHA1_KDF",
  "1.3.132.1.11.1": "ECDH_STD_SHA256_KDF",
  "1.3.132.1.11.2": "ECDH_STD_SHA384_KDF",
  "1.2.840.10045.3.1.7": "ECDSA_P256",
  "1.3.132.0.34": "ECDSA_P384",
  "1.3.132.0.35": "ECDSA_P521",
  "1.2.840.113549.1.9.16.3.5": "ESDH",
  "2.5.4.42": "G",
  "2.5.4.43": "I",
  "2.5.4.7": "L",
  "1.2.840.113549.2.2": "md2",
  "1.2.840.113549.1.1.2": "md2RSA",
  "1.2.840.113549.2.4": "md4",
  "1.2.840.113549.1.1.3": "md4RSA",
  "1.2.840.113549.2.5": "md5",
  "1.2.840.113549.1.1.4": "md5RSA",
  "1.2.840.113549.1.1.8": "mgf1",
  "2.16.840.1.101.2.1.1.20": "mosaicKMandUpdSig",
  "2.16.840.1.101.2.1.1.19": "mosaicUpdatedSig",
  "1.2.840.10045.3.1.1": "nistP192",
  "1.3.132.0.33": "nistP224",
  "1.3.6.1.5.5.7.6.2": "NO_SIGN",
  "2.5.4.10": "O",
  "2.5.4.11": "OU",
  "2.5.4.20": "Phone",
  "2.5.4.18": "POBox",
  "2.5.4.17": "PostalCode",
  "1.2.840.113549.3.2": "rc2",
  "1.2.840.113549.3.4": "rc4",
  "1.2.840.113549.1.1.1": "RSA",
  "1.2.840.113549.1.1.7": "RSAES_OAEP",
  "1.2.840.113549.1.1.10": "RSASSA_PSS",
  "2.5.4.8": "S",
  "1.3.132.0.9": "secP160k1",
  "1.3.132.0.8": "secP160r1",
  "1.3.132.0.30": "secP160r2",
  "1.3.132.0.31": "secP192k1",
  "1.3.132.0.32": "secP224k1",
  "1.3.132.0.10": "secP256k1",
  "2.5.4.5": "SERIALNUMBER",
  "1.3.14.3.2.26": "sha1",
  "1.2.840.10040.4.3": "sha1DSA",
  "1.2.840.10045.4.1": "sha1ECDSA",
  "1.2.840.113549.1.1.5": "sha1RSA",
  "1.2.840.10045.4.3.1": "sha224ECDSA",
  "1.2.840.113549.1.1.14": "sha224RSA",
  "2.16.840.1.101.3.4.2.1": "sha256",
  "1.2.840.10045.4.3.2": "sha256ECDSA",
  "1.2.840.113549.1.1.11": "sha256RSA",
  "2.16.840.1.101.3.4.2.2": "sha384",
  "1.2.840.10045.4.3.3": "sha384ECDSA",
  "1.2.840.113549.1.1.12": "sha384RSA",
  "2.16.840.1.101.3.4.2.3": "sha512",
  "1.2.840.10045.4.3.4": "sha512ECDSA",
  "1.2.840.113549.1.1.13": "sha512RSA",
  "2.5.4.4": "SN",
  "1.2.840.10045.4.3": "specifiedECDSA",
  "2.5.4.9": "STREET",
  "2.5.4.12": "T",
  "2.23.133.2.1": "TPMManufacturer",
  "2.23.133.2.2": "TPMModel",
  "2.23.133.2.3": "TPMVersion",
  "2.23.43.1.4.9": "wtls9",
  "2.5.4.24": "X21Address",
  "1.2.840.10045.3.1.2": "x962P192v2",
  "1.2.840.10045.3.1.3": "x962P192v3",
  "1.2.840.10045.3.1.4": "x962P239v1",
  "1.2.840.10045.3.1.5": "x962P239v2",
  "1.2.840.10045.3.1.6": "x962P239v3"
};

// src/utils/certificate_parsing/utils.ts
import * as asn1js from "asn1js";
import { sha256 } from "js-sha256";
function getIssuerCountryCode(cert) {
  const issuerRDN = cert.issuer.typesAndValues;
  let issuerCountryCode = "";
  for (const rdn of issuerRDN) {
    if (rdn.type === "2.5.4.6") {
      issuerCountryCode = rdn.value.valueBlock.value;
      break;
    }
  }
  return issuerCountryCode.toUpperCase();
}
var getSubjectKeyIdentifier = (cert) => {
  const subjectKeyIdentifier = cert.extensions.find((ext) => ext.extnID === "2.5.29.14");
  if (subjectKeyIdentifier) {
    let skiValue = Buffer.from(subjectKeyIdentifier.extnValue.valueBlock.valueHexView).toString(
      "hex"
    );
    skiValue = skiValue.replace(/^(?:30(?:16|1E|22|32|42))?(?:04(?:08|14|1C|20|30|40))?/, "");
    return skiValue;
  } else {
    const hash2 = sha256.create();
    hash2.update(cert.tbsView);
    return hash2.hex();
  }
};

// src/utils/certificate_parsing/parseCertificateSimple.ts
var getAuthorityKeyIdentifier = (cert) => {
  const authorityKeyIdentifier = cert.extensions.find((ext) => ext.extnID === "2.5.29.35");
  if (authorityKeyIdentifier) {
    let akiValue = Buffer.from(authorityKeyIdentifier.extnValue.valueBlock.valueHexView).toString(
      "hex"
    );
    const sequenceMatch = akiValue.match(/^30([0-9a-f]{2}|8[0-9a-f][0-9a-f])/i);
    if (sequenceMatch) {
    }
    const keyIdMatch = akiValue.match(/80([0-9a-f]{2})/i);
    if (keyIdMatch) {
      const keyIdLength = parseInt(keyIdMatch[1], 16);
      const startIndex = akiValue.indexOf(keyIdMatch[0]) + 4;
      akiValue = akiValue.slice(startIndex, startIndex + keyIdLength * 2);
      return akiValue.toUpperCase();
    }
  }
  return null;
};
function getParamsRSA(cert) {
  const publicKeyValue = cert.subjectPublicKeyInfo.parsedKey;
  const modulusBytes = publicKeyValue.modulus.valueBlock.valueHexView;
  const modulusHex = Buffer.from(modulusBytes).toString("hex");
  const exponentBigInt = publicKeyValue.publicExponent.toBigInt();
  const exponentDecimal = exponentBigInt.toString();
  const actualBits = modulusBytes.length * 8;
  return {
    modulus: modulusHex,
    exponent: exponentDecimal,
    bits: actualBits.toString()
  };
}
function getParamsRSAPSS(cert) {
  const spki = cert.subjectPublicKeyInfo;
  const spkiValueHex = spki.subjectPublicKey.valueBlock.valueHexView;
  const asn1PublicKey = asn1js2.fromBER(spkiValueHex);
  if (asn1PublicKey.offset === -1) {
    throw new Error("Error parsing public key ASN.1 structure");
  }
  const rsaPublicKey = new RSAPublicKey({ schema: asn1PublicKey.result });
  const modulusBytes = rsaPublicKey.modulus.valueBlock.valueHexView;
  const modulusHex = Buffer.from(modulusBytes).toString("hex");
  const exponentBigInt = rsaPublicKey.publicExponent.toBigInt();
  const exponentDecimal = exponentBigInt.toString();
  const actualBits = modulusBytes.length * 8;
  const sigAlgParams = cert.signatureAlgorithm.algorithmParams;
  const pssParams = new RSASSAPSSParams({ schema: sigAlgParams });
  const hashAlgorithm = getFriendlyName(pssParams.hashAlgorithm.algorithmId);
  const mgf = getFriendlyName(pssParams.maskGenAlgorithm.algorithmId);
  return {
    modulus: modulusHex,
    exponent: exponentDecimal,
    bits: actualBits.toString(),
    hashAlgorithm,
    mgf,
    saltLength: pssParams.saltLength.toString()
  };
}
function getCertificateFromPem(pemContent) {
  const pemFormatted = pemContent.replace(/(-----(BEGIN|END) CERTIFICATE-----|\n|\r)/g, "");
  const binary = Buffer.from(pemFormatted, "base64");
  const arrayBuffer = new ArrayBuffer(binary.length);
  const view = new Uint8Array(arrayBuffer);
  for (let i = 0; i < binary.length; i++) {
    view[i] = binary[i];
  }
  const asn1 = asn1js2.fromBER(arrayBuffer);
  if (asn1.offset === -1) {
    throw new Error(`ASN.1 parsing error: ${asn1.result.error}`);
  }
  return new Certificate({ schema: asn1.result });
}
function getHashAlgorithm(rawSignatureAlgorithm) {
  const input = rawSignatureAlgorithm.toLowerCase();
  const patterns = [/sha-?1/i, /sha-?224/i, /sha-?256/i, /sha-?384/i, /sha-?512/i];
  for (const pattern of patterns) {
    const match = input.match(pattern);
    if (match) {
      return match[0].replace("-", "");
    }
  }
  return "unknown";
}
function getParamsECDSA(cert) {
  try {
    const algorithmParams = cert.subjectPublicKeyInfo.algorithm.algorithmParams;
    if (!algorithmParams) {
      console.error("No algorithm params found");
      return {
        curve: "Unknown",
        params: {},
        bits: "Unknown",
        x: "Unknown",
        y: "Unknown"
      };
    }
    let curveName, bits, x, y = "Unknown";
    const curveParams = {};
    if (algorithmParams instanceof asn1js2.ObjectIdentifier) {
      const curveOid = algorithmParams.valueBlock.toString();
      curveName = getSecpFromNist(getFriendlyName(curveOid)) || "Unknown";
      bits = getECDSACurveBits(curveName);
    } else {
      const params = asn1js2.fromBER(algorithmParams.valueBeforeDecodeView).result;
      const valueBlock = params.valueBlock;
      if (valueBlock.value && valueBlock.value.length >= 5) {
        const curveParams2 = {};
        const fieldId = valueBlock.value[1];
        if (fieldId && fieldId.valueBlock && fieldId.valueBlock.value) {
          const fieldType = fieldId.valueBlock.value[0];
          const prime = fieldId.valueBlock.value[1];
          curveParams2.p = Buffer.from(prime.valueBlock.valueHexView).toString("hex");
        }
        const curveCoefficients = valueBlock.value[2];
        if (curveCoefficients && curveCoefficients.valueBlock && curveCoefficients.valueBlock.value) {
          const a = curveCoefficients.valueBlock.value[0];
          const b = curveCoefficients.valueBlock.value[1];
          curveParams2.a = Buffer.from(a.valueBlock.valueHexView).toString("hex");
          curveParams2.b = Buffer.from(b.valueBlock.valueHexView).toString("hex");
        }
        const basePoint = valueBlock.value[3];
        if (basePoint && basePoint.valueBlock) {
          curveParams2.G = Buffer.from(basePoint.valueBlock.valueHexView).toString("hex");
        }
        const order = valueBlock.value[4];
        if (order && order.valueBlock) {
          curveParams2.n = Buffer.from(order.valueBlock.valueHexView).toString("hex");
        }
        if (valueBlock.value.length >= 6) {
          const cofactor = valueBlock.value[5];
          if (cofactor && cofactor.valueBlock) {
            curveParams2.h = Buffer.from(cofactor.valueBlock.valueHexView).toString("hex");
          }
        } else {
          curveParams2.h = "01";
        }
        const identifiedCurve = identifyCurve(curveParams2);
        curveName = identifiedCurve;
        bits = getECDSACurveBits(curveName);
      } else {
        if (valueBlock.value) {
          console.log(valueBlock.value);
        } else {
          console.log("No value block found");
        }
      }
    }
    const publicKeyBuffer = cert.subjectPublicKeyInfo.subjectPublicKey.valueBlock.valueHexView;
    if (publicKeyBuffer && curveName !== "Unknown") {
      const elliptic2 = initElliptic();
      const ec = new elliptic2.ec(getCurveForElliptic(curveName));
      const key = ec.keyFromPublic(publicKeyBuffer);
      const x_point = key.getPublic().getX().toString("hex");
      const y_point = key.getPublic().getY().toString("hex");
      if (curveName === "secp521r1" || curveName === "brainpoolP521r1") {
        x = x_point.padStart(132, "0");
        y = y_point.padStart(132, "0");
      } else {
        x = x_point.length % 2 === 0 ? x_point : "0" + x_point;
        y = y_point.length % 2 === 0 ? y_point : "0" + y_point;
      }
    }
    return { curve: curveName, params: curveParams, bits, x, y };
  } catch (error) {
    console.error("Error parsing EC parameters:", error);
    return {
      curve: "Error",
      params: {},
      bits: "Unknown",
      x: "Unknown",
      y: "Unknown"
    };
  }
}
function getTBSBytesForge(certificate) {
  return Array.from(certificate.tbsView.map((byte) => parseInt(byte.toString(16), 16)));
}
function parseCertificateSimple(pem) {
  const certificateData = {
    id: "",
    issuer: "",
    validity: {
      notBefore: "",
      notAfter: ""
    },
    subjectKeyIdentifier: "",
    authorityKeyIdentifier: "",
    signatureAlgorithm: "",
    hashAlgorithm: "",
    publicKeyDetails: void 0,
    tbsBytes: void 0,
    tbsBytesLength: "",
    rawPem: "",
    rawTxt: "",
    publicKeyAlgoOID: ""
  };
  try {
    const cert = getCertificateFromPem(pem);
    certificateData.tbsBytes = getTBSBytesForge(cert);
    certificateData.tbsBytesLength = certificateData.tbsBytes.length.toString();
    const publicKeyAlgoOID = cert.subjectPublicKeyInfo.algorithm.algorithmId;
    const publicKeyAlgoFN = getFriendlyName(publicKeyAlgoOID);
    const signatureAlgoOID = cert.signatureAlgorithm.algorithmId;
    const signatureAlgoFN = getFriendlyName(signatureAlgoOID);
    certificateData.hashAlgorithm = getHashAlgorithm(signatureAlgoFN);
    certificateData.publicKeyAlgoOID = publicKeyAlgoOID;
    let params;
    if (publicKeyAlgoFN === "RSA" && signatureAlgoFN != "RSASSA_PSS") {
      certificateData.signatureAlgorithm = "rsa";
      params = getParamsRSA(cert);
    } else if (publicKeyAlgoFN === "ECC") {
      certificateData.signatureAlgorithm = "ecdsa";
      params = getParamsECDSA(cert);
    } else if (publicKeyAlgoFN === "RSASSA_PSS" || signatureAlgoFN === "RSASSA_PSS") {
      certificateData.signatureAlgorithm = "rsapss";
      params = getParamsRSAPSS(cert);
    } else {
      console.log(publicKeyAlgoFN);
    }
    certificateData.publicKeyDetails = params;
    certificateData.issuer = getIssuerCountryCode(cert);
    certificateData.validity = {
      notBefore: cert.notBefore.value.toString(),
      notAfter: cert.notAfter.value.toString()
    };
    const ski = getSubjectKeyIdentifier(cert);
    certificateData.id = ski.slice(0, 12);
    certificateData.subjectKeyIdentifier = ski;
    certificateData.rawPem = pem;
    const authorityKeyIdentifier = getAuthorityKeyIdentifier(cert);
    certificateData.authorityKeyIdentifier = authorityKeyIdentifier;
    if (certificateData.signatureAlgorithm === "rsapss" && (!certificateData.hashAlgorithm || certificateData.hashAlgorithm === "unknown")) {
      certificateData.hashAlgorithm = certificateData.publicKeyDetails.hashAlgorithm;
    }
    return certificateData;
  } catch (error) {
    console.error(`Error processing certificate`, error);
    throw error;
  }
}

// src/utils/certificate_parsing/parseCertificate.ts
async function parseCertificate(pem, fileName) {
  const isNode = typeof process !== "undefined" && process.versions && process.versions.node;
  const isWeb = typeof window !== "undefined";
  if (!isNode || isWeb) {
    console.warn(
      "parseCertificate: Node.js features not available in web environment, using parseCertificateSimple"
    );
    return parseCertificateSimple(pem);
  }
  try {
    let certificateData = parseCertificateSimple(pem);
    const moduleName = "./parseCertificateNode.js";
    const nodeModule = await import(moduleName);
    certificateData = nodeModule.addOpenSslInfo(certificateData, pem, fileName);
    return certificateData;
  } catch (error) {
    console.error(`Error processing certificate ${fileName}:`, error);
    throw error;
  }
}
export {
  addOpenSslInfo,
  parseCertificate
};
//# sourceMappingURL=parseNode.js.map
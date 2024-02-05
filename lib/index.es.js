import { children as E, createEffect as W, onCleanup as g, createContext as H, useContext as D, createComponent as b, splitProps as I, For as L, mergeProps as G } from "solid-js";
var R = function() {
  if (typeof Map < "u")
    return Map;
  function e(t, n) {
    var r = -1;
    return t.some(function(i, o) {
      return i[0] === n ? (r = o, !0) : !1;
    }), r;
  }
  return (
    /** @class */
    function() {
      function t() {
        this.__entries__ = [];
      }
      return Object.defineProperty(t.prototype, "size", {
        /**
         * @returns {boolean}
         */
        get: function() {
          return this.__entries__.length;
        },
        enumerable: !0,
        configurable: !0
      }), t.prototype.get = function(n) {
        var r = e(this.__entries__, n), i = this.__entries__[r];
        return i && i[1];
      }, t.prototype.set = function(n, r) {
        var i = e(this.__entries__, n);
        ~i ? this.__entries__[i][1] = r : this.__entries__.push([n, r]);
      }, t.prototype.delete = function(n) {
        var r = this.__entries__, i = e(r, n);
        ~i && r.splice(i, 1);
      }, t.prototype.has = function(n) {
        return !!~e(this.__entries__, n);
      }, t.prototype.clear = function() {
        this.__entries__.splice(0);
      }, t.prototype.forEach = function(n, r) {
        r === void 0 && (r = null);
        for (var i = 0, o = this.__entries__; i < o.length; i++) {
          var s = o[i];
          n.call(r, s[1], s[0]);
        }
      }, t;
    }()
  );
}(), _ = typeof window < "u" && typeof document < "u" && window.document === document, l = function() {
  return typeof global < "u" && global.Math === Math ? global : typeof self < "u" && self.Math === Math ? self : typeof window < "u" && window.Math === Math ? window : Function("return this")();
}(), B = function() {
  return typeof requestAnimationFrame == "function" ? requestAnimationFrame.bind(l) : function(e) {
    return setTimeout(function() {
      return e(Date.now());
    }, 1e3 / 60);
  };
}(), F = 2;
function j(e, t) {
  var n = !1, r = !1, i = 0;
  function o() {
    n && (n = !1, e()), r && a();
  }
  function s() {
    B(o);
  }
  function a() {
    var c = Date.now();
    if (n) {
      if (c - i < F)
        return;
      r = !0;
    } else
      n = !0, r = !1, setTimeout(s, t);
    i = c;
  }
  return a;
}
var k = 20, q = ["top", "right", "bottom", "left", "width", "height", "size", "weight"], V = typeof MutationObserver < "u", $ = (
  /** @class */
  function() {
    function e() {
      this.connected_ = !1, this.mutationEventsAdded_ = !1, this.mutationsObserver_ = null, this.observers_ = [], this.onTransitionEnd_ = this.onTransitionEnd_.bind(this), this.refresh = j(this.refresh.bind(this), k);
    }
    return e.prototype.addObserver = function(t) {
      ~this.observers_.indexOf(t) || this.observers_.push(t), this.connected_ || this.connect_();
    }, e.prototype.removeObserver = function(t) {
      var n = this.observers_, r = n.indexOf(t);
      ~r && n.splice(r, 1), !n.length && this.connected_ && this.disconnect_();
    }, e.prototype.refresh = function() {
      var t = this.updateObservers_();
      t && this.refresh();
    }, e.prototype.updateObservers_ = function() {
      var t = this.observers_.filter(function(n) {
        return n.gatherActive(), n.hasActive();
      });
      return t.forEach(function(n) {
        return n.broadcastActive();
      }), t.length > 0;
    }, e.prototype.connect_ = function() {
      !_ || this.connected_ || (document.addEventListener("transitionend", this.onTransitionEnd_), window.addEventListener("resize", this.refresh), V ? (this.mutationsObserver_ = new MutationObserver(this.refresh), this.mutationsObserver_.observe(document, {
        attributes: !0,
        childList: !0,
        characterData: !0,
        subtree: !0
      })) : (document.addEventListener("DOMSubtreeModified", this.refresh), this.mutationEventsAdded_ = !0), this.connected_ = !0);
    }, e.prototype.disconnect_ = function() {
      !_ || !this.connected_ || (document.removeEventListener("transitionend", this.onTransitionEnd_), window.removeEventListener("resize", this.refresh), this.mutationsObserver_ && this.mutationsObserver_.disconnect(), this.mutationEventsAdded_ && document.removeEventListener("DOMSubtreeModified", this.refresh), this.mutationsObserver_ = null, this.mutationEventsAdded_ = !1, this.connected_ = !1);
    }, e.prototype.onTransitionEnd_ = function(t) {
      var n = t.propertyName, r = n === void 0 ? "" : n, i = q.some(function(o) {
        return !!~r.indexOf(o);
      });
      i && this.refresh();
    }, e.getInstance = function() {
      return this.instance_ || (this.instance_ = new e()), this.instance_;
    }, e.instance_ = null, e;
  }()
), z = function(e, t) {
  for (var n = 0, r = Object.keys(t); n < r.length; n++) {
    var i = r[n];
    Object.defineProperty(e, i, {
      value: t[i],
      enumerable: !1,
      writable: !1,
      configurable: !0
    });
  }
  return e;
}, h = function(e) {
  var t = e && e.ownerDocument && e.ownerDocument.defaultView;
  return t || l;
}, M = p(0, 0, 0, 0);
function v(e) {
  return parseFloat(e) || 0;
}
function y(e) {
  for (var t = [], n = 1; n < arguments.length; n++)
    t[n - 1] = arguments[n];
  return t.reduce(function(r, i) {
    var o = e["border-" + i + "-width"];
    return r + v(o);
  }, 0);
}
function N(e) {
  for (var t = ["top", "right", "bottom", "left"], n = {}, r = 0, i = t; r < i.length; r++) {
    var o = i[r], s = e["padding-" + o];
    n[o] = v(s);
  }
  return n;
}
function J(e) {
  var t = e.getBBox();
  return p(0, 0, t.width, t.height);
}
function K(e) {
  var t = e.clientWidth, n = e.clientHeight;
  if (!t && !n)
    return M;
  var r = h(e).getComputedStyle(e), i = N(r), o = i.left + i.right, s = i.top + i.bottom, a = v(r.width), c = v(r.height);
  if (r.boxSizing === "border-box" && (Math.round(a + o) !== t && (a -= y(r, "left", "right") + o), Math.round(c + s) !== n && (c -= y(r, "top", "bottom") + s)), !Y(e)) {
    var u = Math.round(a + o) - t, d = Math.round(c + s) - n;
    Math.abs(u) !== 1 && (a -= u), Math.abs(d) !== 1 && (c -= d);
  }
  return p(i.left, i.top, a, c);
}
var X = /* @__PURE__ */ function() {
  return typeof SVGGraphicsElement < "u" ? function(e) {
    return e instanceof h(e).SVGGraphicsElement;
  } : function(e) {
    return e instanceof h(e).SVGElement && typeof e.getBBox == "function";
  };
}();
function Y(e) {
  return e === h(e).document.documentElement;
}
function Q(e) {
  return _ ? X(e) ? J(e) : K(e) : M;
}
function U(e) {
  var t = e.x, n = e.y, r = e.width, i = e.height, o = typeof DOMRectReadOnly < "u" ? DOMRectReadOnly : Object, s = Object.create(o.prototype);
  return z(s, {
    x: t,
    y: n,
    width: r,
    height: i,
    top: n,
    right: t + r,
    bottom: i + n,
    left: t
  }), s;
}
function p(e, t, n, r) {
  return { x: e, y: t, width: n, height: r };
}
var Z = (
  /** @class */
  function() {
    function e(t) {
      this.broadcastWidth = 0, this.broadcastHeight = 0, this.contentRect_ = p(0, 0, 0, 0), this.target = t;
    }
    return e.prototype.isActive = function() {
      var t = Q(this.target);
      return this.contentRect_ = t, t.width !== this.broadcastWidth || t.height !== this.broadcastHeight;
    }, e.prototype.broadcastRect = function() {
      var t = this.contentRect_;
      return this.broadcastWidth = t.width, this.broadcastHeight = t.height, t;
    }, e;
  }()
), ee = (
  /** @class */
  /* @__PURE__ */ function() {
    function e(t, n) {
      var r = U(n);
      z(this, { target: t, contentRect: r });
    }
    return e;
  }()
), te = (
  /** @class */
  function() {
    function e(t, n, r) {
      if (this.activeObservations_ = [], this.observations_ = new R(), typeof t != "function")
        throw new TypeError("The callback provided as parameter 1 is not a function.");
      this.callback_ = t, this.controller_ = n, this.callbackCtx_ = r;
    }
    return e.prototype.observe = function(t) {
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      if (!(typeof Element > "u" || !(Element instanceof Object))) {
        if (!(t instanceof h(t).Element))
          throw new TypeError('parameter 1 is not of type "Element".');
        var n = this.observations_;
        n.has(t) || (n.set(t, new Z(t)), this.controller_.addObserver(this), this.controller_.refresh());
      }
    }, e.prototype.unobserve = function(t) {
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      if (!(typeof Element > "u" || !(Element instanceof Object))) {
        if (!(t instanceof h(t).Element))
          throw new TypeError('parameter 1 is not of type "Element".');
        var n = this.observations_;
        n.has(t) && (n.delete(t), n.size || this.controller_.removeObserver(this));
      }
    }, e.prototype.disconnect = function() {
      this.clearActive(), this.observations_.clear(), this.controller_.removeObserver(this);
    }, e.prototype.gatherActive = function() {
      var t = this;
      this.clearActive(), this.observations_.forEach(function(n) {
        n.isActive() && t.activeObservations_.push(n);
      });
    }, e.prototype.broadcastActive = function() {
      if (this.hasActive()) {
        var t = this.callbackCtx_, n = this.activeObservations_.map(function(r) {
          return new ee(r.target, r.broadcastRect());
        });
        this.callback_.call(t, n, t), this.clearActive();
      }
    }, e.prototype.clearActive = function() {
      this.activeObservations_.splice(0);
    }, e.prototype.hasActive = function() {
      return this.activeObservations_.length > 0;
    }, e;
  }()
), x = typeof WeakMap < "u" ? /* @__PURE__ */ new WeakMap() : new R(), C = (
  /** @class */
  /* @__PURE__ */ function() {
    function e(t) {
      if (!(this instanceof e))
        throw new TypeError("Cannot call a class as a function.");
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      var n = $.getInstance(), r = new te(t, n, this);
      x.set(this, r);
    }
    return e;
  }()
);
[
  "observe",
  "unobserve",
  "disconnect"
].forEach(function(e) {
  C.prototype[e] = function() {
    var t;
    return (t = x.get(this))[e].apply(t, arguments);
  };
});
var ne = function() {
  return typeof l.ResizeObserver < "u" ? l.ResizeObserver : C;
}();
const f = /* @__PURE__ */ new Map();
function re(e) {
  e.forEach((t) => {
    var r;
    const { target: n } = t;
    (r = f.get(n)) == null || r.forEach((i) => i(n));
  });
}
const A = new ne(re);
function ie(e, t) {
  f.has(e) || (f.set(e, /* @__PURE__ */ new Set()), A.observe(e)), f.get(e).add(t);
}
function w(e, t) {
  f.has(e) && (f.get(e).delete(t), f.get(e).size || (A.unobserve(e), f.delete(e)));
}
const oe = (e) => {
  let t = {
    width: -1,
    height: -1,
    offsetWidth: -1,
    offsetHeight: -1
  };
  const n = E(() => e.children), r = (i) => {
    const {
      width: o,
      height: s
    } = i.getBoundingClientRect(), {
      offsetWidth: a,
      offsetHeight: c
    } = i, u = Math.floor(o), d = Math.floor(s);
    if (t.width !== u || t.height !== d || t.offsetWidth !== a || t.offsetHeight !== c) {
      const m = {
        width: u,
        height: d,
        offsetWidth: a,
        offsetHeight: c
      };
      t = m;
      const T = a === Math.round(o) ? o : a, S = c === Math.round(s) ? s : c, P = {
        ...m,
        offsetWidth: T,
        offsetHeight: S
      };
      e.onResize && Promise.resolve().then(() => {
        e.onResize(P, i);
      });
    }
  };
  return W(() => {
    e.disabled || ie(n(), r), g(() => {
      w(n(), r);
    });
  }), g(() => {
    w(n(), r);
  }), n();
}, O = H(() => {
}), ae = (e) => {
  let t = 0, n = [];
  const r = D(O), i = (o, s, a) => {
    t += 1;
    const c = t;
    n.push({
      size: o,
      element: s,
      data: a
    }), Promise.resolve().then(() => {
      var u;
      c === t && ((u = e.onBatchResize) == null || u.call(e, n), n = []);
    }), r(o, s, a);
  };
  return b(O.Provider, {
    value: i,
    get children() {
      return e.children;
    }
  });
}, ce = (e) => {
  const [t, n] = I(e, ["children"]), r = E(() => t.children).toArray;
  return b(L, {
    get each() {
      return r();
    },
    children: (i) => b(oe, G(n, {
      children: i
    }))
  });
};
export {
  ae as Collection,
  O as CollectionContext,
  ce as default
};

import { makeSubject as r, mergeMap as e, filter as t, takeUntil as a, debounce as o, fromValue as n, merge as i } from "wonka";

import { makeOperation as u } from "@urql/core";

var retryExchange = y => {
  var {retryIf: d, retryWith: p} = y;
  var s = y.initialDelayMs || 1e3;
  var c = y.maxDelayMs || 15e3;
  var l = y.maxNumberAttempts || 2;
  var m = null != y.randomDelay ? !!y.randomDelay : !0;
  return ({forward: y, dispatchDebug: v}) => f => {
    var {source: h, next: x} = r();
    var E = e((r => {
      var e = r.context.retry || {
        count: 0,
        delay: null
      };
      var i = ++e.count;
      var y = e.delay || s;
      var d = Math.random() + 1.5;
      if (m && y * d < c) {
        y *= d;
      }
      var p = t((e => ("query" === e.kind || "teardown" === e.kind) && e.key === r.key))(f);
      "production" !== process.env.NODE_ENV && v({
        type: "retryAttempt",
        message: `The operation has failed and a retry has been triggered (${i} / ${l})`,
        operation: r,
        data: {
          retryCount: i
        },
        source: "retryExchange"
      });
      return a(p)(o((() => y))(n(u(r.kind, r, {
        ...r.context,
        retry: e
      }))));
    }))(h);
    return t((r => {
      var e = r.operation.context.retry;
      if (!(r.error && (d ? d(r.error, r.operation) : p || r.error.networkError))) {
        if (e) {
          e.count = 0;
          e.delay = null;
        }
        return !0;
      }
      if (!((e && e.count || 0) >= l - 1)) {
        var t = p ? p(r.error, r.operation) : r.operation;
        if (!t) {
          return !0;
        }
        x(t);
        return !1;
      }
      "production" !== process.env.NODE_ENV && v({
        type: "retryExhausted",
        message: "Maximum number of retries has been reached. No further retries will be performed.",
        operation: r.operation,
        source: "retryExchange"
      });
      return !0;
    }))(y(i([ f, E ])));
  };
};

export { retryExchange };
//# sourceMappingURL=urql-exchange-retry.mjs.map

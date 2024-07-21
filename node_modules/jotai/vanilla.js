'use strict';

var keyCount = 0;
function atom(read, write) {
  var key = "atom" + ++keyCount;
  var config = {
    toString: function toString() {
      return key;
    }
  };
  if (typeof read === 'function') {
    config.read = read;
  } else {
    config.init = read;
    config.read = defaultRead;
    config.write = defaultWrite;
  }
  if (write) {
    config.write = write;
  }
  return config;
}
function defaultRead(get) {
  return get(this);
}
function defaultWrite(get, set, arg) {
  return set(this, typeof arg === 'function' ? arg(get(this)) : arg);
}

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _createForOfIteratorHelperLoose(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (t) return (t = t.call(r)).next.bind(t);
  if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e  ) {
    t && (r = t);
    var o = 0;
    return function () {
      return o >= r.length ? {
        done: !0
      } : {
        done: !1,
        value: r[o++]
      };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

var isSelfAtom = function isSelfAtom(atom, a) {
  return atom.unstable_is ? atom.unstable_is(a) : a === atom;
};
var hasInitialValue = function hasInitialValue(atom) {
  return 'init' in atom;
};
var isActuallyWritableAtom = function isActuallyWritableAtom(atom) {
  return !!atom.write;
};
var CONTINUE_PROMISE = Symbol(process.env.NODE_ENV !== 'production' ? 'CONTINUE_PROMISE' : '');
var PENDING = 'pending';
var FULFILLED = 'fulfilled';
var REJECTED = 'rejected';
var isContinuablePromise = function isContinuablePromise(promise) {
  return typeof promise === 'object' && promise !== null && CONTINUE_PROMISE in promise;
};
var continuablePromiseMap = new WeakMap();
var createContinuablePromise = function createContinuablePromise(promise, abort, complete) {
  if (!continuablePromiseMap.has(promise)) {
    var continuePromise;
    var p = new Promise(function (resolve, reject) {
      var curr = promise;
      var onFulfilled = function onFulfilled(me) {
        return function (v) {
          if (curr === me) {
            p.status = FULFILLED;
            p.value = v;
            resolve(v);
            complete();
          }
        };
      };
      var onRejected = function onRejected(me) {
        return function (e) {
          if (curr === me) {
            p.status = REJECTED;
            p.reason = e;
            reject(e);
            complete();
          }
        };
      };
      promise.then(onFulfilled(promise), onRejected(promise));
      continuePromise = function continuePromise(nextPromise, nextAbort) {
        if (nextPromise) {
          continuablePromiseMap.set(nextPromise, p);
          curr = nextPromise;
          nextPromise.then(onFulfilled(nextPromise), onRejected(nextPromise));
          abort();
          abort = nextAbort;
        }
      };
    });
    p.status = PENDING;
    p[CONTINUE_PROMISE] = continuePromise;
    continuablePromiseMap.set(promise, p);
  }
  return continuablePromiseMap.get(promise);
};
var isPromiseLike = function isPromiseLike(x) {
  return typeof (x == null ? void 0 : x.then) === 'function';
};
var isAtomStateInitialized = function isAtomStateInitialized(atomState) {
  return 'v' in atomState || 'e' in atomState;
};
var returnAtomValue = function returnAtomValue(atomState) {
  if ('e' in atomState) {
    throw atomState.e;
  }
  if (process.env.NODE_ENV !== 'production' && !('v' in atomState)) {
    throw new Error('[Bug] atom state is not initialized');
  }
  return atomState.v;
};
var getPendingContinuablePromise = function getPendingContinuablePromise(atomState) {
  var value = atomState.v;
  if (isContinuablePromise(value) && value.status === PENDING) {
    return value;
  }
  return null;
};
var addPendingContinuablePromiseToDependency = function addPendingContinuablePromiseToDependency(atom, promise, dependencyAtomState) {
  if (!dependencyAtomState.p.has(atom)) {
    dependencyAtomState.p.add(atom);
    promise.then(function () {
      dependencyAtomState.p.delete(atom);
    }, function () {
      dependencyAtomState.p.delete(atom);
    });
  }
};
var createPending = function createPending() {
  return [new Map(), new Map(), new Set()];
};
var addPendingAtom = function addPendingAtom(pending, atom, atomState) {
  if (!pending[0].has(atom)) {
    pending[0].set(atom, new Set());
  }
  pending[1].set(atom, atomState);
};
var addPendingDependent = function addPendingDependent(pending, atom, dependent) {
  var dependents = pending[0].get(atom);
  if (dependents) {
    dependents.add(dependent);
  }
};
var getPendingDependents = function getPendingDependents(pending, atom) {
  return pending[0].get(atom);
};
var addPendingFunction = function addPendingFunction(pending, fn) {
  pending[2].add(fn);
};
var flushPending = function flushPending(pending) {
  while (pending[1].size || pending[2].size) {
    pending[0].clear();
    var _atomStates = new Set(pending[1].values());
    pending[1].clear();
    var _functions = new Set(pending[2]);
    pending[2].clear();
    _atomStates.forEach(function (atomState) {
      var _atomState$m;
      return (_atomState$m = atomState.m) == null ? void 0 : _atomState$m.l.forEach(function (l) {
        return l();
      });
    });
    _functions.forEach(function (fn) {
      return fn();
    });
  }
};
var createStore = function createStore() {
  var atomStateMap = new WeakMap();
  var debugMountedAtoms;
  if (process.env.NODE_ENV !== 'production') {
    debugMountedAtoms = new Set();
  }
  var getAtomState = function getAtomState(atom) {
    var atomState = atomStateMap.get(atom);
    if (!atomState) {
      atomState = {
        d: new Map(),
        p: new Set(),
        n: 0
      };
      atomStateMap.set(atom, atomState);
    }
    return atomState;
  };
  var setAtomStateValueOrPromise = function setAtomStateValueOrPromise(atom, atomState, valueOrPromise, abortPromise, completePromise) {
    if (abortPromise === void 0) {
      abortPromise = function abortPromise() {};
    }
    if (completePromise === void 0) {
      completePromise = function completePromise() {};
    }
    var hasPrevValue = ('v' in atomState);
    var prevValue = atomState.v;
    var pendingPromise = getPendingContinuablePromise(atomState);
    if (isPromiseLike(valueOrPromise)) {
      if (pendingPromise) {
        if (pendingPromise !== valueOrPromise) {
          pendingPromise[CONTINUE_PROMISE](valueOrPromise, abortPromise);
          ++atomState.n;
        }
      } else {
        var continuablePromise = createContinuablePromise(valueOrPromise, abortPromise, completePromise);
        if (continuablePromise.status === PENDING) {
          for (var _iterator = _createForOfIteratorHelperLoose(atomState.d.keys()), _step; !(_step = _iterator()).done;) {
            var a = _step.value;
            var aState = getAtomState(a);
            addPendingContinuablePromiseToDependency(atom, continuablePromise, aState);
          }
        }
        atomState.v = continuablePromise;
        delete atomState.e;
      }
    } else {
      if (pendingPromise) {
        pendingPromise[CONTINUE_PROMISE](Promise.resolve(valueOrPromise), abortPromise);
      }
      atomState.v = valueOrPromise;
      delete atomState.e;
    }
    if (!hasPrevValue || !Object.is(prevValue, atomState.v)) {
      ++atomState.n;
    }
  };
  var addDependency = function addDependency(pending, atom, a, aState) {
    var _aState$m;
    if (process.env.NODE_ENV !== 'production' && a === atom) {
      throw new Error('[Bug] atom cannot depend on itself');
    }
    var atomState = getAtomState(atom);
    atomState.d.set(a, aState.n);
    var continuablePromise = getPendingContinuablePromise(atomState);
    if (continuablePromise) {
      addPendingContinuablePromiseToDependency(atom, continuablePromise, aState);
    }
    (_aState$m = aState.m) == null || _aState$m.t.add(atom);
    if (pending) {
      addPendingDependent(pending, a, atom);
    }
  };
  var readAtomState = function readAtomState(pending, atom, force) {
    var atomState = getAtomState(atom);
    if (!(force != null && force(atom)) && isAtomStateInitialized(atomState)) {
      if (atomState.m) {
        return atomState;
      }
      if (Array.from(atomState.d).every(function (_ref) {
        var a = _ref[0],
          n = _ref[1];
        return readAtomState(pending, a, force).n === n;
      })) {
        return atomState;
      }
    }
    atomState.d.clear();
    var isSync = true;
    var getter = function getter(a) {
      if (isSelfAtom(atom, a)) {
        var _aState = getAtomState(a);
        if (!isAtomStateInitialized(_aState)) {
          if (hasInitialValue(a)) {
            setAtomStateValueOrPromise(a, _aState, a.init);
          } else {
            throw new Error('no atom init');
          }
        }
        return returnAtomValue(_aState);
      }
      var aState = readAtomState(pending, a, force);
      if (isSync) {
        addDependency(pending, atom, a, aState);
      } else {
        var _pending = createPending();
        addDependency(_pending, atom, a, aState);
        mountDependencies(_pending, atom, atomState);
        flushPending(_pending);
      }
      return returnAtomValue(aState);
    };
    var controller;
    var setSelf;
    var options = {
      get signal() {
        if (!controller) {
          controller = new AbortController();
        }
        return controller.signal;
      },
      get setSelf() {
        if (process.env.NODE_ENV !== 'production' && !isActuallyWritableAtom(atom)) {
          console.warn('setSelf function cannot be used with read-only atom');
        }
        if (!setSelf && isActuallyWritableAtom(atom)) {
          setSelf = function setSelf() {
            if (process.env.NODE_ENV !== 'production' && isSync) {
              console.warn('setSelf function cannot be called in sync');
            }
            if (!isSync) {
              for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }
              return writeAtom.apply(void 0, [atom].concat(args));
            }
          };
        }
        return setSelf;
      }
    };
    try {
      var valueOrPromise = atom.read(getter, options);
      setAtomStateValueOrPromise(atom, atomState, valueOrPromise, function () {
        var _controller;
        return (_controller = controller) == null ? void 0 : _controller.abort();
      }, function () {
        if (atomState.m) {
          var _pending2 = createPending();
          mountDependencies(_pending2, atom, atomState);
          flushPending(_pending2);
        }
      });
      return atomState;
    } catch (error) {
      delete atomState.v;
      atomState.e = error;
      ++atomState.n;
      return atomState;
    } finally {
      isSync = false;
    }
  };
  var readAtom = function readAtom(atom) {
    return returnAtomValue(readAtomState(undefined, atom));
  };
  var recomputeDependents = function recomputeDependents(pending, atom) {
    var getDependents = function getDependents(a) {
      var _aState$m2, _getPendingDependents;
      var aState = getAtomState(a);
      var dependents = new Set((_aState$m2 = aState.m) == null ? void 0 : _aState$m2.t);
      for (var _iterator2 = _createForOfIteratorHelperLoose(aState.p), _step2; !(_step2 = _iterator2()).done;) {
        var atomWithPendingContinuablePromise = _step2.value;
        dependents.add(atomWithPendingContinuablePromise);
      }
      (_getPendingDependents = getPendingDependents(pending, a)) == null || _getPendingDependents.forEach(function (dependent) {
        dependents.add(dependent);
      });
      return dependents;
    };
    var topsortedAtoms = [];
    var markedAtoms = new Set();
    var visit = function visit(n) {
      if (markedAtoms.has(n)) {
        return;
      }
      markedAtoms.add(n);
      for (var _iterator3 = _createForOfIteratorHelperLoose(getDependents(n)), _step3; !(_step3 = _iterator3()).done;) {
        var m = _step3.value;
        if (n !== m) {
          visit(m);
        }
      }
      topsortedAtoms.push(n);
    };
    visit(atom);
    var changedAtoms = new Set([atom]);
    var isMarked = function isMarked(a) {
      return markedAtoms.has(a);
    };
    for (var i = topsortedAtoms.length - 1; i >= 0; --i) {
      var a = topsortedAtoms[i];
      var aState = getAtomState(a);
      var prevEpochNumber = aState.n;
      var hasChangedDeps = false;
      for (var _iterator4 = _createForOfIteratorHelperLoose(aState.d.keys()), _step4; !(_step4 = _iterator4()).done;) {
        var dep = _step4.value;
        if (dep !== a && changedAtoms.has(dep)) {
          hasChangedDeps = true;
          break;
        }
      }
      if (hasChangedDeps) {
        readAtomState(pending, a, isMarked);
        mountDependencies(pending, a, aState);
        if (prevEpochNumber !== aState.n) {
          addPendingAtom(pending, a, aState);
          changedAtoms.add(a);
        }
      }
      markedAtoms.delete(a);
    }
  };
  var writeAtomState = function writeAtomState(pending, atom) {
    var getter = function getter(a) {
      return returnAtomValue(readAtomState(pending, a));
    };
    var setter = function setter(a) {
      var r;
      for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }
      if (isSelfAtom(atom, a)) {
        if (!hasInitialValue(a)) {
          throw new Error('atom not writable');
        }
        var aState = getAtomState(a);
        var hasPrevValue = ('v' in aState);
        var prevValue = aState.v;
        var v = args[0];
        setAtomStateValueOrPromise(a, aState, v);
        mountDependencies(pending, a, aState);
        if (!hasPrevValue || !Object.is(prevValue, aState.v)) {
          addPendingAtom(pending, a, aState);
          recomputeDependents(pending, a);
        }
      } else {
        r = writeAtomState.apply(void 0, [pending, a].concat(args));
      }
      flushPending(pending);
      return r;
    };
    for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
      args[_key2 - 2] = arguments[_key2];
    }
    var result = atom.write.apply(atom, [getter, setter].concat(args));
    return result;
  };
  var writeAtom = function writeAtom(atom) {
    var pending = createPending();
    for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      args[_key4 - 1] = arguments[_key4];
    }
    var result = writeAtomState.apply(void 0, [pending, atom].concat(args));
    flushPending(pending);
    return result;
  };
  var mountDependencies = function mountDependencies(pending, atom, atomState) {
    if (atomState.m && !getPendingContinuablePromise(atomState)) {
      for (var _iterator5 = _createForOfIteratorHelperLoose(atomState.d.keys()), _step5; !(_step5 = _iterator5()).done;) {
        var a = _step5.value;
        if (!atomState.m.d.has(a)) {
          var aMounted = mountAtom(pending, a);
          aMounted.t.add(atom);
          atomState.m.d.add(a);
        }
      }
      for (var _iterator6 = _createForOfIteratorHelperLoose(atomState.m.d || []), _step6; !(_step6 = _iterator6()).done;) {
        var _a = _step6.value;
        if (!atomState.d.has(_a)) {
          var _aMounted = unmountAtom(pending, _a);
          _aMounted == null || _aMounted.t.delete(atom);
          atomState.m.d.delete(_a);
        }
      }
    }
  };
  var mountAtom = function mountAtom(pending, atom) {
    var atomState = getAtomState(atom);
    if (!atomState.m) {
      readAtomState(pending, atom);
      for (var _iterator7 = _createForOfIteratorHelperLoose(atomState.d.keys()), _step7; !(_step7 = _iterator7()).done;) {
        var a = _step7.value;
        var aMounted = mountAtom(pending, a);
        aMounted.t.add(atom);
      }
      atomState.m = {
        l: new Set(),
        d: new Set(atomState.d.keys()),
        t: new Set()
      };
      if (process.env.NODE_ENV !== 'production') {
        debugMountedAtoms.add(atom);
      }
      if (isActuallyWritableAtom(atom) && atom.onMount) {
        var mounted = atomState.m;
        var onMount = atom.onMount;
        addPendingFunction(pending, function () {
          var onUnmount = onMount(function () {
            for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
              args[_key5] = arguments[_key5];
            }
            return writeAtomState.apply(void 0, [pending, atom].concat(args));
          });
          if (onUnmount) {
            mounted.u = onUnmount;
          }
        });
      }
    }
    return atomState.m;
  };
  var unmountAtom = function unmountAtom(pending, atom) {
    var atomState = getAtomState(atom);
    if (atomState.m && !atomState.m.l.size && !Array.from(atomState.m.t).some(function (a) {
      return getAtomState(a).m;
    })) {
      var onUnmount = atomState.m.u;
      if (onUnmount) {
        addPendingFunction(pending, onUnmount);
      }
      delete atomState.m;
      if (process.env.NODE_ENV !== 'production') {
        debugMountedAtoms.delete(atom);
      }
      for (var _iterator8 = _createForOfIteratorHelperLoose(atomState.d.keys()), _step8; !(_step8 = _iterator8()).done;) {
        var a = _step8.value;
        var aMounted = unmountAtom(pending, a);
        aMounted == null || aMounted.t.delete(atom);
      }
      var pendingPromise = getPendingContinuablePromise(atomState);
      if (pendingPromise) {
        pendingPromise[CONTINUE_PROMISE](undefined, function () {});
      }
      return undefined;
    }
    return atomState.m;
  };
  var subscribeAtom = function subscribeAtom(atom, listener) {
    var pending = createPending();
    var mounted = mountAtom(pending, atom);
    flushPending(pending);
    var listeners = mounted.l;
    listeners.add(listener);
    return function () {
      listeners.delete(listener);
      var pending = createPending();
      unmountAtom(pending, atom);
      flushPending(pending);
    };
  };
  if (process.env.NODE_ENV !== 'production') {
    var store = {
      get: readAtom,
      set: writeAtom,
      sub: subscribeAtom,
      dev4_get_internal_weak_map: function dev4_get_internal_weak_map() {
        return atomStateMap;
      },
      dev4_get_mounted_atoms: function dev4_get_mounted_atoms() {
        return debugMountedAtoms;
      },
      dev4_restore_atoms: function dev4_restore_atoms(values) {
        var pending = createPending();
        for (var _iterator9 = _createForOfIteratorHelperLoose(values), _step9; !(_step9 = _iterator9()).done;) {
          var _step9$value = _step9.value,
            atom = _step9$value[0],
            value = _step9$value[1];
          if (hasInitialValue(atom)) {
            var aState = getAtomState(atom);
            var hasPrevValue = ('v' in aState);
            var prevValue = aState.v;
            setAtomStateValueOrPromise(atom, aState, value);
            mountDependencies(pending, atom, aState);
            if (!hasPrevValue || !Object.is(prevValue, aState.v)) {
              addPendingAtom(pending, atom, aState);
              recomputeDependents(pending, atom);
            }
          }
        }
        flushPending(pending);
      }
    };
    return store;
  }
  return {
    get: readAtom,
    set: writeAtom,
    sub: subscribeAtom
  };
};
var defaultStore;
var getDefaultStore = function getDefaultStore() {
  if (!defaultStore) {
    defaultStore = createStore();
    if (process.env.NODE_ENV !== 'production') {
      var _ref2;
      (_ref2 = globalThis).__JOTAI_DEFAULT_STORE__ || (_ref2.__JOTAI_DEFAULT_STORE__ = defaultStore);
      if (globalThis.__JOTAI_DEFAULT_STORE__ !== defaultStore) {
        console.warn('Detected multiple Jotai instances. It may cause unexpected behavior with the default store. https://github.com/pmndrs/jotai/discussions/2044');
      }
    }
  }
  return defaultStore;
};

exports.atom = atom;
exports.createStore = createStore;
exports.getDefaultStore = getDefaultStore;

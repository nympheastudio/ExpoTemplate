System.register([], (function (exports) {
  'use strict';
  return {
    execute: (function () {

      exports("atom", atom);

      let keyCount = 0;
      function atom(read, write) {
        const key = `atom${++keyCount}`;
        const config = {
          toString: () => key
        };
        if (typeof read === "function") {
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
        return set(
          this,
          typeof arg === "function" ? arg(get(this)) : arg
        );
      }

      const isSelfAtom = (atom, a) => atom.unstable_is ? atom.unstable_is(a) : a === atom;
      const hasInitialValue = (atom) => "init" in atom;
      const isActuallyWritableAtom = (atom) => !!atom.write;
      const CONTINUE_PROMISE = Symbol(
        "CONTINUE_PROMISE" 
      );
      const PENDING = "pending";
      const FULFILLED = "fulfilled";
      const REJECTED = "rejected";
      const isContinuablePromise = (promise) => typeof promise === "object" && promise !== null && CONTINUE_PROMISE in promise;
      const continuablePromiseMap = /* @__PURE__ */ new WeakMap();
      const createContinuablePromise = (promise, abort, complete) => {
        if (!continuablePromiseMap.has(promise)) {
          let continuePromise;
          const p = new Promise((resolve, reject) => {
            let curr = promise;
            const onFulfilled = (me) => (v) => {
              if (curr === me) {
                p.status = FULFILLED;
                p.value = v;
                resolve(v);
                complete();
              }
            };
            const onRejected = (me) => (e) => {
              if (curr === me) {
                p.status = REJECTED;
                p.reason = e;
                reject(e);
                complete();
              }
            };
            promise.then(onFulfilled(promise), onRejected(promise));
            continuePromise = (nextPromise, nextAbort) => {
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
      const isPromiseLike = (x) => typeof (x == null ? void 0 : x.then) === "function";
      const isAtomStateInitialized = (atomState) => "v" in atomState || "e" in atomState;
      const returnAtomValue = (atomState) => {
        if ("e" in atomState) {
          throw atomState.e;
        }
        if (!("v" in atomState)) {
          throw new Error("[Bug] atom state is not initialized");
        }
        return atomState.v;
      };
      const getPendingContinuablePromise = (atomState) => {
        const value = atomState.v;
        if (isContinuablePromise(value) && value.status === PENDING) {
          return value;
        }
        return null;
      };
      const addPendingContinuablePromiseToDependency = (atom, promise, dependencyAtomState) => {
        if (!dependencyAtomState.p.has(atom)) {
          dependencyAtomState.p.add(atom);
          promise.then(
            () => {
              dependencyAtomState.p.delete(atom);
            },
            () => {
              dependencyAtomState.p.delete(atom);
            }
          );
        }
      };
      const createPending = () => [/* @__PURE__ */ new Map(), /* @__PURE__ */ new Map(), /* @__PURE__ */ new Set()];
      const addPendingAtom = (pending, atom, atomState) => {
        if (!pending[0].has(atom)) {
          pending[0].set(atom, /* @__PURE__ */ new Set());
        }
        pending[1].set(atom, atomState);
      };
      const addPendingDependent = (pending, atom, dependent) => {
        const dependents = pending[0].get(atom);
        if (dependents) {
          dependents.add(dependent);
        }
      };
      const getPendingDependents = (pending, atom) => pending[0].get(atom);
      const addPendingFunction = (pending, fn) => {
        pending[2].add(fn);
      };
      const flushPending = (pending) => {
        while (pending[1].size || pending[2].size) {
          pending[0].clear();
          const atomStates = new Set(pending[1].values());
          pending[1].clear();
          const functions = new Set(pending[2]);
          pending[2].clear();
          atomStates.forEach((atomState) => {
            var _a;
            return (_a = atomState.m) == null ? void 0 : _a.l.forEach((l) => l());
          });
          functions.forEach((fn) => fn());
        }
      };
      const createStore = exports("createStore", () => {
        const atomStateMap = /* @__PURE__ */ new WeakMap();
        let debugMountedAtoms;
        {
          debugMountedAtoms = /* @__PURE__ */ new Set();
        }
        const getAtomState = (atom) => {
          let atomState = atomStateMap.get(atom);
          if (!atomState) {
            atomState = { d: /* @__PURE__ */ new Map(), p: /* @__PURE__ */ new Set(), n: 0 };
            atomStateMap.set(atom, atomState);
          }
          return atomState;
        };
        const setAtomStateValueOrPromise = (atom, atomState, valueOrPromise, abortPromise = () => {
        }, completePromise = () => {
        }) => {
          const hasPrevValue = "v" in atomState;
          const prevValue = atomState.v;
          const pendingPromise = getPendingContinuablePromise(atomState);
          if (isPromiseLike(valueOrPromise)) {
            if (pendingPromise) {
              if (pendingPromise !== valueOrPromise) {
                pendingPromise[CONTINUE_PROMISE](valueOrPromise, abortPromise);
                ++atomState.n;
              }
            } else {
              const continuablePromise = createContinuablePromise(
                valueOrPromise,
                abortPromise,
                completePromise
              );
              if (continuablePromise.status === PENDING) {
                for (const a of atomState.d.keys()) {
                  const aState = getAtomState(a);
                  addPendingContinuablePromiseToDependency(
                    atom,
                    continuablePromise,
                    aState
                  );
                }
              }
              atomState.v = continuablePromise;
              delete atomState.e;
            }
          } else {
            if (pendingPromise) {
              pendingPromise[CONTINUE_PROMISE](
                Promise.resolve(valueOrPromise),
                abortPromise
              );
            }
            atomState.v = valueOrPromise;
            delete atomState.e;
          }
          if (!hasPrevValue || !Object.is(prevValue, atomState.v)) {
            ++atomState.n;
          }
        };
        const addDependency = (pending, atom, a, aState) => {
          var _a;
          if (a === atom) {
            throw new Error("[Bug] atom cannot depend on itself");
          }
          const atomState = getAtomState(atom);
          atomState.d.set(a, aState.n);
          const continuablePromise = getPendingContinuablePromise(atomState);
          if (continuablePromise) {
            addPendingContinuablePromiseToDependency(atom, continuablePromise, aState);
          }
          (_a = aState.m) == null ? void 0 : _a.t.add(atom);
          if (pending) {
            addPendingDependent(pending, a, atom);
          }
        };
        const readAtomState = (pending, atom, force) => {
          const atomState = getAtomState(atom);
          if (!(force == null ? void 0 : force(atom)) && isAtomStateInitialized(atomState)) {
            if (atomState.m) {
              return atomState;
            }
            if (Array.from(atomState.d).every(
              ([a, n]) => (
                // Recursively, read the atom state of the dependency, and
                // check if the atom epoch number is unchanged
                readAtomState(pending, a, force).n === n
              )
            )) {
              return atomState;
            }
          }
          atomState.d.clear();
          let isSync = true;
          const getter = (a) => {
            if (isSelfAtom(atom, a)) {
              const aState2 = getAtomState(a);
              if (!isAtomStateInitialized(aState2)) {
                if (hasInitialValue(a)) {
                  setAtomStateValueOrPromise(a, aState2, a.init);
                } else {
                  throw new Error("no atom init");
                }
              }
              return returnAtomValue(aState2);
            }
            const aState = readAtomState(pending, a, force);
            if (isSync) {
              addDependency(pending, atom, a, aState);
            } else {
              const pending2 = createPending();
              addDependency(pending2, atom, a, aState);
              mountDependencies(pending2, atom, atomState);
              flushPending(pending2);
            }
            return returnAtomValue(aState);
          };
          let controller;
          let setSelf;
          const options = {
            get signal() {
              if (!controller) {
                controller = new AbortController();
              }
              return controller.signal;
            },
            get setSelf() {
              if (!isActuallyWritableAtom(atom)) {
                console.warn("setSelf function cannot be used with read-only atom");
              }
              if (!setSelf && isActuallyWritableAtom(atom)) {
                setSelf = (...args) => {
                  if (isSync) {
                    console.warn("setSelf function cannot be called in sync");
                  }
                  if (!isSync) {
                    return writeAtom(atom, ...args);
                  }
                };
              }
              return setSelf;
            }
          };
          try {
            const valueOrPromise = atom.read(getter, options);
            setAtomStateValueOrPromise(
              atom,
              atomState,
              valueOrPromise,
              () => controller == null ? void 0 : controller.abort(),
              () => {
                if (atomState.m) {
                  const pending2 = createPending();
                  mountDependencies(pending2, atom, atomState);
                  flushPending(pending2);
                }
              }
            );
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
        const readAtom = (atom) => returnAtomValue(readAtomState(void 0, atom));
        const recomputeDependents = (pending, atom) => {
          const getDependents = (a) => {
            var _a, _b;
            const aState = getAtomState(a);
            const dependents = new Set((_a = aState.m) == null ? void 0 : _a.t);
            for (const atomWithPendingContinuablePromise of aState.p) {
              dependents.add(atomWithPendingContinuablePromise);
            }
            (_b = getPendingDependents(pending, a)) == null ? void 0 : _b.forEach((dependent) => {
              dependents.add(dependent);
            });
            return dependents;
          };
          const topsortedAtoms = [];
          const markedAtoms = /* @__PURE__ */ new Set();
          const visit = (n) => {
            if (markedAtoms.has(n)) {
              return;
            }
            markedAtoms.add(n);
            for (const m of getDependents(n)) {
              if (n !== m) {
                visit(m);
              }
            }
            topsortedAtoms.push(n);
          };
          visit(atom);
          const changedAtoms = /* @__PURE__ */ new Set([atom]);
          const isMarked = (a) => markedAtoms.has(a);
          for (let i = topsortedAtoms.length - 1; i >= 0; --i) {
            const a = topsortedAtoms[i];
            const aState = getAtomState(a);
            const prevEpochNumber = aState.n;
            let hasChangedDeps = false;
            for (const dep of aState.d.keys()) {
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
        const writeAtomState = (pending, atom, ...args) => {
          const getter = (a) => returnAtomValue(readAtomState(pending, a));
          const setter = (a, ...args2) => {
            let r;
            if (isSelfAtom(atom, a)) {
              if (!hasInitialValue(a)) {
                throw new Error("atom not writable");
              }
              const aState = getAtomState(a);
              const hasPrevValue = "v" in aState;
              const prevValue = aState.v;
              const v = args2[0];
              setAtomStateValueOrPromise(a, aState, v);
              mountDependencies(pending, a, aState);
              if (!hasPrevValue || !Object.is(prevValue, aState.v)) {
                addPendingAtom(pending, a, aState);
                recomputeDependents(pending, a);
              }
            } else {
              r = writeAtomState(pending, a, ...args2);
            }
            flushPending(pending);
            return r;
          };
          const result = atom.write(getter, setter, ...args);
          return result;
        };
        const writeAtom = (atom, ...args) => {
          const pending = createPending();
          const result = writeAtomState(pending, atom, ...args);
          flushPending(pending);
          return result;
        };
        const mountDependencies = (pending, atom, atomState) => {
          if (atomState.m && !getPendingContinuablePromise(atomState)) {
            for (const a of atomState.d.keys()) {
              if (!atomState.m.d.has(a)) {
                const aMounted = mountAtom(pending, a);
                aMounted.t.add(atom);
                atomState.m.d.add(a);
              }
            }
            for (const a of atomState.m.d || []) {
              if (!atomState.d.has(a)) {
                const aMounted = unmountAtom(pending, a);
                aMounted == null ? void 0 : aMounted.t.delete(atom);
                atomState.m.d.delete(a);
              }
            }
          }
        };
        const mountAtom = (pending, atom) => {
          const atomState = getAtomState(atom);
          if (!atomState.m) {
            readAtomState(pending, atom);
            for (const a of atomState.d.keys()) {
              const aMounted = mountAtom(pending, a);
              aMounted.t.add(atom);
            }
            atomState.m = {
              l: /* @__PURE__ */ new Set(),
              d: new Set(atomState.d.keys()),
              t: /* @__PURE__ */ new Set()
            };
            {
              debugMountedAtoms.add(atom);
            }
            if (isActuallyWritableAtom(atom) && atom.onMount) {
              const mounted = atomState.m;
              const { onMount } = atom;
              addPendingFunction(pending, () => {
                const onUnmount = onMount(
                  (...args) => writeAtomState(pending, atom, ...args)
                );
                if (onUnmount) {
                  mounted.u = onUnmount;
                }
              });
            }
          }
          return atomState.m;
        };
        const unmountAtom = (pending, atom) => {
          const atomState = getAtomState(atom);
          if (atomState.m && !atomState.m.l.size && !Array.from(atomState.m.t).some((a) => getAtomState(a).m)) {
            const onUnmount = atomState.m.u;
            if (onUnmount) {
              addPendingFunction(pending, onUnmount);
            }
            delete atomState.m;
            {
              debugMountedAtoms.delete(atom);
            }
            for (const a of atomState.d.keys()) {
              const aMounted = unmountAtom(pending, a);
              aMounted == null ? void 0 : aMounted.t.delete(atom);
            }
            const pendingPromise = getPendingContinuablePromise(atomState);
            if (pendingPromise) {
              pendingPromise[CONTINUE_PROMISE](void 0, () => {
              });
            }
            return void 0;
          }
          return atomState.m;
        };
        const subscribeAtom = (atom, listener) => {
          const pending = createPending();
          const mounted = mountAtom(pending, atom);
          flushPending(pending);
          const listeners = mounted.l;
          listeners.add(listener);
          return () => {
            listeners.delete(listener);
            const pending2 = createPending();
            unmountAtom(pending2, atom);
            flushPending(pending2);
          };
        };
        {
          const store = {
            get: readAtom,
            set: writeAtom,
            sub: subscribeAtom,
            // store dev methods (these are tentative and subject to change without notice)
            dev4_get_internal_weak_map: () => atomStateMap,
            dev4_get_mounted_atoms: () => debugMountedAtoms,
            dev4_restore_atoms: (values) => {
              const pending = createPending();
              for (const [atom, value] of values) {
                if (hasInitialValue(atom)) {
                  const aState = getAtomState(atom);
                  const hasPrevValue = "v" in aState;
                  const prevValue = aState.v;
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
      });
      let defaultStore;
      const getDefaultStore = exports("getDefaultStore", () => {
        if (!defaultStore) {
          defaultStore = createStore();
          {
            globalThis.__JOTAI_DEFAULT_STORE__ || (globalThis.__JOTAI_DEFAULT_STORE__ = defaultStore);
            if (globalThis.__JOTAI_DEFAULT_STORE__ !== defaultStore) {
              console.warn(
                "Detected multiple Jotai instances. It may cause unexpected behavior with the default store. https://github.com/pmndrs/jotai/discussions/2044"
              );
            }
          }
        }
        return defaultStore;
      });

    })
  };
}));

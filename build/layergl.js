(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three')) :
	typeof define === 'function' && define.amd ? define(['exports', 'three'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.layergl = {}, global.THREE));
}(this, (function (exports, THREE) { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, basedir, module) {
		return module = {
			path: basedir,
			exports: {},
			require: function (path, base) {
				return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
			}
		}, fn(module, module.exports), module.exports;
	}

	function commonjsRequire () {
		throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
	}

	var check = function (it) {
	  return it && it.Math == Math && it;
	}; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


	var global_1 = // eslint-disable-next-line no-undef
	check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) || check(typeof self == 'object' && self) || check(typeof commonjsGlobal == 'object' && commonjsGlobal) || // eslint-disable-next-line no-new-func
	function () {
	  return this;
	}() || Function('return this')();

	var fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	var descriptors = !fails(function () {
	  return Object.defineProperty({}, 1, {
	    get: function () {
	      return 7;
	    }
	  })[1] != 7;
	});

	var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // Nashorn ~ JDK8 bug

	var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({
	  1: 2
	}, 1); // `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable

	var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : nativePropertyIsEnumerable;
	var objectPropertyIsEnumerable = {
	  f: f
	};

	var createPropertyDescriptor = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var toString = {}.toString;

	var classofRaw = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	var split = ''.split; // fallback for non-array-like ES3 and non-enumerable old V8 strings

	var indexedObject = fails(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins
	  return !Object('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
	} : Object;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on " + it);
	  return it;
	};

	var toIndexedObject = function (it) {
	  return indexedObject(requireObjectCoercible(it));
	};

	var isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	// https://tc39.github.io/ecma262/#sec-toprimitive
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string

	var toPrimitive = function (input, PREFERRED_STRING) {
	  if (!isObject(input)) return input;
	  var fn, val;
	  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var hasOwnProperty = {}.hasOwnProperty;

	var has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var document$1 = global_1.document; // typeof document.createElement is 'object' in old IE

	var EXISTS = isObject(document$1) && isObject(document$1.createElement);

	var documentCreateElement = function (it) {
	  return EXISTS ? document$1.createElement(it) : {};
	};

	var ie8DomDefine = !descriptors && !fails(function () {
	  return Object.defineProperty(documentCreateElement('div'), 'a', {
	    get: function () {
	      return 7;
	    }
	  }).a != 7;
	});

	var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // `Object.getOwnPropertyDescriptor` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor

	var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject(O);
	  P = toPrimitive(P, true);
	  if (ie8DomDefine) try {
	    return nativeGetOwnPropertyDescriptor(O, P);
	  } catch (error) {
	    /* empty */
	  }
	  if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
	};
	var objectGetOwnPropertyDescriptor = {
	  f: f$1
	};

	var anObject = function (it) {
	  if (!isObject(it)) {
	    throw TypeError(String(it) + ' is not an object');
	  }

	  return it;
	};

	var nativeDefineProperty = Object.defineProperty; // `Object.defineProperty` method
	// https://tc39.github.io/ecma262/#sec-object.defineproperty

	var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (ie8DomDefine) try {
	    return nativeDefineProperty(O, P, Attributes);
	  } catch (error) {
	    /* empty */
	  }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};
	var objectDefineProperty = {
	  f: f$2
	};

	var createNonEnumerableProperty = descriptors ? function (object, key, value) {
	  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var setGlobal = function (key, value) {
	  try {
	    createNonEnumerableProperty(global_1, key, value);
	  } catch (error) {
	    global_1[key] = value;
	  }

	  return value;
	};

	var SHARED = '__core-js_shared__';
	var store = global_1[SHARED] || setGlobal(SHARED, {});
	var sharedStore = store;

	var functionToString = Function.toString; // this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper

	if (typeof sharedStore.inspectSource != 'function') {
	  sharedStore.inspectSource = function (it) {
	    return functionToString.call(it);
	  };
	}

	var inspectSource = sharedStore.inspectSource;

	var WeakMap = global_1.WeakMap;
	var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

	var shared = createCommonjsModule(function (module) {
	  (module.exports = function (key, value) {
	    return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
	  })('versions', []).push({
	    version: '3.8.0',
	    mode:  'global',
	    copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
	  });
	});

	var id = 0;
	var postfix = Math.random();

	var uid = function (key) {
	  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
	};

	var keys = shared('keys');

	var sharedKey = function (key) {
	  return keys[key] || (keys[key] = uid(key));
	};

	var hiddenKeys = {};

	var WeakMap$1 = global_1.WeakMap;
	var set, get, has$1;

	var enforce = function (it) {
	  return has$1(it) ? get(it) : set(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;

	    if (!isObject(it) || (state = get(it)).type !== TYPE) {
	      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
	    }

	    return state;
	  };
	};

	if (nativeWeakMap) {
	  var store$1 = sharedStore.state || (sharedStore.state = new WeakMap$1());
	  var wmget = store$1.get;
	  var wmhas = store$1.has;
	  var wmset = store$1.set;

	  set = function (it, metadata) {
	    metadata.facade = it;
	    wmset.call(store$1, it, metadata);
	    return metadata;
	  };

	  get = function (it) {
	    return wmget.call(store$1, it) || {};
	  };

	  has$1 = function (it) {
	    return wmhas.call(store$1, it);
	  };
	} else {
	  var STATE = sharedKey('state');
	  hiddenKeys[STATE] = true;

	  set = function (it, metadata) {
	    metadata.facade = it;
	    createNonEnumerableProperty(it, STATE, metadata);
	    return metadata;
	  };

	  get = function (it) {
	    return has(it, STATE) ? it[STATE] : {};
	  };

	  has$1 = function (it) {
	    return has(it, STATE);
	  };
	}

	var internalState = {
	  set: set,
	  get: get,
	  has: has$1,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var redefine = createCommonjsModule(function (module) {
	  var getInternalState = internalState.get;
	  var enforceInternalState = internalState.enforce;
	  var TEMPLATE = String(String).split('String');
	  (module.exports = function (O, key, value, options) {
	    var unsafe = options ? !!options.unsafe : false;
	    var simple = options ? !!options.enumerable : false;
	    var noTargetGet = options ? !!options.noTargetGet : false;
	    var state;

	    if (typeof value == 'function') {
	      if (typeof key == 'string' && !has(value, 'name')) {
	        createNonEnumerableProperty(value, 'name', key);
	      }

	      state = enforceInternalState(value);

	      if (!state.source) {
	        state.source = TEMPLATE.join(typeof key == 'string' ? key : '');
	      }
	    }

	    if (O === global_1) {
	      if (simple) O[key] = value;else setGlobal(key, value);
	      return;
	    } else if (!unsafe) {
	      delete O[key];
	    } else if (!noTargetGet && O[key]) {
	      simple = true;
	    }

	    if (simple) O[key] = value;else createNonEnumerableProperty(O, key, value); // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	  })(Function.prototype, 'toString', function toString() {
	    return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
	  });
	});

	var path = global_1;

	var aFunction = function (variable) {
	  return typeof variable == 'function' ? variable : undefined;
	};

	var getBuiltIn = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace]) : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
	};

	var ceil = Math.ceil;
	var floor = Math.floor; // `ToInteger` abstract operation
	// https://tc39.github.io/ecma262/#sec-tointeger

	var toInteger = function (argument) {
	  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
	};

	var min = Math.min; // `ToLength` abstract operation
	// https://tc39.github.io/ecma262/#sec-tolength

	var toLength = function (argument) {
	  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var max = Math.max;
	var min$1 = Math.min; // Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

	var toAbsoluteIndex = function (index, length) {
	  var integer = toInteger(index);
	  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
	};

	var createMethod = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject($this);
	    var length = toLength(O.length);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value; // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare

	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++]; // eslint-disable-next-line no-self-compare

	      if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
	    } else for (; length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    }
	    return !IS_INCLUDES && -1;
	  };
	};

	var arrayIncludes = {
	  // `Array.prototype.includes` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
	  includes: createMethod(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod(false)
	};

	var indexOf = arrayIncludes.indexOf;

	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject(object);
	  var i = 0;
	  var result = [];
	  var key;

	  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key); // Don't enum bug & hidden keys


	  while (names.length > i) if (has(O, key = names[i++])) {
	    ~indexOf(result, key) || result.push(key);
	  }

	  return result;
	};

	// IE8- don't enum bug keys
	var enumBugKeys = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];

	var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype'); // `Object.getOwnPropertyNames` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertynames

	var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return objectKeysInternal(O, hiddenKeys$1);
	};

	var objectGetOwnPropertyNames = {
	  f: f$3
	};

	var f$4 = Object.getOwnPropertySymbols;
	var objectGetOwnPropertySymbols = {
	  f: f$4
	};

	var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = objectGetOwnPropertyNames.f(anObject(it));
	  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
	  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
	};

	var copyConstructorProperties = function (target, source) {
	  var keys = ownKeys(source);
	  var defineProperty = objectDefineProperty.f;
	  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;

	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	  }
	};

	var replacement = /#|\.prototype\./;

	var isForced = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value == POLYFILL ? true : value == NATIVE ? false : typeof detection == 'function' ? fails(detection) : !!detection;
	};

	var normalize = isForced.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced.data = {};
	var NATIVE = isForced.NATIVE = 'N';
	var POLYFILL = isForced.POLYFILL = 'P';
	var isForced_1 = isForced;

	var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
	/*
	  options.target      - name of the target object
	  options.global      - target is the global object
	  options.stat        - export as static methods of target
	  options.proto       - export as prototype methods of target
	  options.real        - real prototype method for the `pure` version
	  options.forced      - export even if the native feature is available
	  options.bind        - bind methods to the target, required for the `pure` version
	  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
	  options.sham        - add a flag to not completely full polyfills
	  options.enumerable  - export as enumerable property
	  options.noTargetGet - prevent calling a getter on target
	*/

	var _export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var FORCED, target, key, targetProperty, sourceProperty, descriptor;

	  if (GLOBAL) {
	    target = global_1;
	  } else if (STATIC) {
	    target = global_1[TARGET] || setGlobal(TARGET, {});
	  } else {
	    target = (global_1[TARGET] || {}).prototype;
	  }

	  if (target) for (key in source) {
	    sourceProperty = source[key];

	    if (options.noTargetGet) {
	      descriptor = getOwnPropertyDescriptor$1(target, key);
	      targetProperty = descriptor && descriptor.value;
	    } else targetProperty = target[key];

	    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); // contained in target

	    if (!FORCED && targetProperty !== undefined) {
	      if (typeof sourceProperty === typeof targetProperty) continue;
	      copyConstructorProperties(sourceProperty, targetProperty);
	    } // add a flag to not completely full polyfills


	    if (options.sham || targetProperty && targetProperty.sham) {
	      createNonEnumerableProperty(sourceProperty, 'sham', true);
	    } // extend global


	    redefine(target, key, sourceProperty, options);
	  }
	};

	var aFunction$1 = function (it) {
	  if (typeof it != 'function') {
	    throw TypeError(String(it) + ' is not a function');
	  }

	  return it;
	};

	var functionBindContext = function (fn, that, length) {
	  aFunction$1(fn);
	  if (that === undefined) return fn;

	  switch (length) {
	    case 0:
	      return function () {
	        return fn.call(that);
	      };

	    case 1:
	      return function (a) {
	        return fn.call(that, a);
	      };

	    case 2:
	      return function (a, b) {
	        return fn.call(that, a, b);
	      };

	    case 3:
	      return function (a, b, c) {
	        return fn.call(that, a, b, c);
	      };
	  }

	  return function ()
	  /* ...args */
	  {
	    return fn.apply(that, arguments);
	  };
	};

	// https://tc39.github.io/ecma262/#sec-toobject

	var toObject = function (argument) {
	  return Object(requireObjectCoercible(argument));
	};

	// https://tc39.github.io/ecma262/#sec-isarray

	var isArray = Array.isArray || function isArray(arg) {
	  return classofRaw(arg) == 'Array';
	};

	var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
	  // Chrome 38 Symbol has incorrect toString conversion
	  // eslint-disable-next-line no-undef
	  return !String(Symbol());
	});

	var useSymbolAsUid = nativeSymbol // eslint-disable-next-line no-undef
	&& !Symbol.sham // eslint-disable-next-line no-undef
	&& typeof Symbol.iterator == 'symbol';

	var WellKnownSymbolsStore = shared('wks');
	var Symbol$1 = global_1.Symbol;
	var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

	var wellKnownSymbol = function (name) {
	  if (!has(WellKnownSymbolsStore, name)) {
	    if (nativeSymbol && has(Symbol$1, name)) WellKnownSymbolsStore[name] = Symbol$1[name];else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
	  }

	  return WellKnownSymbolsStore[name];
	};

	var SPECIES = wellKnownSymbol('species'); // `ArraySpeciesCreate` abstract operation
	// https://tc39.github.io/ecma262/#sec-arrayspeciescreate

	var arraySpeciesCreate = function (originalArray, length) {
	  var C;

	  if (isArray(originalArray)) {
	    C = originalArray.constructor; // cross-realm fallback

	    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;else if (isObject(C)) {
	      C = C[SPECIES];
	      if (C === null) C = undefined;
	    }
	  }

	  return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
	};

	var push = [].push; // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterOut }` methods implementation

	var createMethod$1 = function (TYPE) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var IS_FILTER_OUT = TYPE == 7;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that, specificCreate) {
	    var O = toObject($this);
	    var self = indexedObject(O);
	    var boundFunction = functionBindContext(callbackfn, that, 3);
	    var length = toLength(self.length);
	    var index = 0;
	    var create = specificCreate || arraySpeciesCreate;
	    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_OUT ? create($this, 0) : undefined;
	    var value, result;

	    for (; length > index; index++) if (NO_HOLES || index in self) {
	      value = self[index];
	      result = boundFunction(value, index, O);

	      if (TYPE) {
	        if (IS_MAP) target[index] = result; // map
	        else if (result) switch (TYPE) {
	            case 3:
	              return true;
	            // some

	            case 5:
	              return value;
	            // find

	            case 6:
	              return index;
	            // findIndex

	            case 2:
	              push.call(target, value);
	            // filter
	          } else switch (TYPE) {
	            case 4:
	              return false;
	            // every

	            case 7:
	              push.call(target, value);
	            // filterOut
	          }
	      }
	    }

	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
	  };
	};

	var arrayIteration = {
	  // `Array.prototype.forEach` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
	  forEach: createMethod$1(0),
	  // `Array.prototype.map` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.map
	  map: createMethod$1(1),
	  // `Array.prototype.filter` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
	  filter: createMethod$1(2),
	  // `Array.prototype.some` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.some
	  some: createMethod$1(3),
	  // `Array.prototype.every` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.every
	  every: createMethod$1(4),
	  // `Array.prototype.find` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.find
	  find: createMethod$1(5),
	  // `Array.prototype.findIndex` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
	  findIndex: createMethod$1(6),
	  // `Array.prototype.filterOut` method
	  // https://github.com/tc39/proposal-array-filtering
	  filterOut: createMethod$1(7)
	};

	var arrayMethodIsStrict = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !!method && fails(function () {
	    // eslint-disable-next-line no-useless-call,no-throw-literal
	    method.call(null, argument || function () {
	      throw 1;
	    }, 1);
	  });
	};

	var defineProperty = Object.defineProperty;
	var cache = {};

	var thrower = function (it) {
	  throw it;
	};

	var arrayMethodUsesToLength = function (METHOD_NAME, options) {
	  if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
	  if (!options) options = {};
	  var method = [][METHOD_NAME];
	  var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
	  var argument0 = has(options, 0) ? options[0] : thrower;
	  var argument1 = has(options, 1) ? options[1] : undefined;
	  return cache[METHOD_NAME] = !!method && !fails(function () {
	    if (ACCESSORS && !descriptors) return true;
	    var O = {
	      length: -1
	    };
	    if (ACCESSORS) defineProperty(O, 1, {
	      enumerable: true,
	      get: thrower
	    });else O[1] = 1;
	    method.call(O, argument0, argument1);
	  });
	};

	var $forEach = arrayIteration.forEach;
	var STRICT_METHOD = arrayMethodIsStrict('forEach');
	var USES_TO_LENGTH = arrayMethodUsesToLength('forEach'); // `Array.prototype.forEach` method implementation
	// https://tc39.github.io/ecma262/#sec-array.prototype.foreach

	var arrayForEach = !STRICT_METHOD || !USES_TO_LENGTH ? function forEach(callbackfn
	/* , thisArg */
	) {
	  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	} : [].forEach;

	// https://tc39.github.io/ecma262/#sec-array.prototype.foreach


	_export({
	  target: 'Array',
	  proto: true,
	  forced: [].forEach != arrayForEach
	}, {
	  forEach: arrayForEach
	});

	var createProperty = function (object, key, value) {
	  var propertyKey = toPrimitive(key);
	  if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));else object[propertyKey] = value;
	};

	var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

	var process = global_1.process;
	var versions = process && process.versions;
	var v8 = versions && versions.v8;
	var match, version;

	if (v8) {
	  match = v8.split('.');
	  version = match[0] + match[1];
	} else if (engineUserAgent) {
	  match = engineUserAgent.match(/Edge\/(\d+)/);

	  if (!match || match[1] >= 74) {
	    match = engineUserAgent.match(/Chrome\/(\d+)/);
	    if (match) version = match[1];
	  }
	}

	var engineV8Version = version && +version;

	var SPECIES$1 = wellKnownSymbol('species');

	var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
	  // We can't use this feature detection in V8 since it causes
	  // deoptimization and serious performance degradation
	  // https://github.com/zloirock/core-js/issues/677
	  return engineV8Version >= 51 || !fails(function () {
	    var array = [];
	    var constructor = array.constructor = {};

	    constructor[SPECIES$1] = function () {
	      return {
	        foo: 1
	      };
	    };

	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};

	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');
	var USES_TO_LENGTH$1 = arrayMethodUsesToLength('slice', {
	  ACCESSORS: true,
	  0: 0,
	  1: 2
	});
	var SPECIES$2 = wellKnownSymbol('species');
	var nativeSlice = [].slice;
	var max$1 = Math.max; // `Array.prototype.slice` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.slice
	// fallback for not array-like ES3 strings and DOM objects

	_export({
	  target: 'Array',
	  proto: true,
	  forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH$1
	}, {
	  slice: function slice(start, end) {
	    var O = toIndexedObject(this);
	    var length = toLength(O.length);
	    var k = toAbsoluteIndex(start, length);
	    var fin = toAbsoluteIndex(end === undefined ? length : end, length); // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible

	    var Constructor, result, n;

	    if (isArray(O)) {
	      Constructor = O.constructor; // cross-realm fallback

	      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
	        Constructor = undefined;
	      } else if (isObject(Constructor)) {
	        Constructor = Constructor[SPECIES$2];
	        if (Constructor === null) Constructor = undefined;
	      }

	      if (Constructor === Array || Constructor === undefined) {
	        return nativeSlice.call(O, k, fin);
	      }
	    }

	    result = new (Constructor === undefined ? Array : Constructor)(max$1(fin - k, 0));

	    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);

	    result.length = n;
	    return result;
	  }
	});

	// iterable DOM collections
	// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
	var domIterables = {
	  CSSRuleList: 0,
	  CSSStyleDeclaration: 0,
	  CSSValueList: 0,
	  ClientRectList: 0,
	  DOMRectList: 0,
	  DOMStringList: 0,
	  DOMTokenList: 1,
	  DataTransferItemList: 0,
	  FileList: 0,
	  HTMLAllCollection: 0,
	  HTMLCollection: 0,
	  HTMLFormElement: 0,
	  HTMLSelectElement: 0,
	  MediaList: 0,
	  MimeTypeArray: 0,
	  NamedNodeMap: 0,
	  NodeList: 1,
	  PaintRequestList: 0,
	  Plugin: 0,
	  PluginArray: 0,
	  SVGLengthList: 0,
	  SVGNumberList: 0,
	  SVGPathSegList: 0,
	  SVGPointList: 0,
	  SVGStringList: 0,
	  SVGTransformList: 0,
	  SourceBufferList: 0,
	  StyleSheetList: 0,
	  TextTrackCueList: 0,
	  TextTrackList: 0,
	  TouchList: 0
	};

	for (var COLLECTION_NAME in domIterables) {
	  var Collection = global_1[COLLECTION_NAME];
	  var CollectionPrototype = Collection && Collection.prototype; // some Chrome versions have non-configurable methods on DOMTokenList

	  if (CollectionPrototype && CollectionPrototype.forEach !== arrayForEach) try {
	    createNonEnumerableProperty(CollectionPrototype, 'forEach', arrayForEach);
	  } catch (error) {
	    CollectionPrototype.forEach = arrayForEach;
	  }
	}

	/**
	 * Common utilities
	 * @module glMatrix
	 */
	var ARRAY_TYPE = typeof Float32Array !== 'undefined' ? Float32Array : Array;
	if (!Math.hypot) Math.hypot = function () {
	  var y = 0,
	      i = arguments.length;

	  while (i--) {
	    y += arguments[i] * arguments[i];
	  }

	  return Math.sqrt(y);
	};

	/**
	 * 4x4 Matrix<br>Format: column-major, when typed out it looks like row-major<br>The matrices are being post multiplied.
	 * @module mat4
	 */

	/**
	 * Creates a new identity mat4
	 *
	 * @returns {mat4} a new 4x4 matrix
	 */

	function create() {
	  var out = new ARRAY_TYPE(16);

	  if (ARRAY_TYPE != Float32Array) {
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 0;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 0;
	    out[9] = 0;
	    out[11] = 0;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = 0;
	  }

	  out[0] = 1;
	  out[5] = 1;
	  out[10] = 1;
	  out[15] = 1;
	  return out;
	}
	/**
	 * Inverts a mat4
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {ReadonlyMat4} a the source matrix
	 * @returns {mat4} out
	 */

	function invert(out, a) {
	  var a00 = a[0],
	      a01 = a[1],
	      a02 = a[2],
	      a03 = a[3];
	  var a10 = a[4],
	      a11 = a[5],
	      a12 = a[6],
	      a13 = a[7];
	  var a20 = a[8],
	      a21 = a[9],
	      a22 = a[10],
	      a23 = a[11];
	  var a30 = a[12],
	      a31 = a[13],
	      a32 = a[14],
	      a33 = a[15];
	  var b00 = a00 * a11 - a01 * a10;
	  var b01 = a00 * a12 - a02 * a10;
	  var b02 = a00 * a13 - a03 * a10;
	  var b03 = a01 * a12 - a02 * a11;
	  var b04 = a01 * a13 - a03 * a11;
	  var b05 = a02 * a13 - a03 * a12;
	  var b06 = a20 * a31 - a21 * a30;
	  var b07 = a20 * a32 - a22 * a30;
	  var b08 = a20 * a33 - a23 * a30;
	  var b09 = a21 * a32 - a22 * a31;
	  var b10 = a21 * a33 - a23 * a31;
	  var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

	  var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

	  if (!det) {
	    return null;
	  }

	  det = 1.0 / det;
	  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
	  out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
	  out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
	  out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
	  out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
	  out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
	  out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
	  out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
	  out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
	  out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
	  out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
	  out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
	  out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
	  out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
	  out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
	  out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
	  return out;
	}
	/**
	 * Multiplies two mat4s
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {ReadonlyMat4} a the first operand
	 * @param {ReadonlyMat4} b the second operand
	 * @returns {mat4} out
	 */

	function multiply(out, a, b) {
	  var a00 = a[0],
	      a01 = a[1],
	      a02 = a[2],
	      a03 = a[3];
	  var a10 = a[4],
	      a11 = a[5],
	      a12 = a[6],
	      a13 = a[7];
	  var a20 = a[8],
	      a21 = a[9],
	      a22 = a[10],
	      a23 = a[11];
	  var a30 = a[12],
	      a31 = a[13],
	      a32 = a[14],
	      a33 = a[15]; // Cache only the current line of the second matrix

	  var b0 = b[0],
	      b1 = b[1],
	      b2 = b[2],
	      b3 = b[3];
	  out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
	  out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
	  out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
	  out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
	  b0 = b[4];
	  b1 = b[5];
	  b2 = b[6];
	  b3 = b[7];
	  out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
	  out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
	  out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
	  out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
	  b0 = b[8];
	  b1 = b[9];
	  b2 = b[10];
	  b3 = b[11];
	  out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
	  out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
	  out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
	  out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
	  b0 = b[12];
	  b1 = b[13];
	  b2 = b[14];
	  b3 = b[15];
	  out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
	  out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
	  out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
	  out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
	  return out;
	}
	/**
	 * Translate a mat4 by the given vector
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {ReadonlyMat4} a the matrix to translate
	 * @param {ReadonlyVec3} v vector to translate by
	 * @returns {mat4} out
	 */

	function translate(out, a, v) {
	  var x = v[0],
	      y = v[1],
	      z = v[2];
	  var a00, a01, a02, a03;
	  var a10, a11, a12, a13;
	  var a20, a21, a22, a23;

	  if (a === out) {
	    out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
	    out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
	    out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
	    out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
	  } else {
	    a00 = a[0];
	    a01 = a[1];
	    a02 = a[2];
	    a03 = a[3];
	    a10 = a[4];
	    a11 = a[5];
	    a12 = a[6];
	    a13 = a[7];
	    a20 = a[8];
	    a21 = a[9];
	    a22 = a[10];
	    a23 = a[11];
	    out[0] = a00;
	    out[1] = a01;
	    out[2] = a02;
	    out[3] = a03;
	    out[4] = a10;
	    out[5] = a11;
	    out[6] = a12;
	    out[7] = a13;
	    out[8] = a20;
	    out[9] = a21;
	    out[10] = a22;
	    out[11] = a23;
	    out[12] = a00 * x + a10 * y + a20 * z + a[12];
	    out[13] = a01 * x + a11 * y + a21 * z + a[13];
	    out[14] = a02 * x + a12 * y + a22 * z + a[14];
	    out[15] = a03 * x + a13 * y + a23 * z + a[15];
	  }

	  return out;
	}
	/**
	 * Scales the mat4 by the dimensions in the given vec3 not using vectorization
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {ReadonlyMat4} a the matrix to scale
	 * @param {ReadonlyVec3} v the vec3 to scale the matrix by
	 * @returns {mat4} out
	 **/

	function scale(out, a, v) {
	  var x = v[0],
	      y = v[1],
	      z = v[2];
	  out[0] = a[0] * x;
	  out[1] = a[1] * x;
	  out[2] = a[2] * x;
	  out[3] = a[3] * x;
	  out[4] = a[4] * y;
	  out[5] = a[5] * y;
	  out[6] = a[6] * y;
	  out[7] = a[7] * y;
	  out[8] = a[8] * z;
	  out[9] = a[9] * z;
	  out[10] = a[10] * z;
	  out[11] = a[11] * z;
	  out[12] = a[12];
	  out[13] = a[13];
	  out[14] = a[14];
	  out[15] = a[15];
	  return out;
	}
	/**
	 * Rotates a matrix by the given angle around the Z axis
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {ReadonlyMat4} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat4} out
	 */

	function rotateZ(out, a, rad) {
	  var s = Math.sin(rad);
	  var c = Math.cos(rad);
	  var a00 = a[0];
	  var a01 = a[1];
	  var a02 = a[2];
	  var a03 = a[3];
	  var a10 = a[4];
	  var a11 = a[5];
	  var a12 = a[6];
	  var a13 = a[7];

	  if (a !== out) {
	    // If the source and destination differ, copy the unchanged last row
	    out[8] = a[8];
	    out[9] = a[9];
	    out[10] = a[10];
	    out[11] = a[11];
	    out[12] = a[12];
	    out[13] = a[13];
	    out[14] = a[14];
	    out[15] = a[15];
	  } // Perform axis-specific matrix multiplication


	  out[0] = a00 * c + a10 * s;
	  out[1] = a01 * c + a11 * s;
	  out[2] = a02 * c + a12 * s;
	  out[3] = a03 * c + a13 * s;
	  out[4] = a10 * c - a00 * s;
	  out[5] = a11 * c - a01 * s;
	  out[6] = a12 * c - a02 * s;
	  out[7] = a13 * c - a03 * s;
	  return out;
	}

	/**
	 * 3 Dimensional Vector
	 * @module vec3
	 */

	/**
	 * Creates a new, empty vec3
	 *
	 * @returns {vec3} a new 3D vector
	 */

	function create$1() {
	  var out = new ARRAY_TYPE(3);

	  if (ARRAY_TYPE != Float32Array) {
	    out[0] = 0;
	    out[1] = 0;
	    out[2] = 0;
	  }

	  return out;
	}
	/**
	 * Subtracts vector b from vector a
	 *
	 * @param {vec3} out the receiving vector
	 * @param {ReadonlyVec3} a the first operand
	 * @param {ReadonlyVec3} b the second operand
	 * @returns {vec3} out
	 */

	function subtract(out, a, b) {
	  out[0] = a[0] - b[0];
	  out[1] = a[1] - b[1];
	  out[2] = a[2] - b[2];
	  return out;
	}
	/**
	 * Normalize a vec3
	 *
	 * @param {vec3} out the receiving vector
	 * @param {ReadonlyVec3} a vector to normalize
	 * @returns {vec3} out
	 */

	function normalize$1(out, a) {
	  var x = a[0];
	  var y = a[1];
	  var z = a[2];
	  var len = x * x + y * y + z * z;

	  if (len > 0) {
	    //TODO: evaluate use of glm_invsqrt here?
	    len = 1 / Math.sqrt(len);
	  }

	  out[0] = a[0] * len;
	  out[1] = a[1] * len;
	  out[2] = a[2] * len;
	  return out;
	}
	/**
	 * Computes the cross product of two vec3's
	 *
	 * @param {vec3} out the receiving vector
	 * @param {ReadonlyVec3} a the first operand
	 * @param {ReadonlyVec3} b the second operand
	 * @returns {vec3} out
	 */

	function cross(out, a, b) {
	  var ax = a[0],
	      ay = a[1],
	      az = a[2];
	  var bx = b[0],
	      by = b[1],
	      bz = b[2];
	  out[0] = ay * bz - az * by;
	  out[1] = az * bx - ax * bz;
	  out[2] = ax * by - ay * bx;
	  return out;
	}
	/**
	 * Alias for {@link vec3.subtract}
	 * @function
	 */

	var sub = subtract;
	/**
	 * Perform some operation over an array of vec3s.
	 *
	 * @param {Array} a the array of vectors to iterate over
	 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
	 * @param {Number} offset Number of elements to skip at the beginning of the array
	 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
	 * @param {Function} fn Function to call for each vector in the array
	 * @param {Object} [arg] additional argument to pass to fn
	 * @returns {Array} a
	 * @function
	 */

	var forEach = function () {
	  var vec = create$1();
	  return function (a, stride, offset, count, fn, arg) {
	    var i, l;

	    if (!stride) {
	      stride = 3;
	    }

	    if (!offset) {
	      offset = 0;
	    }

	    if (count) {
	      l = Math.min(count * stride + offset, a.length);
	    } else {
	      l = a.length;
	    }

	    for (i = offset; i < l; i += stride) {
	      vec[0] = a[i];
	      vec[1] = a[i + 1];
	      vec[2] = a[i + 2];
	      fn(vec, vec, arg);
	      a[i] = vec[0];
	      a[i + 1] = vec[1];
	      a[i + 2] = vec[2];
	    }

	    return a;
	  };
	}();

	/**
	 * 2 Dimensional Vector
	 * @module vec2
	 */

	/**
	 * Creates a new, empty vec2
	 *
	 * @returns {vec2} a new 2D vector
	 */

	function create$2() {
	  var out = new ARRAY_TYPE(2);

	  if (ARRAY_TYPE != Float32Array) {
	    out[0] = 0;
	    out[1] = 0;
	  }

	  return out;
	}
	/**
	 * Creates a new vec2 initialized with the given values
	 *
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @returns {vec2} a new 2D vector
	 */

	function fromValues(x, y) {
	  var out = new ARRAY_TYPE(2);
	  out[0] = x;
	  out[1] = y;
	  return out;
	}
	/**
	 * Copy the values from one vec2 to another
	 *
	 * @param {vec2} out the receiving vector
	 * @param {ReadonlyVec2} a the source vector
	 * @returns {vec2} out
	 */

	function copy(out, a) {
	  out[0] = a[0];
	  out[1] = a[1];
	  return out;
	}
	/**
	 * Set the components of a vec2 to the given values
	 *
	 * @param {vec2} out the receiving vector
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @returns {vec2} out
	 */

	function set$1(out, x, y) {
	  out[0] = x;
	  out[1] = y;
	  return out;
	}
	/**
	 * Adds two vec2's
	 *
	 * @param {vec2} out the receiving vector
	 * @param {ReadonlyVec2} a the first operand
	 * @param {ReadonlyVec2} b the second operand
	 * @returns {vec2} out
	 */

	function add(out, a, b) {
	  out[0] = a[0] + b[0];
	  out[1] = a[1] + b[1];
	  return out;
	}
	/**
	 * Subtracts vector b from vector a
	 *
	 * @param {vec2} out the receiving vector
	 * @param {ReadonlyVec2} a the first operand
	 * @param {ReadonlyVec2} b the second operand
	 * @returns {vec2} out
	 */

	function subtract$1(out, a, b) {
	  out[0] = a[0] - b[0];
	  out[1] = a[1] - b[1];
	  return out;
	}
	/**
	 * Normalize a vec2
	 *
	 * @param {vec2} out the receiving vector
	 * @param {ReadonlyVec2} a vector to normalize
	 * @returns {vec2} out
	 */

	function normalize$2(out, a) {
	  var x = a[0],
	      y = a[1];
	  var len = x * x + y * y;

	  if (len > 0) {
	    //TODO: evaluate use of glm_invsqrt here?
	    len = 1 / Math.sqrt(len);
	  }

	  out[0] = a[0] * len;
	  out[1] = a[1] * len;
	  return out;
	}
	/**
	 * Calculates the dot product of two vec2's
	 *
	 * @param {ReadonlyVec2} a the first operand
	 * @param {ReadonlyVec2} b the second operand
	 * @returns {Number} dot product of a and b
	 */

	function dot(a, b) {
	  return a[0] * b[0] + a[1] * b[1];
	}
	/**
	 * Alias for {@link vec2.subtract}
	 * @function
	 */

	var sub$1 = subtract$1;
	/**
	 * Perform some operation over an array of vec2s.
	 *
	 * @param {Array} a the array of vectors to iterate over
	 * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
	 * @param {Number} offset Number of elements to skip at the beginning of the array
	 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
	 * @param {Function} fn Function to call for each vector in the array
	 * @param {Object} [arg] additional argument to pass to fn
	 * @returns {Array} a
	 * @function
	 */

	var forEach$1 = function () {
	  var vec = create$2();
	  return function (a, stride, offset, count, fn, arg) {
	    var i, l;

	    if (!stride) {
	      stride = 2;
	    }

	    if (!offset) {
	      offset = 0;
	    }

	    if (count) {
	      l = Math.min(count * stride + offset, a.length);
	    } else {
	      l = a.length;
	    }

	    for (i = offset; i < l; i += stride) {
	      vec[0] = a[i];
	      vec[1] = a[i + 1];
	      fn(vec, vec, arg);
	      a[i] = vec[0];
	      a[i + 1] = vec[1];
	    }

	    return a;
	  };
	}();

	/**
	 * 封装一个mapboxgl的地图对象
	 * @param {mapboxgl.Map} map mapbox地图
	 */

	function getMapBoxGLMap(map) {
	  var transform = map.transform; // 所有监听的事件

	  var listeners = [];

	  function listen(type, handler) {
	    listeners.push({
	      type: type,
	      handler: handler
	    });
	    map.on(type, handler);
	  }

	  return {
	    mapType: "mapboxgl",

	    /* *********** 事件同步相关 ************** */
	    onResize: function onResize(handler) {
	      listen("resize", handler);
	    },
	    onUpdate: function onUpdate(handler) {
	      listen("render", handler);
	    },
	    onClick: function onClick(handler) {
	      listen("click", function (evt) {
	        handler(evt.point);
	      });
	    },
	    onDblClick: function onDblClick(handler) {
	      listen("dblclick", function (evt) {
	        handler(evt.point);
	      });
	    },
	    onRightClick: function onRightClick(handler) {
	      listen("contextmenu", function (evt) {
	        handler(evt.point);
	      });
	    },
	    onMousemove: function onMousemove(handler) {
	      listen("mousemove", function (evt) {
	        if (!map.isMoving()) {
	          handler(evt.point);
	        }
	      });
	    },

	    /* *************** 容器相关 **************** */
	    getContainer: function getContainer() {
	      return map.getCanvasContainer();
	    },
	    getSize: function getSize() {
	      return {
	        width: transform.width,
	        height: transform.height
	      };
	    },

	    /* ************** 地图参数相关 ************** */
	    getCenter: function getCenter() {
	      return map.getCenter().toArray();
	    },
	    getZoom: function getZoom() {
	      return map.getZoom();
	    },
	    // 地图范围（矩阵范围）用于repeat
	    worldSize: function worldSize() {
	      return 1;
	    },
	    // 当前zoom范围下图幅像素范围
	    getZoomUnits: function getZoomUnits() {
	      return 1 / transform.worldSize;
	    },

	    /* *********** 矩阵和坐标转换相关 ************ */
	    // 坐标转换
	    normizedPoint: function normizedPoint(coord) {
	      // 转为墨卡托坐标
	      var mCoords = mapboxgl.MercatorCoordinate.fromLngLat(coord.slice(0, 3), coord[2] || 0, transform.projection);
	      return [mCoords.x, mCoords.y, mCoords.z];
	    },
	    updateMatrixs: function updateMatrixs() {
	      var projectionMatrix = create();
	      var viewMatrix = transform.mercatorMatrix.slice();
	      var pixelToViewMatrix = create();
	      var zoomUnits = this.getZoomUnits();
	      var _transform$point = transform.point,
	          x = _transform$point.x,
	          y = _transform$point.y;
	      scale(pixelToViewMatrix, viewMatrix, [zoomUnits, zoomUnits, zoomUnits]);
	      translate(pixelToViewMatrix, pixelToViewMatrix, [x, y, 0]);
	      return {
	        projectionMatrix: projectionMatrix,
	        viewMatrix: viewMatrix,
	        pixelToViewMatrix: pixelToViewMatrix,
	        matrix: multiply([], projectionMatrix, viewMatrix)
	      };
	    },

	    /* **************** 销毁接口 ***************** */
	    // 销毁方法
	    destroy: function destroy() {
	      listeners.forEach(function (l) {
	        map.off(l.type, l.handler);
	      }); // eslint-disable-next-line no-func-assign

	      map = listen = listeners = null;
	    }
	  };
	}

	var map = {
	  getMapBoxGLMap: getMapBoxGLMap
	};

	var aPossiblePrototype = function (it) {
	  if (!isObject(it) && it !== null) {
	    throw TypeError("Can't set " + String(it) + ' as a prototype');
	  }

	  return it;
	};

	// https://tc39.github.io/ecma262/#sec-object.setprototypeof
	// Works with __proto__ only. Old v8 can't work with null proto objects.

	/* eslint-disable no-proto */

	var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
	  var CORRECT_SETTER = false;
	  var test = {};
	  var setter;

	  try {
	    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
	    setter.call(test, []);
	    CORRECT_SETTER = test instanceof Array;
	  } catch (error) {
	    /* empty */
	  }

	  return function setPrototypeOf(O, proto) {
	    anObject(O);
	    aPossiblePrototype(proto);
	    if (CORRECT_SETTER) setter.call(O, proto);else O.__proto__ = proto;
	    return O;
	  };
	}() : undefined);

	var inheritIfRequired = function ($this, dummy, Wrapper) {
	  var NewTarget, NewTargetPrototype;
	  if ( // it can work only with native `setPrototypeOf`
	  objectSetPrototypeOf && // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
	  typeof (NewTarget = dummy.constructor) == 'function' && NewTarget !== Wrapper && isObject(NewTargetPrototype = NewTarget.prototype) && NewTargetPrototype !== Wrapper.prototype) objectSetPrototypeOf($this, NewTargetPrototype);
	  return $this;
	};

	var MATCH = wellKnownSymbol('match'); // `IsRegExp` abstract operation
	// https://tc39.github.io/ecma262/#sec-isregexp

	var isRegexp = function (it) {
	  var isRegExp;
	  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
	};

	// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags


	var regexpFlags = function () {
	  var that = anObject(this);
	  var result = '';
	  if (that.global) result += 'g';
	  if (that.ignoreCase) result += 'i';
	  if (that.multiline) result += 'm';
	  if (that.dotAll) result += 's';
	  if (that.unicode) result += 'u';
	  if (that.sticky) result += 'y';
	  return result;
	};

	// so we use an intermediate function.


	function RE(s, f) {
	  return RegExp(s, f);
	}

	var UNSUPPORTED_Y = fails(function () {
	  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
	  var re = RE('a', 'y');
	  re.lastIndex = 2;
	  return re.exec('abcd') != null;
	});
	var BROKEN_CARET = fails(function () {
	  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
	  var re = RE('^r', 'gy');
	  re.lastIndex = 2;
	  return re.exec('str') != null;
	});
	var regexpStickyHelpers = {
	  UNSUPPORTED_Y: UNSUPPORTED_Y,
	  BROKEN_CARET: BROKEN_CARET
	};

	var SPECIES$3 = wellKnownSymbol('species');

	var setSpecies = function (CONSTRUCTOR_NAME) {
	  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
	  var defineProperty = objectDefineProperty.f;

	  if (descriptors && Constructor && !Constructor[SPECIES$3]) {
	    defineProperty(Constructor, SPECIES$3, {
	      configurable: true,
	      get: function () {
	        return this;
	      }
	    });
	  }
	};

	var defineProperty$1 = objectDefineProperty.f;
	var getOwnPropertyNames = objectGetOwnPropertyNames.f;
	var setInternalState = internalState.set;
	var MATCH$1 = wellKnownSymbol('match');
	var NativeRegExp = global_1.RegExp;
	var RegExpPrototype = NativeRegExp.prototype;
	var re1 = /a/g;
	var re2 = /a/g; // "new" should create a new object, old webkit bug

	var CORRECT_NEW = new NativeRegExp(re1) !== re1;
	var UNSUPPORTED_Y$1 = regexpStickyHelpers.UNSUPPORTED_Y;
	var FORCED = descriptors && isForced_1('RegExp', !CORRECT_NEW || UNSUPPORTED_Y$1 || fails(function () {
	  re2[MATCH$1] = false; // RegExp constructor can alter flags and IsRegExp works correct with @@match

	  return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
	})); // `RegExp` constructor
	// https://tc39.github.io/ecma262/#sec-regexp-constructor

	if (FORCED) {
	  var RegExpWrapper = function RegExp(pattern, flags) {
	    var thisIsRegExp = this instanceof RegExpWrapper;
	    var patternIsRegExp = isRegexp(pattern);
	    var flagsAreUndefined = flags === undefined;
	    var sticky;

	    if (!thisIsRegExp && patternIsRegExp && pattern.constructor === RegExpWrapper && flagsAreUndefined) {
	      return pattern;
	    }

	    if (CORRECT_NEW) {
	      if (patternIsRegExp && !flagsAreUndefined) pattern = pattern.source;
	    } else if (pattern instanceof RegExpWrapper) {
	      if (flagsAreUndefined) flags = regexpFlags.call(pattern);
	      pattern = pattern.source;
	    }

	    if (UNSUPPORTED_Y$1) {
	      sticky = !!flags && flags.indexOf('y') > -1;
	      if (sticky) flags = flags.replace(/y/g, '');
	    }

	    var result = inheritIfRequired(CORRECT_NEW ? new NativeRegExp(pattern, flags) : NativeRegExp(pattern, flags), thisIsRegExp ? this : RegExpPrototype, RegExpWrapper);
	    if (UNSUPPORTED_Y$1 && sticky) setInternalState(result, {
	      sticky: sticky
	    });
	    return result;
	  };

	  var proxy = function (key) {
	    key in RegExpWrapper || defineProperty$1(RegExpWrapper, key, {
	      configurable: true,
	      get: function () {
	        return NativeRegExp[key];
	      },
	      set: function (it) {
	        NativeRegExp[key] = it;
	      }
	    });
	  };

	  var keys$1 = getOwnPropertyNames(NativeRegExp);
	  var index = 0;

	  while (keys$1.length > index) proxy(keys$1[index++]);

	  RegExpPrototype.constructor = RegExpWrapper;
	  RegExpWrapper.prototype = RegExpPrototype;
	  redefine(global_1, 'RegExp', RegExpWrapper);
	} // https://tc39.github.io/ecma262/#sec-get-regexp-@@species


	setSpecies('RegExp');

	var nativeExec = RegExp.prototype.exec; // This always refers to the native implementation, because the
	// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
	// which loads this file before patching the method.

	var nativeReplace = String.prototype.replace;
	var patchedExec = nativeExec;

	var UPDATES_LAST_INDEX_WRONG = function () {
	  var re1 = /a/;
	  var re2 = /b*/g;
	  nativeExec.call(re1, 'a');
	  nativeExec.call(re2, 'a');
	  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
	}();

	var UNSUPPORTED_Y$2 = regexpStickyHelpers.UNSUPPORTED_Y || regexpStickyHelpers.BROKEN_CARET; // nonparticipating capturing group, copied from es5-shim's String#split patch.

	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;
	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$2;

	if (PATCH) {
	  patchedExec = function exec(str) {
	    var re = this;
	    var lastIndex, reCopy, match, i;
	    var sticky = UNSUPPORTED_Y$2 && re.sticky;
	    var flags = regexpFlags.call(re);
	    var source = re.source;
	    var charsAdded = 0;
	    var strCopy = str;

	    if (sticky) {
	      flags = flags.replace('y', '');

	      if (flags.indexOf('g') === -1) {
	        flags += 'g';
	      }

	      strCopy = String(str).slice(re.lastIndex); // Support anchored sticky behavior.

	      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
	        source = '(?: ' + source + ')';
	        strCopy = ' ' + strCopy;
	        charsAdded++;
	      } // ^(? + rx + ) is needed, in combination with some str slicing, to
	      // simulate the 'y' flag.


	      reCopy = new RegExp('^(?:' + source + ')', flags);
	    }

	    if (NPCG_INCLUDED) {
	      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
	    }

	    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;
	    match = nativeExec.call(sticky ? reCopy : re, strCopy);

	    if (sticky) {
	      if (match) {
	        match.input = match.input.slice(charsAdded);
	        match[0] = match[0].slice(charsAdded);
	        match.index = re.lastIndex;
	        re.lastIndex += match[0].length;
	      } else re.lastIndex = 0;
	    } else if (UPDATES_LAST_INDEX_WRONG && match) {
	      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
	    }

	    if (NPCG_INCLUDED && match && match.length > 1) {
	      // Fix browsers whose `exec` methods don't consistently return `undefined`
	      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
	      nativeReplace.call(match[0], reCopy, function () {
	        for (i = 1; i < arguments.length - 2; i++) {
	          if (arguments[i] === undefined) match[i] = undefined;
	        }
	      });
	    }

	    return match;
	  };
	}

	var regexpExec = patchedExec;

	_export({
	  target: 'RegExp',
	  proto: true,
	  forced: /./.exec !== regexpExec
	}, {
	  exec: regexpExec
	});

	var TO_STRING = 'toString';
	var RegExpPrototype$1 = RegExp.prototype;
	var nativeToString = RegExpPrototype$1[TO_STRING];
	var NOT_GENERIC = fails(function () {
	  return nativeToString.call({
	    source: 'a',
	    flags: 'b'
	  }) != '/a/b';
	}); // FF44- RegExp#toString has a wrong name

	var INCORRECT_NAME = nativeToString.name != TO_STRING; // `RegExp.prototype.toString` method
	// https://tc39.github.io/ecma262/#sec-regexp.prototype.tostring

	if (NOT_GENERIC || INCORRECT_NAME) {
	  redefine(RegExp.prototype, TO_STRING, function toString() {
	    var R = anObject(this);
	    var p = String(R.source);
	    var rf = R.flags;
	    var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype$1) ? regexpFlags.call(R) : rf);
	    return '/' + p + '/' + f;
	  }, {
	    unsafe: true
	  });
	}

	var SPECIES$4 = wellKnownSymbol('species');
	var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
	  // #replace needs built-in support for named groups.
	  // #match works fine because it just return the exec results, even if it has
	  // a "grops" property.
	  var re = /./;

	  re.exec = function () {
	    var result = [];
	    result.groups = {
	      a: '7'
	    };
	    return result;
	  };

	  return ''.replace(re, '$<a>') !== '7';
	}); // IE <= 11 replaces $0 with the whole match, as if it was $&
	// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0

	var REPLACE_KEEPS_$0 = function () {
	  return 'a'.replace(/./, '$0') === '$0';
	}();

	var REPLACE = wellKnownSymbol('replace'); // Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string

	var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = function () {
	  if (/./[REPLACE]) {
	    return /./[REPLACE]('a', '$0') === '';
	  }

	  return false;
	}(); // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
	// Weex JS has frozen built-in prototypes, so use try / catch wrapper


	var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
	  var re = /(?:)/;
	  var originalExec = re.exec;

	  re.exec = function () {
	    return originalExec.apply(this, arguments);
	  };

	  var result = 'ab'.split(re);
	  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
	});

	var fixRegexpWellKnownSymbolLogic = function (KEY, length, exec, sham) {
	  var SYMBOL = wellKnownSymbol(KEY);
	  var DELEGATES_TO_SYMBOL = !fails(function () {
	    // String methods call symbol-named RegEp methods
	    var O = {};

	    O[SYMBOL] = function () {
	      return 7;
	    };

	    return ''[KEY](O) != 7;
	  });
	  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
	    // Symbol-named RegExp methods call .exec
	    var execCalled = false;
	    var re = /a/;

	    if (KEY === 'split') {
	      // We can't use real regex here since it causes deoptimization
	      // and serious performance degradation in V8
	      // https://github.com/zloirock/core-js/issues/306
	      re = {}; // RegExp[@@split] doesn't call the regex's exec method, but first creates
	      // a new one. We need to return the patched regex when creating the new one.

	      re.constructor = {};

	      re.constructor[SPECIES$4] = function () {
	        return re;
	      };

	      re.flags = '';
	      re[SYMBOL] = /./[SYMBOL];
	    }

	    re.exec = function () {
	      execCalled = true;
	      return null;
	    };

	    re[SYMBOL]('');
	    return !execCalled;
	  });

	  if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || KEY === 'replace' && !(REPLACE_SUPPORTS_NAMED_GROUPS && REPLACE_KEEPS_$0 && !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE) || KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC) {
	    var nativeRegExpMethod = /./[SYMBOL];
	    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
	      if (regexp.exec === regexpExec) {
	        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
	          // The native String method already delegates to @@method (this
	          // polyfilled function), leasing to infinite recursion.
	          // We avoid it by directly calling the native @@method method.
	          return {
	            done: true,
	            value: nativeRegExpMethod.call(regexp, str, arg2)
	          };
	        }

	        return {
	          done: true,
	          value: nativeMethod.call(str, regexp, arg2)
	        };
	      }

	      return {
	        done: false
	      };
	    }, {
	      REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
	      REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
	    });
	    var stringMethod = methods[0];
	    var regexMethod = methods[1];
	    redefine(String.prototype, KEY, stringMethod);
	    redefine(RegExp.prototype, SYMBOL, length == 2 // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
	    // 21.2.5.11 RegExp.prototype[@@split](string, limit)
	    ? function (string, arg) {
	      return regexMethod.call(string, this, arg);
	    } // 21.2.5.6 RegExp.prototype[@@match](string)
	    // 21.2.5.9 RegExp.prototype[@@search](string)
	    : function (string) {
	      return regexMethod.call(string, this);
	    });
	  }

	  if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
	};

	var createMethod$2 = function (CONVERT_TO_STRING) {
	  return function ($this, pos) {
	    var S = String(requireObjectCoercible($this));
	    var position = toInteger(pos);
	    var size = S.length;
	    var first, second;
	    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
	    first = S.charCodeAt(position);
	    return first < 0xD800 || first > 0xDBFF || position + 1 === size || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF ? CONVERT_TO_STRING ? S.charAt(position) : first : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
	  };
	};

	var stringMultibyte = {
	  // `String.prototype.codePointAt` method
	  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
	  codeAt: createMethod$2(false),
	  // `String.prototype.at` method
	  // https://github.com/mathiasbynens/String.prototype.at
	  charAt: createMethod$2(true)
	};

	var charAt = stringMultibyte.charAt; // `AdvanceStringIndex` abstract operation
	// https://tc39.github.io/ecma262/#sec-advancestringindex

	var advanceStringIndex = function (S, index, unicode) {
	  return index + (unicode ? charAt(S, index).length : 1);
	};

	// https://tc39.github.io/ecma262/#sec-regexpexec

	var regexpExecAbstract = function (R, S) {
	  var exec = R.exec;

	  if (typeof exec === 'function') {
	    var result = exec.call(R, S);

	    if (typeof result !== 'object') {
	      throw TypeError('RegExp exec method returned something other than an Object or null');
	    }

	    return result;
	  }

	  if (classofRaw(R) !== 'RegExp') {
	    throw TypeError('RegExp#exec called on incompatible receiver');
	  }

	  return regexpExec.call(R, S);
	};

	var max$2 = Math.max;
	var min$2 = Math.min;
	var floor$1 = Math.floor;
	var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
	var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;

	var maybeToString = function (it) {
	  return it === undefined ? it : String(it);
	}; // @@replace logic


	fixRegexpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative, reason) {
	  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE;
	  var REPLACE_KEEPS_$0 = reason.REPLACE_KEEPS_$0;
	  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';
	  return [// `String.prototype.replace` method
	  // https://tc39.github.io/ecma262/#sec-string.prototype.replace
	  function replace(searchValue, replaceValue) {
	    var O = requireObjectCoercible(this);
	    var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
	    return replacer !== undefined ? replacer.call(searchValue, O, replaceValue) : nativeReplace.call(String(O), searchValue, replaceValue);
	  }, // `RegExp.prototype[@@replace]` method
	  // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
	  function (regexp, replaceValue) {
	    if (!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE && REPLACE_KEEPS_$0 || typeof replaceValue === 'string' && replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1) {
	      var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
	      if (res.done) return res.value;
	    }

	    var rx = anObject(regexp);
	    var S = String(this);
	    var functionalReplace = typeof replaceValue === 'function';
	    if (!functionalReplace) replaceValue = String(replaceValue);
	    var global = rx.global;

	    if (global) {
	      var fullUnicode = rx.unicode;
	      rx.lastIndex = 0;
	    }

	    var results = [];

	    while (true) {
	      var result = regexpExecAbstract(rx, S);
	      if (result === null) break;
	      results.push(result);
	      if (!global) break;
	      var matchStr = String(result[0]);
	      if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
	    }

	    var accumulatedResult = '';
	    var nextSourcePosition = 0;

	    for (var i = 0; i < results.length; i++) {
	      result = results[i];
	      var matched = String(result[0]);
	      var position = max$2(min$2(toInteger(result.index), S.length), 0);
	      var captures = []; // NOTE: This is equivalent to
	      //   captures = result.slice(1).map(maybeToString)
	      // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
	      // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
	      // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.

	      for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));

	      var namedCaptures = result.groups;

	      if (functionalReplace) {
	        var replacerArgs = [matched].concat(captures, position, S);
	        if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
	        var replacement = String(replaceValue.apply(undefined, replacerArgs));
	      } else {
	        replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
	      }

	      if (position >= nextSourcePosition) {
	        accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
	        nextSourcePosition = position + matched.length;
	      }
	    }

	    return accumulatedResult + S.slice(nextSourcePosition);
	  }]; // https://tc39.github.io/ecma262/#sec-getsubstitution

	  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
	    var tailPos = position + matched.length;
	    var m = captures.length;
	    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;

	    if (namedCaptures !== undefined) {
	      namedCaptures = toObject(namedCaptures);
	      symbols = SUBSTITUTION_SYMBOLS;
	    }

	    return nativeReplace.call(replacement, symbols, function (match, ch) {
	      var capture;

	      switch (ch.charAt(0)) {
	        case '$':
	          return '$';

	        case '&':
	          return matched;

	        case '`':
	          return str.slice(0, position);

	        case "'":
	          return str.slice(tailPos);

	        case '<':
	          capture = namedCaptures[ch.slice(1, -1)];
	          break;

	        default:
	          // \d\d?
	          var n = +ch;
	          if (n === 0) return match;

	          if (n > m) {
	            var f = floor$1(n / 10);
	            if (f === 0) return match;
	            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
	            return match;
	          }

	          capture = captures[n - 1];
	      }

	      return capture === undefined ? '' : capture;
	    });
	  }
	});

	/**
	 * @author kyle / http://nikai.us/
	 * @module csv
	 */
	var csv = {
	  /**
	   * CSV字符串转为数组
	   * 
	   * @param {String} strData csv字符串
	   * @param {String=} [strDelimiter=','] 切割字符标识
	   * @returns {Array}
	   */
	  CSVToArray: function CSVToArray(strData, strDelimiter) {
	    // Check to see if the delimiter is defined. If not,
	    // then default to comma.
	    strDelimiter = strDelimiter || ","; // Create a regular expression to parse the CSV values.

	    var objPattern = new RegExp( // Delimiters.
	    "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" + // Quoted fields.
	    "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" + // Standard fields.
	    "([^\"\\" + strDelimiter + "\\r\\n]*))", "gi"); // Create an array to hold our data. Give the array
	    // a default empty first row.

	    var arrData = [[]]; // Create an array to hold our individual pattern
	    // matching groups.

	    var arrMatches = null; // Keep looping over the regular expression matches
	    // until we can no longer find a match.
	    // eslint-disable-next-line no-cond-assign

	    while (arrMatches = objPattern.exec(strData)) {
	      // Get the delimiter that was found.
	      var strMatchedDelimiter = arrMatches[1]; // Check to see if the given delimiter has a length
	      // (is not the start of string) and if it matches
	      // field delimiter. If id does not, then we know
	      // that this delimiter is a row delimiter.

	      if (strMatchedDelimiter.length && strMatchedDelimiter !== strDelimiter) {
	        // Since we have reached a new row of data,
	        // add an empty row to our data array.
	        arrData.push([]);
	      }

	      var strMatchedValue = void 0; // Now that we have our delimiter out of the way,
	      // let's check to see which kind of value we
	      // captured (quoted or unquoted).

	      if (arrMatches[2]) {
	        // We found a quoted value. When we capture
	        // this value, unescape any double quotes.
	        strMatchedValue = arrMatches[2].replace(new RegExp("\"\"", "g"), "\"");
	      } else {
	        // We found a non-quoted value.
	        strMatchedValue = arrMatches[3];
	      } // Now that we have our value string, let's add
	      // it to the data array.


	      arrData[arrData.length - 1].push(strMatchedValue);
	    } // Return the parsed data.


	    return arrData;
	  },

	  /**
	   * csv字符串专为featrue数组，需要数据有geometry，properties等属性
	   * 
	   * @param {String} csvStr csv字符串
	   * @param {String=} [split=','] 切割字符标识
	   * @returns {Array}
	   */
	  getDataArray: function getDataArray(csvStr, split) {
	    var arr = this.CSVToArray(csvStr, split || ',');
	    var data = [];
	    var header = arr[0];

	    for (var i = 1; i < arr.length - 1; i++) {
	      var line = arr[i];
	      var item = {};

	      for (var j = 0; j < line.length; j++) {
	        var value = line[j];

	        if (header[j] == 'geometry') {
	          value = JSON.parse(value);
	        }

	        item[header[j]] = value;
	      }

	      data.push(item);
	    }

	    return data;
	  }
	};

	// a string of all valid unicode whitespaces
	// eslint-disable-next-line max-len
	var whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var whitespace = '[' + whitespaces + ']';
	var ltrim = RegExp('^' + whitespace + whitespace + '*');
	var rtrim = RegExp(whitespace + whitespace + '*$'); // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation

	var createMethod$3 = function (TYPE) {
	  return function ($this) {
	    var string = String(requireObjectCoercible($this));
	    if (TYPE & 1) string = string.replace(ltrim, '');
	    if (TYPE & 2) string = string.replace(rtrim, '');
	    return string;
	  };
	};

	var stringTrim = {
	  // `String.prototype.{ trimLeft, trimStart }` methods
	  // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
	  start: createMethod$3(1),
	  // `String.prototype.{ trimRight, trimEnd }` methods
	  // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
	  end: createMethod$3(2),
	  // `String.prototype.trim` method
	  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
	  trim: createMethod$3(3)
	};

	var trim = stringTrim.trim;
	var $parseFloat = global_1.parseFloat;
	var FORCED$1 = 1 / $parseFloat(whitespaces + '-0') !== -Infinity; // `parseFloat` method
	// https://tc39.github.io/ecma262/#sec-parsefloat-string

	var numberParseFloat = FORCED$1 ? function parseFloat(string) {
	  var trimmedString = trim(String(string));
	  var result = $parseFloat(trimmedString);
	  return result === 0 && trimmedString.charAt(0) == '-' ? -0 : result;
	} : $parseFloat;

	// https://tc39.github.io/ecma262/#sec-parsefloat-string

	_export({
	  global: true,
	  forced: parseFloat != numberParseFloat
	}, {
	  parseFloat: numberParseFloat
	});

	var SPECIES$5 = wellKnownSymbol('species'); // `SpeciesConstructor` abstract operation
	// https://tc39.github.io/ecma262/#sec-speciesconstructor

	var speciesConstructor = function (O, defaultConstructor) {
	  var C = anObject(O).constructor;
	  var S;
	  return C === undefined || (S = anObject(C)[SPECIES$5]) == undefined ? defaultConstructor : aFunction$1(S);
	};

	var arrayPush = [].push;
	var min$3 = Math.min;
	var MAX_UINT32 = 0xFFFFFFFF; // babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError

	var SUPPORTS_Y = !fails(function () {
	  return !RegExp(MAX_UINT32, 'y');
	}); // @@split logic

	fixRegexpWellKnownSymbolLogic('split', 2, function (SPLIT, nativeSplit, maybeCallNative) {
	  var internalSplit;

	  if ('abbc'.split(/(b)*/)[1] == 'c' || 'test'.split(/(?:)/, -1).length != 4 || 'ab'.split(/(?:ab)*/).length != 2 || '.'.split(/(.?)(.?)/).length != 4 || '.'.split(/()()/).length > 1 || ''.split(/.?/).length) {
	    // based on es5-shim implementation, need to rework it
	    internalSplit = function (separator, limit) {
	      var string = String(requireObjectCoercible(this));
	      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      if (lim === 0) return [];
	      if (separator === undefined) return [string]; // If `separator` is not a regex, use native split

	      if (!isRegexp(separator)) {
	        return nativeSplit.call(string, separator, lim);
	      }

	      var output = [];
	      var flags = (separator.ignoreCase ? 'i' : '') + (separator.multiline ? 'm' : '') + (separator.unicode ? 'u' : '') + (separator.sticky ? 'y' : '');
	      var lastLastIndex = 0; // Make `global` and avoid `lastIndex` issues by working with a copy

	      var separatorCopy = new RegExp(separator.source, flags + 'g');
	      var match, lastIndex, lastLength;

	      while (match = regexpExec.call(separatorCopy, string)) {
	        lastIndex = separatorCopy.lastIndex;

	        if (lastIndex > lastLastIndex) {
	          output.push(string.slice(lastLastIndex, match.index));
	          if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
	          lastLength = match[0].length;
	          lastLastIndex = lastIndex;
	          if (output.length >= lim) break;
	        }

	        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
	      }

	      if (lastLastIndex === string.length) {
	        if (lastLength || !separatorCopy.test('')) output.push('');
	      } else output.push(string.slice(lastLastIndex));

	      return output.length > lim ? output.slice(0, lim) : output;
	    }; // Chakra, V8

	  } else if ('0'.split(undefined, 0).length) {
	    internalSplit = function (separator, limit) {
	      return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
	    };
	  } else internalSplit = nativeSplit;

	  return [// `String.prototype.split` method
	  // https://tc39.github.io/ecma262/#sec-string.prototype.split
	  function split(separator, limit) {
	    var O = requireObjectCoercible(this);
	    var splitter = separator == undefined ? undefined : separator[SPLIT];
	    return splitter !== undefined ? splitter.call(separator, O, limit) : internalSplit.call(String(O), separator, limit);
	  }, // `RegExp.prototype[@@split]` method
	  // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
	  //
	  // NOTE: This cannot be properly polyfilled in engines that don't support
	  // the 'y' flag.
	  function (regexp, limit) {
	    var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== nativeSplit);
	    if (res.done) return res.value;
	    var rx = anObject(regexp);
	    var S = String(this);
	    var C = speciesConstructor(rx, RegExp);
	    var unicodeMatching = rx.unicode;
	    var flags = (rx.ignoreCase ? 'i' : '') + (rx.multiline ? 'm' : '') + (rx.unicode ? 'u' : '') + (SUPPORTS_Y ? 'y' : 'g'); // ^(? + rx + ) is needed, in combination with some S slicing, to
	    // simulate the 'y' flag.

	    var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
	    var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
	    if (lim === 0) return [];
	    if (S.length === 0) return regexpExecAbstract(splitter, S) === null ? [S] : [];
	    var p = 0;
	    var q = 0;
	    var A = [];

	    while (q < S.length) {
	      splitter.lastIndex = SUPPORTS_Y ? q : 0;
	      var z = regexpExecAbstract(splitter, SUPPORTS_Y ? S : S.slice(q));
	      var e;

	      if (z === null || (e = min$3(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p) {
	        q = advanceStringIndex(S, q, unicodeMatching);
	      } else {
	        A.push(S.slice(p, q));
	        if (A.length === lim) return A;

	        for (var i = 1; i <= z.length - 1; i++) {
	          A.push(z[i]);
	          if (A.length === lim) return A;
	        }

	        q = p = e;
	      }
	    }

	    A.push(S.slice(p));
	    return A;
	  }];
	}, !SUPPORTS_Y);

	/**
	 * get the center by the city name
	 * @author kyle / http://nikai.us/
	 */
	var citycenter = {
	  municipalities: [{
	    n: "北京",
	    g: "116.395645,39.929986|12"
	  }, {
	    n: "上海",
	    g: "121.487899,31.249162|12"
	  }, {
	    n: "天津",
	    g: "117.210813,39.14393|12"
	  }, {
	    n: "重庆",
	    g: "106.530635,29.544606|12"
	  }],
	  provinces: [{
	    n: "安徽",
	    g: "117.216005,31.859252|8",
	    cities: [{
	      n: "合肥",
	      g: "117.282699,31.866942|12"
	    }, {
	      n: "安庆",
	      g: "117.058739,30.537898|13"
	    }, {
	      n: "蚌埠",
	      g: "117.35708,32.929499|13"
	    }, {
	      n: "亳州",
	      g: "115.787928,33.871211|13"
	    }, {
	      n: "巢湖",
	      g: "117.88049,31.608733|13"
	    }, {
	      n: "池州",
	      g: "117.494477,30.660019|14"
	    }, {
	      n: "滁州",
	      g: "118.32457,32.317351|13"
	    }, {
	      n: "阜阳",
	      g: "115.820932,32.901211|13"
	    }, {
	      n: "淮北",
	      g: "116.791447,33.960023|13"
	    }, {
	      n: "淮南",
	      g: "117.018639,32.642812|13"
	    }, {
	      n: "黄山",
	      g: "118.29357,29.734435|13"
	    }, {
	      n: "六安",
	      g: "116.505253,31.755558|13"
	    }, {
	      n: "马鞍山",
	      g: "118.515882,31.688528|13"
	    }, {
	      n: "宿州",
	      g: "116.988692,33.636772|13"
	    }, {
	      n: "铜陵",
	      g: "117.819429,30.94093|14"
	    }, {
	      n: "芜湖",
	      g: "118.384108,31.36602|12"
	    }, {
	      n: "宣城",
	      g: "118.752096,30.951642|13"
	    }]
	  }, {
	    n: "福建",
	    g: "117.984943,26.050118|8",
	    cities: [{
	      n: "福州",
	      g: "119.330221,26.047125|12"
	    }, {
	      n: "龙岩",
	      g: "117.017997,25.078685|13"
	    }, {
	      n: "南平",
	      g: "118.181883,26.643626|13"
	    }, {
	      n: "宁德",
	      g: "119.542082,26.656527|14"
	    }, {
	      n: "莆田",
	      g: "119.077731,25.44845|13"
	    }, {
	      n: "泉州",
	      g: "118.600362,24.901652|12"
	    }, {
	      n: "三明",
	      g: "117.642194,26.270835|14"
	    }, {
	      n: "厦门",
	      g: "118.103886,24.489231|12"
	    }, {
	      n: "漳州",
	      g: "117.676205,24.517065|12"
	    }]
	  }, {
	    n: "甘肃",
	    g: "102.457625,38.103267|6",
	    cities: [{
	      n: "兰州",
	      g: "103.823305,36.064226|12"
	    }, {
	      n: "白银",
	      g: "104.171241,36.546682|13"
	    }, {
	      n: "定西",
	      g: "104.626638,35.586056|13"
	    }, {
	      n: "甘南州",
	      g: "102.917442,34.992211|14"
	    }, {
	      n: "嘉峪关",
	      g: "98.281635,39.802397|13"
	    }, {
	      n: "金昌",
	      g: "102.208126,38.516072|13"
	    }, {
	      n: "酒泉",
	      g: "98.508415,39.741474|13"
	    }, {
	      n: "临夏州",
	      g: "103.215249,35.598514|13"
	    }, {
	      n: "陇南",
	      g: "104.934573,33.39448|14"
	    }, {
	      n: "平凉",
	      g: "106.688911,35.55011|13"
	    }, {
	      n: "庆阳",
	      g: "107.644227,35.726801|13"
	    }, {
	      n: "天水",
	      g: "105.736932,34.584319|13"
	    }, {
	      n: "武威",
	      g: "102.640147,37.933172|13"
	    }, {
	      n: "张掖",
	      g: "100.459892,38.93932|13"
	    }]
	  }, {
	    n: "广东",
	    g: "113.394818,23.408004|8",
	    cities: [{
	      n: "广州",
	      g: "113.30765,23.120049|12"
	    }, {
	      n: "潮州",
	      g: "116.630076,23.661812|13"
	    }, {
	      n: "东莞",
	      g: "113.763434,23.043024|12"
	    }, {
	      n: "佛山",
	      g: "113.134026,23.035095|13"
	    }, {
	      n: "河源",
	      g: "114.713721,23.757251|12"
	    }, {
	      n: "惠州",
	      g: "114.410658,23.11354|12"
	    }, {
	      n: "江门",
	      g: "113.078125,22.575117|13"
	    }, {
	      n: "揭阳",
	      g: "116.379501,23.547999|13"
	    }, {
	      n: "茂名",
	      g: "110.931245,21.668226|13"
	    }, {
	      n: "梅州",
	      g: "116.126403,24.304571|13"
	    }, {
	      n: "清远",
	      g: "113.040773,23.698469|13"
	    }, {
	      n: "汕头",
	      g: "116.72865,23.383908|13"
	    }, {
	      n: "汕尾",
	      g: "115.372924,22.778731|14"
	    }, {
	      n: "韶关",
	      g: "113.594461,24.80296|13"
	    }, {
	      n: "深圳",
	      g: "114.025974,22.546054|12"
	    }, {
	      n: "阳江",
	      g: "111.97701,21.871517|14"
	    }, {
	      n: "云浮",
	      g: "112.050946,22.937976|13"
	    }, {
	      n: "湛江",
	      g: "110.365067,21.257463|13"
	    }, {
	      n: "肇庆",
	      g: "112.479653,23.078663|13"
	    }, {
	      n: "中山",
	      g: "113.42206,22.545178|12"
	    }, {
	      n: "珠海",
	      g: "113.562447,22.256915|13"
	    }]
	  }, {
	    n: "广西",
	    g: "108.924274,23.552255|7",
	    cities: [{
	      n: "南宁",
	      g: "108.297234,22.806493|12"
	    }, {
	      n: "百色",
	      g: "106.631821,23.901512|13"
	    }, {
	      n: "北海",
	      g: "109.122628,21.472718|13"
	    }, {
	      n: "崇左",
	      g: "107.357322,22.415455|14"
	    }, {
	      n: "防城港",
	      g: "108.351791,21.617398|15"
	    }, {
	      n: "桂林",
	      g: "110.26092,25.262901|12"
	    }, {
	      n: "贵港",
	      g: "109.613708,23.103373|13"
	    }, {
	      n: "河池",
	      g: "108.069948,24.699521|14"
	    }, {
	      n: "贺州",
	      g: "111.552594,24.411054|14"
	    }, {
	      n: "来宾",
	      g: "109.231817,23.741166|14"
	    }, {
	      n: "柳州",
	      g: "109.422402,24.329053|12"
	    }, {
	      n: "钦州",
	      g: "108.638798,21.97335|13"
	    }, {
	      n: "梧州",
	      g: "111.305472,23.485395|13"
	    }, {
	      n: "玉林",
	      g: "110.151676,22.643974|14"
	    }]
	  }, {
	    n: "贵州",
	    g: "106.734996,26.902826|8",
	    cities: [{
	      n: "贵阳",
	      g: "106.709177,26.629907|12"
	    }, {
	      n: "安顺",
	      g: "105.92827,26.228595|13"
	    }, {
	      n: "毕节地区",
	      g: "105.300492,27.302612|14"
	    }, {
	      n: "六盘水",
	      g: "104.852087,26.591866|13"
	    }, {
	      n: "铜仁地区",
	      g: "109.196161,27.726271|14"
	    }, {
	      n: "遵义",
	      g: "106.93126,27.699961|13"
	    }, {
	      n: "黔西南州",
	      g: "104.900558,25.095148|11"
	    }, {
	      n: "黔东南州",
	      g: "107.985353,26.583992|11"
	    }, {
	      n: "黔南州",
	      g: "107.523205,26.264536|11"
	    }]
	  }, {
	    n: "海南",
	    g: "109.733755,19.180501|9",
	    cities: [{
	      n: "海口",
	      g: "110.330802,20.022071|13"
	    }, {
	      n: "白沙",
	      g: "109.358586,19.216056|12"
	    }, {
	      n: "保亭",
	      g: "109.656113,18.597592|12"
	    }, {
	      n: "昌江",
	      g: "109.0113,19.222483|12"
	    }, {
	      n: "儋州",
	      g: "109.413973,19.571153|13"
	    }, {
	      n: "澄迈",
	      g: "109.996736,19.693135|13"
	    }, {
	      n: "东方",
	      g: "108.85101,18.998161|13"
	    }, {
	      n: "定安",
	      g: "110.32009,19.490991|13"
	    }, {
	      n: "琼海",
	      g: "110.414359,19.21483|13"
	    }, {
	      n: "琼中",
	      g: "109.861849,19.039771|12"
	    }, {
	      n: "乐东",
	      g: "109.062698,18.658614|12"
	    }, {
	      n: "临高",
	      g: "109.724101,19.805922|13"
	    }, {
	      n: "陵水",
	      g: "109.948661,18.575985|12"
	    }, {
	      n: "三亚",
	      g: "109.522771,18.257776|12"
	    }, {
	      n: "屯昌",
	      g: "110.063364,19.347749|13"
	    }, {
	      n: "万宁",
	      g: "110.292505,18.839886|13"
	    }, {
	      n: "文昌",
	      g: "110.780909,19.750947|13"
	    }, {
	      n: "五指山",
	      g: "109.51775,18.831306|13"
	    }]
	  }, {
	    n: "河北",
	    g: "115.661434,38.61384|7",
	    cities: [{
	      n: "石家庄",
	      g: "114.522082,38.048958|12"
	    }, {
	      n: "保定",
	      g: "115.49481,38.886565|13"
	    }, {
	      n: "沧州",
	      g: "116.863806,38.297615|13"
	    }, {
	      n: "承德",
	      g: "117.933822,40.992521|14"
	    }, {
	      n: "邯郸",
	      g: "114.482694,36.609308|13"
	    }, {
	      n: "衡水",
	      g: "115.686229,37.746929|13"
	    }, {
	      n: "廊坊",
	      g: "116.703602,39.518611|13"
	    }, {
	      n: "秦皇岛",
	      g: "119.604368,39.945462|12"
	    }, {
	      n: "唐山",
	      g: "118.183451,39.650531|13"
	    }, {
	      n: "邢台",
	      g: "114.520487,37.069531|13"
	    }, {
	      n: "张家口",
	      g: "114.893782,40.811188|13"
	    }]
	  }, {
	    n: "河南",
	    g: "113.486804,34.157184|7",
	    cities: [{
	      n: "郑州",
	      g: "113.649644,34.75661|12"
	    }, {
	      n: "安阳",
	      g: "114.351807,36.110267|12"
	    }, {
	      n: "鹤壁",
	      g: "114.29777,35.755426|13"
	    }, {
	      n: "焦作",
	      g: "113.211836,35.234608|13"
	    }, {
	      n: "开封",
	      g: "114.351642,34.801854|13"
	    }, {
	      n: "洛阳",
	      g: "112.447525,34.657368|12"
	    }, {
	      n: "漯河",
	      g: "114.046061,33.576279|13"
	    }, {
	      n: "南阳",
	      g: "112.542842,33.01142|13"
	    }, {
	      n: "平顶山",
	      g: "113.300849,33.745301|13"
	    }, {
	      n: "濮阳",
	      g: "115.026627,35.753298|12"
	    }, {
	      n: "三门峡",
	      g: "111.181262,34.78332|13"
	    }, {
	      n: "商丘",
	      g: "115.641886,34.438589|13"
	    }, {
	      n: "新乡",
	      g: "113.91269,35.307258|13"
	    }, {
	      n: "信阳",
	      g: "114.085491,32.128582|13"
	    }, {
	      n: "许昌",
	      g: "113.835312,34.02674|13"
	    }, {
	      n: "周口",
	      g: "114.654102,33.623741|13"
	    }, {
	      n: "驻马店",
	      g: "114.049154,32.983158|13"
	    }]
	  }, {
	    n: "黑龙江",
	    g: "128.047414,47.356592|6",
	    cities: [{
	      n: "哈尔滨",
	      g: "126.657717,45.773225|12"
	    }, {
	      n: "大庆",
	      g: "125.02184,46.596709|12"
	    }, {
	      n: "大兴安岭地区",
	      g: "124.196104,51.991789|10"
	    }, {
	      n: "鹤岗",
	      g: "130.292472,47.338666|13"
	    }, {
	      n: "黑河",
	      g: "127.50083,50.25069|14"
	    }, {
	      n: "鸡西",
	      g: "130.941767,45.32154|13"
	    }, {
	      n: "佳木斯",
	      g: "130.284735,46.81378|12"
	    }, {
	      n: "牡丹江",
	      g: "129.608035,44.588521|13"
	    }, {
	      n: "七台河",
	      g: "131.019048,45.775005|14"
	    }, {
	      n: "齐齐哈尔",
	      g: "123.987289,47.3477|13"
	    }, {
	      n: "双鸭山",
	      g: "131.171402,46.655102|13"
	    }, {
	      n: "绥化",
	      g: "126.989095,46.646064|13"
	    }, {
	      n: "伊春",
	      g: "128.910766,47.734685|14"
	    }]
	  }, {
	    n: "湖北",
	    g: "112.410562,31.209316|8",
	    cities: [{
	      n: "武汉",
	      g: "114.3162,30.581084|12"
	    }, {
	      n: "鄂州",
	      g: "114.895594,30.384439|14"
	    }, {
	      n: "恩施",
	      g: "109.517433,30.308978|14"
	    }, {
	      n: "黄冈",
	      g: "114.906618,30.446109|14"
	    }, {
	      n: "黄石",
	      g: "115.050683,30.216127|13"
	    }, {
	      n: "荆门",
	      g: "112.21733,31.042611|13"
	    }, {
	      n: "荆州",
	      g: "112.241866,30.332591|12"
	    }, {
	      n: "潜江",
	      g: "112.768768,30.343116|13"
	    }, {
	      n: "神农架林区",
	      g: "110.487231,31.595768|13"
	    }, {
	      n: "十堰",
	      g: "110.801229,32.636994|13"
	    }, {
	      n: "随州",
	      g: "113.379358,31.717858|13"
	    }, {
	      n: "天门",
	      g: "113.12623,30.649047|13"
	    }, {
	      n: "仙桃",
	      g: "113.387448,30.293966|13"
	    }, {
	      n: "咸宁",
	      g: "114.300061,29.880657|13"
	    }, {
	      n: "襄阳",
	      g: "112.176326,32.094934|12"
	    }, {
	      n: "孝感",
	      g: "113.935734,30.927955|13"
	    }, {
	      n: "宜昌",
	      g: "111.310981,30.732758|13"
	    }]
	  }, {
	    n: "湖南",
	    g: "111.720664,27.695864|7",
	    cities: [{
	      n: "长沙",
	      g: "112.979353,28.213478|12"
	    }, {
	      n: "常德",
	      g: "111.653718,29.012149|12"
	    }, {
	      n: "郴州",
	      g: "113.037704,25.782264|13"
	    }, {
	      n: "衡阳",
	      g: "112.583819,26.898164|13"
	    }, {
	      n: "怀化",
	      g: "109.986959,27.557483|13"
	    }, {
	      n: "娄底",
	      g: "111.996396,27.741073|13"
	    }, {
	      n: "邵阳",
	      g: "111.461525,27.236811|13"
	    }, {
	      n: "湘潭",
	      g: "112.935556,27.835095|13"
	    }, {
	      n: "湘西州",
	      g: "109.745746,28.317951|14"
	    }, {
	      n: "益阳",
	      g: "112.366547,28.588088|13"
	    }, {
	      n: "永州",
	      g: "111.614648,26.435972|13"
	    }, {
	      n: "岳阳",
	      g: "113.146196,29.378007|13"
	    }, {
	      n: "张家界",
	      g: "110.48162,29.124889|13"
	    }, {
	      n: "株洲",
	      g: "113.131695,27.827433|13"
	    }]
	  }, {
	    n: "江苏",
	    g: "119.368489,33.013797|8",
	    cities: [{
	      n: "南京",
	      g: "118.778074,32.057236|12"
	    }, {
	      n: "常州",
	      g: "119.981861,31.771397|12"
	    }, {
	      n: "淮安",
	      g: "119.030186,33.606513|12"
	    }, {
	      n: "连云港",
	      g: "119.173872,34.601549|12"
	    }, {
	      n: "南通",
	      g: "120.873801,32.014665|12"
	    }, {
	      n: "苏州",
	      g: "120.619907,31.317987|12"
	    }, {
	      n: "宿迁",
	      g: "118.296893,33.95205|13"
	    }, {
	      n: "泰州",
	      g: "119.919606,32.476053|13"
	    }, {
	      n: "无锡",
	      g: "120.305456,31.570037|12"
	    }, {
	      n: "徐州",
	      g: "117.188107,34.271553|12"
	    }, {
	      n: "盐城",
	      g: "120.148872,33.379862|12"
	    }, {
	      n: "扬州",
	      g: "119.427778,32.408505|13"
	    }, {
	      n: "镇江",
	      g: "119.455835,32.204409|13"
	    }]
	  }, {
	    n: "江西",
	    g: "115.676082,27.757258|7",
	    cities: [{
	      n: "南昌",
	      g: "115.893528,28.689578|12"
	    }, {
	      n: "抚州",
	      g: "116.360919,27.954545|13"
	    }, {
	      n: "赣州",
	      g: "114.935909,25.845296|13"
	    }, {
	      n: "吉安",
	      g: "114.992039,27.113848|13"
	    }, {
	      n: "景德镇",
	      g: "117.186523,29.303563|12"
	    }, {
	      n: "九江",
	      g: "115.999848,29.71964|13"
	    }, {
	      n: "萍乡",
	      g: "113.859917,27.639544|13"
	    }, {
	      n: "上饶",
	      g: "117.955464,28.457623|13"
	    }, {
	      n: "新余",
	      g: "114.947117,27.822322|13"
	    }, {
	      n: "宜春",
	      g: "114.400039,27.81113|13"
	    }, {
	      n: "鹰潭",
	      g: "117.03545,28.24131|13"
	    }]
	  }, {
	    n: "吉林",
	    g: "126.262876,43.678846|7",
	    cities: [{
	      n: "长春",
	      g: "125.313642,43.898338|12"
	    }, {
	      n: "白城",
	      g: "122.840777,45.621086|13"
	    }, {
	      n: "白山",
	      g: "126.435798,41.945859|13"
	    }, {
	      n: "吉林",
	      g: "126.564544,43.871988|12"
	    }, {
	      n: "辽源",
	      g: "125.133686,42.923303|13"
	    }, {
	      n: "四平",
	      g: "124.391382,43.175525|12"
	    }, {
	      n: "松原",
	      g: "124.832995,45.136049|13"
	    }, {
	      n: "通化",
	      g: "125.94265,41.736397|13"
	    }, {
	      n: "延边",
	      g: "129.485902,42.896414|13"
	    }]
	  }, {
	    n: "辽宁",
	    g: "122.753592,41.6216|8",
	    cities: [{
	      n: "沈阳",
	      g: "123.432791,41.808645|12"
	    }, {
	      n: "鞍山",
	      g: "123.007763,41.118744|13"
	    }, {
	      n: "本溪",
	      g: "123.778062,41.325838|12"
	    }, {
	      n: "朝阳",
	      g: "120.446163,41.571828|13"
	    }, {
	      n: "大连",
	      g: "121.593478,38.94871|12"
	    }, {
	      n: "丹东",
	      g: "124.338543,40.129023|12"
	    }, {
	      n: "抚顺",
	      g: "123.92982,41.877304|12"
	    }, {
	      n: "阜新",
	      g: "121.660822,42.01925|14"
	    }, {
	      n: "葫芦岛",
	      g: "120.860758,40.74303|13"
	    }, {
	      n: "锦州",
	      g: "121.147749,41.130879|13"
	    }, {
	      n: "辽阳",
	      g: "123.172451,41.273339|14"
	    }, {
	      n: "盘锦",
	      g: "122.073228,41.141248|13"
	    }, {
	      n: "铁岭",
	      g: "123.85485,42.299757|13"
	    }, {
	      n: "营口",
	      g: "122.233391,40.668651|13"
	    }]
	  }, {
	    n: "内蒙古",
	    g: "114.415868,43.468238|5",
	    cities: [{
	      n: "呼和浩特",
	      g: "111.660351,40.828319|12"
	    }, {
	      n: "阿拉善盟",
	      g: "105.695683,38.843075|14"
	    }, {
	      n: "包头",
	      g: "109.846239,40.647119|12"
	    }, {
	      n: "巴彦淖尔",
	      g: "107.423807,40.76918|12"
	    }, {
	      n: "赤峰",
	      g: "118.930761,42.297112|12"
	    }, {
	      n: "鄂尔多斯",
	      g: "109.993706,39.81649|12"
	    }, {
	      n: "呼伦贝尔",
	      g: "119.760822,49.201636|12"
	    }, {
	      n: "通辽",
	      g: "122.260363,43.633756|12"
	    }, {
	      n: "乌海",
	      g: "106.831999,39.683177|13"
	    }, {
	      n: "乌兰察布",
	      g: "113.112846,41.022363|12"
	    }, {
	      n: "锡林郭勒盟",
	      g: "116.02734,43.939705|11"
	    }, {
	      n: "兴安盟",
	      g: "122.048167,46.083757|11"
	    }]
	  }, {
	    n: "宁夏",
	    g: "106.155481,37.321323|8",
	    cities: [{
	      n: "银川",
	      g: "106.206479,38.502621|12"
	    }, {
	      n: "固原",
	      g: "106.285268,36.021523|13"
	    }, {
	      n: "石嘴山",
	      g: "106.379337,39.020223|13"
	    }, {
	      n: "吴忠",
	      g: "106.208254,37.993561|14"
	    }, {
	      n: "中卫",
	      g: "105.196754,37.521124|14"
	    }]
	  }, {
	    n: "青海",
	    g: "96.202544,35.499761|7",
	    cities: [{
	      n: "西宁",
	      g: "101.767921,36.640739|12"
	    }, {
	      n: "果洛州",
	      g: "100.223723,34.480485|11"
	    }, {
	      n: "海东地区",
	      g: "102.085207,36.51761|11"
	    }, {
	      n: "海北州",
	      g: "100.879802,36.960654|11"
	    }, {
	      n: "海南州",
	      g: "100.624066,36.284364|11"
	    }, {
	      n: "海西州",
	      g: "97.342625,37.373799|11"
	    }, {
	      n: "黄南州",
	      g: "102.0076,35.522852|11"
	    }, {
	      n: "玉树州",
	      g: "97.013316,33.00624|14"
	    }]
	  }, {
	    n: "山东",
	    g: "118.527663,36.09929|8",
	    cities: [{
	      n: "济南",
	      g: "117.024967,36.682785|12"
	    }, {
	      n: "滨州",
	      g: "117.968292,37.405314|12"
	    }, {
	      n: "东营",
	      g: "118.583926,37.487121|12"
	    }, {
	      n: "德州",
	      g: "116.328161,37.460826|12"
	    }, {
	      n: "菏泽",
	      g: "115.46336,35.26244|13"
	    }, {
	      n: "济宁",
	      g: "116.600798,35.402122|13"
	    }, {
	      n: "莱芜",
	      g: "117.684667,36.233654|13"
	    }, {
	      n: "聊城",
	      g: "115.986869,36.455829|12"
	    }, {
	      n: "临沂",
	      g: "118.340768,35.072409|12"
	    }, {
	      n: "青岛",
	      g: "120.384428,36.105215|12"
	    }, {
	      n: "日照",
	      g: "119.50718,35.420225|12"
	    }, {
	      n: "泰安",
	      g: "117.089415,36.188078|13"
	    }, {
	      n: "威海",
	      g: "122.093958,37.528787|13"
	    }, {
	      n: "潍坊",
	      g: "119.142634,36.716115|12"
	    }, {
	      n: "烟台",
	      g: "121.309555,37.536562|12"
	    }, {
	      n: "枣庄",
	      g: "117.279305,34.807883|13"
	    }, {
	      n: "淄博",
	      g: "118.059134,36.804685|12"
	    }]
	  }, {
	    n: "山西",
	    g: "112.515496,37.866566|7",
	    cities: [{
	      n: "太原",
	      g: "112.550864,37.890277|12"
	    }, {
	      n: "长治",
	      g: "113.120292,36.201664|12"
	    }, {
	      n: "大同",
	      g: "113.290509,40.113744|12"
	    }, {
	      n: "晋城",
	      g: "112.867333,35.499834|13"
	    }, {
	      n: "晋中",
	      g: "112.738514,37.693362|13"
	    }, {
	      n: "临汾",
	      g: "111.538788,36.099745|13"
	    }, {
	      n: "吕梁",
	      g: "111.143157,37.527316|14"
	    }, {
	      n: "朔州",
	      g: "112.479928,39.337672|13"
	    }, {
	      n: "忻州",
	      g: "112.727939,38.461031|12"
	    }, {
	      n: "阳泉",
	      g: "113.569238,37.869529|13"
	    }, {
	      n: "运城",
	      g: "111.006854,35.038859|13"
	    }]
	  }, {
	    n: "陕西",
	    g: "109.503789,35.860026|7",
	    cities: [{
	      n: "西安",
	      g: "108.953098,34.2778|12"
	    }, {
	      n: "安康",
	      g: "109.038045,32.70437|13"
	    }, {
	      n: "宝鸡",
	      g: "107.170645,34.364081|12"
	    }, {
	      n: "汉中",
	      g: "107.045478,33.081569|13"
	    }, {
	      n: "商洛",
	      g: "109.934208,33.873907|13"
	    }, {
	      n: "铜川",
	      g: "108.968067,34.908368|13"
	    }, {
	      n: "渭南",
	      g: "109.483933,34.502358|13"
	    }, {
	      n: "咸阳",
	      g: "108.707509,34.345373|13"
	    }, {
	      n: "延安",
	      g: "109.50051,36.60332|13"
	    }, {
	      n: "榆林",
	      g: "109.745926,38.279439|12"
	    }]
	  }, {
	    n: "四川",
	    g: "102.89916,30.367481|7",
	    cities: [{
	      n: "成都",
	      g: "104.067923,30.679943|12"
	    }, {
	      n: "阿坝州",
	      g: "102.228565,31.905763|15"
	    }, {
	      n: "巴中",
	      g: "106.757916,31.869189|14"
	    }, {
	      n: "达州",
	      g: "107.494973,31.214199|14"
	    }, {
	      n: "德阳",
	      g: "104.402398,31.13114|13"
	    }, {
	      n: "甘孜州",
	      g: "101.969232,30.055144|15"
	    }, {
	      n: "广安",
	      g: "106.63572,30.463984|13"
	    }, {
	      n: "广元",
	      g: "105.819687,32.44104|13"
	    }, {
	      n: "乐山",
	      g: "103.760824,29.600958|13"
	    }, {
	      n: "凉山州",
	      g: "102.259591,27.892393|14"
	    }, {
	      n: "泸州",
	      g: "105.44397,28.89593|14"
	    }, {
	      n: "南充",
	      g: "106.105554,30.800965|13"
	    }, {
	      n: "眉山",
	      g: "103.84143,30.061115|13"
	    }, {
	      n: "绵阳",
	      g: "104.705519,31.504701|12"
	    }, {
	      n: "内江",
	      g: "105.073056,29.599462|13"
	    }, {
	      n: "攀枝花",
	      g: "101.722423,26.587571|14"
	    }, {
	      n: "遂宁",
	      g: "105.564888,30.557491|12"
	    }, {
	      n: "雅安",
	      g: "103.009356,29.999716|13"
	    }, {
	      n: "宜宾",
	      g: "104.633019,28.769675|13"
	    }, {
	      n: "资阳",
	      g: "104.63593,30.132191|13"
	    }, {
	      n: "自贡",
	      g: "104.776071,29.359157|13"
	    }]
	  }, {
	    n: "西藏",
	    g: "89.137982,31.367315|6",
	    cities: [{
	      n: "拉萨",
	      g: "91.111891,29.662557|13"
	    }, {
	      n: "阿里地区",
	      g: "81.107669,30.404557|11"
	    }, {
	      n: "昌都地区",
	      g: "97.185582,31.140576|15"
	    }, {
	      n: "林芝地区",
	      g: "94.349985,29.666941|11"
	    }, {
	      n: "那曲地区",
	      g: "92.067018,31.48068|14"
	    }, {
	      n: "日喀则地区",
	      g: "88.891486,29.269023|14"
	    }, {
	      n: "山南地区",
	      g: "91.750644,29.229027|11"
	    }]
	  }, {
	    n: "新疆",
	    g: "85.614899,42.127001|6",
	    cities: [{
	      n: "乌鲁木齐",
	      g: "87.564988,43.84038|12"
	    }, {
	      n: "阿拉尔",
	      g: "81.291737,40.61568|13"
	    }, {
	      n: "阿克苏地区",
	      g: "80.269846,41.171731|12"
	    }, {
	      n: "阿勒泰地区",
	      g: "88.137915,47.839744|13"
	    }, {
	      n: "巴音郭楞",
	      g: "86.121688,41.771362|12"
	    }, {
	      n: "博尔塔拉州",
	      g: "82.052436,44.913651|11"
	    }, {
	      n: "昌吉州",
	      g: "87.296038,44.007058|13"
	    }, {
	      n: "哈密地区",
	      g: "93.528355,42.858596|13"
	    }, {
	      n: "和田地区",
	      g: "79.930239,37.116774|13"
	    }, {
	      n: "喀什地区",
	      g: "75.992973,39.470627|12"
	    }, {
	      n: "克拉玛依",
	      g: "84.88118,45.594331|13"
	    }, {
	      n: "克孜勒苏州",
	      g: "76.137564,39.750346|11"
	    }, {
	      n: "石河子",
	      g: "86.041865,44.308259|13"
	    }, {
	      n: "塔城地区",
	      g: "82.974881,46.758684|12"
	    }, {
	      n: "图木舒克",
	      g: "79.198155,39.889223|13"
	    }, {
	      n: "吐鲁番地区",
	      g: "89.181595,42.96047|13"
	    }, {
	      n: "五家渠",
	      g: "87.565449,44.368899|13"
	    }, {
	      n: "伊犁州",
	      g: "81.297854,43.922248|11"
	    }]
	  }, {
	    n: "云南",
	    g: "101.592952,24.864213|7",
	    cities: [{
	      n: "昆明",
	      g: "102.714601,25.049153|12"
	    }, {
	      n: "保山",
	      g: "99.177996,25.120489|13"
	    }, {
	      n: "楚雄州",
	      g: "101.529382,25.066356|13"
	    }, {
	      n: "大理州",
	      g: "100.223675,25.5969|14"
	    }, {
	      n: "德宏州",
	      g: "98.589434,24.44124|14"
	    }, {
	      n: "迪庆州",
	      g: "99.713682,27.831029|14"
	    }, {
	      n: "红河州",
	      g: "103.384065,23.367718|11"
	    }, {
	      n: "丽江",
	      g: "100.229628,26.875351|13"
	    }, {
	      n: "临沧",
	      g: "100.092613,23.887806|14"
	    }, {
	      n: "怒江州",
	      g: "98.859932,25.860677|14"
	    }, {
	      n: "普洱",
	      g: "100.980058,22.788778|14"
	    }, {
	      n: "曲靖",
	      g: "103.782539,25.520758|12"
	    }, {
	      n: "昭通",
	      g: "103.725021,27.340633|13"
	    }, {
	      n: "文山",
	      g: "104.089112,23.401781|14"
	    }, {
	      n: "西双版纳",
	      g: "100.803038,22.009433|13"
	    }, {
	      n: "玉溪",
	      g: "102.545068,24.370447|13"
	    }]
	  }, {
	    n: "浙江",
	    g: "119.957202,29.159494|8",
	    cities: [{
	      n: "杭州",
	      g: "120.219375,30.259244|12"
	    }, {
	      n: "湖州",
	      g: "120.137243,30.877925|12"
	    }, {
	      n: "嘉兴",
	      g: "120.760428,30.773992|13"
	    }, {
	      n: "金华",
	      g: "119.652576,29.102899|12"
	    }, {
	      n: "丽水",
	      g: "119.929576,28.4563|13"
	    }, {
	      n: "宁波",
	      g: "121.579006,29.885259|12"
	    }, {
	      n: "衢州",
	      g: "118.875842,28.95691|12"
	    }, {
	      n: "绍兴",
	      g: "120.592467,30.002365|13"
	    }, {
	      n: "台州",
	      g: "121.440613,28.668283|13"
	    }, {
	      n: "温州",
	      g: "120.690635,28.002838|12"
	    }, {
	      n: "舟山",
	      g: "122.169872,30.03601|13"
	    }]
	  }],
	  other: [{
	    n: "香港",
	    g: "114.186124,22.293586|11"
	  }, {
	    n: "澳门",
	    g: "113.557519,22.204118|13"
	  }, {
	    n: "台湾",
	    g: "120.961454,23.80406|8"
	  }]
	};

	function getCenter(g) {
	  var item = g.split("|");
	  item[0] = item[0].split(",");
	  return {
	    lng: parseFloat(item[0][0]),
	    lat: parseFloat(item[0][1])
	  };
	}

	var cityCenter = {
	  getProvinceNameByCityName: function getProvinceNameByCityName(name) {
	    var provinces = citycenter.provinces;

	    for (var i = 0; i < provinces.length; i++) {
	      var provinceName = provinces[i].n;
	      var cities = provinces[i].cities;

	      for (var j = 0; j < cities.length; j++) {
	        if (cities[j].n == name) {
	          return provinceName;
	        }
	      }
	    }

	    return null;
	  },
	  getCenterByCityName: function getCenterByCityName(name) {
	    name = name.replace('市', '');

	    for (var i = 0; i < citycenter.municipalities.length; i++) {
	      if (citycenter.municipalities[i].n == name) {
	        return getCenter(citycenter.municipalities[i].g);
	      }
	    }

	    for (var _i = 0; _i < citycenter.other.length; _i++) {
	      if (citycenter.other[_i].n == name) {
	        return getCenter(citycenter.other[_i].g);
	      }
	    }

	    var provinces = citycenter.provinces;

	    for (var _i2 = 0; _i2 < provinces.length; _i2++) {
	      if (provinces[_i2].n == name) {
	        return getCenter(provinces[_i2].g);
	      }

	      var cities = provinces[_i2].cities;

	      for (var j = 0; j < cities.length; j++) {
	        if (cities[j].n == name) {
	          return getCenter(cities[j].g);
	        }
	      }
	    }

	    return null;
	  }
	};

	var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
	var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded'; // We can't use this feature detection in V8 since it causes
	// deoptimization and serious performance degradation
	// https://github.com/zloirock/core-js/issues/679

	var IS_CONCAT_SPREADABLE_SUPPORT = engineV8Version >= 51 || !fails(function () {
	  var array = [];
	  array[IS_CONCAT_SPREADABLE] = false;
	  return array.concat()[0] !== array;
	});
	var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

	var isConcatSpreadable = function (O) {
	  if (!isObject(O)) return false;
	  var spreadable = O[IS_CONCAT_SPREADABLE];
	  return spreadable !== undefined ? !!spreadable : isArray(O);
	};

	var FORCED$2 = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT; // `Array.prototype.concat` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.concat
	// with adding support of @@isConcatSpreadable and @@species

	_export({
	  target: 'Array',
	  proto: true,
	  forced: FORCED$2
	}, {
	  concat: function concat(arg) {
	    // eslint-disable-line no-unused-vars
	    var O = toObject(this);
	    var A = arraySpeciesCreate(O, 0);
	    var n = 0;
	    var i, k, length, len, E;

	    for (i = -1, length = arguments.length; i < length; i++) {
	      E = i === -1 ? O : arguments[i];

	      if (isConcatSpreadable(E)) {
	        len = toLength(E.length);
	        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);

	        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
	      } else {
	        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        createProperty(A, n++, E);
	      }
	    }

	    A.length = n;
	    return A;
	  }
	});

	var $map = arrayIteration.map;
	var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport('map'); // FF49- issue

	var USES_TO_LENGTH$2 = arrayMethodUsesToLength('map'); // `Array.prototype.map` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.map
	// with adding support of @@species

	_export({
	  target: 'Array',
	  proto: true,
	  forced: !HAS_SPECIES_SUPPORT$1 || !USES_TO_LENGTH$2
	}, {
	  map: function map(callbackfn
	  /* , thisArg */
	  ) {
	    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// https://tc39.github.io/ecma262/#sec-object.keys

	var objectKeys = Object.keys || function keys(O) {
	  return objectKeysInternal(O, enumBugKeys);
	};

	// https://tc39.github.io/ecma262/#sec-object.defineproperties

	var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = objectKeys(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;

	  while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);

	  return O;
	};

	var html = getBuiltIn('document', 'documentElement');

	var GT = '>';
	var LT = '<';
	var PROTOTYPE = 'prototype';
	var SCRIPT = 'script';
	var IE_PROTO = sharedKey('IE_PROTO');

	var EmptyConstructor = function () {
	  /* empty */
	};

	var scriptTag = function (content) {
	  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
	}; // Create object with fake `null` prototype: use ActiveX Object with cleared prototype


	var NullProtoObjectViaActiveX = function (activeXDocument) {
	  activeXDocument.write(scriptTag(''));
	  activeXDocument.close();
	  var temp = activeXDocument.parentWindow.Object;
	  activeXDocument = null; // avoid memory leak

	  return temp;
	}; // Create object with fake `null` prototype: use iframe Object with cleared prototype


	var NullProtoObjectViaIFrame = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = documentCreateElement('iframe');
	  var JS = 'java' + SCRIPT + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe); // https://github.com/zloirock/core-js/issues/475

	  iframe.src = String(JS);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(scriptTag('document.F=Object'));
	  iframeDocument.close();
	  return iframeDocument.F;
	}; // Check for document.domain and active x support
	// No need to use active x approach when document.domain is not set
	// see https://github.com/es-shims/es5-shim/issues/150
	// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
	// avoid IE GC bug


	var activeXDocument;

	var NullProtoObject = function () {
	  try {
	    /* global ActiveXObject */
	    activeXDocument = document.domain && new ActiveXObject('htmlfile');
	  } catch (error) {
	    /* ignore */
	  }

	  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
	  var length = enumBugKeys.length;

	  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];

	  return NullProtoObject();
	};

	hiddenKeys[IE_PROTO] = true; // `Object.create` method
	// https://tc39.github.io/ecma262/#sec-object.create

	var objectCreate = Object.create || function create(O, Properties) {
	  var result;

	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE] = anObject(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE] = null; // add "__proto__" for Object.getPrototypeOf polyfill

	    result[IE_PROTO] = O;
	  } else result = NullProtoObject();

	  return Properties === undefined ? result : objectDefineProperties(result, Properties);
	};

	var getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;
	var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
	var defineProperty$2 = objectDefineProperty.f;
	var trim$1 = stringTrim.trim;
	var NUMBER = 'Number';
	var NativeNumber = global_1[NUMBER];
	var NumberPrototype = NativeNumber.prototype; // Opera ~12 has broken Object#toString

	var BROKEN_CLASSOF = classofRaw(objectCreate(NumberPrototype)) == NUMBER; // `ToNumber` abstract operation
	// https://tc39.github.io/ecma262/#sec-tonumber

	var toNumber = function (argument) {
	  var it = toPrimitive(argument, false);
	  var first, third, radix, maxCode, digits, length, index, code;

	  if (typeof it == 'string' && it.length > 2) {
	    it = trim$1(it);
	    first = it.charCodeAt(0);

	    if (first === 43 || first === 45) {
	      third = it.charCodeAt(2);
	      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
	    } else if (first === 48) {
	      switch (it.charCodeAt(1)) {
	        case 66:
	        case 98:
	          radix = 2;
	          maxCode = 49;
	          break;
	        // fast equal of /^0b[01]+$/i

	        case 79:
	        case 111:
	          radix = 8;
	          maxCode = 55;
	          break;
	        // fast equal of /^0o[0-7]+$/i

	        default:
	          return +it;
	      }

	      digits = it.slice(2);
	      length = digits.length;

	      for (index = 0; index < length; index++) {
	        code = digits.charCodeAt(index); // parseInt parses a string to a first unavailable symbol
	        // but ToNumber should return NaN if a string contains unavailable symbols

	        if (code < 48 || code > maxCode) return NaN;
	      }

	      return parseInt(digits, radix);
	    }
	  }

	  return +it;
	}; // `Number` constructor
	// https://tc39.github.io/ecma262/#sec-number-constructor


	if (isForced_1(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
	  var NumberWrapper = function Number(value) {
	    var it = arguments.length < 1 ? 0 : value;
	    var dummy = this;
	    return dummy instanceof NumberWrapper // check on 1..constructor(foo) case
	    && (BROKEN_CLASSOF ? fails(function () {
	      NumberPrototype.valueOf.call(dummy);
	    }) : classofRaw(dummy) != NUMBER) ? inheritIfRequired(new NativeNumber(toNumber(it)), dummy, NumberWrapper) : toNumber(it);
	  };

	  for (var keys$2 = descriptors ? getOwnPropertyNames$1(NativeNumber) : ( // ES3:
	  'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' + // ES2015 (in case, if modules with ES2015 Number statics required before):
	  'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' + 'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger').split(','), j = 0, key; keys$2.length > j; j++) {
	    if (has(NativeNumber, key = keys$2[j]) && !has(NumberWrapper, key)) {
	      defineProperty$2(NumberWrapper, key, getOwnPropertyDescriptor$2(NativeNumber, key));
	    }
	  }

	  NumberWrapper.prototype = NumberPrototype;
	  NumberPrototype.constructor = NumberWrapper;
	  redefine(global_1, NUMBER, NumberWrapper);
	}

	function _typeof(obj) {
	  "@babel/helpers - typeof";

	  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
	    _typeof = function (obj) {
	      return typeof obj;
	    };
	  } else {
	    _typeof = function (obj) {
	      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	    };
	  }

	  return _typeof(obj);
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	}

	function ownKeys$1(object, enumerableOnly) {
	  var keys = Object.keys(object);

	  if (Object.getOwnPropertySymbols) {
	    var symbols = Object.getOwnPropertySymbols(object);
	    if (enumerableOnly) symbols = symbols.filter(function (sym) {
	      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
	    });
	    keys.push.apply(keys, symbols);
	  }

	  return keys;
	}

	function _objectSpread2(target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i] != null ? arguments[i] : {};

	    if (i % 2) {
	      ownKeys$1(Object(source), true).forEach(function (key) {
	        _defineProperty(target, key, source[key]);
	      });
	    } else if (Object.getOwnPropertyDescriptors) {
	      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
	    } else {
	      ownKeys$1(Object(source)).forEach(function (key) {
	        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
	      });
	    }
	  }

	  return target;
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function");
	  }

	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf(subClass, superClass);
	}

	function _getPrototypeOf(o) {
	  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
	    return o.__proto__ || Object.getPrototypeOf(o);
	  };
	  return _getPrototypeOf(o);
	}

	function _setPrototypeOf(o, p) {
	  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  };

	  return _setPrototypeOf(o, p);
	}

	function _isNativeReflectConstruct() {
	  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
	  if (Reflect.construct.sham) return false;
	  if (typeof Proxy === "function") return true;

	  try {
	    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
	    return true;
	  } catch (e) {
	    return false;
	  }
	}

	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return self;
	}

	function _possibleConstructorReturn(self, call) {
	  if (call && (typeof call === "object" || typeof call === "function")) {
	    return call;
	  }

	  return _assertThisInitialized(self);
	}

	function _createSuper(Derived) {
	  var hasNativeReflectConstruct = _isNativeReflectConstruct();

	  return function _createSuperInternal() {
	    var Super = _getPrototypeOf(Derived),
	        result;

	    if (hasNativeReflectConstruct) {
	      var NewTarget = _getPrototypeOf(this).constructor;

	      result = Reflect.construct(Super, arguments, NewTarget);
	    } else {
	      result = Super.apply(this, arguments);
	    }

	    return _possibleConstructorReturn(this, result);
	  };
	}

	function _superPropBase(object, property) {
	  while (!Object.prototype.hasOwnProperty.call(object, property)) {
	    object = _getPrototypeOf(object);
	    if (object === null) break;
	  }

	  return object;
	}

	function _get(target, property, receiver) {
	  if (typeof Reflect !== "undefined" && Reflect.get) {
	    _get = Reflect.get;
	  } else {
	    _get = function _get(target, property, receiver) {
	      var base = _superPropBase(target, property);

	      if (!base) return;
	      var desc = Object.getOwnPropertyDescriptor(base, property);

	      if (desc.get) {
	        return desc.get.call(receiver);
	      }

	      return desc.value;
	    };
	  }

	  return _get(target, property, receiver || target);
	}

	function _toConsumableArray(arr) {
	  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
	}

	function _arrayWithoutHoles(arr) {
	  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
	}

	function _iterableToArray(iter) {
	  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
	}

	function _unsupportedIterableToArray(o, minLen) {
	  if (!o) return;
	  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
	  var n = Object.prototype.toString.call(o).slice(8, -1);
	  if (n === "Object" && o.constructor) n = o.constructor.name;
	  if (n === "Map" || n === "Set") return Array.from(o);
	  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
	}

	function _arrayLikeToArray(arr, len) {
	  if (len == null || len > arr.length) len = arr.length;

	  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

	  return arr2;
	}

	function _nonIterableSpread() {
	  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}

	function _createForOfIteratorHelper(o, allowArrayLike) {
	  var it;

	  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
	    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
	      if (it) o = it;
	      var i = 0;

	      var F = function () {};

	      return {
	        s: F,
	        n: function () {
	          if (i >= o.length) return {
	            done: true
	          };
	          return {
	            done: false,
	            value: o[i++]
	          };
	        },
	        e: function (e) {
	          throw e;
	        },
	        f: F
	      };
	    }

	    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	  }

	  var normalCompletion = true,
	      didErr = false,
	      err;
	  return {
	    s: function () {
	      it = o[Symbol.iterator]();
	    },
	    n: function () {
	      var step = it.next();
	      normalCompletion = step.done;
	      return step;
	    },
	    e: function (e) {
	      didErr = true;
	      err = e;
	    },
	    f: function () {
	      try {
	        if (!normalCompletion && it.return != null) it.return();
	      } finally {
	        if (didErr) throw err;
	      }
	    }
	  };
	}

	// https://tc39.github.io/ecma262/#sec-thisnumbervalue

	var thisNumberValue = function (value) {
	  if (typeof value != 'number' && classofRaw(value) != 'Number') {
	    throw TypeError('Incorrect invocation');
	  }

	  return +value;
	};

	// https://tc39.github.io/ecma262/#sec-string.prototype.repeat


	var stringRepeat = ''.repeat || function repeat(count) {
	  var str = String(requireObjectCoercible(this));
	  var result = '';
	  var n = toInteger(count);
	  if (n < 0 || n == Infinity) throw RangeError('Wrong number of repetitions');

	  for (; n > 0; (n >>>= 1) && (str += str)) if (n & 1) result += str;

	  return result;
	};

	var nativeToFixed = 1.0.toFixed;
	var floor$2 = Math.floor;

	var pow = function (x, n, acc) {
	  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
	};

	var log = function (x) {
	  var n = 0;
	  var x2 = x;

	  while (x2 >= 4096) {
	    n += 12;
	    x2 /= 4096;
	  }

	  while (x2 >= 2) {
	    n += 1;
	    x2 /= 2;
	  }

	  return n;
	};

	var FORCED$3 = nativeToFixed && (0.00008.toFixed(3) !== '0.000' || 0.9.toFixed(0) !== '1' || 1.255.toFixed(2) !== '1.25' || 1000000000000000128.0.toFixed(0) !== '1000000000000000128') || !fails(function () {
	  // V8 ~ Android 4.3-
	  nativeToFixed.call({});
	}); // `Number.prototype.toFixed` method
	// https://tc39.github.io/ecma262/#sec-number.prototype.tofixed

	_export({
	  target: 'Number',
	  proto: true,
	  forced: FORCED$3
	}, {
	  // eslint-disable-next-line max-statements
	  toFixed: function toFixed(fractionDigits) {
	    var number = thisNumberValue(this);
	    var fractDigits = toInteger(fractionDigits);
	    var data = [0, 0, 0, 0, 0, 0];
	    var sign = '';
	    var result = '0';
	    var e, z, j, k;

	    var multiply = function (n, c) {
	      var index = -1;
	      var c2 = c;

	      while (++index < 6) {
	        c2 += n * data[index];
	        data[index] = c2 % 1e7;
	        c2 = floor$2(c2 / 1e7);
	      }
	    };

	    var divide = function (n) {
	      var index = 6;
	      var c = 0;

	      while (--index >= 0) {
	        c += data[index];
	        data[index] = floor$2(c / n);
	        c = c % n * 1e7;
	      }
	    };

	    var dataToString = function () {
	      var index = 6;
	      var s = '';

	      while (--index >= 0) {
	        if (s !== '' || index === 0 || data[index] !== 0) {
	          var t = String(data[index]);
	          s = s === '' ? t : s + stringRepeat.call('0', 7 - t.length) + t;
	        }
	      }

	      return s;
	    };

	    if (fractDigits < 0 || fractDigits > 20) throw RangeError('Incorrect fraction digits'); // eslint-disable-next-line no-self-compare

	    if (number != number) return 'NaN';
	    if (number <= -1e21 || number >= 1e21) return String(number);

	    if (number < 0) {
	      sign = '-';
	      number = -number;
	    }

	    if (number > 1e-21) {
	      e = log(number * pow(2, 69, 1)) - 69;
	      z = e < 0 ? number * pow(2, -e, 1) : number / pow(2, e, 1);
	      z *= 0x10000000000000;
	      e = 52 - e;

	      if (e > 0) {
	        multiply(0, z);
	        j = fractDigits;

	        while (j >= 7) {
	          multiply(1e7, 0);
	          j -= 7;
	        }

	        multiply(pow(10, j, 1), 0);
	        j = e - 1;

	        while (j >= 23) {
	          divide(1 << 23);
	          j -= 23;
	        }

	        divide(1 << j);
	        multiply(1, 1);
	        divide(2);
	        result = dataToString();
	      } else {
	        multiply(0, z);
	        multiply(1 << -e, 0);
	        result = dataToString() + stringRepeat.call('0', fractDigits);
	      }
	    }

	    if (fractDigits > 0) {
	      k = result.length;
	      result = sign + (k <= fractDigits ? '0.' + stringRepeat.call('0', fractDigits - k) + result : result.slice(0, k - fractDigits) + '.' + result.slice(k - fractDigits));
	    } else {
	      result = sign + result;
	    }

	    return result;
	  }
	});

	var LngLat = /*#__PURE__*/function () {
	  function LngLat(lng, lat) {
	    _classCallCheck(this, LngLat);

	    this.lng = lng;
	    this.lat = lat;
	  }

	  _createClass(LngLat, [{
	    key: "equals",
	    value: function equals(f) {
	      return this.lat === f.lat && this.lng === f.lng;
	    }
	  }, {
	    key: "clone",
	    value: function clone() {
	      return new LngLat(this.lat, this.lng);
	    }
	  }, {
	    key: "getLngSpan",
	    value: function getLngSpan(lng) {
	      lng = Math.abs(lng - this.lng);
	      180 < lng && (lng = 360 - lng);
	      return lng;
	    }
	  }, {
	    key: "sub",
	    value: function sub(f) {
	      return new LngLat(this.lat - f.lat, this.lng - f.lng);
	    }
	  }, {
	    key: "toString",
	    value: function toString() {
	      return "Point[".concat(this.lng, ", ").concat(this.lat, "]");
	    }
	  }, {
	    key: "toArray",
	    value: function toArray() {
	      return [this.lng, this.lat];
	    }
	  }]);

	  return LngLat;
	}();
	var Point = /*#__PURE__*/function () {
	  function Point(x, y) {
	    _classCallCheck(this, Point);

	    this.x = x;
	    this.y = y;
	  }

	  _createClass(Point, [{
	    key: "toArray",
	    value: function toArray() {
	      return [this.x, this.y];
	    }
	  }]);

	  return Point;
	}();

	var MercatorProjection = /*#__PURE__*/function () {
	  function MercatorProjection() {
	    _classCallCheck(this, MercatorProjection);
	  }

	  _createClass(MercatorProjection, [{
	    key: "lngLatToMercator",
	    value: function lngLatToMercator(lnglat) {
	      return MercatorProjection.convertLL2MC(lnglat);
	    }
	  }, {
	    key: "lngLatToPoint",
	    value: function lngLatToPoint(lnglat) {
	      lnglat = MercatorProjection.convertLL2MC(lnglat);
	      return new Point(lnglat.lng, lnglat.lat);
	    }
	  }, {
	    key: "mercatorToLngLat",
	    value: function mercatorToLngLat(mclnglat) {
	      return MercatorProjection.convertMC2LL(mclnglat);
	    }
	  }, {
	    key: "pointToLngLat",
	    value: function pointToLngLat(point) {
	      point = new LngLat(point.x, point.y);
	      return MercatorProjection.convertMC2LL(point);
	    }
	  }], [{
	    key: "getDistanceByMC",
	    value: function getDistanceByMC(f, c) {
	      if (!f || !c) return 0;
	      f = this.convertMC2LL(f);
	      if (!f) return 0;
	      var a = this.toRadians(f.lng);
	      f = this.toRadians(f.lat);
	      c = this.convertMC2LL(c);
	      if (!c) return 0;
	      var b = this.toRadians(c.lng);
	      c = this.toRadians(c.lat);
	      return this.getDistance(a, b, f, c);
	    }
	  }, {
	    key: "getDistanceByLL",
	    value: function getDistanceByLL(f, c) {
	      if (!f || !c) return 0;
	      f.lng = this.getLoop(f.lng, -180, 180);
	      f.lat = this.getRange(f.lat, -74, 74);
	      c.lng = this.getLoop(c.lng, -180, 180);
	      c.lat = this.getRange(c.lat, -74, 74);
	      var a = this.toRadians(f.lng);
	      var b = this.toRadians(f.lat);
	      f = this.toRadians(c.lng);
	      c = this.toRadians(c.lat);
	      return this.getDistance(a, f, b, c);
	    }
	  }, {
	    key: "convertMC2LL",
	    value: function convertMC2LL(f) {
	      if (null === f || undefined === f) return new LngLat(0, 0);
	      if (180 > f.lng && -180 < f.lng && 90 > f.lat && -90 < f.lat) return f;
	      var c = new LngLat(Math.abs(f.lng), Math.abs(f.lat));
	      var b;

	      for (var a = 0; a < this.MCBAND.length; a++) {
	        if (c.lat >= this.MCBAND[a]) {
	          b = this.MC2LL[a];
	          break;
	        }
	      }

	      f = this.convertor(f, b);
	      f = new LngLat(Number(f.lng.toFixed(6)), Number(f.lat.toFixed(6)));
	      return f;
	    }
	  }, {
	    key: "convertLL2MC",
	    value: function convertLL2MC(f) {
	      if (null === f || undefined === f) return new LngLat(0, 0);
	      if (180 < f.lng || -180 > f.lng || 90 < f.lat || -90 > f.lat) return f;
	      f.lng = this.getLoop(f.lng, -180, 180);
	      f.lat = this.getRange(f.lat, -74, 74);
	      var c = new LngLat(f.lng, f.lat);
	      var b;

	      for (var a = 0; a < this.LLBAND.length; a++) {
	        if (c.lat >= this.LLBAND[a]) {
	          b = this.LL2MC[a];
	          break;
	        }
	      }

	      if (!b) {
	        for (var _a = 0; _a < this.LLBAND.length; _a++) {
	          if (c.lat <= -this.LLBAND[_a]) {
	            b = this.LL2MC[_a];
	            break;
	          }
	        }
	      }

	      f = this.convertor(f, b);
	      f = new LngLat(Number(f.lng.toFixed(2)), Number(f.lat.toFixed(2)));
	      return f;
	    }
	  }, {
	    key: "convertor",
	    value: function convertor(f, c) {
	      if (f && c) {
	        var a = c[0] + c[1] * Math.abs(f.lng);
	        var b = Math.abs(f.lat) / c[9];
	        c = c[2] + c[3] * b + c[4] * b * b + c[5] * b * b * b + c[6] * b * b * b * b + c[7] * b * b * b * b * b + c[8] * b * b * b * b * b * b;
	        a *= 0 > f.lng ? -1 : 1;
	        c *= 0 > f.lat ? -1 : 1;
	        return new LngLat(a, c);
	      }
	    }
	  }, {
	    key: "getDistance",
	    value: function getDistance(f, c, a, b) {
	      return this.EARTHRADIUS * Math.acos(Math.sin(a) * Math.sin(b) + Math.cos(a) * Math.cos(b) * Math.cos(c - f));
	    }
	  }, {
	    key: "toRadians",
	    value: function toRadians(f) {
	      return Math.PI * f / 180;
	    }
	  }, {
	    key: "toDegrees",
	    value: function toDegrees(f) {
	      return 180 * f / Math.PI;
	    }
	  }, {
	    key: "getRange",
	    value: function getRange(f, c, a) {
	      null != c && (f = Math.max(f, c));
	      null != a && (f = Math.min(f, a));
	      return f;
	    }
	  }, {
	    key: "getLoop",
	    value: function getLoop(f, c, a) {
	      for (; f > a;) {
	        f -= a - c;
	      }

	      for (; f < c;) {
	        f += a - c;
	      }

	      return f;
	    }
	  }]);

	  return MercatorProjection;
	}();

	_defineProperty(MercatorProjection, "EARTHRADIUS", 6370996.81);

	_defineProperty(MercatorProjection, "MCBAND", [1.289059486e7, 8362377.87, 5591021, 3481989.83, 1678043.12, 0]);

	_defineProperty(MercatorProjection, "LLBAND", [75, 60, 45, 30, 15, 0]);

	_defineProperty(MercatorProjection, "MC2LL", [[1.410526172116255e-8, 8.98305509648872e-6, -1.9939833816331, 200.9824383106796, -187.2403703815547, 91.6087516669843, -23.38765649603339, 2.57121317296198, -0.03801003308653, 1.73379812e7], [-7.435856389565537e-9, 8.983055097726239e-6, -0.78625201886289, 96.32687599759846, -1.85204757529826, -59.36935905485877, 47.40033549296737, -16.50741931063887, 2.28786674699375, 1.026014486e7], [-3.030883460898826e-8, 8.98305509983578e-6, 0.30071316287616, 59.74293618442277, 7.357984074871, -25.38371002664745, 13.45380521110908, -3.29883767235584, 0.32710905363475, 6856817.37], [-1.981981304930552e-8, 8.983055099779535e-6, 0.03278182852591, 40.31678527705744, 0.65659298677277, -4.44255534477492, 0.85341911805263, 0.12923347998204, -0.04625736007561, 4482777.06], [3.09191371068437e-9, 8.983055096812155e-6, 6.995724062e-5, 23.10934304144901, -2.3663490511e-4, -0.6321817810242, -0.00663494467273, 0.03430082397953, -0.00466043876332, 2555164.4], [2.890871144776878e-9, 8.983055095805407e-6, -3.068298e-8, 7.47137025468032, -3.53937994e-6, -0.02145144861037, -1.234426596e-5, 1.0322952773e-4, -3.23890364e-6, 826088.5]]);

	_defineProperty(MercatorProjection, "LL2MC", [[-0.0015702102444, 111320.7020616939, 0x60e374c3105a3, -0x24bb4115e2e164, 0x5cc55543bb0ae8, -0x7ce070193f3784, 0x5e7ca61ddf8150, -0x261a578d8b24d0, 0x665d60f3742ca, 82.5], [8.277824516172526e-4, 111320.7020463578, 6.477955746671607e8, -4.082003173641316e9, 1.077490566351142e10, -1.517187553151559e10, 1.205306533862167e10, -5.124939663577472e9, 9.133119359512032e8, 67.5], [0.00337398766765, 111320.7020202162, 4481351.045890365, -2.339375119931662e7, 7.968221547186455e7, -1.159649932797253e8, 9.723671115602145e7, -4.366194633752821e7, 8477230.501135234, 52.5], [0.00220636496208, 111320.7020209128, 51751.86112841131, 3796837.749470245, 992013.7397791013, -1221952.21711287, 1340652.697009075, -620943.6990984312, 144416.9293806241, 37.5], [-3.441963504368392e-4, 111320.7020576856, 278.2353980772752, 2485758.690035394, 6070.750963243378, 54821.18345352118, 9540.606633304236, -2710.55326746645, 1405.483844121726, 22.5], [-3.218135878613132e-4, 111320.7020701615, 0.00369383431289, 823725.6402795718, 0.46104986909093, 2351.343141331292, 1.58060784298199, 8.77738589078284, 0.37238884252424, 7.45]]);

	function clamp(val, min, max) {
	  return Math.min(Math.max(val, min), max);
	}
	function toRadian(f) {
	  return f * Math.PI / 180;
	}
	function toAngle(f) {
	  return f / Math.PI * 180;
	}
	function floorPowerOfTwo(f) {
	  return Math.pow(2, Math.floor(Math.log(f) / Math.LN2));
	}

	function ad(f, c, a, b, d) {
	  var e = 1 - f,
	      g = 1 - f;
	  return e * e * e * c + 3 * g * g * f * a + 3 * e * f * f * b + f * f * f * d;
	}

	function Yc(f, c) {
	  return 1e-8 > Math.abs(f - c);
	}

	function ge(f, c) {
	  return f && c ? Math.round(Math.sqrt(Math.pow(f.lng - c.lng, 2) + Math.pow(f.lat - c.lat, 2))) : 0;
	}
	/**
	 * @classdesc
	 * 通过传入起点和终点，生成带高度的贝塞尔曲线坐标集，可以用来生成飞线数据
	 *
	 * @param {Object} options
	 * @param {Array} options.start 起点坐标
	 * @param {Array} options.end 终点坐标
	 *
	 * @example
	 * var curve = new layergl.curve.BezierCurve({
	 *     start: [12946640.989, 4846560.296],
	 *     end: [12946348.509, 4846401.146]
	 * });
	 */


	var BezierCurve = /*#__PURE__*/function () {
	  function BezierCurve(options) {
	    _classCallCheck(this, BezierCurve);

	    this.options = options || {};

	    this._initialize();
	  }

	  _createClass(BezierCurve, [{
	    key: "_initialize",
	    value: function _initialize() {
	      this.v0 = this._normalizaCoord(this.options.start);
	      this.v3 = this._normalizaCoord(this.options.end);
	      this.v1 = this._getControlPoint(this.v0, this.v3, 4);
	      this.v2 = this._getControlPoint(this.v3, this.v0, 5);
	    }
	    /**
	     * 修改起点、终点坐标等属性
	     * @param {Object} options
	     */

	  }, {
	    key: "setOptions",
	    value: function setOptions(options) {
	      this.options = options || {};

	      this._initialize();
	    }
	    /**
	     * 获取生成的曲线坐标集，传入的字段为曲线的分段数
	     * @param {Number} [size=20]
	     */

	  }, {
	    key: "getPoints",
	    value: function getPoints() {
	      var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 20;
	      var points = [];

	      for (var i = 0; i <= size; i++) {
	        var mcCoord = this._getPoint(i / size);

	        var coord = MercatorProjection.convertMC2LL(new LngLat(mcCoord[0], mcCoord[1])).toArray();
	        points.push([].concat(_toConsumableArray(coord), [mcCoord[2]]));
	      }

	      return points;
	    }
	  }, {
	    key: "_normalizaCoord",
	    value: function _normalizaCoord(coord) {
	      if (!coord) return [];
	      var mclnglat = MercatorProjection.convertLL2MC({
	        lng: Number(coord[0]),
	        lat: Number(coord[1])
	      });
	      return [mclnglat.lng, mclnglat.lat, coord[2] || 0];
	    }
	  }, {
	    key: "_getControlPoint",
	    value: function _getControlPoint(p1, p2) {
	      var a = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
	      return [].concat(_toConsumableArray(this._getQuarter(p1, p2)), [this._getDistance(p1, p2) / a]);
	    }
	  }, {
	    key: "_getQuarter",
	    value: function _getQuarter(p1, p2) {
	      return [(3 * p1[0] + p2[0]) / 4, (3 * p1[1] + p2[1]) / 4];
	    }
	  }, {
	    key: "_getDistance",
	    value: function _getDistance(p1, p2) {
	      return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2));
	    }
	  }, {
	    key: "_getPoint",
	    value: function _getPoint(f) {
	      var coord = [],
	          a = this.v0,
	          b = this.v1,
	          d = this.v2,
	          e = this.v3;
	      coord.push(ad(f, a[0], b[0], d[0], e[0]), ad(f, a[1], b[1], d[1], e[1]), ad(f, a[2], b[2], d[2], e[2]));
	      return coord;
	    }
	  }]);

	  return BezierCurve;
	}();
	/**
	 * @classdesc
	 * 通过传入2个以上的坐标点，来依次生成大地线坐标集，可以用来生成地球模式的大圆曲线
	 *
	 * @param {Object} options
	 * @param {Array} options.points 传入经过点的坐标数组
	 *
	 * @example
	 * var curve = new layergl.curve.GeodesicCurve({
	 *     points: [[116.392394, 39.910683],[10.2345234, 22.453211],[101.432322, 70.222315]]
	 * });
	 */

	var GeodesicCurve = /*#__PURE__*/function () {
	  function GeodesicCurve(f) {
	    _classCallCheck(this, GeodesicCurve);

	    this.WORLD_SIZE_MC_HALF = 2.0037726372307256e7;
	    this.WORLD_SIZE_MC = 2 * this.WORLD_SIZE_MC_HALF;
	    this.options = f || {};

	    this._initialize();
	  }

	  _createClass(GeodesicCurve, [{
	    key: "_initialize",
	    value: function _initialize() {
	      this.points = this.options.points || this.options.point || [];
	      this.greatCirclePoints = [];
	      var f = [];

	      for (var c = 0; c < this.points.length; c++) {
	        var a = this._normalizaCoord(this.points[c]);

	        a && f.push(a);
	      }

	      this.points = f;
	    }
	    /**
	     * 修改坐标数组等属性
	     * @param {Object} options
	     */

	  }, {
	    key: "setOptions",
	    value: function setOptions(options) {
	      this.options = options || {};

	      this._initialize();
	    }
	    /**
	     * 获取生成的大地曲线坐标集，分段数按实际距离自动设定，无需传入参数
	     */

	  }, {
	    key: "getPoints",
	    value: function getPoints() {
	      if (0 === this.greatCirclePoints.length) {
	        for (var f = 0; f < this.points.length - 1; f++) {
	          this._calcGreatCirclePoints(this.points[f], this.points[f + 1]);
	        }
	      }

	      return this.greatCirclePoints.map(function (p) {
	        return MercatorProjection.convertMC2LL(new LngLat(p[0], p[1])).toArray();
	      });
	    }
	  }, {
	    key: "_normalizaCoord",
	    value: function _normalizaCoord(f) {
	      if (!f) return null;

	      if (f instanceof Array) {
	        f = {
	          lng: Number(f[0]),
	          lat: Number(f[1])
	        };
	      }

	      var c = MercatorProjection.convertLL2MC(f);
	      f = MercatorProjection.convertMC2LL(f);
	      c.latLng = f;
	      return c;
	    }
	  }, {
	    key: "_calcGreatCirclePoints",
	    value: function _calcGreatCirclePoints(f, c) {
	      var a = f.latLng,
	          b = c.latLng;

	      if (!Yc(a.lng, b.lng) || !Yc(a.lat, b.lat)) {
	        var d = MercatorProjection.getDistance(toRadian(a.lng), toRadian(a.lat), toRadian(b.lng), toRadian(b.lat));

	        if (!(25e4 > d)) {
	          d = Math.round(d / 15e4);

	          var e = this._calcAngularDistance(a, b);

	          this.greatCirclePoints.push([f.lng, f.lat]);
	          var k;

	          for (var g = 0; g < d; g++) {
	            var h = this._calcMiddlePoint(a, b, g / d, e);

	            h = MercatorProjection.convertLL2MC(h);
	            k = ge(h, f);

	            if (30037726 < k) {
	              h.lng = h.lng < f.lng ? h.lng + this.WORLD_SIZE_MC : h.lng - this.WORLD_SIZE_MC;
	            }

	            this.greatCirclePoints.push([h.lng, h.lat]);
	            f = h;
	          }

	          k = ge(c, f);

	          if (30037726 < k) {
	            c.lng = c.lng < f.lng ? c.lng + this.WORLD_SIZE_MC : c.lng - this.WORLD_SIZE_MC;
	          }

	          this.greatCirclePoints.push([c.lng, c.lat]);
	        }
	      }
	    }
	  }, {
	    key: "_calcAngularDistance",
	    value: function _calcAngularDistance(f, c) {
	      var a = toRadian(f.lat),
	          b = toRadian(c.lat);
	      f = toRadian(f.lng);
	      c = toRadian(c.lng);
	      return Math.acos(Math.sin(a) * Math.sin(b) + Math.cos(a) * Math.cos(b) * Math.cos(Math.abs(c - f)));
	    }
	  }, {
	    key: "_calcMiddlePoint",
	    value: function _calcMiddlePoint(f, c, a, b) {
	      var d = c.lat,
	          e = f.lng;
	      c = c.lng;
	      f = toRadian(f.lat);
	      d = toRadian(d);
	      e = toRadian(e);
	      var g = toRadian(c);
	      c = Math.sin((1 - a) * b) / Math.sin(b);
	      b = Math.sin(a * b) / Math.sin(b);
	      a = c * Math.cos(f) * Math.cos(e) + b * Math.cos(d) * Math.cos(g);
	      e = c * Math.cos(f) * Math.sin(e) + b * Math.cos(d) * Math.sin(g);
	      f = Math.atan2(c * Math.sin(f) + b * Math.sin(d), Math.sqrt(Math.pow(a, 2) + Math.pow(e, 2)));
	      return new LngLat(toAngle(Math.atan2(e, a)), toAngle(f));
	    }
	  }]);

	  return GeodesicCurve;
	}();
	/**
	 * @classdesc
	 * 通过传入2个或2个以上的坐标点，来依次生成od曲线坐标集。
	 * 该曲线为2D弯曲方式，且不同于大地曲线，大地曲是根据球面最短距离来计算的，距离太近的2个点基本不会弯曲，而这个Od曲线的生成算法不同，即使很短的距离也会弯曲。
	 *
	 * @param {Object} options
	 * @param {Array} options.points 传入经过点的坐标数组
	 *
	 * @example
	 * var curve = new layergl.curve.OdCurve({
	 *     points: [[116.392394, 39.910683],[111.432322, 40.222315]]
	 * });
	 */

	var OdCurve = /*#__PURE__*/function () {
	  function OdCurve() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    _classCallCheck(this, OdCurve);

	    this.options = options;

	    this._initialize();
	  }

	  _createClass(OdCurve, [{
	    key: "_initialize",
	    value: function _initialize() {
	      this.points = this.options.points;
	    }
	  }, {
	    key: "_normalizaCoord",
	    value: function _normalizaCoord(c) {
	      if (!c) return null;

	      if (c instanceof Array) {
	        c = {
	          lng: Number(c[0]),
	          lat: Number(c[1])
	        };
	      }

	      return MercatorProjection.convertLL2MC(c);
	    }
	  }, {
	    key: "setOptions",
	    value: function setOptions() {
	      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	      this.options = options;

	      this._initialize();
	    }
	    /**
	     * 获取生成的Od曲线坐标集，传入的字段为曲线的分段数，默认值是20
	     * @param {Number=} [size=20]
	     */

	  }, {
	    key: "getPoints",
	    value: function getPoints(size) {
	      var a = [],
	          b = this.points;

	      for (var d = 0; d < b.length - 1; d++) {
	        var f = this.getCurveByTwoPoints(this._normalizaCoord(b[d]), this._normalizaCoord(b[d + 1]), size);

	        if (f && 0 < f.length) {
	          a.push.apply(a, _toConsumableArray(f));
	        }
	      }

	      return a.map(function (p) {
	        return MercatorProjection.convertMC2LL(new LngLat(p[0], p[1])).toArray();
	      });
	    }
	  }, {
	    key: "getCurveByTwoPoints",
	    value: function getCurveByTwoPoints(c, a) {
	      var b = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 20;
	      if (!c || !a) return null;
	      var d = [];
	      var f = 0;
	      var g = parseFloat(c.lat),
	          h = parseFloat(a.lat);
	      var k = parseFloat(c.lng),
	          l = parseFloat(a.lng);

	      if (l > k) {
	        if (180 < parseFloat(l - k)) {
	          if (0 > k) {
	            k = parseFloat(360 + k);
	            l = parseFloat(360 + l);
	          }
	        }
	      }

	      var m = 0,
	          p,
	          n;

	      if (h === g) {
	        p = 0;
	        n = k - l;
	      } else {
	        l === k ? (p = Math.PI / 2, n = g - h) : (p = Math.atan((h - g) / (l - k)), n = (h - g) / Math.sin(p));
	      }

	      0 === m && (m = p + Math.PI / 5);
	      n /= 2;
	      p = n * Math.cos(m) + k;
	      m = n * Math.sin(m) + g;

	      for (n = 0; n < b + 1; n++) {
	        var r = k * (1 - 2 * f + f * f) + p * (2 * f - 2 * f * f) + l * f * f,
	            q = a.lng;
	        d.push([0 > c.lng && 0 < q ? r - 360 : r, g * (1 - 2 * f + f * f) + m * (2 * f - 2 * f * f) + h * f * f]);
	        f += 1 / b;
	      }

	      return d;
	    }
	  }]);

	  return OdCurve;
	}();

	var curve = /*#__PURE__*/Object.freeze({
		__proto__: null,
		BezierCurve: BezierCurve,
		GeodesicCurve: GeodesicCurve,
		OdCurve: OdCurve
	});

	function tmpKelvinToRGB(tmpKelvin) {
	  tmpKelvin = clamp(tmpKelvin, 1000, 40000);
	  tmpKelvin /= 100;
	  var r, g, b, tmpCalc; // r

	  if (tmpKelvin <= 66) {
	    r = 255;
	  } else {
	    tmpCalc = tmpKelvin - 60;
	    tmpCalc = 329.698727446 * Math.pow(tmpCalc, -0.1332047592);
	    r = clamp(tmpCalc, 0, 255);
	  } // g


	  if (tmpKelvin <= 66) {
	    tmpCalc = tmpKelvin;
	    tmpCalc = 99.4708025861 * Math.log(tmpCalc) - 161.1195681661;
	    g = clamp(tmpCalc, 0, 255);
	  } else {
	    tmpCalc = tmpKelvin - 60;
	    tmpCalc = 288.1221695283 * Math.pow(tmpCalc, -0.0755148492);
	    g = clamp(tmpCalc, 0, 255);
	  } // b


	  if (tmpKelvin >= 66) {
	    b = 255;
	  } else if (tmpKelvin <= 19) {
	    b = 0;
	  } else {
	    tmpCalc = tmpKelvin - 10;
	    tmpCalc = 138.5177312231 * Math.log(tmpCalc) - 305.0447927307;
	    b = clamp(tmpCalc, 0, 255);
	  }

	  return [r, g, b];
	}

	var color = /*#__PURE__*/Object.freeze({
		__proto__: null,
		tmpKelvinToRGB: tmpKelvinToRGB
	});

	var slice = [].slice;
	var factories = {};

	var construct = function (C, argsLength, args) {
	  if (!(argsLength in factories)) {
	    for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']'; // eslint-disable-next-line no-new-func


	    factories[argsLength] = Function('C,a', 'return new C(' + list.join(',') + ')');
	  }

	  return factories[argsLength](C, args);
	}; // `Function.prototype.bind` method implementation
	// https://tc39.github.io/ecma262/#sec-function.prototype.bind


	var functionBind = Function.bind || function bind(that
	/* , ...args */
	) {
	  var fn = aFunction$1(this);
	  var partArgs = slice.call(arguments, 1);

	  var boundFunction = function bound()
	  /* args... */
	  {
	    var args = partArgs.concat(slice.call(arguments));
	    return this instanceof boundFunction ? construct(fn, args.length, args) : fn.apply(that, args);
	  };

	  if (isObject(fn.prototype)) boundFunction.prototype = fn.prototype;
	  return boundFunction;
	};

	// https://tc39.github.io/ecma262/#sec-function.prototype.bind

	_export({
	  target: 'Function',
	  proto: true
	}, {
	  bind: functionBind
	});

	// https://tc39.github.io/ecma262/#sec-object.defineproperty

	_export({
	  target: 'Object',
	  stat: true,
	  forced: !descriptors,
	  sham: !descriptors
	}, {
	  defineProperty: objectDefineProperty.f
	});

	var nativeGetOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
	var FAILS_ON_PRIMITIVES = fails(function () {
	  nativeGetOwnPropertyDescriptor$1(1);
	});
	var FORCED$4 = !descriptors || FAILS_ON_PRIMITIVES; // `Object.getOwnPropertyDescriptor` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor

	_export({
	  target: 'Object',
	  stat: true,
	  forced: FORCED$4,
	  sham: !descriptors
	}, {
	  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
	    return nativeGetOwnPropertyDescriptor$1(toIndexedObject(it), key);
	  }
	});

	function createTexture(gl, image, param) {
	  param = _objectSpread2({
	    TEXTURE_MAG_FILTER: "LINEAR",
	    TEXTURE_MIN_FILTER: "LINEAR",
	    TEXTURE_WRAP_S: "REPEAT",
	    TEXTURE_WRAP_T: "REPEAT"
	  }, param);
	  var glTexture = gl.createTexture();
	  gl.bindTexture(gl.TEXTURE_2D, glTexture);
	  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

	  for (var key in param) {
	    gl.texParameteri(gl.TEXTURE_2D, gl[key], gl[param[key]]);
	  }

	  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
	  gl.bindTexture(gl.TEXTURE_2D, null);
	  glTexture.width = image.width;
	  glTexture.height = image.height;
	  return glTexture;
	}
	function loadTextureImage(gl, texture, callback, param) {
	  if (_typeof(texture) === "object") {
	    texture = createTexture(gl, texture, param);
	    callback(texture, null);
	  } else {
	    var image = new Image();
	    image.crossOrigin = "anonymous";

	    image.onload = function () {
	      var width = floorPowerOfTwo(image.width),
	          height = floorPowerOfTwo(image.height),
	          canvas = document.createElement("canvas");
	      canvas.width = width;
	      canvas.height = height;
	      canvas.getContext("2d").drawImage(image, 0, 0, width, height);
	      image = canvas;
	      var glTexture = createTexture(gl, image, param);
	      callback(glTexture, image);
	    };

	    image.src = texture;
	  }
	}

	var TextureManager = /*#__PURE__*/function () {
	  function TextureManager(gl) {
	    _classCallCheck(this, TextureManager);

	    this.gl = gl;
	    this.images = {};
	  }

	  _createClass(TextureManager, [{
	    key: "add",
	    value: function add(name, texture) {
	      if (this.images[name]) return;
	      this.images[name] = texture;
	    }
	  }, {
	    key: "remove",
	    value: function remove() {
	      for (var i = 0; i < arguments.length; i++) {
	        var name = i < 0 || arguments.length <= i ? undefined : arguments[i];
	        delete this.images[name];
	      }
	    }
	  }, {
	    key: "get",
	    value: function get(name) {
	      return this.images[name];
	    }
	  }, {
	    key: "load",
	    value: function load(any, cb) {
	      var param = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	      loadTextureImage(this.gl, any, cb, param);
	    }
	  }, {
	    key: "loadAndAdd",
	    value: function loadAndAdd(cb) {
	      var _this = this;

	      for (var _len = arguments.length, anys = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        anys[_key - 1] = arguments[_key];
	      }

	      var allNum = anys.length;
	      var loadNum = 0;

	      var _loop = function _loop() {
	        var any = anys.shift();

	        if (!any || _this.images[any]) {
	          loadNum++;

	          if (loadNum === allNum) {
	            cb && cb();
	          }

	          return "continue";
	        }

	        loadTextureImage(_this.gl, any, function (texture) {
	          _this.images[any] = texture;
	          loadNum++;

	          if (loadNum === allNum) {
	            cb && cb();
	          }
	        });
	      };

	      while (anys.length) {
	        var _ret = _loop();

	        if (_ret === "continue") continue;
	      }
	    }
	  }]);

	  return TextureManager;
	}();

	function defineObj(obj, key, val) {
	  var property = Object.getOwnPropertyDescriptor(obj, key);

	  if (property && property.configurable === false) {
	    return;
	  }

	  var getter = property && property.get;
	  var setter = property && property.set;
	  Object.defineProperty(obj, key, {
	    enumerable: true,
	    configurable: true,
	    get: function reactiveGetter() {
	      return getter ? getter.call(obj) : val;
	    },
	    set: function reactiveSetter(newVal) {
	      var value = getter ? getter.call(obj) : val;

	      if (newVal === value || newVal !== newVal && value !== value) {
	        return;
	      }

	      newVal = getter ? setter.call(obj, newVal) : newVal;
	    }
	  });
	}

	function initGL(GLObj, gl) {
	  for (var key in gl) {
	    var value = gl[key];

	    if (typeof value === "function") {
	      value = value.bind(gl);
	    }

	    defineObj(GLObj, key, value);
	  }
	}

	function isWebGl2(gl) {
	  return WebGL2RenderingContext && gl instanceof WebGL2RenderingContext;
	}

	function getExtension(gl, names) {
	  var length = names.length;

	  for (var i = 0; i < length; ++i) {
	    var extension = gl.getExtension(names[i]);

	    if (extension) {
	      return extension;
	    }
	  }

	  return undefined;
	}

	var GL = /*#__PURE__*/function () {
	  function GL(gl) {
	    _classCallCheck(this, GL);

	    this.webgl2 = isWebGl2(gl); // starnder api

	    var glCreateVertexArray;
	    var glBindVertexArray;
	    var glDeleteVertexArray;
	    var elementIndexUint;
	    var glDrawElementsInstanced;
	    var glDrawArraysInstanced;
	    var glVertexAttribDivisor;
	    var glDrawBuffers; // function state

	    var vertexArrayObject;
	    var instancedArrays;
	    var drawBuffers;

	    if (this.webgl2) {
	      glCreateVertexArray = function glCreateVertexArray() {
	        return gl.createVertexArray();
	      };

	      glBindVertexArray = function glBindVertexArray(vao) {
	        gl.bindVertexArray(vao);
	      };

	      glDeleteVertexArray = function glDeleteVertexArray(vao) {
	        gl.deleteVertexArray(vao);
	      };

	      glDrawElementsInstanced = function glDrawElementsInstanced(mode, count, type, offset, instanceCount) {
	        gl.drawElementsInstanced(mode, count, type, offset, instanceCount);
	      };

	      glDrawArraysInstanced = function glDrawArraysInstanced(mode, first, count, instanceCount) {
	        gl.drawArraysInstanced(mode, first, count, instanceCount);
	      };

	      glVertexAttribDivisor = function glVertexAttribDivisor(index, divisor) {
	        gl.vertexAttribDivisor(index, divisor);
	      };

	      glDrawBuffers = function glDrawBuffers(buffers) {
	        gl.drawBuffers(buffers);
	      };
	    } else {
	      // Query and initialize extensions
	      elementIndexUint = !!getExtension(gl, ["OES_element_index_uint"]);
	      vertexArrayObject = getExtension(gl, ["OES_vertex_array_object"]);

	      if (vertexArrayObject) {
	        glCreateVertexArray = function glCreateVertexArray() {
	          return vertexArrayObject.createVertexArrayOES();
	        };

	        glBindVertexArray = function glBindVertexArray(vertexArray) {
	          vertexArrayObject.bindVertexArrayOES(vertexArray);
	        };

	        glDeleteVertexArray = function glDeleteVertexArray(vertexArray) {
	          vertexArrayObject.deleteVertexArrayOES(vertexArray);
	        };
	      }

	      instancedArrays = getExtension(gl, ["ANGLE_instanced_arrays"]);

	      if (instancedArrays) {
	        glDrawElementsInstanced = function glDrawElementsInstanced(mode, count, type, offset, instanceCount) {
	          instancedArrays.drawElementsInstancedANGLE(mode, count, type, offset, instanceCount);
	        };

	        glDrawArraysInstanced = function glDrawArraysInstanced(mode, first, count, instanceCount) {
	          instancedArrays.drawArraysInstancedANGLE(mode, first, count, instanceCount);
	        };

	        glVertexAttribDivisor = function glVertexAttribDivisor(index, divisor) {
	          instancedArrays.vertexAttribDivisorANGLE(index, divisor);
	        };
	      }

	      drawBuffers = getExtension(gl, ["WEBGL_draw_buffers"]);

	      if (drawBuffers) {
	        glDrawBuffers = function glDrawBuffers(buffers) {
	          drawBuffers.drawBuffersWEBGL(buffers);
	        };
	      }
	    }

	    this.glCreateVertexArray = glCreateVertexArray;
	    this.glBindVertexArray = glBindVertexArray;
	    this.glDeleteVertexArray = glDeleteVertexArray;
	    this.glDrawElementsInstanced = glDrawElementsInstanced;
	    this.glDrawArraysInstanced = glDrawArraysInstanced;
	    this.glVertexAttribDivisor = glVertexAttribDivisor;
	    this.glDrawBuffers = glDrawBuffers;
	    this._elementIndexUint = !!elementIndexUint;
	    this._vertexArrayObject = !!vertexArrayObject;
	    this._instancedArrays = !!instancedArrays;
	    this._drawBuffers = !!drawBuffers; // 全局纹理管理器

	    this.textureManager = new TextureManager(gl); // 扩展原生的gl

	    initGL(this, gl);
	  }

	  _createClass(GL, [{
	    key: "unbindVAO",
	    value: function unbindVAO() {
	      if (this.vertexArrayObject) {
	        this.glBindVertexArray(null);
	      }
	    }
	  }, {
	    key: "clearCanvas",
	    value: function clearCanvas() {
	      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	          color = _ref.color,
	          mask = _ref.mask;

	      color = color || [0, 0, 0, 0];
	      mask = mask || this.COLOR_BUFFER_BIT | this.DEPTH_BUFFER_BIT;
	      this.clearColor.apply(this, _toConsumableArray(color));
	      this.clear(mask);
	    }
	  }, {
	    key: "elementIndexUint",
	    get: function get() {
	      return this._elementIndexUint || this.webgl2;
	    }
	  }, {
	    key: "vertexArrayObject",
	    get: function get() {
	      return this._vertexArrayObject || this.webgl2;
	    }
	  }, {
	    key: "instancedArrays",
	    get: function get() {
	      return this._instancedArrays || this.webgl2;
	    }
	  }, {
	    key: "drawBuffers",
	    get: function get() {
	      return this._drawBuffers || this.webgl2;
	    }
	  }]);

	  return GL;
	}();

	var StateManager = /*#__PURE__*/function () {
	  function StateManager(gl) {
	    _classCallCheck(this, StateManager);

	    this.gl = gl;
	    this.savedState = [];
	    this.currentState = this.getCurrentState();
	  }

	  _createClass(StateManager, [{
	    key: "setDefaultState",
	    value: function setDefaultState() {
	      this.setState();
	    }
	  }, {
	    key: "getDefaultState",
	    value: function getDefaultState() {
	      return {
	        blend: false,
	        depthTest: false,
	        cullFace: false,
	        depthMask: true,
	        stencilTest: false
	      };
	    }
	  }, {
	    key: "getCurrentState",
	    value: function getCurrentState() {
	      var gl = this.gl;
	      return {
	        blend: gl.getParameter(gl.BLEND),
	        stencilTest: gl.getParameter(gl.STENCIL_TEST),
	        depthTest: gl.getParameter(gl.DEPTH_TEST),
	        cullFace: gl.getParameter(gl.CULL_FACE),
	        depthMask: gl.getParameter(gl.DEPTH_WRITEMASK)
	      };
	    }
	  }, {
	    key: "save",
	    value: function save() {
	      this.savedState.push(this.getCurrentState());
	    }
	  }, {
	    key: "restore",
	    value: function restore() {
	      var state = this.savedState.pop();
	      this.setState(state);
	    }
	  }, {
	    key: "setState",
	    value: function setState(state) {
	      var gl = this.gl,
	          currentState = this.getCurrentState();
	      state = _objectSpread2(_objectSpread2({}, this.getDefaultState()), state);

	      if (state.blend !== currentState.blend) {
	        state.blend ? gl.enable(gl.BLEND) : gl.disable(gl.BLEND);
	      }

	      if (state.depthTest !== currentState.depthTest) {
	        state.depthTest ? gl.enable(gl.DEPTH_TEST) : gl.disable(gl.DEPTH_TEST);
	      }

	      if (state.cullFace !== currentState.cullFace) {
	        state.cullFace ? gl.enable(gl.CULL_FACE) : gl.disable(gl.CULL_FACE);
	      }

	      if (state.depthMask !== currentState.depthMask) {
	        state.depthMask ? gl.depthMask(true) : gl.depthMask(false);
	      }

	      this.currentState = state;
	    }
	  }]);

	  return StateManager;
	}();

	var FrameBuffer = function FrameBuffer(gl, width, height) {
	  _classCallCheck(this, FrameBuffer);

	  width = width || gl.canvas.width;
	  height = height || gl.canvas.height;
	  var buffer = gl.createFramebuffer(),
	      texture = gl.createTexture(); // 纹理

	  gl.bindTexture(gl.TEXTURE_2D, texture);
	  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
	  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	  buffer.texture = texture; // 渲染缓存

	  var renderBuffer = gl.createRenderbuffer();
	  gl.bindRenderbuffer(gl.RENDERBUFFER, renderBuffer);
	  gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height);
	  buffer.depthBuffer = renderBuffer; // 将渲染纹理绑定到帧缓存

	  gl.bindFramebuffer(gl.FRAMEBUFFER, buffer);
	  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0); // 将renderbuffer对象附加到framebuffer对象

	  gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderBuffer); // 检查缓存状态

	  var state = gl.checkFramebufferStatus(gl.FRAMEBUFFER);

	  if (gl.FRAMEBUFFER_COMPLETE === state) {
	    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	    gl.bindTexture(gl.TEXTURE_2D, null);
	    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
	    this.framebuffer = buffer;
	  }
	};

	function getContext(canvas, contextAttributes) {
	  var contextNames = ["webgl2", "webgl", "experimental-webgl"];

	  for (var i = 0; i < contextNames.length; i++) {
	    var contextName = contextNames[i];
	    var context = canvas.getContext(contextName, contextAttributes);
	    if (context !== null) return context;
	  }

	  return null;
	}

	var WebglLayer = /*#__PURE__*/function () {
	  function WebglLayer(map) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    _classCallCheck(this, WebglLayer);

	    this.map = map;
	    this.options = options; // 渲染队列

	    this.renderArr = []; // 画布和webgl对象

	    this.canvas = options.canvas || document.createElement("canvas");
	    this.gl = new GL(options.gl || getContext(this.canvas, options.glAttributes)); // 修改画布样式

	    this.changeSize(); // 动画和更新事件

	    this._animation = this.animation.bind(this);
	    this._update = this.update.bind(this);
	    this.options.onRender && this.renderArr.push(this.options.onRender); // webgl状态修改器

	    this.stateManager = new StateManager(this.gl); // 帧缓存

	    this.pickFBO = new FrameBuffer(this.gl); // 绘画相关参数

	    this.transferOptions = {}; // 绑定同步事件

	    this.bind();
	  }

	  _createClass(WebglLayer, [{
	    key: "bind",
	    value: function bind() {
	      var self = this,
	          map = this.map; // 画布缩放事件

	      map.onResize(function () {
	        self.changeSize();
	        self.render();
	      }); // 更新事件

	      map.onUpdate(this._update); // 其余可能支持的事件

	      map.onClick && map.onClick(function (evt) {
	        self.onClick && self.onClick(evt);
	      });
	      map.onDblClick && map.onDblClick(function (evt) {
	        self.onDblClick && self.onDblClick(evt);
	      });
	      map.onRightClick && map.onRightClick(function (evt) {
	        self.onRightClick && self.onRightClick(evt);
	      });
	      map.onMousemove && map.onMousemove(function (evt) {
	        self.onMousemove && self.onMousemove(evt);
	      }); // 附加画布

	      this.options.canvas || map.getContainer().appendChild(this.canvas);
	    }
	  }, {
	    key: "bindFramebuffer",
	    value: function bindFramebuffer(bufferData) {
	      var gl = this.gl;
	      bufferData ? gl.bindFramebuffer(gl.FRAMEBUFFER, bufferData.framebuffer) : gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	    }
	  }, {
	    key: "saveFramebuffer",
	    value: function saveFramebuffer() {
	      var gl = this.gl;
	      this.preFramebuffer = gl.getParameter(gl.FRAMEBUFFER_BINDING);
	    }
	  }, {
	    key: "restoreFramebuffer",
	    value: function restoreFramebuffer() {
	      var gl = this.gl;
	      gl.bindFramebuffer(gl.FRAMEBUFFER, this.preFramebuffer);
	    }
	  }, {
	    key: "onRender",
	    value: function onRender(customRender) {
	      this.renderArr.push(customRender);
	    }
	  }, {
	    key: "changeSize",
	    value: function changeSize() {
	      var canvas = this.canvas;

	      if (canvas && !this.options.canvas) {
	        var style = canvas.style,
	            size = this.map.getSize(),
	            devicePixelRatio = window.devicePixelRatio;
	        canvas.width = size.width * devicePixelRatio;
	        canvas.height = size.height * devicePixelRatio;
	        style.cssText = "position: absolute; left: 0; top: 0; width:" + size.width + "px; height:" + size.height + "px; z-index: 2; pointer-events: none;";
	        this.gl.viewport(0, 0, canvas.width, canvas.height);
	      }
	    }
	  }, {
	    key: "update",
	    value: function update() {
	      false === this.options.autoUpdate || this.isAnimation || this.render();
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      if (this.map) {
	        // 更新渲染参数
	        this.transferOptions = _objectSpread2({
	          gl: this.gl,
	          stateManager: this.stateManager
	        }, this.map.updateMatrixs()); // 是否为手动更新

	        false !== this.options.autoUpdate && this.clear();

	        for (var i = 0; i < this.renderArr.length; i++) {
	          if (this.renderArr[i]) {
	            this.renderArr[i].bind(this)(this.transferOptions);
	          }
	        }
	      }
	    }
	  }, {
	    key: "clear",
	    value: function clear() {
	      this.gl.clearCanvas();
	    }
	  }, {
	    key: "destroy",
	    value: function destroy() {
	      this.stopAnimation();

	      if (this.canvas.parentNode) {
	        this.canvas.parentNode.removeChild(this.canvas);
	      }

	      this.gl = this.gl = this.canvas = null;
	      this.map.destroy && this.map.destroy();
	      this.map = null;
	    }
	  }, {
	    key: "animation",
	    value: function animation() {
	      if (this.isAnimation) {
	        this.render();
	        window.requestAnimationFrame(this._animation);
	      }
	    }
	  }, {
	    key: "startAnimation",
	    value: function startAnimation() {
	      if (!this.isAnimation) {
	        this.isAnimation = true;
	        window.requestAnimationFrame(this._animation);
	      }
	    }
	  }, {
	    key: "stopAnimation",
	    value: function stopAnimation() {
	      this.isAnimation = false;
	    }
	  }]);

	  return WebglLayer;
	}();

	var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport('splice');
	var USES_TO_LENGTH$3 = arrayMethodUsesToLength('splice', {
	  ACCESSORS: true,
	  0: 0,
	  1: 2
	});
	var max$3 = Math.max;
	var min$4 = Math.min;
	var MAX_SAFE_INTEGER$1 = 0x1FFFFFFFFFFFFF;
	var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded'; // `Array.prototype.splice` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.splice
	// with adding support of @@species

	_export({
	  target: 'Array',
	  proto: true,
	  forced: !HAS_SPECIES_SUPPORT$2 || !USES_TO_LENGTH$3
	}, {
	  splice: function splice(start, deleteCount
	  /* , ...items */
	  ) {
	    var O = toObject(this);
	    var len = toLength(O.length);
	    var actualStart = toAbsoluteIndex(start, len);
	    var argumentsLength = arguments.length;
	    var insertCount, actualDeleteCount, A, k, from, to;

	    if (argumentsLength === 0) {
	      insertCount = actualDeleteCount = 0;
	    } else if (argumentsLength === 1) {
	      insertCount = 0;
	      actualDeleteCount = len - actualStart;
	    } else {
	      insertCount = argumentsLength - 2;
	      actualDeleteCount = min$4(max$3(toInteger(deleteCount), 0), len - actualStart);
	    }

	    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER$1) {
	      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
	    }

	    A = arraySpeciesCreate(O, actualDeleteCount);

	    for (k = 0; k < actualDeleteCount; k++) {
	      from = actualStart + k;
	      if (from in O) createProperty(A, k, O[from]);
	    }

	    A.length = actualDeleteCount;

	    if (insertCount < actualDeleteCount) {
	      for (k = actualStart; k < len - actualDeleteCount; k++) {
	        from = k + actualDeleteCount;
	        to = k + insertCount;
	        if (from in O) O[to] = O[from];else delete O[to];
	      }

	      for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
	    } else if (insertCount > actualDeleteCount) {
	      for (k = len - actualDeleteCount; k > actualStart; k--) {
	        from = k + actualDeleteCount - 1;
	        to = k + insertCount - 1;
	        if (from in O) O[to] = O[from];else delete O[to];
	      }
	    }

	    for (k = 0; k < insertCount; k++) {
	      O[k + actualStart] = arguments[k + 2];
	    }

	    O.length = len - actualDeleteCount + insertCount;
	    return A;
	  }
	});

	function translateTransferOptions(transferOptions, layer) {
	  var pointOffset = layer.getPointOffset();
	  pointOffset[2] = pointOffset[2] || 0;
	  var projectionMatrix = transferOptions.projectionMatrix,
	      viewMatrix = transferOptions.viewMatrix;
	  var tViewMatrix = translate([], viewMatrix, pointOffset);
	  return _objectSpread2(_objectSpread2({}, transferOptions), {}, {
	    viewMatrix: tViewMatrix,
	    matrix: multiply([], projectionMatrix, tViewMatrix)
	  });
	}

	var LayerManager = /*#__PURE__*/function () {
	  function LayerManager(options) {
	    _classCallCheck(this, LayerManager);

	    this.layers = [];
	    this.options = options;
	    this.webglLayer = options.webglLayer;
	  }

	  _createClass(LayerManager, [{
	    key: "addLayer",
	    value: function addLayer(layer) {
	      var flag = false;

	      for (var i = 0; i < this.layers.length; i++) {
	        if (this.layers[i] === layer) {
	          flag = true;
	          break;
	        }
	      }

	      if (!flag) {
	        layer.map = this.webglLayer.map; // 设置webglLayer，进行预处理

	        layer.setWebglLayer(this.webglLayer); // 添加ThreeLayer（会公用一个ThreeLayer）

	        if ("threeLayer" === layer.layerType) {
	          var threeLayer = layer.getThreeLayer();
	          this.addLayer(threeLayer);
	        } // 图层公共初始化处理


	        layer.commonInitialize && layer.commonInitialize(this.webglLayer.gl);
	        layer.initialize && layer.initialize(this.webglLayer.gl);
	        layer.onOptionsChanged(layer.getOptions(), {});
	        layer.onDataChanged(layer.getData());
	        layer.onChanged(layer.getOptions(), layer.getData()); // 存入layer

	        this.layers.push(layer); // 开启或者停止动画

	        if (this.options.autoUpdate) {
	          this.isRequestAnimation() ? this.webglLayer.startAnimation() : this.webglLayer.stopAnimation();
	        }
	      }

	      this.webglLayer.render();
	    }
	  }, {
	    key: "removeLayer",
	    value: function removeLayer(layer) {
	      for (var i = 0; i < this.layers.length; i++) {
	        if (this.layers[i] === layer) {
	          layer.destroy && layer.destroy();
	          this.layers.splice(i, 1);
	        }
	      } // 开启或者停止动画


	      if (this.options.autoUpdate) {
	        this.isRequestAnimation() ? this.webglLayer.startAnimation() : this.webglLayer.stopAnimation();
	      }

	      this.webglLayer.render();
	    }
	  }, {
	    key: "removeAllLayers",
	    value: function removeAllLayers() {
	      for (var i = 0; i < this.layers.length; i++) {
	        var layer = this.layers[i];
	        layer.destroy && layer.destroy();
	        this.layers.splice(i, 1);
	      }

	      this.webglLayer.render();
	    }
	  }, {
	    key: "getAllLayers",
	    value: function getAllLayers() {
	      return this.layers;
	    }
	  }, {
	    key: "getAllThreeLayers",
	    value: function getAllThreeLayers() {
	      var threeLayers = [];

	      for (var i = 0; i < this.layers.length; i++) {
	        var layer = this.layers[i];
	        "ThreeLayer" === layer.layerType && threeLayers.push(layer);
	      }

	      return threeLayers;
	    }
	  }, {
	    key: "isRequestAnimation",
	    value: function isRequestAnimation() {
	      var flag = false;

	      for (var i = 0; i < this.layers.length; i++) {
	        if (this.layers[i].isRequestAnimation()) {
	          flag = true;
	          break;
	        }
	      }

	      return flag;
	    }
	  }, {
	    key: "beforeRender",
	    value: function beforeRender(transferOptions) {
	      transferOptions.gl && this.webglLayer.stateManager.save();
	    }
	  }, {
	    key: "afterRender",
	    value: function afterRender(transferOptions) {
	      transferOptions.gl && this.webglLayer.stateManager.restore();
	    }
	  }, {
	    key: "renderGLLayers",
	    value: function renderGLLayers(transferOptions) {
	      this.webglLayer.stateManager.save();
	      this.webglLayer.stateManager.setDefaultState();
	      var gl = transferOptions.gl;

	      for (var i = 0; i < this.layers.length; i++) {
	        var layer = this.layers[i];

	        if ("threeLayer" !== layer.layerType && "ThreeLayer" !== layer.layerType) {
	          this.beforeRender(transferOptions);
	          gl.enable(gl.DEPTH_TEST);
	          gl.depthFunc(gl.LEQUAL);
	          gl.enable(gl.POLYGON_OFFSET_FILL);
	          gl.polygonOffset(1, 1);
	          layer.render(translateTransferOptions(transferOptions, layer));
	          this.afterRender(transferOptions);
	        }
	      }

	      gl.unbindVAO();
	      this.webglLayer.stateManager.restore();
	    }
	  }, {
	    key: "renderThreeLayer",
	    value: function renderThreeLayer(transferOptions) {
	      for (var i = 0; i < this.layers.length; i++) {
	        var layer = this.layers[i];

	        if ("ThreeLayer" === layer.layerType) {
	          layer.render(transferOptions);
	        }
	      }
	    }
	  }, {
	    key: "renderThreeLayers",
	    value: function renderThreeLayers(transferOptions) {
	      for (var i = 0; i < this.layers.length; i++) {
	        var layer = this.layers[i];

	        if ("threeLayer" === layer.layerType) {
	          this.beforeRender(transferOptions);
	          layer.render(transferOptions, layer);
	          this.afterRender(transferOptions);
	        }
	      }
	    }
	  }, {
	    key: "onClick",
	    value: function onClick(point) {
	      for (var i = 0; i < this.layers.length; i++) {
	        var layer = this.layers[i];

	        if ("threeLayer" !== layer.layerType && "ThreeLayer" !== layer.layerType && layer.options.enablePicked && layer.options.onClick && layer.pick) {
	          var result = layer.pick(point.x, point.y);
	          layer.options.onClick(result, point);
	        }
	      }
	    }
	  }, {
	    key: "onDblClick",
	    value: function onDblClick(point) {
	      for (var i = 0; i < this.layers.length; i++) {
	        var layer = this.layers[i];

	        if ("threeLayer" !== layer.layerType && "ThreeLayer" !== layer.layerType && layer.options.enablePicked && layer.options.onDblClick && layer.pick) {
	          var result = layer.pick(point.x, point.y);
	          layer.options.onDblClick(result, point);
	        }
	      }
	    }
	  }, {
	    key: "onRightClick",
	    value: function onRightClick(point) {
	      for (var i = 0; i < this.layers.length; i++) {
	        var layer = this.layers[i];

	        if ("threeLayer" !== layer.layerType && "ThreeLayer" !== layer.layerType && layer.options.enablePicked && layer.options.onRightClick && layer.pick) {
	          var result = layer.pick(point.x, point.y);
	          layer.options.onRightClick(result, point);
	        }
	      }
	    }
	  }, {
	    key: "onMousemove",
	    value: function onMousemove(point) {
	      var flag = false;

	      for (var i = 0; i < this.layers.length; i++) {
	        var layer = this.layers[i];

	        if ("threeLayer" !== layer.layerType && "ThreeLayer" !== layer.layerType && layer.options.enablePicked && layer.pick) {
	          var result = layer.pick(point.x, point.y);
	          this.webglLayer.canvas.style.cursor = -1 === result.dataIndex ? "default" : "pointer";
	          this.webglLayer.canvas.style.pointerEvents = -1 === result.dataIndex ? "none" : "auto";
	          if (layer.options.onMousemove) layer.options.onMousemove(result, result);
	          layer.options.autoSelect && (flag = true);
	        }
	      }

	      flag && (this.webglLayer.isAnimation || this.webglLayer.render());
	    }
	  }]);

	  return LayerManager;
	}();

	var $indexOf = arrayIncludes.indexOf;
	var nativeIndexOf = [].indexOf;
	var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
	var STRICT_METHOD$1 = arrayMethodIsStrict('indexOf');
	var USES_TO_LENGTH$4 = arrayMethodUsesToLength('indexOf', {
	  ACCESSORS: true,
	  1: 0
	}); // `Array.prototype.indexOf` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.indexof

	_export({
	  target: 'Array',
	  proto: true,
	  forced: NEGATIVE_ZERO || !STRICT_METHOD$1 || !USES_TO_LENGTH$4
	}, {
	  indexOf: function indexOf(searchElement
	  /* , fromIndex = 0 */
	  ) {
	    return NEGATIVE_ZERO // convert -0 to +0
	    ? nativeIndexOf.apply(this, arguments) || 0 : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var EffectManager = /*#__PURE__*/function () {
	  function EffectManager(gl) {
	    _classCallCheck(this, EffectManager);

	    this.gl = gl;
	    this.effects = [];
	    this.initFbo();
	  }

	  _createClass(EffectManager, [{
	    key: "addEffect",
	    value: function addEffect(effect) {
	      this.effects.push(effect);
	    }
	  }, {
	    key: "removeEffect",
	    value: function removeEffect(effect) {
	      var eIndex = this.effects.indexOf(effect);

	      if (eIndex !== -1) {
	        this.effects.splice(eIndex, 1);
	      }
	    }
	  }, {
	    key: "setEffects",
	    value: function setEffects(effects) {
	      this.effects = effects;
	    }
	  }, {
	    key: "onResize",
	    value: function onResize() {
	      this.initFbo();
	      var gl = this.gl,
	          effects = this.effects;

	      if (effects && 1 < effects.length) {
	        for (var i = 1; i < effects.length; i++) {
	          var effect = effects[i];
	          effect.onResize && effect.onResize(gl);
	        }
	      }
	    }
	  }, {
	    key: "initFbo",
	    value: function initFbo() {
	      var gl = this.gl;
	      this.fbo = [new FrameBuffer(gl), new FrameBuffer(gl)];
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var gl = this.gl,
	          effects = this.effects;

	      if (effects && 0 < effects.length) {
	        var preFrameBuffer = {};

	        for (var i = 0; i < effects.length; i++) {
	          var buffer = this.fbo[i % 2].framebuffer;

	          if (i === effects.length - 1) {
	            buffer = null;
	          }

	          gl.bindFramebuffer(gl.FRAMEBUFFER, buffer);
	          gl.clearCanvas();
	          effects[i].render({
	            isPickRender: false,
	            gl: gl,
	            texture: preFrameBuffer.texture,
	            fbo: buffer
	          });
	          preFrameBuffer = buffer;
	        }
	      }
	    }
	  }]);

	  return EffectManager;
	}();

	/**
	 * @classdesc
	 * View是用于生成和map同步的cavans对象类，它是所有的图层增减的入口
	 *
	 * @param {Object} options
	 * @param {Object} options.map 同步用的地图对象
	 * @param {Boolean=} [options.autoUpdate=true] 是否开启自动更新
	 * @param {Array=} options.effects 后处理特效
	 *
	 * @example
	 * var view = new layergl.View({
	 *     map: layergl.map.getMapBoxGLMap(map),
	 *     autoUpdate: true,
	 *     effects: [new layergl.BloomEffect()]
	 * });
	 */

	var View = /*#__PURE__*/function () {
	  function View(options) {
	    _classCallCheck(this, View);

	    var self = this;
	    this.options = _objectSpread2({
	      autoUpdate: true
	    }, options); // 联合渲染对象（外部map）

	    this.webglLayer = new WebglLayer(options.map, this.options);
	    this.effectManager = new EffectManager(this.webglLayer.gl); // 图层管理器

	    this.layerManager = new LayerManager({
	      autoUpdate: this.options.autoUpdate,
	      webglLayer: this.webglLayer
	    });
	    this.webglRender = {
	      render: function render() {}
	    };

	    if (this.options.effects) {
	      this.effectManager.setEffects([this.webglRender].concat(this.options.effects));
	    } // effect resize


	    this.webglLayer.map.onResize(function () {
	      self.effectManager.onResize();
	    }); // 同步相关事件

	    this.webglLayer.onRender(function (evt) {
	      self._render(evt);
	    });

	    this.webglLayer.onClick = function (evt) {
	      self.layerManager.onClick(evt);
	    };

	    this.webglLayer.onDblClick = function (evt) {
	      self.layerManager.onDblClick(evt);
	    };

	    this.webglLayer.onRightClick = function (evt) {
	      self.layerManager.onRightClick(evt);
	    };

	    this.webglLayer.onMousemove = function (evt) {
	      self.layerManager.onMousemove(evt);
	    };
	  }
	  /**
	   * 渲染图层内容
	   * @private
	   * @param {*} transferOptions
	   */


	  _createClass(View, [{
	    key: "renderCanvas",
	    value: function renderCanvas(transferOptions) {
	      this.layerManager.renderThreeLayers(transferOptions);
	      this.layerManager.renderThreeLayer(transferOptions);
	      this.layerManager.renderGLLayers(transferOptions);
	    }
	    /**
	     * 主动调用的 render 接口
	     */

	  }, {
	    key: "render",
	    value: function render() {
	      this.webglLayer.render();
	    }
	    /**
	     * 渲染事件，包括增强器
	     * @private
	     * @param {Object} transferOptions
	     */

	  }, {
	    key: "_render",
	    value: function _render(transferOptions) {
	      var self = this,
	          effects = this.options.effects;

	      if (effects && effects.length > 0) {
	        this.webglRender.render = function () {
	          self.renderCanvas(transferOptions);
	        };

	        this.effectManager.render();
	      } else {
	        this.webglLayer.saveFramebuffer();
	        this.renderCanvas(transferOptions);
	        this.webglLayer.restoreFramebuffer();
	      }
	    }
	    /**
	     * 自定义渲染后事件
	     * @param {Function} func
	     */

	  }, {
	    key: "onRender",
	    value: function onRender(func) {
	      this.webglLayer.onRender(func);
	    }
	    /**
	     * 销毁 view 对象
	     */

	  }, {
	    key: "destroy",
	    value: function destroy() {
	      this.stopAnimation();
	      this.layerManager.removeAllLayers();
	      this.webglLayer.destroy();
	    }
	    /**
	     * 当前是否开启了动画模式
	     * @returns {Boolean}
	     */

	  }, {
	    key: "isRequestAnimation",
	    value: function isRequestAnimation() {
	      return this.layerManager.isRequestAnimation();
	    }
	    /**
	     * 开启动画模式
	     */

	  }, {
	    key: "startAnimation",
	    value: function startAnimation() {
	      this.webglLayer.startAnimation();
	    }
	    /**
	     * 关闭动画模式
	     */

	  }, {
	    key: "stopAnimation",
	    value: function stopAnimation() {
	      this.webglLayer.stopAnimation();
	    }
	    /**
	     * 添加图层
	     * @param {CommonLayer} layer
	     */

	  }, {
	    key: "addLayer",
	    value: function addLayer(layer) {
	      this.layerManager.addLayer(layer);
	    }
	    /**
	     * 移除图层
	     * @param {CommonLayer} layer
	     */

	  }, {
	    key: "removeLayer",
	    value: function removeLayer(layer) {
	      this.layerManager.removeLayer(layer);
	    }
	    /**
	     * 获取所有图层
	     * @returns {Array.<CommonLayer>}
	     */

	  }, {
	    key: "getAllLayers",
	    value: function getAllLayers() {
	      return this.layerManager.getAllLayers();
	    }
	    /**
	     * 获取所有使用Threejs实现的图层
	     * @returns {Array.<ThreeLayer>}
	     */

	  }, {
	    key: "getAllThreeLayers",
	    value: function getAllThreeLayers() {
	      return this.layerManager.getAllThreeLayers();
	    }
	  }]);

	  return View;
	}();

	var UNSCOPABLES = wellKnownSymbol('unscopables');
	var ArrayPrototype = Array.prototype; // Array.prototype[@@unscopables]
	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

	if (ArrayPrototype[UNSCOPABLES] == undefined) {
	  objectDefineProperty.f(ArrayPrototype, UNSCOPABLES, {
	    configurable: true,
	    value: objectCreate(null)
	  });
	} // add a key to Array.prototype[@@unscopables]


	var addToUnscopables = function (key) {
	  ArrayPrototype[UNSCOPABLES][key] = true;
	};

	var iterators = {};

	var correctPrototypeGetter = !fails(function () {
	  function F() {
	    /* empty */
	  }

	  F.prototype.constructor = null;
	  return Object.getPrototypeOf(new F()) !== F.prototype;
	});

	var IE_PROTO$1 = sharedKey('IE_PROTO');
	var ObjectPrototype = Object.prototype; // `Object.getPrototypeOf` method
	// https://tc39.github.io/ecma262/#sec-object.getprototypeof

	var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
	  O = toObject(O);
	  if (has(O, IE_PROTO$1)) return O[IE_PROTO$1];

	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  }

	  return O instanceof Object ? ObjectPrototype : null;
	};

	var ITERATOR = wellKnownSymbol('iterator');
	var BUGGY_SAFARI_ITERATORS = false;

	var returnThis = function () {
	  return this;
	}; // `%IteratorPrototype%` object
	// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object


	var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

	if ([].keys) {
	  arrayIterator = [].keys(); // Safari 8 has buggy iterators w/o `next`

	  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;else {
	    PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
	    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
	  }
	}

	if (IteratorPrototype == undefined) IteratorPrototype = {}; // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()

	if ( !has(IteratorPrototype, ITERATOR)) {
	  createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
	}

	var iteratorsCore = {
	  IteratorPrototype: IteratorPrototype,
	  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
	};

	var defineProperty$3 = objectDefineProperty.f;
	var TO_STRING_TAG = wellKnownSymbol('toStringTag');

	var setToStringTag = function (it, TAG, STATIC) {
	  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
	    defineProperty$3(it, TO_STRING_TAG, {
	      configurable: true,
	      value: TAG
	    });
	  }
	};

	var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;

	var returnThis$1 = function () {
	  return this;
	};

	var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
	  var TO_STRING_TAG = NAME + ' Iterator';
	  IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, {
	    next: createPropertyDescriptor(1, next)
	  });
	  setToStringTag(IteratorConstructor, TO_STRING_TAG, false);
	  iterators[TO_STRING_TAG] = returnThis$1;
	  return IteratorConstructor;
	};

	var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
	var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
	var ITERATOR$1 = wellKnownSymbol('iterator');
	var KEYS = 'keys';
	var VALUES = 'values';
	var ENTRIES = 'entries';

	var returnThis$2 = function () {
	  return this;
	};

	var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
	  createIteratorConstructor(IteratorConstructor, NAME, next);

	  var getIterationMethod = function (KIND) {
	    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
	    if (!BUGGY_SAFARI_ITERATORS$1 && KIND in IterablePrototype) return IterablePrototype[KIND];

	    switch (KIND) {
	      case KEYS:
	        return function keys() {
	          return new IteratorConstructor(this, KIND);
	        };

	      case VALUES:
	        return function values() {
	          return new IteratorConstructor(this, KIND);
	        };

	      case ENTRIES:
	        return function entries() {
	          return new IteratorConstructor(this, KIND);
	        };
	    }

	    return function () {
	      return new IteratorConstructor(this);
	    };
	  };

	  var TO_STRING_TAG = NAME + ' Iterator';
	  var INCORRECT_VALUES_NAME = false;
	  var IterablePrototype = Iterable.prototype;
	  var nativeIterator = IterablePrototype[ITERATOR$1] || IterablePrototype['@@iterator'] || DEFAULT && IterablePrototype[DEFAULT];
	  var defaultIterator = !BUGGY_SAFARI_ITERATORS$1 && nativeIterator || getIterationMethod(DEFAULT);
	  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
	  var CurrentIteratorPrototype, methods, KEY; // fix native

	  if (anyNativeIterator) {
	    CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));

	    if (IteratorPrototype$2 !== Object.prototype && CurrentIteratorPrototype.next) {
	      if ( objectGetPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype$2) {
	        if (objectSetPrototypeOf) {
	          objectSetPrototypeOf(CurrentIteratorPrototype, IteratorPrototype$2);
	        } else if (typeof CurrentIteratorPrototype[ITERATOR$1] != 'function') {
	          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR$1, returnThis$2);
	        }
	      } // Set @@toStringTag to native iterators


	      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
	    }
	  } // fix Array#{values, @@iterator}.name in V8 / FF


	  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
	    INCORRECT_VALUES_NAME = true;

	    defaultIterator = function values() {
	      return nativeIterator.call(this);
	    };
	  } // define iterator


	  if ( IterablePrototype[ITERATOR$1] !== defaultIterator) {
	    createNonEnumerableProperty(IterablePrototype, ITERATOR$1, defaultIterator);
	  }

	  iterators[NAME] = defaultIterator; // export additional methods

	  if (DEFAULT) {
	    methods = {
	      values: getIterationMethod(VALUES),
	      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
	      entries: getIterationMethod(ENTRIES)
	    };
	    if (FORCED) for (KEY in methods) {
	      if (BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
	        redefine(IterablePrototype, KEY, methods[KEY]);
	      }
	    } else _export({
	      target: NAME,
	      proto: true,
	      forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME
	    }, methods);
	  }

	  return methods;
	};

	var ARRAY_ITERATOR = 'Array Iterator';
	var setInternalState$1 = internalState.set;
	var getInternalState = internalState.getterFor(ARRAY_ITERATOR); // `Array.prototype.entries` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.entries
	// `Array.prototype.keys` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.keys
	// `Array.prototype.values` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.values
	// `Array.prototype[@@iterator]` method
	// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
	// `CreateArrayIterator` internal method
	// https://tc39.github.io/ecma262/#sec-createarrayiterator

	var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
	  setInternalState$1(this, {
	    type: ARRAY_ITERATOR,
	    target: toIndexedObject(iterated),
	    // target
	    index: 0,
	    // next index
	    kind: kind // kind

	  }); // `%ArrayIteratorPrototype%.next` method
	  // https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
	}, function () {
	  var state = getInternalState(this);
	  var target = state.target;
	  var kind = state.kind;
	  var index = state.index++;

	  if (!target || index >= target.length) {
	    state.target = undefined;
	    return {
	      value: undefined,
	      done: true
	    };
	  }

	  if (kind == 'keys') return {
	    value: index,
	    done: false
	  };
	  if (kind == 'values') return {
	    value: target[index],
	    done: false
	  };
	  return {
	    value: [index, target[index]],
	    done: false
	  };
	}, 'values'); // argumentsList[@@iterator] is %ArrayProto_values%
	// https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
	// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject

	iterators.Arguments = iterators.Array; // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

	var arrayBufferNative = typeof ArrayBuffer !== 'undefined' && typeof DataView !== 'undefined';

	var redefineAll = function (target, src, options) {
	  for (var key in src) redefine(target, key, src[key], options);

	  return target;
	};

	var anInstance = function (it, Constructor, name) {
	  if (!(it instanceof Constructor)) {
	    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
	  }

	  return it;
	};

	// https://tc39.github.io/ecma262/#sec-toindex

	var toIndex = function (it) {
	  if (it === undefined) return 0;
	  var number = toInteger(it);
	  var length = toLength(number);
	  if (number !== length) throw RangeError('Wrong length or index');
	  return length;
	};

	// IEEE754 conversions based on https://github.com/feross/ieee754
	// eslint-disable-next-line no-shadow-restricted-names
	var Infinity$1 = 1 / 0;
	var abs = Math.abs;
	var pow$1 = Math.pow;
	var floor$3 = Math.floor;
	var log$1 = Math.log;
	var LN2 = Math.LN2;

	var pack = function (number, mantissaLength, bytes) {
	  var buffer = new Array(bytes);
	  var exponentLength = bytes * 8 - mantissaLength - 1;
	  var eMax = (1 << exponentLength) - 1;
	  var eBias = eMax >> 1;
	  var rt = mantissaLength === 23 ? pow$1(2, -24) - pow$1(2, -77) : 0;
	  var sign = number < 0 || number === 0 && 1 / number < 0 ? 1 : 0;
	  var index = 0;
	  var exponent, mantissa, c;
	  number = abs(number); // eslint-disable-next-line no-self-compare

	  if (number != number || number === Infinity$1) {
	    // eslint-disable-next-line no-self-compare
	    mantissa = number != number ? 1 : 0;
	    exponent = eMax;
	  } else {
	    exponent = floor$3(log$1(number) / LN2);

	    if (number * (c = pow$1(2, -exponent)) < 1) {
	      exponent--;
	      c *= 2;
	    }

	    if (exponent + eBias >= 1) {
	      number += rt / c;
	    } else {
	      number += rt * pow$1(2, 1 - eBias);
	    }

	    if (number * c >= 2) {
	      exponent++;
	      c /= 2;
	    }

	    if (exponent + eBias >= eMax) {
	      mantissa = 0;
	      exponent = eMax;
	    } else if (exponent + eBias >= 1) {
	      mantissa = (number * c - 1) * pow$1(2, mantissaLength);
	      exponent = exponent + eBias;
	    } else {
	      mantissa = number * pow$1(2, eBias - 1) * pow$1(2, mantissaLength);
	      exponent = 0;
	    }
	  }

	  for (; mantissaLength >= 8; buffer[index++] = mantissa & 255, mantissa /= 256, mantissaLength -= 8);

	  exponent = exponent << mantissaLength | mantissa;
	  exponentLength += mantissaLength;

	  for (; exponentLength > 0; buffer[index++] = exponent & 255, exponent /= 256, exponentLength -= 8);

	  buffer[--index] |= sign * 128;
	  return buffer;
	};

	var unpack = function (buffer, mantissaLength) {
	  var bytes = buffer.length;
	  var exponentLength = bytes * 8 - mantissaLength - 1;
	  var eMax = (1 << exponentLength) - 1;
	  var eBias = eMax >> 1;
	  var nBits = exponentLength - 7;
	  var index = bytes - 1;
	  var sign = buffer[index--];
	  var exponent = sign & 127;
	  var mantissa;
	  sign >>= 7;

	  for (; nBits > 0; exponent = exponent * 256 + buffer[index], index--, nBits -= 8);

	  mantissa = exponent & (1 << -nBits) - 1;
	  exponent >>= -nBits;
	  nBits += mantissaLength;

	  for (; nBits > 0; mantissa = mantissa * 256 + buffer[index], index--, nBits -= 8);

	  if (exponent === 0) {
	    exponent = 1 - eBias;
	  } else if (exponent === eMax) {
	    return mantissa ? NaN : sign ? -Infinity$1 : Infinity$1;
	  } else {
	    mantissa = mantissa + pow$1(2, mantissaLength);
	    exponent = exponent - eBias;
	  }

	  return (sign ? -1 : 1) * mantissa * pow$1(2, exponent - mantissaLength);
	};

	var ieee754 = {
	  pack: pack,
	  unpack: unpack
	};

	// https://tc39.github.io/ecma262/#sec-array.prototype.fill


	var arrayFill = function fill(value
	/* , start = 0, end = @length */
	) {
	  var O = toObject(this);
	  var length = toLength(O.length);
	  var argumentsLength = arguments.length;
	  var index = toAbsoluteIndex(argumentsLength > 1 ? arguments[1] : undefined, length);
	  var end = argumentsLength > 2 ? arguments[2] : undefined;
	  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);

	  while (endPos > index) O[index++] = value;

	  return O;
	};

	var getOwnPropertyNames$2 = objectGetOwnPropertyNames.f;
	var defineProperty$4 = objectDefineProperty.f;
	var getInternalState$1 = internalState.get;
	var setInternalState$2 = internalState.set;
	var ARRAY_BUFFER = 'ArrayBuffer';
	var DATA_VIEW = 'DataView';
	var PROTOTYPE$1 = 'prototype';
	var WRONG_LENGTH = 'Wrong length';
	var WRONG_INDEX = 'Wrong index';
	var NativeArrayBuffer = global_1[ARRAY_BUFFER];
	var $ArrayBuffer = NativeArrayBuffer;
	var $DataView = global_1[DATA_VIEW];
	var $DataViewPrototype = $DataView && $DataView[PROTOTYPE$1];
	var ObjectPrototype$1 = Object.prototype;
	var RangeError$1 = global_1.RangeError;
	var packIEEE754 = ieee754.pack;
	var unpackIEEE754 = ieee754.unpack;

	var packInt8 = function (number) {
	  return [number & 0xFF];
	};

	var packInt16 = function (number) {
	  return [number & 0xFF, number >> 8 & 0xFF];
	};

	var packInt32 = function (number) {
	  return [number & 0xFF, number >> 8 & 0xFF, number >> 16 & 0xFF, number >> 24 & 0xFF];
	};

	var unpackInt32 = function (buffer) {
	  return buffer[3] << 24 | buffer[2] << 16 | buffer[1] << 8 | buffer[0];
	};

	var packFloat32 = function (number) {
	  return packIEEE754(number, 23, 4);
	};

	var packFloat64 = function (number) {
	  return packIEEE754(number, 52, 8);
	};

	var addGetter = function (Constructor, key) {
	  defineProperty$4(Constructor[PROTOTYPE$1], key, {
	    get: function () {
	      return getInternalState$1(this)[key];
	    }
	  });
	};

	var get$1 = function (view, count, index, isLittleEndian) {
	  var intIndex = toIndex(index);
	  var store = getInternalState$1(view);
	  if (intIndex + count > store.byteLength) throw RangeError$1(WRONG_INDEX);
	  var bytes = getInternalState$1(store.buffer).bytes;
	  var start = intIndex + store.byteOffset;
	  var pack = bytes.slice(start, start + count);
	  return isLittleEndian ? pack : pack.reverse();
	};

	var set$2 = function (view, count, index, conversion, value, isLittleEndian) {
	  var intIndex = toIndex(index);
	  var store = getInternalState$1(view);
	  if (intIndex + count > store.byteLength) throw RangeError$1(WRONG_INDEX);
	  var bytes = getInternalState$1(store.buffer).bytes;
	  var start = intIndex + store.byteOffset;
	  var pack = conversion(+value);

	  for (var i = 0; i < count; i++) bytes[start + i] = pack[isLittleEndian ? i : count - i - 1];
	};

	if (!arrayBufferNative) {
	  $ArrayBuffer = function ArrayBuffer(length) {
	    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
	    var byteLength = toIndex(length);
	    setInternalState$2(this, {
	      bytes: arrayFill.call(new Array(byteLength), 0),
	      byteLength: byteLength
	    });
	    if (!descriptors) this.byteLength = byteLength;
	  };

	  $DataView = function DataView(buffer, byteOffset, byteLength) {
	    anInstance(this, $DataView, DATA_VIEW);
	    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
	    var bufferLength = getInternalState$1(buffer).byteLength;
	    var offset = toInteger(byteOffset);
	    if (offset < 0 || offset > bufferLength) throw RangeError$1('Wrong offset');
	    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
	    if (offset + byteLength > bufferLength) throw RangeError$1(WRONG_LENGTH);
	    setInternalState$2(this, {
	      buffer: buffer,
	      byteLength: byteLength,
	      byteOffset: offset
	    });

	    if (!descriptors) {
	      this.buffer = buffer;
	      this.byteLength = byteLength;
	      this.byteOffset = offset;
	    }
	  };

	  if (descriptors) {
	    addGetter($ArrayBuffer, 'byteLength');
	    addGetter($DataView, 'buffer');
	    addGetter($DataView, 'byteLength');
	    addGetter($DataView, 'byteOffset');
	  }

	  redefineAll($DataView[PROTOTYPE$1], {
	    getInt8: function getInt8(byteOffset) {
	      return get$1(this, 1, byteOffset)[0] << 24 >> 24;
	    },
	    getUint8: function getUint8(byteOffset) {
	      return get$1(this, 1, byteOffset)[0];
	    },
	    getInt16: function getInt16(byteOffset
	    /* , littleEndian */
	    ) {
	      var bytes = get$1(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
	      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
	    },
	    getUint16: function getUint16(byteOffset
	    /* , littleEndian */
	    ) {
	      var bytes = get$1(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
	      return bytes[1] << 8 | bytes[0];
	    },
	    getInt32: function getInt32(byteOffset
	    /* , littleEndian */
	    ) {
	      return unpackInt32(get$1(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined));
	    },
	    getUint32: function getUint32(byteOffset
	    /* , littleEndian */
	    ) {
	      return unpackInt32(get$1(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined)) >>> 0;
	    },
	    getFloat32: function getFloat32(byteOffset
	    /* , littleEndian */
	    ) {
	      return unpackIEEE754(get$1(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 23);
	    },
	    getFloat64: function getFloat64(byteOffset
	    /* , littleEndian */
	    ) {
	      return unpackIEEE754(get$1(this, 8, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 52);
	    },
	    setInt8: function setInt8(byteOffset, value) {
	      set$2(this, 1, byteOffset, packInt8, value);
	    },
	    setUint8: function setUint8(byteOffset, value) {
	      set$2(this, 1, byteOffset, packInt8, value);
	    },
	    setInt16: function setInt16(byteOffset, value
	    /* , littleEndian */
	    ) {
	      set$2(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
	    },
	    setUint16: function setUint16(byteOffset, value
	    /* , littleEndian */
	    ) {
	      set$2(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
	    },
	    setInt32: function setInt32(byteOffset, value
	    /* , littleEndian */
	    ) {
	      set$2(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
	    },
	    setUint32: function setUint32(byteOffset, value
	    /* , littleEndian */
	    ) {
	      set$2(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
	    },
	    setFloat32: function setFloat32(byteOffset, value
	    /* , littleEndian */
	    ) {
	      set$2(this, 4, byteOffset, packFloat32, value, arguments.length > 2 ? arguments[2] : undefined);
	    },
	    setFloat64: function setFloat64(byteOffset, value
	    /* , littleEndian */
	    ) {
	      set$2(this, 8, byteOffset, packFloat64, value, arguments.length > 2 ? arguments[2] : undefined);
	    }
	  });
	} else {
	  if (!fails(function () {
	    NativeArrayBuffer(1);
	  }) || !fails(function () {
	    new NativeArrayBuffer(-1); // eslint-disable-line no-new
	  }) || fails(function () {
	    new NativeArrayBuffer(); // eslint-disable-line no-new

	    new NativeArrayBuffer(1.5); // eslint-disable-line no-new

	    new NativeArrayBuffer(NaN); // eslint-disable-line no-new

	    return NativeArrayBuffer.name != ARRAY_BUFFER;
	  })) {
	    $ArrayBuffer = function ArrayBuffer(length) {
	      anInstance(this, $ArrayBuffer);
	      return new NativeArrayBuffer(toIndex(length));
	    };

	    var ArrayBufferPrototype = $ArrayBuffer[PROTOTYPE$1] = NativeArrayBuffer[PROTOTYPE$1];

	    for (var keys$3 = getOwnPropertyNames$2(NativeArrayBuffer), j$1 = 0, key$1; keys$3.length > j$1;) {
	      if (!((key$1 = keys$3[j$1++]) in $ArrayBuffer)) {
	        createNonEnumerableProperty($ArrayBuffer, key$1, NativeArrayBuffer[key$1]);
	      }
	    }

	    ArrayBufferPrototype.constructor = $ArrayBuffer;
	  } // WebKit bug - the same parent prototype for typed arrays and data view


	  if (objectSetPrototypeOf && objectGetPrototypeOf($DataViewPrototype) !== ObjectPrototype$1) {
	    objectSetPrototypeOf($DataViewPrototype, ObjectPrototype$1);
	  } // iOS Safari 7.x bug


	  var testView = new $DataView(new $ArrayBuffer(2));
	  var nativeSetInt8 = $DataViewPrototype.setInt8;
	  testView.setInt8(0, 2147483648);
	  testView.setInt8(1, 2147483649);
	  if (testView.getInt8(0) || !testView.getInt8(1)) redefineAll($DataViewPrototype, {
	    setInt8: function setInt8(byteOffset, value) {
	      nativeSetInt8.call(this, byteOffset, value << 24 >> 24);
	    },
	    setUint8: function setUint8(byteOffset, value) {
	      nativeSetInt8.call(this, byteOffset, value << 24 >> 24);
	    }
	  }, {
	    unsafe: true
	  });
	}

	setToStringTag($ArrayBuffer, ARRAY_BUFFER);
	setToStringTag($DataView, DATA_VIEW);
	var arrayBuffer = {
	  ArrayBuffer: $ArrayBuffer,
	  DataView: $DataView
	};

	var ArrayBuffer$1 = arrayBuffer.ArrayBuffer;
	var DataView$1 = arrayBuffer.DataView;
	var nativeArrayBufferSlice = ArrayBuffer$1.prototype.slice;
	var INCORRECT_SLICE = fails(function () {
	  return !new ArrayBuffer$1(2).slice(1, undefined).byteLength;
	}); // `ArrayBuffer.prototype.slice` method
	// https://tc39.github.io/ecma262/#sec-arraybuffer.prototype.slice

	_export({
	  target: 'ArrayBuffer',
	  proto: true,
	  unsafe: true,
	  forced: INCORRECT_SLICE
	}, {
	  slice: function slice(start, end) {
	    if (nativeArrayBufferSlice !== undefined && end === undefined) {
	      return nativeArrayBufferSlice.call(anObject(this), start); // FF fix
	    }

	    var length = anObject(this).byteLength;
	    var first = toAbsoluteIndex(start, length);
	    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
	    var result = new (speciesConstructor(this, ArrayBuffer$1))(toLength(fin - first));
	    var viewSource = new DataView$1(this);
	    var viewTarget = new DataView$1(result);
	    var index = 0;

	    while (first < fin) {
	      viewTarget.setUint8(index++, viewSource.getUint8(first++));
	    }

	    return result;
	  }
	});

	var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
	var test = {};
	test[TO_STRING_TAG$1] = 'z';
	var toStringTagSupport = String(test) === '[object z]';

	var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag'); // ES3 wrong here

	var CORRECT_ARGUMENTS = classofRaw(function () {
	  return arguments;
	}()) == 'Arguments'; // fallback for IE11 Script Access Denied error

	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) {
	    /* empty */
	  }
	}; // getting tag from ES6+ `Object.prototype.toString`


	var classof = toStringTagSupport ? classofRaw : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
	  : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$2)) == 'string' ? tag // builtinTag case
	  : CORRECT_ARGUMENTS ? classofRaw(O) // ES3 arguments fallback
	  : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
	};

	// https://tc39.github.io/ecma262/#sec-object.prototype.tostring


	var objectToString = toStringTagSupport ? {}.toString : function toString() {
	  return '[object ' + classof(this) + ']';
	};

	// https://tc39.github.io/ecma262/#sec-object.prototype.tostring

	if (!toStringTagSupport) {
	  redefine(Object.prototype, 'toString', objectToString, {
	    unsafe: true
	  });
	}

	var ITERATOR$2 = wellKnownSymbol('iterator');
	var SAFE_CLOSING = false;

	try {
	  var called = 0;
	  var iteratorWithReturn = {
	    next: function () {
	      return {
	        done: !!called++
	      };
	    },
	    'return': function () {
	      SAFE_CLOSING = true;
	    }
	  };

	  iteratorWithReturn[ITERATOR$2] = function () {
	    return this;
	  }; // eslint-disable-next-line no-throw-literal


	  Array.from(iteratorWithReturn, function () {
	    throw 2;
	  });
	} catch (error) {
	  /* empty */
	}

	var checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
	  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
	  var ITERATION_SUPPORT = false;

	  try {
	    var object = {};

	    object[ITERATOR$2] = function () {
	      return {
	        next: function () {
	          return {
	            done: ITERATION_SUPPORT = true
	          };
	        }
	      };
	    };

	    exec(object);
	  } catch (error) {
	    /* empty */
	  }

	  return ITERATION_SUPPORT;
	};

	var defineProperty$5 = objectDefineProperty.f;
	var Int8Array$1 = global_1.Int8Array;
	var Int8ArrayPrototype = Int8Array$1 && Int8Array$1.prototype;
	var Uint8ClampedArray = global_1.Uint8ClampedArray;
	var Uint8ClampedArrayPrototype = Uint8ClampedArray && Uint8ClampedArray.prototype;
	var TypedArray = Int8Array$1 && objectGetPrototypeOf(Int8Array$1);
	var TypedArrayPrototype = Int8ArrayPrototype && objectGetPrototypeOf(Int8ArrayPrototype);
	var ObjectPrototype$2 = Object.prototype;
	var isPrototypeOf = ObjectPrototype$2.isPrototypeOf;
	var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');
	var TYPED_ARRAY_TAG = uid('TYPED_ARRAY_TAG'); // Fixing native typed arrays in Opera Presto crashes the browser, see #595

	var NATIVE_ARRAY_BUFFER_VIEWS = arrayBufferNative && !!objectSetPrototypeOf && classof(global_1.opera) !== 'Opera';
	var TYPED_ARRAY_TAG_REQIRED = false;
	var NAME;
	var TypedArrayConstructorsList = {
	  Int8Array: 1,
	  Uint8Array: 1,
	  Uint8ClampedArray: 1,
	  Int16Array: 2,
	  Uint16Array: 2,
	  Int32Array: 4,
	  Uint32Array: 4,
	  Float32Array: 4,
	  Float64Array: 8
	};

	var isView = function isView(it) {
	  var klass = classof(it);
	  return klass === 'DataView' || has(TypedArrayConstructorsList, klass);
	};

	var isTypedArray = function (it) {
	  return isObject(it) && has(TypedArrayConstructorsList, classof(it));
	};

	var aTypedArray = function (it) {
	  if (isTypedArray(it)) return it;
	  throw TypeError('Target is not a typed array');
	};

	var aTypedArrayConstructor = function (C) {
	  if (objectSetPrototypeOf) {
	    if (isPrototypeOf.call(TypedArray, C)) return C;
	  } else for (var ARRAY in TypedArrayConstructorsList) if (has(TypedArrayConstructorsList, NAME)) {
	    var TypedArrayConstructor = global_1[ARRAY];

	    if (TypedArrayConstructor && (C === TypedArrayConstructor || isPrototypeOf.call(TypedArrayConstructor, C))) {
	      return C;
	    }
	  }

	  throw TypeError('Target is not a typed array constructor');
	};

	var exportTypedArrayMethod = function (KEY, property, forced) {
	  if (!descriptors) return;
	  if (forced) for (var ARRAY in TypedArrayConstructorsList) {
	    var TypedArrayConstructor = global_1[ARRAY];

	    if (TypedArrayConstructor && has(TypedArrayConstructor.prototype, KEY)) {
	      delete TypedArrayConstructor.prototype[KEY];
	    }
	  }

	  if (!TypedArrayPrototype[KEY] || forced) {
	    redefine(TypedArrayPrototype, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS && Int8ArrayPrototype[KEY] || property);
	  }
	};

	var exportTypedArrayStaticMethod = function (KEY, property, forced) {
	  var ARRAY, TypedArrayConstructor;
	  if (!descriptors) return;

	  if (objectSetPrototypeOf) {
	    if (forced) for (ARRAY in TypedArrayConstructorsList) {
	      TypedArrayConstructor = global_1[ARRAY];

	      if (TypedArrayConstructor && has(TypedArrayConstructor, KEY)) {
	        delete TypedArrayConstructor[KEY];
	      }
	    }

	    if (!TypedArray[KEY] || forced) {
	      // V8 ~ Chrome 49-50 `%TypedArray%` methods are non-writable non-configurable
	      try {
	        return redefine(TypedArray, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS && Int8Array$1[KEY] || property);
	      } catch (error) {
	        /* empty */
	      }
	    } else return;
	  }

	  for (ARRAY in TypedArrayConstructorsList) {
	    TypedArrayConstructor = global_1[ARRAY];

	    if (TypedArrayConstructor && (!TypedArrayConstructor[KEY] || forced)) {
	      redefine(TypedArrayConstructor, KEY, property);
	    }
	  }
	};

	for (NAME in TypedArrayConstructorsList) {
	  if (!global_1[NAME]) NATIVE_ARRAY_BUFFER_VIEWS = false;
	} // WebKit bug - typed arrays constructors prototype is Object.prototype


	if (!NATIVE_ARRAY_BUFFER_VIEWS || typeof TypedArray != 'function' || TypedArray === Function.prototype) {
	  // eslint-disable-next-line no-shadow
	  TypedArray = function TypedArray() {
	    throw TypeError('Incorrect invocation');
	  };

	  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
	    if (global_1[NAME]) objectSetPrototypeOf(global_1[NAME], TypedArray);
	  }
	}

	if (!NATIVE_ARRAY_BUFFER_VIEWS || !TypedArrayPrototype || TypedArrayPrototype === ObjectPrototype$2) {
	  TypedArrayPrototype = TypedArray.prototype;
	  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
	    if (global_1[NAME]) objectSetPrototypeOf(global_1[NAME].prototype, TypedArrayPrototype);
	  }
	} // WebKit bug - one more object in Uint8ClampedArray prototype chain


	if (NATIVE_ARRAY_BUFFER_VIEWS && objectGetPrototypeOf(Uint8ClampedArrayPrototype) !== TypedArrayPrototype) {
	  objectSetPrototypeOf(Uint8ClampedArrayPrototype, TypedArrayPrototype);
	}

	if (descriptors && !has(TypedArrayPrototype, TO_STRING_TAG$3)) {
	  TYPED_ARRAY_TAG_REQIRED = true;
	  defineProperty$5(TypedArrayPrototype, TO_STRING_TAG$3, {
	    get: function () {
	      return isObject(this) ? this[TYPED_ARRAY_TAG] : undefined;
	    }
	  });

	  for (NAME in TypedArrayConstructorsList) if (global_1[NAME]) {
	    createNonEnumerableProperty(global_1[NAME], TYPED_ARRAY_TAG, NAME);
	  }
	}

	var arrayBufferViewCore = {
	  NATIVE_ARRAY_BUFFER_VIEWS: NATIVE_ARRAY_BUFFER_VIEWS,
	  TYPED_ARRAY_TAG: TYPED_ARRAY_TAG_REQIRED && TYPED_ARRAY_TAG,
	  aTypedArray: aTypedArray,
	  aTypedArrayConstructor: aTypedArrayConstructor,
	  exportTypedArrayMethod: exportTypedArrayMethod,
	  exportTypedArrayStaticMethod: exportTypedArrayStaticMethod,
	  isView: isView,
	  isTypedArray: isTypedArray,
	  TypedArray: TypedArray,
	  TypedArrayPrototype: TypedArrayPrototype
	};

	/* eslint-disable no-new */

	var NATIVE_ARRAY_BUFFER_VIEWS$1 = arrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;
	var ArrayBuffer$2 = global_1.ArrayBuffer;
	var Int8Array$2 = global_1.Int8Array;
	var typedArrayConstructorsRequireWrappers = !NATIVE_ARRAY_BUFFER_VIEWS$1 || !fails(function () {
	  Int8Array$2(1);
	}) || !fails(function () {
	  new Int8Array$2(-1);
	}) || !checkCorrectnessOfIteration(function (iterable) {
	  new Int8Array$2();
	  new Int8Array$2(null);
	  new Int8Array$2(1.5);
	  new Int8Array$2(iterable);
	}, true) || fails(function () {
	  // Safari (11+) bug - a reason why even Safari 13 should load a typed array polyfill
	  return new Int8Array$2(new ArrayBuffer$2(2), 1, undefined).length !== 1;
	});

	var toPositiveInteger = function (it) {
	  var result = toInteger(it);
	  if (result < 0) throw RangeError("The argument can't be less than 0");
	  return result;
	};

	var toOffset = function (it, BYTES) {
	  var offset = toPositiveInteger(it);
	  if (offset % BYTES) throw RangeError('Wrong offset');
	  return offset;
	};

	var ITERATOR$3 = wellKnownSymbol('iterator');

	var getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR$3] || it['@@iterator'] || iterators[classof(it)];
	};

	var ITERATOR$4 = wellKnownSymbol('iterator');
	var ArrayPrototype$1 = Array.prototype; // check on default Array iterator

	var isArrayIteratorMethod = function (it) {
	  return it !== undefined && (iterators.Array === it || ArrayPrototype$1[ITERATOR$4] === it);
	};

	var aTypedArrayConstructor$1 = arrayBufferViewCore.aTypedArrayConstructor;

	var typedArrayFrom = function from(source
	/* , mapfn, thisArg */
	) {
	  var O = toObject(source);
	  var argumentsLength = arguments.length;
	  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
	  var mapping = mapfn !== undefined;
	  var iteratorMethod = getIteratorMethod(O);
	  var i, length, result, step, iterator, next;

	  if (iteratorMethod != undefined && !isArrayIteratorMethod(iteratorMethod)) {
	    iterator = iteratorMethod.call(O);
	    next = iterator.next;
	    O = [];

	    while (!(step = next.call(iterator)).done) {
	      O.push(step.value);
	    }
	  }

	  if (mapping && argumentsLength > 2) {
	    mapfn = functionBindContext(mapfn, arguments[2], 2);
	  }

	  length = toLength(O.length);
	  result = new (aTypedArrayConstructor$1(this))(length);

	  for (i = 0; length > i; i++) {
	    result[i] = mapping ? mapfn(O[i], i) : O[i];
	  }

	  return result;
	};

	var typedArrayConstructor = createCommonjsModule(function (module) {

	  var getOwnPropertyNames = objectGetOwnPropertyNames.f;
	  var forEach = arrayIteration.forEach;
	  var getInternalState = internalState.get;
	  var setInternalState = internalState.set;
	  var nativeDefineProperty = objectDefineProperty.f;
	  var nativeGetOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	  var round = Math.round;
	  var RangeError = global_1.RangeError;
	  var ArrayBuffer = arrayBuffer.ArrayBuffer;
	  var DataView = arrayBuffer.DataView;
	  var NATIVE_ARRAY_BUFFER_VIEWS = arrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;
	  var TYPED_ARRAY_TAG = arrayBufferViewCore.TYPED_ARRAY_TAG;
	  var TypedArray = arrayBufferViewCore.TypedArray;
	  var TypedArrayPrototype = arrayBufferViewCore.TypedArrayPrototype;
	  var aTypedArrayConstructor = arrayBufferViewCore.aTypedArrayConstructor;
	  var isTypedArray = arrayBufferViewCore.isTypedArray;
	  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
	  var WRONG_LENGTH = 'Wrong length';

	  var fromList = function (C, list) {
	    var index = 0;
	    var length = list.length;
	    var result = new (aTypedArrayConstructor(C))(length);

	    while (length > index) result[index] = list[index++];

	    return result;
	  };

	  var addGetter = function (it, key) {
	    nativeDefineProperty(it, key, {
	      get: function () {
	        return getInternalState(this)[key];
	      }
	    });
	  };

	  var isArrayBuffer = function (it) {
	    var klass;
	    return it instanceof ArrayBuffer || (klass = classof(it)) == 'ArrayBuffer' || klass == 'SharedArrayBuffer';
	  };

	  var isTypedArrayIndex = function (target, key) {
	    return isTypedArray(target) && typeof key != 'symbol' && key in target && String(+key) == String(key);
	  };

	  var wrappedGetOwnPropertyDescriptor = function getOwnPropertyDescriptor(target, key) {
	    return isTypedArrayIndex(target, key = toPrimitive(key, true)) ? createPropertyDescriptor(2, target[key]) : nativeGetOwnPropertyDescriptor(target, key);
	  };

	  var wrappedDefineProperty = function defineProperty(target, key, descriptor) {
	    if (isTypedArrayIndex(target, key = toPrimitive(key, true)) && isObject(descriptor) && has(descriptor, 'value') && !has(descriptor, 'get') && !has(descriptor, 'set') // TODO: add validation descriptor w/o calling accessors
	    && !descriptor.configurable && (!has(descriptor, 'writable') || descriptor.writable) && (!has(descriptor, 'enumerable') || descriptor.enumerable)) {
	      target[key] = descriptor.value;
	      return target;
	    }

	    return nativeDefineProperty(target, key, descriptor);
	  };

	  if (descriptors) {
	    if (!NATIVE_ARRAY_BUFFER_VIEWS) {
	      objectGetOwnPropertyDescriptor.f = wrappedGetOwnPropertyDescriptor;
	      objectDefineProperty.f = wrappedDefineProperty;
	      addGetter(TypedArrayPrototype, 'buffer');
	      addGetter(TypedArrayPrototype, 'byteOffset');
	      addGetter(TypedArrayPrototype, 'byteLength');
	      addGetter(TypedArrayPrototype, 'length');
	    }

	    _export({
	      target: 'Object',
	      stat: true,
	      forced: !NATIVE_ARRAY_BUFFER_VIEWS
	    }, {
	      getOwnPropertyDescriptor: wrappedGetOwnPropertyDescriptor,
	      defineProperty: wrappedDefineProperty
	    });

	    module.exports = function (TYPE, wrapper, CLAMPED) {
	      var BYTES = TYPE.match(/\d+$/)[0] / 8;
	      var CONSTRUCTOR_NAME = TYPE + (CLAMPED ? 'Clamped' : '') + 'Array';
	      var GETTER = 'get' + TYPE;
	      var SETTER = 'set' + TYPE;
	      var NativeTypedArrayConstructor = global_1[CONSTRUCTOR_NAME];
	      var TypedArrayConstructor = NativeTypedArrayConstructor;
	      var TypedArrayConstructorPrototype = TypedArrayConstructor && TypedArrayConstructor.prototype;
	      var exported = {};

	      var getter = function (that, index) {
	        var data = getInternalState(that);
	        return data.view[GETTER](index * BYTES + data.byteOffset, true);
	      };

	      var setter = function (that, index, value) {
	        var data = getInternalState(that);
	        if (CLAMPED) value = (value = round(value)) < 0 ? 0 : value > 0xFF ? 0xFF : value & 0xFF;
	        data.view[SETTER](index * BYTES + data.byteOffset, value, true);
	      };

	      var addElement = function (that, index) {
	        nativeDefineProperty(that, index, {
	          get: function () {
	            return getter(this, index);
	          },
	          set: function (value) {
	            return setter(this, index, value);
	          },
	          enumerable: true
	        });
	      };

	      if (!NATIVE_ARRAY_BUFFER_VIEWS) {
	        TypedArrayConstructor = wrapper(function (that, data, offset, $length) {
	          anInstance(that, TypedArrayConstructor, CONSTRUCTOR_NAME);
	          var index = 0;
	          var byteOffset = 0;
	          var buffer, byteLength, length;

	          if (!isObject(data)) {
	            length = toIndex(data);
	            byteLength = length * BYTES;
	            buffer = new ArrayBuffer(byteLength);
	          } else if (isArrayBuffer(data)) {
	            buffer = data;
	            byteOffset = toOffset(offset, BYTES);
	            var $len = data.byteLength;

	            if ($length === undefined) {
	              if ($len % BYTES) throw RangeError(WRONG_LENGTH);
	              byteLength = $len - byteOffset;
	              if (byteLength < 0) throw RangeError(WRONG_LENGTH);
	            } else {
	              byteLength = toLength($length) * BYTES;
	              if (byteLength + byteOffset > $len) throw RangeError(WRONG_LENGTH);
	            }

	            length = byteLength / BYTES;
	          } else if (isTypedArray(data)) {
	            return fromList(TypedArrayConstructor, data);
	          } else {
	            return typedArrayFrom.call(TypedArrayConstructor, data);
	          }

	          setInternalState(that, {
	            buffer: buffer,
	            byteOffset: byteOffset,
	            byteLength: byteLength,
	            length: length,
	            view: new DataView(buffer)
	          });

	          while (index < length) addElement(that, index++);
	        });
	        if (objectSetPrototypeOf) objectSetPrototypeOf(TypedArrayConstructor, TypedArray);
	        TypedArrayConstructorPrototype = TypedArrayConstructor.prototype = objectCreate(TypedArrayPrototype);
	      } else if (typedArrayConstructorsRequireWrappers) {
	        TypedArrayConstructor = wrapper(function (dummy, data, typedArrayOffset, $length) {
	          anInstance(dummy, TypedArrayConstructor, CONSTRUCTOR_NAME);
	          return inheritIfRequired(function () {
	            if (!isObject(data)) return new NativeTypedArrayConstructor(toIndex(data));
	            if (isArrayBuffer(data)) return $length !== undefined ? new NativeTypedArrayConstructor(data, toOffset(typedArrayOffset, BYTES), $length) : typedArrayOffset !== undefined ? new NativeTypedArrayConstructor(data, toOffset(typedArrayOffset, BYTES)) : new NativeTypedArrayConstructor(data);
	            if (isTypedArray(data)) return fromList(TypedArrayConstructor, data);
	            return typedArrayFrom.call(TypedArrayConstructor, data);
	          }(), dummy, TypedArrayConstructor);
	        });
	        if (objectSetPrototypeOf) objectSetPrototypeOf(TypedArrayConstructor, TypedArray);
	        forEach(getOwnPropertyNames(NativeTypedArrayConstructor), function (key) {
	          if (!(key in TypedArrayConstructor)) {
	            createNonEnumerableProperty(TypedArrayConstructor, key, NativeTypedArrayConstructor[key]);
	          }
	        });
	        TypedArrayConstructor.prototype = TypedArrayConstructorPrototype;
	      }

	      if (TypedArrayConstructorPrototype.constructor !== TypedArrayConstructor) {
	        createNonEnumerableProperty(TypedArrayConstructorPrototype, 'constructor', TypedArrayConstructor);
	      }

	      if (TYPED_ARRAY_TAG) {
	        createNonEnumerableProperty(TypedArrayConstructorPrototype, TYPED_ARRAY_TAG, CONSTRUCTOR_NAME);
	      }

	      exported[CONSTRUCTOR_NAME] = TypedArrayConstructor;
	      _export({
	        global: true,
	        forced: TypedArrayConstructor != NativeTypedArrayConstructor,
	        sham: !NATIVE_ARRAY_BUFFER_VIEWS
	      }, exported);

	      if (!(BYTES_PER_ELEMENT in TypedArrayConstructor)) {
	        createNonEnumerableProperty(TypedArrayConstructor, BYTES_PER_ELEMENT, BYTES);
	      }

	      if (!(BYTES_PER_ELEMENT in TypedArrayConstructorPrototype)) {
	        createNonEnumerableProperty(TypedArrayConstructorPrototype, BYTES_PER_ELEMENT, BYTES);
	      }

	      setSpecies(CONSTRUCTOR_NAME);
	    };
	  } else module.exports = function () {
	    /* empty */
	  };
	});

	// https://tc39.github.io/ecma262/#sec-typedarray-objects

	typedArrayConstructor('Float32', function (init) {
	  return function Float32Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	var min$5 = Math.min; // `Array.prototype.copyWithin` method implementation
	// https://tc39.github.io/ecma262/#sec-array.prototype.copywithin

	var arrayCopyWithin = [].copyWithin || function copyWithin(target
	/* = 0 */
	, start
	/* = 0, end = @length */
	) {
	  var O = toObject(this);
	  var len = toLength(O.length);
	  var to = toAbsoluteIndex(target, len);
	  var from = toAbsoluteIndex(start, len);
	  var end = arguments.length > 2 ? arguments[2] : undefined;
	  var count = min$5((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
	  var inc = 1;

	  if (from < to && to < from + count) {
	    inc = -1;
	    from += count - 1;
	    to += count - 1;
	  }

	  while (count-- > 0) {
	    if (from in O) O[to] = O[from];else delete O[to];
	    to += inc;
	    from += inc;
	  }

	  return O;
	};

	var aTypedArray$1 = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$1 = arrayBufferViewCore.exportTypedArrayMethod; // `%TypedArray%.prototype.copyWithin` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.copywithin

	exportTypedArrayMethod$1('copyWithin', function copyWithin(target, start
	/* , end */
	) {
	  return arrayCopyWithin.call(aTypedArray$1(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
	});

	var $every = arrayIteration.every;
	var aTypedArray$2 = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$2 = arrayBufferViewCore.exportTypedArrayMethod; // `%TypedArray%.prototype.every` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.every

	exportTypedArrayMethod$2('every', function every(callbackfn
	/* , thisArg */
	) {
	  return $every(aTypedArray$2(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	});

	var aTypedArray$3 = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$3 = arrayBufferViewCore.exportTypedArrayMethod; // `%TypedArray%.prototype.fill` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.fill
	// eslint-disable-next-line no-unused-vars

	exportTypedArrayMethod$3('fill', function fill(value
	/* , start, end */
	) {
	  return arrayFill.apply(aTypedArray$3(this), arguments);
	});

	var $filter = arrayIteration.filter;
	var aTypedArray$4 = arrayBufferViewCore.aTypedArray;
	var aTypedArrayConstructor$2 = arrayBufferViewCore.aTypedArrayConstructor;
	var exportTypedArrayMethod$4 = arrayBufferViewCore.exportTypedArrayMethod; // `%TypedArray%.prototype.filter` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.filter

	exportTypedArrayMethod$4('filter', function filter(callbackfn
	/* , thisArg */
	) {
	  var list = $filter(aTypedArray$4(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  var C = speciesConstructor(this, this.constructor);
	  var index = 0;
	  var length = list.length;
	  var result = new (aTypedArrayConstructor$2(C))(length);

	  while (length > index) result[index] = list[index++];

	  return result;
	});

	var $find = arrayIteration.find;
	var aTypedArray$5 = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$5 = arrayBufferViewCore.exportTypedArrayMethod; // `%TypedArray%.prototype.find` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.find

	exportTypedArrayMethod$5('find', function find(predicate
	/* , thisArg */
	) {
	  return $find(aTypedArray$5(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	});

	var $findIndex = arrayIteration.findIndex;
	var aTypedArray$6 = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$6 = arrayBufferViewCore.exportTypedArrayMethod; // `%TypedArray%.prototype.findIndex` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.findindex

	exportTypedArrayMethod$6('findIndex', function findIndex(predicate
	/* , thisArg */
	) {
	  return $findIndex(aTypedArray$6(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	});

	var $forEach$1 = arrayIteration.forEach;
	var aTypedArray$7 = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$7 = arrayBufferViewCore.exportTypedArrayMethod; // `%TypedArray%.prototype.forEach` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.foreach

	exportTypedArrayMethod$7('forEach', function forEach(callbackfn
	/* , thisArg */
	) {
	  $forEach$1(aTypedArray$7(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	});

	var $includes = arrayIncludes.includes;
	var aTypedArray$8 = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$8 = arrayBufferViewCore.exportTypedArrayMethod; // `%TypedArray%.prototype.includes` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.includes

	exportTypedArrayMethod$8('includes', function includes(searchElement
	/* , fromIndex */
	) {
	  return $includes(aTypedArray$8(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	});

	var $indexOf$1 = arrayIncludes.indexOf;
	var aTypedArray$9 = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$9 = arrayBufferViewCore.exportTypedArrayMethod; // `%TypedArray%.prototype.indexOf` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.indexof

	exportTypedArrayMethod$9('indexOf', function indexOf(searchElement
	/* , fromIndex */
	) {
	  return $indexOf$1(aTypedArray$9(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	});

	var ITERATOR$5 = wellKnownSymbol('iterator');
	var Uint8Array$1 = global_1.Uint8Array;
	var arrayValues = es_array_iterator.values;
	var arrayKeys = es_array_iterator.keys;
	var arrayEntries = es_array_iterator.entries;
	var aTypedArray$a = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$a = arrayBufferViewCore.exportTypedArrayMethod;
	var nativeTypedArrayIterator = Uint8Array$1 && Uint8Array$1.prototype[ITERATOR$5];
	var CORRECT_ITER_NAME = !!nativeTypedArrayIterator && (nativeTypedArrayIterator.name == 'values' || nativeTypedArrayIterator.name == undefined);

	var typedArrayValues = function values() {
	  return arrayValues.call(aTypedArray$a(this));
	}; // `%TypedArray%.prototype.entries` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.entries


	exportTypedArrayMethod$a('entries', function entries() {
	  return arrayEntries.call(aTypedArray$a(this));
	}); // `%TypedArray%.prototype.keys` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.keys

	exportTypedArrayMethod$a('keys', function keys() {
	  return arrayKeys.call(aTypedArray$a(this));
	}); // `%TypedArray%.prototype.values` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.values

	exportTypedArrayMethod$a('values', typedArrayValues, !CORRECT_ITER_NAME); // `%TypedArray%.prototype[@@iterator]` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype-@@iterator

	exportTypedArrayMethod$a(ITERATOR$5, typedArrayValues, !CORRECT_ITER_NAME);

	var aTypedArray$b = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$b = arrayBufferViewCore.exportTypedArrayMethod;
	var $join = [].join; // `%TypedArray%.prototype.join` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.join
	// eslint-disable-next-line no-unused-vars

	exportTypedArrayMethod$b('join', function join(separator) {
	  return $join.apply(aTypedArray$b(this), arguments);
	});

	var min$6 = Math.min;
	var nativeLastIndexOf = [].lastIndexOf;
	var NEGATIVE_ZERO$1 = !!nativeLastIndexOf && 1 / [1].lastIndexOf(1, -0) < 0;
	var STRICT_METHOD$2 = arrayMethodIsStrict('lastIndexOf'); // For preventing possible almost infinite loop in non-standard implementations, test the forward version of the method

	var USES_TO_LENGTH$5 = arrayMethodUsesToLength('indexOf', {
	  ACCESSORS: true,
	  1: 0
	});
	var FORCED$5 = NEGATIVE_ZERO$1 || !STRICT_METHOD$2 || !USES_TO_LENGTH$5; // `Array.prototype.lastIndexOf` method implementation
	// https://tc39.github.io/ecma262/#sec-array.prototype.lastindexof

	var arrayLastIndexOf = FORCED$5 ? function lastIndexOf(searchElement
	/* , fromIndex = @[*-1] */
	) {
	  // convert -0 to +0
	  if (NEGATIVE_ZERO$1) return nativeLastIndexOf.apply(this, arguments) || 0;
	  var O = toIndexedObject(this);
	  var length = toLength(O.length);
	  var index = length - 1;
	  if (arguments.length > 1) index = min$6(index, toInteger(arguments[1]));
	  if (index < 0) index = length + index;

	  for (; index >= 0; index--) if (index in O && O[index] === searchElement) return index || 0;

	  return -1;
	} : nativeLastIndexOf;

	var aTypedArray$c = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$c = arrayBufferViewCore.exportTypedArrayMethod; // `%TypedArray%.prototype.lastIndexOf` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.lastindexof
	// eslint-disable-next-line no-unused-vars

	exportTypedArrayMethod$c('lastIndexOf', function lastIndexOf(searchElement
	/* , fromIndex */
	) {
	  return arrayLastIndexOf.apply(aTypedArray$c(this), arguments);
	});

	var $map$1 = arrayIteration.map;
	var aTypedArray$d = arrayBufferViewCore.aTypedArray;
	var aTypedArrayConstructor$3 = arrayBufferViewCore.aTypedArrayConstructor;
	var exportTypedArrayMethod$d = arrayBufferViewCore.exportTypedArrayMethod; // `%TypedArray%.prototype.map` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.map

	exportTypedArrayMethod$d('map', function map(mapfn
	/* , thisArg */
	) {
	  return $map$1(aTypedArray$d(this), mapfn, arguments.length > 1 ? arguments[1] : undefined, function (O, length) {
	    return new (aTypedArrayConstructor$3(speciesConstructor(O, O.constructor)))(length);
	  });
	});

	var createMethod$4 = function (IS_RIGHT) {
	  return function (that, callbackfn, argumentsLength, memo) {
	    aFunction$1(callbackfn);
	    var O = toObject(that);
	    var self = indexedObject(O);
	    var length = toLength(O.length);
	    var index = IS_RIGHT ? length - 1 : 0;
	    var i = IS_RIGHT ? -1 : 1;
	    if (argumentsLength < 2) while (true) {
	      if (index in self) {
	        memo = self[index];
	        index += i;
	        break;
	      }

	      index += i;

	      if (IS_RIGHT ? index < 0 : length <= index) {
	        throw TypeError('Reduce of empty array with no initial value');
	      }
	    }

	    for (; IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
	      memo = callbackfn(memo, self[index], index, O);
	    }

	    return memo;
	  };
	};

	var arrayReduce = {
	  // `Array.prototype.reduce` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.reduce
	  left: createMethod$4(false),
	  // `Array.prototype.reduceRight` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.reduceright
	  right: createMethod$4(true)
	};

	var $reduce = arrayReduce.left;
	var aTypedArray$e = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$e = arrayBufferViewCore.exportTypedArrayMethod; // `%TypedArray%.prototype.reduce` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.reduce

	exportTypedArrayMethod$e('reduce', function reduce(callbackfn
	/* , initialValue */
	) {
	  return $reduce(aTypedArray$e(this), callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
	});

	var $reduceRight = arrayReduce.right;
	var aTypedArray$f = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$f = arrayBufferViewCore.exportTypedArrayMethod; // `%TypedArray%.prototype.reduceRicht` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.reduceright

	exportTypedArrayMethod$f('reduceRight', function reduceRight(callbackfn
	/* , initialValue */
	) {
	  return $reduceRight(aTypedArray$f(this), callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
	});

	var aTypedArray$g = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$g = arrayBufferViewCore.exportTypedArrayMethod;
	var floor$4 = Math.floor; // `%TypedArray%.prototype.reverse` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.reverse

	exportTypedArrayMethod$g('reverse', function reverse() {
	  var that = this;
	  var length = aTypedArray$g(that).length;
	  var middle = floor$4(length / 2);
	  var index = 0;
	  var value;

	  while (index < middle) {
	    value = that[index];
	    that[index++] = that[--length];
	    that[length] = value;
	  }

	  return that;
	});

	var aTypedArray$h = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$h = arrayBufferViewCore.exportTypedArrayMethod;
	var FORCED$6 = fails(function () {
	  // eslint-disable-next-line no-undef
	  new Int8Array(1).set({});
	}); // `%TypedArray%.prototype.set` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.set

	exportTypedArrayMethod$h('set', function set(arrayLike
	/* , offset */
	) {
	  aTypedArray$h(this);
	  var offset = toOffset(arguments.length > 1 ? arguments[1] : undefined, 1);
	  var length = this.length;
	  var src = toObject(arrayLike);
	  var len = toLength(src.length);
	  var index = 0;
	  if (len + offset > length) throw RangeError('Wrong length');

	  while (index < len) this[offset + index] = src[index++];
	}, FORCED$6);

	var aTypedArray$i = arrayBufferViewCore.aTypedArray;
	var aTypedArrayConstructor$4 = arrayBufferViewCore.aTypedArrayConstructor;
	var exportTypedArrayMethod$i = arrayBufferViewCore.exportTypedArrayMethod;
	var $slice = [].slice;
	var FORCED$7 = fails(function () {
	  // eslint-disable-next-line no-undef
	  new Int8Array(1).slice();
	}); // `%TypedArray%.prototype.slice` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.slice

	exportTypedArrayMethod$i('slice', function slice(start, end) {
	  var list = $slice.call(aTypedArray$i(this), start, end);
	  var C = speciesConstructor(this, this.constructor);
	  var index = 0;
	  var length = list.length;
	  var result = new (aTypedArrayConstructor$4(C))(length);

	  while (length > index) result[index] = list[index++];

	  return result;
	}, FORCED$7);

	var $some = arrayIteration.some;
	var aTypedArray$j = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$j = arrayBufferViewCore.exportTypedArrayMethod; // `%TypedArray%.prototype.some` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.some

	exportTypedArrayMethod$j('some', function some(callbackfn
	/* , thisArg */
	) {
	  return $some(aTypedArray$j(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	});

	var aTypedArray$k = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$k = arrayBufferViewCore.exportTypedArrayMethod;
	var $sort = [].sort; // `%TypedArray%.prototype.sort` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.sort

	exportTypedArrayMethod$k('sort', function sort(comparefn) {
	  return $sort.call(aTypedArray$k(this), comparefn);
	});

	var aTypedArray$l = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$l = arrayBufferViewCore.exportTypedArrayMethod; // `%TypedArray%.prototype.subarray` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.subarray

	exportTypedArrayMethod$l('subarray', function subarray(begin, end) {
	  var O = aTypedArray$l(this);
	  var length = O.length;
	  var beginIndex = toAbsoluteIndex(begin, length);
	  return new (speciesConstructor(O, O.constructor))(O.buffer, O.byteOffset + beginIndex * O.BYTES_PER_ELEMENT, toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - beginIndex));
	});

	var Int8Array$3 = global_1.Int8Array;
	var aTypedArray$m = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$m = arrayBufferViewCore.exportTypedArrayMethod;
	var $toLocaleString = [].toLocaleString;
	var $slice$1 = [].slice; // iOS Safari 6.x fails here

	var TO_LOCALE_STRING_BUG = !!Int8Array$3 && fails(function () {
	  $toLocaleString.call(new Int8Array$3(1));
	});
	var FORCED$8 = fails(function () {
	  return [1, 2].toLocaleString() != new Int8Array$3([1, 2]).toLocaleString();
	}) || !fails(function () {
	  Int8Array$3.prototype.toLocaleString.call([1, 2]);
	}); // `%TypedArray%.prototype.toLocaleString` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.tolocalestring

	exportTypedArrayMethod$m('toLocaleString', function toLocaleString() {
	  return $toLocaleString.apply(TO_LOCALE_STRING_BUG ? $slice$1.call(aTypedArray$m(this)) : aTypedArray$m(this), arguments);
	}, FORCED$8);

	var exportTypedArrayMethod$n = arrayBufferViewCore.exportTypedArrayMethod;
	var Uint8Array$2 = global_1.Uint8Array;
	var Uint8ArrayPrototype = Uint8Array$2 && Uint8Array$2.prototype || {};
	var arrayToString = [].toString;
	var arrayJoin = [].join;

	if (fails(function () {
	  arrayToString.call({});
	})) {
	  arrayToString = function toString() {
	    return arrayJoin.call(this);
	  };
	}

	var IS_NOT_ARRAY_METHOD = Uint8ArrayPrototype.toString != arrayToString; // `%TypedArray%.prototype.toString` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.tostring

	exportTypedArrayMethod$n('toString', arrayToString, IS_NOT_ARRAY_METHOD);

	var nativeAssign = Object.assign;
	var defineProperty$6 = Object.defineProperty; // `Object.assign` method
	// https://tc39.github.io/ecma262/#sec-object.assign

	var objectAssign = !nativeAssign || fails(function () {
	  // should have correct order of operations (Edge bug)
	  if (descriptors && nativeAssign({
	    b: 1
	  }, nativeAssign(defineProperty$6({}, 'a', {
	    enumerable: true,
	    get: function () {
	      defineProperty$6(this, 'b', {
	        value: 3,
	        enumerable: false
	      });
	    }
	  }), {
	    b: 2
	  })).b !== 1) return true; // should work with symbols and should have deterministic property order (V8 bug)

	  var A = {};
	  var B = {}; // eslint-disable-next-line no-undef

	  var symbol = Symbol();
	  var alphabet = 'abcdefghijklmnopqrst';
	  A[symbol] = 7;
	  alphabet.split('').forEach(function (chr) {
	    B[chr] = chr;
	  });
	  return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
	}) ? function assign(target, source) {
	  // eslint-disable-line no-unused-vars
	  var T = toObject(target);
	  var argumentsLength = arguments.length;
	  var index = 1;
	  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
	  var propertyIsEnumerable = objectPropertyIsEnumerable.f;

	  while (argumentsLength > index) {
	    var S = indexedObject(arguments[index++]);
	    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;

	    while (length > j) {
	      key = keys[j++];
	      if (!descriptors || propertyIsEnumerable.call(S, key)) T[key] = S[key];
	    }
	  }

	  return T;
	} : nativeAssign;

	// https://tc39.github.io/ecma262/#sec-object.assign

	_export({
	  target: 'Object',
	  stat: true,
	  forced: Object.assign !== objectAssign
	}, {
	  assign: objectAssign
	});

	var Effect = /*#__PURE__*/function () {
	  function Effect(options) {
	    _classCallCheck(this, Effect);

	    this.options = {};
	    Object.assign(this.options, options);
	    this.vertex = [-1, 1, 0, -1, -1, 0, 1, 1, 0, 1, 1, 0, -1, -1, 0, 1, -1, 0];
	    this.sampleCoord = [0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0];
	  }

	  _createClass(Effect, [{
	    key: "getOptions",
	    value: function getOptions() {
	      return this.options;
	    }
	  }, {
	    key: "onResize",
	    value: function onResize(gl) {}
	  }, {
	    key: "render",
	    value: function render(options) {
	      var gl = options.gl,
	          texture = options.texture;
	      var programSample = this.programSample;
	      gl.useProgram(programSample.program); // 图片坐标（整个屏幕gl坐标）

	      var posBuffer = gl.createBuffer();
	      gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
	      var bufferData = [-1, -1, 0, -1, 1, 0, 1, 1, 0, 1, 1, 0, -1, -1, 0, 1, -1, 0];
	      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(bufferData), gl.STATIC_DRAW);
	      gl.enableVertexAttribArray(programSample.attributes.aPos);
	      gl.vertexAttribPointer(programSample.attributes.aPos, 3, gl.FLOAT, false, 0, 0); // 纹理贴图坐标（固定值）

	      var textCoordBuffer = gl.createBuffer();
	      gl.bindBuffer(gl.ARRAY_BUFFER, textCoordBuffer);
	      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0]), gl.STATIC_DRAW);
	      gl.enableVertexAttribArray(programSample.attributes.aTextureCoord);
	      gl.vertexAttribPointer(programSample.attributes.aTextureCoord, 2, gl.FLOAT, false, 0, 0); // 绑定纹理贴图

	      gl.activeTexture(gl.TEXTURE0);
	      gl.bindTexture(gl.TEXTURE_2D, texture);
	      gl.uniform1i(programSample.uniforms.uSampler, 0); // 绘制

	      gl.drawArrays(gl.TRIANGLES, 0, bufferData.length / 3);
	    }
	  }]);

	  return Effect;
	}();

	// https://tc39.github.io/ecma262/#sec-array.isarray

	_export({
	  target: 'Array',
	  stat: true
	}, {
	  isArray: isArray
	});

	var nativeJoin = [].join;
	var ES3_STRINGS = indexedObject != Object;
	var STRICT_METHOD$3 = arrayMethodIsStrict('join', ','); // `Array.prototype.join` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.join

	_export({
	  target: 'Array',
	  proto: true,
	  forced: ES3_STRINGS || !STRICT_METHOD$3
	}, {
	  join: function join(separator) {
	    return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
	  }
	});

	var defineProperty$7 = objectDefineProperty.f;
	var FunctionPrototype = Function.prototype;
	var FunctionPrototypeToString = FunctionPrototype.toString;
	var nameRE = /^\s*function ([^ (]*)/;
	var NAME$1 = 'name'; // Function instances `.name` property
	// https://tc39.github.io/ecma262/#sec-function-instances-name

	if (descriptors && !(NAME$1 in FunctionPrototype)) {
	  defineProperty$7(FunctionPrototype, NAME$1, {
	    configurable: true,
	    get: function () {
	      try {
	        return FunctionPrototypeToString.call(this).match(nameRE)[1];
	      } catch (error) {
	        return '';
	      }
	    }
	  });
	}

	var trim$2 = stringTrim.trim;
	var $parseInt = global_1.parseInt;
	var hex = /^[+-]?0[Xx]/;
	var FORCED$9 = $parseInt(whitespaces + '08') !== 8 || $parseInt(whitespaces + '0x16') !== 22; // `parseInt` method
	// https://tc39.github.io/ecma262/#sec-parseint-string-radix

	var numberParseInt = FORCED$9 ? function parseInt(string, radix) {
	  var S = trim$2(String(string));
	  return $parseInt(S, radix >>> 0 || (hex.test(S) ? 16 : 10));
	} : $parseInt;

	// https://tc39.github.io/ecma262/#sec-parseint-string-radix

	_export({
	  global: true,
	  forced: parseInt != numberParseInt
	}, {
	  parseInt: numberParseInt
	});

	var common = "#ifdef GL_ES\nprecision highp float;\n#define GLSLIFY 1\n#else\n\n#if !defined(lowp)\n#define lowp\n#endif\n\n#if !defined(mediump)\n#define mediump\n#endif\n\n#if !defined(highp)\n#define highp\n#endif\n\n#endif\n\n#define StructGeometricContext\n\n#define PI 3.1415926\n\n// 定义geometry结构体\nstruct GeometricContext {\n\tvec3 position;\n\tvec3 normal;\n};\n\n// 定义通用变量\nuniform vec2 MAPV_resolution;"; // eslint-disable-line

	var pick_pars_vert = "#define GLSLIFY 1\n// pick支持\n#if defined(PICK)\n\n    attribute vec3 aPickColor;\n    varying vec4 vPickColor;\n\n    // 是否支持选择\n    uniform bool uEnablePicked;\n    // 是否为pick模式\n    uniform bool uIsPickRender;\n\n    // 当前选中要素对应的颜色\n    uniform vec3 uPickedColor;\n    // 选中后修改的颜色\n    uniform vec4 uSelectedColor;\n\n    bool mapvIsPicked() {\n        return uEnablePicked && aPickColor == uPickedColor;\n    }\n\n#endif"; // eslint-disable-line

	var pick_pars_frag = "#define GLSLIFY 1\n#if defined(PICK)\n\n    uniform vec4 uSelectedColor;\n    uniform vec3 uPickedColor;\n    uniform bool uEnablePicked;\n    uniform bool uIsPickRender;\n\n    varying vec4 vPickColor;\n\n    bool mapvIsPicked() {\n        return vPickColor.a == 1.0;\n    }\n\n#endif"; // eslint-disable-line

	var pick_vert = "#define GLSLIFY 1\n#if defined(PICK)\n\n    vPickColor = vec4(aPickColor, 0.0);\n    if (mapvIsPicked()) {\n        vPickColor.a = 1.0;\n    }\n\n#endif"; // eslint-disable-line

	var pick_frag = "#define GLSLIFY 1\n#if defined(PICK)\n\n    if (uIsPickRender) {\n        gl_FragColor = vec4(vPickColor.rgb, 1.0);\n        return;\n    }\n\n#endif"; // eslint-disable-line

	var effects_pars = "#define GLSLIFY 1\n#define HAS_EFFECTS\n\n// 必须的变量\nvarying vec3 vGeometryPosition;\nvarying vec3 vGeometryNormal;\n\n#ifndef StructGeometricContext\n\nstruct GeometricContext {\n\tvec3 position;\n\tvec3 normal;\n};\n\n#endif\n\n// ground—ripple的相关参数定义和方法\n#if NUM_GROUND_RIPPLES > 0\n\n    struct GroundRipple {\n        vec3 center;\n        float radius;\n        float width;\n        vec4 color;\n\n        float percent;\n    };\n\n\tuniform GroundRipple groundRipples[ NUM_GROUND_RIPPLES ];\n\n\tvoid getGroundRippleEffectColor( const in GroundRipple groundRipple, const in GeometricContext geometry, out vec4 color ) {\n\n        // 在建筑物之上\n        if ( groundRipple.center.z > geometry.position.z ) {\n            return;\n        }\n\n        // 当前点实际半径\n        float radius = groundRipple.radius * groundRipple.percent;\n\n        // 目标点距离Ripple\n        float dis = distance(geometry.position.xy, groundRipple.center.xy);\n\n        if ( dis > radius && dis < radius + groundRipple.width ) {\n\n            vec4 blend = groundRipple.color;\n            float percent = (1.0 - abs(dis - radius) / groundRipple.width);\n\n            blend.rgb *= percent * 2.0 + 1.0;\n            blend.a *= 1.0 - pow(1.0 - percent, 0.3);\n\n            if ( groundRipple.percent > 0.7 ) {\n                blend.a *= (1.0 - groundRipple.percent) / 0.3;\n            }\n\n            vec4 base = color;\n\n            color = base * base.a + blend * blend.a;\n\n        } else {\n\n            // discard;\n            \n        }\n\t}\n\n#endif\n\n// ground—ripple的相关参数定义和方法\n#if NUM_CYLINDER_SPREADS > 0\n\n    struct CylinderSpread {\n        vec3 center;\n        float radius;\n        float height;\n        vec4 color;\n\n        float percent;\n    };\n\n\tuniform CylinderSpread cylinderSpreads[ NUM_CYLINDER_SPREADS ];\n\n\tvoid getCylinderSpreadEffectColor( const in CylinderSpread cylinderSpread, const in GeometricContext geometry, out vec4 color ) {\n\n        float percent = cylinderSpread.percent;\n\n        // 当前的实际半径\n        float currentRadius = cylinderSpread.radius * percent;\n\n        // 多边形到中心的距离\n        float dis = distance(geometry.position.xy, cylinderSpread.center.xy);\n\n        // 当前实际的高度\n        float currentHeight = cylinderSpread.center.z;\n\n        if ( percent < 0.7 ) {\n            currentHeight += cylinderSpread.height * pow(percent / 0.7, 1.3);\n        } else {\n            currentHeight += cylinderSpread.height;\n        }\n\n        // 指定影响范围内\n        if (\n            abs((1.0 - dis / currentRadius)) <= 0.005 &&\n            geometry.position.z >= cylinderSpread.center.z &&\n            geometry.position.z <= currentHeight\n        ) {\n\n            vec4 blend = cylinderSpread.color;\n            float hPercent = 1.0 - (geometry.position.z - cylinderSpread.center.z) / cylinderSpread.height;\n\n            blend.rgb *= hPercent * 2.0 + 1.0;\n            blend.a *= 1.0 - pow(1.0 - hPercent, 0.3);\n\n            if (percent > 0.7) {\n                blend.a *= (1.0 - percent) / 0.3;\n            }\n\n            vec4 base = color;\n\n            color = base * base.a + blend * blend.a;\n\n        } else {\n\n            // discard;\n            \n        }\n\t}\n\n#endif"; // eslint-disable-line

	var effects_frag_end = "#define GLSLIFY 1\n// 初始化变量\nGeometricContext geometry;\ngeometry.position = vGeometryPosition;\ngeometry.normal = vGeometryNormal;\n\nvec4 glFragcolor = gl_FragColor;\n\n#if ( NUM_GROUND_RIPPLES > 0 )\n\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_GROUND_RIPPLES; i ++ ) {\n        \n        getGroundRippleEffectColor(groundRipples[ i ], geometry, glFragcolor);\n\n\t}\n\t#pragma unroll_loop_end\n\n#endif\n\n#if ( NUM_CYLINDER_SPREADS > 0 )\n\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_CYLINDER_SPREADS; i ++ ) {\n        \n        getCylinderSpreadEffectColor(cylinderSpreads[ i ], geometry, glFragcolor);\n\n\t}\n\t#pragma unroll_loop_end\n\n#endif\n\ngl_FragColor = glFragcolor;"; // eslint-disable-line

	var _template_vert = "#define GLSLIFY 1\n#include <common>\n#include <pick_pars_vert>\n#include <effects_pars>\n\n#pragma ORIGIN_MAIN\n\nvoid main() {\n    originMain();\n    \n    #include <pick_vert>\n}"; // eslint-disable-line

	var _template_frag = "#define GLSLIFY 1\n#include <common>\n#include <pick_pars_frag>\n#include <effects_pars>\n\n#pragma ORIGIN_MAIN\n\nvoid main() {\n    originMain();\n    \n    #include <pick_frag>\n    #include <effects_frag_end>\n}"; // eslint-disable-line

	var point_vert = "#define GLSLIFY 1\nattribute vec3 aPos;\nattribute vec4 aColor;\nattribute float aSize;\nuniform mat4 uMatrix;\nvarying vec4 vColor;\n\nvoid main() {\n    if (aColor.w >= 0.0 && aColor.w <= 1.0) {\n        vColor = aColor;\n    } else {\n        vColor = vec4(aColor.xyz, 1.0);\n    }\n    gl_Position = uMatrix * vec4(aPos, 1.0);\n    gl_PointSize = aSize;\n\n    #if defined(PICK)\n    if (mapvIsPicked()) {\n        vColor = uSelectedColor;\n    }\n    #endif\n}"; // eslint-disable-line

	var point_frag = "#define GLSLIFY 1\nvarying vec4 vColor;\nuniform int uShape;\n\nvoid main() {\n    vec4 color = vColor;\n    if (uShape == 1) {\n        float d = distance(gl_PointCoord, vec2(0.5, 0.5));\n        if (d > 0.5) {\n            discard;\n        }\n        float blur = 1.0;\n        blur = 1.0 - smoothstep(0.49, 0.5, d);\n        color.a *= blur;\n        gl_FragColor = color;\n    } else {\n        gl_FragColor = color;\n    }\n}"; // eslint-disable-line

	var ripple_vert = "#define GLSLIFY 1\nattribute vec3 aPos;\nattribute vec4 aColor;\nattribute float aSize;\n\nuniform mat4 uMatrix;\nuniform float uTime;\nuniform float duration;\nuniform float zoomUnits;\n\nvarying vec4 vColor;\n\nvoid main(void) {\n    if (aColor.w >= 0.0 && aColor.w <= 1.0) {\n        vColor = aColor;\n    } else {\n        vColor = vec4(aColor.xyz, 1.0);\n    }\n\n    float percent = mod(uTime, duration) / duration;\n    vColor.a = 1.0 - percent;\n\n    gl_Position = uMatrix * vec4(aPos.xyz, 1.0);\n    gl_PointSize = aSize / zoomUnits * percent;\n    \n    #if defined(PICK)\n    if (mapvIsPicked()) {\n        vColor = uSelectedColor;\n    }\n    #endif\n}"; // eslint-disable-line

	var ripple_frag = "#define GLSLIFY 1\nvarying vec4 vColor;\n\nvoid main(void) {\n    vec4 color = vColor;\n    float d = distance(gl_PointCoord, vec2(0.5, 0.5));\n    if (d > 0.5) {\n        discard;\n    }\n    float blur = 1.0;\n    blur = 1.0 - smoothstep(0.49, 0.5, d);\n    color.a *= blur;\n    gl_FragColor = color;\n}"; // eslint-disable-line

	var circle_simple_vert = "#define GLSLIFY 1\nattribute vec3 aPos;\nattribute float aSize;\nattribute float aIndex;\nattribute vec4 aColor;\n\nvarying vec4 vColor;\nvarying vec4 vPosition;\nvarying vec4 vFragPosition;\nvarying float vSize;\n\nuniform mat4 uMatrix;\nuniform float uZoomUnits;\n\nvoid main() {\n    vColor = aColor;\n    \n    float x = aPos.x;\n    float y = aPos.y;\n    vSize = aSize * uZoomUnits;\n    \n    if (aIndex == 1.0) {\n        x -= vSize;\n        y += vSize;\n    } else if (aIndex == 2.0) {\n        x += vSize;\n        y -= vSize;\n    } else if (aIndex == 3.0) {\n        x += vSize;\n        y += vSize;\n    } else {\n        x -= vSize;\n        y -= vSize;\n    }\n    \n    vPosition = vec4(aPos.xyz, 1.0);\n    vFragPosition = vec4(x, y, aPos.z, 1.0);\n    \n    gl_Position = uMatrix * vFragPosition;\n    \n    #if defined(PICK)\n    if (mapvIsPicked()) {\n        vColor = uSelectedColor;\n    }\n    #endif\n}"; // eslint-disable-line

	var circle_simple_frag = "#define GLSLIFY 1\nvarying vec4 vPosition;\nvarying float vSize;\nvarying vec4 vFragPosition;\nvarying vec4 vColor;\n\nuniform mat4 uMatrix;\nuniform float uTime;\nuniform float duration;\nuniform float trail;\nuniform float lineWidth;\n\nvoid main() {\n    float d = distance(vFragPosition.xy, vPosition.xy);\n    if (d > vSize) {\n        discard;\n    }\n    vec4 color = vColor;\n    \n    if (d > 0.9 * vSize && d <= vSize) {\n        color.a = 1.0 - smoothstep(0.9 * vSize, vSize, d);\n    }\n    gl_FragColor = color;\n}"; // eslint-disable-line

	var circle_animate_vert = "#define GLSLIFY 1\nattribute vec3 aPos;\nattribute float aSize;\nattribute float aIndex;\nattribute vec4 aColor;\nattribute float aStartTime;\nattribute float aRadius;\n\nvarying vec4 vColor;\nvarying vec4 vPosition;\nvarying vec4 vFragPosition;\nvarying float vSize;\nvarying float vStartTime;\nvarying float vRadius;\n\nuniform mat4 uMatrix;\nuniform float uZoomUnits;\n\nvoid main() {\n    vColor = aColor;\n    vStartTime = aStartTime;\n    vSize = aSize * uZoomUnits;\n    vRadius = aRadius * uZoomUnits;\n\n    float x = aPos.x;\n    float y = aPos.y;\n    float R = vRadius;\n    if (aIndex == 1.0) {\n        x -= R;\n        y += R;\n    } else if (aIndex == 2.0) {\n        x += R;\n        y -= R;\n    } else if (aIndex == 3.0) {\n        x += R;\n        y += R;\n    } else {\n        x -= R;\n        y -= R;\n    }\n    vPosition = vec4(aPos.xyz, 1.0);\n    vFragPosition = vec4(x, y, aPos.z, 1.0);\n    gl_Position = uMatrix * vFragPosition;\n    \n    #if defined(PICK)\n    if (mapvIsPicked()) {\n        vColor = uSelectedColor;\n    }\n    #endif\n}"; // eslint-disable-line

	var circle_wave_frag = "#define GLSLIFY 1\nvarying vec4 vPosition;\nvarying float vSize;\nvarying vec4 vFragPosition;\nvarying vec4 vColor;\nvarying float vStartTime;\nvarying float vRadius;\n\nuniform mat4 uMatrix;\nuniform float uTime;\nuniform float duration;\nuniform float trail;\n\nvoid main() {\n    float d = distance(vFragPosition.xy, vPosition.xy);\n    if (d >= vRadius) {\n        discard;\n    }\n    vec4 color = vColor;\n    float R = vRadius;\n    float center = vSize;\n    float time = vStartTime + uTime;\n    float alpha = sin((R - d) / R * trail * 2.0 * 3.14 + time / duration);\n    \n    if (d <= center) {\n        if (d > 0.9 * center && d <= center) {\n            if (alpha >= 0.5) {\n                color.a = 0.9;\n            } else {\n                color.a = 1.0 - smoothstep(0.9 * center, center, d);\n            }\n        }\n    } else {\n        if (alpha >= 0.5) {\n            color.a = 0.9;\n            if (alpha >= 0.5 && alpha <= 0.6) {\n                color.a = smoothstep(0.0, 0.1, alpha - 0.5);\n            }\n            if (d >= center && d <= R) {\n                color.a *= 1.0 - smoothstep(center, R, d);\n            }\n        } else {\n            color.a = 0.0;\n        }\n    }\n    gl_FragColor = color;\n}"; // eslint-disable-line

	var circle_bubble_frag = "#define GLSLIFY 1\nvarying vec4 vPosition;\nvarying float vSize;\nvarying vec4 vFragPosition;\nvarying vec4 vColor;\nvarying float vStartTime;\nvarying float vRadius;\n\nuniform mat4 uMatrix;\nuniform float uTime;\nuniform float duration;\nuniform float trail;\n\nvoid main() {\n    float d = distance(vFragPosition.xy, vPosition.xy);\n    if (d >= vRadius) {\n        discard;\n    }\n    \n    float time = vStartTime + uTime;\n    float range = mod(time, (duration + trail));\n    float percent = 0.0;\n    if (range <= duration) {\n        percent = range / duration;\n    } else {\n        percent = 1.0;\n    }\n    float center = vSize;\n    float R = vRadius;\n    float r = R * percent;\n    vec4 color = vColor;\n\n    if (d <= center) {\n        if (d > 0.9 * center && d <= center) {\n            color.a = 1.0 - smoothstep(0.9 * center, center, d);\n        }\n    } else {\n        if (d < r) {\n            color.a = smoothstep(0.1, 0.9, pow(d / r, 2.0) * 0.9);\n            if (d >= 0.9 * r && d <= r) {\n                color.a *= 1.0 - smoothstep(0.9, 1.0, d / r);\n            } if (range > duration) {\n                color.a *= 1.0 - (range - duration) / trail;\n            }\n        } else {\n            color.a = 0.0;\n        }\n    }\n    gl_FragColor = color;\n}"; // eslint-disable-line

	var ground_ripple_vert = "#define GLSLIFY 1\nuniform mat4 u_matrix;\nattribute vec3 aPos;\nvarying vec2 vPos;\n\nvoid main() {\n    vPos = aPos.xy;\n    \n    gl_Position = u_matrix * vec4(aPos, 1.0);\n}"; // eslint-disable-line

	var ground_ripple_frag = "#define GLSLIFY 1\nstruct GroundRipple {\n    vec3 center;\n    float radius;\n    float width;\n    vec4 color;\n};\n\nuniform GroundRipple u_ripple;\nuniform float u_percent;\n\nvarying vec2 vPos;\n\nvoid main() {\n    vec4 blend = u_ripple.color;\n\n    // 当前最小半径\n    float radius = u_ripple.radius * u_percent;\n\n    // 当前点半径\n    float dis = distance(vPos, u_ripple.center.xy);\n\n    if ( dis > radius && dis < radius + u_ripple.width ) {\n\n        float percent = (1.0 - abs(dis - radius) / u_ripple.width);\n\n        blend.rgb *= percent * 2.0 + 1.0;\n        blend.a *= 1.0 - pow(1.0 - percent, 0.3);\n\n        if ( u_percent > 0.7 ) {\n            blend.a *= (1.0 - u_percent) / 0.3;\n        }\n\n    } else {\n        discard;\n    }\n\n    gl_FragColor = blend;\n}"; // eslint-disable-line

	var simple_line_vert = "#define GLSLIFY 1\nuniform mat4 u_matrix;\n\nattribute vec3 aPos;\nattribute vec4 aColor;\n\nvarying vec4 vColor;\n\nvoid main() {\n    if (aColor.w >= 0.0 && aColor.w <= 1.0) {\n        vColor = aColor;\n    } else {\n        vColor = vec4(aColor.xyz, 1.0);\n    }\n    gl_Position = u_matrix * vec4(aPos, 1.0);\n}"; // eslint-disable-line

	var simple_line_frag = "#define GLSLIFY 1\nvarying vec4 vColor;\n\nvoid main() {\n    gl_FragColor = vColor;\n}"; // eslint-disable-line

	var line_vert = "#define GLSLIFY 1\nuniform mat4 u_matrix;\nuniform vec2 u_dash_array;\nuniform float u_zoom_units;\nuniform float u_offset;\n\nattribute vec4 a_color;\nattribute vec3 a_position;\nattribute vec3 a_normal;\nattribute float a_distance;\nattribute float a_total_distance;\nattribute float a_width;\n\n#if defined(USE_TEXTURE)\nattribute vec2 uv;\n#endif\n\nvarying vec4 v_color;\nvarying vec2 v_normal;\nvarying vec2 v_uv;\nvarying vec2 v_dash_array;\nvarying float v_total_distance;\nvarying float v_counter;\nvarying float v_width;\n\nvoid main() {\n    v_width = a_width;\n    v_color = a_color;\n    v_counter = a_distance / a_total_distance;\n    v_dash_array = u_zoom_units * u_dash_array / a_total_distance;\n    v_total_distance = a_total_distance;\n    v_normal = vec2(normalize(a_normal.xy) * sign(a_width));\n    \n    #if defined(USE_TEXTURE)\n    v_uv = uv;\n    #endif\n    \n    #if defined(PICK)\n    if (mapvIsPicked()) {\n        v_color = uSelectedColor;\n    }\n    #endif\n    \n    vec2 extrude = normalize(a_normal.xy) * a_width / 2.0 * u_zoom_units;\n    vec2 offsetXY = normalize(a_normal.xy) * u_offset * u_zoom_units;\n    float offsetZ = u_offset * u_zoom_units;\n\n    gl_Position = u_matrix * vec4(a_position.xy + extrude + offsetXY, a_position.z + offsetZ, 1.0);\n}"; // eslint-disable-line

	var line_frag = "#define GLSLIFY 1\nvarying vec4 v_color;\nvarying vec2 v_normal;\nvarying vec2 v_uv;\nvarying vec2 v_dash_array;\nvarying float v_counter;\nvarying float v_total_distance;\n\nuniform bool u_antialias;\nuniform float u_dash_offset;\nuniform float u_zoom_units;\n\n#if defined(USE_LINE_ANIMATION)\nuniform bool u_animate;\nuniform float u_time;\nuniform float u_duration;\nuniform float u_interval;\nuniform float u_trail_length;\n#endif\n\n#if defined(USE_TEXTURE)\nuniform float u_texture_width;\nuniform float u_texture_margin;\nuniform sampler2D u_sampler;\n#endif\n\nvoid main() {\n    vec4 color = v_color;\n\n    // 抗锯齿\n    if (u_antialias) {\n        float blur = 1.0;\n        blur = 1.0 - smoothstep(0.9, 1.0, length(v_normal));\n        color.a *= blur;\n    }\n    \n    // 动画\n    #if defined(USE_LINE_ANIMATION)\n    if (u_animate) {\n        float alpha = 1.0 - fract(mod(1.0 - v_counter, u_interval) * (1.0 / u_interval) + u_time / u_duration);\n        alpha = (alpha + u_trail_length - 1.0) / u_trail_length;\n        color.a *= alpha;\n        gl_FragColor = color;\n        return;\n    }\n    #endif\n    \n    // 贴图模式\n    #if defined(USE_TEXTURE)\n    float margin_width = u_texture_margin * u_zoom_units;\n    float margin_width_half = margin_width / 2.0;\n    float texture_width = u_texture_width * u_zoom_units;\n    float delta = mod(v_uv.x, texture_width + margin_width);\n    if (delta >= margin_width_half && delta <= margin_width_half + texture_width) {\n        float uvx = (delta - margin_width_half) / texture_width;\n        vec4 texture = texture2D(u_sampler, vec2(uvx, v_uv.y));\n        color = texture.a >= 0.5 ? texture : color;\n    }\n    #endif\n    \n    // 虚线效果\n    if (v_dash_array.y > 0.0) {\n        float offset = u_dash_offset * u_zoom_units / v_total_distance;\n        color.a *= (1.0 - step(v_dash_array.x, mod(v_counter + offset, v_dash_array.x + v_dash_array.y)));\n    }\n    gl_FragColor = color;\n}"; // eslint-disable-line

	var line_3d_vert = "#define GLSLIFY 1\nuniform mat4 uMatrix;\nuniform bool uFlat;\nuniform vec2 uDashArray;\nuniform float thickness;\nuniform float zoomUnits;\nuniform float devicePixelRatio;\nuniform int miter;\n\nattribute vec3 position;\nattribute vec3 next;\nattribute vec3 previous;\nattribute float direction;\nattribute vec4 aColor;\nattribute float aDistance;\nattribute float aTotalDistance;\n\n#if defined(USE_TEXTURE)\nattribute vec2 uv;\n#endif\n\nvarying vec4 vColor;\nvarying vec2 vNormal;\nvarying vec2 vUV;\nvarying vec2 vDashArray;\nvarying float vTotalDistance;\nvarying float vCounter;\n\nvec2 project(vec4 coord) {\n    vec3 screen = coord.xyz / coord.w;\n    vec2 clip = (screen.xy + 1.0) / 2.0;\n    return clip * MAPV_resolution;\n}\nvec4 unproject(vec2 projected, float z, float w) {\n    vec2 clip = projected / MAPV_resolution;\n    vec2 screen = clip * 2.0 - 1.0;\n    return vec4(screen * w, z, w);\n}\nvec3 getNormalAndWidth(vec2 currentScreen, vec2 previousScreen, vec2 nextScreen, float thickness) {\n    vec2 dir = vec2(0.0);\n    if (currentScreen == previousScreen) {\n        dir = normalize(nextScreen - currentScreen);\n    } else if (currentScreen == nextScreen) {\n        dir = normalize(currentScreen - previousScreen);\n    } else {\n        vec2 dirA = normalize(currentScreen - previousScreen);\n        if (miter == 1) {\n            vec2 dirB = normalize(nextScreen - currentScreen);\n            vec2 tangent = normalize(dirA + dirB);\n            vec2 perp = vec2(-dirA.y, dirA.x);\n            vec2 miter = vec2(-tangent.y, tangent.x);\n            dir = tangent;\n            float angle = 40.0;\n            if (dot(dirA, dirB) > cos(radians(angle))) {\n                thickness = thickness / dot(miter, perp);\n            }\n        } else {\n            dir = dirA;\n        }\n    }\n    vec2 normal = vec2(-dir.y, dir.x);\n    return vec3(normal, thickness);\n}\n\nvoid main() {\n    vColor = aColor;\n    vCounter = aDistance / aTotalDistance;\n    vDashArray = zoomUnits * uDashArray / aTotalDistance;\n    vTotalDistance = aTotalDistance;\n    \n    #if defined(USE_TEXTURE)\n    vUV = uv;\n    #endif\n    \n    #if defined(PICK)\n    if (mapvIsPicked()) {\n        vColor = uSelectedColor;\n    }\n    #endif\n    \n    if (uFlat) {\n        float width = thickness * zoomUnits;\n        vec3 nw = getNormalAndWidth(position.xy, previous.xy, next.xy, width);\n        width = nw.z;\n        vec2 normal = nw.xy;\n        vNormal = normal * direction;\n        normal *= width / 2.0;\n\n        gl_Position = uMatrix * vec4(position.xy + normal * direction, position.z, 1.0);\n    } else {\n        vec4 previousProjected = uMatrix * vec4(previous, 1.0);\n        vec4 currentProjected = uMatrix * vec4(position, 1.0);\n        vec4 nextProjected = uMatrix * vec4(next, 1.0);\n        vec2 currentScreen = project(currentProjected);\n        vec2 previousScreen = project(previousProjected);\n        vec2 nextScreen = project(nextProjected);\n        float width = thickness * devicePixelRatio;\n        vec3 nw = getNormalAndWidth(currentScreen, previousScreen, nextScreen, width);\n        width = nw.z;\n        vec2 normal = nw.xy;\n        vNormal = normal * direction;\n        normal *= width / 2.0;\n        vec2 pos = currentScreen + normal * direction;\n        vec4 finalPos = unproject(pos, currentProjected.z, currentProjected.w);\n        gl_Position = finalPos;\n    }\n}"; // eslint-disable-line

	var line_3d_frag = "#define GLSLIFY 1\nvarying vec4 vColor;\nvarying vec2 vNormal;\nvarying vec2 vUV;\nvarying vec2 vDashArray;\nvarying float vCounter;\nvarying float vTotalDistance;\nuniform bool uAntialias;\nuniform float uDashOffset;\nuniform float zoomUnits;\nuniform float thickness;\n\n#if defined(USE_TEXTURE)\nuniform float uTextureMargin;\nuniform sampler2D textureImage;\n#endif\n\nvoid main() {\n    vec4 color = vColor;\n    if (uAntialias) {\n        float blur = 1.0;\n        blur = 1.0 - smoothstep(0.8, 1.0, length(vNormal));\n        color.a *= blur;\n    }\n    \n    #if defined(USE_TEXTURE)\n    float segLen = uTextureMargin * zoomUnits;\n    float textureLen = thickness * zoomUnits;\n    float deltaX = mod(vUV.x, segLen);\n    float middle = segLen / 2.0;\n    if (deltaX >= middle && deltaX <= middle + textureLen) {\n        float uvx = (deltaX - middle) / textureLen;\n        vec4 texture = texture2D(textureImage, vec2(uvx, vUV.y));\n        color = texture.a >= 0.5 ? texture : color;\n    }\n    #endif\n    \n    if (vDashArray.y > 0.0) {\n        float offset = uDashOffset * zoomUnits / vTotalDistance;\n        color.a *= (1.0 - step(vDashArray.x, mod(vCounter + offset, vDashArray.x + vDashArray.y)));\n    }\n    gl_FragColor = color;\n}"; // eslint-disable-line

	var line_trip_vert = "#define GLSLIFY 1\nattribute vec4 aPos;\nattribute vec4 aColor;\n\nuniform mat4 u_matrix;\nuniform float currentTime;\nuniform float trailLength;\n\nvarying float vTime;\nvarying vec4 vColor;\n\nvoid main() {\n    gl_Position = u_matrix * vec4(aPos.xyz, 1.0);\n    vColor = aColor;\n    vTime = 1.0 - ((currentTime - aPos.w) / trailLength);\n}"; // eslint-disable-line

	var line_trip_frag = "#define GLSLIFY 1\nvarying vec4 vColor;\nvarying float vTime;\n\nvoid main() {\n    if (vTime > 1.0 || vTime < 0.0) {\n        discard;\n    }\n    gl_FragColor = vec4(vColor.rgb, 1.0 * vTime);\n}"; // eslint-disable-line

	var shape_defines = "#define GLSLIFY 1\nstruct Defines {\n    bool useLight;\n    bool useTexture;\n    bool useTopTexture;\n    bool useTopColor;\n};\n\nuniform Defines defines;\n\n// 基础参数\nuniform mat4 u_matrix;\nuniform float u_zoom_unit;\n\n// 样式相关\nuniform float u_style;\nuniform float u_alpha;\nuniform vec4 u_top_color;\nuniform sampler2D u_sampler;\nuniform sampler2D u_top_sampler;\n\n// 光照\nuniform vec3 u_side_light_dir;\n\n// 时间\nuniform float u_time;\nuniform float u_dataTime;\nuniform float u_riseTime;\n\n// 变量\nvarying float v_height;\nvarying float v_height_percent;\nvarying vec4 v_color;\nvarying vec3 v_position;\nvarying vec2 v_texture_coord;"; // eslint-disable-line

	var shape_vert = "#define GLSLIFY 1\n#include <shape_defines>\n\nattribute vec4 a_pos;\nattribute vec3 a_normal;\nattribute vec4 a_color;\nattribute vec4 a_pre_color;\nattribute float a_base_height;\nattribute float a_height;\nattribute float a_pre_height;\nattribute vec2 a_texture_coord;\n\n// 上光源\nconst vec3 point_color = vec3(0.06, 0.06, 0.06);\n// 侧部光源\nconst vec3 light_color = vec3(0.53, 0.53, 0.53);\n// 底部光源\nconst vec3 light_color_2 = vec3(0.4, 0.4, 0.4);\n// 贴图模式使用的散射光和直射光\nconst vec3 uAmbientColor = vec3(0.8, 0.8, 0.8);\nconst vec3 uDirectionalColor = vec3(1.0, 1.0, 1.0);\n\n// 根据时间计算目标高度\nfloat getTransitionValue(float pre_value, float to_value) {\n    float result = 0.0;\n    \n    if (pre_value == to_value) {\n        result = to_value;\n    } else {\n        if (u_riseTime > 0.0 && u_dataTime < u_riseTime) {\n            result = (pre_value + (to_value - pre_value) * (u_dataTime / u_riseTime));\n        } else {\n            result = to_value;\n        }\n    }\n    return result;\n}\n\nvoid main() {\n    vec4 pos = a_pos;\n    pos.z += a_base_height + pos.w * getTransitionValue(a_pre_height, a_height);\n    gl_Position = u_matrix * vec4(pos.xyz, 1.0);\n\n    // varing变量赋值\n    v_position = pos.xyz;\n    v_height = a_pos.z + a_base_height + a_height;\n    v_height_percent = pos.w;\n\n    if (defines.useTexture) {\n        v_texture_coord = a_texture_coord;\n    }\n\n    // 后面开始颜色计算\n    vec4 icolor = a_color;\n\n    #if defined(PICK)\n    if (mapvIsPicked()) {\n        icolor = uSelectedColor;\n    }\n    #endif\n    \n    // 如果使用光照\n    if (defines.useLight) {\n\n        vec3 N = normalize(a_normal);\n\n        // 自上而下的点光源\n        vec3 L_point = normalize(vec3(0, 1, 0));\n        float lambert_point = max(0.0, dot(N, -L_point));\n\n        // 外部光照\n        vec3 L = normalize(u_side_light_dir);\n        float lambert = max(0.0, dot(N, -L));\n\n        float H = pos.z / u_zoom_unit;\n\n        if ( H < 5.0 ) {\n\n            float deepGradientColor = (5.0 - H) / 8.0;\n            lambert = lambert - deepGradientColor;\n            \n        }\n\n        // 自下而上的光源\n        vec3 L2 = vec3(0, 0, -1);\n        float lambert_2 = max(0.0, dot(N, -L2));\n\n        // 如果顶部颜色和初始颜色相同\n        if (a_pre_color.r == a_color.r && a_pre_color.g == a_color.g && a_pre_color.b == a_color.b) {\n\n        } else {\n\n            if (u_riseTime > 0.0 && u_dataTime < u_riseTime) {\n\n                icolor.rgb = a_pre_color.rgb + (a_color.rgb - a_pre_color.rgb) * (u_dataTime / u_riseTime);\n                \n            }\n\n        }\n\n        // 计算加入光照后的颜色\n        v_color.rgb = icolor.rgb + \n            icolor.rgb * light_color * lambert + \n            icolor.rgb * light_color_2 * lambert_2 +\n            icolor.rgb * point_color * lambert_point;\n        v_color.a = icolor.a;\n\n        // 如果是贴图模式\n        if (defines.useTexture) {\n\n            float directionalLightWeighting = max(0.0, dot(N, L));\n\n            v_color = vec4(uAmbientColor + uDirectionalColor * directionalLightWeighting, 1.0);\n\n        }\n\n    } else {\n\n        v_color = icolor;\n\n    }\n\n    // 加入外部整体透明度\n    v_color *= u_alpha;\n\n    // 传递 effect 需要的值\n    #if defined(HAS_EFFECTS)\n\n    vGeometryPosition = pos.xyz;\n    vGeometryNormal = a_normal;\n\n    #endif\n}"; // eslint-disable-line

	var shape_frag = "#define GLSLIFY 1\n#include <shape_defines>\n\nvoid main() {\n    vec4 color = vec4(v_color);\n    vec4 textureColor = vec4(1.0, 1.0, 1.0, 1.0);\n    \n    // 使用纹理\n    if (defines.useTexture) {\n        // water 特效\n        if (u_style == 6.0) {\n            float x = v_texture_coord.s;\n            float y = v_texture_coord.t;\n            vec2 cPos = -1.0 + 2.0 * gl_FragCoord.xy / MAPV_resolution;\n            float cLength = length(cPos);\n            vec2 uv = gl_FragCoord.xy / MAPV_resolution + (cPos / cLength) * cos(cLength * 12.0 - u_time / 1000.0 * 4.0) * 0.03;\n            textureColor = texture2D(u_sampler, uv / 2.0 + vec2(x, y));\n        } else {\n            textureColor = texture2D(u_sampler, vec2(v_texture_coord.s, v_texture_coord.t));\n        }\n\n        // topColor顶部颜色\n        if (v_height_percent == 1.0) {\n            // 纹理优先\n            if (defines.useTopTexture) {\n                textureColor = texture2D(u_top_sampler, vec2(v_texture_coord.s, v_texture_coord.t));\n            } else if (defines.useTopColor) {\n                textureColor = u_top_color;\n            }\n        }\n\n        // 光照\n        if (defines.useLight) {\n            color = vec4(textureColor * v_color * 1.1);\n        } else {\n            color = textureColor;\n        }\n    }\n    // window 和 windowAnimation\n    if (u_style == 1.0 || u_style == 2.0) {\n        float t = u_time / 1000.0;\n        float diffDistance = 5.0 * u_zoom_unit;\n        float modX = mod(v_position.x, diffDistance * 2.0);\n        float modZ = mod(v_position.z, diffDistance * 2.0);\n        // 窗户判断\n        if (modX < diffDistance && modZ < diffDistance && v_position.z < v_height) {\n            color *= 1.05;\n            // 动画特效\n            if (u_time > 0.0 && u_style == 2.0) {\n                float iX = ceil(v_position.x / diffDistance);\n                float iZ = ceil(v_position.z / diffDistance);\n                float timeDistance = 8.0;\n                t += tan(sin(iZ));\n                color *= (1.0 + mod(t, timeDistance) / timeDistance);\n            }\n        }\n    }\n    // 渐变色\n    else if (u_style == 3.0) {\n        color.a = 1.0 - pow(v_height_percent, 0.3);\n    }\n    \n    gl_FragColor = color;\n}"; // eslint-disable-line

	var spark_vert = "#define GLSLIFY 1\nattribute vec4 aPos;\n\nuniform mat4 u_matrix;\nuniform float currentTime;\nuniform float trailLength;\n\nvarying float vTime;\n\nvoid main() {\n    gl_Position = u_matrix * vec4(aPos.xyz, 1.0);\n    vTime = 1.0 - ((currentTime - aPos.w) / trailLength);\n}"; // eslint-disable-line

	var spark_frag = "#define GLSLIFY 1\nuniform vec4 uFragColor;\nvarying float vTime;\n\nvoid main() {\n    if (vTime > 1.0 || vTime < 0.0) {\n        discard;\n    }\n    gl_FragColor = uFragColor.a * vec4(uFragColor.rgb, 1.0 * vTime);\n}"; // eslint-disable-line

	var cylinder_spread_vert = "#define GLSLIFY 1\nattribute vec3 aPos;\n\nuniform mat4 uMatrix;\nuniform mat4 uObjMatrix;\nuniform float uPercent;\n\nvarying vec3 vPos;\n\nvoid main() {\n    vec4 pos = vec4(aPos, 1.0);\n    pos.xy *= uPercent;\n\n    if ( uPercent < 0.7 ) {\n        pos.z *= pow(uPercent / 0.7, 1.3);\n    }\n\n    gl_Position = uMatrix * uObjMatrix * pos;\n\n    vPos = aPos;\n}"; // eslint-disable-line

	var cylinder_spread_frag = "#define GLSLIFY 1\nuniform vec4 glowColor;\nuniform float uPercent;\nvarying vec3 vPos;\n\nvoid main() {\n    vec4 blend = glowColor;\n    \n    float hPercent = 1.0 - vPos.z;\n\n    blend.rgb *= hPercent * 2.0 + 1.0;\n    blend.a *= 1.0 - pow(1.0 - hPercent, 0.3);\n\n    if ( uPercent > 0.7 ) {\n        blend.a *= (1.0 - uPercent) / 0.3;\n    }\n\n    gl_FragColor = blend;\n}"; // eslint-disable-line

	var heatmap_offline_vert = "#define GLSLIFY 1\nuniform mat4 uMatrix;\nuniform float uMax;\nuniform float uMin;\nuniform float uZoomUnits;\n\nattribute vec3 aPos;\nattribute vec2 aOffset;\nattribute float aCount;\nattribute float aSize;\n\nvarying vec2 vOffset;\nvarying float vCount;\n\nvoid main() {\n    vOffset = aOffset;\n    vCount = (aCount - uMin) / (uMax - uMin);\n    \n    vec2 pos = aPos.xy + aOffset.xy * aSize * uZoomUnits / 2.0;\n    gl_Position = uMatrix * vec4(pos, 0.0, 1.0);\n}"; // eslint-disable-line

	var heatmap_offline_frag = "#define GLSLIFY 1\nvarying vec2 vOffset;\nvarying float vCount;\n\nuniform sampler2D uCircle;\n\nvoid main() {\n    vec4 circle = texture2D(uCircle, (vOffset + 1.0) / 2.0);\n    float intensity = circle.a * vCount;\n\n    if (intensity <= 0.0) {\n        discard;\n    }\n\n    gl_FragColor = vec4(.0, .0, .0, intensity);\n}"; // eslint-disable-line

	var heatmap_vert = "#define GLSLIFY 1\nattribute vec2 aPos;\n\nvarying vec2 vPos;\n\nuniform float uHeight;\nuniform mat4 pixelToViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 inverseMatrix;\nuniform sampler2D uSampler;\n\nvoid main() {\n    vPos = aPos;\n    \n    if (uHeight <= 0.0) {\n        gl_Position = vec4(aPos, 0.0, 1.0);\n    } else {\n        vec4 gray = texture2D(uSampler, (aPos + 1.0) / 2.0);\n        vec4 m0 = inverseMatrix * vec4(aPos.xy, 0.0, 1.0);\n        vec4 m1 = inverseMatrix * vec4(aPos.xy, 1.0, 1.0);\n        m0 /= m0.w;\n        m1 /= m1.w;\n        vec4 pixel = m0 + (-m0.z / (m1.z - m0.z)) * (m1 - m0);\n        pixel.z = uHeight * gray.a;\n        gl_Position = projectionMatrix * pixelToViewMatrix * vec4(pixel.xyz, 1.0);\n    }\n}"; // eslint-disable-line

	var heatmap_frag = "#define GLSLIFY 1\nuniform sampler2D uSampler;\nuniform sampler2D uSamplerPalette;\n\nvarying vec2 vPos;\n\nvoid main() {\n    vec4 gray = texture2D(uSampler, (vPos + 1.0) / 2.0);\n    float grayAlpha = gray.a;\n    \n    if (grayAlpha <= 0.0) {\n        discard;\n    }\n    \n    vec4 color = texture2D(uSamplerPalette, vec2(grayAlpha, 1.0));\n    gl_FragColor = vec4(color.rgb, grayAlpha);\n}"; // eslint-disable-line

	// shader chunk
	var ShaderChunk = {
	  common: common,
	  pick_pars_vert: pick_pars_vert,
	  pick_pars_frag: pick_pars_frag,
	  pick_vert: pick_vert,
	  pick_frag: pick_frag,
	  effects_pars: effects_pars,
	  effects_frag_end: effects_frag_end,
	  _template_vert: _template_vert,
	  _template_frag: _template_frag,
	  point_vert: point_vert,
	  point_frag: point_frag,
	  ripple_vert: ripple_vert,
	  ripple_frag: ripple_frag,
	  circle_simple_vert: circle_simple_vert,
	  circle_simple_frag: circle_simple_frag,
	  circle_animate_vert: circle_animate_vert,
	  circle_wave_frag: circle_wave_frag,
	  circle_bubble_frag: circle_bubble_frag,
	  ground_ripple_vert: ground_ripple_vert,
	  ground_ripple_frag: ground_ripple_frag,
	  simple_line_vert: simple_line_vert,
	  simple_line_frag: simple_line_frag,
	  line_vert: line_vert,
	  line_frag: line_frag,
	  line_3d_vert: line_3d_vert,
	  line_3d_frag: line_3d_frag,
	  line_trip_vert: line_trip_vert,
	  line_trip_frag: line_trip_frag,
	  shape_vert: shape_vert,
	  shape_defines: shape_defines,
	  shape_frag: shape_frag,
	  spark_vert: spark_vert,
	  spark_frag: spark_frag,
	  cylinder_spread_vert: cylinder_spread_vert,
	  cylinder_spread_frag: cylinder_spread_frag,
	  heatmap_offline_vert: heatmap_offline_vert,
	  heatmap_offline_frag: heatmap_offline_frag,
	  heatmap_vert: heatmap_vert,
	  heatmap_frag: heatmap_frag
	};

	var shaderLibs = {
	  point: {
	    vertexShader: ShaderChunk.point_vert,
	    fragmentShader: ShaderChunk.point_frag
	  },
	  ripple: {
	    vertexShader: ShaderChunk.ripple_vert,
	    fragmentShader: ShaderChunk.ripple_frag
	  },
	  circle_simple: {
	    vertexShader: ShaderChunk.circle_simple_vert,
	    fragmentShader: ShaderChunk.circle_simple_frag
	  },
	  circle_wave: {
	    vertexShader: ShaderChunk.circle_animate_vert,
	    fragmentShader: ShaderChunk.circle_wave_frag
	  },
	  circle_bubble: {
	    vertexShader: ShaderChunk.circle_animate_vert,
	    fragmentShader: ShaderChunk.circle_bubble_frag
	  },
	  ground_ripple: {
	    vertexShader: ShaderChunk.ground_ripple_vert,
	    fragmentShader: ShaderChunk.ground_ripple_frag
	  },
	  simple_line: {
	    vertexShader: ShaderChunk.simple_line_vert,
	    fragmentShader: ShaderChunk.simple_line_frag
	  },
	  line: {
	    vertexShader: ShaderChunk.line_vert,
	    fragmentShader: ShaderChunk.line_frag
	  },
	  line_3d: {
	    vertexShader: ShaderChunk.line_3d_vert,
	    fragmentShader: ShaderChunk.line_3d_frag
	  },
	  line_trip: {
	    vertexShader: ShaderChunk.line_trip_vert,
	    fragmentShader: ShaderChunk.line_trip_frag
	  },
	  shape: {
	    vertexShader: ShaderChunk.shape_vert,
	    fragmentShader: ShaderChunk.shape_frag
	  },
	  spark: {
	    vertexShader: ShaderChunk.spark_vert,
	    fragmentShader: ShaderChunk.spark_frag
	  },
	  cylinder_spread: {
	    vertexShader: ShaderChunk.cylinder_spread_vert,
	    fragmentShader: ShaderChunk.cylinder_spread_frag
	  },
	  heatmap_offline: {
	    vertexShader: ShaderChunk.heatmap_offline_vert,
	    fragmentShader: ShaderChunk.heatmap_offline_frag
	  },
	  heatmap: {
	    vertexShader: ShaderChunk.heatmap_vert,
	    fragmentShader: ShaderChunk.heatmap_frag
	  }
	};

	// https://tc39.github.io/ecma262/#sec-typedarray-objects

	typedArrayConstructor('Int32', function (init) {
	  return function Int32Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	// --- Utilities ---
	// Array Caches (provide typed arrays for temporary by size)
	var arrayCacheF32 = [];
	var arrayCacheI32 = []; // Float32Array caches used for uploading Matrix uniforms

	var mat4array = new Float32Array(16);
	var mat3array = new Float32Array(9);
	var mat2array = new Float32Array(4); // Flattening for arrays of vectors and matrices

	function flatten(array, nBlocks, blockSize) {
	  var firstElem = array[0];
	  if (firstElem <= 0 || firstElem > 0) return array; // unoptimized: ! isNaN( firstElem )
	  // see http://jacksondunstan.com/articles/983

	  var n = nBlocks * blockSize;
	  var r = arrayCacheF32[n];

	  if (r === undefined) {
	    r = new Float32Array(n);
	    arrayCacheF32[n] = r;
	  }

	  if (nBlocks !== 0) {
	    firstElem.toArray(r, 0);

	    for (var i = 1, offset = 0; i !== nBlocks; ++i) {
	      offset += blockSize;
	      array[i].toArray(r, offset);
	    }
	  }

	  return r;
	}

	function arraysEqual(a, b) {
	  if (a.length !== b.length) return false;

	  for (var i = 0, l = a.length; i < l; i++) {
	    if (a[i] !== b[i]) return false;
	  }

	  return true;
	}

	function copyArray(a, b) {
	  for (var i = 0, l = b.length; i < l; i++) {
	    a[i] = b[i];
	  }
	} // Texture unit allocation


	function allocTexUnits(textures, n) {
	  var r = arrayCacheI32[n];

	  if (r === undefined) {
	    r = new Int32Array(n);
	    arrayCacheI32[n] = r;
	  }

	  for (var i = 0; i !== n; ++i) {
	    r[i] = textures.allocateTextureUnit();
	  }

	  return r;
	} // --- Setters ---
	// Note: Defining these methods externally, because they come in a bunch
	// and this way their names minify.
	// Single scalar


	function setValueV1f(gl, v) {
	  var cache = this.cache;
	  if (cache[0] === v) return;
	  gl.uniform1f(this.addr, v);
	  cache[0] = v;
	}

	function setValueV2f(gl, v) {
	  var cache = this.cache;

	  if (v.x !== undefined) {
	    if (cache[0] !== v.x || cache[1] !== v.y) {
	      gl.uniform2f(this.addr, v.x, v.y);
	      cache[0] = v.x;
	      cache[1] = v.y;
	    }
	  } else {
	    if (arraysEqual(cache, v)) return;
	    gl.uniform2fv(this.addr, v);
	    copyArray(cache, v);
	  }
	}

	function setValueV3f(gl, v) {
	  var cache = this.cache;

	  if (v.x !== undefined) {
	    if (cache[0] !== v.x || cache[1] !== v.y || cache[2] !== v.z) {
	      gl.uniform3f(this.addr, v.x, v.y, v.z);
	      cache[0] = v.x;
	      cache[1] = v.y;
	      cache[2] = v.z;
	    }
	  } else if (v.r !== undefined) {
	    if (cache[0] !== v.r || cache[1] !== v.g || cache[2] !== v.b) {
	      gl.uniform3f(this.addr, v.r, v.g, v.b);
	      cache[0] = v.r;
	      cache[1] = v.g;
	      cache[2] = v.b;
	    }
	  } else {
	    if (arraysEqual(cache, v)) return;
	    gl.uniform3fv(this.addr, v);
	    copyArray(cache, v);
	  }
	}

	function setValueV4f(gl, v) {
	  var cache = this.cache;

	  if (v.x !== undefined) {
	    if (cache[0] !== v.x || cache[1] !== v.y || cache[2] !== v.z || cache[3] !== v.w) {
	      gl.uniform4f(this.addr, v.x, v.y, v.z, v.w);
	      cache[0] = v.x;
	      cache[1] = v.y;
	      cache[2] = v.z;
	      cache[3] = v.w;
	    }
	  } else if (v.r !== undefined) {
	    if (cache[0] !== v.r || cache[1] !== v.g || cache[2] !== v.b || cache[3] !== v.a) {
	      gl.uniform4f(this.addr, v.r, v.g, v.b, v.a);
	      cache[0] = v.r;
	      cache[1] = v.g;
	      cache[2] = v.b;
	      cache[3] = v.a;
	    }
	  } else {
	    if (arraysEqual(cache, v)) return;
	    gl.uniform4fv(this.addr, v);
	    copyArray(cache, v);
	  }
	}

	function setValueM2(gl, v) {
	  var cache = this.cache;
	  var elements = v.elements;

	  if (elements === undefined) {
	    if (arraysEqual(cache, v)) return;
	    gl.uniformMatrix2fv(this.addr, false, v);
	    copyArray(cache, v);
	  } else {
	    if (arraysEqual(cache, elements)) return;
	    mat2array.set(elements);
	    gl.uniformMatrix2fv(this.addr, false, mat2array);
	    copyArray(cache, elements);
	  }
	}

	function setValueM3(gl, v) {
	  var cache = this.cache;
	  var elements = v.elements;

	  if (elements === undefined) {
	    if (arraysEqual(cache, v)) return;
	    gl.uniformMatrix3fv(this.addr, false, v);
	    copyArray(cache, v);
	  } else {
	    if (arraysEqual(cache, elements)) return;
	    mat3array.set(elements);
	    gl.uniformMatrix3fv(this.addr, false, mat3array);
	    copyArray(cache, elements);
	  }
	}

	function setValueM4(gl, v) {
	  var cache = this.cache;
	  var elements = v.elements;

	  if (elements === undefined) {
	    if (arraysEqual(cache, v)) return;
	    gl.uniformMatrix4fv(this.addr, false, v);
	    copyArray(cache, v);
	  } else {
	    if (arraysEqual(cache, elements)) return;
	    mat4array.set(elements);
	    gl.uniformMatrix4fv(this.addr, false, mat4array);
	    copyArray(cache, elements);
	  }
	}

	function setValueT1(gl, v, textures) {
	  var cache = this.cache;
	  var unit = textures.allocateTextureUnit();

	  if (cache[0] !== unit) {
	    gl.uniform1i(this.addr, unit);
	    cache[0] = unit;
	  }

	  textures.setTexture2D(gl, v, unit);
	}

	function setValueV1i(gl, v) {
	  var cache = this.cache;
	  if (cache[0] === v) return;
	  gl.uniform1i(this.addr, v);
	  cache[0] = v;
	}

	function setValueV2i(gl, v) {
	  var cache = this.cache;
	  if (arraysEqual(cache, v)) return;
	  gl.uniform2iv(this.addr, v);
	  copyArray(cache, v);
	}

	function setValueV3i(gl, v) {
	  var cache = this.cache;
	  if (arraysEqual(cache, v)) return;
	  gl.uniform3iv(this.addr, v);
	  copyArray(cache, v);
	}

	function setValueV4i(gl, v) {
	  var cache = this.cache;
	  if (arraysEqual(cache, v)) return;
	  gl.uniform4iv(this.addr, v);
	  copyArray(cache, v);
	}

	function setValueV1ui(gl, v) {
	  var cache = this.cache;
	  if (cache[0] === v) return;
	  gl.uniform1ui(this.addr, v);
	  cache[0] = v;
	} // Helper to pick the right setter for the singular case


	function getSingularSetter(type) {
	  switch (type) {
	    case 0x1406:
	      return setValueV1f;
	    // FLOAT

	    case 0x8b50:
	      return setValueV2f;
	    // _VEC2

	    case 0x8b51:
	      return setValueV3f;
	    // _VEC3

	    case 0x8b52:
	      return setValueV4f;
	    // _VEC4

	    case 0x8b5a:
	      return setValueM2;
	    // _MAT2

	    case 0x8b5b:
	      return setValueM3;
	    // _MAT3

	    case 0x8b5c:
	      return setValueM4;
	    // _MAT4

	    case 0x1404:
	    case 0x8b56:
	      return setValueV1i;
	    // INT, BOOL

	    case 0x8b53:
	    case 0x8b57:
	      return setValueV2i;
	    // _VEC2

	    case 0x8b54:
	    case 0x8b58:
	      return setValueV3i;
	    // _VEC3

	    case 0x8b55:
	    case 0x8b59:
	      return setValueV4i;
	    // _VEC4

	    case 0x1405:
	      return setValueV1ui;
	    // UINT

	    case 0x8b5e: // SAMPLER_2D

	    case 0x8d66: // SAMPLER_EXTERNAL_OES

	    case 0x8dca: // INT_SAMPLER_2D

	    case 0x8dd2: // UNSIGNED_INT_SAMPLER_2D

	    case 0x8b62:
	      // SAMPLER_2D_SHADOW
	      return setValueT1;
	  }
	} // Array of scalars


	function setValueV1fArray(gl, v) {
	  gl.uniform1fv(this.addr, v);
	}

	function setValueV1iArray(gl, v) {
	  gl.uniform1iv(this.addr, v);
	}

	function setValueV2iArray(gl, v) {
	  gl.uniform2iv(this.addr, v);
	}

	function setValueV3iArray(gl, v) {
	  gl.uniform3iv(this.addr, v);
	}

	function setValueV4iArray(gl, v) {
	  gl.uniform4iv(this.addr, v);
	}

	function setValueV2fArray(gl, v) {
	  var data = flatten(v, this.size, 2);
	  gl.uniform2fv(this.addr, data);
	}

	function setValueV3fArray(gl, v) {
	  var data = flatten(v, this.size, 3);
	  gl.uniform3fv(this.addr, data);
	}

	function setValueV4fArray(gl, v) {
	  var data = flatten(v, this.size, 4);
	  gl.uniform4fv(this.addr, data);
	}

	function setValueM2Array(gl, v) {
	  var data = flatten(v, this.size, 4);
	  gl.uniformMatrix2fv(this.addr, false, data);
	}

	function setValueM3Array(gl, v) {
	  var data = flatten(v, this.size, 9);
	  gl.uniformMatrix3fv(this.addr, false, data);
	}

	function setValueM4Array(gl, v) {
	  var data = flatten(v, this.size, 16);
	  gl.uniformMatrix4fv(this.addr, false, data);
	}

	function setValueT1Array(gl, v, textures) {
	  var n = v.length;
	  var units = allocTexUnits(textures, n);
	  gl.uniform1iv(this.addr, units);

	  for (var i = 0; i !== n; ++i) {
	    textures.setTexture2D(gl, v[i], units[i]);
	  }
	} // Helper to pick the right setter for a pure (bottom-level) array


	function getPureArraySetter(type) {
	  switch (type) {
	    case 0x1406:
	      return setValueV1fArray;
	    // FLOAT

	    case 0x8b50:
	      return setValueV2fArray;
	    // _VEC2

	    case 0x8b51:
	      return setValueV3fArray;
	    // _VEC3

	    case 0x8b52:
	      return setValueV4fArray;
	    // _VEC4

	    case 0x8b5a:
	      return setValueM2Array;
	    // _MAT2

	    case 0x8b5b:
	      return setValueM3Array;
	    // _MAT3

	    case 0x8b5c:
	      return setValueM4Array;
	    // _MAT4

	    case 0x1404:
	    case 0x8b56:
	      return setValueV1iArray;
	    // INT, BOOL

	    case 0x8b53:
	    case 0x8b57:
	      return setValueV2iArray;
	    // _VEC2

	    case 0x8b54:
	    case 0x8b58:
	      return setValueV3iArray;
	    // _VEC3

	    case 0x8b55:
	    case 0x8b59:
	      return setValueV4iArray;
	    // _VEC4

	    case 0x8b5e: // SAMPLER_2D

	    case 0x8d66: // SAMPLER_EXTERNAL_OES

	    case 0x8dca: // INT_SAMPLER_2D

	    case 0x8dd2: // UNSIGNED_INT_SAMPLER_2D

	    case 0x8b62:
	      // SAMPLER_2D_SHADOW
	      return setValueT1Array;
	  }
	} // --- Uniform Classes ---


	var SingleUniform = function SingleUniform(id, activeInfo, addr) {
	  _classCallCheck(this, SingleUniform);

	  this.id = id;
	  this.addr = addr;
	  this.cache = [];
	  this.setValue = getSingularSetter(activeInfo.type); // this.path = activeInfo.name; // DEBUG
	};

	var PureArrayUniform = /*#__PURE__*/function () {
	  function PureArrayUniform(id, activeInfo, addr) {
	    _classCallCheck(this, PureArrayUniform);

	    this.id = id;
	    this.addr = addr;
	    this.cache = [];
	    this.size = activeInfo.size;
	    this.setValue = getPureArraySetter(activeInfo.type); // this.path = activeInfo.name; // DEBUG
	  }

	  _createClass(PureArrayUniform, [{
	    key: "updateCache",
	    value: function updateCache(data) {
	      var cache = this.cache;

	      if (data instanceof Float32Array && cache.length !== data.length) {
	        this.cache = new Float32Array(data.length);
	      }

	      copyArray(cache, data);
	    }
	  }]);

	  return PureArrayUniform;
	}();

	var StructuredUniform = /*#__PURE__*/function () {
	  function StructuredUniform(id) {
	    _classCallCheck(this, StructuredUniform);

	    this.id = id;
	    this.seq = [];
	    this.map = {};
	  }

	  _createClass(StructuredUniform, [{
	    key: "setValue",
	    value: function setValue(gl, value) {
	      var seq = this.seq;

	      for (var i = 0, n = seq.length; i !== n; ++i) {
	        var u = seq[i];
	        u.setValue(gl, value[u.id]);
	      }
	    }
	  }]);

	  return StructuredUniform;
	}(); // --- Top-level ---
	// Parser - builds up the property tree from the path strings


	var RePathPart = /([\w\d_]+)(\])?(\[|\.)?/g; // extracts
	// 	- the identifier (member name or array index)
	//  - followed by an optional right bracket (found when array index)
	//  - followed by an optional left bracket or dot (type of subscript)
	//
	// Note: These portions can be read in a non-overlapping fashion and
	// allow straightforward parsing of the hierarchy that WebGL encodes
	// in the uniform names.

	function addUniform(container, uniformObject) {
	  container.seq.push(uniformObject);
	  container.map[uniformObject.id] = uniformObject;
	}

	function parseUniform(activeInfo, addr, container) {
	  var path = activeInfo.name,
	      pathLength = path.length; // reset RegExp object, because of the early exit of a previous run

	  RePathPart.lastIndex = 0; // eslint-disable-next-line no-constant-condition

	  while (true) {
	    var match = RePathPart.exec(path),
	        matchEnd = RePathPart.lastIndex;
	    var id = match[1];
	    var idIsIndex = match[2] === "]",
	        subscript = match[3];
	    if (idIsIndex) id = id | 0; // convert to integer

	    if (subscript === undefined || subscript === "[" && matchEnd + 2 === pathLength) {
	      // bare name or "pure" bottom-level array "[0]" suffix
	      addUniform(container, subscript === undefined ? new SingleUniform(id, activeInfo, addr) : new PureArrayUniform(id, activeInfo, addr));
	      break;
	    } else {
	      // step into inner node / create it in case it doesn't exist
	      var map = container.map;
	      var next = map[id];

	      if (next === undefined) {
	        next = new StructuredUniform(id);
	        addUniform(container, next);
	      }

	      container = next;
	    }
	  }
	} // Root Container


	var Uniforms = /*#__PURE__*/function () {
	  function Uniforms(gl, program) {
	    _classCallCheck(this, Uniforms);

	    this.seq = [];
	    this.map = {};
	    var n = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);

	    for (var i = 0; i < n; ++i) {
	      var info = gl.getActiveUniform(program, i),
	          addr = gl.getUniformLocation(program, info.name);
	      parseUniform(info, addr, this);
	    }
	  }

	  _createClass(Uniforms, [{
	    key: "setValue",
	    value: function setValue(gl, name, value, textures) {
	      var u = this.map[name];
	      if (u !== undefined) u.setValue(gl, value, textures);
	    }
	  }, {
	    key: "setOptional",
	    value: function setOptional(gl, object, name, textures) {
	      var v = object[name];
	      if (v !== undefined) this.setValue(gl, name, v, textures);
	    }
	  }]);

	  return Uniforms;
	}();

	var Textures = /*#__PURE__*/function () {
	  function Textures(gl) {
	    _classCallCheck(this, Textures);

	    this.textureUnits = 0;
	    this.maxTextures = gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
	  }

	  _createClass(Textures, [{
	    key: "allocateTextureUnit",
	    value: function allocateTextureUnit() {
	      var textureUnits = this.textureUnits;

	      if (textureUnits >= this.maxTextures) {
	        console.warn("WebGLTextures: Trying to use " + textureUnits + " texture units while this GPU supports only " + this.maxTextures);
	      }

	      this.textureUnits += 1;
	      return textureUnits;
	    }
	  }, {
	    key: "resetTextureUnits",
	    value: function resetTextureUnits() {
	      this.textureUnits = 0;
	    }
	  }, {
	    key: "setTexture2D",
	    value: function setTexture2D(gl, texture, slot) {
	      gl.activeTexture(gl["TEXTURE" + slot]);
	      gl.bindTexture(gl.TEXTURE_2D, texture);
	    }
	  }]);

	  return Textures;
	}();

	var quot = /"/g; // B.2.3.2.1 CreateHTML(string, tag, attribute, value)
	// https://tc39.github.io/ecma262/#sec-createhtml

	var createHtml = function (string, tag, attribute, value) {
	  var S = String(requireObjectCoercible(string));
	  var p1 = '<' + tag;
	  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
	  return p1 + '>' + S + '</' + tag + '>';
	};

	// of a tag and escaping quotes in arguments

	var stringHtmlForced = function (METHOD_NAME) {
	  return fails(function () {
	    var test = ''[METHOD_NAME]('"');
	    return test !== test.toLowerCase() || test.split('"').length > 3;
	  });
	};

	// https://tc39.github.io/ecma262/#sec-string.prototype.sub


	_export({
	  target: 'String',
	  proto: true,
	  forced: stringHtmlForced('sub')
	}, {
	  sub: function sub() {
	    return createHtml(this, 'sub', '', '');
	  }
	});

	var uidCounters = {};
	/**
	 * Returns a UID.
	 * @param {String} id= - Identifier base name
	 * @return {number} uid
	 **/

	function uid$1() {
	  var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "id";
	  uidCounters[id] = uidCounters[id] || 1;
	  var count = uidCounters[id]++;
	  return "".concat(id, "-").concat(count);
	} // Returns true if given object is empty, false otherwise.

	function isObjectEmpty(obj) {
	  var isEmpty = true;
	  /* eslint-disable no-unused-vars  */

	  for (var key in obj) {
	    isEmpty = false;
	    break;
	  }
	  /* eslint-enable no-unused-vars  */


	  return isEmpty;
	}

	var LayerEffect = /*#__PURE__*/function () {
	  function LayerEffect(id, uniformName) {
	    _classCallCheck(this, LayerEffect);

	    this.id = id;
	    this.uniformName = uniformName;
	    this.size = 0;
	    this.seq = [];
	  }

	  _createClass(LayerEffect, [{
	    key: "add",
	    value: function add(effectLayer) {
	      this.size += effectLayer.group.length;
	      this.seq.push(effectLayer);
	    }
	  }, {
	    key: "update",
	    value: function update(program) {
	      var _ref;

	      var objs = (_ref = []).concat.apply(_ref, _toConsumableArray(this.seq.map(function (l) {
	        // 图层之间的相对偏移
	        var pointOffset = sub([], program.layer.getPointOffset(), l.getPointOffset()); // 获取所有的 effect OBJ

	        return l.getEffectObjs(function (coord) {
	          if (coord.length === 0) {
	            return sub$1([], coord, pointOffset);
	          } else {
	            return sub([], coord, pointOffset);
	          }
	        });
	      })));

	      program.setUniform(this.uniformName, objs);
	    }
	  }]);

	  return LayerEffect;
	}();

	function parseEffect(effects, container) {
	  for (var i = 0; i < effects.length; i++) {
	    var effect = effects[i];
	    var id = effect.effectType,
	        uniformName = effect.effectUniformName;
	    if (!id) continue;
	    var map = container.map;
	    var next = map[id];

	    if (next === undefined) {
	      next = new LayerEffect(id, uniformName);
	      map[id] = next;
	    }

	    next.add(effect);
	  }
	}

	var Effects = /*#__PURE__*/function () {
	  function Effects() {
	    var effects = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

	    _classCallCheck(this, Effects);

	    this.map = {};
	    parseEffect(effects, this);
	  }

	  _createClass(Effects, [{
	    key: "update",
	    value: function update(program) {
	      for (var key in this.map) {
	        this.map[key].update(program);
	      }
	    }
	  }, {
	    key: "isEmpty",
	    get: function get() {
	      return isObjectEmpty(this.map);
	    }
	  }]);

	  return Effects;
	}();

	function addLineNumbers(string) {
	  var lines = string.split("\n");

	  for (var i = 0; i < lines.length; i++) {
	    lines[i] = i + 1 + ": " + lines[i];
	  }

	  return lines.join("\n");
	}

	function getParameters(options, layer) {
	  var shaderId = options.shaderId,
	      defines = options.defines;
	  var vertexShader = options.vertexShader,
	      fragmentShader = options.fragmentShader;

	  if (shaderId) {
	    var shader = shaderLibs[shaderId];
	    vertexShader = shader.vertexShader;
	    fragmentShader = shader.fragmentShader;
	  }

	  return {
	    defines: defines,
	    vertexShader: vertexShader,
	    fragmentShader: fragmentShader,
	    effects: new Effects(layer ? layer.options.effects : [])
	  };
	}

	function generateDefines(defines) {
	  if (!defines) return "";
	  var chunks = [];

	  for (var name in defines) {
	    var value = defines[name];
	    if (value === false) continue; // 如果是个数组类型

	    if (Array.isArray(defines)) {
	      chunks.push("#define ".concat(value));
	    } // 如果是键值对
	    else {
	        chunks.push("#define ".concat(name, " ").concat(value));
	      }
	  }

	  return chunks.join("\n");
	} // Resolve Includes


	var includePattern = /^[ \t]*#include +<([\w\d./]+)>/gm;

	function resolveIncludes(string) {
	  return string.replace(includePattern, includeReplacer);
	}

	function includeReplacer(match, include) {
	  var string = ShaderChunk[include];

	  if (string === undefined) {
	    throw new Error("Can not resolve #include <" + include + ">");
	  }

	  return resolveIncludes(string);
	} // effects


	function replaceEffectNums(string, effects) {
	  var effectMap = effects.map;

	  for (var key in effectMap) {
	    string = string.replace(new RegExp(key, "g"), effectMap[key].size);
	  }

	  return string.replace(/NUM_([A-Z]|_)*S/g, 0);
	} // Unroll Loops


	var deprecatedUnrollLoopPattern = /#pragma unroll_loop[\s]+?for \( int i = (\d+); i < (\d+); i \+\+ \) \{([\s\S]+?)(?=\})\}/g;
	var unrollLoopPattern = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;

	function unrollLoops(string) {
	  return string.replace(unrollLoopPattern, loopReplacer).replace(deprecatedUnrollLoopPattern, deprecatedLoopReplacer);
	}

	function deprecatedLoopReplacer(match, start, end, snippet) {
	  console.warn("WebGLProgram: #pragma unroll_loop shader syntax is deprecated. Please use #pragma unroll_loop_start syntax instead.");
	  return loopReplacer(match, start, end, snippet);
	}

	function loopReplacer(match, start, end, snippet) {
	  var string = "";

	  for (var i = parseInt(start); i < parseInt(end); i++) {
	    string += snippet.replace(/\[\s*i\s*\]/g, "[ " + i + " ]").replace(/UNROLLED_LOOP_INDEX/g, i);
	  }

	  return string;
	} // fetch attribute


	function fetchAttributeLocations(gl, program) {
	  var attributes = {};
	  var n = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);

	  for (var i = 0; i < n; i++) {
	    var info = gl.getActiveAttrib(program, i);
	    var name = info.name;
	    attributes[name] = gl.getAttribLocation(program, name);
	  }

	  return attributes;
	} // init shader


	function createAndLinkProgram(gl, vertexShaderStr, fragmentShaderStr) {
	  var program = false; // 顶点着色器

	  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
	  gl.shaderSource(vertexShader, vertexShaderStr);
	  gl.compileShader(vertexShader);

	  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
	    var error = "Vertex shader failed to compile.  The error log is:" + gl.getShaderInfoLog(vertexShader);
	    console.error(error, addLineNumbers(vertexShaderStr));
	    gl.deleteShader(vertexShader);
	    return null;
	  } // 栅格着色器


	  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
	  gl.shaderSource(fragmentShader, fragmentShaderStr);
	  gl.compileShader(fragmentShader);

	  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
	    var _error = "Fragment shader failed to compile.  The error log is:" + gl.getShaderInfoLog(fragmentShader);

	    console.error(_error, addLineNumbers(fragmentShaderStr));
	    gl.deleteShader(fragmentShader);
	    return null;
	  } // 创建webgl程序


	  program = gl.createProgram();
	  gl.attachShader(program, vertexShader);
	  gl.attachShader(program, fragmentShader);
	  gl.deleteShader(vertexShader);
	  gl.deleteShader(fragmentShader);
	  gl.linkProgram(program); // 程序编译完成

	  if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
	    return program;
	  } else {
	    var _error2 = "Shader program failed to link.  The error log is:" + gl.getProgramInfoLog(program);

	    console.error(_error2);
	    gl.deleteProgram(program);
	    return null;
	  }
	}

	var Program = /*#__PURE__*/function () {
	  function Program(gl, options, layer) {
	    _classCallCheck(this, Program);

	    this.gl = gl;
	    this.parameters = getParameters(options, layer);
	    this.effects = this.parameters.effects;

	    if (layer) {
	      this.layer = layer;
	      this.map = layer.map;
	    } // 取得着色器代码并进行预处理


	    var _this$parameters = this.parameters,
	        vertexShader = _this$parameters.vertexShader,
	        fragmentShader = _this$parameters.fragmentShader; // 定义相关defines

	    var customDefines = generateDefines(this.parameters.defines); // 预编译相关代码

	    var vertexGlsl = [customDefines, this.getShader(vertexShader, "vert")].join("\n");
	    var fragmentGlsl = [customDefines, this.getShader(fragmentShader, "frag")].join("\n"); // 初始化program

	    var program = this.program = createAndLinkProgram(gl, vertexGlsl, fragmentGlsl);
	    this.textures = new Textures(gl);
	    this.attributes = fetchAttributeLocations(gl, program);
	    this.uniforms = new Uniforms(gl, program);
	  }

	  _createClass(Program, [{
	    key: "getShader",
	    value: function getShader(shaderStr, type) {
	      // 替换 originMain
	      shaderStr = shaderStr.replace("void main", "void originMain");
	      shaderStr = ShaderChunk["_template_" + type].replace("#pragma ORIGIN_MAIN", shaderStr); // 没有effects相关时

	      if (this.effects.isEmpty) {
	        shaderStr = shaderStr.replace(new RegExp("#include <effects_[a-zA-Z_]*>", "g"), "");
	      } // 解析include相关


	      shaderStr = resolveIncludes(shaderStr);
	      shaderStr = replaceEffectNums(shaderStr, this.effects);
	      shaderStr = unrollLoops(shaderStr); // 剔除无效的定义

	      return shaderStr.replace(/#define GLSLIFY 1\n/g, "");
	    }
	  }, {
	    key: "use",
	    value: function use(gl) {
	      this.gl = gl;
	      gl.useProgram(this.program); // 重置纹理索引

	      this.textures.resetTextureUnits(); // 窗口大小信息

	      this.uniforms.setValue(gl, "MAPV_resolution", [gl.canvas.width, gl.canvas.height], this.textures); // 更新effect信息

	      this.effects.update(this);
	    }
	  }, {
	    key: "setUniform",
	    value: function setUniform(uniformName, data) {
	      this.uniforms.setValue(this.gl, uniformName, data, this.textures);
	    }
	  }, {
	    key: "setUniforms",
	    value: function setUniforms(uniformObjs) {
	      for (var key in uniformObjs) {
	        this.setUniform(key, uniformObjs[key]);
	      }
	    }
	  }]);

	  return Program;
	}();

	// https://tc39.github.io/ecma262/#sec-object.defineproperties

	_export({
	  target: 'Object',
	  stat: true,
	  forced: !descriptors,
	  sham: !descriptors
	}, {
	  defineProperties: objectDefineProperties
	});

	// https://tc39.github.io/ecma262/#sec-typedarray-objects

	typedArrayConstructor('Float64', function (init) {
	  return function Float64Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	// https://tc39.github.io/ecma262/#sec-typedarray-objects

	typedArrayConstructor('Int8', function (init) {
	  return function Int8Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	// https://tc39.github.io/ecma262/#sec-typedarray-objects

	typedArrayConstructor('Int16', function (init) {
	  return function Int16Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	// https://tc39.github.io/ecma262/#sec-typedarray-objects

	typedArrayConstructor('Uint8', function (init) {
	  return function Uint8Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	// https://tc39.github.io/ecma262/#sec-typedarray-objects

	typedArrayConstructor('Uint16', function (init) {
	  return function Uint16Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	// https://tc39.github.io/ecma262/#sec-typedarray-objects

	typedArrayConstructor('Uint32', function (init) {
	  return function Uint32Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	/**
	 * Enum containing WebGL Constant values by name.
	 * for use without an active WebGL context, or in cases where certain constants are unavailable using the WebGL context
	 * (For example, in [Safari 9]{@link https://github.com/CesiumGS/cesium/issues/2989}).
	 *
	 * These match the constants from the [WebGL 1.0]{@link https://www.khronos.org/registry/webgl/specs/latest/1.0/}
	 * and [WebGL 2.0]{@link https://www.khronos.org/registry/webgl/specs/latest/2.0/}
	 * specifications.
	 *
	 * @private
	 * @enum {Number}
	 */
	var WebGLConstants = {
	  DEPTH_BUFFER_BIT: 0x00000100,
	  STENCIL_BUFFER_BIT: 0x00000400,
	  COLOR_BUFFER_BIT: 0x00004000,
	  POINTS: 0x0000,
	  LINES: 0x0001,
	  LINE_LOOP: 0x0002,
	  LINE_STRIP: 0x0003,
	  TRIANGLES: 0x0004,
	  TRIANGLE_STRIP: 0x0005,
	  TRIANGLE_FAN: 0x0006,
	  ZERO: 0,
	  ONE: 1,
	  SRC_COLOR: 0x0300,
	  ONE_MINUS_SRC_COLOR: 0x0301,
	  SRC_ALPHA: 0x0302,
	  ONE_MINUS_SRC_ALPHA: 0x0303,
	  DST_ALPHA: 0x0304,
	  ONE_MINUS_DST_ALPHA: 0x0305,
	  DST_COLOR: 0x0306,
	  ONE_MINUS_DST_COLOR: 0x0307,
	  SRC_ALPHA_SATURATE: 0x0308,
	  FUNC_ADD: 0x8006,
	  BLEND_EQUATION: 0x8009,
	  BLEND_EQUATION_RGB: 0x8009,
	  // same as BLEND_EQUATION
	  BLEND_EQUATION_ALPHA: 0x883d,
	  FUNC_SUBTRACT: 0x800a,
	  FUNC_REVERSE_SUBTRACT: 0x800b,
	  BLEND_DST_RGB: 0x80c8,
	  BLEND_SRC_RGB: 0x80c9,
	  BLEND_DST_ALPHA: 0x80ca,
	  BLEND_SRC_ALPHA: 0x80cb,
	  CONSTANT_COLOR: 0x8001,
	  ONE_MINUS_CONSTANT_COLOR: 0x8002,
	  CONSTANT_ALPHA: 0x8003,
	  ONE_MINUS_CONSTANT_ALPHA: 0x8004,
	  BLEND_COLOR: 0x8005,
	  ARRAY_BUFFER: 0x8892,
	  ELEMENT_ARRAY_BUFFER: 0x8893,
	  ARRAY_BUFFER_BINDING: 0x8894,
	  ELEMENT_ARRAY_BUFFER_BINDING: 0x8895,
	  STREAM_DRAW: 0x88e0,
	  STATIC_DRAW: 0x88e4,
	  DYNAMIC_DRAW: 0x88e8,
	  BUFFER_SIZE: 0x8764,
	  BUFFER_USAGE: 0x8765,
	  CURRENT_VERTEX_ATTRIB: 0x8626,
	  FRONT: 0x0404,
	  BACK: 0x0405,
	  FRONT_AND_BACK: 0x0408,
	  CULL_FACE: 0x0b44,
	  BLEND: 0x0be2,
	  DITHER: 0x0bd0,
	  STENCIL_TEST: 0x0b90,
	  DEPTH_TEST: 0x0b71,
	  SCISSOR_TEST: 0x0c11,
	  POLYGON_OFFSET_FILL: 0x8037,
	  SAMPLE_ALPHA_TO_COVERAGE: 0x809e,
	  SAMPLE_COVERAGE: 0x80a0,
	  NO_ERROR: 0,
	  INVALID_ENUM: 0x0500,
	  INVALID_VALUE: 0x0501,
	  INVALID_OPERATION: 0x0502,
	  OUT_OF_MEMORY: 0x0505,
	  CW: 0x0900,
	  CCW: 0x0901,
	  LINE_WIDTH: 0x0b21,
	  ALIASED_POINT_SIZE_RANGE: 0x846d,
	  ALIASED_LINE_WIDTH_RANGE: 0x846e,
	  CULL_FACE_MODE: 0x0b45,
	  FRONT_FACE: 0x0b46,
	  DEPTH_RANGE: 0x0b70,
	  DEPTH_WRITEMASK: 0x0b72,
	  DEPTH_CLEAR_VALUE: 0x0b73,
	  DEPTH_FUNC: 0x0b74,
	  STENCIL_CLEAR_VALUE: 0x0b91,
	  STENCIL_FUNC: 0x0b92,
	  STENCIL_FAIL: 0x0b94,
	  STENCIL_PASS_DEPTH_FAIL: 0x0b95,
	  STENCIL_PASS_DEPTH_PASS: 0x0b96,
	  STENCIL_REF: 0x0b97,
	  STENCIL_VALUE_MASK: 0x0b93,
	  STENCIL_WRITEMASK: 0x0b98,
	  STENCIL_BACK_FUNC: 0x8800,
	  STENCIL_BACK_FAIL: 0x8801,
	  STENCIL_BACK_PASS_DEPTH_FAIL: 0x8802,
	  STENCIL_BACK_PASS_DEPTH_PASS: 0x8803,
	  STENCIL_BACK_REF: 0x8ca3,
	  STENCIL_BACK_VALUE_MASK: 0x8ca4,
	  STENCIL_BACK_WRITEMASK: 0x8ca5,
	  VIEWPORT: 0x0ba2,
	  SCISSOR_BOX: 0x0c10,
	  COLOR_CLEAR_VALUE: 0x0c22,
	  COLOR_WRITEMASK: 0x0c23,
	  UNPACK_ALIGNMENT: 0x0cf5,
	  PACK_ALIGNMENT: 0x0d05,
	  MAX_TEXTURE_SIZE: 0x0d33,
	  MAX_VIEWPORT_DIMS: 0x0d3a,
	  SUBPIXEL_BITS: 0x0d50,
	  RED_BITS: 0x0d52,
	  GREEN_BITS: 0x0d53,
	  BLUE_BITS: 0x0d54,
	  ALPHA_BITS: 0x0d55,
	  DEPTH_BITS: 0x0d56,
	  STENCIL_BITS: 0x0d57,
	  POLYGON_OFFSET_UNITS: 0x2a00,
	  POLYGON_OFFSET_FACTOR: 0x8038,
	  TEXTURE_BINDING_2D: 0x8069,
	  SAMPLE_BUFFERS: 0x80a8,
	  SAMPLES: 0x80a9,
	  SAMPLE_COVERAGE_VALUE: 0x80aa,
	  SAMPLE_COVERAGE_INVERT: 0x80ab,
	  COMPRESSED_TEXTURE_FORMATS: 0x86a3,
	  DONT_CARE: 0x1100,
	  FASTEST: 0x1101,
	  NICEST: 0x1102,
	  GENERATE_MIPMAP_HINT: 0x8192,
	  BYTE: 0x1400,
	  UNSIGNED_BYTE: 0x1401,
	  SHORT: 0x1402,
	  UNSIGNED_SHORT: 0x1403,
	  INT: 0x1404,
	  UNSIGNED_INT: 0x1405,
	  FLOAT: 0x1406,
	  DEPTH_COMPONENT: 0x1902,
	  ALPHA: 0x1906,
	  RGB: 0x1907,
	  RGBA: 0x1908,
	  LUMINANCE: 0x1909,
	  LUMINANCE_ALPHA: 0x190a,
	  UNSIGNED_SHORT_4_4_4_4: 0x8033,
	  UNSIGNED_SHORT_5_5_5_1: 0x8034,
	  UNSIGNED_SHORT_5_6_5: 0x8363,
	  FRAGMENT_SHADER: 0x8b30,
	  VERTEX_SHADER: 0x8b31,
	  MAX_VERTEX_ATTRIBS: 0x8869,
	  MAX_VERTEX_UNIFORM_VECTORS: 0x8dfb,
	  MAX_VARYING_VECTORS: 0x8dfc,
	  MAX_COMBINED_TEXTURE_IMAGE_UNITS: 0x8b4d,
	  MAX_VERTEX_TEXTURE_IMAGE_UNITS: 0x8b4c,
	  MAX_TEXTURE_IMAGE_UNITS: 0x8872,
	  MAX_FRAGMENT_UNIFORM_VECTORS: 0x8dfd,
	  SHADER_TYPE: 0x8b4f,
	  DELETE_STATUS: 0x8b80,
	  LINK_STATUS: 0x8b82,
	  VALIDATE_STATUS: 0x8b83,
	  ATTACHED_SHADERS: 0x8b85,
	  ACTIVE_UNIFORMS: 0x8b86,
	  ACTIVE_ATTRIBUTES: 0x8b89,
	  SHADING_LANGUAGE_VERSION: 0x8b8c,
	  CURRENT_PROGRAM: 0x8b8d,
	  NEVER: 0x0200,
	  LESS: 0x0201,
	  EQUAL: 0x0202,
	  LEQUAL: 0x0203,
	  GREATER: 0x0204,
	  NOTEQUAL: 0x0205,
	  GEQUAL: 0x0206,
	  ALWAYS: 0x0207,
	  KEEP: 0x1e00,
	  REPLACE: 0x1e01,
	  INCR: 0x1e02,
	  DECR: 0x1e03,
	  INVERT: 0x150a,
	  INCR_WRAP: 0x8507,
	  DECR_WRAP: 0x8508,
	  VENDOR: 0x1f00,
	  RENDERER: 0x1f01,
	  VERSION: 0x1f02,
	  NEAREST: 0x2600,
	  LINEAR: 0x2601,
	  NEAREST_MIPMAP_NEAREST: 0x2700,
	  LINEAR_MIPMAP_NEAREST: 0x2701,
	  NEAREST_MIPMAP_LINEAR: 0x2702,
	  LINEAR_MIPMAP_LINEAR: 0x2703,
	  TEXTURE_MAG_FILTER: 0x2800,
	  TEXTURE_MIN_FILTER: 0x2801,
	  TEXTURE_WRAP_S: 0x2802,
	  TEXTURE_WRAP_T: 0x2803,
	  TEXTURE_2D: 0x0de1,
	  TEXTURE: 0x1702,
	  TEXTURE_CUBE_MAP: 0x8513,
	  TEXTURE_BINDING_CUBE_MAP: 0x8514,
	  TEXTURE_CUBE_MAP_POSITIVE_X: 0x8515,
	  TEXTURE_CUBE_MAP_NEGATIVE_X: 0x8516,
	  TEXTURE_CUBE_MAP_POSITIVE_Y: 0x8517,
	  TEXTURE_CUBE_MAP_NEGATIVE_Y: 0x8518,
	  TEXTURE_CUBE_MAP_POSITIVE_Z: 0x8519,
	  TEXTURE_CUBE_MAP_NEGATIVE_Z: 0x851a,
	  MAX_CUBE_MAP_TEXTURE_SIZE: 0x851c,
	  TEXTURE0: 0x84c0,
	  TEXTURE1: 0x84c1,
	  TEXTURE2: 0x84c2,
	  TEXTURE3: 0x84c3,
	  TEXTURE4: 0x84c4,
	  TEXTURE5: 0x84c5,
	  TEXTURE6: 0x84c6,
	  TEXTURE7: 0x84c7,
	  TEXTURE8: 0x84c8,
	  TEXTURE9: 0x84c9,
	  TEXTURE10: 0x84ca,
	  TEXTURE11: 0x84cb,
	  TEXTURE12: 0x84cc,
	  TEXTURE13: 0x84cd,
	  TEXTURE14: 0x84ce,
	  TEXTURE15: 0x84cf,
	  TEXTURE16: 0x84d0,
	  TEXTURE17: 0x84d1,
	  TEXTURE18: 0x84d2,
	  TEXTURE19: 0x84d3,
	  TEXTURE20: 0x84d4,
	  TEXTURE21: 0x84d5,
	  TEXTURE22: 0x84d6,
	  TEXTURE23: 0x84d7,
	  TEXTURE24: 0x84d8,
	  TEXTURE25: 0x84d9,
	  TEXTURE26: 0x84da,
	  TEXTURE27: 0x84db,
	  TEXTURE28: 0x84dc,
	  TEXTURE29: 0x84dd,
	  TEXTURE30: 0x84de,
	  TEXTURE31: 0x84df,
	  ACTIVE_TEXTURE: 0x84e0,
	  REPEAT: 0x2901,
	  CLAMP_TO_EDGE: 0x812f,
	  MIRRORED_REPEAT: 0x8370,
	  FLOAT_VEC2: 0x8b50,
	  FLOAT_VEC3: 0x8b51,
	  FLOAT_VEC4: 0x8b52,
	  INT_VEC2: 0x8b53,
	  INT_VEC3: 0x8b54,
	  INT_VEC4: 0x8b55,
	  BOOL: 0x8b56,
	  BOOL_VEC2: 0x8b57,
	  BOOL_VEC3: 0x8b58,
	  BOOL_VEC4: 0x8b59,
	  FLOAT_MAT2: 0x8b5a,
	  FLOAT_MAT3: 0x8b5b,
	  FLOAT_MAT4: 0x8b5c,
	  SAMPLER_2D: 0x8b5e,
	  SAMPLER_CUBE: 0x8b60,
	  VERTEX_ATTRIB_ARRAY_ENABLED: 0x8622,
	  VERTEX_ATTRIB_ARRAY_SIZE: 0x8623,
	  VERTEX_ATTRIB_ARRAY_STRIDE: 0x8624,
	  VERTEX_ATTRIB_ARRAY_TYPE: 0x8625,
	  VERTEX_ATTRIB_ARRAY_NORMALIZED: 0x886a,
	  VERTEX_ATTRIB_ARRAY_POINTER: 0x8645,
	  VERTEX_ATTRIB_ARRAY_BUFFER_BINDING: 0x889f,
	  IMPLEMENTATION_COLOR_READ_TYPE: 0x8b9a,
	  IMPLEMENTATION_COLOR_READ_FORMAT: 0x8b9b,
	  COMPILE_STATUS: 0x8b81,
	  LOW_FLOAT: 0x8df0,
	  MEDIUM_FLOAT: 0x8df1,
	  HIGH_FLOAT: 0x8df2,
	  LOW_INT: 0x8df3,
	  MEDIUM_INT: 0x8df4,
	  HIGH_INT: 0x8df5,
	  FRAMEBUFFER: 0x8d40,
	  RENDERBUFFER: 0x8d41,
	  RGBA4: 0x8056,
	  RGB5_A1: 0x8057,
	  RGB565: 0x8d62,
	  DEPTH_COMPONENT16: 0x81a5,
	  STENCIL_INDEX: 0x1901,
	  STENCIL_INDEX8: 0x8d48,
	  DEPTH_STENCIL: 0x84f9,
	  RENDERBUFFER_WIDTH: 0x8d42,
	  RENDERBUFFER_HEIGHT: 0x8d43,
	  RENDERBUFFER_INTERNAL_FORMAT: 0x8d44,
	  RENDERBUFFER_RED_SIZE: 0x8d50,
	  RENDERBUFFER_GREEN_SIZE: 0x8d51,
	  RENDERBUFFER_BLUE_SIZE: 0x8d52,
	  RENDERBUFFER_ALPHA_SIZE: 0x8d53,
	  RENDERBUFFER_DEPTH_SIZE: 0x8d54,
	  RENDERBUFFER_STENCIL_SIZE: 0x8d55,
	  FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE: 0x8cd0,
	  FRAMEBUFFER_ATTACHMENT_OBJECT_NAME: 0x8cd1,
	  FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL: 0x8cd2,
	  FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE: 0x8cd3,
	  COLOR_ATTACHMENT0: 0x8ce0,
	  DEPTH_ATTACHMENT: 0x8d00,
	  STENCIL_ATTACHMENT: 0x8d20,
	  DEPTH_STENCIL_ATTACHMENT: 0x821a,
	  NONE: 0,
	  FRAMEBUFFER_COMPLETE: 0x8cd5,
	  FRAMEBUFFER_INCOMPLETE_ATTACHMENT: 0x8cd6,
	  FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT: 0x8cd7,
	  FRAMEBUFFER_INCOMPLETE_DIMENSIONS: 0x8cd9,
	  FRAMEBUFFER_UNSUPPORTED: 0x8cdd,
	  FRAMEBUFFER_BINDING: 0x8ca6,
	  RENDERBUFFER_BINDING: 0x8ca7,
	  MAX_RENDERBUFFER_SIZE: 0x84e8,
	  INVALID_FRAMEBUFFER_OPERATION: 0x0506,
	  UNPACK_FLIP_Y_WEBGL: 0x9240,
	  UNPACK_PREMULTIPLY_ALPHA_WEBGL: 0x9241,
	  CONTEXT_LOST_WEBGL: 0x9242,
	  UNPACK_COLORSPACE_CONVERSION_WEBGL: 0x9243,
	  BROWSER_DEFAULT_WEBGL: 0x9244,
	  // WEBGL_compressed_texture_s3tc
	  COMPRESSED_RGB_S3TC_DXT1_EXT: 0x83f0,
	  COMPRESSED_RGBA_S3TC_DXT1_EXT: 0x83f1,
	  COMPRESSED_RGBA_S3TC_DXT3_EXT: 0x83f2,
	  COMPRESSED_RGBA_S3TC_DXT5_EXT: 0x83f3,
	  // WEBGL_compressed_texture_pvrtc
	  COMPRESSED_RGB_PVRTC_4BPPV1_IMG: 0x8c00,
	  COMPRESSED_RGB_PVRTC_2BPPV1_IMG: 0x8c01,
	  COMPRESSED_RGBA_PVRTC_4BPPV1_IMG: 0x8c02,
	  COMPRESSED_RGBA_PVRTC_2BPPV1_IMG: 0x8c03,
	  // WEBGL_compressed_texture_etc1
	  COMPRESSED_RGB_ETC1_WEBGL: 0x8d64,
	  // EXT_color_buffer_half_float
	  HALF_FLOAT_OES: 0x8d61,
	  // Desktop OpenGL
	  DOUBLE: 0x140a,
	  // WebGL 2
	  READ_BUFFER: 0x0c02,
	  UNPACK_ROW_LENGTH: 0x0cf2,
	  UNPACK_SKIP_ROWS: 0x0cf3,
	  UNPACK_SKIP_PIXELS: 0x0cf4,
	  PACK_ROW_LENGTH: 0x0d02,
	  PACK_SKIP_ROWS: 0x0d03,
	  PACK_SKIP_PIXELS: 0x0d04,
	  COLOR: 0x1800,
	  DEPTH: 0x1801,
	  STENCIL: 0x1802,
	  RED: 0x1903,
	  RGB8: 0x8051,
	  RGBA8: 0x8058,
	  RGB10_A2: 0x8059,
	  TEXTURE_BINDING_3D: 0x806a,
	  UNPACK_SKIP_IMAGES: 0x806d,
	  UNPACK_IMAGE_HEIGHT: 0x806e,
	  TEXTURE_3D: 0x806f,
	  TEXTURE_WRAP_R: 0x8072,
	  MAX_3D_TEXTURE_SIZE: 0x8073,
	  UNSIGNED_INT_2_10_10_10_REV: 0x8368,
	  MAX_ELEMENTS_VERTICES: 0x80e8,
	  MAX_ELEMENTS_INDICES: 0x80e9,
	  TEXTURE_MIN_LOD: 0x813a,
	  TEXTURE_MAX_LOD: 0x813b,
	  TEXTURE_BASE_LEVEL: 0x813c,
	  TEXTURE_MAX_LEVEL: 0x813d,
	  MIN: 0x8007,
	  MAX: 0x8008,
	  DEPTH_COMPONENT24: 0x81a6,
	  MAX_TEXTURE_LOD_BIAS: 0x84fd,
	  TEXTURE_COMPARE_MODE: 0x884c,
	  TEXTURE_COMPARE_FUNC: 0x884d,
	  CURRENT_QUERY: 0x8865,
	  QUERY_RESULT: 0x8866,
	  QUERY_RESULT_AVAILABLE: 0x8867,
	  STREAM_READ: 0x88e1,
	  STREAM_COPY: 0x88e2,
	  STATIC_READ: 0x88e5,
	  STATIC_COPY: 0x88e6,
	  DYNAMIC_READ: 0x88e9,
	  DYNAMIC_COPY: 0x88ea,
	  MAX_DRAW_BUFFERS: 0x8824,
	  DRAW_BUFFER0: 0x8825,
	  DRAW_BUFFER1: 0x8826,
	  DRAW_BUFFER2: 0x8827,
	  DRAW_BUFFER3: 0x8828,
	  DRAW_BUFFER4: 0x8829,
	  DRAW_BUFFER5: 0x882a,
	  DRAW_BUFFER6: 0x882b,
	  DRAW_BUFFER7: 0x882c,
	  DRAW_BUFFER8: 0x882d,
	  DRAW_BUFFER9: 0x882e,
	  DRAW_BUFFER10: 0x882f,
	  DRAW_BUFFER11: 0x8830,
	  DRAW_BUFFER12: 0x8831,
	  DRAW_BUFFER13: 0x8832,
	  DRAW_BUFFER14: 0x8833,
	  DRAW_BUFFER15: 0x8834,
	  MAX_FRAGMENT_UNIFORM_COMPONENTS: 0x8b49,
	  MAX_VERTEX_UNIFORM_COMPONENTS: 0x8b4a,
	  SAMPLER_3D: 0x8b5f,
	  SAMPLER_2D_SHADOW: 0x8b62,
	  FRAGMENT_SHADER_DERIVATIVE_HINT: 0x8b8b,
	  PIXEL_PACK_BUFFER: 0x88eb,
	  PIXEL_UNPACK_BUFFER: 0x88ec,
	  PIXEL_PACK_BUFFER_BINDING: 0x88ed,
	  PIXEL_UNPACK_BUFFER_BINDING: 0x88ef,
	  FLOAT_MAT2x3: 0x8b65,
	  FLOAT_MAT2x4: 0x8b66,
	  FLOAT_MAT3x2: 0x8b67,
	  FLOAT_MAT3x4: 0x8b68,
	  FLOAT_MAT4x2: 0x8b69,
	  FLOAT_MAT4x3: 0x8b6a,
	  SRGB: 0x8c40,
	  SRGB8: 0x8c41,
	  SRGB8_ALPHA8: 0x8c43,
	  COMPARE_REF_TO_TEXTURE: 0x884e,
	  RGBA32F: 0x8814,
	  RGB32F: 0x8815,
	  RGBA16F: 0x881a,
	  RGB16F: 0x881b,
	  VERTEX_ATTRIB_ARRAY_INTEGER: 0x88fd,
	  MAX_ARRAY_TEXTURE_LAYERS: 0x88ff,
	  MIN_PROGRAM_TEXEL_OFFSET: 0x8904,
	  MAX_PROGRAM_TEXEL_OFFSET: 0x8905,
	  MAX_VARYING_COMPONENTS: 0x8b4b,
	  TEXTURE_2D_ARRAY: 0x8c1a,
	  TEXTURE_BINDING_2D_ARRAY: 0x8c1d,
	  R11F_G11F_B10F: 0x8c3a,
	  UNSIGNED_INT_10F_11F_11F_REV: 0x8c3b,
	  RGB9_E5: 0x8c3d,
	  UNSIGNED_INT_5_9_9_9_REV: 0x8c3e,
	  TRANSFORM_FEEDBACK_BUFFER_MODE: 0x8c7f,
	  MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS: 0x8c80,
	  TRANSFORM_FEEDBACK_VARYINGS: 0x8c83,
	  TRANSFORM_FEEDBACK_BUFFER_START: 0x8c84,
	  TRANSFORM_FEEDBACK_BUFFER_SIZE: 0x8c85,
	  TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN: 0x8c88,
	  RASTERIZER_DISCARD: 0x8c89,
	  MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS: 0x8c8a,
	  MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS: 0x8c8b,
	  INTERLEAVED_ATTRIBS: 0x8c8c,
	  SEPARATE_ATTRIBS: 0x8c8d,
	  TRANSFORM_FEEDBACK_BUFFER: 0x8c8e,
	  TRANSFORM_FEEDBACK_BUFFER_BINDING: 0x8c8f,
	  RGBA32UI: 0x8d70,
	  RGB32UI: 0x8d71,
	  RGBA16UI: 0x8d76,
	  RGB16UI: 0x8d77,
	  RGBA8UI: 0x8d7c,
	  RGB8UI: 0x8d7d,
	  RGBA32I: 0x8d82,
	  RGB32I: 0x8d83,
	  RGBA16I: 0x8d88,
	  RGB16I: 0x8d89,
	  RGBA8I: 0x8d8e,
	  RGB8I: 0x8d8f,
	  RED_INTEGER: 0x8d94,
	  RGB_INTEGER: 0x8d98,
	  RGBA_INTEGER: 0x8d99,
	  SAMPLER_2D_ARRAY: 0x8dc1,
	  SAMPLER_2D_ARRAY_SHADOW: 0x8dc4,
	  SAMPLER_CUBE_SHADOW: 0x8dc5,
	  UNSIGNED_INT_VEC2: 0x8dc6,
	  UNSIGNED_INT_VEC3: 0x8dc7,
	  UNSIGNED_INT_VEC4: 0x8dc8,
	  INT_SAMPLER_2D: 0x8dca,
	  INT_SAMPLER_3D: 0x8dcb,
	  INT_SAMPLER_CUBE: 0x8dcc,
	  INT_SAMPLER_2D_ARRAY: 0x8dcf,
	  UNSIGNED_INT_SAMPLER_2D: 0x8dd2,
	  UNSIGNED_INT_SAMPLER_3D: 0x8dd3,
	  UNSIGNED_INT_SAMPLER_CUBE: 0x8dd4,
	  UNSIGNED_INT_SAMPLER_2D_ARRAY: 0x8dd7,
	  DEPTH_COMPONENT32F: 0x8cac,
	  DEPTH32F_STENCIL8: 0x8cad,
	  FLOAT_32_UNSIGNED_INT_24_8_REV: 0x8dad,
	  FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING: 0x8210,
	  FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE: 0x8211,
	  FRAMEBUFFER_ATTACHMENT_RED_SIZE: 0x8212,
	  FRAMEBUFFER_ATTACHMENT_GREEN_SIZE: 0x8213,
	  FRAMEBUFFER_ATTACHMENT_BLUE_SIZE: 0x8214,
	  FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE: 0x8215,
	  FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE: 0x8216,
	  FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE: 0x8217,
	  FRAMEBUFFER_DEFAULT: 0x8218,
	  UNSIGNED_INT_24_8: 0x84fa,
	  DEPTH24_STENCIL8: 0x88f0,
	  UNSIGNED_NORMALIZED: 0x8c17,
	  DRAW_FRAMEBUFFER_BINDING: 0x8ca6,
	  // Same as FRAMEBUFFER_BINDING
	  READ_FRAMEBUFFER: 0x8ca8,
	  DRAW_FRAMEBUFFER: 0x8ca9,
	  READ_FRAMEBUFFER_BINDING: 0x8caa,
	  RENDERBUFFER_SAMPLES: 0x8cab,
	  FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER: 0x8cd4,
	  MAX_COLOR_ATTACHMENTS: 0x8cdf,
	  COLOR_ATTACHMENT1: 0x8ce1,
	  COLOR_ATTACHMENT2: 0x8ce2,
	  COLOR_ATTACHMENT3: 0x8ce3,
	  COLOR_ATTACHMENT4: 0x8ce4,
	  COLOR_ATTACHMENT5: 0x8ce5,
	  COLOR_ATTACHMENT6: 0x8ce6,
	  COLOR_ATTACHMENT7: 0x8ce7,
	  COLOR_ATTACHMENT8: 0x8ce8,
	  COLOR_ATTACHMENT9: 0x8ce9,
	  COLOR_ATTACHMENT10: 0x8cea,
	  COLOR_ATTACHMENT11: 0x8ceb,
	  COLOR_ATTACHMENT12: 0x8cec,
	  COLOR_ATTACHMENT13: 0x8ced,
	  COLOR_ATTACHMENT14: 0x8cee,
	  COLOR_ATTACHMENT15: 0x8cef,
	  FRAMEBUFFER_INCOMPLETE_MULTISAMPLE: 0x8d56,
	  MAX_SAMPLES: 0x8d57,
	  HALF_FLOAT: 0x140b,
	  RG: 0x8227,
	  RG_INTEGER: 0x8228,
	  R8: 0x8229,
	  RG8: 0x822b,
	  R16F: 0x822d,
	  R32F: 0x822e,
	  RG16F: 0x822f,
	  RG32F: 0x8230,
	  R8I: 0x8231,
	  R8UI: 0x8232,
	  R16I: 0x8233,
	  R16UI: 0x8234,
	  R32I: 0x8235,
	  R32UI: 0x8236,
	  RG8I: 0x8237,
	  RG8UI: 0x8238,
	  RG16I: 0x8239,
	  RG16UI: 0x823a,
	  RG32I: 0x823b,
	  RG32UI: 0x823c,
	  VERTEX_ARRAY_BINDING: 0x85b5,
	  R8_SNORM: 0x8f94,
	  RG8_SNORM: 0x8f95,
	  RGB8_SNORM: 0x8f96,
	  RGBA8_SNORM: 0x8f97,
	  SIGNED_NORMALIZED: 0x8f9c,
	  COPY_READ_BUFFER: 0x8f36,
	  COPY_WRITE_BUFFER: 0x8f37,
	  COPY_READ_BUFFER_BINDING: 0x8f36,
	  // Same as COPY_READ_BUFFER
	  COPY_WRITE_BUFFER_BINDING: 0x8f37,
	  // Same as COPY_WRITE_BUFFER
	  UNIFORM_BUFFER: 0x8a11,
	  UNIFORM_BUFFER_BINDING: 0x8a28,
	  UNIFORM_BUFFER_START: 0x8a29,
	  UNIFORM_BUFFER_SIZE: 0x8a2a,
	  MAX_VERTEX_UNIFORM_BLOCKS: 0x8a2b,
	  MAX_FRAGMENT_UNIFORM_BLOCKS: 0x8a2d,
	  MAX_COMBINED_UNIFORM_BLOCKS: 0x8a2e,
	  MAX_UNIFORM_BUFFER_BINDINGS: 0x8a2f,
	  MAX_UNIFORM_BLOCK_SIZE: 0x8a30,
	  MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS: 0x8a31,
	  MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS: 0x8a33,
	  UNIFORM_BUFFER_OFFSET_ALIGNMENT: 0x8a34,
	  ACTIVE_UNIFORM_BLOCKS: 0x8a36,
	  UNIFORM_TYPE: 0x8a37,
	  UNIFORM_SIZE: 0x8a38,
	  UNIFORM_BLOCK_INDEX: 0x8a3a,
	  UNIFORM_OFFSET: 0x8a3b,
	  UNIFORM_ARRAY_STRIDE: 0x8a3c,
	  UNIFORM_MATRIX_STRIDE: 0x8a3d,
	  UNIFORM_IS_ROW_MAJOR: 0x8a3e,
	  UNIFORM_BLOCK_BINDING: 0x8a3f,
	  UNIFORM_BLOCK_DATA_SIZE: 0x8a40,
	  UNIFORM_BLOCK_ACTIVE_UNIFORMS: 0x8a42,
	  UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES: 0x8a43,
	  UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER: 0x8a44,
	  UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER: 0x8a46,
	  INVALID_INDEX: 0xffffffff,
	  MAX_VERTEX_OUTPUT_COMPONENTS: 0x9122,
	  MAX_FRAGMENT_INPUT_COMPONENTS: 0x9125,
	  MAX_SERVER_WAIT_TIMEOUT: 0x9111,
	  OBJECT_TYPE: 0x9112,
	  SYNC_CONDITION: 0x9113,
	  SYNC_STATUS: 0x9114,
	  SYNC_FLAGS: 0x9115,
	  SYNC_FENCE: 0x9116,
	  SYNC_GPU_COMMANDS_COMPLETE: 0x9117,
	  UNSIGNALED: 0x9118,
	  SIGNALED: 0x9119,
	  ALREADY_SIGNALED: 0x911a,
	  TIMEOUT_EXPIRED: 0x911b,
	  CONDITION_SATISFIED: 0x911c,
	  WAIT_FAILED: 0x911d,
	  SYNC_FLUSH_COMMANDS_BIT: 0x00000001,
	  VERTEX_ATTRIB_ARRAY_DIVISOR: 0x88fe,
	  ANY_SAMPLES_PASSED: 0x8c2f,
	  ANY_SAMPLES_PASSED_CONSERVATIVE: 0x8d6a,
	  SAMPLER_BINDING: 0x8919,
	  RGB10_A2UI: 0x906f,
	  INT_2_10_10_10_REV: 0x8d9f,
	  TRANSFORM_FEEDBACK: 0x8e22,
	  TRANSFORM_FEEDBACK_PAUSED: 0x8e23,
	  TRANSFORM_FEEDBACK_ACTIVE: 0x8e24,
	  TRANSFORM_FEEDBACK_BINDING: 0x8e25,
	  COMPRESSED_R11_EAC: 0x9270,
	  COMPRESSED_SIGNED_R11_EAC: 0x9271,
	  COMPRESSED_RG11_EAC: 0x9272,
	  COMPRESSED_SIGNED_RG11_EAC: 0x9273,
	  COMPRESSED_RGB8_ETC2: 0x9274,
	  COMPRESSED_SRGB8_ETC2: 0x9275,
	  COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2: 0x9276,
	  COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2: 0x9277,
	  COMPRESSED_RGBA8_ETC2_EAC: 0x9278,
	  COMPRESSED_SRGB8_ALPHA8_ETC2_EAC: 0x9279,
	  TEXTURE_IMMUTABLE_FORMAT: 0x912f,
	  MAX_ELEMENT_INDEX: 0x8d6b,
	  TEXTURE_IMMUTABLE_LEVELS: 0x82df,
	  // Extensions
	  MAX_TEXTURE_MAX_ANISOTROPY_EXT: 0x84ff
	};

	/**
	 * 顶点数据的相关类型
	 * 
	 * @private
	 */

	var ComponentDatatype = {
	  /**
	   * 8-bit signed byte corresponding to <code>gl.BYTE</code> and the type
	   * of an element in <code>Int8Array</code>.
	   *
	   * @type {Number}
	   * @constant
	   */
	  BYTE: WebGLConstants.BYTE,

	  /**
	   * 8-bit unsigned byte corresponding to <code>UNSIGNED_BYTE</code> and the type
	   * of an element in <code>Uint8Array</code>.
	   *
	   * @type {Number}
	   * @constant
	   */
	  UNSIGNED_BYTE: WebGLConstants.UNSIGNED_BYTE,

	  /**
	   * 16-bit signed short corresponding to <code>SHORT</code> and the type
	   * of an element in <code>Int16Array</code>.
	   *
	   * @type {Number}
	   * @constant
	   */
	  SHORT: WebGLConstants.SHORT,

	  /**
	   * 16-bit unsigned short corresponding to <code>UNSIGNED_SHORT</code> and the type
	   * of an element in <code>Uint16Array</code>.
	   *
	   * @type {Number}
	   * @constant
	   */
	  UNSIGNED_SHORT: WebGLConstants.UNSIGNED_SHORT,

	  /**
	   * 32-bit signed int corresponding to <code>INT</code> and the type
	   * of an element in <code>Int32Array</code>.
	   *
	   * @memberOf ComponentDatatype
	   *
	   * @type {Number}
	   * @constant
	   */
	  INT: WebGLConstants.INT,

	  /**
	   * 32-bit unsigned int corresponding to <code>UNSIGNED_INT</code> and the type
	   * of an element in <code>Uint32Array</code>.
	   *
	   * @memberOf ComponentDatatype
	   *
	   * @type {Number}
	   * @constant
	   */
	  UNSIGNED_INT: WebGLConstants.UNSIGNED_INT,

	  /**
	   * 32-bit floating-point corresponding to <code>FLOAT</code> and the type
	   * of an element in <code>Float32Array</code>.
	   *
	   * @type {Number}
	   * @constant
	   */
	  FLOAT: WebGLConstants.FLOAT,

	  /**
	   * 64-bit floating-point corresponding to <code>gl.DOUBLE</code> (in Desktop OpenGL;
	   * this is not supported in WebGL, and is emulated in Cesium via {@link GeometryPipeline.encodeAttribute})
	   * and the type of an element in <code>Float64Array</code>.
	   *
	   * @memberOf ComponentDatatype
	   *
	   * @type {Number}
	   * @constant
	   * @default 0x140A
	   */
	  DOUBLE: WebGLConstants.DOUBLE
	};

	ComponentDatatype.getSizeInBytes = function (componentDatatype) {
	  if (!componentDatatype) {
	    throw new Error("value is required.");
	  }

	  switch (componentDatatype) {
	    case ComponentDatatype.BYTE:
	      return Int8Array.BYTES_PER_ELEMENT;

	    case ComponentDatatype.UNSIGNED_BYTE:
	      return Uint8Array.BYTES_PER_ELEMENT;

	    case ComponentDatatype.SHORT:
	      return Int16Array.BYTES_PER_ELEMENT;

	    case ComponentDatatype.UNSIGNED_SHORT:
	      return Uint16Array.BYTES_PER_ELEMENT;

	    case ComponentDatatype.INT:
	      return Int32Array.BYTES_PER_ELEMENT;

	    case ComponentDatatype.UNSIGNED_INT:
	      return Uint32Array.BYTES_PER_ELEMENT;

	    case ComponentDatatype.FLOAT:
	      return Float32Array.BYTES_PER_ELEMENT;

	    case ComponentDatatype.DOUBLE:
	      return Float64Array.BYTES_PER_ELEMENT;

	    default:
	      throw new Error("componentDatatype is not a valid value.");
	  }
	};

	ComponentDatatype.createTypedArray = function (componentDatatype, valuesOrLength) {
	  if (!componentDatatype) {
	    throw new Error("componentDatatype is required.");
	  }

	  if (!valuesOrLength) {
	    throw new Error("valuesOrLength is required.");
	  }

	  switch (componentDatatype) {
	    case ComponentDatatype.BYTE:
	      return new Int8Array(valuesOrLength);

	    case ComponentDatatype.UNSIGNED_BYTE:
	      return new Uint8Array(valuesOrLength);

	    case ComponentDatatype.SHORT:
	      return new Int16Array(valuesOrLength);

	    case ComponentDatatype.UNSIGNED_SHORT:
	      return new Uint16Array(valuesOrLength);

	    case ComponentDatatype.INT:
	      return new Int32Array(valuesOrLength);

	    case ComponentDatatype.UNSIGNED_INT:
	      return new Uint32Array(valuesOrLength);

	    case ComponentDatatype.FLOAT:
	      return new Float32Array(valuesOrLength);

	    case ComponentDatatype.DOUBLE:
	      return new Float64Array(valuesOrLength);

	    default:
	      throw new Error("componentDatatype is not a valid value.");
	  }
	};

	ComponentDatatype.fromName = function (name) {
	  switch (name) {
	    case "BYTE":
	      return ComponentDatatype.BYTE;

	    case "UNSIGNED_BYTE":
	      return ComponentDatatype.UNSIGNED_BYTE;

	    case "SHORT":
	      return ComponentDatatype.SHORT;

	    case "UNSIGNED_SHORT":
	      return ComponentDatatype.UNSIGNED_SHORT;

	    case "INT":
	      return ComponentDatatype.INT;

	    case "UNSIGNED_INT":
	      return ComponentDatatype.UNSIGNED_INT;

	    case "FLOAT":
	      return ComponentDatatype.FLOAT;

	    case "DOUBLE":
	      return ComponentDatatype.DOUBLE;

	    default:
	      throw new Error("name is not a valid value.");
	  }
	};

	/**
	 * 顶点索引数据的相关类型
	 * 
	 * @private
	 */

	var IndexDatatype = {
	  /**
	   * 8-bit unsigned byte corresponding to <code>UNSIGNED_BYTE</code> and the type
	   * of an element in <code>Uint8Array</code>.
	   *
	   * @type {Number}
	   * @constant
	   */
	  UNSIGNED_BYTE: WebGLConstants.UNSIGNED_BYTE,

	  /**
	   * 16-bit unsigned short corresponding to <code>UNSIGNED_SHORT</code> and the type
	   * of an element in <code>Uint16Array</code>.
	   *
	   * @type {Number}
	   * @constant
	   */
	  UNSIGNED_SHORT: WebGLConstants.UNSIGNED_SHORT,

	  /**
	   * 32-bit unsigned int corresponding to <code>UNSIGNED_INT</code> and the type
	   * of an element in <code>Uint32Array</code>.
	   *
	   * @type {Number}
	   * @constant
	   */
	  UNSIGNED_INT: WebGLConstants.UNSIGNED_INT
	};

	IndexDatatype.getSizeInBytes = function (indexDatatype) {
	  switch (indexDatatype) {
	    case IndexDatatype.UNSIGNED_BYTE:
	      return Uint8Array.BYTES_PER_ELEMENT;

	    case IndexDatatype.UNSIGNED_SHORT:
	      return Uint16Array.BYTES_PER_ELEMENT;

	    case IndexDatatype.UNSIGNED_INT:
	      return Uint32Array.BYTES_PER_ELEMENT;
	  }

	  throw new Error("indexDatatype is required and must be a valid IndexDatatype constant.");
	};

	IndexDatatype.fromSizeInBytes = function (sizeInBytes) {
	  switch (sizeInBytes) {
	    case 2:
	      return IndexDatatype.UNSIGNED_SHORT;

	    case 4:
	      return IndexDatatype.UNSIGNED_INT;

	    case 1:
	      return IndexDatatype.UNSIGNED_BYTE;

	    default:
	      throw new Error("Size in bytes cannot be mapped to an IndexDatatype");
	  }
	};

	IndexDatatype.createTypedArray = function (indexDatatype, indicesLengthOrArray) {
	  if (!indexDatatype) {
	    throw new Error("indexDatatype is required.");
	  }

	  if (!indicesLengthOrArray) {
	    throw new Error("indicesLengthOrArray is required.");
	  }

	  switch (indexDatatype) {
	    case IndexDatatype.UNSIGNED_BYTE:
	      return new Int8Array(indicesLengthOrArray);

	    case IndexDatatype.UNSIGNED_SHORT:
	      return new Uint16Array(indicesLengthOrArray);

	    case IndexDatatype.UNSIGNED_INT:
	      return new Uint32Array(indicesLengthOrArray);

	    default:
	      throw new Error("indexDatatype is not a valid value.");
	  }
	};

	// Recommendation is to ignore message but current test suite checks agains the
	// message so keep it for now.
	function assert(condition, message) {
	  if (!condition) {
	    throw new Error(message || 'layer.gl: assertion failed.');
	  }
	}

	function addAttribute(attributes, attribute, buffer) {
	  var name = attribute.name,
	      _attribute$size = attribute.size,
	      size = _attribute$size === void 0 ? 1 : _attribute$size,
	      _attribute$normalize = attribute.normalize,
	      normalize = _attribute$normalize === void 0 ? false : _attribute$normalize;
	  if (!name) throw new Error("attribute needs name"); // 每行数据长度

	  if (buffer.stride === undefined) {
	    buffer.stride = 0;
	  } // 构建新的属性


	  var attr = {
	    name: name,
	    size: size,
	    offset: buffer.stride,
	    normalize: normalize
	  }; // 总长度

	  buffer.stride += size * buffer.bytesPerIndex;
	  attributes.push(attr);
	}

	var IndexBuffer = /*#__PURE__*/function () {
	  function IndexBuffer(_ref) {
	    var gl = _ref.gl,
	        data = _ref.data,
	        _ref$sizeInBytes = _ref.sizeInBytes,
	        sizeInBytes = _ref$sizeInBytes === void 0 ? 0 : _ref$sizeInBytes,
	        _ref$indexDatatype = _ref.indexDatatype,
	        indexDatatype = _ref$indexDatatype === void 0 ? IndexDatatype.UNSIGNED_INT : _ref$indexDatatype,
	        _ref$dynamicDraw = _ref.dynamicDraw,
	        dynamicDraw = _ref$dynamicDraw === void 0 ? false : _ref$dynamicDraw;

	    _classCallCheck(this, IndexBuffer);

	    this.gl = gl;
	    this.buffer = gl.createBuffer();
	    this.dynamicDraw = Boolean(dynamicDraw);
	    this.sizeInBytes = sizeInBytes; // 定义其他变量

	    Object.defineProperties(this, {
	      indexDatatype: {
	        get: function get() {
	          return indexDatatype;
	        }
	      }
	    });
	    this.setData(data);
	  }

	  _createClass(IndexBuffer, [{
	    key: "getTypeArray",
	    value: function getTypeArray(data) {
	      return IndexDatatype.createTypedArray(this.indexDatatype, data);
	    }
	  }, {
	    key: "bind",
	    value: function bind() {
	      var gl = this.gl;
	      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffer);
	    }
	  }, {
	    key: "setData",
	    value: function setData(data) {
	      var gl = this.gl;
	      var typeArray;

	      if (data) {
	        typeArray = this.getTypeArray(data);
	        this.sizeInBytes = typeArray.byteLength;
	      }

	      gl.unbindVAO();
	      this.bind();
	      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, typeArray ? typeArray : this.sizeInBytes, this.dynamicDraw ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW);
	    }
	  }, {
	    key: "updateData",
	    value: function updateData(data) {
	      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	      var gl = this.gl;
	      assert(this.dynamicDraw);
	      gl.unbindVAO();
	      this.bind();
	      gl.bufferSubData(gl.ELEMENT_ARRAY_BUFFER, offset, this.getTypeArray(data));
	    }
	  }, {
	    key: "destroy",
	    value: function destroy() {
	      var gl = this.gl;

	      if (this.buffer) {
	        gl.deleteBuffer(this.buffer);
	        delete this.buffer;
	      }
	    }
	  }, {
	    key: "bytesPerIndex",
	    get: function get() {
	      return IndexDatatype.getSizeInBytes(this.indexDatatype);
	    }
	  }, {
	    key: "numberOfIndices",
	    get: function get() {
	      return this.sizeInBytes / this.bytesPerIndex;
	    }
	  }]);

	  return IndexBuffer;
	}();
	var VertexBuffer = /*#__PURE__*/function () {
	  function VertexBuffer(_ref2) {
	    var gl = _ref2.gl,
	        data = _ref2.data,
	        attributes = _ref2.attributes,
	        _ref2$sizeInBytes = _ref2.sizeInBytes,
	        sizeInBytes = _ref2$sizeInBytes === void 0 ? 0 : _ref2$sizeInBytes,
	        _ref2$componentDataty = _ref2.componentDatatype,
	        componentDatatype = _ref2$componentDataty === void 0 ? ComponentDatatype.FLOAT : _ref2$componentDataty,
	        _ref2$dynamicDraw = _ref2.dynamicDraw,
	        dynamicDraw = _ref2$dynamicDraw === void 0 ? false : _ref2$dynamicDraw;

	    _classCallCheck(this, VertexBuffer);

	    this.gl = gl;
	    this.buffer = gl.createBuffer();
	    this.dynamicDraw = Boolean(dynamicDraw);
	    this.sizeInBytes = sizeInBytes; // 定义其他变量

	    Object.defineProperties(this, {
	      componentDatatype: {
	        get: function get() {
	          return componentDatatype;
	        }
	      }
	    }); // 顶点相关属性

	    this.stride = 0;
	    this.vaAttributes = [];

	    for (var i = 0; i < attributes.length; i++) {
	      addAttribute(this.vaAttributes, attributes[i], this);
	    }

	    this.setData(data);
	  }

	  _createClass(VertexBuffer, [{
	    key: "getTypeArray",
	    value: function getTypeArray(data) {
	      return ComponentDatatype.createTypedArray(this.componentDatatype, data);
	    }
	  }, {
	    key: "bind",
	    value: function bind() {
	      var gl = this.gl;
	      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
	    }
	  }, {
	    key: "setData",
	    value: function setData(data) {
	      var gl = this.gl; // 判断是使用数组还是字节长度

	      var typeArray;

	      if (data) {
	        typeArray = this.getTypeArray(data);
	        this.sizeInBytes = typeArray.byteLength;
	      }

	      this.bind();
	      gl.bufferData(gl.ARRAY_BUFFER, typeArray ? typeArray : this.sizeInBytes, this.dynamicDraw ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW);
	    }
	  }, {
	    key: "updateData",
	    value: function updateData(data) {
	      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	      var gl = this.gl;
	      this.bind();
	      gl.bufferSubData(gl.ARRAY_BUFFER, offset, this.getTypeArray(data));
	    }
	  }, {
	    key: "enableAttributes",
	    value: function enableAttributes(gl, program) {
	      for (var j = 0; j < this.vaAttributes.length; j++) {
	        var member = this.vaAttributes[j];
	        var attribIndex = program.attributes[member.name]; // 在一些低版本浏览器下，空数据是不被允许写入的

	        if (attribIndex !== undefined && this.sizeInBytes > 0) {
	          gl.enableVertexAttribArray(attribIndex);
	        }
	      }
	    }
	  }, {
	    key: "setVertexAttribPointers",
	    value: function setVertexAttribPointers(gl, program) {
	      for (var j = 0; j < this.vaAttributes.length; j++) {
	        var member = this.vaAttributes[j];
	        var attribIndex = program.attributes[member.name]; // 在一些低版本浏览器下，空数据是不被允许写入的

	        if (attribIndex !== undefined && this.sizeInBytes > 0) {
	          gl.vertexAttribPointer(attribIndex, member.size, this.componentDatatype, member.normalize, this.stride, member.offset);
	        }
	      }
	    }
	  }, {
	    key: "destroy",
	    value: function destroy() {
	      var gl = this.gl;

	      if (this.buffer) {
	        gl.deleteBuffer(this.buffer);
	        delete this.buffer;
	      }
	    }
	  }, {
	    key: "bytesPerIndex",
	    get: function get() {
	      return ComponentDatatype.getSizeInBytes(this.componentDatatype);
	    }
	  }, {
	    key: "numberOfVertices",
	    get: function get() {
	      if (this.stride > 0) {
	        return this.sizeInBytes / this.stride;
	      }

	      return 0;
	    }
	  }]);

	  return VertexBuffer;
	}();

	var VertexArrayObject = /*#__PURE__*/function () {
	  function VertexArrayObject() {
	    _classCallCheck(this, VertexArrayObject);

	    this.boundProgram = null;
	    this.boundIndexBuffer = null;
	    this.boundVertexBuffer = null;
	    this.boundVertexBuffers = null;
	    this.boundDynamicVertexBuffers = null;
	    this.vao = null;
	  }

	  _createClass(VertexArrayObject, [{
	    key: "bind",
	    value: function bind(_ref) {
	      var gl = _ref.gl,
	          program = _ref.program,
	          _ref$vertexBuffer = _ref.vertexBuffer,
	          vertexBuffer = _ref$vertexBuffer === void 0 ? null : _ref$vertexBuffer,
	          _ref$vertexBuffers = _ref.vertexBuffers,
	          vertexBuffers = _ref$vertexBuffers === void 0 ? null : _ref$vertexBuffers,
	          _ref$indexBuffer = _ref.indexBuffer,
	          indexBuffer = _ref$indexBuffer === void 0 ? null : _ref$indexBuffer,
	          _ref$dynamicVertexBuf = _ref.dynamicVertexBuffers,
	          dynamicVertexBuffers = _ref$dynamicVertexBuf === void 0 ? null : _ref$dynamicVertexBuf;
	      this.gl = gl;
	      var isFreshBindRequired = !this.vao || this.boundProgram !== program || this.boundIndexBuffer !== indexBuffer || this.boundVertexBuffer !== vertexBuffer || this.boundVertexBuffers !== vertexBuffers || this.boundDynamicVertexBuffers !== dynamicVertexBuffers;

	      if (!gl.vertexArrayObject || isFreshBindRequired) {
	        this.freshBind({
	          program: program,
	          vertexBuffer: vertexBuffer,
	          vertexBuffers: vertexBuffers,
	          indexBuffer: indexBuffer,
	          dynamicVertexBuffers: dynamicVertexBuffers
	        });
	      } else {
	        gl.glBindVertexArray(this.vao); // 绑定动态更新的数据

	        if (dynamicVertexBuffers) {
	          var _iterator = _createForOfIteratorHelper(dynamicVertexBuffers),
	              _step;

	          try {
	            for (_iterator.s(); !(_step = _iterator.n()).done;) {
	              var dynamicVertexBuffer = _step.value;
	              dynamicVertexBuffer.bind();
	            }
	          } catch (err) {
	            _iterator.e(err);
	          } finally {
	            _iterator.f();
	          }
	        }

	        if (indexBuffer && indexBuffer.dynamicDraw) {
	          indexBuffer.bind();
	        }
	      }
	    }
	  }, {
	    key: "freshBind",
	    value: function freshBind(_ref2) {
	      var program = _ref2.program,
	          vertexBuffer = _ref2.vertexBuffer,
	          vertexBuffers = _ref2.vertexBuffers,
	          indexBuffer = _ref2.indexBuffer,
	          dynamicVertexBuffers = _ref2.dynamicVertexBuffers;
	      var gl = this.gl;

	      if (gl.vertexArrayObject) {
	        if (this.vao) this.destroy();
	        this.vao = gl.glCreateVertexArray();
	        gl.glBindVertexArray(this.vao); // store the arguments so that we can verify them when the vao is bound again

	        this.boundProgram = program;
	        this.boundIndexBuffer = indexBuffer;
	        this.boundVertexBuffer = vertexBuffer;
	        this.boundVertexBuffers = vertexBuffers;
	        this.boundDynamicVertexBuffers = dynamicVertexBuffers;
	      }

	      if (vertexBuffer) {
	        vertexBuffer.enableAttributes(gl, program);
	      }

	      if (vertexBuffers) {
	        var _iterator2 = _createForOfIteratorHelper(vertexBuffers),
	            _step2;

	        try {
	          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
	            var _vertexBuffer = _step2.value;

	            _vertexBuffer.enableAttributes(gl, program);
	          }
	        } catch (err) {
	          _iterator2.e(err);
	        } finally {
	          _iterator2.f();
	        }
	      }

	      if (dynamicVertexBuffers) {
	        var _iterator3 = _createForOfIteratorHelper(dynamicVertexBuffers),
	            _step3;

	        try {
	          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
	            var dynamicVertexBuffer = _step3.value;
	            dynamicVertexBuffer.enableAttributes(gl, program);
	          }
	        } catch (err) {
	          _iterator3.e(err);
	        } finally {
	          _iterator3.f();
	        }
	      }

	      if (vertexBuffer) {
	        vertexBuffer.bind(gl, program);
	        vertexBuffer.setVertexAttribPointers(gl, program);
	      }

	      if (vertexBuffers) {
	        var _iterator4 = _createForOfIteratorHelper(vertexBuffers),
	            _step4;

	        try {
	          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
	            var _vertexBuffer2 = _step4.value;

	            _vertexBuffer2.bind();

	            _vertexBuffer2.setVertexAttribPointers(gl, program);
	          }
	        } catch (err) {
	          _iterator4.e(err);
	        } finally {
	          _iterator4.f();
	        }
	      }

	      if (dynamicVertexBuffers) {
	        var _iterator5 = _createForOfIteratorHelper(dynamicVertexBuffers),
	            _step5;

	        try {
	          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
	            var _dynamicVertexBuffer = _step5.value;

	            _dynamicVertexBuffer.bind();

	            _dynamicVertexBuffer.setVertexAttribPointers(gl, program);
	          }
	        } catch (err) {
	          _iterator5.e(err);
	        } finally {
	          _iterator5.f();
	        }
	      }

	      if (indexBuffer) {
	        indexBuffer.bind();
	      }
	    }
	  }, {
	    key: "destroy",
	    value: function destroy() {
	      if (this.vao) {
	        this.gl.glDeleteVertexArray(this.vao);
	        this.vao = null;
	      }
	    }
	  }]);

	  return VertexArrayObject;
	}();

	var common_vert = "#define GLSLIFY 1\nattribute vec3 aPos;\nattribute vec2 aTextureCoord;\n\nvarying vec2 vTextureCoord;\n\nvoid main() { \n    vTextureCoord = aTextureCoord;\n    gl_Position = vec4(aPos, 1.0);\n}"; // eslint-disable-line

	var bloom_frag = "precision mediump float;\n#define GLSLIFY 1\n\nuniform sampler2D uSampler;\nuniform bool isVertical;\nuniform vec2 canvasSize;\nuniform float blurSize;\nuniform float devicePixelRatio;\n\nvarying vec2 vTextureCoord;\n\nvoid main() {\n    float weight[10];\n    weight[0] = 0.2270270270;\n    weight[1] = 0.1945945946;\n    weight[2] = 0.1216216216;\n    weight[3] = 0.1135135135;\n    weight[4] = 0.0972972973;\n    weight[5] = 0.0608108108;\n    weight[6] = 0.0540540541;\n    weight[7] = 0.0270270270;\n    weight[8] = 0.0162162162;\n    weight[9] = 0.0081081081;\n    \n    vec2 offset = vec2(blurSize / canvasSize.x, blurSize / canvasSize.y) * devicePixelRatio;\n    vec4 result = texture2D(uSampler, vTextureCoord) * weight[0];\n    \n    if (isVertical) {\n        for (int i = 1; i < 10; ++i) {\n            result += texture2D(uSampler, vTextureCoord + vec2(0.0, offset.y * float(i))) * weight[i];\n            result += texture2D(uSampler, vTextureCoord - vec2(0.0, offset.y * float(i))) * weight[i];\n        }\n    } else {\n        for(int i = 1; i < 10; ++i) {\n            result += texture2D(uSampler, vTextureCoord + vec2(offset.x * float(i), 0.0)) * weight[i];\n            result += texture2D(uSampler, vTextureCoord - vec2(offset.x * float(i), 0.0)) * weight[i];\n        }\n    }\n    \n    gl_FragColor = result;\n}"; // eslint-disable-line

	var result_frag = "precision mediump float;\n#define GLSLIFY 1\n\nuniform sampler2D originalTexture;\nuniform sampler2D bloomTexture;\nuniform float toneScale;\n\nvarying vec2 vTextureCoord;\n\nvoid main() {\n    vec4 color = texture2D(originalTexture, vTextureCoord) * toneScale;\n    vec4 bloomColor = texture2D(bloomTexture, vTextureCoord);\n\n    color += bloomColor;\n    gl_FragColor = color;\n}"; // eslint-disable-line

	var bloom_bright_frag = "precision mediump float;\n#define GLSLIFY 1\n\nuniform sampler2D uSampler;\nuniform float threshold;\n\nvarying vec2 vTextureCoord;\n\nvoid main() {\n    vec4 color = texture2D(uSampler, vTextureCoord);\n    vec4 lightColor = max(vec4(0.0), (color - (1.0 - threshold) / 5.0));\n    float brightness = dot(color.rgb, vec3(0.2126, 0.7152, 0.0722));\n    \n    if (brightness > threshold) {\n        color = lightColor;\n    } else {\n        color = vec4(0.0);\n    }\n    gl_FragColor = color;\n}"; // eslint-disable-line

	var bright_bright_frag = "precision mediump float;\n#define GLSLIFY 1\n\nuniform sampler2D uSampler;\nuniform float threshold;\n\nvarying vec2 vTextureCoord;\n\nvoid main() {\n    vec4 color = texture2D(uSampler, vTextureCoord);\n    vec4 lightColor = max(vec4(0.0), (color - threshold));\n\n    gl_FragColor = lightColor;\n}"; // eslint-disable-line

	var blur_frag = "precision mediump float;\n#define GLSLIFY 1\nuniform sampler2D uSampler;\nvarying vec2 vTextureCoord;\n\nvoid main() {\n    float fStep = 1.0 / 512.0;\n    \n    vec4 sample11 = texture2D(uSampler, vec2(vTextureCoord.s - 1.0 * fStep, vTextureCoord.t + 1.0 * fStep));\n    vec4 sample12 = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t + 1.0 * fStep));\n    vec4 sample13 = texture2D(uSampler, vec2(vTextureCoord.s + 1.0 * fStep, vTextureCoord.t + 1.0 * fStep));\n    vec4 sample21 = texture2D(uSampler, vec2(vTextureCoord.s - 1.0 * fStep, vTextureCoord.t));\n    vec4 sample22 = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));\n    vec4 sample23 = texture2D(uSampler, vec2(vTextureCoord.s + 1.0 * fStep, vTextureCoord.t));\n    vec4 sample31 = texture2D(uSampler, vec2(vTextureCoord.s - 1.0 * fStep, vTextureCoord.t - 1.0 * fStep));\n    vec4 sample32 = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t - 1.0 * fStep));\n    vec4 sample33 = texture2D(uSampler, vec2(vTextureCoord.s + 1.0 * fStep, vTextureCoord.t - 1.0 * fStep));\n    vec4 blurSample = (sample11 + sample12 + sample13 + sample21 + 2.0 * sample22 + sample23 + sample31 + sample32 + sample33) / 10.0;\n\n    gl_FragColor = blurSample;\n}"; // eslint-disable-line

	var depth_frag = "precision mediump float;\n#define GLSLIFY 1\n\nuniform sampler2D uSampler;\nuniform vec2 canvasSize;\n\nvarying vec2 vTextureCoord;\n\nvoid main() {\n    float fStep = 1.0 / 312.0;\n    vec4 sample11 = texture2D(uSampler, vec2(vTextureCoord.s - 1.0 * fStep, vTextureCoord.t + 1.0 * fStep));\n    vec4 sample12 = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t + 1.0 * fStep));\n    vec4 sample13 = texture2D(uSampler, vec2(vTextureCoord.s + 1.0 * fStep, vTextureCoord.t + 1.0 * fStep));\n    vec4 sample21 = texture2D(uSampler, vec2(vTextureCoord.s - 1.0 * fStep, vTextureCoord.t));\n    vec4 sample22 = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));\n    vec4 sample23 = texture2D(uSampler, vec2(vTextureCoord.s + 1.0 * fStep, vTextureCoord.t));\n    vec4 sample31 = texture2D(uSampler, vec2(vTextureCoord.s - 1.0 * fStep, vTextureCoord.t - 1.0 * fStep));\n    vec4 sample32 = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t - 1.0 * fStep));\n    vec4 sample33 = texture2D(uSampler, vec2(vTextureCoord.s + 1.0 * fStep, vTextureCoord.t - 1.0 * fStep));\n    vec4 blurSample = (sample11 + sample12 + sample13 + sample21 + 2.0 * sample22 + sample23 + sample31 + sample32 + sample33) / 10.0;\n    float desX = abs((gl_FragCoord.x - canvasSize.x / 2.0) / (canvasSize.x / 2.0));\n    float desY = abs((gl_FragCoord.y - canvasSize.y / 2.0) / (canvasSize.y / 2.0));\n    float factor = max(desX, desY);\n    \n    gl_FragColor = (sample22 * (1.0 - factor) + blurSample * factor);\n}"; // eslint-disable-line

	// effects
	var ShaderEffect = {
	  common_vert: common_vert,
	  bloom_frag: bloom_frag,
	  result_frag: result_frag,
	  bloom_bright_frag: bloom_bright_frag,
	  bright_bright_frag: bright_bright_frag,
	  blur_frag: blur_frag,
	  depth_frag: depth_frag
	};

	/**
	 * @classdesc
	 * 虚化处理特效
	 */

	var BlurEffect = /*#__PURE__*/function (_Effect) {
	  _inherits(BlurEffect, _Effect);

	  var _super = _createSuper(BlurEffect);

	  function BlurEffect() {
	    _classCallCheck(this, BlurEffect);

	    return _super.apply(this, arguments);
	  }

	  _createClass(BlurEffect, [{
	    key: "init",
	    value: function init(gl) {
	      if (!this.program) {
	        this.program = new Program(gl, {
	          vertexShader: ShaderEffect.common_vert,
	          fragmentShader: ShaderEffect.blur_frag
	        });
	        this.vertexBuffers = [new VertexBuffer({
	          gl: gl,
	          data: new Float32Array(this.vertex),
	          attributes: [{
	            name: "aPos",
	            size: 3
	          }]
	        }), new VertexBuffer({
	          gl: gl,
	          data: new Float32Array(this.sampleCoord),
	          attributes: [{
	            name: "aTextureCoord",
	            size: 2
	          }]
	        })];
	        this.vao = new VertexArrayObject();
	      }
	    }
	  }, {
	    key: "render",
	    value: function render(renderOptions) {
	      var gl = renderOptions.gl,
	          texture = renderOptions.texture;
	      gl.clearCanvas();
	      this.init(gl);
	      this.program.use(gl);
	      this.vao.bind({
	        gl: gl,
	        program: this.program,
	        vertexBuffers: this.vertexBuffers
	      });
	      this.program.setUniforms({
	        uSampler: texture
	      });
	      gl.drawArrays(gl.TRIANGLES, 0, this.vertex.length / 3);
	    }
	  }]);

	  return BlurEffect;
	}(Effect);

	/**
	 * @classdesc
	 * 景深后处理特效
	 */

	var DepthEffect = /*#__PURE__*/function (_Effect) {
	  _inherits(DepthEffect, _Effect);

	  var _super = _createSuper(DepthEffect);

	  function DepthEffect() {
	    _classCallCheck(this, DepthEffect);

	    return _super.apply(this, arguments);
	  }

	  _createClass(DepthEffect, [{
	    key: "init",
	    value: function init(gl) {
	      if (!this.program) {
	        this.program = new Program(gl, {
	          vertexShader: ShaderEffect.common_vert,
	          fragmentShader: ShaderEffect.depth_frag
	        });
	        this.vertexBuffers = [new VertexBuffer({
	          gl: gl,
	          data: new Float32Array(this.vertex),
	          attributes: [{
	            name: "aPos",
	            size: 3
	          }]
	        }), new VertexBuffer({
	          gl: gl,
	          data: new Float32Array(this.sampleCoord),
	          attributes: [{
	            name: "aTextureCoord",
	            size: 2
	          }]
	        })];
	        this.vao = new VertexArrayObject();
	      }
	    }
	  }, {
	    key: "render",
	    value: function render(renderOptions) {
	      var gl = renderOptions.gl,
	          texture = renderOptions.texture;
	      gl.clearCanvas();
	      this.init(gl);
	      this.program.use(gl);
	      this.vao.bind({
	        gl: gl,
	        program: this.program,
	        vertexBuffers: this.vertexBuffers
	      });
	      this.program.setUniforms({
	        uSampler: texture,
	        canvasSize: [gl.canvas.width, gl.canvas.height]
	      });
	      gl.drawArrays(gl.TRIANGLES, 0, this.vertex.length / 3);
	    }
	  }]);

	  return DepthEffect;
	}(Effect);

	/**
	 * @classdesc
	 * 眩光后处理特效
	 * 
	 * @param {Object=} options
	 * @param {Number=} [options.threshold=0] 效果门槛阈值，范围 `0.0~1.0`，值越低，亮部越多
	 * @param {Number=} [options.blurSize=2] 炫光模糊值，默认2，是原图形半径的2倍
	 */

	var BloomEffect = /*#__PURE__*/function (_Effect) {
	  _inherits(BloomEffect, _Effect);

	  var _super = _createSuper(BloomEffect);

	  function BloomEffect() {
	    _classCallCheck(this, BloomEffect);

	    return _super.apply(this, arguments);
	  }

	  _createClass(BloomEffect, [{
	    key: "getProgram",
	    value: function getProgram(gl) {
	      if (!this.programBright) {
	        this.programBright = new Program(gl, {
	          vertexShader: ShaderEffect.common_vert,
	          fragmentShader: ShaderEffect.bloom_bright_frag
	        });
	      }

	      if (!this.programBloom) {
	        this.programBloom = new Program(gl, {
	          vertexShader: ShaderEffect.common_vert,
	          fragmentShader: ShaderEffect.bloom_frag
	        });
	      }

	      if (!this.programResult) {
	        this.programResult = new Program(gl, {
	          vertexShader: ShaderEffect.common_vert,
	          fragmentShader: ShaderEffect.result_frag
	        });
	      }

	      return {
	        programBright: this.programBright,
	        programBloom: this.programBloom,
	        programResult: this.programResult
	      };
	    }
	  }, {
	    key: "onResize",
	    value: function onResize(gl) {
	      this.collectBrightBuffer = new FrameBuffer(gl);
	      this.bloomBuffer = new FrameBuffer(gl);
	    }
	  }, {
	    key: "getExtraFbo",
	    value: function getExtraFbo(gl) {
	      if (!this.collectBrightBuffer) {
	        this.collectBrightBuffer = new FrameBuffer(gl);
	      }

	      if (!this.bloomBuffer) {
	        this.bloomBuffer = new FrameBuffer(gl);
	      }

	      return {
	        collectBrightBuffer: this.collectBrightBuffer.framebuffer,
	        bloomBuffer: this.bloomBuffer.framebuffer
	      };
	    }
	  }, {
	    key: "getVaos",
	    value: function getVaos() {
	      if (!this.vaos) {
	        this.vaos = {
	          brightVao: new VertexArrayObject(),
	          bloomVao: new VertexArrayObject(),
	          resultVao: new VertexArrayObject()
	        };
	      }

	      return this.vaos;
	    }
	  }, {
	    key: "getVertexBuffers",
	    value: function getVertexBuffers(gl) {
	      if (!this.buffers) {
	        this.buffers = [new VertexBuffer({
	          gl: gl,
	          data: new Float32Array(this.vertex),
	          attributes: [{
	            name: "aPos",
	            size: 3
	          }]
	        }), new VertexBuffer({
	          gl: gl,
	          data: new Float32Array(this.sampleCoord),
	          attributes: [{
	            name: "aTextureCoord",
	            size: 2
	          }]
	        })];
	      }

	      return this.buffers;
	    }
	  }, {
	    key: "render",
	    value: function render(renderOptions) {
	      var gl = renderOptions.gl,
	          texture = renderOptions.texture,
	          fbo = renderOptions.fbo,
	          options = this.getOptions();
	      gl.clearCanvas();
	      var programs = this.getProgram(gl),
	          programBright = programs.programBright,
	          programBloom = programs.programBloom,
	          programResult = programs.programResult;
	      var fbos = this.getExtraFbo(gl),
	          collectBrightBuffer = fbos.collectBrightBuffer,
	          bloomBuffer = fbos.bloomBuffer;
	      var vaos = this.getVaos(),
	          brightVao = vaos.brightVao,
	          bloomVao = vaos.bloomVao,
	          resultVao = vaos.resultVao;
	      var vertexBuffers = this.getVertexBuffers(gl); // 变亮

	      programBright.use(gl);
	      gl.bindFramebuffer(gl.FRAMEBUFFER, collectBrightBuffer);
	      gl.clearCanvas();
	      brightVao.bind({
	        gl: gl,
	        program: programBright,
	        vertexBuffers: vertexBuffers
	      });
	      programBright.setUniforms({
	        uSampler: texture,
	        threshold: options.threshold || 0
	      });
	      gl.drawArrays(gl.TRIANGLES, 0, this.vertex.length / 3); // 晕光

	      programBloom.use(gl);
	      gl.bindFramebuffer(gl.FRAMEBUFFER, bloomBuffer);
	      gl.clearCanvas();
	      bloomVao.bind({
	        gl: gl,
	        program: programBloom,
	        vertexBuffers: vertexBuffers
	      });
	      programBloom.setUniforms({
	        uSampler: collectBrightBuffer.texture,
	        isVertical: true,
	        blurSize: options.blurSize || 2,
	        devicePixelRatio: window.devicePixelRatio,
	        canvasSize: [gl.canvas.width, gl.canvas.height]
	      });
	      gl.drawArrays(gl.TRIANGLES, 0, this.vertex.length / 3);
	      programBloom.use(gl);
	      gl.bindFramebuffer(gl.FRAMEBUFFER, collectBrightBuffer);
	      gl.clearCanvas();
	      bloomVao.bind({
	        gl: gl,
	        program: programBloom,
	        vertexBuffers: vertexBuffers
	      });
	      programBloom.setUniforms({
	        uSampler: bloomBuffer.texture,
	        isVertical: false,
	        blurSize: options.blurSize || 2,
	        devicePixelRatio: window.devicePixelRatio,
	        canvasSize: [gl.canvas.width, gl.canvas.height]
	      });
	      gl.drawArrays(gl.TRIANGLES, 0, this.vertex.length / 3); // 结果处理

	      programResult.use(gl);
	      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
	      gl.clearCanvas();
	      resultVao.bind({
	        gl: gl,
	        program: programResult,
	        vertexBuffers: vertexBuffers
	      });
	      programResult.setUniforms({
	        originalTexture: texture,
	        bloomTexture: collectBrightBuffer.texture,
	        toneScale: 1
	      });
	      gl.drawArrays(gl.TRIANGLES, 0, this.vertex.length / 3);
	      gl.bindBuffer(gl.ARRAY_BUFFER, null);
	      gl.useProgram(null);
	    }
	  }]);

	  return BloomEffect;
	}(Effect);

	/**
	 * @classdesc
	 * 发光后处理特效
	 * 
	 * @param {Object=} options
	 * @param {Number=} [options.threshold=0] 效果门槛阈值，范围 `0.0~1.0`，值越低，亮部越多
	 * @param {Number=} [options.blurSize=2] 炫光模糊值，默认2，是原图形半径的2倍
	 * @param {Number=} [options.clarity=1] 清晰度，范围 `0.0~1.0`
	 */

	var BrightEffect = /*#__PURE__*/function (_Effect) {
	  _inherits(BrightEffect, _Effect);

	  var _super = _createSuper(BrightEffect);

	  function BrightEffect() {
	    _classCallCheck(this, BrightEffect);

	    return _super.apply(this, arguments);
	  }

	  _createClass(BrightEffect, [{
	    key: "getProgram",
	    value: function getProgram(gl) {
	      if (!this.programBright) {
	        this.programBright = new Program(gl, {
	          vertexShader: ShaderEffect.common_vert,
	          fragmentShader: ShaderEffect.bright_bright_frag
	        });
	      }

	      if (!this.programBloom) {
	        this.programBloom = new Program(gl, {
	          vertexShader: ShaderEffect.common_vert,
	          fragmentShader: ShaderEffect.bloom_frag
	        });
	      }

	      if (!this.programResult) {
	        this.programResult = new Program(gl, {
	          vertexShader: ShaderEffect.common_vert,
	          fragmentShader: ShaderEffect.result_frag
	        });
	      }

	      return {
	        programBright: this.programBright,
	        programBloom: this.programBloom,
	        programResult: this.programResult
	      };
	    }
	  }, {
	    key: "onResize",
	    value: function onResize(gl) {
	      this.collectBrightBuffer = new FrameBuffer(gl);
	      this.bloomBuffer = new FrameBuffer(gl);
	    }
	  }, {
	    key: "getExtraFbo",
	    value: function getExtraFbo(gl) {
	      if (!this.collectBrightBuffer) {
	        this.collectBrightBuffer = new FrameBuffer(gl);
	      }

	      if (!this.bloomBuffer) {
	        this.bloomBuffer = new FrameBuffer(gl);
	      }

	      return {
	        collectBrightBuffer: this.collectBrightBuffer.framebuffer,
	        bloomBuffer: this.bloomBuffer.framebuffer
	      };
	    }
	  }, {
	    key: "getVaos",
	    value: function getVaos() {
	      if (!this.vaos) {
	        this.vaos = {
	          brightVao: new VertexArrayObject(),
	          bloomVao: new VertexArrayObject(),
	          resultVao: new VertexArrayObject()
	        };
	      }

	      return this.vaos;
	    }
	  }, {
	    key: "getVertexBuffers",
	    value: function getVertexBuffers(gl) {
	      if (!this.buffers) {
	        this.buffers = [new VertexBuffer({
	          gl: gl,
	          data: new Float32Array(this.vertex),
	          attributes: [{
	            name: "aPos",
	            size: 3
	          }]
	        }), new VertexBuffer({
	          gl: gl,
	          data: new Float32Array(this.sampleCoord),
	          attributes: [{
	            name: "aTextureCoord",
	            size: 2
	          }]
	        })];
	      }

	      return this.buffers;
	    }
	  }, {
	    key: "render",
	    value: function render(renderOptions) {
	      var gl = renderOptions.gl,
	          texture = renderOptions.texture,
	          fbo = renderOptions.fbo,
	          options = this.getOptions();
	      var toneScale = "clarity" in options ? options.clarity : 1;
	      toneScale = Math.max(0, toneScale);
	      toneScale = Math.min(1, toneScale);
	      gl.clearCanvas();
	      var programs = this.getProgram(gl),
	          programBright = programs.programBright,
	          programBloom = programs.programBloom,
	          programResult = programs.programResult;
	      var fbos = this.getExtraFbo(gl),
	          collectBrightBuffer = fbos.collectBrightBuffer,
	          bloomBuffer = fbos.bloomBuffer;
	      var vaos = this.getVaos(),
	          brightVao = vaos.brightVao,
	          bloomVao = vaos.bloomVao,
	          resultVao = vaos.resultVao;
	      var vertexBuffers = this.getVertexBuffers(gl); // 变亮

	      programBright.use(gl);
	      gl.bindFramebuffer(gl.FRAMEBUFFER, collectBrightBuffer);
	      gl.clearCanvas();
	      brightVao.bind({
	        gl: gl,
	        program: programBright,
	        vertexBuffers: vertexBuffers
	      });
	      programBright.setUniforms({
	        uSampler: texture,
	        threshold: options.threshold || 0
	      });
	      gl.drawArrays(gl.TRIANGLES, 0, this.vertex.length / 3); // 晕光

	      programBloom.use(gl);
	      gl.bindFramebuffer(gl.FRAMEBUFFER, bloomBuffer);
	      gl.clearCanvas();
	      bloomVao.bind({
	        gl: gl,
	        program: programBloom,
	        vertexBuffers: vertexBuffers
	      });
	      programBloom.setUniforms({
	        uSampler: collectBrightBuffer.texture,
	        isVertical: true,
	        blurSize: options.blurSize || 2,
	        devicePixelRatio: window.devicePixelRatio,
	        canvasSize: [gl.canvas.width, gl.canvas.height]
	      });
	      gl.drawArrays(gl.TRIANGLES, 0, this.vertex.length / 3);
	      programBloom.use(gl);
	      gl.bindFramebuffer(gl.FRAMEBUFFER, collectBrightBuffer);
	      gl.clearCanvas();
	      bloomVao.bind({
	        gl: gl,
	        program: programBloom,
	        vertexBuffers: vertexBuffers
	      });
	      programBloom.setUniforms({
	        uSampler: bloomBuffer.texture,
	        isVertical: false,
	        blurSize: options.blurSize || 2,
	        devicePixelRatio: window.devicePixelRatio,
	        canvasSize: [gl.canvas.width, gl.canvas.height]
	      });
	      gl.drawArrays(gl.TRIANGLES, 0, this.vertex.length / 3); // 结果处理

	      programResult.use(gl);
	      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
	      gl.clearCanvas();
	      resultVao.bind({
	        gl: gl,
	        program: programResult,
	        vertexBuffers: vertexBuffers
	      });
	      programResult.setUniforms({
	        originalTexture: texture,
	        bloomTexture: collectBrightBuffer.texture,
	        toneScale: toneScale
	      });
	      gl.drawArrays(gl.TRIANGLES, 0, this.vertex.length / 3);
	      gl.bindBuffer(gl.ARRAY_BUFFER, null);
	      gl.useProgram(null);
	    }
	  }]);

	  return BrightEffect;
	}(Effect);

	var ARRAY_BUFFER$1 = 'ArrayBuffer';
	var ArrayBuffer$3 = arrayBuffer[ARRAY_BUFFER$1];
	var NativeArrayBuffer$1 = global_1[ARRAY_BUFFER$1]; // `ArrayBuffer` constructor
	// https://tc39.github.io/ecma262/#sec-arraybuffer-constructor

	_export({
	  global: true,
	  forced: NativeArrayBuffer$1 !== ArrayBuffer$3
	}, {
	  ArrayBuffer: ArrayBuffer$3
	});
	setSpecies(ARRAY_BUFFER$1);

	var NATIVE_ARRAY_BUFFER_VIEWS$2 = arrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS; // `ArrayBuffer.isView` method
	// https://tc39.github.io/ecma262/#sec-arraybuffer.isview

	_export({
	  target: 'ArrayBuffer',
	  stat: true,
	  forced: !NATIVE_ARRAY_BUFFER_VIEWS$2
	}, {
	  isView: arrayBufferViewCore.isView
	});

	var globalIsFinite = global_1.isFinite; // `Number.isFinite` method
	// https://tc39.github.io/ecma262/#sec-number.isfinite

	var numberIsFinite = Number.isFinite || function isFinite(it) {
	  return typeof it == 'number' && globalIsFinite(it);
	};

	// https://tc39.github.io/ecma262/#sec-number.isfinite

	_export({
	  target: 'Number',
	  stat: true
	}, {
	  isFinite: numberIsFinite
	});

	// NOTE: These are numerically identical to the corresponding WebGL/OpenGL constants

	var DRAW_MODE = {
	  POINTS: 0x0000,
	  // draw single points.
	  LINES: 0x0001,
	  // draw lines. Each vertex connects to the one after it.
	  LINE_LOOP: 0x0002,
	  // draw lines. Each set of two vertices is treated as a separate line segment.
	  LINE_STRIP: 0x0003,
	  // draw a connected group of line segments from the first vertex to the last
	  TRIANGLES: 0x0004,
	  // draw triangles. Each set of three vertices creates a separate triangle.
	  TRIANGLE_STRIP: 0x0005,
	  // draw a connected group of triangles.
	  TRIANGLE_FAN: 0x0006 // draw a connected group of triangles.
	  // Each vertex connects to the previous and the first vertex in the fan.

	};

	var Geometry = /*#__PURE__*/function () {
	  _createClass(Geometry, null, [{
	    key: "DRAW_MODE",
	    get: function get() {
	      return DRAW_MODE;
	    }
	  }]);

	  function Geometry() {
	    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    _classCallCheck(this, Geometry);

	    var _props$id = props.id,
	        id = _props$id === void 0 ? uid$1("geometry") : _props$id,
	        _props$drawMode = props.drawMode,
	        drawMode = _props$drawMode === void 0 ? DRAW_MODE.TRIANGLES : _props$drawMode,
	        _props$attributes = props.attributes,
	        attributes = _props$attributes === void 0 ? {} : _props$attributes,
	        _props$indices = props.indices,
	        indices = _props$indices === void 0 ? null : _props$indices,
	        _props$vertexCount = props.vertexCount,
	        vertexCount = _props$vertexCount === void 0 ? null : _props$vertexCount;
	    this.id = id;
	    this.drawMode = drawMode | 0;
	    this.attributes = {};
	    this.userData = {};

	    this._setAttributes(attributes, indices);

	    this.vertexCount = vertexCount || this._calculateVertexCount(this.attributes, this.indices);
	  }

	  _createClass(Geometry, [{
	    key: "getVertexCount",
	    value: function getVertexCount() {
	      return this.vertexCount;
	    } // Return an object with all attributes plus indices added as a field.

	  }, {
	    key: "getAttributes",
	    value: function getAttributes() {
	      return this.indices ? _objectSpread2({
	        indices: this.indices
	      }, this.attributes) : this.attributes;
	    }
	  }, {
	    key: "getAttribute",
	    value: function getAttribute(name) {
	      return this.attributes[name];
	    } // PRIVATE

	  }, {
	    key: "_print",
	    value: function _print(attributeName) {
	      return "Geometry ".concat(this.id, " attribute ").concat(attributeName);
	    } // Attribute
	    // value: typed array
	    // type: indices, vertices, uvs
	    // size: elements per vertex
	    // target: WebGL buffer type (string or constant)

	  }, {
	    key: "_setAttributes",
	    value: function _setAttributes(attributes, indices) {
	      if (indices) {
	        this.indices = ArrayBuffer.isView(indices) ? {
	          value: indices,
	          size: 1
	        } : indices;
	      }

	      for (var attributeName in attributes) {
	        var attribute = attributes[attributeName]; // Wrap "unwrapped" arrays and try to autodetect their type

	        attribute = ArrayBuffer.isView(attribute) ? {
	          value: attribute
	        } : attribute;
	        assert(ArrayBuffer.isView(attribute.value), "".concat(this._print(attributeName), ": must be typed array or object with value as typed array"));

	        if ((attributeName === "POSITION" || attributeName === "positions") && !attribute.size) {
	          attribute.size = 3;
	        } // Move indices to separate field


	        if (attributeName === "indices") {
	          assert(!this.indices);
	          this.indices = attribute;
	        } else {
	          this.attributes[attributeName] = attribute;
	        }
	      }

	      if (this.indices && this.indices.isIndexed !== undefined) {
	        this.indices = Object.assign({}, this.indices);
	        delete this.indices.isIndexed;
	      }

	      return this;
	    }
	  }, {
	    key: "_calculateVertexCount",
	    value: function _calculateVertexCount(attributes, indices) {
	      if (indices) {
	        return indices.value.length;
	      }

	      var vertexCount = Infinity;

	      for (var attributeName in attributes) {
	        var attribute = attributes[attributeName];
	        var value = attribute.value,
	            size = attribute.size,
	            constant = attribute.constant;

	        if (!constant && value && size >= 1) {
	          vertexCount = Math.min(vertexCount, value.length / size);
	        }
	      }

	      assert(Number.isFinite(vertexCount));
	      return vertexCount;
	    }
	  }, {
	    key: "mode",
	    get: function get() {
	      return this.drawMode;
	    }
	  }]);

	  return Geometry;
	}();

	var INDEX_OFFSETS = {
	  x: [2, 0, 1],
	  y: [0, 1, 2],
	  z: [1, 2, 0]
	};

	var TruncatedConeGeometry = /*#__PURE__*/function (_Geometry) {
	  _inherits(TruncatedConeGeometry, _Geometry);

	  var _super = _createSuper(TruncatedConeGeometry);

	  function TruncatedConeGeometry() {
	    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    _classCallCheck(this, TruncatedConeGeometry);

	    var _props$id = props.id,
	        id = _props$id === void 0 ? uid$1("truncated-code-geometry") : _props$id;

	    var _tesselateTruncatedCo = tesselateTruncatedCone(props),
	        indices = _tesselateTruncatedCo.indices,
	        attributes = _tesselateTruncatedCo.attributes;

	    return _super.call(this, _objectSpread2(_objectSpread2({}, props), {}, {
	      id: id,
	      indices: indices,
	      attributes: _objectSpread2(_objectSpread2({}, attributes), props.attributes)
	    }));
	  }

	  return TruncatedConeGeometry;
	}(Geometry); // Primitives inspired by TDL http://code.google.com/p/webglsamples/,

	function tesselateTruncatedCone(props) {
	  var _props$bottomRadius = props.bottomRadius,
	      bottomRadius = _props$bottomRadius === void 0 ? 0 : _props$bottomRadius,
	      _props$topRadius = props.topRadius,
	      topRadius = _props$topRadius === void 0 ? 0 : _props$topRadius,
	      _props$height = props.height,
	      height = _props$height === void 0 ? 1 : _props$height,
	      _props$nradial = props.nradial,
	      nradial = _props$nradial === void 0 ? 10 : _props$nradial,
	      _props$nvertical = props.nvertical,
	      nvertical = _props$nvertical === void 0 ? 10 : _props$nvertical,
	      _props$verticalAxis = props.verticalAxis,
	      verticalAxis = _props$verticalAxis === void 0 ? "y" : _props$verticalAxis,
	      _props$topCap = props.topCap,
	      topCap = _props$topCap === void 0 ? false : _props$topCap,
	      _props$bottomCap = props.bottomCap,
	      bottomCap = _props$bottomCap === void 0 ? false : _props$bottomCap,
	      _props$translate = props.translate,
	      translate = _props$translate === void 0 ? [0, 0, 0] : _props$translate;
	  var extra = (topCap ? 2 : 0) + (bottomCap ? 2 : 0);
	  var numVertices = (nradial + 1) * (nvertical + 1 + extra);
	  var slant = Math.atan2(bottomRadius - topRadius, height);
	  var msin = Math.sin;
	  var mcos = Math.cos;
	  var mpi = Math.PI;
	  var cosSlant = mcos(slant);
	  var sinSlant = msin(slant);
	  var start = topCap ? -2 : 0;
	  var end = nvertical + (bottomCap ? 2 : 0);
	  var vertsAroundEdge = nradial + 1;
	  var indices = new Uint16Array(nradial * (nvertical + extra) * 6);
	  var indexOffset = INDEX_OFFSETS[verticalAxis];
	  var positions = new Float32Array(numVertices * 3);
	  var normals = new Float32Array(numVertices * 3);
	  var texCoords = new Float32Array(numVertices * 2);
	  var i3 = 0;
	  var i2 = 0;

	  for (var i = start; i <= end; i++) {
	    var v = i / nvertical;
	    var y = height * v;
	    var ringRadius = void 0;

	    if (i < 0) {
	      y = 0;
	      v = 1;
	      ringRadius = bottomRadius;
	    } else if (i > nvertical) {
	      y = height;
	      v = 1;
	      ringRadius = topRadius;
	    } else {
	      ringRadius = bottomRadius + (topRadius - bottomRadius) * (i / nvertical);
	    }

	    if (i === -2 || i === nvertical + 2) {
	      ringRadius = 0;
	      v = 0;
	    }

	    y -= height / 2;

	    for (var j = 0; j < vertsAroundEdge; j++) {
	      var sin = msin(j * mpi * 2 / nradial);
	      var cos = mcos(j * mpi * 2 / nradial);
	      positions[i3 + indexOffset[0]] = sin * ringRadius + translate[indexOffset[0]];
	      positions[i3 + indexOffset[1]] = y + translate[indexOffset[1]];
	      positions[i3 + indexOffset[2]] = cos * ringRadius + translate[indexOffset[2]];
	      normals[i3 + indexOffset[0]] = i < 0 || i > nvertical ? 0 : sin * cosSlant;
	      normals[i3 + indexOffset[1]] = i < 0 ? -1 : i > nvertical ? 1 : sinSlant;
	      normals[i3 + indexOffset[2]] = i < 0 || i > nvertical ? 0 : cos * cosSlant;
	      texCoords[i2 + 0] = j / nradial;
	      texCoords[i2 + 1] = v;
	      i2 += 2;
	      i3 += 3;
	    }
	  }

	  for (var _i = 0; _i < nvertical + extra; _i++) {
	    for (var _j = 0; _j < nradial; _j++) {
	      var index = (_i * nradial + _j) * 6;
	      indices[index + 0] = vertsAroundEdge * (_i + 0) + 0 + _j;
	      indices[index + 1] = vertsAroundEdge * (_i + 0) + 1 + _j;
	      indices[index + 2] = vertsAroundEdge * (_i + 1) + 1 + _j;
	      indices[index + 3] = vertsAroundEdge * (_i + 0) + 0 + _j;
	      indices[index + 4] = vertsAroundEdge * (_i + 1) + 1 + _j;
	      indices[index + 5] = vertsAroundEdge * (_i + 1) + 0 + _j;
	    }
	  }

	  return {
	    indices: indices,
	    attributes: {
	      POSITION: {
	        size: 3,
	        value: positions
	      },
	      NORMAL: {
	        size: 3,
	        value: normals
	      },
	      TEXCOORD_0: {
	        size: 2,
	        value: texCoords
	      }
	    }
	  };
	}

	var ConeGeometry = /*#__PURE__*/function (_TruncatedConeGeometr) {
	  _inherits(ConeGeometry, _TruncatedConeGeometr);

	  var _super = _createSuper(ConeGeometry);

	  function ConeGeometry() {
	    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    _classCallCheck(this, ConeGeometry);

	    var _props$id = props.id,
	        id = _props$id === void 0 ? uid$1("cone-geometry") : _props$id,
	        _props$radius = props.radius,
	        radius = _props$radius === void 0 ? 1 : _props$radius,
	        _props$cap = props.cap,
	        cap = _props$cap === void 0 ? true : _props$cap;
	    return _super.call(this, _objectSpread2(_objectSpread2({}, props), {}, {
	      id: id,
	      topRadius: 0,
	      topCap: Boolean(cap),
	      bottomCap: Boolean(cap),
	      bottomRadius: radius
	    }));
	  }

	  return ConeGeometry;
	}(TruncatedConeGeometry);

	var CUBE_INDICES = new Uint16Array([0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23]); // prettier-ignore

	var CUBE_POSITIONS = new Float32Array([-1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1, -1, -1, -1, -1, 1, -1, 1, 1, -1, 1, -1, -1, -1, 1, -1, -1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, 1, -1, -1, 1, -1, 1, -1, -1, 1, 1, -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, -1, -1, -1, -1, -1, 1, -1, 1, 1, -1, 1, -1]); // TODO - could be Uint8
	// prettier-ignore

	var CUBE_NORMALS = new Float32Array([// Front face
	0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, // Back face
	0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, // Top face
	0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, // Bottom face
	0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, // Right face
	1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, // Left face
	-1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0]); // prettier-ignore

	var CUBE_TEX_COORDS = new Float32Array([// Front face
	0, 0, 1, 0, 1, 1, 0, 1, // Back face
	1, 0, 1, 1, 0, 1, 0, 0, // Top face
	0, 1, 0, 0, 1, 0, 1, 1, // Bottom face
	1, 1, 0, 1, 0, 0, 1, 0, // Right face
	1, 0, 1, 1, 0, 1, 0, 0, // Left face
	0, 0, 1, 0, 1, 1, 0, 1]);
	var ATTRIBUTES = {
	  POSITION: {
	    size: 3,
	    value: new Float32Array(CUBE_POSITIONS)
	  },
	  NORMAL: {
	    size: 3,
	    value: new Float32Array(CUBE_NORMALS)
	  },
	  TEXCOORD_0: {
	    size: 2,
	    value: new Float32Array(CUBE_TEX_COORDS)
	  }
	};

	var CubeGeometry = /*#__PURE__*/function (_Geometry) {
	  _inherits(CubeGeometry, _Geometry);

	  var _super = _createSuper(CubeGeometry);

	  function CubeGeometry() {
	    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    _classCallCheck(this, CubeGeometry);

	    var _props$id = props.id,
	        id = _props$id === void 0 ? uid$1("cube-geometry") : _props$id;
	    return _super.call(this, _objectSpread2(_objectSpread2({}, props), {}, {
	      id: id,
	      indices: {
	        size: 1,
	        value: new Uint16Array(CUBE_INDICES)
	      },
	      attributes: _objectSpread2(_objectSpread2({}, ATTRIBUTES), props.attributes)
	    }));
	  }

	  return CubeGeometry;
	}(Geometry);

	var CylinderGeometry = /*#__PURE__*/function (_TruncatedConeGeometr) {
	  _inherits(CylinderGeometry, _TruncatedConeGeometr);

	  var _super = _createSuper(CylinderGeometry);

	  function CylinderGeometry() {
	    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    _classCallCheck(this, CylinderGeometry);

	    var _props$id = props.id,
	        id = _props$id === void 0 ? uid$1("cylinder-geometry") : _props$id,
	        _props$radius = props.radius,
	        radius = _props$radius === void 0 ? 1 : _props$radius;
	    return _super.call(this, _objectSpread2(_objectSpread2({}, props), {}, {
	      id: id,
	      bottomRadius: radius,
	      topRadius: radius
	    }));
	  }

	  return CylinderGeometry;
	}(TruncatedConeGeometry);

	/* eslint-disable comma-spacing, max-statements, complexity */

	var ICO_POSITIONS = [-1, 0, 0, 0, 1, 0, 0, 0, -1, 0, 0, 1, 0, -1, 0, 1, 0, 0];
	var ICO_INDICES = [3, 4, 5, 3, 5, 1, 3, 1, 0, 3, 0, 4, 4, 0, 2, 4, 2, 5, 2, 0, 1, 5, 2, 1];

	var IcoSphereGeometry = /*#__PURE__*/function (_Geometry) {
	  _inherits(IcoSphereGeometry, _Geometry);

	  var _super = _createSuper(IcoSphereGeometry);

	  function IcoSphereGeometry() {
	    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    _classCallCheck(this, IcoSphereGeometry);

	    var _props$id = props.id,
	        id = _props$id === void 0 ? uid$1("ico-sphere-geometry") : _props$id;

	    var _tesselateIcosaHedron = tesselateIcosaHedron(props),
	        indices = _tesselateIcosaHedron.indices,
	        attributes = _tesselateIcosaHedron.attributes;

	    return _super.call(this, _objectSpread2(_objectSpread2({}, props), {}, {
	      id: id,
	      indices: indices,
	      attributes: _objectSpread2(_objectSpread2({}, attributes), props.attributes)
	    }));
	  }

	  return IcoSphereGeometry;
	}(Geometry);

	function tesselateIcosaHedron(props) {
	  var _props$iterations = props.iterations,
	      iterations = _props$iterations === void 0 ? 0 : _props$iterations;
	  var PI = Math.PI;
	  var PI2 = PI * 2;
	  var positions = [].concat(ICO_POSITIONS);
	  var indices = [].concat(ICO_INDICES);
	  positions.push();
	  indices.push();

	  var getMiddlePoint = function () {
	    var pointMemo = {};
	    return function (i1, i2) {
	      i1 *= 3;
	      i2 *= 3;
	      var mini = i1 < i2 ? i1 : i2;
	      var maxi = i1 > i2 ? i1 : i2;
	      var key = "".concat(mini, "|").concat(maxi);

	      if (key in pointMemo) {
	        return pointMemo[key];
	      }

	      var x1 = positions[i1];
	      var y1 = positions[i1 + 1];
	      var z1 = positions[i1 + 2];
	      var x2 = positions[i2];
	      var y2 = positions[i2 + 1];
	      var z2 = positions[i2 + 2];
	      var xm = (x1 + x2) / 2;
	      var ym = (y1 + y2) / 2;
	      var zm = (z1 + z2) / 2;
	      var len = Math.sqrt(xm * xm + ym * ym + zm * zm);
	      xm /= len;
	      ym /= len;
	      zm /= len;
	      positions.push(xm, ym, zm);
	      return pointMemo[key] = positions.length / 3 - 1;
	    };
	  }();

	  for (var i = 0; i < iterations; i++) {
	    var indices2 = [];

	    for (var j = 0; j < indices.length; j += 3) {
	      var a = getMiddlePoint(indices[j + 0], indices[j + 1]);
	      var b = getMiddlePoint(indices[j + 1], indices[j + 2]);
	      var c = getMiddlePoint(indices[j + 2], indices[j + 0]);
	      indices2.push(c, indices[j + 0], a, a, indices[j + 1], b, b, indices[j + 2], c, a, b, c);
	    }

	    indices = indices2;
	  } // Calculate texCoords and normals


	  var normals = new Array(positions.length);
	  var texCoords = new Array(positions.length / 3 * 2);
	  var l = indices.length;

	  for (var _i = l - 3; _i >= 0; _i -= 3) {
	    var i1 = indices[_i + 0];
	    var i2 = indices[_i + 1];
	    var i3 = indices[_i + 2];
	    var in1 = i1 * 3;
	    var in2 = i2 * 3;
	    var in3 = i3 * 3;
	    var iu1 = i1 * 2;
	    var iu2 = i2 * 2;
	    var iu3 = i3 * 2;
	    var x1 = positions[in1 + 0];
	    var y1 = positions[in1 + 1];
	    var z1 = positions[in1 + 2];
	    var theta1 = Math.acos(z1 / Math.sqrt(x1 * x1 + y1 * y1 + z1 * z1));
	    var phi1 = Math.atan2(y1, x1) + PI;
	    var v1 = theta1 / PI;
	    var u1 = 1 - phi1 / PI2;
	    var x2 = positions[in2 + 0];
	    var y2 = positions[in2 + 1];
	    var z2 = positions[in2 + 2];
	    var theta2 = Math.acos(z2 / Math.sqrt(x2 * x2 + y2 * y2 + z2 * z2));
	    var phi2 = Math.atan2(y2, x2) + PI;
	    var v2 = theta2 / PI;
	    var u2 = 1 - phi2 / PI2;
	    var x3 = positions[in3 + 0];
	    var y3 = positions[in3 + 1];
	    var z3 = positions[in3 + 2];
	    var theta3 = Math.acos(z3 / Math.sqrt(x3 * x3 + y3 * y3 + z3 * z3));
	    var phi3 = Math.atan2(y3, x3) + PI;
	    var v3 = theta3 / PI;
	    var u3 = 1 - phi3 / PI2;
	    var vec1 = [x3 - x2, y3 - y2, z3 - z2];
	    var vec2 = [x1 - x2, y1 - y2, z1 - z2];
	    var normal = normalize$1([], cross([], vec1, vec2));
	    var newIndex = void 0;

	    if ((u1 === 0 || u2 === 0 || u3 === 0) && (u1 === 0 || u1 > 0.5) && (u2 === 0 || u2 > 0.5) && (u3 === 0 || u3 > 0.5)) {
	      positions.push(positions[in1 + 0], positions[in1 + 1], positions[in1 + 2]);
	      newIndex = positions.length / 3 - 1;
	      indices.push(newIndex);
	      texCoords[newIndex * 2 + 0] = 1;
	      texCoords[newIndex * 2 + 1] = v1;
	      normals[newIndex * 3 + 0] = normal.x;
	      normals[newIndex * 3 + 1] = normal.y;
	      normals[newIndex * 3 + 2] = normal.z;
	      positions.push(positions[in2 + 0], positions[in2 + 1], positions[in2 + 2]);
	      newIndex = positions.length / 3 - 1;
	      indices.push(newIndex);
	      texCoords[newIndex * 2 + 0] = 1;
	      texCoords[newIndex * 2 + 1] = v2;
	      normals[newIndex * 3 + 0] = normal.x;
	      normals[newIndex * 3 + 1] = normal.y;
	      normals[newIndex * 3 + 2] = normal.z;
	      positions.push(positions[in3 + 0], positions[in3 + 1], positions[in3 + 2]);
	      newIndex = positions.length / 3 - 1;
	      indices.push(newIndex);
	      texCoords[newIndex * 2 + 0] = 1;
	      texCoords[newIndex * 2 + 1] = v3;
	      normals[newIndex * 3 + 0] = normal.x;
	      normals[newIndex * 3 + 1] = normal.y;
	      normals[newIndex * 3 + 2] = normal.z;
	    }

	    normals[in1 + 0] = normals[in2 + 0] = normals[in3 + 0] = normal.x;
	    normals[in1 + 1] = normals[in2 + 1] = normals[in3 + 1] = normal.y;
	    normals[in1 + 2] = normals[in2 + 2] = normals[in3 + 2] = normal.z;
	    texCoords[iu1 + 0] = u1;
	    texCoords[iu1 + 1] = v1;
	    texCoords[iu2 + 0] = u2;
	    texCoords[iu2 + 1] = v2;
	    texCoords[iu3 + 0] = u3;
	    texCoords[iu3 + 1] = v3;
	  }

	  return {
	    indices: {
	      size: 1,
	      value: new Uint16Array(indices)
	    },
	    attributes: {
	      POSITION: {
	        size: 3,
	        value: new Float32Array(positions)
	      },
	      NORMAL: {
	        size: 3,
	        value: new Float32Array(normals)
	      },
	      TEXCOORD_0: {
	        size: 2,
	        value: new Float32Array(texCoords)
	      }
	    }
	  };
	}

	function unpackIndexedGeometry(geometry) {
	  var indices = geometry.indices,
	      attributes = geometry.attributes;

	  if (!indices) {
	    return geometry;
	  }

	  var vertexCount = indices.value.length;
	  var unpackedAttributes = {};

	  for (var attributeName in attributes) {
	    var attribute = attributes[attributeName];
	    var constant = attribute.constant,
	        value = attribute.value,
	        size = attribute.size;

	    if (constant || !size) {
	      continue; // eslint-disable-line
	    }

	    var unpackedValue = new value.constructor(vertexCount * size);

	    for (var x = 0; x < vertexCount; ++x) {
	      var index = indices.value[x];

	      for (var i = 0; i < size; i++) {
	        unpackedValue[x * size + i] = value[index * size + i];
	      }
	    }

	    unpackedAttributes[attributeName] = {
	      size: size,
	      value: unpackedValue
	    };
	  }

	  return {
	    attributes: Object.assign({}, attributes, unpackedAttributes)
	  };
	}

	var PlaneGeometry = /*#__PURE__*/function (_Geometry) {
	  _inherits(PlaneGeometry, _Geometry);

	  var _super = _createSuper(PlaneGeometry);

	  function PlaneGeometry() {
	    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    _classCallCheck(this, PlaneGeometry);

	    var _props$id = props.id,
	        id = _props$id === void 0 ? uid$1("plane-geometry") : _props$id;

	    var _tesselatePlane = tesselatePlane(props),
	        indices = _tesselatePlane.indices,
	        attributes = _tesselatePlane.attributes;

	    return _super.call(this, _objectSpread2(_objectSpread2({}, props), {}, {
	      id: id,
	      indices: indices,
	      attributes: _objectSpread2(_objectSpread2({}, attributes), props.attributes)
	    }));
	  }

	  return PlaneGeometry;
	}(Geometry); // Primitives inspired by TDL http://code.google.com/p/webglsamples/,

	function tesselatePlane(props) {
	  var _props$type = props.type,
	      type = _props$type === void 0 ? "x,y" : _props$type,
	      _props$offset = props.offset,
	      offset = _props$offset === void 0 ? 0 : _props$offset,
	      _props$flipCull = props.flipCull,
	      flipCull = _props$flipCull === void 0 ? false : _props$flipCull,
	      _props$unpack = props.unpack,
	      unpack = _props$unpack === void 0 ? false : _props$unpack;
	  var coords = type.split(","); // width, height

	  var c1len = props["".concat(coords[0], "len")] || 1;
	  var c2len = props["".concat(coords[1], "len")] || 1; // subdivisionsWidth, subdivisionsDepth

	  var subdivisions1 = props["n".concat(coords[0])] || 1;
	  var subdivisions2 = props["n".concat(coords[1])] || 1;
	  var numVertices = (subdivisions1 + 1) * (subdivisions2 + 1);
	  var positions = new Float32Array(numVertices * 3);
	  var normals = new Float32Array(numVertices * 3);
	  var texCoords = new Float32Array(numVertices * 2);

	  if (flipCull) {
	    c1len = -c1len;
	  }

	  var i2 = 0;
	  var i3 = 0;

	  for (var z = 0; z <= subdivisions2; z++) {
	    for (var x = 0; x <= subdivisions1; x++) {
	      var u = x / subdivisions1;
	      var v = z / subdivisions2;
	      texCoords[i2 + 0] = flipCull ? 1 - u : u;
	      texCoords[i2 + 1] = v;

	      switch (type) {
	        case "x,y":
	          positions[i3 + 0] = c1len * u - c1len * 0.5;
	          positions[i3 + 1] = c2len * v - c2len * 0.5;
	          positions[i3 + 2] = offset;
	          normals[i3 + 0] = 0;
	          normals[i3 + 1] = 0;
	          normals[i3 + 2] = flipCull ? 1 : -1;
	          break;

	        case "x,z":
	          positions[i3 + 0] = c1len * u - c1len * 0.5;
	          positions[i3 + 1] = offset;
	          positions[i3 + 2] = c2len * v - c2len * 0.5;
	          normals[i3 + 0] = 0;
	          normals[i3 + 1] = flipCull ? 1 : -1;
	          normals[i3 + 2] = 0;
	          break;

	        case "y,z":
	          positions[i3 + 0] = offset;
	          positions[i3 + 1] = c1len * u - c1len * 0.5;
	          positions[i3 + 2] = c2len * v - c2len * 0.5;
	          normals[i3 + 0] = flipCull ? 1 : -1;
	          normals[i3 + 1] = 0;
	          normals[i3 + 2] = 0;
	          break;

	        default:
	          throw new Error("PlaneGeometry: unknown type");
	      }

	      i2 += 2;
	      i3 += 3;
	    }
	  }

	  var numVertsAcross = subdivisions1 + 1;
	  var indices = new Uint16Array(subdivisions1 * subdivisions2 * 6);

	  for (var _z = 0; _z < subdivisions2; _z++) {
	    for (var _x = 0; _x < subdivisions1; _x++) {
	      var index = (_z * subdivisions1 + _x) * 6; // Make triangle 1 of quad.

	      indices[index + 0] = (_z + 0) * numVertsAcross + _x;
	      indices[index + 1] = (_z + 1) * numVertsAcross + _x;
	      indices[index + 2] = (_z + 0) * numVertsAcross + _x + 1; // Make triangle 2 of quad.

	      indices[index + 3] = (_z + 1) * numVertsAcross + _x;
	      indices[index + 4] = (_z + 1) * numVertsAcross + _x + 1;
	      indices[index + 5] = (_z + 0) * numVertsAcross + _x + 1;
	    }
	  }

	  var geometry = {
	    indices: {
	      size: 1,
	      value: indices
	    },
	    attributes: {
	      POSITION: {
	        size: 3,
	        value: positions
	      },
	      NORMAL: {
	        size: 3,
	        value: normals
	      },
	      TEXCOORD_0: {
	        size: 2,
	        value: texCoords
	      }
	    }
	  }; // Optionally, unpack indexed geometry

	  return unpack ? unpackIndexedGeometry(geometry) : geometry;
	}

	var SphereGeometry = /*#__PURE__*/function (_Geometry) {
	  _inherits(SphereGeometry, _Geometry);

	  var _super = _createSuper(SphereGeometry);

	  function SphereGeometry() {
	    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    _classCallCheck(this, SphereGeometry);

	    var _props$id = props.id,
	        id = _props$id === void 0 ? uid$1("sphere-geometry") : _props$id;

	    var _tesselateSphere = tesselateSphere(props),
	        indices = _tesselateSphere.indices,
	        attributes = _tesselateSphere.attributes;

	    return _super.call(this, _objectSpread2(_objectSpread2({}, props), {}, {
	      id: id,
	      indices: indices,
	      attributes: _objectSpread2(_objectSpread2({}, attributes), props.attributes)
	    }));
	  }

	  return SphereGeometry;
	}(Geometry); // Primitives inspired by TDL http://code.google.com/p/webglsamples/,

	function tesselateSphere(props) {
	  var _props$nlat = props.nlat,
	      nlat = _props$nlat === void 0 ? 10 : _props$nlat,
	      _props$nlong = props.nlong,
	      nlong = _props$nlong === void 0 ? 10 : _props$nlong,
	      _props$startLat = props.startLat,
	      startLat = _props$startLat === void 0 ? 0 : _props$startLat,
	      _props$endLat = props.endLat,
	      endLat = _props$endLat === void 0 ? Math.PI : _props$endLat,
	      _props$startLong = props.startLong,
	      startLong = _props$startLong === void 0 ? 0 : _props$startLong,
	      _props$endLong = props.endLong,
	      endLong = _props$endLong === void 0 ? 2 * Math.PI : _props$endLong;
	  var _props$radius = props.radius,
	      radius = _props$radius === void 0 ? 1 : _props$radius;
	  var latRange = endLat - startLat;
	  var longRange = endLong - startLong;
	  var numVertices = (nlat + 1) * (nlong + 1);

	  if (typeof radius === "number") {
	    var value = radius; // eslint-disable-next-line no-unused-vars

	    radius = function radius(n1, n2, n3, u, v) {
	      return value;
	    };
	  }

	  var positions = new Float32Array(numVertices * 3);
	  var normals = new Float32Array(numVertices * 3);
	  var texCoords = new Float32Array(numVertices * 2);
	  var IndexType = numVertices > 0xffff ? Uint32Array : Uint16Array;
	  var indices = new IndexType(nlat * nlong * 6); // Create positions, normals and texCoords

	  for (var y = 0; y <= nlat; y++) {
	    for (var x = 0; x <= nlong; x++) {
	      var u = x / nlong;
	      var v = y / nlat;
	      var index = x + y * (nlong + 1);
	      var i2 = index * 2;
	      var i3 = index * 3;
	      var theta = longRange * u;
	      var phi = latRange * v;
	      var sinTheta = Math.sin(theta);
	      var cosTheta = Math.cos(theta);
	      var sinPhi = Math.sin(phi);
	      var cosPhi = Math.cos(phi);
	      var ux = cosTheta * sinPhi;
	      var uy = cosPhi;
	      var uz = sinTheta * sinPhi;
	      var r = radius(ux, uy, uz, u, v);
	      positions[i3 + 0] = r * ux;
	      positions[i3 + 1] = r * uy;
	      positions[i3 + 2] = r * uz;
	      normals[i3 + 0] = ux;
	      normals[i3 + 1] = uy;
	      normals[i3 + 2] = uz;
	      texCoords[i2 + 0] = u;
	      texCoords[i2 + 1] = 1 - v;
	    }
	  } // Create indices


	  var numVertsAround = nlong + 1;

	  for (var _x = 0; _x < nlong; _x++) {
	    for (var _y = 0; _y < nlat; _y++) {
	      var _index = (_x * nlat + _y) * 6;

	      indices[_index + 0] = _y * numVertsAround + _x;
	      indices[_index + 1] = _y * numVertsAround + _x + 1;
	      indices[_index + 2] = (_y + 1) * numVertsAround + _x;
	      indices[_index + 3] = (_y + 1) * numVertsAround + _x;
	      indices[_index + 4] = _y * numVertsAround + _x + 1;
	      indices[_index + 5] = (_y + 1) * numVertsAround + _x + 1;
	    }
	  }

	  return {
	    indices: {
	      size: 1,
	      value: indices
	    },
	    attributes: {
	      POSITION: {
	        size: 3,
	        value: positions
	      },
	      NORMAL: {
	        size: 3,
	        value: normals
	      },
	      TEXCOORD_0: {
	        size: 2,
	        value: texCoords
	      }
	    }
	  };
	}

	// https://tc39.github.io/ecma262/#sec-string.prototype.repeat

	_export({
	  target: 'String',
	  proto: true
	}, {
	  repeat: stringRepeat
	});

	/**
	 * @typedef {Object} Feature
	 * @property {Object} geometry 多边形
	 * @property {String} geometry.type 类型
	 * @property {Array} geometry.coordinates 坐标
	 * @property {Object} properties 属性
	 */

	/**
	 * 图层基类，定义一些标准化的接口
	 *
	 * @interface
	 */
	var CommonLayer = /*#__PURE__*/function () {
	  function CommonLayer(options) {
	    _classCallCheck(this, CommonLayer);

	    this.options = Object.assign(this.getCommonDefaultOptions(), this.getDefaultOptions(), options);
	    this.autoUpdate = false; // 状态管理器

	    this._dataDirty = false;
	    this._optionsDirty = false;

	    if (this.options.data) {
	      this.data = this.options.data;
	      delete this.options.data;
	    }
	  }
	  /**
	   * 获取公共默认配置信息，需要继承实现
	   * @abstract
	   * @returns {Object} 键值对对象
	   */


	  _createClass(CommonLayer, [{
	    key: "getCommonDefaultOptions",
	    value: function getCommonDefaultOptions() {
	      return {};
	    }
	    /**
	     * 获取默认配置信息，需要继承实现
	     * @abstract
	     * @returns {Object} 键值对对象
	     */

	  }, {
	    key: "getDefaultOptions",
	    value: function getDefaultOptions() {
	      return {};
	    }
	    /**
	     * 初始化接口
	     * @abstract
	     * @param {WebGLRenderingContext | WebGL2RenderingContext} gl
	     */

	  }, {
	    key: "initialize",
	    value: function initialize(gl) {}
	  }, {
	    key: "destroy",
	    value: function destroy() {
	      this.map = this.webglLayer = null;
	      this.onDestroy();
	    }
	    /**
	     * 渲染接口
	     * @abstract
	     * @param {Object} transferOptions
	     */

	  }, {
	    key: "render",
	    value: function render(transferOptions) {}
	    /**
	     * 设置和更新数据的接口
	     *
	     * @api
	     * @param {Array.<Feature>} data
	     * @param {Object=} options
	     * @param {Boolean=} [options.autoRender=true] 是否自动更新图层渲染
	     */

	  }, {
	    key: "setData",
	    value: function setData(data) {
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      this._dataDirty = true;
	      delete this.pointOffset;
	      this.data = data;
	      this.onDataChanged(this.getData());
	      this.onChanged(this.getOptions(), this.getData());
	      this._dataDirty = false;

	      if (false !== options.autoRender && this.webglLayer) {
	        this.webglLayer.render();
	      }
	    }
	  }, {
	    key: "getData",
	    value: function getData() {
	      return this.data || [];
	    }
	    /**
	     * 设置更新配置信息，options内容由相关图层定义
	     * @abstract
	     * @param {Object} options
	     * @param {Array.<Feature>=} options.data 存在该信息会自动调用 setData 接口
	     */

	  }, {
	    key: "setOptions",
	    value: function setOptions() {
	      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	      this._optionsDirty = true;
	      delete this.pointOffset;
	      var preOptions = Object.assign({}, this.getOptions());
	      Object.assign(this.options, options);
	      this.onOptionsChanged(this.getOptions(), preOptions);
	      this.onChanged(this.getOptions(), this.getData());
	      this._optionsDirty = false;

	      if (options.data) {
	        this.setData(options.data);
	        delete options.data;
	      } else {
	        this.webglLayer && this.webglLayer.render();
	      }
	    }
	  }, {
	    key: "getOptions",
	    value: function getOptions() {
	      return this.options || {};
	    }
	  }, {
	    key: "onOptionsChanged",
	    value: function onOptionsChanged(newOptions, preOptions) {}
	  }, {
	    key: "onDataChanged",
	    value: function onDataChanged(data) {}
	  }, {
	    key: "onChanged",
	    value: function onChanged(options, data) {}
	  }, {
	    key: "onDestroy",
	    value: function onDestroy() {}
	  }, {
	    key: "setWebglLayer",
	    value: function setWebglLayer(webglLayer) {
	      this.webglLayer = webglLayer;
	    }
	  }, {
	    key: "getWebglLayer",
	    value: function getWebglLayer() {
	      return this.webglLayer;
	    }
	  }, {
	    key: "isRequestAnimation",
	    value: function isRequestAnimation() {
	      return this.autoUpdate;
	    }
	  }]);

	  return CommonLayer;
	}();

	var colorName = {
	  "aliceblue": [240, 248, 255],
	  "antiquewhite": [250, 235, 215],
	  "aqua": [0, 255, 255],
	  "aquamarine": [127, 255, 212],
	  "azure": [240, 255, 255],
	  "beige": [245, 245, 220],
	  "bisque": [255, 228, 196],
	  "black": [0, 0, 0],
	  "blanchedalmond": [255, 235, 205],
	  "blue": [0, 0, 255],
	  "blueviolet": [138, 43, 226],
	  "brown": [165, 42, 42],
	  "burlywood": [222, 184, 135],
	  "cadetblue": [95, 158, 160],
	  "chartreuse": [127, 255, 0],
	  "chocolate": [210, 105, 30],
	  "coral": [255, 127, 80],
	  "cornflowerblue": [100, 149, 237],
	  "cornsilk": [255, 248, 220],
	  "crimson": [220, 20, 60],
	  "cyan": [0, 255, 255],
	  "darkblue": [0, 0, 139],
	  "darkcyan": [0, 139, 139],
	  "darkgoldenrod": [184, 134, 11],
	  "darkgray": [169, 169, 169],
	  "darkgreen": [0, 100, 0],
	  "darkgrey": [169, 169, 169],
	  "darkkhaki": [189, 183, 107],
	  "darkmagenta": [139, 0, 139],
	  "darkolivegreen": [85, 107, 47],
	  "darkorange": [255, 140, 0],
	  "darkorchid": [153, 50, 204],
	  "darkred": [139, 0, 0],
	  "darksalmon": [233, 150, 122],
	  "darkseagreen": [143, 188, 143],
	  "darkslateblue": [72, 61, 139],
	  "darkslategray": [47, 79, 79],
	  "darkslategrey": [47, 79, 79],
	  "darkturquoise": [0, 206, 209],
	  "darkviolet": [148, 0, 211],
	  "deeppink": [255, 20, 147],
	  "deepskyblue": [0, 191, 255],
	  "dimgray": [105, 105, 105],
	  "dimgrey": [105, 105, 105],
	  "dodgerblue": [30, 144, 255],
	  "firebrick": [178, 34, 34],
	  "floralwhite": [255, 250, 240],
	  "forestgreen": [34, 139, 34],
	  "fuchsia": [255, 0, 255],
	  "gainsboro": [220, 220, 220],
	  "ghostwhite": [248, 248, 255],
	  "gold": [255, 215, 0],
	  "goldenrod": [218, 165, 32],
	  "gray": [128, 128, 128],
	  "green": [0, 128, 0],
	  "greenyellow": [173, 255, 47],
	  "grey": [128, 128, 128],
	  "honeydew": [240, 255, 240],
	  "hotpink": [255, 105, 180],
	  "indianred": [205, 92, 92],
	  "indigo": [75, 0, 130],
	  "ivory": [255, 255, 240],
	  "khaki": [240, 230, 140],
	  "lavender": [230, 230, 250],
	  "lavenderblush": [255, 240, 245],
	  "lawngreen": [124, 252, 0],
	  "lemonchiffon": [255, 250, 205],
	  "lightblue": [173, 216, 230],
	  "lightcoral": [240, 128, 128],
	  "lightcyan": [224, 255, 255],
	  "lightgoldenrodyellow": [250, 250, 210],
	  "lightgray": [211, 211, 211],
	  "lightgreen": [144, 238, 144],
	  "lightgrey": [211, 211, 211],
	  "lightpink": [255, 182, 193],
	  "lightsalmon": [255, 160, 122],
	  "lightseagreen": [32, 178, 170],
	  "lightskyblue": [135, 206, 250],
	  "lightslategray": [119, 136, 153],
	  "lightslategrey": [119, 136, 153],
	  "lightsteelblue": [176, 196, 222],
	  "lightyellow": [255, 255, 224],
	  "lime": [0, 255, 0],
	  "limegreen": [50, 205, 50],
	  "linen": [250, 240, 230],
	  "magenta": [255, 0, 255],
	  "maroon": [128, 0, 0],
	  "mediumaquamarine": [102, 205, 170],
	  "mediumblue": [0, 0, 205],
	  "mediumorchid": [186, 85, 211],
	  "mediumpurple": [147, 112, 219],
	  "mediumseagreen": [60, 179, 113],
	  "mediumslateblue": [123, 104, 238],
	  "mediumspringgreen": [0, 250, 154],
	  "mediumturquoise": [72, 209, 204],
	  "mediumvioletred": [199, 21, 133],
	  "midnightblue": [25, 25, 112],
	  "mintcream": [245, 255, 250],
	  "mistyrose": [255, 228, 225],
	  "moccasin": [255, 228, 181],
	  "navajowhite": [255, 222, 173],
	  "navy": [0, 0, 128],
	  "oldlace": [253, 245, 230],
	  "olive": [128, 128, 0],
	  "olivedrab": [107, 142, 35],
	  "orange": [255, 165, 0],
	  "orangered": [255, 69, 0],
	  "orchid": [218, 112, 214],
	  "palegoldenrod": [238, 232, 170],
	  "palegreen": [152, 251, 152],
	  "paleturquoise": [175, 238, 238],
	  "palevioletred": [219, 112, 147],
	  "papayawhip": [255, 239, 213],
	  "peachpuff": [255, 218, 185],
	  "peru": [205, 133, 63],
	  "pink": [255, 192, 203],
	  "plum": [221, 160, 221],
	  "powderblue": [176, 224, 230],
	  "purple": [128, 0, 128],
	  "rebeccapurple": [102, 51, 153],
	  "red": [255, 0, 0],
	  "rosybrown": [188, 143, 143],
	  "royalblue": [65, 105, 225],
	  "saddlebrown": [139, 69, 19],
	  "salmon": [250, 128, 114],
	  "sandybrown": [244, 164, 96],
	  "seagreen": [46, 139, 87],
	  "seashell": [255, 245, 238],
	  "sienna": [160, 82, 45],
	  "silver": [192, 192, 192],
	  "skyblue": [135, 206, 235],
	  "slateblue": [106, 90, 205],
	  "slategray": [112, 128, 144],
	  "slategrey": [112, 128, 144],
	  "snow": [255, 250, 250],
	  "springgreen": [0, 255, 127],
	  "steelblue": [70, 130, 180],
	  "tan": [210, 180, 140],
	  "teal": [0, 128, 128],
	  "thistle": [216, 191, 216],
	  "tomato": [255, 99, 71],
	  "turquoise": [64, 224, 208],
	  "violet": [238, 130, 238],
	  "wheat": [245, 222, 179],
	  "white": [255, 255, 255],
	  "whitesmoke": [245, 245, 245],
	  "yellow": [255, 255, 0],
	  "yellowgreen": [154, 205, 50]
	};

	var isArrayish = function isArrayish(obj) {
	  if (!obj || typeof obj === 'string') {
	    return false;
	  }

	  return obj instanceof Array || Array.isArray(obj) || obj.length >= 0 && (obj.splice instanceof Function || Object.getOwnPropertyDescriptor(obj, obj.length - 1) && obj.constructor.name !== 'String');
	};

	var simpleSwizzle = createCommonjsModule(function (module) {

	  var concat = Array.prototype.concat;
	  var slice = Array.prototype.slice;

	  var swizzle = module.exports = function swizzle(args) {
	    var results = [];

	    for (var i = 0, len = args.length; i < len; i++) {
	      var arg = args[i];

	      if (isArrayish(arg)) {
	        // http://jsperf.com/javascript-array-concat-vs-push/98
	        results = concat.call(results, slice.call(arg));
	      } else {
	        results.push(arg);
	      }
	    }

	    return results;
	  };

	  swizzle.wrap = function (fn) {
	    return function () {
	      return fn(swizzle(arguments));
	    };
	  };
	});

	var colorString = createCommonjsModule(function (module) {
	  /* MIT license */
	  var reverseNames = {}; // create a list of reverse color names

	  for (var name in colorName) {
	    if (colorName.hasOwnProperty(name)) {
	      reverseNames[colorName[name]] = name;
	    }
	  }

	  var cs = module.exports = {
	    to: {},
	    get: {}
	  };

	  cs.get = function (string) {
	    var prefix = string.substring(0, 3).toLowerCase();
	    var val;
	    var model;

	    switch (prefix) {
	      case 'hsl':
	        val = cs.get.hsl(string);
	        model = 'hsl';
	        break;

	      case 'hwb':
	        val = cs.get.hwb(string);
	        model = 'hwb';
	        break;

	      default:
	        val = cs.get.rgb(string);
	        model = 'rgb';
	        break;
	    }

	    if (!val) {
	      return null;
	    }

	    return {
	      model: model,
	      value: val
	    };
	  };

	  cs.get.rgb = function (string) {
	    if (!string) {
	      return null;
	    }

	    var abbr = /^#([a-f0-9]{3,4})$/i;
	    var hex = /^#([a-f0-9]{6})([a-f0-9]{2})?$/i;
	    var rgba = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	    var per = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	    var keyword = /(\D+)/;
	    var rgb = [0, 0, 0, 1];
	    var match;
	    var i;
	    var hexAlpha;

	    if (match = string.match(hex)) {
	      hexAlpha = match[2];
	      match = match[1];

	      for (i = 0; i < 3; i++) {
	        // https://jsperf.com/slice-vs-substr-vs-substring-methods-long-string/19
	        var i2 = i * 2;
	        rgb[i] = parseInt(match.slice(i2, i2 + 2), 16);
	      }

	      if (hexAlpha) {
	        rgb[3] = Math.round(parseInt(hexAlpha, 16) / 255 * 100) / 100;
	      }
	    } else if (match = string.match(abbr)) {
	      match = match[1];
	      hexAlpha = match[3];

	      for (i = 0; i < 3; i++) {
	        rgb[i] = parseInt(match[i] + match[i], 16);
	      }

	      if (hexAlpha) {
	        rgb[3] = Math.round(parseInt(hexAlpha + hexAlpha, 16) / 255 * 100) / 100;
	      }
	    } else if (match = string.match(rgba)) {
	      for (i = 0; i < 3; i++) {
	        rgb[i] = parseInt(match[i + 1], 0);
	      }

	      if (match[4]) {
	        rgb[3] = parseFloat(match[4]);
	      }
	    } else if (match = string.match(per)) {
	      for (i = 0; i < 3; i++) {
	        rgb[i] = Math.round(parseFloat(match[i + 1]) * 2.55);
	      }

	      if (match[4]) {
	        rgb[3] = parseFloat(match[4]);
	      }
	    } else if (match = string.match(keyword)) {
	      if (match[1] === 'transparent') {
	        return [0, 0, 0, 0];
	      }

	      rgb = colorName[match[1]];

	      if (!rgb) {
	        return null;
	      }

	      rgb[3] = 1;
	      return rgb;
	    } else {
	      return null;
	    }

	    for (i = 0; i < 3; i++) {
	      rgb[i] = clamp(rgb[i], 0, 255);
	    }

	    rgb[3] = clamp(rgb[3], 0, 1);
	    return rgb;
	  };

	  cs.get.hsl = function (string) {
	    if (!string) {
	      return null;
	    }

	    var hsl = /^hsla?\(\s*([+-]?(?:\d*\.)?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	    var match = string.match(hsl);

	    if (match) {
	      var alpha = parseFloat(match[4]);
	      var h = (parseFloat(match[1]) + 360) % 360;
	      var s = clamp(parseFloat(match[2]), 0, 100);
	      var l = clamp(parseFloat(match[3]), 0, 100);
	      var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);
	      return [h, s, l, a];
	    }

	    return null;
	  };

	  cs.get.hwb = function (string) {
	    if (!string) {
	      return null;
	    }

	    var hwb = /^hwb\(\s*([+-]?\d*[\.]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	    var match = string.match(hwb);

	    if (match) {
	      var alpha = parseFloat(match[4]);
	      var h = (parseFloat(match[1]) % 360 + 360) % 360;
	      var w = clamp(parseFloat(match[2]), 0, 100);
	      var b = clamp(parseFloat(match[3]), 0, 100);
	      var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);
	      return [h, w, b, a];
	    }

	    return null;
	  };

	  cs.to.hex = function () {
	    var rgba = simpleSwizzle(arguments);
	    return '#' + hexDouble(rgba[0]) + hexDouble(rgba[1]) + hexDouble(rgba[2]) + (rgba[3] < 1 ? hexDouble(Math.round(rgba[3] * 255)) : '');
	  };

	  cs.to.rgb = function () {
	    var rgba = simpleSwizzle(arguments);
	    return rgba.length < 4 || rgba[3] === 1 ? 'rgb(' + Math.round(rgba[0]) + ', ' + Math.round(rgba[1]) + ', ' + Math.round(rgba[2]) + ')' : 'rgba(' + Math.round(rgba[0]) + ', ' + Math.round(rgba[1]) + ', ' + Math.round(rgba[2]) + ', ' + rgba[3] + ')';
	  };

	  cs.to.rgb.percent = function () {
	    var rgba = simpleSwizzle(arguments);
	    var r = Math.round(rgba[0] / 255 * 100);
	    var g = Math.round(rgba[1] / 255 * 100);
	    var b = Math.round(rgba[2] / 255 * 100);
	    return rgba.length < 4 || rgba[3] === 1 ? 'rgb(' + r + '%, ' + g + '%, ' + b + '%)' : 'rgba(' + r + '%, ' + g + '%, ' + b + '%, ' + rgba[3] + ')';
	  };

	  cs.to.hsl = function () {
	    var hsla = simpleSwizzle(arguments);
	    return hsla.length < 4 || hsla[3] === 1 ? 'hsl(' + hsla[0] + ', ' + hsla[1] + '%, ' + hsla[2] + '%)' : 'hsla(' + hsla[0] + ', ' + hsla[1] + '%, ' + hsla[2] + '%, ' + hsla[3] + ')';
	  }; // hwb is a bit different than rgb(a) & hsl(a) since there is no alpha specific syntax
	  // (hwb have alpha optional & 1 is default value)


	  cs.to.hwb = function () {
	    var hwba = simpleSwizzle(arguments);
	    var a = '';

	    if (hwba.length >= 4 && hwba[3] !== 1) {
	      a = ', ' + hwba[3];
	    }

	    return 'hwb(' + hwba[0] + ', ' + hwba[1] + '%, ' + hwba[2] + '%' + a + ')';
	  };

	  cs.to.keyword = function (rgb) {
	    return reverseNames[rgb.slice(0, 3)];
	  }; // helpers


	  function clamp(num, min, max) {
	    return Math.min(Math.max(min, num), max);
	  }

	  function hexDouble(num) {
	    var str = num.toString(16).toUpperCase();
	    return str.length < 2 ? '0' + str : str;
	  }
	});

	var colorName$1 = {
	  "aliceblue": [240, 248, 255],
	  "antiquewhite": [250, 235, 215],
	  "aqua": [0, 255, 255],
	  "aquamarine": [127, 255, 212],
	  "azure": [240, 255, 255],
	  "beige": [245, 245, 220],
	  "bisque": [255, 228, 196],
	  "black": [0, 0, 0],
	  "blanchedalmond": [255, 235, 205],
	  "blue": [0, 0, 255],
	  "blueviolet": [138, 43, 226],
	  "brown": [165, 42, 42],
	  "burlywood": [222, 184, 135],
	  "cadetblue": [95, 158, 160],
	  "chartreuse": [127, 255, 0],
	  "chocolate": [210, 105, 30],
	  "coral": [255, 127, 80],
	  "cornflowerblue": [100, 149, 237],
	  "cornsilk": [255, 248, 220],
	  "crimson": [220, 20, 60],
	  "cyan": [0, 255, 255],
	  "darkblue": [0, 0, 139],
	  "darkcyan": [0, 139, 139],
	  "darkgoldenrod": [184, 134, 11],
	  "darkgray": [169, 169, 169],
	  "darkgreen": [0, 100, 0],
	  "darkgrey": [169, 169, 169],
	  "darkkhaki": [189, 183, 107],
	  "darkmagenta": [139, 0, 139],
	  "darkolivegreen": [85, 107, 47],
	  "darkorange": [255, 140, 0],
	  "darkorchid": [153, 50, 204],
	  "darkred": [139, 0, 0],
	  "darksalmon": [233, 150, 122],
	  "darkseagreen": [143, 188, 143],
	  "darkslateblue": [72, 61, 139],
	  "darkslategray": [47, 79, 79],
	  "darkslategrey": [47, 79, 79],
	  "darkturquoise": [0, 206, 209],
	  "darkviolet": [148, 0, 211],
	  "deeppink": [255, 20, 147],
	  "deepskyblue": [0, 191, 255],
	  "dimgray": [105, 105, 105],
	  "dimgrey": [105, 105, 105],
	  "dodgerblue": [30, 144, 255],
	  "firebrick": [178, 34, 34],
	  "floralwhite": [255, 250, 240],
	  "forestgreen": [34, 139, 34],
	  "fuchsia": [255, 0, 255],
	  "gainsboro": [220, 220, 220],
	  "ghostwhite": [248, 248, 255],
	  "gold": [255, 215, 0],
	  "goldenrod": [218, 165, 32],
	  "gray": [128, 128, 128],
	  "green": [0, 128, 0],
	  "greenyellow": [173, 255, 47],
	  "grey": [128, 128, 128],
	  "honeydew": [240, 255, 240],
	  "hotpink": [255, 105, 180],
	  "indianred": [205, 92, 92],
	  "indigo": [75, 0, 130],
	  "ivory": [255, 255, 240],
	  "khaki": [240, 230, 140],
	  "lavender": [230, 230, 250],
	  "lavenderblush": [255, 240, 245],
	  "lawngreen": [124, 252, 0],
	  "lemonchiffon": [255, 250, 205],
	  "lightblue": [173, 216, 230],
	  "lightcoral": [240, 128, 128],
	  "lightcyan": [224, 255, 255],
	  "lightgoldenrodyellow": [250, 250, 210],
	  "lightgray": [211, 211, 211],
	  "lightgreen": [144, 238, 144],
	  "lightgrey": [211, 211, 211],
	  "lightpink": [255, 182, 193],
	  "lightsalmon": [255, 160, 122],
	  "lightseagreen": [32, 178, 170],
	  "lightskyblue": [135, 206, 250],
	  "lightslategray": [119, 136, 153],
	  "lightslategrey": [119, 136, 153],
	  "lightsteelblue": [176, 196, 222],
	  "lightyellow": [255, 255, 224],
	  "lime": [0, 255, 0],
	  "limegreen": [50, 205, 50],
	  "linen": [250, 240, 230],
	  "magenta": [255, 0, 255],
	  "maroon": [128, 0, 0],
	  "mediumaquamarine": [102, 205, 170],
	  "mediumblue": [0, 0, 205],
	  "mediumorchid": [186, 85, 211],
	  "mediumpurple": [147, 112, 219],
	  "mediumseagreen": [60, 179, 113],
	  "mediumslateblue": [123, 104, 238],
	  "mediumspringgreen": [0, 250, 154],
	  "mediumturquoise": [72, 209, 204],
	  "mediumvioletred": [199, 21, 133],
	  "midnightblue": [25, 25, 112],
	  "mintcream": [245, 255, 250],
	  "mistyrose": [255, 228, 225],
	  "moccasin": [255, 228, 181],
	  "navajowhite": [255, 222, 173],
	  "navy": [0, 0, 128],
	  "oldlace": [253, 245, 230],
	  "olive": [128, 128, 0],
	  "olivedrab": [107, 142, 35],
	  "orange": [255, 165, 0],
	  "orangered": [255, 69, 0],
	  "orchid": [218, 112, 214],
	  "palegoldenrod": [238, 232, 170],
	  "palegreen": [152, 251, 152],
	  "paleturquoise": [175, 238, 238],
	  "palevioletred": [219, 112, 147],
	  "papayawhip": [255, 239, 213],
	  "peachpuff": [255, 218, 185],
	  "peru": [205, 133, 63],
	  "pink": [255, 192, 203],
	  "plum": [221, 160, 221],
	  "powderblue": [176, 224, 230],
	  "purple": [128, 0, 128],
	  "rebeccapurple": [102, 51, 153],
	  "red": [255, 0, 0],
	  "rosybrown": [188, 143, 143],
	  "royalblue": [65, 105, 225],
	  "saddlebrown": [139, 69, 19],
	  "salmon": [250, 128, 114],
	  "sandybrown": [244, 164, 96],
	  "seagreen": [46, 139, 87],
	  "seashell": [255, 245, 238],
	  "sienna": [160, 82, 45],
	  "silver": [192, 192, 192],
	  "skyblue": [135, 206, 235],
	  "slateblue": [106, 90, 205],
	  "slategray": [112, 128, 144],
	  "slategrey": [112, 128, 144],
	  "snow": [255, 250, 250],
	  "springgreen": [0, 255, 127],
	  "steelblue": [70, 130, 180],
	  "tan": [210, 180, 140],
	  "teal": [0, 128, 128],
	  "thistle": [216, 191, 216],
	  "tomato": [255, 99, 71],
	  "turquoise": [64, 224, 208],
	  "violet": [238, 130, 238],
	  "wheat": [245, 222, 179],
	  "white": [255, 255, 255],
	  "whitesmoke": [245, 245, 245],
	  "yellow": [255, 255, 0],
	  "yellowgreen": [154, 205, 50]
	};

	var conversions = createCommonjsModule(function (module) {
	  /* MIT license */
	  // NOTE: conversions should only return primitive values (i.e. arrays, or
	  //       values that give correct `typeof` results).
	  //       do not use box values types (i.e. Number(), String(), etc.)
	  var reverseKeywords = {};

	  for (var key in colorName$1) {
	    if (colorName$1.hasOwnProperty(key)) {
	      reverseKeywords[colorName$1[key]] = key;
	    }
	  }

	  var convert = module.exports = {
	    rgb: {
	      channels: 3,
	      labels: 'rgb'
	    },
	    hsl: {
	      channels: 3,
	      labels: 'hsl'
	    },
	    hsv: {
	      channels: 3,
	      labels: 'hsv'
	    },
	    hwb: {
	      channels: 3,
	      labels: 'hwb'
	    },
	    cmyk: {
	      channels: 4,
	      labels: 'cmyk'
	    },
	    xyz: {
	      channels: 3,
	      labels: 'xyz'
	    },
	    lab: {
	      channels: 3,
	      labels: 'lab'
	    },
	    lch: {
	      channels: 3,
	      labels: 'lch'
	    },
	    hex: {
	      channels: 1,
	      labels: ['hex']
	    },
	    keyword: {
	      channels: 1,
	      labels: ['keyword']
	    },
	    ansi16: {
	      channels: 1,
	      labels: ['ansi16']
	    },
	    ansi256: {
	      channels: 1,
	      labels: ['ansi256']
	    },
	    hcg: {
	      channels: 3,
	      labels: ['h', 'c', 'g']
	    },
	    apple: {
	      channels: 3,
	      labels: ['r16', 'g16', 'b16']
	    },
	    gray: {
	      channels: 1,
	      labels: ['gray']
	    }
	  }; // hide .channels and .labels properties

	  for (var model in convert) {
	    if (convert.hasOwnProperty(model)) {
	      if (!('channels' in convert[model])) {
	        throw new Error('missing channels property: ' + model);
	      }

	      if (!('labels' in convert[model])) {
	        throw new Error('missing channel labels property: ' + model);
	      }

	      if (convert[model].labels.length !== convert[model].channels) {
	        throw new Error('channel and label counts mismatch: ' + model);
	      }

	      var channels = convert[model].channels;
	      var labels = convert[model].labels;
	      delete convert[model].channels;
	      delete convert[model].labels;
	      Object.defineProperty(convert[model], 'channels', {
	        value: channels
	      });
	      Object.defineProperty(convert[model], 'labels', {
	        value: labels
	      });
	    }
	  }

	  convert.rgb.hsl = function (rgb) {
	    var r = rgb[0] / 255;
	    var g = rgb[1] / 255;
	    var b = rgb[2] / 255;
	    var min = Math.min(r, g, b);
	    var max = Math.max(r, g, b);
	    var delta = max - min;
	    var h;
	    var s;
	    var l;

	    if (max === min) {
	      h = 0;
	    } else if (r === max) {
	      h = (g - b) / delta;
	    } else if (g === max) {
	      h = 2 + (b - r) / delta;
	    } else if (b === max) {
	      h = 4 + (r - g) / delta;
	    }

	    h = Math.min(h * 60, 360);

	    if (h < 0) {
	      h += 360;
	    }

	    l = (min + max) / 2;

	    if (max === min) {
	      s = 0;
	    } else if (l <= 0.5) {
	      s = delta / (max + min);
	    } else {
	      s = delta / (2 - max - min);
	    }

	    return [h, s * 100, l * 100];
	  };

	  convert.rgb.hsv = function (rgb) {
	    var rdif;
	    var gdif;
	    var bdif;
	    var h;
	    var s;
	    var r = rgb[0] / 255;
	    var g = rgb[1] / 255;
	    var b = rgb[2] / 255;
	    var v = Math.max(r, g, b);
	    var diff = v - Math.min(r, g, b);

	    var diffc = function (c) {
	      return (v - c) / 6 / diff + 1 / 2;
	    };

	    if (diff === 0) {
	      h = s = 0;
	    } else {
	      s = diff / v;
	      rdif = diffc(r);
	      gdif = diffc(g);
	      bdif = diffc(b);

	      if (r === v) {
	        h = bdif - gdif;
	      } else if (g === v) {
	        h = 1 / 3 + rdif - bdif;
	      } else if (b === v) {
	        h = 2 / 3 + gdif - rdif;
	      }

	      if (h < 0) {
	        h += 1;
	      } else if (h > 1) {
	        h -= 1;
	      }
	    }

	    return [h * 360, s * 100, v * 100];
	  };

	  convert.rgb.hwb = function (rgb) {
	    var r = rgb[0];
	    var g = rgb[1];
	    var b = rgb[2];
	    var h = convert.rgb.hsl(rgb)[0];
	    var w = 1 / 255 * Math.min(r, Math.min(g, b));
	    b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));
	    return [h, w * 100, b * 100];
	  };

	  convert.rgb.cmyk = function (rgb) {
	    var r = rgb[0] / 255;
	    var g = rgb[1] / 255;
	    var b = rgb[2] / 255;
	    var c;
	    var m;
	    var y;
	    var k;
	    k = Math.min(1 - r, 1 - g, 1 - b);
	    c = (1 - r - k) / (1 - k) || 0;
	    m = (1 - g - k) / (1 - k) || 0;
	    y = (1 - b - k) / (1 - k) || 0;
	    return [c * 100, m * 100, y * 100, k * 100];
	  };
	  /**
	   * See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
	   * */


	  function comparativeDistance(x, y) {
	    return Math.pow(x[0] - y[0], 2) + Math.pow(x[1] - y[1], 2) + Math.pow(x[2] - y[2], 2);
	  }

	  convert.rgb.keyword = function (rgb) {
	    var reversed = reverseKeywords[rgb];

	    if (reversed) {
	      return reversed;
	    }

	    var currentClosestDistance = Infinity;
	    var currentClosestKeyword;

	    for (var keyword in colorName$1) {
	      if (colorName$1.hasOwnProperty(keyword)) {
	        var value = colorName$1[keyword]; // Compute comparative distance

	        var distance = comparativeDistance(rgb, value); // Check if its less, if so set as closest

	        if (distance < currentClosestDistance) {
	          currentClosestDistance = distance;
	          currentClosestKeyword = keyword;
	        }
	      }
	    }

	    return currentClosestKeyword;
	  };

	  convert.keyword.rgb = function (keyword) {
	    return colorName$1[keyword];
	  };

	  convert.rgb.xyz = function (rgb) {
	    var r = rgb[0] / 255;
	    var g = rgb[1] / 255;
	    var b = rgb[2] / 255; // assume sRGB

	    r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
	    g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
	    b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
	    var x = r * 0.4124 + g * 0.3576 + b * 0.1805;
	    var y = r * 0.2126 + g * 0.7152 + b * 0.0722;
	    var z = r * 0.0193 + g * 0.1192 + b * 0.9505;
	    return [x * 100, y * 100, z * 100];
	  };

	  convert.rgb.lab = function (rgb) {
	    var xyz = convert.rgb.xyz(rgb);
	    var x = xyz[0];
	    var y = xyz[1];
	    var z = xyz[2];
	    var l;
	    var a;
	    var b;
	    x /= 95.047;
	    y /= 100;
	    z /= 108.883;
	    x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
	    y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
	    z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
	    l = 116 * y - 16;
	    a = 500 * (x - y);
	    b = 200 * (y - z);
	    return [l, a, b];
	  };

	  convert.hsl.rgb = function (hsl) {
	    var h = hsl[0] / 360;
	    var s = hsl[1] / 100;
	    var l = hsl[2] / 100;
	    var t1;
	    var t2;
	    var t3;
	    var rgb;
	    var val;

	    if (s === 0) {
	      val = l * 255;
	      return [val, val, val];
	    }

	    if (l < 0.5) {
	      t2 = l * (1 + s);
	    } else {
	      t2 = l + s - l * s;
	    }

	    t1 = 2 * l - t2;
	    rgb = [0, 0, 0];

	    for (var i = 0; i < 3; i++) {
	      t3 = h + 1 / 3 * -(i - 1);

	      if (t3 < 0) {
	        t3++;
	      }

	      if (t3 > 1) {
	        t3--;
	      }

	      if (6 * t3 < 1) {
	        val = t1 + (t2 - t1) * 6 * t3;
	      } else if (2 * t3 < 1) {
	        val = t2;
	      } else if (3 * t3 < 2) {
	        val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
	      } else {
	        val = t1;
	      }

	      rgb[i] = val * 255;
	    }

	    return rgb;
	  };

	  convert.hsl.hsv = function (hsl) {
	    var h = hsl[0];
	    var s = hsl[1] / 100;
	    var l = hsl[2] / 100;
	    var smin = s;
	    var lmin = Math.max(l, 0.01);
	    var sv;
	    var v;
	    l *= 2;
	    s *= l <= 1 ? l : 2 - l;
	    smin *= lmin <= 1 ? lmin : 2 - lmin;
	    v = (l + s) / 2;
	    sv = l === 0 ? 2 * smin / (lmin + smin) : 2 * s / (l + s);
	    return [h, sv * 100, v * 100];
	  };

	  convert.hsv.rgb = function (hsv) {
	    var h = hsv[0] / 60;
	    var s = hsv[1] / 100;
	    var v = hsv[2] / 100;
	    var hi = Math.floor(h) % 6;
	    var f = h - Math.floor(h);
	    var p = 255 * v * (1 - s);
	    var q = 255 * v * (1 - s * f);
	    var t = 255 * v * (1 - s * (1 - f));
	    v *= 255;

	    switch (hi) {
	      case 0:
	        return [v, t, p];

	      case 1:
	        return [q, v, p];

	      case 2:
	        return [p, v, t];

	      case 3:
	        return [p, q, v];

	      case 4:
	        return [t, p, v];

	      case 5:
	        return [v, p, q];
	    }
	  };

	  convert.hsv.hsl = function (hsv) {
	    var h = hsv[0];
	    var s = hsv[1] / 100;
	    var v = hsv[2] / 100;
	    var vmin = Math.max(v, 0.01);
	    var lmin;
	    var sl;
	    var l;
	    l = (2 - s) * v;
	    lmin = (2 - s) * vmin;
	    sl = s * vmin;
	    sl /= lmin <= 1 ? lmin : 2 - lmin;
	    sl = sl || 0;
	    l /= 2;
	    return [h, sl * 100, l * 100];
	  }; // http://dev.w3.org/csswg/css-color/#hwb-to-rgb


	  convert.hwb.rgb = function (hwb) {
	    var h = hwb[0] / 360;
	    var wh = hwb[1] / 100;
	    var bl = hwb[2] / 100;
	    var ratio = wh + bl;
	    var i;
	    var v;
	    var f;
	    var n; // wh + bl cant be > 1

	    if (ratio > 1) {
	      wh /= ratio;
	      bl /= ratio;
	    }

	    i = Math.floor(6 * h);
	    v = 1 - bl;
	    f = 6 * h - i;

	    if ((i & 0x01) !== 0) {
	      f = 1 - f;
	    }

	    n = wh + f * (v - wh); // linear interpolation

	    var r;
	    var g;
	    var b;

	    switch (i) {
	      default:
	      case 6:
	      case 0:
	        r = v;
	        g = n;
	        b = wh;
	        break;

	      case 1:
	        r = n;
	        g = v;
	        b = wh;
	        break;

	      case 2:
	        r = wh;
	        g = v;
	        b = n;
	        break;

	      case 3:
	        r = wh;
	        g = n;
	        b = v;
	        break;

	      case 4:
	        r = n;
	        g = wh;
	        b = v;
	        break;

	      case 5:
	        r = v;
	        g = wh;
	        b = n;
	        break;
	    }

	    return [r * 255, g * 255, b * 255];
	  };

	  convert.cmyk.rgb = function (cmyk) {
	    var c = cmyk[0] / 100;
	    var m = cmyk[1] / 100;
	    var y = cmyk[2] / 100;
	    var k = cmyk[3] / 100;
	    var r;
	    var g;
	    var b;
	    r = 1 - Math.min(1, c * (1 - k) + k);
	    g = 1 - Math.min(1, m * (1 - k) + k);
	    b = 1 - Math.min(1, y * (1 - k) + k);
	    return [r * 255, g * 255, b * 255];
	  };

	  convert.xyz.rgb = function (xyz) {
	    var x = xyz[0] / 100;
	    var y = xyz[1] / 100;
	    var z = xyz[2] / 100;
	    var r;
	    var g;
	    var b;
	    r = x * 3.2406 + y * -1.5372 + z * -0.4986;
	    g = x * -0.9689 + y * 1.8758 + z * 0.0415;
	    b = x * 0.0557 + y * -0.2040 + z * 1.0570; // assume sRGB

	    r = r > 0.0031308 ? 1.055 * Math.pow(r, 1.0 / 2.4) - 0.055 : r * 12.92;
	    g = g > 0.0031308 ? 1.055 * Math.pow(g, 1.0 / 2.4) - 0.055 : g * 12.92;
	    b = b > 0.0031308 ? 1.055 * Math.pow(b, 1.0 / 2.4) - 0.055 : b * 12.92;
	    r = Math.min(Math.max(0, r), 1);
	    g = Math.min(Math.max(0, g), 1);
	    b = Math.min(Math.max(0, b), 1);
	    return [r * 255, g * 255, b * 255];
	  };

	  convert.xyz.lab = function (xyz) {
	    var x = xyz[0];
	    var y = xyz[1];
	    var z = xyz[2];
	    var l;
	    var a;
	    var b;
	    x /= 95.047;
	    y /= 100;
	    z /= 108.883;
	    x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
	    y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
	    z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
	    l = 116 * y - 16;
	    a = 500 * (x - y);
	    b = 200 * (y - z);
	    return [l, a, b];
	  };

	  convert.lab.xyz = function (lab) {
	    var l = lab[0];
	    var a = lab[1];
	    var b = lab[2];
	    var x;
	    var y;
	    var z;
	    y = (l + 16) / 116;
	    x = a / 500 + y;
	    z = y - b / 200;
	    var y2 = Math.pow(y, 3);
	    var x2 = Math.pow(x, 3);
	    var z2 = Math.pow(z, 3);
	    y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
	    x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
	    z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;
	    x *= 95.047;
	    y *= 100;
	    z *= 108.883;
	    return [x, y, z];
	  };

	  convert.lab.lch = function (lab) {
	    var l = lab[0];
	    var a = lab[1];
	    var b = lab[2];
	    var hr;
	    var h;
	    var c;
	    hr = Math.atan2(b, a);
	    h = hr * 360 / 2 / Math.PI;

	    if (h < 0) {
	      h += 360;
	    }

	    c = Math.sqrt(a * a + b * b);
	    return [l, c, h];
	  };

	  convert.lch.lab = function (lch) {
	    var l = lch[0];
	    var c = lch[1];
	    var h = lch[2];
	    var a;
	    var b;
	    var hr;
	    hr = h / 360 * 2 * Math.PI;
	    a = c * Math.cos(hr);
	    b = c * Math.sin(hr);
	    return [l, a, b];
	  };

	  convert.rgb.ansi16 = function (args) {
	    var r = args[0];
	    var g = args[1];
	    var b = args[2];
	    var value = 1 in arguments ? arguments[1] : convert.rgb.hsv(args)[2]; // hsv -> ansi16 optimization

	    value = Math.round(value / 50);

	    if (value === 0) {
	      return 30;
	    }

	    var ansi = 30 + (Math.round(b / 255) << 2 | Math.round(g / 255) << 1 | Math.round(r / 255));

	    if (value === 2) {
	      ansi += 60;
	    }

	    return ansi;
	  };

	  convert.hsv.ansi16 = function (args) {
	    // optimization here; we already know the value and don't need to get
	    // it converted for us.
	    return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
	  };

	  convert.rgb.ansi256 = function (args) {
	    var r = args[0];
	    var g = args[1];
	    var b = args[2]; // we use the extended greyscale palette here, with the exception of
	    // black and white. normal palette only has 4 greyscale shades.

	    if (r === g && g === b) {
	      if (r < 8) {
	        return 16;
	      }

	      if (r > 248) {
	        return 231;
	      }

	      return Math.round((r - 8) / 247 * 24) + 232;
	    }

	    var ansi = 16 + 36 * Math.round(r / 255 * 5) + 6 * Math.round(g / 255 * 5) + Math.round(b / 255 * 5);
	    return ansi;
	  };

	  convert.ansi16.rgb = function (args) {
	    var color = args % 10; // handle greyscale

	    if (color === 0 || color === 7) {
	      if (args > 50) {
	        color += 3.5;
	      }

	      color = color / 10.5 * 255;
	      return [color, color, color];
	    }

	    var mult = (~~(args > 50) + 1) * 0.5;
	    var r = (color & 1) * mult * 255;
	    var g = (color >> 1 & 1) * mult * 255;
	    var b = (color >> 2 & 1) * mult * 255;
	    return [r, g, b];
	  };

	  convert.ansi256.rgb = function (args) {
	    // handle greyscale
	    if (args >= 232) {
	      var c = (args - 232) * 10 + 8;
	      return [c, c, c];
	    }

	    args -= 16;
	    var rem;
	    var r = Math.floor(args / 36) / 5 * 255;
	    var g = Math.floor((rem = args % 36) / 6) / 5 * 255;
	    var b = rem % 6 / 5 * 255;
	    return [r, g, b];
	  };

	  convert.rgb.hex = function (args) {
	    var integer = ((Math.round(args[0]) & 0xFF) << 16) + ((Math.round(args[1]) & 0xFF) << 8) + (Math.round(args[2]) & 0xFF);
	    var string = integer.toString(16).toUpperCase();
	    return '000000'.substring(string.length) + string;
	  };

	  convert.hex.rgb = function (args) {
	    var match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);

	    if (!match) {
	      return [0, 0, 0];
	    }

	    var colorString = match[0];

	    if (match[0].length === 3) {
	      colorString = colorString.split('').map(function (char) {
	        return char + char;
	      }).join('');
	    }

	    var integer = parseInt(colorString, 16);
	    var r = integer >> 16 & 0xFF;
	    var g = integer >> 8 & 0xFF;
	    var b = integer & 0xFF;
	    return [r, g, b];
	  };

	  convert.rgb.hcg = function (rgb) {
	    var r = rgb[0] / 255;
	    var g = rgb[1] / 255;
	    var b = rgb[2] / 255;
	    var max = Math.max(Math.max(r, g), b);
	    var min = Math.min(Math.min(r, g), b);
	    var chroma = max - min;
	    var grayscale;
	    var hue;

	    if (chroma < 1) {
	      grayscale = min / (1 - chroma);
	    } else {
	      grayscale = 0;
	    }

	    if (chroma <= 0) {
	      hue = 0;
	    } else if (max === r) {
	      hue = (g - b) / chroma % 6;
	    } else if (max === g) {
	      hue = 2 + (b - r) / chroma;
	    } else {
	      hue = 4 + (r - g) / chroma + 4;
	    }

	    hue /= 6;
	    hue %= 1;
	    return [hue * 360, chroma * 100, grayscale * 100];
	  };

	  convert.hsl.hcg = function (hsl) {
	    var s = hsl[1] / 100;
	    var l = hsl[2] / 100;
	    var c = 1;
	    var f = 0;

	    if (l < 0.5) {
	      c = 2.0 * s * l;
	    } else {
	      c = 2.0 * s * (1.0 - l);
	    }

	    if (c < 1.0) {
	      f = (l - 0.5 * c) / (1.0 - c);
	    }

	    return [hsl[0], c * 100, f * 100];
	  };

	  convert.hsv.hcg = function (hsv) {
	    var s = hsv[1] / 100;
	    var v = hsv[2] / 100;
	    var c = s * v;
	    var f = 0;

	    if (c < 1.0) {
	      f = (v - c) / (1 - c);
	    }

	    return [hsv[0], c * 100, f * 100];
	  };

	  convert.hcg.rgb = function (hcg) {
	    var h = hcg[0] / 360;
	    var c = hcg[1] / 100;
	    var g = hcg[2] / 100;

	    if (c === 0.0) {
	      return [g * 255, g * 255, g * 255];
	    }

	    var pure = [0, 0, 0];
	    var hi = h % 1 * 6;
	    var v = hi % 1;
	    var w = 1 - v;
	    var mg = 0;

	    switch (Math.floor(hi)) {
	      case 0:
	        pure[0] = 1;
	        pure[1] = v;
	        pure[2] = 0;
	        break;

	      case 1:
	        pure[0] = w;
	        pure[1] = 1;
	        pure[2] = 0;
	        break;

	      case 2:
	        pure[0] = 0;
	        pure[1] = 1;
	        pure[2] = v;
	        break;

	      case 3:
	        pure[0] = 0;
	        pure[1] = w;
	        pure[2] = 1;
	        break;

	      case 4:
	        pure[0] = v;
	        pure[1] = 0;
	        pure[2] = 1;
	        break;

	      default:
	        pure[0] = 1;
	        pure[1] = 0;
	        pure[2] = w;
	    }

	    mg = (1.0 - c) * g;
	    return [(c * pure[0] + mg) * 255, (c * pure[1] + mg) * 255, (c * pure[2] + mg) * 255];
	  };

	  convert.hcg.hsv = function (hcg) {
	    var c = hcg[1] / 100;
	    var g = hcg[2] / 100;
	    var v = c + g * (1.0 - c);
	    var f = 0;

	    if (v > 0.0) {
	      f = c / v;
	    }

	    return [hcg[0], f * 100, v * 100];
	  };

	  convert.hcg.hsl = function (hcg) {
	    var c = hcg[1] / 100;
	    var g = hcg[2] / 100;
	    var l = g * (1.0 - c) + 0.5 * c;
	    var s = 0;

	    if (l > 0.0 && l < 0.5) {
	      s = c / (2 * l);
	    } else if (l >= 0.5 && l < 1.0) {
	      s = c / (2 * (1 - l));
	    }

	    return [hcg[0], s * 100, l * 100];
	  };

	  convert.hcg.hwb = function (hcg) {
	    var c = hcg[1] / 100;
	    var g = hcg[2] / 100;
	    var v = c + g * (1.0 - c);
	    return [hcg[0], (v - c) * 100, (1 - v) * 100];
	  };

	  convert.hwb.hcg = function (hwb) {
	    var w = hwb[1] / 100;
	    var b = hwb[2] / 100;
	    var v = 1 - b;
	    var c = v - w;
	    var g = 0;

	    if (c < 1) {
	      g = (v - c) / (1 - c);
	    }

	    return [hwb[0], c * 100, g * 100];
	  };

	  convert.apple.rgb = function (apple) {
	    return [apple[0] / 65535 * 255, apple[1] / 65535 * 255, apple[2] / 65535 * 255];
	  };

	  convert.rgb.apple = function (rgb) {
	    return [rgb[0] / 255 * 65535, rgb[1] / 255 * 65535, rgb[2] / 255 * 65535];
	  };

	  convert.gray.rgb = function (args) {
	    return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
	  };

	  convert.gray.hsl = convert.gray.hsv = function (args) {
	    return [0, 0, args[0]];
	  };

	  convert.gray.hwb = function (gray) {
	    return [0, 100, gray[0]];
	  };

	  convert.gray.cmyk = function (gray) {
	    return [0, 0, 0, gray[0]];
	  };

	  convert.gray.lab = function (gray) {
	    return [gray[0], 0, 0];
	  };

	  convert.gray.hex = function (gray) {
	    var val = Math.round(gray[0] / 100 * 255) & 0xFF;
	    var integer = (val << 16) + (val << 8) + val;
	    var string = integer.toString(16).toUpperCase();
	    return '000000'.substring(string.length) + string;
	  };

	  convert.rgb.gray = function (rgb) {
	    var val = (rgb[0] + rgb[1] + rgb[2]) / 3;
	    return [val / 255 * 100];
	  };
	});

	/*
		this function routes a model to all other models.

		all functions that are routed have a property `.conversion` attached
		to the returned synthetic function. This property is an array
		of strings, each with the steps in between the 'from' and 'to'
		color models (inclusive).

		conversions that are not possible simply are not included.
	*/

	function buildGraph() {
	  var graph = {}; // https://jsperf.com/object-keys-vs-for-in-with-closure/3

	  var models = Object.keys(conversions);

	  for (var len = models.length, i = 0; i < len; i++) {
	    graph[models[i]] = {
	      // http://jsperf.com/1-vs-infinity
	      // micro-opt, but this is simple.
	      distance: -1,
	      parent: null
	    };
	  }

	  return graph;
	} // https://en.wikipedia.org/wiki/Breadth-first_search


	function deriveBFS(fromModel) {
	  var graph = buildGraph();
	  var queue = [fromModel]; // unshift -> queue -> pop

	  graph[fromModel].distance = 0;

	  while (queue.length) {
	    var current = queue.pop();
	    var adjacents = Object.keys(conversions[current]);

	    for (var len = adjacents.length, i = 0; i < len; i++) {
	      var adjacent = adjacents[i];
	      var node = graph[adjacent];

	      if (node.distance === -1) {
	        node.distance = graph[current].distance + 1;
	        node.parent = current;
	        queue.unshift(adjacent);
	      }
	    }
	  }

	  return graph;
	}

	function link(from, to) {
	  return function (args) {
	    return to(from(args));
	  };
	}

	function wrapConversion(toModel, graph) {
	  var path = [graph[toModel].parent, toModel];
	  var fn = conversions[graph[toModel].parent][toModel];
	  var cur = graph[toModel].parent;

	  while (graph[cur].parent) {
	    path.unshift(graph[cur].parent);
	    fn = link(conversions[graph[cur].parent][cur], fn);
	    cur = graph[cur].parent;
	  }

	  fn.conversion = path;
	  return fn;
	}

	var route = function (fromModel) {
	  var graph = deriveBFS(fromModel);
	  var conversion = {};
	  var models = Object.keys(graph);

	  for (var len = models.length, i = 0; i < len; i++) {
	    var toModel = models[i];
	    var node = graph[toModel];

	    if (node.parent === null) {
	      // no possible conversion, or this node is the source model.
	      continue;
	    }

	    conversion[toModel] = wrapConversion(toModel, graph);
	  }

	  return conversion;
	};

	var convert = {};
	var models = Object.keys(conversions);

	function wrapRaw(fn) {
	  var wrappedFn = function (args) {
	    if (args === undefined || args === null) {
	      return args;
	    }

	    if (arguments.length > 1) {
	      args = Array.prototype.slice.call(arguments);
	    }

	    return fn(args);
	  }; // preserve .conversion property if there is one


	  if ('conversion' in fn) {
	    wrappedFn.conversion = fn.conversion;
	  }

	  return wrappedFn;
	}

	function wrapRounded(fn) {
	  var wrappedFn = function (args) {
	    if (args === undefined || args === null) {
	      return args;
	    }

	    if (arguments.length > 1) {
	      args = Array.prototype.slice.call(arguments);
	    }

	    var result = fn(args); // we're assuming the result is an array here.
	    // see notice in conversions.js; don't use box types
	    // in conversion functions.

	    if (typeof result === 'object') {
	      for (var len = result.length, i = 0; i < len; i++) {
	        result[i] = Math.round(result[i]);
	      }
	    }

	    return result;
	  }; // preserve .conversion property if there is one


	  if ('conversion' in fn) {
	    wrappedFn.conversion = fn.conversion;
	  }

	  return wrappedFn;
	}

	models.forEach(function (fromModel) {
	  convert[fromModel] = {};
	  Object.defineProperty(convert[fromModel], 'channels', {
	    value: conversions[fromModel].channels
	  });
	  Object.defineProperty(convert[fromModel], 'labels', {
	    value: conversions[fromModel].labels
	  });
	  var routes = route(fromModel);
	  var routeModels = Object.keys(routes);
	  routeModels.forEach(function (toModel) {
	    var fn = routes[toModel];
	    convert[fromModel][toModel] = wrapRounded(fn);
	    convert[fromModel][toModel].raw = wrapRaw(fn);
	  });
	});
	var colorConvert = convert;

	var _slice = [].slice;
	var skippedModels = [// to be honest, I don't really feel like keyword belongs in color convert, but eh.
	'keyword', // gray conflicts with some method names, and has its own method defined.
	'gray', // shouldn't really be in color-convert either...
	'hex'];
	var hashedModelKeys = {};
	Object.keys(colorConvert).forEach(function (model) {
	  hashedModelKeys[_slice.call(colorConvert[model].labels).sort().join('')] = model;
	});
	var limiters = {};

	function Color(obj, model) {
	  if (!(this instanceof Color)) {
	    return new Color(obj, model);
	  }

	  if (model && model in skippedModels) {
	    model = null;
	  }

	  if (model && !(model in colorConvert)) {
	    throw new Error('Unknown model: ' + model);
	  }

	  var i;
	  var channels;

	  if (obj == null) {
	    // eslint-disable-line no-eq-null,eqeqeq
	    this.model = 'rgb';
	    this.color = [0, 0, 0];
	    this.valpha = 1;
	  } else if (obj instanceof Color) {
	    this.model = obj.model;
	    this.color = obj.color.slice();
	    this.valpha = obj.valpha;
	  } else if (typeof obj === 'string') {
	    var result = colorString.get(obj);

	    if (result === null) {
	      throw new Error('Unable to parse color from string: ' + obj);
	    }

	    this.model = result.model;
	    channels = colorConvert[this.model].channels;
	    this.color = result.value.slice(0, channels);
	    this.valpha = typeof result.value[channels] === 'number' ? result.value[channels] : 1;
	  } else if (obj.length) {
	    this.model = model || 'rgb';
	    channels = colorConvert[this.model].channels;

	    var newArr = _slice.call(obj, 0, channels);

	    this.color = zeroArray(newArr, channels);
	    this.valpha = typeof obj[channels] === 'number' ? obj[channels] : 1;
	  } else if (typeof obj === 'number') {
	    // this is always RGB - can be converted later on.
	    obj &= 0xFFFFFF;
	    this.model = 'rgb';
	    this.color = [obj >> 16 & 0xFF, obj >> 8 & 0xFF, obj & 0xFF];
	    this.valpha = 1;
	  } else {
	    this.valpha = 1;
	    var keys = Object.keys(obj);

	    if ('alpha' in obj) {
	      keys.splice(keys.indexOf('alpha'), 1);
	      this.valpha = typeof obj.alpha === 'number' ? obj.alpha : 0;
	    }

	    var hashedKeys = keys.sort().join('');

	    if (!(hashedKeys in hashedModelKeys)) {
	      throw new Error('Unable to parse color from object: ' + JSON.stringify(obj));
	    }

	    this.model = hashedModelKeys[hashedKeys];
	    var labels = colorConvert[this.model].labels;
	    var color = [];

	    for (i = 0; i < labels.length; i++) {
	      color.push(obj[labels[i]]);
	    }

	    this.color = zeroArray(color);
	  } // perform limitations (clamping, etc.)


	  if (limiters[this.model]) {
	    channels = colorConvert[this.model].channels;

	    for (i = 0; i < channels; i++) {
	      var limit = limiters[this.model][i];

	      if (limit) {
	        this.color[i] = limit(this.color[i]);
	      }
	    }
	  }

	  this.valpha = Math.max(0, Math.min(1, this.valpha));

	  if (Object.freeze) {
	    Object.freeze(this);
	  }
	}

	Color.prototype = {
	  toString: function () {
	    return this.string();
	  },
	  toJSON: function () {
	    return this[this.model]();
	  },
	  string: function (places) {
	    var self = this.model in colorString.to ? this : this.rgb();
	    self = self.round(typeof places === 'number' ? places : 1);
	    var args = self.valpha === 1 ? self.color : self.color.concat(this.valpha);
	    return colorString.to[self.model](args);
	  },
	  percentString: function (places) {
	    var self = this.rgb().round(typeof places === 'number' ? places : 1);
	    var args = self.valpha === 1 ? self.color : self.color.concat(this.valpha);
	    return colorString.to.rgb.percent(args);
	  },
	  array: function () {
	    return this.valpha === 1 ? this.color.slice() : this.color.concat(this.valpha);
	  },
	  object: function () {
	    var result = {};
	    var channels = colorConvert[this.model].channels;
	    var labels = colorConvert[this.model].labels;

	    for (var i = 0; i < channels; i++) {
	      result[labels[i]] = this.color[i];
	    }

	    if (this.valpha !== 1) {
	      result.alpha = this.valpha;
	    }

	    return result;
	  },
	  unitArray: function () {
	    var rgb = this.rgb().color;
	    rgb[0] /= 255;
	    rgb[1] /= 255;
	    rgb[2] /= 255;

	    if (this.valpha !== 1) {
	      rgb.push(this.valpha);
	    }

	    return rgb;
	  },
	  unitObject: function () {
	    var rgb = this.rgb().object();
	    rgb.r /= 255;
	    rgb.g /= 255;
	    rgb.b /= 255;

	    if (this.valpha !== 1) {
	      rgb.alpha = this.valpha;
	    }

	    return rgb;
	  },
	  round: function (places) {
	    places = Math.max(places || 0, 0);
	    return new Color(this.color.map(roundToPlace(places)).concat(this.valpha), this.model);
	  },
	  alpha: function (val) {
	    if (arguments.length) {
	      return new Color(this.color.concat(Math.max(0, Math.min(1, val))), this.model);
	    }

	    return this.valpha;
	  },
	  // rgb
	  red: getset('rgb', 0, maxfn(255)),
	  green: getset('rgb', 1, maxfn(255)),
	  blue: getset('rgb', 2, maxfn(255)),
	  hue: getset(['hsl', 'hsv', 'hsl', 'hwb', 'hcg'], 0, function (val) {
	    return (val % 360 + 360) % 360;
	  }),
	  // eslint-disable-line brace-style
	  saturationl: getset('hsl', 1, maxfn(100)),
	  lightness: getset('hsl', 2, maxfn(100)),
	  saturationv: getset('hsv', 1, maxfn(100)),
	  value: getset('hsv', 2, maxfn(100)),
	  chroma: getset('hcg', 1, maxfn(100)),
	  gray: getset('hcg', 2, maxfn(100)),
	  white: getset('hwb', 1, maxfn(100)),
	  wblack: getset('hwb', 2, maxfn(100)),
	  cyan: getset('cmyk', 0, maxfn(100)),
	  magenta: getset('cmyk', 1, maxfn(100)),
	  yellow: getset('cmyk', 2, maxfn(100)),
	  black: getset('cmyk', 3, maxfn(100)),
	  x: getset('xyz', 0, maxfn(100)),
	  y: getset('xyz', 1, maxfn(100)),
	  z: getset('xyz', 2, maxfn(100)),
	  l: getset('lab', 0, maxfn(100)),
	  a: getset('lab', 1),
	  b: getset('lab', 2),
	  keyword: function (val) {
	    if (arguments.length) {
	      return new Color(val);
	    }

	    return colorConvert[this.model].keyword(this.color);
	  },
	  hex: function (val) {
	    if (arguments.length) {
	      return new Color(val);
	    }

	    return colorString.to.hex(this.rgb().round().color);
	  },
	  rgbNumber: function () {
	    var rgb = this.rgb().color;
	    return (rgb[0] & 0xFF) << 16 | (rgb[1] & 0xFF) << 8 | rgb[2] & 0xFF;
	  },
	  luminosity: function () {
	    // http://www.w3.org/TR/WCAG20/#relativeluminancedef
	    var rgb = this.rgb().color;
	    var lum = [];

	    for (var i = 0; i < rgb.length; i++) {
	      var chan = rgb[i] / 255;
	      lum[i] = chan <= 0.03928 ? chan / 12.92 : Math.pow((chan + 0.055) / 1.055, 2.4);
	    }

	    return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
	  },
	  contrast: function (color2) {
	    // http://www.w3.org/TR/WCAG20/#contrast-ratiodef
	    var lum1 = this.luminosity();
	    var lum2 = color2.luminosity();

	    if (lum1 > lum2) {
	      return (lum1 + 0.05) / (lum2 + 0.05);
	    }

	    return (lum2 + 0.05) / (lum1 + 0.05);
	  },
	  level: function (color2) {
	    var contrastRatio = this.contrast(color2);

	    if (contrastRatio >= 7.1) {
	      return 'AAA';
	    }

	    return contrastRatio >= 4.5 ? 'AA' : '';
	  },
	  isDark: function () {
	    // YIQ equation from http://24ways.org/2010/calculating-color-contrast
	    var rgb = this.rgb().color;
	    var yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
	    return yiq < 128;
	  },
	  isLight: function () {
	    return !this.isDark();
	  },
	  negate: function () {
	    var rgb = this.rgb();

	    for (var i = 0; i < 3; i++) {
	      rgb.color[i] = 255 - rgb.color[i];
	    }

	    return rgb;
	  },
	  lighten: function (ratio) {
	    var hsl = this.hsl();
	    hsl.color[2] += hsl.color[2] * ratio;
	    return hsl;
	  },
	  darken: function (ratio) {
	    var hsl = this.hsl();
	    hsl.color[2] -= hsl.color[2] * ratio;
	    return hsl;
	  },
	  saturate: function (ratio) {
	    var hsl = this.hsl();
	    hsl.color[1] += hsl.color[1] * ratio;
	    return hsl;
	  },
	  desaturate: function (ratio) {
	    var hsl = this.hsl();
	    hsl.color[1] -= hsl.color[1] * ratio;
	    return hsl;
	  },
	  whiten: function (ratio) {
	    var hwb = this.hwb();
	    hwb.color[1] += hwb.color[1] * ratio;
	    return hwb;
	  },
	  blacken: function (ratio) {
	    var hwb = this.hwb();
	    hwb.color[2] += hwb.color[2] * ratio;
	    return hwb;
	  },
	  grayscale: function () {
	    // http://en.wikipedia.org/wiki/Grayscale#Converting_color_to_grayscale
	    var rgb = this.rgb().color;
	    var val = rgb[0] * 0.3 + rgb[1] * 0.59 + rgb[2] * 0.11;
	    return Color.rgb(val, val, val);
	  },
	  fade: function (ratio) {
	    return this.alpha(this.valpha - this.valpha * ratio);
	  },
	  opaquer: function (ratio) {
	    return this.alpha(this.valpha + this.valpha * ratio);
	  },
	  rotate: function (degrees) {
	    var hsl = this.hsl();
	    var hue = hsl.color[0];
	    hue = (hue + degrees) % 360;
	    hue = hue < 0 ? 360 + hue : hue;
	    hsl.color[0] = hue;
	    return hsl;
	  },
	  mix: function (mixinColor, weight) {
	    // ported from sass implementation in C
	    // https://github.com/sass/libsass/blob/0e6b4a2850092356aa3ece07c6b249f0221caced/functions.cpp#L209
	    if (!mixinColor || !mixinColor.rgb) {
	      throw new Error('Argument to "mix" was not a Color instance, but rather an instance of ' + typeof mixinColor);
	    }

	    var color1 = mixinColor.rgb();
	    var color2 = this.rgb();
	    var p = weight === undefined ? 0.5 : weight;
	    var w = 2 * p - 1;
	    var a = color1.alpha() - color2.alpha();
	    var w1 = ((w * a === -1 ? w : (w + a) / (1 + w * a)) + 1) / 2.0;
	    var w2 = 1 - w1;
	    return Color.rgb(w1 * color1.red() + w2 * color2.red(), w1 * color1.green() + w2 * color2.green(), w1 * color1.blue() + w2 * color2.blue(), color1.alpha() * p + color2.alpha() * (1 - p));
	  }
	}; // model conversion methods and static constructors

	Object.keys(colorConvert).forEach(function (model) {
	  if (skippedModels.indexOf(model) !== -1) {
	    return;
	  }

	  var channels = colorConvert[model].channels; // conversion methods

	  Color.prototype[model] = function () {
	    if (this.model === model) {
	      return new Color(this);
	    }

	    if (arguments.length) {
	      return new Color(arguments, model);
	    }

	    var newAlpha = typeof arguments[channels] === 'number' ? channels : this.valpha;
	    return new Color(assertArray(colorConvert[this.model][model].raw(this.color)).concat(newAlpha), model);
	  }; // 'static' construction methods


	  Color[model] = function (color) {
	    if (typeof color === 'number') {
	      color = zeroArray(_slice.call(arguments), channels);
	    }

	    return new Color(color, model);
	  };
	});

	function roundTo(num, places) {
	  return Number(num.toFixed(places));
	}

	function roundToPlace(places) {
	  return function (num) {
	    return roundTo(num, places);
	  };
	}

	function getset(model, channel, modifier) {
	  model = Array.isArray(model) ? model : [model];
	  model.forEach(function (m) {
	    (limiters[m] || (limiters[m] = []))[channel] = modifier;
	  });
	  model = model[0];
	  return function (val) {
	    var result;

	    if (arguments.length) {
	      if (modifier) {
	        val = modifier(val);
	      }

	      result = this[model]();
	      result.color[channel] = val;
	      return result;
	    }

	    result = this[model]().color[channel];

	    if (modifier) {
	      result = modifier(result);
	    }

	    return result;
	  };
	}

	function maxfn(max) {
	  return function (v) {
	    return Math.max(0, Math.min(max, v));
	  };
	}

	function assertArray(val) {
	  return Array.isArray(val) ? val : [val];
	}

	function zeroArray(arr, length) {
	  for (var i = 0; i < length; i++) {
	    if (typeof arr[i] !== 'number') {
	      arr[i] = 0;
	    }
	  }

	  return arr;
	}

	var color$1 = Color;

	/**
	 * @classdesc
	 *
	 * 自定义图层基类，继承自 CommonLayer </br>
	 * 实现了一些图层功能实现需要的公用接口和方法，包括pick功能，颜色转换，坐标转换等 <br/>
	 * 具体是否支持相关功能要看继承的图层是否实现了相关参数的初始化 <br/>
	 *
	 * @extends CommonLayer
	 *
	 * @param {Object} options
	 * @param {Boolean=} [options.repeat=false] 是否添加重复的坐标，为了实现小缩放下连续的地图效果
	 * @param {Boolean=} [options.enablePicked=false] 是否开启拾取
	 * @param {Boolean=} [options.autoSelect=false] 是否开启自动拾取
	 * @param {Number=} [options.selectedIndex=-1] 当前选中元素的索引
	 * @param {String=} [options.selectedColor='rgba(20, 20, 200, 1.0)'] 选中后的颜色
	 * @param {Function=} options.onClick 点击事件回调函数，需要开启 enablePicked
	 * @param {Function=} options.onMousemove 鼠标移动事件回调函数，需要开启 enablePicked
	 */

	var Layer = /*#__PURE__*/function (_CommonLayer) {
	  _inherits(Layer, _CommonLayer);

	  var _super = _createSuper(Layer);

	  function Layer(options) {
	    var _this;

	    _classCallCheck(this, Layer);

	    _this = _super.call(this, options);
	    _this.pickedColor = [-1, -1, -1];
	    return _this;
	  } // 获取通用的配置（pick相关）


	  _createClass(Layer, [{
	    key: "getCommonDefaultOptions",
	    value: function getCommonDefaultOptions() {
	      return {
	        repeat: false,
	        enablePicked: false,
	        autoSelect: false,
	        selectedIndex: -1,
	        selectedColor: "rgba(20, 20, 200, 1.0)"
	      };
	    } // 通用初始化

	  }, {
	    key: "commonInitialize",
	    value: function commonInitialize(gl) {
	      this.gl = gl;
	    } // 公共buffer

	  }, {
	    key: "getCommonBuffers",
	    value: function getCommonBuffers(options) {
	      var commonBuffers = []; // 初始化pick相关信息

	      if (this.getOptions().enablePicked) {
	        commonBuffers.push(new VertexBuffer({
	          gl: this.gl,
	          data: options.pickData,
	          attributes: [{
	            name: "aPickColor",
	            size: 3
	          }]
	        }));
	      }

	      return commonBuffers;
	    } // pick相关顶点属性

	  }, {
	    key: "getCommonUniforms",
	    value: function getCommonUniforms(transferOptions) {
	      var isPickRender = transferOptions.isPickRender;
	      var options = this.getOptions();
	      var uniforms = {};

	      if (options.enablePicked) {
	        var pickedColor = options.autoSelect ? this.pickedColor : this.indexToRgb(options.selectedIndex >= 0 ? options.selectedIndex : -1);
	        uniforms = Object.assign(uniforms, {
	          uEnablePicked: options.enablePicked,
	          uIsPickRender: !!isPickRender,
	          uPickedColor: pickedColor.map(function (a) {
	            return a / 255;
	          }),
	          uSelectedColor: this.normizedColor(options.selectedColor)
	        });
	      }

	      return uniforms;
	    } // pick接口

	  }, {
	    key: "pick",
	    value: function pick(x, y) {
	      var gl = this.gl;
	      this.webglLayer.saveFramebuffer();
	      this.webglLayer.bindFramebuffer(this.webglLayer.pickFBO);
	      this.webglLayer.clear(); // 选择渲染

	      this.render(Object.assign({
	        isPickRender: true
	      }, translateTransferOptions(this.webglLayer.transferOptions, this))); // 颜色

	      var color = new Uint8Array(4); // 读取指定区域颜色

	      gl.readPixels(x * window.devicePixelRatio, gl.canvas.height - y * window.devicePixelRatio, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, color); // 颜色转为索引

	      var index = this.rgbToIndex(color);
	      this.pickedColor = [color[0], color[1], color[2]];
	      this.webglLayer.restoreFramebuffer();
	      return {
	        dataIndex: index,
	        dataItem: this.getData()[index]
	      };
	    }
	  }, {
	    key: "setGLState",
	    value: function setGLState(state) {
	      this.webglLayer.stateManager.setState(state);
	    }
	  }, {
	    key: "getPointOffset",
	    value: function getPointOffset() {
	      if (!this.pointOffset) {
	        // 如果参数中存在 pointOffset
	        if (this.options.pointOffset) {
	          this.pointOffset = this.map.normizedPoint(this.options.pointOffset);
	        } // 否则尝试从data中获取
	        else if (this.data && this.data.length) {
	            // 取靠近中心的数据
	            var coords = this.data[Math.max(0, Math.floor(this.data.length / 2))].geometry.coordinates;

	            while (Array.isArray(coords)) {
	              if (Array.isArray(coords[0])) {
	                coords = coords[0];
	              } else {
	                break;
	              }
	            }

	            this.pointOffset = this.map.normizedPoint(coords);
	          }
	      }

	      if (this.pointOffset) {
	        this.pointOffset[2] = 0;
	        return this.pointOffset.slice();
	      } else {
	        return [0, 0, 0];
	      }
	    }
	    /* ************** 通用方法接口 ************** */
	    // 获取对象的方法

	  }, {
	    key: "getValue",
	    value: function getValue(key) {
	      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      var v = this.options[key]; // 外部方法

	      if (typeof v === "function") {
	        return v(data);
	      }

	      return v;
	    } // 格式化color方法

	  }, {
	    key: "normizedColor",
	    value: function normizedColor(color) {
	      var colorArray = Array.isArray(color) ? color : color$1(color).unitArray();

	      if (colorArray[3] === undefined) {
	        colorArray[3] = 1;
	      }

	      return colorArray;
	    }
	  }, {
	    key: "normizedPoint",
	    value: function normizedPoint(point) {
	      if (!point || isNaN(+point[0]) || isNaN(+point[1])) return [0, 0, 0];
	      var pointOffset = this.getPointOffset();
	      var nPoint = this.map.normizedPoint(point);
	      return [nPoint[0] - pointOffset[0], nPoint[1] - pointOffset[1], nPoint[2]];
	    }
	  }, {
	    key: "normizedHeight",
	    value: function normizedHeight(height) {
	      var point = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [0, 0];
	      if (!height || height <= 0) return 0;
	      return this.map.normizedPoint([point[0], point[1], height])[2];
	    } // 根据index生成color

	  }, {
	    key: "indexToRgb",
	    value: function indexToRgb(index) {
	      index++;
	      var b = Math.floor(index / 65536);
	      index -= 65536 * b;
	      var c = Math.floor(index / 256);
	      return [index - 256 * c, c, b];
	    } // 根据color获取index

	  }, {
	    key: "rgbToIndex",
	    value: function rgbToIndex(rgb) {
	      return rgb[0] + 256 * rgb[1] + 65536 * rgb[2] - 1;
	    } // repeat模式添加相关点

	  }, {
	    key: "addMultipleCoords",
	    value: function addMultipleCoords(data) {
	      if (!this.options.repeat || !this.map || !this.map.worldSize) return [data];
	      var worldSize = this.map.worldSize();

	      var getRepeat = function getRepeat(point) {
	        return [[point[0] - worldSize, point[1], point[2] || 0], [point[0] + worldSize, point[1], point[2] || 0]];
	      };

	      if (Array.isArray(data) && !Array.isArray(data[0])) {
	        var points = getRepeat(data);
	        return [data, points[0], points[1]];
	      } else {
	        var preData = [],
	            afterData = [];

	        for (var i = 0; i < data.length; i++) {
	          var _points = getRepeat(data[i]);

	          preData.push(_points[0]);
	          afterData.push(_points[1]);
	        }

	        return [data, preData, afterData];
	      }
	    }
	  }]);

	  return Layer;
	}(CommonLayer);

	var PointShapeTypes = {
	  circle: 1,
	  square: 2
	};
	/**
	 * @classdesc
	 * 
	 * 用来展示大数据量的简单点图层，继承自 Layer
	 * 可使用鼠标拾取 Pick
	 * 
	 * @extends Layer
	 * 
	 * @param {Object} options
	 * @param {String | Function=} [options.color='rgba(25, 25, 250, 1)'] 颜色
	 * @param {Number=} [options.shape='circle']
	 * 解释：展示点的形状 <br/>
	 * 可选值： <br/>
	 * circle，默认值，圆形 <br/>
	 * square，正方形 <br/>
	 * @param {Number=} [options.size=5] 点大小
	 * @param {String=} [options.blend='normal'] 点叠加模式，可选lighter
	 */

	var PointLayer = /*#__PURE__*/function (_Layer) {
	  _inherits(PointLayer, _Layer);

	  var _super = _createSuper(PointLayer);

	  function PointLayer(options) {
	    _classCallCheck(this, PointLayer);

	    return _super.call(this, options);
	  }

	  _createClass(PointLayer, [{
	    key: "getDefaultOptions",
	    value: function getDefaultOptions() {
	      return {
	        color: "rgba(25, 25, 250, 1)",
	        blend: "normal",
	        shape: "circle",
	        size: 5
	      };
	    }
	  }, {
	    key: "initialize",
	    value: function initialize(gl) {
	      // 构造program
	      this.program = new Program(gl, {
	        shaderId: "point",
	        defines: this.getOptions().enablePicked ? ["PICK"] : []
	      }, this); // 顶点相关数据

	      this.vertexBuffer = new VertexBuffer({
	        gl: gl,
	        attributes: [{
	          name: "aPos",
	          size: 3
	        }, {
	          name: "aColor",
	          size: 4
	        }, {
	          name: "aSize",
	          size: 1
	        }]
	      });
	      this.vao = new VertexArrayObject();
	    }
	  }, {
	    key: "onChanged",
	    value: function onChanged(options, dataArray) {
	      if (this.gl) {
	        var arrayData = [];

	        for (var i = 0; i < dataArray.length; i++) {
	          var data = dataArray[i];
	          var point = this.normizedPoint(data.geometry.coordinates);
	          var color = this.getValue("color", data);
	          color = this.normizedColor(color);
	          var size = +this.getValue("size", data);
	          var points = this.addMultipleCoords(point);

	          for (var j = 0; j < points.length; j++) {
	            var p = points[j];
	            arrayData.push(p[0], p[1], +(p[2] || 0));
	            arrayData.push(color[0], color[1], color[2], color[3]);
	            arrayData.push(size * window.devicePixelRatio);
	          }
	        }

	        this.vertexBuffer.setData(arrayData);
	        this.vertexBuffers = this.getCommonBuffers({
	          pickData: this.parsePickData(dataArray)
	        });
	      }
	    }
	  }, {
	    key: "parsePickData",
	    value: function parsePickData(arrayData) {
	      var options = this.getOptions(),
	          dataArray = [];

	      if (options.enablePicked) {
	        for (var i = 0; i < arrayData.length; i++) {
	          var k = this.indexToRgb(i);
	          dataArray.push(k[0] / 255, k[1] / 255, k[2] / 255);

	          if (options.repeat) {
	            dataArray.push(k[0] / 255, k[1] / 255, k[2] / 255);
	            dataArray.push(k[0] / 255, k[1] / 255, k[2] / 255);
	          }
	        }
	      }

	      return dataArray;
	    }
	  }, {
	    key: "render",
	    value: function render(transferOptions) {
	      var gl = transferOptions.gl,
	          matrix = transferOptions.matrix,
	          isPickRender = transferOptions.isPickRender;
	      if (this.vertexBuffer.numberOfVertices === 0) return;
	      this.program.use(gl);
	      this.vao.bind({
	        gl: gl,
	        program: this.program,
	        vertexBuffer: this.vertexBuffer,
	        vertexBuffers: this.vertexBuffers
	      });
	      var uniforms = Object.assign(this.getCommonUniforms(transferOptions), {
	        uShape: PointShapeTypes[this.options.shape] || 1,
	        uMatrix: matrix
	      });
	      this.program.setUniforms(uniforms);

	      if (isPickRender) {
	        gl.disable(gl.BLEND);
	      } else {
	        gl.enable(gl.BLEND);
	        gl.blendEquation(gl.FUNC_ADD);
	        var blend = this.options.blend;

	        if (blend && "lighter" === blend) {
	          gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
	        } else {
	          gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
	        }
	      }

	      gl.drawArrays(gl.POINTS, 0, this.vertexBuffer.numberOfVertices);
	    }
	  }]);

	  return PointLayer;
	}(Layer);

	var DatePrototype = Date.prototype;
	var INVALID_DATE = 'Invalid Date';
	var TO_STRING$1 = 'toString';
	var nativeDateToString = DatePrototype[TO_STRING$1];
	var getTime = DatePrototype.getTime; // `Date.prototype.toString` method
	// https://tc39.github.io/ecma262/#sec-date.prototype.tostring

	if (new Date(NaN) + '' != INVALID_DATE) {
	  redefine(DatePrototype, TO_STRING$1, function toString() {
	    var value = getTime.call(this); // eslint-disable-next-line no-self-compare

	    return value === value ? nativeDateToString.call(this) : INVALID_DATE;
	  });
	}

	/**
	 * @classdesc
	 * 
	 * 用来展波纹动画的图层，继承自 Layer
	 * 可使用鼠标拾取 Pick
	 * 
	 * @extends Layer
	 * 
	 * @param {Object} options
	 * @param {String | Function=} [options.color='rgba(25, 25, 250, 1)'] 颜色
	 * @param {Number=} [options.shape='circle']
	 * 解释：展示点的形状 <br/>
	 * 可选值： <br/>
	 * circle，默认值，圆形 <br/>
	 * square，正方形 <br/>
	 * @param {Number | Function=} [options.size=5] 点大小
	 * @param {String=} [options.blend='normal'] 点叠加模式，可选lighter
	 */

	var RippleLayer = /*#__PURE__*/function (_Layer) {
	  _inherits(RippleLayer, _Layer);

	  var _super = _createSuper(RippleLayer);

	  function RippleLayer(options) {
	    var _this;

	    _classCallCheck(this, RippleLayer);

	    _this = _super.call(this, options);
	    _this.date = new Date();
	    _this.autoUpdate = true;
	    return _this;
	  }

	  _createClass(RippleLayer, [{
	    key: "getDefaultOptions",
	    value: function getDefaultOptions() {
	      return {
	        color: [0.1, 0.1, 0.9, 1],
	        blend: "normal",
	        size: 20,
	        unit: "px",
	        duration: 2
	      };
	    }
	  }, {
	    key: "initialize",
	    value: function initialize(gl) {
	      this.program = new Program(gl, {
	        shaderId: "ripple",
	        defines: this.getOptions().enablePicked ? ["PICK"] : []
	      }, this);
	      this.vertexBuffer = new VertexBuffer({
	        gl: gl,
	        attributes: [{
	          name: "aPos",
	          size: 3
	        }, {
	          name: "aColor",
	          size: 4
	        }, {
	          name: "aSize",
	          size: 1
	        }]
	      });
	      this.vao = new VertexArrayObject();
	    }
	  }, {
	    key: "onChanged",
	    value: function onChanged(options, data) {
	      if (this.gl) {
	        var bufferData = [];

	        for (var i = 0; i < data.length; i++) {
	          var coords = data[i].geometry.coordinates;
	          coords = this.normizedPoint(coords);
	          var color = this.normizedColor(this.getValue("color", data[i]));
	          var size = +this.getValue("size", data[i]);
	          bufferData.push(coords[0], coords[1], coords[2]);
	          bufferData.push(color[0], color[1], color[2], color[3]);

	          if (options.unit === "px") {
	            bufferData.push(size * window.devicePixelRatio);
	          } else {
	            bufferData.push(this.normizedHeight(size, coords));
	          }
	        }

	        this.vertexBuffer.setData(bufferData);
	        this.vertexBuffers = this.getCommonBuffers({
	          pickData: this.parsePickData(data)
	        });
	      }
	    }
	  }, {
	    key: "parsePickData",
	    value: function parsePickData(data) {
	      var options = this.getOptions(),
	          pickData = [];

	      if (options.enablePicked) {
	        for (var g = 0; g < data.length; g++) {
	          var h = this.indexToRgb(g);
	          pickData.push(h[0] / 255, h[1] / 255, h[2] / 255);
	        }
	      }

	      return pickData;
	    }
	  }, {
	    key: "render",
	    value: function render(transferOptions) {
	      var gl = transferOptions.gl,
	          matrix = transferOptions.matrix,
	          isPickRender = transferOptions.isPickRender;
	      if (this.vertexBuffer.numberOfVertices === 0) return;
	      var program = this.program;
	      program.use(gl);
	      this.vao.bind({
	        gl: gl,
	        program: program,
	        vertexBuffer: this.vertexBuffer,
	        vertexBuffers: this.vertexBuffers
	      });
	      var uniforms = this.getCommonUniforms(transferOptions);
	      uniforms = Object.assign(uniforms, {
	        zoomUnits: "px" === this.options.unit ? 1 : this.map.getZoomUnits(),
	        uTime: (new Date() - this.date) / 1e3,
	        duration: this.options.duration,
	        uMatrix: matrix
	      });
	      program.setUniforms(uniforms);

	      if (isPickRender) {
	        gl.disable(gl.BLEND);
	      } else {
	        gl.enable(gl.BLEND);
	        gl.blendEquation(gl.FUNC_ADD);
	        "lighter" === this.options.blend ? gl.blendFunc(gl.SRC_ALPHA, gl.ONE) : gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
	      }

	      gl.drawArrays(gl.POINTS, 0, this.vertexBuffer.numberOfVertices);
	    }
	  }]);

	  return RippleLayer;
	}(Layer);

	/**
	 * @classdesc
	 *
	 * 圆形扩散效果，继承自 Layer，该图层支持作为后处理灯光效果影响 ShapeLayer
	 * 
	 * @extends Layer
	 *
	 * @param {Object} options
	 * @param {String | Function=} [options.color='rgba(25, 25, 250, 1)'] 颜色
	 * @param {Number | Function=} [options.size=100] 内半径最大值
	 * @param {Number | Function=} [options.width=400] 圆环外半径
	 * @param {Number | Function=} [options.segs=90] 圆环点数，数值越大越精细，但是性能消耗也越大
	 * @param {Number=} [options.duration=2] 动画效果周期
	 */

	var GroundRippleLayer = /*#__PURE__*/function (_Layer) {
	  _inherits(GroundRippleLayer, _Layer);

	  var _super = _createSuper(GroundRippleLayer);

	  function GroundRippleLayer(options) {
	    var _this;

	    _classCallCheck(this, GroundRippleLayer);

	    _this = _super.call(this, options); // 表示该图层是个effect图层

	    _this.effectType = "NUM_GROUND_RIPPLES";
	    _this.effectUniformName = "groundRipples";
	    _this.group = [];
	    _this.percent = 0;
	    _this.date = new Date();
	    _this.autoUpdate = true;
	    return _this;
	  }

	  _createClass(GroundRippleLayer, [{
	    key: "getDefaultOptions",
	    value: function getDefaultOptions() {
	      return {
	        color: "rgba(25, 25, 250, 1)",
	        size: 1000,
	        segs: 90,
	        duration: 2,
	        width: 400
	      };
	    }
	  }, {
	    key: "initialize",
	    value: function initialize(gl) {
	      this.program = new Program(gl, {
	        shaderId: "ground_ripple"
	      }, this);
	      this.vertexBuffer = new VertexBuffer({
	        gl: gl,
	        dynamicDraw: true,
	        attributes: [{
	          name: "aPos",
	          size: 3
	        }]
	      });
	      this.indexBuffer = new IndexBuffer({
	        gl: gl,
	        dynamicDraw: true
	      });
	      this.vao = new VertexArrayObject();
	    }
	  }, {
	    key: "onChanged",
	    value: function onChanged(options, dataArray) {
	      var gl = this.gl;
	      this.group = [];

	      if (gl) {
	        for (var i = 0; i < dataArray.length; i++) {
	          var data = dataArray[i]; // 尺寸 和 颜色

	          var segs = this.getValue("segs", data),
	              size = +this.getValue("size", data),
	              width = +this.getValue("width", data),
	              color = this.normizedColor(this.getValue("color", data)); // 每份儿的角度

	          var perSegAngle = 360 / segs;
	          var bufferData = [],
	              indexData = [];
	          var coord = this.normizedPoint(data.geometry.coordinates); // 内半径 和 环半径

	          var _size = this.normizedHeight(size, data.geometry.coordinates);

	          var _width = this.normizedHeight(width, data.geometry.coordinates); // 中心点


	          bufferData.push(coord[0], coord[1], coord[2]); // 周边点

	          for (var v = 1, angle = 0; v <= segs; v++, angle += perSegAngle) {
	            // point
	            var x = Math.cos(Math.PI / 180 * angle) * (_size + _width);

	            var y = Math.sin(Math.PI / 180 * angle) * (_size + _width);

	            bufferData.push(coord[0] + x, coord[1] + y, coord[2]); // index

	            v === segs ? indexData.push(0, 0 + v, 1) : indexData.push(0, 0 + v, 0 + v + 1);
	          } // 存入group


	          this.group[i] = {
	            indexData: indexData,
	            bufferData: bufferData,
	            uniforms: {
	              u_ripple: {
	                center: coord,
	                radius: _size,
	                width: _width,
	                color: color
	              }
	            }
	          };
	        }
	      }
	    }
	  }, {
	    key: "render",
	    value: function render(transferOptions) {
	      var gl = transferOptions.gl,
	          matrix = transferOptions.matrix;
	      if (this.group.length === 0) return;
	      var program = this.program;
	      program.use(gl); // time uniforms

	      var time = (new Date() - this.date) / 1e3,
	          duration = this.options.duration;
	      this.percent = time % duration / duration;
	      program.setUniforms({
	        u_matrix: matrix,
	        u_percent: this.percent
	      }); // blend

	      gl.depthMask(false);
	      gl.enable(gl.BLEND);
	      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

	      for (var i = 0; i < this.group.length; i++) {
	        var _this$group$i = this.group[i],
	            indexData = _this$group$i.indexData,
	            bufferData = _this$group$i.bufferData,
	            uniforms = _this$group$i.uniforms;
	        this.program.setUniforms(uniforms);
	        this.indexBuffer.setData(indexData);
	        this.vertexBuffer.setData(bufferData);
	        this.vao.bind({
	          gl: gl,
	          program: program,
	          vertexBuffer: this.vertexBuffer,
	          indexBuffer: this.indexBuffer
	        });
	        gl.drawElements(gl.TRIANGLES, this.indexBuffer.numberOfIndices, this.indexBuffer.indexDatatype, 0);
	      }
	    } // 获取当前effect的对象

	  }, {
	    key: "getEffectObjs",
	    value: function getEffectObjs(transform) {
	      var _this2 = this;

	      return this.group.map(function (obj) {
	        var ripple = obj.uniforms.u_ripple;
	        var center = transform(ripple.center);
	        return _objectSpread2(_objectSpread2({}, ripple), {}, {
	          center: center,
	          percent: _this2.percent
	        });
	      });
	    }
	  }]);

	  return GroundRippleLayer;
	}(Layer);

	var $includes$1 = arrayIncludes.includes;
	var USES_TO_LENGTH$6 = arrayMethodUsesToLength('indexOf', {
	  ACCESSORS: true,
	  1: 0
	}); // `Array.prototype.includes` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.includes

	_export({
	  target: 'Array',
	  proto: true,
	  forced: !USES_TO_LENGTH$6
	}, {
	  includes: function includes(el
	  /* , fromIndex = 0 */
	  ) {
	    return $includes$1(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	}); // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

	addToUnscopables('includes');

	var SimpleCircleLayer = /*#__PURE__*/function (_Layer) {
	  _inherits(SimpleCircleLayer, _Layer);

	  var _super = _createSuper(SimpleCircleLayer);

	  function SimpleCircleLayer(options) {
	    _classCallCheck(this, SimpleCircleLayer);

	    return _super.call(this, options);
	  }

	  _createClass(SimpleCircleLayer, [{
	    key: "getDefaultOptions",
	    value: function getDefaultOptions() {
	      return {
	        size: 10,
	        unit: "px",
	        color: "blue"
	      };
	    }
	  }, {
	    key: "initialize",
	    value: function initialize(gl) {
	      this.program = new Program(gl, {
	        shaderId: "circle_simple",
	        defines: this.getOptions().enablePicked ? ["PICK"] : []
	      }, this);
	      this.vao = new VertexArrayObject();
	    }
	  }, {
	    key: "onChanged",
	    value: function onChanged(options, data) {
	      if (this.gl) {
	        this.processData(data);
	      }
	    }
	  }, {
	    key: "processData",
	    value: function processData(data) {
	      var _this = this;

	      var bufferData = [],
	          indexData = [];
	      data.forEach(function (point, index) {
	        var color = _this.normizedColor(_this.getValue("color", point));

	        var size = _this.getValue("size", point);

	        var coords = _this.normizedPoint(point.geometry.coordinates);

	        for (var i = 0; 4 > i; i++) {
	          bufferData.push(coords[0], coords[1], 0, size, i);
	          bufferData.push(color[0], color[1], color[2], 1);
	        } // 存入索引


	        index = 4 * index;
	        0 < index && indexData.push(index - 1, index);
	        indexData.push(index, index + 1, index + 2, index + 3);
	      });
	      this.updateBuffer(bufferData, indexData);
	    }
	  }, {
	    key: "parsePickData",
	    value: function parsePickData(data) {
	      var pickData = [];

	      if (this.getOptions().enablePicked) {
	        for (var c = 0; c < data.length; c++) {
	          var g = this.indexToRgb(c);
	          pickData.push(g[0] / 255, g[1] / 255, g[2] / 255);
	          pickData.push(g[0] / 255, g[1] / 255, g[2] / 255);
	          pickData.push(g[0] / 255, g[1] / 255, g[2] / 255);
	          pickData.push(g[0] / 255, g[1] / 255, g[2] / 255);
	        }
	      }

	      return pickData;
	    }
	  }, {
	    key: "updateBuffer",
	    value: function updateBuffer(bufferData, indexData) {
	      var gl = this.gl;
	      this.vertexBuffers = [// 顶点相关
	      new VertexBuffer({
	        gl: gl,
	        data: bufferData,
	        attributes: [{
	          name: "aPos",
	          size: 3
	        }, {
	          name: "aSize",
	          size: 1
	        }, {
	          name: "aIndex",
	          size: 1
	        }, {
	          name: "aColor",
	          size: 4
	        }]
	      })].concat(_toConsumableArray(this.getCommonBuffers({
	        pickData: this.parsePickData(this.getData())
	      })));
	      this.indexBuffer = new IndexBuffer({
	        gl: gl,
	        data: indexData
	      });
	    }
	  }, {
	    key: "render",
	    value: function render(transferOptions) {
	      var program = this.program,
	          gl = transferOptions.gl,
	          matrix = transferOptions.matrix;
	      if (!this.indexBuffer || this.indexBuffer.numberOfIndices === 0) return;
	      program.use(gl);
	      var uniforms = Object.assign(this.getCommonUniforms(transferOptions), {
	        uZoomUnits: "px" === this.options.unit ? this.map.getZoomUnits() : this.normizedHeight(1, this.map.getCenter()),
	        uMatrix: matrix
	      });
	      program.setUniforms(uniforms);
	      this.vao.bind({
	        gl: gl,
	        program: program,
	        vertexBuffers: this.vertexBuffers,
	        indexBuffer: this.indexBuffer
	      });
	      gl.drawElements(gl.TRIANGLE_STRIP, this.indexBuffer.numberOfIndices, this.indexBuffer.indexDatatype, 0);
	    }
	  }]);

	  return SimpleCircleLayer;
	}(Layer); // 动画圆圈图层


	var AnimateCircleLayer = /*#__PURE__*/function (_Layer2) {
	  _inherits(AnimateCircleLayer, _Layer2);

	  var _super2 = _createSuper(AnimateCircleLayer);

	  function AnimateCircleLayer(options) {
	    var _this2;

	    _classCallCheck(this, AnimateCircleLayer);

	    _this2 = _super2.call(this, options);
	    _this2.autoUpdate = true;
	    _this2.initializeTime = new Date();
	    return _this2;
	  }

	  _createClass(AnimateCircleLayer, [{
	    key: "getDefaultOptions",
	    value: function getDefaultOptions() {
	      return {
	        type: "bubble",
	        size: 10,
	        duration: 1,
	        trail: 1,
	        unit: "px",
	        random: true,
	        color: "blue",
	        radius: null
	      };
	    }
	  }, {
	    key: "initialize",
	    value: function initialize(gl) {
	      this.program = new Program(gl, {
	        shaderId: this.options.type === "wave" ? "circle_wave" : "circle_bubble",
	        defines: this.options.enablePicked ? ["PICK"] : []
	      }, this);
	      this.vao = new VertexArrayObject();
	    }
	  }, {
	    key: "onChanged",
	    value: function onChanged(options, data) {
	      if (this.gl) {
	        this.uniforms = {
	          duration: options.duration,
	          trail: options.trail
	        };
	        this.processData(data);
	        options.enablePicked && this.parsePickData(data);
	      }
	    }
	  }, {
	    key: "processData",
	    value: function processData(data) {
	      var _this3 = this;

	      var bufferData = [],
	          indexData = [];
	      var startTime = (this.options.duration + this.options.trail) / data.length;
	      data.forEach(function (point, index) {
	        var size = _this3.getValue("size", point);

	        var radius = _this3.getValue("radius", point) || 2 * size;

	        var color = _this3.normizedColor(_this3.getValue("color", point));

	        var coords = _this3.normizedPoint(point.geometry.coordinates);

	        startTime = _this3.options.random ? startTime + startTime * Math.random() : 0;

	        for (var n = 0; 4 > n; n++) {
	          bufferData.push(coords[0], coords[1], 0, size, n);
	          bufferData.push(color[0], color[1], color[2], 1);
	          bufferData.push(radius);
	          bufferData.push(index * startTime);
	        }

	        index = 4 * index;
	        0 < index && indexData.push(index - 1, index);
	        indexData.push(index, index + 1, index + 2, index + 3);
	      });
	      this.updateBuffer(bufferData, indexData);
	    }
	  }, {
	    key: "parsePickData",
	    value: function parsePickData(data) {
	      var pickData = [];

	      if (this.getOptions().enablePicked) {
	        for (var c = 0; c < data.length; c++) {
	          var g = this.indexToRgb(c);
	          pickData.push(g[0] / 255, g[1] / 255, g[2] / 255);
	          pickData.push(g[0] / 255, g[1] / 255, g[2] / 255);
	          pickData.push(g[0] / 255, g[1] / 255, g[2] / 255);
	          pickData.push(g[0] / 255, g[1] / 255, g[2] / 255);
	        }
	      }

	      return pickData;
	    }
	  }, {
	    key: "updateBuffer",
	    value: function updateBuffer(bufferData, indexData) {
	      var gl = this.gl;
	      this.vertexBuffers = [// 顶点相关
	      new VertexBuffer({
	        gl: gl,
	        data: bufferData,
	        attributes: [{
	          name: "aPos",
	          size: 3
	        }, {
	          name: "aSize",
	          size: 1
	        }, {
	          name: "aIndex",
	          size: 1
	        }, {
	          name: "aColor",
	          size: 4
	        }, {
	          name: "aRadius",
	          size: 1
	        }, {
	          name: "aStartTime",
	          size: 1
	        }]
	      })].concat(_toConsumableArray(this.getCommonBuffers({
	        pickData: this.parsePickData(this.getData())
	      })));
	      this.indexBuffer = new IndexBuffer({
	        gl: gl,
	        data: indexData
	      });
	    }
	  }, {
	    key: "render",
	    value: function render(transferOptions) {
	      var program = this.program,
	          gl = transferOptions.gl,
	          matrix = transferOptions.matrix;
	      if (!this.indexBuffer || this.indexBuffer.numberOfIndices === 0) return;
	      program.use(gl);
	      Object.assign(this.uniforms, this.getCommonUniforms(transferOptions), {
	        uTime: (new Date() - this.initializeTime) / 1e3,
	        uZoomUnits: "m" === this.options.unit ? this.normizedHeight(1, this.map.getCenter()) : this.map.getZoomUnits(),
	        uMatrix: matrix
	      });
	      program.setUniforms(this.uniforms);
	      this.vao.bind({
	        gl: gl,
	        program: program,
	        vertexBuffers: this.vertexBuffers,
	        indexBuffer: this.indexBuffer
	      });
	      gl.enable(gl.BLEND);
	      gl.blendEquation(gl.FUNC_ADD);
	      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
	      gl.drawElements(gl.TRIANGLE_STRIP, this.indexBuffer.numberOfIndices, this.indexBuffer.indexDatatype, 0);
	    }
	  }]);

	  return AnimateCircleLayer;
	}(Layer);
	/**
	 * @classdesc
	 *
	 * 以贴地圆的方式展示点数据，支持设置多种圆环动画效果，继承自 Layer
	 * 
	 * @extends Layer
	 *
	 * @param {Object} options
	 * @param {String=} [options.type='simple']
	 * 可选值： <br/>
	 * simple，默认值，普通圆，扩散效果的相关设置对其无效 <br/>
	 * wave，带波纹扩散效果的圆 <br/>
	 * bubble，带冒泡扩散效果的圆 <br/>
	 * @param {String | Function=} [options.color='blue'] 颜色
	 * @param {Number | Function=} [options.size=10] 圆的半径大小，带扩散效果时指的是中心圆的半径大小
	 * @param {Number | Function=} [options.radius=(size) => 2 * size] 扩散效果的半径大小，设置值时需要比 size 的值大，否则看不出扩散效果，也可设置为函数，传入参数为中心圆半径
	 * @param {Number=} [options.duration=1]
	 * 解释：扩散效果的动画周期 <br/>
	 * wave类型时duration影响的是波纹的扩散速度，越小越快 <br/>
	 * bubble类型时duration是扩散开始到最大半径的时间，越大越长 <br/>
	 * @param {Number=} [options.trail=1]
	 * 解释：扩散效果的间隔时间 <br/>
	 * wave类型时trial影响的是波纹数，越大越多 <br/>
	 * bubble类型时trial是扩散最大半径到消失的时间，越大越长 <br/>
	 * @param {Boolean=} [options.random=true] 扩散效果的开始时间是否随机，设置为‘false’则表现为节奏一致
	 */


	var CircleLayer = function CircleLayer(options) {
	  _classCallCheck(this, CircleLayer);

	  return ["wave", "bubble"].includes(options.type) ? new AnimateCircleLayer(options) : new SimpleCircleLayer(options);
	};

	/**
	 * @classdesc
	 *
	 * 用来展示大数据量的简单线图层，继承自 Layer
	 *
	 * @extends Layer
	 *
	 * @param {Object} options
	 * @param {String | Function=} [options.color='rgba(25, 25, 250, 1)'] 颜色
	 * @param {String=} options.blend 线叠加模式，可选lighter
	 */

	var SimpleLineLayer = /*#__PURE__*/function (_Layer) {
	  _inherits(SimpleLineLayer, _Layer);

	  var _super = _createSuper(SimpleLineLayer);

	  function SimpleLineLayer(options) {
	    _classCallCheck(this, SimpleLineLayer);

	    return _super.call(this, options);
	  }

	  _createClass(SimpleLineLayer, [{
	    key: "getDefaultOptions",
	    value: function getDefaultOptions() {
	      return {
	        color: "rgba(25, 25, 250, 1)"
	      };
	    }
	  }, {
	    key: "initialize",
	    value: function initialize(gl) {
	      this.program = new Program(gl, {
	        shaderId: "simple_line"
	      }, this);
	      this.vertexBuffer = new VertexBuffer({
	        gl: gl,
	        attributes: [{
	          name: "aPos",
	          size: 3
	        }, {
	          name: "aColor",
	          size: 4
	        }]
	      });
	      this.vao = new VertexArrayObject();
	    }
	  }, {
	    key: "onChanged",
	    value: function onChanged(options, data) {
	      var self = this;

	      if (this.gl) {
	        var arrayData = [],
	            func = function func(point, color) {
	          if (point) for (var e = 0; e < point.length - 1; e++) {
	            var g = self.normizedPoint(point[e]);
	            arrayData.push(g[0]);
	            arrayData.push(g[1]);
	            arrayData.push(g[2]);
	            arrayData.push(color[0], color[1], color[2], color[3]);
	            g = self.normizedPoint(point[e + 1]);
	            arrayData.push(g[0]);
	            arrayData.push(g[1]);
	            arrayData.push(g[2]);
	            arrayData.push(color[0], color[1], color[2], color[3]);
	          }
	        };

	        for (var h = 0; h < data.length; h++) {
	          var color = this.normizedColor(this.getValue("color", data[h]));
	          var geometry = data[h].geometry,
	              coords = geometry.coordinates;

	          if ("MultiPolygon" === geometry.type) {
	            if (coords) {
	              for (var i = 0; i < coords.length; i++) {
	                func(coords[i][0], color);
	              }
	            }
	          } else if ("Polygon" === geometry.type) {
	            coords && func(coords[0], color);
	          } else if ("MultiLineString" === geometry.type) {
	            if (coords) {
	              for (var _i = 0; _i < coords.length; _i++) {
	                func(coords[_i], color);
	              }
	            }
	          } else func(coords, color);
	        }

	        this.vertexBuffer.setData(arrayData);
	      }
	    }
	  }, {
	    key: "render",
	    value: function render(transferOptions) {
	      var gl = transferOptions.gl,
	          matrix = transferOptions.matrix;
	      if (this.vertexBuffer.numberOfVertices === 0) return;
	      var program = this.program;
	      program.use(gl);
	      this.vao.bind({
	        gl: gl,
	        program: program,
	        vertexBuffer: this.vertexBuffer
	      });
	      program.setUniforms({
	        u_matrix: matrix
	      });
	      gl.enable(gl.BLEND);
	      gl.blendEquation(gl.FUNC_ADD);
	      var blend = this.getOptions().blend;

	      if (blend && "lighter" === blend) {
	        gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
	      } else {
	        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
	      }

	      gl.drawArrays(gl.LINES, 0, this.vertexBuffer.numberOfVertices);
	      gl.disable(gl.BLEND);
	    }
	  }]);

	  return SimpleLineLayer;
	}(Layer);

	// https://tc39.github.io/ecma262/#sec-array.prototype.fill

	_export({
	  target: 'Array',
	  proto: true
	}, {
	  fill: arrayFill
	}); // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

	addToUnscopables('fill');

	function getCanvas2D() {
	  var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;
	  var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 32;
	  var canvas = document.createElement("canvas");
	  canvas.width = width;
	  canvas.height = height;
	  var ctx = canvas.getContext("2d");
	  return {
	    canvas: canvas,
	    ctx: ctx
	  };
	}
	function road() {
	  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var color = options.color,
	      canvas2d = getCanvas2D(),
	      canvas = canvas2d.canvas,
	      ctx = canvas2d.ctx;
	  ctx.save();
	  ctx.moveTo(0, 0);
	  ctx.lineTo(20, 0);
	  ctx.lineTo(32, 16);
	  ctx.lineTo(20, 32);
	  ctx.lineTo(0, 32);
	  ctx.lineTo(10, 16);
	  ctx.fillStyle = color || "#fff";
	  ctx.fill();
	  ctx.restore();
	  return canvas;
	}
	function arrow() {
	  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var width = options.width,
	      color = options.color;
	  var canvas2d = getCanvas2D(),
	      canvas = canvas2d.canvas,
	      ctx = canvas2d.ctx;
	  ctx.save();
	  ctx.moveTo(5, 0);
	  ctx.lineTo(32, 16);
	  ctx.lineTo(5, 32);
	  ctx.strokeStyle = color || "#fff";
	  ctx.lineWidth = width || 8;
	  ctx.stroke();
	  ctx.restore();
	  return canvas;
	}
	function circle(diameter) {
	  var radius = diameter / 2,
	      a = diameter + radius,
	      canvas2d = getCanvas2D(2 * a, 2 * a),
	      ctx = canvas2d.ctx;
	  ctx.shadowBlur = radius;
	  ctx.shadowColor = "black";
	  ctx.shadowOffsetX = ctx.shadowOffsetY = 1e4;
	  ctx.beginPath();
	  ctx.arc(a - 1e4, a - 1e4, diameter, 0, 2 * Math.PI, true);
	  ctx.closePath();
	  ctx.fill();
	  return canvas2d.canvas;
	}

	function length(coords) {
	  var length = 0;
	  var lengthArr = [];

	  for (var i = 0; i < coords.length; i++) {
	    var coord = coords[i];

	    if (i > 0) {
	      var preCoord = coords[i - 1];
	      length += Math.sqrt(Math.pow(coord[0] - preCoord[0], 2) + Math.pow(coord[1] - preCoord[1], 2));
	    }

	    lengthArr.push(length);
	  }

	  return {
	    arr: lengthArr,
	    total: length
	  };
	}

	function toOneArr(arr) {
	  if (!arr[0] || !arr[0].length) return arr;
	  var length = arr[0].length,
	      line = [];

	  for (var b = 0, i = 0; i < arr.length; i++) {
	    for (var j = 0; j < length; j++) {
	      line[b++] = arr[i][j];
	    }
	  }

	  return line;
	}

	function perp(array, reverse) {
	  var retArr = [];
	  array.forEach(function (b) {
	    retArr.push(reverse ? -b : b, b);
	  });
	  return retArr;
	}

	function shiftArray(shiftIndex) {
	  return function (value, index, array) {
	    value = index + shiftIndex;
	    index = array.length - 1;
	    return array[0 < index ? 0 > value ? 0 : value > index ? index : value : value < index ? index : 0 < value ? 0 : value];
	  };
	}

	function buildIndexArr(coordLength) {
	  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	  var indexArr = [];

	  for (var b = 0; b < coordLength - 1; b++) {
	    var d = 2 * (b + offset);
	    indexArr.push(d, d + 1, d + 2);
	    indexArr.push(d + 2, d + 1, d + 3);
	  }

	  return indexArr;
	}

	var LineStyle = {
	  normal: null,
	  road: road()
	};

	var LineLayer3D = /*#__PURE__*/function (_Layer) {
	  _inherits(LineLayer3D, _Layer);

	  var _super = _createSuper(LineLayer3D);

	  function LineLayer3D(options) {
	    var _this;

	    _classCallCheck(this, LineLayer3D);

	    _this = _super.call(this, options);

	    _this.initData();

	    return _this;
	  }

	  _createClass(LineLayer3D, [{
	    key: "getDefaultOptions",
	    value: function getDefaultOptions() {
	      return {
	        color: "rgba(25, 25, 250, 1)",
	        blend: "normal",
	        width: 4,
	        isFlat: true,
	        antialias: false,
	        lineJoin: "miter",
	        lineCap: "butt",
	        style: "normal",
	        dashArray: [0, 0],
	        dashOffset: 0
	      };
	    }
	  }, {
	    key: "initData",
	    value: function initData() {
	      this.dataMgr = {
	        position: [],
	        prev: [],
	        next: [],
	        direction: [],
	        color: [],
	        index: [],
	        counter: [],
	        uv: []
	      };
	    }
	  }, {
	    key: "initialize",
	    value: function initialize(gl) {
	      var options = this.getOptions(),
	          defines = [];
	      options.enablePicked && defines.push("PICK");

	      if (LineStyle[options.style]) {
	        this.isUseTexture = true;
	        defines.push("USE_TEXTURE");
	        this.setOptions({
	          texture: LineStyle[options.style]
	        });
	        this.loadTexture();
	      }

	      this.program = new Program(gl, {
	        shaderId: "line_3d",
	        defines: defines
	      }, this);
	      this.vao = new VertexArrayObject();
	    }
	  }, {
	    key: "onChanged",
	    value: function onChanged(options, data) {
	      var _this2 = this;

	      if (this.gl) {
	        this.initData();
	        var pickData = [];

	        for (var i = 0; i < data.length; i++) {
	          // 坐标转换
	          var line = [];
	          var coords = data[i].geometry.coordinates;

	          if (coords && coords.length > 0) {
	            line = "Polygon" === data[i].geometry.type ? coords[0].map(function (p) {
	              return _this2.normizedPoint(p);
	            }) : coords.map(function (p) {
	              return _this2.normizedPoint(p);
	            });
	          }

	          var color = this.normizedColor(this.getValue("color", data[i]));
	          var lines = this.addMultipleCoords(line);

	          for (var j = 0; j < lines.length; j++) {
	            this.processData(this.dataMgr, lines[j], color);
	          }

	          if (options.enablePicked) {
	            var k = this.indexToRgb(i);

	            for (var p = 0; p < line.length; p++) {
	              pickData.push(k[0] / 255, k[1] / 255, k[2] / 255);
	              pickData.push(k[0] / 255, k[1] / 255, k[2] / 255);

	              if (options.repeat) {
	                pickData.push(k[0] / 255, k[1] / 255, k[2] / 255);
	                pickData.push(k[0] / 255, k[1] / 255, k[2] / 255);
	                pickData.push(k[0] / 255, k[1] / 255, k[2] / 255);
	                pickData.push(k[0] / 255, k[1] / 255, k[2] / 255);
	              }
	            }
	          }
	        }

	        this.updateBuffer(this.dataMgr, pickData);
	      }
	    }
	  }, {
	    key: "processData",
	    value: function processData(dataMgr, line, color) {
	      var _dataMgr$uv, _dataMgr$counter, _dataMgr$position, _dataMgr$prev, _dataMgr$next, _dataMgr$direction, _dataMgr$color, _dataMgr$index;

	      var count = line.length,
	          u = dataMgr.position.length / 6;

	      var _length = length(line),
	          arr = _length.arr,
	          total = _length.total; // uv贴图


	      var uv = arr.map(function (l) {
	        return [l, 0, l, 1];
	      });
	      var counter = perp(arr.map(function (l) {
	        return [l, total];
	      })); // 点集合

	      var postion = perp(line);
	      var prevV = perp(line.map(shiftArray(-1)));
	      var nextV = perp(line.map(shiftArray(1))); // 方位

	      var direction = perp(line.map(function () {
	        return -1;
	      }), true); // 颜色

	      var colors = perp(line.map(function () {
	        return color;
	      })); // 顶点索引

	      var indexArr = buildIndexArr(count, u);

	      (_dataMgr$uv = dataMgr.uv).push.apply(_dataMgr$uv, _toConsumableArray(toOneArr(uv)));

	      (_dataMgr$counter = dataMgr.counter).push.apply(_dataMgr$counter, _toConsumableArray(toOneArr(counter)));

	      (_dataMgr$position = dataMgr.position).push.apply(_dataMgr$position, _toConsumableArray(toOneArr(postion)));

	      (_dataMgr$prev = dataMgr.prev).push.apply(_dataMgr$prev, _toConsumableArray(toOneArr(prevV)));

	      (_dataMgr$next = dataMgr.next).push.apply(_dataMgr$next, _toConsumableArray(toOneArr(nextV)));

	      (_dataMgr$direction = dataMgr.direction).push.apply(_dataMgr$direction, _toConsumableArray(direction));

	      (_dataMgr$color = dataMgr.color).push.apply(_dataMgr$color, _toConsumableArray(toOneArr(colors)));

	      (_dataMgr$index = dataMgr.index).push.apply(_dataMgr$index, _toConsumableArray(indexArr));
	    }
	  }, {
	    key: "updateBuffer",
	    value: function updateBuffer(dataMgr, pickData) {
	      var gl = this.gl;
	      var counter = dataMgr.counter,
	          position = dataMgr.position,
	          prev = dataMgr.prev,
	          next = dataMgr.next,
	          direction = dataMgr.direction,
	          color = dataMgr.color,
	          uv = dataMgr.uv,
	          index = dataMgr.index;
	      this.vertexBuffers = [new VertexBuffer({
	        gl: gl,
	        data: counter,
	        attributes: [{
	          name: "aDistance",
	          size: 1
	        }, {
	          name: "aTotalDistance",
	          size: 1
	        }]
	      }), new VertexBuffer({
	        gl: gl,
	        data: position,
	        attributes: [{
	          name: "position",
	          size: 3
	        }]
	      }), new VertexBuffer({
	        gl: gl,
	        data: prev,
	        attributes: [{
	          name: "previous",
	          size: 3
	        }]
	      }), new VertexBuffer({
	        gl: gl,
	        data: next,
	        attributes: [{
	          name: "next",
	          size: 3
	        }]
	      }), new VertexBuffer({
	        gl: gl,
	        data: direction,
	        attributes: [{
	          name: "direction",
	          size: 1
	        }]
	      }), new VertexBuffer({
	        gl: gl,
	        data: color,
	        attributes: [{
	          name: "aColor",
	          size: 4
	        }]
	      })].concat(_toConsumableArray(this.getCommonBuffers({
	        pickData: pickData
	      })));

	      if (this.isUseTexture) {
	        this.vertexBuffers.push(new VertexBuffer({
	          gl: gl,
	          data: uv,
	          attributes: [{
	            name: "uv",
	            size: 2
	          }]
	        }));
	      }

	      this.indexBuffer = new IndexBuffer({
	        gl: gl,
	        data: index
	      });
	    }
	  }, {
	    key: "render",
	    value: function render(transferOptions) {
	      var gl = transferOptions.gl,
	          matrix = transferOptions.matrix,
	          isPickRender = transferOptions.isPickRender;
	      if (!this.indexBuffer || this.indexBuffer.numberOfIndices === 0) return;
	      var options = this.getOptions(),
	          program = this.program;
	      program.use(gl);
	      var uniforms = Object.assign(this.getCommonUniforms(transferOptions), {
	        uMatrix: matrix,
	        uFlat: options.isFlat,
	        zoomUnits: this.map.getZoomUnits(),
	        devicePixelRatio: window.devicePixelRatio,
	        miter: +(options.lineJoin === "miter"),
	        thickness: options.width,
	        uDashArray: options.dashArray,
	        uDashOffset: options.dashOffset,
	        uAntialias: options.antialias
	      });

	      if (this.isUseTexture) {
	        uniforms = Object.assign(uniforms, {
	          uTextureMargin: 140,
	          textureImage: this.texture
	        });
	      }

	      program.setUniforms(uniforms);
	      this.vao.bind({
	        gl: gl,
	        program: program,
	        vertexBuffers: this.vertexBuffers,
	        indexBuffer: this.indexBuffer
	      });

	      if (isPickRender) {
	        gl.disable(gl.BLEND);
	      } else {
	        gl.enable(gl.BLEND);
	        gl.blendEquation(gl.FUNC_ADD);

	        if (options.blend && "lighter" === options.blend) {
	          gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
	        } else {
	          gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
	        }
	      }

	      gl.drawElements(gl.TRIANGLES, this.indexBuffer.numberOfIndices, this.indexBuffer.indexDatatype, 0);
	    }
	  }, {
	    key: "loadTexture",
	    value: function loadTexture(callback) {
	      var _this3 = this;

	      var options = this.getOptions();
	      options.texture ? this.gl.textureManager.load(options.texture, function (texture) {
	        _this3.texture = texture;
	        callback && callback();

	        _this3.webglLayer.render();
	      }) : (this.texture = null, callback && callback());
	    }
	  }]);

	  return LineLayer3D;
	}(Layer);

	function subNormalize(f, c, a) {
	  sub$1(f, c, a);
	  normalize$2(f, f);
	  return f;
	}

	function revertSet(f, c) {
	  return set$1(f, -c[1], c[0]);
	}

	var LineMgr = /*#__PURE__*/function () {
	  function LineMgr(options) {
	    _classCallCheck(this, LineMgr);

	    this.join = options.join || "miter";
	    this.cap = options.cap || "butt";
	    this.thickness = options.thickness || 4;
	    this.miterLimit = options.miterLimit || 2 * this.thickness;
	    this.dash = options.dash || false;
	    this.complex = {
	      positions: [],
	      indices: [],
	      normals: [],
	      colors: [],
	      uvs: [],
	      startIndex: 0,
	      maxDistance: 0
	    };
	    this._lastFlip = -1;
	    this._started = false;
	    this._normal = null;
	    this._totalDistance = 0;
	  }

	  _createClass(LineMgr, [{
	    key: "extrude",
	    value: function extrude(line, color) {
	      var complex = this.complex;
	      if (1 >= line.length) return complex;
	      this._lastFlip = -1;
	      this._started = false;
	      this._normal = null;
	      this._totalDistance = 0;
	      var length = line.length;
	      var start = complex.startIndex;

	      for (var i = 1; i < length; i++) {
	        var k = this._segment(complex, start, line[i - 1], line[i], i < length - 1 ? line[i + 1] : null, color);

	        if (-1 !== k) {
	          start += k;
	        }
	      }

	      if (this.dash) {
	        complex.maxDistance = Math.max(this._totalDistance, complex.maxDistance);
	      }

	      complex.startIndex = complex.positions.length / 6;
	      return complex;
	    }
	  }, {
	    key: "_segment",
	    value: function _segment(complex, start, prePoint, point, nextPoint, color) {
	      var pointSize = 0;
	      var avgNormal = create$2(),
	          tempNormal = create$2(),
	          preNormal = create$2(),
	          nextNormal = create$2();
	      var indices = complex.indices,
	          positions = complex.positions,
	          normals = complex.normals,
	          colors = complex.colors,
	          uvs = complex.uvs;
	      var isSquareCap = "square" === this.cap,
	          isRoundCap = "round" === this.cap,
	          xy = [point[0], point[1]],
	          preXy = [prePoint[0], prePoint[1]];
	      var isBevelJoin = "bevel" === this.join,
	          isRoundJoin = "round" === this.join;
	      subNormalize(preNormal, xy, preXy);
	      var dis = 0;

	      if (this.dash) {
	        dis = this._calcDistance(xy, preXy);
	        this._totalDistance += dis;
	      } // 对应的90度方向的向量


	      if (!this._normal) {
	        this._normal = create$2();
	        revertSet(this._normal, preNormal);
	      } // 头部点


	      if (!this._started) {
	        this._started = true; // 方头

	        if (isSquareCap) {
	          var normal0 = create$2();
	          var normal1 = create$2();
	          add(normal0, this._normal, preNormal);
	          sub$1(normal1, this._normal, preNormal);
	          normals.push(normal1[0], normal1[1], 0);
	          normals.push(normal0[0], normal0[1], 0);
	          positions.push(prePoint[0], prePoint[1], prePoint[2], this._totalDistance - dis, this.thickness, 0);
	          positions.push(prePoint[0], prePoint[1], prePoint[2], this._totalDistance - dis, -this.thickness, 0);
	          uvs.push(this._totalDistance - dis, 0, this._totalDistance - dis, 1);
	          colors.push(color[0], color[1], color[2], color[3]);
	          colors.push(color[0], color[1], color[2], color[3]);
	        } // 圆角头
	        else if (isRoundCap) {
	            var _normal = fromValues(-preNormal[0], -preNormal[1]);

	            var _normal2 = create$2();

	            sub$1(_normal2, this._normal, preNormal);
	            normalize$2(_normal2, _normal2);
	            var normal2 = create$2();
	            add(normal2, this._normal, preNormal);
	            normalize$2(normal2, normal2);
	            var normal3 = fromValues(this._normal[0], this._normal[1]),
	                normal4 = fromValues(-this._normal[0], -this._normal[1]);
	            normals.push(_normal[0], _normal[1], 0);
	            normals.push(_normal2[0], _normal2[1], 0);
	            normals.push(-normal2[0], -normal2[1], 0);
	            normals.push(normal3[0], normal3[1], 0);
	            normals.push(normal4[0], normal4[1], 0);

	            for (var k = 0; 5 > k; k++) {
	              positions.push(prePoint[0], prePoint[1], prePoint[2], this._totalDistance - dis, this.thickness, 0);
	              uvs.push(this._totalDistance - dis, 0);
	              colors.push(color[0], color[1], color[2], color[3]);
	            }
	            /**
	             *   1 - 3
	             * 0
	             *   2 - 4
	             */


	            indices.push(start + 0, start + 2, start + 1, start + 1, start + 2, start + 3, start + 3, start + 2, start + 4);
	            pointSize += 3;
	            start += 3;
	          } // 平头（即没有突出部分）
	          else {
	              this._extrusions(positions, normals, uvs, colors, prePoint, this._normal, this.thickness, this._totalDistance - dis, color);
	            }
	      } // 存入第一个多边形索引


	      indices.push.apply(indices, _toConsumableArray(-1 === this._lastFlip ? [start + 0, start + 1, start + 2] : [start + 1, start + 0, start + 2])); // 如果存在下个点

	      if (nextPoint) {
	        // 如果到了最末尾
	        if (point[0] === nextPoint[0] && point[1] === nextPoint[1] && point[2] === nextPoint[2]) {
	          return -1;
	        } // 计算下个点的方向


	        subNormalize(nextNormal, [nextPoint[0], nextPoint[1]], xy);
	        var thickness = this.thickness;
	        add(avgNormal, preNormal, nextNormal);
	        normalize$2(avgNormal, avgNormal); // 计算相交向量

	        var normal = fromValues(-avgNormal[1], avgNormal[0]);

	        var _normal3 = fromValues(-preNormal[1], preNormal[0]);

	        dis = thickness / dot(normal, _normal3); // 判断是否要转成斜转角

	        if (!isBevelJoin && "miter" === this.join) {
	          if (Math.abs(dis) > this.miterLimit) {
	            isBevelJoin = true;
	          }
	        } // 判断是上顶点还是下顶点


	        var lastFlip = 0 < dot(avgNormal, this._normal) ? -1 : 1; // 斜边

	        if (isBevelJoin) {
	          var _thickness = Math.min(2 * this.thickness, Math.abs(dis));

	          normals.push(this._normal[0], this._normal[1], 0);
	          normals.push(normal[0], normal[1], 0);
	          positions.push(point[0], point[1], point[2], this._totalDistance, this.thickness * lastFlip, 0);
	          positions.push(point[0], point[1], point[2], this._totalDistance, -_thickness * lastFlip, 0);
	          indices.push.apply(indices, _toConsumableArray(this._lastFlip === -lastFlip ? [start + 2, start + 1, start + 3] : [start + 0, start + 2, start + 3]));
	          revertSet(tempNormal, nextNormal);
	          copy(this._normal, tempNormal);
	          normals.push(this._normal[0], this._normal[1], 0);
	          positions.push(point[0], point[1], point[2], this._totalDistance, this.thickness * lastFlip, 0);
	          indices.push.apply(indices, _toConsumableArray(1 === lastFlip ? [start + 2, start + 3, start + 4] : [start + 3, start + 2, start + 4]));

	          this._flipedUV(uvs, this._totalDistance, lastFlip, true);

	          colors.push(color[0], color[1], color[2], color[3]);
	          colors.push(color[0], color[1], color[2], color[3]);
	          colors.push(color[0], color[1], color[2], color[3]);
	          pointSize += 3;
	        } // 圆角
	        else if (isRoundJoin) {
	            isRoundJoin = Math.min(2 * this.thickness, Math.abs(dis));
	            normals.push(this._normal[0], this._normal[1], 0);
	            normals.push(normal[0], normal[1], 0);
	            normals.push(normal[0], normal[1], 0);
	            positions.push(point[0], point[1], point[2], this._totalDistance, this.thickness * lastFlip, 0);
	            positions.push(point[0], point[1], point[2], this._totalDistance, this.thickness * lastFlip, 0);
	            positions.push(point[0], point[1], point[2], this._totalDistance, -isRoundJoin * lastFlip, 0);
	            indices.push.apply(indices, _toConsumableArray(this._lastFlip === -lastFlip ? [start + 2, start + 1, start + 4, start + 2, start + 4, start + 3] : [start + 0, start + 2, start + 4, start + 2, start + 3, start + 4]));
	            revertSet(tempNormal, nextNormal);
	            copy(this._normal, tempNormal);
	            normals.push(this._normal[0], this._normal[1], 0);
	            positions.push(point[0], point[1], point[2], this._totalDistance, this.thickness * lastFlip, 0);
	            indices.push.apply(indices, _toConsumableArray(1 === lastFlip ? [start + 4, start + 3, start + 5] : [start + 3, start + 4, start + 5]));

	            this._flipedUV(uvs, this._totalDistance, lastFlip, false);

	            colors.push(color[0], color[1], color[2], color[3]);
	            colors.push(color[0], color[1], color[2], color[3]);
	            colors.push(color[0], color[1], color[2], color[3]);
	            colors.push(color[0], color[1], color[2], color[3]);
	            pointSize += 4;
	          } // 默认模式
	          else {
	              this._extrusions(positions, normals, uvs, colors, point, normal, dis, this._totalDistance, color);

	              indices.push.apply(indices, _toConsumableArray(-1 === this._lastFlip ? [start + 2, start + 1, start + 3] : [start + 2, start + 0, start + 3]));
	              lastFlip = -1;
	              copy(this._normal, normal);
	              pointSize += 2;
	            }

	        this._lastFlip = lastFlip;
	      } // 末尾的点
	      else {
	          revertSet(this._normal, preNormal); // 方头

	          if (isSquareCap) {
	            var _normal4 = create$2();

	            var _normal5 = create$2();

	            add(_normal4, preNormal, this._normal);
	            sub$1(_normal5, preNormal, this._normal);
	            normals.push(_normal4[0], _normal4[1], 0);
	            normals.push(_normal5[0], _normal5[1], 0);
	            positions.push(point[0], point[1], point[2], this._totalDistance, this.thickness, 0);
	            positions.push(point[0], point[1], point[2], this._totalDistance, this.thickness, 0);
	            uvs.push(this._totalDistance, 0, this._totalDistance, 1);
	            colors.push(color[0], color[1], color[2], color[3]);
	            colors.push(color[0], color[1], color[2], color[3]);
	          } // 没有头
	          else {
	              this._extrusions(positions, normals, uvs, colors, point, this._normal, this.thickness, this._totalDistance, color);
	            }

	          indices.push.apply(indices, _toConsumableArray(-1 === this._lastFlip ? [start + 2, start + 1, start + 3] : [start + 2, start + 0, start + 3]));
	          pointSize += 2; // 圆头

	          if (isRoundCap) {
	            var _normal6 = create$2();

	            add(_normal6, preNormal, this._normal);
	            normalize$2(_normal6, _normal6);

	            var _normal7 = create$2();

	            sub$1(_normal7, preNormal, this._normal);
	            normalize$2(_normal7, _normal7);

	            var _normal8 = fromValues(preNormal[0], preNormal[1]);

	            normals.push(_normal6[0], _normal6[1], 0);
	            normals.push(_normal7[0], _normal7[1], 0);
	            normals.push(_normal8[0], _normal8[1], 0);

	            for (var i = 0; 3 > i; i++) {
	              positions.push(point[0], point[1], point[2], this._totalDistance - dis, this.thickness, 0);
	              uvs.push(this._totalDistance - dis, 0);
	              colors.push(color[0], color[1], color[2], color[3]);
	            }
	            /**
	             * 2 - 4
	             *       6
	             * 3 - 5
	             */


	            indices.push(start + 2, start + 3, start + 4, start + 4, start + 3, start + 5, start + 4, start + 5, start + 6);
	            pointSize += 3;
	          }
	        }

	      return pointSize;
	    }
	  }, {
	    key: "_extrusions",
	    value: function _extrusions(positions, normals, uvs, colors, point, normal, thickness, totalDis, color) {
	      normals.push(normal[0], normal[1], 0);
	      normals.push(normal[0], normal[1], 0);
	      positions.push(point[0], point[1], point[2], totalDis, thickness, 0);
	      positions.push(point[0], point[1], point[2], totalDis, -thickness, 0);
	      uvs.push(totalDis, 0, totalDis, 1);
	      colors.push(color[0], color[1], color[2], color[3]);
	      colors.push(color[0], color[1], color[2], color[3]);
	    }
	  }, {
	    key: "_calcDistance",
	    value: function _calcDistance(point1, point2) {
	      return Math.sqrt(Math.pow(point1[0] - point2[0], 2) + Math.pow(point1[1] - point2[1], 2));
	    }
	  }, {
	    key: "_flipedUV",
	    value: function _flipedUV(uvs, totalDis, dir, isBevel) {
	      if (isBevel) {
	        -1 === dir ? uvs.push(totalDis, 0, totalDis, 1, totalDis, 0) : uvs.push(totalDis, 1, totalDis, 0, totalDis, 1);
	      } else {
	        -1 === dir ? uvs.push(totalDis, 0, totalDis, 0, totalDis, 1, totalDis, 0) : uvs.push(totalDis, 1, totalDis, 1, totalDis, 0, totalDis, 1);
	      }
	    }
	  }]);

	  return LineMgr;
	}();

	var LineStyles = {
	  normal: null,
	  road: road,
	  arrow: arrow
	};
	/**
	 * @classdesc
	 * 
	 * WebGL 默认绘制线的模式 gl.LINES 只能画一像素的线，无法指定线的宽度，该图层用来展示可指定宽度的线图层，继承自 Layer。
	 * 如果只需要绘制简单的一像素的线，可以使用 SimpleLineLayer。
	 * 该图层可使用鼠标拾取 Pick。
	 * 
	 * @extends Layer
	 * 
	 * @param {Object} options
	 * @param {String=} [options.style='normal']
	 * 解释：设置该参数，可以在线上叠加一些图形来适用于一些场景。注意，该属性只在初始化时读取一次，实例化后不可通过setOptions方法来重置 </br>
	 * 可选值： </br>
	 * road，叠加路况箭头，可用于道路场景的展示 </br>
	 * arrow，叠加尖箭头图形，可用于OD场景的展示 </br>
	 * @param {Object=} [options.styleOptions={}] 控制贴图的样式，对象具有color和width属性
	 * @param {String=} [options.color='rgba(25, 25, 250, 1)'] 颜色
	 * @param {String=} [options.blend='normal'] 线叠加模式，可选lighter
	 * @param {String=} [options.lineJoin='miter'] 线的连接拐角，可选 `miter` 尖角、`bevel` 平角、`round` 圆角
	 * @param {String=} [options.lineCap='butt'] 线的端头，可选 `butt` 平头、`square` 方头、`round` 圆头
	 * @param {Number=} [options.width=4] 线的宽度
	 * @param {Number=} [options.offset=0] 沿法线方向的偏移，几乎很少使用到，设置该属性后只能用 `butt`端头和 `miter`连接，不然会出现问题
	 * @param {Boolean=} [options.antialias=false] 抗锯齿，默认关闭为 `false`
	 * @param {Array.<Number>=} [options.dashArray=[0, 0]] 定义虚线间隔的数组，数组长度为2。数组的两位分别表示实线和虚线的长度，单位像素，如[10, 20]表示实线10px，虚线20px
	 * @param {Number=} [options.dashOffset=0] 虚线偏移量，单位像素，可以通过实时改变该值来实现动画
	 * @param {Boolean=} [options.animation=false] 设置该参数来实现蝌蚪线动画，下面的属性生效依赖该值为 true。注意，该属性只在初始化时读取一次，实例化后不可通过setOptions方法来重置
	 * @param {Number=} [options.interval=0.1] 该参数指定每条线段的长度，值为粒子长度占数据中最长的线整体长度的比例
	 * @param {Number=} [options.duration=2] 动画的循环时间，单位为秒
	 * @param {Number=} [options.trailLength=0.5] 拖尾长度占间隔的比例
	 * @param {Number=} [options.minZoom=4] 地图视野大于等于一定级别时开启动画
	 * @param {Number=} [options.maxZoom=21] 地图视野小于等于一定级别时开启动画
	 */

	var LineLayer = /*#__PURE__*/function (_Layer) {
	  _inherits(LineLayer, _Layer);

	  var _super = _createSuper(LineLayer);

	  function LineLayer(options) {
	    _classCallCheck(this, LineLayer);

	    return _super.call(this, options);
	  }

	  _createClass(LineLayer, [{
	    key: "getDefaultOptions",
	    value: function getDefaultOptions() {
	      return {
	        style: "normal",
	        styleOptions: {},
	        color: "rgba(25, 25, 250, 1)",
	        blend: "normal",
	        lineJoin: "miter",
	        lineCap: "butt",
	        width: 4,
	        offset: 0,
	        antialias: false,
	        dashArray: [0, 0],
	        dashOffset: 0,
	        animation: false,
	        interval: 0.1,
	        duration: 2,
	        trailLength: 0.5,
	        minZoom: 4,
	        maxZoom: 21
	      };
	    }
	  }, {
	    key: "initialize",
	    value: function initialize(gl) {
	      var options = this.getOptions(),
	          defines = []; // pick

	      if (options.enablePicked) {
	        defines.push("PICK");
	      } // texture


	      if (LineStyles[options.style]) {
	        this.isUseTexture = true;
	        defines.push("USE_TEXTURE");
	        var texture = LineStyles[options.style](options.styleOptions);
	        this.setOptions({
	          texture: texture
	        });
	        this.loadTexture();
	      } // animate


	      if (options.animation === true) {
	        this.isAnimateLine = true;
	        this.date = new Date();
	        this.autoUpdate = true;
	        defines.push("USE_LINE_ANIMATION");
	      }

	      this.program = new Program(gl, {
	        shaderId: "line",
	        defines: defines
	      }, this);
	      this.vao = new VertexArrayObject();
	    }
	  }, {
	    key: "onChanged",
	    value: function onChanged(options, data) {
	      var _this = this;

	      var self = this;

	      if (this.gl) {
	        (function () {
	          var dashArray = options.dashArray;
	          dashArray = !!_this.isUseTexture || !!dashArray[1] || !!_this.isAnimateLine;
	          var dataMgr = new LineMgr({
	            dash: dashArray,
	            cap: options.lineCap,
	            join: options.lineJoin,
	            miterLimit: options.miterLimit,
	            thickness: options.width
	          }),
	              pickColors = [];

	          var _loop = function _loop(i) {
	            var coords = data[i].geometry.coordinates;

	            if (coords && 0 < coords.length) {
	              if ("Polygon" !== data[i].geometry.type && "MultiLineString" !== data[i].geometry.type) {
	                coords = [coords];
	              }

	              coords = coords.map(function (a) {
	                return a.map(function (point) {
	                  return _this.normizedPoint(point);
	                });
	              });
	            } // 起点位置


	            var preStartIndex = dataMgr.complex.startIndex;

	            var color = _this.normizedColor(_this.getValue("color", data[i]));

	            coords = _this.addMultipleCoords(coords);

	            for (var j = 0; j < coords.length; j++) {
	              coords[j].forEach(function (line) {
	                dataMgr.extrude(line, color);
	              });
	            } // pick


	            if (options.enablePicked) {
	              var pColor = self.indexToRgb(i);

	              for (var _j = preStartIndex; _j < dataMgr.complex.startIndex; _j++) {
	                pickColors.push(pColor[0] / 255, pColor[1] / 255, pColor[2] / 255);

	                if (options.repeat) {
	                  pickColors.push(pColor[0] / 255, pColor[1] / 255, pColor[2] / 255);
	                  pickColors.push(pColor[0] / 255, pColor[1] / 255, pColor[2] / 255);
	                }
	              }
	            }
	          };

	          for (var i = 0; i < data.length; i++) {
	            _loop(i);
	          }

	          var complexData = dataMgr.complex;

	          if (dashArray) {
	            for (var p = 0; p < complexData.positions.length / 6; p++) {
	              complexData.positions[6 * p + 5] = complexData.maxDistance;
	            }
	          }

	          _this.updateBuffer(complexData, pickColors);
	        })();
	      }
	    }
	  }, {
	    key: "updateBuffer",
	    value: function updateBuffer(complexData, pickColors) {
	      var gl = this.gl;
	      var positions = complexData.positions,
	          normals = complexData.normals,
	          colors = complexData.colors,
	          uvs = complexData.uvs,
	          indices = complexData.indices;
	      this.vertexBuffers = [// positions
	      new VertexBuffer({
	        gl: gl,
	        data: positions,
	        attributes: [{
	          name: "a_position",
	          size: 3
	        }, {
	          name: "a_distance",
	          size: 1
	        }, {
	          name: "a_width",
	          size: 1
	        }, {
	          name: "a_total_distance",
	          size: 1
	        }]
	      }), // normals
	      new VertexBuffer({
	        gl: gl,
	        data: normals,
	        attributes: [{
	          name: "a_normal",
	          size: 3
	        }]
	      }), // colors
	      new VertexBuffer({
	        gl: gl,
	        data: colors,
	        attributes: [{
	          name: "a_color",
	          size: 4
	        }]
	      })].concat(_toConsumableArray(this.getCommonBuffers({
	        pickData: pickColors
	      }))); // uva

	      if (this.isUseTexture) {
	        this.vertexBuffers.push(new VertexBuffer({
	          gl: gl,
	          data: uvs,
	          attributes: [{
	            name: "uv",
	            size: 2
	          }]
	        }));
	      }

	      this.indexBuffer = new IndexBuffer({
	        gl: gl,
	        data: indices
	      });
	    }
	  }, {
	    key: "render",
	    value: function render(transferOptions) {
	      var gl = transferOptions.gl,
	          matrix = transferOptions.matrix;
	      if (this.indexBuffer.numberOfIndices === 0) return;
	      var options = this.getOptions(),
	          program = this.program;
	      program.use(gl);
	      var uniforms = Object.assign(this.getCommonUniforms(transferOptions), {
	        u_matrix: matrix,
	        u_zoom_units: this.map.getZoomUnits(),
	        u_dash_array: options.dashArray,
	        u_dash_offset: options.dashOffset,
	        u_antialias: options.antialias,
	        u_offset: options.offset
	      }); // 纹理模式

	      if (this.isUseTexture) {
	        uniforms = Object.assign(uniforms, {
	          u_texture_width: options.width,
	          u_texture_margin: 140,
	          u_sampler: this.texture
	        });
	      } // 动画模式


	      if (this.isAnimateLine) {
	        var zoom = this.map.getZoom();
	        uniforms = Object.assign(uniforms, {
	          u_time: (new Date() - this.date) / 1e3,
	          u_animate: zoom >= options.minZoom && zoom <= options.maxZoom && this.autoUpdate ? true : false,
	          u_duration: options.duration,
	          u_interval: options.interval,
	          u_trail_length: options.trailLength
	        });
	      }

	      program.setUniforms(uniforms); // 混合模式

	      gl.enable(gl.BLEND);
	      gl.blendEquation(gl.FUNC_ADD);

	      if (options.blend && "lighter" === options.blend) {
	        gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
	      } else {
	        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
	      } // 绑定顶点并绘制


	      this.vao.bind({
	        gl: gl,
	        program: program,
	        vertexBuffers: this.vertexBuffers,
	        indexBuffer: this.indexBuffer
	      });
	      gl.drawElements(gl.TRIANGLES, this.indexBuffer.numberOfIndices, this.indexBuffer.indexDatatype, 0);
	    }
	  }, {
	    key: "loadTexture",
	    value: function loadTexture(callback) {
	      var _this2 = this;

	      var options = this.getOptions();
	      options.texture ? this.gl.textureManager.load(options.texture, function (texture) {
	        _this2.texture = texture;
	        callback && callback();

	        _this2.webglLayer.render();
	      }) : (this.texture = null, callback && callback());
	    }
	  }]);

	  return LineLayer;
	}(Layer);

	/**
	 * @classdesc
	 * 
	 * 用来展示轨迹飞线图层，继承自 `Layer`
	 * 
	 * @extends Layer
	 * 
	 * @param {Object} options
	 * @param {String | Function=} [options.color='rgba(255, 5, 5, 1)'] 颜色
	 * @param {Number=} [options.startTime=0] 动画开始时间
	 * @param {Number=} [options.endTime=data的长度] 动画结束时间
	 * @param {Number=} [options.step=0.1] 执行每次动画的步长
	 * @param {Number=} [options.trailLength=3] 动画的拖尾时长
	 */

	var LineTripLayer = /*#__PURE__*/function (_Layer) {
	  _inherits(LineTripLayer, _Layer);

	  var _super = _createSuper(LineTripLayer);

	  function LineTripLayer(options) {
	    var _this;

	    _classCallCheck(this, LineTripLayer);

	    _this = _super.call(this, options);
	    _this.autoUpdate = true;
	    return _this;
	  }

	  _createClass(LineTripLayer, [{
	    key: "getDefaultOptions",
	    value: function getDefaultOptions() {
	      return {
	        color: [1, 0.05, 0.05, 1],
	        trailLength: 3,
	        step: 0.1
	      };
	    }
	  }, {
	    key: "initialize",
	    value: function initialize(gl) {
	      this.program = new Program(this.gl, {
	        shaderId: "line_trip"
	      }, this);
	      this.vertexBuffer = new VertexBuffer({
	        gl: gl,
	        attributes: [{
	          name: "aPos",
	          size: 4
	        }, {
	          name: "aColor",
	          size: 4
	        }]
	      });
	      this.vao = new VertexArrayObject();
	    }
	  }, {
	    key: "setTime",
	    value: function setTime(time) {
	      this.time = time;
	    }
	  }, {
	    key: "onChanged",
	    value: function onChanged(options, data) {
	      var gl = this.gl;

	      if (gl) {
	        var bufferData = [];
	        var endTime = 0;

	        for (var i = 0; i < data.length; i++) {
	          // 坐标
	          var coords = data[i].geometry.coordinates; // 颜色

	          var color = this.normizedColor(this.getValue("color", data[i])); // 结束时间

	          if (coords.length > endTime) {
	            endTime = coords.length;
	          }

	          for (var j = 0; j < coords.length - 1; j++) {
	            var point = this.normizedPoint(coords[j]);
	            bufferData.push(point[0]);
	            bufferData.push(point[1]);
	            bufferData.push(point[2]);
	            undefined === coords[j][3] ? bufferData.push(j) : bufferData.push(Number(coords[j][3]));
	            bufferData.push(color[0]);
	            bufferData.push(color[1]);
	            bufferData.push(color[2]);
	            bufferData.push(color[3]);
	            point = this.normizedPoint(coords[j + 1]);
	            bufferData.push(point[0]);
	            bufferData.push(point[1]);
	            bufferData.push(point[2]);
	            undefined === coords[j + 1][3] ? bufferData.push(j + 1) : bufferData.push(Number(coords[j + 1][3]));
	            bufferData.push(color[0]);
	            bufferData.push(color[1]);
	            bufferData.push(color[2]);
	            bufferData.push(color[3]);
	          }
	        }

	        this.startTime = +options.startTime || 0;
	        this.endTime = +options.endTime || endTime;
	        this.time = this.startTime;
	        this.vertexBuffer.setData(bufferData);
	      }
	    }
	  }, {
	    key: "render",
	    value: function render(transferOptions) {
	      var gl = transferOptions.gl,
	          matrix = transferOptions.matrix;
	      if (this.vertexBuffer.numberOfVertices === 0) return;
	      this.program.use(gl);
	      this.vao.bind({
	        gl: gl,
	        program: this.program,
	        vertexBuffer: this.vertexBuffer
	      });
	      var uniforms = {
	        u_matrix: matrix,
	        currentTime: this.time,
	        trailLength: this.options.trailLength
	      };
	      this.program.setUniforms(uniforms);
	      gl.enable(gl.BLEND);
	      gl.polygonOffset(2, 1);
	      "lighter" === this.options.blend ? gl.blendFunc(gl.ONE, gl.ONE) : gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
	      gl.blendEquation(gl.FUNC_ADD);
	      gl.drawArrays(gl.LINES, 0, this.vertexBuffer.numberOfVertices);
	      this.time += this.options.step;
	      this.time > this.endTime && (this.time = this.startTime);
	    }
	  }]);

	  return LineTripLayer;
	}(Layer);

	var slice$1 = [].slice;
	var MSIE = /MSIE .\./.test(engineUserAgent); // <- dirty ie9- check

	var wrap = function (scheduler) {
	  return function (handler, timeout
	  /* , ...arguments */
	  ) {
	    var boundArgs = arguments.length > 2;
	    var args = boundArgs ? slice$1.call(arguments, 2) : undefined;
	    return scheduler(boundArgs ? function () {
	      // eslint-disable-next-line no-new-func
	      (typeof handler == 'function' ? handler : Function(handler)).apply(this, args);
	    } : handler, timeout);
	  };
	}; // ie9- setTimeout & setInterval additional parameters fix
	// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers


	_export({
	  global: true,
	  bind: true,
	  forced: MSIE
	}, {
	  // `setTimeout` method
	  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
	  setTimeout: wrap(global_1.setTimeout),
	  // `setInterval` method
	  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
	  setInterval: wrap(global_1.setInterval)
	});

	var earcut_1 = earcut;
	var _default = earcut;

	function earcut(data, holeIndices, dim) {
	  dim = dim || 2;
	  var hasHoles = holeIndices && holeIndices.length,
	      outerLen = hasHoles ? holeIndices[0] * dim : data.length,
	      outerNode = linkedList(data, 0, outerLen, dim, true),
	      triangles = [];
	  if (!outerNode || outerNode.next === outerNode.prev) return triangles;
	  var minX, minY, maxX, maxY, x, y, invSize;
	  if (hasHoles) outerNode = eliminateHoles(data, holeIndices, outerNode, dim); // if the shape is not too simple, we'll use z-order curve hash later; calculate polygon bbox

	  if (data.length > 80 * dim) {
	    minX = maxX = data[0];
	    minY = maxY = data[1];

	    for (var i = dim; i < outerLen; i += dim) {
	      x = data[i];
	      y = data[i + 1];
	      if (x < minX) minX = x;
	      if (y < minY) minY = y;
	      if (x > maxX) maxX = x;
	      if (y > maxY) maxY = y;
	    } // minX, minY and invSize are later used to transform coords into integers for z-order calculation


	    invSize = Math.max(maxX - minX, maxY - minY);
	    invSize = invSize !== 0 ? 1 / invSize : 0;
	  }

	  earcutLinked(outerNode, triangles, dim, minX, minY, invSize);
	  return triangles;
	} // create a circular doubly linked list from polygon points in the specified winding order


	function linkedList(data, start, end, dim, clockwise) {
	  var i, last;

	  if (clockwise === signedArea(data, start, end, dim) > 0) {
	    for (i = start; i < end; i += dim) last = insertNode(i, data[i], data[i + 1], last);
	  } else {
	    for (i = end - dim; i >= start; i -= dim) last = insertNode(i, data[i], data[i + 1], last);
	  }

	  if (last && equals(last, last.next)) {
	    removeNode(last);
	    last = last.next;
	  }

	  return last;
	} // eliminate colinear or duplicate points


	function filterPoints(start, end) {
	  if (!start) return start;
	  if (!end) end = start;
	  var p = start,
	      again;

	  do {
	    again = false;

	    if (!p.steiner && (equals(p, p.next) || area(p.prev, p, p.next) === 0)) {
	      removeNode(p);
	      p = end = p.prev;
	      if (p === p.next) break;
	      again = true;
	    } else {
	      p = p.next;
	    }
	  } while (again || p !== end);

	  return end;
	} // main ear slicing loop which triangulates a polygon (given as a linked list)


	function earcutLinked(ear, triangles, dim, minX, minY, invSize, pass) {
	  if (!ear) return; // interlink polygon nodes in z-order

	  if (!pass && invSize) indexCurve(ear, minX, minY, invSize);
	  var stop = ear,
	      prev,
	      next; // iterate through ears, slicing them one by one

	  while (ear.prev !== ear.next) {
	    prev = ear.prev;
	    next = ear.next;

	    if (invSize ? isEarHashed(ear, minX, minY, invSize) : isEar(ear)) {
	      // cut off the triangle
	      triangles.push(prev.i / dim);
	      triangles.push(ear.i / dim);
	      triangles.push(next.i / dim);
	      removeNode(ear); // skipping the next vertex leads to less sliver triangles

	      ear = next.next;
	      stop = next.next;
	      continue;
	    }

	    ear = next; // if we looped through the whole remaining polygon and can't find any more ears

	    if (ear === stop) {
	      // try filtering points and slicing again
	      if (!pass) {
	        earcutLinked(filterPoints(ear), triangles, dim, minX, minY, invSize, 1); // if this didn't work, try curing all small self-intersections locally
	      } else if (pass === 1) {
	        ear = cureLocalIntersections(filterPoints(ear), triangles, dim);
	        earcutLinked(ear, triangles, dim, minX, minY, invSize, 2); // as a last resort, try splitting the remaining polygon into two
	      } else if (pass === 2) {
	        splitEarcut(ear, triangles, dim, minX, minY, invSize);
	      }

	      break;
	    }
	  }
	} // check whether a polygon node forms a valid ear with adjacent nodes


	function isEar(ear) {
	  var a = ear.prev,
	      b = ear,
	      c = ear.next;
	  if (area(a, b, c) >= 0) return false; // reflex, can't be an ear
	  // now make sure we don't have other points inside the potential ear

	  var p = ear.next.next;

	  while (p !== ear.prev) {
	    if (pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) && area(p.prev, p, p.next) >= 0) return false;
	    p = p.next;
	  }

	  return true;
	}

	function isEarHashed(ear, minX, minY, invSize) {
	  var a = ear.prev,
	      b = ear,
	      c = ear.next;
	  if (area(a, b, c) >= 0) return false; // reflex, can't be an ear
	  // triangle bbox; min & max are calculated like this for speed

	  var minTX = a.x < b.x ? a.x < c.x ? a.x : c.x : b.x < c.x ? b.x : c.x,
	      minTY = a.y < b.y ? a.y < c.y ? a.y : c.y : b.y < c.y ? b.y : c.y,
	      maxTX = a.x > b.x ? a.x > c.x ? a.x : c.x : b.x > c.x ? b.x : c.x,
	      maxTY = a.y > b.y ? a.y > c.y ? a.y : c.y : b.y > c.y ? b.y : c.y; // z-order range for the current triangle bbox;

	  var minZ = zOrder(minTX, minTY, minX, minY, invSize),
	      maxZ = zOrder(maxTX, maxTY, minX, minY, invSize);
	  var p = ear.prevZ,
	      n = ear.nextZ; // look for points inside the triangle in both directions

	  while (p && p.z >= minZ && n && n.z <= maxZ) {
	    if (p !== ear.prev && p !== ear.next && pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) && area(p.prev, p, p.next) >= 0) return false;
	    p = p.prevZ;
	    if (n !== ear.prev && n !== ear.next && pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, n.x, n.y) && area(n.prev, n, n.next) >= 0) return false;
	    n = n.nextZ;
	  } // look for remaining points in decreasing z-order


	  while (p && p.z >= minZ) {
	    if (p !== ear.prev && p !== ear.next && pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) && area(p.prev, p, p.next) >= 0) return false;
	    p = p.prevZ;
	  } // look for remaining points in increasing z-order


	  while (n && n.z <= maxZ) {
	    if (n !== ear.prev && n !== ear.next && pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, n.x, n.y) && area(n.prev, n, n.next) >= 0) return false;
	    n = n.nextZ;
	  }

	  return true;
	} // go through all polygon nodes and cure small local self-intersections


	function cureLocalIntersections(start, triangles, dim) {
	  var p = start;

	  do {
	    var a = p.prev,
	        b = p.next.next;

	    if (!equals(a, b) && intersects(a, p, p.next, b) && locallyInside(a, b) && locallyInside(b, a)) {
	      triangles.push(a.i / dim);
	      triangles.push(p.i / dim);
	      triangles.push(b.i / dim); // remove two nodes involved

	      removeNode(p);
	      removeNode(p.next);
	      p = start = b;
	    }

	    p = p.next;
	  } while (p !== start);

	  return filterPoints(p);
	} // try splitting polygon into two and triangulate them independently


	function splitEarcut(start, triangles, dim, minX, minY, invSize) {
	  // look for a valid diagonal that divides the polygon into two
	  var a = start;

	  do {
	    var b = a.next.next;

	    while (b !== a.prev) {
	      if (a.i !== b.i && isValidDiagonal(a, b)) {
	        // split the polygon in two by the diagonal
	        var c = splitPolygon(a, b); // filter colinear points around the cuts

	        a = filterPoints(a, a.next);
	        c = filterPoints(c, c.next); // run earcut on each half

	        earcutLinked(a, triangles, dim, minX, minY, invSize);
	        earcutLinked(c, triangles, dim, minX, minY, invSize);
	        return;
	      }

	      b = b.next;
	    }

	    a = a.next;
	  } while (a !== start);
	} // link every hole into the outer loop, producing a single-ring polygon without holes


	function eliminateHoles(data, holeIndices, outerNode, dim) {
	  var queue = [],
	      i,
	      len,
	      start,
	      end,
	      list;

	  for (i = 0, len = holeIndices.length; i < len; i++) {
	    start = holeIndices[i] * dim;
	    end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;
	    list = linkedList(data, start, end, dim, false);
	    if (list === list.next) list.steiner = true;
	    queue.push(getLeftmost(list));
	  }

	  queue.sort(compareX); // process holes from left to right

	  for (i = 0; i < queue.length; i++) {
	    eliminateHole(queue[i], outerNode);
	    outerNode = filterPoints(outerNode, outerNode.next);
	  }

	  return outerNode;
	}

	function compareX(a, b) {
	  return a.x - b.x;
	} // find a bridge between vertices that connects hole with an outer ring and and link it


	function eliminateHole(hole, outerNode) {
	  outerNode = findHoleBridge(hole, outerNode);

	  if (outerNode) {
	    var b = splitPolygon(outerNode, hole); // filter collinear points around the cuts

	    filterPoints(outerNode, outerNode.next);
	    filterPoints(b, b.next);
	  }
	} // David Eberly's algorithm for finding a bridge between hole and outer polygon


	function findHoleBridge(hole, outerNode) {
	  var p = outerNode,
	      hx = hole.x,
	      hy = hole.y,
	      qx = -Infinity,
	      m; // find a segment intersected by a ray from the hole's leftmost point to the left;
	  // segment's endpoint with lesser x will be potential connection point

	  do {
	    if (hy <= p.y && hy >= p.next.y && p.next.y !== p.y) {
	      var x = p.x + (hy - p.y) * (p.next.x - p.x) / (p.next.y - p.y);

	      if (x <= hx && x > qx) {
	        qx = x;

	        if (x === hx) {
	          if (hy === p.y) return p;
	          if (hy === p.next.y) return p.next;
	        }

	        m = p.x < p.next.x ? p : p.next;
	      }
	    }

	    p = p.next;
	  } while (p !== outerNode);

	  if (!m) return null;
	  if (hx === qx) return m; // hole touches outer segment; pick leftmost endpoint
	  // look for points inside the triangle of hole point, segment intersection and endpoint;
	  // if there are no points found, we have a valid connection;
	  // otherwise choose the point of the minimum angle with the ray as connection point

	  var stop = m,
	      mx = m.x,
	      my = m.y,
	      tanMin = Infinity,
	      tan;
	  p = m;

	  do {
	    if (hx >= p.x && p.x >= mx && hx !== p.x && pointInTriangle(hy < my ? hx : qx, hy, mx, my, hy < my ? qx : hx, hy, p.x, p.y)) {
	      tan = Math.abs(hy - p.y) / (hx - p.x); // tangential

	      if (locallyInside(p, hole) && (tan < tanMin || tan === tanMin && (p.x > m.x || p.x === m.x && sectorContainsSector(m, p)))) {
	        m = p;
	        tanMin = tan;
	      }
	    }

	    p = p.next;
	  } while (p !== stop);

	  return m;
	} // whether sector in vertex m contains sector in vertex p in the same coordinates


	function sectorContainsSector(m, p) {
	  return area(m.prev, m, p.prev) < 0 && area(p.next, m, m.next) < 0;
	} // interlink polygon nodes in z-order


	function indexCurve(start, minX, minY, invSize) {
	  var p = start;

	  do {
	    if (p.z === null) p.z = zOrder(p.x, p.y, minX, minY, invSize);
	    p.prevZ = p.prev;
	    p.nextZ = p.next;
	    p = p.next;
	  } while (p !== start);

	  p.prevZ.nextZ = null;
	  p.prevZ = null;
	  sortLinked(p);
	} // Simon Tatham's linked list merge sort algorithm
	// http://www.chiark.greenend.org.uk/~sgtatham/algorithms/listsort.html


	function sortLinked(list) {
	  var i,
	      p,
	      q,
	      e,
	      tail,
	      numMerges,
	      pSize,
	      qSize,
	      inSize = 1;

	  do {
	    p = list;
	    list = null;
	    tail = null;
	    numMerges = 0;

	    while (p) {
	      numMerges++;
	      q = p;
	      pSize = 0;

	      for (i = 0; i < inSize; i++) {
	        pSize++;
	        q = q.nextZ;
	        if (!q) break;
	      }

	      qSize = inSize;

	      while (pSize > 0 || qSize > 0 && q) {
	        if (pSize !== 0 && (qSize === 0 || !q || p.z <= q.z)) {
	          e = p;
	          p = p.nextZ;
	          pSize--;
	        } else {
	          e = q;
	          q = q.nextZ;
	          qSize--;
	        }

	        if (tail) tail.nextZ = e;else list = e;
	        e.prevZ = tail;
	        tail = e;
	      }

	      p = q;
	    }

	    tail.nextZ = null;
	    inSize *= 2;
	  } while (numMerges > 1);

	  return list;
	} // z-order of a point given coords and inverse of the longer side of data bbox


	function zOrder(x, y, minX, minY, invSize) {
	  // coords are transformed into non-negative 15-bit integer range
	  x = 32767 * (x - minX) * invSize;
	  y = 32767 * (y - minY) * invSize;
	  x = (x | x << 8) & 0x00FF00FF;
	  x = (x | x << 4) & 0x0F0F0F0F;
	  x = (x | x << 2) & 0x33333333;
	  x = (x | x << 1) & 0x55555555;
	  y = (y | y << 8) & 0x00FF00FF;
	  y = (y | y << 4) & 0x0F0F0F0F;
	  y = (y | y << 2) & 0x33333333;
	  y = (y | y << 1) & 0x55555555;
	  return x | y << 1;
	} // find the leftmost node of a polygon ring


	function getLeftmost(start) {
	  var p = start,
	      leftmost = start;

	  do {
	    if (p.x < leftmost.x || p.x === leftmost.x && p.y < leftmost.y) leftmost = p;
	    p = p.next;
	  } while (p !== start);

	  return leftmost;
	} // check if a point lies within a convex triangle


	function pointInTriangle(ax, ay, bx, by, cx, cy, px, py) {
	  return (cx - px) * (ay - py) - (ax - px) * (cy - py) >= 0 && (ax - px) * (by - py) - (bx - px) * (ay - py) >= 0 && (bx - px) * (cy - py) - (cx - px) * (by - py) >= 0;
	} // check if a diagonal between two polygon nodes is valid (lies in polygon interior)


	function isValidDiagonal(a, b) {
	  return a.next.i !== b.i && a.prev.i !== b.i && !intersectsPolygon(a, b) && ( // dones't intersect other edges
	  locallyInside(a, b) && locallyInside(b, a) && middleInside(a, b) && ( // locally visible
	  area(a.prev, a, b.prev) || area(a, b.prev, b)) || // does not create opposite-facing sectors
	  equals(a, b) && area(a.prev, a, a.next) > 0 && area(b.prev, b, b.next) > 0); // special zero-length case
	} // signed area of a triangle


	function area(p, q, r) {
	  return (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
	} // check if two points are equal


	function equals(p1, p2) {
	  return p1.x === p2.x && p1.y === p2.y;
	} // check if two segments intersect


	function intersects(p1, q1, p2, q2) {
	  var o1 = sign(area(p1, q1, p2));
	  var o2 = sign(area(p1, q1, q2));
	  var o3 = sign(area(p2, q2, p1));
	  var o4 = sign(area(p2, q2, q1));
	  if (o1 !== o2 && o3 !== o4) return true; // general case

	  if (o1 === 0 && onSegment(p1, p2, q1)) return true; // p1, q1 and p2 are collinear and p2 lies on p1q1

	  if (o2 === 0 && onSegment(p1, q2, q1)) return true; // p1, q1 and q2 are collinear and q2 lies on p1q1

	  if (o3 === 0 && onSegment(p2, p1, q2)) return true; // p2, q2 and p1 are collinear and p1 lies on p2q2

	  if (o4 === 0 && onSegment(p2, q1, q2)) return true; // p2, q2 and q1 are collinear and q1 lies on p2q2

	  return false;
	} // for collinear points p, q, r, check if point q lies on segment pr


	function onSegment(p, q, r) {
	  return q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) && q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y);
	}

	function sign(num) {
	  return num > 0 ? 1 : num < 0 ? -1 : 0;
	} // check if a polygon diagonal intersects any polygon segments


	function intersectsPolygon(a, b) {
	  var p = a;

	  do {
	    if (p.i !== a.i && p.next.i !== a.i && p.i !== b.i && p.next.i !== b.i && intersects(p, p.next, a, b)) return true;
	    p = p.next;
	  } while (p !== a);

	  return false;
	} // check if a polygon diagonal is locally inside the polygon


	function locallyInside(a, b) {
	  return area(a.prev, a, a.next) < 0 ? area(a, b, a.next) >= 0 && area(a, a.prev, b) >= 0 : area(a, b, a.prev) < 0 || area(a, a.next, b) < 0;
	} // check if the middle point of a polygon diagonal is inside the polygon


	function middleInside(a, b) {
	  var p = a,
	      inside = false,
	      px = (a.x + b.x) / 2,
	      py = (a.y + b.y) / 2;

	  do {
	    if (p.y > py !== p.next.y > py && p.next.y !== p.y && px < (p.next.x - p.x) * (py - p.y) / (p.next.y - p.y) + p.x) inside = !inside;
	    p = p.next;
	  } while (p !== a);

	  return inside;
	} // link two polygon vertices with a bridge; if the vertices belong to the same ring, it splits polygon into two;
	// if one belongs to the outer ring and another to a hole, it merges it into a single ring


	function splitPolygon(a, b) {
	  var a2 = new Node(a.i, a.x, a.y),
	      b2 = new Node(b.i, b.x, b.y),
	      an = a.next,
	      bp = b.prev;
	  a.next = b;
	  b.prev = a;
	  a2.next = an;
	  an.prev = a2;
	  b2.next = a2;
	  a2.prev = b2;
	  bp.next = b2;
	  b2.prev = bp;
	  return b2;
	} // create a node and optionally link it with previous one (in a circular doubly linked list)


	function insertNode(i, x, y, last) {
	  var p = new Node(i, x, y);

	  if (!last) {
	    p.prev = p;
	    p.next = p;
	  } else {
	    p.next = last.next;
	    p.prev = last;
	    last.next.prev = p;
	    last.next = p;
	  }

	  return p;
	}

	function removeNode(p) {
	  p.next.prev = p.prev;
	  p.prev.next = p.next;
	  if (p.prevZ) p.prevZ.nextZ = p.nextZ;
	  if (p.nextZ) p.nextZ.prevZ = p.prevZ;
	}

	function Node(i, x, y) {
	  // vertex index in coordinates array
	  this.i = i; // vertex coordinates

	  this.x = x;
	  this.y = y; // previous and next vertex nodes in a polygon ring

	  this.prev = null;
	  this.next = null; // z-order curve value

	  this.z = null; // previous and next nodes in z-order

	  this.prevZ = null;
	  this.nextZ = null; // indicates whether this is a steiner point

	  this.steiner = false;
	} // return a percentage difference between the polygon area and its triangulation area;
	// used to verify correctness of triangulation


	earcut.deviation = function (data, holeIndices, dim, triangles) {
	  var hasHoles = holeIndices && holeIndices.length;
	  var outerLen = hasHoles ? holeIndices[0] * dim : data.length;
	  var polygonArea = Math.abs(signedArea(data, 0, outerLen, dim));

	  if (hasHoles) {
	    for (var i = 0, len = holeIndices.length; i < len; i++) {
	      var start = holeIndices[i] * dim;
	      var end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;
	      polygonArea -= Math.abs(signedArea(data, start, end, dim));
	    }
	  }

	  var trianglesArea = 0;

	  for (i = 0; i < triangles.length; i += 3) {
	    var a = triangles[i] * dim;
	    var b = triangles[i + 1] * dim;
	    var c = triangles[i + 2] * dim;
	    trianglesArea += Math.abs((data[a] - data[c]) * (data[b + 1] - data[a + 1]) - (data[a] - data[b]) * (data[c + 1] - data[a + 1]));
	  }

	  return polygonArea === 0 && trianglesArea === 0 ? 0 : Math.abs((trianglesArea - polygonArea) / polygonArea);
	};

	function signedArea(data, start, end, dim) {
	  var sum = 0;

	  for (var i = start, j = end - dim; i < end; i += dim) {
	    sum += (data[j] - data[i]) * (data[i + 1] + data[j + 1]);
	    j = i;
	  }

	  return sum;
	} // turn a polygon in a multi-dimensional array form (e.g. as in GeoJSON) into a form Earcut accepts


	earcut.flatten = function (data) {
	  var dim = data[0][0].length,
	      result = {
	    vertices: [],
	    holes: [],
	    dimensions: dim
	  },
	      holeIndex = 0;

	  for (var i = 0; i < data.length; i++) {
	    for (var j = 0; j < data[i].length; j++) {
	      for (var d = 0; d < dim; d++) result.vertices.push(data[i][j][d]);
	    }

	    if (i > 0) {
	      holeIndex += data[i - 1].length;
	      result.holes.push(holeIndex);
	    }
	  }

	  return result;
	};
	earcut_1.default = _default;

	var ShapeMgr = /*#__PURE__*/function () {
	  function ShapeMgr(shapeLayer, gl) {
	    _classCallCheck(this, ShapeMgr);

	    this.shapeLayer = shapeLayer;
	    this.gl = gl;
	    this.initData();
	  }

	  _createClass(ShapeMgr, [{
	    key: "initData",
	    value: function initData() {
	      this.outBuilding3d = {
	        pickColorVertex: [],
	        vertex: [],
	        texture: [],
	        color: [],
	        height: [],
	        index: []
	      };
	    }
	  }, {
	    key: "getData",
	    value: function getData() {
	      return this.outBuilding3d;
	    }
	  }, {
	    key: "parseData",
	    value: function parseData(dataArray) {
	      var _this = this;

	      this.initData();
	      var options = this.shapeLayer.getOptions();

	      for (var i = 0; i < dataArray.length; i++) {
	        var data = dataArray[i]; // 高度和颜色

	        var baseHeight = +this.shapeLayer.getValue("baseHeight", data) || 0;
	        var height = +this.shapeLayer.getValue("height", data) || 0;
	        var color = this.shapeLayer.normizedColor(this.shapeLayer.getValue("color", data)); // 选中的颜色

	        var pickColor = void 0;
	        options.enablePicked && (pickColor = this.shapeLayer.indexToRgb(i)); // 开始自增高的高度和颜色

	        var preHeight = void 0,
	            preColor = void 0;

	        if (options.riseTime) {
	          preHeight = +this.shapeLayer.getValue("preHeight", data) || 0;
	          preColor = this.shapeLayer.normizedColor(this.shapeLayer.getValue("preColor", data));
	        }

	        var coords = data.geometry.coordinates;

	        if (coords) {
	          if ("MultiPolygon" === data.geometry.type) ; else {
	            coords = [coords];
	          } // 为多边形构建面数据


	          for (var j = 0; j < coords.length; j++) {
	            var coord = coords[j].map(function (cc) {
	              return cc.map(function (b) {
	                return _this.shapeLayer.normizedPoint(b);
	              });
	            });

	            var _data = earcut_1.flatten(coord); // 高度转换


	            var point = coords[j][0][0];

	            var _baseHeight = this.shapeLayer.normizedHeight(baseHeight, point),
	                _height = this.shapeLayer.normizedHeight(height, point),
	                _preHeight = this.shapeLayer.normizedHeight(preHeight, point);

	            this.parseBuilding3d(_data, _preHeight, _baseHeight, _height, preColor, color, pickColor, this.outBuilding3d);
	          }
	        }
	      }
	    }
	  }, {
	    key: "getBounds",
	    value: function getBounds(vertices) {
	      var minX = vertices[0],
	          minY = vertices[1],
	          maxX = vertices[0],
	          maxY = vertices[1];

	      for (var i = 0; i < vertices.length; i += 3) {
	        minX = Math.min(vertices[i], minX);
	        minY = Math.min(vertices[i + 1], minY);
	        maxX = Math.max(vertices[i], maxX);
	        maxY = Math.max(vertices[i + 1], maxY);
	      }

	      return {
	        minX: minX,
	        minY: minY,
	        maxX: maxX,
	        maxY: maxY,
	        width: maxX - minX,
	        height: maxY - minY
	      };
	    }
	  }, {
	    key: "parseBuilding3d",
	    value: function parseBuilding3d(data, preHeight, baseHeight, height, preColor, color, pickColor, h) {
	      preHeight = preHeight !== undefined ? preHeight : height;
	      preColor = preColor !== undefined ? preColor : color;
	      var options = this.shapeLayer.getOptions(),
	          isUseTexture = this.shapeLayer.isUseTexture,
	          vertexArray = h.vertex,
	          textureArray = h.texture,
	          colorArray = h.color,
	          heightArray = h.height,
	          pickColorVertexArray = h.pickColorVertex,
	          indexArray = h.index;
	      var isTextureFull = options.isTextureFull;
	      var t_w = 0,
	          t_h = 0,
	          top_t_w = 0,
	          top_t_h = 0;
	      var gl = this.shapeLayer.gl;
	      var glTexture = gl.textureManager.get(options.texture);
	      var topGlTexture = gl.textureManager.get(options.topTexture);

	      if (glTexture && !isTextureFull) {
	        t_w = this.shapeLayer.normizedHeight(glTexture.width * options.textureScale);
	        t_h = this.shapeLayer.normizedHeight(glTexture.height * options.textureScale);
	      }

	      if (topGlTexture && !isTextureFull) {
	        top_t_w = this.shapeLayer.normizedHeight(topGlTexture.width * options.textureScale);
	        top_t_h = this.shapeLayer.normizedHeight(topGlTexture.height * options.textureScale);
	      } else {
	        top_t_w = t_w;
	        top_t_h = t_h;
	      }

	      var vertices = data.vertices,
	          holes = data.holes; // 房顶

	      if ("gradual" !== options.style) {
	        var indices = earcut_1(vertices, holes, 3);
	        var index1 = indices[0],
	            index2 = indices[1],
	            index3 = indices[2];
	        var p1 = [vertices[3 * index1], vertices[3 * index1 + 1], 1];
	        var p2 = [vertices[3 * index2], vertices[3 * index2 + 1], 1];
	        var p3 = [vertices[3 * index3], vertices[3 * index3 + 1], 1];
	        var normal = normalize$1([], cross([], sub([], p3, p2), sub([], p1, p2)));
	        var bound;

	        if (isUseTexture) {
	          bound = this.getBounds(vertices);
	        } // 当前开始的索引


	        var startIndex = vertexArray.length / 7; // 存入顶点信息

	        for (var i = 0; i < vertices.length; i += 3) {
	          vertexArray.push(vertices[i], vertices[i + 1], vertices[i + 2], 1, normal[0], normal[1], normal[2]);
	          colorArray.push(color[0], color[1], color[2], color[3], preColor[0], preColor[1], preColor[2], preColor[3]);
	          heightArray.push(baseHeight, height, preHeight);

	          if (isUseTexture) {
	            if (isTextureFull) {
	              textureArray.push((vertices[i] - bound.minX) / bound.width);
	              textureArray.push((vertices[i + 1] - bound.minY) / bound.height);
	            } else {
	              textureArray.push((vertices[i] - bound.minX) / top_t_w);
	              textureArray.push((vertices[i + 1] - bound.minY) / top_t_h);
	            }
	          }

	          if (pickColor) {
	            pickColorVertexArray.push(pickColor[0] / 255, pickColor[1] / 255, pickColor[2] / 255);
	          }
	        } // 存入多边形索引信息


	        for (var _i = 0; _i < indices.length; _i++) {
	          indexArray.push(indices[_i] + startIndex);
	        }
	      } // 无效高度（负值高度）


	      if (height === preHeight && height <= 0) {
	        return;
	      } // 墙面


	      for (var _i2 = 0; _i2 < vertices.length; _i2 += 3) {
	        // 开始的顶点位置
	        var _startIndex = vertexArray.length / 7; // 当前顶点坐标


	        var x = vertices[_i2],
	            y = vertices[_i2 + 1],
	            z = vertices[_i2 + 2]; // 顶点坐标和底部坐标

	        var p = [x, y, z, 0],
	            t_p = [x, y, z, 1]; // 下个顶点的坐标

	        var j = _i2 + 3;
	        var holeIndex = holes.indexOf(j / 3);

	        if (holeIndex !== -1) {
	          continue;
	        }

	        var n_x = vertices[j],
	            n_y = vertices[j + 1],
	            n_z = vertices[j + 2];
	        var n_p = [n_x, n_y, n_z, 0],
	            n_t_p = [n_x, n_y, n_z, 1];
	        var ll = Math.sqrt(Math.pow(n_x - x, 2), Math.pow(n_y - y, 2));

	        var _normal = normalize$1([], cross([], sub([], n_p, p), sub([], t_p, p))); // 如果是无方向向量


	        if (_normal[0] === 0 && _normal[1] === 0 && _normal[1] === 0) {
	          _normal = normalize$1([], sub([], n_p, p));
	          _normal = [_normal[1], -_normal[0], 0];
	        } // 顶点


	        vertexArray.push(p[0], p[1], p[2], p[3]);
	        vertexArray.push(_normal[0], _normal[1], _normal[2]);
	        vertexArray.push(t_p[0], t_p[1], t_p[2], t_p[3]);
	        vertexArray.push(_normal[0], _normal[1], _normal[2]);
	        vertexArray.push(n_p[0], n_p[1], n_p[2], n_p[3]);
	        vertexArray.push(_normal[0], _normal[1], _normal[2]);
	        vertexArray.push(n_t_p[0], n_t_p[1], n_t_p[2], n_t_p[3]);
	        vertexArray.push(_normal[0], _normal[1], _normal[2]); // 颜色

	        colorArray.push(color[0], color[1], color[2], color[3]);
	        colorArray.push(preColor[0], preColor[1], preColor[2], preColor[3]);
	        colorArray.push(color[0], color[1], color[2], color[3]);
	        colorArray.push(preColor[0], preColor[1], preColor[2], preColor[3]);
	        colorArray.push(color[0], color[1], color[2], color[3]);
	        colorArray.push(preColor[0], preColor[1], preColor[2], preColor[3]);
	        colorArray.push(color[0], color[1], color[2], color[3]);
	        colorArray.push(preColor[0], preColor[1], preColor[2], preColor[3]); // 高度

	        heightArray.push(baseHeight, height, preHeight);
	        heightArray.push(baseHeight, height, preHeight);
	        heightArray.push(baseHeight, height, preHeight);
	        heightArray.push(baseHeight, height, preHeight); // 纹理

	        if (isUseTexture) {
	          if (isTextureFull) {
	            textureArray.push(0, 0);
	            textureArray.push(0, 1);
	            textureArray.push(1, 0);
	            textureArray.push(1, 1);
	          } else {
	            textureArray.push(0, 0);
	            textureArray.push(0, height / t_h);
	            textureArray.push(ll / t_w, 0);
	            textureArray.push(ll / t_w, height / t_h);
	          }
	        } // pick用颜色


	        if (pickColor) {
	          pickColorVertexArray.push(pickColor[0] / 255, pickColor[1] / 255, pickColor[2] / 255);
	          pickColorVertexArray.push(pickColor[0] / 255, pickColor[1] / 255, pickColor[2] / 255);
	          pickColorVertexArray.push(pickColor[0] / 255, pickColor[1] / 255, pickColor[2] / 255);
	          pickColorVertexArray.push(pickColor[0] / 255, pickColor[1] / 255, pickColor[2] / 255);
	        } // 多边形索引
	        // 1 --- 3
	        // |     |
	        // 0 --- 2


	        indexArray.push(_startIndex, _startIndex + 2, _startIndex + 3, _startIndex, _startIndex + 3, _startIndex + 1);
	      }
	    }
	  }]);

	  return ShapeMgr;
	}();

	var LayerStyles = {
	  window: 1,
	  windowAnimation: 2,
	  gradual: 3,
	  water: 6
	};
	/**
	 * @classdesc
	 * 
	 * 用来展示大数据的立体多边形，继承自 Layer
	 * 可使用鼠标拾取 Pick
	 * 
	 * @extends Layer
	 * 
	 * @param {Object} options
	 * @param {Number | Function=} [options.baseHeight=0] 基准高度
	 * @param {Number | Function=} [options.height=0] 高度
	 * @param {String | Function=} [options.color='rgba(25, 25, 250, 1)'] 颜色
	 * @param {String} options.topColor 顶部颜色
	 * @param {Number=} [options.opacity=1] 整体透明度
	 * @param {String | HTMLImageElement=} options.texture 默认贴图
	 * @param {String | HTMLImageElement=} options.topTexture 顶部贴图
	 * @param {Boolean=} [options.isTextureFull=false] 是否为整面贴图
	 * @param {Number=} [options.textureScale=1] 贴图缩放比例，只对非整面贴图模式有效
	 * @param {String=} options.blend 颜色叠加模式，可选lighter
	 * @param {Number=} [options.riseTime=0] 楼块初始化升起动画的时间，单位毫秒
	 * @param {String=} [options.style='normal']
	 * 解释：一些特效 </br>
	 * 可选值： </br>
	 * normal，默认，正常 </br>
	 * window，窗户效果 </br>
	 * windowAnimation，窗户动画效果 </br>
	 * gradual，渐变效果 </br>
	 * @param {Boolean=} [options.useLight=true] 是否使用光照效果
	 * @param {Array.<Number>=} [options.lightDir=[0, -1, 2]] 侧面光照方位向量
	 */

	var ShapeLayer = /*#__PURE__*/function (_Layer) {
	  _inherits(ShapeLayer, _Layer);

	  var _super = _createSuper(ShapeLayer);

	  function ShapeLayer(options) {
	    var _this;

	    _classCallCheck(this, ShapeLayer);

	    _this = _super.call(this, options); // 判断是否需要自动更新

	    if ("windowAnimation" === _this.options.style || 0 < _this.options.riseTime) {
	      _this.autoUpdate = true;
	    }

	    _this.textureLoaded = false;
	    return _this;
	  }

	  _createClass(ShapeLayer, [{
	    key: "getDefaultOptions",
	    value: function getDefaultOptions() {
	      return {
	        color: "rgba(50, 50, 230, 1.0)",
	        opacity: 1.0,
	        isTextureFull: false,
	        textureScale: 1,
	        useLight: true,
	        riseTime: 0
	      };
	    }
	  }, {
	    key: "initialize",
	    value: function initialize(gl) {
	      this.dataMgr = new ShapeMgr(this, gl);
	      this.isUseTexture = false; // program

	      this.program = new Program(gl, {
	        shaderId: "shape",
	        defines: this.options.enablePicked ? ["PICK"] : []
	      }, this); // vao

	      this.vao = new VertexArrayObject(); // init Time

	      this.initializeTime = new Date();
	    }
	  }, {
	    key: "updateBuffer",
	    value: function updateBuffer(dataMgr) {
	      var gl = this.gl;
	      var _dataMgr$outBuilding = dataMgr.outBuilding3d,
	          vertex = _dataMgr$outBuilding.vertex,
	          color = _dataMgr$outBuilding.color,
	          height = _dataMgr$outBuilding.height,
	          texture = _dataMgr$outBuilding.texture,
	          index = _dataMgr$outBuilding.index,
	          pickColorVertex = _dataMgr$outBuilding.pickColorVertex;
	      this.vertexBuffers = [// point
	      new VertexBuffer({
	        gl: gl,
	        data: vertex,
	        attributes: [{
	          name: "a_pos",
	          size: 4
	        }, {
	          name: "a_normal",
	          size: 3
	        }]
	      }), // color
	      new VertexBuffer({
	        gl: gl,
	        data: color,
	        attributes: [{
	          name: "a_color",
	          size: 4
	        }, {
	          name: "a_pre_color",
	          size: 4
	        }]
	      }), // height
	      new VertexBuffer({
	        gl: gl,
	        data: height,
	        attributes: [{
	          name: "a_base_height",
	          size: 1
	        }, {
	          name: "a_height",
	          size: 1
	        }, {
	          name: "a_pre_height",
	          size: 1
	        }]
	      }), // texure
	      new VertexBuffer({
	        gl: gl,
	        data: texture,
	        attributes: [{
	          name: "a_texture_coord",
	          size: 2
	        }]
	      })].concat(_toConsumableArray(this.getCommonBuffers({
	        pickData: pickColorVertex
	      })));
	      this.indexBuffer = new IndexBuffer({
	        gl: gl,
	        data: index
	      });
	    }
	  }, {
	    key: "onChanged",
	    value: function onChanged(options, dataArray) {
	      var _this2 = this;

	      if (this.gl) {
	        this.loadTextureTime && clearTimeout(this.loadTextureTime);
	        this.textureLoaded = false;
	        this.loadTextureTime = setTimeout(function () {
	          _this2.loadTexture(function () {
	            _this2.textureLoaded = true;

	            _this2.dataMgr.parseData(dataArray);

	            _this2.updateBuffer(_this2.dataMgr);

	            _this2.dataTime = new Date();

	            _this2.webglLayer.render();
	          });
	        }, 0);
	      }
	    }
	  }, {
	    key: "render",
	    value: function render(transferOptions) {
	      var gl = transferOptions.gl,
	          matrix = transferOptions.matrix;

	      if (this.indexBuffer && this.indexBuffer.numberOfIndices > 0) {
	        var options = this.getOptions();
	        var program = this.program;
	        program.use(gl);

	        if (!this.isUseTexture || this.textureLoaded) {
	          // 渲染类型
	          var style = LayerStyles[options.style] || 0; // 光照相关参数

	          var light_dir = [0, -1, 2];

	          if (options.lightDir) {
	            light_dir = [options.lightDir[0] || 0, options.lightDir[1] || 0, options.lightDir[2] || 0];
	          } // 禁用背面切除


	          gl.disable(gl.CULL_FACE); // 混合模式

	          if (options.blend) {
	            gl.enable(gl.BLEND);
	            gl.blendFunc(gl.ONE, gl.ONE);
	            gl.blendEquation(gl.FUNC_ADD);
	          } // 如果高度为 0


	          if (0 === options.height) {
	            gl.enable(gl.BLEND);
	            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
	          } // 如果是渐变墙体模式


	          if (3 === style) {
	            gl.depthMask(false);
	            gl.enable(gl.BLEND);
	            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
	          } else {
	            gl.depthMask(true);
	          } // 设置uniforms


	          program.setUniforms(Object.assign(this.getCommonUniforms(transferOptions), {
	            u_matrix: matrix,
	            u_zoom_unit: this.normizedHeight(1, this.map.getCenter()),
	            // defines
	            defines: {
	              useLight: options.useLight,
	              useTexture: this.isUseTexture,
	              useTopTexture: !!options.topTexture,
	              useTopColor: !!options.topColor
	            },
	            // 渲染模式和通用渲染颜色
	            u_style: style,
	            u_alpha: parseFloat(options.opacity),
	            // 纹理相关
	            u_sampler: this.gl.textureManager.get(options.texture),
	            u_top_sampler: this.gl.textureManager.get(options.topTexture),
	            u_top_color: this.normizedColor(options.topColor),
	            // 光照相关
	            u_side_light_dir: light_dir,
	            // 时间相关
	            u_time: new Date() - this.initializeTime,
	            u_dataTime: new Date() - this.dataTime,
	            u_riseTime: options.riseTime
	          }));
	          this.vao.bind({
	            gl: gl,
	            program: program,
	            vertexBuffers: this.vertexBuffers,
	            indexBuffer: this.indexBuffer
	          });
	          gl.drawElements(gl.TRIANGLES, this.indexBuffer.numberOfIndices, this.indexBuffer.indexDatatype, 0);
	        }
	      }
	    }
	  }, {
	    key: "loadTexture",
	    value: function loadTexture(callBack) {
	      var options = this.getOptions();

	      if (options.texture || options.topTexture) {
	        this.isUseTexture = true;
	        this.gl.textureManager.loadAndAdd(function () {
	          callBack && callBack();
	        }, options.texture, options.topTexture);
	      } else {
	        this.isUseTexture = false;
	        callBack && callBack();
	      }
	    }
	  }]);

	  return ShapeLayer;
	}(Layer);

	/**
	 * @classdesc
	 *
	 * 用来展示烟花动画的图层，继承自 Layer
	 *
	 * @extends Layer
	 *
	 * @param {Object} options
	 * @param {String | Function=} [options.color='rgba(250, 25, 25, 1)'] 颜色
	 * @param {Number | Function=} [options.height=100] 颜色
	 * @param {Number=} [options.step=0.1] 动画的速度
	 * @param {Number=} [options.startTime=0] 动画开始时间
	 * @param {Number=} [options.endTime=10] 动画结束时间
	 */

	var SparkLayer = /*#__PURE__*/function (_Layer) {
	  _inherits(SparkLayer, _Layer);

	  var _super = _createSuper(SparkLayer);

	  function SparkLayer(options) {
	    var _this;

	    _classCallCheck(this, SparkLayer);

	    _this = _super.call(this, options);
	    _this.autoUpdate = true;
	    return _this;
	  }

	  _createClass(SparkLayer, [{
	    key: "getDefaultOptions",
	    value: function getDefaultOptions() {
	      return {
	        color: "rgba(250, 25, 25, 1)",
	        trailLength: 3,
	        height: 100,
	        step: 0.1,
	        segs: 10
	      };
	    }
	  }, {
	    key: "setTime",
	    value: function setTime(time) {
	      this.time = time;
	    }
	  }, {
	    key: "initialize",
	    value: function initialize(gl) {
	      this.program = new Program(gl, {
	        shaderId: "spark"
	      }, this); // 顶点相关数据

	      this.vertexBuffer = new VertexBuffer({
	        gl: gl,
	        attributes: [{
	          name: "aPos",
	          size: 4
	        }]
	      });
	      this.vao = new VertexArrayObject();
	    }
	  }, {
	    key: "onChanged",
	    value: function onChanged(options, data) {
	      var gl = this.gl;

	      if (gl) {
	        var arrayData = [],
	            segs = +options.segs || 10;

	        for (var i = 0; i < data.length; i++) {
	          var coord = data[i].geometry.coordinates; // 点

	          var point = this.normizedPoint(coord); // 高度

	          var height = this.normizedPoint([coord[0], coord[1], this.getValue("height", data[i])])[2];

	          for (var h = 0, j = 0; j < segs; j++) {
	            arrayData.push(point[0], point[1], h);
	            0 === point[2] ? arrayData.push(j) : arrayData.push(+point[2]);
	            h += height / segs;
	            arrayData.push(point[0], point[1], h);
	            0 === point[2] ? arrayData.push(j + 1) : arrayData.push(+point[2]);
	          }
	        }

	        this.startTime = +options.startTime || 0;
	        this.endTime = +options.endTime || 10;
	        this.time = this.startTime;
	        this.vertexBuffer.setData(arrayData);
	      }
	    }
	  }, {
	    key: "render",
	    value: function render(transferOptions) {
	      var gl = transferOptions.gl,
	          matrix = transferOptions.matrix;
	      if (this.vertexBuffer.numberOfVertices === 0) return;
	      this.program.use(gl);
	      this.vao.bind({
	        gl: gl,
	        program: this.program,
	        vertexBuffer: this.vertexBuffer
	      });
	      var uniforms = {
	        u_matrix: matrix,
	        uFragColor: this.normizedColor(this.options.color),
	        currentTime: this.time,
	        trailLength: this.options.trailLength
	      };
	      this.program.setUniforms(uniforms);
	      gl.enable(gl.BLEND);
	      gl.polygonOffset(2, 1);
	      gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
	      gl.blendEquation(gl.FUNC_ADD);
	      gl.drawArrays(gl.LINES, 0, this.vertexBuffer.numberOfVertices);
	      this.time += +this.options.step;
	      this.time > 1.5 * this.endTime && (this.time = this.startTime);
	    }
	  }]);

	  return SparkLayer;
	}(Layer);

	/**
	 * @classdesc
	 * 
	 * 雷达扫描效果，继承自 Layer
	 * 
	 * @extends Layer
	 * 
	 * @param {Object} options
	 * @param {String | Function=} [options.color='blue'] 颜色
	 * @param {Number | Function=} [options.totalRadian=Math.PI] 弧度
	 * @param {Number | Function=} [options.radius=50] 半径
	 * @param {Number=} [options.step=0.1] 执行每次动画的步长
	 */

	var FanLayer = /*#__PURE__*/function (_Layer) {
	  _inherits(FanLayer, _Layer);

	  var _super = _createSuper(FanLayer);

	  function FanLayer(options) {
	    var _this;

	    _classCallCheck(this, FanLayer);

	    _this = _super.call(this, options);
	    _this.autoUpdate = true;
	    _this.group = [];
	    _this.time = 0;
	    return _this;
	  }

	  _createClass(FanLayer, [{
	    key: "getDefaultOptions",
	    value: function getDefaultOptions() {
	      return {
	        totalRadian: Math.PI,
	        color: "rgba(255, 5, 5, 1)",
	        radius: 50,
	        step: 0.1
	      };
	    }
	  }, {
	    key: "initialize",
	    value: function initialize(gl) {
	      // 构造program
	      this.program = new Program(gl, {
	        vertexShader: "\n                attribute vec3 aPos;\n                uniform mat4 uMatrix;\n                uniform mat4 uObjMatrix;\n                uniform vec4 glowColor;\n                varying vec4 vFragColor;\n\n                void main() {\n                    gl_Position = uMatrix * uObjMatrix * vec4(aPos.xy, 0, 1.0);\n                    vFragColor = glowColor.a * vec4(glowColor.rgb, pow(aPos.z, 1.3));\n                }",
	        fragmentShader: "\n                varying vec4 vFragColor;\n\n                void main() {\n                    gl_FragColor = vFragColor;\n                }"
	      }, this); // 顶点相关数据

	      this.vertexBuffer = new VertexBuffer({
	        gl: gl,
	        dynamicDraw: true,
	        attributes: [{
	          name: "aPos",
	          size: 3
	        }]
	      });
	      this.vao = new VertexArrayObject();
	    }
	  }, {
	    key: "onChanged",
	    value: function onChanged(options, dataArray) {
	      this.group = [];

	      if (this.gl) {
	        for (var i = 0; i < dataArray.length; i++) {
	          var data = dataArray[i];
	          var coord = data.geometry.coordinates;
	          var radius = +this.getValue("radius", data);
	          var point = this.normizedPoint([coord[0], coord[1], radius]);
	          var bufferData = this.create3dCanvasRipple({
	            // 扇形角度值
	            totalRadian: this.getValue("totalRadian", data),
	            // 半径
	            radius: radius
	          }); // 存入多边形

	          this.group.push({
	            bufferData: bufferData,
	            color: this.normizedColor(this.getValue("color", data)),
	            point: [point[0], point[1], 0],
	            scale: point[2]
	          });
	        }
	      }
	    }
	  }, {
	    key: "create3dCanvasRipple",
	    value: function create3dCanvasRipple(data) {
	      var totalRadian = data.totalRadian,
	          radius = data.radius; // 弧度和半径比

	      var l = totalRadian / Math.max(radius, 20); // 所有顶点

	      var vertices = [];

	      for (var m = l; m <= totalRadian; m += l) {
	        var x = Math.cos(m),
	            y = Math.sin(m);
	        vertices.push([0, 0, m / totalRadian]);
	        vertices.push([x, y, m / totalRadian]);
	      }

	      var arrayData = []; // 构建三角形

	      for (var i = 0; i < vertices.length - 3; i++) {
	        arrayData.push.apply(arrayData, _toConsumableArray(vertices[i]).concat(_toConsumableArray(vertices[i + 1]), _toConsumableArray(vertices[i + 3])));
	      }

	      return arrayData;
	    }
	  }, {
	    key: "render",
	    value: function render(transferOptions) {
	      var gl = transferOptions.gl,
	          matrix = transferOptions.matrix;
	      if (this.group.length === 0) return; // blend

	      gl.depthMask(false);
	      gl.enable(gl.BLEND);
	      gl.blendEquation(gl.FUNC_ADD);
	      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
	      var program = this.program;
	      program.use(gl);
	      program.setUniform("uMatrix", matrix);

	      for (var i = 0; i < this.group.length; i++) {
	        // 绑定顶点数据
	        var _this$group$i = this.group[i],
	            bufferData = _this$group$i.bufferData,
	            point = _this$group$i.point,
	            scale$1 = _this$group$i.scale,
	            color = _this$group$i.color;
	        this.vertexBuffer.setData(bufferData);
	        this.vao.bind({
	          gl: gl,
	          program: program,
	          vertexBuffer: this.vertexBuffer
	        });
	        var m = create();
	        translate(m, m, point);
	        scale(m, m, [-scale$1, scale$1, 1]);
	        rotateZ(m, m, 2 * Math.PI * this.time);
	        var uniforms = {
	          uObjMatrix: m,
	          glowColor: color
	        };
	        program.setUniforms(uniforms); // draw

	        gl.drawArrays(gl.TRIANGLES, 0, this.vertexBuffer.numberOfVertices);
	      }

	      this.time += this.options.step / 10;
	      1 < this.time && (this.time = 0);
	    }
	  }]);

	  return FanLayer;
	}(Layer);

	/**
	 * @classdesc
	 *
	 * 防护罩图层，继承自 Layer
	 * 
	 * @extends Layer
	 *
	 * @param {Object} options
	 * @param {String | Function=} [options.color='rgba(25, 25, 250, 1)'] 颜色
	 * @param {Number | Function=} [options.radius=50] 半径
	 */

	var ShieldLayer = /*#__PURE__*/function (_Layer) {
	  _inherits(ShieldLayer, _Layer);

	  var _super = _createSuper(ShieldLayer);

	  function ShieldLayer(options) {
	    var _this;

	    _classCallCheck(this, ShieldLayer);

	    _this = _super.call(this, options);
	    _this.group = [];
	    return _this;
	  }

	  _createClass(ShieldLayer, [{
	    key: "getDefaultOptions",
	    value: function getDefaultOptions() {
	      return {
	        color: "rgba(25, 25, 250, 1)",
	        radius: 50
	      };
	    }
	  }, {
	    key: "initialize",
	    value: function initialize(gl) {
	      // 构造program
	      this.program = new Program(gl, {
	        vertexShader: "\n                attribute vec3 aPos;\n                uniform mat4 uMatrix;\n                uniform mat4 uObjMatrix;\n                varying vec3 vPos;\n\n                void main() {\n                    gl_Position = uMatrix * uObjMatrix * vec4(aPos.xyz, 1.0);\n                    vPos = aPos;\n                }",
	        fragmentShader: "\n                uniform vec4 glowColor;\n                varying vec3 vPos;\n\n                void main() {\n                    vec4 color = glowColor;\n                    color.a *= pow(1.0 - vPos.z, 1.3);\n\n                    gl_FragColor = color;\n                }"
	      }, this); // 顶点相关数据

	      this.vertexBuffer = new VertexBuffer({
	        gl: gl,
	        dynamicDraw: true,
	        attributes: [{
	          name: "aPos",
	          size: 3
	        }]
	      }); // 顶点索引

	      this.indexBuffer = new IndexBuffer({
	        gl: gl,
	        dynamicDraw: true
	      });
	      this.vao = new VertexArrayObject();
	    }
	  }, {
	    key: "onChanged",
	    value: function onChanged(options, dataArray) {
	      this.group = [];

	      if (this.gl) {
	        for (var i = 0; i < dataArray.length; i++) {
	          var data = dataArray[i];
	          var coord = data.geometry.coordinates;
	          var radius = +this.getValue("radius", data);
	          var point = this.normizedPoint(coord);
	          var scale$1 = this.normizedHeight(radius, coord); // 构建半圆球

	          var geometry = new SphereGeometry({
	            nlat: Math.floor(Math.max(radius, 20)),
	            nlong: Math.floor(Math.max(radius, 20) * 2),
	            endLong: Math.PI
	          }); // obj mat4

	          var m = create();
	          translate(m, m, point);
	          scale(m, m, [scale$1, scale$1, scale$1]); // 存入多边形

	          this.group.push({
	            indexData: geometry.indices.value,
	            bufferData: geometry.getAttribute("POSITION").value,
	            uniforms: {
	              uObjMatrix: m,
	              glowColor: this.normizedColor(this.getValue("color", data))
	            }
	          });
	        }
	      }
	    }
	  }, {
	    key: "render",
	    value: function render(transferOptions) {
	      var gl = transferOptions.gl,
	          matrix = transferOptions.matrix;
	      if (this.group.length === 0) return;
	      this.program.use(gl);

	      for (var i = 0; i < this.group.length; i++) {
	        // 绑定顶点数据
	        var _this$group$i = this.group[i],
	            indexData = _this$group$i.indexData,
	            bufferData = _this$group$i.bufferData,
	            uniforms = _this$group$i.uniforms;
	        this.vertexBuffer.setData(bufferData);
	        this.indexBuffer.setData(indexData);
	        this.vao.bind({
	          gl: gl,
	          program: this.program,
	          vertexBuffer: this.vertexBuffer,
	          indexBuffer: this.indexBuffer
	        });
	        this.program.setUniforms(_objectSpread2({
	          uMatrix: matrix
	        }, uniforms));
	        gl.depthMask(false);
	        gl.enable(gl.BLEND);
	        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
	        gl.drawElements(gl.TRIANGLES, this.indexBuffer.numberOfIndices, this.indexBuffer.indexDatatype, 0);
	      }
	    }
	  }]);

	  return ShieldLayer;
	}(Layer);

	/**
	 * @classdesc
	 *
	 * 贴图画圆效果，继承自 Layer
	 * 
	 * @extends Layer
	 *
	 * @param {Object} options
	 * @param {String | HTMLImageElement | Function} [options.texture] 贴图
	 * @param {String | Function=} [options.color='rgb(255, 255, 255)'] 颜色
	 * @param {Number | Function=} [options.radius=50] 半径
	 * @param {Number=} [options.step=0.1] 执行每次动画的步长
	 */

	var ImageCircleLayer = /*#__PURE__*/function (_Layer) {
	  _inherits(ImageCircleLayer, _Layer);

	  var _super = _createSuper(ImageCircleLayer);

	  function ImageCircleLayer(options) {
	    var _this;

	    _classCallCheck(this, ImageCircleLayer);

	    _this = _super.call(this, options);
	    _this.autoUpdate = true;
	    _this.group = [];
	    _this.time = 0;
	    return _this;
	  }

	  _createClass(ImageCircleLayer, [{
	    key: "getDefaultOptions",
	    value: function getDefaultOptions() {
	      return {
	        color: [1, 1, 1, 1],
	        radius: 50,
	        step: 0.1
	      };
	    }
	  }, {
	    key: "initialize",
	    value: function initialize(gl) {
	      // 构造program
	      this.program = new Program(gl, {
	        vertexShader: "\n                attribute vec3 aPos;\n                uniform mat4 uMatrix;\n                uniform mat4 uObjMatrix;\n                varying vec3 vPos;\n                \n                void main() {\n                    gl_Position = uMatrix * uObjMatrix * vec4(aPos.xyz, 1.0);\n                    vPos = aPos;\n                }",
	        fragmentShader: "\n                uniform sampler2D uSampler;\n                uniform vec4 glowColor;\n                varying vec3 vPos;\n\n                void main() {\n                    if (length(vPos.xy) > 1.0) {\n                        discard;\n                    }\n                    vec4 color = texture2D(uSampler, (vPos.xy + 1.0) / 2.0);\n                    gl_FragColor = color * glowColor;\n                }"
	      }, this); // 顶点相关数据

	      this.vertexBuffer = new VertexBuffer({
	        gl: gl,
	        dynamicDraw: true,
	        attributes: [{
	          name: "aPos",
	          size: 3
	        }]
	      });
	      this.vao = new VertexArrayObject();
	    }
	  }, {
	    key: "onChanged",
	    value: function onChanged(options, dataArray) {
	      this.group = [];

	      if (this.gl) {
	        for (var i = 0; i < dataArray.length; i++) {
	          var data = dataArray[i];
	          var textureUrl = this.getValue("texture", data);
	          if (!textureUrl) continue;
	          var coord = data.geometry.coordinates;
	          var radius = +this.getValue("radius", data);
	          var point = this.normizedPoint([coord[0], coord[1], radius]);
	          var bufferData = this.createCircle(); // 存入多边形

	          this.group.push({
	            bufferData: bufferData,
	            texture: textureUrl,
	            color: this.normizedColor(this.getValue("color", data) || [1, 1, 1, 1]),
	            point: [point[0], point[1], 0],
	            scale: point[2]
	          });
	          this.gl.textureManager.loadAndAdd(null, textureUrl);
	        }
	      }
	    }
	  }, {
	    key: "createCircle",
	    value: function createCircle() {
	      // 所有顶点
	      var vertices = [[-1, 1, 0], [1, 1, 0], [-1, -1, 0], [1, -1, 0]]; // 两个三角形

	      var arrayData = [].concat(_toConsumableArray(vertices[0]), _toConsumableArray(vertices[1]), _toConsumableArray(vertices[2]), _toConsumableArray(vertices[1]), _toConsumableArray(vertices[3]), _toConsumableArray(vertices[2]));
	      return arrayData;
	    }
	  }, {
	    key: "render",
	    value: function render(transferOptions) {
	      var gl = transferOptions.gl,
	          matrix = transferOptions.matrix;
	      if (this.group.length <= 0) return;
	      this.program.use(gl);

	      for (var i = 0; i < this.group.length; i++) {
	        // 绑定顶点数据
	        var _this$group$i = this.group[i],
	            bufferData = _this$group$i.bufferData,
	            point = _this$group$i.point,
	            scale$1 = _this$group$i.scale,
	            texture = _this$group$i.texture,
	            color = _this$group$i.color;
	        var glTexture = this.gl.textureManager.get(texture);
	        if (!glTexture) continue;
	        this.vertexBuffer.setData(bufferData);
	        this.vao.bind({
	          gl: gl,
	          program: this.program,
	          vertexBuffer: this.vertexBuffer
	        });
	        var m = create();
	        translate(m, m, point);
	        scale(m, m, [-scale$1, scale$1, 1]);
	        rotateZ(m, m, 2 * Math.PI * this.time);
	        var uniforms = {
	          uMatrix: matrix,
	          uObjMatrix: m,
	          uSampler: glTexture,
	          glowColor: color
	        };
	        this.program.setUniforms(uniforms);
	        gl.depthMask(false);
	        gl.enable(gl.BLEND);
	        gl.blendEquation(gl.FUNC_ADD);
	        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
	        gl.drawArrays(gl.TRIANGLES, 0, this.vertexBuffer.numberOfVertices);
	      }

	      this.time += this.options.step / 10;
	      1 < this.time && (this.time = 0);
	    }
	  }]);

	  return ImageCircleLayer;
	}(Layer);

	/**
	 * @classdesc
	 *
	 * 圆柱扩散效果，继承自 Layer，该图层支持作为后处理灯光效果影响 ShapeLayer
	 * 
	 * @extends Layer
	 *
	 * @param {Object} options
	 * @param {String | Function=} [options.color='rgba(25, 25, 250, 1)'] 颜色
	 * @param {Number | Function=} [options.height=5] 圆柱高度
	 * @param {Number | Function=} [options.radius=50] 扩散效果的半径大小
	 * @param {Number=} [options.duration=2] 扩散效果周期
	 */

	var CylinderSpreadLayer = /*#__PURE__*/function (_Layer) {
	  _inherits(CylinderSpreadLayer, _Layer);

	  var _super = _createSuper(CylinderSpreadLayer);

	  function CylinderSpreadLayer(options) {
	    var _this;

	    _classCallCheck(this, CylinderSpreadLayer);

	    _this = _super.call(this, options);
	    _this.group = []; // 表示该图层是个effect图层

	    _this.effectType = "NUM_CYLINDER_SPREADS";
	    _this.effectUniformName = "cylinderSpreads";
	    _this.percent = 0;
	    _this.date = new Date();
	    _this.autoUpdate = true;
	    return _this;
	  }

	  _createClass(CylinderSpreadLayer, [{
	    key: "getDefaultOptions",
	    value: function getDefaultOptions() {
	      return {
	        color: "rgba(25, 25, 250, 1)",
	        height: 5,
	        duration: 2,
	        radius: 50
	      };
	    }
	  }, {
	    key: "initialize",
	    value: function initialize(gl) {
	      this.program = new Program(gl, {
	        shaderId: "cylinder_spread"
	      }, this); // 顶点相关数据

	      this.vertexBuffer = new VertexBuffer({
	        gl: gl,
	        dynamicDraw: true,
	        attributes: [{
	          name: "aPos",
	          size: 3
	        }]
	      }); // 顶点索引

	      this.indexBuffer = new IndexBuffer({
	        gl: gl,
	        dynamicDraw: true
	      });
	      this.vao = new VertexArrayObject();
	    }
	  }, {
	    key: "onChanged",
	    value: function onChanged(options, dataArray) {
	      this.group = [];

	      if (this.gl) {
	        for (var i = 0; i < dataArray.length; i++) {
	          var data = dataArray[i];
	          var coord = data.geometry.coordinates;
	          var radius = +this.getValue("radius", data);
	          var height = +this.getValue("height", data);
	          var color = this.normizedColor(this.getValue("color", data));
	          var point = this.normizedPoint(coord);
	          var scale$1 = this.normizedHeight(radius, coord);

	          var _height = this.normizedHeight(height, coord); // 构建半圆球


	          var geometry = new CylinderGeometry({
	            translate: [0, 0, 0.5],
	            verticalAxis: "z",
	            nradial: Math.floor(Math.max(20, radius))
	          }); // obj mat4

	          var m = create();
	          translate(m, m, point);
	          scale(m, m, [scale$1, scale$1, _height]); // 存入多边形

	          this.group.push({
	            indexData: geometry.indices.value,
	            bufferData: geometry.getAttribute("POSITION").value,
	            uniforms: {
	              uObjMatrix: m,
	              glowColor: color
	            },
	            effectUniforms: {
	              center: point,
	              radius: scale$1,
	              height: _height,
	              color: color
	            }
	          });
	        }
	      }
	    }
	  }, {
	    key: "render",
	    value: function render(transferOptions) {
	      var gl = transferOptions.gl,
	          matrix = transferOptions.matrix;
	      if (this.group.length === 0) return;
	      this.program.use(gl);

	      for (var i = 0; i < this.group.length; i++) {
	        // 绑定顶点数据
	        var _this$group$i = this.group[i],
	            indexData = _this$group$i.indexData,
	            bufferData = _this$group$i.bufferData,
	            uniforms = _this$group$i.uniforms;
	        this.vertexBuffer.setData(bufferData);
	        this.indexBuffer.setData(indexData);
	        this.vao.bind({
	          gl: gl,
	          program: this.program,
	          vertexBuffer: this.vertexBuffer,
	          indexBuffer: this.indexBuffer
	        }); // time uniforms

	        var time = (new Date() - this.date) / 1e3,
	            duration = this.options.duration;
	        this.percent = time % duration / duration;
	        this.program.setUniforms(_objectSpread2({
	          uMatrix: matrix,
	          uPercent: this.percent
	        }, uniforms));
	        gl.depthMask(false);
	        gl.enable(gl.BLEND);
	        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
	        gl.drawElements(gl.TRIANGLES, this.indexBuffer.numberOfIndices, this.indexBuffer.indexDatatype, 0);
	      }
	    } // 获取当前effect的对象

	  }, {
	    key: "getEffectObjs",
	    value: function getEffectObjs(transform) {
	      var _this2 = this;

	      return this.group.map(function (obj) {
	        var effObj = obj.effectUniforms;
	        var center = transform(effObj.center);
	        return _objectSpread2(_objectSpread2({}, effObj), {}, {
	          center: center,
	          percent: _this2.percent
	        });
	      });
	    }
	  }]);

	  return CylinderSpreadLayer;
	}(Layer);

	/**
	 * @classdesc
	 * 
	 * 动态圆柱体效果，继承自 Layer
	 * 
	 * @extends Layer
	 * 
	 * @param {Object} options
	 * @param {String | Function=} [options.color='blue'] 颜色
	 * @param {Number | Function=} [options.height=100] 圆柱高度
	 * @param {Number | Function=} [options.topRadius=0.8] 顶部半径
	 * @param {Number | Function=} [options.bottomRadius=8] 底部半径
	 * @param {Number=} [options.duration=5] 动画效果周期
	 */

	var DynamicCylinderLayer = /*#__PURE__*/function (_Layer) {
	  _inherits(DynamicCylinderLayer, _Layer);

	  var _super = _createSuper(DynamicCylinderLayer);

	  function DynamicCylinderLayer(options) {
	    var _this;

	    _classCallCheck(this, DynamicCylinderLayer);

	    _this = _super.call(this, options);
	    _this.group = [];
	    _this.date = new Date();
	    _this.autoUpdate = true;
	    return _this;
	  }

	  _createClass(DynamicCylinderLayer, [{
	    key: "getDefaultOptions",
	    value: function getDefaultOptions() {
	      return {
	        color: "rgba(25, 25, 250, 1)",
	        duration: 5,
	        height: 100,
	        topRadius: 0.8,
	        bottomRadius: 8
	      };
	    }
	  }, {
	    key: "initialize",
	    value: function initialize(gl) {
	      this.program = new Program(gl, {
	        vertexShader: "\n                attribute vec3 aPos;\n                uniform mat4 uMatrix;\n                uniform mat4 uObjMatrix;\n                varying vec3 vPos;\n\n                void main() {\n                    gl_Position = uMatrix * uObjMatrix * vec4(aPos.xyz, 1.0);\n                    vPos = aPos;\n                }",
	        fragmentShader: "\n                uniform vec4 glowColor;\n                uniform float uPercent;\n                varying vec3 vPos;\n\n                void main() {\n                    vec4 color = glowColor;\n                    color.a *= 1.0 - pow(vPos.z, 0.5);\n\n                    // \u5FAA\u73AF\u900F\u660E\u5EA6\u6548\u679C\n                    color.a *= clamp(sin(PI * uPercent), 0.1, 1.0);\n\n                    gl_FragColor = color;\n                }"
	      }, this); // 顶点相关数据

	      this.vertexBuffer = new VertexBuffer({
	        gl: gl,
	        dynamicDraw: true,
	        attributes: [{
	          name: "aPos",
	          size: 3
	        }]
	      }); // 顶点索引

	      this.indexBuffer = new IndexBuffer({
	        gl: gl,
	        dynamicDraw: true
	      });
	      this.vao = new VertexArrayObject();
	    }
	  }, {
	    key: "onChanged",
	    value: function onChanged(options, dataArray) {
	      this.group = [];

	      if (this.gl) {
	        for (var i = 0; i < dataArray.length; i++) {
	          var data = dataArray[i];
	          var coord = data.geometry.coordinates;
	          var topRadius = +this.getValue("topRadius", data);
	          var bottomRadius = +this.getValue("bottomRadius", data);
	          var height = +this.getValue("height", data);
	          var color = this.normizedColor(this.getValue("color", data));
	          var point = this.normizedPoint(coord);

	          var _topRadius = this.normizedHeight(topRadius, coord);

	          var _bottomRadius = this.normizedHeight(bottomRadius, coord);

	          var _height = this.normizedHeight(height, coord); // 构建圆柱体


	          var geometry = new TruncatedConeGeometry({
	            verticalAxis: "z",
	            translate: [0, 0, 0.5],
	            topRadius: _topRadius,
	            bottomRadius: _bottomRadius,
	            nradial: Math.floor(Math.max(20, (topRadius + bottomRadius) / 2)),
	            nvertical: 20
	          }); // obj mat4

	          var m = create();
	          translate(m, m, point);
	          scale(m, m, [1, 1, _height]); // 存入多边形

	          this.group.push({
	            indexData: geometry.indices.value,
	            bufferData: geometry.getAttribute("POSITION").value,
	            uniforms: {
	              uObjMatrix: m,
	              glowColor: color
	            }
	          });
	        }
	      }
	    }
	  }, {
	    key: "render",
	    value: function render(transferOptions) {
	      var gl = transferOptions.gl,
	          matrix = transferOptions.matrix;
	      if (this.group.length === 0) return;
	      this.program.use(gl);

	      for (var i = 0; i < this.group.length; i++) {
	        // 绑定顶点数据
	        var _this$group$i = this.group[i],
	            indexData = _this$group$i.indexData,
	            bufferData = _this$group$i.bufferData,
	            uniforms = _this$group$i.uniforms;
	        this.vertexBuffer.setData(bufferData);
	        this.indexBuffer.setData(indexData);
	        this.vao.bind({
	          gl: gl,
	          program: this.program,
	          vertexBuffer: this.vertexBuffer,
	          indexBuffer: this.indexBuffer
	        }); // time uniforms

	        var time = (new Date() - this.date) / 1e3,
	            duration = this.options.duration;
	        this.program.setUniforms(_objectSpread2({
	          uMatrix: matrix,
	          uPercent: time % duration / duration
	        }, uniforms));
	        gl.depthMask(false);
	        gl.enable(gl.BLEND);
	        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
	        gl.drawElements(gl.TRIANGLES, this.indexBuffer.numberOfIndices, this.indexBuffer.indexDatatype, 0);
	      }
	    }
	  }]);

	  return DynamicCylinderLayer;
	}(Layer);

	var FAILS_ON_PRIMITIVES$1 = fails(function () {
	  objectKeys(1);
	}); // `Object.keys` method
	// https://tc39.github.io/ecma262/#sec-object.keys

	_export({
	  target: 'Object',
	  stat: true,
	  forced: FAILS_ON_PRIMITIVES$1
	}, {
	  keys: function keys(it) {
	    return objectKeys(toObject(it));
	  }
	});

	var Intensity = /*#__PURE__*/function () {
	  function Intensity() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    _classCallCheck(this, Intensity);

	    this.gradient = options.gradient || {
	      0.25: "rgba(0, 0, 255, 1)",
	      0.55: "rgba(0, 255, 0, 1)",
	      0.85: "rgba(255, 255, 0, 1)",
	      1: "rgba(255, 0, 0, 1)"
	    };
	    this.maxSize = undefined === options.maxSize ? 35 : options.maxSize;
	    this.minSize = options.minSize || 0;
	    this.max = options.max || 100;
	    this.min = options.min || 0;
	    this.initPalette();
	  }

	  _createClass(Intensity, [{
	    key: "setMax",
	    value: function setMax(val) {
	      this.max = val || 100;
	    }
	  }, {
	    key: "setMin",
	    value: function setMin(val) {
	      this.min = val || 0;
	    }
	  }, {
	    key: "setMaxSize",
	    value: function setMaxSize(val) {
	      this.maxSize = val || 35;
	    }
	  }, {
	    key: "setMinSize",
	    value: function setMinSize(val) {
	      this.minSize = val || 0;
	    }
	  }, {
	    key: "initPalette",
	    value: function initPalette() {
	      var _getCanvas2D = getCanvas2D(256, 1),
	          ctx = _getCanvas2D.ctx;

	      this.paletteCtx = ctx;
	      var gradient = this.gradient,
	          canvasGradient = ctx.createLinearGradient(0, 0, 256, 1);
	      Object.keys(gradient).forEach(function (d) {
	        canvasGradient.addColorStop(parseFloat(d), gradient[d]);
	      });
	      ctx.fillStyle = canvasGradient;
	      ctx.fillRect(0, 0, 256, 1);
	      ctx.imageData = ctx.getImageData(0, 0, 256, 1).data;
	    }
	  }, {
	    key: "getColor",
	    value: function getColor(size) {
	      var imageData = this.getImageData(size);
	      return "rgba(" + imageData[0] + ", " + imageData[1] + ", " + imageData[2] + ", " + imageData[3] / 256 + ")";
	    }
	  }, {
	    key: "getImageData",
	    value: function getImageData(size) {
	      var imageData = this.paletteCtx.imageData;
	      if (undefined === size) return imageData;
	      var max = this.max,
	          min = this.min;
	      size > max && (size = max);
	      size < min && (size = min);
	      size = 4 * Math.floor((size - min) / (max - min) * 255);
	      return [imageData[size], imageData[size + 1], imageData[size + 2], imageData[size + 3]];
	    }
	  }, {
	    key: "getSize",
	    value: function getSize(size) {
	      var max = this.max,
	          min = this.min,
	          maxSize = this.maxSize,
	          minSize = this.minSize;
	      size > max && (size = max);
	      size < min && (size = min);
	      return minSize + (size - min) / (max - min) * (maxSize - minSize);
	    }
	  }]);

	  return Intensity;
	}();

	/**
	 * @classdesc
	 * 
	 * 3D热力图，继承自 Layer
	 * 
	 * @extends Layer
	 * 
	 * @param {Object} options
	 * @param {Number | Function=} [options.size=13] 单个点绘制大小
	 * @param {String=} [options.unit='px'] 单位，m:米，px: 像素
	 * @param {Number=} [options.height=0] 最大高度，默认为0
	 * @param {Number=} [options.max=100] 最大阈值
	 * @param {Number=} [options.min=5] 最小阈值
	 * @param {Number | Function=} [options.count=1] 权重信息，配合阈值确定颜色值
	 * @param {Object=} [options.gradient={0.0: 'rgb(50, 50, 256)', 0.1: 'rgb(50, 250, 56)', 0.5: 'rgb(250, 250, 56)',1.0: 'rgb(250, 50, 56)'}] 渐变色
	 */

	var HeatmapLayer = /*#__PURE__*/function (_Layer) {
	  _inherits(HeatmapLayer, _Layer);

	  var _super = _createSuper(HeatmapLayer);

	  function HeatmapLayer() {
	    _classCallCheck(this, HeatmapLayer);

	    return _super.apply(this, arguments);
	  }

	  _createClass(HeatmapLayer, [{
	    key: "getDefaultOptions",
	    value: function getDefaultOptions() {
	      return {
	        size: 13,
	        unit: "px",
	        height: 0,
	        max: 100,
	        min: 0
	      };
	    }
	  }, {
	    key: "initialize",
	    value: function initialize(gl) {
	      var _this = this;

	      var _this$getOptions = this.getOptions(),
	          gradient = _this$getOptions.gradient; // fbo


	      this.frameBuffer = new FrameBuffer(gl);
	      this.webglLayer.map.onResize(function () {
	        _this.frameBuffer = new FrameBuffer(gl);
	      }); // init texture

	      this.circleTexture = createTexture(gl, circle(64), {
	        TEXTURE_WRAP_S: "CLAMP_TO_EDGE",
	        TEXTURE_WRAP_T: "CLAMP_TO_EDGE"
	      });
	      this.paletteTexture = createTexture(gl, new Intensity({
	        gradient: gradient
	      }).paletteCtx.canvas, {
	        TEXTURE_WRAP_S: "CLAMP_TO_EDGE",
	        TEXTURE_WRAP_T: "CLAMP_TO_EDGE"
	      }); // init program

	      this.offlineProgram = new Program(gl, {
	        shaderId: "heatmap_offline"
	      }, this);
	      this.offlineBuffer = new VertexBuffer({
	        gl: gl,
	        attributes: [{
	          name: "aPos",
	          size: 3
	        }, {
	          name: "aOffset",
	          size: 2
	        }, {
	          name: "aCount",
	          size: 1
	        }, {
	          name: "aSize",
	          size: 1
	        }]
	      });
	      this.offlineIndexBuffer = new IndexBuffer({
	        gl: gl
	      });
	      this.offlineVAO = new VertexArrayObject(); // init program2

	      this.program = new Program(gl, {
	        shaderId: "heatmap"
	      }, this); // 构建三角网

	      var bufferData = [],
	          indexData = [],
	          g = Math.floor(gl.canvas.width / 4),
	          h = Math.floor(gl.canvas.height / 4),
	          m = g + 1;

	      for (var i = 0; i <= h; i++) {
	        for (var j = 0; j <= g; j++) {
	          bufferData.push(2 * j / g - 1, 2 * i / h - 1);

	          if (j < g && i < h) {
	            var l = m * i + j,
	                r = m * (i + 1) + j;
	            indexData.push(l, l + 1, r + 1);
	            indexData.push(l, r + 1, r);
	          }
	        }
	      }

	      this.buffer = new VertexBuffer({
	        gl: gl,
	        data: bufferData,
	        attributes: [{
	          name: "aPos",
	          size: 2
	        }]
	      });
	      this.indexBuffer = new IndexBuffer({
	        gl: gl,
	        data: indexData
	      });
	      this.vao = new VertexArrayObject();
	    }
	  }, {
	    key: "onOptionsChanged",
	    value: function onOptionsChanged(newOptions, oldOptions) {
	      var gl = this.gl;

	      if (gl && newOptions.gradient !== oldOptions.gradient) {
	        var intensity = new Intensity({
	          gradient: newOptions.gradient
	        });
	        this.paletteTexture = createTexture(gl, intensity.paletteCtx.canvas, {
	          TEXTURE_WRAP_S: "CLAMP_TO_EDGE",
	          TEXTURE_WRAP_T: "CLAMP_TO_EDGE"
	        });
	      }
	    }
	  }, {
	    key: "onDataChanged",
	    value: function onDataChanged(data) {
	      if (this.gl) {
	        var bufferData = [],
	            indexData = [];

	        for (var i = 0; i < data.length; i++) {
	          var point = data[i],
	              coord = this.normizedPoint(data[i].geometry.coordinates);
	          var count = this.getValue("count", point);
	          count = count === undefined ? 1 : count;
	          var size = this.getValue("size", point);
	          bufferData.push(coord[0], coord[1], coord[2]);
	          bufferData.push(-1, -1);
	          bufferData.push(count);
	          bufferData.push(size);
	          bufferData.push(coord[0], coord[1], coord[2]);
	          bufferData.push(-1, 1);
	          bufferData.push(count);
	          bufferData.push(size);
	          bufferData.push(coord[0], coord[1], coord[2]);
	          bufferData.push(1, 1);
	          bufferData.push(count);
	          bufferData.push(size);
	          bufferData.push(coord[0], coord[1], coord[2]);
	          bufferData.push(1, -1);
	          bufferData.push(count);
	          bufferData.push(size);
	          var index = 4 * i;
	          indexData.push(index + 0, index + 2, index + 1);
	          indexData.push(index + 0, index + 3, index + 2);
	        }

	        this.offlineBufferData = bufferData;
	        this.offlineIndexData = indexData;
	        this.offlineBuffer.setData(bufferData);
	        this.offlineIndexBuffer.setData(indexData);
	      }
	    }
	  }, {
	    key: "render",
	    value: function render(transferOptions) {
	      var gl = transferOptions.gl,
	          matrix = transferOptions.matrix,
	          pixelToViewMatrix = transferOptions.pixelToViewMatrix,
	          projectionMatrix = transferOptions.projectionMatrix;

	      if (this.offlineBufferData && !(0 >= this.offlineBufferData.length)) {
	        var options = this.getOptions(); // 绑定缓冲区，进行离屛渲染

	        gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer.framebuffer);
	        gl.clearCanvas();
	        gl.enable(gl.BLEND);
	        gl.disable(gl.DEPTH_TEST);
	        gl.blendFunc(gl.ONE, gl.ONE);
	        this.offlineProgram.use(gl);
	        this.offlineProgram.setUniforms({
	          uMatrix: matrix,
	          uCircle: this.circleTexture,
	          uMax: options.max,
	          uMin: options.min,
	          uZoomUnits: "m" === this.options.unit ? this.normizedHeight(1, this.map.getCenter()) : this.map.getZoomUnits()
	        });
	        this.offlineVAO.bind({
	          gl: gl,
	          program: this.offlineProgram,
	          vertexBuffer: this.offlineBuffer,
	          indexBuffer: this.offlineIndexBuffer
	        });
	        gl.drawElements(gl.TRIANGLES, this.offlineIndexData.length, gl.UNSIGNED_INT, 0);
	        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	        gl.enable(gl.DEPTH_TEST);
	        gl.depthMask(true);
	        gl.enable(gl.BLEND);
	        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
	        this.program.use(gl);
	        var inverseMatrix = create();
	        multiply(inverseMatrix, projectionMatrix, pixelToViewMatrix);
	        invert(inverseMatrix, inverseMatrix);
	        this.program.setUniforms({
	          uSampler: this.frameBuffer.framebuffer.texture,
	          uSamplerPalette: this.paletteTexture,
	          uHeight: options.height,
	          pixelToViewMatrix: pixelToViewMatrix,
	          inverseMatrix: inverseMatrix,
	          projectionMatrix: projectionMatrix
	        });
	        this.vao.bind({
	          gl: gl,
	          program: this.program,
	          indexBuffer: this.indexBuffer,
	          vertexBuffer: this.buffer
	        });
	        gl.drawElements(gl.TRIANGLES, this.indexBuffer.numberOfIndices, gl.UNSIGNED_INT, 0);
	      }
	    }
	  }]);

	  return HeatmapLayer;
	}(Layer);

	var ThreeLayer = /*#__PURE__*/function (_CommonLayer) {
	  _inherits(ThreeLayer, _CommonLayer);

	  var _super = _createSuper(ThreeLayer);

	  function ThreeLayer(options) {
	    var _this;

	    _classCallCheck(this, ThreeLayer);

	    _this = _super.call(this, options);
	    _this.layerType = "ThreeLayer";
	    return _this;
	  }

	  _createClass(ThreeLayer, [{
	    key: "initialize",
	    value: function initialize(gl) {
	      var map = this.webglLayer.map;

	      if (map.mapType === "three") {
	        this.camera = map.map.camera;
	        this.scene = map.map.scene;
	      } else {
	        this.camera = new THREE.Camera();
	        this.scene = new THREE.Scene(); // const axes = new THREE.AxisHelper(20);
	        // this.scene.add(axes);
	      }

	      this.world = new THREE.Group();
	      this.scene.add(this.world);

	      if (map.mapType !== "three") {
	        this.camera.matrixAutoUpdate = false;
	        this.world.matrixAutoUpdate = false;
	        this.renderer = new THREE.WebGLRenderer({
	          alpha: true,
	          antialias: true,
	          canvas: gl.canvas,
	          context: gl
	        });
	        this.renderer.autoClear = false;
	      }
	    }
	  }, {
	    key: "add",
	    value: function add(threeObj) {
	      this.world.add(threeObj);
	      this.update();
	    }
	  }, {
	    key: "update",
	    value: function update() {
	      this.webglLayer.render();
	    }
	  }, {
	    key: "getCamera",
	    value: function getCamera() {
	      return this.camera;
	    }
	  }, {
	    key: "getScene",
	    value: function getScene() {
	      return this.scene;
	    }
	  }, {
	    key: "getRenderer",
	    value: function getRenderer() {
	      return this.renderer;
	    }
	  }, {
	    key: "getWorld",
	    value: function getWorld() {
	      return this.world;
	    }
	  }, {
	    key: "remove",
	    value: function remove(threeObj) {
	      this.world.remove(threeObj);
	      this.update();
	    }
	  }, {
	    key: "render",
	    value: function render(transferOptions) {
	      if (transferOptions) {
	        if (this.webglLayer.map.mapType !== "three") {
	          var matrix = transferOptions.matrix;
	          var m = new THREE.Matrix4().fromArray(matrix);
	          var l = new THREE.Matrix4().scale(new THREE.Vector3(1.0, -1.0, 1.0));
	          this.camera.projectionMatrix = m.multiply(l);
	          this.world.matrix = l;
	          this.renderer.state.reset();
	          this.postProcessing ? this.postProcessing.render() : this.renderer.render(this.scene, this.camera);
	        }
	      } else this.update();
	    }
	  }]);

	  return ThreeLayer;
	}(CommonLayer);

	var LayerGroup = /*#__PURE__*/function () {
	  function LayerGroup() {
	    _classCallCheck(this, LayerGroup);

	    this.pointOffset = [0, 0, 0];
	    this.threeLayer = null;
	    this.group = new THREE.Group();
	    this.group.isGeoGroup = true;
	  }

	  _createClass(LayerGroup, [{
	    key: "onAdd",
	    value: function onAdd(threeLayer) {
	      if (this.threeLayer) {
	        this.onRemove(this.threeLayer);
	      }

	      this.threeLayer = threeLayer;
	      this.threeLayer.add(this.group);
	    }
	  }, {
	    key: "onRemove",
	    value: function onRemove(threeLayer) {
	      threeLayer = threeLayer || this.threeLayer;
	      threeLayer.remove(this.group);
	      this.threeLayer = null;
	    } // 设置偏移

	  }, {
	    key: "offset",
	    value: function offset(centerPoint) {}
	  }, {
	    key: "add",
	    value: function add() {
	      var _this$group;

	      (_this$group = this.group).add.apply(_this$group, arguments);

	      return this;
	    }
	  }, {
	    key: "remove",
	    value: function remove() {
	      var _this$group2;

	      (_this$group2 = this.group).remove.apply(_this$group2, arguments);

	      return this;
	    }
	  }, {
	    key: "clear",
	    value: function clear() {
	      var _this$group3;

	      (_this$group3 = this.group).remove.apply(_this$group3, _toConsumableArray(this.group.children));

	      return this;
	    }
	  }]);

	  return LayerGroup;
	}();

	var Layer$1 = /*#__PURE__*/function (_CommonLayer) {
	  _inherits(Layer, _CommonLayer);

	  var _super = _createSuper(Layer);

	  function Layer(options) {
	    var _this;

	    _classCallCheck(this, Layer);

	    _this = _super.call(this, options);
	    _this.layerType = "threeLayer";
	    _this.group = new LayerGroup();
	    return _this;
	  }

	  _createClass(Layer, [{
	    key: "commonInitialize",
	    value: function commonInitialize() {
	      // 添加当前group
	      this.group.onAdd(this.threeLayer);
	    }
	  }, {
	    key: "setWebglLayer",
	    value: function setWebglLayer(webglLayer) {
	      if (!webglLayer.threeLayer) {
	        webglLayer.threeLayer = new ThreeLayer({
	          webglLayer: webglLayer
	        });
	      }

	      this.threeLayer = webglLayer.threeLayer;
	    }
	  }, {
	    key: "getThreeLayer",
	    value: function getThreeLayer() {
	      return this.threeLayer;
	    }
	  }, {
	    key: "destroy",
	    value: function destroy() {
	      _get(_getPrototypeOf(Layer.prototype), "destroy", this).call(this); // 移除当前group


	      this.group.onRemove(this.threeLayer);
	      this.threeLayer = this.group = null;
	    }
	    /* ************** 通用方法接口 ************** */

	  }, {
	    key: "getPointOffset",
	    value: function getPointOffset() {
	      return [0, 0, 0];
	    }
	  }, {
	    key: "normizedPoint",
	    value: function normizedPoint(point) {
	      if (!point || isNaN(+point[0]) || isNaN(+point[1])) return [0, 0, 0];
	      var pointOffset = this.getPointOffset();
	      var nPoint = this.map.normizedPoint(point);
	      return [nPoint[0] - pointOffset[0], nPoint[1] - pointOffset[1], nPoint[2]];
	    }
	  }, {
	    key: "normizedHeight",
	    value: function normizedHeight(height) {
	      var point = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [0, 0];
	      if (!height || height <= 0) return 0;
	      return this.map.normizedPoint([point[0], point[1], height])[2];
	    }
	  }]);

	  return Layer;
	}(CommonLayer);

	var GeometryLayer = /*#__PURE__*/function (_Layer) {
	  _inherits(GeometryLayer, _Layer);

	  var _super = _createSuper(GeometryLayer);

	  function GeometryLayer(options) {
	    _classCallCheck(this, GeometryLayer);

	    return _super.call(this, options);
	  }

	  _createClass(GeometryLayer, [{
	    key: "onChanged",
	    value: function onChanged(options) {
	      var _this$group;

	      this.group.clear();
	      var geometies = options.geometies || [];

	      (_this$group = this.group).add.apply(_this$group, _toConsumableArray(geometies));
	    }
	  }]);

	  return GeometryLayer;
	}(Layer$1);

	exports.BloomEffect = BloomEffect;
	exports.BlurEffect = BlurEffect;
	exports.BrightEffect = BrightEffect;
	exports.CircleLayer = CircleLayer;
	exports.ConeGeometry = ConeGeometry;
	exports.CubeGeometry = CubeGeometry;
	exports.CylinderGeometry = CylinderGeometry;
	exports.CylinderSpreadLayer = CylinderSpreadLayer;
	exports.DepthEffect = DepthEffect;
	exports.DynamicCylinderLayer = DynamicCylinderLayer;
	exports.FanLayer = FanLayer;
	exports.Geometry = Geometry;
	exports.GeometryLayer = GeometryLayer;
	exports.GroundRippleLayer = GroundRippleLayer;
	exports.HeatmapLayer = HeatmapLayer;
	exports.IcoSphereGeometry = IcoSphereGeometry;
	exports.ImageCircleLayer = ImageCircleLayer;
	exports.LineLayer = LineLayer;
	exports.LineLayer3D = LineLayer3D;
	exports.LineTripLayer = LineTripLayer;
	exports.PlaneGeometry = PlaneGeometry;
	exports.PointLayer = PointLayer;
	exports.RippleLayer = RippleLayer;
	exports.ShapeLayer = ShapeLayer;
	exports.ShieldLayer = ShieldLayer;
	exports.SimpleLineLayer = SimpleLineLayer;
	exports.SparkLayer = SparkLayer;
	exports.SphereGeometry = SphereGeometry;
	exports.ThreeLayer = ThreeLayer;
	exports.TruncatedConeGeometry = TruncatedConeGeometry;
	exports.View = View;
	exports.color = color;
	exports.csv = csv;
	exports.curve = curve;
	exports.map = map;
	exports.utilCityCenter = cityCenter;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=layergl.js.map

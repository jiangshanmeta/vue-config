(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.vueConfig = factory());
}(this, function () { 'use strict';

  function _typeof(obj) {
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

  function mergeStrategy(toVal, fromVal) {
    if (!toVal) {
      return fromVal;
    }

    if (!fromVal) {
      return toVal;
    }

    Object.defineProperties(toVal, Object.getOwnPropertyDescriptors(fromVal));
    return toVal;
  }

  var index = {
    install: function install(Vue) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref$optionKeys = _ref.optionKeys,
          optionKeys = _ref$optionKeys === void 0 ? ['config'] : _ref$optionKeys;

      optionKeys.forEach(function (optionKey) {
        Vue.config.optionMergeStrategies[optionKey] = mergeStrategy;
      });
      Vue.mixin({
        beforeCreate: function beforeCreate() {
          var _this = this;

          optionKeys.forEach(function (optionKey) {
            var config = _this.$options[optionKey];

            if (!config || _typeof(config) !== 'object') {
              return;
            }

            Object.defineProperties(_this, Object.getOwnPropertyDescriptors(config));
          });
        }
      });
    }
  };

  return index;

}));

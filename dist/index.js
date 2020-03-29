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

  var index = {
    install: function install(Vue) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref$optionKeys = _ref.optionKeys,
          optionKeys = _ref$optionKeys === void 0 ? ['config'] : _ref$optionKeys;

      Vue.mixin({
        beforeCreate: function beforeCreate() {
          var _this = this;

          optionKeys.forEach(function (optionKey) {
            var config = _this.$options[optionKey];

            if (!config || _typeof(config) !== 'object') {
              return;
            }

            Object.keys(config).forEach(function (key) {
              var descriptor = Object.getOwnPropertyDescriptor(config, key);

              if (descriptor.get) {
                Object.defineProperty(_this, key, {
                  get: descriptor.get
                });
              } else {
                Object.defineProperty(_this, key, {
                  value: config[key],
                  writable: true
                });
              }
            });
          });
        }
      });
    }
  };

  return index;

}));

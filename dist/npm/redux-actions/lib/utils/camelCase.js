"use strict";

exports.__esModule = true;
exports.default = void 0;

var _toCamelCase = _interopRequireDefault(require('./../../../to-camel-case/index.js'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var namespacer = '/';

var _default = function _default(type) {
  return type.includes(namespacer) ? type.split(namespacer).map(_toCamelCase.default).join(namespacer) : (0, _toCamelCase.default)(type);
};

exports.default = _default;
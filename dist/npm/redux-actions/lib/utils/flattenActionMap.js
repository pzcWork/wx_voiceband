"use strict";

exports.__esModule = true;
exports.default = void 0;

var _isPlainObject = _interopRequireDefault(require('./isPlainObject.js'));

var _flattenWhenNode = _interopRequireDefault(require('./flattenWhenNode.js'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _flattenWhenNode.default)(_isPlainObject.default);

exports.default = _default;
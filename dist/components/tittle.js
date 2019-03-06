'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _dec, _class;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _wepyRedux = require('./../npm/wepy-redux/lib/index.js');

var _counter = require('./../store/types/counter.js');

var _actions = require('./../store/actions/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tittle = (_dec = (0, _wepyRedux.connect)({
  stateNum: function stateNum(state) {
    return state.counter.num;
  },
  asyncNum: function asyncNum(state) {
    return state.counter.asyncNum;
  }
}, {
  incNum: _counter.INCREMENT,
  decNum: _counter.DECREMENT,
  asyncInc: _actions.asyncInc
}), _dec(_class = function (_wepy$component) {
  _inherits(Tittle, _wepy$component);

  function Tittle() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Tittle);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Tittle.__proto__ || Object.getPrototypeOf(Tittle)).call.apply(_ref, [this].concat(args))), _this), _this.props = {}, _this.data = {
      tittleText: '魔声体验中心'
    }, _this.events = {}, _this.watch = {
      //   num (curVal, oldVal) {
      //     console.log(`旧值：${oldVal}，新值：${curVal}`)
      //   }
    }, _this.methods = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Tittle;
}(_wepy2.default.component)) || _class);
exports.default = Tittle;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRpdHRsZS5qcyJdLCJuYW1lcyI6WyJUaXR0bGUiLCJzdGF0ZU51bSIsInN0YXRlIiwiY291bnRlciIsIm51bSIsImFzeW5jTnVtIiwiaW5jTnVtIiwiSU5DUkVNRU5UIiwiZGVjTnVtIiwiREVDUkVNRU5UIiwiYXN5bmNJbmMiLCJwcm9wcyIsImRhdGEiLCJ0aXR0bGVUZXh0IiwiZXZlbnRzIiwid2F0Y2giLCJtZXRob2RzIiwid2VweSIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztJQWVxQkEsTSxXQWJwQix3QkFBUTtBQUNQQyxVQURPLG9CQUNHQyxLQURILEVBQ1U7QUFDZixXQUFPQSxNQUFNQyxPQUFOLENBQWNDLEdBQXJCO0FBQ0QsR0FITTtBQUlQQyxVQUpPLG9CQUlHSCxLQUpILEVBSVU7QUFDZixXQUFPQSxNQUFNQyxPQUFOLENBQWNFLFFBQXJCO0FBQ0Q7QUFOTSxDQUFSLEVBT0U7QUFDREMsVUFBUUMsa0JBRFA7QUFFREMsVUFBUUMsa0JBRlA7QUFHREM7QUFIQyxDQVBGLEM7Ozs7Ozs7Ozs7Ozs7O3NMQWNDQyxLLEdBQVEsRSxRQUdSQyxJLEdBQU87QUFDSEMsa0JBQVk7QUFEVCxLLFFBR1BDLE0sR0FBUyxFLFFBR1RDLEssR0FBUTtBQUNSO0FBQ0E7QUFDQTtBQUhRLEssUUFNUkMsTyxHQUFVLEU7Ozs7RUFoQndCQyxlQUFLQyxTO2tCQUFwQmxCLE0iLCJmaWxlIjoidGl0dGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuICBpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAnd2VweS1yZWR1eCdcclxuICBpbXBvcnQgeyBJTkNSRU1FTlQsIERFQ1JFTUVOVCB9IGZyb20gJy4uL3N0b3JlL3R5cGVzL2NvdW50ZXInXHJcbiAgaW1wb3J0IHsgYXN5bmNJbmMgfSBmcm9tICcuLi9zdG9yZS9hY3Rpb25zJ1xyXG5cclxuICBAY29ubmVjdCh7XHJcbiAgICBzdGF0ZU51bSAoc3RhdGUpIHtcclxuICAgICAgcmV0dXJuIHN0YXRlLmNvdW50ZXIubnVtXHJcbiAgICB9LFxyXG4gICAgYXN5bmNOdW0gKHN0YXRlKSB7XHJcbiAgICAgIHJldHVybiBzdGF0ZS5jb3VudGVyLmFzeW5jTnVtXHJcbiAgICB9XHJcbiAgfSwge1xyXG4gICAgaW5jTnVtOiBJTkNSRU1FTlQsXHJcbiAgICBkZWNOdW06IERFQ1JFTUVOVCxcclxuICAgIGFzeW5jSW5jXHJcbiAgfSlcclxuXHJcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGl0dGxlIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xyXG4gICAgcHJvcHMgPSB7XHJcbiAgICB9XHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICB0aXR0bGVUZXh0OiAn6a2U5aOw5L2T6aqM5Lit5b+DJ1xyXG4gICAgfVxyXG4gICAgZXZlbnRzID0ge1xyXG4gICAgfVxyXG5cclxuICAgIHdhdGNoID0ge1xyXG4gICAgLy8gICBudW0gKGN1clZhbCwgb2xkVmFsKSB7XHJcbiAgICAvLyAgICAgY29uc29sZS5sb2coYOaXp+WAvO+8miR7b2xkVmFsfe+8jOaWsOWAvO+8miR7Y3VyVmFsfWApXHJcbiAgICAvLyAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICBcclxuICAgIH1cclxuICB9XHJcbiJdfQ==
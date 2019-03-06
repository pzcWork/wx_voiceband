'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _tittle = require('./../components/tittle.js');

var _tittle2 = _interopRequireDefault(_tittle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var innerAudioContext = wx.createInnerAudioContext();
var recorderManager = wx.getRecorderManager();

var Index = function (_wepy$page) {
  _inherits(Index, _wepy$page);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '魔声'
    }, _this.components = {
      tittle: _tittle2.default
    }, _this.data = {
      tempFilePath: '',
      cWidth: 0,
      cHeight: 0,
      speedValue: 50,
      volValue: 50,
      toneValue: 50,
      musicValue: 50,
      tellerStyle: 1,
      valueLen: 113,
      checkStyle: 1,
      currentNoteLen: 0,
      btnstatus: 0,
      backMusic: [],
      backMusicRe: "悠扬婉转",
      popMusic: [],
      poptapIndex: 0,
      tellerArr: [],
      value: ["TEE集团（TEE Group）专注于人工智能技术领域，自主研发基于深度学习的机器视觉系统，拥有多项AI知识产权专利，综合性能达到国内一流水平。首创分布式AI算力平台，强大的数据处理能力。满足从原始数据到模型产出的一站式服务。"]
    }, _this.computed = {}, _this.methods = {
      play: function play(e) {
        this.btnstatus === 0 ? this.btnstatus = 1 : this.btnstatus = 0;
        // console.log(this.btnstatus)
        var that = this;
        console.log(that.tellerArr[that.tellerStyle - 0].id);
        if (that.btnstatus === 1) {
          wx.showLoading({
            mask: true,
            title: '合成中，请稍等'
          });
          wx.request({
            url: 'https://manage.tee.com/tee/openai/tts/synthetic',
            method: 'POST',
            data: {
              userId: "123", // uid暂时任意
              content: that.value.toString(), // textarea内的输入内容
              voice: that.tellerArr[that.tellerStyle - 0].id, // 播音员
              background: {
                templateId: that.backMusic[that.poptapIndex].templateId, // 选取的背景音乐
                volume: that.musicValue / 100 //背景音乐音量
              },
              dialect: that.tellerArr[that.tellerStyle - 0].language, // 方言，播音员里
              dataType: "url",
              extension: "mp3",
              volume: that.volValue / 100, // 音量
              speed: that.speedValue / 100 // 语速
            },
            success: function success(res) {
              console.log('2222222222');
              console.log(res.data.DATA.filePath);
              // wx.playVoice({
              //   filePath: res.data.DATA.filePath,
              //   success(){
              //     console.log('bofa')
              //   },
              //   fail(res){
              //     console.log(res)
              //   },
              //   complete() { }
              // })
              // console.log('开始播放')
              wx.hideLoading({
                title: '加载中'
              });
              if (that.btnstatus === 1) {
                innerAudioContext.autoplay = true;
                innerAudioContext.src = res.data.DATA.filePath;
                innerAudioContext.onPlay(function () {
                  console.log('正在播放');
                });
                innerAudioContext.onError(function (res) {
                  console.log('播放失败');
                  console.log(res);
                });
                innerAudioContext.onEnded(function (res) {
                  console.log('播放完成');
                  // that.btnstatus = 0
                  that.setData({
                    btnstatus: 0
                  });
                  that.btnstatus = 0;
                  // console.log(that.btnstatus)
                });
              } else if (that.btnstatus === 0) {
                wx.showLoading({
                  mask: true,
                  title: '系统繁忙，请稍后重试'
                });
                innerAudioContext.stop();
              }
            }
          });
        } else if (that.btnstatus === 0) {
          // console.log('停止')
          // console.log(innerAudioContext)
          innerAudioContext.stop();
        }
      },
      _input: function _input(event) {
        var value = event.detail.value;
        // console.log(event.detail.value.length)
        this.value = value;
        // 输入文本长度转为number
        this.valueLen = event.detail.value.length - 0;
      },
      switchTab: function switchTab(val) {
        // 转为number
        this.checkStyle = val - 0;
        if (this.checkStyle === 1) {
          this.value = ["TEE集团（TEE Group）专注于人工智能技术领域，自主研发基于深度学习的机器视觉系统，拥有多项AI知识产权专利，综合性能达到国内一流水平。首创分布式AI算力平台，强大的数据处理能力。满足从原始数据到模型产出的一站式服务。"];
          this.valueLen = 113;
        } else if (this.checkStyle === 2) {
          this.value = '';
          this.valueLen = 0;
        } else if (this.checkStyle === 3) {
          this.value = '';
          this.valueLen = 0;
        }
        // console.log(val)
        // console.log(e.currentTarget)
      },
      checkTeller: function checkTeller(val) {
        // console.log(val)
        this.tellerStyle = val - 0;
      },
      clearAll: function clearAll() {
        this.value = '';
        this.valueLen = 0;
      },
      _inputVoice: function _inputVoice(event) {
        console.log("语音输入");
      },
      _inputPic: function _inputPic(enent) {
        console.log("图片输入");
      },
      volchoice: function volchoice(event) {
        this.volValue = event.detail.value;
        console.log(this.volValue);
      },
      speedchoice: function speedchoice(event) {
        this.speedValue = event.detail.value;
        console.log(this.speedValue);
      },
      tonechoice: function tonechoice(event) {
        this.toneValue = event.detail.value;
        console.log(this.toneValue);
      },
      musicchoice: function musicchoice(event) {
        this.musicValue = event.detail.value;
        console.log(this.musicValue);
      },
      getbackMusic: function getbackMusic() {
        var that = this;
        wx.showActionSheet({
          itemList: that.popMusic,
          success: function success(res) {
            // console.log(res)
            that.poptapIndex = res.tapIndex;
            that.backMusicRe = that.popMusic[that.poptapIndex];
            that.setData({
              backMusicRe: that.popMusic[that.poptapIndex]
            });
          },
          fail: function fail(res) {
            console.log(res.errMsg);
          }
        });
      },

      // themeLang() {
      //   wx.showActionSheet({
      //     itemList: ['普通话'],
      //     success(res) {
      //       console.log(res.tapIndex)
      //     },
      //     fail(res) {
      //       console.log(res.errMsg)
      //     }
      //   })
      // },
      themeMood: function themeMood() {
        wx.showActionSheet({
          itemList: ['愉悦'],
          success: function success(res) {
            console.log(res.tapIndex);
          },
          fail: function fail(res) {
            console.log(res.errMsg);
          }
        });
      },
      themeType: function themeType() {
        wx.showActionSheet({
          itemList: ['诗歌'],
          success: function success(res) {
            console.log(res.tapIndex);
          },
          fail: function fail(res) {
            console.log(res.errMsg);
          }
        });
      },
      chooseImg: function chooseImg() {
        // console.log('选择相片')
        var that = this;
        wx.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'],
          sourceType: ['album', 'camera'],
          success: function success(res) {
            wx.showLoading({
              mask: true,
              title: '处理中，请稍等'
            });
            // console.log(res)
            var size = res.tempFiles[0].size;
            // tempFilePath可以作为img标签的src属性显示图片
            that.tempFilePath = res.tempFilePaths[0];
            var fs = wx.getFileSystemManager();
            if (size < 104857600) {
              // console.log('1111111111111')
              fs.readFile({
                filePath: that.tempFilePath,
                encoding: 'base64',
                success: function success(data) {
                  var da = data.data;
                  wx.request({
                    url: 'https://manage.tee.com/tee/openai/tts/webOcr', // 仅为示例，并非真实的接口地址
                    method: 'POST',
                    data: {
                      byteStr: da,
                      webUrl: ''
                    },
                    header: {
                      'content-type': 'application/json' // 默认值
                    },
                    success: function success(res) {
                      wx.hideLoading({
                        title: '处理中，请稍等'
                      });
                      // console.log(res.data)
                      that.value = res.data.DATA;
                      that.valueLen = res.data.DATA.toString().length;
                      that.setData({
                        value: res.data.DATA
                      });
                      that.setData({
                        valueLen: res.data.DATA.toString().length
                      });
                    }
                  });
                }
              });
            } else {
              return;
              var ratioSize = 1048570 / size;
              // console.log(ratioSize)
              //-----返回选定照片的本地文件路径列表，获取照片信息-----------
              wx.getImageInfo({
                src: that.tempFilePath,
                success: function success(res) {
                  // console.log(res)
                  //---------利用canvas压缩图片--------------
                  var ratio = 2;
                  var canvasWidth = res.width; //图片原始长宽
                  var canvasHeight = res.height;
                  while (canvasWidth > 400 || canvasHeight > 400) {
                    // 保证宽高在400以内
                    canvasWidth = Math.trunc(res.width / ratio);
                    canvasHeight = Math.trunc(res.height / ratio);
                    ratio++;
                  }
                  // console.log(canvasWidth, canvasHeight)
                  that.setData({
                    cWidth: canvasWidth,
                    cHeight: canvasHeight
                  });

                  //----------绘制图形并取出图片路径--------------
                  var ctx = wx.createCanvasContext('canvas');
                  ctx.drawImage(res.path, 0, 0, canvasWidth, canvasHeight);
                  ctx.draw(false, setTimeout(function () {
                    wx.canvasToTempFilePath({
                      canvasId: 'canvas',
                      destWidth: canvasWidth,
                      destHeight: canvasHeight,
                      quality: ratioSize,
                      success: function success(res) {
                        // console.log(res)//最终图片路径
                        var picPath = res.tempFilePath;
                        fs.readFile({
                          filePath: picPath,
                          encoding: 'base64',
                          success: function success(data) {
                            var da = data.data;
                            // console.log('55555555')
                            // console.log(da)
                            wx.request({
                              url: 'https://manage.tee.com/tee/openai/tts/webOcr', // 仅为示例，并非真实的接口地址
                              method: 'POST',
                              data: {
                                byteStr: da,
                                webUrl: ''
                              },
                              header: {
                                'content-type': 'application/json' // 默认值
                              },
                              success: function success(res) {
                                wx.hideLoading({
                                  title: '处理中，请稍等'
                                });
                                // console.log(res.data)
                                that.value = res.data.DATA[0];
                                that.setData({
                                  value: res.data.DATA[0]
                                });
                              }
                            });
                          }
                        });

                        fs.getFileInfo({
                          filePath: picPath,
                          success: function success(data) {
                            // console.log(data)

                          }
                        });
                      },
                      fail: function fail(res) {
                        // console.log(res.errMsg)
                      }
                    });
                  }, 100));
                },
                fail: function fail(res) {
                  // console.log(res.errMsg)
                }
              });
            }
            // console.log(that.tempFilePath)

          }
        });
      },
      longPress: function longPress() {
        // 长按录音事件
        // console.log('长按事件')
        recorderManager.start({
          duration: 60000, //指定录音的时长，单位 ms
          sampleRate: 48000, //采样率
          numberOfChannels: 2, //录音通道数
          encodeBitRate: 320000, //编码码率
          format: 'mp3' //音频格式，有效值 aac/mp3
          // frameSize: 50,//指定帧大小，单位 KB
        });
        recorderManager.onStart(function () {
          console.log('recorder start');
        });
        //错误回调
        recorderManager.onError(function (res) {
          console.log(res);
        });
      },
      touchend: function touchend() {
        // 长按松开事件
        console.log('长按松开事件');
        wx.showLoading({
          mask: true,
          title: '处理中，请稍等'
        });
        var that = this;
        recorderManager.stop();
        recorderManager.onStop(function (res) {
          // console.log(res)
          that.tempFilePath = res.tempFilePath;
          var tempFilePath = res.tempFilePath;
          var fs = wx.getFileSystemManager();
          // innerAudioContext.autoplay = true
          // innerAudioContext.src = tempFilePath
          // innerAudioContext.onPlay(() => {
          //     console.log('开始播放')
          // })

          fs.readFile({
            filePath: tempFilePath,
            encoding: 'base64',
            success: function success(data) {
              var da = data.data;
              // console.log(da)
              wx.request({
                url: 'https://manage.tee.com/tee/openai/tts/speechRecognize',
                method: 'POST',
                data: {
                  byteStr: da,
                  format: 'wav'
                },
                success: function success(res) {
                  wx.hideLoading({
                    title: '处理中，请稍等'
                  });
                  var voiceData = res.data;
                  console.log(res);
                  // wx.showLoading({
                  //   mask: true,
                  //   title: JSON.stringify(res.data.DATA) 拿到数据转成字符串
                  // })
                  that.value = voiceData.DATA;
                  that.valueLen = voiceData.DATA.toString().length;
                  that.setData({
                    value: voiceData.DATA
                  });
                  that.setData({
                    valueLen: voiceData.DATA.toString().length
                  });
                }
              });
            }
          });
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onShareAppMessage',
    value: function onShareAppMessage() {}
  }, {
    key: 'onLoad',
    value: function onLoad() {
      wx.showShareMenu({
        withShareTicket: true,
        success: function success() {
          console.log('转发功能');
        }
      });
      var that = this;
      wx.request({
        url: 'https://manage.tee.com/tee/openai/tts/backgroundList', // 仅为示例，并非真实的接口地址
        method: 'POST',
        data: {},
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function success(res) {
          that.setData({
            backMusic: res.data.DATA
          });
          that.backMusic = res.data.DATA;
          // console.log('22222222222')
          // console.log(that.backMusic)
          for (var i = 0; i < that.backMusic.length; ++i) {
            that.popMusic.push(that.backMusic[i].melody);
          }
        }
      });
      // 播音员接口
      wx.request({
        url: 'https://manage.tee.com/tee/openai/tts/voiceList',
        method: 'POST',
        data: {},
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function success(res) {
          console.log('播音员');
          console.log(res.data.DATA);
          that.tellerArr = res.data.DATA;
          that.setData({
            tellerArr: res.data.DATA
          });
        }
      });
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImlubmVyQXVkaW9Db250ZXh0Iiwid3giLCJjcmVhdGVJbm5lckF1ZGlvQ29udGV4dCIsInJlY29yZGVyTWFuYWdlciIsImdldFJlY29yZGVyTWFuYWdlciIsIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJ0aXR0bGUiLCJUaXR0bGUiLCJkYXRhIiwidGVtcEZpbGVQYXRoIiwiY1dpZHRoIiwiY0hlaWdodCIsInNwZWVkVmFsdWUiLCJ2b2xWYWx1ZSIsInRvbmVWYWx1ZSIsIm11c2ljVmFsdWUiLCJ0ZWxsZXJTdHlsZSIsInZhbHVlTGVuIiwiY2hlY2tTdHlsZSIsImN1cnJlbnROb3RlTGVuIiwiYnRuc3RhdHVzIiwiYmFja011c2ljIiwiYmFja011c2ljUmUiLCJwb3BNdXNpYyIsInBvcHRhcEluZGV4IiwidGVsbGVyQXJyIiwidmFsdWUiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJwbGF5IiwiZSIsInRoYXQiLCJjb25zb2xlIiwibG9nIiwiaWQiLCJzaG93TG9hZGluZyIsIm1hc2siLCJ0aXRsZSIsInJlcXVlc3QiLCJ1cmwiLCJtZXRob2QiLCJ1c2VySWQiLCJjb250ZW50IiwidG9TdHJpbmciLCJ2b2ljZSIsImJhY2tncm91bmQiLCJ0ZW1wbGF0ZUlkIiwidm9sdW1lIiwiZGlhbGVjdCIsImxhbmd1YWdlIiwiZGF0YVR5cGUiLCJleHRlbnNpb24iLCJzcGVlZCIsInN1Y2Nlc3MiLCJyZXMiLCJEQVRBIiwiZmlsZVBhdGgiLCJoaWRlTG9hZGluZyIsImF1dG9wbGF5Iiwic3JjIiwib25QbGF5Iiwib25FcnJvciIsIm9uRW5kZWQiLCJzZXREYXRhIiwic3RvcCIsIl9pbnB1dCIsImV2ZW50IiwiZGV0YWlsIiwibGVuZ3RoIiwic3dpdGNoVGFiIiwidmFsIiwiY2hlY2tUZWxsZXIiLCJjbGVhckFsbCIsIl9pbnB1dFZvaWNlIiwiX2lucHV0UGljIiwiZW5lbnQiLCJ2b2xjaG9pY2UiLCJzcGVlZGNob2ljZSIsInRvbmVjaG9pY2UiLCJtdXNpY2Nob2ljZSIsImdldGJhY2tNdXNpYyIsInNob3dBY3Rpb25TaGVldCIsIml0ZW1MaXN0IiwidGFwSW5kZXgiLCJmYWlsIiwiZXJyTXNnIiwidGhlbWVNb29kIiwidGhlbWVUeXBlIiwiY2hvb3NlSW1nIiwiY2hvb3NlSW1hZ2UiLCJjb3VudCIsInNpemVUeXBlIiwic291cmNlVHlwZSIsInNpemUiLCJ0ZW1wRmlsZXMiLCJ0ZW1wRmlsZVBhdGhzIiwiZnMiLCJnZXRGaWxlU3lzdGVtTWFuYWdlciIsInJlYWRGaWxlIiwiZW5jb2RpbmciLCJkYSIsImJ5dGVTdHIiLCJ3ZWJVcmwiLCJoZWFkZXIiLCJyYXRpb1NpemUiLCJnZXRJbWFnZUluZm8iLCJyYXRpbyIsImNhbnZhc1dpZHRoIiwid2lkdGgiLCJjYW52YXNIZWlnaHQiLCJoZWlnaHQiLCJNYXRoIiwidHJ1bmMiLCJjdHgiLCJjcmVhdGVDYW52YXNDb250ZXh0IiwiZHJhd0ltYWdlIiwicGF0aCIsImRyYXciLCJzZXRUaW1lb3V0IiwiY2FudmFzVG9UZW1wRmlsZVBhdGgiLCJjYW52YXNJZCIsImRlc3RXaWR0aCIsImRlc3RIZWlnaHQiLCJxdWFsaXR5IiwicGljUGF0aCIsImdldEZpbGVJbmZvIiwibG9uZ1ByZXNzIiwic3RhcnQiLCJkdXJhdGlvbiIsInNhbXBsZVJhdGUiLCJudW1iZXJPZkNoYW5uZWxzIiwiZW5jb2RlQml0UmF0ZSIsImZvcm1hdCIsIm9uU3RhcnQiLCJ0b3VjaGVuZCIsIm9uU3RvcCIsInZvaWNlRGF0YSIsInNob3dTaGFyZU1lbnUiLCJ3aXRoU2hhcmVUaWNrZXQiLCJpIiwicHVzaCIsIm1lbG9keSIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFDQSxJQUFNQSxvQkFBb0JDLEdBQUdDLHVCQUFILEVBQTFCO0FBQ0EsSUFBTUMsa0JBQWtCRixHQUFHRyxrQkFBSCxFQUF4Qjs7SUFD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R0FBUixDQUFZLEtBQVo7QUFDQUQsa0JBQVFDLEdBQVIsQ0FBWXFCLElBQUk5QyxJQUFKLENBQVMrQyxJQUFyQjtBQUNBeEIsZUFBS04sU0FBTCxHQUFpQjZCLElBQUk5QyxJQUFKLENBQVMrQyxJQUExQjtBQUNBeEIsZUFBS2dDLE9BQUwsQ0FBYTtBQUNYdEMsdUJBQVc2QixJQUFJOUMsSUFBSixDQUFTK0M7QUFEVCxXQUFiO0FBR0Q7QUFkUSxPQUFYO0FBZ0JEOzs7O0VBcmVnQ3VGLGVBQUtDLEk7O2tCQUFuQjdJLEsiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IFRpdHRsZSBmcm9tICcuLi9jb21wb25lbnRzL3RpdHRsZSdcbiAgY29uc3QgaW5uZXJBdWRpb0NvbnRleHQgPSB3eC5jcmVhdGVJbm5lckF1ZGlvQ29udGV4dCgpXG4gIGNvbnN0IHJlY29yZGVyTWFuYWdlciA9IHd4LmdldFJlY29yZGVyTWFuYWdlcigpXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6a2U5aOwJ1xuICAgIH1cbiAgICBjb21wb25lbnRzID0ge1xuICAgICAgdGl0dGxlOiBUaXR0bGVcbiAgICB9XG5cbiAgICBkYXRhID0ge1xuICAgICAgdGVtcEZpbGVQYXRoOicnLFxuICAgICAgY1dpZHRoOiAwLFxuICAgICAgY0hlaWdodDogMCxcbiAgICAgIHNwZWVkVmFsdWU6IDUwLFxuICAgICAgdm9sVmFsdWU6IDUwLFxuICAgICAgdG9uZVZhbHVlOiA1MCxcbiAgICAgIG11c2ljVmFsdWU6IDUwLFxuICAgICAgdGVsbGVyU3R5bGU6IDEsXG4gICAgICB2YWx1ZUxlbjogMTEzLFxuICAgICAgY2hlY2tTdHlsZTogMSxcbiAgICAgIGN1cnJlbnROb3RlTGVuOiAwLFxuICAgICAgYnRuc3RhdHVzOiAwLFxuICAgICAgYmFja011c2ljOiBbXSxcbiAgICAgIGJhY2tNdXNpY1JlOiBcIuaCoOaJrOWpiei9rFwiLFxuICAgICAgcG9wTXVzaWM6IFtdLFxuICAgICAgcG9wdGFwSW5kZXg6IDAsXG4gICAgICB0ZWxsZXJBcnI6IFtdLFxuICAgICAgdmFsdWU6W1wiVEVF6ZuG5Zui77yIVEVFIEdyb3Vw77yJ5LiT5rOo5LqO5Lq65bel5pm66IO95oqA5pyv6aKG5Z+f77yM6Ieq5Li756CU5Y+R5Z+65LqO5rex5bqm5a2m5Lmg55qE5py65Zmo6KeG6KeJ57O757uf77yM5oul5pyJ5aSa6aG5QUnnn6Xor4bkuqfmnYPkuJPliKnvvIznu7zlkIjmgKfog73ovr7liLDlm73lhoXkuIDmtYHmsLTlubPjgILpppbliJvliIbluIPlvI9BSeeul+WKm+W5s+WPsO+8jOW8uuWkp+eahOaVsOaNruWkhOeQhuiDveWKm+OAgua7oei2s+S7juWOn+Wni+aVsOaNruWIsOaooeWei+S6p+WHuueahOS4gOermeW8j+acjeWKoeOAglwiXVxuICAgIH1cblxuICAgIGNvbXB1dGVkID0ge1xuICAgIH1cblxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBwbGF5KGUpIHtcbiAgICAgICAgdGhpcy5idG5zdGF0dXMgPT09IDA/dGhpcy5idG5zdGF0dXM9MTp0aGlzLmJ0bnN0YXR1cz0wXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuYnRuc3RhdHVzKVxuICAgICAgICBsZXQgdGhhdCA9IHRoaXNcbiAgICAgICAgY29uc29sZS5sb2codGhhdC50ZWxsZXJBcnJbdGhhdC50ZWxsZXJTdHlsZS0wXS5pZClcbiAgICAgICAgaWYodGhhdC5idG5zdGF0dXMgPT09IDEpe1xuICAgICAgICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgICAgICAgIG1hc2s6IHRydWUsXG4gICAgICAgICAgICB0aXRsZTogJ+WQiOaIkOS4re+8jOivt+eojeetiSdcbiAgICAgICAgICB9KVxuICAgICAgICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly9tYW5hZ2UudGVlLmNvbS90ZWUvb3BlbmFpL3R0cy9zeW50aGV0aWMnLFxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgIHVzZXJJZDogXCIxMjNcIiwgLy8gdWlk5pqC5pe25Lu75oSPXG4gICAgICAgICAgICAgIGNvbnRlbnQ6IHRoYXQudmFsdWUudG9TdHJpbmcoKSwgLy8gdGV4dGFyZWHlhoXnmoTovpPlhaXlhoXlrrlcbiAgICAgICAgICAgICAgdm9pY2U6IHRoYXQudGVsbGVyQXJyW3RoYXQudGVsbGVyU3R5bGUtMF0uaWQsIC8vIOaSremfs+WRmFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiB7XG4gICAgICAgICAgICAgICAgdGVtcGxhdGVJZDogdGhhdC5iYWNrTXVzaWNbdGhhdC5wb3B0YXBJbmRleF0udGVtcGxhdGVJZCwgLy8g6YCJ5Y+W55qE6IOM5pmv6Z+z5LmQXG4gICAgICAgICAgICAgICAgdm9sdW1lOiB0aGF0Lm11c2ljVmFsdWUvMTAwIC8v6IOM5pmv6Z+z5LmQ6Z+z6YePXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGRpYWxlY3Q6IHRoYXQudGVsbGVyQXJyW3RoYXQudGVsbGVyU3R5bGUtMF0ubGFuZ3VhZ2UsIC8vIOaWueiogO+8jOaSremfs+WRmOmHjFxuICAgICAgICAgICAgICBkYXRhVHlwZTogXCJ1cmxcIixcbiAgICAgICAgICAgICAgZXh0ZW5zaW9uOiBcIm1wM1wiLFxuICAgICAgICAgICAgICB2b2x1bWU6IHRoYXQudm9sVmFsdWUvMTAwLCAvLyDpn7Pph49cbiAgICAgICAgICAgICAgc3BlZWQ6IHRoYXQuc3BlZWRWYWx1ZS8xMDAgLy8g6K+t6YCfXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKXtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJzIyMjIyMjIyMjInKVxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YS5EQVRBLmZpbGVQYXRoKVxuICAgICAgICAgICAgICAvLyB3eC5wbGF5Vm9pY2Uoe1xuICAgICAgICAgICAgICAvLyAgIGZpbGVQYXRoOiByZXMuZGF0YS5EQVRBLmZpbGVQYXRoLFxuICAgICAgICAgICAgICAvLyAgIHN1Y2Nlc3MoKXtcbiAgICAgICAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKCdib2ZhJylcbiAgICAgICAgICAgICAgLy8gICB9LFxuICAgICAgICAgICAgICAvLyAgIGZhaWwocmVzKXtcbiAgICAgICAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgICAgICAgLy8gICB9LFxuICAgICAgICAgICAgICAvLyAgIGNvbXBsZXRlKCkgeyB9XG4gICAgICAgICAgICAgIC8vIH0pXG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCflvIDlp4vmkq3mlL4nKVxuICAgICAgICAgICAgICB3eC5oaWRlTG9hZGluZyh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICfliqDovb3kuK0nXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIGlmKHRoYXQuYnRuc3RhdHVzID09PSAxKXtcbiAgICAgICAgICAgICAgICBpbm5lckF1ZGlvQ29udGV4dC5hdXRvcGxheSA9IHRydWVcbiAgICAgICAgICAgICAgICBpbm5lckF1ZGlvQ29udGV4dC5zcmMgPSByZXMuZGF0YS5EQVRBLmZpbGVQYXRoXG4gICAgICAgICAgICAgICAgaW5uZXJBdWRpb0NvbnRleHQub25QbGF5KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfmraPlnKjmkq3mlL4nKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgaW5uZXJBdWRpb0NvbnRleHQub25FcnJvcigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5pKt5pS+5aSx6LSlJylcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIGlubmVyQXVkaW9Db250ZXh0Lm9uRW5kZWQoKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+aSreaUvuWujOaIkCcpXG4gICAgICAgICAgICAgICAgICAvLyB0aGF0LmJ0bnN0YXR1cyA9IDBcbiAgICAgICAgICAgICAgICAgIHRoYXQuc2V0RGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGJ0bnN0YXR1czogMFxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIHRoYXQuYnRuc3RhdHVzID0gMFxuICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhhdC5idG5zdGF0dXMpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfWVsc2UgaWYodGhhdC5idG5zdGF0dXMgPT09IDApe1xuICAgICAgICAgICAgICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgICAgICAgICAgICAgIG1hc2s6IHRydWUsXG4gICAgICAgICAgICAgICAgICB0aXRsZTogJ+ezu+e7n+e5geW/me+8jOivt+eojeWQjumHjeivlSdcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIGlubmVyQXVkaW9Db250ZXh0LnN0b3AoKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH1lbHNlIGlmKHRoYXQuYnRuc3RhdHVzID09PSAwKXtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZygn5YGc5q2iJylcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhpbm5lckF1ZGlvQ29udGV4dClcbiAgICAgICAgICBpbm5lckF1ZGlvQ29udGV4dC5zdG9wKClcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgIH0sXG4gICAgICBfaW5wdXQoZXZlbnQpIHtcbiAgICAgICAgbGV0IHZhbHVlID0gZXZlbnQuZGV0YWlsLnZhbHVlXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGV2ZW50LmRldGFpbC52YWx1ZS5sZW5ndGgpXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZVxuICAgICAgICAvLyDovpPlhaXmlofmnKzplb/luqbovazkuLpudW1iZXJcbiAgICAgICAgdGhpcy52YWx1ZUxlbiA9IGV2ZW50LmRldGFpbC52YWx1ZS5sZW5ndGggLTBcbiAgICAgIH0sXG4gICAgICBzd2l0Y2hUYWIodmFsKSB7XG4gICAgICAgIC8vIOi9rOS4um51bWJlclxuICAgICAgICB0aGlzLmNoZWNrU3R5bGUgPSB2YWwgLSAwXG4gICAgICAgIGlmKHRoaXMuY2hlY2tTdHlsZSA9PT0gMSl7XG4gICAgICAgICAgdGhpcy52YWx1ZSA9IFtcIlRFRembhuWbou+8iFRFRSBHcm91cO+8ieS4k+azqOS6juS6uuW3peaZuuiDveaKgOacr+mihuWfn++8jOiHquS4u+eglOWPkeWfuuS6jua3seW6puWtpuS5oOeahOacuuWZqOinhuinieezu+e7n++8jOaLpeacieWkmumhuUFJ55+l6K+G5Lqn5p2D5LiT5Yip77yM57u85ZCI5oCn6IO96L6+5Yiw5Zu95YaF5LiA5rWB5rC05bmz44CC6aaW5Yib5YiG5biD5byPQUnnrpflipvlubPlj7DvvIzlvLrlpKfnmoTmlbDmja7lpITnkIbog73lipvjgILmu6HotrPku47ljp/lp4vmlbDmja7liLDmqKHlnovkuqflh7rnmoTkuIDnq5nlvI/mnI3liqHjgIJcIl1cbiAgICAgICAgICB0aGlzLnZhbHVlTGVuID0gMTEzXG4gICAgICAgIH1lbHNlIGlmKHRoaXMuY2hlY2tTdHlsZSA9PT0gMil7XG4gICAgICAgICAgdGhpcy52YWx1ZSA9ICcnXG4gICAgICAgICAgdGhpcy52YWx1ZUxlbiA9IDBcbiAgICAgICAgfWVsc2UgaWYodGhpcy5jaGVja1N0eWxlID09PSAzKXtcbiAgICAgICAgICB0aGlzLnZhbHVlID0gJydcbiAgICAgICAgICB0aGlzLnZhbHVlTGVuID0gMFxuICAgICAgICB9XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHZhbClcbiAgICAgICAgLy8gY29uc29sZS5sb2coZS5jdXJyZW50VGFyZ2V0KVxuICAgICAgfSxcbiAgICAgIGNoZWNrVGVsbGVyKHZhbCkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyh2YWwpXG4gICAgICAgIHRoaXMudGVsbGVyU3R5bGUgPSB2YWwgLSAwXG4gICAgICB9LFxuICAgICAgY2xlYXJBbGwoKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSAnJ1xuICAgICAgICB0aGlzLnZhbHVlTGVuID0gMFxuICAgICAgfSxcbiAgICAgIF9pbnB1dFZvaWNlKGV2ZW50KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwi6K+t6Z+z6L6T5YWlXCIpXG4gICAgICB9LFxuICAgICAgX2lucHV0UGljKGVuZW50KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwi5Zu+54mH6L6T5YWlXCIpXG4gICAgICB9LFxuICAgICAgdm9sY2hvaWNlKGV2ZW50KXtcbiAgICAgICAgdGhpcy52b2xWYWx1ZSA9IGV2ZW50LmRldGFpbC52YWx1ZVxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnZvbFZhbHVlKVxuICAgICAgfSxcbiAgICAgIHNwZWVkY2hvaWNlKGV2ZW50KXtcbiAgICAgICAgdGhpcy5zcGVlZFZhbHVlID0gZXZlbnQuZGV0YWlsLnZhbHVlXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc3BlZWRWYWx1ZSlcbiAgICAgIH0sXG4gICAgICB0b25lY2hvaWNlKGV2ZW50KXtcbiAgICAgICAgdGhpcy50b25lVmFsdWUgPSBldmVudC5kZXRhaWwudmFsdWVcbiAgICAgICAgY29uc29sZS5sb2codGhpcy50b25lVmFsdWUpXG4gICAgICB9LFxuICAgICAgbXVzaWNjaG9pY2UoZXZlbnQpe1xuICAgICAgICB0aGlzLm11c2ljVmFsdWUgPSBldmVudC5kZXRhaWwudmFsdWVcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5tdXNpY1ZhbHVlKVxuICAgICAgfSxcbiAgICAgIGdldGJhY2tNdXNpYygpIHtcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzXG4gICAgICAgIHd4LnNob3dBY3Rpb25TaGVldCh7XG4gICAgICAgICAgaXRlbUxpc3Q6IHRoYXQucG9wTXVzaWMsXG4gICAgICAgICAgc3VjY2VzcyhyZXMpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgICAgIHRoYXQucG9wdGFwSW5kZXggPSByZXMudGFwSW5kZXhcbiAgICAgICAgICAgIHRoYXQuYmFja011c2ljUmUgPSB0aGF0LnBvcE11c2ljW3RoYXQucG9wdGFwSW5kZXhdXG4gICAgICAgICAgICB0aGF0LnNldERhdGEoe1xuICAgICAgICAgICAgICBiYWNrTXVzaWNSZTogdGhhdC5wb3BNdXNpY1t0aGF0LnBvcHRhcEluZGV4XVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWwocmVzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZXJyTXNnKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICAvLyB0aGVtZUxhbmcoKSB7XG4gICAgICAvLyAgIHd4LnNob3dBY3Rpb25TaGVldCh7XG4gICAgICAvLyAgICAgaXRlbUxpc3Q6IFsn5pmu6YCa6K+dJ10sXG4gICAgICAvLyAgICAgc3VjY2VzcyhyZXMpIHtcbiAgICAgIC8vICAgICAgIGNvbnNvbGUubG9nKHJlcy50YXBJbmRleClcbiAgICAgIC8vICAgICB9LFxuICAgICAgLy8gICAgIGZhaWwocmVzKSB7XG4gICAgICAvLyAgICAgICBjb25zb2xlLmxvZyhyZXMuZXJyTXNnKVxuICAgICAgLy8gICAgIH1cbiAgICAgIC8vICAgfSlcbiAgICAgIC8vIH0sXG4gICAgICB0aGVtZU1vb2QoKSB7XG4gICAgICAgIHd4LnNob3dBY3Rpb25TaGVldCh7XG4gICAgICAgICAgaXRlbUxpc3Q6IFsn5oSJ5oKmJ10sXG4gICAgICAgICAgc3VjY2VzcyhyZXMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy50YXBJbmRleClcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWwocmVzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZXJyTXNnKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICB0aGVtZVR5cGUoKSB7XG4gICAgICAgIHd4LnNob3dBY3Rpb25TaGVldCh7XG4gICAgICAgICAgaXRlbUxpc3Q6IFsn6K+X5q2MJ10sXG4gICAgICAgICAgc3VjY2VzcyhyZXMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy50YXBJbmRleClcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWwocmVzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZXJyTXNnKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBjaG9vc2VJbWcoKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCfpgInmi6nnm7jniYcnKVxuICAgICAgICBsZXQgdGhhdCA9IHRoaXNcbiAgICAgICAgd3guY2hvb3NlSW1hZ2Uoe1xuICAgICAgICAgIGNvdW50OiAxLFxuICAgICAgICAgIHNpemVUeXBlOiBbJ29yaWdpbmFsJywgJ2NvbXByZXNzZWQnXSxcbiAgICAgICAgICBzb3VyY2VUeXBlOiBbJ2FsYnVtJywgJ2NhbWVyYSddLFxuICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgICAgICB3eC5zaG93TG9hZGluZyh7XG4gICAgICAgICAgICAgIG1hc2s6IHRydWUsXG4gICAgICAgICAgICAgIHRpdGxlOiAn5aSE55CG5Lit77yM6K+356iN562JJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgICAgIGxldCBzaXplID0gcmVzLnRlbXBGaWxlc1swXS5zaXplXG4gICAgICAgICAgICAvLyB0ZW1wRmlsZVBhdGjlj6/ku6XkvZzkuLppbWfmoIfnrb7nmoRzcmPlsZ7mgKfmmL7npLrlm77niYdcbiAgICAgICAgICAgIHRoYXQudGVtcEZpbGVQYXRoID0gcmVzLnRlbXBGaWxlUGF0aHNbMF1cbiAgICAgICAgICAgIGNvbnN0IGZzID0gd3guZ2V0RmlsZVN5c3RlbU1hbmFnZXIoKVxuICAgICAgICAgICAgaWYoc2l6ZSA8IDEwNDg1NzYwMCl7XG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCcxMTExMTExMTExMTExJylcbiAgICAgICAgICAgICAgZnMucmVhZEZpbGUoe1xuICAgICAgICAgICAgICAgIGZpbGVQYXRoOiB0aGF0LnRlbXBGaWxlUGF0aCxcbiAgICAgICAgICAgICAgICBlbmNvZGluZzogJ2Jhc2U2NCcsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICAgbGV0IGRhID0gZGF0YS5kYXRhXG4gICAgICAgICAgICAgICAgICB3eC5yZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly9tYW5hZ2UudGVlLmNvbS90ZWUvb3BlbmFpL3R0cy93ZWJPY3InLCAvLyDku4XkuLrnpLrkvovvvIzlubbpnZ7nnJ/lrp7nmoTmjqXlj6PlnLDlnYBcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICBieXRlU3RyOiBkYSxcbiAgICAgICAgICAgICAgICAgICAgICB3ZWJVcmw6ICcnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgLy8g6buY6K6k5YC8XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICflpITnkIbkuK3vvIzor7fnqI3nrYknXG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXMuZGF0YSlcbiAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZhbHVlID0gcmVzLmRhdGEuREFUQVxuICAgICAgICAgICAgICAgICAgICAgIHRoYXQudmFsdWVMZW4gPSByZXMuZGF0YS5EQVRBLnRvU3RyaW5nKCkubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXREYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiByZXMuZGF0YS5EQVRBXG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldERhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVMZW46IHJlcy5kYXRhLkRBVEEudG9TdHJpbmcoKS5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgbGV0IHJhdGlvU2l6ZSA9IDEwNDg1NzAvc2l6ZVxuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyYXRpb1NpemUpXG4gICAgICAgICAgICAgIC8vLS0tLS3ov5Tlm57pgInlrprnhafniYfnmoTmnKzlnLDmlofku7bot6/lvoTliJfooajvvIzojrflj5bnhafniYfkv6Hmga8tLS0tLS0tLS0tLVxuICAgICAgICAgICAgICB3eC5nZXRJbWFnZUluZm8oe1xuICAgICAgICAgICAgICAgICAgc3JjOiB0aGF0LnRlbXBGaWxlUGF0aCwgIFxuICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKXtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzKVxuICAgICAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLeWIqeeUqGNhbnZhc+WOi+e8qeWbvueJhy0tLS0tLS0tLS0tLS0tXG4gICAgICAgICAgICAgICAgICAgIHZhciByYXRpbyA9IDI7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjYW52YXNXaWR0aCA9IHJlcy53aWR0aCAvL+WbvueJh+WOn+Wni+mVv+WuvVxuICAgICAgICAgICAgICAgICAgICB2YXIgY2FudmFzSGVpZ2h0ID0gcmVzLmhlaWdodFxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoY2FudmFzV2lkdGggPiA0MDAgfHwgY2FudmFzSGVpZ2h0ID4gNDAwKXsvLyDkv53or4Hlrr3pq5jlnKg0MDDku6XlhoVcbiAgICAgICAgICAgICAgICAgICAgICBjYW52YXNXaWR0aCA9IE1hdGgudHJ1bmMocmVzLndpZHRoIC8gcmF0aW8pXG4gICAgICAgICAgICAgICAgICAgICAgY2FudmFzSGVpZ2h0ID0gTWF0aC50cnVuYyhyZXMuaGVpZ2h0IC8gcmF0aW8pXG4gICAgICAgICAgICAgICAgICAgICAgcmF0aW8rKztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhjYW52YXNXaWR0aCwgY2FudmFzSGVpZ2h0KVxuICAgICAgICAgICAgICAgICAgICB0aGF0LnNldERhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgIGNXaWR0aDogY2FudmFzV2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgY0hlaWdodDogY2FudmFzSGVpZ2h0XG4gICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0t57uY5Yi25Zu+5b2i5bm25Y+W5Ye65Zu+54mH6Lev5b6ELS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICAgICAgICAgICAgdmFyIGN0eCA9IHd4LmNyZWF0ZUNhbnZhc0NvbnRleHQoJ2NhbnZhcycpXG4gICAgICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UocmVzLnBhdGgsIDAsIDAsIGNhbnZhc1dpZHRoLCBjYW52YXNIZWlnaHQpXG4gICAgICAgICAgICAgICAgICAgIGN0eC5kcmF3KGZhbHNlLCBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICB3eC5jYW52YXNUb1RlbXBGaWxlUGF0aCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FudmFzSWQ6ICdjYW52YXMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc3RXaWR0aDogY2FudmFzV2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzdEhlaWdodDogY2FudmFzSGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1YWxpdHk6cmF0aW9TaXplLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzKS8v5pyA57uI5Zu+54mH6Lev5b6EXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBpY1BhdGggPSByZXMudGVtcEZpbGVQYXRoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZzLnJlYWRGaWxlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlUGF0aDogcGljUGF0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmNvZGluZzogJ2Jhc2U2NCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhID0gZGF0YS5kYXRhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnNTU1NTU1NTUnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZGEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3eC5yZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly9tYW5hZ2UudGVlLmNvbS90ZWUvb3BlbmFpL3R0cy93ZWJPY3InLCAvLyDku4XkuLrnpLrkvovvvIzlubbpnZ7nnJ/lrp7nmoTmjqXlj6PlnLDlnYBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBieXRlU3RyOiBkYSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZWJVcmw6ICcnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgLy8g6buY6K6k5YC8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICflpITnkIbkuK3vvIzor7fnqI3nrYknXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXMuZGF0YSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZhbHVlID0gcmVzLmRhdGEuREFUQVswXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0RGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcmVzLmRhdGEuREFUQVswXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnMuZ2V0RmlsZUluZm8oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVQYXRoOiBwaWNQYXRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzLmVyck1zZylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9LDEwMCkpXG5cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBmYWlsOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzLmVyck1zZylcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoYXQudGVtcEZpbGVQYXRoKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgbG9uZ1ByZXNzKCl7XG4gICAgICAgIC8vIOmVv+aMieW9lemfs+S6i+S7tlxuICAgICAgICAvLyBjb25zb2xlLmxvZygn6ZW/5oyJ5LqL5Lu2JylcbiAgICAgICAgcmVjb3JkZXJNYW5hZ2VyLnN0YXJ0KHtcbiAgICAgICAgICBkdXJhdGlvbjogNjAwMDAsLy/mjIflrprlvZXpn7PnmoTml7bplb/vvIzljZXkvY0gbXNcbiAgICAgICAgICBzYW1wbGVSYXRlOiA0ODAwMCwvL+mHh+agt+eOh1xuICAgICAgICAgIG51bWJlck9mQ2hhbm5lbHM6IDIsLy/lvZXpn7PpgJrpgZPmlbBcbiAgICAgICAgICBlbmNvZGVCaXRSYXRlOiAzMjAwMDAsLy/nvJbnoIHnoIHnjodcbiAgICAgICAgICBmb3JtYXQ6ICdtcDMnLy/pn7PpopHmoLzlvI/vvIzmnInmlYjlgLwgYWFjL21wM1xuICAgICAgICAgIC8vIGZyYW1lU2l6ZTogNTAsLy/mjIflrprluKflpKflsI/vvIzljZXkvY0gS0JcbiAgICAgICAgfSlcbiAgICAgICAgcmVjb3JkZXJNYW5hZ2VyLm9uU3RhcnQoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdyZWNvcmRlciBzdGFydCcpXG4gICAgICAgIH0pXG4gICAgICAgIC8v6ZSZ6K+v5Zue6LCDXG4gICAgICAgIHJlY29yZGVyTWFuYWdlci5vbkVycm9yKChyZXMpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIHRvdWNoZW5kKCl7XG4gICAgICAgIC8vIOmVv+aMieadvuW8gOS6i+S7tlxuICAgICAgICBjb25zb2xlLmxvZygn6ZW/5oyJ5p2+5byA5LqL5Lu2JylcbiAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xuICAgICAgICAgIG1hc2s6IHRydWUsXG4gICAgICAgICAgdGl0bGU6ICflpITnkIbkuK3vvIzor7fnqI3nrYknXG4gICAgICAgIH0pXG4gICAgICAgIGxldCB0aGF0ID0gdGhpc1xuICAgICAgICByZWNvcmRlck1hbmFnZXIuc3RvcCgpO1xuICAgICAgICByZWNvcmRlck1hbmFnZXIub25TdG9wKChyZXMpID0+IHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgICAgdGhhdC50ZW1wRmlsZVBhdGggPSByZXMudGVtcEZpbGVQYXRoO1xuICAgICAgICAgIGNvbnN0IHRlbXBGaWxlUGF0aCA9IHJlcy50ZW1wRmlsZVBhdGhcbiAgICAgICAgICBjb25zdCBmcyA9IHd4LmdldEZpbGVTeXN0ZW1NYW5hZ2VyKClcbiAgICAgICAgICAvLyBpbm5lckF1ZGlvQ29udGV4dC5hdXRvcGxheSA9IHRydWVcbiAgICAgICAgICAvLyBpbm5lckF1ZGlvQ29udGV4dC5zcmMgPSB0ZW1wRmlsZVBhdGhcbiAgICAgICAgICAvLyBpbm5lckF1ZGlvQ29udGV4dC5vblBsYXkoKCkgPT4ge1xuICAgICAgICAgIC8vICAgICBjb25zb2xlLmxvZygn5byA5aeL5pKt5pS+JylcbiAgICAgICAgICAvLyB9KVxuICAgICAgICAgIFxuICAgICAgICAgIGZzLnJlYWRGaWxlKHtcbiAgICAgICAgICAgIGZpbGVQYXRoOiB0ZW1wRmlsZVBhdGgsXG4gICAgICAgICAgICBlbmNvZGluZzogJ2Jhc2U2NCcsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGRhID0gZGF0YS5kYXRhXG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGRhKVxuICAgICAgICAgICAgICB3eC5yZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICB1cmw6ICdodHRwczovL21hbmFnZS50ZWUuY29tL3RlZS9vcGVuYWkvdHRzL3NwZWVjaFJlY29nbml6ZScsXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgYnl0ZVN0cjogZGEsXG4gICAgICAgICAgICAgICAgICBmb3JtYXQ6ICd3YXYnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICflpITnkIbkuK3vvIzor7fnqI3nrYknXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgbGV0IHZvaWNlRGF0YSA9IHJlcy5kYXRhXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgICAgICAgICAgICAvLyB3eC5zaG93TG9hZGluZyh7XG4gICAgICAgICAgICAgICAgICAvLyAgIG1hc2s6IHRydWUsXG4gICAgICAgICAgICAgICAgICAvLyAgIHRpdGxlOiBKU09OLnN0cmluZ2lmeShyZXMuZGF0YS5EQVRBKSDmi7/liLDmlbDmja7ovazmiJDlrZfnrKbkuLJcbiAgICAgICAgICAgICAgICAgIC8vIH0pXG4gICAgICAgICAgICAgICAgICB0aGF0LnZhbHVlID0gdm9pY2VEYXRhLkRBVEFcbiAgICAgICAgICAgICAgICAgIHRoYXQudmFsdWVMZW4gPSB2b2ljZURhdGEuREFUQS50b1N0cmluZygpLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgdGhhdC5zZXREYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHZvaWNlRGF0YS5EQVRBXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgdGhhdC5zZXREYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVMZW46IHZvaWNlRGF0YS5EQVRBLnRvU3RyaW5nKCkubGVuZ3RoXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgICBvblNoYXJlQXBwTWVzc2FnZSgpe1xuICAgIFxuICAgIH1cbiAgICBvbkxvYWQgKCkge1xuICAgICAgd3guc2hvd1NoYXJlTWVudSh7XG4gICAgICAgIHdpdGhTaGFyZVRpY2tldDogdHJ1ZSxcbiAgICAgICAgc3VjY2Vzcygpe1xuICAgICAgICAgIGNvbnNvbGUubG9nKCfovazlj5Hlip/og70nKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgbGV0IHRoYXQgPSB0aGlzXG4gICAgICB3eC5yZXF1ZXN0KHtcbiAgICAgICAgdXJsOiAnaHR0cHM6Ly9tYW5hZ2UudGVlLmNvbS90ZWUvb3BlbmFpL3R0cy9iYWNrZ3JvdW5kTGlzdCcsIC8vIOS7heS4uuekuuS+i++8jOW5tumdnuecn+WunueahOaOpeWPo+WcsOWdgFxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgZGF0YToge30sXG4gICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgLy8g6buY6K6k5YC8XG4gICAgICAgIH0sXG4gICAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgICAgdGhhdC5zZXREYXRhKHtcbiAgICAgICAgICAgIGJhY2tNdXNpYzogcmVzLmRhdGEuREFUQVxuICAgICAgICAgIH0pXG4gICAgICAgICAgdGhhdC5iYWNrTXVzaWMgPSByZXMuZGF0YS5EQVRBXG4gICAgICAgICAgLy8gY29uc29sZS5sb2coJzIyMjIyMjIyMjIyJylcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGF0LmJhY2tNdXNpYylcbiAgICAgICAgICBmb3IobGV0IGk9MDtpPHRoYXQuYmFja011c2ljLmxlbmd0aDsrK2kpe1xuICAgICAgICAgICAgdGhhdC5wb3BNdXNpYy5wdXNoKHRoYXQuYmFja011c2ljW2ldLm1lbG9keSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAvLyDmkq3pn7PlkZjmjqXlj6NcbiAgICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgICB1cmw6ICdodHRwczovL21hbmFnZS50ZWUuY29tL3RlZS9vcGVuYWkvdHRzL3ZvaWNlTGlzdCcsXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBkYXRhOiB7fSxcbiAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyAvLyDpu5jorqTlgLxcbiAgICAgICAgfSxcbiAgICAgICAgc3VjY2VzcyhyZXMpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygn5pKt6Z+z5ZGYJylcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YS5EQVRBKVxuICAgICAgICAgIHRoYXQudGVsbGVyQXJyID0gcmVzLmRhdGEuREFUQVxuICAgICAgICAgIHRoYXQuc2V0RGF0YSh7XG4gICAgICAgICAgICB0ZWxsZXJBcnI6IHJlcy5kYXRhLkRBVEFcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxuIl19
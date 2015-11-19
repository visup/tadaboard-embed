var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.Tadaboard = factory();
})(this, function () {
  'use strict';

  var Tadaboard = (function () {
    function Tadaboard(containerElement, tadaboardId) {
      var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

      _classCallCheck(this, Tadaboard);

      if (!containerElement || !containerElement.nodeType) {
        throw new TypeError('Tadaboard: first argument must be an html element');
      }

      if (!tadaboardId || !tadaboardId.length) {
        throw new TypeError('Tadaboard: second argument must be the tadaboard share id');
      }

      this.containerElement = containerElement;
      this.tadaboardId = tadaboardId;
      this.options = options;
      this._setupIframe();
    }

    _createClass(Tadaboard, [{
      key: '_setupIframe',
      value: function _setupIframe() {
        var _this = this;

        this.iframe = document.createElement('iframe');
        this.iframe.setAttribute('src', (this.options.customDomain || 'https://www.tadaboard.com') + '/e/' + this.tadaboardId);
        this.iframe.setAttribute('frameborder', '0');
        this.iframe.setAttribute('scrolling', 'no');
        this.iframe.style.width = '100%';
        this.containerElement.appendChild(this.iframe);
        window.addEventListener('message', function (event) {
          if (event.data.type == 'tadaboardSize') {
            _this.iframe.style.height = event.data.height;
          }
        }, false);
      }
    }]);

    return Tadaboard;
  })();

  var tadaboard_embed = Tadaboard;

  return tadaboard_embed;
});
//# sourceMappingURL=tadaboard-embed.js.map

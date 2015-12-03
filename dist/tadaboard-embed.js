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
        this.containerElement.appendChild(this.iframe);
        if (this.options.width && this.options.height) {
          this.iframe.style.width = this.options.width + 'px';
          this.iframe.style.height = this.options.height + 'px';
        } else {
          this.iframe.style.width = '100%';
          window.addEventListener('message', function (event) {
            if (event.data.type == 'tadaboardSize') {
              _this.iframe.style.height = event.data.height + 'px';
            }
            if (_this.options.showTitle == '0') {
              _this.iframe.contentWindow.postMessage({ showTitle: false }, '*');
            }
          }, false);
        }
      }
    }], [{
      key: 'runParser',
      value: function runParser() {
        var embeds = document.getElementsByClassName('tadaboard-embed');
        for (var i = 0; i < embeds.length; i++) {
          var embedElement = embeds[i];
          if (embedElement.children.length > 0) {
            break;
          }
          if (embedElement.dataset.width && embedElement.dataset.height) {
            new Tadaboard(embedElement, embedElement.dataset.id, { width: embedElement.dataset.width, height: embedElement.dataset.height, showTitle: embedElement.dataset.title });
          } else {
            new Tadaboard(embedElement, embedElement.dataset.id, { showTitle: embedElement.dataset.title });
          }
        }
      }
    }]);

    return Tadaboard;
  })();

  if (typeof window !== 'undefined' && window.TadaboardAutoload) {
    window.TadaboardAutoload = undefined;
    Tadaboard.runParser();
  }

  var tadaboard_embed = Tadaboard;

  return tadaboard_embed;
});
//# sourceMappingURL=tadaboard-embed.js.map

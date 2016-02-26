class Tadaboard {
  constructor(containerElement, tadaboardId, options = {}) {
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

  _setupIframe() {
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
      window.addEventListener('message', (event) => {
        if (event.data.dashboardId != this.tadaboardId) return;
        if (event.data.type == 'tadaboardSize') {
          this.iframe.style.height = event.data.height + 'px';
        }
        if (this.options.showTitle == '0') {
          this.iframe.contentWindow.postMessage({showTitle: false}, '*');
        }
      }, false);
    }
  }

  static runParser() {
    var embeds = document.getElementsByClassName('tadaboard-embed');
    for (var i = 0; i < embeds.length; i++) {
      var embedElement = embeds[i];
      if (embedElement.children.length > 0) { break; }
      if (embedElement.dataset.width && embedElement.dataset.height) {
        new Tadaboard(embedElement, embedElement.dataset.id, {width: embedElement.dataset.width, height: embedElement.dataset.height, showTitle: embedElement.dataset.title});
      } else {
        new Tadaboard(embedElement, embedElement.dataset.id, {showTitle: embedElement.dataset.title});
      }
    }
  }
}

if (typeof window !== 'undefined' && window.TadaboardAutoload) {
  window.TadaboardAutoload = undefined;
  Tadaboard.runParser();
}

export default Tadaboard;

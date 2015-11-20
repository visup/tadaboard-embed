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
    this.iframe.style.width = '100%';
    this.containerElement.appendChild(this.iframe);
    window.addEventListener('message', (event) => {
      if (event.data.type == 'tadaboardSize') {
        this.iframe.style.height = event.data.height;
      }
    }, false);
  }

  static runParser() {
    var embeds = document.getElementsByClassName('tadaboard-embed');
    for (var i = 0; i < embeds.length; i++) {
      if (embeds[i].children.length > 0) { break; }
      new Tadaboard(embeds[i], embeds[i].dataset.id);
    }
  }
}

if (window.TadaboardAutoload) {
  window.TadaboardAutoload = undefined;
  Tadaboard.runParser();
}

export default Tadaboard;

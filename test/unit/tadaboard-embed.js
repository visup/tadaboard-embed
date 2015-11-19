import Tadaboard from '../../src/tadaboard-embed';

describe('Tadaboard', () => {
  describe('Constructor', () => {
    beforeEach(() => {
      spy(Tadaboard);
    });

    it('should throw an exception if no element is passed', () => {
      expect(Tadaboard).to.throw(TypeError);
    });

    it('should throw an exception if no tadaboard id is passed', () => {
      expect(() => {
        new Tadaboard(document.createElement('div'));
      }).to.throw(TypeError);
    });

    it('should not throw an exception if an html element and tadaboard id has been passed', () => {
      expect(() => {
        new Tadaboard(document.createElement('div'), 'someId');
      }).to.not.throw(TypeError);
    });

    it('should append an iframe to the container element', () => {
      let container = document.createElement('div');
      new Tadaboard(container, 'someId');
      expect(container.children[0]).to.not.be.undefined;
      let iframe = container.children[0];
      expect(iframe.tagName).to.equal('IFRAME');
      expect(iframe.attributes.src.value).to.equal('https://www.tadaboard.com/e/someId');
    });
  });
});

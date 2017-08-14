const ReactDOM = require('react-dom');
const retargetEvents = require('./retargetEvents');
const getStyleElementsFromReactWebComponentStyleLoader = require('./getStyleElementsFromReactWebComponentStyleLoader');

module.exports = {
  /**
   * todo fix jsdoc type of app and options
   * @param {*} app
   * @param {string} tagName
   * @param {Object} [options]
   */
  create: function(app, tagName, options) {
    const proto = Object.create(HTMLElement.prototype, {
      attachedCallback: {
        value: function() {
          const shadowRoot = this.createShadowRoot();
          const mountPoint = document.createElement('div');
          const styles = getStyleElementsFromReactWebComponentStyleLoader();
          for (var i in styles) {
            shadowRoot.appendChild(styles[i])
          }
          shadowRoot.appendChild(mountPoint);
          ReactDOM.render(app, mountPoint);
          retargetEvents(shadowRoot);
        },
      },
    });
    document.registerElement(tagName, { prototype: proto });
  },
};
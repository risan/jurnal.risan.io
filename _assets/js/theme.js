(function() {
  'use strict';

  var $el = {};

  /**
   * Initialize theme.
   *
   * @return {Void}
   */
  function init() {
    loadElements();
    attachEvents();

    activatePushNav();
  }

  /**
   * Load all required elements.
   *
   * @return {Void}
   */
  function loadElements() {
    $el.body = document.getElementsByTagName('body')[0];
    $el.nav = document.getElementById('main-nav');
    $el.btnNav = document.getElementById('btn-nav');
    $el.btnNavClose = document.getElementById('btn-nav-close');
    $el.navBgOverlay = document.getElementById('nav-bg-overlay');
  }

  /**
   * Attach event handlers.
   *
   * @return {Void}
   */
  function attachEvents() {
    $el.btnNav.addEventListener('click', toggleNav, false);
    $el.btnNavClose.addEventListener('click', toggleNav, false);
    $el.navBgOverlay.addEventListener('click', toggleNav, false);
  }

  /**
   * Activate push navigation.
   *
   * @return {Void}
   */
  function activatePushNav() {
    addClass($el.body, 'nav-push-active');
  }

  /**
   * Toggle nav.
   *
   * @param  {Event} e
   * @return {Void}
   */
  function toggleNav(e) {
    e.preventDefault();
    toggleClass($el.body, 'nav-open');
  }

  /**
   * Add class to element.
   *
   * @param {Element} $el
   * @param {String} classname
   */
  function addClass($el, classname) {
    var classes = $el.className.split(/\s+/);

    if (classes.indexOf(classname) >= 0) {
      return;
    }

    classes.push(classname);
    $el.className = classes.join(' ').replace(/^\s+|\s+$/,'');
  }

  /**
   * Toggle class from element.
   *
   * @param  {[type]} $el       [description]
   * @param  {[type]} classname [description]
   * @return {[type]}           [description]
   */
  function toggleClass($el, classname) {
    var classes = $el.className.split(/\s+/),
        exist = ~classes.indexOf(classname);

    classes.splice(exist ? classes.indexOf(classname) : 0,
               exist ? 1 : 0,
               exist ? null : classname);

    $el.className = classes.join(' ').replace(/^\s+|\s+$/,'');
  }

  init();
})();

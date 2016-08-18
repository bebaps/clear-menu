// TODO: inject a button to serve as the submenu toggle (if hasSubmenu = true)
// TODO: inject proper CSS class to control the direction of the overlay reveal (reveal: top, bottom, left, right, fade)


$.fn.clearmenu = function(options) {
  var settings = $.extend({
    trigger: this,
    overlay: $('#cm-overlay'),
    hasSubmenu: true,
    submenu: $('.cm-has-submenu'),
    reveal: 'top'
  }, options);

  var revealMenu = function() {
    settings.trigger.toggleClass('cm-is-active');
    settings.overlay.toggleClass('cm-is-visible');
  };

  settings.trigger.on('click.clearmenu', revealMenu);

  if (settings.hasSubmenu) {
    var toggleSubMenu = function() {
      $(this).parent().toggleClass('cm-has-submenu-open').find('ul').slideToggle(200);
    };

    settings.submenu.on('click.clearmenu', '.cm-sub-trigger', toggleSubMenu);
  }
}


$(function() {
  $('#cm-hamburger').clearmenu();
});

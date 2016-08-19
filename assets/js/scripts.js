// TODO: inject a button to serve as the submenu toggle (if hasSubmenu = true)
// TODO: inject proper CSS class to control the direction of the overlay reveal (reveal: top, bottom, left, right, fade)


$.fn.clearmenu = function(options) {
  var classes = {
    nav: '.cm-nav',
    listItem: '.cm-has-submenu',
    hasSubmenuOpen: '.cm-has-submenu-open',
    subMenuTrigger: '.cm-sub-trigger',
    overlay: '.cm-overlay',
    top: 'cm-reveal-top',
    bottom: 'cm-reveal-bottom',
    left: 'cm-reveal-left',
    right: 'cm-reveal-right',
    fade: 'cm-reveal-fade',
    visible: '.cm-is-visible'
  };

  var settings = $.extend({
    trigger: this,
    overlay: $('#cm-overlay'),
    hasSubmenu: true,
    submenu: $('.cm-has-submenu'),
    reveal: 'top',
    wordpress: false
  }, options);

  var revealMenu = function() {
    settings.trigger.toggleClass('cm-is-active');
    settings.overlay.toggleClass('cm-is-visible');
  };

  settings.trigger.on('click.clearmenu', revealMenu);

  if (settings.hasSubmenu) {
    var parentLink = $('.cm-has-submenu');
    var toggleSubMenu = function() {
      $(this).parent().toggleClass('cm-has-submenu-open').find('ul').slideToggle(200);
    };

    parentLink.append('<button class="cm-submenu-trigger" type="button" role="button"></button>');
    settings.submenu.on('click.clearmenu', '.cm-submenu-trigger', toggleSubMenu);
  }
}


$(function() {
  $('#cm-hamburger').clearmenu();
});

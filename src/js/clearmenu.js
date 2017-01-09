'use strict';

(function($) {
  $.fn.clearmenu = function(options) {
    var animationSpeed, classes, settings, setUpClearMenu, revealMenu, toggleSubMenu;

    // Establish the default CSS classes to use
    classes = {
      subMenu: 'cm-submenu',
      top: 'cm-panel-top',
      bottom: 'cm-panel-bottom',
      left: 'cm-panel-left',
      right: 'cm-panel-right',
      fade: 'cm-panel-fade',
      visible: 'cm-panel-open'
    };

    // Establish the default plug-in settings
    settings = $.extend({
      panel: this,
      close: true,
      trigger: '.cm-hamburger',
      reveal: 'fade',
      hasSubMenu: true,
      subMenu: '.cm-submenu',
      wordpress: false
    }, options);

    // Get the plug-in ready to run
    setUpClearMenu = function setUpClearMenu() {
      // Determine how to reveal the target panel
      switch (settings.reveal) {
        case 'bottom':
          $(settings.panel).addClass(classes.bottom);
          break;
        case 'left':
          $(settings.panel).addClass(classes.left);
          break;
        case 'right':
          $(settings.panel).addClass(classes.right);
          break;
        case 'fade':
          $(settings.panel).addClass(classes.fade);
          break;
        default:
          $(settings.panel).addClass(classes.top);
          break;
      }

      // Establish functionality if sub-menus are active
      if (settings.hasSubMenu) {
        animationSpeed = 200;

        if (!settings.wordpress) {
          toggleSubMenu = function toggleSubMenu() {
            $(this).parent().find('ul').toggleClass('cm-submenu-open').slideToggle(animationSpeed);
          };

          $(settings.panel).find('> ul ul').addClass(classes.subMenu);
          $(settings.subMenu).parent().append('<i class="icon icon-caret"></i>');
          $(settings.subMenu).next().on('click.clearmenu', toggleSubMenu);
        }

        if (settings.wordpress) {
          $(settings.panel).find('.menu-item-has-children').append('<i class="icon icon-caret"></i>');
          $('.menu-item-has-children').on('click.clearmenu', 'i', function() {
            $(this).prev('.sub-menu').slideToggle(animationSpeed);
          });
        }
      }

      // Set up the close button for the panel
      if (settings.close) {
        $(settings.panel).prepend('<i class="icon icon-close"></i>');
        $('.icon-close').on('click', function() {
          $(settings.panel).removeClass(classes.visible);

          if ('.cm-hamburger' === settings.trigger) {
            $(settings.trigger).removeClass('cm-hamburger-open');
          }
        });
      }
    };

    // Function to reveal the target panel that contains the menu
    revealMenu = function revealMenu() {
      if ('.cm-hamburger' === settings.trigger) {
        $(this).toggleClass('cm-hamburger-open');
      }

      $(settings.panel).toggleClass(classes.visible);
      $('.cd-menu-icon').toggleClass('is-clicked');
    };

    $(settings.trigger).on('click.clearmenu', revealMenu);
    setUpClearMenu();
  };
})(jQuery);

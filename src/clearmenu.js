(function($) {
  'use strict';

  $.fn.clearmenu = function(options) {
    var animationSpeed, classes, settings, setUpClearMenu, revealMenu, toggleSubMenu;

    // Establish the default CSS classes to use
    classes = {
      subMenu: 'cm-submenu',
      top: 'cm-top',
      bottom: 'cm-bottom',
      left: 'cm-left',
      right: 'cm-right',
      fade: 'cm-fade',
      visible: 'cm-open',
      active: 'cm-active'
    };

    // Establish the default plug-in settings
    settings = $.extend({
      panel: this,
      trigger: '.cm-button',
      reveal: 'top',
      hasSubMenu: true,
      subMenu: '.cm-submenu',
      speed: 200,
      close: false,
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
        animationSpeed = settings.speed;

        if (!settings.wordpress) {
          toggleSubMenu = function toggleSubMenu() {
            $(this).parent().find('ul').toggleClass('cm-menu-open').slideToggle(animationSpeed);
          };

          $(settings.panel).find('> ul ul').addClass(classes.subMenu);
          $(settings.subMenu).parent().append('<i class="cm-icon cm-icon-caret"></i>');
          $(settings.subMenu).next().on('click.clearmenu', toggleSubMenu);
        }

        if (settings.wordpress) {
          $(settings.panel).find('.menu-item-has-children').append('<i class="cm-icon cm-icon-caret"></i>');
          $('.menu-item-has-children').on('click.clearmenu', 'i', function() {
            $(this).prev('.sub-menu').slideToggle(animationSpeed);
          });
        }
      }

      // Set up the close button for the panel
      if (settings.close) {
        $(settings.panel).prepend('<i class="cm-icon cm-icon-close"></i>');
        $('.cm-icon-close').on('click', function() {
          $(settings.panel).removeClass(classes.visible);

          if ('.cm-button' === settings.trigger) {
            $(settings.trigger).removeClass('cm-active');
          }
        });
      }
    };

    // Reveal the target panel
    revealMenu = function revealMenu() {
      if ('.cm-button' === settings.trigger) {
        $(this).toggleClass('cm-active');
      }

      $(settings.panel).toggleClass(classes.visible);
      $('body').toggleClass(classes.active);
    };

    // Actually fire the plug-in
    $(settings.trigger).on('click.clearmenu', revealMenu);
    setUpClearMenu();

    // Ensure chaining of other jQuery methods
    return this;
  };
})(jQuery);

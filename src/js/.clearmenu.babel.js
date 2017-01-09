(($ => {
  $.fn.clearmenu = (options) => {
    let animationSpeed, toggleSubMenu;

    // Establish the default CSS classes to use
    const CLASSES = {
      subMenu: 'cm-submenu',
      top: 'cm-panel-top',
      bottom: 'cm-panel-bottom',
      left: 'cm-panel-left',
      right: 'cm-panel-right',
      fade: 'cm-panel-fade',
      visible: 'cm-panel-open'
    };

    // Establish the default plug-in settings
    const SETTINGS = $.extend({
      panel: this, //TODO: find a reasonable way to prevent this from becoming undefined, or might just need to do without babel
      close: true,
      trigger: '.cm-hamburger',
      reveal: 'fade',
      hasSubMenu: true,
      subMenu: '.cm-submenu',
      wordpress: false
    }, options);

    // Get the plug-in ready to run
    const SETUPCLEARMENU = () => {
      // Determine how to reveal the target panel
      switch (SETTINGS.reveal) {
        case 'bottom':
          $(SETTINGS.panel).addClass(CLASSES.bottom);
          break;
        case 'left':
          $(SETTINGS.panel).addClass(CLASSES.left);
          break;
        case 'right':
          $(SETTINGS.panel).addClass(CLASSES.right);
          break;
        case 'fade':
          $(SETTINGS.panel).addClass(CLASSES.fade);
          break;
        default:
          $(SETTINGS.panel).addClass(CLASSES.top);
          break;
      }

      // Establish functionality if sub-menus are active
      if (SETTINGS.hasSubMenu) {
        animationSpeed = 200;

        if (!SETTINGS.wordpress) {
          toggleSubMenu = function() {
            $(this).parent().find('ul').toggleClass('cm-submenu-open').slideToggle(animationSpeed);
          };

          $(SETTINGS.panel).find('> ul ul').addClass(CLASSES.subMenu);
          $(SETTINGS.subMenu).parent().append('<i class="icon icon-caret"></i>');
          $(SETTINGS.subMenu).next().on('click.clearmenu', toggleSubMenu);
        }

        if (SETTINGS.wordpress) {
          $(SETTINGS.panel).find('.menu-item-has-children').append('<i class="icon icon-caret"></i>');
          $('.menu-item-has-children').on('click.clearmenu', 'i', function() {
            $(this).prev('.sub-menu').slideToggle(animationSpeed);
          });
        }
      }

      // Set up the close button for the panel
      if (SETTINGS.close) {
        $(SETTINGS.panel).prepend('<i class="icon icon-close"></i>');
        $('.icon-close').on('click', () => {
          $(SETTINGS.panel).removeClass(CLASSES.visible);

          if ('.cm-hamburger' === SETTINGS.trigger) {
            $(SETTINGS.trigger).removeClass('cm-hamburger-open');
          }
        });
      }
    };

    // Function to reveal the target panel that contains the menu
    const REVEALMENU = function() {
      if ('.cm-hamburger' === SETTINGS.trigger) {
        $(this).toggleClass('cm-hamburger-open');
      }

      $(SETTINGS.panel).toggleClass(CLASSES.visible);
      $('.cd-menu-icon').toggleClass('is-clicked');
    };

    $(SETTINGS.trigger).on('click.clearmenu', REVEALMENU);
    SETUPCLEARMENU();
  };
}))(jQuery);

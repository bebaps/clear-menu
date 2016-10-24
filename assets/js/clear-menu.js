jQuery.fn.clearmenu = function(options) {
    var classes = { // Set default CSS classes to use
        nav: '.cm-nav',
        listItem: '.cm-has-submenu',
        hasSubmenuOpen: '.cm-has-submenu-open',
        subMenuTrigger: '.cm-sub-trigger',
        overlay: '.cm-panel',
        top: 'cm-reveal-top',
        bottom: 'cm-reveal-bottom',
        left: 'cm-reveal-left',
        right: 'cm-reveal-right',
        fade: 'cm-reveal-fade',
        visible: '.cm-is-visible'
    };

    var settings = jQuery.extend({
        overlay: '#cm-panel', // The class/ID of the panel itself
        reveal: 'top', // How to reveal the panel
        hasSubmenu: false, // To activate the accordion
        submenu: '.cm-has-submenu', // The class/ID of the parent list item that contains the sub-menu
        wordpress: false, // WordPress mode, will soon use default WordPress menu classes to target
        trigger: this // The button used to trigger the current panel
    }, options);

    var revealMenu = function() {
        jQuery(settings.trigger).toggleClass('cm-is-active');
        jQuery(settings.overlay).toggleClass('cm-is-visible');
    };

    jQuery(settings.trigger).on('click.clearmenu', revealMenu);

    // Sub-Menus
    if (settings.hasSubmenu) {
        var parentLink = jQuery(settings.submenu);
        var toggleSubMenu = function() {
            jQuery(this).parent().toggleClass('cm-has-submenu-open').find('ul').slideToggle(200);
        };

        parentLink.append('<button class="cm-submenu-trigger" type="button"></button>');
        jQuery(settings.submenu).on('click.clearmenu', '.cm-submenu-trigger', toggleSubMenu);
    }

    // Add reveal type
    switch (settings.reveal) {
        case 'bottom':
            jQuery(settings.overlay).addClass(classes.bottom);
            break;
        case 'left':
            jQuery(settings.overlay).addClass(classes.left);
            break;
        case 'right':
            jQuery(settings.overlay).addClass(classes.right);
            break;
        case 'fade':
            jQuery(settings.overlay).addClass(classes.fade);
            break;
        default:
            jQuery(settings.overlay).addClass(classes.top);
            break;
    }
};

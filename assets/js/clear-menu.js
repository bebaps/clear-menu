jQuery.fn.clearmenu = function( options ) {
    /**
     * Establish the default CSS classes to use.
     */
    var classes = {
        nav: '.cm-nav', // Class for the menu
        listItem: '.cm-has-submenu', // Class for a list item that contains a sub-menu
        hasSubmenuOpen: '.cm-has-submenu-open', // Class for signifying it's sub-menu is visible
        subMenuTrigger: '.icon-cross', // Class for the trigger to open the sub-menu
        panel: '.cm-panel', // Class for the panel that contains the menu
        top: 'cm-panel-top', // Class for revealing the panel from the top
        bottom: 'cm-panel-bottom', // Class for revealing the panel from the bottom
        left: 'cm-panel-left', // Class for revealing the panel from the left
        right: 'cm-panel-right', // Class for revealing the panel from the right
        fade: 'cm-panel-fade', // Class for revealing the panel via a fade animation
        visible: '.cm-panel-open' // Class to signify the panel is active
    };

    /**
     * Establish the default plugin settings.
     */
    var settings = jQuery.extend( {
        panel: '.cm-panel', // The class/ID of the target panel
        reveal: 'top', // How to reveal the panel
        hasSubmenu: false, // Does this menu have sub-menus
        submenu: '.cm-has-submenu', // The class/ID of the parent list item that contains the sub-menu
        wordpress: false, // WordPress mode, will soon use default WordPress menu classes to target
        trigger: this // The class/ID of the element used to trigger the target panel
    }, options );

    /**
     * Function to reveal the target panel that contains the menu.
     */
    var revealMenu = function() {
        jQuery( settings.trigger ).toggleClass( 'cm-hamburger-open' );
        jQuery( settings.panel ).toggleClass( 'cm-panel-open' );
    };

    jQuery( settings.trigger ).on( 'click.clearmenu', revealMenu );

    /**
     * Establish functionality if sub-menus are active.
     */
    if ( settings.hasSubmenu ) {
        var parentLink    = jQuery( settings.submenu );
        var subTrigger    = settings.trigger.clone();
        var toggleSubMenu = function() {
            jQuery( this ).parent().toggleClass( 'cm-has-submenu-open' ).find( 'ul' ).slideToggle( 200 );
        };

        // parentLink.append('<i class="icon-cross"></i>');
        subTrigger.appendTo( parentLink );
        jQuery( settings.submenu ).on( 'click.clearmenu', settings.trigger, toggleSubMenu );
    }

    /**
     * Determine how to reveal the target panel.
     */
    switch ( settings.reveal ) {
        case 'bottom':
            jQuery( settings.panel ).addClass( classes.bottom );
            break;
        case 'left':
            jQuery( settings.panel ).addClass( classes.left );
            break;
        case 'right':
            jQuery( settings.panel ).addClass( classes.right );
            break;
        case 'fade':
            jQuery( settings.panel ).addClass( classes.fade );
            break;
        default:
            jQuery( settings.panel ).addClass( classes.top );
            break;
    }
};

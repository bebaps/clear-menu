(function( $ ) {
    $.fn.clearmenu = function( options ) {
        /**
         * Establish the default CSS classes to use.
         */
        var classes = {
            menu: 'cm-nav', // Class for the menu
            subMenu: 'cm-submenu', // Class for the sub-menus
            hasSubMenu: 'cm-has-submenu', // Class for a list item that contains a sub-menu
            hasSubMenuOpen: 'cm-has-submenu-open', // Class for signifying it's sub-menu is visible
            subMenuTrigger: 'icon-cross', // Class for the trigger to open the sub-menu
            panel: 'cm-panel', // Class for the panel that contains the menu
            top: 'cm-panel-top', // Class for revealing the panel from the top
            bottom: 'cm-panel-bottom', // Class for revealing the panel from the bottom
            left: 'cm-panel-left', // Class for revealing the panel from the left
            right: 'cm-panel-right', // Class for revealing the panel from the right
            fade: 'cm-panel-fade', // Class for revealing the panel via a fade animation
            visible: 'cm-panel-open', // Class to signify the panel is active
            hamburger: 'cm-hamburger' // Class for the hamburger icon
        };

        /**
         * Establish the default plugin settings.
         */
        var settings = $.extend( {
            panel: this,
            trigger: '.cm-hamburger', // The class/ID of the element used to trigger the target panel
            reveal: 'top', // How to reveal the panel
            hasSubMenu: true, // Does this menu have sub-menus
            subMenu: '.cm-submenu', // The class/ID of the sub-menu
            wordpress: false, // WordPress mode, will soon use default WordPress menu classes to target
        }, options );

        var setUpClearMenu = function() {
            /**
             * Determine how to reveal the target panel.
             */
            switch ( settings.reveal ) {
                case 'bottom':
                    $( settings.panel ).addClass( classes.bottom );
                    break;
                case 'left':
                    $( settings.panel ).addClass( classes.left );
                    break;
                case 'right':
                    $( settings.panel ).addClass( classes.right );
                    break;
                case 'fade':
                    $( settings.panel ).addClass( classes.fade );
                    break;
                default:
                    $( settings.panel ).addClass( classes.top );
                    break;
            }

            /**
             * Establish functionality if sub-menus are active.
             */
            if ( settings.hasSubMenu ) {
                var toggleSubMenu = function() {
                    $( this ).parent().toggleClass( 'cm-has-submenu-open' ).find( 'ul' ).slideToggle( 200 );
                };

                // $(settings.panel).find('> ul ul').addClass(classes.subMenu);
                $( settings.subMenu )
                    .parent()
                    // .addClass( classes.hasSubMenu )
                    .append( '<i class="sub-trigger">Sub Menu</i>' );
                $( settings.subMenu ).next().on( 'click.clearmenu', toggleSubMenu );
            }
        }

        /**
         * Function to reveal the target panel that contains the menu.
         */
        var revealMenu = function() {
            if ( settings.trigger == '.cm-hamburger' ) {
                $( this ).toggleClass( 'cm-hamburger-open' );
            }
            $( settings.panel ).toggleClass( 'cm-panel-open' );
        };

        $( settings.trigger ).on( 'click.clearmenu', revealMenu );
        setUpClearMenu();

    };
})( jQuery );

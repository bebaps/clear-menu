(function( $ ) {
    $.fn.clearmenu = function( options ) {
        /**
         * Establish the default CSS classes to use.
         */
        var classes = {
            subMenu: 'cm-submenu', // Class for the sub-menus
            top: 'cm-panel-top', // Class for revealing the panel from the top
            bottom: 'cm-panel-bottom', // Class for revealing the panel from the bottom
            left: 'cm-panel-left', // Class for revealing the panel from the left
            right: 'cm-panel-right', // Class for revealing the panel from the right
            fade: 'cm-panel-fade', // Class for revealing the panel via a fade animation
            visible: 'cm-panel-open' // Class to signify the panel is active
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
            wordpress: false // WordPress mode, will soon use default WordPress menu classes to target
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
                    $( this ).parent().find( 'ul' ).toggleClass( 'cm-submenu-open' ).slideToggle( 200 );
                };

                $( settings.panel ).find( '> ul ul' ).addClass( classes.subMenu );
                $( settings.subMenu ).parent().append( '<i class="icon icon-caret"></i>' );
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
            $( settings.panel ).toggleClass( classes.visible );
        };

        $( settings.trigger ).on( 'click.clearmenu', revealMenu );
        setUpClearMenu();

    };
})( jQuery );

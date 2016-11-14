'use strict'
(( $ ) ->

    $.fn.clearmenu = ( options ) ->
        classes = undefined
        settings = undefined
        setUpClearMenu = undefined
        animationSpeed = undefined
        toggleSubMenu = undefined
        revealMenu = undefined

        ###*
        # Establish the default CSS classes to use.
        ###

        classes =
            subMenu: 'cm-submenu'
            top: 'cm-panel-top'
            bottom: 'cm-panel-bottom'
            left: 'cm-panel-left'
            right: 'cm-panel-right'
            fade: 'cm-panel-fade'
            visible: 'cm-panel-open'

        ###*
        # Establish the default plug-in settings.
        ###

        settings = $.extend( {
            panel: this
            close: true
            trigger: '.cm-hamburger'
            reveal: 'fade'
            hasSubMenu: true
            subMenu: '.cm-submenu'
            wordpress: false
        }, options )

        setUpClearMenu = ->

            ###*
            # Determine how to reveal the target panel.
            ###

            switch settings.reveal
                when 'bottom'
                    $( settings.panel ).addClass classes.bottom
                when 'left'
                    $( settings.panel ).addClass classes.left
                when 'right'
                    $( settings.panel ).addClass classes.right
                when 'fade'
                    $( settings.panel ).addClass classes.fade
                else
                    $( settings.panel ).addClass classes.top
                    break

            ###*
            # Establish functionality if sub-menus are active.
            ###

            if settings.hasSubMenu
                animationSpeed = 200
                if !settings.wordpress

                    toggleSubMenu = ->
                        $( this ).parent().find( 'ul' ).toggleClass( 'cm-submenu-open' ).slideToggle animationSpeed
                        return

                    $( settings.panel ).find( '> ul ul' ).addClass classes.subMenu
                    $( settings.subMenu ).parent().append '<i class="icon icon-caret"></i>'
                    $( settings.subMenu ).next().on 'click.clearmenu', toggleSubMenu
                if settings.wordpress
                    $( settings.panel ).find( '.menu-item-has-children' ).append '<i class="icon icon-caret"></i>'
                    $( '.menu-item-has-children' ).on 'click.clearmenu', 'i', ->
                        $( this ).prev( '.sub-menu' ).slideToggle animationSpeed
                        return

            ###*
            # Set up the close button for the panel.
            ###

            if settings.close
                $( settings.panel ).prepend '<i class="icon icon-close"></i>'
                $( '.icon-close' ).on 'click', ->
                    $( settings.panel ).removeClass classes.visible
                    if `settings.trigger == '.cm-hamburger'`
                        $( settings.trigger ).removeClass 'cm-hamburger-open'
                    return
            return

        ###*
        # Function to reveal the target panel that contains the menu.
        ###

        revealMenu = ->
            if `settings.trigger == '.cm-hamburger'`
                $( this ).toggleClass 'cm-hamburger-open'
            $( settings.panel ).toggleClass classes.visible
            return

        $( settings.trigger ).on 'click.clearmenu', revealMenu
        setUpClearMenu()
        return

    return) jQuery

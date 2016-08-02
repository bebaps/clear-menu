$(function() {
    var hamburger = $('#cm-hamburger'),
        overlay = $('#cm-overlay');

  $(hamburger).on('click', function() {
    hamburger.toggleClass('cm-is-active');
    overlay.toggleClass('cm-is-visible');
  });

  // TODO: can this be simplified with some CSS? Not rely on the jQuery animations?
  // TODO: inject a button to serve as the toggle. Click on the button to activate the behavior
  $('.cm-has-submenu').on('click', '.cm-sub-trigger', function(){
    $(this).parent().toggleClass('cm-has-submenu-open').find('ul').slideToggle(200).end().parent('.cm-has-submenu').siblings('.cm-has-submenu').removeClass('cm-has-submenu-open').next('ul').slideUp(200);
  });

});

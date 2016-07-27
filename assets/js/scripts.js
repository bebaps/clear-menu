$(function() {
  $('#cm-hamburger').click(function() {
    $(this).toggleClass('cm-is-active');
    $('#cm-overlay').toggleClass('cm-is-visible');
  });

  // TODO: can this be simplified with some CSS? Not rely on the jQuery animations?
  //TODO: inject a button to serve as the toggle. Click on the button to activate the behavior
  $('.cm-has-submenu').find('> a::after').on('click', 'a', function(event){
    event.preventDefault();
    $(this).parent().toggleClass('cm-has-submenu-open').find('ul').slideToggle(200).end().parent('.cm-has-submenu').siblings('.cm-has-submenu').children('a').removeClass('cm-has-submenu-open').next('ul').slideUp(200);
  });

});

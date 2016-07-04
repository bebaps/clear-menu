$(function() {

  $('#menu-btn').click(function() {
    $(this).toggleClass('active');
    $('#overlay').toggleClass('open');
  });

  $('.has-children').children('a').on('click', function(event){
    event.preventDefault();
    $(this).toggleClass('submenu-open').next('.sub-menu').slideToggle(200).end().parent('.has-children').siblings('.has-children').children('a').removeClass('submenu-open').next('.sub-menu').slideUp(200);
  });

});

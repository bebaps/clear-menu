$(function() {
  $('#menu-btn').click(function() {
    $(this).toggleClass('active');
    $('#overlay').toggleClass('open');
  });
});

$(function() {
  $('#mobile-btn').click(function() {
    $(this).toggleClass('active');
    $('#overlay').toggleClass('open');
  });
});
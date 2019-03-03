var elements = $('.modal-overlay, .modal');

$('button').click(function(){
    elements.addClass('active');
});

$('.close-modal').click(function(){
    elements.removeClass('active');
});

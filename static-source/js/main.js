
function fitToContainer(canvas){
  canvas.style.width='100%';
  canvas.style.height='100%';
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

function init_box(){
    var box = $('#box');
    var showPanelButtons = $('#show-buttons button');
    var panelClassName = 'show-front';

    function onButtonClick( event ){
        box.removeClass( panelClassName );
        panelClassName = event.target.className;
        box.addClass( panelClassName );
    };

    for (var i=0; i < showPanelButtons.length; i++) {
        $(showPanelButtons[i]).on('click',onButtonClick);
    }
    $('#toggle-backface-visibility').on( 'click', function(){
        box.toggleClass('panels-backface-invisible');
    });
}

$(".latest_post").animo('blur', {duration: 3, amount: 15});


$(".latest_post").animo('blur', {duration: 3, amount: 15});

$(".latest_post").mouseover(function(){$('.latest_post').animo('focus')});

$(".latest_post").mouseout(function(){$(".latest_post").animo('blur', {duration: 3, amount: 15})});

$("#header-title").animo('blur', {duration: 3, amount: 1});

if($(".writing-post")){
    source = $(".writing-post").children();
    multi = source.length/100;
    $.each(source,function(index,element){
        // $(element).after("<div class=\"percent-"+((Math.round((index/multi)/5) * 5)+5)+"\"></div>")
        var waypoint = new Waypoint({
          element: element,
          handler: function(direction) {
            percent = ((Math.round((index/multi)/5) * 5)+5);
            this.disable();
            $.ajax(document.URL+percent+"/");
          }
        })
    });
    $(".liked").on("click",function(){
        $.ajax(document.URL+"not_bad/");
    })
}

$.material.init();
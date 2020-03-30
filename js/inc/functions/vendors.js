// Dropzone
if($('#dropzone-upload')[0]) {
    Dropzone.autoDiscover = false;
}

$(document).ready(function () {

    /*------------------------------------------------
        Autosize Textarea 
    ------------------------------------------------*/
    if($('.textarea-autosize')[0]) {
        autosize($('.textarea-autosize'));
    }


    /*------------------------------------------------
        jQuery Mask Plugin
    ------------------------------------------------*/
    if ($('input-mask')[0]) {
        $('.input-mask').mask();
    }


    /*------------------------------------------------
        Drag n Drop file upload (DropzoneJs)
    ------------------------------------------------*/
    if($('#dropzone-upload')[0]) {
        $('#dropzone-upload').dropzone({
            url: "/file/post",
            addRemoveLinks: true
        });
    }


    /*------------------------------------------------
        Popovers (Bootstrap)
    -------------------------------------------------*/
    if($('[data-toggle="popover"]')[0]) {
        $('[data-toggle="popover"]').popover();
    }


    /*------------------------------------------------
        Tooltip (Bootstrap)
    -------------------------------------------------*/
    if($('[data-toggle="tooltip"]')[0]) {
        $('[data-toggle="tooltip"]').tooltip();
    }


    /*----------------------------------------------------------
        jquery-scrollbar e ScrollLock
    -----------------------------------------------------------*/
    if($('.scrollbar-inner')[0]) {
        $('.scrollbar-inner').scrollbar().scrollLock();
    }

    

});


/*----------------------------------------------------------
    Animate pie charts
-----------------------------------------------------------*/

function animateCharts(){
    if($('.easy-pie-chart')[0]) {
        $('.easy-pie-chart canvas').remove();
        $('.easy-pie-chart').each(function () {
            var value = $(this).data('value');
            var size = $(this).data('size');
            var trackColor = $(this).data('track-color');
            var barColor = $(this).data('bar-color');

            $(this).find('.easy-pie-chart__value').css({
                lineHeight: (size)+'px',
                fontSize: (size/4)+'px',
                color: barColor
            });

            $(this).easyPieChart ({
                easing: 'easeOutBounce',
                barColor: barColor,
                trackColor: trackColor,
                scaleColor: 'rgba(0,0,0,0)',
                lineCap: 'round',
                lineWidth: 2,
                size: size,
                animate: 3000,
                onStep: function(from, to, percent) {
                    $(this.el).find('.percent').text(Math.round(percent));
                }
            })
        });
    }
}
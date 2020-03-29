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
function do_post(e) {
    e.preventDefault();
    current = $(e.target).closest('.modal-content');
    $(current).closest('.modal').modal('hide');
    $('#modalWait').modal('show');
    
    shell = $(this).attr('data-shell');
    if(shell == null) {
        shell = current;
    } 


    callback_error = $(this).attr('data-callback-error');
    callback = $(this).attr('data-callback');

    url   = $(this).attr('data-show');
    form  = $(this).attr('data-form');

    var formData = new FormData($(form)[0]);

    $.ajax({
    url: url,  //Server script to process data
    type: 'POST',

    complete: function(jqXHR, textStatus) {
    switch (jqXHR.status) {

    case 200: 
    $('#modalWait').modal('hide');
    $(shell).html(jqXHR.responseText);
    eval(callback);

    $(shell).closest('.modal').modal('show');
    break;

    case 400: 
    $(shell).html(jqXHR.responseText);
    eval(callback_error);
    $('#modalWait').modal('hide');
    $(shell).closest('.modal').modal('show');
    break;

    default: 
    eval(callback_error);
    $('#modalWait').modal('hide');
    $('#messageError').html(jqXHR.responseText);
    $('#modalError').modal('show');
    $(current).closest('.modal').modal('show');

    }},

    data: formData,
    cache: false,
    contentType: false,
    processData: false
    });
}


function do_get(e) {
    e.preventDefault();
    current = $(e.target).closest('.modal-content');
    $(current).closest('.modal').modal('hide');
    $('#modalWait').modal('show');

    shell = $(this).attr('data-shell');

    if(shell == null) {
        shell = current;
    } 
    
    callback_error = $(this).attr('data-callback-error');
    callback = $(this).attr('data-callback');
    url   = $(this).attr('data-show');

    var lst = $(shell).data('stack');

    if(!lst) {
        lst = [];
        $(shell).data('stack', lst);
    } else if(!url) {
        lst.pop();
        url = lst.pop();
    }

    $.ajax({
    url: url,  //Server script to process data
    type: 'GET',
    success: function(data) {
    $('#modalWait').modal('hide');
    eval(callback);
    
    $(shell).html(data);

    $(shell).closest('.modal').modal('show');
    lst.push(url);
    },

    error: function(data){
    eval(callback_error);
    $('#modalWait').modal('hide');
    $('#messageError').html(data.responseText);
    $('#modalError').modal('show');
    $(current).closest('.modal').modal('show');
    },
    cache: false,
    contentType: false,
    processData: false
    });
}

function r_get(e) {
    e.preventDefault();
    current = $(e.target).closest('.modal-content');
    // $(current).closest('.modal').modal('hide');
    $('#modalWait').modal('show');
    url = $(this).attr('data-show');

    $.ajax({
    url: url,  //Server script to process data
    type: 'GET',

    success: function(data) {
    $('#modalWait').modal('hide');
    $(e.target).closest('.rm').remove();
    // $(current).closest('.modal').modal('show');
    },

    error: function(data){
    $('#modalWait').modal('hide');
    $('#messageError').html(data.responseText);
    $('#modalError').modal('show');
    },
    cache: false,
    contentType: false,
    processData: false
    });
}

$(document).on('click', '.e-get', do_get);
$(document).on('click', '.e-post', do_post);
$(document).on('click', '.r-get', r_get);

$(document).on('submit', 'form', function(e) {
    e.preventDefault();
    $('[data-form="#' + $(this).attr('id') + '"]').click();
});






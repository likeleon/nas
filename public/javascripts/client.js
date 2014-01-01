var socket = io.connect();

socket.on('files', function(files) {
    var html = "";
    for (var i = 0; i < files.length; ++i) {
        html += '<li>' + files[i].name + '</li>';
    }
    $('#files').html(html);
});
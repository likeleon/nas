var socket = io.connect();

socket.on('files', function(files) {
    $('#files').html('');
    for (var i = 0; i < files.length; ++i) {
        $('#files').append('<li>' + files[i].name + '</li>')
    }
});

socket.emit('list files');
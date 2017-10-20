/* global ons, $, firebase */
var uid = "";
ons.ready(function() {
  console.log("Onsen UI is ready!");
});

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    console.log('Cordova is ready!');
    console.log(navigator.camera);
}
function getPicture() {
    navigator.camera.getPicture(
        onSuccess,
        onFail,
        {
            destinationType: Camera.DestinationType.FILE_URL,
            sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM
        }
    );
}
function snapPicture () {
    navigator.camera.getPicture(
        onSuccess,
        onFail,
        {
            quality: 80,
            destinationType: Camera.DestinationType.FILE_URL,
            saveToPhotoAlbum: true,
            correctOrientation: true
        }
    );
}
function onSuccess(imageData) {
    $('#picture').attr('src', imageData);
}
function onFail (message) {
    alert ('Error!!!: ' + message);
}

function editSelects(event) {
    uid = parseInt(event.target.value);
}

document.addEventListener('init', function(event){
    var page = event.target;
    if(page.matches('#home-page')) {
        $('#push-button').click(function(){
            var tid = $(this).data('tid');
            $('#navigator').get(0).pushPage('tl_detail.html', {animation:'fade', data:{tid:tid}});
        });
    }
    else if(page.matches('#tl_detail-page')){
        console.log(page.data.tid);
    }
    else if(page.matches('#notes-page')){
        firebase.database().ref('/notification').once('value').then(function(snapshot) {
            var notes = snapshot.val();
            $(notes).each(function(idx){
                var oli = $('<ons-list-item></ons-list-item>')
                            .addClass('item')
                            .attr('data-nid', idx)
                            .attr('modifier', 'chevron')
                            .attr('tappable', 'true')
                            .text($(this).get(0).title)
                            .click(function(){
                                $('#navigator').get(0).pushPage('nt_detail.html', {data:{nid:idx}});
                            });
                $('#notes-page ons-list').append(oli);
            });
        });
    }
    else if(page.matches('#nt_detail-page')){
        var nid = page.data.nid;
        firebase
            .database()
                .ref('/notification/' + nid)
                    .once('value')
                        .then(function(snapshot) {
                            var notes = snapshot.val();
                            $('#title').text(notes.title);
                            $('#content').html(notes.content);
                        });
    }
    else if(page.matches('#user-page')){
        firebase
            .database()
                .ref('/namelist')
                    .once('value')
                        .then(function(snapshot) {
                            var names = snapshot.val();
                            $(names).each(function(idx){
                                var oli = $('<option></option>')
                                            .attr('value', idx)
                                            .text($(this).get(0).name + " 様");
                                $('#namelist select').append(oli);
                            });
                        });
    }
    else if(page.matches('#camera-page')){
        $('#upload input').click(function(){
            var imageURI = $('#picture').attr('src');
            console.log(imageURI);
            var storageRef = "images/test.jpg";
            cfUploadFile(storageRef, imageURI, "image/jpeg")
                .then(function(snapshot) {
                    console.log("Success");
                })
                .fail(function(err) {
                    console.log("Error");
                });
        });
    }
});
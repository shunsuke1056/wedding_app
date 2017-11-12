/* global ons, $, firebase */
var uid = "";

/* home start */
var storageRef = firebase.storage().ref();
var database = firebase.database();
var initImagelist = [];
var currentTime = "";
/* home end */
/* camera start */
var cameraData = "";
var cameraName = "";
/* camera end */
/* test-code start*/
var testimage = "";
/* test-code end*/

ons.ready(function() {
  console.log("Onsen UI is ready!");
});

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    console.log('Cordova is ready!');
    console.log(navigator.camera);
}

function onSuccess(imageData) {
    $('#picture').attr('src', imageData);
    if(cameraData != "" && imageData != ""){
        if(imageData == cameraData){
            alert("同じじゃん！！");
        }else{
            for( var key in cameraData) {
                alert("違うじゃん！！"+cameraData[key]);
            }
            
        }
    }
    
}
function onFail (message) {
    alert ('Error!!!: ' + message);
}

function editSelects(event) {
    uid = parseInt(event.target.value);
}

/* camera start */


function uploadPic() {
    alert("アップロードファイル："+cameraData);
    // ファイルのパスを設定
    var mountainsRef = storageRef.child('images').child(cameraName);
    alert("アップロード先:"+mountainsRef);
    // ファイルを適用してファイルアップロード開始
    var uploadTask = mountainsRef.put(cameraData);
    // ステータスを監視
    uploadTask.on('state_changed', function(snapshot){
        // アップロード中の操作
    }, function(err) {
        // アップロード失敗時の操作
        console.log(err);
    }, function() {
        // アップロード成功時の操作
        // アップロード完了したら画像のURLを取得
        // alert(uploadTask.snapshot.downloadURL);
        
        // user_name(アップロードユーザ) TODO 今回の仕様だといらないけど・・・いったん固定でいれとく
        var userName = 'Beta';
        // image_url(ファイル名) パスは書かないでファイル名のみ　あとで変えるかも？
        var imageUrl = cameraName;
        // upload_time(登録時刻) ストレージへの登録時刻がとれればいいんだけどわからんので自前で登録時刻の作成
        var uploadTime = getCurrentTime();
        // db(t_imageテーブル)に登録
        database.ref('t_image/').push({
            user_name:userName,
            image_url:imageUrl,
            upload_time:uploadTime
        });
    })
}

function getPicture(){
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
function fileChange() {
    cameraData = $('#pic_data').prop('files')[0];
    cameraName = $('#pic_data').prop('files')[0].name;
    alert("選択したファイル名:"+cameraName);
    
    var reader = new FileReader();
    reader.onload = function() {
        $('#picture').attr('src',  reader.result);
    }
    reader.readAsDataURL(cameraData);
}

/* uploadtimeメモ yyyymmddhhmmss*/
/* 現在時刻取得 */
function getCurrentTime(){
    var curDate = new Date;
    return setDateData(curDate);
};

/* 0詰め処理 */
function setDateData(dt){
    var year =  String(dt.getFullYear());
    
    var month = toZeroFill(dt.getMonth() + 1);
    var date = toZeroFill(dt.getDate());
    var hours = toZeroFill(dt.getHours());
    var min = toZeroFill(dt.getMinutes());
    var sec = toZeroFill(dt.getSeconds());
    var time = year + month + date + hours + min + sec;
    return time;
};

function toZeroFill(data){
    if (parseInt(data) < 10) {
        data = '0' + data;
    }
    return String(data);
}
/* camera end */

document.addEventListener('init', function(event){
    var page = event.target;
    if(page.matches('#home-page')) {
    
        // $('#push-button').click(function(){
        //     var tid = $(this).data('tid');
        //     $('#navigator').get(0).pushPage('tl_detail.html', {animation:'fade', data:{tid:tid}});
        // });
        
        firebase.database().ref('/t_image').orderByChild('upload_time').limitToLast(5).once('value').then(function(imagedata) {
            var images = imagedata.val();
            for( var key in images) {
                for( var url in images[key]) {
                    if(url == 'image_url'){
                        
                        initImagelist.push(images[key][url]);
                    }
                }
            }
    /* ↓後で汎用化 */
            var imgSample0 = storageRef.child('images').child(initImagelist[4]);
            var imgSample1 = storageRef.child('images').child(initImagelist[3]);
            var imgSample2 = storageRef.child('images').child(initImagelist[2]);
            var imgSample3 = storageRef.child('images').child(initImagelist[1]);
            var imgSample4 = storageRef.child('images').child(initImagelist[0]);
            //htmlロード完了したらストレージの画像を表示してみる
            imgSample0.getDownloadURL().then(function(url0){
                document.getElementById('tl-imagelist_0').style.backgroundImage = "url("+url0+")";
            }).catch(function(error) {
            // Handle any errors
            });
            
            //htmlロード完了したらストレージの画像を表示してみる
            imgSample1.getDownloadURL().then(function(url1){
                document.getElementById('tl-imagelist_1').style.backgroundImage = "url("+url1+")";
            }).catch(function(error) {
            // Handle any errors
            });
            
            //htmlロード完了したらストレージの画像を表示してみる
            imgSample2.getDownloadURL().then(function(url2){
                document.getElementById('tl-imagelist_2').style.backgroundImage = "url("+url2+")";
            }).catch(function(error) {
            // Handle any errors
            });
            
            //htmlロード完了したらストレージの画像を表示してみる
            imgSample3.getDownloadURL().then(function(url3){
                document.getElementById('tl-imagelist_3').style.backgroundImage = "url("+url3+")";
            }).catch(function(error) {
            // Handle any errors
            });
            
            //htmlロード完了したらストレージの画像を表示してみる
            imgSample4.getDownloadURL().then(function(url4){
                document.getElementById('tl-imagelist_4').style.backgroundImage = "url("+url4+")";
            }).catch(function(error) {
            // Handle any errors
            });
    
    /* ↑後で汎用化 */
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
            alert(imageURI);
            var storageRefa = storageRef.child('images');
            cfUploadFile(storageRefa, imageURI, "image/jpeg")
                .then(function(snapshot) {
                    console.log("Success");
                })
                .fail(function(err) {
                    console.log("Error");
                });
        });

    }
});
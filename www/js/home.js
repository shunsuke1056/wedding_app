//ストレージのルートのリファレンスを取得
var storageRef = firebase.storage().ref();
// alert(storageRef);
//ストレージのルートにあるsample.pngのリファレンスを取得    
// var imgSample = storageRef.child('images').child('20170814_180552.jpg');
// alert("1:"+imgSample);
var initImagelist = [];
var currentTime = "";

window.onload = function() {

      
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
        var imgSample0 = storageRef.child('images').child(initImagelist[0]);
        var imgSample1 = storageRef.child('images').child(initImagelist[1]);
        var imgSample2 = storageRef.child('images').child(initImagelist[2]);
        var imgSample3 = storageRef.child('images').child(initImagelist[3]);
        var imgSample4 = storageRef.child('images').child(initImagelist[4]);
        //htmlロード完了したらストレージの画像を表示してみる
        imgSample0.getDownloadURL().then(function(url0){
            alert(url0);
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



};

/* uploadtime下 yyyymmddhhmmss*/
/* 現在時刻取得 */
function getCurrentTime(time){
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
    alert("year"+year);
    alert("month"+month);
    alert("date"+date);
    alert("hours"+hours);
    alert("min"+min);
    alert("sec"+sec);
    var time = year + month + date + hours + min + sec;
    alert("time"+ time);
    return time;
};

function toZeroFill(data){
    if (parseInt(data) < 10) {
        data = '0' + data;
    }
    return String(data);
}

      // alert("ok:"+imgSample);
      // var apCnt = 0;
      // if(imgSample.length > 5){
      //     apCnt = 5;
      // }else{
      //     apCnt = imgSample.length;
      // }





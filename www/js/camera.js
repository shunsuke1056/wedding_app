//ストレージのルートのリファレンスを取得
var storageRef = firebase.storage().ref();
// alert(storageRef);

var initImagelist = [];
var currentTime = "";



window.onload = function() {


    var me = this;
    // ストレージオブジェクト作成
    var storageRef = firebase.storage().ref();
    // ファイルのパスを設定
    var mountainsRef = storageRef.child(`images/${this.photo.name}`);
    // ファイルを適用してファイルアップロード開始
    var uploadTask = mountainsRef.put(this.photo);
    // ステータスを監視
    uploadTask.on('state_changed', function(snapshot){
    }, function(err) {
        console.log(err);
    }, function() {
        // アップロード完了したら画像のURLを取得
        me.photo_url = uploadTask.snapshot.downloadURL;
    })
    
    


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





//ストレージのルートのリファレンスを取得
var storageRef = firebase.storage().ref();
// alert(storageRef);
//ストレージのルートにあるsample.pngのリファレンスを取得    
// var imgSample = storageRef.child('images').child('20170814_180552.jpg');
// alert("1:"+imgSample);
var initImagelist = [];



window.onload = function() {


        firebase.database().ref('/t_image').once('value').then(function(imagedata) {
        var images = imagedata.val();
        for( var key in images) {
            for( var url in images[key]) {
                if(url == 'image_url'){
                    initImagelist.push(images[key][url]);
                }
            }
        }
            alert("取得後："+initImagelist[0]);
        var imgSample = storageRef.child('images').child(initImagelist[0]);
            alert("2:"+imgSample);
        
          //htmlロード完了したらストレージの画像を表示してみる

  imgSample.getDownloadURL().then(function(url){
      // alert("ok:"+imgSample);
      // var apCnt = 0;
      // if(imgSample.length > 5){
      //     apCnt = 5;
      // }else{
      //     apCnt = imgSample.length;
      // }
      
                // (var i = 0; i < apCnt; i++){
                  document.getElementById("tl-imagelist").style.backgroundImage = "url("+url+")";
          // }


  }).catch(function(error) {
    // Handle any errors
    alert("error");
  });
    });

};

function getImageUrl(){

};


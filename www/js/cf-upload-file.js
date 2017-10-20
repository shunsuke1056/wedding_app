(function() {
	var cordovaFirebaseUploadFile = function(storageRef, fileUri, uFileType) {
        console.log("cordovaFirebaseUploadFile");
		var d = $.Deferred();
		window.resolveLocalFileSystemURL(
			fileUri,
			onResolveSuccess,
			onResolveError
		);

		function onResolveSuccess(fileEntry) {
            console.log("onResolveSuccess");
			fileEntry.file(function(file) { 
				var reader = new FileReader();
				reader.onloadend = function() {
                    console.log("onResolveSuccess > onloadend");
					var type = uFileType || file.type;
					var blob = new Blob([new Uint8Array(this.result)], {type: type});
					uploadToFirebase(blob);
			 	};
			 	reader.readAsArrayBuffer(file);
			});
		}

		function onResolveError(err) {
			d.reject(err);
		}

		function uploadToFirebase(blob) {
            console.log("uploadToFirebase");
			firebase.storage().ref(storageRef).put(blob, {contentType: blob.type})
				.then(function(snapshot) {
                    console.log("FB Success");
					d.resolve(snapshot);
				})
				.catch(function(err) {
                    console.log("FB Error");
					d.reject(err);
				});
		}
		return d.promise();
	};

	window.cfUploadFile = cordovaFirebaseUploadFile;
})();
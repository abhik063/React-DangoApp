import $ from 'jQuery';
let constraintObj = { 
    audio: true,   
}; 

//handle older browsers that might implement getUserMedia in some way
if (navigator.mediaDevices === undefined) {
    navigator.mediaDevices = {};
    navigator.mediaDevices.getUserMedia = function(constraintObj) {
        let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        if (!getUserMedia) {
            return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
        }
        return new Promise(function(resolve, reject) {
            getUserMedia.call(navigator, constraintObj, resolve, reject);
        });
    }
}else{
    navigator.mediaDevices.enumerateDevices()
    .then(devices => {
        devices.forEach(device=>{
            console.log(device.kind.toUpperCase(), device.label);
            //, device.deviceId
        })
    })
    .catch(err=>{
        console.log(err.name, err.message);
    })
}

navigator.mediaDevices.getUserMedia(constraintObj)
.then(function(mediaStreamObj) {
    //connect the media stream to the first audio element
    // let audio = document.querySelector('audio');
    // if ("srcObject" in audio) {
    //     audio.srcObject = mediaStreamObj;
    // } else {
    //     //old version
    //     audio.src = window.URL.createObjectURL(mediaStreamObj);
    // }
    
    // audio.onloadedmetadata = function(ev) {
    //     //show in the audio element what is being captured by the webcam
    //     audio.play();        
    // };
    
    //add listeners for saving audio/audio
    let button = document.getElementById('button'); 
    let vidSave = document.getElementById('audio2');
    vidSave.hidden=true;
    let mediaRecorder = new MediaRecorder(mediaStreamObj);
    let chunks = [];
   let start=false;
   const recordingTimes={};
    button.addEventListener('click', (ev)=>{
        if(start)
        {
            start=false;
            mediaRecorder.stop();
            recordingTimes.stop=+new Date();
            recordingTimes.duration=(recordingTimes.end-recordingTimes.start)/100;
            console.log(mediaRecorder.state, "Time"+recordingTimes.duration);
            this.innerHTML = "<span class='fa fa-play'></span>";
            this.className = "green-button btn-circle btn-sm btn-xl btn-md";
        }
        else{
            mediaRecorder.start();
            recordingTimes.start=+new Date();
            chunks.length = 0;
            console.log(mediaRecorder.state);
            start=true;
            this.innerHTML = "<span class='fa fa-stop'></span>";
      this.className = "red-button btn-circle btn-sm btn-xl btn-md";
        }
        
    }) 
    mediaRecorder.ondataavailable = function(ev) {
        chunks.push(ev.data);
    }
    mediaRecorder.onstop = (ev)=>{
        let blob = new Blob(chunks, { 'type' : 'audio/mp3;' });        
        chunks = [];
        let audioURL = window.URL.createObjectURL(blob);
        vidSave.src=audioURL;
        vidSave.hidden=false;
        sendAudioFile(blob,audioURL);
    //  Posting to the server       
    }
})
.catch(function(err) { 
    console.log(err.name, err.message); 
});
  async function sendAudioFile(file,audioURL) {
    const formData = new FormData();
    console.log(audioURL);
    formData.append("file", file, audioURL+".mp3");
    var settings = {
        "url": "http://127.0.0.1:8000/upload/",
        "method": "POST",
        "timeout": 0,
        "processData": false,
        "mimeType": "audio/mp3",
        "contentType": false,
        "data": formData
        };
        $.ajax(settings).done(function(response){
            console.log(response);
        })
  }

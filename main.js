var hundred = 100;
Webcam.set({
    width: 400,
    height: 285.5,
    image_format: 'png',
    png_quality: 90
});
var camera = document.getElementById("camera");
Webcam.attach(camera);
function Snapshot(){
    Webcam.snap(function (data_uri){
        document.getElementById("snapshot").innerHTML = '<img id = "Image_result" src = "' + data_uri + '"/>';
    });
}
console.log(ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/dTTRnZr5A/model.json", modelLoaded)
function modelLoaded(){
    console.log("model loaded");
}
function Check(){
        img = document.getElementById("Image_result");
        classifier.classify(img, gotResult);
}
function gotResult(error, result){
    if(error){
        console.error(error);
    }else{
        console.log(result);
        document.getElementById("gesture_name").innerHTML = "Gesture name - "+result[0].label;
        var aiconfidence = result[0].confidence * hundred;
        document.getElementById("confidence").innerHTML = "Confidence - "+aiconfidence.toFixed(2) + "%";
        if (result[0].label == "Amazing") {
            document.getElementById("emoji").innerHTML = "Emoji - &#128076;";
            speak_data = "This symbol signifies I am OK";
        }
        if (result[0].label == "Thumbs Up") {
            document.getElementById("emoji").innerHTML = "&#128077;";
            speak_data  = "This symbol signifies encouragement";
        } 
        if (result[0].label == "Thumbs Down") {
            document.getElementById("emoji").innerHTML = "&#128078";
            speak_data = "This symbol signifies dislike";
        }   

        if (result[1].label == "Victory") {
            document.getElementById("emoji2").innerHTML = "&#9996";
            speak_data = "This symbol signifies peace and victory";   
        }
        if (result[1].label == "Point") {
            document.getElementById("emoji2").innerHTML = "&#128072";
            speak_data = "This symbol is used to point";  
        } 
        speak();
    }
}
function speak(){
    var synth = window.speechSynthesis;
    var utterThis = new SpeechSynthesisUtterance(speak_data)
    synth.speak(utterThis);
}
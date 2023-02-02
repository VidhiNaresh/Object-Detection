song = "";
status = "";
objects = [];
function preload() {
song = loadSound("emergency_alert.mp3");
}
function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}
function start() {
    objectDetected = ml5.objectDetector("cocossd", modelloaded);
    document.getElementById("status").innerHTML = "Status : detecting objects";
}
function modelloaded() {
    console.log("model loaded");
    status = true;
    objectDetected.detect(video, gotresults);
}
function gotresults(error, results) {
    if (error) {
        console.log("error");
    }
    console.log(results);
    objects = results;
}
function draw() {
    image(video, 0, 0, 640, 420);
    r = random(255)
    g = random(255);
    b = random(255);

    if (status != "") {
        for (i = 0; i < objects.length; i++) {
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if (objects[i].label == "person") {
                document.getElementById("number_of_objects").innerHTML = "Baby Found";
                song.stop();
            }
            else {
                document.getElementById("number_of_objects").innerHTML = "Baby Not Found";
                song.play();
            }
        }
        
    }
}
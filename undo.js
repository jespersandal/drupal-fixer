var savedtext;

function saveText() {
    savedtext = document.getElementById("rawarticle").value;
    console.log("Saved the content of the textarea.");
}

function undo() {
    document.getElementById("rawarticle").value = savedtext;
    console.log("Restored the textarea to the previously saved value. (1 step undo)");
}
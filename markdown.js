function stripMarkdown() {
    saveText();
    var unfixed = document.getElementById("rawarticle").value;
    var left;
    var right;
    var sentence;
    var startindex;
    var endindex;
    // first we remove all asterisks.
    unfixed = unfixed.replace(/\*\*/g, "");
    unfixed = unfixed.replace(/\*\b/g, ""); // by using the word boundry option \b we can preserve bullet points.
    unfixed = unfixed.replace(/\b\*/g, "");
    // then we remove all ### and ## headlines and we clean up any line that would begin with a space.
    unfixed = unfixed.replace(/###\s?/g, "");
    unfixed = unfixed.replace(/##\s?/g, "");
    // then we remove all [aid:] and [media:] tags.
    //unfixed = unfixed.replace(/\[>?>?\w*:\d*]/g, ""); // this regex does not remove tags with captions.
    unfixed = unfixed.replace(/\[>?>?\w*:\d.*]/g, ""); // should image captions be preserved?
    // then we remove all in line links.
    unfixed = unfixed.replace(/\[\b/g, ""); // this also strips the first [ of any remaining []-tags.
    unfixed = unfixed.replace(/]\(.*\)/g, "");
    // then we change triple and double line breaks into single line breaks.
    unfixed = unfixed.replace(/\n\n*/g, "\n");
    // finally we set the value of the textarea to the value of our string 'unfixed'.
    document.getElementById("rawarticle").value = unfixed;
}
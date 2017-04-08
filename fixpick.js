function fixCookie(textareaID) {
    var unfixed = document.getElementById(textareaID).value;
    // Save the original text using the function in undo.js:
    saveText();
    // Note to self: First check if selected quote marks match.
    // Then normalize all quotes. Or replace if better.
    // Then fix sentences if needed.
    var settings = checkCookie("settings");
    // Fixing line-breaks:
    if (settings.charAt(0) == "A") {
        unfixed = unfixed.replace(/(\r\n?|\n)+\n/g, "\n");
    }
    else if(settings.charAt(0) == "B") {
        unfixed = unfixed.replace(/(\r\n?|\n)+/g, "\n\n");
    }
    if (settings.charAt(1) == "Y") {
        unfixed = unfixed.replace(/\n\n\n+/g, "\n\n");
    }
    // If checked in settings, we run the methods for replacing
    // quotation marks:
    if (settings.charAt(2) == "Y") {
        var markin = "";
        var markout = "";
        // We asign the correct quotation marks based on settings:
        switch (settings.charAt(3)) {
            case "A" :
                markin = '"';
                markout = '"';
                break;
            case "B" :
                markin = "»";
                markout = "«";
                break;
            case "C" :
                markin = "“";
                markout = "”";
                break;
            case "D" :
                markin = "‘";
                markout = "’";
                break;
            case "E" :
                markin = "'";
                markout = "'";
                break;
            case "F" :
                markin = "«";
                markout = "»";
                break;
            case "G" :
                markin = "„";
                markout = "“";
                break;
            case "H" :
                markin = "„";
                markout = "”";
                break;
            case "I" :
                markin = "”";
                markout = "”";
                break;
        }
        // First, a simple substitution of marks with different start and end:
        if (settings.charAt(3) != "C") {
            unfixed = unfixed.replace(/“/g, markin);
            unfixed = unfixed.replace(/”/g, markout);
        }
        if (settings.charAt(3) != "B") {
            unfixed = unfixed.replace(/»/g, markin);
            unfixed = unfixed.replace(/«/g, markout);
        }
        // Next, we fix sentences marked with straight double quotes by running
        // through the text, checking for punctuation, and trying to slice
        // the substrings at the right place.
        for (i=0; i<unfixed.length; i++) {
            if (unfixed[i] == '"') {
                var sentenceloop = true;
                var sentenceindex = i + 1;
                while (sentenceloop && sentenceindex < unfixed.length) {
                    if (unfixed[sentenceindex] == '"') {
                        if (unfixed[sentenceindex - 1] == "," || unfixed[sentenceindex - 1] == "?") {
                            var left = unfixed.slice(0, i);
                            var sentence = unfixed.slice(i + 1, sentenceindex);
                            var right = unfixed.slice(sentenceindex + 1);
                            unfixed = left + markin + sentence + markout + right;
                            sentenceloop = false;
                        }
                        else if (unfixed[i - 1] != " " && unfixed[sentenceindex - 1] == ".") {
                            var linebreak;
                            if (i <= 1) {
                                var left = unfixed.slice(0, i);
                                var sentence = unfixed.slice(i + 1, sentenceindex);
                                var right = unfixed.slice(sentenceindex + 1);
                                unfixed = left + markin + sentence + markout + right;
                                sentenceloop = false;
                            }
                            else {
                                linebreak = unfixed.slice(i - 2, i);
                                var found = linebreak.match(/\n/g);
                                if (found != null) {
                                    var left = unfixed.slice(0, i);
                                    var sentence = unfixed.slice(i + 1, sentenceindex);
                                    var right = unfixed.slice(sentenceindex + 1);
                                    unfixed = left + markin + sentence + markout + right;
                                    sentenceloop = false;
                                }
                            }
                        }
                        else if (unfixed[i - 1] != " " && unfixed[sentenceindex + 1].match(/\s/) != null) {
                            var left = unfixed.slice(0, i);
                            var sentence = unfixed.slice(i + 1, sentenceindex);
                            var right = unfixed.slice(sentenceindex + 1);
                            unfixed = left + markin + sentence + markout + right;
                            sentenceloop = false;
                        }
                        else {
                            sentenceloop = false;
                        }
                    }
                    else {
                        sentenceindex++;
                    }
                }
            }
        }
        // Fixing single quotes using a similar technique to the one from double quotes:
        switch (settings.charAt(4)) {
            case "A" :
                markin = "'";
                markout = "'";
                break;
            case "B" :
                markin = "‘";
                markout = "’";
                break;
            case "C" :
                markin = "‚";
                markout = "‘";
                break;
            case "D" :
                markin = "’";
                markout = "’";
                break;
            case "E" :
                markin = "‚";
                markout = "’";
                break; 
        }
        // First, we substitute to straight quotes if needed:
        if (settings.charAt(4) == "A") {
            unfixed = unfixed.replace(/‘/g, markin);
            unfixed = unfixed.replace(/’/g, markout);
            // This doesn't include all possible cases, but we save the exotic ones to save cycles.
        }
        // Fixing the quotes with different start and end, but excluding apostrophes:
        if (settings.charAt(4) != "A") {
            for (i = 0; i < unfixed.length; i++) {
                if (unfixed[i] == "'") {
                    var left;
                    var right;
                    var charleft = unfixed[i - 1].toString();
                    var charright = unfixed[i + 1].toString();
                    if (charleft.match(/\s/) != null && charright.match(/\w/) != null) {
                        left = unfixed.slice(0, i);
                        right = unfixed.slice(i + 1);
                        unfixed = left + markin + right;
                    }
                    else if (charleft.match(/[\w\,\?\.\!]/) != null && charright.match(/[\s\?\.\!]/) != null) {
                        left = unfixed.slice(0, i);
                        right = unfixed.slice(i + 1);
                        unfixed = left + markout + right;
                    }
                }
            }
        }
    }

    // Fixing brackets for links in Markdown if Markdown-fixes are checked:
    if (settings.charAt(6) == "Y") {
        for (i=0; i<unfixed.length; i++) {
            var braindex = 0;
            var parindex = 0;
            if(unfixed[i] == "]" && unfixed[i-1] == " ") {
                var left;
                var right;
                braindex = i;
                parindex = braindex;
                var runloop = true;
                while (runloop && parindex<unfixed.length) {
                    if(unfixed[parindex] == ")") {
                        if(unfixed[parindex+1] == "." || unfixed[parindex+1] == " ") {
                            runloop = false;
                         }
                         else {
                            left = unfixed.slice(0,parindex+1);
                            right = unfixed.slice(parindex+1);
                            unfixed = left + " " + right;
                            left = unfixed.slice(0,braindex-1);
                            right = unfixed.slice(braindex);
                            unfixed = left + right;
                            runloop = false;
                        }
                    }
                    else {
                        parindex++;
                        runloop = true;
                    }
                }
            }
        }
        for (i=0; i<unfixed.length; i++) {
            var braindex = 0;
            var parindex = 0;
            if(unfixed[i] == "]" && unfixed[i-1] == ".") {
                var left;
                var right;
                braindex = i;
                parindex = braindex;
                var runloop = true;
                while (runloop && parindex<unfixed.length) {
                    if(unfixed[parindex] == ")") {
                        left = unfixed.slice(0,parindex+1);
                        right = unfixed.slice(parindex+1);
                        unfixed = left + "." + right;
                        left = unfixed.slice(0,braindex-1);
                        right = unfixed.slice(braindex);
                        unfixed = left + right;
                        runloop = false;
                    }
                    else {
                        parindex++;
                        runloop = true;
                    }
                }
            }
        }
        unfixed = unfixed.replace(/\[\s/g, " \[");
        unfixed = unfixed.replace(/\(\s/g, "(");
        unfixed = unfixed.replace(/\[aid:\s/g, "[aid:");
    }
    // Various small fixes that should always be fixed:
    // Removes trailing whitespace characters:
    unfixed = unfixed.replace(/\s+$/, "");
    // Removes line-break character from text copied from Adobe InDesign:
    unfixed = unfixed.replace(/¬/g, "");
    document.getElementById(textareaID).value = unfixed;
}


function cookieBaker() {
    // This retrieves the values from the form and creates a string to use as
    // the value for the cookie.
    // At this point I'm just going to get the values from the form manually. Fix later.

    // Array with names of the form fields:
    //var cookiedough = ["linjeskift", "xlinjeskift", "citationstegn", "citater", "enkeltquotes",
    //                    "dobbeltenkelt", "fixmarkdown"];
    var cookiestring = "";
    if(document.getElementById("linjeskiftA").checked) {
        cookiestring = cookiestring + "A";
    }
    else {
        cookiestring = cookiestring + "B";
    }
    if (document.getElementById("xlinjeskift").checked) {
        cookiestring = cookiestring + "Y";
    }
    else {
        cookiestring = cookiestring + "N";
    }
    if (document.getElementById("citationstegn")) {
        cookiestring = cookiestring + "Y";
    }
    else {
        cookiestring = cookiestring + "N";
    }
    cookiestring = cookiestring + document.getElementById("citater").value;
    cookiestring = cookiestring + document.getElementById("enkeltquotes").value;
    if (document.getElementById("dobbeltenkelt").checked) {
        cookiestring = cookiestring + "Y";
    }
    else {
        cookiestring = cookiestring + "N";
    }
    if (document.getElementById("fixmarkdown")) {
        cookiestring = cookiestring + "Y";
    }
    else {
        cookiestring = cookiestring + "N";
    }
    return cookiestring;
}

function resetForm() {
    // Reads the saved values from the cookie and sets the form fields to the
    // appropriate values.
    // This only handles how the form is displayed, not which parts of the
    // program will actually run.
    var cookiestring = checkCookie("settings");
    if(cookiestring.charAt(0) == "A") {
        document.getElementById("linjeskiftA").checked = true;
    }
    else if(cookiestring.charAt(0) == "B") {
        document.getElementById("linjeskiftB").checked = true;
    }
    if (cookiestring.charAt(1) == "Y") {
        document.getElementById("xlinjeskift").checked = true;
    }
    if (cookiestring.charAt(2) == "Y") {
        document.getElementById("citationstegn").checked = true;
    }
    document.getElementById("citater").value = cookiestring.charAt(3);
    document.getElementById("enkeltquotes").value = cookiestring.charAt(4);
    if (cookiestring.charAt(5) == "Y") {
        document.getElementById("dobbeltenkelt").checked = true;
    }
    if (cookiestring.charAt(6) == "Y") {
        document.getElementById("fixmarkdown").checked = true;
    }
}

// The following is based on the code for setting and reading cookies from
// http://www.quirksmode.org/js/cookies.html - but I've changed a few names
// to help me better read it (e.g. ca --> cookiearray) and updated the outdated
// .toGMTString method to .toUTCString.
// 
// I have also changed the code to set a cookie with a set expiration date
// of 365 days if no date is provided.

function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires=" + date.toUTCString();
    }
    else {
        var date = new Date();
        date.setTime(date.getTime()+(31536000000)); // One year in milliseconds.
        var expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + ";" + expires + "; path=/";
}

function readCookie(cookiename) {
    var name = cookiename + "=";
    var cookiearray = document.cookie.split(";");
    for (var i=0; i < cookiearray.length; i++) {
        var c = cookiearray[i];
        while (c.charAt(0) == " ") c = c.substring(1,c.length);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return null;
}

function deleteCookie(cookiename) {
    createCookie(cookiename, "", -1);
}

function checkCookie(cookiename) {
    defaultsettings = "BYYBBNY";
    var settings = readCookie(cookiename);
    if (settings != "" && settings != null) {
        return settings;
    }
    else {
        return defaultsettings;
    }
}
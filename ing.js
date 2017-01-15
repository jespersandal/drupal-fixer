function INGquote() {
    saveText();
    var unfixed = document.getElementById("rawarticle").value;
    for (i = 0; i < unfixed.length; i++) {
        if (unfixed[i] == "'") {
            var left;
            var right;
            var charleft = unfixed[i-1].toString();
            var charright = unfixed[i+1].toString();
            if (charleft.match(/\s/) != null & charright.match(/\w/) != null) {
                left = unfixed.slice(0, i);
                right = unfixed.slice(i+1);
                unfixed = left + "‘" + right;
            }
            else if (charleft.match(/[\w\,\?\.\!]/) != null & charright.match(/[\s\?\.\!]/) != null) {
                left = unfixed.slice(0, i);
                right = unfixed.slice(i+1);
                unfixed = left + "’" + right;
            }
        }
    }
    document.getElementById("rawarticle").value = unfixed;
}

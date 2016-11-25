function fixAll() {
                saveText();
                var unfixed = document.getElementById("rawarticle").value;
                for (i=0; i<unfixed.length; i++) {
                    var braindex = 0;
                    var parindex = 0;
                    if(unfixed[i] == "]" & unfixed[i-1] == " ") {
                        var left;
                        var right;
                        braindex = i;
                        parindex = braindex;
                        var runloop = true;
                        while (runloop & parindex<unfixed.length) {
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
                unfixed = unfixed.replace(/”/g, '"');
                unfixed = unfixed.replace(/“/g, '"');
                unfixed = unfixed.replace(/‘/g, "'");
                unfixed = unfixed.replace(/’/g, "'");
                unfixed = unfixed.replace(/¬/g, "");
                unfixed = unfixed.replace(/\[\s/g, " \[");
                unfixed = unfixed.replace(/\(\s/g, "(");
                unfixed = unfixed.replace(/\[aid:\s/g, "[aid:");
                unfixed = unfixed.replace(/\n\n\n/g, "\n\n");  
                unfixed = unfixed.replace(/\s+$/, "");
                for (i=0; i<unfixed.length; i++) {
                    if(unfixed[i] == '"'){
                        var sentenceloop = true;
                        var sentenceindex = i+1;
                        while (sentenceloop & sentenceindex<unfixed.length) {
                            if(unfixed[sentenceindex] == '"') {
                                if(unfixed[sentenceindex-1] == "," || unfixed[sentenceindex-1] == "?") {
                                    var left = unfixed.slice(0,i);
                                    var sentence = unfixed.slice(i+1,sentenceindex);
                                    var right = unfixed.slice(sentenceindex+1);
                                    unfixed = left + "»" + sentence + "«" + right;
                                    sentenceloop = false;
                                }
                                else if(unfixed[i-1] != " " && unfixed[sentenceindex-1] == ".") {
                                    var linebreak; 
                                    if(i<= 1) {
                                        var left = unfixed.slice(0,i);
                                        var sentence = unfixed.slice(i+1,sentenceindex);
                                        var right = unfixed.slice(sentenceindex+1);
                                        unfixed = left + "»" + sentence + "«" + right;
                                        sentenceloop = false;
                                    }
                                    else {
                                        linebreak = unfixed.slice(i-2,i);
                                        console.log(linebreak);
                                        var found = linebreak.match(/\n/g);
                                        console.log(found);
                                        if(found != null) {
                                            var left = unfixed.slice(0,i);
                                            var sentence = unfixed.slice(i+1,sentenceindex);
                                            var right = unfixed.slice(sentenceindex+1);
                                            unfixed = left + "»" + sentence + "«" + right;
                                            sentenceloop = false;
                                        }
                                    }
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
                for (i=0; i<unfixed.length; i++) {
                    var braindex = 0;
                    var parindex = 0;
                    if(unfixed[i] == "]" & unfixed[i-1] == ".") {
                        var left;
                        var right;
                        braindex = i;
                        parindex = braindex;
                        var runloop = true;
                        while (runloop & parindex<unfixed.length) {
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
                document.getElementById("rawarticle").value = unfixed;
            }

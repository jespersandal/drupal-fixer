            var holdtext;
            var seltext;
            var selstart;
            var selend;
            function getSelectedText() {
                var textbox = document.getElementById("rawarticle");
                selstart = textbox.selectionStart;
                selend = textbox.selectionEnd;
                holdtext= textbox.value;
                seltext = holdtext.substring(selstart, selend);
            }
            function subSubstitute() {
                var unisubchars = ["₀", "₁", "₂", "₃", "₄", "₅", "₆", "₇", "₈", "₉"];
                saveText();
                var lefttext = holdtext.slice(0, selstart);
                var righttext = holdtext.slice(selend);
                var subbedtext = seltext;
                var textbox = document.getElementById("rawarticle");
                var leftsel = "";
                var rightsel = "";
                for (i = 0; i < seltext.length; i++) {
                    switch(seltext[i]) {
                        case "0":
                            leftsel = subbedtext.slice(0,i);
                            rightsel = subbedtext.slice(i+1);
                            subbedtext = leftsel + unisubchars[0] + rightsel;
                            break;
                        case "1":
                            leftsel = subbedtext.slice(0,i);
                            rightsel = subbedtext.slice(i+1);
                            subbedtext = leftsel + unisubchars[1] + rightsel;
                            break;
                        case "2":
                            leftsel = subbedtext.slice(0,i);
                            rightsel = subbedtext.slice(i+1);
                            subbedtext = leftsel + unisubchars[2] + rightsel;
                            break;
                        case "3":
                            leftsel = subbedtext.slice(0,i);
                            rightsel = subbedtext.slice(i+1);
                            subbedtext = leftsel + unisubchars[3] + rightsel;
                            break;
                        case "4":
                            leftsel = subbedtext.slice(0,i);
                            rightsel = subbedtext.slice(i+1);
                            subbedtext = leftsel + unisubchars[4] + rightsel;
                            break;
                        case "5":
                            leftsel = subbedtext.slice(0,i);
                            rightsel = subbedtext.slice(i+1);
                            subbedtext = leftsel + unisubchars[5] + rightsel;
                            break;
                        case "6":
                            leftsel = subbedtext.slice(0,i);
                            rightsel = subbedtext.slice(i+1);
                            subbedtext = leftsel + unisubchars[6] + rightsel;
                            break;
                        case "7":
                            leftsel = subbedtext.slice(0,i);
                            rightsel = subbedtext.slice(i+1);
                            subbedtext = leftsel + unisubchars[7] + rightsel;
                            break;
                        case "8":
                            leftsel = subbedtext.slice(0,i);
                            rightsel = subbedtext.slice(i+1);
                            subbedtext = leftsel + unisubchars[8] + rightsel;
                            break;
                        case "9":
                            leftsel = subbedtext.slice(0,i);
                            rightsel = subbedtext.slice(i+1);
                            subbedtext = leftsel + unisubchars[9] + rightsel;
                            break;
                        default:
                            break;
                    }
                }
                textbox.value = lefttext + subbedtext + righttext;
            }
            function supSubstitute() {
                var unisupchars = ["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹", "ⁿ"];
                saveText();
                var lefttext = holdtext.slice(0, selstart);
                var righttext = holdtext.slice(selend);
                var subbedtext = seltext;
                var textbox = document.getElementById("rawarticle");
                var leftsel = "";
                var rightsel = "";
                for (i = 0; i < seltext.length; i++) {
                    switch(seltext[i]) {
                        case "0":
                            leftsel = subbedtext.slice(0,i);
                            rightsel = subbedtext.slice(i+1);
                            subbedtext = leftsel + unisupchars[0] + rightsel;
                            break;
                        case "1":
                            leftsel = subbedtext.slice(0,i);
                            rightsel = subbedtext.slice(i+1);
                            subbedtext = leftsel + unisupchars[1] + rightsel;
                            break;
                        case "2":
                            leftsel = subbedtext.slice(0,i);
                            rightsel = subbedtext.slice(i+1);
                            subbedtext = leftsel + unisupchars[2] + rightsel;
                            break;
                        case "3":
                            leftsel = subbedtext.slice(0,i);
                            rightsel = subbedtext.slice(i+1);
                            subbedtext = leftsel + unisupchars[3] + rightsel;
                            break;
                        case "4":
                            leftsel = subbedtext.slice(0,i);
                            rightsel = subbedtext.slice(i+1);
                            subbedtext = leftsel + unisupchars[4] + rightsel;
                            break;
                        case "5":
                            leftsel = subbedtext.slice(0,i);
                            rightsel = subbedtext.slice(i+1);
                            subbedtext = leftsel + unisupchars[5] + rightsel;
                            break;
                        case "6":
                            leftsel = subbedtext.slice(0,i);
                            rightsel = subbedtext.slice(i+1);
                            subbedtext = leftsel + unisupchars[6] + rightsel;
                            break;
                        case "7":
                            leftsel = subbedtext.slice(0,i);
                            rightsel = subbedtext.slice(i+1);
                            subbedtext = leftsel + unisupchars[7] + rightsel;
                            break;
                        case "8":
                            leftsel = subbedtext.slice(0,i);
                            rightsel = subbedtext.slice(i+1);
                            subbedtext = leftsel + unisupchars[8] + rightsel;
                            break;
                        case "9":
                            leftsel = subbedtext.slice(0,i);
                            rightsel = subbedtext.slice(i+1);
                            subbedtext = leftsel + unisupchars[9] + rightsel;
                            break;
                        default:
                            break;
                    }
                }
                textbox.value = lefttext + subbedtext + righttext;
            }
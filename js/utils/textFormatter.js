function formatText(text) {
    /*
    This function takes a string and returns a string with the following formatting:
        **bold** -> <b>bold</b>
        ##italic## -> <i>italic</i>
        __underlined__ -> <u>underlined</u>
        ~~striked~~ -> <s>striked</s>
        \n -> <br>
        [text](link) -> <a href="link">text</a>
        --r[text]r-- -> <span class="rainbow">text</span>
        @name -> <a href="profile.php?name=name">@name</a>
    @param text: the string to format
    @return: the formatted string
    */

    // Replace all ** with <b> and </b>
    const boldText = text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");

    // Replace all ## with <i> and </i>
    const italicText = boldText.replace(/##(.*?)##/g, "<i>$1</i>");

    // Replace all __ with <u> and </u>
    const underlinedText = italicText.replace(/__(.*?)__/g, "<u>$1</u>");

    // Replace all ~~ with <s> and </s>
    const strikedText = underlinedText.replace(/~~(.*?)~~/g, "<s>$1</s>");

    // Replace all \n with <br>
    const newLineText = strikedText.replace(/\n/g, "<br>");

    // Replace [text](link) with <a href="link">text</a>
    const linkedText = newLineText.replace(/\[(.*?)\]\((.*?)\)/g, "<a class='link' href='$2'>$1</a>");

    // Replace all --r[]r-- with <span class="rainbow"> and </span>
    const rainbowText = linkedText.replace(/--r\[(.*?)\]r--/g, "<span class='rainbow'>$1</span>");

    // Replace all @name with <a href="profile.php?name=name">@name</a>
    const mentionText = rainbowText.replace(/@(\w+)/g, "<a href='profile.html?username=$1' class='mention'>@$1</a>");

    // Replace all #tag with <a href="search.php?tag=tag">#tag</a>
    const hashtagText = mentionText.replace(/#(\w+)/g, `<a href='index.html?search=%23$1' class='tag'>#$1</a>`);

    
    return hashtagText;
}

export {formatText};
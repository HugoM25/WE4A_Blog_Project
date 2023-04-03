function formatText(text) {
    // Replace all ** with <b> and </b>
    const boldText = text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");

    // Replace all // with <i> and </i>
    const italicText = boldText.replace(/\/\/(.*?)\/\//g, "<i>$1</i>");

    // Replace all __ with <u> and </u>
    const underlinedText = italicText.replace(/__(.*?)__/g, "<u>$1</u>");

    // Replace all ~~ with <s> and </s>
    const strikedText = underlinedText.replace(/~~(.*?)~~/g, "<s>$1</s>");

    // Replace all \n with <br>
    const newLineText = strikedText.replace(/\n/g, "<br>");

    const linkedText = newLineText.replace(/\[(.*?)\]\((.*?)\)/g, "<a href='$2'>$1</a>");

    return linkedText;
}

export {formatText};
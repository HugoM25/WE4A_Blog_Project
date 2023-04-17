function sanitizeUserInput(input) {
    // Remove all HTML tags
    input = input.replace(/(<([^>]+)>)/ig,"");
    return input;
}

export {sanitizeUserInput}; 
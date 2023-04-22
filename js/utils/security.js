function sanitizeUserInput(input) {
    /*
    *   Sanitize the user input
    *   @param {string} input - The user input
    *   @return {string} - The sanitized user input
    */

    // Remove all HTML tags
    input = input.replace(/(<([^>]+)>)/ig,"");

    // Remove functions from the input (e.g. onclick="function()") 
    input = input.replace(/(on\w+)=/g, "");

    return input;
}

export {sanitizeUserInput}; 
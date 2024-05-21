export function truncateString(input: string, charCount: number, showDots: boolean): string {
    // Edge case: If the input string is null or undefined, return an empty string
    if (input === null || input === undefined) {
        return "";
    }

    // Edge case: If charCount is less than or equal to 0, return an empty string
    if (charCount <= 0) {
        return "";
    }

    // Edge case: If the input string is shorter or equal to charCount, return the original string
    if (input.length <= charCount) {
        return input;
    }

    // Truncate the string to the specified charCount
    let truncatedString = input.substring(0, charCount);

    // If showDots is true and charCount is greater than 3, replace the last three characters with "..."
    if (showDots && charCount > 3) {
        truncatedString = truncatedString.substring(0, charCount - 3) + "...";
    }

    return truncatedString;
}

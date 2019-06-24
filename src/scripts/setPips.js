/**
 * setPips
 * 
 * Checks if the index at a given value is within the plots for the pip positions on a die
 *
 * @export
 * @param {*} value The value, 1-6
 * @param {*} index The position, 0-9, in a 3x3 grid pattern
 * @returns boolean true/false
 */
export default function setPips(value, index) {
    if(value <= 0 || value >= 7) return false;
    const positions = {
        1: [4],
        2: [6, 2],
        3: [6, 4, 2],
        4: [0, 6, 2, 8],
        5: [0, 6, 2, 8, 4],
        6: [0, 3, 6, 2, 5, 8]
    }
    return positions[value].includes(index)
}
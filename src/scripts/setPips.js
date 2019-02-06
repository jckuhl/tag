export default function setPips(value, index) {
    if(value === 0) return false;
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
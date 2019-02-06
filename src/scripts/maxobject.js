export default function getMax(array, prop) {
    array = array.filter(object => object[prop] !== undefined);
    if(array.length) {
        let max = array[0][prop];
        let objects = [];
        for(let i = 0; i < array.length; i++) {
            if(array[i][prop] > max) {
                objects = [];
                max = array[i][prop];
                objects.push(array[i]);
            } else if(array[i][prop] === max) {
                objects.push(array[i]);
            }
        }
        return objects
    } else {
        return []
    }
}

function getContent(howMany=1) {
    let result = '';
    let count = 0;
    while (count < howMany) {
        result += '<p>What an amazing blog!</p>'
        count += 1;
    }
    return result;
}

module.exports = {
    getContent
};
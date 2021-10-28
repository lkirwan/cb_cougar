
exports.getRandomNumberBetweenLimits = function (minLimit, maxLimit) {
    let min = Math.ceil(minLimit), max = Math.floor(maxLimit);
    return (Math.floor(Math.random() * (max - min) + min));
}

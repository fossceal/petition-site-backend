exports.convertUTCDateToLocalDate = (date) => {
    var currentTime = date;

    var currentOffset = currentTime.getTimezoneOffset();

    var ISTOffset = 330;

    var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset) * 60000);

    const exactTime = ISTTime.getTime();

    return exactTime;
}
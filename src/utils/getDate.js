export const getTime = (date) => {
    const zone = new Date().getTimezoneOffset();
    const dateCreation = new Date().getTime() + (zone * 60000) - new Date(date).getTime();
    const minutes = dateCreation / 60000;
    const hours = minutes / 60;
    const days = hours / 24;
    const month = days / 30;
    if (minutes < 1) {
        return { date: 1, name: 'minutes' }
    }
    const dateArray = [{ date: minutes, name: 'minutes' }, { date: hours, name: 'hours' }, { date: days, name: 'days' }, { date: month, name: 'month' }]
    const newDateArray = dateArray.filter(e => e.date > 1).reverse();
    return newDateArray[0];
}
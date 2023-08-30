

export const getDate = (time:string) => {
    const date = new Date(time);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return `${day}.${month}.${year}`
}
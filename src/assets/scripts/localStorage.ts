
export const setToLS = (key: string, item:any) => localStorage.setItem(key, JSON.stringify(item));

export const getFromLS = (key:string) => {
    const value = localStorage.getItem(key);
    if(value) return JSON.parse(value);
    return null
}
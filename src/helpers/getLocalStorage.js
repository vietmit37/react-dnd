import {data} from "../mock/data.js";

export const getLocalStorage = () => {
    const localValue = localStorage.getItem("taskList");
    if (localValue === null) return data;
    return JSON.parse(localValue);
};

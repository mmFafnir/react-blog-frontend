import { TWork } from "../../../types/TypeWork";
import { TWorkUpdate } from "./asyncAction";




export interface IDataFetchWorks {
    pages: number,
    page: number,
    works: TWork[]
}


export interface IUpdateWorkParams {
    work: TWorkUpdate
    id: string,
}

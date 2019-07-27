import { HeaderState } from './../components/reducers/index';
import { Action } from 'redux';
export enum HeaderActionType{
    HeaderAction = 'HEADER_ACTION',
    HeaderSearchAction = 'HEADER_SEARCH_ACTION'
}
export interface HeaderActionData extends Action{
    payload : any;
}
export const HeaderAction = (state : HeaderState) : HeaderActionData =>{
    return {type : HeaderActionType.HeaderAction, payload : state};
}
export const HeaderSearchAction = (value : string) : HeaderActionData => {
    return {type : HeaderActionType.HeaderSearchAction, payload : value};
}
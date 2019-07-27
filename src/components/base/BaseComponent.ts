import React from "react";
import { HeaderState } from './../reducers/index';
import { HeaderStore } from "../../store";
import { HeaderAction, HeaderSearchAction } from './../../actions/index';
export class BaseComponent extends React.Component{
    constructor(props : any){
        super(props);
        HeaderStore.subscribe(()=> this.onState(HeaderStore.getState()));
        this.updateHeaderVisibility(true);
    }
    /**
     * This method will be triggered when redux
     * store is notified
     * @param state Redux State
     */
    protected onState(state : any){
    }
    /**
     * This method will be triggered when user call search
     * @param value Search Value
     */
    protected onSearch(value : string){
    }
    protected updateSearch(value : string){
        this.updateHeaderState({search: value});
    }
    protected updateHeaderVisibility(state : boolean){
        this.updateHeaderState({visible : state});
    }
    protected updateHeaderState(state : any){
        HeaderStore.dispatch(HeaderAction(state));
    }
    protected getHeaderState() : HeaderState{
        return HeaderStore.getState();
    }
    protected dispatchSearch(value : string){
        return HeaderStore.dispatch(HeaderSearchAction(value));
    }
}
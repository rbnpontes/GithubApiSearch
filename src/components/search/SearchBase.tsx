import React from "react";
import { Redirect } from "react-router-dom";
import { BaseComponent } from './../base/BaseComponent';
import ReactDOM from "react-dom";

export class SearchBase extends BaseComponent{
    
    protected search(username : string){
        let link = '/search/'+username;
        window.location.href=link;
    }
}
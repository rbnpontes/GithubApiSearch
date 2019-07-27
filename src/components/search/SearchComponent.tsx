import './Search.css';
import React from 'react';
import { IUser } from '../../models/User';

export class SearchComponent extends React.Component{
    private items : IUser = [];
    constructor(props : Readonly<{}>){
        super(props);
    }
    render(){
        return (
            <div className="search-container">
                <ul className="list-group list-group-flush">
                </ul>
            </div>
        )
    }
}
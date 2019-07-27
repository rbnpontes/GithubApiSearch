import './Search.css';
import React from 'react';
import { IUser } from '../../models/User';
import { PictureComponent } from '../generals/PictureComponent';

export class SearchComponent extends React.Component {
    private items: IUser[] = [];
    constructor(props: Readonly<{}>) {
        super(props);
        let count = 20;
        while (count--){
            this.items.push({ 
                name: 'Test ' + Math.floor(Math.random() * 1000),
                bio : 'The most powerful weapon in the universe.',
                profileImg: 'https://avatars2.githubusercontent.com/u/10354401?s=460&v=4'
            });
        }
    }
    private get emptyEntriesHtml() {
        return (
            <div className="text-center">
                <h1 className="list-title mt-5 pt-5">User not found :(</h1>
            </div>
        )
    }
    private get listEntriesHtml() {
        return (
            <div className="row mx-0">
                <div className="col-md-3">
                </div>
                <div className="col-md">
                    <ul className="ml-4 list-group list-group-flush">
                        {this.itemsHtml}
                    </ul>
                </div>
            </div>
        );
    }
    private get itemsHtml() {
        return this.items.map(x =>
            <li className="list-group-item">
                <div className="row mx-0">
                    <div className="list-user-picture d-flex align-items-center">
                        <PictureComponent src={x.profileImg} width="2.1em" height="2.1em"/>
                    </div>
                    <div className="col">
                        <a href=""><h1 className="list-title">{x.name}</h1></a>
                        <div className="list-body">
                            {x.bio.length == 0 ? 'No bio.' : x.bio}
                        </div>
                    </div>
                </div>
            </li>
        );
    }
    render() {
        return (
            <div className="search-container">
                {this.items.length ==0 ? (this.emptyEntriesHtml) : (this.listEntriesHtml)}
            </div>
        )
    }
}
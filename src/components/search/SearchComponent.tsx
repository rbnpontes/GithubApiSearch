import './Search.css';
import React from 'react';
import { IUser } from '../../models/User';
import { PictureComponent } from '../generals/PictureComponent';
import { uid } from 'react-uid';
import { match } from 'react-router';
import { BaseComponent } from './../base/BaseComponent';
import { GithubService } from '../../services/GithubService';
import { Link } from 'react-router-dom';
export interface SearchProps {
    match: match;
}
export class SearchComponent extends BaseComponent {
    public state: { users: IUser[], loading: boolean } = { users: [], loading: true };
    constructor(props: Readonly<SearchProps>) {
        super(props);
        let username = (props.match as any).params['id'];
        // Call Search method for make a fetch
        this.onSearch(username);
    }
    private get loadEntriesHtml() {
        return (
            <div className="text-center">
                <div className="spinner-grow text-default mt-5 pt-5" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
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
        return this.state.users.map(x =>
            <li className="list-group-item" key={uid(x)}>
                <div className="row mx-0">
                    <div className="list-user-picture d-flex align-items-center">
                        <PictureComponent src={x.profileImg} width="2.1em" height="2.1em" />
                    </div>
                    <div className="col">
                        <Link className="nav-anchor" to=""><h3 className="list-title">{x.name}</h3></Link>
                    </div>
                </div>
            </li>
        );
    }
    protected onSearch(value: string): void {
        this.setState({users : [], loading : true});
        GithubService.searchUsers(value).then(x => {
            this.setState({users : x, loading : false});
        });
    }
    render() {
        let result = null;
        if(this.state.loading)
            result = this.loadEntriesHtml;
        else if(this.state.users.length == 0)
            result = this.emptyEntriesHtml;
        else
            result = this.listEntriesHtml;
        return (
            <div className="search-container">
                {result}
            </div>
        )
    }
}
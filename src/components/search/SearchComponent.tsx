import './Search.css';
import React from 'react';
import { IUser } from '../../models/User';
import { PictureComponent } from '../generals/PictureComponent';
import { uid } from 'react-uid';
import { match } from 'react-router';
import { BaseComponent } from './../base/BaseComponent';
import { GithubService } from '../../services/GithubService';
import { Link } from 'react-router-dom';
import { IPage } from '../../models';
interface SearchProps {
    match: match;
}
interface SearchState{
    users : IUser[];
    loading : boolean;
    page : number;
    totalCount : number;
    loadingMore : boolean;
}
export class SearchComponent extends BaseComponent {
    public state: SearchState;
    private searchUser : string;
    constructor(props: Readonly<SearchProps>) {
        super(props);
        let username = (props.match as any).params['id'];
        this.state = {
            users : [],
            loading : true,
            loadingMore: false,
            page : 1,
            totalCount : 0
        };
        this.searchUser = username;
        // If user is out of site, update search
        this.updateSearch(username);
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
                    <ul className="ml-4 list-group list-group-flush mb-2">
                        {this.itemsHtml}
                    </ul>
                    {this.loadMoreHtml}
                </div>
            </div>
        );
    }
    private get itemsHtml() {
        return this.state.users.map(x =>
            <li className="list-group-item" key={uid(x)}>
                <div className="row mx-0">
                    <div className="list-user-picture d-flex align-items-center">
                        <PictureComponent src={(x.profileImg as any)} width="2.1em" height="2.1em" />
                    </div>
                    <div className="col">
                        <Link className="nav-anchor" to={`/profile/${x.name}`}><h3 className="list-title">{x.name}</h3></Link>
                    </div>
                </div>
            </li>
        );
    }
    private get loadMoreHtml() {
        if(this.state.loading || this.state.loadingMore || this.state.users.length >= this.state.totalCount || this.state.users.length == 0)
            return <span></span>;
        return (
            <div className="row px-2 mb-2">
                <div className="col">
                    <button className="btn btn-outline-secondary w-100 text-center" onClick={()=> this.tryLoadMore()}>Load more.</button>
                </div>
            </div>
        );
    }
    protected async onSearch(value: string) {
        let state = this.state;
        state.page = 1;
        state.loading= true;
        state.loadingMore = false;
        state.totalCount = 0;
        state.users = [];
        this.setState(state);
        try{
            let data : IPage<IUser[]> = await GithubService.searchUsers(value, 1);
            state.users = data.data;
            state.totalCount = data.totalCount;
            state.page++;
        }catch(e){
            alert('Error has Ocurred, try again later');
        }finally{
            state.loading = false;
            this.setState(state);
        }
    }
    private async tryLoadMore(){
        let state : SearchState = this.state;
        state.loadingMore = true;
        this.setState(state);
        try{
            let data : IPage<IUser[]> = await GithubService.searchUsers(this.searchUser, state.page);
            // Current API has a Bug when switch page
            // The first record in the next page is equals to the last record of page the last page
            // To fix this, i will remove the last item on record o curr list
            if(data.data.length > 0){
                // I will check if last entry is equal to curr
                if(state.users[state.users.length -1].name == data.data[0].name)
                    state.users.pop(); // Remove last record
            }
            state.users = state.users.concat(data.data);
            state.page++;
        }catch(e){
            alert('Error has Ocurred, wait a minute and try again!');
        }finally{
            state.loadingMore = false;
            this.setState(state);
        }
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
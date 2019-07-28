import { BaseComponent } from "../base/BaseComponent";
import React from 'react';
import { IUser } from "../../models/User";
import { uid } from "react-uid";
import { GithubService } from "../../services/GithubService";
import { IRepo } from '../../models';
export interface ProfileReposData {
    user: IUser;
}
interface ProfileReposState {
    page: number;
    loading: boolean;
    totalCount: number;
    repos: IRepo[];
}
export class ProfileReposComponent extends BaseComponent {
    public state: ProfileReposState;
    constructor(public props: Readonly<ProfileReposData>) {
        super(props);
        let page = props.user.repos;
        if (!page)
            page = { data: [], totalCount: 0 };
        this.state = { page: 1, loading: false, totalCount: page.totalCount, repos: page.data };
    }
    private get entriesHtml() {
        if (!this.props.user.repos)
            return [];
        return this.props.user.repos.data.map(x => (
            <li key={uid(x)} className="list-group-item text">
                <a className="nav-anchor" target="_blank" href={x.url}><h1 className="list-title">{x.name}</h1></a>
                <span>{x.description ? x.description : 'No description'}</span>
                <p className="mb-0 mt-1">
                    <i className="material-icons">star_border</i> <span className="repo-star-count">{x.stars}</span>
                </p>
            </li>
        ));
    }
    private get loadMoreHtml() {
        if (this.state.loading || this.state.repos.length >= this.state.totalCount)
            return <span></span>;
        return (
            <div className="row px-2 mb-2">
                <div className="col">
                    <button className="btn btn-outline-secondary w-100 text-center" onClick={() => this.tryLoadMore()}>Load more.</button>
                </div>
            </div>
        );
    }
    private async tryLoadMore() {
        let repos: IRepo[] = this.props.user.repos ? this.props.user.repos.data : [];
        this.state.loading = true;

        this.state.page++;
        this.setState(this.state);
        try {
            let page = await GithubService.fetchUserRepos(this.props.user.login, this.state.page);
            if(page.data.length > 0){
                if(repos[repos.length - 1].name == page.data[0].name)
                    repos.pop();
            }
            if (this.props.user.repos)
                this.props.user.repos.data = repos.concat(page.data);
        } catch (e) {
            alert('Error has Ocurred at load more Repositories, wait a minute and try again!');
        } finally {
            this.state.loading = false;
            this.setState(this.state);
        }
    }
    render() {
        return (
            <section>
                <ul className="ml-4 list-group list-group-flush">
                    {this.entriesHtml}
                </ul>
                {this.loadMoreHtml}
            </section>

        );
    }
}
import React, { ChangeEvent } from 'react';
import './Home.css';
import { SearchBase } from './../search/SearchBase';
import { HeaderState } from '../reducers';
import { statement } from '@babel/template';
interface HomeState {
    search: string;
}
export class HomeComponent extends SearchBase {
    public state: HomeState = { search: '' };
    constructor(props: Readonly<{}>) {
        super(props);
        this.updateHeaderVisibility(false);
    }
    protected onState(state : HeaderState){
        this.setState({search : state.search});
    }
    private handleSearchInput(e: React.ChangeEvent<HTMLInputElement>) {
        let state : HeaderState = {search: e.target.value, visible: false};
        this.updateHeaderState(state);
    }
    private trySearch(e : React.FormEvent) {
        e.preventDefault();
        // Inner method inside SearchBase
        this.search(this.state.search);
        this.updateHeaderVisibility(true);
    }
    render() {
        let instance = this;
        return (
            <div className="home-container d-flex align-items-center justify-content-center">
                <section className="w-50">
                    <div className="row mb-2">
                        <div className="col text-center">
                            <span className="github-label">
                                <b>Github</b>
                                <span className="github-label-search">Search</span>
                            </span>
                        </div>
                    </div>
                    <form onSubmit={(e) => this.trySearch(e)}>
                        <div className="row">
                            <div className="col">
                                <div className="input-group">
                                    <input type="text" name="search" value={this.state.search} onChange={e => this.handleSearchInput(e)} className="form-control" />
                                    <div className="input-group-append">
                                        <button className="btn search-btn" type="submit">
                                            <span className="d-flex w-100 justify-content-center"><i className="material-icons">search</i></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        );
    }
}
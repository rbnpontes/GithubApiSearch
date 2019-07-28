import './Header.css';
import React from "react";
import { Link } from 'react-router-dom';
import { HeaderState } from './../reducers/index';
import { SearchBase } from '../search/SearchBase';
export class HeaderComponent extends SearchBase {
    public state: HeaderState = { visible: true, search: '' };
    protected onState(state : HeaderState){
        this.setState({visible : state.visible, search: state.search});
    }
    private handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        let state : HeaderState = {visible : this.state.visible, search: e.target.value};
        this.updateHeaderState(state);
    }
    private trySearch(e : React.FormEvent) : void{
        e.preventDefault();
        this.search(this.state.search);
    }
    render() {
        if(!this.state.visible)
            return (<div></div>);
        return (
            <header className="header">
                <div className="row header-field mx-0">
                    <div className="col-md-3 text-center nav-logo">
                        <Link to="/" className="nav-anchor">
                            <span className="github-label">
                                <b>Github</b>
                                <span className="github-label-search">Search</span>
                            </span>
                        </Link>
                    </div>
                    <div className="col-md">
                        <form onSubmit={(e)=>this.trySearch(e)}>
                            <div className="ml-3 input-group">
                                <input type="text" name="search" value={this.state.search} onChange={(e)=> this.handleSearch(e)} className="form-control" />
                                <div className="input-group-append">
                                    <button className="btn search-btn" type="submit">
                                        <span className="d-flex w-100 justify-content-center"><i className="material-icons">search</i></span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </header>
        );
    }
}
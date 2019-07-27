import './Header.css';
import React from "react";
export class HeaderComponent extends React.Component {
    render() {
        return (
            <header className="header">
                <div className="row header-field mx-0">
                    <div className="col-md-3 text-center nav-logo">
                        <span className="github-label">
                            <b>Github</b>
                            <span className="github-label-search">Search</span>
                        </span>
                    </div>
                    <div className="col-md">
                        <div className="ml-3 input-group">
                            <input type="text" className="form-control" />
                            <div className="input-group-append">
                                <button className="btn search-btn" type="button">
                                    <span className="d-flex w-100 justify-content-center"><i className="material-icons">search</i></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}
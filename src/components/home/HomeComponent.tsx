import React from 'react';
import './Home.css';
export class HomeComponent extends React.Component {
    render() {
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
                    <div className="row">
                        <div className="col">
                            <div className="input-group">
                                <input type="text" className="form-control"/>
                                <div className="input-group-append">
                                    <button className="btn search-btn" type="button">
                                        <span className="d-flex w-100 justify-content-center"><i className="material-icons">search</i></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
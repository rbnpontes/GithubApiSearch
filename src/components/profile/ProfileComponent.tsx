import { BaseComponent } from "../base/BaseComponent";
import React from 'react';
import { match } from 'react-router';
import './Profile.css';
import { IUser } from "../../models/User";
import { GithubService } from "../../services/GithubService";
import { ProfileInfoComponent } from "./ProfileInfoComponent";
import { ProfileReposComponent } from "./ProfileReposComponent";
interface SearchProps {
    match: any;
}
interface IError {
    message: string;
    type: string;
}
interface IState {
    user?: IUser;
    error?: IError;
    loading: boolean;
}
export class ProfileComponent extends BaseComponent {
    public state: IState;
    constructor(props: Readonly<SearchProps>) {
        super(props);
        this.state = { user: undefined, loading: true };
        // If user is out of site, update search
        this.updateSearch(props.match.params.id);
        this.loadData(props.match.params.id);
    }
    private async loadData(username: string) {
        this.state.loading = true;
        try{
            let user: IUser = await GithubService.fetchUserData(username);
            this.setState({ user: user, loading: false, error : null });
        }catch(e){
            this.setState({user : e.data/* Error can contain data*/, loading : false, error: e});
        }
    }
    private get skeletonHtml() {
        return (
            <div className="row mx-0">
                <div className="col-md-3">
                    <div className="w-100 d-flex justify-content-center">
                        <section className="skeleton picture"></section>
                    </div>
                    <section className="ml-3">
                        <h1 className="text skeleton profile-name mt-3">&nbsp;</h1>
                        <span className="skeleton profile-bio">
                            <p className="mb-1">&nbsp;</p>
                            <p className="mb-1">&nbsp;</p>
                            <p className="mb-1">&nbsp;</p>
                        </span>
                        <span className="skeleton profile-details mt-4 w-50">
                            <p className="mb-1">&nbsp;</p>
                            <p className="mb-1">&nbsp;</p>
                            <p className="mb-1">&nbsp;</p>
                            <p className="mb-1">&nbsp;</p>
                            <p className="mb-1">&nbsp;</p>
                        </span>
                    </section>
                </div>
                <div className="col-md">
                    <ul className="ml-4 list-group list-group-flush">
                        <div className="skeleton entries mt-2 pt-5"></div>
                        <div className="skeleton entries mt-2 pt-5"></div>
                        <div className="skeleton entries mt-2 pt-5"></div>
                        <div className="skeleton entries mt-2 pt-5"></div>
                        <div className="skeleton entries mt-2 pt-5"></div>
                        <div className="skeleton entries mt-2 pt-5"></div>
                        <div className="skeleton entries mt-2 pt-5"></div>
                    </ul>
                </div>
            </div>
        );
    }
    private getErrorHtml(msg: string) {
        return (
            <div className="text-center">
                <h1 className="list-title mt-5 pt-5">{msg}</h1>
            </div>
        );

    }
    private get html() {
        let left_col;
        let right_col;
        if (this.state.error){
            if(this.state.error.type == 'user')
                left_col = this.getErrorHtml('User not Found :(');
            else
                right_col = this.getErrorHtml('This user doesn\'t has repositories or you do not have permissions');
        }
        if(left_col == null)
            left_col = <ProfileInfoComponent user={this.state.user as IUser} />;
        if(right_col == null)
            right_col = <ProfileReposComponent user={this.state.user as IUser}/>;
        return (
            <div className="row mx-0">
                <div className="col-md-3">
                    {left_col}
                </div>
                <div className="col-md">
                    {right_col}
                </div>
            </div>
        )
    }
    render() {
        let result;
        if (this.state.loading)
            result = this.skeletonHtml;
        else
            result = this.html;
        return (
            <div className="profile-container">
                {result}
            </div>
        );
    }
}
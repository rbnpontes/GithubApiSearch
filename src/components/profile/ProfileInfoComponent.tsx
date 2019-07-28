import { BaseComponent } from "../base/BaseComponent";
import { PictureComponent } from "../generals/PictureComponent";
import { IUser } from "../../models/User";
import React from 'react';
export interface ProfileInfoData {
    user: IUser;
}
export class ProfileInfoComponent extends BaseComponent {
    public state: ProfileInfoData;
    constructor(public props: Readonly<ProfileInfoData>) {
        super(props);
        this.state = { user: props.user };
    }
    private getFieldHtml(icon: string, data: any, isMaterial: boolean = false) {
        if (isMaterial){
            return (
                <p className="mb-1">
                    <i className="material-icons">{icon}</i> <span className="icon-fix">{data != null ? data : 'No info.'}</span>
                </p>
            );
        }
        return (
            <p className="mb-1">
                <i className={'profile-icon '+icon}></i> <span className="icon-fix">{data != null ? data : 'No info.'}</span>
            </p>
        );
    }
    render() {
        let profileName;
        //#region Profile Name
        if (this.state.user.name) {
            profileName = (
                <section>
                    <h1 className="text profile-name mt-3 mb-0">
                        {this.state.user.name}
                    </h1>
                    <span className="text profile-user">
                        {this.state.user.login}
                    </span>
                </section>
            );
        } else {
            profileName = <h1 className="text profile-name mt-3">{this.state.user.login}</h1>;
        }
        //#endregion

        return (
            <section className="row mx-0">
                <div className="col-md">
                    <div className="w-100 d-flex justify-content-center profile-picture">
                        <PictureComponent src={(this.state.user.profileImg as any)} width="18em" height="18em" />
                    </div>
                    <section>
                        {profileName}
                        <span className="text profile-bio">
                            {this.state.user.bio ? this.state.user.bio : 'No bio info :('}
                        </span>
                        <section className="profile-details mt-4 text">
                            {this.getFieldHtml('company', this.state.user.company)}
                            {this.getFieldHtml('location', this.state.user.location)}
                            {this.getFieldHtml('star_border', this.state.user.following, true)}
                            {this.getFieldHtml('box', this.state.user.reposCount)}
                            {this.getFieldHtml('following', this.state.user.followers)}
                        </section>
                    </section>
                </div>
            </section>
        );
    }
}
import { IRepo, IPage } from ".";

export interface IUser{
    id : number;
    login : string;
    name : string;
    bio? : string;
    profileImg? : string;
    company? : string;
    location? : string;
    followers? : number;
    following? : number;
    reposCount? : number;
    repos? : IPage<IRepo[]>;
}
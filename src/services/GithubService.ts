import { HttpService } from './HttpService';
import { IRepo, IUser, IPage } from "../models";

/**
 * NOTE:
 *  I know the a will be used Redux instead Promises
 *  But the complexity of this service is more simple
 * NOTE2:
 *  I know that i will need use Observable, but i want
 *  simple code using standard browser apis.
 */
export class GithubService extends HttpService {
    public static searchUsers(username: string, page : number = 1): Promise<IPage<IUser[]>> {
        let url = `https://api.github.com/search/users?q=${username}&page=${page}`;
        return this.map(this.fetch(url), (data: { items: any[], total_count : number }) => {
            let result : IPage<IUser[]> = {
                totalCount:data.total_count,
                data : data.items.map(x => {
                    return {
                        id: x.id,
                        login: x.login,
                        name: x.login,
                        profileImg: x.avatar_url == null ? x.gravatar_id : x.avatar_url
                    };
                })
            };
            return result;
        });
    }
    public static fetchUserRepos(username: string, page : number = 1): Promise<IPage<IRepo[]>> {
        let url = `https://api.github.com/search/repositories?q=user:${username}&sort=stars&order=desc&page=${page}`;
        return new Promise<IPage<IRepo[]>>(async (resolve, reject) => {
            let data: any = await this.fetch(url);
            if (data.items == undefined)
                reject(data.errors[0]);
            else{
                let page : IPage<IRepo[]> = {
                    totalCount : data.total_count,
                    data : data.items.map((x: any) => {
                        return {
                            name: x.name,
                            stars: x.stargazers_count,
                            description: x.description,
                            url : x.html_url
                        };
                    })
                };
                resolve(page);
            }
        });
    }
    public static fetchUserData(username: string): Promise<IUser> {
        let url = `https://api.github.com/users/${username}`;
        return new Promise(async (resolve, reject) => {
            let data: any;
            //@ts-ignore
            let user: IUser = null;
            try {
                data = await this.fetch(url);
                user = {
                    id: data.id,
                    login: data.login,
                    name: data.name,
                    bio: data.bio,
                    profileImg: data.avatar_url.length == 0 ? data.gravatar_url : data.avatar_url,
                    company: data.company,
                    location: data.location,
                    followers: data.followers,
                    following: data.following,
                    reposCount: data.public_repos,
                    repos: {totalCount : 0, data : []}
                };
            } catch (e) {
                e.type = 'user';
                console.error(e);
                reject(e);
            }
            try {
                user.repos = await this.fetchUserRepos(username);
                resolve(user);

            } catch (e) {
                e.type = 'repos';
                // API will be found user, but not found repos
                e.data = user;
                console.error(e);
                reject(e);
            }
        });
    }
}
import { IUser } from "../models/User";
import { HttpService } from './HttpService';

/**
 * NOTE:
 *  I know the a will be used Redux instead Promises
 *  But the complexity of this service is more simple
 * NOTE2:
 *  I know that i will need use Observable, but i want
 *  simple code using standard browser apis.
 */
export class GithubService extends HttpService {
    public static searchUsers(username: string): Promise<IUser[]> {
        let url = `https://api.github.com/search/users?q=${username}`;
        return this.map(this.fetch(url), (data : {items : any[]}) => {
            return data.items.map(x => {
                return {
                    id: x.id,
                    name: x.login,
                    profileImg: x.avatar_url == null ? x.gravatar_id : x.avatar_url
                };
            });
        });
    }
}
import { resolve } from "dns";

export class HttpService{
    protected static fetch<T>(url : string) : Promise<T>{
        let promise : Promise<T> = new Promise<T>((resolve, reject)=>{
            fetch(url).then(x=> {
                x.json().then(data => {
                    resolve(data);
                }).catch(err => reject(err));
            }).catch(err => reject(err));
        });
        return promise;
    }
    protected static map<T>(promise : Promise<any>, callback : any) : Promise<T>{
        return new Promise((resolve, reject) => {
            promise.then(x => resolve(callback(x)));
            promise.catch(x => reject(x));
        });
    } 
}
export interface Registration{
name:string;
email:string;
phone_no:string;
password:string;
role_id:string;
loginType:string;
}

export interface Authorisation {
    token:string;
    user:string;
    type:string;
}
   
export interface Login{
    user:Registration
    authorisation:Authorisation

}


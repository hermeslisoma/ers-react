import { Role } from "./role";

//class for user objects
export class User{
    userId: number// primary key
	username: string // not null, unique
	password: string // not null
	firstName: string // not null
	lastName: string // not null
	email: string // not null
    role: Role // not null
    token: string
    constructor(userId:number, username:string, password:string, firstName:string, lastName:string, 
                    email:string, role:Role, token:string){
        this.userId = userId
        this.username = username
        this.password = password
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.role = role
        this.token = token
    }
}
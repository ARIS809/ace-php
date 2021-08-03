export class User {
    rowid: number;
    fname: string;
    lname: string;
    dob: string;
    email:string;
    active:boolean;
    user_name:string;
    bio:string;
    profile_pic:string;
    role:string;
    
    constructor(user?: any) {
      this.rowid = user.rowid;
      this.fname = user.fname;
      this.lname = user.lname;
      this.dob = user.dob;
      this.email = user.email;
      this.active = user.active;
      this.user_name = user.user_name;
      this.bio = user.bio;
      this.profile_pic = user.profile_pic;
      this.role = user.role;
    }
  }
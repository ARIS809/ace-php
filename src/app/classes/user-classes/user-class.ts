export class User {
    rowid: number;
    fname: string;
    lname: string;
    dob: string;
    email:string;
    
    constructor(user: User) {
      this.rowid = user.rowid;
      this.fname = user.fname;
      this.lname = user.lname;
      this.dob = user.dob;
      this.email = user.email;
    }
  }
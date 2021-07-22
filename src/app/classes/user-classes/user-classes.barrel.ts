class User {
    rowid: number;
    fname: string;
    lname: string;
    dob: string;
    user_name:string;
    
    constructor(user: User) {
      this.rowid = user.rowid;
      this.fname = user.fname;
      this.lname = user.lname;
      this.dob = user.dob;
      this.user_name = user.user_name;
    }
  }
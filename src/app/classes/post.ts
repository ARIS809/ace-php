export class Post {
    rowid: number;
    caption: string;
    image: string;
    created_dt: string;
    user_id:string;
    profile_pic:string
    user_name:string;
    
    constructor(post?: any) {
      this.rowid = post.rowid;
      this.caption = post.caption;
      this.image = post.image;
      this.created_dt = post.created_dt;
      this.user_id = post.user_id;
      this.profile_pic = post.profile_pic;
      this.user_name = post.user_name;
    }
  }
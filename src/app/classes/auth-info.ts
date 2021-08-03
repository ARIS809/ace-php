export class AuthInfo {  
    constructor(public $rowid: string) {}

    isLoggedIn() {
        // console.log(this.$uid);
        return !!this.$rowid;
    }
}
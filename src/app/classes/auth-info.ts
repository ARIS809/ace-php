export class AuthInfo {  
    constructor(public $rowid: string) {}

    isLoggedIn() {
        return !!this.$rowid;
    }
}
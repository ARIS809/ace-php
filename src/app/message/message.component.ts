import { Component, HostListener, OnInit } from '@angular/core';
import { Subject, merge, from, Observable, Subscription } from 'rxjs';
import { scan } from 'rxjs/operators';

import { Message, User, SendMessageEvent } from '@progress/kendo-angular-conversational-ui';
import marked from 'marked';
//services
import { UserService } from 'services/user.service';
import { MessageService } from 'services/message.service';


@Component({
  selector: 'message',
  templateUrl: 'message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  fakeWebSocket:any;
  users:any;
  userUrl = location.origin+'/ace_file_upload/uploads/profile_pics/';
  constructor(
    private _u_service:UserService,
    private _m_service:MessageService
  ) {
  }

  ngOnInit(): void {
    this.getUsers();
  }
  public feed: Observable<Message[]>;

  public from: User = {
    id: JSON.parse(sessionStorage.getItem('currentUser')).rowid,
    name: JSON.parse(sessionStorage.getItem('currentUser')).user_name,
  };

  public to: User = {
    id: 0,
    name: 'Bot'
  };

  private local: Subject<Message> = new Subject<Message>();


  public sendMessage(e: SendMessageEvent): void {
    this._m_service.sendMessage(this.to.id, this.from.id, e.message.text).subscribe( (rep) =>{
    })
    this.local.next(e.message);
  }

  public renderMarkdown(md: string): string {
    return marked(md);
  }

  renderMessage(message:any):void{
    this.feed = merge(
      from(message),
      this.local
    ).pipe(
      scan((acc: Message[], x: Message) => [...acc, x], [])
    );
  }

  getUsers():void{
    this._u_service.getUsers().subscribe( (rep) =>{
      this.users = rep;
    })
  }

  clearFeed():void{
    this.feed = null;
  }

  getMessages(id:number, name:string, avatar:string):void{
    this.clearFeed();
    this.to.id = id;
    this.to.name = name;
    
    this.fakeWebSocket =  setInterval(()=>{
      let messages = [];
       this._m_service.getMessages(this.to.id).subscribe( (rep:any) =>{
        rep.forEach(e => {
          if(e.from_userid == this.from.id){
            let message: Message = {
              author: this.from,
              text: e.message
            };
            messages.push(message);
            this.renderMessage(messages);
          }
          else{
            let message: Message = {
              author: this.to,
              text: e.message
            };
            messages.push(message);
            this.renderMessage(messages);
          }
      });
    }) 
    },300);

  
    if(avatar != null)
      this.to.avatarUrl = this.userUrl+avatar;
  }
  ngOnDestroy(){
    clearInterval(this.fakeWebSocket);
  }
}

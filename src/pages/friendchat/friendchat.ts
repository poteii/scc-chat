import { ChatProvider } from './../../providers/chat/chat';
import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, Events } from 'ionic-angular';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-friendchat',
  templateUrl: 'friendchat.html',
})
export class FriendchatPage {
  @ViewChild('content') content: Content;
  friend: any;
  newMsg;
  allMsg = [];
  photoURL: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private chatProvider: ChatProvider,
              private events: Events,
              private zone: NgZone) {
      this.friend = this.chatProvider.friend;
      this.photoURL = firebase.auth().currentUser.photoURL;
      this.scrollto();
      this.events.subscribe('newmessage', () => {
        this.allMsg = [];
        this.zone.run(() => {
          this.allMsg = this.chatProvider.friendMsg;
        })
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendchatPage');
  }

  addmessage() {
    this.chatProvider.addNewMsg(this.newMsg).then(() => {
      this.content.scrollToBottom(300);
      this.newMsg = '';
    })
  }

  ionViewDidEnter() {
    this.chatProvider.getFriendMsg();
  }

  scrollto() {
    setTimeout(() => {
      this.content.scrollToBottom(300)
    }, 1000);
  }

}

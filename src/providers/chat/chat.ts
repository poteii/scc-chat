import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Events } from 'ionic-angular';
import firebase from 'firebase';

@Injectable()
export class ChatProvider {

  friend: any;
  friendMsg = [];

  friendchatref = firebase.database().ref('/friendchats');

  constructor(public events: Events) {
    console.log('Hello ChatProvider Provider');
  }

  initChat(friend) {
    this.friend = friend;
  }

  addNewMsg(msg) {
    if (this.friend) {
      var promise = new Promise((resolve, reject) => {
        this.friendchatref.child(firebase.auth().currentUser.uid).child(this.friend.uid).push({
          sentby: firebase.auth().currentUser.uid,
          message: msg,
          timestamp: firebase.database.ServerValue.TIMESTAMP
        }).then(() => {
          this.friendchatref.child(this.friend.uid).child(firebase.auth().currentUser.uid).push({
            sentby: firebase.auth().currentUser.uid,
            message: msg,
            timestamp: firebase.database.ServerValue.TIMESTAMP
          }).then(() => {
            resolve(true);
            })
        })
      })
      return promise;
    }
  }

  getFriendMsg() {

    let temp;
    this.friendchatref.child(firebase.auth().currentUser.uid).child(this.friend.uid).on('value', (snapshot) => {
      this.friendMsg = [];
      temp = snapshot.val();
      for (var tempkey in temp) {
        this.friendMsg.push(temp[tempkey]);
      }
      this.events.publish('newmessage');
    })
  }

}

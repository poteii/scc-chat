import { Events } from 'ionic-angular';
import { UserProvider } from './../user/user';
import { Req } from './../../models/req';
import { Injectable } from '@angular/core';
import firebase from 'firebase';


@Injectable()
export class RequestsProvider {

  requestref = firebase.database().ref('/requests');
  friendsref = firebase.database().ref('/friends');
  userdetails;
  myFriends;

  constructor(private userProvider: UserProvider,
              private events: Events) {
    console.log('Hello RequestsProvider Provider');
  }

  sendrequest(req: Req) {
    var promise = new Promise((resolve, reject) => {
      this.requestref.child(req.recipient).push({
      sender: req.sender
      }).then(() => {
        resolve({ success: true });
      })
    })
    return promise;
  }

  getMyRequests() {
    let allmyrequests;
    var myrequests = [];
    this.requestref.child(firebase.auth().currentUser.uid).on('value', (snapshot) => {
      allmyrequests = snapshot.val();
      myrequests = [];
      for (var i in allmyrequests) {
        myrequests.push(allmyrequests[i].sender);
      }
      this.userProvider.getAllUsers().then((res) => {
        var allusers = res;
        this.userdetails = [];
        for (var j in myrequests)
          for (var key in allusers) {
            if (myrequests[j] === allusers[key].uid) {
              this.userdetails.push(allusers[key]);
            }
          }
        this.events.publish('gotrequests');
      })

    })
  }

  // acceptRequest(friend) {
  //   var myFriends = [];
  //   var promise = new Promise((resolve, reject) => {
  //     this.friendsref.child(firebase.auth().currentUser.uid).push({
  //       uid: friend.uid
  //     }).then(() => {
  //       this.friendsref.child(friend.uid).push({
  //         uid: firebase.auth().currentUser.uid
  //       }).then(() => {
  //         this.deleteRequest(friend).then(() => {
  //         resolve(true);
  //       })
  //       })
  //     })
  //   })
  //   return promise;
  // }

  acceptRequest(friend) {
    var promise = new Promise((resolve, reject) => {
      this.myFriends = [];
      this.friendsref.child(firebase.auth().currentUser.uid).push({
        uid: friend.uid
      }).then(() => {
        this.friendsref.child(friend.uid).push({
          uid: firebase.auth().currentUser.uid
        }).then(() => {
          this.deleteRequest(friend).then(() => {
          resolve(true);
        })

        })
      })
    })
    return promise;
  }

  // deleteRequest(friend) {
  //   var promise = new Promise((resolve, reject) => {
  //    this.friendsref.child(firebase.auth().currentUser.uid).orderByChild('sender').equalTo(friend.uid).once('value', (snapshot) => {
  //         let somekey;
  //         for (var key in snapshot.val())
  //           somekey = key;
  //           console.log(somekey);
  //         this.friendsref.child(firebase.auth().currentUser.uid).child(somekey).remove().then(() => {
  //           resolve(true);
  //         })
  //        })
  //         .then(() => {

  //       }).catch((err) => {
  //         reject(err);
  //       })
  //   })
  //   return promise;
  // }


  deleteRequest(buddy) {
    var promise = new Promise((resolve, reject) => {
      console.log('currentUser = ' + firebase.auth().currentUser.uid);
      console.log('buddy = ' + buddy.uid);
      console.log('url = ' + this.requestref.toString());
      console.log('url2 = ' + this.requestref.child(firebase.auth().currentUser.uid).toString());
      console.log('url3 = ' + this.requestref.child(firebase.auth().currentUser.uid).orderByChild('sender').toString());
     this.requestref.child(firebase.auth().currentUser.uid).orderByChild('sender').equalTo(buddy.uid).once('value', (snapshot) => {
          let somekey;
          for (var key in snapshot.val())
            somekey = key;
            console.log(somekey);
            console.log(this.friendsref);
            console.log(firebase.auth().currentUser.uid);
            this.requestref.child(firebase.auth().currentUser.uid).child(somekey).remove().then(() => {
            resolve(true);
          })
         })
          .then(() => {

        }).catch((err) => {
          reject(err);
        })
    })
    return promise;
  }

  getMyFriends() {
    let friendsuid = [];
    this.friendsref.child(firebase.auth().currentUser.uid).on('value', (snapshot) => {
      let allfriends = snapshot.val();
      this.myFriends = [];
      for (var i in allfriends)
        friendsuid.push(allfriends[i].uid);

      this.userProvider.getAllUsers().then((users) => {
        this.myFriends = [];
        for (var j in friendsuid)
          for (var key in users) {
            if (friendsuid[j] === users[key].uid) {
              this.myFriends.push(users[key]);
            }
          }
        this.events.publish('friends');
      }).catch((err) => {
        alert(err);
      })

    })
  }



}

import { User } from './../../models/user';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

@Injectable()
export class UserProvider {

  chatusersref = firebase.database().ref('/chatusers');

  constructor(public http: Http) {
    console.log('Hello UserProvider Provider');
  }

  adduser(user: User) {
    return firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then(
      () => {
        firebase.auth().currentUser.updateProfile({
          displayName: user.displayName,
          photoURL: 'https://firebasestorage.googleapis.com/v0/b/cr-ionic-chat.appspot.com/o/avatar.png?alt=media&token=c7d2f810-d23b-43d3-b5c2-73cf403c1f35'
        }).then(
          () => {
            this.chatusersref.child(firebase.auth().currentUser.uid).set({
              uid: firebase.auth().currentUser.uid,
              displayName: user.displayName,
              photoURL: 'https://firebasestorage.googleapis.com/v0/b/cr-ionic-chat.appspot.com/o/avatar.png?alt=media&token=c7d2f810-d23b-43d3-b5c2-73cf403c1f35'
            })
          })
      })
  }

  updateImage(imageurl) {
    var promise = new Promise((resolve, reject) => {
        firebase.auth().currentUser.updateProfile({
            displayName: firebase.auth().currentUser.displayName,
            photoURL: imageurl
        }).then(() => {
            firebase.database().ref('/users/' + firebase.auth().currentUser.uid).update({
            displayName: firebase.auth().currentUser.displayName,
            photoURL: imageurl,
            uid: firebase.auth().currentUser.uid
            }).then(() => {
                  this.chatusersref.child(firebase.auth().currentUser.uid).set({
                  uid: firebase.auth().currentUser.uid,
                  displayName: firebase.auth().currentUser.displayName,
                  photoURL: imageurl
                  })
                resolve({ success: true });
                }).catch((err) => {
                    reject(err);
                })
        }).catch((err) => {
              reject(err);
           })
      })
    return promise;
  }

  getUserDetails() {
    var promise = new Promise((resolve, reject) => {
      this.chatusersref.child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
        resolve(snapshot.val());
      }).catch((err) => {
        reject(err);
        })
      })
      return promise;
  }

  updateDisplayName(newDisplayName) {
    console.log('update name');
    var promise = new Promise((resolve, reject) => {
      firebase.auth().currentUser.updateProfile({
      displayName: newDisplayName,
      photoURL: firebase.auth().currentUser.photoURL
    }).then(() => {
      this.chatusersref.child(firebase.auth().currentUser.uid).update({
        displayName: newDisplayName,
        photoURL: firebase.auth().currentUser.photoURL,
        uid: firebase.auth().currentUser.uid
      }).then(() => {
        resolve({ success: true });
      }).catch((err) => {
        reject(err);
      })
      }).catch((err) => {
        reject(err);
    })
    })
    return promise;
  }

  getAllUsers() {
    var promise = new Promise((resolve, reject) => {
      this.chatusersref.orderByChild('uid').once('value', (snapshot) => {
        let userdata = snapshot.val();
        let temparr = [];
        for (var key in userdata) {
          temparr.push(userdata[key]);
        }
        resolve(temparr);
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

}

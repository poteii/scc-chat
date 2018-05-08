import { User } from './../../models/user';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import firebase from 'firebase';




@Injectable()
export class AuthProvider {

  constructor() {
    console.log('Hello AuthProvider Provider');
  }

  login(user: User) {
    var promise = new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(() => {
        resolve(true);
      }).catch((err) => {
        reject(err);
       })
    })

    return promise;
  }

  logout() {
    firebase.auth().signOut();
  }

}

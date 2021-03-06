import { FileChooser } from '@ionic-native/file-chooser';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import firebase from 'firebase';

@Injectable()
export class ImagehandlerProvider {

  nativepath: any;
  firestore = firebase.storage();

  constructor(public fileChooser: FileChooser) {

  }

  // uploadImage() {
  //   var promise = new Promise((resolve, reject) => {
  //     this.fileChooser.open().then((url) => {
  //       (<any>window).FilePath.resolveNativePath(url, (result) => {
  //         this.nativepath = result;
  //         (<any>window).resolveLocalFileSystemURL(this.nativepath, (res) => {
  //           res.file((resFile) => {
  //             var reader = new FileReader();
  //             reader.readAsArrayBuffer(resFile);
  //             reader.onloadend = (evt: any) => {
  //               var imgBlob = new Blob([evt.target.result], { type: 'image/jpeg' });
  //               var imageStore = this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid);
  //               imageStore.put(imgBlob).then((res) => {
  //                 this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid).getDownloadURL().then((url) => {
  //                   resolve(url);
  //                 }).catch((err) => {
  //                     reject(err);
  //                 })
  //               }).catch((err) => {
  //                 reject(err);
  //               })
  //             }
  //           })
  //         })
  //       })
  //     })
  //   })
  //  return promise;
  // }


  uploadImage() {
    //ใช้ promise เพื่อทำการเล่นกับ รูปภาพ
    var promise = new Promise((resolve, reject) => {
      this.fileChooser.open().then((url) => {
        (<any>window).FilePath.resolveNativePath(url, (result) => {
          this.nativepath = result;
          (<any>window).resolveLocalFileSystemURL(this.nativepath, (res) => {
            res.file((resFile) => {
              var reader = new FileReader();
              reader.readAsArrayBuffer(resFile);
              reader.onloadend = (evt: any) => {
                var imgBlob = new Blob([evt.target.result], { type: 'image/jpeg' });
                var imageStore = this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid);
                imageStore.put(imgBlob).then((res) => {
                  this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid).getDownloadURL().then((url) => {
                    resolve(url);
                  }).catch((err) => {
                      reject(err);
                  })
                }).catch((err) => {
                  reject(err);
                })
              }
            })
          })
        })
      })
    })
   return promise;
  }
}

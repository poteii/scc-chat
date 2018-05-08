import { RequestsProvider } from './../../providers/requests/requests';
import { TranslateService } from '@ngx-translate/core';
import { Req } from './../../models/req';
import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class FriendsPage {

  temparr = [];
  filterUsers = [];
  newRequest = {} as Req;

  FRIENDS_ALWAYS: string;
  FRIENDS_REQ_SENT: string;
  FRIENDS_REQ_SENT_MSG: string;
  BUTTON_OKAY: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private userProvider: UserProvider,
              private translateService: TranslateService,
              private alertCtrl: AlertController,
              private requestsProvider: RequestsProvider) {

      this.userProvider.getAllUsers().then(
        (res: any) => {
          this.filterUsers = res;
          this.temparr = res;
        }
      )
  }

  ionViewDidLoad() {
    this.translateService.get('BUTTON_OKAY').subscribe(
      value =>  this.BUTTON_OKAY = value
    )
    this.translateService.get('FRIENDS_ALWAYS').subscribe(
      value =>  this.FRIENDS_ALWAYS = value
    )
    this.translateService.get('FRIENDS_REQ_SENT').subscribe(
      value =>  this.FRIENDS_REQ_SENT = value
    )
    this.translateService.get('FRIENDS_REQ_SENT_MSG').subscribe(
      value =>  this.FRIENDS_REQ_SENT_MSG = value
    )
  }

  sendReq(recipient) {
    this.newRequest.sender = firebase.auth().currentUser.uid;
    this.newRequest.recipient = recipient.uid;
    if( this.newRequest.sender === this.newRequest.recipient) {
      alert(this.FRIENDS_ALWAYS);
    } else {
      let successAlert = this.alertCtrl.create({
        title: this.FRIENDS_REQ_SENT,
        subTitle: this.FRIENDS_REQ_SENT_MSG,
        buttons: [this.BUTTON_OKAY]
      });

      this.requestsProvider.sendrequest(this.newRequest).then(
        (res: any) => {
          if(res.success) {
            successAlert.present();
            let sentuser = this.filterUsers.indexOf(recipient);
            this.filterUsers.splice(sentuser, 1);
          }
        }
      )
    }
  }

  searchUser(searchbar) {
    this.filterUsers = this.temparr;
    var q = searchbar.target.value;
    if (q.trim() == '') {
      return;
    }

    this.filterUsers = this.filterUsers.filter((v) => {
      if (v.displayName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    })
  }

}

import { FriendchatPage } from './../friendchat/friendchat';
import { ChatProvider } from './../../providers/chat/chat';
import { TranslateService } from '@ngx-translate/core';
import { RequestsProvider } from './../../providers/requests/requests';
import { FriendsPage } from './../friends/friends';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html',
})
export class ChatsPage {

  myRequests;
  CHATS_ADD: string;
  CHATS_ADD_MSG: string;
  BUTTON_OKAY: string;
  CHATS_IGNORE: string;
  myFriends;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private requestsProvider: RequestsProvider,
              private events: Events,
              private alertCtrl: AlertController,
              private translateService: TranslateService,
              private chatProvider: ChatProvider) {
  }

  ionViewDidLoad() {
    this.translateService.get('BUTTON_OKAY').subscribe(
      value =>  this.BUTTON_OKAY = value
    )
    this.translateService.get('CHATS_ADD').subscribe(
      value =>  this.CHATS_ADD = value
    )
    this.translateService.get('CHATS_ADD_MSG').subscribe(
      value =>  this.CHATS_ADD_MSG = value
    )
    this.translateService.get('CHATS_IGNORE').subscribe(
      value =>  this.CHATS_IGNORE = value
    )
  }

  ionViewWillEnter() {
    this.requestsProvider.getMyRequests();
    this.requestsProvider.getMyFriends();
    this.myRequests = [];
    this.events.subscribe('gotrequests', () => {
      this.myRequests = [];
      this.myRequests = this.requestsProvider.userdetails;
    })
    this.events.subscribe('friends', () => {
      this.myFriends = [];
      this.myFriends = this.requestsProvider.myFriends;
    })
  }

  ionViewDidLeave() {
    this.events.unsubscribe('gotrequests');
    this.events.unsubscribe('friends');
  }

  addFriend() {
    this.navCtrl.push(FriendsPage);
  }

  accept(item) {
    this.requestsProvider.acceptRequest(item).then(
      () => {
        let newAlert = this.alertCtrl.create({
          title: this.CHATS_ADD,
          subTitle: this.CHATS_ADD_MSG,
          buttons: [this.BUTTON_OKAY]
        });
        newAlert.present();
      }
    )

  }

  ignore(item) {
    this.requestsProvider.deleteRequest(item).then(() => {

   }).catch((err) => {

   })
  }

  chat(friend) {
    this.chatProvider.initChat(friend);
    this.navCtrl.push(FriendchatPage);
  }

}

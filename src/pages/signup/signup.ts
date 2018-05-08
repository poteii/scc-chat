import { ProfilepicPage } from './../profilepic/profilepic';
import { UserProvider } from './../../providers/user/user';
import { TranslateService } from '@ngx-translate/core';
import { User } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  user: User = new User();

  MSG_REQUIRED: string;
  MSG_PASSWORD: string;
  MSG_PROCESSING: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController,
              private translateService: TranslateService,
              private userProvider: UserProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
    this.translateService.get('MSG_REQUIRED').subscribe(
      value =>  this.MSG_REQUIRED = value
    )

    this.translateService.get('MSG_PASSWORD').subscribe(
      value =>  this.MSG_PASSWORD = value
    )

    this.translateService.get('MSG_PROCESSING').subscribe(
      value =>  this.MSG_PROCESSING = value
    )
  }

  signup() {
    let toaster = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });

    if (this.user.email == '' || this.user.password == '' || this.user.displayName == '') {
      toaster.setMessage(this.MSG_REQUIRED);
      toaster.present();
    }
    else if (this.user.password.length < 6) {
      toaster.setMessage(this.MSG_PASSWORD);
      toaster.present();
    }
    else {
      let loader = this.loadingCtrl.create({
        content: this.MSG_PROCESSING
      });
      loader.present();

      this.userProvider.adduser(this.user).then(
        (res: any) => {
          loader.dismiss();
          this.navCtrl.push(ProfilepicPage);
        }
      )
    }
  }

  back() {
    this.navCtrl.setRoot('LoginPage');
  }

}

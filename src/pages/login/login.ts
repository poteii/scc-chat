import { TranslateService } from '@ngx-translate/core';
import { AuthProvider } from './../../providers/auth/auth';
import { User } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;
  MSG_LOGIN_FAIL: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private authProvider: AuthProvider,
              private toastCtrl: ToastController,
              private translateService: TranslateService) {
  }

  ionViewDidLoad() {
    this.translateService.get('MSG_LOGIN_FAIL').subscribe(
      value =>  this.MSG_LOGIN_FAIL = value
    )
  }

  onSignup() {
    this.navCtrl.push('SignupPage');
  }

  signin() {
    this.authProvider.login(this.user).then(
      (res: any) => {
        if(!res.code){
          this.navCtrl.setRoot('TabsPage');
        } else {
          let toaster = this.toastCtrl.create({
            duration: 3000,
            position: 'bottom'
          });
          toaster.setMessage(this.MSG_LOGIN_FAIL);
          toaster.present();
        }
      }
    )
  }



}

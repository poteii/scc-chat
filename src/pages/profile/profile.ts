import { ImagehandlerProvider } from './../../providers/imagehandler/imagehandler';
import { TranslateService } from '@ngx-translate/core';
import { UserProvider } from './../../providers/user/user';
import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  language: string;
  profilePic: string;
  displayName: string;
  BUTTON_OKAY: string;
  PROFILE_ALERT_TITLE: string;
  PROFILE_ALERT_INPUT: string;
  PROFILE_ALERT_PLACEHOLDER: string;
  PROFILE_ALERT_CANCEL: string;
  PROFILE_ALERT_EDIT: string;
  PROFILE_ALERT_TITLE_MSG: string;
  PROFILE_ALERT_TITLE_FAIL: string;
  PROFILE_ALERT_FAIL_MSG: string;
  PROFILE_ALERT_PIC_MSG: string;
  PROFILE_ALERT_PIC_FAIL_MSG: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private userProvider: UserProvider,
              private zone: NgZone,
              private alertCtrl: AlertController,
              private translateService: TranslateService,
              private imagehandler: ImagehandlerProvider,
              private authProvider: AuthProvider) {
  }

  ionViewDidLoad() {
    this.language = this.translateService.currentLang;
    if(this.language == null && this.language === ''){
      this.language = 'th';
    }
    this.translateService.get('BUTTON_OKAY').subscribe(
      value =>  this.BUTTON_OKAY = value
    )
    this.translateService.get('PROFILE_ALERT_TITLE').subscribe(
      value =>  this.PROFILE_ALERT_TITLE = value
    )
    this.translateService.get('PROFILE_ALERT_INPUT').subscribe(
      value =>  this.PROFILE_ALERT_INPUT = value
    )
    this.translateService.get('PROFILE_ALERT_PLACEHOLDER').subscribe(
      value =>  this.PROFILE_ALERT_PLACEHOLDER = value
    )
    this.translateService.get('PROFILE_ALERT_CANCEL').subscribe(
      value =>  this.PROFILE_ALERT_CANCEL = value
    )
    this.translateService.get('PROFILE_ALERT_EDIT').subscribe(
      value =>  this.PROFILE_ALERT_EDIT = value
    )
    this.translateService.get('PROFILE_ALERT_TITLE_MSG').subscribe(
      value =>  this.PROFILE_ALERT_TITLE_MSG = value
    )
    this.translateService.get('PROFILE_ALERT_TITLE_FAIL').subscribe(
      value =>  this.PROFILE_ALERT_TITLE_FAIL = value
    )
    this.translateService.get('PROFILE_ALERT_FAIL_MSG').subscribe(
      value =>  this.PROFILE_ALERT_FAIL_MSG = value
    )
    this.translateService.get('PROFILE_ALERT_PIC_MSG').subscribe(
      value =>  this.PROFILE_ALERT_PIC_MSG = value
    )
    this.translateService.get('PROFILE_ALERT_PIC_FAIL_MSG').subscribe(
      value =>  this.PROFILE_ALERT_PIC_FAIL_MSG = value
    )



  }

  ionViewWillEnter() {
    this.loaduserdetails();
  }

  loaduserdetails() {
    this.userProvider.getUserDetails().then((res: any) => {
      this.displayName = res.displayName;
      this.zone.run(() => {
        this.profilePic = res.photoURL;
      })
    })
  }

  logout() {
    this.authProvider.logout();
    this.navCtrl.parent.parent.setRoot('LoginPage');
  }

  editName() {
    let statusAlert = this.alertCtrl.create({
      buttons: [this.BUTTON_OKAY]
    })

    let alert = this.alertCtrl.create({
      title: this.PROFILE_ALERT_TITLE,
      inputs: [{
        name: 'displayName',
        placeholder: this.PROFILE_ALERT_PLACEHOLDER
      }],
      buttons:[{
        text: this.PROFILE_ALERT_CANCEL,
        role: 'cancel',
        handler: data => {

        }
      },
      {
        text: this.PROFILE_ALERT_EDIT,
        handler: data => {
          if(data.displayName) {
            console.log(data.displayName);
            this.userProvider.updateDisplayName(data.displayName).then(
              (res: any) => {
                if(res.success) {
                  statusAlert.setTitle(this.PROFILE_ALERT_EDIT);
                  statusAlert.setSubTitle(this.PROFILE_ALERT_TITLE_MSG);
                  statusAlert.present();
                  this.zone.run(() => {
                    this.displayName = data.displayName;
                  })
                } else {
                  statusAlert.setTitle(this.PROFILE_ALERT_TITLE_FAIL);
                  statusAlert.setSubTitle(this.PROFILE_ALERT_FAIL_MSG);
                  statusAlert.present();
                }
              }
            )
          }
        }
      }
    ]
    });

    alert.present();
  }


  editImage() {
    let statusAlert = this.alertCtrl.create({
      buttons: ['okay']
    });
    this.imagehandler.uploadImage().then((url: any) => {
      this.userProvider.updateImage(url).then((res: any) => {
        if (res.success) {
          statusAlert.setTitle(this.PROFILE_ALERT_EDIT);
          statusAlert.setSubTitle(this.PROFILE_ALERT_PIC_MSG);
          statusAlert.present();
          this.zone.run(() => {
          this.profilePic = url;
        })
        }
      }).catch((err) => {
          statusAlert.setTitle(this.PROFILE_ALERT_TITLE_FAIL);
          statusAlert.setSubTitle(this.PROFILE_ALERT_PIC_FAIL_MSG);
          statusAlert.present();
      })
      })
  }

  onChangeLanguage() {
    if (this.language == 'th') {
      this.language = 'en';
      this.translateService.use('en');
    } else if (this.language == 'en') {
      this.language = 'th';
      this.translateService.use('th');
    }
  }

}

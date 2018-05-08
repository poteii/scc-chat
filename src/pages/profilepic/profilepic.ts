import { ImagehandlerProvider } from './../../providers/imagehandler/imagehandler';
import { TranslateService } from '@ngx-translate/core';
import { UserProvider } from './../../providers/user/user';
import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-profilepic',
  templateUrl: 'profilepic.html',
})
export class ProfilepicPage {

  imgUrl = 'https://firebasestorage.googleapis.com/v0/b/cr-ionic-chat.appspot.com/o/profile.png?alt=media&token=cecbf97d-240d-477d-bc98-7f6ca3feaca2';

  moveon = true;
  MSG_PROCESSING: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userProvider: UserProvider,
              private translateService: TranslateService,
              private loadingCtrl: LoadingController,
              private imageService: ImagehandlerProvider,
              private zone: NgZone) {
  }

  ionViewDidLoad() {
    this.translateService.get('MSG_PROCESSING').subscribe(
      value =>  this.MSG_PROCESSING = value
    )
  }

  chooseImage() {
    let loader = this.loadingCtrl.create({
      content: this.MSG_PROCESSING
    })

    loader.present();
    this.imageService.uploadImage().then(
      (uploadUrl: any) => {
        loader.dismiss();
        this.zone.run(
          () => {
            this.imgUrl = uploadUrl;
            this.moveon = false;
          }
        )

      }
    )
  }



  proceed() {
    this.navCtrl.setRoot('TabsPage');
  }

  updateproces() {
    let loader = this.loadingCtrl.create({
      content: this.MSG_PROCESSING
    })

    loader.present();
    console.log(this.imgUrl);
    this.userProvider.updateImage(this.imgUrl).then(
      (res: any) => {
        loader.dismiss();
        if(res.success) {
          this.navCtrl.setRoot('TabsPage');
        }else {
          alert(res);
        }
      }
    )


  }

}

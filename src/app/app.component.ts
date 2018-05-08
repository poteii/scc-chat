import { LoginPage } from './../pages/login/login';
import { firebaseconfig } from './app.firebaseconfig';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


//ทำการ import firebase เพื่อเรียกใช้งาน
import firebase from 'firebase';
import { TranslateService } from '@ngx-translate/core';
//firebase.initializeApp(firebaseconfig) ทำการ initial โดยใช้ config ที่ทำการสร้างไว้

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private transletService: TranslateService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();


      //to init config firebase app
      firebase.initializeApp(firebaseconfig);

    });


    this.initTranslate();
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.transletService.setDefaultLang('en');
    if (this.transletService.getBrowserLang() !== undefined) {
      this.transletService.use(this.transletService.getBrowserLang());
    } else {
      this.transletService.use('en'); // Set your language here
    }
  }




}


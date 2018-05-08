import { TabsPageModule } from './../pages/tabs/tabs.module';
import { LoginPageModule } from './../pages/login/login.module';
import { FriendchatPageModule } from './../pages/friendchat/friendchat.module';
import { FriendsPageModule } from './../pages/friends/friends.module';
import { FriendsPage } from './../pages/friends/friends';
import { ChatsPageModule } from './../pages/chats/chats.module';
import { ChatsPage } from './../pages/chats/chats';
import { ProfilePageModule } from './../pages/profile/profile.module';
import { ProfilePage } from './../pages/profile/profile';
import { ProfilepicPageModule } from './../pages/profilepic/profilepic.module';
import { ProfilepicPage } from './../pages/profilepic/profilepic';
import { SignupPageModule } from './../pages/signup/signup.module';

import { LoginPage } from './../pages/login/login';
import { TabsPage } from './../pages/tabs/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

//import for translate
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpModule } from "@angular/http";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SignupPage } from '../pages/signup/signup';
import { UserProvider } from '../providers/user/user';
import { ImagehandlerProvider } from '../providers/imagehandler/imagehandler';


//import for upload picture
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { RequestsProvider } from '../providers/requests/requests';
import { ChatProvider } from '../providers/chat/chat';
import { FriendchatPage } from '../pages/friendchat/friendchat';
import { AuthProvider } from '../providers/auth/auth';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {tabsPlacement: 'top'}), // {tabsPlacement: 'top'} ให้ tab อยู่ด้านบน
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    LoginPageModule,
    SignupPageModule,
    ProfilepicPageModule,
    ProfilePageModule,
    ChatsPageModule,
    FriendsPageModule,
    FriendchatPageModule,
    TabsPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage,
    SignupPage,
    ProfilepicPage,
    ProfilePage,
    ChatsPage,
    FriendsPage,
    FriendchatPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    ImagehandlerProvider,
    RequestsProvider,
    ChatProvider,
    AuthProvider,
    FileChooser,
    File,
    FilePath
  ]
})
export class AppModule {}

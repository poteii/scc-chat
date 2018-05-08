import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FriendchatPage } from './friendchat';

@NgModule({
  declarations: [
    FriendchatPage,
  ],
  imports: [
    IonicPageModule.forChild(FriendchatPage),
    TranslateModule.forChild()
  ],
})
export class FriendchatPageModule {}

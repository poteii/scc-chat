import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatsPage } from './chats';

@NgModule({
  declarations: [
    ChatsPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatsPage),
    TranslateModule.forChild()
  ],
})
export class ChatsPageModule {}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { TranslateService } from '@ngx-translate/core';

import { Items } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html',
  animations: [
    trigger('fadeinState', [
      state('opaque', style({
        opacity: 1
      })),
      state('void', style({
        opacity: 0
      })),
      transition('void => opaque', animate('3000ms ease-in'))
    ])
  ]
})
export class ItemDetailPage {
  item: any;

  constructor(
    public navCtrl: NavController,
    navParams: NavParams,
    items: Items,
    public toastCtrl: ToastController,
    private translate: TranslateService
  ) {
    this.item = navParams.get('item') || items.defaultItem;
  }

  presentToast(msg) {
    this.translate.get(msg).subscribe((res:string)=>{
      const toast = this.toastCtrl.create({
        message: res,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }

}

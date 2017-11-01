import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

import { Item } from '../../models/item';
import { Items } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  currentItems: Item[];
  currentOffset=0;
  moreItemsAvailable=true;

  constructor(public navCtrl: NavController, public items: Items, public modalCtrl: ModalController) {
    //this.currentItems = this.items.query();
    this.loadItems();
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create('ItemCreatePage');
    addModal.onDidDismiss(item => {
      if (item) {
        this.items.add(item);
      }
    })
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.items.delete(item);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }

  /**
   * load items using the current skip count
   */
  loadItems(){
    return this.items.getBySkip(this.currentOffset).then(response=>{
      this.currentItems = this.currentItems || [];
      this.currentItems = this.currentItems.concat(response['results']);
      this.currentOffset = response['currentOffset'];
    });
  }

  /**
   * Event function to be called on scroll to load more items
   */
  doInfinite(infiniteScroll){
    if(this.currentOffset< 0) {
      infiniteScroll.complete();
      return;
    }

    // To Show Loader for three seconds 
    setTimeout(()=>{
      this.loadItems().then(()=>{
        infiniteScroll.complete();
      });
    }, 3000);
  }

}

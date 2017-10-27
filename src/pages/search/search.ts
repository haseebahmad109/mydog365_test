import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';

import { Item } from '../../models/item';
import { Items } from '../../providers/providers';

interface ISearchResults {
  [index: number]: Item
}

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  currentItems: ISearchResults;
  searchTerm = new Subject<string>();

  constructor(public navCtrl: NavController, public navParams: NavParams, public items: Items) { }

  ionViewDidLoad(){
    // No Need of debounce here as ion input provides an input for that
    this.searchTerm.distinctUntilChanged().subscribe((_searchTerm:string) => {
      this.getItems(_searchTerm); 
    });
  }

  /**
   * Perform a service for the proper items.
   */
  getItems(ev) {
    //let val = ev.target.value;
    let val = ev;
    if (!val || !val.trim()) {
      this.currentItems = [];
      return;
    }
    this.currentItems = this.items.query({
      name: val
    });

    console.log(this.currentItems);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }

}

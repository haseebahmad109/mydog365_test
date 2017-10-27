import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController } from 'ionic-angular';

import { Settings } from '../../providers/providers';

import { Tab1Root } from '../pages';
import { Tab2Root } from '../pages';
import { Tab3Root } from '../pages';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = Tab1Root;
  tab2Root: any = Tab2Root;
  tab3Root: any = Tab3Root;

  tab1Title = " ";
  tab2Title = " ";
  tab3Title = " ";

  badgeCount;

  constructor(
    public navCtrl: NavController,
    public translateService: TranslateService,
    public settings: Settings
  ) {
    
    translateService.get(['TAB1_TITLE', 'TAB2_TITLE', 'TAB3_TITLE']).subscribe(values => {
      this.tab1Title = values['TAB1_TITLE'];
      this.tab2Title = values['TAB2_TITLE'];
      this.tab3Title = values['TAB3_TITLE'];
    });

    // Subscribe for change in badge count
    this.settings.getBadge().subscribe(_badgeCount => {
      // Convertiong to string because tabBadge will not show zero value in case of integer
      this.badgeCount = _badgeCount.toString();
    });

  }
}

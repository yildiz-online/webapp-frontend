/*
 * This file is part of the Yildiz-Engine project, licenced under the MIT License  (MIT)
 *
 *  Copyright (c) 2018 Grégory Van den Borre
 *
 *  More infos available: https://www.yildiz-games.be
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 *  documentation files (the "Software"), to deal in the Software without restriction, including without
 *  limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 *  of the Software, and to permit persons to whom the Software is furnished to do so,
 *  subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in all copies or substantial
 *  portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 *  WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 *  OR COPYRIGHT  HOLDERS BE LIABLE FOR ANY CLAIM,
 *  DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE  SOFTWARE.
 *
 */

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from "@angular/common/http";
import {TranslateModule} from 'ng2-translate';

import {ModalModule} from "ngx-bootstrap/modal";
import {AlertModule} from 'ngx-bootstrap/alert';

import {AppComponent} from "./app.component";
import {NewsModule} from "./news/news.module";
import {NewsComponent} from "./news/news.component";

import {AlertService} from "./alert.service";

const routes: Routes = [
    { path: '', component: NewsComponent, pathMatch: 'full' },
    { path: 'news', component: NewsComponent }
];

@NgModule({
  declarations: [
      AppComponent
  ],
  imports: [
      BrowserModule,
      HttpClientModule,
      TranslateModule.forRoot(),
      RouterModule.forRoot(routes),
      ModalModule.forRoot(),
      AlertModule.forRoot(),
      NewsModule
  ],
  bootstrap: [AppComponent],
  providers: [AlertService]
})

export class AppModule {}

export class Notification {

   private _title: string;

   private _content: string;

   private _type: string;

   get title(): string {
       return this._title;
   }

   get content(): string {
       return this._content;
   }

   get type(): string {
       return this._type;
   }
}

export class AjaxResponse {

   private _notifications: Notification[];

    get notifications(): Notification[] {
        return this._notifications;
    }
}

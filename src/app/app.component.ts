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

import {Component, TemplateRef} from '@angular/core'

import {TranslateService} from 'ng2-translate';
import {BsModalService} from "ngx-bootstrap";
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {AlertService} from "./alert.service";
import {AjaxResponse} from "./app.module";


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [BsModalService]
})

export class AppComponent {

    modalRef: BsModalRef;

    config = {
        animated: true,
        keyboard: false,
        backdrop: false,
        ignoreBackdropClick: true
    };

    language: String;

    constructor(
        private translateService: TranslateService,
        private modalService: BsModalService,
        private alertService: AlertService,
        private http: HttpClient) {
        this.translateService.setDefaultLang('fr');
        this.setFrench();
    }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template, this.config);
    }

    closeModal() {
        this.modalRef.hide();
        //Additional code for a bug with ngx-bootstrap modal, remove once fixed.
        //https://github.com/valor-software/ngx-bootstrap/issues/1139
        document.body.classList.remove('modal-open');
        const modalContainer = document.querySelector('modal-container');
        if (modalContainer !== null) {
            modalContainer.parentNode.removeChild(modalContainer);
        }
    }

    createAccount(login: String, password: String, email: String) {
        const headers = {'Content-Type': 'application/json'};
        this.http.post('api/v1/accounts/creations',
            { login: login, password: password, email: email, language: this.language },
            { headers }
            ).subscribe(
            (data: AjaxResponse) => {
                this.closeModal();
                for(let notification of data.notifications) {
                    this.alertService.notify(notification.type, notification.content);
                }

            },
            (err: HttpErrorResponse) => {
                if(err.status === 422) {
                    for(let notification of (err.error as AjaxResponse).notifications) {
                        this.alertService.notify(notification.type, notification.content);
                    }
                } else {
                    this.alertService.error(err.message);
                    this.closeModal();
                }
            });
    }

    setFrench() {
        this.translateService.use('fr');
        this.language = 'fr';
    }

    setEnglish() {
        this.translateService.use('en');
        this.language = 'en';
    }
}
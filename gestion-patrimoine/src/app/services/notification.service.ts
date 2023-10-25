import { Injectable } from '@angular/core';
// import { NotifierService } from 'angular-notifier';
import { NotificationType } from '../enum/notification-type.enum';
import { NgToastService } from 'ng-angular-popup';
// import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    // private notifier: NotifierService
    private toast: NgToastService
  ) {}


  // ---------------------------------------------------------------
  // public notify(type: NotificationType, message: string) {
  //   this.notifier.notify(type, message);
  // }
  // ---------------------------------------------------------------


  // ---------------------------------------------------------------
  // show Toast on ... ... position : position: 'bottomRight', 'topRight', 'bottomLeft', 'topLeft', 'bottomCenter', 'topCenter'

  showAlert(type: NotificationType, message: string, titre?: string): void {
    switch (type) {
        case 'success':
            this.toast.success({ detail: titre || '', summary: message, duration: 5000, position: 'topRight' });
            break;
        case 'error':
            this.toast.error({ detail: titre || '', summary: message, sticky: true, position: 'topRight' });
            // this.toast.error({ detail: titre || '', summary: message, duration: 5000, position: 'topRight' });
            break;
        case 'info':
            this.toast.info({ detail: titre || '', summary: message, sticky: true, position: 'topRight' });
            // this.toast.info({ detail: titre || '', summary: message, duration: 5000, position: 'topRight' });
            break;
        case 'warning':
            this.toast.warning({ detail: titre || '', summary: message, duration: 5000, position: 'topRight' });
            break;
        default:
            break;
    }
}


  // showSuccess() {
  //   this.toast.success({detail: "success", summary:'Your Success Message', duration: 5000});
  // }

  // showError() {
  //   this.toast.error({detail:"ERROR", summary:'Your Error Message', sticky:true});
  // }

  // showInfo() {
  //   this.toast.info({detail:"INFO", summary:'Your Info Message', sticky:true});
  // }

  // showWarn() {
  //   this.toast.warning({detail:"WARN", summary:'Your Warn Message', duration: 5000});
  // }
  // ---------------------------------------------------------------

}

import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `
    <div class="spinner-border text-myprimary" role="status" style="width: 15rem; height: 15rem;" >
      <span class="visually-hidden">Loading...</span>
    </div>
  `
})
export class LoaderComponent {}

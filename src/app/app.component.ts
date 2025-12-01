import { Component} from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgProgressbar } from 'ngx-progressbar';
import { NgProgressRouter } from 'ngx-progressbar/router';
@Component({
  selector: 'app-root',
  imports: [
    RouterModule,
    NgProgressbar, NgProgressRouter
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'rusty-dashboard';
}

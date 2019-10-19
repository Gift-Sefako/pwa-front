import {Component} from '@angular/core';
import {ConnectionService} from 'ng-connection-service';
import {LocalStorage} from '@ngx-pwa/local-storage';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng7';
  status = 'ONLINE';
  isConnected = true;

  constructor(private connectionService: ConnectionService, private localStorage: LocalStorage, private http: HttpClient) {
    this.connectionService.monitor().subscribe(isConnected => {
        this.isConnected = isConnected;
        if (this.status === 'ONLINE') {
          console.log('check localstorage for failed requests');
          this.localStorage.getItem('failingReq').subscribe(ls => {
            ls.forEach(fr => {
              console.log('trying', fr);
              this.http.post('http://localhost:8080/api/addPatient', fr.body).subscribe(result => {
              });
            }).then(result => {
              console.log('failed add requests should be synced with backend db');
            });
          });
          this.status = 'ONLINE';
        } else {
          this.status = 'OFFLINE';
          console.log(this.status);
        }
      }
    );
  }
}

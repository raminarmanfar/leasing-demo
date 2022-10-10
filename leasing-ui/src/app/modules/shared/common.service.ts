import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private _snackBar: MatSnackBar) {
  }

  public static getKeys(value: any): string[] {
    let keys = [];
    for (let key in value) {
      keys.push(key);
    }
    return keys;
  }

  public static convertDateFormat(date: string): string {
    return moment(date).format('YYYY-MM-DD');
  }

  public showSnakeBar(message: string, action: string, durationInSeconds = 3): void {
    this._snackBar.open(message, action, {duration: durationInSeconds * 1000});
  }
}

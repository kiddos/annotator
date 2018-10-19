import { Injectable } from '@angular/core';
declare var fs: any;

@Injectable({
  providedIn: 'root'
})

export class ConfigurationService {
  readonly configFilePath = './annotator.config.json';
  data: any;

  constructor() {
    this.data = {};
  }

  load(callback: any) {
    fs.stat(this.configFilePath, (err, stats) => {
      if (!err && stats.isFile()) {
        fs.readFile(this.configFilePath, (err, data) => {
          if (!err) {
            this.data = JSON.parse(data);
            callback();
          }
        });
      }
    });
  }

  add(key: string, value: any) {
    this.data[key] = value;
    fs.writeFile(this.configFilePath, JSON.stringify(this.data), (err) => {
      if (err) {
        alert('Fail to save configuration');
      }
    });
  }
}

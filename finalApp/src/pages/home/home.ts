import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, Response, Jsonp, RequestOptions } from '@angular/http';
import { ChangeDetectorRef } from '@angular/core';

import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  matches: String;
  isRecording = false;
  res = [];
 
  constructor(private http: Http, public navCtrl: NavController, private speechRecognition: SpeechRecognition, private plt: Platform, private cd: ChangeDetectorRef) { }
 
  isIos() {
    return this.plt.is('ios');
  }
 
  stopListening() {
    this.speechRecognition.stopListening().then(() => {
      this.isRecording = false;
    });
  }
 
  getPermission() {
    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {
        if (!hasPermission) {
          this.speechRecognition.requestPermission();
        }
      });
  }
 
  startListening() {
    let options = {
      language: 'en-US'
    }
    this.speechRecognition.startListening().subscribe(matches => {
      this.matches = matches[0].substring(9);
      this.cd.detectChanges();
    });
    this.isRecording = true;
  }

  fetchResult() {
    this.http.get('https://jsonplaceholder.typicode.com/posts')
    .subscribe(
      (data) => {
      console.log(data);
      this.res = JSON.parse(data._body);
    }, (err) => {
      console.log(err);
    });
  }
 
}
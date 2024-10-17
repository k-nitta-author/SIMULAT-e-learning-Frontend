import { Injectable } from '@angular/core';
import { Weavy } from "@weavy/uikit-web";

@Injectable({
  providedIn: 'root'
})
export class WeavyService {
  weavy = new Weavy();

  constructor() { 
    this.weavy.url ="https://1845cba530934b15a37270a57712b558.weavy.io";
    // The following key is a sample key for the USERS API
    this.weavy.tokenFactory = async (refresh: Boolean) => "wyu_YmxTsYyugCXGeSD33FUUOhX6WmmDoD3Ha2XX"

    // The following key is our own generated key - uncomment when backend for users is ready
    // this.weavy.tokenFactory = async (refresh: Boolean) => "wys_OqTZZ6EniKdWT18wiu6p5d0RIkrKvF1qC67F"
  }
}

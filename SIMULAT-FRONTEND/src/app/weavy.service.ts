import { Injectable } from '@angular/core';
import { Weavy } from "@weavy/uikit-web";

@Injectable({
  providedIn: 'root'
})
export class WeavyService {
  weavy = new Weavy();

  constructor() { 
    this.weavy.url ="https://1845cba530934b15a37270a57712b558.weavy.io";
    this.weavy.tokenFactory = async (refresh: Boolean) => "wyu_n9qihJlqpS1QNmrF4UsfbcfkM6Vzwl4DfkAL"
  }
}

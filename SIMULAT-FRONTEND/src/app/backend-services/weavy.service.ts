import { Injectable } from '@angular/core';
import { Weavy } from "@weavy/uikit-web";

@Injectable({
  providedIn: 'root'
})
export class WeavyService {
  weavy = new Weavy();

  constructor() { 
    this.weavy.url ="https://12001144a8f2439994a19bf10b0ba9c6.weavy.io/";

    // The following key is our own generated key - uncomment when backend for users is ready
     this.weavy.tokenFactory = async (refresh: Boolean) => "https://simulat-e-learning-backend.onrender.com/token"
  }

}

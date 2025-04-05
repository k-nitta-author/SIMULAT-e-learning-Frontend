import { Injectable, OnDestroy } from "@angular/core";
import { Weavy } from "@weavy/uikit-web";

@Injectable({
  providedIn: "root",
})
export class WeavyService implements OnDestroy {
  weavy = new Weavy();

  constructor() {
    this.weavy.url = new URL("https://760cd803fbe2455682fdeee465254fc0.weavy.io");
    this.weavy.tokenFactory = async (refresh) => "wyu_REhF62iymD6tydLWsZyNuk8ruBUaEG35eSEN";
  }

  ngOnDestroy(): void {
    this.weavy.destroy();
  }
}

// Following comment is the original code for the WeavyService class, which was replaced by the above code, and is kept here for reference.

/* 
import { Injectable } from '@angular/core';
import { Weavy } from "@weavy/uikit-web";

@Injectable({
  providedIn: 'root'
})
export class WeavyService {
  weavy = new Weavy();

  constructor() { 
    this.weavy.url ="https://760cd803fbe2455682fdeee465254fc0.weavy.io/";

    this.weavy.tokenFactory = async (refresh: boolean) => {
      try {
        const response = await fetch(`https://simulat-e-learning-backend.onrender.com/token?refresh=${refresh}`, {
          credentials: 'include' // This is important for sending cookies/session data
        });

        if (response.ok) {
          const data = await response.json();
          if (data.access_token) {
            return data.access_token;
          }
          throw new Error(data.message || "No access token received");
        } else if (response.status === 401) {
          throw new Error("User not authenticated");
        } else {
          const error = await response.json();
          throw new Error(error.message || "Could not fetch token from endpoint");
        }
      } catch (error) {
        console.error("Token factory error:", error);
        throw error;
      }
    };
  }
} */
// src/main.ts

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config'; // Assuming you have an app.config.ts for standalone app

// Se AppComponent é standalone, você deve usar bootstrapApplication
bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));

// Se AppModule ainda for o módulo raiz, você usaria:
// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

const firebaseConfig = {
    projectId:"notes-4e6d2",
    appId:"1:444762008767:web:7e973295199b48f2452a0a",
    storageBucket:"notes-4e6d2.firebasestorage.app",
    apiKey:"AIzaSyCxPTGYvzKJ9p5fYHPU5gaGOaXPvmqTGGg",
    authDomain:"notes-4e6d2.firebaseapp.com",
    messagingSenderId:"444762008767"
}

export const appConfig: ApplicationConfig = {
  
  providers: [
    provideRouter(routes), 
      provideFirebaseApp(() => initializeApp(firebaseConfig)), 
      provideFirestore(() => getFirestore()), 
      provideDatabase(() => getDatabase())
  ],
};

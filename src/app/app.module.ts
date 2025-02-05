import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login-signup/login.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { SharedModule } from './common/shared.module';
import { ChatComponent } from './chat/chat.component';
import { LoginService } from './services/login.service';
import { AuthInterceptor } from './services/auth.interceptor';

// NgRx Store & Effects
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FolderEffects } from './store/folder.effects';
import { folderReducer } from './store/folder.reducer';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [AppComponent, ChatComponent],
  imports: [
    BrowserModule, FontAwesomeModule, FormsModule,  
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    LoginModule,
    DashboardModule,
    SharedModule,
    StoreModule.forRoot({ folder: folderReducer }), // NgRx store setup
    EffectsModule.forRoot([FolderEffects]), // NgRx effects setup
    NgbModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    })
  ],
  providers: [
    LoginService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SdtmDomainUploadModule } from './sdtm-domain-upload/sdtm-domain-upload.module';
import { FileService } from './services/file.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchModule } from './search/search.module';
import { DetailsModule } from './details/details.module';
import { CustomMaterialModule } from './custom-material.module';
import { HttpService } from './services/http.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SdtmDomainUploadModule,
    SearchModule,
    DetailsModule,
    CustomMaterialModule,
    HttpClientModule

  ],
  providers: [FileService, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }

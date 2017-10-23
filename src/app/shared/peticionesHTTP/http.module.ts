import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
 
// Import HttpClientModule from @angular/common/http
import {HttpClientModule} from '@angular/common/http';
 
@NgModule({
  imports: [
    BrowserModule,
    // Include it under 'imports' in your application module
    // after BrowserModule.
    HttpClientModule,
  ],
})
export class HttpModule {}
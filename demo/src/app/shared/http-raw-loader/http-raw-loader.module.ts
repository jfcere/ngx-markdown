import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HttpRawLoaderService } from './http-raw-loader.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [HttpRawLoaderService],
})
export class HttpRawLoaderModule { }

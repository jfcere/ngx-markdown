import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpRawLoaderService {
  constructor(
    private httpClient: HttpClient,
  ) { }

  get(url: string): Observable<string> {
    return this.httpClient
      .get(url, { responseType: 'text' })
      .pipe(share());
  }
}

import { Injectable } from '@angular/core';
import { BaseService } from "../../shared/services/base.service";
import { HttpClient } from "@angular/common/http";
import { Center } from '../model/center.entity';

@Injectable({
  providedIn: 'root'
})
export class CenterService extends BaseService<Center>{

  constructor(http: HttpClient) {
  super(http);
  this.resourceEndpoint = '/centers';
}
}

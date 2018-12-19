import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class ToolbarService {
  onSelectedBusiness = new BehaviorSubject<{ id: string; name: string }>(null);
  constructor() {}
}

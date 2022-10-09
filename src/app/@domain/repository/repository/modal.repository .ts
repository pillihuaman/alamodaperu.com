import { NbComponentStatus } from '@nebular/theme';
import { Observable } from 'rxjs';
import { User } from '../models/user';

export abstract class ModalRepository {
  abstract open(componentType: any): void;
  abstract showToast(status: NbComponentStatus, index: string): void;
  //open(componentType: any) {
}

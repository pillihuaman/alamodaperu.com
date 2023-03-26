import { ModalRepository } from 'src/app/@domain/repository/repository/modal.repository ';
import { ModalService } from './../../@data/services/modal.service';
import { AuthenticationService } from './../../@data/services/authentication.service';
import { AuthenticationRepository } from 'src/app/@domain/repository/repository/authentication.repository';
import { UserService } from './../../@data/services/user.service';
import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomainRoutingModule } from './domain-routing.module';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { UserRepository } from './repository/user.repository';
import { ChatRepository } from './repository/chat.repository';
import { ChatService } from 'src/app/@data/services/chat.service';
import { SupportService } from 'src/app/@data/services/support.service';
import { SupportRepository } from './repository/support.repository';
const DATA_SERVICES = [
  {
    provide: UserRepository,
    useClass: UserService,
  },
  {
    provide: AuthenticationRepository,
    useClass: AuthenticationService,
  },
  {
    provide: ModalRepository,
    useClass: ModalService,
  },
  {
    provide: ModalRepository,
    useClass: ModalService,
  },
  {
    provide: ChatRepository,
    useClass: ChatService,
  },
  {
    provide: SupportRepository,
    useClass: SupportService,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class DomainModule {
  constructor(@Optional() @SkipSelf() parentModule: DomainModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: DomainModule,
      providers: [...DATA_SERVICES],
    } as ModuleWithProviders<any>;
  }
}

import { ModalModel } from '../@data/model/User/modalModel';

export class GeneralConstans {
  public static successCode: number = 1;
  public static errorCode: number = 2;
  public static warningCode: number = 3;
  public static successMessage: string = 'Success !';
  public static errorMessage: string = 'Error !';
  public static warningMessage: string = 'Warning !';
  public static lazyLoad: boolean = false;

  public static datamodelError: ModalModel = {
    code: GeneralConstans.errorCode,
    message: GeneralConstans.errorMessage,
    lazyLoad: false,
  };
  public static datamodelSucess: ModalModel = {
    code: GeneralConstans.successCode,
    message: GeneralConstans.successMessage,
    lazyLoad: false,
  };
  public static lazyLoadmodel: ModalModel = {
    lazyLoad: true,
  };
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ModalMessage } from '../../models/shared.models';

enum ModalOptions {
  LEAVE_PAGE = 'leave page',
  DELETE_PROFILE = 'delete profile',
}

@Injectable({ providedIn: 'root' })
export class ModalService {
  private modalOptions?: ModalOptions;

  private confirmSelection$$ = new Subject<boolean>();

  private modalTitle$$ = new BehaviorSubject<string | null>(null);
  private modalIsOpened$$ = new BehaviorSubject<boolean>(false);
  private message$$ = new BehaviorSubject<{ chunk: string }[]>([{ chunk: '' }]);

  public modalIsOpened$ = this.modalIsOpened$$.asObservable();
  public message$ = this.message$$.asObservable();
  public modalTitle$ = this.modalTitle$$.asObservable();

  public userId$?: Observable<string | undefined>;

  set message(value: { chunk: string }[]) {
    this.message$$.next(value);
  }
  get message(): Observable<ModalMessage[]> {
    return this.message$;
  }

  set modalTitle(value: string) {
    this.modalTitle$$.next(value);
  }

  get modalTitle(): Observable<string | null> {
    return this.modalTitle$;
  }

  set modalIsOpened(value: boolean) {
    this.modalIsOpened$$.next(value);
  }
  get modalIsOpened(): Observable<boolean> {
    return this.modalIsOpened$;
  }

  confirm(modalTitle: string, modalMessage: ModalMessage[]) {
    this.modalIsOpened = true;
    this.modalTitle = modalTitle;
    this.message = modalMessage;

    return this.confirmSelection$$.asObservable();
  }

  respond(result: boolean) {
    this.confirmSelection$$.next(result);
    this.modalIsOpened = false;
    if (this.modalOptions === ModalOptions.DELETE_PROFILE && result) {
      console.log('DELETE PROFILE');
      this.userId$?.subscribe(console.log);
    }
  }

  confirmLeavePage(modalTitle: string, modalMessage: ModalMessage[]) {
    this.modalOptions = ModalOptions.LEAVE_PAGE;
    return this.confirm(modalTitle, modalMessage);
  }

  confirmDeleteProfile(
    modalTitle: string,
    modalMessage: ModalMessage[],
    id: Observable<string | undefined>
  ) {
    this.modalOptions = ModalOptions.DELETE_PROFILE;
    this.userId$ = id;
    return this.confirm(modalTitle, modalMessage);
  }
}

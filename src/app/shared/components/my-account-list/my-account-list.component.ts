import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { ButtonSize, ButtonState } from '../../models/button.model';
import { ModalBoxComponent } from '../modal-box/modal-box.component';
import { ButtonComponent } from '../../ui/button/button.component';
import { TableComponent } from '../table/table.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { MyTrainersComponent } from './my-trainers/my-trainers.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AsyncPipe, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { Observable, of } from 'rxjs';
import { CustomImgComponent } from '../../ui/custom-img/custom-img.component';
import { StatusMarkerComponent } from '../../ui/status-marker/status-marker.component';
import { UserStoreService } from '../../../coreFeatures/services/user/user-store.service';
import { myStudent, UserData } from '../../../coreFeatures';

import { ModalService } from '../../../coreFeatures/services/modal/modal.service';
import { environment } from '../../../enviroment';

export interface AccountDataOutput {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
}

const components = [
  ButtonComponent,
  StudentsListComponent,
  MyTrainersComponent,
  TableComponent,
  ModalBoxComponent,
  CustomImgComponent,
  StatusMarkerComponent,
];

@Component({
  selector: 'app-my-account-list',
  standalone: true,
  imports: [
    FontAwesomeModule,
    components,
    NgFor,
    AsyncPipe,
    TitleCasePipe,
    NgIf,
  ],
  templateUrl: './my-account-list.component.html',
  styleUrl: './my-account-list.component.scss',
})
export class MyAccountListComponent implements OnInit {
  @ViewChild(ModalBoxComponent, { static: false })
  modalBoxComponent?: ModalBoxComponent;

  public readonly currentUser$: Observable<UserData | null> =
    this.userStoreService.currentUser;

  public readonly userActiveStatus$: Observable<string> = of('Active');

  public readonly accountDataOutput = this.userStoreService.getAccountData();
  public readonly role$ = this.userStoreService.getCurrentUserRole();
  public readonly userId$ = this.userStoreService.getUserId();

  public readonly img$ = this.userStoreService.getUserImage();
  protected noUserImage = of(environment.staticImages.noUserImage);

  public icon: IconDefinition = faCheck;
  public readonly btnType: typeof ButtonState = ButtonState;
  public readonly btnSize: typeof ButtonSize = ButtonSize;

  public tableData$?: Observable<myStudent[]>;

  public modalMessageChunks = [
    {
      chunk:
        "We are truly sorry to see you go. Before you proceed with deleting your profile, we want you to know that this action is permanent and irreversible. You'll lose access to all your account information, course progress, certificates, and any learning communities you are part of.",
    },
    {
      chunk:
        "If there is anything we can do to improve your experience or if you need assistance with any issues you've encountered, please reach out to our support team. We're always here to help.",
    },
    {
      chunk:
        "If you still wish to delete your account, please click on the 'Confirm' button below.",
    },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userStoreService: UserStoreService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.tableData$ = this.userStoreService.getMyUsers();
  }

  protected navigateTo(route: string): void {
    this.router.navigate([route], { relativeTo: this.route });
  }

  toggleDeletAccountModal() {
    this.modalService.confirmDeleteProfile(
      'Profile Deletion Confirmation',
      this.modalMessageChunks,
      this.userId$
    );
  }

  getBojectKeys(obj: object) {
    return Object.keys(obj);
  }
  getObjectVal(obj: object) {
    return Object.values(obj);
  }
}

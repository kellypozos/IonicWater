import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { User, UserService } from '../services/user.service';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.page.html',
  styleUrls: ['./user-modal.page.scss'],
})
export class UserModalPage implements OnInit {

  @Input() user: User;
  isUpdate = false;
  data = {
    name: '',
    email: '',
    password: ''
  };

  constructor(
    private modalCtrl: ModalController,
    private service: UserService
  ) { }

  ngOnInit() {
    if (this.user) {
      this.isUpdate = true;
      this.data = this.user;
    }
  }

  closeModal() {
    this.modalCtrl.dismiss(null, 'cerrado');
  }

  onSubmit(form: NgForm) {
    const user = form.value;
    if (this.isUpdate) {
      this.service.update(user, this.user.id).subscribe(() => {
        user.id = this.user.id;
        this.modalCtrl.dismiss(user, 'actualizado');
      });
    }
    else {
      this.service.create(user).subscribe(response => {
        this.modalCtrl.dismiss(response, 'creado');
      });
    }

  }

}

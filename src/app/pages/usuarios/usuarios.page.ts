import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { User, UserService } from 'src/app/services/user.service';
import { UserModalPage } from 'src/app/user-modal/user-modal.page';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

  users: User[];
  constructor(
    private service: UserService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.service.getAll().subscribe(response => {
      //console.log(response);
      this.users = response;
    });
  }

  addUser() {
    this.modalCtrl.create({
      component: UserModalPage
    }).then(modal => {
      modal.present();
      return modal.onDidDismiss();
    })
      .then(({ data, role }) => {
        if (role == "creado") {
          this.users.push(data);
        }
      }
      );
  }


  updateUser(user: User) {
    this.modalCtrl.create({
      component: UserModalPage,
      componentProps: { user }
    }).then(modal => {
      modal.present();
      return modal.onDidDismiss();
    }).then(({ data, role }) => {
      this.users = this.users.filter(std => {
        if (data.id === std.id) {
          return data;
        }
        return std;
      });
    });

  }


  removeUser(id: string) {
    this.alertCtrl.create({
      header: 'Eliminar',
      message: '¿Estas seguro de eliminar?',
      buttons: [{
        text: 'Si',
        handler: () => {
          this.service.remove(id).subscribe(() => {
            this.users = this.users.filter(std => std.id !== id);
          });
        }
      }, { text: 'No' }
      ]
    }).then(alertEl => alertEl.present());

  }
}

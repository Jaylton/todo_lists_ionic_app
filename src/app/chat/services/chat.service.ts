import { Injectable } from '@angular/core';
import { Firestore } from 'src/app/core/classes/firestore.class';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/core/services/auth.service';
import { firestore } from 'firebase';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService extends Firestore<any>  {

  constructor(db: AngularFirestore, private authService: AuthService) {
    super(db);
  }

  public setChats() {
    this.authService.authState$.subscribe((user) => {
      console.log(user.uid)
      if (user) {
        this.setCollection(`/users/${user.uid}/chats`);
        return;
      }
      this.setCollection(null);
    });
  }

  public getChats() {
    return this.getAllChats()
      .pipe(take(1))
      .subscribe((data) => {
        console.log(data)
      });
  }

}

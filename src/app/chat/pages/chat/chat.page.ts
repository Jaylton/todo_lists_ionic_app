import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { take } from 'rxjs/operators';
import { OverlayService } from 'src/app/core/services/overlay.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  constructor(private chatService: ChatService, private overlayService: OverlayService) { }

  async ngOnInit() {
    const load = await this.overlayService.loading();
    try {
      this.chatService.setChats();
    } catch (error) {
      load.dismiss();
    } finally {
      setTimeout(() => {
        console.log(this.chatService.getChats())
      }, 1000);
      load.dismiss();
    }
    // this.chatService.getAll()
    //   .pipe(take(1))
    //   .subscribe((data) => {
    //     console.log(data)
    //   });
  }

}

import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../../models/task.model';
import { TasksService } from '../../services/tasks.service';
import { NavController } from '@ionic/angular';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.page.html',
  styleUrls: ['./tasks-list.page.scss'],
})
export class TasksListPage {
  tasks$: Observable<Task[]>;
  constructor(
    private taskService: TasksService,
    private overlayService: OverlayService,
    private navCtrl: NavController
  ) {}

  async ionViewDidEnter(): Promise<void> {
    const loading = await this.overlayService.loading();
    this.tasks$ = this.taskService.getAll();
    this.tasks$.pipe(take(1)).subscribe((tasks) => {
      loading.dismiss();
    });
  }

  onUpdate(task: Task) {
    this.navCtrl.navigateForward(`/tasks/edit/${task.id}`);
  }

  async onDelete(task: Task) {
    await this.overlayService.alert({
      message: `Do you want to delete the task ${task.title} `,
      buttons: [
        {
          text: 'Yes',
          handler: async () => {
            await this.taskService.delete(task);
            await this.overlayService.toast({ message: `Task ${task.title} deleted` });
          },
        },
        'No',
      ],
    });
  }

  async onDone(task: Task) {
    const toUpdate = { ...task, done: !task.done };
    await this.taskService.update(toUpdate);
    await this.overlayService.toast({ message: `Task ${task.title} ${toUpdate.done ? 'completed' : 'updated'}` });
  }
}

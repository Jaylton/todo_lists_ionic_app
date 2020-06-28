import { NgModule } from '@angular/core';

import { TasksListPageRoutingModule } from './tasks-list-routing.module';

import { TasksListPage } from './tasks-list.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from '../../components/components.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [SharedModule, CommonModule, ComponentsModule, TasksListPageRoutingModule],
  declarations: [TasksListPage],
})
export class TasksListPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board.component';
import { BoardRoutingModule } from './board-routing.module';
import { FormsModule } from '@angular/forms';
import { ClarityModule, ClrModalModule } from '@clr/angular';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { QuillModule } from 'ngx-quill';

@NgModule({
    declarations: [
        BoardComponent
    ],
    imports: [
        CommonModule,
        BoardRoutingModule,
        FormsModule,
        ClarityModule,
        ClrModalModule,
        DragDropModule,
        QuillModule
    ]
})
export class BoardModule { }

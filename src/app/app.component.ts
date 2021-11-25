import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  closeResult = '';
  title = '';
  item = '';
  constructor(private modalService: NgbModal) {

  }

  hear = [

  ];
  feel = [

  ];
  see = [

  ];
  say = [

  ];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  remove(item, array) {
    var index = array.indexOf(item);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  open(content, title, option) {
    console.log(title);
    this.title = title;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      console.log(result);
      this.closeResult = `Closed with: ${result}`;

      switch (option) {
        case 1:
          this.hear.push(this.item);
          break;

        case 2:
          this.feel.push(this.item);
          break;

        case 3:
          this.see.push(this.item);
          break;

        case 4:
          this.say.push(this.item);
          break;

      }

      this.title = '';
      this.item = '';
    }, (reason) => {
      this.item = '';
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}

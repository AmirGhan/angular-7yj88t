//our root app component
import { Component, NgModule, VERSION, AfterViewInit, ViewChild } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html"
})
export class AppComponent {
  private _users: User[];

  name: string;
  family: string;
  editingIndex: number;
  birthdayDay: number;
  birthdayMonth: number;
  birthdayYear: number;
  itemNumber: number;

  @ViewChild('f') form: any;

  constructor(private modalService: NgbModal) {
    this._users = [
      new User("Ali", "Delshad", 1, { day: 1, month: 1, year: 1991 }),
      new User("Hamid", "Sadeghi", 2, { day: 2, month: 2, year: 1992 }),
      new User("Amir", "Olfat", 3, { day: 3, month: 3, year: 1993 }),
      new User("Keyvan", "Nasr", 4, { day: 4, month: 4, year: 1994 })
    ];
  }

  get users(): User[] {
    return this._users;
  }

  delete(index: number) {
    this._users.splice(index, 1);
  }

  setEditUser(index: number): void {
    this.editingIndex = index;
    this.name = this._users[index].name;
    this.family = this._users[index].family;
    this.birthdayDay = this._users[index].birthday.day;
    this.birthdayMonth = this._users[index].birthday.month;
    this.birthdayYear = this._users[index].birthday.year;
    this.itemNumber = this._users[index].itemNum;
  }

  edit(): void {
    if (this.form.valid) {
      this._users[this.editingIndex] = new User(
      this.name,
      this.family,
      this.itemNumber,
      {
        day: this.birthdayDay,
        month: this.birthdayMonth,
        year: this.birthdayYear
      }
      );
      this.editingIndex = undefined;
      this.name = "";
      this.family = "";
      this.birthdayDay = undefined;
      this.birthdayMonth = undefined;
      this.birthdayYear = undefined;
      this.itemNumber = undefined;
    }

  }

  add(): void {
        if (this.form.valid) {
          this._users.push(new User(this.name, this.family, this.itemNumber, {
            day: this.birthdayDay,
            month: this.birthdayMonth,
            year: this.birthdayYear
          }));
          this.name = "";
          this.family = "";
          this.birthdayDay = undefined;
          this.birthdayMonth = undefined;
          this.birthdayYear = undefined;
          this.itemNumber = undefined;

        }

  }

  cancel(): void {
    this.editingIndex = undefined;
    this.name = "";
    this.family = "";
    this.birthdayDay = undefined;
    this.birthdayMonth = undefined;
    this.birthdayYear = undefined;
    this.itemNumber = undefined;
  }
}

export class AppModule {}

export class User {
  private _name: string;
  private _family: string;
  private _itemNum: number;
  private _birthday: LocalDate;

  constructor(
    name: string,
    family: string,
    itemNum?: number,
    birthday?: LocalDate
  ) {
    this._name = name;
    this._family = family;
    this._itemNum = itemNum;
    this._birthday = birthday;
  }

  get name(): string {
    return this._name;
  }

  get family(): string {
    return this._family;
  }

  get itemNum(): number {
    return this._itemNum;
  }

  get birthday(): LocalDate {
    return this._birthday;
  }
}

export interface LocalDate {
  day: number;
  month: number;
  year: number;
}

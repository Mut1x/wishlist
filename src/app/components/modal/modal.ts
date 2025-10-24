import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from "@angular/core";
import { Wish } from "../../../shared/models/wish";
import { Error } from "../error/error";
import { FormsModule } from "@angular/forms";
import { v4 as uuidv4 } from "uuid";

@Component({
  selector: "app-modal",
  imports: [FormsModule, Error],
  templateUrl: "./modal.html",
  styleUrl: "./modal.less",
})
export class Modal implements OnChanges {
  @Input() isOpen: boolean = false;
  @Input() editingWish: Wish | null = null;
  @Output() closeModal = new EventEmitter<void>();
  @Output() saveWish = new EventEmitter<Wish>();

  protected currencies: string[] = ["EUR", "USD", "INR", "JPY"];

  protected wishName = "";
  protected wishDescription = "";
  protected wishPrice = "";
  protected wishCurrency = "EUR";
  protected wishLink = "";
  protected errorMessages: { type: string; message: string }[] = [];

  ngOnChanges() {
    if (this.editingWish) {
      // Editing mode - populate form with existing wish data
      this.wishName = this.editingWish.name;
      this.wishDescription = this.editingWish.description || "";
      this.wishPrice = this.editingWish.price || "";
      this.wishCurrency = this.editingWish.currency || "EUR";
      this.wishLink = this.editingWish.link || "";
    } else {
      // Adding mode - reset form
      this.resetForm();
    }
  }

  protected handleSave() {
    const wish = this.editingWish
      ? new Wish(
          this.editingWish.id,
          this.wishName,
          this.wishDescription,
          this.wishPrice,
          this.wishCurrency,
          this.wishLink,
          this.editingWish.isAcquired,
        )
      : new Wish(
          uuidv4(),
          this.wishName,
          this.wishDescription,
          this.wishPrice,
          this.wishCurrency,
          this.wishLink,
        );

    this.findErrors(wish);
    if (this.errorMessages.length > 0) return;

    this.saveWish.emit(wish);
    this.closeModal.emit();
    this.resetForm();
  }

  protected handleCancel() {
    this.closeModal.emit();
    this.resetForm();
  }

  protected handleBackdropClick(event: Event) {
    if (event.target === event.currentTarget) {
      this.handleCancel();
    }
  }

  private resetForm() {
    this.wishName = "";
    this.wishDescription = "";
    this.wishPrice = "";
    this.wishCurrency = "EUR";
    this.wishLink = "";
    this.errorMessages.splice(0, this.errorMessages.length);
  }

  private findErrors(wish: Wish) {
    this.errorMessages.splice(0, this.errorMessages.length);
    if (wish.name === "") {
      this.errorMessages.push({
        type: "Name",
        message: "Name is required for your wish.",
      });
    }

    if (wish.link === "") {
      this.errorMessages.push({
        type: "Link",
        message: "Wish link is required.",
      });
    }

    if (!this.isValidURL(wish.link || "")) {
      this.errorMessages.push({
        type: "Link",
        message: "Wish link is not a valid URL.",
      });
    }

    const finalPrice = parseFloat(wish.price || "");
    if (isNaN(finalPrice)) {
      this.errorMessages.push({
        type: "Price",
        message: "Price must be a valid number.",
      });
    }

    if (!this.currencies.includes(wish.currency || "")) {
      this.errorMessages.push({
        type: "Currency",
        message: "Selected currency not supported.",
      });
    }
  }

  private isValidURL(url: string): boolean {
    if (url === "") return false;
    try {
      return Boolean(new URL(url));
    } catch (e) {
      return false;
    }
  }

  isError(type: string): boolean {
    let error = false;
    this.errorMessages.forEach((message) => {
      if (message.type === type) {
        error = true;
      }
    });

    return error;
  }
}

import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Wish } from '../../../shared/models/wish';
import { FormsModule, NgForm } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-modal',
  imports: [FormsModule],
  templateUrl: './modal.html',
  styleUrl: './modal.less'
})
export class Modal implements OnChanges {
  @Input() isOpen: boolean = false;
  @Input() editingWish: Wish | null = null;
  @Output() closeModal = new EventEmitter<void>();
  @Output() saveWish = new EventEmitter<Wish>();

  protected currencies: string[] = [
    'EUR',
    'USD',
    'INR',
    'JPY'
  ];

  protected wishName = '';
  protected wishDescription = '';
  protected wishPrice = '';
  protected wishCurrency = 'EUR';
  protected wishLink = '';
  protected wishError: boolean = false;

  ngOnChanges() {
    if (this.editingWish) {
      // Editing mode - populate form with existing wish data
      this.wishName = this.editingWish.name;
      this.wishDescription = this.editingWish.description || '';
      this.wishPrice = this.editingWish.price || '';
      this.wishCurrency = this.editingWish.currency || 'EUR';
      this.wishLink = this.editingWish.link || '';
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
          this.editingWish.isAcquired
        )
      : new Wish(
          uuidv4(),
          this.wishName,
          this.wishDescription,
          this.wishPrice,
          this.wishCurrency,
          this.wishLink
        );

    this.wishError = this.wishHasError(wish);
    if (this.wishError) return;

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
    this.wishName = '';
    this.wishDescription = '';
    this.wishPrice = '';
    this.wishCurrency = 'EUR';
    this.wishLink = '';
    this.wishError = false;
  }

  private wishHasError(wish: Wish): boolean {
    const providedPrice = wish.price ?? '0';
    return !wish.name || !wish.link || !wish.link?.startsWith('https://') || !(/^(([0]{1})|([1-9]{1}[0-9]{1,11}))(\.([0-9]{1,2}))?$/gm).test(providedPrice);
  }
}

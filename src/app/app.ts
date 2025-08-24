import { Component } from '@angular/core';
import { Modal } from "./components/modal/modal";
import { Wish } from "../shared/models/wish";

@Component({
  selector: 'app-root',
  imports: [Modal],
  templateUrl: './app.html',
  styleUrl: './app.less'
})
export class App {  
  protected title: String = 'Wishlist';
  protected wishes: Wish[] = JSON.parse(localStorage.getItem('wishes') || '[]');
  protected isModalOpen: boolean = false;
  protected editingWish: Wish | null = null;
  protected wishError: boolean = false;

  protected openAddModal() {
    this.editingWish = null;
    this.isModalOpen = true;
  }

  protected openEditModal(wish: Wish) {
    this.editingWish = { ...wish };
    this.isModalOpen = true;
  }

  protected closeModal() {
    this.isModalOpen = false;
    this.editingWish = null;
    this.wishError = false;
  }

  protected handleSaveWish(wish: Wish) {
    if (this.editingWish) {
      // Update existing wish
      this.wishes = this.wishes.map(w => w.id === wish.id ? wish : w);
    } else {
      // Add new wish
      this.wishes.push(wish);
    }
    
    localStorage.setItem('wishes', JSON.stringify(this.wishes));
    this.closeModal();
  }

  protected removeWish(wish: Wish) {
    this.wishes = this.wishes.filter(w => w.id !== wish.id);
    localStorage.setItem('wishes', JSON.stringify(this.wishes));
  }

  protected toggleWish(wish: Wish) {
    wish.isAcquired = !wish.isAcquired;
    localStorage.setItem('wishes', JSON.stringify(this.wishes));
  }
}

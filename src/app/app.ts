import { Component} from '@angular/core';
import { Wish } from '../shared/models/wish';
import { FormsModule, NgForm } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { Error } from "./components/error/error";

@Component({
  selector: 'app-root',
  imports: [FormsModule, Error],
  templateUrl: './app.html',
  styleUrl: './app.less'
})
export class App {  
  protected title : String = 'Wishlist';

  protected wishes: Wish[] =  JSON.parse(localStorage.getItem('wishes') || '[]')
  protected editingWishes: Wish[] = [];
  protected originalWishes: Wish[] = [];
  protected wishError: boolean = false;
  
  protected currencies: string[] = [
    'EUR',
    'USD',
    'INR',
    'JPY'
  ]

  protected newWishName = '';
  protected newWishDescription = '';
  protected newWishPrice = '';
  protected newWishCurrency = 'EUR'
  protected newWishLink = '';
  

  addWish() {
    const newWish = new Wish(        
      uuidv4(),
      this.newWishName,
      this.newWishDescription,
      this.newWishPrice,
      this.newWishCurrency,
      this.newWishLink
    );

    this.wishError = this.wishHasError(newWish);
    if(this.wishError) return;

    this.wishes.push(newWish);
    localStorage.setItem('wishes', JSON.stringify(this.wishes));

    this.wishError = false;
  }

  removeWish(wish: Wish) {
    this.wishes = this.wishes.filter(w => w.id !== wish.id);
    localStorage.setItem('wishes', JSON.stringify(this.wishes));
  }

  updateWish(wish: Wish) {    
    this.wishError = this.wishHasError(wish);
    if(this.wishError) return;

    this.wishes = this.wishes.map(w => w.id === wish.id ? wish : w);
    localStorage.setItem('wishes', JSON.stringify(this.wishes));
    this.wishError = false;
  }

  toggleWish(wish: Wish) {
    wish.isAcquired = !wish.isAcquired;
    localStorage.setItem('wishes', JSON.stringify(this.wishes));
  }

  editWish(wish: Wish) {
    // Store a copy of the original wish data
    const originalWish = { ...wish };
    this.originalWishes.push(originalWish);
    this.editingWishes.push(wish);
  }

  saveWish(wish: Wish) {
    this.wishError = this.wishHasError(wish);
    if(this.wishError) return;

    this.updateWish(wish);
    this.finishEdit(wish);

    this.wishError = false;
  }

  finishEdit(wish: Wish) {
    if (wish) {
      // Remove from originalWishes array since we're saving
      this.originalWishes = this.originalWishes.filter(ow => ow.id !== wish.id);
      
      // Remove from editingWishes array
      this.editingWishes = this.editingWishes.filter(ew => ew.id !== wish.id);
    }
  }

  stopEdit(wish: Wish) {
    if (wish) {
      // Find the original wish data
      const originalWish = this.originalWishes.find(ow => ow.id === wish.id);
      if (originalWish) {
        // Restore the original data
        Object.assign(wish, originalWish);
        // Remove from originalWishes array
        this.originalWishes = this.originalWishes.filter(ow => ow.id !== wish.id);
      }
      
      // Remove from editingWishes array
      this.editingWishes = this.editingWishes.filter(ew => ew.id !== wish.id);
      
      // Update localStorage with the restored data
      localStorage.setItem('wishes', JSON.stringify(this.wishes));
    }
  }

  wishHasError(wish: Wish): boolean {
    // check for errors, make sure the price is a number and the link is a valid url
    const providedPrice = wish.price ?? '0'; // if the price is not provided, set it to 0
    return !wish.name || !wish.link || !wish.link?.startsWith('https://') || !(/^(([0]{1})|([1-9]{1}[0-9]{1,11}))(\.([0-9]{1,2}))?$/gm).test(providedPrice);
  }

  resetForm(form: NgForm) {
    if(!this.wishError) form.reset();
  }
}

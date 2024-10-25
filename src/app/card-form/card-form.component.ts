import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardNumberDirective } from './card-number.directive'; // Adjust the path as necessary

@Component({
  selector: 'app-card-form',
  standalone: true,
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.css'],
  imports: [ReactiveFormsModule, CommonModule, CardNumberDirective] // Import the directive directly
})
export class CardFormComponent {
  cardForm: FormGroup;
  cardDetails: any = null;
  cardImage: File | null = null;

  constructor(private fb: FormBuilder) {
    this.cardForm = this.fb.group({
      name: ['', Validators.required],
      lustname: ['', Validators.required],
      birthYear: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{0,19}$/)]],
      securityCode: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
    });
  }

  formatBirthYear(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '').slice(0, 4); // Keep only digits and limit to 4 characters
  
    // Check if the length is 4 to apply formatting
    if (value.length >= 4) {
      // Split into month and year
      const month = value.slice(0, 2);
      const year = value.slice(2, 4);
      
      // Ensure the month does not exceed 12
      const validMonth = Math.min(Number(month), 12).toString().padStart(2, '0');
  
      // Update the formatted value
      value = `${validMonth}/${year}`;
    }
  
    this.cardForm.patchValue({ birthYear: value });
  }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.cardImage = input.files[0];
    }
  }

  onSubmit() {
    this.cardDetails = this.cardForm.value;
    console.log('Submitted Data:', this.cardDetails);
    this.cardForm.reset();
    this.cardImage = null; // Reset image on submit
  }

  getCardImageUrl(): string | null {
    return this.cardImage ? URL.createObjectURL(this.cardImage) : null;
  }
  onSecurityCodeInput(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, '').slice(0, 3); // Allow only digits and limit to 3 characters
    this.cardForm.patchValue({ securityCode: input.value });
  }
}

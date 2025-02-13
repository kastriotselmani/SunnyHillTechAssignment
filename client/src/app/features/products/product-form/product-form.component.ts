import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductDto } from '../../../models/product.dto';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  standalone:false
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductDto | null
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: [this.data?.name || '', Validators.required],
      price: [this.data?.price || 0, [Validators.required, Validators.min(0)]],
      quantity: [this.data?.quantity || 0, [Validators.required, Validators.min(0)]],
      status: [this.data?.status || '', Validators.required],
      category: [this.data?.category || '', Validators.required]
    });
  }

  onSave(): void {
    if (this.productForm.valid) {
      const result = { ...this.data, ...this.productForm.value };
      this.dialogRef.close(result);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

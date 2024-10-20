import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [ProductComponent],
  imports: [RouterModule, CommonModule, SharedModule, NgxSpinnerModule],
})
export class ProductModule {}

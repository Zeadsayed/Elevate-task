import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutes } from 'src/app/shared/models/appRoutes';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: AppRoutes.products,
    component: ProductComponent,
  },
];

@NgModule({
  declarations: [ProductComponent],
  imports: [
    RouterModule,
    CommonModule,
    SharedModule,
    NgxSpinnerModule,
    RouterModule.forChild(routes),
  ],
})
export class ProductModule {}

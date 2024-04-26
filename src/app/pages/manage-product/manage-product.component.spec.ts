import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProductComponent } from './manage-product.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";

describe('ManageProductComponent', () => {
  let component: ManageProductComponent;
  let fixture: ComponentFixture<ManageProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ManageProductComponent,
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ManageProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

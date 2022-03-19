import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerSuperiorComponent } from './banner-superior.component';

describe('BannerSuperiorComponent', () => {
  let component: BannerSuperiorComponent;
  let fixture: ComponentFixture<BannerSuperiorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerSuperiorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerSuperiorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsrDashboardComponent } from './csr-dashboard.component';

describe('CsrDashboardComponent', () => {
  let component: CsrDashboardComponent;
  let fixture: ComponentFixture<CsrDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CsrDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsrDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BusinessDetails } from './business-details';
import { provideRouter } from '@angular/router';
import { BusinessService } from '../../core/models/services/business.service';
import { of } from 'rxjs';

describe('BusinessDetails', () => {
  let component: BusinessDetails;
  let fixture: ComponentFixture<BusinessDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessDetails],
      providers: [
        provideRouter([]),
        {
          provide: BusinessService,
          useValue: { getBusinessById: () => of({}), currentBusiness: () => ({}) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessDetails);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BusinessList } from './business-list';
import { provideRouter } from '@angular/router';
import { BusinessService } from '../../core/models/services/business.service';
import { of } from 'rxjs';
import { signal } from '@angular/core';

describe('BusinessList', () => {
  let component: BusinessList;
  let fixture: ComponentFixture<BusinessList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessList],
      providers: [
        provideRouter([]),
        {
          provide: BusinessService,
          useValue: { profiles: signal([]), fetchProfiles: () => of([]) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessList);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

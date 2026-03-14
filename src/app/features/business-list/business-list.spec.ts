import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { BusinessList } from './business-list';
import { BusinessService } from '../../core/models/services/business.service';
import { MatPaginator } from '@angular/material/paginator';

class BusinessServiceStub {
  profiles = () => this._profiles;
  _profiles: any[] = [];
  fetchProfiles() { return of([]); }
}

class RouterStub {
  navigate = vi.fn();
}

describe('BusinessList', () => {
  let component: BusinessList;
  let fixture: ComponentFixture<BusinessList>;
  let service: BusinessServiceStub;
  let router: RouterStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessList],
      providers: [
        { provide: BusinessService, useClass: BusinessServiceStub },
        { provide: Router, useClass: RouterStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessList);
    component = fixture.componentInstance;
    service = TestBed.inject(BusinessService) as unknown as BusinessServiceStub;
    router = TestBed.inject(Router) as unknown as RouterStub;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call fetchProfiles() on init', () => {
    const spy = vi.spyOn(service, 'fetchProfiles').mockReturnValue(of([]));
    // Re-create to capture constructor behavior
    fixture = TestBed.createComponent(BusinessList);
    component = fixture.componentInstance;
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should populate dataSource with profiles when currentTab is profile', () => {
    service._profiles = [{ id: '1', name: 'A' }];
    // Trigger effect by recreating component which reads profiles
    fixture = TestBed.createComponent(BusinessList);
    component = fixture.componentInstance;
    expect(component.dataSource.data).toEqual(service._profiles);
  });

  it('should clear dataSource when currentTab is templates', () => {
    service._profiles = [{ id: '1', name: 'A' }];
    fixture = TestBed.createComponent(BusinessList);
    component = fixture.componentInstance;
    component.currentTab.set('templates');
    expect(component.dataSource.data).toEqual([]);
  });

  it('should assign paginator after view init', () => {
    // Provide a fake paginator element
    const paginator = TestBed.createComponent(BusinessList).componentInstance.paginator;
    // Render view
    fixture.detectChanges();
    // Assign after view init
    component.ngAfterViewInit();
    expect(component.dataSource.paginator).toBe(component.paginator);
  });

  it('should set filter on search input', () => {
    fixture = TestBed.createComponent(BusinessList);
    component = fixture.componentInstance;
    const inputEvent = { target: { value: '  Test  ' } } as unknown as Event;
    component.onSearch(inputEvent);
    expect(component.dataSource.filter).toBe('test');
  });

  it('should navigate to details with id', () => {
    component.navigateToDetails('123');
    expect(router.navigate).toHaveBeenCalledWith(['/business-details', '123']);
  });
});

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

  it('should sort profiles A-Z by default', () => {
    service._profiles = [
      { id: '2', name: 'b', isActive: true },
      { id: '1', name: 'A', isActive: false },
    ];
    fixture = TestBed.createComponent(BusinessList);
    component = fixture.componentInstance;

    const names = component.dataSource.data.map((d: any) => d.name);
    expect(names).toEqual(['A', 'b']);
  });

  it('should reverse sort order when toggleSort is called (Z-A)', () => {
    service._profiles = [
      { id: '1', name: 'Alpha', isActive: true },
      { id: '2', name: 'beta', isActive: false },
      { id: '3', name: 'Charlie', isActive: true },
    ];
    fixture = TestBed.createComponent(BusinessList);
    component = fixture.componentInstance;

    // Default A-Z
    let names = component.dataSource.data.map((d: any) => d.name);
    expect(names).toEqual(['Alpha', 'beta', 'Charlie']);

    // Toggle to Z-A
    component.toggleSort();
    names = component.dataSource.data.map((d: any) => d.name);
    expect(names).toEqual(['Charlie', 'beta', 'Alpha']);
  });

  it('should filter profiles by status "active"', () => {
    service._profiles = [
      { id: '1', name: 'Active One', isActive: true },
      { id: '2', name: 'Inactive One', isActive: false },
      { id: '3', name: 'Active Two', isActive: true },
    ];
    fixture = TestBed.createComponent(BusinessList);
    component = fixture.componentInstance;

    component.setStatusFilter('active');

    const data = component.dataSource.data as any[];
    expect(data.every(d => d.isActive === true)).toBe(true);
    expect(data.map(d => d.name)).toEqual(['Active One', 'Active Two']);
  });

  it('should filter profiles by status "inactive"', () => {
    service._profiles = [
      { id: '1', name: 'Active One', isActive: true },
      { id: '2', name: 'Inactive One', isActive: false },
      { id: '3', name: 'Inactive Two', isActive: false },
    ];
    fixture = TestBed.createComponent(BusinessList);
    component = fixture.componentInstance;

    component.setStatusFilter('inactive');

    const data = component.dataSource.data as any[];
    expect(data.every(d => d.isActive === false)).toBe(true);
    expect(data.map(d => d.name)).toEqual(['Inactive One', 'Inactive Two']);
  });

  it('should reset paginator to first page on search', () => {
    fixture = TestBed.createComponent(BusinessList);
    component = fixture.componentInstance;

    const firstPage = vi.fn();
    // Set the paginator on the dataSource directly since onSearch checks dataSource.paginator
    (component.dataSource as any).paginator = { firstPage } as unknown as MatPaginator;

    component.onSearch({ target: { value: 'query' } } as unknown as Event);
    expect(firstPage).toHaveBeenCalledTimes(1);
  });

  it('should use custom filterPredicate to search across fields', () => {
    fixture = TestBed.createComponent(BusinessList);
    component = fixture.componentInstance;

    const item = { name: 'Acme', accountId: 'ACC-123', isActive: true } as any;
    const predicate = component.dataSource.filterPredicate;

    expect(predicate(item, 'acme')).toBe(true);
    expect(predicate(item, 'acc-123')).toBe(true);
    expect(predicate(item, 'missing-term')).toBe(false);
  });
});

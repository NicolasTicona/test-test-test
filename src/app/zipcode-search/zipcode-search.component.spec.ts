import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZipcodeSearchComponent } from './zipcode-search.component';

describe('ZipcodeSearchComponent', () => {
  let component: ZipcodeSearchComponent;
  let fixture: ComponentFixture<ZipcodeSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZipcodeSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZipcodeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

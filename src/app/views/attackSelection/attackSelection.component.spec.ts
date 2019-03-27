import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttackSelectionComponent } from './attackSelection.component';

describe('AttackSelectionComponent', () => {
  let component: AttackSelectionComponent;
  let fixture: ComponentFixture<AttackSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttackSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttackSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

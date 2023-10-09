import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilisateurDetailComponent } from './utilisateur-detail.component';

describe('UtilisateurDetailComponent', () => {
  let component: UtilisateurDetailComponent;
  let fixture: ComponentFixture<UtilisateurDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UtilisateurDetailComponent]
    });
    fixture = TestBed.createComponent(UtilisateurDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

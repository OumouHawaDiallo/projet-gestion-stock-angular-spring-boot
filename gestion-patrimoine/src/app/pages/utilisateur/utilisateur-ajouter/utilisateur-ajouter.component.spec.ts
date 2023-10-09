import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilisateurAjouterComponent } from './utilisateur-ajouter.component';

describe('UtilisateurAjouterComponent', () => {
  let component: UtilisateurAjouterComponent;
  let fixture: ComponentFixture<UtilisateurAjouterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UtilisateurAjouterComponent]
    });
    fixture = TestBed.createComponent(UtilisateurAjouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

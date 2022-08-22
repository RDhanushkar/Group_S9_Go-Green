import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FertilizerCalculatorPage } from './fertilizer-calculator.page';

describe('FertilizerCalculatorPage', () => {
  let component: FertilizerCalculatorPage;
  let fixture: ComponentFixture<FertilizerCalculatorPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FertilizerCalculatorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FertilizerCalculatorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

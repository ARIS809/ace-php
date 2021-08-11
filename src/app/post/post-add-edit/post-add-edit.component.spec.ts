import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAddEditComponent } from './post-add-edit.component';

describe('PostAddEditComponent', () => {
  let component: PostAddEditComponent;
  let fixture: ComponentFixture<PostAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

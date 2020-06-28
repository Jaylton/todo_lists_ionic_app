import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { AuthProvider } from 'src/app/core/services/auth.types';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  authForm: FormGroup;
  authProviders = AuthProvider;
  configs = {
    isSignIn: true,
    action: 'Login',
    actionChange: 'Create account',
  };
  private nameControl = new FormControl('', [Validators.required, Validators.minLength(3)]);

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private authService: AuthService,
    private overlayService: OverlayService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm() {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    if (localStorage.getItem('user')) {
      this.authForm.setValue({ email: JSON.parse(localStorage.getItem('user')).email, password: JSON.parse(localStorage.getItem('user')).password });
      this.onSubmit(this.authProviders.Email);
    }
  }

  get name(): FormControl {
    return <FormControl>this.authForm.get('name');
  }
  get email(): FormControl {
    return <FormControl>this.authForm.get('email');
  }

  get password(): FormControl {
    return <FormControl>this.authForm.get('password');
  }

  changeAuthAction() {
    this.configs.isSignIn = !this.configs.isSignIn;
    const { isSignIn } = this.configs;
    this.configs.action = isSignIn ? 'Login' : 'Sign Up';
    this.configs.actionChange = isSignIn ? 'Create account' : 'Already have an account';
    !isSignIn ? this.authForm.addControl('name', this.nameControl) : this.authForm.removeControl('name');
  }

  async onSubmit(provider: AuthProvider): Promise<void> {
    const loading = await this.overlayService.loading();
    try {
      if (!localStorage.getItem('user')) {
        localStorage.setItem('user', JSON.stringify(this.authForm.value))
      }
      const credentials = await this.authService.authentication({
        isSignIn: this.configs.isSignIn,
        user: this.authForm.value,
        provider,
      });

      this.navCtrl.navigateForward(this.route.snapshot.queryParamMap.get('redirect') || '/tasks');
    } catch (error) {
      console.log('Auth error');
      await this.overlayService.toast({
        message: error.message,
      });
    } finally {
      loading.dismiss();
    }
  }
}

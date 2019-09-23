<template>
  <div class="container d-flex justify-content-center">
    <b-col lg="5">
      <div class="card shadow border-0">
        <div class="auth card-header bg-white shadow pb-5">
          <b-col md="12">
            <b-alert v-model="form.errors.status"
                     variant="danger"
                     class="text-left"
                     dismissible>{{ form.errors.message }}</b-alert>
          </b-col>
          <b-col md="12" class="auth-social pb-3">
            <button @click="authProvider('facebook')"
                    v-if="!$store.state.auth.isAuthenticated"
                    class="btn btn-facebook"
            >Sign up via Facebook</button>
          </b-col>
          <b-col md="12" class="d-flex pb-3">
            <b-col md="4" class="middle-line p-0"></b-col>
            <b-col md="4" class="">
              <small>or with email</small>
            </b-col>
            <b-col md="4" class="middle-line p-0"></b-col>
          </b-col>
          <b-col md="12">
            <ValidationObserver
              ref="signUpForm"
              v-slot="{ invalid }"
              @submit.prevent="register()">
              <b-form>
                <b-form-group>
                  <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
                    <b-form-input
                      v-model="form.email"
                      type="email"
                      name="email"
                      placeholder="Enter email"
                    ></b-form-input>
                    <b-form-invalid-feedback :state="!errors[0]" class="text-left">
                      {{ errors[0] }}
                    </b-form-invalid-feedback>
                  </ValidationProvider>
                </b-form-group>

                <b-form-group>
                  <ValidationProvider name="name" rules="required" v-slot="{ errors }">
                    <b-form-input
                      v-model="form.name"
                      name="name"
                      placeholder="Enter name"
                    ></b-form-input>
                    <b-form-invalid-feedback :state="!errors[0]" class="text-left">
                      {{ errors[0] }}
                    </b-form-invalid-feedback>
                  </ValidationProvider>
                </b-form-group>

                <b-form-group>
                  <ValidationProvider name="password" rules="required|min:8" v-slot="{ errors }">
                    <b-form-input
                      type="password"
                      v-model="form.password"
                      name="password"
                      placeholder="Enter password"
                    ></b-form-input>
                    <b-form-invalid-feedback :state="!errors[0]" class="text-left">
                      {{ errors[0] }}
                    </b-form-invalid-feedback>
                  </ValidationProvider>
                </b-form-group>

                <button type="submit" class="btn btn-login mt-3">Sign up</button>
              </b-form>
            </ValidationObserver>
          </b-col>
        </div>
      </div>
    </b-col>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import {
  ValidationProvider, ValidationObserver, setInteractionMode, extend,
} from 'vee-validate';
import { required, email, min } from 'vee-validate/dist/rules';
import { SOCIAL_LOGIN_REQUEST, AUTH_SET_TOKEN } from '@/store/actions/auth';
import { SET_USER_REQUEST } from '@/store/actions/user';

setInteractionMode('eager');

extend('required', required);
extend('email', email);
extend('min', min);

export default {
  name: 'AuthSignUp',
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      form: {
        email: '',
        name: '',
        password: '',
        errors: {
          status: false,
          message: '',
        },
      },
    };
  },
  methods: {
    ...mapActions({
      socialLogin: SOCIAL_LOGIN_REQUEST,
      setUser: SET_USER_REQUEST,
    }),

    authProvider(provider) {
      this.$auth.authenticate(provider)
        .then((socialToken) => {
          this.socialLogin({ provider, socialToken }).then(() => {
            this.$router.push('/user-welcome');
          });
        })
        .catch((err) => {
          this.form.errors.status = true;
          this.form.errors.message = err.message;
        });
    },

    async register() {
      const isValid = await this.$refs.signUpForm.validate();

      if (!isValid) {
        return;
      }

      this.axios.post('/auth/register', this.form)
        .then((resp) => {
          this.$store.dispatch(AUTH_SET_TOKEN, resp.data.token);
          this.setUser();
          this.$router.push('/user-welcome');
        })
        .catch((err) => {
          this.form.errors.status = true;
          this.form.errors.message = err.message;
        });
    },
  },
};
</script>

<style lang="scss">
  .auth {
    border: 1px solid #e9eaef;
    padding: 40px 40px 30px 40px;
  }

  .btn {
    width: 100%;
    border-radius: 0;
    padding-top: 7px;
    padding-bottom: 7px;
    font-size: 16px;
    font-weight: bold;
    &-facebook {
      color: #fff;
      background-color: #4266b2;

      &:hover {
        color: #fff;
        background-color: #365899;
      }
    }

    &-login {
      color: #fff;
      background-color: #7b53c1;

      &:hover {
        color: #fff;
        background-color: #623ca5;
      }
    }
  }

  .middle-line {
    &:before {
      content: '';
      width: 100%;
      height: 0;
      border-top: 1px solid #e9eaef;
      display: block;
      position: absolute;
      top: 50%;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
    }
  }
  .shadow {
    box-shadow: 0 0 2rem 0 rgba(136,152,170,.15)!important;
  }
</style>

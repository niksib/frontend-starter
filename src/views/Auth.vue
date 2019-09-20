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
            >Sign in via Facebook</button>
          </b-col>
          <b-col md="12" class="d-flex pb-3">
            <b-col md="4" class="middle-line p-0"></b-col>
            <b-col md="4" class="">
              <small>or with email</small>
            </b-col>
            <b-col md="4" class="middle-line p-0"></b-col>
          </b-col>
          <b-col md="12">
            <b-form @click="authProvider('default')">
              <b-form-group>
                <b-form-input
                  v-model="form.email"
                  type="email"
                  required
                  placeholder="Enter email"
                ></b-form-input>
              </b-form-group>

              <b-form-group>
                <b-form-input
                  type="password"
                  v-model="form.password"
                  required
                  placeholder="Enter password"
                ></b-form-input>
              </b-form-group>

              <button type="submit" class="btn btn-login mt-3">Sign in</button>
            </b-form>
          </b-col>
        </div>
      </div>
    </b-col>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { SOCIAL_LOGIN_REQUEST } from '../store/actions/auth';

export default {
  name: 'auth',
  data() {
    return {
      form: {
        email: '',
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

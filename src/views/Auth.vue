<template>
    <v-container class="authentication" fill-height grid-list-md text-xs-center>
        <v-layout row wrap align-center>
            <v-row>
                <v-col cols="12">
                    <v-row align="center" justify="center">
                        <ValidationObserver key=1 v-if="switchForm" class="authentication-login-form" ref="observerLogin" v-slot="{ invalid, validate }"  @submit.prevent="login()">
                            <v-form class="form">
                                <h3 class="headline authentication-title">Login</h3>

                                <ValidationProvider v-slot="{ errors }" name="email" rules="required|email">
                                    <v-text-field
                                        ref="email"
                                        v-model="user.email"
                                        :error-messages="errors"
                                        label="Email..."
                                        prepend-icon="fas fa-envelope"
                                        class="mb-5"
                                    ></v-text-field>
                                </ValidationProvider>

                                <ValidationProvider v-slot="{ errors }" name="password" rules="required|min:6">
                                    <v-text-field
                                        ref="password"
                                        v-model="user.password"
                                        :error-messages="errors"
                                        label="Password..."
                                        prepend-icon="fas fa-lock"
                                        :append-icon="isPasswordVisible ? 'fas fa-eye' : 'fas fa-eye-slash'"
                                        @click:append="isPasswordVisible = !isPasswordVisible"
                                        :type="isPasswordVisible ? 'text' : 'password'"
                                        class="mb-2"
                                    ></v-text-field>
                                </ValidationProvider> 

                                <v-btn @click="validate().then(login)" :disabled="invalid" color="primary" text block>Lets go</v-btn>
                                <div class="text-center caption grey--text text--lighten-1 my-1">- <span>or</span> -</div>
                                <div class="caption text-center grey--text text--darken-1">If you aren't registered yet, do it <span @click="showForm" class="cursor-pointer secondary--text font-weight-medium">here</span>!</div>
                            </v-form>
                        </ValidationObserver>

                        <ValidationObserver key=2 v-else class="authentication-register-form" ref="observer" v-slot="{ invalid, validate }"  @submit.prevent="register()">
                            <v-form class="form">
                                <h3 class="display-1 font-weight-bold text-center mb-12">Register</h3>

                                <ValidationProvider v-slot="{ errors }" name="name" rules="required">
                                    <v-text-field
                                        v-model="userRegister.name"
                                        :error-messages="errors"
                                        label="Name..."
                                        prepend-icon="fas fa-user"
                                        class="mb-5"
                                    ></v-text-field> 
                                </ValidationProvider>

                                <ValidationProvider v-slot="{ errors }" name="email" rules="required|email">
                                    <v-text-field
                                        v-model="userRegister.email"
                                        :error-messages="errors"
                                        label="Email..."
                                        prepend-icon="fas fa-envelope"
                                        class="mb-5"
                                    ></v-text-field>
                                </ValidationProvider>
                                
                                <ValidationProvider v-slot="{ errors }" name="education-start-date" rules="required">
                                    <v-dialog
                                        ref="date1"
                                        :close-on-content-click="false"
                                        :return-value.sync="userRegister.educationStartDate"
                                        width="290px"
                                    >
                                        <template v-slot:activator="{ on }">
                                        <v-text-field
                                            v-model="userRegister.educationStartDate"
                                            :error-messages="errors"
                                            label="Education Start Date"
                                            prepend-icon="far fa-calendar"
                                            readonly
                                            v-on="on"
                                            class="mb-5"
                                        ></v-text-field>
                                        </template>
                                        <v-date-picker :min="minDate" v-model="date1" color="primary" header-color="secondary" scrollable>
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="$refs.date1.save(date1)">OK</v-btn>
                                        </v-date-picker>
                                    </v-dialog>
                                </ValidationProvider>

                                <ValidationProvider v-slot="{ errors }" name="education-end-date" rules="required">
                                    <v-dialog
                                        ref="date2"
                                        :close-on-content-click="false"
                                        :return-value.sync="userRegister.educationEndDate"
                                        width="290px"
                                    >
                                        <template v-slot:activator="{ on }">
                                        <v-text-field
                                            v-model="userRegister.educationEndDate"
                                            :error-messages="errors"
                                            label="Education End Date"
                                            prepend-icon="far fa-calendar"
                                            readonly
                                            v-on="on"
                                            class="mb-5"
                                        ></v-text-field>
                                        <!-- :disabled="toggleDisable" -->
                                        </template>
                                        <v-date-picker :min="userRegister.educationStartDate" v-model="date2" color="primary" header-color="secondary" scrollable>
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="$refs.date2.save(date2)">OK</v-btn>
                                        </v-date-picker>
                                    </v-dialog> 
                                </ValidationProvider>
                                
                                <ValidationProvider v-slot="{ errors }" name="password" rules="required|min:6|confirmed:confirmation">                                                   
                                    <v-text-field
                                        v-model="userRegister.password"
                                        :error-messages="errors"
                                        label="Password..."
                                        prepend-icon="fas fa-lock"
                                        :append-icon="isPasswordVisible ? 'fas fa-eye' : 'fas fa-eye-slash'"
                                        @click:append="isPasswordVisible = !isPasswordVisible"
                                        :type="isPasswordVisible ? 'text' : 'password'"
                                        class="mb-5"
                                    ></v-text-field>
                                </ValidationProvider>

                                <ValidationProvider v-slot="{ errors }" name="confirm-password" vid="confirmation">  
                                    <v-text-field
                                        v-model="userRegister.confirmPassword"
                                        :error-messages="errors"
                                        label="Confirm Password..."
                                        prepend-icon="fas fa-lock"
                                        :append-icon="isPasswordVisible ? 'fas fa-eye' : 'fas fa-eye-slash'"
                                        @click:append="isPasswordVisible = !isPasswordVisible"
                                        :type="isPasswordVisible ? 'text' : 'password'"
                                    ></v-text-field> 
                                </ValidationProvider>

                                <ValidationProvider v-slot="{ errors }" name="terms-and-voditions-agreement" rules="required">
                                    <v-checkbox class="mt-0 mb-5" v-model="userRegister.tcCheck" :error-messages="errors" color="secondary" required>
                                        <template v-slot:label>
                                            <div class="body-2 grey--text">I agree to the <a target="_blank" href="#" @click.stop class="secondary--text">terms and conditions</a></div>
                                        </template>
                                    </v-checkbox>
                                </ValidationProvider>

                                <div class="text-center">
                                    <v-btn @click="validate().then(register)" large rounded color="secondary" dark :disabled="invalid">Get Started</v-btn>
                                </div>
                                <div class="text-center caption grey--text text--lighten-1 my-1">- <span>or</span> -</div>
                                <div class="caption text-center grey--text text--darken-1">If you allready have an account, login <span @click="showForm" class="cursor-pointer secondary--text font-weight-medium">here</span>!</div>
                            </v-form>
                        </ValidationObserver>
                    </v-row>
                </v-col>
            </v-row>
        </v-layout>
    </v-container>
</template>

<script>
    import Constants from '../services/Constants'
    import AuthService from '../services/AuthService'
    import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
    import { required, email, min, confirmed } from 'vee-validate/dist/rules'

    setInteractionMode('eager')

    extend('required', {
        ...required,
        message: '{_field_} can not be empty',
    })

    extend('min', {
        ...min,
        message: '{_field_} may not be shorter than {length} characters',
    })

    extend('email', {
        ...email,
        message: 'Email must be valid',
    }) 
    
    extend('confirmed', {
        ...confirmed,
        message: '{_field_} does not match',
    })       

    export default {
        name: 'auth',
        components: {
            ValidationProvider,
            ValidationObserver,
        },           
        data: function () {
            return {
                constants: Constants,
                switchForm: true,
                user: {
                    email: null,
                    password: null,
                },
                userRegister: {
                    name: null,
                    email: null,
                    educationStartDate: null,
                    educationEndDate: null,
                    password: null,
                    confirmPassword: null,
                    tcCheck: null,
                },
                date1: new Date().toISOString().substr(0, 10),
                date2: '',
                toggleDisable: true,
                isPasswordVisible: false,
                dictionary: null
            }
        },
        computed: {
            minDate() {
                return new Date().toISOString().substr(0, 10);
            },
        }, 
        watch: {
            'userRegister.educationStartDate': function(newVal, oldVal) {
                console.log('value changed from ' + oldVal + ' to ' + newVal);
            }
        },
        methods: {
            showForm() {
                this.switchForm = !this.switchForm;
                return this.switchForm;
            },
            login() {
                let user = {
                    email: this.user.email,
                    password: this.user.password
                }

                AuthService.login(this.user)
                .then(result => this.$router.push({name: Constants.ROUTES.PRODUCTS}))
                .catch(function(error) {
                    console.error(error);
                }); 
            },
            register() {
                let newUser = {
                    name: this.userRegister.name,
                    email: this.userRegister.email,
                    password: this.userRegister.password,
                    password_confirmation: this.userRegister.confirmPassword,
                    education_start_date: this.userRegister.educationStartDate,
                    education_end_date: this.userRegister.educationEndDate,
                    terms: this.userRegister.tcCheck,
                }

                AuthService.registerUser(newUser)
                .then(result => {
                    console.log('User registered succesfully');
                    this.$router.push({
                        name: Constants.ROUTES.AUTH
                    });
                })
                .catch(function(error) {
                    console.error(error);
                });
            }
        }
    }
</script>
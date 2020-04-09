<template>
    <v-container class="authentication" fill-height grid-list-md text-xs-center>
        <v-layout row wrap align-center>
            <v-row>
                <v-col cols="12">
                    <v-row align="center" justify="center">
                        <v-form v-if="switchForm" class="form authentication-login-form" @submit.prevent="login">
                            <h3 class="headline authentication-title">Login</h3>
                            <v-text-field
                                ref="email"
                                v-model="user.email"
                                label="Email..."
                                prepend-icon="fas fa-envelope"
                                class="mb-5"
                            ></v-text-field>
                            <v-text-field
                                ref="password"
                                v-model="user.password"
                                label="Password..."
                                prepend-icon="fas fa-lock"
                                :append-icon="isPasswordVisible ? 'fas fa-eye' : 'fas fa-eye-slash'"
                                @click:append="isPasswordVisible = !isPasswordVisible"
                                :type="isPasswordVisible ? 'text' : 'password'"
                                class="mb-2"
                            ></v-text-field>                            
                            <!-- <v-text-field
                                    ref="username"
                                    v-validate="'required|min:2|max:100'"
                                    v-model="user.username"
                                    label="Username"
                                    :error-messages="errors.collect('username')"
                                    data-vv-name="username"
                                    prepend-icon="fas fa-user"
                                    required
                            ></v-text-field>
                            <v-text-field
                                    ref="password"
                                    v-validate="{ rules: {required: true, regex: /(?=^.{8,32}$)(?=.*[0-9!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/} }"
                                    v-model="user.password"
                                    label="Password"
                                    :error-messages="errors.collect('password')"
                                    data-vv-name="password"
                                    prepend-icon="fas fa-lock"
                                    :append-icon="isPasswordVisible ? 'fas fa-eye' : 'fas fa-eye-slash'"
                                    @click:append="isPasswordVisible = !isPasswordVisible"
                                    :type="isPasswordVisible ? 'text' : 'password'"
                            ></v-text-field> -->
                            <v-btn @click="login" color="primary" text block>Lets go</v-btn>
                            <div class="text-center caption grey--text text--lighten-1 my-1">- <span>or</span> -</div>
                            <div class="caption text-center grey--text text--darken-1">If you aren't registered yet, do it <span @click="showForm" class="cursor-pointer secondary--text font-weight-medium">here</span>!</div>
                        </v-form>

                        <v-form v-else class="form authentication-register-form" @submit.prevent="register">
                            <h3 class="display-1 font-weight-bold text-center mb-12">Register</h3>
                            <v-text-field
                                ref="name"
                                v-model="userRegister.name"
                                label="Name..."
                                prepend-icon="fas fa-user"
                                class="mb-5"
                            ></v-text-field>                            
                            <v-text-field
                                ref="email"
                                v-model="userRegister.email"
                                label="Email..."
                                prepend-icon="fas fa-envelope"
                                class="mb-5"
                            ></v-text-field>
                            <v-dialog
                                ref="date1"
                                v-model="modal1"
                                :return-value.sync="userRegister.educationStartDate"
                                persistent
                                width="290px"
                            >
                                <template v-slot:activator="{ on }">
                                <v-text-field
                                    v-model="userRegister.educationStartDate"
                                    label="Education Start Date"
                                    prepend-icon="far fa-calendar"
                                    readonly
                                    v-on="on"
                                    class="mb-5"
                                ></v-text-field>
                                </template>
                                <v-date-picker v-model="date1" color="primary" header-color="secondary" scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="modal1 = false">Cancel</v-btn>
                                <v-btn text color="primary" @click="$refs.date1.save(date1)">OK</v-btn>
                                </v-date-picker>
                            </v-dialog>
                            <v-dialog
                                ref="date2"
                                v-model="modal2"
                                :return-value.sync="userRegister.educationEndDate"
                                persistent
                                width="290px"
                            >
                                <template v-slot:activator="{ on }">
                                <v-text-field
                                    v-model="userRegister.educationEndDate"
                                    label="Education End Date"
                                    prepend-icon="far fa-calendar"
                                    readonly
                                    v-on="on"
                                    class="mb-5"
                                ></v-text-field>
                                </template>
                                <v-date-picker v-model="date2" color="primary" header-color="secondary" scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="modal2 = false">Cancel</v-btn>
                                <v-btn text color="primary" @click="$refs.date2.save(date2)">OK</v-btn>
                                </v-date-picker>
                            </v-dialog>                                                    
                            <v-text-field
                                ref="password"
                                v-model="userRegister.password"
                                label="Password..."
                                prepend-icon="fas fa-lock"
                                :append-icon="isPasswordVisible ? 'fas fa-eye' : 'fas fa-eye-slash'"
                                @click:append="isPasswordVisible = !isPasswordVisible"
                                :type="isPasswordVisible ? 'text' : 'password'"
                                class="mb-5"
                            ></v-text-field>
                            <v-text-field
                                ref="confirmPassword"
                                v-model="userRegister.confirmPassword"
                                label="Confirm Password..."
                                prepend-icon="fas fa-lock"
                                :append-icon="isPasswordVisible ? 'fas fa-eye' : 'fas fa-eye-slash'"
                                @click:append="isPasswordVisible = !isPasswordVisible"
                                :type="isPasswordVisible ? 'text' : 'password'"
                            ></v-text-field>                              
                            <v-checkbox class="mt-0 mb-5" v-model="tcCheck" color="secondary">
                                <template v-slot:label>
                                    <div class="body-2 grey--text">I agree to the <a target="_blank" href="#" @click.stop class="secondary--text">terms and conditions</a></div>
                                </template>
                            </v-checkbox>
                            <div class="text-center">
                                <v-btn @click="register" large rounded color="secondary" dark>Get Started</v-btn>
                            </div>
                            <div class="text-center caption grey--text text--lighten-1 my-1">- <span>or</span> -</div>
                            <div class="caption text-center grey--text text--darken-1">If you allready have an account, login <span @click="showForm" class="cursor-pointer secondary--text font-weight-medium">here</span>!</div>
                        </v-form>
                    </v-row>
                </v-col>
            </v-row>
        </v-layout>
    </v-container>
</template>

<script>
    import Constants from '../services/Constants';
    import AuthService from '../services/AuthService';

    export default {
        name: 'auth',
        // $_veeValidate: {
        //     validator: 'new'
        // },
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
                    confirmPassword: null
                },
                date1: new Date().toISOString().substr(0, 10),
                date2: new Date().toISOString().substr(0, 10),
                modal1: false,
                modal2: false,
                tcCheck: false,
                isPasswordVisible: false,
                dictionary: null
            }
        },
        mounted () {
            // this.dictionary = {
            //     custom: {
            //         username: {
            //             required: () => 'This field is empty',
            //             min: 'This field must not contain less than 2 characters',
            //             max: 'This field may not be greater than 100 characters'
            //         },
            //         password: {
            //             required: () => 'This field is empty',
            //             regex: 'This field must not contain less than 8 characters, one symbol character and one capital letter',
            //         }
            //     }
            // };
            // this.$validator.localize('en', this.dictionary)
        },
        methods: {
            showForm() {
                this.switchForm = !this.switchForm;
                return this.switchForm;
            },
            login() {
                let user = {
                    username: this.user.username,
                    password: this.user.password
                }

                AuthService.login(this.user)
                .then(result => this.$router.push({name: Constants.ROUTES.PRODUCTS}))
                .catch(error => {
                    if(error.message) {
                        window.epicAlert(error.message, 'error', 3500);
                    }
                });  
            },
            register() {

            }
        }
    }
</script>
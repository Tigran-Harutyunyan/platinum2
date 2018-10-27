import {
    required,
    minLength,
    email,
    sameAs
} from 'vuelidate/lib/validators';
export default {
    data() {
        return {
            isLoading: false,
            first_name: '',
            last_name: '',
            company_name: '',
            email: '',
            receive_promotions: false, 
            birthday_at: '',
            phone: '',
            pickerOptions: {
                format: 'yyyy-MM-dd'
            }
        };
    },
    computed: {
        isFormValid() {
            return !this.$v.$invalid;
        },
        user() {
            return this.$store.getters.getUser;
        },
        token(){
            return this.$store.getters.getToken;
        }
    },
    methods: {

        _fillForm(){

            this.first_name = this.user.first_name;
            this.last_name = this.user.last_name;
            this.phone = this.user.phone;
            this.birthday_at = this.user.birthday_at;
            this.email = this.user.email;
            this.company_name = this.user.company_name; 
            this.receive_promotions = this.user.receive_promotions === 1 ? true : false;

        },

        updateProfileInfo() {

            if (!this.isLoading && this.isFormValid) {
                this.isLoading = true;
                let data = {
                    email: this.email,
                    first_name: this.first_name,
                    last_name: this.last_name,
                    company_name: this.company_name,
                    phone: this.phone,
                    receive_promotions: this.receive_promotions ? 1 : 0,
                    token: this.token
                };

                if (this.birthday_at) {
                    data.birthday_at = this.birthday_at;
                }

                this.$store.dispatch('updateProfileInfo', data).then((response) => {

                    this.isLoading = false;

                    if (response.error) {

                        this.$notify.error({ 
                            message: response.message ? response.message : 'Failed to edit the profile',
                            position: 'bottom-right' 
                        });

                    } else {

                        this.$notify.success({ 
                            message: 'Edit profile success!',
                            position: 'bottom-right' 
                        }); 

                    }
                }).catch((error) => {

                    this.isLoading = false;
                    
                });
            }
        }
    },
    mounted() {
        if (this.user) {
            this._fillForm();
        }
    },

    validations: {
        first_name: {
            required
        },
        last_name: {
            required
        },
        email: {
            required,
            email
        },
        company_name: {
            required
        },
        phone: {
            required
        }
    }
};

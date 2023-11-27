<template>
    <v-card :variant="tonal" class="mx-auto pa-4" width="500">
        <v-card-item>
            <v-form @submit.prevent>
                <v-text-field
                    name="email"
                    variant="outlined"
                    placeholder="Enter email"
                ></v-text-field>
                <v-text-field
                    name="password"
                    variant="outlined"
                    placeholder="Enter password"
                ></v-text-field>
                <v-btn round color="primary" dark block>Login</v-btn>
            </v-form>

            <v-container class="fill-height align-center justify-center">
                <a href="">Forgot Password?</a>
            </v-container>
            <v-divider></v-divider>
            <RegisterForm></RegisterForm>
            <!-- <v-btn round color="success" dark block>Register</v-btn> -->
        </v-card-item>
    </v-card>
</template>

<script setup>
    import RegisterForm from './RegisterForm.vue';
</script>
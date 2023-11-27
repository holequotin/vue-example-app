<template>
    <v-dialog v-model="dialog" persistent width="1024">
        <template v-slot:activator="{ props }">
            <v-btn color="success" v-bind="props" block>
                Create an account
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="text-h5">Create an account</span>
            </v-card-title>
            <v-card-subtitle>

                Fast and easy
            </v-card-subtitle>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field label="Legal first name*" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field label="Legal last name*" hint="example of persistent helper text" persistent-hint
                                required></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field label="Email*" required></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field label="Password*" type="password" required></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field label="Confirm Password*" type="password" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-select :items="['Men', 'Women']" label="Gender*" required></v-select>
                        </v-col>
                        <v-col cols="12" sm="12">
                            <v-btn round color="primary" dark block type="submit">Register</v-btn>
                        </v-col>
                    </v-row>
                </v-container>
                <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                    Close
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref } from 'vue'
const dialog = ref(false)
</script>
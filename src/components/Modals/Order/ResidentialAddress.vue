<template>
    <v-dialog
        v-model="isOpen"
        persistent
        max-width="500"
    >
        <v-card>
            <v-card-title class="text-h5">
                <span>Residential address</span>
                <v-spacer></v-spacer>
                <v-btn icon depressed @click="closeModal">
                    <v-icon>fas fa-times</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <div class="col-12">
                    <v-text-field
                        label="Street Name"
                        outlined
                        dense
                        hide-details
                    ></v-text-field>
                </div>
                <div class="col-12">
                    <v-text-field
                        label="Street Number"
                        outlined
                        dense
                        hide-details
                    ></v-text-field>
                </div>
                <div class="col-12">
                    <v-text-field
                        label="City"
                        outlined
                        dense
                        hide-details
                    ></v-text-field>
                </div>
                <div class="col-12">
                    <v-text-field
                        label="Province"
                        outlined
                        dense
                        hide-details
                    ></v-text-field>
                </div>
                <div class="col-12">
                    <v-text-field
                        label="ZIP code"
                        outlined
                        dense
                        hide-details
                    ></v-text-field>
                </div>
            </v-card-text>
            <v-card-actions class="py-6">
                <v-spacer></v-spacer>
                <v-btn
                    color="grey lighten-1"
                    class="white--text"
                    small
                    depressed
                    @click="closeModal"
                >
                    Cancel
                </v-btn>
                <v-btn
                    color="orange accent-4"
                    class="white--text"
                    small
                    depressed
                    @click="closeModal"
                >
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from "vue-property-decorator";

@Component({})

export default class ResidentialAddress extends Vue {
    @Prop() private isOpen!: boolean;
    @Emit('closeModal')
    closeModal() {
        return true
    }
}
</script>

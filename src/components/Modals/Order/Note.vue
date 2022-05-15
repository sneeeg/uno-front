<template>
    <v-dialog
        v-model="isOpen"
        persistent
        max-width="500"
    >
        <v-card>
            <v-card-title class="text-h5">
                <span>Note</span>
                <v-spacer></v-spacer>
                <v-btn icon depressed @click="closeModal">
                    <v-icon>fas fa-times</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <div class="col-12">
                    <v-textarea
                        outlined
                        name="note"
                        label="Note text"
                        hide-details
                    ></v-textarea>
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

export default class Note extends Vue {
    @Prop() private isOpen!: boolean;
    @Emit('closeModal')
    closeModal() {
        return true
    }
}
</script>

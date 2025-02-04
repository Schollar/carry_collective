<template>
    <v-dialog :model-value="visible" @update:model-value="updateVisibility" max-width="500px">
        <v-card class="dialog-card">
            <v-card-title class="headline">Request Bag</v-card-title>
            <v-card-text>
                <!-- Character Name Input -->
                <v-text-field v-model="requesterName" label="Character Name" outlined dense
                    :rules="[requiredRule]"></v-text-field>

                <!-- Quantity Input -->
                <v-text-field v-model.number="requestQuantity" label="Quantity" type="number" outlined dense
                    :rules="[requiredRule, positiveNumberRule]"></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-btn text @click="closeDialog">Cancel</v-btn>
                <v-btn text @click="sendRequest" :disabled="!isFormValid">Send Request</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

</template>

<script>
export default {
    props: {
        visible: Boolean, // Prop to control dialog visibility
        selectedBag: Object, // Prop for the selected bag
    },
    emits: ['update:visible', 'send-request'], // Declare emitted events
    data() {
        return {
            requesterName: '',
            requestQuantity: 0,
        };
    },
    computed: {
        // Validate the form
        isFormValid() {
            return (
                this.requesterName.trim() !== '' &&
                this.requestQuantity > 0 &&
                this.selectedBag
            );
        },
        // Validation rules
        requiredRule() {
            return (value) => !!value || 'This field is required.';
        },
        positiveNumberRule() {
            return (value) => value > 0 || 'Quantity must be greater than 0.';
        },
    },
    methods: {
        // Update visibility
        updateVisibility(value) {
            this.$emit('update:visible', value);
        },
        // Close the dialog
        closeDialog() {
            this.$emit('update:visible', false);
            this.resetForm(); // Reset the form when closing
        },
        // Send the request
        sendRequest() {
            if (!this.isFormValid) return; // Prevent sending invalid requests

            this.$emit('send-request', {
                bagName: this.selectedBag.name,
                quantity: this.requestQuantity,
                requester: this.requesterName,
            });
            this.closeDialog(); // Close the dialog after sending the request
        },
        // Reset the form
        resetForm() {
            this.requesterName = '';
            this.requestQuantity = 0;
        },
    },
};
</script>

<style scoped>
.dialog-card {
    padding: 16px;
}
</style>
<template>
    <v-list-item :class="itemClass">
        <v-row class="d-flex align-center">
            <v-col cols="12" sm="12" md="2">
                <strong>Order #{{ order.id }}</strong>
                <div><small>Placed: {{ formatDate(order.createdAt) }}</small></div>
            </v-col>

            <v-col cols="12" sm="12" :md="isAdmin ? 2 : 3">
                <strong>Character:</strong> <span>{{ order.requester }}</span>
            </v-col>

            <v-col cols="12" sm="12" :md="isAdmin ? 2 : 3">
                <v-list-item-title class="text-h6">{{ order.bagName }}</v-list-item-title>
                <v-list-item-subtitle>Quantity: {{ order.quantity }}</v-list-item-subtitle>
            </v-col>

            <v-col cols="12" sm="12" :md="isAdmin ? 2 : 3">
                <strong>Status:</strong>
                <v-chip :color="getStatusColor(order.status)" small>{{ order?.status.charAt(0).toUpperCase() +
                    order?.status.slice(1) }}
                </v-chip>
            </v-col>

            <v-col v-if="isAdmin && order.status !== 'delivered'" cols="12" sm="12" md="4"
                class="d-flex justify-center">
                <v-btn color="primary" @click="approveOrder(order.id)" class="mr-2">Complete</v-btn>
                <v-btn color="error" @click="cancelOrder(order.id)">Cancel</v-btn>
            </v-col>
        </v-row>

    </v-list-item>



</template>

<script>
export default {
    props: {
        order: Object,
        isAdmin: Boolean,
        index: Number, // Add index prop for row coloring
    },
    computed: {
        itemClass() {
            // Alternate row colors based on index
            return this.index % 2 === 0 ? 'bg-blue-grey-darken-3' : 'bg-grey-darken-4';
        },
    },
    methods: {
        formatDate(dateString) {
            const date = new Date(dateString);
            const today = new Date();
            const diffTime = today.setHours(0, 0, 0, 0) - date.setHours(0, 0, 0, 0);
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays === 0) return 'Today';
            if (diffDays === 1) return '1 day ago';
            return `${diffDays} days ago`;
        },
        getStatusColor(status) {
            switch (status.toLowerCase()) {
                case 'pending':
                    return 'orange';
                case 'delivered':
                    return 'green';
                case 'cancelled':
                    return 'red';
                case 'shipped':
                    return 'blue';
                default:
                    return 'grey';
            }
        },
        approveOrder(orderId) {
            this.$emit('approve-order', orderId);
        },
        cancelOrder(orderId) {
            this.$emit('cancel-order', orderId);
        },
    },
};
</script>
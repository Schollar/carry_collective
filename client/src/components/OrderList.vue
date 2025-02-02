<template>
    <v-row justify="center">
        <v-col cols="10" sm="10" md="10" lg="8">

            <v-card class="mt-4 elevation-2">
                <v-card-title class="text-h6">📦 Current Orders ({{ orders.length ?? 0 }})</v-card-title>
                <v-divider></v-divider>
                <v-list v-if="orders.length" density="compact">
                    <OrderItem v-for="(order, index) in orders" :key="order.id" :order="order" :isAdmin="isAdmin"
                        :index="index" @approve-order="approveOrder" @cancel-order="cancelOrder" />
                </v-list>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import OrderItem from '@/components/OrderItem.vue';

export default {
    components: {
        OrderItem,
    },
    props: {
        orders: Array,
        isAdmin: Boolean,
    },
    methods: {
        approveOrder(orderId) {
            this.$emit('approve-order', orderId);
        },
        cancelOrder(orderId) {
            this.$emit('cancel-order', orderId);
        },
    },
};
</script>
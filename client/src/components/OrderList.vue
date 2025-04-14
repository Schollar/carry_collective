<template>
    <v-row justify="center">
        <v-col cols="10" sm="10" md="10" lg="8">
            <!-- 🔴 Active Orders -->
            <v-card class="mt-4 elevation-2">
                <v-card-title class="text-h6">
                    📦 Current Orders ({{ activeOrders.length }})
                </v-card-title>
                <v-divider></v-divider>

                <v-list v-if="activeOrders.length" density="compact">
                    <OrderItem v-for="order in activeOrders" :key="order.id" :order="order" :isAdmin="isAdmin"
                        @approve-order="approveOrder" @cancel-order="cancelOrder" @order-sent="orderSent" />
                </v-list>
                <v-card-text v-else>
                    No active orders.
                </v-card-text>
            </v-card>

            <!-- 🕊️ "Carrier Pigeon on the Way" Orders (Pending) -->
            <v-card class="mt-4 elevation-2">
                <v-card-title class="text-h6">
                    🕊️ Carrier Pigeon on the Way ({{ inTheAirOrders.length }})
                </v-card-title>
                <v-divider></v-divider>

                <v-list v-if="inTheAirOrders.length" density="compact">
                    <OrderItem v-for="order in inTheAirOrders" :key="order.id" :order="order" :isAdmin="isAdmin"
                        @approve-order="approveOrder" @cancel-order="cancelOrder" />
                </v-list>
                <v-card-text v-else>
                    All pigeons have landed. 🎉
                </v-card-text>
            </v-card>

            <!-- ✅ Completed Orders in Expansion Panel -->
            <v-expansion-panels class="mt-4 elevation-2" variant="accordion">
                <v-expansion-panel v-if="deliveredOrders.length">
                    <v-expansion-panel-title>
                        ✅ Completed Orders ({{ deliveredOrders.length }})
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                        <v-list density="compact">
                            <OrderItem v-for="order in deliveredOrders" :key="order.id" :order="order"
                                :isAdmin="isAdmin" @approve-order="approveOrder" @cancel-order="cancelOrder" />
                        </v-list>
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>

        </v-col>
    </v-row>
</template>

<script>
import OrderItem from '@/components/OrderItem.vue'

export default {
    components: {
        OrderItem
    },
    props: {
        orders: {
            type: Array,
            required: true
        },
        isAdmin: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        approveOrder(orderId) {
            this.$emit('approve-order', orderId);
        },
        cancelOrder(orderId) {
            this.$emit('cancel-order', orderId);
        },
        orderSent(orderId) {
            this.$emit('order-sent', orderId);
        },
    },
    computed: {
        // 🔴 Active Orders
        activeOrders() {
            return this.orders
                .filter(order =>
                    order.status !== 'cancelled' &&
                    order.status !== 'delivered' &&
                    order.status !== 'shipped'
                )
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        },

        // 🕊️ "Carrier Pigeon on the Way" Orders (Pending)
        inTheAirOrders() {
            return this.orders
                .filter(order => order.status === 'shipped')
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        },

        // ✅ Delivered Orders (for expansion panel)
        deliveredOrders() {
            return this.orders
                .filter(order => order.status === 'delivered')
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        }
    }
}
</script>

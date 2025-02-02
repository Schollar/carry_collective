<template>
    <div>
        <h1>Admin Dashboard</h1>
        <BagList :bags="bags" :isAdmin="isAdmin" />
        <OrderList :orders="orders" :is-admin="isAdmin" @cancel-order="cancelOrder" @approve-order="sendApproveOrder" />
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import OrderList from '@/components/OrderList.vue';
import BagList from './BagList.vue';

export default {
    name: 'AdminDashboard',
    components: {
        OrderList, BagList
    },
    computed: {
        ...mapState({
            bags: (state) => state.bags.bags,
            orders: (state) => state.orders.orders,
            isAdmin: (state) => state.user.isAdmin || window.localStorage.getItem('user') === 'schollar',
        }),
    },
    async created() {
        await this.fetchBags(); // Fetch bags when the component is created
        await this.fetchOrders(); // Fetch orders when the component is created
    },
    methods: {
        ...mapActions('orders', ['fetchOrders', 'approveOrder', 'cancelOrder']), // Map actions
        ...mapActions('bags', ['fetchBags']), // Map actions
        async sendApproveOrder(orderId) {
            await this.approveOrder(orderId);
            await this.fetchBags();
        },
    },
};
</script>
<template>
  <div class="inventory-manager">
    <img src="@/assets/banner.png" alt="Logo" class="logo" width="25%" />
    <h1 class="text-center">Guild Bag Inventory</h1>

    <!-- Bag List -->
    <BagList :bags="bags" :isAdmin="isAdmin" @open-dialog="openDialog" @remove-bag="removeBag" />

    <!-- Request Dialog -->
    <RequestDialog v-if="selectedBag" :visible="dialogVisible" :selected-bag="selectedBag"
      @update:visible="dialogVisible = $event" @send-request="sendRequest" />

    <!-- Order List -->
    <OrderList :orders="orders" :isAdmin="isAdmin" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import BagList from '@/components/BagList.vue';
import RequestDialog from '@/components/RequestDialog.vue';
import OrderList from '@/components/OrderList.vue';

export default {
  components: {
    BagList,
    RequestDialog,
    OrderList,
  },
  data() {
    return {
      dialogVisible: false, // Controls dialog visibility
      selectedBag: null, // Stores the selected bag for the request
    };
  },
  computed: {
    ...mapState({
      bags: (state) => state.bags.bags, // Map bags from Vuex store
      orders: (state) => state.orders.orders, // Map orders from Vuex store
      isAdmin: (state) => state.user.isAdmin, // Map isAdmin from Vuex store
    }),
  },
  async mounted() {
    await this.fetchBags(); // Fetch bags when the component is created
    await this.fetchOrders(); // Fetch orders when the component is created
  },
  methods: {
    ...mapActions('bags', ['fetchBags', 'removeBag']), // Map bag-related actions
    ...mapActions('orders', ['fetchOrders', 'createOrder']), // Map order-related actions

    // Open the request dialog
    openDialog(bag) {
      this.selectedBag = bag; // Set the selected bag
      this.dialogVisible = true; // Show the dialog
    },

    // Close the request dialog
    closeDialog() {
      this.dialogVisible = false; // Hide the dialog
      this.selectedBag = null; // Clear the selected bag
    },

    // Send the bag request
    async sendRequest(request) {
      try {
        await this.createOrder(request); // Dispatch the requestBag action
        this.closeDialog(); // Close the dialog after sending the request
      } catch (error) {
        console.error('Error sending request:', error);
      }
    },
  },
};
</script>

<style scoped>
.inventory-manager {
  padding: 20px;
}

.logo {
  display: block;
  margin: 0 auto;
}

.text-center {
  text-align: center;
}
</style>
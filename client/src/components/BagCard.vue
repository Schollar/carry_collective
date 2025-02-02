<template>
    <v-card class="pa-2 d-flex flex-column">
        <div class="d-flex align-center justify-space-between mb-2">
            <div class="d-flex align-center">
                <v-img :src="getBagIcon(bag.name)" class="bag-icon" width="50" max-height="50" contain />
                <h3 class="text-h6 ml-2">{{ bag.name }}</h3>
            </div>
            <span class="text-body-1 font-weight-bold text-primary"> x{{ bag.quantity }} </span>
        </div>
        <div class="d-flex justify-center">
            <v-btn v-if="!isAdmin" @click="openRequestDialog" color="green" elevation="2">
                Request Bag
            </v-btn>
            <v-btn v-if="isAdmin" @click="openRequestDialog" color="error" elevation="2">
                Remove
            </v-btn>
        </div>

    </v-card>
</template>

<script>
export default {
    props: {
        bag: Object,
        isAdmin: Boolean,
    },
    methods: {
        openRequestDialog() {
            this.$emit("open-dialog", this.bag);
        },
        removeBag(bagId) {
            this.$emit("remove-bag", bagId);
        },
        getBagIcon(bagName) {
            const icons = {
                "runecloth bag": require("@/assets/bags/runecloth_bag.png"),
                "travelers backpack": require("@/assets/bags/travelers_backpack.png"),
                "mooncloth bag": require("@/assets/bags/mooncloth_bag.png"),
                "mageweave bag": require("@/assets/bags/mageweave_bag.png"),
            };
            return icons[bagName?.toLowerCase()] || require("@/assets/bags/default_bag.png");
        },
    },
};
</script>
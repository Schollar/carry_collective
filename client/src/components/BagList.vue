<template>
    <v-row v-if="bags.data?.length" :class="{ 'justify-center': bags.data.length === 1 }">
      <v-col v-for="bag in bags.data" :key="bag.id" cols="10" md="4" class="mb-4">
        <BagCard :bag="bag" :isAdmin="isAdmin" @open-dialog="openDialog" @remove-bag="removeBag" />
      </v-col>
    </v-row>
  </template>
  
  <script>
  import BagCard from '@/components/BagCard.vue';
  
  export default {
    components: {
      BagCard,
    },
    props: {
      bags: {
        type: Object,
        required: true,
      },
      isAdmin: {
        type: Boolean,
        required: true,
      },
    },
    methods: {
      openDialog(bag) {
        this.$emit('open-dialog', bag);
      },
      removeBag(bagId) {
        this.$emit('remove-bag', bagId);
      },
    },
  };
  </script>
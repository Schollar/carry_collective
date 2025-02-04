<template>
  <v-row justify="center">
    <v-col cols="10" sm="10" md="10" lg="8">
      <v-row v-if="bags.data?.length" dense>
        <v-col v-for="bag in bags.data" :key="bag.id" cols="12" sm="6" md="4" lg="3">
          <BagCard :bag="bag" :isAdmin="isAdmin" @open-dialog="openDialog" @remove-bag="removeBag" />
        </v-col>
      </v-row>
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
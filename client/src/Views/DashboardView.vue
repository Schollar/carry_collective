<template>
    <div class="dashboard-view">
        <AdminDashboard />
    </div>
</template>

<script>
import AdminDashboard from '@/components/AdminDashboard.vue';

export default {
    name: 'DashboardView',
    components: {
        AdminDashboard,
    },
};
</script>
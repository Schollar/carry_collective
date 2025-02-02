<template>
  <div class="login-container">
    <h1>Login</h1>
    <input v-model="password" type="password" placeholder="Enter secret key" />
    <button @click="login">Login</button>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      password: "",
      secretKey: "secret", // Set your secret key here
    };
  },
  methods: {
    login() {
      if (this.password === this.secretKey) {
        localStorage.setItem("user", "schollar"); // Set user in local storage
        this.$router.push({ name: "dashboard" }); // Redirect to inventory page
      } else {
        alert("Incorrect password");
      }
    },
  },
};
</script>
  
  <style scoped>
.login-container {
  text-align: center;
  padding: 20px;
}
</style>
  
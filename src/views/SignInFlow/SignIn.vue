<template>
  <div class="container" :class="{'light-background': !isDarkMode, 'dark-background': isDarkMode}">
    <RequestAccount/>
    <div class="login">
      <img src="https://designcode.io/images/DesignCode-Logo-Black.svg" width="100">
      <h4 :class="{'light-text': isDarkMode, 'dark-text': !isDarkMode}">Sign in to Design+Code HQ</h4>
      <input
        :class="{'light-field': isDarkMode, 'dark-field': !isDarkMode}"
        type="email"
        placeholder="Email"
      >
      <input
        :class="{'light-field': isDarkMode, 'dark-field': !isDarkMode}"
        type="password"
        placeholder="Password"
      >
      <button>Sign In</button>
      <router-link
        to="/recover"
        :class="{'light-link': isDarkMode, 'dark-link': !isDarkMode}"
      >Forgot your password?</router-link>
      <ThemeSwitch/>
    </div>
  </div>
</template>

<script>
import RequestAccount from "@/components/RequestAccount";
import ThemeSwitch from "@/components/ThemeSwitch";

export default {
	name: "SignIn",
	components: {
		RequestAccount,
		ThemeSwitch
	},
  computed: {
    isDarkMode() {
      return this.$store.getters.isDarkMode;
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.login {
  width: 400px;
}

.request {
  position: absolute;
  top: 40px;
  right: 40px;
}
</style>

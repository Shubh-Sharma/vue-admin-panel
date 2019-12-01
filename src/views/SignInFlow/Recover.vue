<template>
  <div class="container" :class="{'light-background': !isDarkMode, 'dark-background': isDarkMode}">
    <RequestAccount />
    <div class="login">
      <img src="https://designcode.io/images/DesignCode-Logo-Black.svg" width="100" />
      <h4 :class="{'light-text': isDarkMode, 'dark-text': !isDarkMode}">Recover Account</h4>
      <form @submit.prevent="onSubmit">
        <input
          :class="{'light-field': isDarkMode, 'dark-field': !isDarkMode}"
          type="email"
          placeholder="Email"
          v-model="email"
          required
        />
        <button>Send Email</button>
      </form>
      <router-link
        to="/signin"
        :class="{'light-link': isDarkMode, 'dark-link': !isDarkMode}"
      >Already have an account? Sign in now.</router-link>
      <ThemeSwitch />
    </div>
  </div>
</template>

<script>
import RequestAccount from "@/components/RequestAccount";
import ThemeSwitch from "@/components/ThemeSwitch";
import { auth } from "@/main";

export default {
  name: "Recover",
  components: {
    RequestAccount,
    ThemeSwitch
  },
  data() {
    return {
      email: ""
    };
  },
  computed: {
    isDarkMode() {
      return this.$store.getters.isDarkMode;
    }
  },
  methods: {
    async onSubmit() {
      try {
        const { email } = this;
        const response = await auth.requestPasswordRecovery(email);
        this.$router.push({
          name: "signin",
          params: {
            userRecoveredAccount: true,
            email: email
          }
        });
      } catch (e) {
        console.log("[onSubmit]", e, e.response);
      }
    }
  },
  mounted() {
    const { params } = this.$route;
    if (params.userLoggedOut) {
      this.hasText = true;
      this.text = "You have logged out!";
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

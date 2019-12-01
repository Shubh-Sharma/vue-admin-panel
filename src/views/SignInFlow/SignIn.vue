<template>
  <div class="container" :class="{'light-background': !isDarkMode, 'dark-background': isDarkMode}">
    <Notification v-if="hasText" :text="text" />
    <RequestAccount />
    <div class="login">
      <img src="https://designcode.io/images/DesignCode-Logo-Black.svg" width="100" />
      <h4 :class="{'light-text': isDarkMode, 'dark-text': !isDarkMode}">Sign in to Design+Code HQ</h4>
      <form @submit.prevent="onSubmit">
        <input
          :class="{'light-field': isDarkMode, 'dark-field': !isDarkMode}"
          type="email"
          placeholder="Email"
          v-model="email"
          required
        />
        <input
          :class="{'light-field': isDarkMode, 'dark-field': !isDarkMode}"
          type="password"
          placeholder="Password"
          v-model="password"
          required
        />
        <button>Sign In</button>
      </form>
      <router-link
        to="/recover"
        :class="{'light-link': isDarkMode, 'dark-link': !isDarkMode}"
      >Forgot your password?</router-link>
      <ThemeSwitch />
    </div>
  </div>
</template>

<script>
import RequestAccount from "@/components/RequestAccount";
import ThemeSwitch from "@/components/ThemeSwitch";
import Notification from "@/components/Notification";
import { auth } from "@/main";

export default {
  name: "SignIn",
  components: {
    RequestAccount,
    ThemeSwitch,
    Notification
  },
  data() {
    return {
      email: "",
      password: "",
      hasText: false,
      text: ""
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
        const { email, password } = this;
        const response = await auth.login(email, password);
        this.$router.replace("/");
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
    } else if (params.userRecoveredAccount) {
      this.hasText = true;
      this.text = `A recovery email has been sent to ${params.email}`;
    } else if (params.userRequestedAccount) {
      this.hasText = true;
      this.text = `Your request has been sent to an administrator for ${params.email}`;
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

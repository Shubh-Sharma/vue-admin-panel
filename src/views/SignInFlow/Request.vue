<template>
  <div class="container" :class="{'light-background': !isDarkMode, 'dark-background': isDarkMode}">
    <div class="login">
      <img src="https://designcode.io/images/DesignCode-Logo-Black.svg" width="100" />
      <h4 :class="{'light-text': isDarkMode, 'dark-text': !isDarkMode}">Request Account</h4>
      <form @submit.prevent="onSubmit">
        <input
          :class="{'light-field': isDarkMode, 'dark-field': !isDarkMode}"
          type="email"
          placeholder="Email"
          v-model="email"
          required
        />
        <button>Request Account</button>
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

export default {
  name: "Request",
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

        // Slack API logic
        let slackURL = new URL("https://slack.com/api/chat.postMessage");
        const data = {
          token:
            "xoxp-857104845223-854788486836-847315905905-04aca7d42457e7bb09935a249db465e7",
          channel: "judoka",
          text: `${email} has requested admin access to Dashboard. Please go to Netlify to invite them.`
        };

        slackURL.search = new URLSearchParams(data);

        await fetch(slackURL);
        this.$router.push({
          name: "signin",
          params: {
            userRequestedAccount: true,
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

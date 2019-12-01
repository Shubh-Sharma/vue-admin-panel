<template>
  <div class="home">
    <Header />
    <div class="container">
      <div class="spread">
        <h1>Traffic Overview</h1>
        <div class="toggle">
          <div @click="mode = 'days'" :class="{'activeSetting': mode === 'days'}" class="days">Days</div>
          <div
            @click="mode = 'weeks'"
            :class="{'activeSetting': mode === 'weeks'}"
            class="weeks"
          >Weeks</div>
          <div
            @click="mode = 'months'"
            :class="{'activeSetting': mode === 'months'}"
            class="months"
          >Months</div>
        </div>
      </div>
      <apexchart width="100%" type="line" :options="chartOptions" :series="series"></apexchart>
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import Header from "@/components/Header.vue";

export default {
  name: "home",
  data() {
    return {
      mode: "days",
      chartOptions: {
        colors: ["#14F1D9", "#7B42F6"],
        legend: {
          labels: {
            colors: ["white"]
          },
          position: "top"
        },
        tooltip: {
          theme: "dark"
        },
        grid: {
          xaxis: {
            lines: {
              show: true
            }
          },
          yaxis: {
            lines: {
              show: false
            }
          }
        },
        chart: {
          id: "users"
        },
        xaxis: {
          type: "datetime"
        }
      },
      series: [
        {
          name: "active users",
          data: [
            [new Date("January 1, 2019"), 30],
            [new Date("January 9, 2019"), 40]
          ]
        },
        {
          name: "new users",
          data: [
            [new Date("January 1, 2019"), 60],
            [new Date("January 9, 2019"), 20]
          ]
        }
      ]
    };
  },
  components: {
    Header,
    apexchart: VueApexCharts
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding-left: 15%;
  padding-right: 15%;
}

.spread {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  width: 100%;
}

h1 {
  @include heading-3;
}

.toggle {
  @include medium-text;
  color: $dark-grey;
  height: 50px;
  width: 240px;
  border-radius: 6px;
  padding: 5px;
  display: flex;
  flex-wrap: nowrap;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    cursor: pointer;
  }
}

@mixin toggle-settings {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33.33%;
  height: 100%;
}

@mixin active-setting {
  background: $teal;
  border-radius: 4px;
  color: $white;
}

.days {
  @include toggle-settings;

  &.activeSetting {
    @include active-setting;
  }
}

.weeks {
  @include toggle-settings;

  &.activeSetting {
    @include active-setting;
  }
}

.months {
  @include toggle-settings;

  &.activeSetting {
    @include active-setting;
  }
}
</style>

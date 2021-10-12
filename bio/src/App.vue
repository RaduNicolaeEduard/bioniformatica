<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      color="grey lighten-3"
      mini-variant
    >
      <v-row justify="center" class="pt-4">
        <v-btn
          icon
          x-large
          @click="$router.push(n)"
          v-on="on"
          v-for="n in this.routes"
          :key="n"
        >
          <v-avatar color="grey darken-3" :size="44"
            ><span class="white--text text-h5"> {{ n }}</span></v-avatar
          >
        </v-btn>
      </v-row>

      <v-row justify="center">
        <v-dialog
          v-model="dialog"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon x-large v-bind="attrs" v-on="on">
              <v-avatar color="grey darken-3" :size="44">
                <v-icon style="color:white;">
                  mdi-dna
                </v-icon></v-avatar
              >
            </v-btn>
          </template>
          <v-card>
            <v-toolbar dark color="primary">
              <v-btn icon dark @click="dialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>DNA sequence generator</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn dark text @click="dialog = false">
                  Save
                </v-btn>
              </v-toolbar-items>
            </v-toolbar>
            <v-list three-line subheader>
              <v-subheader>Sequence input</v-subheader>
              <v-container style="width:30%">
                <v-layout justify-center>
                  <v-btn
                    @click="GenerateRandom"
                    style="margin-bottom:2em;margin-right:3em"
                    >Generate Random Fractions</v-btn
                  >
                </v-layout>
                <v-row>
                  <v-col>
                    <v-layout row>
                      <v-flex xs1>
                        <v-subheader style="margin-left:1em">K</v-subheader>
                      </v-flex>
                      <v-flex xs2>
                        <v-slider
                          v-model="fraca"
                          vertical
                          thumb-label="always"
                          :rules="rules"
                        ></v-slider>
                      </v-flex>
                    </v-layout>
                  </v-col>
                  <v-col>
                    <v-layout row>
                      <v-flex xs1>
                        <v-subheader style="margin-left:1em">C</v-subheader>
                      </v-flex>
                      <v-flex xs2>
                        <v-slider
                          v-model="fracc"
                          vertical
                          thumb-label="always"
                          :rules="rules"
                        ></v-slider>
                      </v-flex>
                    </v-layout>
                  </v-col>
                  <v-col>
                    <v-layout row>
                      <v-flex xs1>
                        <v-subheader style="margin-left:1em">G</v-subheader>
                      </v-flex>
                      <v-flex xs2>
                        <v-slider
                          v-model="fracg"
                          vertical
                          thumb-label="always"
                          :rules="rules"
                        ></v-slider>
                      </v-flex>
                    </v-layout>
                  </v-col>
                  <v-col>
                    <v-layout row>
                      <v-flex xs1>
                        <v-subheader style="margin-left:1em">T</v-subheader>
                      </v-flex>
                      <v-flex xs2>
                        <v-slider
                          v-model="fract"
                          vertical
                          thumb-label="always"
                          :rules="rules"
                        ></v-slider>
                      </v-flex>
                    </v-layout>
                  </v-col>
                </v-row>
              </v-container>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Content filtering</v-list-item-title>
                  <v-list-item-subtitle
                    >Set the content filtering level to restrict apps that can
                    be downloaded</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Password</v-list-item-title>
                  <v-list-item-subtitle
                    >Require password for purchase or use password to restrict
                    purchase</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-list three-line subheader>
              <v-subheader>General</v-subheader>
              <v-list-item>
                <v-list-item-action>
                  <v-checkbox v-model="notifications"></v-checkbox>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Notifications</v-list-item-title>
                  <v-list-item-subtitle
                    >Notify me about updates to apps or games that I
                    downloaded</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-action>
                  <v-checkbox v-model="sound"></v-checkbox>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Sound</v-list-item-title>
                  <v-list-item-subtitle
                    >Auto-update apps at any time. Data charges may
                    apply</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-action>
                  <v-checkbox v-model="widgets"></v-checkbox>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Auto-add widgets</v-list-item-title>
                  <v-list-item-subtitle
                    >Automatically add home screen widgets</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-dialog>
      </v-row>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  watch: {
    fracg: function() {
      this.fract = 100 - this.fraca - this.fracc - this.fracg;
      this.debouncedGetAnswer();
    },
    fracc: function() {
      this.fract = 100 - this.fraca - this.fracc - this.fracg;
      this.debouncedGetAnswer();
    },
    fraca: function() {
      this.fract = 100 - this.fraca - this.fracc - this.fracg;
      this.debouncedGetAnswer();
    },
  },
  methods: {
    GenerateRandom() {
      var max = 100;
      var r1 = randombetween(1, max - 3);
      var r2 = randombetween(1, max - 2 - r1);
      var r3 = randombetween(1, max - 1 - r1 - r2);
      var r4 = max - r1 - r2 - r3;

      function randombetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      }

      this.fraca = r1;
      this.fracc = r2;
      this.fracg = r3;
      this.fract = r4;
    },
  },
  data() {
    return {
      rules: [
        () =>
          this.fraca + this.fracc + this.fracg + this.fract <= 100 || "Invalid",
      ],
      fraca: 0,
      fracc: 0,
      fracg: 0,
      fract: 0,
      routes: ["L1", "L2", "L3", "L4", "L5"],
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
    };
  },
};
</script>

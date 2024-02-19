<template>
  <div>
    <q-dialog v-model="dialog_live" persistent>
      <q-card>
        <div class="text-right">
          <q-btn
            unelevated
            dense
            round
            color="negative"
            icon="close"
            style="
              position: absolute;
              z-index: 1;
              right: 5px;
              margin-top: -15px;
            "
            @click="cancelDialog()"
          />
        </div>
        <q-card-section>
          <div v-if="load" class="flex flex-center">
            <LoadingAnimation />
          </div>
          <div v-else class="text-center">
            <Subtitle :subtitle="dialog_title" :text_color="'#000000'" />

            <q-img
              :src="dialog_poster"
              height="auto"
              style="width: 520px; height: 333px"
              :ratio="16 / 9"
              contain
            >
              <template v-slot:error>
                <ErrorImg
                  :icon_name="'image'"
                  :icon_size="'150px'"
                  :icon_color="'grey'"
                  :is_title="true"
                  :title="'Cannot load image'"
                />
              </template>
            </q-img>

            <div class="text-center">
              <q-btn
                class="text-white q-mt-md full-width"
                no-caps
                style="background: #356692"
                rounded
                :label="label_btn"
                @click="linkLiveclass(id, status)"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import CryptoJS from "crypto-js";
import LoadingAnimation from "../loading/LoadingAnimation.vue";
import Subtitle from "../typography/Subtitle.vue";
import ErrorImg from "../error/ErrorImg.vue";
export default {
  props: [
    "load",
    "dialog",
    "dialog_title",
    "dialog_poster",
    "label_btn",
    "id",
    "status",
  ],

  components: {
    LoadingAnimation,
    Subtitle,
    ErrorImg,
  },

  data() {
    return {
      dialog_live: false,
    };
  },

  methods: {
    ...mapActions({
      reset_filter: "liveclass/resetFilterLiveclassCategories",
    }),

    cancelDialog() {
      this.dialog_live = false;
      this.$emit("dialog-live", false);
    },

    encrypt(txt) {
      const key = CryptoJS.MD5("liveclass-" + txt).toString();

      var a = key.slice(0, 16);
      var b = key.slice(16, 32);

      return a + txt + b;
    },

    linkLiveclass(id, status) {
      this.reset_filter();
      if (status == 0) {
        this.$router.push({
          name: "liveclass-detail",
          params: { id: this.encrypt(id) },
        });
      } else if (status == 1) {
        this.$router.push({
          name: "liveclass-stream",
          params: { id: this.encrypt(id) },
        });
      } else if (status == 2) {
        this.$router.push({
          name: "liveclass-rerun",
          params: { id: this.encrypt(id) },
        });
      }
    },
  },

  watch: {
    dialog: function (val) {
      this.dialog_live = val;
    },
  },
};
</script>

<style>
.header-dialog {
  background-color: #ffffff;
  color: white;
  padding: 7px 14px;
  width: 40%;
  max-width: 60%;
  font-size: small;
  position: fixed;
}
</style>
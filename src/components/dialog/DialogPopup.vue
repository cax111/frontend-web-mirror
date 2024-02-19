<template>
  <q-dialog v-model="dialog_popup">
    <q-card style="width: 400px; color: #555b6c">
      <q-card-section>
        <div style="max-height: 450px; overflow-y: auto">
          <div v-if="is_promo" class="q-mb-sm q-mt-md">
            <CountdownPromo />
          </div>

          <q-img
            :src="image"
            alt="image-popup"
            style="min-height: 350px; max-width: 100%"
          >
            <template v-slot:error>
              <div class="absolute-full flex flex-center bg-grey-4 text-grey-6">
                <div class="text-center">
                  <ErrorImg
                    :icon_name="'image'"
                    :icon_size="'100px'"
                    :title="'Cannot load image'"
                    :is_title="true"
                  />
                </div>
              </div>
            </template>
          </q-img>
          <q-item-label
            lines="2"
            class="col-9 text-subtitle2 text-weight-medium q-pr-sm q-mt-sm"
          >
            {{ title }}
          </q-item-label>
        </div>
      </q-card-section>
      <div v-if="link != null" class="q-mt-sm">
        <q-btn
          :label="button_name"
          class="full-width text-white bg-primary"
          @click="openLink(link)"
        />
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import CountdownPromo from "../master/CountdownPromo.vue";
import ErrorImg from "../error/ErrorImg";
export default {
  components: {
    CountdownPromo,
    ErrorImg,
  },

  props: ["dialog", "image", "title", "link", "button_name"],

  data() {
    return {
      dialog_popup: false,
      is_promo: localStorage.getItem("cere_promo"),
    };
  },

  methods: {
    openLink(link) {
      if (link == "/pembelian") {
        this.$router.push(link);
      } else {
        window.open(link);
      }
    },
  },

  watch: {
    dialog: function (val) {
      this.dialog_popup = val;
    },
  },
};
</script>

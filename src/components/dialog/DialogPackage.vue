<template>
  <q-dialog v-model="dialog_package" persistent>
    <q-card flat style="width: 400px">
      <div class="panel-header bg-primary">
        <span class="q-mr-sm"> <q-icon name="info"></q-icon> </span>Paket akan
        aktif
        <span style="color: #ffa000">± 1 menit</span>
        setelah pembayaran
        <q-btn
          unelevated
          dense
          round
          color="negative"
          icon="close"
          size="sm"
          style="position: absolute; right: 10px"
          @click="cancelDialog()"
        />
      </div>
      <div style="height: 90vh">
        <div style="max-height: 90vh; overflow-y: auto">
          <q-img :src="package_img" ref="imagePromo" style="min-height: 90vh">
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
        </div>
      </div>
      <div class="text-center">
        <q-btn
          class="button-float"
          label="Selanjutnya"
          color="primary"
          @click="linkPayment()"
          style="border-radius: 10px"
        />
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import CryptoJS from "crypto-js";
import ErrorImg from "../error/ErrorImg.vue";
export default {
  components: {
    ErrorImg,
  },
  props: ["dialog", "package_img", "package_id", "package_name"],

  data() {
    return {
      dialog_package: false,
    };
  },

  methods: {
    encrypt(txt) {
      const key = CryptoJS.MD5("payment-" + txt).toString();

      var a = key.slice(0, 16);
      var b = key.slice(16, 32);

      return a + txt + b;
    },

    linkPayment() {
      this.$router.push({
        name: "pembelian-review",
        params: { id: this.encrypt(this.package_id) },
      });
    },

    cancelDialog() {
      this.dialog_package = false;
      this.$emit("cancel-dialog", false);
    },
  },

  watch: {
    dialog: function (val) {
      this.dialog_package = val;
    },
  },
};
</script>

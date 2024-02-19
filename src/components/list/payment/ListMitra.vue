<template>
  <q-item
    style="border: 1px solid #ccc; border-radius: 12px"
    class="q-mt-md bg-white text-grey-8"
  >
    <q-item-section avatar style="align-items: center;">
      <q-icon :name="'img:/img/icons/ic_mitra.png'" :style="`${replaceImageColor}`" />
      <div class="q-my-sm">Mitra</div>
    </q-item-section>
    <q-item-section>
      <q-item-label>
        <p
          v-if="status == 1 || status == 2"
          class="text-subtitle1 text-grey-9"
        >
          Pencairan Saldo :
          <span class="text-subtitle1 text-red"
            >- {{ formatPrice(nominal_credit) }}</span
          >
        </p>
        <p
          v-else-if="status == 0 || status == 3 || status == 4 || status == 5"
          class="text-subtitle1 text-grey-9"
        >
          Pemasukan Saldo :
          <span class="text-subtitle1 text-green text-weight-medium"
            >+ {{ formatPrice(nominal_debit) }}</span
          >
        </p>
      </q-item-label>
      <q-item-label
        class="text-subtitle"
      >
        <div v-html="formatText(description)"></div>
      </q-item-label>
      <q-item-label
        class="text-caption"
        style="margin-top: 24px;"
      >
        {{ formatDate(created_at) }} WIB
      </q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-img width="60px" height="60px" contain :src="icon">
        <template v-slot:error>
          <ErrorImg
            :icon_name="'image'"
            :icon_size="'60px'"
            :icon_color="'grey'"
            :is_title="false"
          />
        </template>
      </q-img>
      <img
        v-if="status == 2 || status == 3"
        style="position: absolute; right: -8px; top: -5px; width: 10%"
        src="/img/icons/ic_ribbon_pending.svg"
      />
      <img
        v-if="status == 0 || status == 1"
        style="position: absolute; right: -8px; top: -5px; width: 10%"
        src="/img/icons/ic_ribbon_berhasil.svg"
      />
      <img
        v-if="status == 4"
        style="position: absolute; right: -8px; top: -5px; width: 10%"
        src="/img/icons/ic_ribbon_expired.svg"
      />

      <img
        v-if="status == 5"
        style="position: absolute; right: -8px; top: -5px; width: 10%"
        src="/img/icons/ic_ribbon_canceled.svg"
      />
    </q-item-section>
  </q-item>
</template>
<script>
import moment from "moment";
import ErrorImg from "../../error/ErrorImg.vue";
export default {
  components: {
    ErrorImg,
  },
  props: [
    "status",
    "nominal_credit",
    "nominal_debit",
    "description",
    "created_at",
    "icon",
  ],
  data() {
    return {
      colorPrimary: process.env.WEB_COLOR_PRIMARY,
      replaceImageColor: process.env.WEB_REPLACE_IMAGE_COLOR,
    };
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return "Rp" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },

    formatText(value) {
      return value.replace(/(\\r)*\\n/g, "<br>");
    },

    formatDate(val) {
      var date = moment(val);
      return date.format("DD-MM-YYYY k:mm:ss");
    },
  },
};
</script>

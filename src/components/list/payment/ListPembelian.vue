<template>
  <div>
    <q-item
      clickable
      class="border-list q-mt-md q-mx-md bg-white"
      @click="linkInvoice(history)"
    >
      <q-item-section
        v-if="screen > 920"
        avatar
        class="text-caption text-grey-9"
        style="align-items: center"
      >
        <q-icon
          :name="'img:/img/icons/ic_package.png'"
          :style="replaceImageColor"
        />
        <div class="q-my-sm">Beli Paket</div>
      </q-item-section>
      <q-item-section class="text-grey-9">
        <q-item-label>
          <span
            v-if="real_price > price"
            class="text-subtitle2 text-weight-bold text-grey"
            style="text-decoration: line-through"
          >
            {{ formatPrice(real_price) }},00
          </span>
          <span
            :class="
              real_price > price
                ? 'text-green text-subtitle1 text-weight-bold q-ml-xs'
                : 'text-green text-subtitle1 text-weight-bold'
            "
          >
            {{ formatPrice(price) }},00
          </span>
        </q-item-label>
        <q-item-label class="">
          <span>{{ product }}</span>
        </q-item-label>
        <q-item-label class="text-caption" style="margin-top: 20px">
          {{ formatDate(created_at) }} WIB
        </q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-img :src="icon" width="50px" height="50px" contain>
          <template v-slot:error>
            <ErrorImg
              :icon_name="'image'"
              :icon_size="'50px'"
              :icon_color="'grey'"
              :is_title="false"
            />
          </template>
        </q-img>
        <img
          v-if="status == 'pending'"
          style="position: absolute; right: -7px; top: -5px; width: 55px"
          src="/img/icons/ic_ribbon_pending.svg"
        />
        <img
          v-else-if="status == 'success'"
          style="position: absolute; right: -7px; top: -5px; width: 55px"
          src="/img/icons/ic_ribbon_berhasil.svg"
        />
        <img
          v-else-if="status == 'expired'"
          style="position: absolute; right: -7px; top: -5px; width: 55px"
          src="/img/icons/ic_ribbon_expired.svg"
        />
        <img
          v-else
          style="position: absolute; right: -7px; top: -7px; width: 55px"
          src="/img/icons/ic_ribbon_canceled.svg"
        />
      </q-item-section>
    </q-item>

    <DialogInfo
      :dialog="confirm_not_used"
      :is_icon="true"
      :icon_link="'info'"
      :icon_color="'warning'"
      :heading="'Tidak dapat Melihat Histori Pembayaran dengan Metode ini di Website'"
      @dialog-info="dialogInfo"
    />
  </div>
</template>
<script>
import moment from "moment";
import common from "../../../mixins/common.js";
import ErrorImg from "../../error/ErrorImg.vue";
import DialogInfo from "../../dialog/DialogInfo.vue";

export default {
  props: [
    "history",
    "id",
    "real_price",
    "price",
    "product",
    "created_at",
    "icon",
    "status",
  ],
  mixins: [common],
  components: {
    ErrorImg,
    DialogInfo,
  },
  data() {
    return {
      confirm_not_used: false,
      replaceImageColor: process.env.WEB_REPLACE_IMAGE_COLOR,
    };
  },
  methods: {
    linkInvoice(history) {
      if (
        history.payment_type.payment_method.name.toLowerCase() == "shopeepay"
      ) {
        this.confirm_not_used = true;
      } else if (history.via == "snap") {
        location.href = history.url;
      } else {
        this.$router.push({
          name: "pembelian-invoice",
          params: {
            id: this.encrypt(this.id, "payment"),
          },
        });
      }
    },

    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return "Rp" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },

    formatDate(val) {
      var date = moment(val);
      return date.format("DD-MM-YYYY k:mm:ss");
    },

    dialogInfo(e) {
      this.confirm_not_used = e;
    },
  },
};
</script>
<style>
.q-dialog__inner > div {
  pointer-events: all;
  overflow: unset;
  will-change: scroll-position;
  border-radius: 20px;
  box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px rgb(0 0 0 / 14%),
    0 1px 10px rgb(0 0 0 / 12%);
}
</style>

<template>
  <q-page>
    <div class="row q-pa-xs">
      <div class="col-9 q-pl-sm q-pr-sm">
        <div v-if="is_package" class="text-center">
          <lottie-animation
            :path="`img/lottie/${logoPath}/book_animation.json`"
            :width="256"
            :height="256"
            :speed="3"
          />
        </div>
        <div
          v-else
          style="max-height: 500px; overflow: auto"
          ref="scrollTargetRef"
        >
          <q-infinite-scroll
            ref="infiniteScroll"
            @load="onLoadPackages"
            :offset="400"
            :scroll-target="$refs.scrollTargetRef"
          >
            <div v-if="packages.length == 0">
              <lottie-animation
                :path="`img/lottie/${logoPath}/empty_state.json`"
                :width="250"
                :height="250"
              />
              <Title
                :text_color="`#${colorPrimary}`"
                :class_add="'text-center'"
                :title="'Tidak Ada Data History Beli Paket !'"
              />
            </div>
            <div v-else v-for="history in packages" :key="history.id">
              <ListPembelian
                :history="history"
                :id="history.id"
                :real_price="history.real_price"
                :price="history.price"
                :product="history.product"
                :created_at="history.created_at"
                :icon="history.payment_type.payment_method.icon"
                :status="history.status"
              />
            </div>
            <template v-slot:loading>
              <div class="row justify-center q-my-md">
                <q-spinner-dots color="red-10" size="30px" />
              </div>
            </template>
          </q-infinite-scroll>
        </div>
      </div>
      <div class="col-3 q-pl-sm q-mt-md">
        <q-card style="border-radius: 10px">
          <q-card-section>
            <p class="text-subtitle1 text-weight-bold">Tanggal</p>
            <p class="text-subtitle1 text-weight-bold">From</p>
            <q-input filled v-model="from_date">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    ref="qDateProxy"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="from_date"
                      mask="YYYY-MM-DD"
                      @input="() => $refs.qDateProxy.hide()"
                    />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <p class="text-subtitle1 text-weight-bold">To</p>
            <q-input filled v-model="to_date">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    ref="qDateProxy"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="to_date"
                      mask="YYYY-MM-DD"
                      @input="() => $refs.qDateProxy.hide()"
                    />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <p
              v-if="to_date < from_date"
              class="text-caption text-red text-italic"
            >
              * Tanggal From lewat dari Tanggal To
            </p>
          </q-card-section>
          <q-card-section>
            <p class="text-subtitle1 text-weight-bold">Filter</p>
            <q-select
              filled
              v-model="select_status"
              map-options
              emit-value
              option-value="value"
              option-label="name"
              :options="status_options"
              @input="fetchHistoryPackages(1)"
            />
          </q-card-section>
          <!-- <q-card-section>
            <q-btn
              v-if="from_date && to_date && select_status"
              color="positive"
              icon="filter_list"
              @click="fetchHistoryPackages(1)"
              >Filter</q-btn
            >
          </q-card-section> -->
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import axios from "axios";
import CryptoJS from "crypto-js";
import LottieAnimation from "lottie-vuejs/src/LottieAnimation.vue";
import ListPembelian from "../list/payment/ListPembelian.vue";
import Title from "../typography/Title.vue";
import ErrorImg from "../error/ErrorImg.vue";

export default {
  components: {
    LottieAnimation,
    ListPembelian,
    ErrorImg,
    Title,
  },
  data() {
    return {
      colorPrimary: process.env.WEB_COLOR_PRIMARY,
      logoPath: process.env.WEB_LOGO_PATH,
      packages: [],
      load_packages: false,
      from_date: null,
      to_date: null,
      select_status: "",
      status_options: [
        {
          name: "Semua",
          value: "",
        },
        {
          name: "Belum dibayar",
          value: "pending",
        },
        {
          name: "Berhasil",
          value: "success",
        },
        {
          name: "Kedaluwarsa",
          value: "expired",
        },
        {
          name: "Batal",
          value: "canceled",
        },
      ],
      user_explain: [],
      is_transaction: false,
      is_package: false,
      packages_current_page: null,
      packages_last_page: null,
    };
  },

  created() {
    this.fetchHistoryPackages(1);
  },

  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return "Rp. " + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    formatDate(val) {
      var date = moment(val);
      return date.format("DD-MM-YYYY k:mm:ss");
    },
    encrypt(txt) {
      const key = CryptoJS.MD5("payment-" + txt).toString();

      var a = key.slice(0, 16);
      var b = key.slice(16, 32);

      return a + txt + b;
    },
    linkInvoice(history) {
      if (
        history.payment_type.payment_method.name.toLowerCase() == "shopeepay"
      ) {
        this.confirm_not_used = true;
      } else {
        this.$router.push({
          name: "pembelian-invoice",
          params: {
            id: this.encrypt(history.id),
          },
        });
      }
    },
    onLoadPackages(index, done) {
      setTimeout(() => {
        if (this.packages && this.packages_last_page) {
          if (this.packages_current_page != this.packages_last_page) {
            this.fetchHistoryPackages(this.packages_current_page + 1);
            done();
          } else {
            done(true);
            this.from_date = null;
            this.to_date = null;
            this.select_status = null;
          }
        } else {
          done(true);
        }
      }, 2000);
    },
    fetchHistoryPackages(page) {
      this.load_packages = true;
      let url =
        this.$store.state.example.base_url + `/payment/invoice?page=${page}`;
      if (this.from_date) {
        url = url + `&from_date=${this.from_date}`;
        url = url + `&to_date=${this.to_date}`;
      }

      if (this.select_status) {
        url = url + `&status=${this.select_status}`;
      }
      axios
        .get(url)
        .then((response) => {
          if (response.data.data) {
            if (page > 1) {
              for (var i = 0; i < response.data.data.length; i++) {
                this.$set(
                  this.packages,
                  this.packages.length,
                  response.data.data[i]
                );
              }
            } else {
              this.packages = response.data.data;
            }
          }

          if (response.data.meta) {
            this.packages_current_page = response.data.meta.current_page;
            this.packages_last_page = response.data.meta.last_page;
          }

          this.is_package = false;
          // this.$refs.infiniteScroll.resume();
        })
        .catch((error) => {
          this.is_package = false;
        });
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

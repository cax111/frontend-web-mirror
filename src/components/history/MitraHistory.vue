<template>
  <q-page>
    <div class="flex flex-center" v-if="load_seller">
      <lottie-animation
        :path="`img/lottie/${logoPath}/book_animation.json`"
        :width="256"
        :height="256"
        :speed="3"
      />
    </div>
    <div v-else>
      <div v-if="is_premium" class="row q-pa-xs">
        <div
          class="col-9 q-pl-sm q-pr-sm"
          style="max-height: 500px; overflow: auto"
          ref="scrollTargetRef"
        >
          <q-infinite-scroll
            ref="infiniteScroll"
            @load="onLoadReseller"
            :offset="400"
            :scroll-target="$refs.scrollTargetRef"
          >
            <div v-if="reseller.length == 0">
              <lottie-animation
                :path="`img/lottie/${logoPath}/empty_state.json`"
                :width="250"
                :height="250"
              />
              <Title
                :text_color="`#${colorPrimary}`"
                :class_add="'text-center'"
                :title="'Tidak Ada Data History Mitra'"
              />
            </div>
            <div v-else v-for="item in reseller" :key="item.id">
              <ListMitra
                :status="item.status"
                :nominal_credit="item.nominal_credit"
                :nominal_debit="item.nominal_debit"
                :description="item.description"
                :created_at="item.created_at"
                :icon="item.payment_method.icon"
              />
            </div>
            <template v-slot:loading>
              <div class="row justify-center q-my-md">
                <q-spinner-dots color="red-10" size="30px" />
              </div>
            </template>
          </q-infinite-scroll>
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
                v-model="select_status_reseller"
                map-options
                emit-value
                option-value="value"
                option-label="name"
                :options="status_options_reseller"
                @input="fetchResellerHistory(1)"
              />
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div v-else class="row q-pa-xs">
        <p
          class="
            text-subtitle1 text-weight-bold
            q-mb-none
            text-center text-primary
          "
        >
          Kamu belum membeli paket
          <span style="color: #ffa000">
            <img
              class="self-center"
              src="~assets/images/icon_premium.png"
              width="16px"
              height="16px"
            />
            Premium
          </span>
          untuk menjadi Mitra harap membeli paket terlebih dahulu,<span
            class="text-red"
            style="cursor: pointer"
            @click="goToCart()"
          >
            Beli Paket</span
          >
        </p>
      </div>
    </div>
  </q-page>
</template>

<script>
import axios from "axios";
import LottieAnimation from "lottie-vuejs/src/LottieAnimation.vue";
import ListMitra from "../list/payment/ListMitra.vue";
import Title from "../typography/Title.vue";
export default {
  components: {
    LottieAnimation,
    Title,
    ListMitra,
  },
  data() {
    return {
      colorPrimary: process.env.WEB_COLOR_PRIMARY,
      logoPath: process.env.WEB_LOGO_PATH,
      reseller: [],
      load_seller: false,
      from_date: null,
      to_date: null,
      select_status_reseller: null,
      status_options_reseller: [
        {
          name: "Semua",
          value: null,
        },
        {
          name: "Pemasukan Sukses",
          value: 0,
        },
        {
          name: "Pencairan Sukses",
          value: 1,
        },
        {
          name: "Pencairan Pending",
          value: 2,
        },
        {
          name: "Pemasukan Pending",
          value: 3,
        },
        {
          name: "Pemasukan Kedaluwarsa",
          value: 4,
        },
        {
          name: "Pemasukan Batal",
          value: 5,
        },
      ],

      is_premium: false,

      reseller_current_page: null,
      reseller_last_page: null,
    };
  },

  created() {
    this.getMembership();
  },

  methods: {
    goToCart() {
      window.location.href = "/pembelian";
    },

    getMembership() {
      axios
        .get(this.$store.state.example.base_url + "/membership/my")
        .then((response) => {
          if (response.data.data.length > 0) {
            this.is_premium = true;
            this.fetchResellerHistory(1);
          }
        })
        .catch((error) => {});
    },

    onLoadReseller(index, done) {
      setTimeout(() => {
        if (this.reseller && this.reseller_last_page) {
          if (this.reseller_current_page != this.reseller_last_page) {
            this.fetchResellerHistory(this.reseller_current_page + 1);
            done();
          } else {
            done(true);
            this.from_date = null;
            this.to_date = null;
            this.select_status_reseller = null;
          }
        } else {
          done(true);
        }
      }, 2000);
    },

    fetchResellerHistory(page) {
      // this.load_seller = true;
      let url =
        this.$store.state.example.base_url + `/mitra/histories?page=${page}`;
      if (this.from_date) {
        url = url + `&from_date=${this.from_date}`;
        url = url + `&to_date=${this.to_date}`;
      }
      if (this.select_status_reseller != null) {
        url = url + `&status=${this.select_status_reseller}`;
      }

      axios
        .get(url)
        .then((response) => {
          if (response.data.data) {
            if (page > 1) {
              for (var i = 0; i < response.data.data.length; i++) {
                this.$set(
                  this.reseller,
                  this.reseller.length,
                  response.data.data[i]
                );
              }
            } else {
              this.reseller = response.data.data;
            }
          }

          if (response.data.meta) {
            this.reseller_current_page = response.data.meta.current_page;
            this.reseller_last_page = response.data.meta.last_page;
          }

          this.load_seller = false;
          // this.$refs.infiniteScroll.resume();
        })
        .catch((error) => {
          this.load_seller = false;
        });
    },
  },
};
</script>

<style>
.img-center {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>

<template>
  <div>
    <q-item class="q-mt-md bg-white">
      <q-item-section avatar>
        <q-img :src="image" width="50px" height="50px" contain>
          <template v-slot:error>
            <ErrorImg
              :icon_name="'image'"
              :icon_size="'60px'"
              :icon_color="'grey'"
              :is_title="false"
            />
          </template>
        </q-img>
      </q-item-section>
      <q-item-section>
        <q-item-label
          lines="1"
          class="text-subtitle2 text-weight-bold text-primary"
        >
          {{ name }}
        </q-item-label>
        <q-item-label lines="1" class="text-caption text-grey">
          Masa aktif fitur sampai :
        </q-item-label>
        <q-item-label class="text-h6 text-weight-bold">
          {{ formatDate(end_date) }}
        </q-item-label>
        <q-item-label lines="1" class="text-caption text-grey">
          Kouta :
        </q-item-label>
        <q-item-label v-if="quota < 0" class="text-h6 text-weight-bold">
          Unlimited
        </q-item-label>
        <q-item-label v-else class="text-h6 text-weight-bold">
          {{ quota }}
        </q-item-label>
      </q-item-section>
      <q-item-section side>
        <div class="text-center">
          <q-item-label class="text-h6 text-weight-bold" style="color: #000000">
            {{ remaining_days }}
          </q-item-label>
          <q-item-label class="text-subtitle text-weight-bold text-primary">
            Hari tersisa
          </q-item-label>
        </div>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
import moment from "moment";
import ErrorImg from "../../error/ErrorImg.vue";

export default {
  props: ["image", "name", "end_date", "remaining_days", "quota"],
  components: {
    ErrorImg,
  },
  data() {
    return {};
  },
  methods: {
    formatDate(val) {
      moment.locale("id");
      let date = moment(val);
      let dateComponent = date.format("DD MMMM YYYY");
      return dateComponent;
    },
  },
};
</script>

<style></style>

<template>
  <div>
    <q-expansion-item class="q-pa-md q-mt-sm q-mb-sm border-10">
      <template v-slot:header>
        <q-item-section avatar>
          <q-img width="50px" height="50px" :src="icon" contain>
            <template v-slot:error>
              <ErrorImg
                :icon_name="'image'"
                :icon_size="'50px'"
                :icon_color="'grey'"
                :is_title="false"
              />
            </template>
          </q-img>
        </q-item-section>
        <q-item-section>
          <q-item-label lines="1" class="text-subtitle2">
            {{ name }}
          </q-item-label>
        </q-item-section>
      </template>
      <q-list class="q-pa-sm">
        <div v-for="(ins, j) in instruction" :key="ins.id">
          <q-item clickable>
            <q-item-section>
              <q-item-label class="text-caption">
                <span>{{ j + 1 }}.</span>
                <span v-html="ins.instruction"></span>
              </q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </q-list>
    </q-expansion-item>
  </div>
</template>
<script>
import Separator from "../separator/Separator.vue";
import ErrorImg from "../error/ErrorImg.vue";
export default {
  props: ["icon", "name", "method_options"],

  components: {
    Separator,
    ErrorImg,
  },

  data() {
    return {
      instruction: [],
    };
  },

  watch: {
    method_options: {
      immediate: true,
      deep: true,
      handler(method_options) {
        this.instruction = method_options;
      },
    },
  },
};
</script>

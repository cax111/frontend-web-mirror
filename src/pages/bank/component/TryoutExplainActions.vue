<template>
  <div v-if="load" class="row justify-center q-mt-sm">
    <SkeletonTryout
      v-for="n in 4"
      :key="n"
      :btn_circle="true"
      :custom_width="'50px'"
      class="q-ml-sm q-mr-sm"
    />
  </div>
  <div v-else class="row justify-between q-mt-sm">
    <div class="col-md-0 col-sm-3 col-xs-4 text-center lt-md">
      <q-btn
        flat
        dense
        icon="chevron_left"
        label="Kembali"
        color="primary"
        @click="$router.back()"
      />
    </div>
    <div class="row col-md-6 col-sm-7 col-xs-5 justify-center"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SkeletonTryout from "components/loading/SkeletonTryout.vue";
export default {
  props: ["load", "explain_question", "explain_item"],

  components: {
    SkeletonTryout
  },

  data() {
    return {
      question_explain: [],
      item_explain: {}
    };
  },

  computed: {
    ...mapGetters({
      index_explain: "tryout/setTryoutExplainIndex",
      setTryoutDetail: "tryout/setTryoutDetail"
    })
  },

  methods: {
    buttonRound(e) {
      this.$emit("explain-actions", e);
    }
  },

  watch: {
    explain_question: {
      immediate: true,
      deep: true,
      handler(explain_question) {
        this.question_explain = explain_question;
      }
    },

    explain_item: {
      immediate: true,
      deep: true,
      handler(explain_item) {
        this.item_explain = explain_item;
      }
    }
  }
};
</script>

<template>
  <div>
    <q-dialog
      v-model="dialog_explanation"
      transition-show="rotate"
      transition-hide="rotate"
      persistent
    >
      <q-card style="max-width: 90%; width: 80%">
        <q-bar class="bg-primary text-white q-py-lg">
          <div class="col text-center" style="padding-left: 10%">
            Pembahasan Video
          </div>
          <q-space />
          <q-btn dense flat icon="close" @click="cancelDialogExplain()">
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <div>
          <div v-if="explain_video">
            <q-video
              :src="'https://www.youtube.com/embed/' + explain_video + '?rel=0'"
              style="width: 100%; height: 25vw"
            />
          </div>

          <div class="q-ma-xs" v-if="explain_text">
            <div
              class="text-center text-primary text-weight-medium text-subtitle1"
            >
              Pembahasan Teks
            </div>

            <q-scroll-area class="q-mx-md" style="height: 150px">
              <div class="text-body1">
                <p
                  :style="`font-size: ${zoom_explain}px !important;`"
                  :key="explain_text"
                  v-html="hideFontSize(explain_text)"
                ></p>
              </div>
            </q-scroll-area>

            <div class="row">
              <div
                class="col-auto q-px-sm text-center"
                style="align-self: center"
              >
                <q-icon name="zoom_in" size="md" />
              </div>
              <div class="col q-pl-sm">
                <q-slider v-model="zoom_explain" :min="14" :max="30" />
              </div>
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>

    <q-dialog v-model="dialog_img">
      <q-img :src="image_data ? image_data[0] : ''" />
    </q-dialog>
  </div>
</template>

<script>
import Title from "../typography/Title.vue";
import common from '../../mixins/common.js'
export default {
  props: ["dialog", "explain_video", "explain_text"],
  mixins:[common],
  components: {
    Title,
  },

  data() {
    return {
      dialog_explanation: false,
      zoom_explain: 14,
      dialog_img: false,
      image_data: [],
      colorPrimary: process.env.WEB_COLOR_PRIMARY,
    };
  },

  methods: {
    cancelDialogExplain() {
      this.dialog_explanation = false;
      this.$emit("dialog-explanation", {
        is_dialog: false,
        content: null,
        video: null,
      });
    },

    hideFontSize(val) {
      let data = val.replace(/font-size:/g, "");
      if(this.screen < 600){
        data = data.replace(/(height:\w+;)/g, "");
        data = data.replace(/(width:\w+)/g, "width:100%;");
        data = data.replace(/(height: \w+;)/g, "");
        data = data.replace(/(width: \w+)/g, "width:100%;");
      }
      data = data.replace(
        /(<img)/g,
        `<img onclick="showImageQuestions()" class="cursor-pointer"`
      );

      return data;
    },

    plainRender() {
      if (window.MathJax) {
        window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);
      }
    },
  },

  mounted() {
    this.plainRender();

    let _ = this;
    window.showImageQuestions = function () {
      _.image_data = _.explain_text?_.explain_text.match(/src=[\"\']([^\"\']+)/g):[];

      if (_.image_data.length) {
        _.image_data = _.explain_text.match(/src=[\"\']([^\"\']+)/g);
        _.image_data.forEach((item, i) => {
          _.image_data[i] = item.replace(/(src=\")/g, "");
          _.dialog_img = true;
        });
      }
    };
  },

  watch: {
    dialog: function (val) {
      this.dialog_explanation = val;
    },

    explain_text: function () {
      this.$nextTick().then(() => {
        this.plainRender();
      });
    },
  },
};
</script>

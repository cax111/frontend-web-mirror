<template>
  <q-dialog v-model="dialog_help" persistent>
    <q-card>
      <q-card-section>
        <div class="text-h6 text-primary text-weight-bold">Bantuan</div>
      </q-card-section>

      <q-separator />

      <q-card-section style="max-height: 50vh" class="scroll">
        <div class="row q-mt-sm">
          <div class="col-12">
            <div class="row">
              <div class="col q-pa-sm text-center">
                <q-avatar
                  color="white"
                  text-color="black"
                  size="md"
                  class="q-mx-md shadow-2"
                  style="border: 1px solid #888"
                  ><span class="text-weight-bold text-body2">A</span></q-avatar
                >
                <q-avatar
                  color="white"
                  text-color="black"
                  size="md"
                  class="q-mx-md shadow-2"
                  style="border: 1px solid #888"
                  ><span class="text-weight-bold text-body2">B</span></q-avatar
                >
                <q-avatar
                  color="white"
                  text-color="black"
                  size="md"
                  class="q-mx-md shadow-2"
                  style="border: 1px solid #888"
                  ><span class="text-weight-bold text-body2">C</span></q-avatar
                >
                <q-avatar
                  color="white"
                  text-color="black"
                  size="md"
                  class="q-mx-md shadow-2"
                  style="border: 1px solid #888"
                  ><span class="text-weight-bold text-body2">D</span></q-avatar
                >
                <q-avatar
                  color="white"
                  text-color="black"
                  size="md"
                  class="q-mx-md shadow-2"
                  style="border: 1px solid #888"
                  ><span class="text-weight-bold text-body2">E</span></q-avatar
                >
              </div>
            </div>
          </div>
          <div
            class="col-12 text-primary text-center text-weight-medium q-my-md"
          >
            Kolom Opsi Jawaban
          </div>
          <q-separator />
        </div>
        <div class="row">
          <div class="col-12 text-center q-ma-sm">
            <q-avatar
              color="white"
              text-color="grey"
              size="xl"
              class="q-mx-md"
              icon="delete"
            />
            <q-avatar
              color="white"
              text-color="grey"
              size="xl"
              class="q-mx-md"
              icon="push_pin"
            />
            <q-avatar
              color="white"
              text-color="grey"
              size="xl"
              class="q-mx-md"
              icon="help"
            />
            <q-avatar
              color="white"
              text-color="grey"
              size="xl"
              class="q-mx-md"
              icon="fullscreen"
            />
            <q-avatar
              color="white"
              text-color="grey"
              size="xl"
              class="q-mx-md"
              icon="report"
            />
          </div>
          <q-item class="col-6">
            <q-item-section side>
              <q-avatar
                color="white"
                text-color="grey"
                size="xl"
                icon="delete"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-primary text-weight-medium"
                >Hapus Jawaban</q-item-label
              >
            </q-item-section>
          </q-item>
          <q-item class="col-6">
            <q-item-section side>
              <q-avatar
                color="white"
                text-color="grey"
                size="xl"
                icon="push_pin"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-primary text-weight-medium"
                >Tandai Jawaban</q-item-label
              >
            </q-item-section>
          </q-item>
          <q-item class="col-6">
            <q-item-section side>
              <q-avatar color="white" text-color="grey" size="xl" icon="help" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-primary text-weight-medium"
                >Bantuan</q-item-label
              >
            </q-item-section>
          </q-item>
          <q-item class="col-6">
            <q-item-section side>
              <q-avatar
                color="white"
                text-color="grey"
                size="xl"
                icon="fullscreen"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-primary text-weight-medium"
                >Luaskan Soal</q-item-label
              >
            </q-item-section>
          </q-item>
          <q-item class="col-6">
            <q-item-section side>
              <q-avatar
                color="white"
                text-color="grey"
                size="xl"
                icon="report"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-primary text-weight-medium"
                >Laporkan Soal</q-item-label
              >
            </q-item-section>
          </q-item>
        </div>

        <q-separator />
        <div class="row items-center">
          <div class="col-2 offset-2 q-pa-sm">
            <q-btn
              flat
              padding="4px"
              icon="keyboard_arrow_left"
              size="lg"
              color="grey"
            />
          </div>
          <div class="col-2 q-pa-sm">
            <q-btn
              flat
              padding="4px"
              icon="keyboard_arrow_right"
              size="lg"
              color="grey"
            />
          </div>
          <div class="col-6 text-center">
            <q-btn
              no-caps
              outline
              color="grey"
              padding="4px 20px"
              label="Selesai"
            />
          </div>
          <q-item class="col-6">
            <q-item-section side>
              <q-avatar
                color="white"
                text-color="grey"
                size="xl"
                icon="keyboard_arrow_left"
              />
            </q-item-section>
            <q-item-section side>
              <q-avatar
                color="white"
                text-color="grey"
                size="xl"
                icon="keyboard_arrow_right"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-primary text-weight-medium"
                >Pindah Soal</q-item-label
              >
            </q-item-section>
          </q-item>
          <q-item class="col-6">
            <q-item-section side>
              <q-btn
                no-caps
                outline
                color="grey"
                padding="4px 20px"
                label="Selesai"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-primary text-weight-medium"
                >Selesai Simulai</q-item-label
              >
            </q-item-section>
          </q-item>
        </div>

        <q-separator />
        <div class="row items-center">
          <q-item class="col-6">
            <q-item-section side>
              <q-btn
                no-caps
                padding="15px 15px"
                label=""
                style="background: #84da92"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-primary text-weight-medium"
                >Soal dijawab</q-item-label
              >
            </q-item-section>
          </q-item>
          <q-item class="col-6">
            <q-item-section side>
              <q-btn
                no-caps
                padding="15px 15px"
                label=""
                style="background: #ff8781"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-primary text-weight-medium"
                >Soal belum dijawab</q-item-label
              >
            </q-item-section>
          </q-item>
          <q-item class="col-6">
            <q-item-section side>
              <q-btn
                no-caps
                padding="15px 15px"
                label=""
                style="background: #80b8e4"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-primary text-weight-medium"
                >Soal ditandai</q-item-label
              >
            </q-item-section>
          </q-item>
          <q-item class="col-6">
            <q-item-section side>
              <q-btn no-caps padding="15px 15px" label="" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-primary text-weight-medium"
                >Soal belum dilihat</q-item-label
              >
            </q-item-section>
          </q-item>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn flat label="tutup" color="primary" @click="cancelDialog()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: ["dialog"],

  data() {
    return {
      dialog_help: false,
    };
  },

  methods: {
    cancelDialog() {
      this.dialog_help = false;
      this.$emit("dialog-help", false);
    },
  },

  watch: {
    dialog: function (val) {
      this.dialog_help = val;
    },
  },
};
</script>

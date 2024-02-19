<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center bg-primary">
        <q-card flat class="bg-register my-card-register">
          <q-card-section>
            <CustomTitle
              :custom_title="'Selamat Datang'"
              :class_add="'text-h4 text-grey-9 text-center'"
            />
            <CustomTitle
              :custom_title="name_model"
              :class_add="'text-h5 text-grey-9 text-center q-mb-none'"
            />
          </q-card-section>
          <q-card-section>
            <q-form @submit="updateProfile()">
              <q-card class="q-mt-lg card-form" flat>
                <q-card-section>
                  <Avatar
                    :avatar="data_photo"
                    :width_avatar="'80px'"
                    :height_avatar="'80px'"
                    :class_custom="'absolute-center shadow-10'"
                    :size_custom="'80px'"
                    :style_custom="'-30px'"
                    :icon_name="'account_circle'"
                    :icon_size="'80px'"
                    :icon_color="'grey'"
                    :is_title="false"
                  />
                  <q-btn
                    size="sm"
                    round
                    color="negative"
                    icon="edit"
                    style="margin-left: 190px; margin-top: -10px"
                    @click="actionsClick()"
                  />
                </q-card-section>
                <q-card-section>
                  <div class="text-center">
                    <ButtonIcon
                      :name="email_model"
                      :value="'change_email'"
                      :btn_class="'text-grey-7'"
                      :btn_icon="'img:img/icons/ic_google.svg'"
                      :size_btn="'sm'"
                      :color="'grey-4'"
                      :icon_right="'keyboard_arrow_down'"
                    />
                  </div>

                  <div class="text-h6 text-grey-10 text-weight-bold q-mt-md">
                    Data personal
                  </div>

                  <FormInput
                    :model_data="name_model"
                    :label_name="'Nama'"
                    :value="'name_model'"
                    @model-data="modelData"
                  />

                  <q-input
                    v-model="phone_model"
                    label="No. Whatsapp"
                    color="primary"
                    ref="phone_input"
                    label-color="primary"
                    reactive-rules
                    :hint="
                      is_error
                        ? 'Awali isi dengan selain angka 0, karena sudah ada +62'
                        : ''
                    "
                    dense
                    class="q-mt-sm"
                    :rules="[(val) => !!val || 'Isi Dulu ya ..']"
                  >
                    <template v-slot:prepend>
                      <span class="text-subtitle1 q-pl-sm q-pr-sm">+62</span>
                      <span class="text-weight-light">|</span>
                    </template>
                    <template v-slot:append>
                      <q-icon size="xs" color="brown" name="edit" />
                    </template>
                  </q-input>
                </q-card-section>
              </q-card>
              <q-btn
                rounded
                color="primary"
                text-color="white"
                label="Simpan"
                class="full-width q-mt-lg"
                type="submit"
                no-caps
                :loading="is_loading"
              />
            </q-form>
          </q-card-section>
        </q-card>

        <DialogConfirm
          :dialog="dialog_confirm"
          :is_icon="is_icon"
          :icon_link="icon_link"
          :icon_color="icon_color"
          :heading="title"
          :subheading="description"
          :data_item="data_photo"
          :value="'file_photo'"
          @dialog-confirm="dialogConfirm"
        />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Avatar from "components/avatar/Avatar.vue";
import ErrorImg from "components/error/ErrorImg.vue";
import CustomTitle from "components/typography/CustomTitle.vue";
import FormInput from "components/form/FormInput.vue";
import ButtonIcon from "components/buttons/ButtonIcon.vue";
import DialogConfirm from "components/dialog/DialogConfirm.vue";
import SkeletonToggle from "components/loading/SkeletonToggle.vue";
import FormSelect from "components/form/FormSelect.vue";

export default {
  components: {
    ErrorImg,
    Avatar,
    CustomTitle,
    FormInput,
    ButtonIcon,
    DialogConfirm,
    SkeletonToggle,
    FormSelect,
  },
  data() {
    return {
      data: {},
      name_model: "",
      phone_model: "",
      email_model: "",
      department_model: "",
      data_photo: "",

      dialog_confirm: false,
      is_icon: false,
      icon_link: "",
      icon_color: "",
      title: "",
      description: "",

      is_error: false,
      is_loading: false,
    };
  },

  methods: {
    ...mapActions({
      logout: "account/logout",
      get_user: "account/getUserProfile",
      post_user: "account/postProfile",
    }),

    actionsClick() {
      this.dialog_confirm = true;
      this.is_icon = true;
      this.icon_link = "insert_photo";
      this.icon_color = "primary";
      this.title = "Upload Photo";
      this.description = "";
    },

    dialogConfirm(e) {
      this.dialog_confirm = e.is_dialog;
      if (e.data) {
        this.data_photo = e.data;
      }
    },

    modelData(e) {
      if (e.value == "name_model") {
        this.name_model = e.data;
      } else if (e.value == "phone_model") {
        this.phone_model = e.data;
      } else if (e.value == "email_model") {
        this.email_model = e.data;
      }
    },

    getUser() {
      this.get_user()
        .then((response) => {
          this.data = response.data.data;
          this.name_model = this.data.name;
          this.email_model = this.data.email;
          this.data_photo = this.data.photo;
        })
        .catch((error) => {});
    },

    updateProfile() {
      if (this.phone_model.charAt(0) == "0") {
        this.$q.notify({
          type: "negative",
          position: "top",
          message: "Format No. Whatsapp salah!!",
        });
      } else {
        this.is_loading = true;

        let data = new FormData();
        data.append("name", this.name_model);
        data.append("email", this.email_model);
        data.append("phone", this.phone_model);

        this.post_user(data)
          .then((response) => {
            this.is_loading = false;
            this.$q.notify({
              type: "positive",
              position: "top",
              message: "Update Profile Berhasil",
            });

            var hostname;
            if (window.location.hostname == "localhost") {
              hostname = window.location.hostname;
            } else {
              var host = window.location.hostname.split(".");
              hostname = host[1] + "." + host[2];
            }

            const expire_date = localStorage.getItem("ed");
            localStorage.setItem("is_r", true);
            this.$q.cookies.set("is_register", true, {
              expires: expire_date,
              secure: true,
              domain: hostname,
            });

            if (
              localStorage.getItem("link") &&
              !localStorage.getItem("link").includes("undefined")
            ) {
              return setTimeout(
                () => (window.location.href = localStorage.getItem("link")),
                1000
              );
            } else {
              return setTimeout(() => (window.location.href = "/"), 1000);
            }
          })
          .catch((error) => {
            this.is_loading = false;
            this.$q.notify({
              type: "negative",
              position: "top",
              message: "Mohon maaf ada kesalahan teknis",
            });
          });
      }
    },
  },

  created() {
    this.getUser();
  },

  computed: {
    ...mapGetters({}),
  },

  watch: {
    phone_model: {
      immediate: true,
      deep: true,
      handler(phone_model) {
        if (phone_model.charAt(0) == "0") {
          this.is_error = true;
        } else {
          this.is_error = false;
        }
      },
    },
  },
};
</script>

<style>
.my-card-register {
  width: 100%;
  max-width: 400px;
  border-radius: 10px;
}

.card-form {
  background: #ffffff;
  border-radius: 12px;
}
</style>

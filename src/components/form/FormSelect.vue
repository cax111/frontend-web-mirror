<template>
  <q-select
    v-model="select_model"
    :options="optionsSelect"
    use-input
    fill-input
    hide-selected
    input-debounce="0"
    option-label="name"
    option-value="id"
    label-color="primary"
    dense
    class="q-mt-sm"
    :label="label_name"
    :rules="[(val) => (val && val.length > 0) || val || 'Pilih dulu ya']"
    @input="setSelectValue(value)"
    @filter="filterFn"
    @filter-abort="abortFilterFn"
  >
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">Tidak ada hasil</q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["model_select", "label_name", "value", "region"],

  data() {
    return {
      select_model: null,
      options: [],
      universityOptions: [],
      prodiOptions: [],
      provinceOptions: [],
      formationOptions: [],
      typing: null,
    };
  },

  methods: {
    ...mapActions({
      getSchools: "account/getSchools",
      getGrades: "account/getGrades",
    }),
    setSelectValue(value) {
      if (value == "province") {
        this.$emit("form-select", {
          id: this.select_model.id,
          name: this.select_model.name,
          value: "province",
        });
      } else if (value == "district") {
        this.$emit("form-select", {
          id: this.select_model.id,
          name: this.select_model.name,
          value: "district",
        });
      } else if (value == "formation") {
        this.$emit("form-select", {
          id: this.select_model.id,
          name: this.select_model.name,
          value: "formation",
        });
      } else if (value == "department") {
        this.$emit("form-select", {
          id: this.select_model.id,
          name: this.select_model.name,
          value: "department",
        });
      } else if (value == "university") {
        this.$emit("form-select", {
          id: this.select_model.id,
          name: this.select_model.name,
          value: "university",
        });
      } else if (value == "prodi") {
        this.$emit("form-select", {
          id: this.select_model.id,
          name: this.select_model.name,
          value: "prodi",
        });
      } else if (value == "school") {
        this.$emit("form-select", {
          id: this.select_model.id,
          name: this.select_model.name,
          grade: this.select_model.grade,
          value: "school",
        });
      }
    },

    filterFn(val, update, abort) { 
      if (this.value == "school") {
        clearTimeout(this.typing);
        this.typing = setTimeout(() => {
          this.getSchools({ search: val, region_id: this.region.id }).then(
            (res) => {
              const schools = res.data.data;
              update(() => {
                this.options = schools;
              });
            }
          );
        }, 1000);
      } else if(this.value == "university") {
        clearTimeout(this.typing);
        this.typing = setTimeout(() => {
          const datas = this.opt_university.filter((item)=>item.name.toLowerCase().includes(val.toLowerCase()))
              update(() => {
                this.universityOptions = datas;
              });
        }, 1000);
      } else if(this.value == "prodi") {
        clearTimeout(this.typing);
        this.typing = setTimeout(() => {
          const datas = this.opt_prodi.filter((item)=>item.name.toLowerCase().includes(val.toLowerCase()))
              update(() => {
                this.prodiOptions = datas;
              });
        }, 1000);
      } else if(this.value == "province") {
        clearTimeout(this.typing);
        this.typing = setTimeout(() => {
          const datas = this.opt_province.filter((item)=>item.name.toLowerCase().includes(val.toLowerCase()))
              update(() => {
                this.provinceOptions = datas;
              });
        }, 1000);
      } else if(this.value == "formation") {
        clearTimeout(this.typing);
        this.typing = setTimeout(() => {
          const datas = this.opt_formations.filter((item)=>item.name.toLowerCase().includes(val.toLowerCase()))
              update(() => {
                this.formationOptions = datas;
              });
        }, 1000);
      } else {
        update();
      }
    },

    abortFilterFn() {
      // console.log('delayed filter aborted')
    },
  },

  computed: {
    ...mapGetters({
      opt_province: "account/getProvince",
      opt_district: "account/getDistrict",
      opt_formations: "account/getFormations",
      opt_university: "account/getUniversities",
      opt_prodi: "account/getProdis",
      opt_schools: "account/getSchools",
      opt_grades: "account/getGradeBySchoolGradeId",
    }),
    optionsSelect() {
      return this.value == "province"
        ? this.provinceOptions
        : this.value == "district"
        ? this.opt_district
        : this.value == "formation"
        ? this.formationOptions
        : this.value == "university"
        ? this.universityOptions
        : this.value == "prodi"
        ? this.prodiOptions
        : this.value == "school"
        ? this.options
        : [];
    },
  },

  watch: {
    model_select: {
      immediate: true,
      deep: true,
      handler(model_select) {
        this.select_model = model_select;
      },
    },
  },
};
</script>

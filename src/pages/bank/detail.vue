<template>
  <div class="relative q-ma-md">
    <div class="bg-grey-2 fixed row q-gutter-sm q-pb-md search-box">
      <q-breadcrumbs class="text-grey-7 col-12">
        <template v-slot:separator>
          <q-icon size="1.5em" name="chevron_right" color="primary" />
        </template>

        <q-breadcrumbs-el label="Bank" icon="fas fa-book" to="/bank" />
        <q-breadcrumbs-el label="Chapters" icon="widgets" />
      </q-breadcrumbs>
      <q-input
        class="q-py-xs q-px-sm bg-white rounded-borders col"
        dense
        borderless
        v-model="search"
        label="Search"
        style="border-radius: 12px"
      />
      <q-btn
        unelevated
        color="primary"
        icon="search"
        style="border-radius: 12px"
      />
    </div>
    <div class="text-primary" style="padding-top: 80px">
      <div v-if="load" class="q-mt-lg">
        <q-skeleton
          v-for="i in 10"
          :key="i"
          class="q-mt-md"
          width="100%"
          height="60px"
          style="border-radius: 10px"
        />
      </div>
      <q-list v-else padding>
        <q-item
          v-for="(item, i) in lessons.length
            ? lessons
                .filter((val, i) => val.id == $route.params.id)[0]
                .chapters.filter((val) =>
                  val.name.toLowerCase().includes(search.toLowerCase())
                )
            : []"
          :key="i"
          clickable
          v-ripple
          class="q-py-md q-my-md bg-white"
          style="border-radius: 12px"
          @click="$router.push(`/questions/${item.id}`)"
        >
          <q-item-section avatar>
            <q-icon name="fas fa-book" size="md" />
          </q-item-section>
          <q-item-section class="col">{{ item.name }}</q-item-section>
          <q-item-section avatar>
            <q-icon name="chevron_right" size="sm" />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>
  <script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      search: "",
      load: false,
    };
  },
  methods: {
    ...mapActions({
      getLessons: "account/getLessons",
    }),
  },
  computed: {
    ...mapGetters({
      lessons: "account/getLessons",
    }),
  },
  async created() {
    this.load = true;
    await this.getLessons();
    this.load = false;
  },
};
</script>
  <style>
.search-box {
  width: calc(100vw - 284px);
  border-bottom: solid 1px #eee;
  top: 55px;
  z-index: 10;
}

@media screen and (max-width: 600px) {
  .search-box {
    width: calc(100vw - 24px);
    top: 46px;
  }
}
</style>
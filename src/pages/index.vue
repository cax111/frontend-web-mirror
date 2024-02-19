<template>
  <div class="q-pa-md">
    <div class="row" :class="{'q-gutter-md': screen > 600, 'q-gutter-y-md': screen <= 600 }">
      <div class="col-md col-sm-12 col-xs-12 q-pa-md bg-red-3 board">
        <q-icon
          class="absolute text-red-2 board-icon"
          :name="home.teacher ? 'fas fa-user-graduate' : 'fas fa-wallet'"
        />
        <p class="text-white text-h4">{{ home.teacher ? "Teachers" : "Balance" }}</p>
        <p class="text-white">{{ home.teacher ? home.teacher : formatPrice(home.balance) }}</p>
      </div>
      <div class="col-md col-sm-12 col-xs-12 q-pa-md bg-green-3 board">
        <q-icon
          class="absolute text-green-2 board-icon"
          :name="home.question ? 'fas fa-file-lines' : 'fas fa-hand-holding-dollar'"
        />
        <p class="text-white text-h4">{{ home.question ? "Total Questions" : "Income" }}</p>
        <p class="text-white">{{ home.question ? home.question : formatPrice(home.income) }}</p>
      </div>
    </div>
    <div class="q-mt-xs row" :class="{'q-gutter-md': screen > 600, 'q-gutter-y-md': screen <= 600 }">
      <div class="col-md col-sm-12 col-xs-12 q-pa-md bg-blue-3 board">
        <q-icon
          class="absolute text-blue-2 board-icon"
          name="fas fa-file-circle-question"
        />
        <p class="text-white text-h4">{{ home.pending_request ? "Pending Requests" : "Total Questions" }}</p>
        <p class="text-white">
          {{ home.pending_request ? home.pending_request : home.total_question }}
        </p>
      </div>
      <div class="col-md col-sm-12 col-xs-12 q-pa-md bg-orange-3 board">
        <q-icon
          class="absolute text-orange-2 board-icon"
          name="fas fa-file-circle-check"
        />
        <p class="text-white text-h4">{{ home.done_request ? "Done Requests" : "Total Requests" }}</p>
        <p class="text-white">{{ home.done_request ? home.done_request : home.total_request }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import common from "../mixins/common";
export default {
  mixins: [common],
  methods: {
    ...mapActions({ getHome: "account/getHome" }),
  },
  computed: {
    ...mapGetters({ home: "account/getHome" }),
  },
  created() {
    this.getHome();
  },
};
</script>
<style>
.board {
  position: relative;
  border-radius: 10px;
  min-height: 200px;
  font-size: 3.25rem;
}
.board-icon {
  top: 40px;
  right: 20px;
  font-size: 120px;
  opacity: 0.4;
}
@media screen and (max-width: 600px) {
  .board {
    font-size: 1.75rem;
    min-height: 50px;
  }
  .board-icon {
    font-size: 100px;
  }
  .text-h4 {
    font-size: 1.75rem;
  }
}
</style>
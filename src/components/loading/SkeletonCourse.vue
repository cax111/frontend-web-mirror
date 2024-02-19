<template>
  <div>
    <!-- List Materi -->
    <q-item
      v-if="chapter"
      class="row items-center q-mt-md q-mx-md border-list bg-white q-pt-sm"
    >
      <div class="col-2 q-pa-sm">
        <q-skeleton type="circle" />
      </div>
      <div class="col-9 text-left q-mt-sm q-mb-sm q-px-md">
        <div class="text-subtitle2 text-weight-bold">
          <q-skeleton type="rect" />
        </div>
        <div class="text-caption">
          <q-skeleton type="text" width="100px" />
        </div>
        <div class="text-subtitle2 text-weight-bold">
          <q-skeleton type="QChip" height="15px" width="100%" />
        </div>
      </div>
      <div class="col-1 q-pl-sm">
        <q-skeleton size="24px" />
      </div>
    </q-item>
    <!-- Detail Materi -->
    <div v-if="progress_belajar" flat>
      <div class="row q-pa-md">
        <div class="col">
          <q-skeleton size="20px" />
        </div>
        <div class="col-11">
          <q-skeleton type="text" width="140px" />
        </div>
      </div>
      <div class="row">
        <div class="col-4 offset-3 text-center">
          <q-skeleton type="text" width="200px" />
        </div>
      </div>
      <div class="row q-pl-xl q-pr-xl q-pa-xs">
        <div class="col-1">
          <q-skeleton type="circle" />
        </div>
        <div class="col-10 offset-1 q-mt-md">
          <q-skeleton type="rect" height="15px" />
        </div>
      </div>
    </div>
    <q-item
      v-if="list_belajar"
      class="row items-center q-mt-md border-radius-course shadow-2 q-pt-sm"
    >
      <div class="col-2 q-pa-sm">
        <q-skeleton type="circle" />
      </div>
      <div class="col-9 text-left q-mt-sm q-mb-sm q-px-md">
        <div class="text-subtitle2 text-weight-bold">
          <q-skeleton type="text" width="150px" />
        </div>
        <div class="row items-start no-wrap q-mt-sm q-pr-lg">
          <q-skeleton size="20px" />
          <div class="col q-pl-xs">
            <q-skeleton type="text" width="50px" />
          </div>
          <q-skeleton size="20px" class="q-pl-xs" />
          <div class="col q-pl-xs">
            <q-skeleton type="text" width="50px" />
          </div>
          <q-skeleton size="20px" class="q-pl-xs" />
          <div class="col q-pl-xs">
            <q-skeleton type="text" width="50px" />
          </div>
        </div>
      </div>
      <div class="col-1">
        <q-skeleton size="24px" />
      </div>
    </q-item>
    <div v-if="progress_list" class="q-mb-sm q-pa-md">
      <div class="row">
        <div class="col">
          <q-skeleton size="20px" />
        </div>
        <div class="col-11 q-pl-sm">
          <q-skeleton type="text" width="100px" />
        </div>
      </div>
      <div class="q-pt-none">
        <div class="row">
          <div v-for="l in 6" :key="l" class="col-6">
            <div class="row q-pt-md">
              <div class="col-3">
                <q-skeleton type="circle" size="25px" />
              </div>
              <div class="col-9 q-pl-xs">
                <q-skeleton type="text" width="40px" />
                <q-skeleton type="QChip" width="70px" height="14px" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="bookmarks" class="q-mb-sm">
      <div class="row q-pa-md">
        <div class="col">
          <q-skeleton size="20px" />
        </div>
        <div class="col-11 q-pl-sm">
          <q-skeleton type="text" width="100px" />
        </div>
      </div>
      <q-card-section v-for="l in 3" :key="l" class="q-pt-none">
        <div class="row">
          <div class="row q-pt-md">
            <div class="col-3">
              <q-skeleton type="QToggle" />
            </div>
            <div class="col-9 q-pl-md">
              <q-skeleton type="text" width="100px" />
              <q-skeleton type="QChip" width="90px" height="14px" />
            </div>
          </div>
        </div>
      </q-card-section>
    </div>
    <!-- Detail Materi Lesson -->
    <div v-if="detail_list">
      <div class="row">
        <div class="col-md-8 offset-md-4 col-sm-8 offset-sm-4">
          <q-skeleton type="text" height="30px" width="50%" />
        </div>
      </div>
      <div class="col-9">
        <div class="row justify-center q-mt-sm">
          <q-skeleton size="20px" />
          <div class="col-2 q-pl-xs">
            <q-skeleton type="text" width="55px" />
          </div>
          <q-skeleton size="20px" />
          <div class="col-2 q-pl-xs">
            <q-skeleton type="text" width="55px" />
          </div>
          <q-skeleton size="20px" class="q-pl-xs" />
          <div class="col-2 q-pl-xs">
            <q-skeleton type="text" width="55px" />
          </div>
        </div>
      </div>
    </div>
    <div>
      <q-card
        v-if="list_more"
        class="border-radius-custom q-pa-md"
        style="bottom: 50px"
      >
        <div class="row items-start no-wrap q-mt-sm">
          <q-skeleton width="135px" height="70px" />
          <div class="col q-pl-sm q-pt-md">
            <q-skeleton type="QBtn" square width="100%" animation="fade" />
          </div>
        </div>
        <div class="col q-pt-sm">
          <q-skeleton type="QBtn" square width="100%" animation="fade" />
        </div>
      </q-card>
    </div>
    <!-- Detail Materi Video -->
    <q-card v-if="detail_video" class="q-pa-md" style="border: 1px">
      <div class="row justify-center q-pb-md">
        <q-skeleton type="text" square width="30%" animation="fade" />
      </div>
      <div class="">
        <q-skeleton height="280px" class="q-mb-sm" />
      </div>
      <div class="row justify-end">
        <div v-for="l in 4" :key="l">
          <div class="q-pa-sm">
            <q-skeleton type="circle" size="25px" />
          </div>
        </div>
      </div>
    </q-card>
    <q-card v-if="video_liveclass" class="q-pa-md" style="border: 1px">
      <div class="">
        <q-skeleton height="280px" class="q-mb-sm" />
      </div>
      <div class="row justify-between q-pb-md">
        <q-skeleton type="text" square width="50%" animation="fade" />
        <q-skeleton type="text" square width="20%" animation="fade" />
      </div>
      <div class="row justify-between">
        <div v-for="l in 3" :key="l">
          <div class="q-pa-sm">
            <q-skeleton type="circle" size="25px" />
          </div>
        </div>
        <div class="q-pa-sm">
          <q-skeleton type="circle" size="25px" />
        </div>
      </div>
    </q-card>
    <q-card v-if="video_comment" style="border: 1px" flat>
      <q-card-section>
        <!-- <q-skeleton type="text" class="text-subtitle2" width="60%" />
        <q-item style="max-width: 300px">
          <q-item-section avatar>
            <q-skeleton type="QAvatar" size="30px" />
          </q-item-section>
          <q-item-section class="row">
            <q-skeleton width="130px" height="20px" />
          </q-item-section>
        </q-item> -->
        <div v-for="v in 5" :key="v" class="q-mt-md">
          <q-item>
            <q-item-section avatar>
              <q-skeleton type="QAvatar" />
            </q-item-section>

            <q-item-section>
              <q-item-label>
                <q-skeleton type="text" />
              </q-item-label>
              <q-item-label caption>
                <q-skeleton type="text" width="65%" />
              </q-item-label>
            </q-item-section>
          </q-item>
          <div class="q-mx-lg">
            <q-skeleton class="q-my-sm" square width="100%" height="16px" />
            <q-skeleton class="q-my-sm" square width="100%" height="16px" />
            <q-skeleton class="q-my-sm" square width="100%" height="16px" />
          </div>
        </div>
      </q-card-section>
    </q-card>
    <!-- Detail Materi quiz -->
    <div v-if="detail_quiz">
      <div class="row justify-center q-pb-md">
        <q-skeleton type="text" width="150px" />
      </div>
      <div class="row justify-center q-pb-md">
        <q-skeleton type="text" width="200px" />
      </div>
    </div>
    <div v-if="soal_quiz">
      <q-skeleton height="320px" square />
    </div>
    <div v-if="quiz_btn">
      <div class="row justify-center">
        <div v-for="v in 5" :key="v" class="q-pl-lg">
          <q-skeleton type="QAvatar" />
        </div>
      </div>
    </div>
    <div v-if="quiz_tool">
      <q-skeleton height="55px" square />
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "chapter",
    "progress_belajar",
    "list_belajar",
    "progress_list",
    "bookmarks",
    "detail_list",
    "list_more",
    "detail_video",
    "video_comment",
    "video_liveclass",
    "detail_quiz",
    "quiz_btn",
    "soal_quiz",
    "quiz_tool",
  ],
};
</script>

<style>
.border-radius-course {
  border-radius: 10px;
  border: 1px solid #eee;
}
</style>

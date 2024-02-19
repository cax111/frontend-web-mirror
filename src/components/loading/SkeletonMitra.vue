<template>
  <div class="row q-pa-md">
    <div class="col-8">
      <q-card style="border-radius: 10px" class="shadow-2">
        <q-card-section>
          <q-skeleton type="text" />

          <q-skeleton type="avatar" />

          <q-skeleton type="text" />

          <q-skeleton type="text" class="text-subtitle1" />
          <q-skeleton type="text" class="text-caption" />
          <q-skeleton type="text" width="50%" class="text-subtitle1" />
        </q-card-section>
      </q-card>
    </div>
    <div class="col-4 q-pl-md q-gutter-md">
      <q-card
        style="border-radius: 10px"
        class="text-center shadow-2 button-icon-primary"
      >
        <q-card-section>
          <q-skeleton type="text" />

          <q-skeleton type="avatar" class="q-mt-md" />

          <q-skeleton type="text" />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
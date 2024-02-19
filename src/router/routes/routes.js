import authRoutes from './authRoutes'

const routes = [
  ...authRoutes,
  {
    path: "/",
    props: true,
    component: () => import("layouts/NewLayout.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("src/pages/index.vue"),
      },
      {
        path: "/bank",
        name: "bank",
        component: () => import("src/pages/bank/index.vue"),
      },
      {
        path: "/bank/:id",
        name: "bank-detail",
        component: () => import("src/pages/bank/detail.vue"),
      },
      {
        path: "/request",
        name: "request",
        component: () => import("src/pages/request/index.vue"),
      },
      {
        path: "/akun",
        name: "akun",
        props: true,
        component: () => import("src/pages/account/Account.vue"),
      },
    ],
  },
  {
    path: "/questions",
    component: () => import("layouts/TryoutLayout.vue"),
    children: [
      {
        path: ":id",
        name: "bank-questions",
        component: () => import("src/pages/bank/questions.vue"),
      },
      {
        path: "request/:id",
        name: "bank-questions-request",
        component: () => import("src/pages/bank/questions.vue"),
      },
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue"),
  },

  {
    path: "/maintenance",
    name: "maintenance",
    component: () => import("pages/Maintenance.vue"),
  },
];

export default routes;

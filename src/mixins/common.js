import moment from "moment";
import CryptoJS from "crypto-js";
export default {
  data() {
    return { screen: null, scrollY: null };
  },
  computed: {
    tab: {
      set() { },
      get() {
        return this.$route.name;
      },
    },
    layoutWithSelection() {
      return (
        this.$route.name == "tryout" ||
        this.$route.name == "latsol" ||
        this.$route.name == "materi" ||
        this.$route.name == "liveclass"
      );
    },
    layoutWithCategories() {
      return (
        this.$route.name == "tryout" ||
        this.$route.name == "latsol" ||
        this.$route.name == "materi" ||
        this.$route.name == "pembelian-riwayat" ||
        this.$route.name == "liveclass-list" ||
        this.$route.name == "blog" ||
        this.$route.name == "loker"
      );
    },
    layoutLoker() {
      return (
        this.$route.name == "loker"
      );
    },
    layoutWithPromo() {
      return (
        this.$route.name == "tryout" ||
        this.$route.name == "latsol" ||
        this.$route.name == "materi-search" ||
        this.$route.name == "liveclass" ||
        this.$route.name == "liveclass-list" ||
        this.$route.name == "liveclass-detail" ||
        this.$route.name == "liveclass-rerun" ||
        this.$route.name == "liveclass-stream" ||
        this.$route.name == "materi" ||
        this.$route.name == "pembelian" ||
        this.$route.name == "pembelian-riwayat" ||
        this.$route.name == "pembelian-mitra" ||
        this.$route.name == "pembelian-review" ||
        this.$route.name == "pembelian-invoice" ||
        this.$route.name == "pembelian-mitra-landing" ||
        this.$route.name == "pembelian-mitra-register"
      );
    },
  },
  methods: {
    encrypt(txt, key) {
      const encrypted = CryptoJS.MD5(key + "-" + txt).toString();

      var a = encrypted.slice(0, 16);
      var b = encrypted.slice(16, 32);

      return a + txt + b;
    },
    decrypt(txt) {
      var decMessage = txt.slice(16);
      return decMessage.slice(0, decMessage.length - 16);
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return "Rp" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    timeFormat(oldTime) {
      const time = new Date("1970-01-01 " + oldTime);
      return moment(time).format("HH:mm");
    },
    getDay() {
      const date = new Date();
      const result = moment(date).locale("id").format("ddd");
      return result;
    },
    getDate(unformattedDate) {
      const date = new Date(unformattedDate);
      const result = moment(date).locale("id").format("DD MMMM YYYY");
      return result;
    },
    getIndexDay() {
      switch (this.getDay()) {
        case "Sab":
          return 0;
          break;
        case "Min":
          return 1;
          break;
        case "Sen":
          return 2;
          break;
        case "Sel":
          return 3;
          break;
        case "Rab":
          return 4;
          break;
        case "Kam":
          return 5;
          break;
        case "Jum":
          return 6;
      }
    },
    handleResize() {
      this.screen = window.innerWidth;
    },
    handleScroll() {
      this.scrollY = window.scrollY;
    },
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    window.addEventListener("scroll", this.handleScroll);
    this.handleResize();
    this.handleScroll();
    this.screen = window.innerWidth;
    this.scrollY = window.scrollY;
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("scroll", this.handleScroll);
  },
};

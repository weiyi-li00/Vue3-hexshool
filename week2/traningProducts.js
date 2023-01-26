//1.確認是否登陸
import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
const apiUrl = "https://vue3-course-api.hexschool.io/v2";
const apiPath = "2ndclothes"; //請寫自己的
const app = createApp({
  data() {
    return {
      products: [],
      tempProduct: {}
    };
  },
  methods: {
    checkLogin() {
      console.log(`${apiUrl}/api/user/check`);
      const url = `${apiUrl}/api/user/check`;
      axios
        .post(url)
        .then((res) => {
          if (res.data.success === false) {
            alert("驗證錯誤請重新登錄");
            window.location = "./traningLogin.html";
            return;
          }
          this.getProducts();
        })
        .catch((err) => {
          window.location = "./traningLogin.html";
        });
    },
    getProducts() {
      const url = `${apiUrl}/api/${apiPath}/admin/products/all`;
      axios
        .get(url)
        .then((res) => {
          this.products = res.data.products;
          //console.log("ppp", Object.keys(this.products).length);
        })
        .catch(() => {});
    }
  },
  mounted() {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("hexToken="))
      .split("=")[1];
    //console.log("ssss", cookieValue);
    //axios headers
    axios.defaults.headers.common["Authorization"] = cookieValue;
    this.checkLogin();
  }
});
app.mount("#app");

import axios from "axios";
import { action, computed, makeObservable, observable } from "mobx";

export class ProdukStore {
  count = 0;
  name = "Riyanwar Setiadi";
  editProduk = observable.map();
  produk = observable.map();
  limit = 8;
  offset = 0;
  errorData = false;
  errorMessage = "";
  currentSku = null;
  updateDataValue = null;

  constructor() {
    makeObservable(this, {
      produk: observable,
      editProduk: observable,
      errorData: observable,
      updateDataValue: observable,
      count: observable,
      name: observable,
      limit: observable,
      offset: observable,
      currentSku: observable,
      counterIncrementAction: action,
      loadData: action,
      getData: action,
      getProducts: computed,
      addData: action,
      editData: action,
      getEditData: action,
      getEditProduct: computed,
      getUpdateDataValue: computed,
      updateData: action,
    });
  }

  get getProducts() {
    return this.produk.get("data");
  }

  getData() {
    return this.produk.get("data");
  }

  get getEditProduct() {
    return this.editProduk.get("editdata");
  }

  get getUpdateDataValue() {
    return this.updateDataValue;
  }

  getEditData() {
    return this.editProduk.get("editdata");
  }

  async editData(sku) {
    const data = await axios.get(`http://localhost:7000/products/${sku}`);
    this.currentSku = sku;
    this.editProduk.set("editdata", data.data);
  }

  async loadData(data) {
    console.log(data);
    // this.produk.clear();
    this.produk.set("data", data);
    // this.produk.set("data", res.data.data);
  }

  async addData(form) {
    // console.log(form.getAll("name"));
    try {
      const data = await axios.post(`http://localhost:7000/products`, form);
      if (data.data.status === false) {
        this.errorData = true;
        this.errorMessage = data.data.message;
      } else {
        console.log("Balikn ", data.data);
        this.produk.clear();
        this.produk.set("data", data.data);
      }
    } catch (error) {
      this.errorData = true;
      this.errorMessage = error.response.data.message;
      console.log(error);
    }
    // this.loadData()
  }

  async updateData(sku, form) {
    console.log(form.getAll("name"));
    console.log(form.getAll("sku"));
    console.log(form.getAll("image"));
    console.log(form.getAll("description"));
    console.log(form.getAll("price"));
    console.log("SKU CURRENT : ", sku);
    try {
      const data = await axios.put(
        `http://localhost:7000/products/update/${sku}`,
        form
      );
      if (data.data.status === false) {
        this.errorData = true;
        this.errorMessage = data.data.message;
      } else {
        console.log(`DATA BALIKAN `, data.data);
        this.updateDataValue = data.data;
      }
    } catch (error) {
      this.errorData = true;
      this.errorMessage = error.response.data.message;
      console.log(error);
    }
    // this.loadData()
  }

  counterIncrementAction() {
    this.count += 1;
    this.name = this.name + " " + this.count;
    this.offset += 8;
    this.loadData();
  }

  async setSkuDelete(sku) {
    this.currentSku = sku;
  }
}

export default new ProdukStore();

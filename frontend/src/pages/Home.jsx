import axios from "axios";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import ModalAdd from "../components/ModalAdd";
import ModalEdit from "../components/ModalEdit";
import ModalInfo from "../components/ModalInfo";
import { useStore } from "../stores";

const Home = observer(() => {
  const { produkstore } = useStore();
  const [offset, setoffset] = useState(0);
  const [limit, setlimit] = useState(8);
  const [data, setdata] = useState([]);
  const [add, setadd] = useState(false);
  const [edit, setedit] = useState(false);
  const [info, setinfo] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false);
  const [form, setform] = useState({});
  const [loading, setloading] = useState(false);
  const [infodata, setinfodata] = useState({});

  const [error, seterror] = useState(produkstore.errorData);

  const loadMore = async () => {
    setoffset(offset + 8);
  };

  const onChange = (e) => {
    if (e.target.type == "file") {
      setform({ ...form, [e.target.name]: e.target.files[0] });
    } else {
      setform({ ...form, [e.target.name]: e.target.value });
    }
  };

  const importProduk = async () => {
    setloading(true);
    const data = await axios.get("http://localhost:7000/products/imports");
    setinfodata(data.data);
    setoffset(0);
    setinfo(true);
    setloading(false);
  };

  const submitAddProduk = async (e) => {
    setloading(true);
    setadd(false);
    let formData = new FormData();
    formData.append("name", form.name);
    formData.append("sku", form.sku);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("image", form.image);
    produkstore.addData(formData);
    setTimeout(() => {
      console.log("Status Error Data False : ", produkstore.errorData == false);
      if (produkstore.errorData) {
        seterror(true);
        alert(produkstore.errorMessage);
      } else {
        produkstore.getData();
        console.log("Produk New : ", produkstore.getData());
        setdata(data.concat(produkstore.getData()));
      }
      setloading(false);
    }, 400);
  };

  const getData = async () => {
    const res = await axios.get(`http://localhost:7000/products`, {
      params: {
        limit: limit,
        offset: offset,
      },
    });
    setdata(data.concat(res.data.data));
    setTimeout(() => {
      produkstore.loadData(data);
      console.log(produkstore.getProducts.length);
    }, 600);
  };

  useEffect(() => {
    (async () => {
      window.onscroll = () => {
        if (
          window.innerHeight + document.documentElement.scrollTop ===
          document.documentElement.offsetHeight
        ) {
          setTimeout(() => {
            loadMore();
          }, 1000);
        }
      };
      console.log(error);
      await getData();
      //   if (data.length < 1) {
      //     setTimeout(() => {
      //       setdata(data.concat(produkstore.getData()));
      //     }, 300);
      //   }
    })();
  }, [offset, infodata]);

  const addModalFunc = () => {
    if (add) {
      setadd(false);
    } else {
      setadd(true);
    }
  };

  const infoModalFunc = () => {
    if (info) {
      setinfo(false);
    } else {
      setinfo(true);
    }
  };

  const editModalFunc = () => {
    setTimeout(() => {
      if (edit) {
        setedit(false);
      } else {
        console.log("EDIT : ", produkstore.getEditProduct);
        const forms = {
          id: produkstore.getEditProduct.id,
          image: produkstore.getEditProduct.image,
          name: produkstore.getEditProduct.name,
          description: produkstore.getEditProduct.description,
          price: produkstore.getEditProduct.price,
          sku: produkstore.getEditProduct.sku,
        };
        setform({ ...form, ...forms });
        setedit(true);
      }
    }, 500);
  };

  const deleteModalFunc = () => {
    if (deleteModal) {
      setdeleteModal(false);
    } else {
      setdeleteModal(true);
    }
  };

  async function updatedata() {
    setloading(true);
    setedit(false);
    let formData = new FormData();
    formData.append("name", form.name);
    formData.append("sku", form.sku);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("image", form.image);
    console.log("CURRENT SKU : ", produkstore.currentSku);
    produkstore.updateData(produkstore.currentSku, formData);
    setTimeout(() => {
      console.log("Status Error Data False : ", produkstore.errorData == false);
      if (produkstore.errorData) {
        seterror(true);
        alert(produkstore.errorMessage);
      } else {
        var datas = [];
        datas.push(produkstore.updateDataValue);
        console.log(datas);
        setdata(data.map((obj) => datas.find((o) => o.id === obj.id) || obj));
        // produkstore.getData();
        // console.log("Produk New : ", produkstore.getData());
        // setdata(data.concat(produkstore.getData()));
      }
      setloading(false);
    }, 700);
  }

  async function deleteProduk() {
    console.log("ABCS");
    console.log(produkstore.currentSku);
    const d = await axios.post(`http://localhost:7000/products/delete`, {
      sku: produkstore.currentSku,
    });
    setdata(data.filter((item) => item.sku != produkstore.currentSku));
  }

  return (
    <>
      {add ? (
        <ModalAdd
          hideModal={addModalFunc}
          title={"Tambah Produk"}
          onChange={onChange}
          submitAddProduk={submitAddProduk}
        />
      ) : null}
      {info ? (
        <ModalInfo
          hideModal={infoModalFunc}
          sku_nil={infodata.sku_nil}
          sku_notnil={infodata.sku_notnil}
          duplicate_sku={infodata.duplicate_sku}
        />
      ) : null}
      <div className="flex my-4 w-full justify-end pr-4">
        <Button
          label={"Tambah"}
          onClick={addModalFunc}
          color={"bg-blue-600 text-white px-3 mx-1"}
        />
        <Button
          label={"Import"}
          onClick={importProduk}
          color={"bg-emerald-600 text-white px-3 mx-1"}
        />
      </div>

      <div className="flex flex-row flex-wrap gap-3 p-4 justify-center">
        {data.length > 0 && !loading
          ? data.map((val, index) => (
              <div key={index} className="cursor-pointer flex justify-start">
                <Card
                  id={val.id}
                  description={val.description}
                  sku={val.sku}
                  name={val.name}
                  price={val.price}
                  image={val.image}
                  onChange={onChange}
                  edit={edit}
                  form={form}
                  deleteModal={deleteModal}
                  deleteModalFunc={deleteModalFunc}
                  editModalFunc={editModalFunc}
                  updatedata={updatedata}
                  produkstore={produkstore}
                  deleteProduk={deleteProduk}
                />
              </div>
            ))
          : null}
      </div>
      <div className="p-4 flex justify-center">
        {data.length == 0 && !loading ? (
          <div className=" text-bold text-lg">No data!</div>
        ) : offset > data.length || loading ? null : (
          <div className="text-bold text-lg animate-pulse animate-bounce">
            Loading...
          </div>
        )}
      </div>
    </>
  );
});

export default Home;

import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import Modal from "../components/Modal";
import ModalInfo from "../components/ModalInfo";

function Home() {
  const [limit, setlimit] = useState(8);
  const [offset, setoffset] = useState(0);
  const [alldata, setalldata] = useState([]);
  const [addmodal, setaddmodal] = useState(false);
  const [info, setinfo] = useState({});
  const [infomodal, setinfomodal] = useState(false);
  const [form, setform] = useState({
    name: null,
    sku: null,
    description: null,
    price: null,
    image: null,
  });

  const [currentsku, setcurrentsku] = useState("");

  const renewData = async () => {
    setalldata([]);
    const data = await axios.get("http://localhost:7000/products", {
      params: {
        limit: limit,
        offset: offset,
      },
    });
    setalldata(alldata.concat(data.data.data));
  };

  const getData = async () => {
    const data = await axios.get("http://localhost:7000/products", {
      params: {
        limit: limit,
        offset: offset,
      },
    });
    setalldata(alldata.concat(data.data.data));
  };

  const loadMore = async () => {
    setoffset(offset + 8);
  };

  const onClick = () => {
    if (!addmodal) {
      setaddmodal(true);
    } else {
      setaddmodal(false);
    }
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
      await getData();
    })();
  }, [offset]);

  const onChange = (e) => {
    // console.log(e.target.files[0]);
    if (e.target.type == "file") {
      setform({ ...form, [e.target.name]: e.target.files[0] });
    } else {
      setform({ ...form, [e.target.name]: e.target.value });
    }
  };

  const editonChange = (e) => {
    // console.log(e.target.files[0]);
    if (e.target.type == "file") {
      setform({ ...form, [e.target.name]: e.target.files[0] });
    } else {
      setform({ ...form, [e.target.name]: e.target.value });
    }
  };

  const submitAddProduk = async (e) => {
    let formData = new FormData();
    formData.append("name", form.name);
    formData.append("sku", form.sku);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("image", form.image);

    try {
      const data = await axios.post("http://localhost:7000/products", formData);
      console.log("DATA ", data);
      if (data.data.status == false) {
        alert(data.data.message);
      } else {
        let newdata = [];
        newdata.push(data.data);
        setalldata(alldata.concat(newdata));
        console.log(alldata);
        setaddmodal(false);
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  const importProduk = async () => {
    const data = await axios.get("http://localhost:7000/products/imports");
    setinfo(data.data);
    setinfomodal(true);
    setalldata([]);
    await getData();
  };

  const hideModalInfo = async () => {
    if (!infomodal) {
      setinfomodal(true);
    } else {
      setinfomodal(false);
    }
  };

  const currentsetsku = async (val) => {
    setcurrentsku(val);
  };

  const updateState = async (val) => {
    console.log("VAL ", val);
    setalldata(alldata.map((obj) => val.find((o) => o.id === obj.id) || obj));
  };

  const deleteProduk = async () => {
    console.log("ABCS");
    console.log(currentsku);
    const d = await axios.post(`http://localhost:7000/products/delete`, {
      sku: currentsku,
    });
    setalldata(alldata.filter((item) => item.sku != currentsku));
  };

  return (
    <>
      <div className="flex my-4 w-full justify-end pr-4">
        <Button
          label={"Tambah"}
          onClick={onClick}
          color={"bg-blue-600 text-white px-3 mx-1"}
        />
        <Button
          label={"Import"}
          onClick={importProduk}
          color={"bg-emerald-600 text-white px-3 mx-1"}
        />
      </div>
      {addmodal ? (
        <Modal
          hideModal={onClick}
          title={"Tambah Produk"}
          onChange={onChange}
          submitAddProduk={submitAddProduk}
        />
      ) : null}
      {infomodal ? (
        <ModalInfo
          hideModal={hideModalInfo}
          sku_nil={info.sku_nil}
          sku_notnil={info.sku_notnil}
          duplicate_sku={info.duplicate_sku}
        />
      ) : null}
      <div className="flex flex-row flex-wrap gap-3 p-4 justify-center">
        {alldata.map((product, index) => {
          return (
            <div key={index} className="cursor-pointer flex justify-start">
              <Card
                sku={product.sku}
                name={product.name}
                price={product.price}
                image={product.image}
                setsku={setcurrentsku}
                deleteProduk={deleteProduk}
                currentsetsku={currentsetsku}
                updateState={updateState}
                // onChange={editonChange}
                // editdata={editdata}
              />
            </div>
          );
        })}
      </div>
      <div className="p-4 flex justify-center">
        {alldata.length == 0 ? (
          <div className=" text-bold text-lg">No data!</div>
        ) : offset > alldata.length ? null : (
          <div className="text-bold text-lg animate-pulse animate-bounce">
            Loading...
          </div>
        )}
      </div>
    </>
  );
}

export default Home;

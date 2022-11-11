import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import ModalDelete from "./ModalDelete";
import ModalEdit from "./ModalEdit";

function Card({
  sku,
  image,
  name,
  description,
  price,
  deleteProduk,
  currentsetsku,
  updateState,
  setsku,
  // editdata,
}) {
  const [addmodal, setaddmodal] = useState(false);
  const [editmodal, seteditmodal] = useState(false);
  const [form, setform] = useState({
    name: null,
    sku: null,
    description: null,
    price: null,
    image: null,
  });
  function currencyFormat(num) {
    return (
      "Rp " +
      Math.round(num)
        .toFixed(0)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    );
  }

  function onClick() {
    if (!addmodal) {
      setaddmodal(true);
      // setsku(sku);
      currentsetsku(sku);
    } else {
      setaddmodal(false);
      setsku("");
    }
  }

  const editdata = async () => {
    console.log("ADSADAD");
    console.log("curren sku : ", sku);
    const data = await axios.get(`http://localhost:7000/products/${sku}`);
    console.log("DATA ", data.data);
    setform({ ...data.data });
  };

  function editModalonClick() {
    if (!editmodal) {
      console.log("SKU : ", sku);
      seteditmodal(true);
      // setsku(sku);
      editdata();
    } else {
      seteditmodal(false);
      setsku("");
    }
  }

  const updatedata = async () => {
    console.log("Update data ", form);
    let formData = new FormData();
    formData.append("name", form.name);
    formData.append("sku", form.sku);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("image", form.image);
    currentsetsku(sku);
    const data = await axios.put(
      `http://localhost:7000/products/update/${sku}`,
      formData
    );
    if (data.data.status == false) {
      alert(data.data.message);
    } else {
      updateState([data.data]);
      console.log(data);
    }
    // const data = await axios.get(`http://localhost:7000/products/${sku}`);
  };

  const editonChange = (e) => {
    // console.log(e.target.files[0]);
    if (e.target.type == "file") {
      setform({ ...form, [e.target.name]: e.target.files[0] });
    } else {
      setform({ ...form, [e.target.name]: e.target.value });
    }
  };

  return (
    <div>
      {addmodal ? (
        <ModalDelete
          deleteProduk={deleteProduk}
          title={"Peringatan"}
          onClick={onClick}
        />
      ) : null}
      {editmodal ? (
        <ModalEdit
          title={"Edit Produk"}
          sku={sku}
          editModalonClick={editModalonClick}
          onChange={editonChange}
          form={form}
          updatedata={updatedata}
        />
      ) : null}
      <div className="bg-white md:w-[21rem] w-[24rem] h-[22rem] rounded-lg overflow-hidden shadow-lg">
        <div>
          <img
            src={
              image
                ? image
                : "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
            }
            alt=""
            className="h-52 w-full object-cover"
          />
        </div>
        <div className="p-2 h-[8rem]  flex flex-col space-y-2">
          <span className="font-normal text-xs  text-yellow-700">
            SKU : {sku}
          </span>
          <h2 className="font-normal text-sm">{name}</h2>
          <span className="font-extrabold h-full flex justify-between items-center ">
            <div className="flex">{currencyFormat(price)}</div>
            <div className="flex">
              <Button
                label={"Delete"}
                color={"bg-red-600 text-white px-3 mx-1"}
                onClick={onClick}
              />
              <Button
                label={"Edit"}
                color={"bg-yellow-600 text-white px-5 mx-1"}
                onClick={editModalonClick}
              />
            </div>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Card;

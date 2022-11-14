import React from "react";
import currencyFormat from "../helpers/currencyFormat";
import Button from "./Button";
import ModalDelete from "./ModalDelete";
import ModalEdit from "./ModalEdit";

function Card({
  form,
  onChange,
  editModalFunc,
  id,
  edit,
  description,
  sku,
  deleteModalFunc,
  deleteModal,
  name,
  price,
  image,
  updatedata,
  produkstore,
  deleteProduk,
}) {
  const clickEdit = () => {
    editModalFunc();
    produkstore.editData(sku);
  };
  const clickDelete = () => {
    deleteModalFunc();
    produkstore.setSkuDelete(sku);
  };
  return (
    <>
      {edit ? (
        <ModalEdit
          title={"Edit Produk"}
          sku={sku}
          editModalFunc={editModalFunc}
          onChange={onChange}
          form={form}
          updatedata={updatedata}
        />
      ) : null}
      {deleteModal ? (
        <ModalDelete
          title={"Delete Produk"}
          sku={sku}
          deleteModalFunc={deleteModalFunc}
          onChange={onChange}
          form={form}
          deleteProduk={deleteProduk}
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
                onClick={clickDelete}
              />
              <Button
                label={"Edit"}
                color={"bg-yellow-600 text-white px-5 mx-1"}
                onClick={clickEdit}
              />
            </div>
          </span>
        </div>
      </div>
    </>
  );
}

export default Card;

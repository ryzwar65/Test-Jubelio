import React from "react";

export default function Modal({ hideModal, title, onChange, submitAddProduk }) {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">{title}</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={hideModal}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="flex flex-col p-6 w-full">
              <div className="flex justify-center items-center w-full">
                <div className="flex items-center flex-col w-full">
                  <label className="mb-5">Nama Produk</label>
                  <input
                    type="text"
                    className="w-full px-3 py-5 rounded-md h-5 border-2 border-slate-600"
                    name="name"
                    placeholder="Masukan Nama Produk"
                    onChange={onChange}
                  />
                </div>
                <div className="mx-3 flex items-center flex-col w-full">
                  <label className="mb-5">SKU Produk</label>
                  <input
                    type="text"
                    className="w-full px-3 py-5 rounded-md h-5 border-2 border-slate-600"
                    name="sku"
                    placeholder="Masukan SKU Produk"
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className="pt-2 flex justify-center items-center w-full">
                <div className="flex items-center flex-col w-full">
                  <label className="mb-5">Harga Produk</label>
                  <input
                    type="number"
                    className="w-full px-3 py-5 rounded-md h-5 border-2 border-slate-600"
                    name="price"
                    placeholder="Masukan Harga Produk"
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className="pt-2 flex justify-center items-center w-full">
                <div className="flex items-center flex-col w-full">
                  <label className="mb-5">Gambar Produk</label>
                  <input
                    type="file"
                    className="w-full px-3"
                    name="image"
                    placeholder="Masukan Harga Produk"
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className="pt-2 flex justify-center items-center w-full">
                <div className="flex items-center flex-col w-full">
                  <label className="mb-5">Deksripsi</label>
                  <textarea
                    name="description"
                    onChange={onChange}
                    className="w-full border-2 border-slate-600 p-3 h-28"
                  ></textarea>
                </div>
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={hideModal}
              >
                Close
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={submitAddProduk}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

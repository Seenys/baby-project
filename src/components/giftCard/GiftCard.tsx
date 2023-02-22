// React
import React, { FC, useEffect } from "react";

// Icons
import { BsFillTrashFill } from "react-icons/bs";
import { AiFillEdit, AiFillCheckCircle } from "react-icons/ai";
//Types
import { Gift } from "@/types/firebase";

interface Props {
  id: string;
  idKey: string;
  gift: string;
  quantity: number;
  edit: string;
  editedValue: Gift;
  handleAddEdit: (value: string) => void;
  setEditedValue: (value: Gift) => void;
  deleteGift: (id: string) => void;
  editGift: () => void;
}

const GiftCard: FC<Props> = ({
  gift,
  quantity,
  deleteGift,
  id,
  idKey,
  edit,
  editGift,
  handleAddEdit,
  editedValue,
  setEditedValue,
}) => {
  return (
    <div className="flex items-stretch">
      {!(edit === idKey) ? (
        <>
          <span className="bg-white outline-none p-2 text-base sm:text-lg text-slate-900 flex-1">
            {gift}
          </span>
          <span className="w-fit px-4 sm:px-6 py-2 sm:py-3 bg-pink text-slate-900 font-medium text-base">
            {quantity}
          </span>
        </>
      ) : (
        <>
          <input
            value={editedValue.gift}
            placeholder="Please enter your todo"
            required
            className="outline-none p-2 text-base sm:text-lg text-slate-900 flex-1"
            onChange={(e) =>
              setEditedValue({ ...editedValue, gift: e.target.value })
            }
          />
          <input
            value={editedValue.quantity}
            type="number"
            required
            className="outline-none p-2 text-base sm:text-lg text-slate-900 flex w-1/5 border-l border-solid border-slate-900"
            onChange={(e) =>
              setEditedValue({ ...editedValue, quantity: +e.target.value })
            }
          />
        </>
      )}

      <span
        onClick={() => {
          if (edit !== idKey) {
            handleAddEdit(idKey);
            return;
          }
          editGift();
          handleAddEdit("");
        }}
        className="w-fit px-4 sm:px-6 py-2 sm:py-3  bg-blue1 text-slate-900 font-medium text-xl duration-300 hover:opacity-90 cursor-pointer capitalize"
      >
        {edit === idKey ? <AiFillCheckCircle /> : <AiFillEdit />}
      </span>
      <span
        onClick={() => deleteGift(id)}
        className="w-fit px-4 sm:px-6 py-2 sm:py-3 bg-blue2 text-slate-900 font-medium text-lg duration-300 hover:opacity-70 cursor-pointer capitalize"
      >
        <BsFillTrashFill />
      </span>
    </div>
  );
};

export default GiftCard;

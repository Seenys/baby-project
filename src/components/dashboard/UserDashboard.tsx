//React
import React, { useState } from "react";

// Hooks
import { useAuth } from "@/context/AuthContext";
import { useForm } from "react-hook-form";
import useFetchData from "@/hooks/useFetchData";

// Components
import GiftCard from "../giftCard/GiftCard";

// Firebase
import { deleteField, doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";

// Types
import { Gift, Gifts } from "@/types/firebase";
// others
import uniqid from "uniqid";
import Swal from "sweetalert2";
import Link from "next/link";

const initialState = {
  gift: "",
  quantity: 1,
  id: "",
  selected: false,
};

const UserDashboard = () => {
  const [edit, setEdit] = useState("");
  const [addGift, setAddGift] = useState(false);
  const [gift, setGift] = useState<Gift>(initialState);
  const [editedValue, setEditedValue] = useState<Gift>(initialState);

  const { user } = useAuth();

  const { dbGift, setDbGift, loading, error } = useFetchData();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Gift>();

  const onSubmit = handleSubmit((data) => {
    if (!gift) return;
    Swal.fire({
      icon: "success",
      title: "Your gift has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
    data.id = uniqid();
    data.selected = false;
    setDbGift({ ...dbGift, [data.id]: data });
    setAddGift(false);
    setGift(initialState);
    firebaseAdd(data);
  });

  const firebaseAdd = async (data: Gift) => {
    const docRef = doc(db, "Users", user?.uid);
    await setDoc(
      docRef,
      {
        GiftList: {
          [data.id]: {
            ...data,
          },
        },
      },
      { merge: true }
    );
  };

  const handleDelete = async (id: string) => {
    const tempDataObj: Gifts = { ...dbGift };
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        delete tempDataObj[id];
        setDbGift(tempDataObj);
        const docRef = doc(db, "Users", user?.uid);
        await setDoc(
          docRef,
          {
            GiftList: {
              [id]: deleteField(),
            },
          },
          { merge: true }
        );
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire("Cancelled", "Your gift is safe :)", "error");
      }
    });
  };

  const handleEdit = async () => {
    if (!editedValue) return;
    const newKey = edit;
    Swal.fire({
      icon: "question",
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        setDbGift({ ...dbGift, [newKey]: editedValue });
        const userRef = doc(db, "Users", user.uid);
        await setDoc(
          userRef,
          {
            GiftList: {
              [newKey]: editedValue,
            },
          },
          { merge: true }
        );
        setEdit("");
        setEditedValue(initialState);
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const handleAddEdit = (giftKey: string) => {
    setEdit(giftKey);
    setEditedValue(dbGift[giftKey]);
  };

  return (
    <div className="w-full max-w-[65ch] mx-auto ">
      <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:gap-5">
        <>
          <label>Add new Gift:</label>
          <div className="flex items-stretch">
            <input
              {...register("gift")}
              value={gift.gift}
              placeholder="Please enter your todo"
              required
              className="outline-none p-2 text-base sm:text-lg text-slate-900 flex-1"
              onChange={(e) => setGift({ ...gift, gift: e.target.value })}
            />
            <input
              {...register("quantity")}
              value={gift.quantity}
              type="number"
              required
              className="outline-none p-2 text-base sm:text-lg text-slate-900 flex w-1/5 border-l border-solid border-slate-900"
              onChange={(e) => setGift({ ...gift, quantity: +e.target.value })}
            />
            <button
              type="submit"
              className="w-fit px-4 sm:px-6 py-2 sm:py-3 bg-pink text-slate-900 font-medium text-base duration-300 hover:opacity-60"
            >
              Add
            </button>
          </div>
        </>

        {!loading && (
          <>
            {dbGift &&
              Object.keys(dbGift).map((gift) => {
                const { id, gift: giftName, quantity } = dbGift[gift];
                return (
                  <GiftCard
                    key={gift}
                    idKey={gift}
                    id={id}
                    gift={giftName}
                    quantity={quantity}
                    edit={edit}
                    editedValue={editedValue}
                    setEditedValue={setEditedValue}
                    handleAddEdit={handleAddEdit}
                    editGift={handleEdit}
                    deleteGift={handleDelete}
                  />
                );
              })}
          </>
        )}
        {/* {!addTodo && (
          <button
            onClick={() => setAddTodo(true)}
            className="text-bg-cyan-300 border border-solid border-cyan-300 py-2 text-center uppercase font-medium text-lg duration-300 hover:opacity-30"
          >
            ADD TODO
          </button>
        )} */}
        <h1>Url to gift selection</h1>
        <span className="text-red-500">
          Url:<Link href={`listGifts/${user.uid}`}>/{user.uid}</Link>
        </span>
      </form>
    </div>
  );
};

export default UserDashboard;

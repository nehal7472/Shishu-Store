/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addAddress, updateAddress, removeAddress } from "@/lib/dashboardSlice";
import { v4 as uuidv4 } from "uuid";

type AddressForm = {
  id?: string;
  label?: string;
  name: string;
  phone?: string;
  line1: string;
  line2?: string;
  city?: string;
  state?: string;
  postal?: string;
  country?: string;
};

export default function AddressesView() {
  const dispatch = useAppDispatch();
  const addresses = useAppSelector((s) => s.dashboard.addresses);
  const [editing, setEditing] = useState<AddressForm | null>(null);

  const blank: AddressForm = { name: "", line1: "", phone: "", city: "", state: "", postal: "", country: "", label: "" };
  const [form, setForm] = useState<AddressForm>(blank);

  const startAdd = () => {
    setEditing(null);
    setForm(blank);
  };

  const startEdit = (addr: any) => {
    setEditing(addr);
    setForm({ ...addr });
  };

  const save = () => {
    if (!form.name || !form.line1) return alert("Name and address required");
    if (editing) {
      dispatch(updateAddress({ ...(form as any) }));
    } else {
      dispatch(addAddress({ id: uuidv4(), ...(form as any) }));
    }
    setForm(blank);
    setEditing(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Addresses</h2>
        <button onClick={startAdd} className="text-sm underline">Add New</button>
      </div>

      <div className="grid gap-3 mb-6">
        {addresses.length === 0 && <div className="text-sm text-gray-500">No addresses saved yet.</div>}
        {addresses.map((a: any) => (
          <div key={a.id} className="border rounded p-3 flex justify-between items-start">
            <div>
              <div className="font-medium">{a.label || "Home"}</div>
              <div className="text-sm">{a.name} • {a.phone}</div>
              <div className="text-sm text-gray-600">{a.line1} {a.line2} {a.city} {a.state} {a.postal} {a.country}</div>
            </div>
            <div className="flex flex-col gap-2">
              <button onClick={() => startEdit(a)} className="text-sm underline">Edit</button>
              <button onClick={() => dispatch(removeAddress(a.id))} className="text-sm text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div className="border rounded p-4">
        <h3 className="font-semibold mb-3">{editing ? "Edit Address" : "Add Address"}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input placeholder="Label (e.g. Home)" value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} className="border p-2 rounded" />
          <input placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="border p-2 rounded" />
          <input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="border p-2 rounded" />
          <input placeholder="Address line 1" value={form.line1} onChange={(e) => setForm({ ...form, line1: e.target.value })} className="border p-2 rounded" />
          <input placeholder="Address line 2" value={form.line2} onChange={(e) => setForm({ ...form, line2: e.target.value })} className="border p-2 rounded" />
          <input placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="border p-2 rounded" />
          <input placeholder="State" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} className="border p-2 rounded" />
          <input placeholder="Postal/ZIP" value={form.postal} onChange={(e) => setForm({ ...form, postal: e.target.value })} className="border p-2 rounded" />
          <input placeholder="Country" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} className="border p-2 rounded" />
        </div>

        <div className="mt-4 flex gap-2">
          <button onClick={save} className="bg-[#EC8923] text-white px-4 py-2 rounded">
            Save Address
          </button>
          <button onClick={() => { setForm(blank); setEditing(null); }} className="px-4 py-2 border rounded">Cancel</button>
        </div>
      </div>
    </div>
  );
}

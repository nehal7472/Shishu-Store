"use client";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { /* if you had updateUser */ } from "@/lib/authSlice";

export default function AccountDetailsView() {
  const { user } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phone: user?.phone || "",
    email: user?.email || "",
  });

  const save = () => {
    // If you have an updateUser action, dispatch it. For now, update sessionStorage and slice directly.
    const updated = { ...user, ...form };
    if (typeof window !== "undefined") {
      sessionStorage.setItem("shishu-user", JSON.stringify(updated));
    }
    // If you want to reflect to Redux auth slice, dispatch an action (implement updateUser in authSlice)
    alert("Saved (session only). Implement updateUser in authSlice to persist to store.");
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Account details</h2>
      <div className="max-w-lg">
        <label className="block text-sm">First name</label>
        <input className="border p-2 rounded w-full mb-3" value={form.firstName} onChange={(e) => setForm({...form, firstName: e.target.value})} />
        <label className="block text-sm">Last name</label>
        <input className="border p-2 rounded w-full mb-3" value={form.lastName} onChange={(e) => setForm({...form, lastName: e.target.value})} />
        <label className="block text-sm">Phone</label>
        <input className="border p-2 rounded w-full mb-3" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} />
        <label className="block text-sm">Email</label>
        <input className="border p-2 rounded w-full mb-3" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} />

        <div className="flex gap-2">
          <button onClick={save} className="bg-[#EC8923] text-white px-4 py-2 rounded">Save</button>
        </div>
      </div>
    </div>
  );
}

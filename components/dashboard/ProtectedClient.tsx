// components/dashboard/ProtectedClient.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";

export default function ProtectedClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((s) => s.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;
  return <>{children}</>;
}

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Portal | Performing Arts Council NIAT",
  description:
    "Executive suite for managing upcoming performances, past festival archives, winners, and council roster.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

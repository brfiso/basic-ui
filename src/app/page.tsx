'use client';
import Image from "next/image";
import styles from "./page.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "./ui/Loading";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated")
    return router.push("/login");
  else if (status === "loading") {
    return (<Loading />);
  } else {
    return router.push("/dashboard");
  }
}

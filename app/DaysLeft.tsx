"use client";

import { useEffect, useState } from "react";
import { formatDaysLeft } from "@/assignments";

export default function DaysLeft({ dueDate }: { dueDate: string }) {
  const [text, setText] = useState("");

  useEffect(() => {
    setText(formatDaysLeft(dueDate));
  }, [dueDate]);

  return <>{text}</>;
}

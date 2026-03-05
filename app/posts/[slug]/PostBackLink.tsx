"use client";

import type { MouseEvent } from "react";
import { useRouter } from "next/navigation";

type PostBackLinkProps = {
  className?: string;
  fallbackHref?: string;
};

export default function PostBackLink({
  className,
  fallbackHref = "/lessons",
}: PostBackLinkProps) {
  const router = useRouter();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();

    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push(fallbackHref);
  }

  return (
    <a href={fallbackHref} className={className} onClick={handleClick}>
      Go back
    </a>
  );
}

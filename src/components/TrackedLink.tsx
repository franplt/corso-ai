"use client";

import Link, { LinkProps } from "next/link";
import { AnchorHTMLAttributes, MouseEvent } from "react";
import { AnalyticsParameters, trackEvent } from "@/lib/analytics";

type TrackedLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    eventName: string;
    eventParameters?: AnalyticsParameters;
  };

export function TrackedLink({
  eventName,
  eventParameters,
  onClick,
  ...props
}: TrackedLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    trackEvent(eventName, eventParameters);
    onClick?.(event);
  }

  return <Link {...props} onClick={handleClick} />;
}


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
  function toTrackedLinkPath(href: LinkProps["href"]) {
    if (typeof href === "string") return href.split("?")[0]?.split("#")[0];
    const pathname = href?.pathname;
    return typeof pathname === "string" ? pathname : undefined;
  }

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    const linkPath = toTrackedLinkPath(props.href);
    trackEvent(eventName, {
      ...(eventParameters ?? {}),
      link_path: linkPath,
    });
    onClick?.(event);
  }

  return <Link {...props} onClick={handleClick} />;
}


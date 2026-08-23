import { ImageResponse } from "next/og";
import { createElement } from "react";
import { SITE_NAME } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    createElement(
      "div",
      {
        style: {
          alignItems: "center",
          background: "transparent",
          display: "flex",
          gap: "20px",
          height: "100%",
          padding: "12px",
          width: "100%",
        },
      },
      createElement(
        "div",
        {
          style: {
            alignItems: "center",
            background: "#b45309",
            borderRadius: "18px",
            color: "white",
            display: "flex",
            fontSize: "42px",
            fontWeight: 700,
            height: "96px",
            justifyContent: "center",
            width: "96px",
          },
        },
        "10",
      ),
      createElement(
        "div",
        {
          style: {
            color: "#1a1816",
            display: "flex",
            fontFamily: "Georgia, serif",
            fontSize: "34px",
            fontWeight: 600,
            letterSpacing: "-0.5px",
          },
        },
        SITE_NAME,
      ),
    ),
    {
      width: 640,
      height: 128,
    },
  );
}

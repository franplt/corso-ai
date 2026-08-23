import { ImageResponse } from "next/og";
import { createElement } from "react";

export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    createElement(
      "div",
      {
        style: {
          alignItems: "center",
          background: "#b45309",
          border: "10px solid #e8d5c4",
          borderRadius: "56px",
          color: "white",
          display: "flex",
          fontFamily: "Arial, sans-serif",
          fontSize: "104px",
          fontWeight: 700,
          height: "100%",
          justifyContent: "center",
          width: "100%",
        },
      },
      "10",
    ),
    {
      width: 256,
      height: 256,
    },
  );
}

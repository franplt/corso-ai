import { ImageResponse } from "next/og";

export const alt = "Corso AI in 10 puntate";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#faf8f5",
          fontFamily: "Georgia, serif",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "80px",
              height: "80px",
              borderRadius: "20px",
              background: "#b45309",
              color: "#fff",
              fontSize: "36px",
              fontWeight: 700,
            }}
          >
            AI
          </div>
          <div
            style={{
              fontSize: "56px",
              fontWeight: 700,
              color: "#1a1816",
              textAlign: "center",
              lineHeight: 1.2,
              maxWidth: "900px",
            }}
          >
            Corso AI in 10 puntate
          </div>
          <div
            style={{
              fontSize: "26px",
              color: "#6b6560",
              textAlign: "center",
              maxWidth: "700px",
              lineHeight: 1.5,
            }}
          >
            Capisci davvero come funziona l&apos;AI. Senza tecnicismi inutili.
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginTop: "16px",
              fontSize: "20px",
              color: "#b45309",
              fontWeight: 600,
            }}
          >
            10 episodi · €9,99
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            fontSize: "18px",
            color: "#9c9590",
          }}
        >
          di Francesco Paltrinieri
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

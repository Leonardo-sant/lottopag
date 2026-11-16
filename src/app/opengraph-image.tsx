import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} · Gateway de pagamentos e conciliação`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(180deg, #0e0e10 0%, #050506 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 40, fontWeight: 600, letterSpacing: -1 }}>{siteConfig.name}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 68, fontWeight: 600, lineHeight: 1.05, letterSpacing: -2, maxWidth: 900 }}>
            Receba, pague e concilie em uma operação integrada.
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: 40, fontSize: 26, color: "#a1a1aa" }}>
            <span>Recebimento</span>
            <span style={{ color: "#f2b70c" }}>→</span>
            <span>Processamento</span>
            <span style={{ color: "#f2b70c" }}>→</span>
            <span>Pagamento e conciliação</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}

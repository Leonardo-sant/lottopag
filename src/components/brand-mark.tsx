import Image from "next/image";
import { basePath, siteConfig } from "@/config/site";

/**
 * Logotipo da Lottopag na versão adequada ao fundo.
 * `height` é a altura exibida em px; a largura segue a proporção do arquivo.
 */
export function BrandMark({
  tone = "dark",
  height = 32,
  preload = false,
}: {
  tone?: "dark" | "light";
  height?: number;
  preload?: boolean;
}) {
  const { logo, name } = siteConfig;
  const width = Math.round((height * logo.width) / logo.height);
  return (
    <Image
      src={`${basePath}${tone === "dark" ? logo.onDark : logo.onLight}`}
      width={width}
      height={height}
      alt={name}
      preload={preload}
      style={{ height, width: "auto" }}
    />
  );
}

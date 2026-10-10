import type { Metadata, Viewport } from "next";
import { MotionConfig } from "framer-motion";
import { invitation } from "@/config/invitation";
import "./globals.css";
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f8f6f1",
};
export const metadata: Metadata = invitation.metadata;
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </body>
    </html>
  );
}

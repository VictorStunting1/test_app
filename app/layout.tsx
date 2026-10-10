import type { Metadata } from "next";
import { MotionConfig } from "framer-motion";
import { invitation } from "@/config/invitation";
import "./globals.css";
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

import localFont from "next/font/local";

export const garet = localFont({
  src: [
    { path: "./fonts/Garet-Book.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Garet-Book.woff", weight: "400", style: "normal" },

    { path: "./fonts/Garet-Heavy.woff2", weight: "800", style: "normal" },
    { path: "./fonts/Garet-Heavy.woff", weight: "800", style: "normal" },
  ],
  variable: "--font-garet",
  display: "swap",
});

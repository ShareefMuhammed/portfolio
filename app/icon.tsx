import { ImageResponse } from "next/og";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#2A2A2A",
          borderRadius: "50%",
          color: "#F4EDE1",
          fontSize: 21,
          fontWeight: 800,
          lineHeight: 1,
        }}
      >
        S
      </div>
    ),
    {
      ...size,
    }
  );
}

import { ImageResponse } from 'next/og';
export const dynamic = 'force-static';
// Image metadata
export const size = {
  width: 96,
  height: 96,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#4f46e5',
          borderRadius: '20%',
          color: 'white',
          fontSize: '56px',
          fontWeight: 800,
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        K
      </div>
    ),
    { ...size }
  );
}

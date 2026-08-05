// import QRCodeStyling from "qr-code-styling";
// import { useEffect, useRef } from "react";

// const qrCode = new QRCodeStyling({
//   width: 1024,
//   height: 1024,
//   type: "svg",
//   data: "https://antojos-cafe-y-mas.vercel.app/",
//   image: "/public/icons/logo.svg", // tu logo
//   dotsOptions: {
//     color: "#4B2E1E",
//     type: "rounded",
//   },
//   cornersSquareOptions: {
//     color: "#4B2E1E",
//     type: "extra-rounded",
//   },
//   cornersDotOptions: {
//     color: "#4B2E1E",
//     type: "dot",
//   },
//   backgroundOptions: {
//     color: "#FFFFFF",
//   },
//   imageOptions: {
//     crossOrigin: "anonymous",
//     margin: 12,
//     imageSize: 0.28,
//   },
//   qrOptions: {
//     errorCorrectionLevel: "H",
//   },
// });

// export default function QR() {
//   const ref = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (ref.current) {
//       qrCode.append(ref.current);
//     }
//   }, []);

//   return (
//     <>
//       <div style={{ width: "40px" }} ref={ref} />
//       <button
//         onClick={() =>
//           qrCode.download({
//             extension: "svg",
//             name: "antojos-cafe",
//           })
//         }
//       >
//         Descargar SVG
//       </button>
//     </>
//   );
// }

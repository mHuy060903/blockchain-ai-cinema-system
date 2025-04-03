import { useState } from "react";
import { useZxing } from "react-zxing";
import { useUpdatedUsedTicket } from "../../features/ticket/useUpdatedUsedTicket";
import Loader from "../../components/Loader";
import { BrowserQRCodeReader } from "@zxing/browser";

const BarcodeScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [isScanningImage, setIsScanningImage] = useState(false);

  const toggleScanner = () => {
    setIsScanning((prev) => !prev);
  };

  const toogleScannerImage = () => {
    setIsScanningImage((prev) => !prev);
  };

  return (
    <div className="text-white w-full flex flex-col items-center  overflow-y-auto gap-5">
      <button
        className=" bg-blue-500 inline-block w-auto font-semibold rounded-lg px-3 py-2 mt-4"
        onClick={toggleScanner}
      >
        {isScanning ? "Stop Scanning" : "Start Scanning"}
      </button>

      {isScanning && <ScannerComponent />}
      <button
        onClick={toogleScannerImage}
        className=" bg-blue-500 inline-block w-auto font-semibold rounded-lg px-3 py-2 mt-4"
      >
        {isScanningImage ? "Close scan image" : "Open scan image"}
      </button>
      {isScanningImage && <ScannerImageComponent />}
    </div>
  );
};

const ScannerImageComponent = () => {
  const [image, setImage] = useState("");
  const [result, setResult] = useState("");

  const { handleUpdateUsedTicket, isLoading } = useUpdatedUsedTicket();
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScanImage = async () => {
    try {
      const codeReader = new BrowserQRCodeReader();
      const result = await codeReader.decodeFromImageUrl(image);
      if (result) {
        handleUpdateUsedTicket(result.getText(), {
          onSuccess: (data) => {
            setResult(data.message);
          },
          onError: () => {
            setResult("Error updating ticket");
          },
        });
      }
    } catch (error) {
      setResult("No QR code found or error scanning the image");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mt-4"
      />

      {image && (
        <div className="mt-4">
          <img
            src={image}
            alt="Uploaded"
            style={{ width: "100%", maxWidth: "380px", height: "auto" }}
          />
          <button
            onClick={handleScanImage}
            className="bg-green-500 inline-block w-auto font-semibold rounded-lg px-3 py-2 mt-4"
          >
            Scan Image
          </button>
        </div>
      )}
      {isLoading ? (
        <Loader size={70} color="white" />
      ) : (
        <p className="text-white mt-4">
          <span>Status:</span>
          <span>{result}</span>
        </p>
      )}
    </div>
  );
};

const ScannerComponent = () => {
  const [result, setResult] = useState("");
  const [showVideoFeed, setShowVideoFeed] = useState(true);
  const { isLoading, isError, handleUpdateUsedTicket } = useUpdatedUsedTicket();

  const { ref } = useZxing({
    onDecodeResult(result) {
      if (showVideoFeed) {
        console.log(result.getText());
        setShowVideoFeed(false);
        handleUpdateUsedTicket(result.getText(), {
          onSuccess: (data) => {
            setResult(data.message);
          },
        });
      }
    },
  });

  return (
    <>
      {showVideoFeed && (
        <video
          ref={ref}
          style={{
            width: "100%",
            maxWidth: "380px",
            height: "100%",
            maxHeight: "250px",
          }}
        />
      )}
      {!showVideoFeed && isLoading ? (
        <Loader size={70} color="white" />
      ) : (
        <p className="text-white">
          <span>Status:</span>
          <span>{result}</span>
        </p>
      )}
    </>
  );
};

export default BarcodeScanner;

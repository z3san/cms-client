import { useUsers } from "../Provider/DataProvider";
import Papa from "papaparse";

const CsvDownloader = () => {
  const allData = useUsers();

  // Function to convert data to CSV and trigger the download
  const handleDownload = () => {
    const csv = Papa.unparse(allData, {
      header: true, // Add header row
    });

    // Create a Blob object with the CSV data
    const blob = new Blob([csv], { type: "text/csv" });

    // Create a URL from the Blob
    const url = window.URL.createObjectURL(blob);

    // Create a temporary link element and trigger the download
    const a = document.createElement("a");
    a.href = url;
    a.download = "contact_data.csv"; // Set the filename for the download
    document.body.appendChild(a);
    a.click();

    // Remove the temporary link element
    document.body.removeChild(a);
  };

  return (
    <>
      {/* Render the download button */}
      <button onClick={handleDownload}> Download Contact</button>
    </>
  );
};

export default CsvDownloader;

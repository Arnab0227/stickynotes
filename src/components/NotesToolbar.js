import React from "react";

const NotesToolbar = () => {
  const handleExport = () => {
    const notes = JSON.parse(localStorage.getItem("notes"));
    const blob = new Blob([JSON.stringify(notes)], {
      type: "application/json",
    });

    const currentDate = new Date().toISOString().split("T")[0];
    const fileName = `Exported_notes_${currentDate}.json`;

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const importedNotes = JSON.parse(e.target.result);
      localStorage.setItem("notes", JSON.stringify(importedNotes));
      window.location.reload();
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <button
        onClick={handleExport}
        className="bg-yellow-400 px-4 py-2 rounded-md shadow-md hover:bg-yellow-500 hover:shadow-lg"
      >
        Export Notes
      </button>
      <label
        htmlFor="import-notes"
        className="bg-black text-white px-4 py-2 rounded-md cursor-pointer hover:bg-slate-700 shadow-md hover:shadow-lg"
      >
        Import Notes
        <input
          id="import-notes"
          type="file"
          accept=".json"
          onChange={handleImport}
          className="hidden"
        />
      </label>
    </div>
  );
};

export default NotesToolbar;

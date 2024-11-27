import React, { useState } from "react";
import Modal from "../components/Modal";
import { LuPin, LuPinOff } from "react-icons/lu";
import {
  RiDeleteBinFill,
  RiInboxArchiveFill,
  RiEdit2Fill,
} from "react-icons/ri";
import { useNotes } from "../context/notes-context";
import { toast } from "react-toastify";
import { format } from "date-fns";

const NotesCard = ({ id, title, text, pinned, archived, timestamp }) => {
  const { notesDispatch } = useNotes();
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedText, setEditedText] = useState(text);
  const formattedDate = format(new Date(timestamp), "dd/MM/yyyy hh:mm a");

  const handlePinToggle = () => {
    notesDispatch({ type: "TOGGLE_PIN", payload: id });
    toast.info(pinned ? "Note unpinned!" : "Note pinned!");
  };

  const handleArchive = () => {
    if (pinned) {
      toast.warn("Please unpin the note before archiving.");
      return;
    }

    if (archived) {
      notesDispatch({ type: "UNARCHIVE_NOTE", payload: id });
      toast.success("Note moved to Home!");
    } else {
      notesDispatch({ type: "ARCHIVE_NOTE", payload: id });
      toast.success("Note archived!");
    }
  };

  const handleDelete = () => {
    if (pinned) {
      toast.warn("Unpin the note before sending to Bin.");
      return;
    }
    notesDispatch({ type: "BIN_NOTE", payload: id });
    toast.error("Note moved to Bin!");
  };

  const handleEditSubmit = () => {
    if (editedTitle.trim() === "" || editedText.trim() === "") {
      toast.warn("Title and description cannot be empty.");
      return;
    }
    notesDispatch({
      type: "EDIT_NOTE",
      payload: { id, title: editedTitle, text: editedText },
    });
    toast.success("Note updated successfully!");
    setEditModalOpen(false);
  };

  return (
    <div
      className={`border p-4 rounded-md shadow-md flex flex-col justify-between h-44 ${
        pinned ? "bg-yellow-400" : "bg-white"
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <p className="font-semibold text-lg truncate">{title}</p>
        <button
          onClick={handlePinToggle}
          className="text-gray-500 hover:text-black"
        >
          {pinned ? <LuPin /> : <LuPinOff />}
        </button>
      </div>
      <div className="mb-2 flex-grow">
        <div className="text-sm text-gray-700 line-clamp-2">{text}</div>
        {text.split(" ").length > 10 && (
          <button
            onClick={() => setDetailModalOpen(true)}
            className="text-yellow-500 hover:underline text-xs mt-1"
          >
            Read More
          </button>
        )}
        <p className="text-xs text-gray-500 block mt-1">{formattedDate}</p>
      </div>
      <div className="flex justify-between items-center">
        <button
          onClick={handleArchive}
          className="text-gray-500 hover:text-black"
        >
          <RiInboxArchiveFill />
        </button>
        {!archived && (
          <button
            onClick={() => setEditModalOpen(true)}
            className="text-gray-500 hover:text-black"
          >
            <RiEdit2Fill />
          </button>
        )}
        <button
          onClick={handleDelete}
          className="text-gray-500 hover:text-black"
        >
          <RiDeleteBinFill />
        </button>
      </div>

      <Modal isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Edit Note</h2>
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          placeholder="Enter title"
          className="w-full mb-2 p-2 border rounded-md shadow-md"
        />
        <textarea
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          placeholder="Enter description"
          className="w-full mb-4 p-2 border rounded-md h-24 resize-none shadow-md"
        />
        <button
          onClick={handleEditSubmit}
          className="w-full bg-yellow-400 hover:bg-yellow-500 py-2 rounded-md shadow-md"
        >
          Save Changes
        </button>
      </Modal>

      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => setDetailModalOpen(false)}
      >
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="text-sm text-gray-700 text-wrap break-words">{text}</p>
        <p className="text-xs text-gray-500 mt-4">
          Last updated: {formattedDate}
        </p>
      </Modal>
    </div>
  );
};

export default NotesCard;

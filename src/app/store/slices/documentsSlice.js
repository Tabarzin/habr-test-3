import { createSlice } from "@reduxjs/toolkit";

const initialDocuments = [
  { id: "1", title: "Document 1", status: "in-progress" },
  { id: "2", title: "Document 2", status: "in-progress" },
  { id: "3", title: "Document 3", status: "under-review" },
];

const documentsSlice = createSlice({
  name: "documents",
  initialState: { documents: initialDocuments },
  reducers: {
    moveDocument: (state, action) => {
      const { id, newStatus } = action.payload;
      const document = state.documents.find((doc) => doc.id === id);
      if (document) {
        document.status = newStatus;
      }
    },
    addDocument: (state, action) => {
      const { title } = action.payload;
      state.documents.push({
        id: Date.now().toString(),
        title,
        status: "in-progress",
      });
    },
  },
});

export const { moveDocument, addDocument } = documentsSlice.actions;
export default documentsSlice.reducer;

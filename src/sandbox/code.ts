import addOnSandboxSdk from "add-on-sdk-document-sandbox";
import { editor } from "express-document-sdk";
import { DocumentSandboxApi } from "../models/DocumentSandboxApi";

// Get the document sandbox runtime.
const { runtime } = addOnSandboxSdk.instance;

function start(): void {
  // APIs to be exposed to the UI runtime
  // i.e., to the `App.tsx` file of this add-on.
  const sandboxApi: DocumentSandboxApi = {
    addWatermark: (text: string) => {
      const txt = editor.createText();
      txt.text = text;
      const local = txt.boundsInParent;
      const page = editor.context.currentPage;
      txt.setPositionInParent({ x: page.width - local.width, y: page.height - local.height }, { x: 0, y: 0 });
      // txt.setPositionInParent({ x: page.width / 2, y: page.height / 2 }, { x: local.width / 2, y: local.height / 2 });
      // txt.setRotationInParent(-45, { x: local.width / 2, y: local.height / 2 });
      const insertionParent = editor.context.insertionParent;
      insertionParent.children.append(txt);
    },
    getPageIds: async () => {
      return editor.documentRoot.pages.toArray().map((i) => i.id);
    }
  };

  // Expose `sandboxApi` to the UI runtime.
  runtime.exposeApi(sandboxApi);
}

start();

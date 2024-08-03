import addOnSandboxSdk from "add-on-sdk-document-sandbox";
import { editor } from "express-document-sdk";
import { DocumentSandboxApi } from "../models/DocumentSandboxApi";

// Get the document sandbox runtime.
const { runtime } = addOnSandboxSdk.instance;

function start(): void {
    // APIs to be exposed to the UI runtime
    // i.e., to the `App.tsx` file of this add-on.
    const sandboxApi: DocumentSandboxApi = {
        createRectangle: () => {
            const rectangle = editor.createRectangle();

            // Define rectangle dimensions.
            rectangle.width = 240;
            rectangle.height = 180;

            // Define rectangle position.
            rectangle.translation = { x: 10, y: 10 };

            // Define rectangle color.
            const color = { red: 0.32, green: 0.34, blue: 0.89, alpha: 1 };

            // Fill the rectangle with the color.
            const rectangleFill = editor.makeColorFill(color);
            rectangle.fill = rectangleFill;

            // Add the rectangle to the document.
            const insertionParent = editor.context.insertionParent;
            insertionParent.children.append(rectangle);
        },
        // generateImage: () => {
            
        //         } else if (!exportUtils.getValue("backgroundColor")) {
        //           response = await AddOnSdk.app.document.createRenditions({
        //             range: initialState.rangeValue,
        //             format: initialState.valueMimeType,
        //             quality: exportUtils.getValue("quality"),
        //           });
        //         } else if (!exportUtils.getValue("quality")) {
        //           /*Calling export APIs for images with export configurations
        //            * Background Color field is in decimal, convert RGB for JPEG and ARGB for PNG to decimal, for example - https://www.checkyourmath.com/convert/color/rgb_decimal.php
        //            */
        //           response = await AddOnSdk.app.document.createRenditions({
        //             range: initialState.rangeValue,
        //             format: initialState.valueMimeType,
        //             backgroundColor: exportUtils.getValue("backgroundColor"),
        //           });
        //         } else {
        //           /*Calling export APIs for images with export configurations
        //            * Background Color field is in decimal, convert RGB for JPEG and ARGB for PNG to decimal, for example - https://www.checkyourmath.com/convert/color/rgb_decimal.php
        //            */
        //           response = await AddOnSdk.app.document.createRenditions({
        //             range: initialState.rangeValue,
        //             format: initialState.valueMimeType,
        //             backgroundColor: exportUtils.getValue("backgroundColor"),
        //             quality: exportUtils.getValue("quality"),
        //           });
        //         }
        //         document.getElementById("preview-button").disabled = false;
            
        //         //Adding preview to preview box
        //         document.getElementById("prev").style.display = "none";
        //         if (
        //           initialState.valueMimeType === "image/jpeg" ||
        //           initialState.valueMimeType === "image/png"
        //         ) {
        //           console.log(response, typeof response);
        //           console.log("blob", response[0].blob);
        //           blobToBase64(response[0].blob).then((url) => {
        //             console.log("base 64 url", url);
        //           });
        //           exportUtils.addImg(response);
        //         }
        //         if (initialState.valueMimeType === "video/mp4") {
        //           exportUtils.addVid(response);
        //         }
        //         if (initialState.valueMimeType === "application/pdf") {
        //           const preview = await AddOnSdk.app.document.createRenditions({
        //             range: initialState.rangeValue,
        //             format: "image/jpeg",
        //           });
        //           // console.log(preview, typeof preview);
        //           exportUtils.addImg(preview);
        //         }
            
        //         //Pushing exportUtils.urls recieved from response in an array
        //         var tempUrls = [];
        //         response.forEach((res) => {
        //           tempUrls.push(URL.createObjectURL(res.blob));
        //         });
        //         initialState.urls = tempUrls;
        //         exportUtils.setMimeTypeValue(initialState);
        //       }
        // }
    };

    // Expose `sandboxApi` to the UI runtime.
    runtime.exposeApi(sandboxApi);
}

start();

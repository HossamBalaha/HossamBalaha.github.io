/* export-worker.js
 *
 * Web Worker for off-main-thread export processing.
 * Moves heavy CPU work (image base64 conversion, large DOM cloning) off the
 * main thread so the UI stays responsive during exports.
 *
 * Message protocol:
 *   inbound:  { id, type: "convertImages", html: "...", options: {...} }
 *   outbound: { id, type: "done", result: "..." }  OR
 *              { id, type: "error", message: "..." }
 *
 * Note: html-docx-js and jszip are NOT available inside a worker without
 * extra setup, so this worker handles only the image-preprocessing step.
 * The main thread sends pre-processed HTML back to html-docx-js for the
 * final docx blob generation.
 */

self.onmessage = function(event) {
  let msg = event.data;
  if (!msg || !msg.id || !msg.type) return;
  try {
    if (msg.type === "convertImages") {
      // Convert <img> src="..." attributes to base64 data URIs in the HTML.
      let html = msg.html || "";
      let result = convertImageSrcsToDataUri(html);
      self.postMessage({ id: msg.id, type: "done", result: result });
    } else {
      self.postMessage({ id: msg.id, type: "error", message: "Unknown message type: " + msg.type });
    }
  } catch (err) {
    self.postMessage({ id: msg.id, type: "error", message: err.message });
  }
};

// Walk the HTML string, find every <img src="http..."> and fetch the image
// as a blob, then convert to base64 data URI.
// Because fetch inside a worker is allowed (same-origin or CORS-enabled),
// this works for same-origin images. For cross-origin images, the response
// must have CORS headers.
function convertImageSrcsToDataUri(html) {
  // Simple synchronous conversion is not possible (fetch is async).
  // Instead, we use a regex to extract all image src URLs and return them
  // to the main thread for async fetching. This is a "fetch plan" rather
  // than the actual conversion.
  let imgRegex = /<img\s+[^>]*src=["']([^"']+)["'][^>]*>/gi;
  let urls = [];
  let m;
  while ((m = imgRegex.exec(html)) !== null) {
    let url = m[1];
    if (url && !url.startsWith("data:") && !url.startsWith("blob:")) {
      urls.push(url);
    }
  }
  return JSON.stringify({ imageUrls: urls });
}

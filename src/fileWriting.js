// https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-file/index.html
export function writeFile(fileEntry, dataObj) {
  // If data object is not passed in, cancel saving
  if (!dataObj) { return }
  // Create a FileWriter object for our FileEntry (log.txt).
  fileEntry.createWriter(function (fileWriter) {
    fileWriter.onwriteend = function() {
      console.log("Successfully written:", fileEntry)
    };
    fileWriter.onerror = function (e) {
      console.log("Failed file write: " + e.toString())
    };
    fileWriter.write(dataObj)
  });
}
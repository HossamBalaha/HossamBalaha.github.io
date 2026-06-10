// Define the asynchronous function to convert images to base64.
async function ConvertImagesToBase64(element) {
    // Select all image elements within the provided DOM element.
    let imageElements = element.querySelectorAll("img");

    // Iterate through each image element found.
    for (let img of imageElements) {
        // Retrieve the original source URL of the image.
        let originalSrc = img.getAttribute("src");

        // Check if the source exists and is not already a base64 data URL.
        if (originalSrc && !originalSrc.startsWith("data:")) {
            // Check if the source is a cross-origin URL that causes CORS errors.
            if (originalSrc.includes("orcid.org") || originalSrc.includes("flickr.com") || originalSrc.includes("staticflickr.com")) {
                // Remove the image from the DOM to prevent broken links in Word.
                img.remove();

                // Continue to the next image in the loop.
                continue;
            }

            // Initiate a try-catch block to handle potential fetch errors.
            try {
                // Fetch the image resource from the network.
                let response = await fetch(originalSrc, { mode: "cors" });

                // Verify that the fetch request was successful.
                if (response.ok) {
                    // Convert the fetched response into a blob object.
                    let blob = await response.blob();

                    // Create a new FileReader instance to read the blob.
                    let reader = new FileReader();

                    // Define a promise to handle the asynchronous file reading.
                    let dataUrl = await new Promise(function(resolve, reject) {
                        // Set the onload event handler for the reader.
                        reader.onloadend = function() {
                            // Resolve the promise with the reader result.
                            resolve(reader.result);
                        };

                        // Set the onerror event handler for the reader.
                        reader.onerror = function() {
                            // Reject the promise with an error message.
                            reject(new Error("Failed to read file."));
                        };

                        // Read the blob content as a data URL.
                        reader.readAsDataURL(blob);
                    });

                    // Update the image source to the newly generated base64 data URL.
                    img.setAttribute("src", dataUrl);
                } else {
                    // Remove the image if the fetch fails to avoid broken images in Word.
                    img.remove();
                }
            } catch (fetchError) {
                // Silently remove the image if it fails to load or convert.
                img.remove();
            }
        }
    }
}

// Define the function to generate ATS-friendly and comfortably spaced Word CSS styles.
function GetWordFriendlyStyles() {
    // Return a string containing CSS optimized for ATS parsing and comfortable readability.
    return `
        /* Set standard ATS-friendly font, left alignment, and comfortable line height. */
        body { font-family: "Calibri", "Arial", sans-serif; font-size: 11pt; line-height: 1.3; color: #000000; text-align: left; margin: 0; padding: 15pt; }

        /* Apply strict, standard heading hierarchy with proper spacing for ATS section recognition. */
        h1 { font-size: 18pt; font-weight: bold; margin: 0 0 8pt 0; text-align: center; }
        h2 { font-size: 14pt; font-weight: bold; margin: 16pt 0 8pt 0; text-transform: uppercase; border-bottom: 1pt solid #000000; padding-bottom: 4pt; text-align: left; }
        h3 { font-size: 12pt; font-weight: bold; margin: 10pt 0 4pt 0; text-align: left; }
        h4 { font-size: 11.5pt; font-weight: bold; margin: 8pt 0 4pt 0; text-align: left; }

        /* Set comfortable, left-aligned paragraph spacing. */
        p { font-size: 11pt; margin: 0 0 8pt 0; line-height: 1.3; text-align: left; }

        /* Apply standard, readable list styling for ATS compatibility. */
        ul, ol { margin: 0 0 8pt 0; padding-left: 18pt; }
        li { font-size: 11pt; margin-bottom: 6pt; line-height: 1.3; }

        /* Format hyperlinks in a standard, recognizable way. */
        a { color: #000000; text-decoration: underline; }

        /* Flatten all Bootstrap flexbox and grid layouts into standard blocks. */
        .row, .col-lg-9, .col-lg-3, .col-lg-12, .col-auto, .d-flex, .flex-column, .flex-md-row, .col-12 { display: block !important; width: 100% !important; float: none !important; margin: 0 !important; padding: 0 !important; }

        /* Hide interactive elements, badges, and specifically exclude Posters and All Photos. */
        button, .btn, #PdfDownloadContainer, .FloatingDownloadContainer, nav, .nav-badge-link, .badge, #Posters, #All-Photos, #Photos, .stats-bar, .courses-stats { display: none !important; }

        /* Hide only icon fonts and SVGs, preserving <i> tags used for italic text. */
        i[class*="fa"], i[class*="bi"], svg, .fa-container { display: none !important; }

        /* Format skill tags and badges as plain text for ATS parsing. */
        .skill-tag, .skill-pill, .repo-badge, .volunteer-badge, .course-badge, .role-badge { display: inline !important; background: none !important; color: #000000 !important; padding: 0 !important; margin-right: 4pt !important; font-size: 10.5pt !important; border: none !important; }

        /* Tighten timeline items by removing backgrounds but keeping vertical spacing. */
        .resume-timeline-item { margin-bottom: 12pt; padding: 6pt 0; border-left: none !important; background-color: transparent !important; }

        /* Format dates and company names with proper spacing. */
        .resume-position-title { margin: 0 0 2pt 0; font-size: 11.5pt; font-weight: bold; }
        .resume-company-name { margin: 0 0 2pt 0; font-size: 11pt; font-style: italic; }
        .resume-position-time { margin: 0 0 6pt 0; font-weight: normal; color: #333333; font-size: 10.5pt; }

        /* Ensure images scale properly without disrupting the text flow. */
        img { max-width: 100%; height: auto; border: none; margin: 4pt 0; display: block; }

        /* Define standard, comfortable page margins for the Word document. */
        @page { margin: 0.75in; }
    `;
}

// Define the function to initialize the Word document generator.
function InitializeWordGenerator() {
    // Select the download button from the document.
    let downloadButton = document.getElementById("DownloadPdfButton");

    // Check if the button exists to prevent null reference errors.
    if (downloadButton) {
        // Attach the click event listener to the button.
        downloadButton.addEventListener("click", HandleWordDownloadClick);
    }
}

// Define the asynchronous function to handle the Word download click event.
async function HandleWordDownloadClick() {
    // Select the main resume wrapper element to convert.
    let resumeElement = document.querySelector(".resume-wrapper-inner");

    // Clone the resume element to avoid modifying the original DOM.
    let clonedElement = resumeElement.cloneNode(true);

    // Define the list of unwanted sections to remove completely from the DOM.
    let sectionsToRemove = clonedElement.querySelectorAll("#Photos, #Posters, #All-Photos, .nav-badge-link, #PdfDownloadContainer, .FloatingDownloadContainer");

    // Iterate through the selected sections and remove them.
    sectionsToRemove.forEach(function(el) {
        // Remove the current element from the cloned DOM.
        el.remove();
    });

    // Select any empty flex containers left behind by the removed elements.
    let emptyContainers = clonedElement.querySelectorAll(".d-flex.flex-wrap.justify-content-center");

    // Iterate through the empty containers to check their contents.
    emptyContainers.forEach(function(container) {
        // Check if the container has no child elements.
        if (container.children.length === 0) {
            // Remove the empty container from the cloned DOM.
            container.remove();
        }
    });

    // Find the primary info list and reconstruct it with clear labels.
    let contactLists = clonedElement.querySelectorAll(".primary-info ul.list-unstyled");

    // Iterate through each contact list found.
    contactLists.forEach(function(list) {
        // Select all list items within the current contact list.
        let items = list.querySelectorAll("li");

        // Initialize an empty array to store formatted contact parts.
        let contactParts = [];

        // Iterate through each list item to extract and format the text.
        items.forEach(function(li) {
            // Retrieve the trimmed text content of the list item.
            let text = li.innerText.trim().replace(/\s+/g, " ");

            // Skip the list item if it contains pronouns.
            if (text.includes("Pronouns")) {
                // Return to skip the current iteration.
                return;
            }

            // Check if the text contains the primary email address.
            if (text.includes("hmbala01@louisville.edu")) {
                // Push the formatted email label to the array.
                contactParts.push("Email: hmbala01@louisville.edu");
            }
            // Check if the text contains the secondary email address.
            else if (text.includes("hossam.m.balaha@mans.edu.eg")) {
                // Push the formatted secondary email label to the array.
                contactParts.push("Email: hossam.m.balaha@mans.edu.eg");
            }
            // Check if the text contains the personal email address.
            else if (text.includes("h3ossam@gmail.com")) {
                // Push the formatted personal email label to the array.
                contactParts.push("Email: h3ossam@gmail.com");
            }
            // Check if the text contains the phone number.
            else if (text.includes("502-767-9991")) {
                // Push the formatted phone label to the array.
                contactParts.push("Phone: +1 502-767-9991");
            }
            // Check if the text contains the date of birth.
            else if (text.includes("June 12, 1993")) {
                // Push the formatted date of birth label to the array.
                contactParts.push("Date of Birth: June 12, 1993");
            }
            // Check if the text contains the H-Index metrics.
            else if (text.includes("H-Index")) {
                // Push the original H-Index text to the array.
                contactParts.push(text);
            }
        });

        // Check if any contact parts were successfully extracted.
        if (contactParts.length > 0) {
            // Replace the original list with a clean, ATS-friendly paragraph.
            list.outerHTML = "<p style=\"margin:0 0 8pt 0; line-height:1.5; text-align:center;\">" + contactParts.join(" | ") + "</p>";
        }
    });

    // Select the secondary info container for social links.
    let secondaryInfo = clonedElement.querySelector(".secondary-info");

    // Check if the secondary info container exists.
    if (secondaryInfo) {
        // Select all anchor tags within the secondary info container.
        let links = secondaryInfo.querySelectorAll("a");

        // Initialize an empty array to store social profile links.
        let socialLinks = [];

        // Iterate through each anchor tag to extract the text and URL.
        links.forEach(function(a) {
            // Retrieve the trimmed text content of the anchor tag.
            let text = a.innerText.trim();
            // Retrieve the href attribute of the anchor tag.
            let href = a.getAttribute("href");

            // Check if both text and URL exist.
            if (text && href) {
                // Push a reconstructed clickable link to the array.
                socialLinks.push("<a href=\"" + href + "\" style=\"color: #000000; text-decoration: underline;\">" + text + "</a>");
            }
            // Check if only text exists.
            else if (text) {
                // Push the plain text to the array.
                socialLinks.push(text);
            }
        });

        // Check if any social links were successfully extracted.
        if (socialLinks.length > 0) {
            // Replace the container content with a clean, ATS-friendly paragraph containing clickable links.
            secondaryInfo.innerHTML = "<p style=\"margin:0 0 8pt 0; line-height:1.5; text-align:center;\"><strong>Profiles:</strong> " + socialLinks.join(" | ") + "</p>";
        }
    }

    // Select all section title headings in the cloned document.
    let sectionTitles = clonedElement.querySelectorAll("h2.resume-section-title");

    // Iterate through each section title heading.
    sectionTitles.forEach(function(h2) {
        // Retrieve the uppercase text content of the heading.
        let text = h2.innerText.trim().toUpperCase();

        // Check if the heading is the Experience section.
        if (text === "EXPERIENCE") {
            // Rename the heading to Work Experience for ATS recognition.
            h2.innerText = "WORK EXPERIENCE";
        }
        // Check if the heading is the Scientific Interests section.
        else if (text.includes("SCI. INTERESTS")) {
            // Rename the heading to Skills & Expertise for ATS recognition.
            h2.innerText = "SKILLS & EXPERTISE";
        }
    });

    // Select all skills container and tags sections.
    let skillsSections = clonedElement.querySelectorAll(".skills-container, .skills-tags");

    // Iterate through each skills section found.
    skillsSections.forEach(function(container) {
        // Select all skill pill and tag elements within the container.
        let tags = container.querySelectorAll(".skill-pill, .skill-tag");

        // Initialize an empty array to store the extracted skills.
        let skillsList = [];

        // Iterate through each tag to extract the text.
        tags.forEach(function(tag) {
            // Retrieve the trimmed text content of the tag.
            let text = tag.innerText.trim();

            // Check if the extracted text is not empty.
            if (text) {
                // Push the text to the skills list array.
                skillsList.push(text);
            }
        });

        // Check if any skills were successfully extracted.
        if (skillsList.length > 0) {
            // Replace the container content with a comma-separated paragraph.
            container.innerHTML = "<p style=\"margin:0 0 8pt 0; line-height:1.5;\">" + skillsList.join(", ") + "</p>";
        }
    });

    // Select only icon font and SVG elements, preserving <i> tags used for italic text.
    let icons = clonedElement.querySelectorAll("i[class*=\"fa\"], i[class*=\"bi\"], svg, .fa-container");

    // Iterate through each icon element found.
    icons.forEach(function(icon) {
        // Remove the icon element from the DOM to prevent garbled text.
        icon.remove();
    });

    // Convert all images within the cloned element to base64 data URLs.
    await ConvertImagesToBase64(clonedElement);

    // Extract the inner HTML of the processed cloned element.
    let contentHtml = clonedElement.innerHTML;

    // Retrieve the optimized, ATS-friendly CSS styles for Microsoft Word.
    let wordStyles = GetWordFriendlyStyles();

    // Define the dictionary for document metadata using CamelCase keys.
    let documentMetadata = {
        "Title": "Hossam_Magdy_Balaha_CV",
        "Charset": "utf-8",
        "FontFamily": "Calibri, Arial, sans-serif"
    };

    // Construct a complete HTML document string with embedded CSS for Word compatibility.
    let fullHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="${documentMetadata["Charset"]}">
            <title>${documentMetadata["Title"]}</title>
            <style>
                ${wordStyles}
                body { font-family: ${documentMetadata["FontFamily"]}; }
            </style>
        </head>
        <body>
            ${contentHtml}
        </body>
        </html>
    `;

    // Convert the constructed HTML string to a DOCX Blob using the html-docx-js library.
    let convertedBlob = htmlDocx.asBlob(fullHtml);

    // Define the output file name using CamelCase string format.
    let outputFileName = "Hossam_Magdy_Balaha_CV.docx";

    // Trigger the file download using the FileSaver.js library.
    saveAs(convertedBlob, outputFileName);
}

// Execute the initialization function when the DOM is fully loaded.
document.addEventListener("DOMContentLoaded", InitializeWordGenerator);

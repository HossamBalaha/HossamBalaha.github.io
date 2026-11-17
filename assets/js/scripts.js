// Gate console logging behind a DEBUG flag.
// In production, set DEBUG=false to silence console.error/warn/log.
// Override by setting localStorage.cv_debug = '1' in DevTools.
var CV_DEBUG = (function () {
  try {
    return localStorage.getItem('cv_debug') === '1';
  } catch (e) {
    return false;
  }
})();
var CVLog = {
  error: function () {
    if (CV_DEBUG) console.error.apply(console, arguments);
  },
  warn: function () {
    if (CV_DEBUG) console.warn.apply(console, arguments);
  },
  log: function () {
    if (CV_DEBUG) console.log.apply(console, arguments);
  }
};
// Define the global mapping of section IDs to user-friendly names.
const SectionMapping = {
  "ProfessionalSummary": {
    "Name": "Professional Summary",
    "Id": "ProfessionalSummary"
  },
  "Biography": {
    "Name": "Biography",
    "Id": "Biography"
  },
  "LongBiography": {
    "Name": "Long Biography",
    "Id": "Long-Biography"
  },
  "Experience": {
    "Name": "Experience",
    "Id": "Experience"
  },
  "ScientificInterests": {
    "Name": "Scientific Interests",
    "Id": "Scientific-Interests"
  },
  "Education": {
    "Name": "Education",
    "Id": "Education"
  },
  "Languages": {
    "Name": "Languages",
    "Id": "Languages"
  },
  "Patents": {
    "Name": "Patents",
    "Id": "Patents"
  },
  "AuthoredBooks": {
    "Name": "Authored Books",
    "Id": "AuthoredBooks"
  },
  "GraduateMentorship": {
    "Name": "Graduate Mentorship",
    "Id": "GraduateMentorship"
  },
  "Communities": {
    "Name": "Communities",
    "Id": "Communities"
  },
  "OfficialScientificAwards": {
    "Name": "Official Scientific Awards",
    "Id": "Official-Scientific-Awards"
  },
  "ScholarRankings": {
    "Name": "Top-1000 Scholar Rankings (October 2026 Edition)",
    "Id": "Scholar-Rankings"
  },
  "ScientificAcademiesWorkshops": {
    "Name": "Scientific Academies & Workshops",
    "Id": "Scientific-Academies-Workshops"
  },
  "ConferencesTalks": {
    "Name": "Conferences & Talks",
    "Id": "Conferences-Talks"
  },
  "TeachingExperience": {
    "Name": "Teaching Experience",
    "Id": "Teaching-Experience"
  },
  "CodesDatasets": {
    "Name": "Codes & Datasets",
    "Id": "Codes-&-Datasets"
  },
  "FeaturedPublications": {
    "Name": "Featured Publications",
    "Id": "featured-publications"
  },
  "PublishedPapers": {
    "Name": "Published Journal Articles",
    "Id": "Published-Papers"
  },
  "PublishedConferences": {
    "Name": "Published Conference Papers",
    "Id": "Published-Conferences"
  },
  "SkillsTools": {
    "Name": "Skills & Tools",
    "Id": "Skills-&-Tools"
  },
  "PublishedBookChapters": {
    "Name": "Published Book Chapters",
    "Id": "Published-Book-Chapters"
  },
  "ActivitiesVolunteering": {
    "Name": "Activities & Volunteering",
    "Id": "Activities-Volunteering"
  },
  "RecentCertifications": {
    "Name": "Recent Certifications",
    "Id": "Recent-Certifications"
  },
  "CareerCertificationsExaminations": {
    "Name": "Career Certifications",
    "Id": "Career-Certifications-&-Examinations"
  },
  "PeerReviews": {
    "Name": "Scholarly Service (Peer Reviews)",
    "Id": "Peer-Reviews"
  },
  "YouTubeCourses": {
    "Name": "YouTube Courses",
    "Id": "YouTube-Courses"
  },
  "WorkExperience": {
    "Name": "Work Experience",
    "Id": "Work-Experience"
  },
  "DesktopWebMobileApplications": {
    "Name": "Applications",
    "Id": "Desktop-Web-and-Mobile-Applications"
  },
  "Freelance": {
    "Name": "Freelance Stats",
    "Id": "Freelance"
  },
  "Judgment": {
    "Name": "Judgment",
    "Id": "Judgment"
  },
  "Competitions": {
    "Name": "Competitions",
    "Id": "Competitions"
  }
};

// Define a helper function to safely read a SweetAlert input value.
function GetSwalValue(elementId) {
  // Get the element by its ID.
  const element = document.getElementById(elementId);
  // Return the value if the element exists, otherwise return an empty string.
  return (element) ? (element.value) : ("");
}

// Define a helper function to safely read a SweetAlert checkbox state.
function GetSwalChecked(elementId) {
  // Get the element by its ID.
  const element = document.getElementById(elementId);
  // Return false if the element does not exist.
  if (!element) {
    return false;
  }
  // Return the checked state of the element.
  return element.checked;
}

// Define a helper function to build select option HTML from a configuration array.
function BuildSelectOptionsHtml(options) {
  // Initialize the HTML string for the options.
  let optionsHtml = "";
  // Iterate over each option in the array.
  for (const option of options) {
    // Determine if the option should be selected by default.
    const selectedAttribute = (option["IsDefault"]) ? (" selected ") : (" ");
    // Append the option HTML to the string.
    optionsHtml += "<option value=\"" + option["Value"] + "\"" + selectedAttribute + ">" + option["Label"] + "</option>";
  }
  // Return the constructed options HTML.
  return optionsHtml;
}

// Define a helper function to build a checkbox block for the modal with detailed tooltips.
function BuildModalCheckbox(id, labelText, helpText, isChecked) {
  // Determine if the checked attribute should be added.
  const checkedAttribute = (isChecked) ? (" checked ") : (" ");
  // Return the HTML string for the checkbox block.
  return "<div class=\"form-check mb-3\" title=\"" + helpText + "\">" + "<input class=\"form-check-input\" type=\"checkbox\" id=\"" + id + "\" title=\"" + helpText + "\" " + checkedAttribute + ">" + "<label class=\"form-check-label fw-bold\" for=\"" + id + "\" title=\"" + helpText + "\">" + labelText + "</label>" + "<small class=\"form-text text-muted d-block mt-1\" style=\"font-size: 0.75rem;\">" + helpText + "</small>" + "</div>";
}

// Define a helper function to create a fallback paragraph for failed images.
function CreateImageFallbackParagraph(imgElement) {
  // Get the alt text or default to "Image".
  const altText = imgElement.getAttribute("alt") || "Image";
  // Create a new paragraph element.
  const fallbackParagraph = document.createElement("p");
  // Set the text content to the alt text in brackets.
  fallbackParagraph.textContent = "[" + altText + "]";
  // Set the font size for the fallback text.
  fallbackParagraph.style.fontSize = "10pt";
  // Set the text color to a muted gray.
  fallbackParagraph.style.color = "#555555";
  // Set the font style to italic.
  fallbackParagraph.style.fontStyle = "italic";
  // Center align the fallback text.
  fallbackParagraph.style.textAlign = "center";
  // Replace the broken image with the fallback paragraph.
  imgElement.replaceWith(fallbackParagraph);
}

// Define the asynchronous function to convert images to base64.
async function ConvertImagesToBase64(element) {
  // On file:// protocol, fetch() of local images fails with CORS errors.
  // Skip base64 conversion entirely — the <img src="..."> tags will load the images
  // directly when the exported document is opened. This only affects the Word
  // export pipeline when run from file:// (e.g. opening the CV from a local folder).
  // On https:// production, fetch() works normally and images are embedded as base64.
  if (window.location.protocol === "file:") {
    CVLog.log("ConvertImagesToBase64 skipped: file:// protocol (fetch not supported).");
    return;
  }
  // Select all image elements within the provided element.
  const imageElements = element.querySelectorAll("img");
  // Iterate over each image element.
  for (const img of imageElements) {
    // Get the original source attribute of the image.
    const originalSrc = img.getAttribute("src");
    // Check if the source exists and is not already a base64 data URL.
    if ((originalSrc) && (!originalSrc.startsWith("data:"))) {
      try {
        // Fetch the image resource.
        const response = await fetch(originalSrc);
        // Check if the fetch was successful.
        if (response.ok) {
          // Convert the response to a blob.
          const blob = await response.blob();
          // Create a new FileReader instance.
          const reader = new FileReader();
          // Create a promise to handle the asynchronous file reading.
          const dataUrl = await new Promise(function (resolve, reject) {
            // Set the onloadend event handler to resolve with the result.
            reader.onloadend = function () {
              resolve(reader.result);
            };
            // Set the onerror event handler to reject with an error.
            reader.onerror = function () {
              reject(new Error("Failed to read file."));
            };
            // Read the blob as a data URL.
            reader.readAsDataURL(blob);
          });
          // Set the image source to the base64 data URL.
          img.setAttribute("src", dataUrl);
        } else {
          // Log a warning if the fetch failed.
          CVLog.warn("Failed to fetch image: ", originalSrc);
        }
      } catch (fetchError) {
        // Log a warning if an exception occurred during fetching.
        CVLog.warn("Error fetching image: ", originalSrc, fetchError);
      }
    }
  }
}

// Define a helper function to extract a meaningful label for a hyperlink.
function ExtractLinkLabel(linkElement) {
  // Get the trimmed text content of the link.
  const rawText = linkElement.textContent.trim();
  // Get the href attribute or default to an empty string.
  const href = linkElement.getAttribute("href") || "";
  // Define an array of generic link texts to ignore.
  const genericTexts = ["click to open", "open", "playlist", "learn more", "review portal", "read more", "journal", "repository", "code", "docs", "open or download", "more information (click to open)", "more information", ""];
  // Check if the link contains an image child.
  const childImg = linkElement.querySelector("img");
  // If an image child exists, extract its alt or title text.
  if (childImg) {
    // Get the alt or title attribute of the image.
    const altText = childImg.getAttribute("alt") || childImg.getAttribute("title") || "";
    // Return the alt text if it is not in the generic texts list.
    if ((altText) && (!genericTexts.includes(altText.toLowerCase()))) {
      return altText;
    }
  }
  // Get the title attribute of the link.
  const titleAttr = linkElement.getAttribute("title");
  // Return the title attribute if it is not generic.
  if ((titleAttr) && (!genericTexts.includes(titleAttr.toLowerCase()))) {
    return titleAttr;
  }
  // Get the aria-label attribute of the link.
  const ariaLabel = linkElement.getAttribute("aria-label");
  // Check if the aria-label exists and is not generic.
  if ((ariaLabel) && (!genericTexts.includes(ariaLabel.toLowerCase()))) {
    // Clean the aria-label by removing action verbs.
    const cleanLabel = ariaLabel.replace(/^(visit|view|watch|access|open|download)\s+/i, "").trim();
    // Return the cleaned label.
    return cleanLabel;
  }
  // Determine if the raw text is generic or a URL.
  const isGeneric = (!rawText) || (genericTexts.includes(rawText.toLowerCase())) || (rawText.startsWith("http")) || (rawText.startsWith("doi.org")) || (rawText.startsWith("link.springer"));
  // If the text is generic, try to find a parent container heading.
  if (isGeneric) {
    // Find the closest parent container with a heading.
    const parentContainer = linkElement.closest(".resume-timeline-item, .course-card, .volunteer-item, .repo-item, .role-card, .journal-item, article, .primary-info, .secondary-info");
    // If a parent container exists, find its heading.
    if (parentContainer) {
      // Select the heading element within the parent container.
      const heading = parentContainer.querySelector("h1, h2, h3, h4, .resume-position-title, .course-title, .volunteer-title, .repo-title, .role-title, .journal-name, .name");
      // Return the heading text if found.
      if (heading) {
        return heading.textContent.trim();
      }
    }
    // If a href exists, try to extract the hostname.
    if (href) {
      try {
        // Parse the URL to extract the hostname.
        const urlObj = new URL(href);
        // Return the hostname without the www prefix.
        return urlObj.hostname.replace("www.", "");
      } catch (urlError) {
        // Return the raw href if URL parsing fails.
        return href;
      }
    }
  }
  // Clean the raw text by removing private use Unicode characters.
  const cleanText = rawText.replace(/[\uE000-\uF8FF]/g, "").trim();
  // Return the cleaned text.
  return cleanText;
}

// Define the function to convert margin strings into Word-compatible point values.
function ConvertMarginToPoints(marginStr) {
  // Check if the margin string contains inches.
  if (marginStr.includes("in")) {
    const inches = parseFloat(marginStr);
    return (inches * 72).toFixed(1) + "pt";
  }
  // Check if the margin string contains millimeters.
  if (marginStr.includes("mm")) {
    const millimeters = parseFloat(marginStr);
    return (millimeters * 2.83465).toFixed(1) + "pt";
  }
  // Check if the margin string contains centimeters.
  if (marginStr.includes("cm")) {
    const centimeters = parseFloat(marginStr);
    return (centimeters * 28.3465).toFixed(1) + "pt";
  }
  // Check if the margin string contains points.
  if (marginStr.includes("pt")) {
    return marginStr;
  }
  // Check if the margin string contains pixels.
  if (marginStr.includes("px")) {
    const pixels = parseFloat(marginStr);
    return (pixels * 0.75).toFixed(1) + "pt";
  }
  // Return the original string if no unit matches.
  return marginStr;
}

// Define the function to generate Word-compatible ATS-friendly styles.
function GetWordFriendlyStyles(options) {
  // Set the default font family.
  const fontFamily = options.Font || "Calibri, Arial, sans-serif";
  // Set the default font size.
  const fontSize = options.Size || "11pt";
  // Set the default accent color.
  let accentColor = options.Color || "#000000";
  // Force black color if grayscale or high contrast is enabled.
  if ((options.Grayscale) || (options.HighContrast)) {
    accentColor = "#000000";
  }
  // Set the default paper size.
  const paperSize = options.Paper || "8.5in 11.0in";
  // Set the default page margin.
  const pageMargin = options.Margin || "0.75in";
  // Convert the page margin to points.
  const marginPt = ConvertMarginToPoints(pageMargin);
  // Set the default heading scale.
  const headingScale = options.HeadingScale || "standard";
  // Set the default paragraph spacing.
  let paragraphSpacing = options.ParagraphSpacing || "standard";
  // Override paragraph spacing if tight layout is enabled.
  if (options.IsTight) {
    paragraphSpacing = "compact";
  }
  // Define default heading sizes.
  let h1Size = "18pt";
  let h2Size = "14pt";
  let h3Size = "12pt";
  let h4Size = "11pt";
  // Adjust heading sizes for compact scale.
  if (headingScale === "compact") {
    h1Size = "16pt";
    h2Size = "12.5pt";
    h3Size = "11pt";
    h4Size = "10.5pt";
  }
  // Adjust heading sizes for executive scale.
  if (headingScale === "executive") {
    h1Size = "20pt";
    h2Size = "15pt";
    h3Size = "13pt";
    h4Size = "11.5pt";
  }
  // Define default spacing variables.
  let bodyLineHeight = "1.15";
  let pMargin = "0 0 6pt 0";
  let liMargin = "3pt";
  let timelineMargin = "8pt";
  let timelinePadding = "3pt 0";
  let timeMargin = "0 0 4pt 0";
  let h1Margin = "0 0 8pt 0";
  let h2Margin = "12pt 0 5pt 0";
  let h2Padding = "2pt";
  let h3Margin = "8pt 0 3pt 0";
  let h4Margin = "5pt 0 2pt 0";
  // Adjust spacing variables for compact paragraph spacing.
  if (paragraphSpacing === "compact") {
    bodyLineHeight = "1.05";
    pMargin = "0 0 2pt 0";
    liMargin = "0";
    timelineMargin = "3pt";
    timelinePadding = "0";
    timeMargin = "0";
    h1Margin = "0";
    h2Margin = "5pt 0 2pt 0";
    h2Padding = "1pt";
    h3Margin = "3pt 0 1pt 0";
    h4Margin = "2pt 0 1pt 0";
  }
  // Adjust spacing variables for comfortable paragraph spacing.
  if (paragraphSpacing === "comfortable") {
    bodyLineHeight = "1.25";
    pMargin = "0 0 10pt 0";
    liMargin = "5pt";
    timelineMargin = "12pt";
    timelinePadding = "5pt 0";
    timeMargin = "0 0 6pt 0";
    h1Margin = "0 0 10pt 0";
    h2Margin = "16pt 0 7pt 0";
    h2Padding = "4pt";
    h3Margin = "10pt 0 4pt 0";
    h4Margin = "7pt 0 3pt 0";
  }
  // Adjust spacing variables for ultra-tight layout.
  if (options.IsTight) {
    bodyLineHeight = "1.0";
    pMargin = "0 0 1pt 0";
    liMargin = "0";
    timelineMargin = "2pt";
    timelinePadding = "0";
    timeMargin = "0";
    h1Margin = "0";
    h2Margin = "4pt 0 1pt 0";
    h2Padding = "0";
    h3Margin = "2pt 0 1pt 0";
    h4Margin = "1pt 0 0 0";
  }
  // Determine text alignment based on justify option.
  const textAlign = (options.JustifyText) ? ("justify") : ("left");
  // Determine heading transform based on uppercase option.
  const h2Transform = (options.UppercaseHeadings) ? ("uppercase") : ("none");
  // Determine heading border based on borders option.
  const h2Border = (options.HeadingBorders) ? ("1pt solid " + accentColor) : ("none");
  // Define base link CSS.
  let linkCss = "a { color: " + accentColor + "; text-decoration: underline; }";
  // Append URL display CSS if show URLs is enabled.
  if (options.ShowUrls) {
    linkCss += " a::after { content: \" [\" attr(href) \"]\"; font-size: 0.8em; color: #555555; word-break: break-all; }";
  }
  // Define base bullet CSS.
  let bulletCss = "ul, ol { list-style-type: disc !important; mso-list: none !important; } li { list-style-type: disc !important; }";
  // Override bullet CSS if dash or none style is selected.
  if ((options.BulletStyle === "dash") || (options.BulletStyle === "none")) {
    bulletCss = "ul, ol, li { list-style: none !important; list-style-type: none !important; mso-list: none !important; }";
  }
  // Initialize page break CSS.
  let pageBreakCss = "";
  // Append page break CSS if page breaks are enabled.
  if (options.Pagebreaks) {
    pageBreakCss = "h2.resume-section-title { page-break-before: always; } h2.resume-section-title:first-of-type { page-break-before: auto; }";
  }
  // Initialize grayscale CSS.
  let grayscaleCss = "";
  // Append grayscale CSS if grayscale mode is enabled.
  if (options.Grayscale) {
    grayscaleCss = ".badge, .repo-badge, .skill-pill, .skill-tag, .tech-tag, .volunteer-badge, .course-badge, .role-badge, .journal-publisher { background: transparent !important; color: #000000 !important; border: 1px solid #000000 !important; }";
  }
  // Initialize DOI CSS.
  let doiCss = "";
  // Append DOI hide CSS if DOI style is hide.
  if (options.DoiStyle === "hide") {
    doiCss = "a.doi-link, .doi-link { display: none !important; }";
  }
  // Append DOI plain CSS if DOI style is plain.
  if (options.DoiStyle === "plain") {
    doiCss = "a.doi-link { text-decoration: none !important; color: #000000 !important; pointer-events: none !important; border: none !important; }";
  }
  // Initialize kerning CSS.
  let kerningCss = "";
  // Append kerning CSS if font kerning is enabled.
  if (options.FontKerning) {
    kerningCss = "body { font-feature-settings: \"kern\", \"liga\", \"clig\"; text-rendering: optimizeLegibility; }";
  }
  // Initialize orphan control CSS.
  let orphanCss = "";
  // Append orphan control CSS if enabled.
  if (options.OrphanControl) {
    orphanCss = "p, li, h2, h3, h4 { orphans: 3; widows: 3; }";
  }
  // Initialize black and white link CSS.
  let bwLinkCss = "";
  // Append black and white link CSS if enabled.
  if (options.BwLinks) {
    bwLinkCss = "a { color: #000000 !important; }";
  }
  // Initialize no underlines CSS.
  let noUnderlinesCss = "";
  // Append no underlines CSS if enabled.
  if (options.NoUnderlines) {
    noUnderlinesCss = "a { text-decoration: none !important; }";
  }
  // Initialize monochrome badges CSS.
  let monoBadgesCss = "";
  // Append monochrome badges CSS if enabled.
  if (options.MonoBadges) {
    monoBadgesCss = ".badge, .skill-tag, .tech-tag, .skill-pill, .repo-badge, .volunteer-badge, .course-badge, .role-badge, .journal-publisher { background: transparent !important; color: #000000 !important; border: 1px solid #666666 !important; }";
  }
  // Initialize consistent indent CSS.
  let consistentIndentCss = "";
  // Append consistent indent CSS if enabled.
  if (options.ConsistentIndent) {
    consistentIndentCss = "ul, ol { padding-left: 18pt !important; }";
  }
  // Initialize item dividers CSS.
  let itemDividersCss = "";
  // Append item dividers CSS if enabled.
  if (options.ItemDividers) {
    itemDividersCss = ".resume-timeline-item, .journal-item, .course-card, .volunteer-item, .repo-item, .role-card { border-bottom: 1px solid #d1d5db; padding-bottom: 6pt; margin-bottom: 8pt; }";
  }
  // Initialize remove shadows CSS.
  let removeShadowsCss = "";
  // Append remove shadows CSS if enabled.
  if (options.RemoveShadows) {
    removeShadowsCss = "* { box-shadow: none !important; text-shadow: none !important; }";
  }
  // Initialize stable tables CSS.
  let stableTablesCss = "";
  // Append stable tables CSS if enabled.
  if (options.StableTables) {
    stableTablesCss = "table { table-layout: fixed !important; } td, th { word-wrap: break-word; vertical-align: top !important; }";
  }
  // Initialize high contrast CSS.
  let highContrastCss = "";
  // Append high contrast CSS if enabled.
  if (options.HighContrast) {
    highContrastCss = "h1, h2, h3, h4, a, strong { color: #000000 !important; } .badge, .skill-tag, .skill-pill, .repo-badge, .volunteer-badge, .course-badge, .role-badge, .journal-publisher { background: transparent !important; color: #000000 !important; border: 1px solid #000000 !important; }";
  }
  // Return the complete CSS string.
  return "@page { size: " + paperSize + "; margin: " + marginPt + "; } " + "@page WordSection1 { size: " + paperSize + "; margin: " + marginPt + "; mso-page-margin-top: " + marginPt + "; mso-page-margin-bottom: " + marginPt + "; mso-page-margin-left: " + marginPt + "; mso-page-margin-right: " + marginPt + "; mso-header-margin: 36pt; mso-footer-margin: 36pt; } " + "div.WordSection1 { page: WordSection1; margin: 0; padding: 0; } " + "html, body { margin: 0; padding: 0; } " + "body { font-family: " + fontFamily + "; font-size: " + fontSize + "; line-height: " + bodyLineHeight + "; color: #000000; text-align: left; } " + "h1 { font-size: " + h1Size + "; font-weight: bold; margin: " + h1Margin + "; text-align: center; color: " + accentColor + "; } " + "h2 { font-size: " + h2Size + "; font-weight: bold; margin: " + h2Margin + "; text-transform: " + h2Transform + "; border-bottom: " + h2Border + "; padding-bottom: " + h2Padding + "; text-align: left; color: " + accentColor + "; } " + "h3 { font-size: " + h3Size + "; font-weight: bold; margin: " + h3Margin + "; text-align: left; color: #000000; } " + "h4 { font-size: " + h4Size + "; font-weight: bold; margin: " + h4Margin + "; text-align: left; color: #000000; } " + "p { font-size: " + fontSize + "; margin: " + pMargin + "; line-height: " + bodyLineHeight + "; text-align: " + textAlign + "; } " + bulletCss + "li { font-size: " + fontSize + "; margin-bottom: " + liMargin + "; line-height: " + bodyLineHeight + "; text-align: " + textAlign + "; } " + linkCss + doiCss + noUnderlinesCss + kerningCss + orphanCss + bwLinkCss + monoBadgesCss + consistentIndentCss + itemDividersCss + removeShadowsCss + stableTablesCss + highContrastCss + grayscaleCss + pageBreakCss + ".row, .col-lg-9, .col-lg-3, .col-lg-12, .col-auto, .d-flex, .flex-column, .flex-md-row, .col-12, .col-md-6 { display: block !important; width: 100% !important; float: none !important; margin: 0 !important; padding: 0 !important; } " + "button, .btn, nav, .nav-badge-link, #global-toolbar, #sticky-toc, .toc-backdrop, .toc-flyout, .back-to-top, #back-to-top, .mobile-toc-toggle, #mobile-toc-toggle, .fab-menu, #reading-progress-bar, #reading-guide-indicator, .block-action-toolbar, .accessibility-menu-panel, .qr-share-popup, .schedule-meeting-popup, .avatar-lightbox, #Posters, #All-Photos, #Photos, .stats-bar, .courses-stats, .swal2-container { display: none !important; } " + "i[class*=\"fa\"], i[class*=\"bi\"], svg, .fa-container { display: none !important; } " + ".tech-tag, .skill-tag, .skill-pill, .repo-badge, .volunteer-badge, .course-badge, .role-badge, .repo-desc, .journal-publisher { display: inline !important; background: none !important; color: #000000 !important; padding: 0 !important; margin-right: 4pt !important; font-size: 10pt !important; border: none !important; } " + ".resume-timeline-item { margin-bottom: " + timelineMargin + "; padding: " + timelinePadding + "; border-left: none !important; background-color: transparent !important; } " + ".resume-timeline-item-header { margin-bottom: 2pt !important; } " + ".resume-position-title { margin: 0 0 1pt 0; font-size: 11.5pt; font-weight: bold; } " + ".resume-company-name { margin: 0 0 1pt 0; font-size: 11pt; font-style: italic; } " + ".resume-position-time { margin: " + timeMargin + "; font-weight: normal; color: #333333; font-size: 10pt; } " + "img { max-width: 100%; height: auto; border: none; } " + "ul, ol { margin-top: 0 !important; padding-top: 0 !important; } " + "li:first-child { margin-top: 0 !important; padding-top: 0 !important; } " + "p:first-child { margin-top: 0 !important; } " + ".journal-item { margin-bottom: 4pt !important; } " + ".journal-name { margin: 0 !important; } " + ".resume-timeline-item-desc > ul { margin-top: 0 !important; } " + "table { border-collapse: collapse; width: 100%; margin-bottom: 6pt; } " + "td, th { border: 1px solid #000000; padding: 4pt; } " + "a[href*=\"doi.org\"], a[href*=\"DOI\"], .doi-link, li:has(a[href*=\"doi.org\"]) { text-align: left !important; word-break: break-all !important; } ";
}

// Define the function to build the configuration modal HTML.
function BuildConfigurationModalHtml() {
  // Define font options.
  const fontOptions = [{
    "Value": "Calibri, Arial, sans-serif",
    "Label": "Calibri (ATS Standard)",
    "IsDefault": true
  }, {
    "Value": "Aptos, Calibri, Arial, sans-serif",
    "Label": "Aptos (Modern Office)",
    "IsDefault": false
  }, {
    "Value": "\"Segoe UI\", SegoeUI, sans-serif",
    "Label": "Segoe UI",
    "IsDefault": false
  }, {
    "Value": "Arial, Helvetica, sans-serif",
    "Label": "Arial",
    "IsDefault": false
  }, {
    "Value": "Helvetica, Arial, sans-serif",
    "Label": "Helvetica",
    "IsDefault": false
  }, {
    "Value": "Verdana, Geneva, sans-serif",
    "Label": "Verdana",
    "IsDefault": false
  }, {
    "Value": "Tahoma, Geneva, sans-serif",
    "Label": "Tahoma",
    "IsDefault": false
  }, {
    "Value": "\"Trebuchet MS\", Helvetica, sans-serif",
    "Label": "Trebuchet MS",
    "IsDefault": false
  }, {
    "Value": "\"Times New Roman\", Times, serif",
    "Label": "Times New Roman",
    "IsDefault": false
  }, {
    "Value": "Cambria, Georgia, serif",
    "Label": "Cambria",
    "IsDefault": false
  }, {
    "Value": "Georgia, serif",
    "Label": "Georgia",
    "IsDefault": false
  }, {
    "Value": "Garamond, serif",
    "Label": "Garamond",
    "IsDefault": false
  }, {
    "Value": "\"Palatino Linotype\", Palatino, serif",
    "Label": "Palatino Linotype",
    "IsDefault": false
  }, {
    "Value": "\"Book Antiqua\", Palatino, serif",
    "Label": "Book Antiqua",
    "IsDefault": false
  }, {
    "Value": "\"Century Gothic\", CenturyGothic, sans-serif",
    "Label": "Century Gothic",
    "IsDefault": false
  }, {
    "Value": "\"Franklin Gothic Medium\", Arial, sans-serif",
    "Label": "Franklin Gothic Medium",
    "IsDefault": false
  }, {
    "Value": "Lato, sans-serif",
    "Label": "Lato (Modern)",
    "IsDefault": false
  }, {
    "Value": "\"Open Sans\", sans-serif",
    "Label": "Open Sans",
    "IsDefault": false
  }, {
    "Value": "Roboto, sans-serif",
    "Label": "Roboto",
    "IsDefault": false
  }, {
    "Value": "Inter, sans-serif",
    "Label": "Inter",
    "IsDefault": false
  }, {
    "Value": "Montserrat, sans-serif",
    "Label": "Montserrat",
    "IsDefault": false
  }, {
    "Value": "Raleway, sans-serif",
    "Label": "Raleway",
    "IsDefault": false
  }, {
    "Value": "\"Source Sans Pro\", sans-serif",
    "Label": "Source Sans Pro",
    "IsDefault": false
  }, {
    "Value": "\"Source Serif Pro\", serif",
    "Label": "Source Serif Pro",
    "IsDefault": false
  }, {
    "Value": "Merriweather, serif",
    "Label": "Merriweather",
    "IsDefault": false
  }, {
    "Value": "\"Playfair Display\", serif",
    "Label": "Playfair Display",
    "IsDefault": false
  }, {
    "Value": "\"Noto Sans\", sans-serif",
    "Label": "Noto Sans",
    "IsDefault": false
  }];
  // Define font size options.
  const fontSizeOptions = [{
    "Value": "9pt",
    "Label": "9pt (Ultra Compact)",
    "IsDefault": false
  }, {
    "Value": "10pt",
    "Label": "10pt (Compact)",
    "IsDefault": false
  }, {
    "Value": "10.5pt",
    "Label": "10.5pt (US Standard)",
    "IsDefault": false
  }, {
    "Value": "11pt",
    "Label": "11pt (Standard)",
    "IsDefault": true
  }, {
    "Value": "11.5pt",
    "Label": "11.5pt (Executive)",
    "IsDefault": false
  }, {
    "Value": "12pt",
    "Label": "12pt (Large)",
    "IsDefault": false
  }, {
    "Value": "13pt",
    "Label": "13pt (Accessibility)",
    "IsDefault": false
  }];
  // Define color options.
  const colorOptions = [{
    "Value": "#000000",
    "Label": "Black (ATS Safest)",
    "IsDefault": true
  }, {
    "Value": "#111827",
    "Label": "Gray 900",
    "IsDefault": false
  }, {
    "Value": "#1F2937",
    "Label": "Charcoal",
    "IsDefault": false
  }, {
    "Value": "#334155",
    "Label": "Slate Gray",
    "IsDefault": false
  }, {
    "Value": "#475569",
    "Label": "Steel Gray",
    "IsDefault": false
  }, {
    "Value": "#1A365D",
    "Label": "Navy Blue",
    "IsDefault": false
  }, {
    "Value": "#1E3A8A",
    "Label": "Royal Blue",
    "IsDefault": false
  }, {
    "Value": "#1D4ED8",
    "Label": "Strong Blue",
    "IsDefault": false
  }, {
    "Value": "#2563EB",
    "Label": "Bright Blue",
    "IsDefault": false
  }, {
    "Value": "#3B82F6",
    "Label": "Modern Blue",
    "IsDefault": false
  }, {
    "Value": "#0EA5E9",
    "Label": "Sky Blue",
    "IsDefault": false
  }, {
    "Value": "#0F766E",
    "Label": "Dark Teal",
    "IsDefault": false
  }, {
    "Value": "#0D9488",
    "Label": "Teal",
    "IsDefault": false
  }, {
    "Value": "#059669",
    "Label": "Emerald Green",
    "IsDefault": false
  }, {
    "Value": "#047857",
    "Label": "Deep Emerald",
    "IsDefault": false
  }, {
    "Value": "#14532D",
    "Label": "Forest Green",
    "IsDefault": false
  }, {
    "Value": "#166534",
    "Label": "Academic Green",
    "IsDefault": false
  }, {
    "Value": "#4D7C0F",
    "Label": "Olive Green",
    "IsDefault": false
  }, {
    "Value": "#7F1D1D",
    "Label": "Maroon",
    "IsDefault": false
  }, {
    "Value": "#991B1B",
    "Label": "Crimson Red",
    "IsDefault": false
  }, {
    "Value": "#B91C1C",
    "Label": "Bold Red",
    "IsDefault": false
  }, {
    "Value": "#800020",
    "Label": "Burgundy",
    "IsDefault": false
  }, {
    "Value": "#881337",
    "Label": "Raspberry",
    "IsDefault": false
  }, {
    "Value": "#4C1D95",
    "Label": "Deep Purple",
    "IsDefault": false
  }, {
    "Value": "#6D28D9",
    "Label": "Violet",
    "IsDefault": false
  }, {
    "Value": "#7C3AED",
    "Label": "Modern Purple",
    "IsDefault": false
  }, {
    "Value": "#1E1B4B",
    "Label": "Indigo Ink",
    "IsDefault": false
  }, {
    "Value": "#C2410C",
    "Label": "Rust Orange",
    "IsDefault": false
  }, {
    "Value": "#9A3412",
    "Label": "Burnt Sienna",
    "IsDefault": false
  }, {
    "Value": "#B45309",
    "Label": "Amber Brown",
    "IsDefault": false
  }, {
    "Value": "#A16207",
    "Label": "Dark Gold",
    "IsDefault": false
  }, {
    "Value": "#78350F",
    "Label": "Chocolate Brown",
    "IsDefault": false
  }];
  // Define paper options.
  const paperOptions = [{
    "Value": "8.5in 11.0in",
    "Label": "US Letter (8.5 x 11)",
    "IsDefault": true
  }, {
    "Value": "210mm 297mm",
    "Label": "A4 (210 x 297 mm)",
    "IsDefault": false
  }, {
    "Value": "8.5in 14.0in",
    "Label": "US Legal (8.5 x 14)",
    "IsDefault": false
  }, {
    "Value": "297mm 420mm",
    "Label": "A3 (297 x 420 mm)",
    "IsDefault": false
  }, {
    "Value": "148mm 210mm",
    "Label": "A5 (148 x 210 mm)",
    "IsDefault": false
  }, {
    "Value": "7.25in 10.5in",
    "Label": "Executive (7.25 x 10.5)",
    "IsDefault": false
  }, {
    "Value": "176mm 250mm",
    "Label": "B5 (176 x 250 mm)",
    "IsDefault": false
  }, {
    "Value": "5.5in 8.5in",
    "Label": "Statement (5.5 x 8.5)",
    "IsDefault": false
  }];
  // Define margin options.
  const marginOptions = [{
    "Value": "0.25in",
    "Label": "Ultra Narrow (0.25 in)",
    "IsDefault": false
  }, {
    "Value": "0.5in",
    "Label": "Narrow (0.5 in)",
    "IsDefault": false
  }, {
    "Value": "0.6in",
    "Label": "Moderate (0.6 in)",
    "IsDefault": false
  }, {
    "Value": "0.75in",
    "Label": "Normal (0.75 in)",
    "IsDefault": true
  }, {
    "Value": "1in",
    "Label": "Wide (1.0 in)",
    "IsDefault": false
  }, {
    "Value": "1.25in",
    "Label": "Extra Wide (1.25 in)",
    "IsDefault": false
  }];
  // Define heading scale options.
  const headingScaleOptions = [{
    "Value": "compact",
    "Label": "Compact Headings",
    "IsDefault": false
  }, {
    "Value": "standard",
    "Label": "Standard Headings",
    "IsDefault": true
  }, {
    "Value": "executive",
    "Label": "Executive Headings",
    "IsDefault": false
  }];
  // Define paragraph spacing options.
  const paragraphSpacingOptions = [{
    "Value": "compact",
    "Label": "Compact Spacing",
    "IsDefault": false
  }, {
    "Value": "standard",
    "Label": "Standard Spacing",
    "IsDefault": true
  }, {
    "Value": "comfortable",
    "Label": "Comfortable Spacing",
    "IsDefault": false
  }];
  // Define DOI options.
  const doiOptions = [{
    "Value": "show",
    "Label": "Show as Links",
    "IsDefault": true
  }, {
    "Value": "plain",
    "Label": "Plain Text",
    "IsDefault": false
  }, {
    "Value": "hide",
    "Label": "Hide Completely",
    "IsDefault": false
  }];
  // Define date format options.
  const dateFormatOptions = [{
    "Value": "original",
    "Label": "Original",
    "IsDefault": true
  }, {
    "Value": "month-year",
    "Label": "Month YYYY",
    "IsDefault": false
  }, {
    "Value": "mm-yyyy",
    "Label": "MM/YYYY",
    "IsDefault": false
  }];
  // Define bullet options.
  const bulletOptions = [{
    "Value": "disc",
    "Label": "Standard Disc",
    "IsDefault": true
  }, {
    "Value": "dash",
    "Label": "Professional Dash (-)",
    "IsDefault": false
  }, {
    "Value": "none",
    "Label": "None (No Bullets)",
    "IsDefault": false
  }];
  // Define publication limit options.
  const pubLimitOptions = [{
    "Value": "all",
    "Label": "All Publications",
    "IsDefault": true
  }, {
    "Value": "3y",
    "Label": "Last 3 Years",
    "IsDefault": false
  }, {
    "Value": "5y",
    "Label": "Last 5 Years",
    "IsDefault": false
  }, {
    "Value": "10",
    "Label": "Top 10 Most Recent",
    "IsDefault": false
  }];
  // Define watermark options.
  const watermarkOptions = [{
    "Value": "none",
    "Label": "None",
    "IsDefault": true
  }, {
    "Value": "draft",
    "Label": "DRAFT",
    "IsDefault": false
  }, {
    "Value": "confidential",
    "Label": "CONFIDENTIAL",
    "IsDefault": false
  }];
  // Define contact layout options.
  const contactLayoutOptions = [{
    "Value": "inline",
    "Label": "Inline Centered",
    "IsDefault": true
  }, {
    "Value": "stacked",
    "Label": "Stacked Left",
    "IsDefault": false
  }];
  // Define document language options.
  const documentLanguageOptions = [{
    "Value": "en-US",
    "Label": "English (US)",
    "IsDefault": true
  }, {
    "Value": "en-GB",
    "Label": "English (UK)",
    "IsDefault": false
  }, {
    "Value": "ar-EG",
    "Label": "Arabic (Egypt)",
    "IsDefault": false
  }];
  // Initialize the section checkboxes HTML.
  let sectionCheckboxesHtml = "";
  // Iterate over the section mapping to create checkboxes.
  for (const [key, data] of Object.entries(SectionMapping)) {
    // Append the checkbox HTML for each section.
    sectionCheckboxesHtml += "<div class=\"form-check section-checkbox-card\">" + "<input class=\"form-check-input section-checkbox\" type=\"checkbox\" value=\"" + key + "\" id=\"sec_" + key + "\" checked>" + "<label class=\"form-check-label\" for=\"sec_" + key + "\">" + data["Name"] + "</label>" + "</div>";
  }
  // Initialize the modal CSS.
  let modalCss = "<style>";
  // Add responsive media queries for the modal.
  modalCss += "@media (max-width: 992px) { .section-checkbox-card { width: 48% !important; } }";
  modalCss += "@media (max-width: 768px) { .swal2-popup { font-size: 0.9rem !important; } .export-tabs { flex-direction: column; } .export-tab-link { width: 100%; margin-right: 0 !important; margin-bottom: 4px; } .section-checkbox-card { width: 100% !important; } .accent-color-row { flex-wrap: wrap; } }";
  // Two-panel layout CSS — the settings start hidden so only the live
  // preview is visible; the Customize button slides the settings in and out.
  modalCss += ".export-two-panel { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: 0; align-items: stretch; transition: gap 0.4s cubic-bezier(0.4, 0, 0.2, 1); }";
  modalCss += ".export-config-panel { max-width: 0; opacity: 0; overflow: hidden; max-height: 70vh; padding: 0; margin: 0; border: 0; transition: max-width 0.45s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease 0.1s; }";
  modalCss += ".export-two-panel.show-settings { gap: 20px; }";
  modalCss += ".export-two-panel.show-settings .export-config-panel { max-width: min(720px, 48vw); opacity: 1; overflow-y: auto; padding-right: 8px; }";
  modalCss += ".export-preview-panel { position: sticky; top: 0; height: 70vh; display: flex; flex-direction: column; background: #f3f2f1; border: 1px solid #cbd5e1; border-radius: 14px; overflow: hidden; }";
  modalCss += ".export-preview-header { padding: 10px 16px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; font-weight: 700; font-size: 0.85rem; display: flex; align-items: center; gap: 8px; }";
  modalCss += ".export-preview-header .preview-status { margin-left: auto; font-size: 0.7rem; font-weight: 500; opacity: 0.9; }";
  modalCss += ".export-preview-iframe { flex: 1; width: 100%; border: none; background: white; }";
  modalCss += ".export-preview-placeholder { flex: 1; display: flex; align-items: center; justify-content: center; flex-direction: column; color: #64748b; font-size: 0.85rem; gap: 8px; padding: 20px; text-align: center; }";
  // Loader overlay for the live preview.
  modalCss += ".export-preview-loader { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(243,242,241,0.85); display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 12px; z-index: 10; backdrop-filter: blur(2px); }";
  modalCss += ".preview-spinner { width: 36px; height: 36px; border: 3px solid #cbd5e1; border-top-color: #10b981; border-radius: 50%; animation: preview-spin 0.8s linear infinite; }";
  modalCss += ".preview-loader-text { font-size: 0.8rem; color: #475569; font-weight: 500; }";
  modalCss += "@keyframes preview-spin { to { transform: rotate(360deg); } }";
  modalCss += "@media (max-width: 992px) { .export-two-panel { grid-template-columns: minmax(0, 1fr); } .export-two-panel.show-settings .export-config-panel { max-width: 100%; max-height: 60vh; } .export-preview-panel { height: 50vh; } }";
  // Add styling for the SweetAlert popup.
  modalCss += ".swal2-popup { background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%) !important; border-radius: 20px !important; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15) !important; border: 1px solid #e2e8f0 !important; font-family: \"Segoe UI\", system-ui, -apple-system, sans-serif !important; }";
  modalCss += ".swal2-title { color: #0f172a !important; font-size: 1.8rem !important; font-weight: 800 !important; letter-spacing: -0.5px !important; }";
  // Animate the popup width so the modal smoothly grows/shrinks between the
  // full two-panel width (Customize on) and the fitted live-preview width
  // (Customize off).
  modalCss += ".swal2-popup { transition: width 0.45s cubic-bezier(0.4, 0, 0.2, 1); }";
  // Add styling for the export tabs.
  modalCss += ".export-tabs { display: flex; gap: 6px; background: #f1f5f9; padding: 6px; border-radius: 14px; margin-bottom: 24px; border: 1px solid #e2e8f0; }";
  modalCss += ".export-tab-link { flex: 1; text-align: center; padding: 12px 10px; border-radius: 10px; font-weight: 600; color: #64748b; text-decoration: none; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 0.82rem; }";
  modalCss += ".export-tab-link:hover { background: #e2e8f0; color: #0f172a; }";
  modalCss += ".export-tab-link.active { background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); color: #ffffff !important; box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3); }";
  modalCss += ".export-tab-pane { display: none; animation: fadeInPane 0.4s ease-out; }";
  modalCss += ".export-tab-pane.active { display: block; }";
  modalCss += "@keyframes fadeInPane { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }";
  // Add styling for form elements.
  modalCss += ".form-check-input { border-radius: 4px !important; border: 2px solid #cbd5e1 !important; width: 1.2em !important; height: 1.2em !important; margin-top: 0.15em !important; }";
  modalCss += ".form-check-input:checked { background-color: #4f46e5 !important; border-color: #4f46e5 !important; }";
  modalCss += ".form-select, .form-control { border-radius: 10px !important; border: 1.5px solid #e2e8f0 !important; padding: 8px 14px !important; transition: all 0.2s !important; font-size: 0.9rem !important; }";
  modalCss += ".form-select:focus, .form-control:focus { border-color: #4f46e5 !important; box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1) !important; }";
  modalCss += "h6.fw-bold { color: #1e293b !important; font-size: 1.05rem !important; font-weight: 700 !important; letter-spacing: 0.5px !important; text-transform: uppercase !important; border-bottom: 2px solid #e2e8f0 !important; padding-bottom: 10px !important; margin-bottom: 18px !important; }";
  modalCss += ".form-label { font-weight: 600 !important; color: #475569 !important; font-size: 0.85rem !important; }";
  modalCss += ".form-check-label { color: #334155 !important; font-weight: 500 !important; cursor: pointer !important; }";
  // Add styling for the section checkboxes grid.
  modalCss += ".section-checkboxes-grid { display: flex; flex-wrap: wrap; gap: 10px; max-height: 320px; overflow-y: auto; padding: 14px; border: 1px solid #e2e8f0; border-radius: 12px; background: #f8fafc; }";
  modalCss += ".section-checkbox-card { background: #ffffff; border: 1px solid #e2e8f0; padding: 8px 10px; border-radius: 10px; margin: 0 !important; width: 31%; min-width: 215px; display: flex; align-items: center; gap: 8px; }";
  modalCss += ".section-checkbox-card:hover { border-color: #4f46e5; background: #f8fafc; }";
  modalCss += ".section-checkbox-card .form-check-input { margin: 0 !important; flex-shrink: 0; }";
  modalCss += ".section-checkbox-card .form-check-label { margin: 0; line-height: 1.2; }";
  modalCss += ".accent-color-row { display: flex; align-items: center; gap: 8px; }";
  modalCss += ".accent-color-row input[type=\"color\"] { width: 44px; height: 38px; padding: 2px; border: 1px solid #e2e8f0; border-radius: 10px; background: #ffffff; }";
  modalCss += ".accent-color-preview { width: 18px; height: 18px; border-radius: 4px; border: 1px solid #cbd5e1; flex-shrink: 0; }";
  // Add styling for buttons.
  modalCss += ".swal2-confirm { background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%) !important; border-radius: 12px !important; font-weight: 700 !important; padding: 12px 32px !important; box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3) !important; }";
  modalCss += ".swal2-cancel { background: #f1f5f9 !important; color: #475569 !important; border: 1.5px solid #cbd5e1 !important; border-radius: 12px !important; font-weight: 600 !important; padding: 12px 32px !important; transition: border-color 0.2s ease, background 0.2s ease; }";
  modalCss += ".swal2-cancel:hover, .swal2-cancel:focus-visible { border-color: #94a3b8 !important; background: #e9eef5 !important; }";
  // Actions bar: the "Generate DOCX" button, the "Other Formats" dropdown
  // and the "Cancel" button sit next to each other, centered in one row.
  modalCss += ".swal2-actions { display: flex !important; align-items: center !important; justify-content: center !important; gap: 10px; width: 100% !important; margin: 20px auto 8px !important; padding: 0 6px; }";
  // "Other Formats" split button + upward-opening card menu.
  modalCss += ".export-formats-dropdown { position: relative; display: inline-flex; }";
  modalCss += ".export-formats-toggle { background: #ffffff !important; color: #334155 !important; border: 1.5px solid #e2e8f0 !important; border-radius: 12px !important; padding: 12px 20px !important; font-weight: 600 !important; box-shadow: none !important; display: inline-flex; align-items: center; gap: 8px; transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease; }";
  modalCss += ".export-formats-toggle:hover, .export-formats-toggle:focus-visible { border-color: #a5b4fc !important; background: #eef2ff !important; color: #4338ca !important; }";
  modalCss += ".export-formats-toggle .export-formats-caret { font-size: 0.7rem; transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }";
  modalCss += ".export-formats-dropdown.is-open .export-formats-toggle { border-color: #4f46e5 !important; background: #eef2ff !important; color: #4338ca !important; }";
  modalCss += ".export-formats-dropdown.is-open .export-formats-caret { transform: rotate(180deg); }";
  modalCss += ".export-formats-menu { position: absolute; bottom: calc(100% + 12px); left: 0; min-width: 252px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 14px; box-shadow: 0 24px 48px -12px rgba(15, 23, 42, 0.28); padding: 8px; display: grid; gap: 2px; opacity: 0; visibility: hidden; transform: translateY(10px) scale(0.97); transform-origin: bottom left; transition: opacity 0.22s ease, transform 0.28s cubic-bezier(0.34, 1.3, 0.64, 1), visibility 0.22s; z-index: 60; }";
  modalCss += ".export-formats-dropdown.is-open .export-formats-menu { opacity: 1; visibility: visible; transform: translateY(0) scale(1); }";
  modalCss += ".export-formats-menu-label { font-size: 0.64rem; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; color: #94a3b8; padding: 6px 10px 4px; }";
  modalCss += ".export-format-item { display: flex; align-items: center; gap: 11px; width: 100%; padding: 9px 10px; border: none; background: transparent; border-radius: 10px; font: inherit; font-size: 0.88rem; font-weight: 600; color: #334155; cursor: pointer; text-align: left; transition: background 0.15s ease, color 0.15s ease; }";
  modalCss += ".export-format-item:hover, .export-format-item:focus-visible { background: #f1f5f9; color: #0f172a; outline: none; }";
  modalCss += ".format-chip { width: 30px; height: 30px; border-radius: 9px; display: inline-flex; align-items: center; justify-content: center; color: #ffffff; font-size: 0.8rem; flex-shrink: 0; }";
  modalCss += ".format-ext { margin-left: auto; font-size: 0.62rem; font-weight: 700; letter-spacing: 0.6px; color: #64748b; background: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 6px; padding: 2px 7px; }";
  modalCss += "@media (max-width: 768px) { .swal2-actions { flex-wrap: wrap; } }";
  // Customize toggle (lives in the live-preview header).
  modalCss += ".export-customize-toggle { margin-left: 10px; border: 1px solid rgba(255, 255, 255, 0.55); background: rgba(255, 255, 255, 0.14); color: #ffffff; font: inherit; font-size: 0.78rem; font-weight: 600; padding: 6px 14px; border-radius: 999px; cursor: pointer; display: inline-flex; align-items: center; gap: 7px; white-space: nowrap; transition: background 0.2s ease, border-color 0.2s ease; }";
  modalCss += ".export-customize-toggle:hover, .export-customize-toggle:focus-visible { background: rgba(255, 255, 255, 0.3); border-color: #ffffff; outline: none; }";
  modalCss += ".export-customize-toggle .export-customize-caret { font-size: 0.65rem; transition: transform 0.3s ease; }";
  modalCss += ".export-customize-toggle[aria-expanded=\"true\"] .export-customize-caret { transform: rotate(180deg); }";
  modalCss += "</style>";
  // Initialize the modal HTML.
  let modalHtml = "<div style=\"text-align: left; font-size: 0.9rem;\">";
  // Create the export tabs navigation.
  modalHtml += "<div class=\"export-tabs\">";
  modalHtml += " <a class=\"export-tab-link\" href=\"#\" data-target=\"pane-guide\">Guide</a> ";
  modalHtml += " <a class=\"export-tab-link active\" href=\"#\" data-target=\"pane-layout\">Layout & Theme</a> ";
  modalHtml += " <a class=\"export-tab-link\" href=\"#\" data-target=\"pane-content\">Content & Format</a> ";
  modalHtml += " <a class=\"export-tab-link\" href=\"#\" data-target=\"pane-advanced\">Advanced & ATS</a> ";
  modalHtml += " <a class=\"export-tab-link\" href=\"#\" data-target=\"pane-executive\">Executive Polish</a> ";
  modalHtml += " <a class=\"export-tab-link\" href=\"#\" data-target=\"pane-sections\">Sections</a> ";
  modalHtml += "</div>";
  // Build the Guide pane.
  modalHtml += " <div id=\"pane-guide\" class=\"export-tab-pane\"> ";
  modalHtml += " <h6 class=\"fw-bold text-primary border-bottom pb-1 mb-3\">Comprehensive Export Guide</h6> ";
  modalHtml += " <div class=\"guide-content\" style=\"max-height: 450px; overflow-y: auto; padding-right: 10px;\"> ";
  modalHtml += " <p style=\"font-size: 0.85rem;\">This guide details every option available. Hover over any label or input to see a native browser tooltip with a detailed description.</p> ";
  // Section 1: Layout & Theme
  modalHtml += " <h6 class=\"fw-bold mt-3 text-primary border-bottom pb-1 mb-2\">1. Layout & Theme</h6> ";
  modalHtml += " <ul style=\"font-size: 0.8rem; padding-left: 20px; line-height: 1.6; margin-bottom: 15px;\"> ";
  modalHtml += " <li><strong>Font Family:</strong> Selects the primary typeface (e.g., Calibri, Arial). Calibri is the gold standard for ATS parsing.</li> ";
  modalHtml += " <li><strong>Font Size:</strong> Adjusts the base text size for the entire document (e.g., 11pt, 12pt).</li> ";
  modalHtml += " <li><strong>Accent Color:</strong> Sets the theme color for headings, links, and accents (e.g., #000000, Navy Blue). Black is safest for strict ATS.</li> ";
  modalHtml += " <li><strong>Paper Size:</strong> Defines the physical page dimensions (e.g., US Letter, A4).</li> ";
  modalHtml += " <li><strong>Page Margins:</strong> Controls the white space around the page edges (e.g., 0.75in, 1in).</li> ";
  modalHtml += " <li><strong>Heading Scale:</strong> Controls the visual scale and prominence of section headings (e.g., Compact, Standard).</li> ";
  modalHtml += " <li><strong>Paragraph Spacing:</strong> Controls spacing between paragraphs and list items (e.g., Standard, Comfortable).</li> ";
  modalHtml += " <li><strong>Ultra-Tight Layout:</strong> Reduces line spacing and margins to fit more content onto fewer pages (e.g., reduces margins to fit more content).</li> ";
  modalHtml += " <li><strong>Justify Text Alignment:</strong> Aligns text to both left and right margins for a formal look (e.g., aligns text to both margins).</li> ";
  modalHtml += " <li><strong>High Contrast Accessibility:</strong> Forces black text and maximizes readability for visual impairments (e.g., forces black text).</li> ";
  modalHtml += " <li><strong>Remove Visual Shadows:</strong> Strips shadows and visual effects for cleaner print output (e.g., removes box-shadows).</li> ";
  modalHtml += " </ul> ";
  // Section 2: Content & Format
  modalHtml += " <h6 class=\"fw-bold mt-3 text-primary border-bottom pb-1 mb-2\">2. Content & Format</h6> ";
  modalHtml += " <ul style=\"font-size: 0.8rem; padding-left: 20px; line-height: 1.6; margin-bottom: 15px;\"> ";
  modalHtml += " <li><strong>Include Profile Photo:</strong> Retains the headshot. Photos are often discouraged in North American ATS (e.g., removes headshot for US jobs).</li> ";
  modalHtml += " <li><strong>Show Hyperlink URLs:</strong> Appends the raw URL in brackets next to clickable text (e.g., GitHub [https://github.com]).</li> ";
  modalHtml += " <li><strong>Smart URL Beautifier:</strong> Strips https:// and www. from link text for a cleaner appearance (e.g., github.com).</li> ";
  modalHtml += " <li><strong>Grayscale / Ink-Saver Mode:</strong> Forces black and white output and removes background colors (e.g., saves printer ink).</li> ";
  modalHtml += " <li><strong>Exclude Non-English Text:</strong> Strips Arabic and other non-Latin characters that may cause parsing issues (e.g., removes Arabic text).</li> ";
  modalHtml += " <li><strong>Normalize Whitespace:</strong> Removes extra spaces and non-breaking spaces for cleaner output (e.g., fixes double spaces).</li> ";
  modalHtml += " <li><strong>Uppercase Section Headings:</strong> Transforms section titles to ALL CAPS for emphasis (e.g., EXPERIENCE).</li> ";
  modalHtml += " <li><strong>Section Heading Borders:</strong> Adds a solid underline beneath section headers (e.g., adds a line under EDUCATION).</li> ";
  modalHtml += " <li><strong>Force Page Breaks:</strong> Ensures every major section starts on a new page (e.g., starts Education on a new page).</li> ";
  modalHtml += " <li><strong>Standard Closing & Timestamp:</strong> Adds references note and generation date to the footer (e.g., References available upon request. Edited on Oct 24, 2023).</li> ";
  modalHtml += " <li><strong>Hide Stats & Metrics Bars:</strong> Removes visual progress bars and statistical graphics (e.g., hides skill bars).</li> ";
  modalHtml += " <li><strong>ATS Safe Tables:</strong> Uses fixed table behavior for more predictable Word rendering (e.g., prevents table overflow).</li> ";
  modalHtml += " <li><strong>DOI / Citation Links:</strong> Controls how academic DOIs are displayed (e.g., Show as Links, Plain Text, or Hide).</li> ";
  modalHtml += " <li><strong>Date Format:</strong> Standardizes employment and publication dates to a consistent format (e.g., Month YYYY, MM/YYYY).</li> ";
  modalHtml += " <li><strong>Bullet Style:</strong> Changes list markers (e.g., Standard Disc, Professional Dash, or None).</li> ";
  modalHtml += " <li><strong>Publication Limit:</strong> Truncates extensive publication lists (e.g., Last 3 Years, Top 10).</li> ";
  modalHtml += " <li><strong>Document Status Watermark:</strong> Overlays a faint watermark across every page (e.g., DRAFT, CONFIDENTIAL).</li> ";
  modalHtml += " <li><strong>File Name Suffix:</strong> Appends custom text to the downloaded filename (e.g., Academic_2026).</li> ";
  modalHtml += " <li><strong>Target Position (Optional):</strong> Injects a targeted job title below your name (e.g., Senior AI Computer Vision Engineer).</li> ";
  modalHtml += " </ul> ";
  // Section 3: Advanced & ATS
  modalHtml += " <h6 class=\"fw-bold mt-3 text-primary border-bottom pb-1 mb-2\">3. Advanced & ATS</h6> ";
  modalHtml += " <ul style=\"font-size: 0.8rem; padding-left: 20px; line-height: 1.6; margin-bottom: 15px;\"> ";
  modalHtml += " <li><strong>Dynamic Career Snapshot Table:</strong> Inserts a summary table with experience, publications, and patents (e.g., 7+ Years | 50+ Publications).</li> ";
  modalHtml += " <li><strong>Smart Print-Friendly URL Directory:</strong> Compiles all hyperlinks into a clean appendix at the end (e.g., lists all URLs at the bottom).</li> ";
  modalHtml += " <li><strong>Automated Acronym Glossary:</strong> Appends a glossary table for technical acronyms found in the text (e.g., AI: Artificial Intelligence).</li> ";
  modalHtml += " <li><strong>Bold Action Verbs:</strong> Bolds the first word of every bullet point for impact (e.g., **Spearheaded** research...).</li> ";
  modalHtml += " <li><strong>Highlight Hard Skills:</strong> Bolds critical hard skills in the skills section (e.g., **Python**, **PyTorch**).</li> ";
  modalHtml += " <li><strong>Confidentiality Notice:</strong> Appends a formal legal confidentiality notice at the end (e.g., CONFIDENTIALITY NOTICE: This document...).</li> ";
  modalHtml += " <li><strong>Include Live CV QR Code:</strong> Generates a scannable QR code in the footer linking to your live CV (e.g., QR code in footer).</li> ";
  modalHtml += " <li><strong>Inject Clickable Table of Contents:</strong> Creates a table of contents with internal links at the start (e.g., I. Experience, II. Education).</li> ";
  modalHtml += " <li><strong>Highlight Top-Tier Publishers:</strong> Bolds prestigious publishers such as IEEE and Nature (e.g., **IEEE**, **Nature**).</li> ";
  modalHtml += " <li><strong>Academic Impact Metrics Highlight:</strong> Bolds H-Index and citation counts for visibility (e.g., **H-Index: 29**).</li> ";
  modalHtml += " <li><strong>ATS Keyword Injection (Hidden):</strong> Embeds hidden keyword text at the bottom for ATS parsers (e.g., hidden keywords for ATS).</li> ";
  modalHtml += " <li><strong>Exclude Date of Birth (US/CA):</strong> Removes date of birth for anti-discrimination compliance (e.g., removes June 12, 1993).</li> ";
  modalHtml += " <li><strong>Exclude Demographics (Bias Prevention):</strong> Removes religion, military status, and pronouns (e.g., removes Pronouns, Religion).</li> ";
  modalHtml += " <li><strong>Remove Publication DOIs (Save Space):</strong> Strips DOI links from publication lists to save space (e.g., strips DOI links).</li> ";
  modalHtml += " <li><strong>Flatten Snapshot Table (ATS Safe):</strong> Converts the snapshot table into a single line of text (e.g., 7+ Years | 50+ Pubs).</li> ";
  modalHtml += " <li><strong>Exclude External Platform Links:</strong> Strips GitHub and YouTube URLs from the text body (e.g., strips GitHub URLs).</li> ";
  modalHtml += " <li><strong>Exclude Freelance Stats Section:</strong> Hides the Freelance statistics section entirely (e.g., hides freelance stats).</li> ";
  modalHtml += " <li><strong>Highlight Candidate Name in Pubs:</strong> Bolds your name in publication author lists (e.g., **Hossam Magdy Balaha**).</li> ";
  modalHtml += " <li><strong>Compact Education Details:</strong> Removes GPA, credit hours, and thesis titles for brevity (e.g., removes GPA, Credit Hours).</li> ";
  modalHtml += " <li><strong>Exclude Coursework Lists:</strong> Removes seminar and coursework lists to save space (e.g., removes Seminar Course).</li> ";
  modalHtml += " <li><strong>Job Description Matcher (Optional):</strong> Paste a target job description to automatically highlight matching skills and inject keywords into the ATS block.</li> ";
  modalHtml += " </ul> ";
  // Section 4: Executive Polish
  modalHtml += " <h6 class=\"fw-bold mt-3 text-primary border-bottom pb-1 mb-2\">4. Executive Polish</h6> ";
  modalHtml += " <ul style=\"font-size: 0.8rem; padding-left: 20px; line-height: 1.6; margin-bottom: 15px;\"> ";
  modalHtml += " <li><strong>Black & White Links (Ink Saver):</strong> Forces all hyperlinks to print in solid black (e.g., forces links to print in black).</li> ";
  modalHtml += " <li><strong>Orphan & Widow Protection:</strong> Prevents single lines from dangling at page boundaries (e.g., prevents single lines at page top/bottom).</li> ";
  modalHtml += " <li><strong>Replace Present with Current Date:</strong> Replaces 'Present' with the current month and year (e.g., replaces 'Present' with 'October 2023').</li> ";
  modalHtml += " <li><strong>Strip Redundant Link Texts:</strong> Removes generic link texts such as 'Click to Open' (e.g., removes 'Click to Open').</li> ";
  modalHtml += " <li><strong>Roman Numeral Section Numbering:</strong> Prepends Roman numerals to section headings (e.g., I. Experience, II. Education).</li> ";
  modalHtml += " <li><strong>Executive Summary Bullets:</strong> Converts the Professional Summary into bullet points (e.g., converts summary paragraph to bullets).</li> ";
  modalHtml += " <li><strong>Premium Font Kerning & Ligatures:</strong> Enables superior typographic rendering for print (e.g., enables ligatures).</li> ";
  modalHtml += " <li><strong>Exclude More Photos Link:</strong> Removes the 'More Photos' link under the avatar (e.g., removes 'More Photos' link).</li> ";
  modalHtml += " <li><strong>Formalize Date Ranges:</strong> Replaces dashes in date ranges with the word 'to' (e.g., replaces '-' with 'to').</li> ";
  modalHtml += " <li><strong>Remove Empty List Items & Badges:</strong> Removes empty list items and broken badges (e.g., cleans up broken badges).</li> ";
  modalHtml += " <li><strong>Remove Designer Credit:</strong> Removes the designer footer credit for a cleaner look (e.g., removes footer credit).</li> ";
  modalHtml += " <li><strong>Highlight First-Author Pubs:</strong> Highlights publications where you are the first author (e.g., adds [FIRST AUTHOR] badge).</li> ";
  modalHtml += " <li><strong>Years-Only Dates:</strong> Shows only years in dates to reduce age bias (e.g., shows only '2022 - 2023').</li> ";
  modalHtml += " <li><strong>Remove Empty Sections:</strong> Hides section headers with no remaining content (e.g., hides sections with no content).</li> ";
  modalHtml += " <li><strong>Flatten Skills Grid:</strong> Converts the skills grid into a comma-separated paragraph (e.g., Python, PyTorch, Laravel).</li> ";
  modalHtml += " <li><strong>Disable Link Underlines:</strong> Removes underlines from hyperlinks for a cleaner look (e.g., removes underlines).</li> ";
  modalHtml += " <li><strong>Exclude Social Media Links:</strong> Removes social links from the header (e.g., removes LinkedIn, GitHub icons).</li> ";
  modalHtml += " <li><strong>Monochrome Badges:</strong> Forces badges and tags into black and gray outline style (e.g., black and gray outline).</li> ";
  modalHtml += " <li><strong>Exclude Time Notes:</strong> Removes parenthetical notes from dates (e.g., removes '(Scholarship)').</li> ";
  modalHtml += " <li><strong>Consistent List Indent:</strong> Applies a uniform indentation level to all lists (e.g., uniform padding).</li> ";
  modalHtml += " <li><strong>Contact Layout:</strong> Controls how contact information is arranged (e.g., Inline Centered, Stacked Left).</li> ";
  modalHtml += " <li><strong>Document Language:</strong> Sets the HTML language attribute (e.g., en-US, ar-EG).</li> ";
  modalHtml += " <li><strong>Footer Version (Optional):</strong> Adds a version label to the footer (e.g., v2.0).</li> ";
  modalHtml += " <li><strong>Executive Item Dividers:</strong> Adds subtle divider lines between major items (e.g., subtle divider lines).</li> ";
  modalHtml += " <li><strong>Include Name in Footer:</strong> Adds the candidate name to the footer (e.g., Hossam Magdy Balaha).</li> ";
  modalHtml += " <li><strong>Document Control Footer:</strong> Adds generation metadata to the footer (e.g., Document generated on...).</li> ";
  modalHtml += " </ul> ";
  // Section 5: Sections
  modalHtml += " <h6 class=\"fw-bold mt-3 text-primary border-bottom pb-1 mb-2\">5. Sections</h6> ";
  modalHtml += " <ul style=\"font-size: 0.8rem; padding-left: 20px; line-height: 1.6; margin-bottom: 15px;\"> ";
  modalHtml += " <li><strong>Sections to Export:</strong> Allows you to selectively include or exclude any specific section of your CV using the checkboxes.</li> ";
  modalHtml += " </ul> ";
  // Section 6: Real Word Preview
  modalHtml += " <h6 class=\"fw-bold mt-3 text-primary border-bottom pb-1 mb-2\">6. Real Word Preview</h6> ";
  modalHtml += " <p style=\"font-size: 0.85rem;\">The <strong>Preview</strong> button renders the exact processed HTML that will be exported. This provides a pixel-perfect representation of how Microsoft Word will interpret the document, including margins, fonts, and layout.</p> ";
  modalHtml += " </div> ";
  modalHtml += " </div> ";
  // Build the Layout & Theme pane.
  modalHtml += " <div id=\"pane-layout\" class=\"export-tab-pane active\"> ";
  modalHtml += " <h6 class=\"fw-bold text-primary border-bottom pb-1 mb-3\">Typography & Theme</h6> ";
  modalHtml += " <div class=\"row mb-3\"> ";
  modalHtml += " <div class=\"col-md-4\"> <label class=\"form-label fw-bold mb-1\" title=\"Selects the primary typeface. Calibri is the gold standard for ATS parsing.\">Font Family</label> <select id=\"swal-font\" class=\"form-select form-select-sm\">" + BuildSelectOptionsHtml(fontOptions) + "</select> </div> ";
  modalHtml += " <div class=\"col-md-3\"> <label class=\"form-label fw-bold mb-1\" title=\"Adjusts the base text size.\">Font Size</label> <select id=\"swal-size\" class=\"form-select form-select-sm\">" + BuildSelectOptionsHtml(fontSizeOptions) + "</select> </div> ";
  modalHtml += " <div class=\"col-md-5\"> <label class=\"form-label fw-bold mb-1\" title=\"Sets the theme color for headings and links. Black is safest for strict ATS parsers.\">Accent Color</label> <div class=\"accent-color-row\"> <select id=\"swal-color\" class=\"form-select form-select-sm\">" + BuildSelectOptionsHtml(colorOptions) + "</select> <input type=\"color\" id=\"swal-color-picker\" value=\"#000000\" title=\"Pick a custom accent color\"> <span id=\"swal-color-preview\" class=\"accent-color-preview\" style=\"background:#000000;\"></span> </div> </div> ";
  modalHtml += " </div> ";
  modalHtml += " <h6 class=\"fw-bold text-primary border-bottom pb-1 mb-3\">Layout & Spacing</h6> ";
  modalHtml += " <div class=\"row mb-3\"> ";
  modalHtml += " <div class=\"col-md-3\"> <label class=\"form-label fw-bold mb-1\" title=\"Defines the physical page dimensions.\">Paper Size</label> <select id=\"swal-paper\" class=\"form-select form-select-sm\">" + BuildSelectOptionsHtml(paperOptions) + "</select> </div> ";
  modalHtml += " <div class=\"col-md-3\"> <label class=\"form-label fw-bold mb-1\" title=\"Controls the white space around the page edges.\">Page Margins</label> <select id=\"swal-margin\" class=\"form-select form-select-sm\">" + BuildSelectOptionsHtml(marginOptions) + "</select> </div> ";
  modalHtml += " <div class=\"col-md-3\"> <label class=\"form-label fw-bold mb-1\" title=\"Controls the visual scale of section headings.\">Heading Scale</label> <select id=\"swal-heading-scale\" class=\"form-select form-select-sm\">" + BuildSelectOptionsHtml(headingScaleOptions) + "</select> </div> ";
  modalHtml += " <div class=\"col-md-3\"> <label class=\"form-label fw-bold mb-1\" title=\"Controls spacing between paragraphs and items.\">Paragraph Spacing</label> <select id=\"swal-paragraph-spacing\" class=\"form-select form-select-sm\">" + BuildSelectOptionsHtml(paragraphSpacingOptions) + "</select> </div> ";
  modalHtml += " </div> ";
  modalHtml += " <div class=\"row mb-3\"> ";
  modalHtml += " <div class=\"col-md-6\"> ";
  modalHtml += BuildModalCheckbox("swal-tight", "Ultra-Tight Layout", "Reduces line spacing and paragraph margins to fit more content onto fewer pages.", false);
  modalHtml += BuildModalCheckbox("swal-justify", "Justify Text Alignment", "Aligns text to both left and right margins for a formal look.", true);
  modalHtml += " </div> ";
  modalHtml += " <div class=\"col-md-6\"> ";
  modalHtml += BuildModalCheckbox("swal-high-contrast", "High Contrast Accessibility", "Forces black text and maximizes readability.", false);
  modalHtml += BuildModalCheckbox("swal-remove-shadows", "Remove Visual Shadows", "Strips shadows and visual effects for cleaner print output.", true);
  modalHtml += " </div> ";
  modalHtml += " </div> ";
  modalHtml += " </div> ";
  // Build the Content & Format pane.
  modalHtml += " <div id=\"pane-content\" class=\"export-tab-pane\"> ";
  modalHtml += " <h6 class=\"fw-bold text-primary border-bottom pb-1 mb-3\">Content & Elements</h6> ";
  modalHtml += " <div class=\"row mb-3\"> ";
  modalHtml += " <div class=\"col-md-6\"> ";
  modalHtml += BuildModalCheckbox("swal-photo", "Include Profile Photo", "Retains the headshot. Photos are often discouraged in North American ATS submissions.", false);
  modalHtml += BuildModalCheckbox("swal-urls", "Show Hyperlink URLs", "Appends the raw URL in brackets next to clickable text.", false);
  modalHtml += BuildModalCheckbox("swal-smart-urls", "Smart URL Beautifier", "Strips https:// and www. from link text for a cleaner appearance.", true);
  modalHtml += BuildModalCheckbox("swal-grayscale", "Grayscale / Ink-Saver Mode", "Forces black and white output and removes background colors.", false);
  modalHtml += BuildModalCheckbox("swal-no-arabic", "Exclude Non-English Text", "Strips Arabic and other non-Latin characters that may cause parsing issues.", false);
  modalHtml += BuildModalCheckbox("swal-altmetric", "Include Altmetric Badges", "Embeds Altmetric donut badges next to publications with a DOI. Off by default — many papers have no Altmetric score.", false);
  modalHtml += BuildModalCheckbox("swal-clean-whitespace", "Normalize Whitespace", "Removes extra spaces and non-breaking spaces for cleaner output.", true);
  modalHtml += " </div> ";
  modalHtml += " <div class=\"col-md-6\"> ";
  modalHtml += BuildModalCheckbox("swal-uppercase", "Uppercase Section Headings", "Transforms section titles to ALL CAPS.", true);
  modalHtml += BuildModalCheckbox("swal-borders", "Section Heading Borders", "Adds a solid underline beneath section headers.", true);
  modalHtml += BuildModalCheckbox("swal-pagebreaks", "Force Page Breaks", "Ensures every major section starts on a new page.", false);
  modalHtml += BuildModalCheckbox("swal-closing", "Standard Closing & Timestamp", "Adds references note and generation date.", true);
  modalHtml += BuildModalCheckbox("swal-hide-stats", "Hide Stats & Metrics Bars", "Removes visual progress bars and statistical graphics.", true);
  modalHtml += BuildModalCheckbox("swal-stable-tables", "ATS Safe Tables", "Uses fixed table behavior for more predictable Word rendering.", true);
  modalHtml += " </div> ";
  modalHtml += " </div> ";
  modalHtml += " <h6 class=\"fw-bold text-primary border-bottom pb-1 mb-3\">Formatting & Export</h6> ";
  modalHtml += " <div class=\"row mb-3\"> ";
  modalHtml += " <div class=\"col-md-3\"> <label class=\"form-label fw-bold mb-1\" title=\"Controls how academic DOIs are displayed.\">DOI / Citation Links</label> <select id=\"swal-doi\" class=\"form-select form-select-sm\">" + BuildSelectOptionsHtml(doiOptions) + "</select> </div> ";
  modalHtml += " <div class=\"col-md-3\"> <label class=\"form-label fw-bold mb-1\" title=\"Standardizes employment and publication dates.\">Date Format</label> <select id=\"swal-date\" class=\"form-select form-select-sm\">" + BuildSelectOptionsHtml(dateFormatOptions) + "</select> </div> ";
  modalHtml += " <div class=\"col-md-3\"> <label class=\"form-label fw-bold mb-1\" title=\"Changes list markers.\">Bullet Style</label> <select id=\"swal-bullet\" class=\"form-select form-select-sm\">" + BuildSelectOptionsHtml(bulletOptions) + "</select> </div> ";
  modalHtml += " <div class=\"col-md-3\"> <label class=\"form-label fw-bold mb-1\" title=\"Truncates extensive publication lists.\">Publication Limit</label> <select id=\"swal-pub-limit\" class=\"form-select form-select-sm\">" + BuildSelectOptionsHtml(pubLimitOptions) + "</select> </div> ";
  modalHtml += " </div> ";
  modalHtml += " <div class=\"row mb-3\"> ";
  modalHtml += " <div class=\"col-md-4\"> <label class=\"form-label fw-bold mb-1\" title=\"Overlays a faint watermark across every page.\">Document Status Watermark</label> <select id=\"swal-watermark\" class=\"form-select form-select-sm\">" + BuildSelectOptionsHtml(watermarkOptions) + "</select> </div> ";
  modalHtml += " <div class=\"col-md-8\"> <label class=\"form-label fw-bold mb-1\" title=\"Appends custom text to the downloaded filename.\">File Name Suffix</label> <input type=\"text\" id=\"swal-filename\" class=\"form-control form-control-sm\" placeholder=\"e.g., Academic_2026\"> </div> ";
  modalHtml += " </div> ";
  modalHtml += " <div class=\"row mb-3\"> ";
  modalHtml += " <div class=\"col-md-12\"> <label class=\"form-label fw-bold mb-1\" title=\"Injects a targeted job title below your name.\">Target Position (Optional)</label> <input type=\"text\" id=\"swal-target\" class=\"form-control form-control-sm\" placeholder=\"e.g., Senior AI Computer Vision Engineer\"> </div> ";
  modalHtml += " </div> ";
  modalHtml += " </div> ";
  // Build the Advanced & ATS pane.
  modalHtml += " <div id=\"pane-advanced\" class=\"export-tab-pane\"> ";
  modalHtml += " <h6 class=\"fw-bold text-primary border-bottom pb-1 mb-3\">Advanced Document Features</h6> ";
  modalHtml += " <div class=\"row mb-3\"> ";
  modalHtml += " <div class=\"col-md-6\"> ";
  modalHtml += BuildModalCheckbox("swal-career-snapshot", "Dynamic Career Snapshot Table", "Inserts a summary table with experience, publications, and patents.", false);
  modalHtml += BuildModalCheckbox("swal-url-directory", "Smart Print-Friendly URL Directory", "Compiles all hyperlinks into a clean appendix at the end.", true);
  modalHtml += BuildModalCheckbox("swal-acronym-glossary", "Automated Acronym Glossary", "Appends a glossary table for technical acronyms.", false);
  modalHtml += BuildModalCheckbox("swal-bold-actions", "Bold Action Verbs", "Bolds the first word of every bullet point.", true);
  modalHtml += BuildModalCheckbox("swal-highlight-skills", "Highlight Hard Skills", "Bolds critical hard skills in the skills section.", true);
  modalHtml += BuildModalCheckbox("swal-confidentiality-notice", "Confidentiality Notice", "Appends a formal legal confidentiality notice.", false);
  modalHtml += BuildModalCheckbox("swal-qr", "Include Live CV QR Code", "Generates a scannable QR code in the footer.", false);
  modalHtml += BuildModalCheckbox("swal-toc", "Inject Clickable Table of Contents", "Creates a table of contents with internal links.", false);
  modalHtml += BuildModalCheckbox("swal-highlight-top-tier", "Highlight Top-Tier Publishers", "Bolds prestigious publishers such as IEEE and Nature.", true);
  modalHtml += BuildModalCheckbox("swal-highlight-metrics", "Academic Impact Metrics Highlight", "Bolds H-Index and citation counts.", true);
  modalHtml += " </div> ";
  modalHtml += " <div class=\"col-md-6\"> ";
  modalHtml += BuildModalCheckbox("swal-ats-inject", "ATS Keyword Injection (Hidden)", "Embeds hidden keyword text at the bottom.", false);
  modalHtml += BuildModalCheckbox("swal-exclude-dob", "Exclude Date of Birth (US/CA)", "Removes date of birth for anti-discrimination compliance.", true);
  modalHtml += BuildModalCheckbox("swal-exclude-demographics", "Exclude Demographics (Bias Prevention)", "Removes religion, military status, and pronouns.", true);
  modalHtml += BuildModalCheckbox("swal-remove-dois", "Remove Publication DOIs (Save Space)", "Strips DOI links from publication lists.", false);
  modalHtml += BuildModalCheckbox("swal-flatten-snapshot", "Flatten Snapshot Table (ATS Safe)", "Converts the snapshot table into a single line of text.", true);
  modalHtml += BuildModalCheckbox("swal-exclude-external", "Exclude External Platform Links", "Strips GitHub and YouTube URLs from the text body.", false);
  modalHtml += BuildModalCheckbox("swal-exclude-freelance", "Exclude Freelance Stats Section", "Hides the Freelance statistics section.", false);
  modalHtml += BuildModalCheckbox("swal-highlight-name", "Highlight Candidate Name in Pubs", "Bolds your name in publication author lists.", true);
  modalHtml += BuildModalCheckbox("swal-compact-edu", "Compact Education Details", "Removes GPA, credit hours, and thesis titles.", false);
  modalHtml += BuildModalCheckbox("swal-exclude-coursework", "Exclude Coursework Lists", "Removes seminar and coursework lists.", false);
  modalHtml += " </div> ";
  modalHtml += " </div> ";
  // Add Job Description Matcher to Advanced pane.
  modalHtml += " <div class=\"row mb-3 mt-4\"> ";
  modalHtml += " <div class=\"col-md-12\"> ";
  modalHtml += " <label class=\"form-label fw-bold mb-1\" title=\"Paste a job description to auto-highlight matching skills and inject keywords.\">Job Description Matcher (Optional)</label> ";
  modalHtml += " <textarea id=\"swal-job-desc\" class=\"form-control form-control-sm\" rows=\"4\" placeholder=\"Paste target job description here...\"></textarea> ";
  modalHtml += " </div> ";
  modalHtml += " </div> ";
  modalHtml += " </div> ";
  // Build the Executive Polish pane.
  modalHtml += " <div id=\"pane-executive\" class=\"export-tab-pane\"> ";
  modalHtml += " <h6 class=\"fw-bold text-primary border-bottom pb-1 mb-3\">Pro Typography & Structure</h6> ";
  modalHtml += " <div class=\"row mb-3\"> ";
  modalHtml += " <div class=\"col-md-6\"> ";
  modalHtml += BuildModalCheckbox("swal-bw-links", "Black & White Links (Ink Saver)", "Forces all hyperlinks to print in solid black.", true);
  modalHtml += BuildModalCheckbox("swal-orphan-control", "Orphan & Widow Protection", "Prevents single lines from dangling at page boundaries.", true);
  modalHtml += BuildModalCheckbox("swal-replace-present", "Replace Present with Current Date", "Replaces Present with the current month and year.", false);
  modalHtml += BuildModalCheckbox("swal-strip-redundant", "Strip Redundant Link Texts", "Removes generic link texts such as Click to Open.", true);
  modalHtml += BuildModalCheckbox("swal-section-numbers", "Roman Numeral Section Numbering", "Prepends Roman numerals to section headings.", false);
  modalHtml += BuildModalCheckbox("swal-summary-bullets", "Executive Summary Bullets", "Converts the Professional Summary into bullet points.", false);
  modalHtml += BuildModalCheckbox("swal-font-kerning", "Premium Font Kerning & Ligatures", "Enables superior typographic rendering.", true);
  modalHtml += BuildModalCheckbox("swal-hide-more-photos", "Exclude More Photos Link", "Removes the More Photos link under the avatar.", true);
  modalHtml += BuildModalCheckbox("swal-formal-ranges", "Formalize Date Ranges", "Replaces dashes in date ranges with the word to.", true);
  modalHtml += BuildModalCheckbox("swal-clean-empty", "Remove Empty List Items & Badges", "Removes empty list items and broken badges.", true);
  modalHtml += " </div> ";
  modalHtml += " <div class=\"col-md-6\"> ";
  modalHtml += BuildModalCheckbox("swal-remove-designer", "Remove Designer Credit", "Removes the designer footer credit.", true);
  modalHtml += BuildModalCheckbox("swal-highlight-first-author", "Highlight First-Author Pubs", "Highlights publications where you are first author.", true);
  modalHtml += BuildModalCheckbox("swal-years-only", "Years-Only Dates", "Shows only years in dates to reduce age bias.", false);
  modalHtml += BuildModalCheckbox("swal-remove-empty", "Remove Empty Sections", "Hides section headers with no remaining content.", true);
  modalHtml += BuildModalCheckbox("swal-flatten-skills", "Flatten Skills Grid", "Converts the skills grid into a comma-separated paragraph.", true);
  modalHtml += BuildModalCheckbox("swal-no-underlines", "Disable Link Underlines", "Removes underlines from hyperlinks.", false);
  modalHtml += BuildModalCheckbox("swal-exclude-socials", "Exclude Social Media Links", "Removes social links from the header.", false);
  modalHtml += BuildModalCheckbox("swal-mono-badges", "Monochrome Badges", "Forces badges and tags into black and gray outline style.", true);
  modalHtml += BuildModalCheckbox("swal-exclude-time-notes", "Exclude Time Notes", "Removes parenthetical notes from dates.", true);
  modalHtml += BuildModalCheckbox("swal-consistent-indent", "Consistent List Indent", "Applies a uniform indentation level to all lists.", true);
  modalHtml += " </div> ";
  modalHtml += " </div> ";
  modalHtml += " <h6 class=\"fw-bold text-primary border-bottom pb-1 mb-3\">Executive Document Controls</h6> ";
  modalHtml += " <div class=\"row mb-3\"> ";
  modalHtml += " <div class=\"col-md-3\"> <label class=\"form-label fw-bold mb-1\" title=\"Controls how contact information is arranged.\">Contact Layout</label> <select id=\"swal-contact-layout\" class=\"form-select form-select-sm\">" + BuildSelectOptionsHtml(contactLayoutOptions) + "</select> </div> ";
  modalHtml += " <div class=\"col-md-3\"> <label class=\"form-label fw-bold mb-1\" title=\"Sets the HTML language attribute.\">Document Language</label> <select id=\"swal-document-language\" class=\"form-select form-select-sm\">" + BuildSelectOptionsHtml(documentLanguageOptions) + "</select> </div> ";
  modalHtml += " <div class=\"col-md-3\"> <label class=\"form-label fw-bold mb-1\" title=\"Adds a version label to the footer.\">Footer Version (Optional)</label> <input type=\"text\" id=\"swal-footer-version\" class=\"form-control form-control-sm\" placeholder=\"e.g., v2.0\"> </div> ";
  modalHtml += " <div class=\"col-md-3\"> ";
  modalHtml += BuildModalCheckbox("swal-item-dividers", "Executive Item Dividers", "Adds subtle divider lines between major items.", false);
  modalHtml += BuildModalCheckbox("swal-name-footer", "Include Name in Footer", "Adds the candidate name to the footer.", false);
  modalHtml += BuildModalCheckbox("swal-document-control", "Document Control Footer", "Adds generation metadata to the footer.", false);
  modalHtml += " </div> ";
  modalHtml += " </div> ";
  modalHtml += " </div> ";
  // Build the Sections pane.
  modalHtml += " <div id=\"pane-sections\" class=\"export-tab-pane\"> ";
  modalHtml += " <h6 class=\"fw-bold text-primary border-bottom pb-1 mb-3\">Sections to Export</h6> ";
  modalHtml += " <div class=\"mb-3\"> <button type=\"button\" class=\"btn btn-sm btn-outline-primary me-2\" id=\"swal-select-all\">Select All</button> <button type=\"button\" class=\"btn btn-sm btn-outline-secondary\" id=\"swal-deselect-all\">Deselect All</button> </div> ";
  modalHtml += " <div class=\"section-checkboxes-grid\">" + sectionCheckboxesHtml + "</div> ";
  modalHtml += " </div> ";
  modalHtml += "</div>";
  // Return the combined CSS and HTML.
  // Two-panel layout: left = export settings, right = live preview.
  // The live preview iframe updates in real-time as the user changes any option.
  let previewPanelHtml = '';
  previewPanelHtml += '<div class="export-preview-panel">';
  previewPanelHtml += '  <div class="export-preview-header">';
  previewPanelHtml += '    <i class="fas fa-eye"></i> Live Preview';
  previewPanelHtml += '    <span class="preview-status" id="live-preview-status">Ready</span>';
  previewPanelHtml += '    <button type="button" class="export-customize-toggle" id="export-customize-toggle" aria-expanded="false" aria-controls="export-config-panel" title="Show or hide the export settings"><i aria-hidden="true" class="fas fa-sliders"></i>Customize<i aria-hidden="true" class="fas fa-chevron-down export-customize-caret"></i></button>';
  previewPanelHtml += '  </div>';
  previewPanelHtml += '  <div class="export-preview-placeholder" id="live-preview-placeholder">';
  previewPanelHtml += '    <i class="fas fa-file-word" style="font-size: 2.5rem; opacity: 0.3;"></i>';
  previewPanelHtml += '    <div>Preview will appear here automatically as you change options.</div>';
  previewPanelHtml += '    <div style="font-size: 0.75rem; opacity: 0.7;">Updates are debounced (400ms).</div>';
  previewPanelHtml += '  </div>';
  // Loader overlay — shown while the preview is generating, hidden when done.
  previewPanelHtml += '  <div class="export-preview-loader" id="live-preview-loader" style="display: none;">';
  previewPanelHtml += '    <div class="preview-spinner"></div>';
  previewPanelHtml += '    <div class="preview-loader-text">Generating preview…</div>';
  previewPanelHtml += '  </div>';
  previewPanelHtml += '  <iframe class="export-preview-iframe" id="live-preview-iframe" style="display: none;" title="Live document preview"></iframe>';
  previewPanelHtml += '</div>';
  const twoPanelHtml = '<div class="export-two-panel"><div class="export-config-panel" id="export-config-panel">' + modalHtml + '</div>' + previewPanelHtml + '</div>';
  return modalCss + twoPanelHtml;
}

// Define a helper function to collect all options from the modal.
function GetModalOptions() {
  // Get the selected font.
  const font = GetSwalValue("swal-font");
  // Get the selected font size.
  const size = GetSwalValue("swal-size");
  // Get the selected accent color.
  let color = GetSwalValue("swal-color-picker");
  // Fallback to the select dropdown if the picker is empty.
  if (!color) {
    color = GetSwalValue("swal-color");
  }
  // Get the selected paper size.
  const paper = GetSwalValue("swal-paper");
  // Get the selected page margin.
  const margin = GetSwalValue("swal-margin");
  // Get the selected heading scale.
  const headingScale = GetSwalValue("swal-heading-scale");
  // Get the selected paragraph spacing.
  const paragraphSpacing = GetSwalValue("swal-paragraph-spacing");
  // Get the state of the tight layout checkbox.
  const isTight = GetSwalChecked("swal-tight");
  // Get the state of the include photo checkbox.
  const includePhoto = GetSwalChecked("swal-photo");
  // Get the state of the show URLs checkbox.
  const showUrls = GetSwalChecked("swal-urls");
  // Get the state of the smart URLs checkbox.
  const smartUrls = GetSwalChecked("swal-smart-urls");
  // Get the state of the uppercase headings checkbox.
  const uppercaseHeadings = GetSwalChecked("swal-uppercase");
  // Get the state of the heading borders checkbox.
  const headingBorders = GetSwalChecked("swal-borders");
  // Get the state of the grayscale checkbox.
  const grayscale = GetSwalChecked("swal-grayscale");
  // Get the state of the no Arabic checkbox.
  const noArabic = GetSwalChecked("swal-no-arabic");
  const includeAltmetric = GetSwalChecked("swal-altmetric");
  // Get the state of the page breaks checkbox.
  const pagebreaks = GetSwalChecked("swal-pagebreaks");
  // Get the state of the QR code checkbox.
  const qrCode = GetSwalChecked("swal-qr");
  // Get the state of the closing checkbox.
  const closing = GetSwalChecked("swal-closing");
  // Get the selected DOI style.
  const doiStyle = GetSwalValue("swal-doi");
  // Get the selected date format.
  const dateFormat = GetSwalValue("swal-date");
  // Get the selected bullet style.
  const bulletStyle = GetSwalValue("swal-bullet");
  // Get the selected publication limit.
  const pubLimit = GetSwalValue("swal-pub-limit");
  // Get the selected watermark.
  const watermark = GetSwalValue("swal-watermark");
  // Get the target position.
  const targetPosition = GetSwalValue("swal-target");
  // Get the filename suffix.
  const filenameSuffix = GetSwalValue("swal-filename");
  // Get the state of the justify text checkbox.
  const justifyText = GetSwalChecked("swal-justify");
  // Get the state of the hide stats checkbox.
  const hideStats = GetSwalChecked("swal-hide-stats");
  // Get the state of the TOC checkbox.
  const toc = GetSwalChecked("swal-toc");
  // Get the state of the highlight top tier checkbox.
  const highlightTopTier = GetSwalChecked("swal-highlight-top-tier");
  // Get the state of the highlight metrics checkbox.
  const highlightMetrics = GetSwalChecked("swal-highlight-metrics");
  // Get the state of the ATS inject checkbox.
  const atsInject = GetSwalChecked("swal-ats-inject");
  // Get the state of the career snapshot checkbox.
  const careerSnapshot = GetSwalChecked("swal-career-snapshot");
  // Get the state of the URL directory checkbox.
  const urlDirectory = GetSwalChecked("swal-url-directory");
  // Get the state of the acronym glossary checkbox.
  const acronymGlossary = GetSwalChecked("swal-acronym-glossary");
  // Get the state of the bold actions checkbox.
  const boldActions = GetSwalChecked("swal-bold-actions");
  // Get the state of the highlight skills checkbox.
  const highlightSkills = GetSwalChecked("swal-highlight-skills");
  // Get the state of the confidentiality notice checkbox.
  const confidentialityNotice = GetSwalChecked("swal-confidentiality-notice");
  // Get the state of the exclude DOB checkbox.
  const excludeDateOfBirth = GetSwalChecked("swal-exclude-dob");
  // Get the state of the exclude demographics checkbox.
  const excludeDemographics = GetSwalChecked("swal-exclude-demographics");
  // Get the state of the remove DOIs checkbox.
  const removePublicationDois = GetSwalChecked("swal-remove-dois");
  // Get the state of the flatten snapshot checkbox.
  const flattenSnapshotTable = GetSwalChecked("swal-flatten-snapshot");
  // Get the state of the exclude external links checkbox.
  const excludeExternalLinks = GetSwalChecked("swal-exclude-external");
  // Get the state of the exclude freelance checkbox.
  const excludeFreelanceSection = GetSwalChecked("swal-exclude-freelance");
  // Get the state of the highlight name checkbox.
  const highlightCandidateName = GetSwalChecked("swal-highlight-name");
  // Get the state of the compact education checkbox.
  const compactEducationDetails = GetSwalChecked("swal-compact-edu");
  // Get the state of the exclude coursework checkbox.
  const excludeCourseworkLists = GetSwalChecked("swal-exclude-coursework");
  // Get the state of the BW links checkbox.
  const bwLinks = GetSwalChecked("swal-bw-links");
  // Get the state of the orphan control checkbox.
  const orphanControl = GetSwalChecked("swal-orphan-control");
  // Get the state of the replace present checkbox.
  const replacePresent = GetSwalChecked("swal-replace-present");
  // Get the state of the strip redundant checkbox.
  const stripRedundant = GetSwalChecked("swal-strip-redundant");
  // Get the state of the section numbers checkbox.
  const sectionNumbers = GetSwalChecked("swal-section-numbers");
  // Get the state of the summary bullets checkbox.
  const summaryBullets = GetSwalChecked("swal-summary-bullets");
  // Get the state of the font kerning checkbox.
  const fontKerning = GetSwalChecked("swal-font-kerning");
  // Get the state of the hide more photos checkbox.
  const hideMorePhotos = GetSwalChecked("swal-hide-more-photos");
  // Get the state of the formal ranges checkbox.
  const formalRanges = GetSwalChecked("swal-formal-ranges");
  // Get the state of the clean empty checkbox.
  const cleanEmpty = GetSwalChecked("swal-clean-empty");
  // Get the state of the remove designer checkbox.
  const removeDesigner = GetSwalChecked("swal-remove-designer");
  // Get the state of the highlight first author checkbox.
  const highlightFirstAuthor = GetSwalChecked("swal-highlight-first-author");
  // Get the state of the years only checkbox.
  const yearsOnly = GetSwalChecked("swal-years-only");
  // Get the state of the remove empty checkbox.
  const removeEmpty = GetSwalChecked("swal-remove-empty");
  // Get the state of the flatten skills checkbox.
  const flattenSkills = GetSwalChecked("swal-flatten-skills");
  // Get the state of the no underlines checkbox.
  const noUnderlines = GetSwalChecked("swal-no-underlines");
  // Get the state of the exclude socials checkbox.
  const excludeSocials = GetSwalChecked("swal-exclude-socials");
  // Get the state of the mono badges checkbox.
  const monoBadges = GetSwalChecked("swal-mono-badges");
  // Get the state of the exclude time notes checkbox.
  const excludeTimeNotes = GetSwalChecked("swal-exclude-time-notes");
  // Get the prepared for value.
  const preparedFor = GetSwalValue("swal-prepared-for");
  // Get the selected contact layout.
  const contactLayout = GetSwalValue("swal-contact-layout");
  // Get the selected document language.
  const documentLanguage = GetSwalValue("swal-document-language");
  // Get the footer version.
  const footerVersion = GetSwalValue("swal-footer-version");
  // Get the state of the name footer checkbox.
  const nameFooter = GetSwalChecked("swal-name-footer");
  // Get the state of the document control checkbox.
  const documentControl = GetSwalChecked("swal-document-control");
  // Get the state of the high contrast checkbox.
  const highContrast = GetSwalChecked("swal-high-contrast");
  // Get the state of the remove shadows checkbox.
  const removeShadows = GetSwalChecked("swal-remove-shadows");
  // Get the state of the stable tables checkbox.
  const stableTables = GetSwalChecked("swal-stable-tables");
  // Get the state of the consistent indent checkbox.
  const consistentIndent = GetSwalChecked("swal-consistent-indent");
  // Get the state of the item dividers checkbox.
  const itemDividers = GetSwalChecked("swal-item-dividers");
  // Get the state of the clean whitespace checkbox.
  const cleanWhitespace = GetSwalChecked("swal-clean-whitespace");
  // Get the job description text.
  const jobDesc = GetSwalValue("swal-job-desc");
  // Get the selected sections.
  const selectedSections = Array.from(document.querySelectorAll(".section-checkbox:checked")).map(function (checkbox) {
    return checkbox.value;
  });
  // Return the collected options object.
  return {
    "Font": font,
    "Size": size,
    "Color": color,
    "Paper": paper,
    "Margin": margin,
    "HeadingScale": headingScale,
    "ParagraphSpacing": paragraphSpacing,
    "IsTight": isTight,
    "IncludePhoto": includePhoto,
    "ShowUrls": showUrls,
    "SmartUrls": smartUrls,
    "UppercaseHeadings": uppercaseHeadings,
    "HeadingBorders": headingBorders,
    "Grayscale": grayscale,
    "NoArabic": noArabic,
    "IncludeAltmetric": includeAltmetric,
    "Pagebreaks": pagebreaks,
    "QrCode": qrCode,
    "Closing": closing,
    "DoiStyle": doiStyle,
    "DateFormat": dateFormat,
    "BulletStyle": bulletStyle,
    "PubLimit": pubLimit,
    "Watermark": watermark,
    "TargetPosition": targetPosition,
    "FilenameSuffix": filenameSuffix,
    "SelectedSections": selectedSections,
    "JustifyText": justifyText,
    "HideStats": hideStats,
    "Toc": toc,
    "HighlightTopTier": highlightTopTier,
    "HighlightMetrics": highlightMetrics,
    "AtsInject": atsInject,
    "CareerSnapshot": careerSnapshot,
    "UrlDirectory": urlDirectory,
    "AcronymGlossary": acronymGlossary,
    "BoldActions": boldActions,
    "HighlightSkills": highlightSkills,
    "ConfidentialityNotice": confidentialityNotice,
    "ExcludeDateOfBirth": excludeDateOfBirth,
    "ExcludeDemographics": excludeDemographics,
    "RemovePublicationDois": removePublicationDois,
    "FlattenSnapshotTable": flattenSnapshotTable,
    "ExcludeExternalLinks": excludeExternalLinks,
    "ExcludeFreelanceSection": excludeFreelanceSection,
    "HighlightCandidateName": highlightCandidateName,
    "CompactEducationDetails": compactEducationDetails,
    "ExcludeCourseworkLists": excludeCourseworkLists,
    "BwLinks": bwLinks,
    "OrphanControl": orphanControl,
    "ReplacePresent": replacePresent,
    "StripRedundant": stripRedundant,
    "SectionNumbers": sectionNumbers,
    "SummaryBullets": summaryBullets,
    "FontKerning": fontKerning,
    "HideMorePhotos": hideMorePhotos,
    "FormalRanges": formalRanges,
    "CleanEmpty": cleanEmpty,
    "RemoveDesigner": removeDesigner,
    "HighlightFirstAuthor": highlightFirstAuthor,
    "YearsOnly": yearsOnly,
    "RemoveEmpty": removeEmpty,
    "FlattenSkills": flattenSkills,
    "NoUnderlines": noUnderlines,
    "ExcludeSocials": excludeSocials,
    "MonoBadges": monoBadges,
    "ExcludeTimeNotes": excludeTimeNotes,
    "PreparedFor": preparedFor,
    "ContactLayout": contactLayout,
    "DocumentLanguage": documentLanguage,
    "FooterVersion": footerVersion,
    "NameFooter": nameFooter,
    "DocumentControl": documentControl,
    "HighContrast": highContrast,
    "RemoveShadows": removeShadows,
    "StableTables": stableTables,
    "ConsistentIndent": consistentIndent,
    "ItemDividers": itemDividers,
    "CleanWhitespace": cleanWhitespace,
    "JobDesc": jobDesc
  };
}

async function ProcessResumeElement(clonedElement, options) {
  // Altmetric badges: remove unless explicitly opted in.
  if (!options || !options.IncludeAltmetric) {
    clonedElement.querySelectorAll(".altmetric-embed").forEach(function (el) {
      el.remove();
    });
  }
  // Revert web-only tables back to original lists for Preview/DOCX export
  clonedElement.querySelectorAll(".web-only-pub-table").forEach(el => el.remove());
  clonedElement.querySelectorAll(".export-only-list").forEach(el => {
    el.style.display = "block";
  });
  // Fix Peer Review Activities and other custom lists (journal-list,
  // repo-list, volunteer-list, course-list): Word/LibreOffice can't
  // render CSS flexbox, grid, or custom class-based styling. Convert
  // each custom list into a SIMPLE HTML list where each item shows as a
  // plain text line with a link, matching the design of the Published
  // Journal Articles timeline (which renders cleanly in Word).
  clonedElement.querySelectorAll("ul.journal-list, ul.repo-list, ul.volunteer-list, ul.course-list").forEach(function (ul) {
    // Extract text from each <li> and rebuild as a simple list.
    const items = ul.querySelectorAll("li");
    let simpleHTML = "";
    items.forEach(function (li) {
      // Get the main name text — use the .journal-name element but
      // EXCLUDE the publisher badge text to avoid duplication.
      const nameEl = li.querySelector(".journal-name, .repo-title, .resume-position-title, .volunteer-title, .role-title, .course-title");
      let name = "";
      if (nameEl) {
        // Clone the element, remove the badge, then get text.
        const clone = nameEl.cloneNode(true);
        const badgeInName = clone.querySelector(".journal-publisher, .repo-badge, .volunteer-badge, .role-badge, .course-badge");
        if (badgeInName) badgeInName.remove();
        name = clone.textContent.trim();
      } else {
        name = li.textContent.trim().split("\n")[0].trim();
      }
      // Get any publisher/organization badge text.
      const badgeEl = li.querySelector(".journal-publisher, .repo-badge, .volunteer-badge, .role-badge, .course-badge");
      const badge = badgeEl ? " (" + badgeEl.textContent.trim() + ")" : "";
      // Get the link.
      const linkEl = li.querySelector("a.journal-link, a.repo-link, a.volunteer-link, a.course-link, a[href]");
      let linkText = "";
      if (linkEl) {
        const href = linkEl.getAttribute("href") || "";
        const text = linkEl.textContent.trim();
        if (href && (href.startsWith("http") || href.startsWith("assets/"))) {
          linkText = ' &mdash; <a href="' + href + '" style="color:#0d6efd;text-decoration:underline;">' + text + '</a>';
        }
      }
      // Build a simple list item line: "Name (Publisher) — Link"
      simpleHTML += '<li style="margin-bottom:6pt;font-size:10pt;color:#374151;">' + name + badge + linkText + "</li>";
    });
    // Replace the custom list with a simple <ul>.
    const simpleUL = document.createElement("ul");
    simpleUL.setAttribute("style", "padding-left:20pt;margin:0 0 10pt 0;font-size:10pt;");
    simpleUL.innerHTML = simpleHTML;
    ul.parentNode.replaceChild(simpleUL, ul);
  });
  // Also flatten role-card / volunteer-card / course-card layouts into
  // simple text blocks for Word export.
  clonedElement.querySelectorAll(".role-card, .volunteer-card, .course-card, .repo-item:not(li)").forEach(function (card) {
    // Get title, org, meta, description.
    const title = card.querySelector(".role-title, .volunteer-title, .course-title, .repo-title") || card.querySelector("h4, h3");
    const org = card.querySelector(".role-org, .volunteer-org, .course-org");
    const meta = card.querySelectorAll(".role-badge, .volunteer-badge, .repo-badge, .course-badge");
    const desc = card.querySelector("p");
    let simpleText = "";
    if (title) simpleText += "<strong style='font-size:11pt;color:#1a202c;'>" + title.textContent.trim() + "</strong>";
    if (org) simpleText += " &mdash; <em style='color:#024950;'>" + org.textContent.trim() + "</em>";
    if (meta.length > 0) {
      simpleText += "<br/><span style='font-size:9pt;color:#64748b;'>";
      const metaTexts = [];
      meta.forEach(function (m) {
        metaTexts.push(m.textContent.trim());
      });
      simpleText += metaTexts.join(" | ");
      simpleText += "</span>";
    }
    if (desc) simpleText += "<br/><span style='font-size:9pt;color:#4b5563;'>" + desc.textContent.trim() + "</span>";
    if (simpleText) {
      const div = document.createElement("div");
      div.setAttribute("style", "margin-bottom:10pt;padding-bottom:8pt;border-bottom:1pt solid #e5e7eb;");
      div.innerHTML = simpleText;
      card.parentNode.replaceChild(div, card);
    }
  });
  // Also flatten the peer-review-grid (two-column flex layout) into a
  // simple vertical stack for Word.
  clonedElement.querySelectorAll(".peer-review-grid").forEach(function (grid) {
    grid.setAttribute("style", "display:block;");
    // Remove the grid-template-columns inline style if present.
    grid.removeAttribute("style");
    grid.setAttribute("style", "display:block;");
  });
  // Flatten the editor/reviewer column wrappers.
  clonedElement.querySelectorAll(".peer-review-grid > .editor, .peer-review-grid > .reviewer").forEach(function (col) {
    col.setAttribute("style", "display:block;width:100%;margin-bottom:15pt;");
  });
  // Featured Publications: convert the web carousel into a Word-friendly
  // TABLE that matches the design of the other publication tables (Title,
  // Venue, Year, Citations, DOI). The cards are already rendered in the
  // DOM by SetupFeaturedPubs() before the clone — we extract their data
  // and rebuild the carousel container as a simple table so Word renders
  // it cleanly without gradients, transforms, or CSS variables.
  const featuredCarousel = clonedElement.querySelector("#featured-pubs-carousel");
  if (featuredCarousel) {
    let cards = featuredCarousel.querySelectorAll(".featured-pub-card");
    // Also check for older carousel item selectors.
    if (cards.length === 0) {
      cards = featuredCarousel.querySelectorAll(".owl-item, .carousel-item, .featured-item");
    }
    // Extract data from each card.
    const rows = [];
    cards.forEach(function (card, idx) {
      const rank = idx + 1;
      const titleEl = card.querySelector(".featured-pub-title");
      const venueEl = card.querySelector(".featured-pub-venue");
      const citeEl = card.querySelector(".featured-pub-citations");
      const doiLink = card.querySelector(".featured-pub-meta a[href*='doi.org']");
      const yearEl = card.querySelector(".featured-pub-meta span:not(.featured-pub-citations)");
      const title = titleEl ? titleEl.textContent.trim() : "";
      const venue = venueEl ? venueEl.textContent.trim() : "";
      // Citations: extract the number from "X citations" text.
      let citations = "0";
      if (citeEl) {
        const m = citeEl.textContent.match(/(\d+)\s*citations?/i);
        if (m) citations = m[1];
      }
      const year = yearEl ? yearEl.textContent.trim() : "";
      const doiHref = doiLink ? doiLink.getAttribute("href") : "";
      rows.push({rank: rank, title: title, venue: venue, year: year, citations: citations, doiHref: doiHref});
    });
    // Build a list (matching other publication sections) instead of a styled table.
    // Each featured pub becomes an <article> with title, venue, year, citations, DOI —
    // exactly like the Published Journal Articles section.
    if (rows.length > 0) {
      let listHtml = '';
      rows.forEach(function (r) {
        const rankBadge = r.rank <= 3 ? ' <strong style="color:' + (r.rank === 1 ? '#c9a227' : r.rank === 2 ? '#8a8a8a' : '#a47148') + ';">(#' + r.rank + ')</strong>' : '';
        listHtml +=
          '<article style="margin-bottom:10pt;padding-bottom:8pt;border-bottom:1pt solid #e5e7eb;">' +
          '<div style="font-weight:bold;font-size:11pt;color:#1a202c;margin-bottom:2pt;">' + r.title + rankBadge + '</div>' +
          '<div style="font-size:10pt;color:#4b5563;margin-bottom:1pt;">' +
          '<em style="color:#024950;">' + r.venue + '</em>' +
          ' &mdash; ' + r.year +
          ' &mdash; <strong style="color:#0d6efd;">' + r.citations + ' citations</strong>' +
          '</div>' +
          (r.doiHref ? '<div style="font-size:9pt;color:#6b7280;">DOI: <a href="' + r.doiHref + '" style="color:#0d6efd;text-decoration:underline;">' + r.doiHref + '</a></div>' : '') +
          '</article>';
      });
      // Replace the carousel with the list.
      const wrapper = document.createElement("div");
      wrapper.setAttribute("style", "width:100%;margin-top:8pt;");
      wrapper.innerHTML = listHtml;
      featuredCarousel.parentNode.replaceChild(wrapper, featuredCarousel);
    }
  }
  // Iterate over the section mapping to remove unselected sections.
  for (const [key, data] of Object.entries(SectionMapping)) {
    if (!options.SelectedSections.includes(key)) {
      const sectionElement = clonedElement.querySelector("[id=\"" + data["Id"] + "\"]");
      if (sectionElement) {
        sectionElement.remove();
      }
    }
  }
  // Set the effective accent color.
  let effectiveAccent = options.Color || "#000000";
  if ((options.Grayscale) || (options.HighContrast)) {
    effectiveAccent = "#000000";
  }
  options.Color = effectiveAccent;
  // Check if the prepared for option is set.
  if (options.PreparedFor) {
    const prepP = document.createElement("p");
    prepP.style.textAlign = "center";
    prepP.style.fontWeight = "bold";
    prepP.style.fontSize = "12pt";
    prepP.style.color = options.Color;
    prepP.style.marginBottom = "10pt";
    prepP.textContent = "Prepared for: " + options.PreparedFor;
    // FIX: Dynamically get the current first child to avoid stale references
    const currentFirstChild = clonedElement.firstChild;
    clonedElement.insertBefore(prepP, currentFirstChild);
  }
  // Create a div for the accent bar.
  const accentBar = document.createElement("div");
  accentBar.style.height = "12pt";
  accentBar.style.backgroundColor = options.Color;
  accentBar.style.width = "100%";
  accentBar.style.margin = "0 0 20pt 0";
  // Dynamically get the current first child again
  const currentFirstChild = clonedElement.firstChild;
  clonedElement.insertBefore(accentBar, currentFirstChild);
  // Check if the profile photo should be excluded.
  if (!options.IncludePhoto) {
    // Find the photo element.
    const photoElement = clonedElement.querySelector(".picture.rounded-circle");
    // If the photo element exists, remove its parent row.
    if (photoElement) {
      // Find the closest row parent.
      const photoRow = photoElement.closest(".row");
      // Remove the row if it exists.
      if (photoRow) {
        photoRow.remove();
      }
    }
  } else {
    // Center the profile photo in the Word/preview output.
    const photoElement = clonedElement.querySelector(".picture.rounded-circle");
    if (photoElement) {
      const photoRow = photoElement.closest(".row");
      if (photoRow) {
        photoRow.style.textAlign = "center";
        photoRow.style.display = "block";
        photoRow.style.margin = "0 auto";
      }
      // Also center the photo itself.
      photoElement.style.display = "block";
      photoElement.style.margin = "0 auto";
      // Center the "More Photos" link too.
      const morePhotos = clonedElement.querySelector('a[href="#All-Photos"]');
      if (morePhotos && morePhotos.parentElement) {
        morePhotos.parentElement.style.textAlign = "center";
      }
    }
  }
  // Check if non-English text should be excluded.
  if (options.NoArabic) {
    // Define a regex for Arabic characters.
    const arabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/g;
    // Replace Arabic characters with an empty string.
    clonedElement.innerHTML = clonedElement.innerHTML.replace(arabicRegex, "");
  }
  // Check if stats bars should be hidden.
  if (options.HideStats) {
    // Select all stats bars and course stats.
    const statsBars = clonedElement.querySelectorAll(".stats-bar, .courses-stats");
    // Iterate over each stats bar.
    statsBars.forEach(function (el) {
      // Remove the stats bar.
      el.remove();
    });
  }
  // Check if the publication limit is not set to all.
  if (options.PubLimit !== "all") {
    // Select the published papers and conferences sections.
    const pubSections = clonedElement.querySelectorAll("#Published-Papers, #Published-Conferences");
    // Get the current year.
    const currentYear = new Date().getFullYear();
    // Iterate over each publication section.
    pubSections.forEach(function (sec) {
      // Select all timeline items in the section.
      const items = sec.querySelectorAll(".resume-timeline-item");
      // Initialize the kept count.
      let keptCount = 0;
      // Iterate over each item.
      items.forEach(function (item) {
        // Find the time element.
        const timeEl = item.querySelector(".resume-position-time");
        // Get the text content of the time element.
        const timeText = timeEl ? timeEl.textContent : "";
        // Extract the year from the text.
        const yearMatch = timeText.match(/(\d{4})/);
        // Parse the year.
        const year = yearMatch ? parseInt(yearMatch[1]) : 0;
        // Initialize the keep flag.
        let keep = false;
        // Check if the limit is top 10.
        if (options.PubLimit === "10") {
          if (keptCount < 10) {
            keep = true;
          }
        }
        // Check if the limit is last 3 years.
        if (options.PubLimit === "3y") {
          if (year >= (currentYear - 3)) {
            keep = true;
          }
        }
        // Check if the limit is last 5 years.
        if (options.PubLimit === "5y") {
          if (year >= (currentYear - 5)) {
            keep = true;
          }
        }
        // Increment the kept count if the item is kept.
        if (keep) {
          keptCount++;
        } else {
          item.remove();
        }
      });
    });
  }
  // Check if the target position is set.
  if (options.TargetPosition) {
    // Create a paragraph element for the target position.
    const targetP = document.createElement("p");
    // Center align the paragraph.
    targetP.style.textAlign = "center";
    // Set the font weight to bold.
    targetP.style.fontWeight = "bold";
    // Set the font size.
    targetP.style.fontSize = "13pt";
    // Set the text color.
    targetP.style.color = options.Color;
    // Set the top margin.
    targetP.style.marginTop = "10pt";
    // Set the bottom margin.
    targetP.style.marginBottom = "15pt";
    // Set the text content.
    targetP.textContent = "Targeting: " + options.TargetPosition;
    // Find the name heading.
    const h1 = clonedElement.querySelector("h1.name");
    // Insert the paragraph after the name heading if it exists.
    if (h1) {
      h1.parentNode.insertBefore(targetP, h1.nextSibling);
    }
  }
  // Check if the career snapshot table should be included.
  if (options.CareerSnapshot) {
    // Count the number of publications.
    const pubCount = clonedElement.querySelectorAll("#Published-Papers .resume-timeline-item, #Published-Conferences .resume-timeline-item").length;
    // Calculate the years of experience.
    const expYears = new Date().getFullYear() - 2017;
    // Create a table element for the snapshot.
    const snapshotTable = document.createElement("table");
    // Set the width to 100%.
    snapshotTable.style.width = "100%";
    // Set the border.
    snapshotTable.style.border = "1px solid " + options.Color;
    // Set the top margin.
    snapshotTable.style.marginTop = "15pt";
    // Set the bottom margin.
    snapshotTable.style.marginBottom = "15pt";
    // Collapse the borders.
    snapshotTable.style.borderCollapse = "collapse";
    // Create a table row.
    const tr = document.createElement("tr");
    // Define the stats array.
    const stats = [{
      "Label": "Experience",
      "Value": expYears + "+ Years"
    }, {
      "Label": "Publications",
      "Value": pubCount + "+"
    }, {
      "Label": "H-Index",
      "Value": "29"
    }, {
      "Label": "Patents",
      "Value": "1 US"
    }];
    // Iterate over each stat.
    stats.forEach(function (stat) {
      // Create a table cell.
      const td = document.createElement("td");
      // Center align the cell.
      td.style.textAlign = "center";
      // Set the padding.
      td.style.padding = "10pt";
      // Set the right border.
      td.style.borderRight = "1px solid #cccccc";
      // Set the inner HTML.
      td.innerHTML = "<div style=\"font-size:16pt; font-weight:bold; color:" + options.Color + ";\">" + stat["Value"] + "</div><div style=\"font-size:9pt; text-transform:uppercase; color:#666666;\">" + stat["Label"] + "</div>";
      // Append the cell to the row.
      tr.appendChild(td);
    });
    // Append the row to the table.
    snapshotTable.appendChild(tr);
    // Find the resume header.
    const header = clonedElement.querySelector(".resume-header");
    // Append the table to the header if it exists.
    if (header) {
      header.appendChild(snapshotTable);
    }
  }
  // Select all time elements.
  const timeElements = clonedElement.querySelectorAll(".resume-position-time");
  // Iterate over each time element.
  timeElements.forEach(function (el) {
    // Get the text content.
    const text = el.textContent;
    // Skip if the text contains Present.
    if (text.includes("Present")) {
      return;
    }
    // Extract dates from the text.
    const dates = text.match(/([A-Za-z]+ \d{1,2}, \d{4}|[A-Za-z]+ \d{4}|\d{4})/g);
    // Check if at least two dates were found.
    if ((dates) && (dates.length >= 2)) {
      // Parse the start date.
      const startDate = new Date(dates[0]);
      // Parse the end date.
      const endDate = new Date(dates[1]);
      // Check if both dates are valid.
      if ((!isNaN(startDate.getTime())) && (!isNaN(endDate.getTime()))) {
        // Calculate the total months.
        const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());
        // Check if the duration is greater than zero.
        if (months > 0) {
          // Calculate the years.
          const years = Math.floor(months / 12);
          // Calculate the remaining months.
          const remMonths = months % 12;
          // Initialize the duration string.
          let durationStr = "";
          // Append years to the string.
          if (years > 0) {
            durationStr += years + " yr" + (years > 1 ? "s" : "");
          }
          // Append remaining months to the string.
          if (remMonths > 0) {
            durationStr += (durationStr ? " " : "") + remMonths + " mo" + (remMonths > 1 ? "s" : "");
          }
          // Create a span for the duration.
          const durationSpan = document.createElement("span");
          // Set the font style to italic.
          durationSpan.style.fontStyle = "italic";
          // Set the text color.
          durationSpan.style.color = "#666666";
          // Set the font size.
          durationSpan.style.fontSize = "0.9em";
          // Set the text content.
          durationSpan.textContent = " (" + durationStr + ")";
          // Append the span to the time element.
          el.appendChild(durationSpan);
        }
      }
    }
  });
  // Check if Job Description Matcher is used.
  if (options.JobDesc) {
    // Extract words from the job description.
    const words = options.JobDesc.toLowerCase().match(/[a-z]+/g) || [];
    // Define a list of stop words to ignore.
    const stopWords = ["the", "and", "for", "with", "that", "this", "from", "will", "are", "our", "you", "your", "have", "has", "was", "were", "been", "being", "can", "may", "might", "shall", "should", "must", "need", "dare", "ought", "used", "about", "above", "after", "again", "all", "also", "am", "an", "any", "as", "at", "be", "because", "before", "below", "between", "both", "but", "by", "could", "did", "do", "does", "doing", "down", "during", "each", "few", "further", "get", "got", "had", "he", "her", "here", "hers", "herself", "him", "himself", "his", "how", "i", "if", "in", "into", "is", "it", "its", "itself", "just", "let", "like", "ll", "me", "more", "most", "my", "myself", "no", "nor", "not", "now", "of", "off", "on", "once", "only", "or", "other", "out", "over", "own", "re", "s", "same", "she", "so", "some", "such", "t", "than", "their", "them", "themselves", "then", "there", "these", "they", "thing", "those", "through", "to", "too", "under", "until", "up", "ve", "very", "we", "what", "when", "where", "which", "while", "who", "whom", "why", "would", "y", "yet", "you", "your", "yours", "yourself", "yourselves"];
    // Filter and deduplicate keywords.
    const keywords = [...new Set(words.filter(function (w) {
      return w.length > 3 && !stopWords.includes(w);
    }))];
    // Highlight matching skills if enabled.
    if (options.HighlightSkills) {
      // Select all skill tags.
      const skillTags = clonedElement.querySelectorAll(".skill-tag, .skill-pill, .tech-tag");
      // Iterate over each skill tag.
      skillTags.forEach(function (tag) {
        // Get the text content.
        const text = tag.textContent.trim().toLowerCase();
        // Check if any keyword matches.
        if (keywords.some(function (kw) {
          return text.includes(kw);
        })) {
          // Set the font weight to bold.
          tag.style.fontWeight = "bold";
          // Set the text color.
          tag.style.color = options.Color;
          // Set the text decoration to underline.
          tag.style.textDecoration = "underline";
          // Set a highlight background.
          tag.style.backgroundColor = "#fff3cd";
        }
      });
    }
    // Inject keywords into ATS block if enabled.
    if (options.AtsInject) {
      // Find the ATS injection div.
      const atsDiv = clonedElement.querySelector("div[style*='font-size: 1pt']");
      // Append the matched keywords if the div exists.
      if (atsDiv) {
        atsDiv.innerHTML += " | JD Matched Keywords: " + keywords.slice(0, 20).join(", ");
      }
    }
  }
  // Check if action verbs should be bolded.
  if (options.BoldActions) {
    // Select all list items.
    const listItems = clonedElement.querySelectorAll("li");
    // Iterate over each list item.
    listItems.forEach(function (li) {
      // Get the first child node.
      const firstChild = li.firstChild;
      // Check if the first child is a text node.
      if ((firstChild) && (firstChild.nodeType === Node.TEXT_NODE)) {
        // Get the trimmed text content.
        const text = firstChild.textContent.trim();
        // Split the text into words.
        const words = text.split(" ");
        // Check if there are words.
        if (words.length > 0) {
          // Extract the first word.
          const firstWord = words.shift();
          // Create a strong element.
          const boldSpan = document.createElement("strong");
          // Set the text content.
          boldSpan.textContent = firstWord + " ";
          // Replace the text node with the strong element.
          li.replaceChild(boldSpan, firstChild);
          // Check if there are remaining words.
          if (words.length > 0) {
            // Create a text node for the remaining words.
            const remainingText = document.createTextNode(words.join(" "));
            // Insert the remaining text after the strong element.
            li.insertBefore(remainingText, boldSpan.nextSibling);
          }
        }
      }
    });
  }
  // Check if hard skills should be highlighted.
  if (options.HighlightSkills) {
    // Select all skill tags and pills.
    const skillTags = clonedElement.querySelectorAll(".skill-tag, .skill-pill, .tech-tag");
    // Define the hard skills array.
    const hardSkills = ["Python", "PyTorch", "TensorFlow", "Computer Vision", "Deep Learning", "Machine Learning", "Laravel", "React", "SQL", "MATLAB", "OpenCV", "YOLO", "SHAP"];
    // Iterate over each skill tag.
    skillTags.forEach(function (tag) {
      // Get the trimmed text content.
      const text = tag.textContent.trim();
      // Iterate over each hard skill.
      hardSkills.forEach(function (skill) {
        // Check if the tag text includes the hard skill.
        if (text.toLowerCase().includes(skill.toLowerCase())) {
          // Set the font weight to bold.
          tag.style.fontWeight = "bold";
          // Set the text color.
          tag.style.color = options.Color;
          // Set the text decoration to underline.
          tag.style.textDecoration = "underline";
        }
      });
    });
  }
  // Check if the table of contents option is enabled.
  if (options.Toc) {
    // Create a container div for the table of contents.
    const tocDiv = document.createElement("div");
    // Set the bottom margin for the TOC container.
    tocDiv.style.marginBottom = "15pt";
    // Create an h2 element for the TOC title.
    const tocTitle = document.createElement("h2");
    // Center align the TOC title.
    tocTitle.style.textAlign = "center";
    // Apply the accent color to the TOC title.
    tocTitle.style.color = options.Color;
    // Set the bottom margin for the TOC title.
    tocTitle.style.marginBottom = "15pt";
    // Set the text content of the TOC title.
    tocTitle.textContent = "Table of Contents";
    // Append the title to the TOC container.
    tocDiv.appendChild(tocTitle);
    // Create an unordered list for the TOC links.
    const tocList = document.createElement("ul");
    // Remove default list styling.
    tocList.style.listStyleType = "none";
    // Remove default left padding.
    tocList.style.paddingLeft = "0";
    // Select all section headings to build the TOC.
    const headings = clonedElement.querySelectorAll("h2.resume-section-title");
    // Iterate over each heading to create a TOC entry.
    headings.forEach(function (h2, index) {
      // Generate a unique section ID for the bookmark.
      const sectionId = "toc_section" + index;
      // Create an anchor element to act as a bookmark.
      const bookmark = document.createElement("a");
      // Set the name attribute for the bookmark.
      bookmark.name = sectionId;
      // Insert the bookmark at the beginning of the heading.
      h2.insertBefore(bookmark, h2.firstChild);
      // Create a list item for the TOC entry.
      const li = document.createElement("li");
      // Set the bottom margin for the list item.
      li.style.marginBottom = "2pt";
      // Set the line height for the list item.
      li.style.lineHeight = "1.0";
      // Set the font size for the list item.
      li.style.fontSize = "12pt";
      // Create a hyperlink for the TOC entry.
      const link = document.createElement("a");
      // Set the href attribute to the section bookmark.
      link.href = "#" + sectionId;
      // Apply the accent color to the link.
      link.style.color = options.Color;
      // Remove the default underline from the link.
      link.style.textDecoration = "none";
      // Add a dotted bottom border to the link.
      link.style.borderBottom = "1px dotted #cccccc";
      // Set the link text to the heading text.
      link.textContent = h2.textContent.trim();
      // Append the link to the list item.
      li.appendChild(link);
      // Append the list item to the TOC list.
      tocList.appendChild(li);
    });
    // Append the list to the TOC container.
    tocDiv.appendChild(tocList);
    // Create a div to enforce a page break after the TOC.
    const pageBreak = document.createElement("div");
    // Set the CSS property to force a page break.
    pageBreak.style.pageBreakAfter = "always";
    // Append the page break div to the TOC container.
    tocDiv.appendChild(pageBreak);
    // Insert the TOC container at the beginning of the cloned element.
    clonedElement.insertBefore(tocDiv, clonedElement.firstChild);
  }
  // Determine if a footer is needed.
  const needsFooter = (options.Closing) || (options.QrCode) || (options.NameFooter) || (options.DocumentControl) || (options.FooterVersion);
  // Check if a footer is needed.
  if (needsFooter) {
    // Create a div for the footer.
    const footerDiv = document.createElement("div");
    // Center align the footer.
    footerDiv.style.textAlign = "center";
    // Set the top margin.
    footerDiv.style.marginTop = "40pt";
    // Set the top padding.
    footerDiv.style.paddingTop = "15pt";
    // Add a top border.
    footerDiv.style.borderTop = "1pt solid #cccccc";
    // Set the font size.
    footerDiv.style.fontSize = "10pt";
    // Set the text color.
    footerDiv.style.color = "#555555";
    // Get the current date.
    const today = new Date();
    // Format the date string.
    const dateStr = today.toLocaleDateString("en-US", {
      "year": "numeric",
      "month": "long",
      "day": "numeric"
    });
    // Find the name heading.
    const nameHeading = clonedElement.querySelector("h1.name");
    // Get the candidate name or use a default.
    const candidateName = nameHeading ? nameHeading.textContent.trim() : "Hossam Magdy Balaha";
    // Initialize the footer content.
    let footerContent = "";
    // Append the closing text if enabled.
    if (options.Closing) {
      footerContent += "<p style=\"margin:0 0 10pt 0;\"><em>References and full academic portfolio available upon request.</em></p>";
    }
    // Append the name if enabled.
    if (options.NameFooter) {
      footerContent += "<p style=\"margin:0 0 10pt 0;\"><strong>" + candidateName + "</strong></p>";
    }
    // Append the footer version if set.
    if (options.FooterVersion) {
      footerContent += "<p style=\"margin:0 0 10pt 0;\">Version: " + options.FooterVersion + "</p>";
    }
    // Define the CV URL.
    const cvUrl = "https://hossambalaha.github.io/";
    // Append the live CV link.
    footerContent += "<p style=\"margin:0 0 15pt 0;\"><strong>Live CV: </strong> <a href=\"" + cvUrl + "\" style=\"color:#000000; text-decoration:underline;\">" + cvUrl + "</a></p>";
    // Check if the QR code should be included.
    if (options.QrCode) {
      // Encode the CV URL for the QR code API.
      const encodedUrl = encodeURIComponent(cvUrl);
      // Append the QR code image.
      footerContent += "<p style=\"text-align:center; margin: 15pt auto;\"><img src=\"https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + encodedUrl + "\" style=\"width:120px; height:120px; border:1px solid #cccccc;\" alt=\"Live CV QR Code\" /></p>";
    }
    // Append the edited date if closing is enabled.
    if (options.Closing) {
      footerContent += "<p style=\"margin:15pt 0 0 0; font-size:8pt; color:#888888;\">Edited on " + dateStr + "</p>";
    }
    // Append the document control text if enabled.
    if (options.DocumentControl) {
      footerContent += "<p style=\"margin:5pt 0 0 0; font-size:8pt; color:#888888;\">Document generated on " + dateStr + " | Format: DOCX | Source: " + cvUrl + "</p>";
    }
    // Set the inner HTML of the footer div.
    footerDiv.innerHTML = footerContent;
    // Append the footer div to the cloned element.
    clonedElement.appendChild(footerDiv);
  }
  // Check if the confidentiality notice should be included.
  if (options.ConfidentialityNotice) {
    // Create a paragraph for the notice.
    const noticeP = document.createElement("p");
    // Set the font size.
    noticeP.style.fontSize = "8pt";
    // Set the text color.
    noticeP.style.color = "#888888";
    // Center align the text.
    noticeP.style.textAlign = "center";
    // Set the top margin.
    noticeP.style.marginTop = "20pt";
    // Add a top border.
    noticeP.style.borderTop = "1px solid #cccccc";
    // Set the top padding.
    noticeP.style.paddingTop = "10pt";
    // Set the text content.
    noticeP.textContent = "CONFIDENTIALITY NOTICE: This document contains proprietary information intended solely for the designated recipient. Unauthorized distribution, copying, or retention is strictly prohibited.";
    // Append the notice to the cloned element.
    clonedElement.appendChild(noticeP);
  }
  // Check if the date of birth should be excluded.
  if (options.ExcludeDateOfBirth) {
    // Select all text links.
    const dobElements = clonedElement.querySelectorAll("a.text-link");
    // Iterate over each element.
    dobElements.forEach(function (el) {
      // Check if the text includes the date of birth.
      if (el.textContent.includes("June 12, 1993")) {
        // Find the closest parent list item.
        const parentLi = el.closest("li");
        // Remove the list item if it exists.
        if (parentLi) {
          parentLi.remove();
        }
      }
    });
  }
  // Check if demographics should be excluded.
  if (options.ExcludeDemographics) {
    // Select all primary info links.
    const primaryLinks = clonedElement.querySelectorAll(".primary-info a.text-link");
    // Iterate over each link.
    primaryLinks.forEach(function (el) {
      // Check if the text includes demographics.
      if ((el.textContent.includes("Pronouns")) || (el.textContent.includes("Military")) || (el.textContent.includes("Muslim"))) {
        // Find the closest parent list item.
        const parentLi = el.closest("li");
        // Remove the list item if it exists.
        if (parentLi) {
          parentLi.remove();
        }
      }
    });
  }
  // Check if publication DOIs should be removed.
  if (options.RemovePublicationDois) {
    // Select all DOI links in publications.
    const doiLinks = clonedElement.querySelectorAll("#Published-Papers a[href*='doi.org'], #Published-Conferences a[href*='doi.org']");
    // Iterate over each link.
    doiLinks.forEach(function (link) {
      // Find the closest parent list item.
      const parentLi = link.closest("li");
      // Remove the list item if it exists.
      if (parentLi) {
        parentLi.remove();
      }
    });
  }
  // Check if the snapshot table should be flattened.
  if (options.FlattenSnapshotTable) {
    // Find the snapshot table.
    const snapshotTable = clonedElement.querySelector(".resume-header table");
    // Check if the table exists.
    if (snapshotTable) {
      // Extract the text from each cell.
      const cellTexts = Array.from(snapshotTable.querySelectorAll("td")).map(function (td) {
        return td.textContent.trim().replace(/\s+/g, " ");
      });
      // Create a paragraph for the flattened text.
      const flatP = document.createElement("p");
      // Center align the paragraph.
      flatP.style.textAlign = "center";
      // Set the font weight to bold.
      flatP.style.fontWeight = "bold";
      // Set the text content.
      flatP.textContent = cellTexts.join(" | ");
      // Replace the table with the paragraph.
      snapshotTable.replaceWith(flatP);
    }
  }
  // Check if external links should be excluded.
  if (options.ExcludeExternalLinks) {
    // Select all external links.
    const externalLinks = clonedElement.querySelectorAll("a[href*='github.com'], a[href*='youtube.com']");
    // Iterate over each link.
    externalLinks.forEach(function (link) {
      // Remove the link.
      link.remove();
    });
  }
  // Check if the freelance section should be excluded.
  if (options.ExcludeFreelanceSection) {
    // Find the freelance section.
    const freelanceSection = clonedElement.querySelector("#Freelance");
    // Check if the section exists.
    if (freelanceSection) {
      // Find the closest parent row.
      const freelanceRow = freelanceSection.closest(".row");
      // Remove the row if it exists.
      if (freelanceRow) {
        freelanceRow.remove();
      }
    }
  }
  // Check if the candidate name should be highlighted in publications.
  if (options.HighlightCandidateName) {
    // Select all publication descriptions.
    const pubDescs = clonedElement.querySelectorAll("#Published-Papers .resume-timeline-item-desc, #Published-Conferences .resume-timeline-item-desc");
    // Iterate over each description.
    pubDescs.forEach(function (desc) {
      // Get the inner HTML.
      let html = desc.innerHTML;
      // Replace the candidate name with a bolded version.
      html = html.replace(/Hossam Magdy Balaha/g, "<strong style=\"color:" + options.Color + ";\">Hossam Magdy Balaha</strong>");
      // Replace the abbreviated name with a bolded version.
      html = html.replace(/Balaha, H.M./g, "<strong style=\"color:" + options.Color + ";\">Balaha, H.M.</strong>");
      // Update the inner HTML.
      desc.innerHTML = html;
    });
  }
  // Check if education details should be compacted.
  if (options.CompactEducationDetails) {
    // Select all education list items.
    const eduListItems = clonedElement.querySelectorAll("#Education li");
    // Iterate over each list item.
    eduListItems.forEach(function (li) {
      // Get the text content.
      const text = li.textContent;
      // Check if the text includes details to remove.
      if ((text.includes("GPA")) || (text.includes("Credit Hours")) || (text.includes("Percentage Score")) || (text.includes("Research Title")) || (text.includes("Graduation Project"))) {
        // Remove the list item.
        li.remove();
      }
    });
  }
  // Check if coursework lists should be excluded.
  if (options.ExcludeCourseworkLists) {
    // Select all education list items.
    const courseItems = clonedElement.querySelectorAll("#Education li");
    // Iterate over each list item.
    courseItems.forEach(function (li) {
      // Check if the text includes the seminar course.
      if (li.textContent.includes("Completed Seminar Course")) {
        // Remove the list item.
        li.remove();
      }
    });
  }
  // Check if 'Present' should be replaced with the current date.
  if (options.ReplacePresent) {
    // Get the current date string.
    const currentDate = new Date().toLocaleString("en-US", {
      "month": "long",
      "year": "numeric"
    });
    // Select all time elements with datetime='present'.
    const presentEls = clonedElement.querySelectorAll("time[datetime=\"present\"]");
    // Iterate over each element.
    presentEls.forEach(function (el) {
      // Update the text content.
      el.textContent = currentDate;
    });
    // Select all time text elements.
    const timeTextEls = clonedElement.querySelectorAll(".resume-position-time");
    // Iterate over each element.
    timeTextEls.forEach(function (el) {
      // Check if the text includes Present.
      if (el.textContent.includes("Present")) {
        // Replace Present with the current date.
        el.innerHTML = el.innerHTML.replace(/Present/g, currentDate);
      }
    });
  }
  // Check if redundant link texts should be stripped.
  if (options.StripRedundant) {
    // Define the redundant texts.
    const redundantTexts = ["Click to Open", "Open or Download", "More Information (Click to Open)", "More Information", "Read More (Click to Open)"];
    // Select all anchor elements.
    const allAnchors = clonedElement.querySelectorAll("a");
    // Iterate over each anchor.
    allAnchors.forEach(function (a) {
      // Get the trimmed text content.
      const txt = a.textContent.trim();
      // Check if the text is redundant.
      if (redundantTexts.includes(txt)) {
        // Find the icon child.
        const icon = a.querySelector("i");
        // If an icon exists, clear the text and re-append the icon.
        if (icon) {
          a.textContent = "";
          a.appendChild(icon);
        }
      }
    });
  }
  // Check if section numbers should be added.
  if (options.SectionNumbers) {
    // Define the Roman numerals.
    const roman = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX", "XXI", "XXII", "XXIII", "XXIV", "XXV", "XXVI", "XXVII", "XXVIII", "XXIX", "XXX"];
    // Select all section headings.
    const sectionHeadings = clonedElement.querySelectorAll("h2.resume-section-title");
    // Iterate over each heading.
    sectionHeadings.forEach(function (h2, index) {
      // Check if a Roman numeral exists for the index.
      if (roman[index]) {
        // Prepend the Roman numeral to the heading text.
        h2.textContent = roman[index] + ". " + h2.textContent;
      }
    });
  }
  // Check if the summary should be converted to bullets.
  if (options.SummaryBullets) {
    // Find the summary paragraph.
    const summaryP = clonedElement.querySelector("#ProfessionalSummary p");
    // Check if the paragraph exists.
    if (summaryP) {
      // Extract sentences from the paragraph.
      const sentences = summaryP.textContent.match(/[^.!?]+[.!?]+/g) || [summaryP.textContent];
      // Create an unordered list.
      const ul = document.createElement("ul");
      // Set the top margin.
      ul.style.marginTop = "10pt";
      // Iterate over each sentence.
      sentences.forEach(function (sentence) {
        // Create a list item.
        const li = document.createElement("li");
        // Set the text content.
        li.textContent = sentence.trim();
        // Set the bottom margin.
        li.style.marginBottom = "4pt";
        // Append the list item to the list.
        ul.appendChild(li);
      });
      // Replace the paragraph with the list.
      summaryP.replaceWith(ul);
    }
  }
  // Check if the more photos link should be hidden.
  if (options.HideMorePhotos) {
    // Select all more photos links.
    const morePhotosLinks = clonedElement.querySelectorAll("a[href=\"#All-Photos\"]");
    // Iterate over each link.
    morePhotosLinks.forEach(function (a) {
      // Find the closest parent paragraph.
      const p = a.closest("p");
      // Remove the paragraph if it exists, otherwise remove the link.
      if (p) {
        p.remove();
      } else {
        a.remove();
      }
    });
  }
  // Check if date ranges should be formalized.
  if (options.FormalRanges) {
    // Select all time elements.
    const timeEls = clonedElement.querySelectorAll(".resume-position-time");
    // Iterate over each element.
    timeEls.forEach(function (el) {
      // Replace dashes with the word 'to'.
      el.innerHTML = el.innerHTML.replace(/–/g, " to ").replace(/ - /g, " to ");
    });
  }
  // Check if empty list items should be cleaned.
  if (options.CleanEmpty) {
    // Select all list items.
    const listItems = clonedElement.querySelectorAll("li");
    // Iterate over each list item.
    listItems.forEach(function (li) {
      // Check if the text content is empty or too short.
      if ((li.textContent.trim() === "") || (li.textContent.trim().length < 2)) {
        // Remove the list item.
        li.remove();
      }
    });
  }
  // Check if time notes should be excluded.
  if (options.ExcludeTimeNotes) {
    // Select all time notes.
    const timeNotes = clonedElement.querySelectorAll(".time-note");
    // Iterate over each note.
    timeNotes.forEach(function (note) {
      // Remove the note.
      note.remove();
    });
  }
  // Check if social media links should be excluded.
  if (options.ExcludeSocials) {
    // Find the secondary info section.
    const secInfo = clonedElement.querySelector(".secondary-info");
    // Remove the section if it exists.
    if (secInfo) {
      secInfo.remove();
    }
  }
  // Check if the skills grid should be flattened.
  if (options.FlattenSkills) {
    // Find the skills grid.
    const skillsGrid = clonedElement.querySelector(".skills-grid");
    // Check if the grid exists.
    if (skillsGrid) {
      // Select all skill tags.
      const tags = skillsGrid.querySelectorAll(".skill-tag");
      // Initialize the skills array.
      const skills = [];
      // Iterate over each tag.
      tags.forEach(function (tag) {
        // Get the trimmed text.
        const text = tag.innerText.trim();
        // Add the text to the array if it exists.
        if (text) {
          skills.push(text);
        }
      });
      // Replace the grid with a paragraph.
      skillsGrid.innerHTML = "<p style=\"margin:0 0 8pt 0; line-height:1.5;\">" + skills.join(", ") + "</p>";
    }
  }
  // Check if first-author publications should be highlighted.
  if (options.HighlightFirstAuthor) {
    // Select all publications.
    const pubs = clonedElement.querySelectorAll("#Published-Papers .resume-timeline-item, #Published-Conferences .resume-timeline-item");
    // Iterate over each publication.
    pubs.forEach(function (pub) {
      // Find the description element.
      const desc = pub.querySelector(".resume-timeline-item-desc");
      // Check if the description exists.
      if (desc) {
        // Get the text content.
        const text = desc.textContent;
        // Check if the candidate is the first author.
        if ((text.trim().startsWith("Hossam Magdy Balaha")) || (text.trim().startsWith("Balaha, H.M."))) {
          // Find the title element.
          const title = pub.querySelector(".resume-position-title");
          // Append the first author badge if the title exists.
          if (title) {
            title.innerHTML = title.innerHTML + " <span style=\"font-size: 9pt; background: #fbbf24; color: #000000; padding: 2pt 4pt; border-radius: 3pt; font-weight: bold; margin-left: 5pt;\">[FIRST AUTHOR]</span>";
          }
        }
      }
    });
  }
  // Check if only years should be shown in dates.
  if (options.YearsOnly) {
    // Select all time elements.
    const timeEls = clonedElement.querySelectorAll(".resume-position-time, time");
    // Iterate over each element.
    timeEls.forEach(function (el) {
      // Get the inner HTML.
      let text = el.innerHTML;
      // Remove month and day information.
      text = text.replace(/(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+\d{1,2},?\s*/gi, "");
      // Remove season information.
      text = text.replace(/(?:Spring|Summer|Fall|Winter)\s+/gi, "");
      // Update the inner HTML.
      el.innerHTML = text;
    });
  }
  // Check if the designer credit should be removed.
  if (options.RemoveDesigner) {
    // Find the designer footer.
    const designerFooter = clonedElement.querySelector("footer.footer");
    // Remove the footer if it exists.
    if (designerFooter) {
      designerFooter.remove();
    }
  }
  // Check if empty sections should be removed.
  if (options.RemoveEmpty) {
    // Select all resume sections.
    const sections = clonedElement.querySelectorAll(".resume-section");
    // Iterate over each section.
    sections.forEach(function (sec) {
      // Find the content container.
      const content = sec.querySelector(".resume-section-content");
      // Check if the content exists.
      if (content) {
        // Get the trimmed text.
        const text = content.innerText.trim();
        // Select all items in the content.
        const items = content.querySelectorAll(".resume-timeline-item, li, .skill-tag, .course-card, .volunteer-item, .repo-item");
        // Remove the section if it is empty.
        if ((!text && items.length === 0) || (items.length === 0 && text.length < 10)) {
          sec.remove();
        }
      }
    });
  }
  // Check if the date format should be changed.
  if (options.DateFormat !== "original") {
    // Select all date format elements.
    const dateFormatElements = clonedElement.querySelectorAll(".resume-position-time, time");
    // Iterate over each element.
    dateFormatElements.forEach(function (el) {
      // Get the text content.
      const text = el.textContent;
      // Match the date pattern.
      const dateMatch = text.match(/([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{4})/);
      // Check if a match was found.
      if (dateMatch) {
        // Parse the date.
        const d = new Date(dateMatch[1] + " " + dateMatch[2] + ", " + dateMatch[3]);
        // Check if the date is valid.
        if (!isNaN(d.getTime())) {
          // Format the month.
          const mm = String(d.getMonth() + 1).padStart(2, "0");
          // Get the year.
          const yyyy = d.getFullYear();
          // Get the month name.
          const monthName = d.toLocaleString("default", {
            "month": "long"
          });
          // Apply the MM/YYYY format.
          if (options.DateFormat === "mm-yyyy") {
            el.textContent = text.replace(dateMatch[0], mm + "/" + yyyy);
          }
          // Apply the Month YYYY format.
          if (options.DateFormat === "month-year") {
            el.textContent = text.replace(dateMatch[0], monthName + " " + yyyy);
          }
        }
      }
      // Match the month year pattern.
      const monthYearMatch = text.match(/([A-Za-z]+),?\s+(\d{4})/);
      // Check if no full date match and a month year match exists.
      if ((!dateMatch) && monthYearMatch) {
        // Parse the date.
        const d = new Date(monthYearMatch[1] + " 1, " + monthYearMatch[2]);
        // Check if the date is valid.
        if (!isNaN(d.getTime())) {
          // Format the month.
          const mm = String(d.getMonth() + 1).padStart(2, "0");
          // Get the year.
          const yyyy = d.getFullYear();
          // Get the month name.
          const monthName = d.toLocaleString("default", {
            "month": "long"
          });
          // Apply the MM/YYYY format.
          if (options.DateFormat === "mm-yyyy") {
            el.textContent = text.replace(monthYearMatch[0], mm + "/" + yyyy);
          }
          // Apply the Month YYYY format.
          if (options.DateFormat === "month-year") {
            el.textContent = text.replace(monthYearMatch[0], monthName + " " + yyyy);
          }
        }
      }
    });
  }
  // Check if the bullet style should be changed.
  if ((options.BulletStyle === "dash") || (options.BulletStyle === "none")) {
    // Select all lists.
    const lists = clonedElement.querySelectorAll("ul, ol");
    // Iterate over each list.
    lists.forEach(function (list) {
      // Select all list items.
      const items = list.querySelectorAll("li");
      // Create a wrapper div.
      const wrapperDiv = document.createElement("div");
      // Iterate over each item.
      items.forEach(function (li) {
        // Create a paragraph.
        const p = document.createElement("p");
        // Set the margin.
        p.style.margin = "0 0 2pt 10pt";
        // Set the line height.
        p.style.lineHeight = "1.15";
        // Apply the dash style if selected.
        if (options.BulletStyle === "dash") {
          p.innerHTML = "- " + li.innerHTML;
        } else {
          p.innerHTML = li.innerHTML;
        }
        // Append the paragraph to the wrapper.
        wrapperDiv.appendChild(p);
      });
      // Replace the list with the wrapper.
      list.replaceWith(wrapperDiv);
    });
  }
  // Select all journal items.
  const journalItems = clonedElement.querySelectorAll(".journal-item");
  // Iterate over each journal item.
  journalItems.forEach(function (item) {
    // Find the name and link elements.
    const nameEl = item.querySelector(".journal-name");
    const linkEl = item.querySelector(".journal-link");
    // Check if both elements exist.
    if ((nameEl) && (linkEl)) {
      // Get the href attribute.
      const href = linkEl.getAttribute("href");
      // Get the first text node.
      const textNode = nameEl.firstChild;
      // Check if the first child is a text node.
      if ((textNode) && (textNode.nodeType === Node.TEXT_NODE)) {
        // Get the trimmed text.
        const nameText = textNode.textContent.trim();
        // Create a new link element.
        const newLink = document.createElement("a");
        // Set the href attribute.
        newLink.href = href;
        // Set the target to blank.
        newLink.target = "_blank";
        // Set the text content.
        newLink.textContent = nameText;
        // Set the font weight to bold.
        newLink.style.fontWeight = "bold";
        // Set the text color.
        newLink.style.color = options.Color;
        // Replace the text node with the new link.
        nameEl.replaceChild(newLink, textNode);
      }
      // Remove the old link element.
      linkEl.remove();
    }
  });
  // Check if top-tier publishers should be highlighted.
  if (options.HighlightTopTier) {
    // Select all publisher and company name elements.
    const publishers = clonedElement.querySelectorAll(".journal-publisher, .resume-company-name");
    // Define the top-tier publishers.
    const topTier = ["IEEE", "Nature", "Elsevier", "Springer", "MDPI", "Oxford University Press", "Wiley", "Frontiers", "Taylor & Francis", "PeerJ", "SAGE", "IOPScience"];
    // Iterate over each publisher.
    publishers.forEach(function (pub) {
      // Get the text content.
      const text = pub.textContent;
      // Iterate over each top-tier publisher.
      topTier.forEach(function (tier) {
        // Check if the text includes the tier.
        if (text.includes(tier)) {
          // Set the font weight to bold.
          pub.style.fontWeight = "bold";
          // Set the text color.
          pub.style.color = options.Color;
        }
      });
    });
  }
  // Check if academic metrics should be highlighted.
  if (options.HighlightMetrics) {
    // Find the primary info section.
    const primaryInfo = clonedElement.querySelector(".primary-info");
    // Check if the section exists.
    if (primaryInfo) {
      // Get the inner HTML.
      let html = primaryInfo.innerHTML;
      // Bold the H-Index.
      html = html.replace(/(H-Index:\s*\d+)/gi, "<strong style=\"color:" + options.Color + ";\">$1</strong>");
      // Bold the Citations.
      html = html.replace(/(Citations:\s*[\d,]+)/gi, "<strong style=\"color:" + options.Color + ";\">$1</strong>");
      // Update the inner HTML.
      primaryInfo.innerHTML = html;
    }
  }
  // Check if smart URLs should be applied.
  if (options.SmartUrls) {
    // Select all links.
    const allLinks = clonedElement.querySelectorAll("a");
    // Iterate over each link.
    allLinks.forEach(function (a) {
      // Get the trimmed text content.
      let text = a.textContent.trim();
      // Remove http:// prefix.
      if (text.startsWith("http://")) {
        text = text.replace("http://", "");
      }
      // Remove https:// prefix.
      if (text.startsWith("https://")) {
        text = text.replace("https://", "");
      }
      // Remove www. prefix.
      if (text.startsWith("www.")) {
        text = text.replace("www.", "");
      }
      // Update the text content if it contains a dot and no spaces.
      if ((text.includes(".")) && (!text.includes(" "))) {
        a.textContent = text;
      }
    });
  }
  // Check if ATS keywords should be injected.
  if (options.AtsInject) {
    // Create a div for the keywords.
    const atsDiv = document.createElement("div");
    // Set the font size to 1pt.
    atsDiv.style.fontSize = "1pt";
    // Set the text color to white.
    atsDiv.style.color = "#FFFFFF";
    // Set the line height to 1pt.
    atsDiv.style.lineHeight = "1pt";
    // Set the top margin.
    atsDiv.style.marginTop = "50pt";
    // Set the inner HTML with keywords.
    atsDiv.innerHTML = "Keywords: Artificial Intelligence, Machine Learning, Deep Learning, Computer Vision, Medical Image Analysis, Radiomics, Explainable AI, Bioengineering, Python, PyTorch, TensorFlow, Full Stack Development, Laravel, React, IoT, FPGA, Embedded Systems, Cloud Computing, Data Science, XAI, Vision Transformers, YOLO, SHAP, EigenCAM, Digital Histopathology, Oncology, Neurology, Predictive Modeling, Neural Networks, Natural Language Processing, OpenCV, Scikit-Learn, MATLAB, SQL, NoSQL, DevOps, Docker, Git, GitHub, Agile, Scrum, Technical Leadership, Mentorship, Grant Writing, Peer Review, Academic Publishing, NIH, NSF, FDA, HIPAA, Clinical Translation, Multi-modal Fusion, Segmentation, Classification, Optimization, Metaheuristics, Genetic Algorithms, Swarm Intelligence.";
    // Append the div to the cloned element.
    clonedElement.appendChild(atsDiv);
  }
  // Check if the acronym glossary should be included.
  if (options.AcronymGlossary) {
    // Define the glossary entries.
    const glossaryEntries = [{
      "Acronym": "AI",
      "Definition": "Artificial Intelligence"
    }, {
      "Acronym": "ML",
      "Definition": "Machine Learning"
    }, {
      "Acronym": "DL",
      "Definition": "Deep Learning"
    }, {
      "Acronym": "CV",
      "Definition": "Computer Vision"
    }, {
      "Acronym": "XAI",
      "Definition": "Explainable Artificial Intelligence"
    }, {
      "Acronym": "IoT",
      "Definition": "Internet of Things"
    }, {
      "Acronym": "YOLO",
      "Definition": "You Only Look Once (Object Detection)"
    }, {
      "Acronym": "SHAP",
      "Definition": "SHapley Additive exPlanations"
    }, {
      "Acronym": "GAN",
      "Definition": "Generative Adversarial Network"
    }, {
      "Acronym": "CNN",
      "Definition": "Convolutional Neural Network"
    }, {
      "Acronym": "NLP",
      "Definition": "Natural Language Processing"
    }, {
      "Acronym": "OCTA",
      "Definition": "Optical Coherence Tomography Angiography"
    }, {
      "Acronym": "MRI",
      "Definition": "Magnetic Resonance Imaging"
    }, {
      "Acronym": "CAD",
      "Definition": "Computer-Aided Diagnosis"
    }, {
      "Acronym": "GTA",
      "Definition": "Graduate Teaching Assistant"
    }, {
      "Acronym": "SDLC",
      "Definition": "Software Development Life Cycle"
    }, {
      "Acronym": "API",
      "Definition": "Application Programming Interface"
    }, {
      "Acronym": "ORM",
      "Definition": "Object-Relational Mapping"
    }, {
      "Acronym": "UI",
      "Definition": "User Interface"
    }, {
      "Acronym": "SEO",
      "Definition": "Search Engine Optimization"
    }];
    // Get the text content of the cloned element.
    const textContent = clonedElement.textContent;
    // Initialize the found acronyms array.
    const foundAcronyms = [];
    // Iterate over each glossary entry.
    for (const entry of glossaryEntries) {
      // Create a regex for the acronym.
      const regex = new RegExp("\\b" + entry["Acronym"] + "\\b", "g");
      // Check if the acronym is found in the text.
      if (regex.test(textContent)) {
        // Add the entry to the found acronyms array.
        foundAcronyms.push(entry);
      }
    }
    // Check if any acronyms were found.
    if (foundAcronyms.length > 0) {
      // Sort the found acronyms alphabetically.
      foundAcronyms.sort(function (a, b) {
        return a["Acronym"].localeCompare(b["Acronym"]);
      });
      // Create a div for the glossary.
      const glossaryDiv = document.createElement("div");
      // Set the top margin.
      glossaryDiv.style.marginTop = "20pt";
      // Set the font size.
      glossaryDiv.style.fontSize = "9pt";
      // Create a title for the glossary.
      const glossaryTitle = document.createElement("h3");
      // Set the font size.
      glossaryTitle.style.fontSize = "12pt";
      // Set the text color.
      glossaryTitle.style.color = options.Color;
      // Set the text content.
      glossaryTitle.textContent = "Glossary of Acronyms";
      // Append the title to the glossary div.
      glossaryDiv.appendChild(glossaryTitle);
      // Create a table for the glossary.
      const table = document.createElement("table");
      // Set the width to 100%.
      table.style.width = "100%";
      // Collapse the borders.
      table.style.borderCollapse = "collapse";
      // Iterate over each found acronym.
      foundAcronyms.forEach(function (item) {
        // Create a table row.
        const tr = document.createElement("tr");
        // Create a cell for the acronym.
        const td1 = document.createElement("td");
        // Set the font weight to bold.
        td1.style.fontWeight = "bold";
        // Set the padding.
        td1.style.padding = "4pt";
        // Set the bottom border.
        td1.style.borderBottom = "1px solid #eeeeee";
        // Set the width.
        td1.style.width = "15%";
        // Set the text content.
        td1.textContent = item["Acronym"];
        // Create a cell for the definition.
        const td2 = document.createElement("td");
        // Set the padding.
        td2.style.padding = "4pt";
        // Set the bottom border.
        td2.style.borderBottom = "1px solid #eeeeee";
        // Set the text content.
        td2.textContent = item["Definition"];
        // Append the cells to the row.
        tr.appendChild(td1);
        tr.appendChild(td2);
        // Append the row to the table.
        table.appendChild(tr);
      });
      // Append the table to the glossary div.
      glossaryDiv.appendChild(table);
      // Append the glossary div to the cloned element.
      clonedElement.appendChild(glossaryDiv);
    }
  }
  // Check if the URL directory should be included.
  if (options.UrlDirectory) {
    // Select all external links.
    const links = clonedElement.querySelectorAll("a[href^='http']");
    // Check if any links exist.
    if (links.length > 0) {
      // Create a div for the directory.
      const dirDiv = document.createElement("div");
      // Force a page break before the directory.
      dirDiv.style.pageBreakBefore = "always";
      // Set the top margin.
      dirDiv.style.marginTop = "30pt";
      // Set the top border.
      dirDiv.style.borderTop = "2px solid " + options.Color;
      // Set the top padding.
      dirDiv.style.paddingTop = "15pt";
      // Set the font size.
      dirDiv.style.fontSize = "9pt";
      // Left align the text.
      dirDiv.style.textAlign = "left";
      // Create a title for the directory.
      const dirTitle = document.createElement("h3");
      // Set the font size.
      dirTitle.style.fontSize = "12pt";
      // Set the text color.
      dirTitle.style.color = options.Color;
      // Set the text content.
      dirTitle.textContent = "URL Directory (For Printed Copies)";
      // Append the title to the directory div.
      dirDiv.appendChild(dirTitle);
      // Create an unordered list for the URLs.
      const dirList = document.createElement("ul");
      // Remove default margins.
      dirList.style.margin = "0";
      // Set the left padding.
      dirList.style.paddingLeft = "20pt";
      // Create a map to store unique URLs.
      const uniqueUrls = new Map();
      // Iterate over each link.
      links.forEach(function (a) {
        // Get the href attribute.
        const href = a.getAttribute("href");
        // Extract the link label.
        const text = ExtractLinkLabel(a);
        // Add the URL to the map if it is unique and not a mailto link.
        if ((!uniqueUrls.has(href)) && (!href.includes("mailto:")) && (text)) {
          uniqueUrls.set(href, text);
        }
      });
      // Iterate over the unique URLs.
      uniqueUrls.forEach(function (text, href) {
        // Create a list item.
        const li = document.createElement("li");
        // Set the bottom margin.
        li.style.marginBottom = "4pt";
        // Left align the text.
        li.style.textAlign = "left";
        // Set the inner HTML.
        li.innerHTML = "<strong>" + text + ": </strong> <span style=\"color:#555555; word-break:break-all;\">" + href + "</span>";
        // Append the list item to the list.
        dirList.appendChild(li);
      });
      // Append the list to the directory div.
      dirDiv.appendChild(dirList);
      // Append the directory div to the cloned element.
      clonedElement.appendChild(dirDiv);
    }
  }
  // Select sections to remove.
  const sectionsToRemove = clonedElement.querySelectorAll("#Photos, #Posters, #All-Photos, .nav-badge-link");
  // Iterate over each section to remove.
  sectionsToRemove.forEach(function (el) {
    // Remove the element.
    el.remove();
  });
  // Select empty containers.
  const emptyContainers = clonedElement.querySelectorAll(".d-flex.flex-wrap.justify-content-center");
  // Iterate over each empty container.
  emptyContainers.forEach(function (container) {
    // Remove the container if it has no children.
    if (container.children.length === 0) {
      container.remove();
    }
  });
  // Select contact lists.
  const contactLists = clonedElement.querySelectorAll(".primary-info ul.list-unstyled");
  // Iterate over each contact list.
  contactLists.forEach(function (list) {
    // Select all list items.
    const items = list.querySelectorAll("li");
    // Initialize the contact parts array.
    const contactParts = [];
    // Iterate over each item.
    items.forEach(function (li) {
      // Get the trimmed text.
      const text = li.innerText.trim().replace(/\s+/g, " ");
      // Skip pronouns.
      if (text.includes("Pronouns")) {
        return;
      }
      // Check if the text includes an email.
      if (text.includes("@")) {
        // Match the email.
        const emailMatch = text.match(/[\w.-]+@[\w.-]+.\w+/);
        // Add the email to the contact parts.
        if (emailMatch) {
          contactParts.push("Email: <a href=\"mailto:" + emailMatch[0] + "\" style=\"color:#000000; text-decoration:underline;\">" + emailMatch[0] + "</a>");
          return;
        }
      }
      /// Check if the text includes a phone number.
      if (text.match(/\+?(\d{1,3})?[-.\s]?\d{3}[-.\s]?\d{4}/)) {
        // Match the phone number.
        const phoneMatch = text.match(/(\+?(\d{1,3})?[-.\s]?\d{3}[-.\s]?\d{4})/);
        // Add the phone number to the contact parts.
        if (phoneMatch) {
          contactParts.push("Phone: <a href=\"tel:" + phoneMatch[0].replace(/[-.\s]/g, "") + "\" style=\"color:#000000; text-decoration:underline;\">" + phoneMatch[0] + "</a>");
          return;
        }
      }
      // Check if the text includes the date of birth.
      if (text.includes("June 12, 1993")) {
        contactParts.push("Date of Birth: June 12, 1993");
        return;
      }
      // Add the text to the contact parts if it is not empty.
      if (text.length > 0) {
        contactParts.push(text);
      }
    });
    // Check if any contact parts were found.
    if (contactParts.length > 0) {
      // Determine the separator based on the contact layout.
      const contactSeparator = (options.ContactLayout === "stacked") ? ("<br>") : (" | ");
      // Determine the alignment based on the contact layout.
      const contactAlignment = (options.ContactLayout === "stacked") ? ("left") : ("center");
      // Replace the list with a paragraph.
      list.outerHTML = "<p style=\"margin:0 0 8pt 0; line-height:1.5; text-align:" + contactAlignment + ";\">" + contactParts.join(contactSeparator) + "</p>";
    }
  });
  // Find the secondary info section.
  const secondaryInfo = clonedElement.querySelector(".secondary-info");
  // Check if the secondary info exists.
  if (secondaryInfo) {
    // Select all links.
    const links = secondaryInfo.querySelectorAll("a");
    // Initialize the social links array.
    const socialLinks = [];
    // Iterate over each link.
    links.forEach(function (a) {
      // Get the trimmed text.
      const text = a.innerText.trim();
      // Get the href attribute.
      const href = a.getAttribute("href");
      // Add the link to the array if both text and href exist.
      if ((text) && (href)) {
        socialLinks.push("<a href=\"" + href + "\" style=\"color: #000000; text-decoration: underline;\">" + text + "</a>");
      } else if (text) {
        socialLinks.push(text);
      }
    });
    // Check if any social links were found.
    if (socialLinks.length > 0) {
      // Replace the secondary info with a paragraph.
      secondaryInfo.innerHTML = "<p style=\"margin:0 0 8pt 0; line-height:1.5; text-align:center;\"><strong>Profiles: </strong> " + socialLinks.join(" | ") + "</p>";
    }
  }
  // Select all section titles.
  const sectionTitles = clonedElement.querySelectorAll("h2.resume-section-title");
  // Iterate over each section title.
  sectionTitles.forEach(function (h2) {
    // Get the trimmed and uppercased text.
    const text = h2.innerText.trim().toUpperCase();
    // Rename Experience to Work Experience.
    if (text.includes("EXPERIENCE")) {
      h2.innerText = "WORK EXPERIENCE";
    }
    // Rename Sci. Interests to Skills & Expertise.
    if (text.includes("SCI. INTERESTS")) {
      h2.innerText = "SKILLS & EXPERTISE";
    }
  });
  // Select all skills sections.
  const skillsSections = clonedElement.querySelectorAll(".skills-container, .skills-tags");
  // Iterate over each skills section.
  skillsSections.forEach(function (container) {
    // Select all skill pills and tags.
    const tags = container.querySelectorAll(".skill-pill, .skill-tag");
    // Initialize the skills list array.
    const skillsList = [];
    // Iterate over each tag.
    tags.forEach(function (tag) {
      // Get the trimmed text.
      const text = tag.innerText.trim();
      // Add the text to the list if it exists.
      if (text) {
        skillsList.push(text);
      }
    });
    // Check if any skills were found.
    if (skillsList.length > 0) {
      // Replace the container content with a paragraph.
      container.innerHTML = "<p style=\"margin:0 0 8pt 0; line-height:1.5;\">" + skillsList.join(", ") + "</p>";
    }
  });
  // Select all icons.
  const icons = clonedElement.querySelectorAll("i[class*=\"fa\"], i[class*=\"bi\"], svg, .fa-container");
  // Iterate over each icon.
  icons.forEach(function (icon) {
    // Remove the icon.
    icon.remove();
  });
  // Convert images to base64.
  await ConvertImagesToBase64(clonedElement);
  // Select all images.
  const allImages = clonedElement.querySelectorAll("img");
  // Iterate over each image.
  allImages.forEach(function (img) {
    // Check if the parent is a paragraph.
    if (img.parentNode.tagName.toLowerCase() === "p") {
      // Center align the paragraph.
      img.parentNode.style.textAlign = "center";
    } else {
      // Create a wrapper paragraph.
      const wrapper = document.createElement("p");
      // Center align the wrapper.
      wrapper.style.textAlign = "center";
      // Set the margin.
      wrapper.style.margin = "10pt auto";
      // Insert the wrapper before the image.
      img.parentNode.insertBefore(wrapper, img);
      // Append the image to the wrapper.
      wrapper.appendChild(img);
    }
  });
  // Insert comma+space separators after each tech-tag and skill-tag
  // so they don't concatenate in the Word export (Word ignores inline margins).
  clonedElement.querySelectorAll(".tech-tag, .skill-tag, .skill-pill").forEach(function (tag) {
    // Only skip if the next sibling is a text node that starts with a comma.
    // Whitespace-only text nodes (newlines, spaces) do NOT count as separators
    // because Word collapses them.
    const next = tag.nextSibling;
    if (next && next.nodeType === Node.TEXT_NODE && /^,/.test(next.textContent)) return;
    // Insert a comma+space text node after the tag.
    tag.parentNode.insertBefore(document.createTextNode(", "), tag.nextSibling);
  });
  // Check if whitespace should be cleaned.
  if (options.CleanWhitespace) {
    // Replace non-breaking spaces with regular spaces.
    clonedElement.innerHTML = clonedElement.innerHTML.replace(/ /g, " ");
    // Replace multiple spaces with a single space.
    clonedElement.innerHTML = clonedElement.innerHTML.replace(/\s{2,}/g, " ");
    // Remove spaces between tags.
    clonedElement.innerHTML = clonedElement.innerHTML.replace(/>\s+</g, "><");
  }
}

// Define the full width the export modal uses while the Customize settings
// are shown (both panels visible).
const EXPORT_MODAL_FULL_WIDTH = "min(1800px, 96vw)";

// Define a helper to convert a CSS paper-size width ("8.5in", "210mm", ...)
// into CSS pixels (96 px per inch).
function ParsePaperWidthToPixels(widthStr) {
  const match = /^([\d.]+)\s*(in|mm|cm|px|pt)?$/i.exec(String(widthStr || "").trim());
  if (!match) return 0;
  const value = parseFloat(match[1]);
  const unit = (match[2] || "in").toLowerCase();
  const factors = {in: 96, mm: 96 / 25.4, cm: 96 / 2.54, px: 1, pt: 96 / 72};
  return value * (factors[unit] || 96);
}

// Define a helper to get the export popup element safely.
function GetExportPopup() {
  if (typeof Swal !== "undefined" && typeof Swal.getPopup === "function") {
    const popup = Swal.getPopup();
    if (popup) return popup;
  }
  return document.querySelector(".swal2-popup");
}

// Define a helper to measure the horizontal padding/margins between the popup
// edge and the two-panel container, so the fitted width can hug the preview.
function MeasureExportChromeWidth() {
  const popup = GetExportPopup();
  const htmlContainer = popup ? popup.querySelector(".swal2-html-container") : null;
  if (!htmlContainer) return 80;
  const popupStyle = window.getComputedStyle(popup);
  const htmlStyle = window.getComputedStyle(htmlContainer);
  return (parseFloat(popupStyle.paddingLeft) || 0) + (parseFloat(popupStyle.paddingRight) || 0)
    + (parseFloat(popupStyle.borderLeftWidth) || 0) + (parseFloat(popupStyle.borderRightWidth) || 0)
    + (parseFloat(htmlStyle.paddingLeft) || 0) + (parseFloat(htmlStyle.paddingRight) || 0)
    + (parseFloat(htmlStyle.marginLeft) || 0) + (parseFloat(htmlStyle.marginRight) || 0);
}

// Define a helper to measure the natural width of the action buttons row
// ("Generate DOCX", "Other Formats" and "Cancel" next to each other).
function MeasureExportActionsWidth() {
  const actions = document.querySelector(".swal2-actions");
  if (!actions) return 0;
  const actionsStyle = window.getComputedStyle(actions);
  const gap = parseFloat(actionsStyle.columnGap || actionsStyle.gap) || 0;
  let total = (parseFloat(actionsStyle.paddingLeft) || 0) + (parseFloat(actionsStyle.paddingRight) || 0);
  Array.prototype.forEach.call(actions.children, function (child, index) {
    if (index > 0) total += gap;
    const childStyle = window.getComputedStyle(child);
    total += child.getBoundingClientRect().width
      + (parseFloat(childStyle.marginLeft) || 0) + (parseFloat(childStyle.marginRight) || 0);
  });
  return total;
}

// Define a helper that computes the popup width needed to fit the live
// preview page exactly (used while the Customize settings are hidden).
function ComputeExportFitWidth() {
  const previewPanel = document.querySelector(".export-preview-panel");
  if (!previewPanel) return null;
  const iframe = document.getElementById("live-preview-iframe");
  let pageWidthPx = 0;
  // Prefer measuring the rendered page inside the preview iframe.
  try {
    const frameDoc = iframe ? (iframe.contentDocument || (iframe.contentWindow && iframe.contentWindow.document)) : null;
    const page = frameDoc ? frameDoc.querySelector(".WordPage") : null;
    if (page) pageWidthPx = page.getBoundingClientRect().width;
  } catch (err) {
    // The iframe is not measurable yet — fall back to the paper size below.
  }
  // Fallback: derive the page width from the selected paper size.
  if (!pageWidthPx) {
    const paperValue = GetSwalValue("swal-paper") || "8.5in 11.0in";
    pageWidthPx = ParsePaperWidthToPixels(paperValue.split(" ")[0]);
  }
  if (!pageWidthPx) return null;
  const panelStyle = window.getComputedStyle(previewPanel);
  const borderX = (parseFloat(panelStyle.borderLeftWidth) || 0) + (parseFloat(panelStyle.borderRightWidth) || 0);
  // 32px accounts for the iframe body padding (16px on each side of the page).
  let needed = Math.ceil(pageWidthPx + 32 + borderX + MeasureExportChromeWidth());
  // Never get narrower than the centered action buttons row.
  const actionsWidth = MeasureExportActionsWidth();
  if (actionsWidth) {
    needed = Math.max(needed, Math.ceil(actionsWidth + MeasureExportChromeWidth() + 24));
  }
  // Never exceed the viewport.
  return Math.min(needed, Math.round(window.innerWidth * 0.96));
}

// Define a helper that smoothly shrinks/grows the modal so it fits the live
// preview page. Passing true applies the change instantly (used on the initial
// open, before the popup is painted, so no animation is visible).
function ApplyExportFitWidth(instant) {
  const popup = GetExportPopup();
  if (!popup) return;
  const fitWidth = ComputeExportFitWidth();
  if (!fitWidth) return;
  if (instant) popup.style.setProperty("transition", "none", "important");
  popup.style.width = fitWidth + "px";
  if (instant) {
    // Restore the smooth width transition on the next frames.
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        popup.style.removeProperty("transition");
      });
    });
  }
}

// Define a helper that smoothly grows the modal back to its full two-panel
// width (the width it had while the Customize settings were shown).
function ApplyExportFullWidth() {
  const popup = GetExportPopup();
  if (popup) popup.style.width = EXPORT_MODAL_FULL_WIDTH;
}

// Define the asynchronous function to handle the Word download click event.
async function HandleWordDownloadClick(event) {
  // Check if SweetAlert2 is loaded.
  if (typeof Swal === "undefined") {
    CVLog.error("SweetAlert2 library is not loaded.");
    return;
  }
  // Build the modal HTML.
  const modalHtml = BuildConfigurationModalHtml();
  // Show the SweetAlert modal.
  const result = await Swal.fire({
    "title": "Export CV",
    "html": modalHtml,
    "showCancelButton": true,
    "confirmButtonText": "<i class=\"fas fa-file-word\"></i> Generate DOCX",
    "cancelButtonText": "Cancel",
    "focusConfirm": false,
    "width": "min(1800px, 96vw)",
    "willOpen": function () {
      // The Customize settings start hidden, so open the modal already
      // fitted to the live preview page width (no resize flash).
      ApplyExportFitWidth(true);
    },
    "footer": '<div style="font-size: 0.75rem; color: #888888; text-align: center; width: 100%;">This customization is designed by <strong style="color: #333333;">Hossam Magdy Balaha</strong></div>',
    "didOpen": function () {
      // Find the actions container.
      const actionsContainer = document.querySelector(".swal2-actions");
      // Check if the actions container exists.
      if (actionsContainer) {
        // Build the "Other Formats" dropdown and insert it after the confirm
        // button, so "Generate DOCX" stays the first (primary) option and the
        // secondary formats live together in one menu.
        const dropdownWrap = document.createElement("div");
        dropdownWrap.className = "export-formats-dropdown";
        // Create the dropdown toggle button.
        const dropdownBtn = document.createElement("button");
        dropdownBtn.type = "button";
        dropdownBtn.className = "swal2-styled export-formats-toggle";
        dropdownBtn.setAttribute("aria-haspopup", "menu");
        dropdownBtn.setAttribute("aria-expanded", "false");
        dropdownBtn.innerHTML = "<i class=\"fas fa-layer-group\"></i> Other Formats <i class=\"fas fa-chevron-up export-formats-caret\"></i>";
        dropdownWrap.appendChild(dropdownBtn);
        // Create the dropdown menu.
        const dropdownMenu = document.createElement("div");
        dropdownMenu.className = "export-formats-menu";
        dropdownMenu.setAttribute("role", "menu");
        // Small uppercase header inside the menu card.
        const menuLabel = document.createElement("div");
        menuLabel.className = "export-formats-menu-label";
        menuLabel.textContent = "Export as";
        dropdownMenu.appendChild(menuLabel);
        // The secondary export formats offered in the dropdown.
        const formats = [
          {Label: "Markdown", Icon: "fas fa-file-lines", Color: "#024950", Ext: "MD", Action: ExportToMarkdown},
          {Label: "BibTeX", Icon: "fas fa-code", Color: "#d97706", Ext: "BIB", Action: ExportToBibTeX},
          {Label: "JSON Resume", Icon: "fas fa-file-code", Color: "#6d28d9", Ext: "JSON", Action: ExportToJSONResume},
          {Label: "RIS", Icon: "fas fa-file-arrow-down", Color: "#0891b2", Ext: "RIS", Action: ExportToRIS},
          {Label: "CSV", Icon: "fas fa-file-csv", Color: "#16a34a", Ext: "CSV", Action: ExportToCSV}
        ];
        // Iterate over each format and build its menu item.
        formats.forEach(function (format) {
          // Create the menu item button.
          const item = document.createElement("button");
          // Set the button type and role.
          item.type = "button";
          item.className = "export-format-item";
          item.setAttribute("role", "menuitem");
          // Set the item content: a colored icon chip, the format label, and
          // a small file-extension badge on the right.
          item.innerHTML = "<span class=\"format-chip\" style=\"background: " + format.Color + ";\"><i class=\"" + format.Icon + "\" aria-hidden=\"true\"></i></span><span class=\"format-text\">" + format.Label + "</span><span class=\"format-ext\">" + format.Ext + "</span>";
          // Close the modal and run the export when the item is clicked.
          item.addEventListener("click", function () {
            closeDropdown();
            Swal.close();
            format.Action();
          });
          // Append the item to the menu.
          dropdownMenu.appendChild(item);
        });
        // Append the menu to the dropdown wrapper.
        dropdownWrap.appendChild(dropdownMenu);

        // Toggle the dropdown open/closed.
        function closeDropdown() {
          dropdownWrap.classList.remove("is-open");
          dropdownBtn.setAttribute("aria-expanded", "false");
        }

        dropdownBtn.addEventListener("click", function (clickEvent) {
          clickEvent.stopPropagation();
          const willOpen = !dropdownWrap.classList.contains("is-open");
          closeDropdown();
          if (willOpen) {
            dropdownWrap.classList.add("is-open");
            dropdownBtn.setAttribute("aria-expanded", "true");
          }
        });
        // Close the dropdown when clicking anywhere outside of it.
        document.addEventListener("click", function (clickEvent) {
          if (!dropdownWrap.contains(clickEvent.target)) {
            closeDropdown();
          }
        });
        // Close the dropdown (instead of the whole modal) on Escape.
        document.addEventListener("keydown", function (keyEvent) {
          if (keyEvent.key === "Escape" && dropdownWrap.classList.contains("is-open")) {
            keyEvent.stopPropagation();
            closeDropdown();
          }
        }, true);
        // Insert the dropdown after the confirm button.
        const confirmButton = actionsContainer.querySelector(".swal2-confirm");
        if (confirmButton) {
          confirmButton.after(dropdownWrap);
        } else {
          actionsContainer.appendChild(dropdownWrap);
        }
      }
      // Wire the Customize toggle: the settings panel starts hidden so only
      // the live preview is visible; clicking Customize slides the settings
      // in/out and the modal width follows smoothly — fitted to the preview
      // page while hidden, full two-panel width while shown.
      const twoPanel = document.querySelector(".export-two-panel");
      const customizeBtn = document.querySelector(".export-customize-toggle");
      if (twoPanel && customizeBtn) {
        customizeBtn.addEventListener("click", function () {
          const isOpen = twoPanel.classList.toggle("show-settings");
          customizeBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
          // Toggle off -> shrink to fit the live preview; toggle on ->
          // smoothly grow back to the full width the modal had before.
          if (isOpen) {
            ApplyExportFullWidth();
          } else {
            ApplyExportFitWidth(false);
          }
        });
      }
      // Select all tab links.
      const tabLinks = document.querySelectorAll(".export-tab-link");
      // Iterate over each tab link.
      tabLinks.forEach(function (link) {
        // Add a click event listener to each tab link.
        link.addEventListener("click", function (clickEvent) {
          // Prevent the default action.
          clickEvent.preventDefault();
          // Remove the active class from all tab links.
          document.querySelectorAll(".export-tab-link").forEach(function (tabLink) {
            tabLink.classList.remove("active");
          });
          // Remove the active class from all tab panes.
          document.querySelectorAll(".export-tab-pane").forEach(function (pane) {
            pane.classList.remove("active");
          });
          // Add the active class to the clicked tab link.
          link.classList.add("active");
          // Get the target ID from the data attribute.
          const targetId = link.getAttribute("data-target");
          // Add the active class to the target pane.
          document.getElementById(targetId).classList.add("active");
        });
      });
      // Add a click event listener to the select all button.
      document.getElementById("swal-select-all").addEventListener("click", function () {
        document.querySelectorAll(".section-checkbox").forEach(function (checkbox) {
          checkbox.checked = true;
        });
      });
      // Add a click event listener to the deselect all button.
      document.getElementById("swal-deselect-all").addEventListener("click", function () {
        document.querySelectorAll(".section-checkbox").forEach(function (checkbox) {
          checkbox.checked = false;
        });
      });
      // Find the accent select, picker, and preview elements.
      const accentSelect = document.getElementById("swal-color");
      const accentPicker = document.getElementById("swal-color-picker");
      const accentPreview = document.getElementById("swal-color-preview");
      // Check if all accent elements exist.
      if ((accentSelect) && (accentPicker) && (accentPreview)) {
        // Sync the picker and preview with the select value.
        accentPicker.value = accentSelect.value;
        accentPreview.style.background = accentSelect.value;
        // Add a change event listener to the select.
        accentSelect.addEventListener("change", function () {
          // Get the selected value.
          const selectedValue = accentSelect.value;
          // Update the picker and preview if the value is not custom.
          if (selectedValue !== "custom") {
            accentPicker.value = selectedValue;
            accentPreview.style.background = selectedValue;
          }
        });
        // Add an input event listener to the picker.
        accentPicker.addEventListener("input", function () {
          // Get the custom color.
          const customColor = accentPicker.value;
          // Update the preview background.
          accentPreview.style.background = customColor;
          // Initialize the matching option.
          let matchingOption = null;
          // Iterate over the select options.
          for (const option of accentSelect.options) {
            // Check if the option value matches the custom color.
            if (option.value.toLowerCase() === customColor.toLowerCase()) {
              matchingOption = option;
              break;
            }
          }
          // Update the select value if a matching option is found.
          if (matchingOption) {
            accentSelect.value = matchingOption.value;
          } else {
            // Find or create the custom option.
            let customOption = accentSelect.querySelector("option[value=\"custom\"]");
            // Create the custom option if it doesn't exist.
            if (!customOption) {
              customOption = document.createElement("option");
              customOption.value = "custom";
              accentSelect.appendChild(customOption);
            }
            // Set the custom option text.
            customOption.textContent = "Custom " + customColor;
            // Set the select value to custom.
            accentSelect.value = "custom";
          }
        });
      }

      // Live preview — attach change listeners to ALL config inputs
      // so the right-panel preview updates in real-time as the user tweaks options.
      // Updates are debounced (400ms) to avoid lag on rapid changes.
      let livePreviewTimer = null;
      let livePreviewRunning = false;
      let livePreviewQueued = false;

      async function updateLivePreview() {
        // If a preview is already generating, queue another update for after.
        if (livePreviewRunning) {
          livePreviewQueued = true;
          return;
        }
        livePreviewRunning = true;
        const statusEl = document.getElementById("live-preview-status");
        const placeholderEl = document.getElementById("live-preview-placeholder");
        const iframeEl = document.getElementById("live-preview-iframe");
        if (!iframeEl) {
          livePreviewRunning = false;
          return;
        }
        if (statusEl) statusEl.textContent = "Updating…";
        const loaderEl = document.getElementById("live-preview-loader");
        if (loaderEl) loaderEl.style.display = "flex";
        try {
          // Collect current options from the modal.
          const options = GetModalOptions();
          // Clone the resume element and process it with the current options.
          const resumeElement = document.querySelector(".resume-wrapper-inner");
          if (!resumeElement) {
            if (statusEl) statusEl.textContent = "No content";
            livePreviewRunning = false;
            return;
          }
          const clonedElement = resumeElement.cloneNode(true);
          await ProcessResumeElement(clonedElement, options);
          // Generate Word-friendly styles.
          const wordStyles = GetWordFriendlyStyles(options);
          const paperSize = options.Paper || "8.5in 11.0in";
          const pageMargin = options.Margin || "0.75in";
          const marginPt = ConvertMarginToPoints(pageMargin);
          const pageWidth = paperSize.split(" ")[0] || "8.5in";
          const pageHeight = paperSize.split(" ")[1] || "11in";
          // Watermark CSS (if any).
          let watermarkCss = "";
          if (options.Watermark && options.Watermark !== "none") {
            const wmText = options.Watermark.toUpperCase();
            watermarkCss = ".WordPage { position: relative; overflow: hidden; } .WordPage::before { content: \"" + wmText + "\"; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-45deg); font-size: 88pt; font-family: Calibri, sans-serif; color: rgba(192, 192, 192, 0.3); font-weight: bold; z-index: 9999; pointer-events: none; white-space: nowrap; }";
          }
          // Build the full HTML document for the iframe.
          const previewHtml = "<!DOCTYPE html><html><head><meta charset=\"utf-8\"><title>Live Preview</title><style>html { background: #f3f2f1; } body { margin: 0; padding: 16px; background: #f3f2f1; display: flex; justify-content: center; } .WordPage { width: " + pageWidth + "; min-height: " + pageHeight + "; padding: " + marginPt + "; background: white; box-shadow: 0 0 10px rgba(0,0,0,0.15); margin-bottom: 16px; box-sizing: border-box; } " + wordStyles + watermarkCss + "</style></head><body><div class=\"WordPage\">" + clonedElement.innerHTML + "</div></body></html>";
          // Write to the iframe.
          const frameDoc = iframeEl.contentDocument || iframeEl.contentWindow.document;
          frameDoc.open();
          frameDoc.write(previewHtml);
          frameDoc.close();
          // Show the iframe, hide the placeholder.
          iframeEl.style.display = "block";
          if (placeholderEl) placeholderEl.style.display = "none";
          if (loaderEl) loaderEl.style.display = "none";
          if (statusEl) statusEl.textContent = "Live";
          // While the Customize settings are hidden, keep the modal fitted to
          // the (possibly new) live preview page width.
          if (!twoPanel || !twoPanel.classList.contains("show-settings")) {
            ApplyExportFitWidth(false);
          }
        } catch (err) {
          CVLog.warn("Live preview error:", err);
          if (statusEl) statusEl.textContent = "Error";
          const loaderErr = document.getElementById("live-preview-loader");
          if (loaderErr) loaderErr.style.display = "none";
        } finally {
          livePreviewRunning = false;
          // If another update was queued during this one, fire it now.
          if (livePreviewQueued) {
            livePreviewQueued = false;
            setTimeout(updateLivePreview, 100);
          }
        }
      }

      // Debounced wrapper — waits 400ms after the last change before updating.
      function debouncedUpdateLivePreview() {
        if (livePreviewTimer) clearTimeout(livePreviewTimer);
        // Show loader immediately when a change is detected (before the 400ms debounce).
        const statusElEarly = document.getElementById("live-preview-status");
        const loaderElEarly = document.getElementById("live-preview-loader");
        if (statusElEarly) statusElEarly.textContent = "Waiting…";
        if (loaderElEarly) loaderElEarly.style.display = "flex";
        livePreviewTimer = setTimeout(updateLivePreview, 400);
      }

      // Attach listeners to all config inputs (checkboxes, selects, color picker).
      const configInputs = document.querySelectorAll('.swal2-html-container input, .swal2-html-container select, .swal2-html-container textarea');
      configInputs.forEach(function (input) {
        input.addEventListener('change', debouncedUpdateLivePreview);
        if (input.type === 'color' || input.type === 'text' || input.type === 'textarea') {
          input.addEventListener('input', debouncedUpdateLivePreview);
        }
      });
      // Also update when tab changes (the preview should reflect the current state).
      document.querySelectorAll('.export-tab-link').forEach(function (link) {
        link.addEventListener('click', debouncedUpdateLivePreview);
      });
      // Kick off the first preview after a short delay (let the modal render first).
      setTimeout(debouncedUpdateLivePreview, 600);
    },
    "preConfirm": function () {
      // Get the modal options.
      const options = GetModalOptions();
      // Check if at least one section is selected.
      if (options.SelectedSections.length === 0) {
        Swal.showValidationMessage("Please select at least one section to export.");
        return false;
      }
      // Return the options.
      return options;
    }
  });
  // Check if the result is confirmed.
  if (result.isConfirmed) {
    // Generate the Word document.
    await GenerateWordDocument(result.value);
  }
}

// Initialize the UI enhancements on page load.
function InitializeUIEnhancements() {
  // Setup the reading progress bar (rAF-throttled).
  try {
    SetupProgressbar();
  } catch (e) {
    CVLog.error('SetupProgressbar() failed:', e);
  }
  // Setup the dark mode toggle (respects prefers-color-scheme).
  try {
    SetupDarkMode();
  } catch (e) {
    CVLog.error('SetupDarkMode() failed:', e);
  }
  // Setup the global search functionality (XSS-safe).
  try {
    SetupGlobalSearch();
  } catch (e) {
    CVLog.error('SetupGlobalSearch() failed:', e);
  }
  // Setup semantic HTML tags.
  try {
    SetupSemanticHTML();
  } catch (e) {
    CVLog.error('SetupSemanticHTML() failed:', e);
  }
  // Setup lazy loading for images.
  try {
    SetupLazyLoading();
  } catch (e) {
    CVLog.error('SetupLazyLoading() failed:', e);
  }
  // Setup the accessibility / UX features.
  try {
    SetupBackToTop();
  } catch (e) {
    CVLog.error('SetupBackToTop() failed:', e);
  }
  try {
    SetupTocToggle();
  } catch (e) {
    CVLog.error('SetupTocToggle() failed:', e);
  }
  try {
    SetupCopyToClipboard();
  } catch (e) {
    CVLog.error('SetupCopyToClipboard() failed:', e);
  }
  try {
    SetupScrollReveal();
  } catch (e) {
    CVLog.error('SetupScrollReveal() failed:', e);
  }
  // Setup the live data integrations.
  try {
    SetupQRCode();
  } catch (e) {
    CVLog.error('SetupQRCode() failed:', e);
  }
  try {
    SetupSchemaOrgJSONLD();
  } catch (e) {
    CVLog.error('SetupSchemaOrgJSONLD() failed:', e);
  }
  try {
    SetupCitationBadges();
  } catch (e) {
    CVLog.error('SetupCitationBadges() failed:', e);
  }
  try {
    SetupAltmetricBadges();
  } catch (e) {
    CVLog.error('SetupAltmetricBadges() failed:', e);
  }
  try {
    SetupGitHubStats();
  } catch (e) {
    CVLog.error('SetupGitHubStats() failed:', e);
  }
  try {
    SetupFeaturedPubs();
  } catch (e) {
    CVLog.error('SetupFeaturedPubs() failed:', e);
  }
  try {
    SetupORCIDSync();
  } catch (e) {
    CVLog.error('SetupORCIDSync() failed:', e);
  }
  // Setup the accessibility extras.
  try {
    SetupFontSizeControls();
  } catch (e) {
    CVLog.error('SetupFontSizeControls() failed:', e);
  }
  try {
    SetupAccessibilityMenu();
  } catch (e) {
    CVLog.error('SetupAccessibilityMenu() failed:', e);
  }
  try {
    SetupDyslexiaFont();
  } catch (e) {
    CVLog.error('SetupDyslexiaFont() failed:', e);
  }
  try {
    SetupTextToSpeech();
  } catch (e) {
    CVLog.error('SetupTextToSpeech() failed:', e);
  }
  try {
    SetupShortcuts();
  } catch (e) {
    CVLog.error('SetupShortcuts() failed:', e);
  }
  try {
    SetupHighContrastMode();
  } catch (e) {
    CVLog.error('SetupHighContrastMode() failed:', e);
  }
  try {
    SetupReadingGuide();
  } catch (e) {
    CVLog.error('SetupReadingGuide() failed:', e);
  }
  // Setup the analytics & engagement.
  try {
    SetupAnalytics();
  } catch (e) {
    CVLog.error('SetupAnalytics() failed:', e);
  }
  try {
    SetupAvailabilityIndicator();
  } catch (e) {
    CVLog.error('SetupAvailabilityIndicator() failed:', e);
  }
  try {
    SetupCalendly();
  } catch (e) {
    CVLog.error('SetupCalendly() failed:', e);
  }
  try {
    SetupScheduleMeetingPopup();
  } catch (e) {
    CVLog.error('SetupScheduleMeetingPopup() failed:', e);
  }
  try {
    SetupQrSharePopup();
  } catch (e) {
    CVLog.error('SetupQrSharePopup() failed:', e);
  }
  try {
    SetupFabMenu();
  } catch (e) {
    CVLog.error('SetupFabMenu() failed:', e);
  }
  try {
    SetupDownloadWordFab();
  } catch (e) {
    CVLog.error('SetupDownloadWordFab() failed:', e);
  }
  try {
    SetupAvatarLightbox();
  } catch (e) {
    CVLog.error('SetupAvatarLightbox() failed:', e);
  }
  try {
    SetupLazyFlickr();
  } catch (e) {
    CVLog.error('SetupLazyFlickr() failed:', e);
  }
  // Per-block copy + read-aloud buttons on every section/item.
  try {
    SetupPerBlockActions();
  } catch (e) {
    CVLog.error('SetupPerBlockActions() failed:', e);
  }
  // Accessibility-menu toggles that show/hide the per-block buttons.
  try {
    SetupBlockActionToggles();
  } catch (e) {
    CVLog.error('SetupBlockActionToggles() failed:', e);
  }
  // Wrap acronyms in <abbr> tags for screen readers.
  try {
    SetupAbbrAcronyms();
  } catch (e) {
    CVLog.error('SetupAbbrAcronyms() failed:', e);
  }
}

// Setup the reading progress bar at the top of the viewport.
function SetupProgressbar() {
  const progressBar = document.getElementById("reading-progress-bar");
  if (!progressBar) {
    return;
  }
  // Throttle layout writes with requestAnimationFrame so the handler
  // never runs more than once per frame.
  let ticking = false;

  function update() {
    ticking = false;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (docHeight > 0) ? ((scrollTop / docHeight) * 100) : (0);
    progressBar.style.width = scrollPercent + "%";
  }

  // passive: true tells the browser the handler will never call preventDefault,
  // allowing it to scroll on the compositor thread without blocking.
  window.addEventListener("scroll", function () {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  }, {passive: true});
  // Also update on resize and on initial load.
  window.addEventListener("resize", Debounce(update, 200), {passive: true});
  update();
}

// Setup the dark mode toggle functionality.
function SetupDarkMode() {
  // The dark mode toggle moved into the Accessibility menu; both IDs work.
  const toggle = document.getElementById("a11y-dark-toggle") || document.getElementById("theme-toggle");
  if (!toggle) {
    return;
  }
  // Also set data-bs-theme on <html> so Bootstrap 5.3's
  // built-in color mode kicks in (styles form controls, cards, tables, etc.).
  function applyDarkMode(isDark) {
    document.body.classList.toggle("dark-mode", isDark);
    document.documentElement.setAttribute("data-bs-theme", isDark ? "dark" : "light");
  }

  // Sync the toggle's visual state to the current body state on every page load.
  function syncToggle() {
    const isDark = document.body.classList.contains("dark-mode");
    if (toggle.classList.contains("a11y-switch")) {
      toggle.setAttribute("aria-checked", isDark ? "true" : "false");
    } else if (toggle.id === "theme-toggle") {
      const icon = toggle.querySelector("i");
      if (icon) icon.className = isDark ? "fas fa-sun" : "fas fa-moon";
      toggle.setAttribute("aria-pressed", isDark ? "true" : "false");
    }
  }

  // Decide the initial dark-mode state. Priority:
  //   1. Saved user preference in localStorage.
  //   2. OS-level prefers-color-scheme: dark.
  const saved = localStorage.getItem("cv-dark-mode");
  let isDark;
  if (saved !== null) {
    isDark = (saved === "true");
  } else {
    isDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  applyDarkMode(isDark);
  syncToggle();
  // React to OS theme changes ONLY when the user has not explicitly chosen.
  if (window.matchMedia) {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const mqListener = function (e) {
      if (localStorage.getItem("cv-dark-mode") === null) {
        applyDarkMode(e.matches);
        syncToggle();
      }
    };
    if (mql.addEventListener) {
      mql.addEventListener("change", mqListener);
    } else if (mql.addListener) {
      // Safari < 14 fallback.
      mql.addListener(mqListener);
    }
  }
  toggle.addEventListener("click", function () {
    const nowDark = !document.body.classList.contains("dark-mode");
    applyDarkMode(nowDark);
    localStorage.setItem("cv-dark-mode", nowDark);
    syncToggle();
  });
  // Also update the toggle if any other code path changes dark-mode state.
  document.addEventListener("cv:dark-mode-changed", syncToggle);
}

// Setup the global search and highlight functionality.
function SetupGlobalSearch() {
  const searchInput = document.getElementById("global-search");
  const clearBtn = document.getElementById("search-clear");
  const statusRegion = document.getElementById("search-match-status");
  if (!searchInput) return;
  let searchTimeout;

  function announce(message) {
    if (!statusRegion) return;
    statusRegion.textContent = message;
  }

  function clearHighlights() {
    document.querySelectorAll("mark.search-highlight").forEach(function (mark) {
      const parent = mark.parentNode;
      // Replace the <mark> with its text content and re-normalize
      // the parent so adjacent text nodes merge back together.
      while (mark.firstChild) {
        parent.insertBefore(mark.firstChild, mark);
      }
      parent.removeChild(mark);
      parent.normalize();
    });
  }

  function highlight(query) {
    const content = document.querySelector(".resume-wrapper-inner");
    if (!content) return 0;
    const lowerQuery = query.toLowerCase();
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp("(" + escapedQuery + ")", "gi");
    const walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        // Skip text inside <script>, <style>, <mark>, and elements with contenteditable.
        const parent = node.parentNode;
        if (!parent) return NodeFilter.FILTER_REJECT;
        const tag = parent.nodeName.toLowerCase();
        if (tag === "script" || tag === "style" || tag === "mark" || tag === "textarea" || tag === "input") {
          return NodeFilter.FILTER_REJECT;
        }
        if (!node.nodeValue || !node.nodeValue.toLowerCase().includes(lowerQuery)) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    }, false);
    const nodesToWrap = [];
    let node;
    while ((node = walker.nextNode())) {
      nodesToWrap.push(node);
    }
    const MAX_HIGHLIGHTS = 150;
    let matchCount = 0;
    let capped = false;
    nodesToWrap.forEach(function (textNode) {
      if (matchCount >= MAX_HIGHLIGHTS) {
        capped = true;
        return;
      }
      const text = textNode.nodeValue;
      const lowerText = text.toLowerCase();
      let pos = lowerText.indexOf(lowerQuery);
      if (pos === -1) return;
      // Split the text node at each match boundary and insert <mark> nodes.
      // This avoids innerHTML entirely and is XSS-safe by construction
      // (the matched text is textContent, never parsed as HTML).
      const fragment = document.createDocumentFragment();
      let lastIdx = 0;
      while (pos !== -1) {
        if (pos > lastIdx) {
          fragment.appendChild(document.createTextNode(text.slice(lastIdx, pos)));
        }
        const mark = document.createElement("mark");
        mark.className = "search-highlight";
        mark.textContent = text.slice(pos, pos + query.length);
        fragment.appendChild(mark);
        matchCount++;
        if (matchCount >= MAX_HIGHLIGHTS) {
          capped = true;
          break;
        }
        lastIdx = pos + query.length;
        pos = lowerText.indexOf(lowerQuery, lastIdx);
      }
      if (lastIdx < text.length) {
        fragment.appendChild(document.createTextNode(text.slice(lastIdx)));
      }
      textNode.parentNode.replaceChild(fragment, textNode);
    });
    if (capped) {
      announce("Showing first " + MAX_HIGHLIGHTS + " matches for \"" + query + "\" — refine your query to see more.");
    } else if (matchCount > 0) {
      announce(matchCount + (matchCount === 1 ? " match" : " matches") + " for \"" + query + "\".");
    } else {
      announce("No matches for \"" + query + "\".");
    }
    return matchCount;
  }

  searchInput.addEventListener("input", function () {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      const query = this.value.trim();
      if (clearBtn) clearBtn.style.display = query.length > 0 ? "inline-block" : "none";
      clearHighlights();
      announce("");
      if (query.length < 3) return;
      const count = highlight(query);
      const firstMatch = document.querySelector("mark.search-highlight");
      if (firstMatch) {
        firstMatch.scrollIntoView({behavior: "smooth", block: "center"});
      }
    }, 300);
  });
  if (clearBtn) {
    clearBtn.addEventListener("click", function () {
      searchInput.value = "";
      clearHighlights();
      announce("");
      if (clearBtn) clearBtn.style.display = "none";
      searchInput.focus();
    });
  }
  // Keyboard shortcut: '/' focuses the search input.
  document.addEventListener("keydown", function (e) {
    if (e.key === "/" && document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA") {
      e.preventDefault();
      searchInput.focus();
    }
    if (e.key === "Escape" && document.activeElement === searchInput) {
      searchInput.value = "";
      clearHighlights();
      announce("");
      if (clearBtn) clearBtn.style.display = "none";
      searchInput.blur();
    }
  });
}


// Setup the load more publications button.
function SetupLoadMorePubs() {
  // Select all publication timeline items.
  const pubs = document.querySelectorAll("#Published-Papers .resume-timeline-item, #Published-Conferences .resume-timeline-item");
  // Get the load more button element.
  const btn = document.getElementById("load-more-pubs");
  // Return early if the button doesn't exist or there are fewer than 10 publications.
  if (!btn || pubs.length <= 10) {
    return;
  }
  // Iterate over each publication.
  pubs.forEach(function (pub, index) {
    // Hide publications beyond the first 10.
    if (index >= 10) {
      pub.style.display = "none";
    }
  });
  // Display the load more button.
  btn.style.display = "inline-block";
  // Add a click event listener to the button.
  btn.addEventListener("click", function () {
    // Iterate over each publication to show them all.
    pubs.forEach(function (pub) {
      pub.style.display = "";
    });
    // Hide the load more button.
    btn.style.display = "none";
  });
}

// Setup semantic HTML tags for better accessibility and ATS parsing.
function SetupSemanticHTML() {
  // Select all timeline items.
  document.querySelectorAll(".resume-timeline-item").forEach(function (item) {
    // Check if the element is not already an article tag.
    if (item.tagName.toLowerCase() !== "article") {
      // Create a new article element.
      const article = document.createElement("article");
      // Copy the class name.
      article.className = item.className;
      // Copy the inner HTML.
      article.innerHTML = item.innerHTML;
      // Replace the original div with the article tag.
      item.parentNode.replaceChild(article, item);
    }
  });
}

// Setup lazy loading for all images on the page.
function SetupLazyLoading() {
  // Select all image elements.
  document.querySelectorAll("img").forEach(function (img) {
    // Check if the loading attribute is not already set.
    if (!img.hasAttribute("loading")) {
      // Set the loading attribute to lazy.
      img.setAttribute("loading", "lazy");
    }
  });
}

// Track analytics events using a placeholder for Umami/Plausible.
function TrackAnalyticsEvent(category, action) {
  // Check if the Umami analytics object exists.
  if (typeof window.umami !== "undefined") {
    // Track the event using Umami.
    window.umami.track(action, {
      category: category
    });
  }
  // Log the event to the console for debugging.
  CVLog.log("Analytics Event:", category, action);
}

// Optional download-completion webhook. All call sites go through this wrapper;
// it is a no-op unless ENABLE_DOWNLOAD_WEBHOOK is true and DOWNLOAD_WEBHOOK_URL
// is set.
var DOWNLOAD_WEBHOOK_URL = ""; // e.g. "https://hook.us1.make.com/REAL_WEBHOOK_ID"
var ENABLE_DOWNLOAD_WEBHOOK = false;

function TriggerDownloadWebhook(type) {
  if (!ENABLE_DOWNLOAD_WEBHOOK || !DOWNLOAD_WEBHOOK_URL) {
    CVLog.log("Webhook skipped (disabled):", type);
    return;
  }
  fetch(DOWNLOAD_WEBHOOK_URL, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({type: type, timestamp: new Date().toISOString()})
  }).catch(function (err) {
    CVLog.warn("Webhook failed:", err);
  });
}

// Map section headings to icons for the icon-only TOC rail.
const TocIconMap = [
  [/professional summary/i, "fas fa-user-tie"],
  [/long biograph/i, "fas fa-book-open"],
  [/biograph/i, "fas fa-book"],
  [/experience|employment|freelance/i, "fas fa-briefcase"],
  [/interest/i, "fas fa-flask"],
  [/education/i, "fas fa-graduation-cap"],
  [/language/i, "fas fa-language"],
  [/patent|invention/i, "fas fa-lightbulb"],
  [/publication|journal|conference|paper|editor/i, "fas fa-file-alt"],
  [/repo|code|dataset/i, "fas fa-code-branch"],
  [/certif|award|honor|medal/i, "fas fa-certificate"],
  [/volunteer|community|service/i, "fas fa-hands-helping"],
  [/skill/i, "fas fa-tools"],
  [/teach|course|lecture/i, "fas fa-chalkboard-teacher"],
  [/project/i, "fas fa-diagram-project"],
  [/photo|galler/i, "fas fa-images"],
  [/rank|academ/i, "fas fa-ranking-star"],
  [/present|talk|invited/i, "fas fa-microphone"],
  [/membership|societ|board/i, "fas fa-users"],
  [/snapshot|stats|metrics/i, "fas fa-chart-simple"],
  [/reference/i, "fas fa-quote-right"],
  [/contact/i, "fas fa-address-card"]
];

// Initialize the Table of Contents rail.
// Collapsed (default) the rail shows icons only, each with a flyout tooltip;
// expanded it shows icons and text labels side by side.
function InitializeStickyToc() {
  // Get the TOC container element.
  const tocContainer = document.getElementById("sticky-toc");
  // Return early if the container does not exist.
  if (!tocContainer) {
    return;
  }
  // Select all section headings.
  const headings = document.querySelectorAll("h2.resume-section-title");
  // The rail shows an icon per section plus a text label revealed on expand.
  tocContainer.innerHTML = "";
  // Iterate over each heading to build the TOC.
  headings.forEach(function (heading, index) {
    // Ensure the heading has an ID.
    const targetId = heading.id || ("section-" + index);
    heading.id = targetId;
    // Resolve the section name.
    const sectionName = (heading.textContent || "").trim().replace(/\s+/g, " ");
    // Pick an icon for the section from the icon map (default: dot).
    let iconClass = "fas fa-circle-dot";
    for (const entry of TocIconMap) {
      if (entry[0].test(sectionName)) {
        iconClass = entry[1];
        break;
      }
    }
    // Count the items in this section (surfaced through the tooltip).
    let itemCount = 0;
    const section = heading.closest(".resume-section");
    if (section) {
      itemCount = section.querySelectorAll(
        ".resume-timeline-item, .repo-item, .course-card, .cert-item, .volunteer-item"
      ).length;
    }
    // Build the tooltip text (shown on hover while the rail is collapsed).
    const tooltip = itemCount > 0
      ? sectionName + " (" + itemCount + " items)"
      : sectionName;
    // Create the TOC link element: icon plus a label that is revealed when
    // the rail is expanded.
    const link = document.createElement("a");
    link.href = "#" + targetId;
    link.className = "toc-link";
    link.setAttribute("data-tooltip", tooltip);
    link.setAttribute("aria-label", tooltip);
    link.innerHTML = "<i class=\"" + iconClass + "\" aria-hidden=\"true\"></i><span class=\"toc-label\" title=\"" + sectionName.replace(/"/g, "&quot;") + "\">" + sectionName + "</span>";
    // Add smooth scroll behavior on click.
    link.addEventListener("click", function (event) {
      event.preventDefault();
      document.getElementById(targetId).scrollIntoView({
        behavior: "smooth"
      });
    });
    // Append the link to the container.
    tocContainer.appendChild(link);
  });
  // Setup Intersection Observer for active state highlighting.
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const activeId = entry.target.id;
        // Remove active class from all links.
        document.querySelectorAll(".toc-link").forEach(function (link) {
          link.classList.remove("active");
          link.removeAttribute("aria-current");
          // Add active class + aria-current to the matching link.
          if (link.getAttribute("href") === ("#" + activeId)) {
            link.classList.add("active");
            link.setAttribute("aria-current", "location");
          }
        });
      }
    });
  }, {
    rootMargin: "-10% 0px -75% 0px"
  });
  // Observe all headings.
  headings.forEach(function (heading) {
    observer.observe(heading);
  });
}

// Export the publication list to a BibTeX file.
function ExportToBibTeX() {
  try {

    // Track the analytics event.
    TrackAnalyticsEvent("Export", "BibTeX");
    // Trigger the download webhook.
    TriggerDownloadWebhook("BibTeX");
    let bibtex = "";
    // Select all publication items.
    // Deduplicate by title to prevent doubled entries.
    const _seenBib = {};
    const pubs = document.querySelectorAll("#Published-Papers .resume-timeline-item, #Published-Conferences .resume-timeline-item");
    let bibIndex = 0;
    pubs.forEach(function (pub, index) {
      const _titleCheck = pub.querySelector(".resume-position-title")?.textContent.trim() || "";
      if (_seenBib[_titleCheck]) return;
      _seenBib[_titleCheck] = true;
      // Extract title from the correct heading class.
      const titleEl = pub.querySelector(".resume-position-title");
      const title = titleEl ? titleEl.textContent.trim().replace(/\s+/g, " ") : "Unknown Title";
      // Extract journal/conference name from the correct subheading class.
      const journalEl = pub.querySelector(".resume-company-name");
      const journal = journalEl ? journalEl.textContent.trim().replace(/\s+/g, " ") : "Unknown Journal";
      // Extract year from the time element.
      const timeEl = pub.querySelector(".resume-position-time");
      const timeText = timeEl ? timeEl.textContent.trim() : "";
      const yearMatch = timeText.match(/(\d{4})/);
      const year = yearMatch ? yearMatch[1] : "2024";
      // Extract DOI cleanly.
      const doiEl = pub.querySelector("a[href*='doi.org']");
      const doi = doiEl ? doiEl.getAttribute("href").replace("https://doi.org/", "").replace("https://doi.org/", "") : "";
      // Determine entry type and generate key.
      const key = "balaha" + year + bibIndex;
      bibIndex++;
      const type = pub.closest("#Published-Conferences") ? "@inproceedings" : "@article";
      // Build the BibTeX entry.
      bibtex += type + "{" + key + ",\n";
      bibtex += "  title={" + title + "},\n";
      bibtex += "  author={Balaha, Hossam Magdy and others},\n";
      bibtex += "  journal={" + journal + "},\n";
      bibtex += "  year={" + year + "}";
      if (doi) {
        bibtex += ",\n  doi={" + doi + "}";
      }
      bibtex += "\n}\n\n";
    });
    // Create and trigger the download.
    const blob = new Blob([bibtex], {
      type: "text/plain;charset=utf-8"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Hossam_Magdy_Balaha_Publications.bib";
    a.click();
    URL.revokeObjectURL(url);
    // Show completion alert.
    Swal.fire({
      icon: "success",
      title: "BibTeX Export Complete",
      text: "Your publications have been successfully exported to BibTeX format."
    });
  } catch (err) {
    CVLog.error("ExportToBibTeX failed:", err);
    ExportErrorToast("ExportToBibTeX", err);
  }
}

// Export the resume data to the standard JSON Resume format.
function ExportToJSONResume() {
  try {

    // Track the analytics event.
    TrackAnalyticsEvent("Export", "JSON Resume");
    // Trigger the download webhook.
    TriggerDownloadWebhook("JSON");
    const jsonResume = {
      "basics": {
        "name": "Hossam Magdy Balaha",
        "label": "AI Engineer & Bioengineering Ph.D. Candidate",
        "email": "hmbala01@louisville.edu",
        "phone": "+1 502-767-9991",
        "url": "https://hossambalaha.github.io/",
        "summary": document.querySelector("#ProfessionalSummary p") ? document.querySelector("#ProfessionalSummary p").textContent.trim().replace(/\s+/g, " ") : ""
      },
      "work": [],
      "education": [],
      "publications": [],
      "skills": [],
      "rankings": [],
    };
    // Extract Work Experience using accurate selectors.
    // Deduplicate by position+company to prevent doubled entries.
    const _seenWork = {};
    document.querySelectorAll("#Experience .resume-timeline-item").forEach(function (item) {
      const position = item.querySelector(".resume-position-title")?.textContent.trim().replace(/\s+/g, " ") || "";
      const company = item.querySelector(".resume-company-name")?.textContent.trim().replace(/\s+/g, " ") || "";
      const dedupKey = position + "|" + company;
      if (_seenWork[dedupKey]) return;
      _seenWork[dedupKey] = true;
      const timeText = item.querySelector(".resume-position-time")?.textContent.trim() || "";
      const dateMatch = timeText.match(/([A-Za-z]{3,}\s+\d{1,2},?\s+\d{4}|[A-Za-z]+\s+\d{4}|\d{4})\s*[–-]\s*(Present|[A-Za-z]{3,}\s+\d{1,2},?\s+\d{4}|[A-Za-z]+\s+\d{4}|\d{4})/);
      jsonResume.work.push({
        "position": position,
        "company": company,
        "startDate": dateMatch ? dateMatch[1].trim() : "",
        "endDate": dateMatch ? dateMatch[2].trim() : "",
        "summary": item.querySelector(".resume-timeline-item-desc")?.textContent.trim().replace(/\s+/g, " ") || ""
      });
    });
    // Extract Education using accurate selectors.
    // Deduplicate by institution+area to prevent doubled entries.
    const _seenEdu = {};
    document.querySelectorAll("#Education .resume-timeline-item").forEach(function (item) {
      const area = item.querySelector(".resume-position-title")?.textContent.trim().replace(/\s+/g, " ") || "";
      const institution = item.querySelector(".resume-company-name")?.textContent.trim().replace(/\s+/g, " ") || "";
      const dedupKey = institution + "|" + area;
      if (_seenEdu[dedupKey]) return;
      _seenEdu[dedupKey] = true;
      const timeText = item.querySelector(".resume-position-time")?.textContent.trim() || "";
      const dateMatch = timeText.match(/([A-Za-z]{3,}\s+\d{1,2},?\s+\d{4}|[A-Za-z]+\s+\d{4}|\d{4})\s*[–-]\s*(Present|[A-Za-z]{3,}\s+\d{1,2},?\s+\d{4}|[A-Za-z]+\s+\d{4}|\d{4})/);
      jsonResume.education.push({
        "institution": institution,
        "area": area,
        "studyType": "Degree",
        "startDate": dateMatch ? dateMatch[1].trim() : "",
        "endDate": dateMatch ? dateMatch[2].trim() : ""
      });
    });
    // Extract Publications using accurate selectors.
    // Deduplicate by title+year to prevent doubled entries.
    const _seenPubs = {};
    document.querySelectorAll("#Published-Papers .resume-timeline-item, #Published-Conferences .resume-timeline-item").forEach(function (item) {
      const title = item.querySelector(".resume-position-title")?.textContent.trim().replace(/\s+/g, " ") || "";
      const publisher = item.querySelector(".resume-company-name")?.textContent.trim().replace(/\s+/g, " ") || "";
      const dedupKey = title;
      if (_seenPubs[dedupKey]) return;
      _seenPubs[dedupKey] = true;
      const timeText = item.querySelector(".resume-position-time")?.textContent.trim() || "";
      const yearMatch = timeText.match(/(\d{4})/);
      const doiEl = item.querySelector("a[href*='doi.org']");
      jsonResume.publications.push({
        "name": title,
        "publisher": publisher,
        "releaseDate": yearMatch ? yearMatch[1] : "",
        "url": doiEl ? doiEl.getAttribute("href") : ""
      });
    });
    // Extract Skills.
    document.querySelectorAll(".skill-tag, .skill-pill").forEach(function (tag) {
      const name = tag.textContent.trim().replace(/\s+/g, " ");
      if (name && !jsonResume.skills.find(function (s) {
        return s.name === name;
      })) {
        jsonResume.skills.push({
          "name": name
        });
      }
    });
    // Extract Scholar Rankings using accurate table selectors.
    // Deduplicate by topic+window to prevent doubled entries.
    const _seenRank = {};
    document.querySelectorAll(".ranking-table tbody tr").forEach(function (row) {
      const cells = row.querySelectorAll("td");
      if (cells.length >= 9) {
        const _rankKey = cells[0].textContent.trim() + "|" + cells[1].textContent.trim();
        if (_seenRank[_rankKey]) return;
        _seenRank[_rankKey] = true;
        jsonResume.rankings.push({
          "topic": cells[0].textContent.trim().replace(/\s+/g, " "),
          "window": cells[1].textContent.trim(),
          "worldRank": cells[2].textContent.trim(),
          "nationalRank": cells[3].textContent.trim(),
          "percentile": cells[4].textContent.trim(),
          "impactScore": cells[5].textContent.trim(),
          "dIndex": cells[6].textContent.trim(),
          "hIndex": cells[7].textContent.trim(),
          "certificate": cells[8].querySelector("a") ? cells[8].querySelector("a").getAttribute("href") : ""
        });
      }
    });
    // Create and trigger the download.
    const blob = new Blob([JSON.stringify(jsonResume, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Hossam_Magdy_Balaha_Resume.json";
    a.click();
    URL.revokeObjectURL(url);
    // Show completion alert.
    Swal.fire({
      icon: "success",
      title: "JSON Export Complete",
      text: "Your resume has been successfully exported to JSON Resume format."
    });
  } catch (err) {
    CVLog.error("ExportToJSONResume failed:", err);
    ExportErrorToast("ExportToJSONResume", err);
  }
}

// Define the main asynchronous function to generate and download the Word document.
async function GenerateWordDocument(options) {
  try {

    // Find the resume wrapper element.
    const resumeElement = document.querySelector(".resume-wrapper-inner");
    // Check if the resume wrapper exists.
    if (!resumeElement) {
      CVLog.error("Resume wrapper element not found.");
      return;
    }
    // Clone the resume element.
    const clonedElement = resumeElement.cloneNode(true);
    // Process the cloned element.
    await ProcessResumeElement(clonedElement, options);
    // Get the Word-friendly styles.
    const wordStyles = GetWordFriendlyStyles(options);
    // Initialize the watermark VML.
    let watermarkVml = "";
    // Check if a watermark is selected.
    if (options.Watermark !== "none") {
      const wmText = options.Watermark.toUpperCase();
      watermarkVml = "<v:shape id=\"Watermark\" type=\"#x0000_t136\" style=\"position:absolute;left:0;top:0;width:650pt;height:150pt;rotation:315;z-index:-251658752;mso-position-horizontal:center;mso-position-horizontal-relative:margin;mso-position-vertical:center;mso-position-vertical-relative:margin\" fillcolor=\"#C0C0C0\" stroked=\"f\" o:allowincell=\"f\">" + "<v:fill opacity=\".15\"/>" + "<v:textbox style=\"mso-fit-shape-to-text:t\" inset=\"0,0,0,0\">" + "<w:txbxContent>" + "<p class=\"MsoNormal\" align=\"center\"><span style=\"font-size:88pt;font-family:Calibri,sans-serif;color:#C0C0C0;font-weight:bold;\">" + wmText + "</span></p>" + "</w:txbxContent>" + "</v:textbox>" + "</v:shape>";
    }
    // Define the document metadata.
    const documentMetadata = {
      "Title": "Hossam_Magdy_Balaha_CV",
      "Charset": "utf-8",
      "Language": options.DocumentLanguage || "en-US"
    };
    // Build the full HTML string.
    const fullHtml = "<!DOCTYPE html>" + "<html lang=\"" + documentMetadata["Language"] + "\" xmlns:o=\"urn:schemas-microsoft-com:office:office\" xmlns:w=\"urn:schemas-microsoft-com:office:word\" xmlns:v=\"urn:schemas-microsoft-com:vml\" xmlns=\"https://www.w3.org/TR/REC-html40\">" + "<head>" + "<meta charset=\"" + documentMetadata["Charset"] + "\">" + "<title>" + documentMetadata["Title"] + "</title>" + "<!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View><w:Zoom>100</w:Zoom><w:DoNotOptimizeForBrowser/></w:WordDocument></xml><![endif]-->" + "<style>v:* {behavior:url(#default#VML);} " + wordStyles + "</style>" + "</head>" + "<body>" + watermarkVml + "<div class=\"WordSection1\">" + clonedElement.innerHTML + "</div></body>" + "</html>";
    // Check if html-docx-js is loaded.
    if (typeof htmlDocx === "undefined") {
      CVLog.error("html-docx-js library is not loaded.");
      return;
    }
    // Convert the HTML to a Blob.
    const convertedBlob = htmlDocx.asBlob(fullHtml);
    // Define the base file name.
    let baseFileName = "Hossam_Magdy_Balaha_CV";
    // Append the filename suffix if provided.
    if (options.FilenameSuffix) {
      const cleanSuffix = options.FilenameSuffix.replace(/[^a-zA-Z0-9_]/g, "");
      baseFileName = baseFileName + "_" + cleanSuffix;
    }
    // Define the output file name.
    const outputFileName = baseFileName + ".docx";
    // Trigger download webhook.
    TriggerDownloadWebhook("DOCX");
    // Check if FileSaver.js is loaded.
    if (typeof saveAs === "undefined") {
      CVLog.error("FileSaver.js library is not loaded.");
      return;
    }
    // Save the file.
    saveAs(convertedBlob, outputFileName);
    // Show completion alert on success.
    Swal.fire({
      icon: "success",
      title: "DOCX Export Complete",
      text: "Your CV has been successfully exported to Word format."
    });
  } catch (err) {
    CVLog.error("GenerateWordDocument failed:", err);
    ExportErrorToast("GenerateWordDocument", err);
  }
}

// ---------------------------------------------------------------------------
// Export formats (RIS, CSV, Markdown) + cover letter generator.
// ---------------------------------------------------------------------------

// Shared helper: collect all publications from the DOM as structured objects.
function CollectPublications() {
  const pubs = [];
  document.querySelectorAll("#Published-Papers .resume-timeline-item, #Published-Conferences .resume-timeline-item").forEach(function (pub, idx) {
    const titleEl = pub.querySelector(".resume-position-title");
    const venueEl = pub.querySelector(".resume-company-name");
    const timeEl = pub.querySelector(".resume-position-time");
    const doiEl = pub.querySelector("a[href*='doi.org']");
    const descEl = pub.querySelector(".resume-timeline-item-desc");
    const type = pub.closest("#Published-Conferences") ? "inproceedings" : "article";
    pubs.push({
      index: idx + 1,
      title: titleEl ? titleEl.textContent.trim().replace(/\s+/g, " ") : "Untitled",
      venue: venueEl ? venueEl.textContent.trim().replace(/\s+/g, " ") : "",
      year: timeEl ? (timeEl.textContent.match(/(\d{4})/) || ["", ""])[1] : "",
      rawDate: timeEl ? timeEl.textContent.trim() : "",
      doi: doiEl ? doiEl.getAttribute("href").replace(/^https?:\/\/(dx\.)?doi\.org\//, "") : "",
      abstract: descEl ? descEl.textContent.trim().replace(/\s+/g, " ").substring(0, 500) : "",
      type: type,
      authors: "Balaha, Hossam Magdy"
    });
  });
  return pubs;
}

// Export publications to RIS format (EndNote / Zotero / Mendeley compatible).
function ExportToRIS() {
  try {
    TrackAnalyticsEvent("Export", "RIS");
    TriggerDownloadWebhook("RIS");
    const pubs = CollectPublications();
    if (pubs.length === 0) {
      throw new Error("No publications found on the page.");
    }
    let ris = "";
    pubs.forEach(function (pub) {
      ris += "TY  - " + (pub.type === "inproceedings" ? "CONF" : "JOUR") + "\r\n";
      ris += "AU  - " + pub.authors + "\r\n";
      ris += "TI  - " + pub.title + "\r\n";
      if (pub.venue) ris += (pub.type === "inproceedings" ? "BT  - " : "JO  - ") + pub.venue + "\r\n";
      if (pub.year) ris += "PY  - " + pub.year + "\r\n";
      if (pub.doi) ris += "DO  - " + pub.doi + "\r\n";
      if (pub.abstract) ris += "AB  - " + pub.abstract + "\r\n";
      ris += "ER  - \r\n\r\n";
    });
    const blob = new Blob([ris], {type: "application/x-research-info-systems;charset=utf-8"});
    if (typeof saveAs !== "undefined") {
      saveAs(blob, "Hossam_Balaha_Publications.ris");
    } else {
      throw new Error("FileSaver library not loaded.");
    }
    if (typeof Swal !== "undefined") {
      Swal.fire({
        icon: "success",
        title: "RIS Export Complete",
        text: "Exported " + pubs.length + " publications to RIS format."
      });
    }
  } catch (err) {
    CVLog.error("ExportToRIS failed:", err);
    ExportErrorToast("ExportToRIS", err);
  }
}

// Export publications to CSV (spreadsheet-friendly).
function ExportToCSV() {
  try {
    TrackAnalyticsEvent("Export", "CSV");
    TriggerDownloadWebhook("CSV");
    const pubs = CollectPublications();
    if (pubs.length === 0) {
      throw new Error("No publications found.");
    }
    const headers = ["#", "Year", "Title", "Venue", "Type", "DOI", "Authors"];
    const rows = [headers.join(",")];
    pubs.forEach(function (pub) {
      // Escape CSV fields: wrap in quotes, double internal quotes.
      const esc = function (s) {
        return '"' + String(s).replace(/"/g, '""') + '"';
      };
      rows.push([
        pub.index, pub.year, esc(pub.title), esc(pub.venue),
        pub.type, esc(pub.doi), esc(pub.authors)
      ].join(","));
    });
    const csv = "\uFEFF" + rows.join("\r\n");  // BOM for Excel UTF-8 detection
    const blob = new Blob([csv], {type: "text/csv;charset=utf-8"});
    if (typeof saveAs !== "undefined") {
      saveAs(blob, "Hossam_Balaha_Publications.csv");
    } else {
      throw new Error("FileSaver library not loaded.");
    }
    if (typeof Swal !== "undefined") {
      Swal.fire({
        icon: "success",
        title: "CSV Export Complete",
        text: "Exported " + pubs.length + " publications to CSV."
      });
    }
  } catch (err) {
    CVLog.error("ExportToCSV failed:", err);
    ExportErrorToast("ExportToCSV", err);
  }
}

// Cover letter generator — keyword-based tailoring.
// User pastes a job description; JS extracts keywords and selects the
// most relevant publications/skills/experience to include.
function CoverLetterGenerator() {
  if (typeof Swal === "undefined") {
    alert("SweetAlert2 is not loaded. Please retry later.");
    return;
  }
  Swal.fire({
    title: "Cover Letter Generator",
    html:
      '<p style="text-align:left;font-size:0.85rem;color:#666;margin-bottom:12px">' +
      'Paste the job description below. We will extract the top keywords and auto-tailor ' +
      'a one-page cover letter highlighting your most relevant publications, skills, and experience.</p>' +
      '<textarea id="cover-letter-jd" class="swal2-textarea" placeholder="Paste job description here..." ' +
      'style="height:200px;width:100%;font-family:Roboto,sans-serif;font-size:0.85rem"></textarea>' +
      '<label style="display:block;text-align:left;margin-top:12px;font-size:0.85rem">' +
      '<input type="checkbox" id="cover-letter-include-pubs" checked> Include 3 most relevant publications</label>' +
      '<label style="display:block;text-align:left;margin-top:6px;font-size:0.85rem">' +
      '<input type="checkbox" id="cover-letter-include-skills" checked> Include matched skills</label>' +
      '<label style="display:block;text-align:left;margin-top:6px;font-size:0.85rem">' +
      '<input type="checkbox" id="cover-letter-target-company"> Add a "To:" line for a specific company</label>' +
      '<input type="text" id="cover-letter-company" class="swal2-input" placeholder="Company name (optional)" style="margin-top:8px">',
    showCancelButton: true,
    confirmButtonText: "Generate Cover Letter",
    confirmButtonColor: "#0d6efd",
    width: 640,
    preConfirm: function () {
      const jd = document.getElementById("cover-letter-jd").value.trim();
      if (jd.length < 50) {
        Swal.showValidationMessage("Please paste at least 50 characters of the job description.");
        return false;
      }
      return {
        jd: jd,
        includePubs: document.getElementById("cover-letter-include-pubs").checked,
        includeSkills: document.getElementById("cover-letter-include-skills").checked,
        targetCompany: document.getElementById("cover-letter-target-company").checked,
        company: document.getElementById("cover-letter-company").value.trim()
      };
    }
  }).then(function (result) {
    if (!result.isConfirmed) return;
    GenerateCoverLetter(result.value);
  });
}

// Build the cover letter HTML and download as .docx using html-docx-js.
function GenerateCoverLetter(opts) {
  try {
    TrackAnalyticsEvent("Export", "CoverLetter");
    TriggerDownloadWebhook("CoverLetter");
    const jd = opts.jd;
    // Extract keywords from the JD (top 15 frequent non-stopwords, length >= 4).
    const stopwords = new Set(["the", "and", "for", "with", "that", "this", "will", "have", "from", "your", "you", "are", "our", "their", "they", "them", "what", "when", "where", "which", "while", "about", "into", "than", "then", "also", "more", "such", "very", "some", "must", "should", "would", "could", "may", "can", "all", "any", "who", "how", "why", "was", "were", "been", "being", "has", "had", "did", "does", "done", "made", "make", "makes", "making", "get", "got", "put", "use", "used", "uses", "using", "like", "just", "each", "both", "most", "other", "into", "over", "only", "own", "same", "too", "here", "there", "now", "via", "per", "etc"]);
    const words = jd.toLowerCase().match(/\b[a-z][a-z\-]{3,}\b/g) || [];
    const freq = {};
    words.forEach(function (w) {
      if (!stopwords.has(w)) {
        freq[w] = (freq[w] || 0) + 1;
      }
    });
    const keywords = Object.keys(freq).sort(function (a, b) {
      return freq[b] - freq[a];
    }).slice(0, 15);

    // Score publications by keyword matches in title/venue.
    const pubs = CollectPublications();
    const scoredPubs = pubs.map(function (p) {
      const text = (p.title + " " + p.venue + " " + p.abstract).toLowerCase();
      const score = keywords.reduce(function (acc, kw) {
        return acc + (text.includes(kw) ? 1 : 0);
      }, 0);
      return {pub: p, score: score};
    }).sort(function (a, b) {
      return b.score - a.score;
    });
    let topPubs = scoredPubs.filter(function (s) {
      return s.score > 0;
    }).slice(0, 3);
    if (topPubs.length < 3) {
      // Pad with highest-citation papers (proxy: most recent year).
      const fillers = scoredPubs.slice(0, 3).filter(function (s) {
        return s.score === 0;
      });
      topPubs = topPubs.concat(fillers).slice(0, 3);
    }

    // Score skills similarly.
    const skillElements = document.querySelectorAll(".resume-skill-name, .skill-pill");
    const allSkills = [];
    skillElements.forEach(function (el) {
      const name = el.textContent.trim();
      if (name) allSkills.push(name);
    });
    let matchedSkills = allSkills.filter(function (s) {
      const lower = s.toLowerCase();
      return keywords.some(function (kw) {
        return lower.includes(kw);
      });
    }).slice(0, 8);
    if (matchedSkills.length < 4) {
      matchedSkills = allSkills.slice(0, 6);
    }

    // Compose the cover letter HTML.
    const today = new Date().toLocaleDateString("en-US", {year: "numeric", month: "long", day: "numeric"});
    let html = "";
    html += '<p style="text-align:right;font-family:Roboto,sans-serif">' + today + '</p>';
    if (opts.targetCompany && opts.company) {
      html += '<p style="font-family:Roboto,sans-serif">To the Hiring Committee,<br/><strong>' + opts.company + '</strong></p>';
    }
    html += '<p style="font-family:Roboto,sans-serif">Dear Hiring Committee,</p>';
    html += '<p style="font-family:Roboto,sans-serif">I am writing to express my strong interest in the position described in your job posting. As a Ph.D. Candidate in Bioengineering at the University of Louisville with an H-Index of 29 and over 2,800 citations, I bring a unique combination of academic depth in AI/ML research and production-grade full-stack engineering experience that aligns closely with your requirements.</p>';

    if (opts.includeSkills && matchedSkills.length > 0) {
      html += '<p style="font-family:Roboto,sans-serif"><strong>Relevant skills matched from your job description:</strong> ' + matchedSkills.join(", ") + '.</p>';
    }

    if (opts.includePubs && topPubs.length > 0) {
      html += '<p style="font-family:Roboto,sans-serif"><strong>Selected publications most relevant to your needs:</strong></p>';
      html += '<ol style="font-family:Roboto,sans-serif">';
      topPubs.forEach(function (s) {
        const p = s.pub;
        html += '<li>' + p.title;
        if (p.venue) html += '. <em>' + p.venue + '</em>';
        if (p.year) html += ' (' + p.year + ')';
        if (p.doi) html += '. DOI: ' + p.doi;
        html += '.</li>';
      });
      html += '</ol>';
    }

    html += '<p style="font-family:Roboto,sans-serif">I would welcome the opportunity to discuss how my background in ' + (keywords.slice(0, 3).join(", ")) + ' can contribute to your team. Thank you for your consideration.</p>';
    html += '<p style="font-family:Roboto,sans-serif">Sincerely,<br/><strong>Hossam Magdy Balaha</strong><br/>hmbala01@louisville.edu · +1 502-767-9991</p>';

    // Convert to .docx using html-docx-js.
    const fullHtml = '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Cover Letter</title></head><body>' + html + '</body></html>';
    if (typeof htmlDocx !== "undefined" && htmlDocx.asBlob) {
      const blob = htmlDocx.asBlob(fullHtml);
      if (typeof saveAs !== "undefined") {
        saveAs(blob, "Hossam_Balaha_Cover_Letter.docx");
      }
    } else {
      // Fallback: download as .html
      const blob = new Blob([fullHtml], {type: "text/html;charset=utf-8"});
      if (typeof saveAs !== "undefined") {
        saveAs(blob, "Hossam_Balaha_Cover_Letter.html");
      }
    }
    if (typeof Swal !== "undefined") {
      Swal.fire({
        icon: "success",
        title: "Cover Letter Generated",
        html: "<p>Top keywords matched: <strong>" + keywords.slice(0, 5).join(", ") + "</strong></p>" +
          "<p>Publications selected: " + topPubs.length + "</p>" +
          "<p>Skills matched: " + matchedSkills.length + "</p>"
      });
    }
  } catch (err) {
    CVLog.error("GenerateCoverLetter failed:", err);
    ExportErrorToast("CoverLetterGenerator", err);
  }
}

// ==========================================
// Publication Table Logic (Web View Only)
// ==========================================
function InitializePublicationTables() {
  // Configurable list of sections to convert from timeline to table.
  // Each entry defines the section ID, the search-box label, and the
  // column headers. The extraction logic below pulls title / venue /
  // year / link from each .resume-timeline-item.
  const sections = [
    {
      id: "Published-Papers",
      searchLabel: "journal articles",
      cols: ["Title", "Venue / Journal", "Year", "DOI / Link"]
    },
    {
      id: "Published-Conferences",
      searchLabel: "conference papers",
      cols: ["Title", "Venue / Journal", "Year", "DOI / Link"]
    },
    {
      id: "Published-Book-Chapters",
      searchLabel: "book chapters",
      cols: ["Title", "Venue / Journal", "Year", "DOI / Link"]
    },
    {
      id: "Recent-Certifications",
      searchLabel: "certifications",
      cols: ["Title", "Issuer", "Year", "Link"]
    },
    {
      id: "Career-Certifications-&-Examinations",
      searchLabel: "certifications & exams",
      cols: ["Title", "Issuer", "Year", "Score / Link"]
    },
    {
      id: "Desktop-Web-and-Mobile-Applications",
      searchLabel: "applications",
      cols: ["Title", "Description / Venue", "Year", "Link"]
    },
    {
      id: "Teaching-Experience",
      searchLabel: "courses",
      cols: ["Course", "Department", "Role / Terms", "Link"]
    }
  ];
  sections.forEach(cfg => {
    const sectionId = cfg.id;
    const section = document.getElementById(sectionId);
    if (!section) return;
    const timeline = section.querySelector(".resume-timeline");
    if (!timeline) return;
    // Skip if a table was already built for this section.
    if (section.querySelector(".web-only-pub-table")) return;
    const items = timeline.querySelectorAll(".resume-timeline-item");
    if (items.length === 0) return;
    // Extract data from original list.
    const rows = [];
    items.forEach(item => {
      const titleEl = item.querySelector(".resume-position-title");
      const venueEl = item.querySelector(".resume-company-name");
      const timeEls = item.querySelectorAll(".resume-position-time");
      // The first .resume-position-time usually holds the date/year.
      // For sections with multiple .resume-position-time divs (e.g.
      // Teaching Experience: Role, Terms, YouTube links), we join the
      // first two non-link ones for the "year/date" column.
      const doiEl = item.querySelector(".resume-timeline-item-desc a[href*='doi.org'], .resume-timeline-item-desc a[href*='DOI']");
      // Find the first usable link in the item (DOI, cert PDF, YouTube, etc.).
      let firstLinkEl = doiEl;
      if (!firstLinkEl) {
        // Look for the first <a> with an href that's a real link (not a nav anchor).
        const allLinks = item.querySelectorAll("a[href]");
        for (const a of allLinks) {
          const href = a.getAttribute("href") || "";
          if (href.startsWith("http") || href.startsWith("assets/")) {
            firstLinkEl = a;
            break;
          }
        }
      }
      const title = titleEl ? titleEl.textContent.trim() : "";
      const venue = venueEl ? venueEl.textContent.trim() : "";
      let year = "";
      if (timeEls.length > 0) {
        // Try to extract a 4-digit year from the first .resume-position-time.
        const firstTime = timeEls[0].textContent;
        const match = firstTime.match(/(\d{4})/);
        if (match) {
          year = match[1];
        } else {
          // No year — use the first ~60 chars of the first time entry (e.g. a role).
          year = firstTime.trim().substring(0, 60);
        }
        // For Teaching Experience, append the role info from the first time div.
        if (sectionId === "Teaching-Experience" && timeEls.length > 1) {
          const roleText = timeEls[0].textContent.replace(/^Role:\s*/i, "").trim();
          const termsText = timeEls[1] ? timeEls[1].textContent.replace(/^Terms:\s*/i, "").trim() : "";
          year = roleText + (termsText ? " | " + termsText : "");
          if (year.length > 80) year = year.substring(0, 80) + "...";
        }
      }
      let doiLink = "";
      let doiText = "DOI";
      if (firstLinkEl) {
        doiLink = firstLinkEl.getAttribute("href");
        // Choose a sensible link label based on the href.
        if (doiLink.includes("doi.org")) {
          doiText = "DOI";
        } else if (doiLink.endsWith(".png") || doiLink.endsWith(".jpg") || doiLink.endsWith(".pdf")) {
          doiText = "View";
        } else if (doiLink.includes("youtube.com") || doiLink.includes("youtu.be")) {
          doiText = "YouTube";
        } else if (doiLink.startsWith("http")) {
          doiText = "Open";
        } else {
          doiText = "Link";
        }
      }
      rows.push({title, venue, year, doiLink, doiText});
    });
    if (rows.length === 0) return;
    // Hide original timeline for web view.
    timeline.style.display = "none";
    timeline.classList.add("export-only-list");
    // Create Table Container.
    const tableId = sectionId.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-table";
    const tableContainer = document.createElement("div");
    tableContainer.className = "web-only-pub-table";
    // Search Input.
    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.className = "table-search-input";
    searchInput.placeholder = `Search ${cfg.searchLabel} by title, venue, or year...`;
    searchInput.setAttribute("onkeyup", `FilterTable('${tableId}', this.value)`);
    // Controls HTML.
    const controlsHTML = `
            <div class="d-flex align-items-center">
                <label class="me-2 mb-0" style="font-size: 0.9rem; color: #555;">Show:</label>
                <select class="form-select form-select-sm" style="width: auto;" onchange="ChangeRowsPerPage(this, '${tableId}')">
                    <option value="5" selected>5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="all">All</option>
                </select>
                <span class="ms-2" style="font-size: 0.9rem; color: #555;">entries</span>
            </div>
            <div class="d-flex align-items-center">
                <button class="btn btn-sm btn-outline-secondary me-2" onclick="ChangePage(-1, '${tableId}')">Previous</button>
                <span class="page-info" role="status" aria-live="polite" aria-atomic="true" style="font-size: 0.9rem; color: #555;">Page 1 of 1</span>
                <button class="btn btn-sm btn-outline-secondary ms-2" onclick="ChangePage(1, '${tableId}')">Next</button>
            </div>
        `;
    const topControls = document.createElement("div");
    topControls.className = "d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2";
    topControls.innerHTML = controlsHTML;
    const bottomControls = topControls.cloneNode(true);
    bottomControls.classList.add("mt-2");
    // Table.
    const table = document.createElement("table");
    table.id = tableId;
    table.className = "responsive-table";
    table.setAttribute("data-current-page", "1");
    table.setAttribute("data-rows-per-page", "5");
    table.setAttribute("data-sort-dir", "desc");
    // Build column headers from the config.
    const headerCells = cfg.cols.map((col, i) =>
      i < 3
        ? `<th onclick="SortTable('${tableId}', ${i})">${col} ↕</th>`
        : `<th>${col}</th>`
    ).join("");
    table.innerHTML = `
            <thead>
                <tr>
                    ${headerCells}
                </tr>
            </thead>
            <tbody>
                ${rows.map(row => `
                    <tr data-visible="true">
                        <td class="pub-title">${row.title}</td>
                        <td class="pub-journal">${row.venue}</td>
                        <td class="pub-year">${row.year}</td>
                        <td>${row.doiLink ? `<a href="${row.doiLink}" class="doi-link" target="_blank">${row.doiText}</a>` : ""}</td>
                    </tr>
                `).join("")}
            </tbody>
        `;
    // Insert the table before the original timeline.
    timeline.parentNode.insertBefore(tableContainer, timeline);
    // View toggle (Table / List) — lets the user switch between the
    // generated table and the original timeline list. The toggle sits
    // OUTSIDE the tableContainer so it stays visible when the container
    // is hidden. Default is table view.
    const toggleBar = document.createElement("div");
    toggleBar.className = "pub-view-toggle";
    toggleBar.innerHTML =
      '<button type="button" class="active" data-view="table"><i class="fas fa-table" aria-hidden="true"></i> Table</button>' +
      '<button type="button" data-view="list"><i class="fas fa-list" aria-hidden="true"></i> List</button>';
    // Insert the toggle bar BEFORE the tableContainer so it sits above
    // everything and stays visible in both views.
    timeline.parentNode.insertBefore(toggleBar, tableContainer);
    toggleBar.querySelectorAll("button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const view = btn.getAttribute("data-view");
        toggleBar.querySelectorAll("button").forEach(function (b) {
          b.classList.remove("active");
        });
        btn.classList.add("active");
        if (view === "table") {
          // Show the entire table container (search + controls + table);
          // hide the original timeline list.
          tableContainer.style.display = "";
          timeline.classList.add("export-only-list");
        } else {
          // Hide the ENTIRE table container (search + pagination + table)
          // so the user doesn't see duplicated pagination controls; show
          // the original timeline list.
          tableContainer.style.display = "none";
          timeline.classList.remove("export-only-list");
          timeline.style.setProperty("display", "block", "important");
        }
      });
    });
    tableContainer.appendChild(searchInput);
    tableContainer.appendChild(topControls);
    tableContainer.appendChild(table);
    tableContainer.appendChild(bottomControls);
    // Sort by year descending initially, then apply pagination.
    SortTable(tableId, 2);
  });
}

function UpdatePubPagination(tableId) {
  const table = document.getElementById(tableId);
  if (!table) return;
  const rowsPerPage = parseInt(table.getAttribute("data-rows-per-page")) || 10;
  let currentPage = parseInt(table.getAttribute("data-current-page")) || 1;
  const allRows = Array.from(table.querySelectorAll("tbody tr"));
  const visibleRows = allRows.filter(row => row.getAttribute("data-visible") === "true");
  const totalPages = Math.ceil(visibleRows.length / rowsPerPage) || 1;
  if (currentPage > totalPages) currentPage = totalPages;
  if (currentPage < 1) currentPage = 1;
  table.setAttribute("data-current-page", currentPage);
  let shownCount = 0;
  allRows.forEach(row => {
    if (row.getAttribute("data-visible") === "true") {
      if (shownCount >= (currentPage - 1) * rowsPerPage && shownCount < currentPage * rowsPerPage) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
      shownCount++;
    } else {
      row.style.display = "none";
    }
  });
  const container = table.parentElement;
  const pageInfoElements = container.querySelectorAll(".page-info");
  pageInfoElements.forEach(el => el.textContent = `Page ${currentPage} of ${totalPages}`);
  const prevBtns = container.querySelectorAll("button[onclick^='ChangePage(-1']");
  const nextBtns = container.querySelectorAll("button[onclick^='ChangePage(1']");
  prevBtns.forEach(btn => btn.disabled = (currentPage === 1));
  nextBtns.forEach(btn => btn.disabled = (currentPage === totalPages));
}

function ChangePage(direction, tableId) {
  const table = document.getElementById(tableId);
  if (!table) return;
  let currentPage = parseInt(table.getAttribute("data-current-page")) || 1;
  currentPage += direction;
  table.setAttribute("data-current-page", currentPage);
  UpdatePubPagination(tableId);
}

function ChangeRowsPerPage(selectElement, tableId) {
  const table = document.getElementById(tableId);
  if (!table) return;
  const val = selectElement.value;
  const rowsPerPage = val === "all" ? 99999 : parseInt(val);
  table.setAttribute("data-rows-per-page", rowsPerPage);
  table.setAttribute("data-current-page", "1");
  UpdatePubPagination(tableId);
}

function FilterTable(tableId, query) {
  const table = document.getElementById(tableId);
  if (!table) return;
  const rows = table.querySelectorAll("tbody tr");
  const lowerQuery = query.toLowerCase();
  rows.forEach(row => {
    const cells = row.querySelectorAll("td");
    let isMatch = false;
    cells.forEach(cell => {
      if (cell.textContent.toLowerCase().indexOf(lowerQuery) > -1) isMatch = true;
    });
    row.setAttribute("data-visible", isMatch ? "true" : "false");
  });
  table.setAttribute("data-current-page", "1");
  UpdatePubPagination(tableId);
}

function SortTable(tableId, columnIndex) {
  const table = document.getElementById(tableId);
  if (!table) return;
  const isAscending = table.getAttribute("data-sort-dir") === "asc";
  table.setAttribute("data-sort-dir", isAscending ? "desc" : "asc");
  const tbody = table.querySelector("tbody");
  const rowsArray = Array.from(tbody.querySelectorAll("tr"));
  rowsArray.sort(function (rowA, rowB) {
    const textA = rowA.cells[columnIndex].textContent.trim();
    const textB = rowB.cells[columnIndex].textContent.trim();
    if (columnIndex === 2) { // Year column numeric sort
      const numA = parseInt(textA) || 0;
      const numB = parseInt(textB) || 0;
      return isAscending ? (numA - numB) : (numB - numA);
    }
    return isAscending ? textA.localeCompare(textB) : textB.localeCompare(textA);
  });
  tbody.innerHTML = "";
  rowsArray.forEach(row => tbody.appendChild(row));
  UpdatePubPagination(tableId);
}

// ---------------------------------------------------------------------------
// New helpers added by the improvement pass.
// ---------------------------------------------------------------------------

// Debounce a function: delays invocation until `wait` ms have elapsed
// since the last call. Useful for resize / search input handlers.
function Debounce(fn, wait) {
  let timer = null;
  return function () {
    const ctx = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(ctx, args);
    }, wait);
  };
}

// Display a user-friendly SweetAlert toast when an export fails, with a
// retry button and a "Use Print" fallback. Falls back to alert() if Swal
// itself is unavailable (e.g. CDN blocked).
function ExportErrorToast(operationName, err) {
  const msg = (err && err.message) ? err.message : "Unknown error.";
  if (typeof Swal !== "undefined") {
    Swal.fire({
      icon: "error",
      title: operationName + " failed",
      html: "<p>The " + operationName + " operation could not be completed.</p>" +
        "<p style=\"font-size:0.85rem;color:#666\">" + msg + "</p>" +
        "<p style=\"font-size:0.85rem\">You can retry, or use your browser's Print dialog (Ctrl/Cmd+P) to save a copy.</p>",
      showCancelButton: true,
      confirmButtonText: "Retry " + operationName,
      cancelButtonText: "Use Print instead",
      confirmButtonColor: "#0d6efd",
      cancelButtonColor: "#6c757d"
    }).then(function (result) {
      if (result.isConfirmed) {
        // Retry the same operation.
        if (operationName === "ExportToBibTeX") {
          ExportToBibTeX();
        } else if (operationName === "GenerateWordDocument") {
          HandleWordDownloadClick();
        } else if (operationName === "ExportToJSONResume") {
          ExportToJSONResume();
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        window.print();
      }
    });
  } else {
    // Swal CDN failed — show a plain alert with a print suggestion.
    alert(operationName + " failed: " + msg + "\n\nYou can use your browser's Print dialog (Ctrl/Cmd+P) to save a copy.");
  }
}

// Back-to-top button + scroll visibility.
function SetupBackToTop() {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;
  let ticking = false;

  function update() {
    ticking = false;
    if (window.scrollY > 600) {
      btn.classList.add("is-visible");
      // Body-level flag so the "+" FAB can slide out of the back-to-top
      // spot and back above it in sync with this button.
      document.body.classList.add("btt-visible");
    } else {
      btn.classList.remove("is-visible");
      document.body.classList.remove("btt-visible");
    }
  }

  window.addEventListener("scroll", function () {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  }, {passive: true});
  // Sync once on load so a restored scroll position starts in the right state.
  update();
  btn.addEventListener("click", function () {
    window.scrollTo({top: 0, behavior: "smooth"});
  });
}

// TOC rail toggle: expands the rail to reveal the section labels and
// collapses it back to the icon-only state (where flyout tooltips appear).
function SetupTocToggle() {
  const toggle = document.getElementById("mobile-toc-toggle");
  const toc = document.getElementById("sticky-toc");
  if (!toggle || !toc) return;

  // Reflect the expanded/collapsed state on the toggle button itself.
  function updateToggleButton(isOpen) {
    const icon = toggle.querySelector("i");
    if (icon) {
      icon.className = isOpen ? "fas fa-angles-left" : "fas fa-list";
    }
    toggle.title = isOpen ? "Collapse table of contents" : "Expand table of contents";
    toggle.setAttribute("aria-label", toggle.title);
    toggle.classList.toggle("is-open", isOpen);
  }

  function open() {
    toc.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    updateToggleButton(true);
    HideTocFlyout();
  }

  function close() {
    toc.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    updateToggleButton(false);
  }

  function onKeydown(e) {
    if (e.key === "Escape") {
      close();
    }
  }

  toggle.addEventListener("click", function () {
    if (toc.classList.contains("is-open")) {
      close();
      document.removeEventListener("keydown", onKeydown);
    } else {
      open();
      document.addEventListener("keydown", onKeydown);
    }
  });
  // Collapse after navigating on small screens (the expanded rail covers
  // content there). Delegated on the container so it works no matter when
  // the links are built.
  toc.addEventListener("click", function (clickEvent) {
    const link = clickEvent.target.closest(".toc-link");
    if (!link) return;
    if (window.matchMedia("(max-width: 991px)").matches) {
      close();
      document.removeEventListener("keydown", onKeydown);
    }
  });
  // Wire the collapsed-state flyout tooltips.
  SetupTocFlyout(toc);
}

// Flyout tooltip for the collapsed TOC rail. A single reusable element is
// appended to <body> (so the rail's scroll container cannot clip it) and is
// positioned next to the hovered/focused icon.
let tocFlyoutEl = null;

function HideTocFlyout() {
  if (tocFlyoutEl) {
    tocFlyoutEl.classList.remove("is-visible");
  }
}

function SetupTocFlyout(toc) {
  tocFlyoutEl = document.createElement("div");
  tocFlyoutEl.className = "toc-flyout";
  tocFlyoutEl.setAttribute("aria-hidden", "true");
  document.body.appendChild(tocFlyoutEl);

  function show(link) {
    const text = link.getAttribute("data-tooltip");
    if (!text) return;
    tocFlyoutEl.textContent = text;
    const rect = link.getBoundingClientRect();
    tocFlyoutEl.style.left = (rect.right + 12) + "px";
    tocFlyoutEl.style.top = (rect.top + rect.height / 2) + "px";
    tocFlyoutEl.classList.add("is-visible");
  }

  function considerShow(event) {
    // Only in the collapsed state; the visible labels replace the tooltip
    // when the rail is expanded.
    if (toc.classList.contains("is-open")) {
      HideTocFlyout();
      return;
    }
    const link = event.target.closest(".toc-link");
    if (link) {
      show(link);
    } else {
      HideTocFlyout();
    }
  }

  toc.addEventListener("mouseover", considerShow);
  toc.addEventListener("mouseout", HideTocFlyout);
  toc.addEventListener("focusin", considerShow);
  toc.addEventListener("focusout", HideTocFlyout);
  window.addEventListener("scroll", HideTocFlyout, {passive: true});
  window.addEventListener("resize", HideTocFlyout);
}

// Copy-to-clipboard for any element with [data-copy].
function SetupCopyToClipboard() {
  // All inline .copy-btn elements.
  const buttons = document.querySelectorAll(".copy-btn");
  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const value = btn.getAttribute("data-copy") || "";

      // Use the Clipboard API with a fallback to a hidden textarea.
      function onSuccess() {
        btn.classList.add("copied");
        const original = btn.innerHTML;
        btn.innerHTML = "<i class=\"fas fa-check\" aria-hidden=\"true\"></i>";
        const announcement = document.getElementById("search-match-status");
        if (announcement) {
          announcement.textContent = "Copied: " + value;
        }
        setTimeout(function () {
          btn.classList.remove("copied");
          btn.innerHTML = original;
          if (announcement) announcement.textContent = "";
        }, 2000);
      }

      function onFailure() {
        btn.style.borderColor = "#dc3545";
        setTimeout(function () {
          btn.style.borderColor = "";
        }, 1500);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(onSuccess, function () {
          // Fallback: hidden textarea + execCommand.
          const ta = document.createElement("textarea");
          ta.value = value;
          ta.style.position = "fixed";
          ta.style.left = "-9999px";
          document.body.appendChild(ta);
          ta.select();
          try {
            document.execCommand("copy");
            onSuccess();
          } catch (e) {
            onFailure();
          }
          document.body.removeChild(ta);
        });
      } else {
        const ta = document.createElement("textarea");
        ta.value = value;
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand("copy");
          onSuccess();
        } catch (e) {
          onFailure();
        }
        document.body.removeChild(ta);
      }
    });
  });
  // The floating copy FAB copies the primary email.
  const fab = document.getElementById("copy-contact-fab");
  if (fab) {
    fab.addEventListener("click", function () {
      const primaryBtn = document.querySelector('.copy-btn[data-copy="hmbala01@louisville.edu"]');
      if (primaryBtn) {
        primaryBtn.click();
      }
    });
  }
}

// Scroll-driven section reveal: applies .is-revealed when each .resume-section
// enters the viewport. Respects prefers-reduced-motion via CSS.
function SetupScrollReveal() {
  const sections = document.querySelectorAll(".resume-section");
  if (sections.length === 0) return;
  // If IntersectionObserver is unsupported, show everything immediately.
  if (!("IntersectionObserver" in window)) {
    sections.forEach(function (s) {
      s.classList.add("is-revealed");
    });
    return;
  }
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: "0px 0px -10% 0px",
    threshold: 0.05
  });
  sections.forEach(function (s) {
    observer.observe(s);
  });
}

// Compute and display reading time + word count.
function SetupReadingTime() {
  const main = document.getElementById("main-content");
  const timeEl = document.getElementById("reading-time");
  const wordsEl = document.getElementById("word-count");
  if (!main || !timeEl) return;
  // Count words in the visible text content of the main wrapper.
  const text = main.textContent || "";
  // Collapse whitespace.
  const words = text.trim().split(/\s+/).filter(Boolean);
  const count = words.length;
  // Average adult reading speed: 200-250 wpm. Use 220.
  const minutes = Math.max(1, Math.round(count / 220));
  let display;
  if (minutes < 60) {
    display = "~" + minutes + " min read";
  } else {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    display = "~" + h + " hr " + m + " min read";
  }
  timeEl.textContent = display;
  if (wordsEl) {
    if (count > 1000) {
      wordsEl.textContent = (count / 1000).toFixed(1).replace(/\.0$/, "") + "k+ words";
    } else {
      wordsEl.textContent = count + " words";
    }
  }
}

// Execute initialization when the DOM is ready.
document.addEventListener("DOMContentLoaded", function () {
  // Initialize the new UI enhancements
  try {
    InitializeUIEnhancements();
  } catch (e) {
    CVLog.error("InitializeUIEnhancements failed:", e);
  }
  // Initialize the sticky Table of Contents
  try {
    InitializeStickyToc();
  } catch (e) {
    CVLog.error("InitializeStickyToc failed:", e);
  }
  // Generate tables dynamically for the web view
  try {
    InitializePublicationTables();
  } catch (e) {
    CVLog.error("InitializePublicationTables failed:", e);
  }
});

// ===========================================================================
// LIVE DATA INTEGRATIONS
// ===========================================================================

// --- Semantic Scholar citation badges ---
// For each publication with a DOI, fetch citation count and inject a badge.
// Uses a per-DOI cache in localStorage (7-day TTL) to avoid hammering the API.
// Requests are strictly sequential with a delay — Semantic Scholar rate-limits
// aggressive concurrent requests with CORS-blocking 429 responses, so we
// serialize them. Failures are silent (badges are an enhancement, not critical).
//
// Robustness details:
//   1. Skip entirely on file:// protocol — Semantic Scholar and OpenAlex both
//      reject `null` origins with CORS errors, so there's no point trying.
//      This eliminates the noisy CORS console errors when the CV is opened
//      locally (e.g. double-clicked from a Downloads folder).
//   2. Fall back to the OpenAlex API (also in CSP connect-src) when Semantic
//      Scholar returns 429 or any other error. OpenAlex has a higher free
//      rate limit (100k/day, 10/s) and supports CORS from any origin.
//   3. Exponential backoff on 429 — if Semantic Scholar returns 429, double
//      the delay before the next request (up to 10s max).
function SetupCitationBadges() {
  // Skip on file:// — APIs will CORS-reject with `null` origin.
  if (window.location.protocol === "file:") {
    CVLog.log("Citation badges skipped: file:// protocol (APIs require http(s) origin).");
    return;
  }
  const pubItems = document.querySelectorAll("#Published-Papers .resume-timeline-item, #Published-Conferences .resume-timeline-item");
  if (pubItems.length === 0) return;
  let cache = {};
  try {
    cache = JSON.parse(localStorage.getItem("cv-citation-cache") || "{}");
  } catch (e) {
    cache = {};
  }
  const now = Date.now();
  let cacheDirty = false;
  // Build the list of DOIs that need processing (cached or fresh).
  const queue = [];
  pubItems.forEach(function (pub) {
    const doiEl = pub.querySelector("a[href*='doi.org']");
    if (!doiEl) return;
    const href = doiEl.getAttribute("href");
    const doi = href.replace(/^https?:\/\/(dx\.)?doi\.org\//, "");
    if (!doi) return;
    const meta = pub.querySelector(".resume-position-time");
    if (!meta) return;
    const cacheKey = "doi:" + doi;
    const entry = cache[cacheKey];
    if (entry && (now - entry.t) < 7 * 24 * 3600 * 1000) {
      injectBadge(meta, entry.count, entry.url);
    } else {
      queue.push({doi: doi, meta: meta, cacheKey: cacheKey});
    }
  });
  if (queue.length === 0) {
    if (cacheDirty) {
      try {
        localStorage.setItem("cv-citation-cache", JSON.stringify(cache));
      } catch (e) {
      }
    }
    return;
  }
  // Limit to the first 12 most-recent uncached DOIs per page load — keeps us
  // well under the Semantic Scholar rate limit even on a fresh cache.
  const active = queue.slice(0, 12);
  let idx = 0;
  let currentDelay = 1200; // Start at 1.2s, double on 429 (max 10s).
  function fetchNext() {
    if (idx >= active.length) {
      if (cacheDirty) {
        try {
          localStorage.setItem("cv-citation-cache", JSON.stringify(cache));
        } catch (e) {
        }
      }
      return;
    }
    const item = active[idx++];
    const ssUrl = "https://api.semanticscholar.org/graph/v1/paper/DOI:" + encodeURIComponent(item.doi) + "?fields=citationCount,url";
    fetch(ssUrl, {headers: {"Accept": "application/json"}})
      .then(function (r) {
        if (r.status === 429) {
          // Rate limited — back off and retry this same item.
          currentDelay = Math.min(currentDelay * 2, 10000);
          CVLog.warn("Semantic Scholar 429 (rate limited). Backing off to", currentDelay, "ms. Trying OpenAlex fallback for", item.doi);
          idx--; // Re-queue this item.
          // Try OpenAlex as fallback for this item.
          return fetchFromOpenAlex(item).finally(function () {
            setTimeout(fetchNext, currentDelay);
          });
        }
        if (!r.ok) throw new Error("HTTP " + r.status);
        // Successful response — reset backoff.
        currentDelay = 1200;
        return r.json().then(function (data) {
          const count = data.citationCount || 0;
          const paperUrl = data.url || ("https://doi.org/" + item.doi);
          cache[item.cacheKey] = {t: Date.now(), count: count, url: paperUrl};
          cacheDirty = true;
          injectBadge(item.meta, count, paperUrl);
        });
      })
      .catch(function (err) {
        // Semantic Scholar failed (network/CORS/non-429) — try OpenAlex fallback.
        CVLog.warn("Semantic Scholar failed for", item.doi, "— trying OpenAlex:", err.message);
        return fetchFromOpenAlex(item);
      })
      .then(function () {
        // Schedule next request after the current delay.
        setTimeout(fetchNext, currentDelay);
      })
      .catch(function () {
        // Both APIs failed — silent. Badge is enhancement only.
        setTimeout(fetchNext, currentDelay);
      });
  }

  // Fallback: fetch citation count from OpenAlex API.
  // OpenAlex is more permissive (CORS-enabled, higher rate limit) and returns
  // cited_by_count for any DOI. URL format:
  //   https://api.openalex.org/works/doi:{DOI}?select=cited_by_count,id
  function fetchFromOpenAlex(item) {
    const oaUrl = "https://api.openalex.org/works/doi:" + encodeURIComponent(item.doi) + "?select=cited_by_count,id";
    return fetch(oaUrl, {headers: {"Accept": "application/json"}})
      .then(function (r) {
        if (!r.ok) throw new Error("OpenAlex HTTP " + r.status);
        return r.json();
      })
      .then(function (data) {
        const count = data.cited_by_count || 0;
        const paperUrl = data.id || ("https://doi.org/" + item.doi);
        cache[item.cacheKey] = {t: Date.now(), count: count, url: paperUrl, source: "openalex"};
        cacheDirty = true;
        injectBadge(item.meta, count, paperUrl);
      })
      .catch(function (err) {
        CVLog.warn("OpenAlex also failed for", item.doi, "— giving up:", err.message);
      });
  }

  fetchNext();
}

function injectBadge(metaEl, count, url) {
  if (metaEl.querySelector(".citation-badge")) return;
  const badge = document.createElement("a");
  badge.className = "citation-badge";
  badge.href = url;
  badge.target = "_blank";
  badge.rel = "noopener noreferrer";
  badge.title = count + " citations (Semantic Scholar)";
  badge.innerHTML = '<i class="fas fa-quote-right" aria-hidden="true"></i> ' + count;
  metaEl.appendChild(document.createTextNode(" "));
  metaEl.appendChild(badge);
}

// --- Altmetric badges (DISABLED) ---
// The Altmetric JSONP callback endpoint (api.altmetric.com) returns its
// response with Content-Type: text/plain. The Altmetric server also sends
// X-Content-Type-Options: nosniff, so the browser refuses to execute the
// response as JavaScript ("MIME type mismatch"). This is an Altmetric-side
// bug we cannot work around from the client. Instead of generating dozens
// of console errors and CSP violations, we no longer inject Altmetric
// badges at all. The Semantic Scholar citation badges (SetupCitationBadges)
// already provide citation counts next to each publication.
function SetupAltmetricBadges() {
  // Intentionally a no-op. The Semantic Scholar badges handle citation display.
}

// --- GitHub repo star/fork counts ---
function SetupGitHubStats() {
  const repoLinks = document.querySelectorAll('a[href*="github.com/HossamBalaha/"]');
  if (repoLinks.length === 0) return;
  const seen = {};
  const toFetch = [];
  repoLinks.forEach(function (link) {
    const m = link.href.match(/github\.com\/HossamBalaha\/([^/?#]+)/);
    if (!m) return;
    const repo = m[1];
    if (seen[repo]) return;
    seen[repo] = true;
    toFetch.push({repo: repo, link: link});
  });
  // Cache for 1 hour.
  let cache = {};
  try {
    cache = JSON.parse(localStorage.getItem("cv-github-cache") || "{}");
  } catch (e) {
    cache = {};
  }
  const now = Date.now();
  let cacheDirty = false;
  toFetch.forEach(function (item, idx) {
    setTimeout(function () {
      const entry = cache[item.repo];
      if (entry && (now - entry.t) < 3600 * 1000) {
        injectGitHubBadge(item.link, entry.stars, entry.forks);
        return;
      }
      fetch("https://api.github.com/repos/HossamBalaha/" + item.repo, {headers: {"Accept": "application/vnd.github+json"}})
        .then(function (r) {
          return r.json();
        })
        .then(function (data) {
          if (!data || data.message) return;
          cache[item.repo] = {t: Date.now(), stars: data.stargazers_count || 0, forks: data.forks_count || 0};
          cacheDirty = true;
          injectGitHubBadge(item.link, data.stargazers_count || 0, data.forks_count || 0);
        })
        .catch(function () {
        })
        .finally(function () {
          if (cacheDirty) {
            try {
              localStorage.setItem("cv-github-cache", JSON.stringify(cache));
            } catch (e) {
            }
          }
        });
    }, idx * 600);  // 10 requests/minute rate limit safety
  });
}

function injectGitHubBadge(link, stars, forks) {
  if (link.parentElement.querySelector(".github-stats-badge")) return;
  const badge = document.createElement("span");
  badge.className = "github-stats-badge";
  badge.innerHTML = ' \u00b7 <i class="fas fa-star" aria-hidden="true"></i> ' + stars + ' <i class="fas fa-code-branch" aria-hidden="true"></i> ' + forks;
  badge.style.cssText = "font-size:0.75rem;color:#586069;margin-left:4px";
  link.parentElement.appendChild(badge);
}

// --- Featured publications carousel ---
// Picks the top 5 publications by citation count (from Semantic Scholar cache,
// or by year recency as fallback) and renders cards.
// AUTOMATIC UPDATES: This function calls CollectPublications() which scans
// #Published-Papers .resume-timeline-item and #Published-Conferences
// .resume-timeline-item at runtime. So whenever you add a new publication
// to the "Published Journal Articles" or "Published Conference Papers"
// sections in index.html (as a <article class="resume-timeline-item">),
// it will automatically appear in the Featured Publications carousel the
// next time the page is loaded — no manual update needed here.
// Ranking: by cached citation count (from SetupCitationBadges, which
// fetches from Semantic Scholar). If a publication has no cached citation
// count yet, it ranks by year (most recent first).
function SetupFeaturedPubs() {
  const carousel = document.getElementById("featured-pubs-carousel");
  if (!carousel) return;
  const pubs = CollectPublications();
  if (pubs.length === 0) {
    carousel.innerHTML = '<div class="featured-pubs-loading">No publications found.</div>';
    return;
  }
  // Try to use cached citation counts to rank.
  let cache = {};
  try {
    cache = JSON.parse(localStorage.getItem("cv-citation-cache") || "{}");
  } catch (e) {
  }
  const scored = pubs.map(function (p) {
    const entry = p.doi ? cache["doi:" + p.doi] : null;
    const citations = entry ? entry.count : 0;
    return {pub: p, citations: citations, year: parseInt(p.year) || 0};
  });
  // Sort by citations desc, then year desc.
  scored.sort(function (a, b) {
    if (b.citations !== a.citations) return b.citations - a.citations;
    return b.year - a.year;
  });
  const top = scored.slice(0, 5);
  carousel.innerHTML = "";
  top.forEach(function (s, idx) {
    const card = document.createElement("article");
    card.className = "featured-pub-card";
    const rank = document.createElement("div");
    rank.className = "featured-pub-rank";
    rank.textContent = idx + 1;
    card.appendChild(rank);
    const title = document.createElement("div");
    title.className = "featured-pub-title";
    title.textContent = s.pub.title;
    card.appendChild(title);
    if (s.pub.venue) {
      const venue = document.createElement("div");
      venue.className = "featured-pub-venue";
      venue.textContent = s.pub.venue;
      card.appendChild(venue);
    }
    const meta = document.createElement("div");
    meta.className = "featured-pub-meta";
    const citeSpan = document.createElement("span");
    citeSpan.className = "featured-pub-citations";
    citeSpan.innerHTML = '<i class="fas fa-quote-right" aria-hidden="true"></i>' + s.citations + " citations";
    meta.appendChild(citeSpan);
    if (s.pub.year) {
      const yearSpan = document.createElement("span");
      yearSpan.textContent = s.pub.year;
      meta.appendChild(yearSpan);
    }
    if (s.pub.doi) {
      const doiLink = document.createElement("a");
      doiLink.href = "https://doi.org/" + s.pub.doi;
      doiLink.target = "_blank";
      doiLink.rel = "noopener noreferrer";
      doiLink.textContent = "DOI";
      meta.appendChild(doiLink);
    }
    card.appendChild(meta);
    carousel.appendChild(card);
  });
}

// --- QR code (rendered inside the QR share popup) ---
function SetupQRCode() {
  const container = document.getElementById("qr-share-qr");
  const urlDisplay = document.getElementById("qr-share-url");
  // Use the canonical URL.
  const url = "https://hossambalaha.github.io/";
  if (urlDisplay) urlDisplay.textContent = url;
  if (!container) return;
  if (typeof QRCode === "undefined") {
    container.innerHTML = '<small style="color:var(--cv-text-muted)">QR unavailable</small>';
    return;
  }
  // Clear any previous QR (in case the function is re-run).
  container.innerHTML = "";
  new QRCode(container, {
    text: url,
    width: 168,
    height: 168,
    colorDark: "#024950",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.M
  });
}

// --- Speed-dial FAB menu (bottom-right) ---
// One main button that expands on hover (desktop) or click (touch/keyboard)
// to reveal QR share, copy email, and schedule meeting actions with a
// stagger animation. Closes on outside click, Escape, or after an item is
// clicked (for actions that open a popup, the popup handles the rest).
//
// Interaction model:
// - Desktop (pointer: fine): hovering the FAB area opens the menu. Moving
//   the mouse away closes it after a 300ms delay. Clicking the toggle
//   "pins" the menu open so it stays open even after mouse-leave; clicking
//   again unpins and closes it.
// - Touch (pointer: coarse): tap the toggle to open/close (no hover).
function SetupFabMenu() {
  const menu = document.getElementById("fab-menu");
  const toggle = document.getElementById("fab-menu-toggle");
  if (!menu || !toggle) return;
  const items = menu.querySelectorAll(".fab-menu-item");
  let isOpen = false;
  let pinnedByClick = false;  // True when the user clicked the toggle to pin the menu open.
  let hoverTimer = null;

  function open() {
    if (isOpen) return;
    isOpen = true;
    menu.setAttribute("data-open", "true");
    toggle.setAttribute("aria-expanded", "true");
  }

  function close() {
    if (!isOpen) return;
    isOpen = false;
    pinnedByClick = false;
    menu.setAttribute("data-open", "false");
    toggle.setAttribute("aria-expanded", "false");
  }

  function toggleMenu() {
    if (!isOpen) {
      // Menu is closed — open and pin it.
      pinnedByClick = true;
      open();
    } else if (!pinnedByClick) {
      // Menu was opened by hover (not pinned) — pin it open so it stays
      // open after the mouse leaves. This prevents the "hover opens, click
      // immediately closes" UX problem.
      pinnedByClick = true;
    } else {
      // Menu was pinned by a previous click — close it.
      close();
    }
  }

  // Click the main button toggles the menu.
  toggle.addEventListener("click", function (e) {
    e.stopPropagation();
    toggleMenu();
  });

  // Desktop: hover opens the menu (with a small delay so it doesn't flicker
  // when the mouse passes over). Mouse-leave closes it after a short delay —
  // UNLESS the user clicked to pin it open. Touch devices use click only.
  const isTouch = window.matchMedia("(pointer: coarse)").matches;
  if (!isTouch) {
    menu.addEventListener("mouseenter", function () {
      if (hoverTimer) {
        clearTimeout(hoverTimer);
        hoverTimer = null;
      }
      open();
    });
    menu.addEventListener("mouseleave", function () {
      if (hoverTimer) clearTimeout(hoverTimer);
      if (pinnedByClick) return;  // Don't close if pinned open by a click.
      hoverTimer = setTimeout(close, 300);
    });
  }

  // Close on outside click.
  document.addEventListener("click", function (e) {
    if (!isOpen) return;
    if (menu.contains(e.target)) return;
    close();
  });

  // Close on Escape.
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && isOpen) {
      close();
      toggle.focus();
    }
  });

  // After clicking an item, close the menu (the item's own click handler
  // opens the corresponding popup/modal).
  items.forEach(function (item) {
    item.addEventListener("click", function () {
      // Slight delay so the click handler on the item runs first.
      setTimeout(close, 100);
    });
  });
}

// --- Download Word FAB ---
// Wires the "Download Word" quick action to the export configuration modal.
function SetupDownloadWordFab() {
  const fab = document.getElementById("download-word-fab");
  if (!fab) return;
  fab.addEventListener("click", function () {
    if (typeof HandleWordDownloadClick === "function") {
      HandleWordDownloadClick();
    }
  });
}

// --- Avatar lightbox (More Avatars gallery) ---
// Wires up the avatar thumbnails in the #Photos section to open a full-
// screen lightbox when clicked. Supports next/prev navigation between
// avatars and closes on Escape / backdrop click / close button.
function SetupAvatarLightbox() {
  const photos = document.querySelectorAll("#Photos .resume-skill-item a[href]");
  if (photos.length === 0) return;
  const lightbox = document.getElementById("avatar-lightbox");
  if (!lightbox) return;
  const img = document.getElementById("avatar-lightbox-img");
  const caption = document.getElementById("avatar-lightbox-caption");
  const closeBtn = lightbox.querySelector(".avatar-lightbox-close");
  const prevBtn = lightbox.querySelector(".avatar-lightbox-prev");
  const nextBtn = lightbox.querySelector(".avatar-lightbox-next");
  let currentIdx = 0;
  const avatarData = [];

  photos.forEach(function (a, idx) {
    const href = a.getAttribute("href") || "";
    const thumb = a.querySelector("img");
    const alt = thumb ? thumb.getAttribute("alt") : "";
    avatarData.push({src: href, alt: alt});
    a.addEventListener("click", function (e) {
      e.preventDefault();
      currentIdx = idx;
      show();
    });
  });

  function show() {
    const data = avatarData[currentIdx];
    if (!data || !img) return;
    img.src = data.src;
    img.alt = data.alt || "Avatar";
    if (caption) caption.textContent = data.alt || ("Avatar " + (currentIdx + 1) + " of " + avatarData.length);
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(function () {
      lightbox.classList.add("is-visible");
    });
  }

  function hide() {
    lightbox.classList.remove("is-visible");
    setTimeout(function () {
      lightbox.hidden = true;
      document.body.style.overflow = "";
    }, 250);
  }

  function next() {
    currentIdx = (currentIdx + 1) % avatarData.length;
    show();
  }

  function prev() {
    currentIdx = (currentIdx - 1 + avatarData.length) % avatarData.length;
    show();
  }

  if (closeBtn) closeBtn.addEventListener("click", hide);
  if (nextBtn) nextBtn.addEventListener("click", next);
  if (prevBtn) prevBtn.addEventListener("click", prev);
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) hide();
  });
  document.addEventListener("keydown", function (e) {
    if (lightbox.hidden) return;
    if (e.key === "Escape") hide();
    else if (e.key === "ArrowRight") next();
    else if (e.key === "ArrowLeft") prev();
  });
}

// --- QR share popup (anchored above the QR FAB) ---
function SetupQrSharePopup() {
  const fab = document.getElementById("qr-share-fab");
  const popup = document.getElementById("qr-share-popup");
  if (!fab || !popup) return;
  const closeBtn = popup.querySelector(".qr-share-popup-close");
  const copyBtn = document.getElementById("qr-share-copy");
  const openBtn = document.getElementById("qr-share-open");
  const url = "https://hossambalaha.github.io/";

  function isMobile() {
    return window.matchMedia("(max-width: 768px)").matches;
  }

  function positionPopup() {
    // Center the popup on screen instead of positioning relative to the FAB.
    if (isMobile()) {
      const vw = document.documentElement.clientWidth;
      popup.style.width = (vw - 32) + "px";
      popup.style.left = "50%";
      popup.style.top = "50%";
      popup.style.transform = "translate(-50%, -50%)";
      popup.style.right = "auto";
    } else {
      popup.style.width = "";
      popup.style.left = "50%";
      popup.style.top = "50%";
      popup.style.transform = "translate(-50%, -50%)";
      popup.style.right = "auto";
    }
  }

  function open() {
    popup.hidden = false;
    fab.setAttribute("aria-expanded", "true");
    fab.classList.add("is-active");
    requestAnimationFrame(function () {
      positionPopup();
      // Render the QR code now (lazy) so we don't pay the qrcodejs cost up-front.
      if (!popup.dataset.qrRendered) {
        SetupQRCode();
        popup.dataset.qrRendered = "1";
      }
      const firstBtn = popup.querySelector("a, button:not(.qr-share-popup-close)");
      if (firstBtn) firstBtn.focus();
    });
  }

  function close() {
    popup.hidden = true;
    fab.setAttribute("aria-expanded", "false");
    fab.classList.remove("is-active");
    fab.focus();
  }

  fab.addEventListener("click", function () {
    if (popup.hidden) open(); else close();
  });
  if (closeBtn) closeBtn.addEventListener("click", close);
  if (copyBtn) copyBtn.addEventListener("click", function () {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).catch(function () {
      });
    } else {
      const ta = document.createElement("textarea");
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch (e) {
      }
      document.body.removeChild(ta);
    }
    const original = copyBtn.textContent;
    copyBtn.textContent = "Copied!";
    setTimeout(function () {
      copyBtn.textContent = original;
    }, 1500);
  });
  if (openBtn) openBtn.addEventListener("click", function () {
    window.open(url, "_blank", "noopener,noreferrer");
  });
  document.addEventListener("click", function (e) {
    if (popup.hidden) return;
    if (popup.contains(e.target) || fab.contains(e.target)) return;
    close();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !popup.hidden) close();
  });
  window.addEventListener("resize", function () {
    if (!popup.hidden) positionPopup();
  }, {passive: true});
  window.addEventListener("scroll", function () {
    if (!popup.hidden) positionPopup();
  }, {passive: true});
}

// --- ORCID publication sync (DISABLED) ---
// The "Sync from ORCID" button has been removed per user request.
// The functions are kept as no-ops so existing references don't throw.
function SetupORCIDSync() {
  // No-op — button removed.
}

function SyncFromORCID() {
  // No-op — button removed.
}

// --- Populate ScholarlyArticle + Course JSON-LD dynamically ---
function SetupSchemaOrgJSONLD() {
  // ScholarlyArticle: from each publication with a DOI.
  const pubs = CollectPublications();
  const graph = pubs.filter(function (p) {
    return p.doi;
  }).slice(0, 50).map(function (p) {
    return {
      "@type": "ScholarlyArticle",
      "headline": p.title,
      "datePublished": p.year,
      "isPartOf": {"@type": "PublicationIssue", "name": p.venue},
      "author": {"@type": "Person", "name": "Hossam Magdy Balaha"},
      "identifier": p.doi,
      "url": "https://doi.org/" + p.doi
    };
  });
  const scholarlyEl = document.getElementById("scholarly-jsonld");
  if (scholarlyEl) {
    scholarlyEl.textContent = JSON.stringify({"@context": "https://schema.org", "@graph": graph});
  }
  // Course: from YouTube-Courses section.
  const courses = [];
  document.querySelectorAll("#YouTube-Courses .resume-timeline-item, #YouTube-Courses .journal-item, #YouTube-Courses .course-card, #YouTube-Courses li").forEach(function (item) {
    const title = item.querySelector(".resume-position-title, .course-title, h3.course-title, h3, h4");
    const link = item.querySelector("a[href*='youtube.com'], a[href*='github.com']");
    if (!title) return;
    courses.push({
      "@type": "Course",
      "name": title.textContent.trim(),
      "provider": {"@type": "Organization", "name": "YouTube", "sameAs": "https://www.youtube.com"},
      "url": link ? link.href : ""
    });
  });
  const courseEl = document.getElementById("course-jsonld");
  if (courseEl) {
    courseEl.textContent = JSON.stringify({"@context": "https://schema.org", "@graph": courses});
  }
}

// ===========================================================================
// ACCESSIBILITY EXTRAS
// ===========================================================================

// --- Font size controls ---
function SetupFontSizeControls() {
  const buttons = document.querySelectorAll("[data-font-action]");
  if (buttons.length === 0) return;
  const root = document.documentElement;
  const saved = parseFloat(localStorage.getItem("cv-root-font-size") || "16");
  if (saved !== 16) {
    root.style.setProperty("--cv-root-font-size", saved + "px");
    root.style.fontSize = saved + "px";
  }
  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const action = btn.getAttribute("data-font-action");
      const current = parseFloat(getComputedStyle(root).fontSize);
      let next;
      if (action === "increase") {
        next = Math.min(24, current + 2);
      } else if (action === "decrease") {
        next = Math.max(12, current - 2);
      } else {
        next = 16;
      }
      root.style.setProperty("--cv-root-font-size", next + "px");
      root.style.fontSize = next + "px";
      localStorage.setItem("cv-root-font-size", String(next));
      const status = document.getElementById("search-match-status");
      if (status) {
        status.textContent = "Font size: " + next + "px";
        setTimeout(function () {
          status.textContent = "";
        }, 1500);
      }
    });
  });
}

// --- Dyslexia-friendly font toggle ---
function SetupDyslexiaFont() {
  const toggle = document.getElementById("a11y-dyslexia-toggle") || document.getElementById("dyslexia-font-toggle");
  if (!toggle) return;
  // Load Lexend font on first toggle (lazy-load to avoid upfront cost).
  let loaded = false;

  function ensureFont() {
    if (loaded) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700&display=swap";
    document.head.appendChild(link);
    loaded = true;
  }

  function syncToggle() {
    const on = document.body.classList.contains("dyslexia-font");
    if (toggle.classList.contains("a11y-switch")) {
      toggle.setAttribute("aria-checked", on ? "true" : "false");
    } else {
      toggle.setAttribute("aria-pressed", on ? "true" : "false");
    }
  }

  const saved = localStorage.getItem("cv-dyslexia-font") === "true";
  if (saved) {
    ensureFont();
    document.body.classList.add("dyslexia-font");
  }
  syncToggle();
  toggle.addEventListener("click", function () {
    ensureFont();
    const on = document.body.classList.toggle("dyslexia-font");
    localStorage.setItem("cv-dyslexia-font", on ? "true" : "false");
    syncToggle();
  });
}

// --- Text-to-speech (human-like, female-preferred voice) ---
// Picks a natural-sounding FEMALE English voice from the browser's voice
// list, splits the text into sentence-sized chunks, and speaks each chunk
// with inter-sentence pauses that vary by punctuation (longer after '.',
// shorter after ','; longer after paragraph breaks). Pitch and rate get
// a small per-chunk variation so the delivery doesn't sound monotone.
function SetupTextToSpeech() {
  const btn = document.getElementById("tts-button");
  // The accessibility menu also has a TTS trigger — wire it up.
  const menuBtn = document.getElementById("a11y-tts-btn");
  if (!btn && !menuBtn) return;
  if (!("speechSynthesis" in window)) {
    if (btn) {
      btn.disabled = true;
      btn.title = "Text-to-speech not supported in this browser";
      btn.style.opacity = "0.4";
    }
    if (menuBtn) {
      menuBtn.disabled = true;
      menuBtn.title = "Text-to-speech not supported in this browser";
    }
    return;
  }

  let speaking = false;
  let chunks = [];
  let chunkIdx = 0;
  let pickedVoice = null;
  let currentSectionName = "";

  // --- Caption overlay (movie-style subtitles) ---
  // Build a fixed-position overlay at the bottom of the viewport that
  // shows the text currently being read aloud. Created lazily on first
  // start() so we don't pay the DOM cost until the user actually uses TTS.
  let captionOverlay = null;
  let captionText = null;
  let captionSection = null;
  let captionProgressBar = null;
  let captionHideTimer = null;

  function ensureCaptionOverlay() {
    if (captionOverlay) return;
    captionOverlay = document.createElement("div");
    captionOverlay.className = "tts-caption-overlay";
    captionOverlay.setAttribute("role", "status");
    captionOverlay.setAttribute("aria-live", "polite");
    captionOverlay.hidden = true;
    captionOverlay.innerHTML =
      '<div class="tts-caption-bar">' +
      '<span class="tts-caption-indicator" aria-hidden="true"></span>' +
      '<span class="tts-caption-label">Now reading</span>' +
      '<span class="tts-caption-section"></span>' +
      '</div>' +
      '<div class="tts-caption-text"></div>' +
      '<div class="tts-caption-progress"><div class="tts-caption-progress-bar"></div></div>';
    document.body.appendChild(captionOverlay);
    captionText = captionOverlay.querySelector(".tts-caption-text");
    captionSection = captionOverlay.querySelector(".tts-caption-section");
    captionProgressBar = captionOverlay.querySelector(".tts-caption-progress-bar");
  }

  function showCaption(text) {
    ensureCaptionOverlay();
    if (captionHideTimer) {
      clearTimeout(captionHideTimer);
      captionHideTimer = null;
    }
    if (captionText) {
      // Fade out then in for a smooth subtitle transition.
      captionText.style.opacity = "0";
      setTimeout(function () {
        captionText.textContent = text;
        captionText.style.opacity = "1";
      }, 120);
    }
    if (captionSection) captionSection.textContent = currentSectionName ? "— " + currentSectionName : "";
    captionOverlay.hidden = false;
    // Force reflow so the transition runs.
    void captionOverlay.offsetWidth;
    captionOverlay.classList.add("is-visible");
    // Update the progress bar.
    if (captionProgressBar && chunks.length > 0) {
      captionProgressBar.style.width = Math.round((chunkIdx / chunks.length) * 100) + "%";
    }
  }

  function hideCaption() {
    if (!captionOverlay) return;
    captionOverlay.classList.remove("is-visible");
    // Delay hiding so the fade-out finishes.
    if (captionHideTimer) clearTimeout(captionHideTimer);
    captionHideTimer = setTimeout(function () {
      if (captionOverlay) captionOverlay.hidden = true;
    }, 350);
  }

  // Female voice preference list, ordered by naturalness. The first one
  // available on the user's OS/browser wins. Apple's Samantha, Microsoft's
  // Aria/Jenny, and Google's UK Female are widely considered the most
  // natural female English TTS voices.
  function loadVoices() {
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return;
    // Female voices first — preference order from most natural to least.
    const preferredNames = [
      // Microsoft natural female voices (Edge / Windows 11+).
      "Microsoft Aria Online (Natural) - English (United States)",
      "Microsoft Jenny Online (Natural) - English (United States)",
      "Microsoft Michelle Online (Natural) - English (United States)",
      "Microsoft Sonja Online (Natural) - English (United Kingdom)",
      "Microsoft Catherine Online (Natural) - English (Australia)",
      // Google female voices (Chrome on most platforms).
      "Google UK English Female",
      "Google US English",
      // Apple macOS / iOS natural female voices.
      "Samantha",
      "Karen",
      "Moira",
      "Tessa",
      "Serena",
      "Fiona",
      "Veena",
      // Legacy Microsoft female voices (older Windows).
      "Microsoft Zira Desktop - English (United States)",
      "Microsoft Hazel Desktop - English (United Kingdom)",
      "Microsoft Susan Desktop - English (United States)",
      "Microsoft Catherine Desktop - English (Australia)",
      // Female voices commonly found on Linux (espeak-ng / festival).
      "English (America) - Female",
      "English (Great Britain) - Female",
      "female-en",
      "english-female",
      "en-US Female",
      "en-GB Female"
    ];
    for (let i = 0; i < preferredNames.length; i++) {
      const v = voices.find(function (vc) {
        return vc.name === preferredNames[i];
      });
      if (v) {
        pickedVoice = v;
        return;
      }
    }
    // Heuristic fallback: pick any English voice whose name contains a
    // female cue ("female", "aria", "jenny", "samantha", "karen", "zira",
    // "hazel", "susan", "catherine", "tessa", "moira", "serena", "fiona").
    const femaleRegex = /female|aria|jenny|samantha|karen|zira|hazel|susan|catherine|tessa|moira|serena|fiona|veena|kate|sara|linda/i;
    const femaleVoice = voices.find(function (vc) {
      return vc.lang && vc.lang.indexOf("en") === 0 && femaleRegex.test(vc.name);
    });
    if (femaleVoice) {
      pickedVoice = femaleVoice;
      return;
    }
    // Final fallback: any English voice (will be male if nothing else).
    pickedVoice = voices.find(function (vc) {
      return vc.lang && vc.lang.indexOf("en") === 0;
    }) || voices[0];
  }

  loadVoices();
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }

  function getTargetSection() {
    const sections = document.querySelectorAll(".resume-section");
    for (let i = 0; i < sections.length; i++) {
      const rect = sections[i].getBoundingClientRect();
      if (rect.top < 200 && rect.bottom > 200) return sections[i];
    }
    return document.querySelector("#ProfessionalSummary") || document.querySelector(".resume-wrapper-inner");
  }

  function collectText(target) {
    // Capture the section name for the caption.
    const heading = target.querySelector(".resume-section-title");
    currentSectionName = heading ? heading.textContent.trim() : "";
    let text = (heading ? heading.textContent.trim() + ". " : "");
    // Use a paragraph separator the chunker can detect for longer pauses.
    const paras = target.querySelectorAll("p, .resume-position-title, .resume-company-name");
    let count = 0;
    paras.forEach(function (p) {
      if (count < 20) {
        // The "\n\n" between paragraphs signals a paragraph break.
        text += p.textContent.trim() + ". \n\n";
        count++;
      }
    });
    return text;
  }

  function splitIntoChunks(text) {
    // Split on sentence boundaries (. ? !), preserving the punctuation and
    // any paragraph break that follows. Group into ~200-char chunks so each
    // utterance is short enough to be expressive but long enough to avoid
    // choppy delivery.
    const sentences = text.match(/[^.!?]+[.!?]+(?:\s*\n\n|\s+|$)|[^.!?]+$/g) || [text];
    const chunks = [];
    let current = "";
    sentences.forEach(function (s) {
      s = s.trim();
      if (!s) return;
      // Detect paragraph breaks (double newline) — keep a marker so the
      // speaker inserts a longer pause after this chunk.
      const isParagraphEnd = /\n\n\s*$/.test(s) || /\.\s*\n\n/.test(s);
      const cleaned = s.replace(/\s+/g, " ").trim();
      if (current.length + cleaned.length + 1 < 200) {
        current = (current ? current + " " : "") + cleaned;
      } else {
        if (current) chunks.push(current);
        current = cleaned;
      }
      if (isParagraphEnd && current) {
        chunks.push(current);
        current = "";
      }
    });
    if (current) chunks.push(current);
    return chunks;
  }

  function speakNext() {
    if (!speaking) return;
    if (chunkIdx >= chunks.length) {
      speaking = false;
      setIconState(false);
      hideCaption();
      return;
    }
    const text = chunks[chunkIdx++];
    // Update the caption overlay with the current chunk.
    showCaption(text);
    const utterance = new SpeechSynthesisUtterance(text);
    if (pickedVoice) utterance.voice = pickedVoice;
    // Slightly slower than default + small pitch lift reads as warm/natural.
    utterance.rate = 0.94;
    // Subtle per-chunk pitch variation (±0.02 around 1.05) avoids the
    // monotone-run-on effect that long blocks of TTS produce.
    const pitchVar = 1.05 + (Math.sin(chunkIdx * 1.7) * 0.02);
    utterance.pitch = Math.max(0.9, Math.min(1.2, pitchVar));
    utterance.volume = 1;
    // Determine pause length after this chunk: longer for paragraph ends
    // (commas/periods at the end of a paragraph), shorter for mid-paragraph.
    let nextDelay = 220;
    if (/\.\s*$/.test(text) || /\?\s*$/.test(text) || /\!\s*$/.test(text)) {
      nextDelay = 380;  // sentence end
    }
    if (/\,\s*$/.test(text) || /\:\s*$/.test(text)) {
      nextDelay = 200;  // clause end
    }
    utterance.onend = function () {
      // Pause between chunks so the listener can absorb content.
      setTimeout(speakNext, nextDelay);
    };
    utterance.onerror = function () {
      speaking = false;
      setIconState(false);
      hideCaption();
    };
    window.speechSynthesis.speak(utterance);
  }

  function setIconState(isSpeaking) {
    if (btn) {
      const icon = btn.querySelector("i");
      if (icon) icon.className = isSpeaking ? "fas fa-volume-mute" : "fas fa-volume-up";
      if (isSpeaking) btn.classList.add("speaking"); else btn.classList.remove("speaking");
    }
    if (menuBtn) {
      const icon = menuBtn.querySelector("i");
      if (icon) icon.className = isSpeaking ? "fas fa-stop" : "fas fa-play";
      menuBtn.setAttribute("aria-label", isSpeaking ? "Stop reading" : "Read this section aloud");
    }
  }

  function start() {
    const target = getTargetSection();
    if (!target) return;
    let text = collectText(target);
    if (text.length > 3000) text = text.substring(0, 3000) + "...";
    chunks = splitIntoChunks(text);
    chunkIdx = 0;
    speaking = true;
    setIconState(true);
    speakNext();
  }

  function stop() {
    speaking = false;
    window.speechSynthesis.cancel();
    setIconState(false);
    hideCaption();
  }

  function toggle() {
    if (speaking) stop(); else start();
  }

  if (btn) btn.addEventListener("click", toggle);
  if (menuBtn) menuBtn.addEventListener("click", toggle);
  // Stop when leaving the page.
  window.addEventListener("beforeunload", function () {
    if (speaking) window.speechSynthesis.cancel();
    hideCaption();
  });
}

// --- Keyboard shortcut overlay + global shortcuts ---
function SetupShortcuts() {
  const overlay = document.getElementById("shortcuts-overlay");
  const closeBtn = overlay ? overlay.querySelector(".shortcuts-close") : null;
  const shortcutsBtn = document.getElementById("shortcuts-button") || document.getElementById("a11y-shortcuts-btn");

  function open() {
    if (overlay) {
      overlay.hidden = false;
    }
    const close = overlay ? overlay.querySelector(".shortcuts-close") : null;
    if (close) close.focus();
  }

  function close() {
    if (overlay) {
      overlay.hidden = true;
    }
    if (shortcutsBtn) shortcutsBtn.focus();
  }

  if (shortcutsBtn) shortcutsBtn.addEventListener("click", open);
  if (closeBtn) closeBtn.addEventListener("click", close);
  if (overlay) {
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) close();
    });
  }
  // Global keyboard shortcuts
  document.addEventListener("keydown", function (e) {
    // Ignore when typing in inputs.
    if (["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) return;
    // ? shows the overlay
    if (e.key === "?" && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      if (overlay && overlay.hidden) open(); else close();
      return;
    }
    // Esc closes the overlay
    if (e.key === "Escape" && overlay && !overlay.hidden) {
      close();
      return;
    }
    // D toggles dark mode
    if (e.key === "d" || e.key === "D") {
      const t = document.getElementById("theme-toggle");
      if (t) t.click();
    }
    // T reads aloud
    if (e.key === "t" || e.key === "T") {
      const tts = document.getElementById("tts-button");
      if (tts && !tts.disabled) tts.click();
    }
    // H toggles high contrast
    if (e.key === "h" || e.key === "H") {
      const hc = document.getElementById("high-contrast-toggle");
      if (hc) hc.click();
    }
    // G toggles dyslexia font
    if (e.key === "g" || e.key === "G") {
      const df = document.getElementById("dyslexia-font-toggle");
      if (df) df.click();
    }
    // B scrolls to top
    if (e.key === "b" || e.key === "B") {
      window.scrollTo({top: 0, behavior: "smooth"});
    }
    // + / = increases font; - / _ decreases. Chosen to avoid clashing with
    // common browser shortcuts that involve the letter F (Ctrl+F find, Alt+F
    // menu) and Firefox's type-ahead quick-find, which single letters trigger.
    if (e.key === "+" || e.key === "=") {
      const btn = document.querySelector("[data-font-action='increase']");
      if (btn) btn.click();
    }
    if (e.key === "-" || e.key === "_") {
      const btn = document.querySelector("[data-font-action='decrease']");
      if (btn) btn.click();
    }
    // J / K jump to previous / next section
    if (e.key === "j" || e.key === "J" || e.key === "k" || e.key === "K") {
      e.preventDefault();
      const sections = Array.from(document.querySelectorAll(".resume-section[id], [id].resume-section, div[id] h2.resume-section-title"));
      // Use headings with IDs
      const headings = Array.from(document.querySelectorAll("h2.resume-section-title, [id] h2.resume-section-title"));
      // Find current section.
      let currentIdx = -1;
      const viewportCenter = window.innerHeight / 2;
      for (let i = 0; i < headings.length; i++) {
        const rect = headings[i].getBoundingClientRect();
        if (rect.top > viewportCenter) {
          currentIdx = i - 1;
          break;
        }
        currentIdx = i;
      }
      const dir = (e.key === "j" || e.key === "J") ? -1 : 1;
      const nextIdx = Math.max(0, Math.min(headings.length - 1, currentIdx + dir));
      if (headings[nextIdx]) {
        headings[nextIdx].scrollIntoView({behavior: "smooth", block: "start"});
      }
    }
  });
}

// --- High-contrast mode toggle ---
function SetupHighContrastMode() {
  const toggle = document.getElementById("a11y-contrast-toggle") || document.getElementById("high-contrast-toggle");
  if (!toggle) return;

  function syncToggle() {
    const on = document.body.classList.contains("high-contrast");
    if (toggle.classList.contains("a11y-switch")) {
      toggle.setAttribute("aria-checked", on ? "true" : "false");
    } else {
      toggle.setAttribute("aria-pressed", on ? "true" : "false");
    }
  }

  const saved = localStorage.getItem("cv-high-contrast") === "true";
  if (saved) {
    document.body.classList.add("high-contrast");
  }
  syncToggle();
  toggle.addEventListener("click", function () {
    const on = document.body.classList.toggle("high-contrast");
    localStorage.setItem("cv-high-contrast", on ? "true" : "false");
    syncToggle();
  });
}

// --- Reading guide (desktop pointer only) ---
function SetupReadingGuide() {
  if (window.matchMedia("(pointer: coarse)").matches) return;
  const guide = document.createElement("div");
  guide.className = "reading-guide";
  guide.setAttribute("aria-hidden", "true");
  document.body.appendChild(guide);
  const enabled = localStorage.getItem("cv-reading-guide") === "true";
  if (enabled) document.body.classList.add("reading-guide-active");

  // Show/hide the indicator badge.
  function updateGuideIndicator() {
    const indicator = document.getElementById("reading-guide-indicator");
    if (!indicator) return;
    if (document.body.classList.contains("reading-guide-active")) {
      indicator.removeAttribute("hidden");
    } else {
      indicator.setAttribute("hidden", "");
    }
  }

  updateGuideIndicator();
  // Wire up the "turn off" button on the indicator.
  const turnOffBtn = document.getElementById("reading-guide-turn-off");
  if (turnOffBtn) {
    turnOffBtn.addEventListener("click", function () {
      document.body.classList.remove("reading-guide-active");
      localStorage.setItem("cv-reading-guide", "false");
      const mt = document.getElementById("a11y-guide-toggle");
      if (mt) mt.setAttribute("aria-checked", "false");
      updateGuideIndicator();
    });
  }
  // Wire up the accessibility-menu toggle for the reading guide.
  const menuToggle = document.getElementById("a11y-guide-toggle");
  if (menuToggle) {
    menuToggle.setAttribute("aria-checked", enabled ? "true" : "false");
    menuToggle.addEventListener("click", function () {
      const on = document.body.classList.toggle("reading-guide-active");
      localStorage.setItem("cv-reading-guide", on ? "true" : "false");
      menuToggle.setAttribute("aria-checked", on ? "true" : "false");
      updateGuideIndicator();
    });
  }
  // Toggle on Shift+R (not just R) to prevent accidental activation.
  // Previously, pressing 'R' alone would toggle the guide, which was too easy
  // to trigger by mistake while typing in the search box or navigating.
  document.addEventListener("keydown", function (e) {
    if (["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) return;
    if ((e.key === "r" || e.key === "R") && e.shiftKey) {
      e.preventDefault();
      const on = document.body.classList.toggle("reading-guide-active");
      localStorage.setItem("cv-reading-guide", on ? "true" : "false");
      if (menuToggle) menuToggle.setAttribute("aria-checked", on ? "true" : "false");
      updateGuideIndicator();
    }
  });
  let ticking = false;
  window.addEventListener("mousemove", function (e) {
    if (!document.body.classList.contains("reading-guide-active")) return;
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(function () {
        guide.style.top = (e.clientY - 14) + "px";
        ticking = false;
      });
    }
  }, {passive: true});
}

// --- Accessibility menu (consolidated popup) ---
// Opens the accessibility menu panel when the user clicks the
// "Accessibility" button in the global toolbar. The panel sits just
// under the toolbar (top-right of the viewport) and closes on outside
// click or Escape.
// Reset all preferences — clears all localStorage keys and reloads.
function ResetAllPreferences() {
  if (!confirm("Reset all preferences? This will clear dark mode, font size, reading guide, high contrast, dyslexia font, per-block buttons, and all cached data. The page will reload.")) return;
  const keysToRemove = [
    "cv-dark-mode", "cv-reading-guide", "cv-high-contrast", "cv-dyslexia-font",
    "cv-root-font-size", "cv-citation-cache", "cv-github-cache",
    "cv-debug"
  ];
  keysToRemove.forEach(function (key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
    }
  });
  // Also clear any other cv-* keys
  try {
    const allKeys = Object.keys(localStorage);
    allKeys.forEach(function (key) {
      if (key.startsWith("cv-")) {
        try {
          localStorage.removeItem(key);
        } catch (e) {
        }
      }
    });
  } catch (e) {
  }
  // Reload the page to apply defaults
  window.location.reload();
}

function SetupAccessibilityMenu() {
  const btn = document.getElementById("accessibility-menu-btn");
  const panel = document.getElementById("accessibility-menu-panel");
  if (!btn || !panel) return;

  function open() {
    panel.hidden = false;
    btn.setAttribute("aria-expanded", "true");
    btn.classList.add("is-active");
    // Focus the first interactive control inside the panel.
    const firstControl = panel.querySelector("button, a, [tabindex]:not([tabindex='-1'])");
    if (firstControl) {
      // Delay focus a frame so the visibility change has applied.
      requestAnimationFrame(function () {
        firstControl.focus();
      });
    }
  }

  function close() {
    panel.hidden = true;
    btn.setAttribute("aria-expanded", "false");
    btn.classList.remove("is-active");
    btn.focus();
  }

  btn.addEventListener("click", function (e) {
    e.stopPropagation();
    if (panel.hidden) open(); else close();
  });
  // Prevent clicks inside the panel from closing it via the document handler.
  panel.addEventListener("click", function (e) {
    e.stopPropagation();
  });
  // Close on outside click.
  document.addEventListener("click", function (e) {
    if (panel.hidden) return;
    if (panel.contains(e.target) || btn.contains(e.target)) return;
    close();
  });
  // Close on Escape.
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !panel.hidden) close();
  });
  // Reposition on resize — we use a fixed top/right position so the panel
  // stays anchored to the toolbar button.
  window.addEventListener("resize", function () {
    if (!panel.hidden) {
      // Keep the panel within the viewport bounds.
      const rect = panel.getBoundingClientRect();
      if (rect.right > window.innerWidth - 8) {
        panel.style.right = "8px";
        panel.style.left = "auto";
      }
    }
  }, {passive: true});
  // Wire up the Reset All Preferences button.
  const resetBtn = document.getElementById("a11y-reset-btn");
  if (resetBtn) {
    resetBtn.addEventListener("click", ResetAllPreferences);
  }
}

// ===========================================================================
// ANALYTICS & ENGAGEMENT
// ===========================================================================

// --- Plausible analytics stub ---
// Self-hosted Plausible or Umami can be wired up here by setting window.plausibleEndpoint.
function SetupAnalytics() {
  // If Plausible is already loaded via a script tag, nothing to do.
  if (window.plausible) return;
  // Stub: track events to console unless a real endpoint is configured.
  window.plausible = function (eventName, options) {
    options = options || {};
    if (window.plausibleEndpoint) {
      // Real Plausible custom event endpoint.
      try {
        fetch(window.plausibleEndpoint + "/api/event", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            name: eventName,
            url: window.location.href,
            domain: window.location.hostname,
            props: options.props || {}
          })
        }).catch(function () {
        });
      } catch (e) {
      }
    } else {
      CVLog.log("[Analytics stub]", eventName, options);
    }
  };
}

// --- Download tracking with section granularity ---
// Wraps the existing TrackAnalyticsEvent to also fire plausible events.
(function () {
  const original = window.TrackAnalyticsEvent;
  if (typeof original !== "function") return;
  window.TrackAnalyticsEvent = function (category, action, extras) {
    original.call(this, category, action);
    if (window.plausible) {
      const eventName = category + " — " + action;
      const props = {category: category, action: action};
      if (extras && typeof extras === "object") {
        for (const k in extras) {
          if (extras.hasOwnProperty(k)) props[k] = extras[k];
        }
      }
      try {
        window.plausible(eventName, {props: props});
      } catch (e) {
      }
    }
  };
})();

// --- Availability indicator ---
function SetupAvailabilityIndicator() {
  return;
  const el = document.getElementById("availability-indicator");
  const text = document.getElementById("availability-text");
  if (!el || !text) return;
  fetch("available-for.json", {cache: "no-cache"})
    .then(function (r) {
      return r.json();
    })
    .then(function (data) {
      el.classList.add("status-" + (data.status || "open"));
      const dot = el.querySelector(".availability-dot");
      if (dot && data.status === "closed") {
        // No pulse for closed.
      }
      const label = data.label || (data.status === "open" ? "Open to opportunities" : "Currently unavailable");
      text.textContent = label;
      el.hidden = false;
      if (data.details) el.title = data.details;
      if (window.plausible) {
        try {
          window.plausible("Availability View", {props: {status: data.status}});
        } catch (e) {
        }
      }
    })
    .catch(function () {
      // Silently hide — don't bother the user.
      el.hidden = true;
    });
}

// --- Schedule a Meeting modal (centered on screen, 50% width) ---
// Opens a real modal dialog centered on the viewport, with a backdrop that
// dims the rest of the page. The Calendly inline widget is lazy-loaded only
// when the modal opens and is given the full height of the modal body.
function SetupScheduleMeetingPopup() {
  const fab = document.getElementById("schedule-meeting-fab");
  const popup = document.getElementById("schedule-meeting-popup");
  const backdrop = document.getElementById("schedule-meeting-modal-backdrop");
  if (!fab || !popup) return;
  const calendlyLink = document.getElementById("schedule-meeting-calendly-link");
  const calendlyUrl = calendlyLink ? calendlyLink.getAttribute("href") : "https://calendly.com/h3ossam";
  const closeBtn = popup.querySelector(".schedule-meeting-popup-close");
  const body = document.getElementById("schedule-meeting-popup-body");
  const loadingEl = document.getElementById("schedule-meeting-popup-loading");
  let calendlyLoaded = false;

  function open() {
    if (backdrop) backdrop.hidden = false;
    popup.hidden = false;
    fab.setAttribute("aria-expanded", "true");
    fab.classList.add("is-active");
    // Lock page scroll while the modal is open.
    document.body.style.overflow = "hidden";
    // Focus the close button (first focusable) for keyboard users.
    requestAnimationFrame(function () {
      if (closeBtn) closeBtn.focus();
    });
    // Lazy-load the Calendly inline widget once the modal opens.
    if (!calendlyLoaded) {
      loadCalendlyWidget();
      calendlyLoaded = true;
    }
  }

  function close() {
    popup.hidden = true;
    if (backdrop) backdrop.hidden = true;
    fab.setAttribute("aria-expanded", "false");
    fab.classList.remove("is-active");
    // Restore page scroll.
    document.body.style.overflow = "";
    fab.focus();
  }

  function toggle() {
    if (popup.hidden) open(); else close();
  }

  function loadCalendlyWidget() {
    // Load the Calendly widget script if not already loaded.
    if (!document.querySelector('script[src*="assets.calendly.com"]')) {
      const s = document.createElement("script");
      s.src = "https://assets.calendly.com/assets/external/widget.js";
      s.async = true;
      document.body.appendChild(s);
    }

    // Once Calendly is available, initialize the inline widget inside the body.
    function initWidget() {
      if (typeof window.Calendly === "undefined" || !window.Calendly.initInlineWidget) {
        // Retry up to 25 times with 200ms back-off (5s total) — Calendly's
        // widget.js can take a moment to define window.Calendly.
        if ((initWidget._tries = (initWidget._tries || 0) + 1) <= 25) {
          setTimeout(initWidget, 200);
        } else {
          // Give up on the inline widget — show the "Open my Calendly" button
          // as a fallback. Hide the loading spinner.
          if (loadingEl) {
            loadingEl.innerHTML = '<i class="fas fa-exclamation-circle" aria-hidden="true"></i> Could not load the calendar inline. Please use the <strong>Open my Calendly</strong> button above.';
          }
        }
        return;
      }
      // Build a container for the inline widget if it doesn't exist.
      let widgetContainer = body ? body.querySelector(".calendly-inline-widget") : null;
      if (!widgetContainer) {
        widgetContainer = document.createElement("div");
        widgetContainer.className = "calendly-inline-widget";
        widgetContainer.setAttribute("data-url", calendlyUrl);
        if (body) body.appendChild(widgetContainer);
      }
      // Hide the loading placeholder once the widget is about to render.
      if (loadingEl) loadingEl.style.display = "none";
      // Force the container to fill the modal body before Calendly injects
      // its iframe. Calendly's widget.js reads the container's size and sets
      // the iframe height to match — so if the container is already at
      // 100% height, the iframe will follow.
      if (widgetContainer) {
        widgetContainer.style.cssText = "width:100% !important;height:100% !important;min-width:0 !important;min-height:0 !important;display:block !important;";
      }
      try {
        // Use initInlineWidget with a parentElement so the iframe fills the
        // container. The CSS !important rules above force the iframe to fill
        // the modal body's full width and height.
        window.Calendly.initInlineWidget({
          url: calendlyUrl,
          parentElement: widgetContainer,
          embedType: "Inline"
        });
        // After Calendly injects the iframe, re-apply our CSS overrides
        // in case Calendly set inline styles that conflict.
        setTimeout(function () {
          const iframe = widgetContainer ? widgetContainer.querySelector("iframe") : null;
          if (iframe) {
            iframe.style.cssText = "width:100% !important;height:100% !important;min-width:0 !important;min-height:0 !important;border:0 !important;display:block !important;position:absolute !important;top:0 !important;left:0 !important;right:0 !important;bottom:0 !important;";
          }
          // Also override any Calendly-created wrapper divs.
          const wrappers = widgetContainer ? widgetContainer.querySelectorAll("div") : [];
          wrappers.forEach(function (d) {
            d.style.minHeight = "0";
            d.style.height = "100%";
            d.style.width = "100%";
          });
        }, 500);
      } catch (e) {
        // If anything goes wrong, restore the loading placeholder with a
        // helpful message — the static Calendly link still works.
        if (loadingEl) {
          loadingEl.style.display = "";
          loadingEl.innerHTML = '<i class="fas fa-exclamation-circle" aria-hidden="true"></i> Could not load the calendar inline. Please use the <strong>Open my Calendly</strong> button above.';
        }
      }
    }

    initWidget();
  }

  fab.addEventListener("click", toggle);
  if (closeBtn) closeBtn.addEventListener("click", close);
  // Close when clicking on the backdrop (outside the popup).
  if (backdrop) {
    backdrop.addEventListener("click", function (e) {
      if (e.target === backdrop) close();
    });
  }
  // Close on Escape.
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !popup.hidden) close();
  });
}

// --- Calendly embed (legacy hook kept for backward compatibility) ---
function SetupCalendly() {
  // The Calendly widget is now loaded on demand by SetupScheduleMeetingPopup.
  // This stub remains so any external callers don't throw.
}

// --- Lazy-load Flickr embeds ---
function SetupLazyFlickr() {
  // Skip Flickr embeds entirely on file:// protocol — the embedr
  // script requires http(s) origin and throws "contentWindow is null" errors
  // when loaded from a local file. On production (https://), it works fine.
  if (window.location.protocol === "file:") {
    CVLog.log("Flickr embeds skipped: file:// protocol.");
    return;
  }
  const scripts = document.querySelectorAll('script[src*="embedr.flickr.com"]');
  if (scripts.length === 0) return;
  // Remove the original scripts (they auto-execute on load).
  const srcs = [];
  scripts.forEach(function (s) {
    srcs.push(s.src);
    s.parentNode.removeChild(s);
  });
  // Find the Flickr embed containers.
  let flickrContainers = document.querySelectorAll(".flickr-embed-frame, [data-flickr-embed]");
  if (flickrContainers.length === 0) {
    // If no specific containers, watch the whole footer area.
    flickrContainers = document.querySelectorAll("#Photos, #All-Photos");
  }
  if (flickrContainers.length === 0) {
    // No containers to observe — just reload the scripts.
    srcs.forEach(function (src) {
      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      document.body.appendChild(s);
    });
    return;
  }
  let loaded = false;

  function loadScripts() {
    if (loaded) return;
    loaded = true;
    srcs.forEach(function (src) {
      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      document.body.appendChild(s);
    });
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          loadScripts();
          observer.disconnect();
        }
      });
    }, {rootMargin: "200px"});
    flickrContainers.forEach(function (c) {
      observer.observe(c);
    });
  } else {
    // Fallback: load after window load event.
    window.addEventListener("load", loadScripts);
  }
}


// Hide Altmetric badges that show zero mentions (no social media attention).
function HideZeroAltmetricBadges() {
  const badges = document.querySelectorAll(".altmetric-embed");
  badges.forEach(function (badge) {
    // The Altmetric JS populates the badge asynchronously. Check after a delay.
    setTimeout(function () {
      const scoreEl = badge.querySelector(".altmetric-score, .altmetric-see-more");
      const text = badge.textContent || "";
      // If the badge shows "0" or has no content, hide it.
      if (text.match(/no\s+mentions|0\s*mentions|^0$/) || text.trim() === "" || text.trim() === "0") {
        badge.style.display = "none";
      }
      // Also check the donut SVG — if it has no fill color, hide.
      const donut = badge.querySelector("svg, img");
      if (donut && donut.getAttribute("data-badge-popover") === "right") {
        // Already populated — check the score.
        const score = badge.getAttribute("data-score") || "0";
        if (score === "0" || score === "") {
          badge.style.display = "none";
        }
      }
    }, 3000);  // Wait 3s for Altmetric JS to populate.
  });
}

// ===========================================================================
// INIT REGISTRATION
// ===========================================================================
// Append new setup calls to the existing InitializeUIEnhancements function.


// Profile image load/error handlers attached with addEventListener
// (avoids inline handlers, so CSP 'unsafe-inline' is not needed).
(function () {
  function setupProfileImageHandlers() {
    var img = document.querySelector('img.picture.rounded-circle');
    if (!img) return;
    img.addEventListener('load', function (e) {
      var parent = e.target.parentElement;
      if (parent) parent.classList.add('loaded');
    });
    img.addEventListener('error', function (e) {
      var parent = e.target.parentElement;
      if (parent) parent.classList.add('error');
    });
    // If the image is already loaded (cached), fire the load handler manually.
    if (img.complete && img.naturalWidth > 0) {
      var parent = img.parentElement;
      if (parent) parent.classList.add('loaded');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupProfileImageHandlers);
  } else {
    setupProfileImageHandlers();
  }
})();

// Ensure dynamically-generated target=_blank links get rel=noopener noreferrer.
// DataTables and other JS may rebuild <a> tags from data attributes; this observer catches them.
(function () {
  function patchLink(a) {
    if (a.target === "_blank" && (!a.rel || a.rel.indexOf("noopener") === -1)) {
      a.rel = (a.rel ? a.rel + " " : "") + "noopener noreferrer";
    }
  }

  function patchAll(root) {
    try {
      var links = (root || document).querySelectorAll('a[target="_blank"]');
      for (var i = 0; i < links.length; i++) patchLink(links[i]);
    } catch (e) {
    }
  }

  patchAll(document);
  if (typeof MutationObserver !== "undefined") {
    var obs = new MutationObserver(function (mutations) {
      for (var i = 0; i < mutations.length; i++) {
        var m = mutations[i];
        for (var j = 0; j < m.addedNodes.length; j++) {
          var node = m.addedNodes[j];
          if (node.nodeType === 1) {
            if (node.tagName === "A") patchLink(node);
            else if (node.querySelectorAll) patchAll(node);
          }
        }
      }
    });
    obs.observe(document.body || document.documentElement, {childList: true, subtree: true});
  }
})();

// ===========================================================================
// Per-block copy + read-aloud buttons.
// Every section header and timeline item gets a small toolbar with two
// buttons: Copy (copies that block's text to the clipboard) and Read Aloud
// (speaks just that block's text via the Web Speech API). Buttons appear on
// hover (desktop) or stay visible (touch devices).
// ===========================================================================
function SetupPerBlockActions() {
  // Don't run twice.
  if (document.querySelector('.block-action-toolbar')) return;

  // Body classes hide the buttons; the state persists in localStorage and
  // is wired up by SetupBlockActionToggles() (see below). Defaults: OFF.
  if (localStorage.getItem("cv-block-copy") !== "true") {
    document.body.classList.add("block-copy-off");
  }
  if (localStorage.getItem("cv-block-speak") !== "true") {
    document.body.classList.add("block-speak-off");
  }

  // CSS for the per-block toolbars.
  const css = `
    <style id="per-block-actions-css">
    .block-action-toolbar {
      display: inline-flex;
      gap: 2px;
      margin-left: 8px;
      vertical-align: middle;
      opacity: 0.4;
      transition: opacity 0.2s ease;
    }
    .block-action-toolbar:hover { opacity: 1; }
    .resume-section:hover .block-action-toolbar,
    .resume-timeline-item:hover .block-action-toolbar,
    .course-card:hover .block-action-toolbar,
    .repo-item:hover .block-action-toolbar,
    .volunteer-item:hover .block-action-toolbar,
    .journal-item:hover .block-action-toolbar,
    .role-card:hover .block-action-toolbar {
      opacity: 1;
    }
    /* Accessibility toggles: hide the per-block Copy / Read-aloud buttons.
       When both are off, hide the whole toolbar (nothing left to show). */
    body.block-copy-off .block-action-btn.block-action-copy { display: none !important; }
    body.block-speak-off .block-action-btn.block-action-speak { display: none !important; }
    body.block-copy-off.block-speak-off .block-action-toolbar { display: none !important; }
    .block-action-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 26px;
      height: 26px;
      border: 1px solid #cbd5e1;
      border-radius: 5px;
      background: #f8fafc;
      color: #475569;
      cursor: pointer;
      font-size: 11px;
      padding: 0;
      transition: all 0.15s ease;
      vertical-align: middle;
    }
    .block-action-btn:hover {
      background: #024950;
      color: #ffffff;
      border-color: #024950;
    }
    .block-action-btn:focus {
      outline: 2px solid #024950;
      outline-offset: 1px;
    }
    .block-action-btn.is-speaking {
      background: #ef4444;
      color: #ffffff;
      border-color: #ef4444;
      animation: block-action-pulse 1.2s ease-in-out infinite;
    }
    @keyframes block-action-pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.6; }
    }
    .block-action-btn.copied {
      background: #10b981;
      color: #ffffff;
      border-color: #10b981;
    }
    /* Dark mode adjustments */
    body.dark-mode .block-action-btn {
      background: #1f252e;
      color: #e8e6e3;
      border-color: #2d3340;
    }
    body.dark-mode .block-action-btn:hover {
      background: #f59e0b;
      color: #0f1419;
      border-color: #f59e0b;
    }
    /* Touch devices: always show toolbars (no hover) */
    @media (hover: none) and (pointer: coarse) {
      .block-action-toolbar { opacity: 1; }
    }
    /* Print: hide toolbars */
    @media print {
      .block-action-toolbar { display: none !important; }
    }
    </style>
  `;
  document.head.insertAdjacentHTML('beforeend', css);

  // Target selectors: section headers + individual items.
  // We attach the toolbar to the section title (h2.resume-section-title) and
  // to each timeline item header (.resume-timeline-item-header).
  const targets = [
    {
      selector: 'h2.resume-section-title',
      getText: (el) => el.closest('.resume-section') || el.parentElement,
      label: 'section'
    },
    {
      selector: '.resume-position-title',
      getText: (el) => el.closest('.resume-timeline-item') || el.parentElement,
      label: 'item'
    },
    {selector: '.course-card', getText: (el) => el, label: 'course'},
    {selector: '.repo-item', getText: (el) => el, label: 'repo'},
  ];

  targets.forEach(function (target) {
    document.querySelectorAll(target.selector).forEach(function (el) {
      // Skip if already has a toolbar.
      if (el.querySelector('.block-action-toolbar')) return;
      // Skip if the element is inside a template/hidden section.
      if (el.closest('[hidden]') || el.closest('template')) return;

      const toolbar = document.createElement('span');
      toolbar.className = 'block-action-toolbar';
      toolbar.setAttribute('role', 'group');
      toolbar.setAttribute('aria-label', 'Block actions');

      // Copy button.
      const copyBtn = document.createElement('button');
      copyBtn.type = 'button';
      copyBtn.className = 'block-action-btn block-action-copy';
      copyBtn.setAttribute('aria-label', 'Copy ' + target.label + ' text to clipboard');
      copyBtn.setAttribute('title', 'Copy to clipboard');
      copyBtn.innerHTML = '<i class="far fa-copy" aria-hidden="true"></i>';
      copyBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        const container = target.getText(el);
        const rawText = container ? container.textContent : '';
        // Clean up: collapse multiple spaces/newlines into single spaces, trim.
        const text = rawText.replace(/\s+/g, ' ').trim();
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(function () {
            showCopiedFeedback(copyBtn);
          }).catch(function () {
            // Fallback for older browsers / file://
            fallbackCopy(text);
            showCopiedFeedback(copyBtn);
          });
        } else {
          fallbackCopy(text);
          showCopiedFeedback(copyBtn);
        }
      });
      toolbar.appendChild(copyBtn);

      // Read-aloud button.
      const speakBtn = document.createElement('button');
      speakBtn.type = 'button';
      speakBtn.className = 'block-action-btn block-action-speak';
      speakBtn.setAttribute('aria-label', 'Read ' + target.label + ' aloud');
      speakBtn.setAttribute('title', 'Read aloud');
      speakBtn.innerHTML = '<i class="fas fa-volume-up" aria-hidden="true"></i>';
      speakBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        const container = target.getText(el);
        const rawText = container ? container.textContent : '';
        const text = rawText.replace(/\s+/g, ' ').trim();
        if (!text) return;
        // If already speaking, stop.
        if (window.speechSynthesis) {
          if (speakBtn.classList.contains('is-speaking')) {
            window.speechSynthesis.cancel();
            speakBtn.classList.remove('is-speaking');
            speakBtn.innerHTML = '<i class="fas fa-volume-up" aria-hidden="true"></i>';
            return;
          }
          // Cancel any other ongoing speech.
          window.speechSynthesis.cancel();
          // Reset all other speaking buttons.
          document.querySelectorAll('.block-action-btn.is-speaking').forEach(function (b) {
            b.classList.remove('is-speaking');
            b.innerHTML = '<i class="fas fa-volume-up" aria-hidden="true"></i>';
          });
          const utter = new SpeechSynthesisUtterance(text);
          utter.rate = 0.95;
          utter.pitch = 1;
          utter.onend = function () {
            speakBtn.classList.remove('is-speaking');
            speakBtn.innerHTML = '<i class="fas fa-volume-up" aria-hidden="true"></i>';
          };
          utter.onerror = function () {
            speakBtn.classList.remove('is-speaking');
            speakBtn.innerHTML = '<i class="fas fa-volume-up" aria-hidden="true"></i>';
          };
          speakBtn.classList.add('is-speaking');
          speakBtn.innerHTML = '<i class="fas fa-stop" aria-hidden="true"></i>';
          window.speechSynthesis.speak(utter);
        }
      });
      toolbar.appendChild(speakBtn);

      el.appendChild(toolbar);
    });
  });

  // Helper: show "copied!" feedback.
  function showCopiedFeedback(btn) {
    const original = btn.innerHTML;
    btn.classList.add('copied');
    btn.innerHTML = '<i class="fas fa-check" aria-hidden="true"></i>';
    setTimeout(function () {
      btn.classList.remove('copied');
      btn.innerHTML = original;
    }, 1500);
  }

  // Helper: fallback clipboard copy for file:// or older browsers.
  function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
    } catch (e) {
    }
    document.body.removeChild(ta);
  }
}

// --- Accessibility-menu toggles for the per-block action buttons ---
// Two switches in the accessibility menu ("Copy-to-clipboard buttons" and
// "Read-aloud buttons") show/hide the per-block Copy and Read Aloud buttons
// added by SetupPerBlockActions(). State persists in localStorage and is
// cleared by "Reset all preferences" (all cv-* keys). Defaults: OFF.
function SetupBlockActionToggles() {
  const copyToggle = document.getElementById("a11y-block-copy-toggle");
  const speakToggle = document.getElementById("a11y-block-speak-toggle");

  // Apply the saved state early so already-rendered toolbars hide instantly.
  if (localStorage.getItem("cv-block-copy") !== "true") {
    document.body.classList.add("block-copy-off");
  }
  if (localStorage.getItem("cv-block-speak") !== "true") {
    document.body.classList.add("block-speak-off");
  }

  function syncSwitch(toggle, on) {
    if (toggle) toggle.setAttribute("aria-checked", on ? "true" : "false");
  }

  syncSwitch(copyToggle, !document.body.classList.contains("block-copy-off"));
  syncSwitch(speakToggle, !document.body.classList.contains("block-speak-off"));

  if (copyToggle) {
    copyToggle.addEventListener("click", function () {
      const off = document.body.classList.toggle("block-copy-off");
      localStorage.setItem("cv-block-copy", off ? "false" : "true");
      syncSwitch(copyToggle, !off);
    });
  }
  if (speakToggle) {
    speakToggle.addEventListener("click", function () {
      const off = document.body.classList.toggle("block-speak-off");
      localStorage.setItem("cv-block-speak", off ? "false" : "true");
      syncSwitch(speakToggle, !off);
    });
  }
}


// Wrap acronyms in <abbr> tags for screen readers.
// This function walks all text nodes in the main content and wraps known
// acronyms in <abbr title="..."> tags. It skips <script>, <style>, <code>,
// <pre>, <textarea>, and <a> elements (to avoid breaking links).
// The <abbr> tags are transparent to the export pipeline — textContent
// includes their text, and the Word-friendly CSS strips their decoration.
function SetupAbbrAcronyms() {
  const acronyms = {
    "AI": "Artificial Intelligence",
    "ML": "Machine Learning",
    "DL": "Deep Learning",
    "CV": "Computer Vision",
    "DIP": "Digital Image Processing",
    "DOI": "Digital Object Identifier",
    "GTA": "Graduate Teaching Assistant",
    "RA": "Research Assistant",
    "TA": "Teaching Assistant",
    "ORCiD": "Open Researcher and Contributor ID",
    "WES": "World Education Services",
    "NSF": "National Science Foundation",
    "CITI": "Collaborative Institutional Training Initiative",
    "IEEE": "Institute of Electrical and Electronics Engineers",
    "NLP": "Natural Language Processing",
    "BERT": "Bidirectional Encoder Representations from Transformers",
    "CNN": "Convolutional Neural Network",
    "IoT": "Internet of Things",
    "IIoT": "Industrial Internet of Things",
    "AMD": "Age-related Macular Degeneration",
    "OCTA": "Optical Coherence Tomography Angiography",
    "MRI": "Magnetic Resonance Imaging",
    "CT": "Computed Tomography",
    "CAD": "Computer-Aided Diagnosis",
    "XAI": "Explainable Artificial Intelligence",
    "YOLO": "You Only Look Once",
    "GAN": "Generative Adversarial Network",
    "SHAP": "SHapley Additive exPlanations",
    "CAM": "Class Activation Map",
    "IHC": "Immunohistochemistry",
    "HER2": "Human Epideral growth factor Receptor 2",
    "DW-MRI": "Diffusion-Weighted Magnetic Resonance Imaging",
    "IVIM": "Intravoxel Incoherent Motion",
    "CBCT": "Cone Beam Computed Tomography",
    "SDLC": "Software Development Life Cycle",
    "FPGA": "Field-Programmable Gate Array",
    "VHDL": "VHSIC Hardware Description Language",
    "API": "Application Programming Interface",
    "AJAX": "Asynchronous JavaScript and XML",
    "ORM": "Object-Relational Mapping",
    "SQL": "Structured Query Language",
    "PHP": "PHP: Hypertext Preprocessor",
    "CSS": "Cascading Style Sheets",
    "HTML": "HyperText Markup Language",
    "JS": "JavaScript",
    "UI": "User Interface",
    "UX": "User Experience",
    "ATS": "Applicant Tracking System",
    "GPA": "Grade Point Average",
    "PDF": "Portable Document Format",
    "JSON": "JavaScript Object Notation",
    "XML": "eXtensible Markup Language",
    "SVG": "Scalable Vector Graphics",
    "URL": "Uniform Resource Locator",
    "HTTP": "HyperText Transfer Protocol",
    "HTTPS": "HyperText Transfer Protocol Secure",
    "CSP": "Content Security Policy",
    "SRI": "Subresource Integrity",
    "SW": "Service Worker",
    "PWA": "Progressive Web App",
    "SE": "Search Engine",
    "SEO": "Search Engine Optimization",
    "LHS": "Left-Hand Side",
    "RHS": "Right-Hand Side",
    "ECMAScript": "European Computer Manufacturers Association Script",
    "ES6": "ECMAScript 2015",
    "I-Corps": "Innovation Corps",
    "AIM-AHEAD": "Artificial Intelligence/Machine Learning Consortium to Advance Health Equity and Researcher Diversity",
    "IAPR": "International Association for Pattern Recognition",
    "BStP": "Biomedical Signal Processing and informatics",
    "UofL": "University of Louisville",
    "HR": "Human Resources",
    "MCQ": "Multiple Choice Question",
    "AECF": "Automatic Exam Correction Framework",
    "AHCR-DLS": "Arabic Handwritten Character Recognition Deep Learning System",
    "HMB-DLGAHA": "Hybrid Deep Learning and Genetic Algorithms Approach for Health Assessment",
    "HMB-HCF": "Hybrid COVID-19 Hybrid Framework",
    "CovH2SD": "COVID-19 Harris Hawks Optimization and Stacked Deep Learning",
    "LDD-VTS": "Lung Disease Diagnosis using Vision Transformers and SHAP",
    "XV-AMD": "Explainable Vision Transformer for Age-Related Macular Degeneration",
    "H-UDMIR": "Hybrid Unsupervised Deep Learning Framework for Medical Image Registration",
    "H2LFR": "Hybrid Two-Layered Feature Ranking",
    "ESARSA-MRFO-FS": "Expected SARSA Manta-ray Foraging Optimizer for Feature Selection",
    "DMDRDF": "Diabetes Mellitus and Retinopathy Detection Framework",
    "A3C-TL-GTO": "Asynchronous Advantage Actor-Critic Transfer Learning with Gorilla Troops Optimizer",
    "3D": "Three-Dimensional",
    "2D": "Two-Dimensional"
  };
  // Build a regex that matches any acronym as a whole word.
  // Sort by length (longest first) to match multi-word acronyms first.
  const sortedKeys = Object.keys(acronyms).sort(function (a, b) {
    return b.length - a.length;
  });
  const escapedKeys = sortedKeys.map(function (k) {
    return k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  });
  const regex = new RegExp("\\b(" + escapedKeys.join("|") + ")\\b", "g");

  // Skip these elements.
  const skipTags = new Set(["SCRIPT", "STYLE", "CODE", "PRE", "TEXTAREA", "NOSCRIPT", "TITLE", "ABBR", "OPTION"]);

  function wrapAcronymsInNode(node) {
    if (node.nodeType !== Node.TEXT_NODE) return;
    const text = node.textContent;
    if (!text || text.trim().length === 0) return;
    // Check if any acronym is in the text.
    if (!regex.test(text)) return;
    // Reset regex lastIndex.
    regex.lastIndex = 0;

    // Create a document fragment with the wrapped acronyms.
    const frag = document.createDocumentFragment();
    let lastIndex = 0;
    let match;
    while ((match = regex.exec(text)) !== null) {
      // Add text before the match.
      if (match.index > lastIndex) {
        frag.appendChild(document.createTextNode(text.substring(lastIndex, match.index)));
      }
      // Create the <abbr> element.
      const abbr = document.createElement("abbr");
      abbr.title = acronyms[match[1]] || match[1];
      abbr.textContent = match[1];
      frag.appendChild(abbr);
      lastIndex = match.index + match[1].length;
    }
    // Add remaining text.
    if (lastIndex < text.length) {
      frag.appendChild(document.createTextNode(text.substring(lastIndex)));
    }
    // Replace the original text node with the fragment.
    node.parentNode.replaceChild(frag, node);
  }

  function walkTextNodes(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        // Skip if parent is in skipTags.
        if (node.parentElement && skipTags.has(node.parentElement.tagName)) {
          return NodeFilter.FILTER_REJECT;
        }
        // Skip if inside an <abbr> already.
        if (node.parentElement && node.parentElement.tagName === "ABBR") {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes = [];
    let current;
    while ((current = walker.nextNode())) {
      nodes.push(current);
    }
    // Process in reverse order to avoid invalidating the walker's position.
    for (let i = nodes.length - 1; i >= 0; i--) {
      wrapAcronymsInNode(nodes[i]);
    }
  }

  // Run on the main content (not the modals/toolbars which have their own text).
  const mainContent = document.getElementById("main-content");
  if (mainContent) {
    walkTextNodes(mainContent);
  }
}


// Export the resume to Markdown format.
// Generates a clean Markdown document with headers, bullets, and links —
// suitable for GitHub README, Notion, or developer profiles.
function ExportToMarkdown() {
  try {
    TrackAnalyticsEvent("Export", "Markdown");
    TriggerDownloadWebhook("Markdown");
    let md = "";
    // Header
    md += "# Hossam Magdy Balaha\n\n";
    md += "**AI Engineer & Bioengineering Ph.D. Candidate**\n\n";
    md += "- Email: hmbala01@louisville.edu\n";
    md += "- Phone: +1 502-767-9991\n";
    md += "- Website: [https://hossambalaha.github.io/](https://hossambalaha.github.io/)\n";
    md += "- ORCiD: [0000-0002-0686-4411](https://orcid.org/0000-0002-0686-4411)\n";
    md += "- LinkedIn: [hossam-magdy-balaha](https://www.linkedin.com/in/hossam-magdy-balaha/)\n";
    md += "- GitHub: [HossamBalaha](https://github.com/HossamBalaha)\n";
    md += "- Google Scholar: [Profile](https://scholar.google.com/citations?user=S_EDE0QAAAAJ)\n";
    md += "- H-Index: 29 | Citations: 2,879+\n\n";
    md += "---\n\n";

    // Iterate over each section
    for (const [key, data] of Object.entries(SectionMapping)) {
      const sectionEl = document.getElementById(data.Id);
      if (!sectionEl) continue;
      const titleEl = sectionEl.querySelector("h2.resume-section-title");
      if (!titleEl) continue;
      const title = titleEl.textContent.trim().replace(/\s+/g, " ");
      md += "## " + title + "\n\n";

      // Extract items (resume-timeline-item, course-card, repo-item, etc.)
      const items = sectionEl.querySelectorAll(".resume-timeline-item, .course-card, .repo-item, .volunteer-item, .journal-item, .role-card");
      if (items.length === 0) {
        // Try skills/tags
        const tags = sectionEl.querySelectorAll(".skill-tag, .skill-pill, .tech-tag");
        if (tags.length > 0) {
          const tagTexts = [];
          tags.forEach(function (t) {
            const text = t.textContent.trim().replace(/\s+/g, " ");
            if (text && !tagTexts.includes(text)) tagTexts.push(text);
          });
          md += tagTexts.join(", ") + "\n\n";
        }
        continue;
      }

      items.forEach(function (item) {
        const posTitle = item.querySelector(".resume-position-title");
        const company = item.querySelector(".resume-company-name");
        const time = item.querySelector(".resume-position-time");
        const desc = item.querySelector(".resume-timeline-item-desc");

        if (posTitle) {
          md += "### " + posTitle.textContent.trim().replace(/\s+/g, " ") + "\n";
        }
        if (company) {
          md += "*" + company.textContent.trim().replace(/\s+/g, " ") + "*\n";
        }
        if (time) {
          md += "`" + time.textContent.trim().replace(/\s+/g, " ") + "`\n\n";
        }
        if (desc) {
          // Extract bullet points or paragraphs
          const bullets = desc.querySelectorAll("li");
          if (bullets.length > 0) {
            bullets.forEach(function (li) {
              const text = li.textContent.trim().replace(/\s+/g, " ");
              if (text) md += "- " + text + "\n";
            });
          } else {
            const text = desc.textContent.trim().replace(/\s+/g, " ");
            if (text) md += text + "\n\n";
          }
        }
        // Extract DOI/links
        const doiLink = item.querySelector("a[href*='doi.org']");
        if (doiLink) {
          md += "- DOI: [" + doiLink.getAttribute("href") + "](" + doiLink.getAttribute("href") + ")\n";
        }
        md += "\n";
      });
      md += "---\n\n";
    }

    // Create and trigger download
    const blob = new Blob([md], {type: "text/markdown;charset=utf-8"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Hossam_Magdy_Balaha_Resume.md";
    a.click();
    URL.revokeObjectURL(url);

    Swal.fire({
      icon: "success",
      title: "Markdown Export Complete",
      text: "Your resume has been successfully exported to Markdown format."
    });
  } catch (err) {
    CVLog.error("ExportToMarkdown failed:", err);
    ExportErrorToast("ExportToMarkdown", err);
  }
}

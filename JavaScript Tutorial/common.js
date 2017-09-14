var common = (function()
{
    "use strict";
    
    /////////////
    // Variables.
    /////////////
    
    // The array of navigation links. These will be modified when the subscription key information changes.
    var navigationArray;
    
    var uriBasePreRegion = "https://";
    var uriBasePostRegion = ".api.cognitive.microsoft.com/vision/";
    var uriBaseAnalyze = "v1.0/analyze";
    var uriBaseLandmark = "v1.0/models/landmarks/analyze";
    var uriBaseCelebrities = "v1.0/models/celebrities/analyze";
    var uriBaseThumbnail = "v1.0/generateThumbnail";
    var uriBaseOcr = "v1.0/ocr";
    var uriBaseHandwriting = "v1.0/recognizeText";

    
    var subscriptionChange = function()
    {
        // Build parameter string.
        var paramString = "?subscriptionKey=" + 
            encodeURIComponent(document.getElementById("subscriptionKeyInput").value) +
            "&subscriptionRegion=" + 
            encodeURIComponent(document.getElementById("subscriptionRegionSelect").value);
        
        // Update navagation links with new parameters.
        for (var i = 0; i < navigationArray.length; ++i)
        {
            // Get the URL from the navigation array.
            var urlString = navigationArray[i].href;
        
            // Check for existing URL parameters.
            var pos = urlString.indexOf("?");
            if (pos === -1)
            {
                // No URL parameters are attached to the navigation URLs.
                navigationArray[i].href = urlString + paramString;
            }
            else
            {
                // Trim off the existing URL parameters before adding the current parameters.
                navigationArray[i].href = urlString.substring(0, pos) + paramString
            }
        }
    };

    // Returns the value of the specified URL parameter.
    
    var getQueryVariable = function(paramaterName) 
    {
        // Get the URL parameters.
        var query = window.location.search.substring(1);
        
        // Split the parameters into a string array.
        var vars = query.split("&");
        
        // Parse the string array and return the value of the specified parameter.
        for (var i = 0; i < vars.length; ++i) 
        {
            var pair = vars[i].split("=");
            
            if (pair[0] === paramaterName)
            {
                // Return the value.
                return pair[1];
            }
        }
        
        // If the parameter wasn't found, return false.
        return(false);
    }

    
    // Displays an error when an image does not load.
    
    var imageLoadError = function()
    {
        $("#responseTextArea").val("Image load error.");
    }
    
    
    // Initializes the page.
    
    var init = function()
    {
        // Initialize the array of navigation links. 
        navigationArray = [
            document.getElementById("analyzeLink"),
            document.getElementById("analyzeLink"),
            document.getElementById("landmarkLink"),
            document.getElementById("celebritiesLink"),
            document.getElementById("thumbnailLink"),
            document.getElementById("ocrLink"),
            document.getElementById("handwritingLink")
        ];
        
        // Extract URL parameters into the subscription key elements.
        var subKey = getQueryVariable("subscriptionKey");
        if (subKey)
        {
            document.getElementById("subscriptionKeyInput").value = decodeURIComponent(subKey);
        }
        
        subKey = getQueryVariable("subscriptionRegion");
        if (subKey)
        {
            document.getElementById("subscriptionRegionSelect").value = decodeURIComponent(subKey);
        }
        
        subscriptionChange();
    };

    return {
        // Declare public members.
        init:                   init,
        getQueryVariable:       getQueryVariable,
        subscriptionChange:     subscriptionChange,
        imageLoadError:         imageLoadError,
        
        uriBasePreRegion:       uriBasePreRegion,
        uriBasePostRegion:      uriBasePostRegion,
        uriBaseAnalyze:         uriBaseAnalyze,
        uriBaseLandmark:        uriBaseLandmark,
        uriBaseCelebrities:     uriBaseCelebrities,
        uriBaseThumbnail:       uriBaseThumbnail,
        uriBaseOcr:             uriBaseOcr,
        uriBaseHandwriting:     uriBaseHandwriting
    };
})();


// Initialize the JavaScript code.

window.onload = common.init;

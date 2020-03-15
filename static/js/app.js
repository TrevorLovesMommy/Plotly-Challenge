/* Note to self - to run this code on your laptop, set up your local http server
through anaconda prompt, then open a browser and point to http://localhost:8000/ */

//Read in local json file.  
d3.json("samples.json").then((data) =>{

    //------------------- narrow down json object to samples and metadata -------------------
    var belly_samples = data.samples;
    // get the all samples
    console.log("here are all the samples");
    console.log(belly_samples);

    var metadata = data.metadata;
    // get the all metadata
    console.log("here are all the metadata");
    console.log(metadata);

    /// ---------------- Get Test Subject ID No's and populate pull downlist -----------

    //Get list of subject id's through data.names
    id_list = data.names;
    console.log('here are the names and id');
    console.log(id_list);  //this is a string not a number!!!

    //bind id_list to the pulldown menu
    d3.select("#selDataset")
        //selcting all option tags when they don't exist yet will set them up for a later append
        .selectAll("option")
        //bind data
        .data(id_list)
        //create placeholder for new data
        .enter()
        //append option placeholder
        .append("option")
        //for every element of id_list represented by d, insert html
        .html(function(d){
            return `<option value= ${d}>${d}</option>`;
        });

    //------------- get demographic info and populate Demographic Info Table ---------------------

    //Use D3 to create an event handler
    d3.selectAll("#selDataset").on("change", optionChanged);

    function optionChanged() {
        //use D3 to select the dropdown menu
        var dropdownMenu = d3.selectAll("#selDataset").node();
        //assign the dropdown menu item ID to avariable.  This is the parent node
        var dropdownMenuID = dropdownMenu.id;
        //assign the dropdown menu option to a variable.  This is the child node
        var selectedID = dropdownMenu.value;

        console.log(dropdownMenuID); //result is selDtaset
        console.log(selectedID); //result is a string like 940

        //filter metadata  based on selectedID
        //use partInt to convert the selectedID string into a number
        var filteredDataMeta = metadata.filter(meta => meta.id === parseInt(selectedID));
        //filter sample data based on selectedID
        //filter returns results in an ARRAY.  To get to the element in the array, use index [0]
        var filteredDataSample = belly_samples.filter(sample => sample.id === selectedID)[0];

        console.log("this is the filtered meta data");
        console.log(filteredDataMeta);

        console.log("this is the filteredDataSample");
        console.log(filteredDataSample);

        // ///populate the Demographic Info Module
        // d3.select("#sample-metadata")
        // .selectAll("p")
        // .data(filteredDataMeta)
        // .enter()
        // .append("p")
        // .html((d,i) => `${Object.keys(d)[i]}:  ${Object.values(d)[i]}`);       

        //populate the Demographic Info Module
        d3.select("#sample-metadata")
        .html("")
        .selectAll("p")
        .data(filteredDataMeta)
        .enter()
        .append("p")
        .html(function(d) {
            return `<p>${Object.keys(d)[0]}:  ${Object.values(d)[0]}</p>
                    <p>${Object.keys(d)[1]}:  ${Object.values(d)[1]}</p>
                    <p>${Object.keys(d)[2]}:  ${Object.values(d)[2]}</p>
                    <p>${Object.keys(d)[3]}:  ${Object.values(d)[3]}</p>
                    <p>${Object.keys(d)[4]}:  ${Object.values(d)[4]}</p>
                    <p>${Object.keys(d)[5]}:  ${Object.values(d)[5]}</p>
                    <p>${Object.keys(d)[6]}:  ${Object.values(d)[6]}</p>`
        });

        // --------------------------------- plot bar chart ------------------------------------

        //get the first 10 out_ids on the y axis
        var y_otu_ids = filteredDataSample.otu_ids.slice(0,10);
        //convert to strings
        var y_otu_ids_str = y_otu_ids.map(String);
        //prepend "OTU"
        var y_otu_ids_str = y_otu_ids_str.map(i => "otu " + i);
        //reverse order for descending order
        var y_otu_ids_str = y_otu_ids_str.reverse()
        console.log("this is y_out_ids");
        console.log(y_otu_ids);

        //get the first 10 sample values on the x axis
        var x_sample = filteredDataSample.sample_values.slice(0,10);
        //reverse order for descending order
        var x_sample = x_sample.reverse()
        console.log("this is x-sample");
        console.log(x_sample);

        //get first 10 otu_labels 
        var otu_labels = filteredDataSample.otu_labels.slice(0,10);
        //reverse order for descending order
        var otu_labels = otu_labels.reverse()
        console.log("this is otu_labels");
        console.log(otu_labels);

        //create trace
        var trace = {
            x: x_sample,
            y: y_otu_ids_str,
            text: otu_labels,
            type: "bar",
            orientation: "h"
        };
        // Create the data array for our plot
        var data = [trace];  

        //Define our plot layout
        var layout = {
          margin: {
            l: 75,
            r: 5,
            t: 5,
            b: 15
          }
        };
           
        //Plot the chart to a div tag with id "bar-plot"
           Plotly.newPlot("bar", data, layout);

        //--------------------------- plot bubble chart ---------
      
        //use otu_ids for the x values
        var otu_ids_all = filteredDataSample.otu_ids;
        console.log(otu_ids_all);
        //use sample_values for the y values
        var sample_values_all = filteredDataSample.sample_values;
        console.log(sample_values_all);
        //use otu_labels_all for the text values
        var otu_labels_all = filteredDataSample.otu_labels;
        console.log(otu_labels_all);

        var trace1 = {
            x: otu_ids_all,
            y: sample_values_all,

            mode: 'markers',
            marker: {
              size: sample_values_all,
              color: otu_ids_all,
              text: otu_labels_all
            }
        };
    
        var data1 = [trace1];
          
        var layout1 = {
          // title: 'Marker Size',
          showlegend: false,
          height: 400,
          width: 800
        };
          
        Plotly.newPlot("bubble", data1, layout1);
    }

}); //end d3.json






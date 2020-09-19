 // Use the D3 Library to read in samples.json

 d3.json("samples.json").then(function(data) {
     console.log(data)
 });

 // Drop Down menu
function create_dropdown(){
    var dropdown = d3.select("#selDataset")
    d3.json("samples.json").then(function(data) {
        var names = data.names;
        names.forEach(id => {
            dropdown.append("option")
            .text(id)
            .attr('value', id)
        });
    });
};

create_dropdown()

function optionChanged(new_selection){
     buildMetaData(new_selection)
     buildPlot(new_selection)
     buildBubble(new_selection)
     buildGauge(new_selection)
}

// // Display each key-value pair from metadata JSON object
function buildMetaData(selection) {
    d3.json("samples.json").then(function(data){
        var samples = data.metadata;
        // other charts will call data.sample
        //filter by whatever is chosen
        var new_array = samples.filter(sample => sample.id == selection);
        console.log(new_array);
        var div_tag = d3.select("#sample-metadata")
        div_tag.html("")
        Object.entries(new_array[0]).forEach(([key, value]) => div_tag.append("h3").text(`${key}: ${value}`));
     });
}

// // Horizontal Bar Chart- sample_values as values for bar chart, otu_ids as labels, otu_labels as hovertext; top 10 OTU's
function buildPlot(selection) {
    d3.json("samples.json").then(function(data){
        var samples = data.samples;
        var new_array = samples.filter(sample => sample.id == selection);
        var trace1 = {
            type: "bar",
            //slice for top 10 and order
            x: new_array[0].otu_ids.slice(0,10).reverse(),
            y: new_array[0].sample_values.slice(0,10).reverse(),
            orientation: "h"
        }
        var data = [trace1];
        var layout = {
            title: `top 10 OTUs`,
            xaxis: {
                title: "OTU IDs"
            },
            yaxis: {
                title: "Sample Values"
            }
            };
        Plotly.newPlot('bar', data, layout)
    });
}
optionChanged("940");

// // Bubble chart- otu's x values, sample_values for y & marker size, otu_id for marker color, otu_labels for text values
function buildBubble(selection) {
    d3.json("samples.json").then(function(data){
        var samples = data.samples;
        var new_array = samples.filter(sample => sample.id == selection);
        var trace1 = {
            type: "bubble",
            x: new_array[0].otu_ids,
            y: new_array[0].sample_values,
            mode: "markers",
            marker: {
                size: new_array[0].sample_values
            }
        }
        var data = [trace1];
        var layout = {
            title: `Bubble Chart`,
            xaxis: {
                title: "OTU IDs"
            },
            yaxis: {
                title: "Sample Values"
            }
            };
        Plotly.newPlot('bubble', data, layout)
    });
}

// Gauge Example
function buildGauge(selection) {
    d3.json("samples.json").then(function(data){
        var samples = data.metadata;
        var new_array = samples.filter(sample => sample.id == selection);
        var trace1 = {
            domain: { x: [0, 1], y: [0, 1] },
            type: "gauge",
            value: new_array[0].wfreq,
            type: "indicator",
            mode: "gauge+number+delta",
            gauge: {
                axis: { range: [null, 500] },
                steps: [
                  { range: [0, 250], color: "lightgray" },
                  { range: [250, 400], color: "gray" }
                ],
                threshold: {
                  line: { color: "red", width: 4 },
                  thickness: 0.75,
                }
            }
        }
        var data = [trace1];
        var layout = {
            title: `Belly Button Washing Frequency`
            };
        Plotly.newPlot('gauge', data, layout)
    });
}
export default {
    option: {
        tooltip: {
            theme: "dark"
        },
        labels: ["New", "Recurring"],
        legend: {
            labels: {
                colors: "#000"
            }
        },
        stroke: {
            show: false,
            width: 0
        },
        colors: ["#FF4560", "#FEB019"],
        plotOptions: {
            pie: {
                donut: {
                    size: "80%"
                }
            }
        },
        dataLabels: {
            enabled: true
        },
        chart: {
            width: "10%",
            toolbar: {
                show: true,
                offsetX: -20,
                offsetY: -38,
                tools: {
                    download: true,
                    selection: true,
                    zoom: true,
                    zoomin: true,
                    zoomout: true,
                    pan: true,
                    reset: true | '<img src="/static/icons/reset.png" width="20">',
                    customIcons: []
                }
            }
        }
    }
}
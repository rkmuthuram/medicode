export default {
    all: {
        tooltip: {
            theme: "dark"
        },
        labels: [
            "Panel Insurance",
            "Pay and Claim",
            "Free",
            "cash",
            "Perkeso",
            "Others"
        ],
        legend: {
            labels: {
                colors: "#000"
            }
        },
        stroke: {
            show: false,
            width: 0
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    offset: 0,
                    minAngleToShowLabel: 10
                }
            }
        },
        colors: [
            "#008FFB",
            "#FF4560",
            "#00E396",
            "#FEB019",
            "#775DD0",
            "#1483B6"
        ],
        dataLabels: {
            enabled: true
        },
        chart: {
            width: "10%",
            toolbar: {
                show: true,
                offsetX: -20,
                offsetY: -53,
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
    },
    allpanel: {
        tooltip: {
            theme: "dark"
        },
        labels: ["AIA", "Tricare", "Takaful", "PNS", "PNB"],
        legend: {
            labels: {
                colors: "#fff"
            }
        },
        stroke: {
            show: false,
            width: 0
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    offset: 0,
                    minAngleToShowLabel: 10
                }
            }
        },
        colors: [
            "#008FFB",
            "#FF4560",
            "#00E396",
            "#FEB019",
            "#775DD0",
            "#1483B6"
        ],
        dataLabels: {
            enabled: true
        },
        chart: {
            width: "10%",
            toolbar: {
                show: true,
                offsetX: -20,
                offsetY: -53,
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
    },
    others: {
        tooltip: {
            theme: "dark"
        },
        // labels: ["AIA", "Tricare", "Takaful", "PNS", "PNB"],
        legend: {
            labels: {
                colors: "#fff"
            }
        },
        stroke: {
            show: false,
            width: 0
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    offset: 0,
                    minAngleToShowLabel: 10
                }
            }
        },
        colors: [
            "#008FFB",
            "#FF4560",
            "#00E396",
            "#FEB019",
            "#775DD0",
            "#1483B6"
        ],
        dataLabels: {
            enabled: true
        },
        chart: {
            width: "10%",
            toolbar: {
                show: true,
                offsetX: -20,
                offsetY: -53,
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
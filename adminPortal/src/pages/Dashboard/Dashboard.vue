<template>
  <div>
    <b-row>
      <b-col>
        <h1 class="page-title">
          Dashboard
          <span class="fw-semi-bold"></span>
        </h1>
      </b-col>
    </b-row>
     <b-row>
      <b-col>
       <div class="link-container">
          <div class="linkD" v-for="link in links" :key="link.id" @click="navigate(link.function)"><i class="fa link-icon" :class="link.icon" :style="{color:link.color}"/><div class="link-text" :style="{color:link.color}"> <strong>{{link.name}}</strong> </div></div>
        </div>
      </b-col>
    </b-row>
     <br>
     <b-col xl="6">
    <Widget title="Gender" >

      <div id="chart" class="mt-0">
        <apexchart type="pie" height="280" :options="chartOption" :series="series"></apexchart>
      </div>
    </Widget>
       <Widget title="Gender" >

      <div id="chart" class="mt-0">
           <apexchart type="bar" height="350" :options="chartOptions2" :series="series2" ref="chart" />
      </div>
    </Widget>
       <Widget title="Gender" >

      <div id="chart" class="mt-0">
         <apexchart width="380" type="donut" :options="options3" :series="series3"></apexchart>
      </div>
    </Widget>
         <Widget title="Gender" >

      <div id="chart" class="mt-0">
         <apexchart width="500" type="line" :options="options3" :series="series3"></apexchart>

      </div>
    </Widget>
    
  </b-col>
  
  
  </div>
</template>

<script>
import Widget from "../../components/Widget/Widget.vue";


export default {
  components: { Widget },

  data() {
    return {
        options3: {},
      series3: [44, 55, 41, 17, 15],
           series: [120, 60],
          chartOptions2: {
        chart: {
          id: 'basic-bar'
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      },
      series2: [{
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }],
           chartOption: {
        tooltip: {
          theme: "dark"
        },
        labels: ["Male", "Female"],
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
        },
        colors: ["#F7C60B", "#E54D62"]
      },
        links: [
        {
          name: 'PRE CHECK-IN',
          color: '#F8AF0B',
          icon: 'fa-paste',
        },
        {
          name: 'CHECK-IN',
          color: '#593FCD',
          icon: 'fa-sign-in',
        },
        {
          name: 'CHECK OUT',
          color: '#C043D2',
          icon: 'fa-sign-out',
        },
        {
          name: 'INVENTORY',
          color: '#C043D2',
          icon: 'fa-database',
        },
        {
          name: 'ACCOUNTS',
          color: '#46CD5F',
          icon: 'fa-user',
          function: 'navigateToAccountListings'
        },
        {
          name: 'LOGOUT ',
          color: '#C42323',
          icon: 'fa-power-off',
          function: 'logout'
        },
        
      ],
    };
  },
mounted(){
        
 
  
  },
  methods: {
      

  }
};
</script>

<style scoped>
.sm {
  max-width: fit-content;
}
.headerPlace {
  position: absolute;
  top: 0%;
  right: 50px;
  margin-top: 10px;
  font-size: 12px;
  height: 20px;
}
.headerPlace.patient {
  right: 80px;
}
.completedUser {
  position: absolute;
  top: 0%;
  right: 50px;
  margin-top: 10px;
}
.page-title{
  color: white;
}

.link-container {
  height: fit-content;
  width: fit-content;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.linkD{
  height: 150px;
  width: 150px;
  background: white;
  border-radius: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin-right: 15px;
  margin-top: 15px;
  transition-duration: .5s;
  box-shadow: 1px 1px 5px #07070780;
}
.linkD:hover {
  box-shadow: 4px 4px 25px #0707078a;
  cursor: pointer;
  transition-duration: .5s;
}
.link-icon {
  font-size: 35px;
  margin-top: 10px;
}
.link-text {
  width: 100%;
  font-size: 11.5px;
  text-align: center;
  margin-top: 15px;
}
@media only screen and (max-width: 600px) {
  .link-container {
    width: 100vw;
  }
  .linkD {
    width: calc(50vw - 40px);
    height: calc(50vw - 35px);
    margin-right: 30px;
    margin-top: 30px;
  }
  .link-icon {
    font-size: 55px;
    margin-top: 20px;
  }
  .link-text {
    font-size: 15px;
    margin-top: 20px;
  }
}
</style>


<style src="./Dashboard.scss" lang="scss" />

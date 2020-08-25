<template>
  <div>
   <!-- <b-breadcrumb>
      <b-breadcrumb-item>YOU ARE HERE</b-breadcrumb-item>
      <b-breadcrumb-item active>Google Maps</b-breadcrumb-item>
    </b-breadcrumb> -->
    <h1 class="page-title">
     Track My Ads <span class="fw-semi-bold">LIVE</span>
    </h1>
    <b-row>
      <b-col lg="12" md="10">
        <Widget
                title="<h5><small class='text-muted'></small></h5>"
                customHeader close collapse
        >
          <GmapMap
                  :center="{lat: -37.813179, lng: 144.950259}"
                  :zoom="12"
                  style="width: 100%; height: 60vh"
          >
            <GmapMarker
                    :position="{lat: -37.813179, lng: 144.950259}"
            />
          </GmapMap>
        </Widget>
      </b-col>
    </b-row>
      <b-row>
          <b-col lg="3" sm="6" xs="12">
            <div class="pb-xlg h-100">
              <Widget class="h-100 mb-0" title="Visits Today" close>
                <div class="d-flex justify-content-between align-items-center mb-lg">
                  <h2>4,332</h2>
                  <i class="la la-arrow-right text-success rotate-315 visits-icon" />
                </div>
                <div class="d-flex flex-wrap justify-content-between">
                  <div class="mt">
                    <h6>+830</h6><p class="text-muted mb-0 mr"><small>Logins</small></p>
                  </div>
                  <div class="mt">
                    <h6>0.5%</h6><p class="text-muted mb-0"><small>Sign Out</small></p>
                  </div>
                  <div class="mt">
                    <h6>4.5%</h6><p class="text-muted mb-0 mr"><small>Rate</small></p>
                  </div>
                </div>
              </Widget>
            </div>
          </b-col>
          <b-col lg="3" sm="6" xs="12">
            <div class="pb-xlg h-100">
              <Widget class="h-100 mb-0" title="Revenue Breakdown" close>
                <b-row>
                  <b-col xs="12" md="6" lg="7" class="text-center">
                    <div ref="chartContainer" style="width: 100%; height: 100px" />
                  </b-col>
                  <b-col xs="12" md="5" lg="4" class="display-flex flex-column justify-content-center">
                    <div ref="chartLegend" />
                  </b-col>
                </b-row>
              </Widget>
            </div>
          </b-col>
          <b-col lg="3" sm="6" xs="12">
            <div class="pb-xlg h-100">
              <Widget class="h-100 mb-0" title="App Perfomance" close>
                <p class="text-muted d-flex flex-wrap">
                  <small class="mr-lg d-flex align-items-center">
                    <span class="circle bg-success text-success mr-xs" style="font-size: 4px;">
                      .
                    </span>
                    This Period
                  </small>
                  <small class="mr-lg d-flex align-items-center">
                    <span class="circle bg-warning text-warning mr-xs" style="font-size: 4px;">
                      .
                    </span>
                    Last Period
                  </small>
                </p>
                <h6>SDK</h6>
                <b-progress class="mb-xs" style="height: 5px"
                  variant="success" :value="60" :max="100" />
                <b-progress class="mb" style="height: 5px"
                  variant="warning" :value="35" :max="100" />
                <h6>Integration</h6>
                <b-progress class="mb-xs" style="height: 5px"
                  variant="success" :value="40" :max="100" />
                <b-progress style="height: 5px"
                  variant="warning" :value="55" :max="100" />
              </Widget>
            </div>
          </b-col>
          <b-col lg="3" sm="6" xs="12">
            <div class="pb-xlg h-100">
              <Widget class="h-100 mb-0" title="Server Overview" close>
                <div class="d-flex align-items-center mb-sm">
                  <p class="width-150"><small>60% / 37°С / 3.3 Ghz</small></p>
                  <div style="width: calc(100% - 150px)">
                    <trend
                      :data="getRandomData()"
                      :gradient="['#ffc247','#ff5932']"
                      auto-draw
                      stroke-width="6px"
                      smooth />
                  </div>
                </div>
                <div class="d-flex align-items-center mb-sm">
                  <p class="width-150"><small>54% / 31°С / 3.3 Ghz</small></p>
                  <div style="width: calc(100% - 150px)">
                    <trend
                      :data="getRandomData()"
                      :gradient="['#9964e3','#1c96e3']"
                      auto-draw
                      stroke-width="6px"
                      smooth />
                  </div>
                </div>
                <div class="d-flex align-items-center">
                  <p class="width-150"><small>57% / 21°С / 3.3 Ghz</small></p>
                  <div style="width: calc(100% - 150px)">
                    <trend
                      :data="getRandomData()"
                      :gradient="['#3abf94', '#2ac65d']"
                      auto-draw
                      stroke-width="6px"
                      smooth />
                  </div>
                </div>
              </Widget>
            </div>
          </b-col>
          <b-col xs="12">
            <MainChart />
          </b-col>
        </b-row>
  </div>
  
</template>

<script>
  import $ from 'jquery';
/* eslint-disable */
import 'imports-loader?jQuery=jquery,this=>window!flot';
import 'imports-loader?jQuery=jquery,this=>window!flot/jquery.flot.pie';
import 'imports-loader?jQuery=jquery,this=>window!flot/jquery.flot.resize';
/* eslint-enable */
import Widget from '@/components/Widget/Widget';
import MainChart from './components/MainChart/MainChart';
import BigStat from './components/BigStat/BigStat';
import TaskContainer from './components/TaskContainer/TaskContainer';



export default {
   name: 'Maps',
  components: {
    Widget, MainChart, BigStat, TaskContainer,
  },
  data() {
    return {
      mock,
      table: [{
        id: 0,
        name: 'Mark Otto',
        email: 'ottoto@wxample.com',
        product: 'ON the Road',
        price: '$25 224.2',
        date: '11 May 2017',
        city: 'Otsego',
        status: 'Sent',
      },
      {
        id: 1,
        name: 'Jacob Thornton',
        email: 'thornton@wxample.com',
        product: 'HP Core i7',
        price: '$1 254.2',
        date: '4 Jun 2017',
        city: 'Fivepointville',
        status: 'Sent',
      },
      {
        id: 2,
        name: 'Larry the Bird',
        email: 'bird@wxample.com',
        product: 'Air Pro',
        price: '$1 570.0',
        date: '27 Aug 2017',
        city: 'Leadville North',
        status: 'Pending',
      },
      {
        id: 3,
        name: 'Joseph May',
        email: 'josephmay@wxample.com',
        product: 'Version Control',
        price: '$5 224.5',
        date: '19 Feb 2018',
        city: 'Seaforth',
        status: 'Declined',
      },
      {
        id: 4,
        name: 'Peter Horadnia',
        email: 'horadnia@wxample.com',
        product: 'Let\'s Dance',
        price: '$43 594.7',
        date: '1 Mar 2018',
        city: 'Hanoverton',
        status: 'Sent',
      }],
      todos
    };
  },
  methods: {
    getRandomData() {
      const arr = [];

      for (let i = 0; i < 25; i += 1) {
        arr.push(Math.random().toFixed(1) * 10);
      }

      return arr;
    },
    getData() {
      const data = [];
      const seriesCount = 3;
      const accessories = ['SMX', 'Direct', 'Networks'];

      for (let i = 0; i < seriesCount; i += 1) {
        data.push({
          label: accessories[i],
          data: Math.floor(Math.random() * 100) + 1,
        });
      }

      return data;
    },
    initChart() {
      $.plot($(this.$refs.chartContainer), this.getData(), {
        series: {
          pie: {
            innerRadius: 0.8,
            show: true,
            fill: 0.5,
          },
        },
        colors: ['#ffc247', '#f55d5d', '#9964e3'],
        legend: {
          noColumns: 1,
          container: $(this.$refs.chartLegend),
          labelBoxBorderColor: '#ffffff'
        },
      });
    },
  },
  mounted() {
    this.initChart();

    window.addEventListener('resize', this.initChart);
  },
  unmounted() {
    window.removeEventListener('resize', this.initChart);
  },
  computed: {
    calendarAttributes() {
      return [
        // Today attribute
        {
          contentStyle: {
            fontWeight: '700',
            fontSize: '.9rem',
          },
          dates: new Date(),
        },
        // Attributes for todos
        ...this.todos.map(todo => ({
          dates: todo.dates,
          dot: {
            backgroundColor: todo.color,
            opacity: todo.isComplete ? 0.3 : 1,
          },
          popover: {
            label: todo.description,
          },
        })),
      ];
    },
  }
};
</script>

<style src="./LiveTracking.scss" lang="scss" scoped />

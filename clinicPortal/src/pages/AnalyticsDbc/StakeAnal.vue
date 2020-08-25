<template>
  <div>
    <b-row>
      <b-col>
        <Widget title="<h6> Settings </h6>" customHeader collapse>
          <b-form>
            <legend />
            <b-row>
              <b-col>
                <b-form-group
                  label="Date"
                  label-for="date"
                  label-class="text-md-right px-3"
                  label-cols="2"
                  breakpoint="md"
                >
                  <DatePicker
                    lang="en"
                    range
                    format="DD/MMM/YYYY"
                    input-class="form-control"
                    v-model="date"
                    id="datetimepicker"
                  >
                    <i class="glyphicon glyphicon-th" slot="calendar-icon" />
                  </DatePicker>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group
                  label="Categories"
                  label-for="centre"
                  label-class="text-md-right px-3"
                  label-cols="3"
                  breakpoint="md"
                >
                  <b-select
                    v-if="centreFilter[0].value == 'd'"
                    :options="centreFilter"
                    class="md"
                    id="categories"
                    v-model="categoriesSelect"
                    @change="resetToAllAll();;"
                  />
                  <b-select
                    v-if="centreFilter[0].value == 'a'"
                    :options="centreFilter"
                    class="md"
                    id="categories"
                    v-model="categoriesSelect"
                    @change="resetToAllAmpang();;"
                  />
                  <b-select
                    v-if="centreFilter[0].value == 'b'"
                    :options="centreFilter"
                    class="md"
                    id="categories"
                    v-model="categoriesSelect"
                    @change="resetToAllBangi();"
                  />
                  <b-select
                    v-if="centreFilter[0].value == 'c'"
                    :options="centreFilter"
                    class="md"
                    id="categories"
                    v-model="categoriesSelect"
                    @change="resetToAllTtdi();"
                  />
                </b-form-group>
                <b-form-group
                  v-if="categoriesSelect[0].text !== 'All(Ampang)' && categoriesSelect[0].text !== 'All(Bangi)' && categoriesSelect[0].text !== 'All(Ttdi)'&& categoriesSelect[0].text !== 'All(All)'"
                  label="Sub-Categories"
                  label-for="centre"
                  label-class="text-md-right px-3"
                  label-cols="3"
                  breakpoint="md"
                >
                  <b-select
                    :options="categoriesSelect"
                    class="md"
                    id="sub-categories"
                    v-model="subCategoriesSelect"
                  />
                </b-form-group>
              </b-col>

              <b-col>
                <b-form-group
                  label="Centre"
                  label-for="centre"
                  label-class="text-md-right px-3"
                  label-cols="2"
                  breakpoint="md"
                >
                  <b-select
                    :options="filterCentre"
                    class="md"
                    id="centre-stake"
                    v-model="centreFilter"
                  />
                </b-form-group>
              </b-col>
            </b-row>
          </b-form>
        </Widget>
      </b-col>
    </b-row>
    <b-row>
      <stake-payment
        :series="subCategoriesSelect.payment"
        :options="paymentOption.all"
        v-show="subCategoriesSelect == stakeAmpang.allCat || subCategoriesSelect == stakeBangi.allCat || subCategoriesSelect == stakeTtdi.allCat || subCategoriesSelect == stakeAll.allCat"
      />
      <stake-payment
        :series="subCategoriesSelect.payment"
        :options="paymentOption.allpanel"
        v-show="subCategoriesSelect == stakeAmpang.allpanel || subCategoriesSelect == stakeBangi.allpanel || subCategoriesSelect == stakeTtdi.allpanel || subCategoriesSelect == stakeAll.allpanel"
      />
      <stake-payment
        :series="subCategoriesSelect.payment"
        :options="paymentOption.others"
        v-show="subCategoriesSelect !== stakeAmpang.allpanel && subCategoriesSelect !== stakeAmpang.allCat && subCategoriesSelect !== stakeBangi.allCat && subCategoriesSelect !== stakeBangi.allpanel && subCategoriesSelect !== stakeTtdi.allCat && subCategoriesSelect !== stakeTtdi.allpanel && subCategoriesSelect !== stakeAll.allCat && subCategoriesSelect !== stakeAll.allpanel"
      />
      <!-- <span v-if="subCategoriesSelect == stakeAmpang.allpanel">
        <stake-payment :series="subCategoriesSelect.payment" :options="paymentOption.allpanel" />
      </span>-->
      <stake-gender :series="subCategoriesSelect.gender" />
    </b-row>
    <b-row>
      <b-col>
        <div class="tabss mb-0">
          <div
            variant="inverse"
            v-for="tab in tabs"
            :key="tab.id"
            class="tabs-button"
            :class="[ { active: currentTab === tab.component }]"
            @click="currentTab = tab.component"
          >{{tab.name}}</div>
        </div>
        <div class="tabs-content">
          <stake-work :series="subCategoriesSelect.work" v-if="currentTab == 'work'" />
          <stake-age :series="subCategoriesSelect.age" v-if="currentTab == 'age'" />
          <stake-programs :series="subCategoriesSelect.programs" v-if="currentTab == 'programs'" />
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Widget from '../../components/Widget/Widget.vue'
import StakePrograms from "./Stake/StakePrograms.vue";
import StakeAge from "./Stake/StakeAge.vue";
import StakeWork from "./Stake/StakeWork.vue";
import StakeGender from "./Stake/StakeGender.vue";
import StakePayment from "./Stake/StakePayment.vue";
import InternalOverall from "./Internal/InternalOverall.vue";
import InternalRecovery from "./Internal/InternalRecovery.vue";
import TotalFeedback from "./Internal/TotalFeedback.vue";

import InternalCase from "./Internal/InternalCase.vue";
import InternalHosp from "./Internal/InternalHosp.vue";
import InternalDoc from "./Internal/InternalDoc.vue";
import ExportButton from "./exportButton.vue";

import exposure from "./script/exposureOption";
import paymentOption from "./script/paymentOption";

import stakeAmpang from "./stakeAmpang";
import stakeBangi from "./stakeBangi";
import stakeTtdi from "./stakeTtdi";
import stakeAll from "./stakeAll";

import internalBangi from "./internalBangi";
import internalAmpang from "./internalAmpang";
import internalTtdi from "./internalTtdi";

import DatePicker from "vue2-datepicker";

export default {
  components: {
    DatePicker,
    ExportButton,
    InternalDoc,
    InternalHosp,
    InternalCase,
    TotalFeedback,
    InternalRecovery,
    InternalOverall,
    StakePayment,
    StakeGender,
    StakeWork,
    StakeAge,
    StakePrograms, Widget
  },
  data() {
    return {
      date: null,
      paymentOption: paymentOption,
      centreFilter: [
        { value: "d", text: "--Please Select--", disabled: true },
        {
          value: [{ value: stakeAll.allCat, text: "All(All)" }],
          text: "All"
        },
        {
          value: [
            { value: stakeAll.allpanel, text: "All" },
            { value: stakeAll.aia, text: "AIA" },
            { value: stakeAll.tricare, text: "Tricare" },
            { value: stakeAll.takaful, text: "Takaful" },
            { value: stakeAll.pns, text: "PNS" },
            { value: stakeAll.pnb, text: "PNB" }
          ],
          text: "Panel Insurance"
        },
        {
          value: [
            { value: stakeAll.allpanel2, text: "All" },
            { value: stakeAll.aia2, text: "AIA" },
            { value: stakeAll.tricare2, text: "Tricare" },
            { value: stakeAll.takaful2, text: "Takaful" },
            { value: stakeAll.pns2, text: "PNS" },
            { value: stakeAll.pnb2, text: "PNB" }
          ],
          text: "Pay and Claim"
        },
        {
          value: [{ value: stakeAll.free, text: "All" }],
          text: "Free"
        },
        {
          value: [{ value: stakeAll.cash, text: "All" }],
          text: "Cash"
        },
        {
          value: [{ value: stakeAll.perkeso, text: "All" }],
          text: "PERKESO"
        },
        {
          value: [{ value: stakeAll.others, text: "All" }],
          text: "Others"
        }
      ],
      categoriesSelect: [{ value: stakeAll.allCat, text: "All(All)" }],
      subCategoriesSelect: stakeAll.allCat,

      currentTab: "work",

      stakeAmpang: stakeAmpang,
      stakeBangi: stakeBangi,
      stakeTtdi: stakeTtdi,
      stakeAll: stakeAll,
      // stakeData: stakeData,

      exposure: exposure,

      internalAmpang: internalAmpang,
      internalBangi: internalBangi,
      internalTtdi: internalTtdi,

      pie: [],
      doc: [],
      hosp: [],
      internalAll: {},

      tabs: [
        {
          name: "Work Category",
          component: "work"
        },
        {
          name: "Age Group",
          component: "age"
        },
        {
          name: "DBC Programs",
          component: "programs"
        }
      ],

      filterCentre: [
        {
          value: [
            { value: "d", text: "--Please Select--", disabled: true },
            {
              value: [{ value: stakeAll.allCat, text: "All(All)" }],
              text: "All"
            },
            {
              value: [
                { value: stakeAll.allpanel, text: "All" },
                { value: stakeAll.aia, text: "AIA" },
                { value: stakeAll.tricare, text: "Tricare" },
                { value: stakeAll.takaful, text: "Takaful" },
                { value: stakeAll.pns, text: "PNS" },
                { value: stakeAll.pnb, text: "PNB" }
              ],
              text: "Panel Insurance"
            },
            {
              value: [
                { value: stakeAll.allpanel2, text: "All" },
                { value: stakeAll.aia2, text: "AIA" },
                { value: stakeAll.tricare2, text: "Tricare" },
                { value: stakeAll.takaful2, text: "Takaful" },
                { value: stakeAll.pns2, text: "PNS" },
                { value: stakeAll.pnb2, text: "PNB" }
              ],
              text: "Pay and Claim"
            },
            {
              value: [{ value: stakeAll.free, text: "All" }],
              text: "Free"
            },
            {
              value: [{ value: stakeAll.cash, text: "All" }],
              text: "Cash"
            },
            {
              value: [{ value: stakeAll.perkeso, text: "All" }],
              text: "PERKESO"
            },
            {
              value: [{ value: stakeAll.others, text: "All" }],
              text: "Others"
            }
          ],
          text: "All"
        },
        {
          value: [
            { value: "a", text: "--Please Select--", disabled: true },
            {
              value: [{ value: stakeAmpang.allCat, text: "All(Ampang)" }],
              text: "All"
            },
            {
              value: [
                { value: stakeAmpang.allpanel, text: "All" },
                { value: stakeAmpang.aia, text: "AIA" },
                { value: stakeAmpang.tricare, text: "Tricare" },
                { value: stakeAmpang.takaful, text: "Takaful" },
                { value: stakeAmpang.pns, text: "PNS" },
                { value: stakeAmpang.pnb, text: "PNB" }
              ],
              text: "Panel Insurance"
            },
            {
              value: [
                { value: stakeAmpang.allpanel2, text: "All" },
                { value: stakeAmpang.aia2, text: "AIA" },
                { value: stakeAmpang.tricare2, text: "Tricare" },
                { value: stakeAmpang.takaful2, text: "Takaful" },
                { value: stakeAmpang.pns2, text: "PNS" },
                { value: stakeAmpang.pnb2, text: "PNB" }
              ],
              text: "Pay and Claim"
            },
            {
              value: [{ value: stakeAmpang.free, text: "All" }],
              text: "Free"
            },
            {
              value: [{ value: stakeAmpang.cash, text: "All" }],
              text: "Cash"
            },
            {
              value: [{ value: stakeAmpang.perkeso, text: "All" }],
              text: "PERKESO"
            },
            {
              value: [{ value: stakeAmpang.others, text: "All" }],
              text: "Others"
            }
          ],
          text: "Ampang"
        },
        {
          value: [
            { value: "b", text: "--Please Select--", disabled: true },
            {
              value: [{ value: stakeBangi.allCat, text: "All(Bangi)" }],
              text: "All"
            },
            {
              value: [
                { value: stakeBangi.allpanel, text: "All" },
                { value: stakeBangi.aia, text: "AIA" },
                { value: stakeBangi.tricare, text: "Tricare" },
                { value: stakeBangi.takaful, text: "Takaful" },
                { value: stakeBangi.pns, text: "PNS" },
                { value: stakeBangi.pnb, text: "PNB" }
              ],
              text: "Panel Insurance"
            },
            {
              value: [
                { value: stakeBangi.allpanel2, text: "All" },
                { value: stakeBangi.aia2, text: "AIA" },
                { value: stakeBangi.tricare2, text: "Tricare" },
                { value: stakeBangi.takaful2, text: "Takaful" },
                { value: stakeBangi.pns2, text: "PNS" },
                { value: stakeBangi.pnb2, text: "PNB" }
              ],
              text: "Pay and Claim"
            },
            {
              value: [{ value: stakeBangi.free, text: "All" }],
              text: "Free"
            },
            {
              value: [{ value: stakeBangi.cash, text: "All" }],
              text: "Cash"
            },
            {
              value: [{ value: stakeBangi.perkeso, text: "All" }],
              text: "PERKESO"
            },
            {
              value: [{ value: stakeBangi.others, text: "All" }],
              text: "Others"
            }
          ],
          text: "Bangi"
        },
        {
          value: [
            { value: "c", text: "--Please Select--", disabled: true },
            {
              value: [{ value: stakeTtdi.allCat, text: "All(Ttdi)" }],
              text: "All"
            },
            {
              value: [
                { value: stakeTtdi.allpanel, text: "All" },
                { value: stakeTtdi.aia, text: "AIA" },
                { value: stakeTtdi.tricare, text: "Tricare" },
                { value: stakeTtdi.takaful, text: "Takaful" },
                { value: stakeTtdi.pns, text: "PNS" },
                { value: stakeTtdi.pnb, text: "PNB" }
              ],
              text: "Panel Insurance"
            },
            {
              value: [
                { value: stakeTtdi.allpanel2, text: "All" },
                { value: stakeTtdi.aia2, text: "AIA" },
                { value: stakeTtdi.tricare2, text: "Tricare" },
                { value: stakeTtdi.takaful2, text: "Takaful" },
                { value: stakeTtdi.pns2, text: "PNS" },
                { value: stakeTtdi.pnb2, text: "PNB" }
              ],
              text: "Pay and Claim"
            },
            {
              value: [{ value: stakeTtdi.free, text: "All" }],
              text: "Free"
            },
            {
              value: [{ value: stakeTtdi.cash, text: "All" }],
              text: "Cash"
            },
            {
              value: [{ value: stakeTtdi.perkeso, text: "All" }],
              text: "PERKESO"
            },
            {
              value: [{ value: stakeTtdi.others, text: "All" }],
              text: "Others"
            }
          ],
          text: "Ttdi"
        }
      ],
      //

      reportsFields: [
        "name",
        { key: "center", class: "text-center" },
        { key: "time", label: "time left", class: "text-center" },
        { key: "action", class: "text-center" }
      ],
      reports: [
        { name: "Roy", center: "Ampang", time: "2 min" },
        { name: "Vin", center: "Ampang", time: "3 h" },
        { name: "Diesel", center: "Ampang", time: "24 h" },
        { name: "Jerax", center: "Ampang", time: "32 h" },
        { name: "Topson", center: "Ampang", time: "48 h" }
      ]
    };
  },
  methods: {
    resetToAllAmpang() {
      let found = this.categoriesSelect.some(item => {
        return item.text == "All(Ampang)";
      });
      this.subCategoriesSelect = found
        ? stakeAmpang.allCat
        : stakeAmpang.allCat;
    },
    resetToAllBangi() {
      let found = this.categoriesSelect.some(item => {
        return item.text == "All(Bangi)";
      });
      this.subCategoriesSelect = found ? stakeBangi.allCat : stakeBangi.allCat;
    },
    resetToAllTtdi() {
      let found = this.categoriesSelect.some(item => {
        return item.text == "All(Ttdi)";
      });
      this.subCategoriesSelect = found ? stakeTtdi.allCat : stakeTtdi.allCat;
    },
    resetToAllAll() {
      let found = this.categoriesSelect.some(item => {
        return item.text == "All(All)";
      });
      this.subCategoriesSelect = found ? stakeAll.allCat : stakeAll.allCat;
    }
  }
};
</script>

<style scoped>
.md {
  width: 322px;
  max-width: 322px;
}
.origin {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.fit {
  width: fit-content;
}
.sm {
  max-width: 80px;
}
.tabss {
  height: fit-content;
  display: flex;
  flex-wrap: wrap;
}
.tabs-content {
  padding: 25px;
  background: url('./../../assets/bg-pattern.svg'), radial-gradient(farthest-side ellipse at 10% 0,#ffffffe3, #feffffad);
  border-radius: 0 0 10px 10px;
}
.tabs-button {
  height: fit-content;
  width: fit-content;
  padding: 10px 15px;
  background: none;
  cursor: pointer;
  border-radius: 5px 5px 0 0;
}
.active.tabs-button {
  background: url('./../../assets/bg-pattern.svg'), radial-gradient(farthest-side ellipse at 10% 0,#ffffffe3, #feffffad);
}
</style>
]<!-- =========================================================================================
    File Name: Faq.vue
    Description: FAQ Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
    <div id="faq-page">
        <!-- JUMBOTRON -->
        <div class="faq-jumbotron">
            <div class="faq-jumbotron-content lg:p-32 md:p-24 sm:p-16 p-8 rounded-lg mb-base">
                <h1 class="mb-1 text-white">Have Any Questions?</h1>
                <p class="text-white"></p>
                <vs-input placeholder="Search" v-model="faqSearchQuery" icon-pack="feather" icon="icon-search" size="large" class="w-full mt-6" icon-no-border />
            </div>
        </div>
        <div class="vx-row">
          
            <div class="vx-col w-full md:w-2/5 lg:w-1/4 rounded-lg">
                <vx-card>
                 
                    <h4> <a href="https://forms.gle/dhZbnQ8xoAawpiJe9" target="_blank">CLICK HERE TO REPORT BUGS/ISSUES</a></h4>
                    <ul class="faq-topics mt-4">
                        <li v-for="category in categories" :key="category.id" class="p-2 font-medium flex items-center" @click="faqFilter = category.id">
                            <div class="h-3 w-3 rounded-full mr-2" :class="'bg-' + category.color"></div><span class="cursor-pointer">{{ category.name }}</span>
                        </li>
                    </ul>

                    <br><br>

                  <!--  <h4>Supporters</h4>
                    <ul class="faq-supporters mt-4">
                        <li v-for="supporter in supporters" :key="supporter.id" class="mt-4">
                            <div class="flex items-center">
                                <vs-avatar class="mr-3" :src="supporter.img" size="35px" />
                                <div class="leading-tight">
                                    <p class="font-semibold">{{ supporter.name }}</p>
                                    <small>{{ supporter.profession }}</small>
                                </div>
                            </div>
                        </li>
                    </ul> -->
                </vx-card>
            </div>

            <!-- FAQ COL -->
            <div class="vx-col w-full md:w-3/5 lg:w-3/4 mt-12 md:mt-0">
                <vs-collapse accordion type="margin" class="p-0">
                    <vs-collapse-item v-for="(que,index) in filteredFaq" class="faq-bg rounded-lg" :class="{'mt-0': !index}" :key="que.id">
                        <div slot="header"><h5>{{ que.question }}</h5></div>
                        <p>{{ que.ans }}</p>
                    </vs-collapse-item>
                </vs-collapse>

            </div>
        </div>
    </div>
</template>

<script>

export default{
  data () {
    return {
      faqSearchQuery: '',
      faqFilter: 1,
      categories: [
        {
          id: 1,
          name: 'All',
          color: 'grey'
        },
      /*  {
          id: 2,
          name: 'General',
          color: 'primary'
        },
        {
          id: 3,
          name: 'Licenses',
          color: 'success'
        },
        {
          id: 4,
          name: 'Company usage',
          color: 'warning'
        },
        {
          id: 5,
          name: 'Trademark use',
          color: 'danger'
        } */
      ],
      faqs: [
        {
          id: 1,
          categoryId: 2,
          question: 'Can I view checkouts today for a particular date?',
          ans: 'yes. you may clink on the quickview in the checkouts today tab to view the list for that day.'
        },
        {
          id: 2,
          categoryId: 2,
          question: 'What is rollback status and how do I view it?',
          ans: 'rollback is a coin termed when a checkout order is undone. the data will be removed from the inventory system. you may view the status in the rollback status under checkouts in the dashboard.'
        },
        {
          id: 3,
          categoryId: 2,
          question: 'What is fast moving?',
          ans: 'fast moving signals the medicines that are being dispensed fast as compared to the time taken to restock.The higher the percentage the faster the need to restock. Red is above 50% and yellow is below 50%.'
        },
        {
          id: 4,
          categoryId: 2,
          question: 'How to add more than 1 medicine info in checkouts?',
          ans: 'click on the search medicine by name tab/scn a barcode and select the specified quantity. once done repeat the process to key in another medicine.'
        },
        {
          id: 5,
          categoryId: 3,
          question: 'Is the checkout being done under my account?',
          ans: 'you may verify the patient MRN no at the review and confirmation tab under the check out page.'
        },
        {
          id: 6,
          categoryId: 3,
          question: 'How to rollback a chekout order?',
          ans: 'this portal does not allow rollback. in order to rollback, inform the admin and take a screenshot of the order under the history side tab under extras for verification. The author and time will be specified.'
        },
        {
          id: 7,
          categoryId: 3,
          question: 'How to see all assition/dispenses in a day?',
          ans: 'click on reports and download the daily summary to view the manufacturer, product, prescription type, incoming/outgoing, and balance stock.'
        },
        {
          id: 8,
          categoryId: 3,
          question: 'How do i check in a medicine?',
          ans: 'this portal does not allow checking in. If there is a medicine to be checked in notify the admin to do so in the admin portal. You may only verify the medicined checked in the check in side tab under extras.'
        },
        {
          id: 9,
          categoryId: 4,
          question: 'How do i check account notifications?',
          ans: 'click on the alarm sign at the top right of the page to view all recent notifications.'
        },

      ],
      supporters: [
       /* {
          id: 1,
          img: require('@/assets/images/portrait/small/avatar-s-1.jpg'),
          name: 'Boyce Shene',
          profession: 'Web Developer'
        },
        {
          id: 2,
          img: require('@/assets/images/portrait/small/avatar-s-2.jpg'),
          name: 'Margie Sevy',
          profession: 'Web Designer'
        },
        {
          id: 3,
          img: require('@/assets/images/portrait/small/avatar-s-3.jpg'),
          name: 'Cyndi Navas',
          profession: 'Web Developer'
        },
        {
          id: 4,
          img: require('@/assets/images/portrait/small/avatar-s-4.jpg'),
          name: 'Chi Petrusky',
          profession: 'Web Developer'
        },
        {
          id: 5,
          img: require('@/assets/images/portrait/small/avatar-s-5.jpg'),
          name: 'Shanel Dumag',
          profession: 'Web Designer'
        } */
      ]
    }
  },
  computed: {
    filteredFaq () {
      return this.faqs.filter((faq) => {
        if (this.faqFilter === 1) return faq.question.toLowerCase().includes(this.faqSearchQuery.toLowerCase()) || faq.ans.toLowerCase().includes(this.faqSearchQuery.toLowerCase())
        else if (this.faqFilter === 2) return faq.categoryId === 2 && (faq.question.toLowerCase().includes(this.faqSearchQuery.toLowerCase()) || faq.ans.toLowerCase().includes(this.faqSearchQuery.toLowerCase()))
        else if (this.faqFilter === 3) return faq.categoryId === 3 && (faq.question.toLowerCase().includes(this.faqSearchQuery.toLowerCase()) || faq.ans.toLowerCase().includes(this.faqSearchQuery.toLowerCase()))
        else if (this.faqFilter === 4) return faq.categoryId === 4 && (faq.question.toLowerCase().includes(this.faqSearchQuery.toLowerCase()) || faq.ans.toLowerCase().includes(this.faqSearchQuery.toLowerCase()))
        else if (this.faqFilter === 5) return faq.categoryId === 5 && (faq.question.toLowerCase().includes(this.faqSearchQuery.toLowerCase()) || faq.ans.toLowerCase().includes(this.faqSearchQuery.toLowerCase()))
      })
    }
  },
  methods: {
  },
  components: {
  }
}
</script>

<style lang="scss">
#faq-page {
    .faq-jumbotron-content {
        background-image: url('../../assets/images/pages/faq.jpg');
        background-size: cover;
    }

    .faq-bg {
        background-color: #fff;
    }
}
</style>

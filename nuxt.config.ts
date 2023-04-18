// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    app : {
        head :{
            title: 'JOB Interesting',
            link : [
                { rel: 'stylesheet' , href:"https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap"}
            ],
            script : [
                {src: '/js/bootstrap.bundle.min.js'}
            ]
        }
    },
    css : [
        'bootstrap/scss/bootstrap.scss',
        '@/assets/css/default.css',
        "@/assets/css/createjob.scss"
    ],
    modules: [
        '@pinia/nuxt',
        'nuxt-icon'
    ],
    buildModules: [
        '@nuxtjs/moment'
      ],
      moment: {
        timezone: true
      }
})


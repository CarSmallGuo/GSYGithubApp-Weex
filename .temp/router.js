import Vue from 'vue'
/* global Vue */
import Router from 'vue-router'
import LoginPage from '@/components/LoginPage.vue'
import WelcomePage from '@/components/WelcomePage.vue'
import MainTabPage from '@/components/MainTabPage.vue'
import RepositoryDetailPage from '@/components/RepositoryDetailPage.vue'
import CodeDetailPage from '@/components/CodeDetailPage.vue'
import UserInfoPage from '@/components/UserInfoPage.vue'
import IssueDetailPage from '@/components/IssueDetailPage.vue'

import EventItem from '@/components/widget/EventItem.vue'
import RepositoryItem from '@/components/widget/RepositoryItem.vue'
import UserHeadItem from '@/components/widget/UserHeadItem.vue'
import IssueItem from '@/components/widget/IssueItem.vue'
import FileItem from '@/components/widget/FileItem.vue'
import RepositoryHeadItem from '@/components/widget/RepositoryHeadItem.vue'
import IssueHeadItem from '@/components/widget/IssueHeadItem.vue'
import IssueCommentItem from '@/components/widget/IssueCommentItem.vue'

Vue.use(Router)

Vue.component('EventItem', EventItem)
Vue.component('RepositoryItem', RepositoryItem)
Vue.component('UserHeadItem', UserHeadItem)
Vue.component('RepositoryHeadItem', RepositoryHeadItem)
Vue.component('IssueItem', IssueItem)
Vue.component('FileItem', FileItem)
Vue.component('IssueHeadItem', IssueHeadItem)
Vue.component('IssueCommentItem', IssueCommentItem)


module.exports = new Router({
    routes: [
        {
            path: '/login',
            name: 'LoginPage',
            component: LoginPage
        },
        {
            path: '/',
            name: 'WelcomePage',
            component: WelcomePage
        },
        {
            path: '/main',
            name: 'MainTabPage',
            component: MainTabPage,
            meta: {
                keepAlive: true,
            }
        },
        {
            path: '/user/:userName/repository/:reposName',
            name: 'RepositoryDetailPage',
            component: RepositoryDetailPage,
            /*children: [
                {
                    path: 'code',
                    name: 'CodeDetailPage',
                    component: CodeDetailPage
                },
            ]*/
        },
        {
            path: '/user/:userName',
            name: 'UserInfoPage',
            component: UserInfoPage
        },
        {
            path: 'code',
            name: 'CodeDetailPage',
            component: CodeDetailPage
        },
        {
            path:  '/user/:userName/repository/:reposName/issueNum/:issueNum',
            name: 'IssueDetailPage',
            component: IssueDetailPage
        },
    ]
})

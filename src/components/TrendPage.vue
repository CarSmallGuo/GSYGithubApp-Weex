<template>
    <div>
        <div class="title-container">
            <div :style="{flex:'1'}">
                <wxc-button :text="time"
                            type="white"
                            :textStyle="{color: '#3c3f41', fontSize: '30px'}"
                            :btn-style="{flex:'1',width:'325px', height:'75px', borderRadius: 0, backgroundColor:'white' }"
                            @wxcButtonClicked="onDailyClick"></wxc-button>
            </div>
            <div :style="{ width: '3px', backgroundColor: '#3c3f41', height:'50px', opacity: 0.4}"></div>
            <div :style="{flex:'1'}">
                <wxc-button :text="language"
                            type="white"
                            :textStyle="{color: '#3c3f41', fontSize: '30px'}"
                            :btn-style="{flex:'1',width:'325px', height:'75px', borderRadius: 0, backgroundColor:'white'}"
                            @wxcButtonClicked="onLanguageClick"></wxc-button>
            </div>
            <wxc-popover ref="wxc-popover1"
                         :buttons="btns1"
                         :position="popoverPosition1"
                         :arrowPosition="popoverArrowPosition1"
                         @wxcPopoverButtonClicked="popoverDailyButtonClicked"></wxc-popover>
            <wxc-popover ref="wxc-popover2"
                         :buttons="btns2"
                         :position="popoverPosition2"
                         :arrowPosition="popoverArrowPosition2"
                         @wxcPopoverButtonClicked="popoverLanguageButtonClicked"></wxc-popover>
        </div>
        <div class="list-container">
            <r-l-list ref="dylist" listItemName="RepositoryItem" :listData="dataList"
                      :forLoadMore="onLoadMore" :forRefresh="onRefresh" :itemClick="itemClick"></r-l-list>
        </div>
    </div>
</template>

<script>
    const modal = weex.requireModule('modal')

    import {WxcButton, WxcPopover} from 'weex-ui'
    import * as Constant from '../core/common/constant'
    import {TrendTime, TrendType} from '../core/common/filterUtils'
    import RLList from './widget/RLList.vue'


    export default {
        components: {RLList, WxcButton, WxcPopover},
        data() {
            return {
                currentPage: 1,
                time: '今日',
                language: '全部',
                since:null,
                languageType:null,
                btns1:TrendTime,
                btns2:TrendType,
                popoverPosition1: {  x: -400, y: 180  },
                popoverArrowPosition1: {pos: 'top', x: -100},
                popoverPosition2: {  x: -4, y: 180  },
                popoverArrowPosition2: {pos: 'top', x: -100},
            }
        },
        created: function () {
            this.onRefresh();
        },
        activated: function () {
            //keep alive
            this.onRefresh();
        },
        computed: {
            dataList() {
                return this.$store.state.repository.trend_repos_data_list;
            },
        },
        methods: {
            loadData(type) {
                this.currentPage = 1;
                this.$store.dispatch('getTrend', {
                    page: this.currentPage,
                    since: this.since,
                    languageType: this.languageType,
                    callback: (res) => {
                        if (Constant.DEBUG) {
                            console.info("trend loadData ", res)
                        }
                        if (type === 1) {
                            if (this.$refs.dylist) {
                                this.$refs.dylist.stopRefresh();
                            }
                        }
                        if (this.$refs.dylist) {
                            this.$refs.dylist.setNotNeedLoadMore();
                        }
                    },
                })
            },
            onLoadMore() {
                if (this.$refs.dylist) {
                    this.$refs.dylist.setNotNeedLoadMore();
                }
            },
            onRefresh() {
                this.loadData(1);
            },
            itemClick(index) {
                let data = this.dataList[index]
                this.jumpWithParams("RepositoryDetailPage", {
                    userName: data.name,
                    reposName: data.reposName,
                    title: data.reposName
                })
            },
            onDailyClick() {
                this.$refs['wxc-popover2'].wxcOverlayBodyClicked()
                this.$refs['wxc-popover1'].wxcPopoverShow();
            },
            onLanguageClick() {
                this.$refs['wxc-popover1'].wxcOverlayBodyClicked()
                this.$refs['wxc-popover2'].wxcPopoverShow();
            },
            popoverDailyButtonClicked (obj) {
                this.time = TrendTime[obj.index].text;
                this.since = TrendTime[obj.index].key;
                this.onRefresh();
            },

            popoverLanguageButtonClicked (obj) {
                this.language = TrendType[obj.index].text;
                this.languageType = TrendType[obj.index].key;
                this.onRefresh();
            },
        }
    }
</script>

<style scoped>
    .title-container {
        position: absolute;
        left: 0;
        right: 0;
        flex-direction: row;
        width: 750px;
        height: 80px;
        padding: 10px 20px;
        Align-items: center;
        justify-content: center;
        background-color: white;
        z-index: 999;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.80);
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
    }
    .list-container {
        margin-top: 80px;
    }
</style>
<template>
    <div :style="{flex:1}">
        <navigation-bar :title="title" :onLeftButtonClick="function(){toBack()}"
                        :rightIcon="' '"></navigation-bar>
        <web-component :source="codeData" :webStyle="{height:'1244px', width: '750px'}"></web-component>
    </div>
</template>

<script>
    const modal = weex.requireModule('modal')

    import * as Constant from '../core/common/constant'
    import WebComponent from './widget/WebComponent.vue'
    import repository from '../core/net/repository'
    import NavigationBar from './widget/NavigationBar.vue'
    import {formName, generateHtml, generateCode2HTml} from '../core/common/htmlUtils'

    export default {
        components: {WebComponent, NavigationBar},
        data() {
            return {
                userName: "",
                reposName: "",
                path: "",
                curBranch: "master",
                codeData: "",
                title: "",
            }
        },
        created: function () {
            this.loadData()

        },
        methods: {
            loadData() {
                this.userName = this.getQuery().userName
                this.reposName = this.getQuery().reposName
                this.path = this.getQuery().path
                this.curBranch = this.getQuery().curBranch
                this.title = this.getQuery().title
                if(this.isPreparing()) {
                    return
                }
                repository.getReposFileDirDao(this.userName, this.reposName, this.path, this.curBranch, "text")
                    .then((res) => {
                        if (res && res.result) {
                            let startTag = `class="announce instapaper_body `;
                            let startLang = res.data.indexOf(startTag);
                            let endLang = res.data.indexOf(`" data-path="`);
                            let lang;
                            if (startLang >= 0 && endLang >= 0) {
                                let tmpLang = res.data.substring(startLang + startTag.length, endLang);
                                if (tmpLang) {
                                    lang = formName(tmpLang.toLowerCase());
                                }
                            }
                            if (!lang) {
                                lang = 'java'
                            }
                            if ('markdown' === lang) {
                                this.codeData = generateHtml(res.data)
                            } else {
                                this.codeData = generateCode2HTml(res.data, Constant.webDraculaBackgroundColor, lang)

                            }
                        } else {
                            this.codeData = "<h1>不支持打开</h1>"
                        }
                    })
            },
            isPreparing() {
                return (!this.userName || !this.reposName || this.userName.length < 1 || this.reposName.length < 1)
            },
        }
    }
</script>

<style scoped>
</style>



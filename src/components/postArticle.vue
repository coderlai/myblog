<template>
    <form action="" method="post" class="form-horizontal">
        <!--文章标题-->
        <div class="form-group">
            <div class="col-sm-9">
                <input type="text" class="form-control" v-model="title" placeholder="文章标题">
            </div>
            <div class="col-sm-3">
                <div class="col-sm-4 text-center">类型：</div>
                <div class="col-sm-8">
                    <select class="form-control" @change="changeType" v-model="type">
                        <option value="0" selected>---请选择---</option>
                        <option value="node">NodeJs</option>
                        <option value="js">Js</option>
                        <option value="ajax">Ajax</option>
                        <option value="h5">HTML5</option>
                        <option value="css">CSS3</option>
                        <option value="php">PHP</option>
                    </select>
                </div>
            </div>
        </div>
        <!--原文url链接地址-->
        <div class="form-group">
            <div class="col-sm-12">
                <input type="text" class="form-control" v-model="url" placeholder="原文的URL链接地址">
            </div>
        </div>
        <!--文章内容在线编辑器-->
        <div class="form-group">
            <div class="col-sm-12">
                <div style="min-height: 500px;width: 100%;">
                    <quill-editor v-model="content"
                                  ref="myQuillEditor"
                                  :options="editorOption"
                                  @blur="onEditorBlur($event)"
                                  @focus="onEditorFocus($event)"
                                  @ready="onEditorReady($event)"
                                  @change="onEditorChange($event)">
                    </quill-editor>
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-12">
                <button class="btn btn-success pull-right" type="submit" @click.prevent="postArticle">发布文章</button>
            </div>
        </div>
    </form>
</template>
<script>
    import Quill from 'quill'
    import {ImageImport} from '../modules/ImageImport.js'
    import {ImageResize} from '../modules/ImageResize.js'
    Quill.register('modules/imageImport', ImageImport)
    Quill.register('modules/imageResize', ImageResize)
    export default {
        data() {
            return {
                title: "", //标题
                url: "", //链接
                type: 0,//类型
                name: 'register-modules-example',
                content: '',
                editorOption: {
                    modules: {
                        history: {
                            delay: 1000,
                            maxStack: 50,
                            userOnly: false
                        },
                        imageImport: true,
                        imageResize: {
                            displaySize: true
                        }
                    }
                },
                error: ["文章标题不能为空", "请选择文章类型", "文章内容不能为空"]
            }
        },
        methods: {
            onEditorBlur(editor) {
                //console.log('editor blur!', editor)
            },
            onEditorFocus(editor) {
                //console.log('editor focus!', editor)
            },
            onEditorReady(editor) {
                //console.log('editor ready!', editor)
            },
            onEditorChange({editor, html, text}) {
                //console.log('editor change!', editor, html, text)
                //this.content = html
            },
            changeType: function () {

            },
            postArticle: function () {
                if (!this.title) {

                    this.$store.commit("toggleModal",{show:true,msg:this.error[0]})
                    return
                }
                if (this.type == 0) {

                    this.$store.commit("toggleModal",{show:true,msg:this.error[1]})
                    return
                }
                if (!this.content) {

                    this.$store.commit("toggleModal",{show:true,msg:this.error[2]})
                    return
                }
                this.$http.post('/api/storeArticle', {
                    content:this.content,
                    type:this.type,
                    title:this.title,
                    url:this.url
                }, {emulateJSON: true}).then((response) => {
                    this.$store.commit("toggleModal",{show:true,msg:response.body.msg})
                })
            }
        },
        computed: {
            editor() {
                return this.$refs.myQuillEditor.quill
            }
        }
    }
</script>
<style>
    .ql-container {
        min-height: 500px;
    }
</style>
<template>
    <div>
    <el-dialog :visible.sync="editpaper" :before-close="editpaper = true">
    <el-select v-model="value" placeholder="请选择">
        <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
        </el-option>
    </el-select>
    </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "EditPaper",
        data() {
            return{
                options: [{
                    value: 0,
                    label: '单选题'
                }, {
                    value: 1,
                    label: '多选题'
                }, {
                    value: 2,
                    label: '填空题'
                }, {
                    value: 3,
                    label: '判断题'
                }, {
                    value: 4,
                    label: '主观题'
                }],
                value: ''
            }
        },
        props: {
            editpaper: {
                type: Boolean,
                default: false
            }
        }

    }
</script>

<style scoped>

</style>
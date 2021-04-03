
export default function (a) {
  return  this.$confirm(a, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    })
}
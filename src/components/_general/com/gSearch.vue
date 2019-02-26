<template>
  <div class="oct-search-container">
    <div class="oct-defult-search-container">
      <el-row type="flex">
        <el-col class="oct-default-input-flex-item clearfix">
          <div class="oct-sel-prepend fl">
            <el-select
              v-model.trim="prependSelected"
              :disabled="isShow"
              :style="{width:selectWidth}"
              placeholder="请选择"
              @change="resetSearchText"
            >
              <el-option v-for="(item,index) in prependList" :key="index" :label="item.label" :value="item.value" />
            </el-select>
          </div>
          <div class="oct-sel-content fl">
            <el-autocomplete
              v-if="willSearch.autocomplete"
              v-model.trim="defaultSearchText"
              :fetch-suggestions="querySearch"
              :disabled="isShow"
              placeholder="请输入搜索内容"
              @keyup.enter.native="triggleSearch()"
            />
            <el-select
              v-if="willSearch.select && !willSearch.autocomplete"
              v-model.trim="defaultSearchText"
              :disabled="isShow"
              filterable
              placeholder="请选择"
              @keyup.enter.native="triggleSearch()"
            >
              <el-option v-for="(item,index) in willOptionList" :key="index" :label="item.label" :value="item.value" />
            </el-select>
            <el-input
              v-if="!willSearch.select&&!willSearch.autocomplete"
              v-model.trim="defaultSearchText"
              :disabled="isShow"
              placeholder="请输入该项搜索内容"
              @keyup.enter.native="triggleSearch()"
            />
          </div>
          <div class="oct-sel-search-btn fl">
            <el-button type="primary" @click="submit">
              {{ isShow?'高级搜索':"搜 索" }}
            </el-button>
          </div>
        </el-col>
        <el-col v-show="seniorSearch&&prependList.length>1" class="oct-default-input-flex-item">
          <div :class="['oct-senior-serach']" @click="showSenior">
            {{ isShow?'普通搜索':"高级搜索" }}
          </div>
        </el-col>
        <el-col class="oct-default-input-flex-item">
          <div :class="['oct-senior-serach']" @click="clear">
            清空
          </div>
        </el-col>
        <slot />
      </el-row>
    </div>
    <el-collapse-transition>
      <div v-if="isShow&&prependList.length>1" class="oct-senior-search-container">
        <el-row :gutter="20">
          <el-col v-for="(item,index) in prependList" :key="index" :span="6">
            <div :class="[{'is-padding-top':index >3},{'oct-time-picker':item.time}]">
              <el-input
                v-if="!item.select&&!item.time"
                v-model.trim="searchForm[item.value]"
                placeholder="请输入该项搜索内容"
                @keyup.enter.native="triggleSearch()"
              >
                <template slot="prepend">
                  {{ item.label }}
                </template>
              </el-input>
              <div v-if="item.select" class="oct-search-select-item">
                <div class="el-input-group__prepend">
                  {{ item.label }}
                </div>
                <el-select v-if="item.select && !item.autocomplete || item.SeniorSelect" v-model.trim="searchForm[item.value]" filterable class="oct-select-item" placeholder="请选择" @keyup.enter.native="triggleSearch()">
                  <el-option v-for="item1 in item.select" :key="item1.label" :label="item1.label" :value="item1.value">
                    <span style="float: left">{{ item1.label }}</span>
                    <span v-if="item.both" style="float: right; color: #8492a6; font-size: 13px; margin:0px 20px 0px 10px">{{ item1.value }}</span>
                  </el-option>
                </el-select>
                <el-autocomplete
                  v-if="item.select && item.autocomplete && !item.SeniorSelect"
                  v-model.trim="searchForm[item.value]"
                  :fetch-suggestions="seniorQuerySearch"
                  placeholder="请输入搜索内容"
                  @keyup.enter.native="triggleSearch()"
                  @click.native="filterSelectData(item)"
                />
              </div>
              <div v-if="item.time" class="oct-search-select-item">
                <div class="el-input-group__prepend">
                  {{ item.label }}
                </div>
                <el-date-picker
                  v-model.trim="time"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                />
              </div>
            </div>
          </el-col>
        </el-row>
        <!-- <div v-for="(item,index) in prependList" :key="index" :class="['oct-senior-item','fl',{'oct-time-picker':item.time}]">
          <el-input
            v-if="!item.select&&!item.time"
            v-model.trim="searchForm[item.value]"
            placeholder="请输入该项搜索内容"
            @keyup.enter.native="triggleSearch()"
          >
            <template slot="prepend">{{ item.label }}</template>
          </el-input>
          <div v-if="item.select" class="oct-search-select-item">
            <div class="el-input-group__prepend">{{ item.label }}</div>
            <el-select v-if="item.select && !item.autocomplete || item.SeniorSelect" v-model.trim="searchForm[item.value]" filterable class="oct-select-item" placeholder="请选择" @keyup.enter.native="triggleSearch()">
              <el-option v-for="item1 in item.select" :key="item1.label" :label="item1.label" :value="item1.value">
                <span style="float: left">{{ item1.label }}</span>
                <span v-if="item.both" style="float: right; color: #8492a6; font-size: 13px; margin:0px 20px 0px 10px">{{ item1.value }}</span>
              </el-option>
            </el-select>
            <el-autocomplete
              v-if="item.select && item.autocomplete && !item.SeniorSelect"
              v-model.trim="searchForm[item.value]"
              :fetch-suggestions="seniorQuerySearch"
              placeholder="请输入搜索内容"
              @keyup.enter.native="triggleSearch()"
              @click.native="filterSelectData(item)"
            />
          </div>
          <div v-if="item.time" class="oct-search-select-item">
            <div class="el-input-group__prepend">{{ item.label }}</div>
            <el-date-picker
              v-model.trim="time"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </div>
        </div> -->
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
export default {
  name: 'GSearch',
  props: {
    // 是否需要搜索选项
    prepend: {
      type: Boolean,
      default: false
    },
    // 传入搜索选项列表
    prependList: {
      type: Array,
      default: () => [
        { label: '名称', value: 'name' }
      ]
    },
    // 高级搜索显示
    seniorSearch: {
      type: Boolean,
      default: false
    },
    // 选择框的宽度
    selectWidth: {
      type: String,
      default: '100px'
    },
    // clear之后的回调函数
    afterClear: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      // 搜索文本
      defaultSearchText: '',
      prependSelected: this.prependList[0].value,
      isShow: false,
      searchForm: {},
      time: '',
      activeInputSelect: []
    }
  },
  computed: {
    // 根据个数算出高度
    // seniorheight() {
    //   const count = Math.ceil(this.prependList.length + 1 / 4)
    //   return 52 * (count + 1) + 'px'
    // },
    willSearch() {
      return this.prependList.find(item => item.value === this.prependSelected)
    },
    willOptionList() {
      if (this.willSearch.select) {
        return this.willSearch.select
      }
      return []
    }
  },
  created() {
    this.searchForm = this.getSearchForm()
  },
  methods: {
    submit() {
      if (!this.isShow) {
        if (!this.prependSelected) {
          this.$message({
            message: '请选择搜索项',
            type: 'warning'
          })
          return
        }
        const obj = {}
        obj[this.prependSelected] = this.defaultSearchText
        this.$emit('submitSearch', obj)
        return
      }
      this.$emit('submitSearch', this.searchForm)
    },
    showSenior() {
      this.isShow = !this.isShow
    },
    // 放在computed里面 select框失效
    getSearchForm() {
      const arr = {}
      this.prependList.forEach((item, index) => {
        arr[item.value] = ''
      })
      return arr
    },
    clear() {
      this.defaultSearchText = ''
      for (const k in this.searchForm) {
        this.searchForm[k] = ''
      }
      // 修改
      this.submit()
    },
    resetSearchText() {
      this.defaultSearchText = ''
    },
    triggleSearch() {
      this.submit()
    },
    querySearch(queryString, cb) {
      var willOptionList = this.willSearch.select || []
      var results = queryString ? willOptionList.filter(this.createFilter(queryString)) : willOptionList
      // 调用 callback 返回建议列表的数据
      // console.log(results)
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    seniorQuerySearch(queryString, cb) {
      const result = this.activeInputSelect.filter(item => item.label.includes(queryString))
      cb(result)
    },
    filterSelectData(item) {
      this.activeInputSelect = [...item.select]
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/css/var.less';

.oct-defult-search-container {
  height: 32px;
  position: relative;
  .oct-default-input-flex-item {
    &:first-child {
      min-width:440px;
      max-width: 440px;
    }
    &:nth-child(2) {
      min-width: 55px;
      max-width: 55px;
    }
  }
  .el-autocomplete {
    width: 100%;
  }
  .oct-sel-prepend {
    width:  100px;
    .el-select  {
      width: auto!important;
      .el-input {
        .el-input__inner {
          background-color: #f5f7fa;
          border-radius: 3px 0px 0px 3px;
          color:#909399;
        }
      }
      .el-input.is-focus .el-input__inner {
        border-color: #dcdfe6;
      }
      .el-input__inner:focus {
        border-color: #dcdfe6;
      }
      .el-input__inner:hover {
        border-color: #dcdfe6;
      }
    }

  }
  .oct-sel-content {
    width: 250px;
    margin-left: -1px;
    .el-select {
      width: 100%;
    }
    .el-input {
      .el-input__inner {
        border-radius: 0px;
      }
    }
  }
  .oct-sel-search-btn {
    .el-button {
      width: 76px;
      border-radius:0px 3px 3px 0px;
    }
  }
  .oct-senior-serach {
    height: 32px;
    line-height: 32px;
    font-size: 12px;
    color: #909399;
    cursor: pointer;
    user-select: none;
    &:hover {
      color: @themeColor;
    }
  }
}
.oct-senior-search-container {
  margin-top:20px;
  padding: 20px;
  background-color: #eff2f5;
  border:1px solid #ebeef5;
  border-radius: 3px;
  .is-padding-top {
    padding-top:20px;
  }
  .el-autocomplete {
    width: 100%;
  }
  // timepick的浮动宽度是50% 确保占两个位置
  .oct-time-picker {
    width: 50%;
  }
  .oct-search-select-item {
    display: inline-table;
    font-size: 13px;
    width: 100%;
  }
  .oct-select-item {
    width: 100%;
    .el-input__inner {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
  .el-input-group__prepend {
    min-width: 75px;
    max-width: 75px;
    text-align: center;
    padding:0 15px;
  }
}
</style>

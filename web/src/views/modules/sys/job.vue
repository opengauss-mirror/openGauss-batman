<template>
  <el-card shadow="never" class="aui-card--fill">
    <div class="mod-sys__job">
      <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
        <el-form-item>
          <el-input v-model="dataForm.instanceName" :placeholder="$t('instance.instanceName')" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="getDataList()">{{ $t('query') }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button  type="primary" @click="addFullBackup()">{{ $t('job.addFull') }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button  type="primary" @click="addIncBackup()">{{ $t('job.addIncrement') }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button  type="danger" @click="deleteHandle()">{{ $t('deleteBatch') }}</el-button>
        </el-form-item>
      </el-form>
      <el-table v-loading="dataListLoading" :data="dataList" border @selection-change="dataListSelectionChangeHandle" style="width: 100%;">
        <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
        <el-table-column prop="instanceId" :label="$t('instance.instanceName')" header-align="center" align="center" :formatter="convertIdToName"></el-table-column>
        <el-table-column prop="name" :label="$t('job.jobName')" header-align="center" align="center"></el-table-column>
        <el-table-column prop="type" :label="$t('job.jobType')" header-align="center" align="center" :formatter="typeFormatter"></el-table-column>
        <el-table-column prop="option" :label="$t('job.jobMethod')" header-align="center" align="center" :formatter="methodFormatter"></el-table-column>
        <el-table-column prop="schedule" :label="$t('job.jobSchedule')" header-align="center" align="center" :formatter="scheduleFormatter"></el-table-column>
        <el-table-column prop="startTime" :label="$t('job.jobStartTime')" header-align="center" align="center"></el-table-column>
        <el-table-column prop="createTime" :label="$t('job.createTime')" header-align="center" align="center"></el-table-column>
        <el-table-column prop="remark" :label="$t('job.remark')" header-align="center" align="center"></el-table-column>
        <el-table-column :label="$t('handle')" fixed="right" header-align="center" align="center" width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">{{ $t('delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="limit"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="pageSizeChangeHandle"
        @current-change="pageCurrentChangeHandle">
      </el-pagination>
      <!-- ??????, ?????? / ?????? -->
      <add-full-backup v-if="addFullBackupVisible" ref="addFullBackup" @refreshDataList="getDataList"></add-full-backup>
      <add-inc-backup v-if="addIncBackupVisible" ref="addIncBackup" @refreshDataList="getDataList"></add-inc-backup>
    </div>
  </el-card>
</template>

<script>
import mixinViewModule from '@/mixins/view-module'
import addFullBackup from './job-add-full.vue'
import addIncBackup from './job-add-increment.vue'
const weekdays = [
  {name: 'SUN', label: '??????'},
  {name: 'MON', label: '??????'},
  {name: 'TUE', label: '??????'},
  {name: 'WED', label: '??????'},
  {name: 'THU', label: '??????'},
  {name: 'FRI', label: '??????'},
  {name: 'SAT', label: '??????'},
]
const period = [
  {name: '120', label: '???2??????'},
  {name: '60',  label: '???1??????'},
  {name: '30',  label: '???30??????'},
  {name: '15',  label: '???15??????'},
  {name: '5',   label: '???5??????'}
]

export default {
  mixins: [mixinViewModule],
  data () {
    return {
      instances: [],
      addFullBackupVisible: false,
      addIncBackupVisible: false,
      mixinViewModuleOptions: {
        getDataListURL: '/sys/job/list',
        getDataListIsPage: true,
        deleteURL: '/sys/job/delete',
        deleteIsBatch: true
      },
      dataForm: {
        instanceId: ''
      }
    }
  },
  created () {
    this.getInfo()
  },
  activated () {
    this.getInfo()
  },
  methods: {
    init () {
      this.instances = []
      this.$nextTick(() => {
        this.getInfo()
      })
    },
    // ?????????????????????????????????????????????????????????
    getInfo () {
      this.dataListLoading = true;
      this.$http.get(`/sys/instance/list`).then(({ data: res }) => {
        this.dataListLoading = false;
        if (res.code !== 0) {
          return this.$message.error(res.msg)
        }
        for (let i = 0; i < res.page.list.length; i++) {
          this.instances.push({id: res.page.list[i].id, name: res.page.list[i].instanceName})
        }
      }).catch(() => {this.dataListLoading = false;})
    },
    typeFormatter (row) {
      if (row.type === 'logical') {
        return '????????????'
      } else {
        return '????????????'
      }
    },
    methodFormatter(row) {
      if (row.option === 'full') {
        return '????????????'
      } else {
        return '????????????'
      }
    },
    scheduleFormatter(row) {
      if (row.schedule === '') {
        return '??????'
      }
      let result = []
      let searchKeys = []
      if (row.option === 'full') {
        searchKeys = weekdays
      } else {
        searchKeys = period
      }
      let keys = row.schedule.split(",")
      for (let i = 0; i < keys.length; ++i) {
        for (let j = 0; j < searchKeys.length; ++j) {
          if (keys[i] === searchKeys[j].name) {
            result.push(searchKeys[j].label)
          }
        }
      }

      return result.toString();
    },
    convertIdToName(row) {
      for (let index = 0; index < this.instances.length; index++) {
        if (row.instanceId === this.instances[index].id) {
          return this.instances[index].name
        }
      }
      return ""
    },
    addFullBackup (id) {
      this.addFullBackupVisible = true
      this.$nextTick(() => {
        this.$refs.addFullBackup.dataForm.id = id
        this.$refs.addFullBackup.init()
      })
    },
    addIncBackup (id) {
      this.addIncBackupVisible = true
      this.$nextTick(() => {
        this.$refs.addIncBackup.dataForm.id = id
        this.$refs.addIncBackup.init()
      })
    },
  },
  components: {
    addFullBackup,
    addIncBackup
  }
}
</script>

<template>
  <div class="container">
    <h2>코드 관리</h2>
    <!-- 코드 그룹 관리 -->
    <h3>코드 그룹</h3>
    <form @submit.prevent="saveCodeGroup">
      <input v-model="group.group_id" placeholder="그룹 ID" required />
      <input v-model="group.group_name" placeholder="그룹명" required />
      <textarea v-model="group.description" placeholder="설명"></textarea>
      <button type="submit">저장</button>
    </form>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>이름</th>
          <th>설명</th>
          <th>관리</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="g in codeGroups" :key="g.groupID">
          <td>{{ g.groupId }}</td>
          <td>{{ g.groupName }}</td>
          <td>{{ g.description }}</td>
          <td>
            <button @click="editGroup(g)">수정</button>
            <button @click="deleteGroup(g.groupId)">삭제</button>
            <button @click="selectGroup(g.groupId)">코드 상세 관리</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 코드 상세 관리 -->
    <div v-if="selectedGroup">
      <h3>코드 상세 ({{ selectedGroup }})</h3>
      <form @submit.prevent="saveCodeDetail">
        <input v-model="detail.code_id" placeholder="코드 ID" required />
        <input v-model="detail.code_name" placeholder="코드명" required />
        <input v-model="detail.code_value" placeholder="코드 값" required />
        <input v-model="detail.sort_order" type="number" placeholder="정렬순서" />
        <select v-model="detail.is_active">
          <option :value="true">활성</option>
          <option :value="false">비활성</option>
        </select>
        <button type="submit">저장</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>이름</th>
            <th>값</th>
            <th>정렬</th>
            <th>상태</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="d in codeDetails" :key="d.code_id">
            <td>{{ d.code_id }}</td>
            <td>{{ d.code_name }}</td>
            <td>{{ d.code_value }}</td>
            <td>{{ d.sort_order }}</td>
            <td>{{ d.is_active ? "활성" : "비활성" }}</td>
            <td>
              <button @click="editDetail(d)">수정</button>
              <button @click="deleteDetail(d.code_id)">삭제</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import codeService from "@/api/codeservice";

export default {
  setup() {
    const codeGroups = ref([]);
    const codeDetails = ref([]);
    const selectedGroup = ref(null);
    const group = ref({
      group_id: "",
      group_name: "",
      description: "",
    });
    const detail = ref({
      code_id: "",
      group_id: "",
      code_name: "",
      code_value: "",
      sort_order: 1,
      is_active: true,
    });

    const loadGroups = async () => {
      const { data } = await codeService.getCodeGroups();
      codeGroups.value = data;
    };

    const saveCodeGroup = async () => {
      if (group.value.group_id) {
        await codeService.createCodeGroup(group.value);
        group.value = { group_id: "", group_name: "", description: "" };
        loadGroups();
      }
    };

    const editGroup = (g) => {
      group.value = { ...g };
    };

    const deleteGroup = async (id) => {
      await codeService.deleteCodeGroup(id);
      loadGroups();
    };

    const selectGroup = async (groupId) => {
      selectedGroup.value = groupId;
      detail.value.group_id = groupId;
      const { data } = await codeService.getCodeDetails(groupId);
      console.log('Loaded code details:', data);
      codeDetails.value = data;
    };

    const saveCodeDetail = async () => {
      if (detail.value.code_id) {
        await codeService.createCodeDetail(detail.value);
        detail.value = { code_id: "", group_id: selectedGroup.value, code_name: "", code_value: "", sort_order: 1, is_active: true };
        selectGroup(selectedGroup.value);
      }
    };

    const editDetail = (d) => {
      detail.value = { ...d };
    };

    const deleteDetail = async (id) => {
      await codeService.deleteCodeDetail(id);
      selectGroup(selectedGroup.value);
    };

    onMounted(() => {
      loadGroups();
    });

    return {
      codeGroups,
      codeDetails,
      selectedGroup,
      group,
      detail,
      saveCodeGroup,
      editGroup,
      deleteGroup,
      selectGroup,
      saveCodeDetail,
      editDetail,
      deleteDetail,
    };
  },
};
</script>

<style scoped>
.container {
  width: 80%;
  margin: auto;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}
table, th, td {
  border: 1px solid black;
}
th, td {
  padding: 8px;
  text-align: center;
}
button {
  margin-right: 5px;
}
</style>

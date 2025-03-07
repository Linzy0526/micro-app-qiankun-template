<template>
    <div class="login-container">
      <a-card class="login-card" :bordered="false">
        <h2 style="text-align: center; margin-bottom: 24px">系统登录 </h2>
        
        <a-form
          :model="formState"
          :rules="rules"
          layout="vertical"
          ref="formRef"
        >
        <a-form-item label="用户名" name="username">
          <a-input v-model:value="formState.username" placeholder="请输入用户名">
            <template #prefix>
              <UserOutlined />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item label="密码" name="password">
          <a-input-password v-model:value="formState.password" placeholder="请输入密码">
            <template #prefix>
              <LockOutlined />
            </template>
          </a-input-password>
        </a-form-item>
        <a-button size="large" type="primary" block :loading="loading" @click="handleSubmit">登录</a-button>
        </a-form>
      </a-card>
    </div>
  </template>
  
  <script setup>
  import { reactive, ref } from 'vue';
  import { message } from 'ant-design-vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const loading = ref(false);
  const formRef = ref(null);
  const formState = reactive({
    username: '',
    password: '',
  });
  
  const rules = {
    username: [
      { required: true, whitespace: true, message: '请输入用户名' },
      { min: 2, max: 16, message: '长度2-16个字符' }
    ],
    password: [
      { required: true, message: '请输入密码' },
      { pattern: /^(?=.*[A-Za-z])(?=.*\d).{6,}$/, 
        message: '需包含字母+数字，6位以上' }
    ]
  };

  const validateForm = async () => {
    try {
        await formRef.value.validate();
        return true;
    } catch (e) {
        return false;
    }
  }
  
  const handleSubmit = async () => {
    if (!await validateForm()) {
        return;
    }
    try {
      loading.value = true;
      await new Promise(resolve => setTimeout(resolve, 1000));
      message.success('登录成功');
      router.push("/console")
    } catch (e) {
      message.error('登录失败');
    }
    loading.value = false;
  };
  </script>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  position: relative;
  overflow: hidden;
}

.login-card {
  width: 420px;
  z-index: 1;
  border-radius: 8px;
  box-shadow: 0 6px 16px -8px rgba(0,0,0,0.1),
              0 9px 28px 0 rgba(0,0,0,0.05);
  

}

</style>
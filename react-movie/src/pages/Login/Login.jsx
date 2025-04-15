import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContextWrapper';
import { authService, userService } from '../../services/api';
import styles from './Login.module.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    nickname: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  // 从location获取之前尝试访问的页面路径
  const from = location.state?.from || '/';

  // 处理表单输入变化
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 切换登录/注册表单
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  // 处理登录提交
  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      setError('用户名和密码不能为空');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      const response = await authService.login({
        username: formData.username,
        password: formData.password
      });
      
      // 模拟获取用户信息
      const user = {
        id: '1', // 这里应该是后端返回的用户ID
        username: formData.username,
        nickname: formData.username
      };
      
      // 保存token和用户信息
      login(response.access_token, user);
      
      // 重定向到之前尝试访问的页面或首页
      navigate(from, { replace: true });
    } catch (err) {
      console.error('登录失败:', err);
      setError('登录失败，请检查用户名和密码');
    } finally {
      setLoading(false);
    }
  };

  // 处理注册提交
  const handleRegister = async (e) => {
    e.preventDefault();
    
    // 表单验证
    if (!formData.username || !formData.password || !formData.email || !formData.nickname) {
      setError('所有字段都是必填的');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      // 调用注册API
      await userService.createUser({
        username: formData.username,
        password: formData.password,
        email: formData.email,
        nickname: formData.nickname
      });
      
      // 注册成功后自动切换到登录表单
      setIsLogin(true);
      setFormData({
        ...formData,
        confirmPassword: '',
        email: '',
        nickname: ''
      });
      
      // 显示成功消息
      setError('注册成功，请登录');
    } catch (err) {
      console.error('注册失败:', err);
      setError('注册失败，请稍后再试或尝试使用其他用户名');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h2 className={styles.title}>{isLogin ? '用户登录' : '用户注册'}</h2>
        
        {error && <div className={styles.errorMessage}>{error}</div>}
        
        <form onSubmit={isLogin ? handleLogin : handleRegister}>
          <div className={styles.formGroup}>
            <label htmlFor="username">用户名</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="请输入用户名"
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="password">密码</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="请输入密码"
              required
            />
          </div>
          
          {!isLogin && (
            <>
              <div className={styles.formGroup}>
                <label htmlFor="confirmPassword">确认密码</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="请再次输入密码"
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="email">邮箱</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="请输入邮箱"
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="nickname">昵称</label>
                <input
                  type="text"
                  id="nickname"
                  name="nickname"
                  value={formData.nickname}
                  onChange={handleChange}
                  placeholder="请输入昵称"
                  required
                />
              </div>
            </>
          )}
          
          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? '请稍候...' : isLogin ? '登录' : '注册'}
          </button>
        </form>
        
        <div className={styles.switchForm}>
          <span onClick={toggleForm}>
            {isLogin ? '没有账号？点击注册' : '已有账号？点击登录'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;

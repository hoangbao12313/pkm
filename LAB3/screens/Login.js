import { View, StyleSheet } from 'react-native';
import { Button, HelperText, Text, TextInput } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { login, useMyContextController } from '../store/Index'; 

const Login = ({ navigation }) => {
  const [controller, dispatch] = useMyContextController(); // Phân rã mảng [controller, dispatch]
  const userLogin = controller?.userLogin; // Truy cập userLogin từ controller (an toàn với optional chaining)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hiddenPassword, setHiddenPassword] = useState(false);

  const hasErrorEmail = () => !email.includes('@');
  const hasErrorPassword = () => password.length < 6;

  const loginHandle = () => {
    login(dispatch, email, password);
  };

  useEffect(() => {
    console.log(userLogin);
    if (userLogin != null) {
      if (userLogin.role === 'admin') {
        navigation.navigate('Admin');
      } else {
        navigation.navigate('Customer');
      }
    }
  }, [userLogin]);

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
      />
      <HelperText type="error" visible={hasErrorEmail()}>
        Email không hợp lệ
      </HelperText>
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!hiddenPassword}
        right={
          <TextInput.Icon
            icon={hiddenPassword ? 'eye-off' : 'eye'}
            onPress={() => setHiddenPassword(!hiddenPassword)}
          />
        }
      />
      <HelperText type="error" visible={hasErrorPassword()}>
        Password phải lớn hơn 6 ký tự
      </HelperText>
      <Button mode="contained" buttonColor="blue" onPress={loginHandle}>
        Login
      </Button>
      <View style={styles.register}>
        <Text>Chưa có tài khoản? </Text>
        <Button onPress={() => navigation.navigate('Register')}>
          Đăng ký
        </Button>
      </View>
      <View style={styles.forgot}>
        <Text>Quên mật khẩu? </Text>
        <Button onPress={() => navigation.navigate('ForgotPassword')}>
          Lấy lại mật khẩu
        </Button>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  register: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgot: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
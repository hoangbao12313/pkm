import { Alert, View } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import { useState } from "react";
import auth from '@react-native-firebase/auth'; // import đúng cách với react-native-firebase
import firestore from '@react-native-firebase/firestore';

const Register = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [hiddenPasswordConfirm, setHiddenPasswordConfirm] = useState(true);

  const hasError = {
    fullName: () => fullName.trim() === "",
    email: () => !email.includes("@"),
    password: () => password.length < 6,
    confirm: () => passwordConfirm !== password,
  };

  const encodeEmail = (email) => email.replace(/\./g, "_").replace(/@/g, "_");

  const handleCreateAccount = async () => {
    if (hasError.fullName() || hasError.email() || hasError.password() || hasError.confirm()) {
      Alert.alert("Lỗi", "Vui lòng kiểm tra lại thông tin.");
      return;
    }

    try {
      // Tạo user với email và password
      await auth().createUserWithEmailAndPassword(email, password);

      await firestore()
        .collection("LAB3_USER")
        .doc(encodeEmail(email))
        .set({
          fullName,
          email,
          phone,
          address,
          role: "customer",
        });

      Alert.alert("Thành công", "Đăng ký tài khoản thành công!");
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert(
        "Lỗi",
        error.code === "auth/email-already-in-use"
          ? "Email đã được sử dụng"
          : error.message
      );
    }
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 24, textAlign: "center", marginBottom: 20 }}>
        Đăng Ký Tài Khoản
      </Text>

      <TextInput label="Họ Tên" value={fullName} onChangeText={setFullName} />
      <HelperText type="error" visible={hasError.fullName()}>
        Không được để trống
      </HelperText>

      <TextInput label="Email" value={email} onChangeText={setEmail} />
      <HelperText type="error" visible={hasError.email()}>
        Email không hợp lệ
      </HelperText>

      <TextInput
        label="Mật Khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={hiddenPassword}
        right={
          <TextInput.Icon
            icon="eye"
            onPress={() => setHiddenPassword(!hiddenPassword)}
          />
        }
      />
      <HelperText type="error" visible={hasError.password()}>
        Tối thiểu 6 ký tự
      </HelperText>

      <TextInput
        label="Xác Nhận Mật Khẩu"
        value={passwordConfirm}
        onChangeText={setPasswordConfirm}
        secureTextEntry={hiddenPasswordConfirm}
        right={
          <TextInput.Icon
            icon="eye"
            onPress={() => setHiddenPasswordConfirm(!hiddenPasswordConfirm)}
          />
        }
      />
      <HelperText type="error" visible={hasError.confirm()}>
        Mật khẩu không khớp
      </HelperText>

      <TextInput label="Số điện thoại" value={phone} onChangeText={setPhone} />
      <TextInput label="Địa chỉ" value={address} onChangeText={setAddress} />

      <Button mode="contained" onPress={handleCreateAccount}>
        Đăng ký
      </Button>
    </View>
  );
};

export default Register;

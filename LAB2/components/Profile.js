// LAB2/screens/Profile.js
import React from 'react';
import { View, Text, StyleSheet, Linking, ScrollView } from 'react-native';
import ContactThumbnail from '../components/ContactThumbnail';
import DetailListItem from '../components/DetailListItem';
import colors from '../utility/colors';

const Profile = ({ route }) => {
  const { contact } = route.params;
  
  const { avatar, name, phone, cell, email } = contact;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.avatarSection}>
        <ContactThumbnail avatar={avatar} name={name} phone={phone} />
      </View>

      <View style={styles.detailsSection}>
        <DetailListItem
          icon="mail"
          title="Email"
          subtitle={email}
          onPress={() => Linking.openURL(`mailto:${email}`)}
        />
        <DetailListItem
          icon="phone"
          title="Work"
          subtitle={phone}
          onPress={() => Linking.openURL(`tel:${phone}`)}
        />
        <DetailListItem
          icon="smartphone"
          title="Personal"
          subtitle={cell}
          onPress={() => Linking.openURL(`tel:${cell}`)}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.greyLight,
  },
  avatarSection: {
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  detailsSection: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.grey,
  },
});

export default Profile;

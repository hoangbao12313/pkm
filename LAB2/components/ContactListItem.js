import { View, Text, StyleSheet, TouchableHighlight,Image, } from 'react-native'
import React from 'react'
import PropTypes from 'prop-types';
import colors from '../utility/colors'

const ContactListItem = ({
    name, avatar, phone, onPress,
}) =>
{
    return (
        <TouchableHighlight
        underlayColor={colors.grey}
        style ={StyleSheet.container}
        onPress={onPress}
        >
            <View style={styles.contactInfo}>
                <Image
                style={styles.avatar}
                source={{uri:avatar,}}
                />
              <View style={styles.details}>
                <Text style={styles.title}> {name}</Text>
                <Text style={styles.subTitle}> {phone}</Text>
              </View>
            </View>
        </TouchableHighlight>
    )
}
ContactListItem.PropTypes ={
  name: PropTypes.string,
  avatar: PropTypes.string,
  phone: PropTypes.string,
  onPress: PropTypes.string,
}
const styles = StyleSheet.create({
    container:{
        paddingLeft:24,
    },
    contactInfo:{
      flex:1,
      flexDirection:'row',
      alignItems:'center',
      paddingTop:16,
      paddingBottom:16,
      paddingRight:24,
      borderBottomColor:colors.grey,
      borderBottomWidth:StyleSheet.hairlineWidth,
    },
    avatar:{
      borderRadius:22,
      width:44,
      height:44,
    },
    details:{
      justifyContent:'center',
      flex:1,
      marginLeft:20,
      
    },
    title:{
      color:colors.black,
      fontWeight:'bold',
      fontSize:16,
    },
    subTitle:{
      color:colors.blue,
      fontSize:15,
      margintop:4,
    },
    
})

export default  ContactListItem;
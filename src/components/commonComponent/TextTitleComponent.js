import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {colors} from '../../constants';

const TextTitleComponent = props => {
  const {label, labelButton, onPress, viewTitle, icon} = props;
  return (
    <View style={[styles.viewContainer, viewTitle]}>
      <Text style={styles.title}>{label}</Text>
      {labelButton && (
        <TouchableOpacity onPress={onPress} style={styles.styleButton}>
          <Text style={styles.labelButton}>{labelButton}</Text>
          {icon && <Image source={icon} style={styles.image} />}
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  viewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  title: {
    fontSize: 17,
    color: colors.textTitle,
    fontWeight: '600',
    letterSpacing: -0.5,
  },
  styleButton: {
    height: 30,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelButton: {fontSize: 12, color: colors.mainColor, marginHorizontal: 3},
  image: {width: 15, height: 15, tintColor: colors.mainColor, marginRight: 3},
});
export default TextTitleComponent;

import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import ButtonComponent from '../commonComponent/ButtonComponent';
import {colors, icons} from '../../constants';

const RenderInvoiceClosing = (props: any) => {
  const {data, onPress} = props;

  const renderName = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        {data?.progressiveServiceClosings?.map((item: any, index: number) => {
          return (
            <Text
              key={item?.id}
              numberOfLines={1}
              style={styles.content}>{`${item?.serviceName} `}</Text>
          );
        })}
      </View>
    );
  };

  return (
    <View style={{marginBottom: 15}}>
      {/* <Text style={styles.title}>{`Tầng: ${floor}`}</Text> */}
      <View key={`${data?.room}`} style={styles.viewRender}>
        <View style={styles.viewBetween}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={icons.ic_home}
              style={{width: 20, height: 20, tintColor: colors.mainColor}}
            />
            <Text
              style={styles.labelRoom}>{`${data?.contract?.unit?.name}`}</Text>
          </View>
          <ButtonComponent
            disabled={true}
            styleButton={styles.statusView}
            label={data?.statusName}
            styleLabel={{fontSize: 12, color: 'white'}}
          />
        </View>

        {data?.progressiveServiceClosings?.length > 0 ? (
          renderName()
        ) : (
          <Text numberOfLines={1} style={styles.content}>{``}</Text>
        )}

        <View style={styles.viewBetween}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={[styles.label]}>{`Người gửi: `}</Text>
            <Text
              numberOfLines={1}
              style={[
                {fontWeight: '600'},
                styles.label,
              ]}>{`${data?.contract?.contractOwner?.fullName}`}</Text>
          </View>
          <ButtonComponent
            styleButton={styles.buttonConfirm}
            label={data?.status != 2 ? 'Xác nhận' : 'Xem'}
            styleLabel={{fontSize: 13, color: 'white'}}
            onPress={onPress}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  viewRender: {
    backgroundColor: 'white',
    minHeight: 90,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    margin: 1,
    elevation: 5,
    marginBottom: 10,
    padding: 10,
  },
  title: {fontSize: 16, fontWeight: '600', color: '#163A5F'},
  label: {fontSize: 12, color: colors.mainColor},
  content: {fontSize: 13, color: '#374047'},
  statusView: {
    paddingHorizontal: 5,
    backgroundColor: colors.backgroundOrange,
    borderRadius: 4,
  },
  viewBetween: {
    flexDirection: 'row',
    aligndatas: 'center',
    justifyContent: 'space-between',
  },
  labelRoom: {
    fontSize: 12,
    color: '#97A1A7',
    marginLeft: 5,
  },
  buttonConfirm: {
    height: 40,
    width: 120,
    backgroundColor: colors.mainColor,
    borderRadius: 5,
  },
});
export default RenderInvoiceClosing;

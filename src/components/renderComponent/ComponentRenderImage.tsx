import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import TextTitleComponent from '../commonComponent/TextTitleComponent';
import {uuid} from '../../utils/common';
import ButtonComponent from '../commonComponent/ButtonComponent';
import {icons, colors} from '../../constants';
import RenderImage from './RenderImage';
const ComponentRenderImage = (props:any) => {
  const {
    viewComponent,
    title,
    label,
    data,
    deleteItem,
    openModal,
    deleteButton,
    labelUpload,
  } = props;

  const renderImage = (item:any, index:number) => {
    return (
      <RenderImage
        deleteButton={deleteButton}
        data={item}
        deleteItem={() => deleteItem(item)}
      />
    );
  };
  return (
    <View style={viewComponent}>
      <TextTitleComponent label={title} />
      <View style={styles.viewUploadImage}>
        {data?.length > 0 ? (
          <FlatList
            horizontal
            data={data}
            keyExtractor={uuid}
            renderItem={({item, index}) => renderImage(item, index)}
          />
        ) : (
          <ButtonComponent
            styleButton={{flex: 1}}
            label={label}
            styleLabel={[{marginTop: 5, textAlign: 'center'}]}
            disabled={true}
            icon={icons.ic_upload}
            styleIcon={{width: 100, height: 100, alignSelf: 'center'}}
          />
        )}
      </View>
      <ButtonComponent
        styleButton={[styles.buttonUploadIM]}
        label={labelUpload}
        styleLabel={styles.labelUploadIM}
        onPress={openModal}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  viewUploadImage: {
    height: 220,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  buttonUploadIM: {
    height: 50,
    backgroundColor: colors.mainColor,
    borderRadius: 10,
  },
  labelUploadIM: {color: 'white', fontWeight: '500', fontSize: 15},
});
export default ComponentRenderImage;

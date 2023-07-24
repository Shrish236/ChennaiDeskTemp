// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/
import { COLORS, icons, images, SIZES } from '../constants'
import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

const CustomSidebarMenu = (props) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor:COLORS.gray, color:'white'}}>
      {/*Top Large Image */}
      <Image
        source={require("../ChennaiDeskLogo.png")}
        style={[styles.sideMenuProfileIcon, {top:25}]}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
    
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    color: 'white',
  },
});

export default CustomSidebarMenu;
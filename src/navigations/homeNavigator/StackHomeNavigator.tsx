import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  AddNewAmenity,
  AddNewBankAccount,
  AddNewHouseStep1,
  AddNewHouseStep2,
  AddNewHouseStep3,
  TenantManager,
  TenantDetail,
  ChooseTenant,
  AddNewTenant,
  AddNewService,
  AddNewUnit,
  ChooseABank,
  ChooseAmenity,
  ChooseService,
  DetailNotification,
  EditUnitInfor,
  QuickAddUnit,
  UnitDetail,
  UnitManager,
  EmptyUnitManager,
  HomeScreen,
  HouseDetail,
  HouseManager,
  EditHouseInformation,
  NotificationScreen,
  ContractDetail,
  ContractManager,
  ContractTermsDetail,
  CreateContract,
  CreateContractFromUnit,
  EditContractInfor,
  InvoiceClosingManager,
  ConfirmInvoiceClosing,
  InvoiceUnpaidDetail,
  InvoicePaidDetail,
  CheckInvoice,
  InvoiceManager,
  ServiceManager,
  ServiceDetail,
  AmenityManager,
  AmenityDetail,
  BankAccountManager,
  BankAccountDetal,
} from '../../screens';
const Stack = createStackNavigator();

const StackHomeNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        component={HomeScreen}
        name={'HomeScreen'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={NotificationScreen}
        name={'NotificationScreen'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={DetailNotification}
        name={'DetailNotification'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={HouseManager}
        name={'HouseManager'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={HouseDetail}
        name={'HouseDetail'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={AddNewHouseStep1}
        name={'AddNewHouseStep1'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={AddNewHouseStep2}
        name={'AddNewHouseStep2'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={AddNewHouseStep3}
        name={'AddNewHouseStep3'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={EditHouseInformation}
        name={'EditHouseInformation'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={TenantManager}
        name={'TenantManager'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={TenantDetail}
        name={'TenantDetail'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={AddNewTenant}
        name={'AddNewTenant'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={ChooseTenant}
        name={'ChooseTenant'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={ContractDetail}
        name={'ContractDetail'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={ContractManager}
        name={'ContractManager'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={ContractTermsDetail}
        name={'ContractTermsDetail'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={CreateContract}
        name={'CreateContract'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={CreateContractFromUnit}
        name={'CreateContractFromUnit'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={EditContractInfor}
        name={'EditContractInfor'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={UnitManager}
        name={'UnitManager'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={EmptyUnitManager}
        name={'EmptyUnitManager'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={UnitDetail}
        name={'UnitDetail'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={EditUnitInfor}
        name={'EditUnitInfor'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={AddNewUnit}
        name={'AddNewUnit'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={QuickAddUnit}
        name={'QuickAddUnit'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={BankAccountManager}
        name={'BankAccountManager'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={BankAccountDetal}
        name={'BankAccountDetal'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={AddNewBankAccount}
        name={'AddNewBankAccount'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={ChooseABank}
        name={'ChooseABank'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={AmenityManager}
        name={'AmenityManager'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={AmenityDetail}
        name={'AmenityDetail'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={AddNewAmenity}
        name={'AddNewAmenity'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={ChooseAmenity}
        name={'ChooseAmenity'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={ServiceManager}
        name={'ServiceManager'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={ServiceDetail}
        name={'ServiceDetail'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={AddNewService}
        name={'AddNewService'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={ChooseService}
        name={'ChooseService'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={InvoiceClosingManager}
        name={'InvoiceClosingManager'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={ConfirmInvoiceClosing}
        name={'ConfirmInvoiceClosing'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={InvoiceManager}
        name={'InvoiceManager'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={CheckInvoice}
        name={'CheckInvoice'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={InvoicePaidDetail}
        name={'InvoicePaidDetail'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={InvoiceUnpaidDetail}
        name={'InvoiceUnpaidDetail'}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default StackHomeNavigator;

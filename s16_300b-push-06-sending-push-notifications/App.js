import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Button, View } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
    };
  },
});

export default function App() {
  const [pushToken, setPushToken] = useState();

  useEffect(() => {
    Permissions.getAsync(Permissions.NOTIFICATIONS)
      .then((statusObj) => {
        if (statusObj.status !== 'granted') {
          return Permissions.askAsync(Permissions.NOTIFICATIONS);
        }
        return statusObj;
      })
      .then((statusObj) => {
        if (statusObj.status !== 'granted') {
          throw new Error('Permission not granted!');
        }
      })
      .then(() => {
          console.log('--gettingToken');
        return Notifications.getExpoPushTokenAsync();
      })
      .then((response) => {
        const token = response.data;
        console.log('--token - response.data');
        console.log(token);
        console.log('--token - response.data');
      //ExponentPushToken[t6VEHbJ35bnOSKbmFKO5-o]   //As of 200722
      
        setPushToken(token);
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  }, []);

  useEffect(() => {
    const backgroundSubscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response);
      }
    );

    const foregroundSubscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log(notification);
      }
    );

    return () => {
      backgroundSubscription.remove();
      foregroundSubscription.remove();
    };
  }, []);

  const triggerNotificationHandler = () => {
    // Notifications.scheduleNotificationAsync({
    //   content: {
    //     title: 'My first local notification',
    //     body: 'This is the first local notification we are sending!',
    //     data: { mySpecialData: 'Some text' },
    //   },
    //   trigger: {
    //     seconds: 10,
    //   },
    // });
    fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-Encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: pushToken,
        data: { extraData: 'Some data' },
        title: 'Sent via the app-01',
        body: 'This push notification was sent via the app!',
      }),
    });
  };

  return (
    <View style={styles.container}>
      <Button
        title="Trigger Notification"
        onPress={triggerNotificationHandler}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

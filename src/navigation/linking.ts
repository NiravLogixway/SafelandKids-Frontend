import {LinkingOptions} from '@react-navigation/native';
import {Linking} from 'react-native';

export const linking: LinkingOptions<any> = {
  prefixes: ['safelandkids://'],
  config: {
    screens: {
      ResetPassword: {
        path: 'reset-password/:token',
        parse: {
          token: (token: string) => token,
        },
      },
    },
  },

  async getInitialURL() {
    const url = await Linking.getInitialURL();
    if (url != null) {
      return url;
    }
    return null;
  },

  subscribe(listener) {
    const onReceiveURL = ({url}: {url: string}) => {
      listener(url);
    };
    const subscription = Linking.addEventListener('url', onReceiveURL);
    return () => {
      subscription.remove();
    };
  },
};

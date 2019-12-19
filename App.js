import React from 'react';
import { Image } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { Block, GalioProvider } from 'galio-framework';

import Screens from './navigation/Screens';
import { Images, demo_ApiPet, nowTheme } from './constants';

// cache app images
const assetImages = [
  Images.Onboarding,
  Images.LogoOnboarding,
  Images.Logo,
  Images.Pro,
  Images.NowLogo,
  Images.iOSLogo,
  Images.androidLogo
];

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    fontLoaded: false
  };

  async componentDidMount() {
    Font.loadAsync({
      'montserrat-regular': require('./assets/font/Montserrat-Regular.ttf'),
      'montserrat-bold': require('./assets/font/Montserrat-Bold.ttf'),
      'cunia': require('./assets/font/Cunia.ttf'),
      'distgrg': require('./assets/font/DISTGRG_.ttf') ,
    });
    this.setState({ fontLoaded: true });
}

  render() {
    if (this.state.isLoadingComplete) {
      console.log('fonts loaded: ', this.state.fontLoaded)
      return (
        <GalioProvider theme={nowTheme}>
          <Block flex>
            <Screens />
          </Block>
        </GalioProvider>
      );
      
    } else {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([...cacheImages(assetImages)]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
      this.setState({ isLoadingComplete: true });
  };
}
